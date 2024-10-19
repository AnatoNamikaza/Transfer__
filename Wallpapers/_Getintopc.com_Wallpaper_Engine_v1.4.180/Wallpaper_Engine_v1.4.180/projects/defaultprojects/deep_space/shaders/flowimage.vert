
#include "common_vertex.h"

uniform mat4 g_ModelViewProjectionMatrix;
uniform float g_Time;

uniform float g_FlowSpeed0; // {"material":"Speed0","default":0.01,"range":[0.01, 1]}
uniform float g_FlowSpeed1; // {"material":"Speed1","default":0.01,"range":[0.01, 1]}
uniform float g_FlowSpeed2; // {"material":"Speed2","default":0.01,"range":[0.01, 1]}
uniform float g_FlowSpeed3; // {"material":"Speed3","default":0.01,"range":[0.01, 1]}
//uniform float g_FlowSpeed4; // {"material":"Speed4","default":0.01,"range":[0.01, 1]}
//uniform float g_FlowSpeed5; // {"material":"Speed5","default":0.01,"range":[0.01, 1]}

attribute vec3 a_Position;
attribute vec2 a_TexCoord;

varying vec2 v_TexCoord;
varying vec4 v_Cycles01;
varying vec4 v_Cycles23;
//varying vec4 v_Cycles45;
varying vec4 v_Blend0123;
//varying vec2 v_Blend45;

void main() {
	gl_Position = mul(vec4(a_Position, 1.0), g_ModelViewProjectionMatrix);
	v_TexCoord = a_TexCoord;
	
	
	v_Cycles01.xy = vec2(frac(g_Time * g_FlowSpeed0), frac(g_Time * g_FlowSpeed0 + 0.5));
	v_Blend0123.x = 2 * abs(v_Cycles01.x - 0.5);
	
	v_Cycles01.zw = vec2(frac(g_Time * g_FlowSpeed1), frac(g_Time * g_FlowSpeed1 + 0.5));
	v_Blend0123.y = 2 * abs(v_Cycles01.z - 0.5);
	
	v_Cycles23.xy = vec2(frac(g_Time * g_FlowSpeed2 + 0.3333), frac(g_Time * g_FlowSpeed2 + 0.5 + 0.3333));
	v_Blend0123.z = 2 * abs(v_Cycles23.x - 0.5);
	
	v_Cycles23.zw = vec2(frac(g_Time * g_FlowSpeed3 + 0.71), frac(g_Time * g_FlowSpeed3 + 0.5 + 0.71));
	v_Blend0123.w = 2 * abs(v_Cycles23.z - 0.5);
	
	//v_Cycles45.xy = vec2(frac(g_Time * g_FlowSpeed4), frac(g_Time * g_FlowSpeed4 + 0.5));
	//v_Blend45.x = 2 * abs(v_Cycles45.x - 0.5);
	//
	//v_Cycles45.zw = vec2(frac(g_Time * g_FlowSpeed5), frac(g_Time * g_FlowSpeed5 + 0.5));
	//v_Blend45.y = 2 * abs(v_Cycles45.z - 0.5);
}
