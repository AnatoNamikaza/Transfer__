
#include "common_fragment.h"

uniform vec4 g_LightsColorRadius[4];

uniform float g_Metallic; // {"material":"Metal","default":0,"range":[0,1]}
uniform float g_Roughness; // {"material":"Rough","default":0,"range":[0,1]}
uniform float g_Light; // {"material":"Light","default":0,"range":[0,1]}
uniform lowp vec3 g_Tint; // {"material":"tint","default":"1 1 1"}

uniform sampler2D g_Texture0;
varying vec3 v_Normal;

varying vec2 v_TexCoord;
varying vec3 v_ViewDir;
varying vec4 v_Light0DirectionL3X;
varying vec4 v_Light1DirectionL3Y;
varying vec4 v_Light2DirectionL3Z;
varying vec3 v_LightAmbientColor;
varying float v_LightScale;

void main() {
	// Vars
	vec4 albedo = vec4(g_Tint, 1); // texSample2D(g_Texture0, v_TexCoord.xy);
	vec3 specularResult = vec3(0, 0, 0);
	
	
	vec3 viewDir = normalize(v_ViewDir);
	float specularPower = ComputeMaterialSpecularPower(g_Roughness, g_Metallic);
	float specularStrength = ComputeMaterialSpecularStrength(g_Roughness, g_Metallic);
	
	vec3 normal = normalize(v_Normal);
	
	// Compute fragment
	vec3 light = ComputeLightSpecular(normal, v_Light0DirectionL3X.xyz, g_LightsColorRadius[0].rgb, g_LightsColorRadius[0].w, viewDir, specularPower, specularStrength, g_Light, g_Metallic, specularResult);
	

	//light += ComputeLightSpecular(normal, v_Light1DirectionL3Y.xyz, g_LightsColorRadius[1].rgb, g_LightsColorRadius[1].w, viewDir, specularPower, specularStrength, g_Light, g_Metallic, specularResult);
	
	//light += ComputeLightSpecular(normal, v_Light2DirectionL3Z.xyz, g_LightsColorRadius[2].rgb, g_LightsColorRadius[2].w, viewDir, specularPower, specularStrength, g_Light, g_Metallic, specularResult);
	
	//light += ComputeLightSpecular(normal, vec3(v_Light0DirectionL3X.w, v_Light1DirectionL3Y.w, v_Light2DirectionL3Z.w), g_LightsColorRadius[3].rgb, g_LightsColorRadius[3].w, viewDir, specularPower, specularStrength, g_Light, g_Metallic, specularResult);

	light += v_LightAmbientColor;
	albedo.rgb = albedo.rgb * light * v_LightScale + specularResult;

	gl_FragColor = albedo;
}
