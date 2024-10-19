
#include "common_vertex.h"

uniform mat4 g_ModelMatrix;
uniform mat4 g_ViewProjectionMatrix;

attribute vec3 a_Position;
attribute vec2 a_TexCoord;

varying vec2 v_TexCoord;

void main() {
	vec4 worldPos = mul(vec4(a_Position, 1.0), g_ModelMatrix);
	gl_Position = mul(worldPos, g_ViewProjectionMatrix);
	
	v_TexCoord.xy = (a_TexCoord * 2 - 1) * 0.3;
}
