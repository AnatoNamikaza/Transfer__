
#include "common_vertex.h"

uniform mat4 g_ModelMatrix;
uniform mat4 g_ViewProjectionMatrix;
uniform vec3 g_EyePosition;

uniform float g_Time;

attribute vec3 a_Position;
attribute vec3 a_Normal;
attribute vec2 a_TexCoord;

varying vec3 v_Normal;

varying vec3 v_ViewDir;
varying vec2 v_TexCoord;

void main() {
	vec3 localPos = a_Position;
	vec3 localNormal = a_Normal;
	
	float timeOffset = frac(g_Time * 0.1);
	localPos.y += timeOffset * 0.5;
	
	vec2 xy = localPos.xz;
	vec2 rot2 = vec2(cos(timeOffset * 3.1416), sin(timeOffset * 3.1416));
	localPos.xz = vec2(localPos.x * rot2.x - localPos.z * rot2.y,
							localPos.x * rot2.y + localPos.z * rot2.x);
	localNormal.xz = vec2(localNormal.x * rot2.x - localNormal.z * rot2.y,
							localNormal.x * rot2.y + localNormal.z * rot2.x);
	
	vec4 worldPos = mul(vec4(localPos, 1.0), g_ModelMatrix);
	
	gl_Position = mul(worldPos, g_ViewProjectionMatrix);
	vec3 normal = normalize(mul(localNormal, CAST3X3(g_ModelMatrix)));
	
	v_TexCoord = a_TexCoord;
	v_ViewDir = g_EyePosition - worldPos.xyz;

	
	v_Normal = normal;
}
