
// NORMALMAP: enable normal maps

#include "common_vertex.h"

uniform mat4 g_ModelMatrix;
uniform mat4 g_ViewProjectionMatrix;
uniform vec3 g_EyePosition;

attribute vec3 a_Position;
attribute vec3 a_Normal;
attribute vec4 a_Tangent4;
attribute mediump vec2 a_TexCoord;

varying vec3 v_Var0;
varying vec3 v_Var1;

varying mediump vec2 v_TexCoord;

void main() {
	vec4 worldPos = mul(vec4(a_Position, 1.0), g_ModelMatrix);
	gl_Position = mul(worldPos, g_ViewProjectionMatrix);
	v_TexCoord = a_TexCoord;
	
	vec3 lightDir = vec3(0.577350259, 0.577350259, 0.577350259);
	vec3 viewDir = g_EyePosition - worldPos.xyz;
	
#if NORMALMAP
	mat3 tangentSpace = BuildTangentSpace(CAST3X3(g_ModelMatrix), a_Normal, a_Tangent4);
	v_Var0 = mul(tangentSpace, lightDir);
	v_Var1 = mul(tangentSpace, viewDir);
#else
	v_Var0 = mul(a_Normal, CAST3X3(g_ModelMatrix));
	v_Var1 = lightDir + viewDir;
#endif
}
