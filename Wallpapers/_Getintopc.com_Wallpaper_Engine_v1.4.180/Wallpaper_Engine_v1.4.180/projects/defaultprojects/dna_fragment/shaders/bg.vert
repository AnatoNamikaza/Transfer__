
#include "common_vertex.h"

uniform float g_Time;
uniform vec2 g_TexelSize;

attribute vec3 a_Position;
attribute vec2 a_TexCoord;

varying vec2 v_TexCoord;
varying vec4 a_TexCloudsCoord;
varying vec2 v_TexCoordPattern;

void main() {
	vec2 pos2D = a_TexCoord * 2 - 1;
	
#if HLSL
	pos2D += g_TexelSize * vec2(-1, 1);
#endif
	
	gl_Position = vec4(pos2D, 0.5, 1);
	v_TexCoord = a_TexCoord;
	
	a_TexCloudsCoord = vec4(a_TexCoord + g_Time * 0.03, a_TexCoord * 2 - g_Time * 0.0111);
	v_TexCoordPattern = a_TexCoord * 50 * vec2(g_TexelSize.y / g_TexelSize.x, 1.0);
}
