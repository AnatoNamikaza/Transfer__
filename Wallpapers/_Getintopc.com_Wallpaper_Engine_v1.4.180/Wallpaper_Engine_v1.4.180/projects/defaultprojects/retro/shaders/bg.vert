
#include "common_vertex.h"

uniform vec2 g_TexelSize;
uniform float g_Time;

attribute vec3 a_Position;
attribute vec2 a_TexCoord;

varying vec2 v_TexCoord;
varying vec2 v_TexCoordsPattern;
varying vec2 v_TexCoordGrunge;
varying vec4 v_TexCoordNoise;

void main() {
	vec2 pos2D = a_TexCoord * 2 - 1;
	
#if HLSL
	pos2D += g_TexelSize * vec2(-1, 1);
#endif

	
	gl_Position = vec4(pos2D, 0.5, 1);
	
	float texelRatio = g_TexelSize.y / g_TexelSize.x;
	
	v_TexCoord = a_TexCoord;
	
	v_TexCoordGrunge = gl_Position.xy / gl_Position.w * 0.75;
	v_TexCoordGrunge *= vec2(texelRatio, 1.0);
	
	v_TexCoordsPattern = a_TexCoord * 50 * vec2(texelRatio, 1.0);
	
	v_TexCoordNoise.xy = vec2(g_Time * 0.001, 0);
	v_TexCoordNoise.zw = vec2(frac(v_TexCoordNoise.x * 64.0), texelRatio);
}
