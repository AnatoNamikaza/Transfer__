
#include "common_vertex.h"

//uniform mat4 g_ModelMatrix;
uniform mat4 g_ModelViewProjectionMatrix;
uniform float g_Time;


attribute vec3 a_Position;
// attribute vec3 a_Normal;
attribute vec2 a_TexCoord;

varying vec2 v_TexCoord;
//varying vec4 v_TexCoordPattern;
varying vec2 v_TexCoordPattern;
varying vec4 v_TexCoordNoise;
varying vec4 v_TexCoordClouding;

void main() {
	//vec4 worldPos = mul(vec4(a_Position, 1.0), g_ModelMatrix);
	
	gl_Position = mul(vec4(a_Position, 1.0), g_ModelViewProjectionMatrix);
	//v_TexCoord = vec4(a_TexCoord, a_TexCoord * 200);
	
	v_TexCoord = a_TexCoord;
	v_TexCoordPattern.xy = a_TexCoord * vec2(200, 100) + vec2(g_Time * 0.2, 0.0);
	//v_TexCoordPattern.zw = a_TexCoord * vec2(20, 10) + vec2(g_Time * 0.02, 0.0);
	v_TexCoordNoise = vec4(a_TexCoord * 2 + g_Time * 0.007, a_TexCoord * 4 + g_Time * -0.005);
	v_TexCoordClouding = vec4(a_TexCoord  + g_Time * 0.01, a_TexCoord  + g_Time * -0.005);
}
