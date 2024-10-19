
#include "common.h"

uniform mat4 g_ModelViewProjectionMatrix;
uniform vec2 g_TexelSize;
uniform lowp vec3 g_Tint; // {"material":"tint","default":"0.95 0.05 0.1"}

attribute vec3 a_Position;
attribute vec2 a_TexCoord;

varying vec2 v_TexCoord;
varying vec2 v_TexCoordGrunge;
varying vec3 v_BaseColor;

void main() {
	gl_Position = mul(vec4(a_Position, 1.0), g_ModelViewProjectionMatrix);
	v_TexCoord = a_TexCoord * 0.997;
	
	v_TexCoordGrunge = gl_Position.xy / gl_Position.w * 0.75;
	v_TexCoordGrunge *= vec2(g_TexelSize.y / g_TexelSize.x, 1.0);
	
	vec3 col = g_Tint;
	v_BaseColor = rgb2hsv(col);
	
#if DOTS
	v_TexCoord.x *= 2;
#endif
}
