
#include "common_vertex.h"

uniform mat4 g_ModelViewProjectionMatrix;
uniform float g_CurveSpeed; // {"material":"Scroll speed","default":0,"range":[-1,1]}
uniform float g_CurveFreq; // {"material":"Freq","default":0,"range":[1,3]}

uniform float g_Time;

attribute vec3 a_Position;
attribute vec2 a_TexCoord;

varying vec2 v_TexCoord;

void main() {
	gl_Position = mul(vec4(a_Position, 1.0), g_ModelViewProjectionMatrix);
	v_TexCoord = a_TexCoord * vec2(1, g_CurveFreq) + vec2(0.0, g_Time * g_CurveSpeed * 0.1);
}
