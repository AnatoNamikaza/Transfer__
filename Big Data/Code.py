#Libraries
import time
import random
import threading

#Global variable
Max_range           = 1000000000            # Max number for the range to generate numbers in hugefile1 and hugefile2 
Max_numbers         = 1000000000            # Max number of entries to be found in hugefile1 and hugefile2
lines_per_file      = Max_numbers / 10      # Max number of lines to divide the hugefiles in smallfiles
global_lock         = threading.Lock()      # threading lock for thread synchronization

# function to generate the hugefiles
def generate():
    file1 = open("hugefile1.txt","w")
    file2 = open("hugefile2.txt","w")
    for i in range(Max_numbers):
        file1.write(str(random.randint(0,Max_range))+'\n')
        file2.write(str(random.randint(0,Max_range))+'\n')
    file1.close()
    file2.close()

# function to add hugefiles without threading
def simple_sum():
    file1 = open("hugefile1.txt","r")
    file2 = open("hugefile2.txt","r")
    file3 = open("totalfile.txt","w")
    
    temp1 = file1.read().splitlines()
    temp2 = file2.read().splitlines()

    for i in range(len(temp1)):
        file3.write(str(int(temp1[i])+int(temp2[i]))+'\n')        
    
    file1.close()
    file2.close()
    file3.close()

# function to break hugefiles into 10 smaller files
def break_to_10_files():    
    smallfile = None
    with open('hugefile1.txt') as bigfile:
        for lineno, line in enumerate(bigfile):
            if lineno % lines_per_file == 0:
                if smallfile:
                    smallfile.close()
                small_filename = 'smallfile1_{}.txt'.format(lineno + lines_per_file)
                smallfile = open(small_filename, "w")
            smallfile.write(line)
        if smallfile:
            smallfile.close()

    smallfile = None
    with open('hugefile2.txt') as bigfile:
        for lineno, line in enumerate(bigfile):
            if lineno % lines_per_file == 0:
                if smallfile:
                    smallfile.close()
                small_filename = 'smallfile2_{}.txt'.format(lineno + lines_per_file)
                smallfile = open(small_filename, "w")
            smallfile.write(line)
        if smallfile:
            smallfile.close()

# function to take sum of small files via thread
def thread_sum(filename1, filename2):    
    while global_lock.locked():
        continue

    global_lock.acquire()
    
    file1 = open(filename1,"r")
    file2 = open(filename2,"r")
    file3 = open("th_totalfile.txt","a")
    
    temp1 = file1.read().splitlines()
    temp2 = file2.read().splitlines()

    for i in range(len(temp1)):
        file3.write(str(int(temp1[i])+int(temp2[i]))+'\n')        
    
    file1.close()
    file2.close()
    file3.close()

    global_lock.release()

# function to take sum of small files using threading
def threaded_10_sum():
    file3 = open("th_totalfile.txt","w")
    file3.truncate()
    file3.close()
    
    threads = []
    newline = lines_per_file
    for i in range(10):
        sfile1 = 'smallfile1_{}.txt'.format(newline)
        sfile2 = 'smallfile2_{}.txt'.format(newline)
        threads.append(threading.Thread(target=thread_sum, args=(sfile1,sfile2,)))
        threads[i].start()    
        threads[i].join()    
        newline = newline + lines_per_file

#__ main body __

# File generation time                     
start_time = time.time()
generate()
print("hugefile1 and hugefile2 generation time:")
print("--- %s seconds ---" % (time.time() - start_time))

# simple sum time                     
start_time = time.time()
simple_sum()
print("Simple sum time:")
print("--- %s seconds ---" % (time.time() - start_time))

# spliting large file into small file time
start_time = time.time()
break_to_10_files()
print("break huge files to 10 small files each in time:")
print("--- %s seconds ---" % (time.time() - start_time))

# multithreading sum time
start_time = time.time()
threaded_10_sum()
print("threaded sum of 20 small files in parallel time:")
print("--- %s seconds ---" % (time.time() - start_time))
