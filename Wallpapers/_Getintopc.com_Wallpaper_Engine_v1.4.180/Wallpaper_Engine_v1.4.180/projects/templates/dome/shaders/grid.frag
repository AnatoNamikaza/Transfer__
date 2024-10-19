
#include "common_fragment.h"

// Possible combos

varying vec2 v_WorldPosition;
varying vec3 v_ScreenPos;
varying vec2 v_TexCoord;
varying vec3 v_HalfDir;

// Predefined values
uniform sampler2D g_Texture0;
uniform sampler2D g_Texture1;
uniform vec2 g_TexelSizeHalf;

// Material values

void main() {
	float blend = 1.0 - length(v_WorldPosition) / 3.0;
	vec3 bump = texSample2D(g_Texture0, v_TexCoord).rgb;
	//bump.yz = vec2(0.5);
	bump.yz = bump.yz * 2.0 - 1.0;
	
	vec2 screenUV = (v_ScreenPos.xy / v_ScreenPos.z) * 0.5 + 0.5;
#ifdef HLSL_SM30
	screenUV += g_TexelSizeHalf;
#endif
	
	vec3 albedo = texSample2D(g_Texture1, screenUV + bump.yz * 0.02).rgb;
	
	//albedo = vec3(bump.yz, 0) + albedo * 0.0001f;
	bump.x += 1.0;
	
	
	//vec3 viewDir = normalize(g_EyePosition - vec3(v_WorldPosition.x, 0.0f, v_WorldPosition.y));
	//vec3 halfDir = normalize(lightDir + viewDir);
	float specular = max(dot(normalize(v_HalfDir), normalize(vec3(-bump.y, 1.0, bump.z))), 0.0);
	specular = pow(specular, 100.0) * 0.2;
	
	blend = saturate(blend);
	gl_FragColor = vec4(albedo * bump.x + specular, blend);
}
