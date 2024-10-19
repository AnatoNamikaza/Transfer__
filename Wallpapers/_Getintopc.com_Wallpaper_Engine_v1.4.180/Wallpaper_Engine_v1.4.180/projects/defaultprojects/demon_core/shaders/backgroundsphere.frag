
#include "common_fragment.h"

uniform sampler2D g_Texture0;
uniform sampler2D g_Texture1;
uniform sampler2D g_Texture2;
uniform lowp vec3 g_Tint; // {"material":"tint","default":"1 1 1"}
uniform lowp vec3 g_Tint2; // {"material":"tint2","default":"0 0 0"}

varying vec2 v_TexCoord;
//varying vec4 v_TexCoordPattern;
varying vec2 v_TexCoordPattern;
varying vec4 v_TexCoordNoise;
varying vec4 v_TexCoordClouding;

void main() {

	float diamondPattern = texSample2D(g_Texture0, v_TexCoordPattern.xy).r;
	vec3 fadeColor = g_Tint2;
	
	float diamondBlend = abs(v_TexCoord.y - 0.5) * 0.8;
	diamondBlend = smoothstep(0.2, 0.0, diamondBlend);
	
	float noiseA = texSample2D(g_Texture1, v_TexCoordNoise.xy).r;
	float noiseB = texSample2D(g_Texture1, v_TexCoordNoise.zw).r;
	
	vec2 noiseBase = vec2(0.3, 0.25);
	float coreNoise = smoothstep(noiseA, noiseB, 0.3);
	float noise = smoothstep(noiseBase.y, noiseBase.x, noiseA * noiseB) * smoothstep(noiseBase.x, noiseBase.y, noiseA * noiseB);
	noise = coreNoise * noise * 4; // + noiseA * noiseB;
	
	float cloudLevel = texSample2DLod(g_Texture1, v_TexCoordClouding.xy, 3).r * texSample2DLod(g_Texture1, v_TexCoordClouding.zw, 2).r * 1.1;
	float cloudBlend = abs(v_TexCoord.y - 0.5);
	cloudLevel *= 0.5 - cloudBlend;
	
	float hashPattern = texSample2D(g_Texture2, v_TexCoordPattern.xy).a;
	
	//vec3 albedo = fadeColor + cloudLevel; // + diamondPattern * diamondBlend * noise * g_Tint + cloudLevel;
	//albedo = mix(albedo, albedo * g_Tint, smoothstep(0.2, 0.02, cloudLevel));
	
	vec3 albedo = mix(cloudLevel + g_Tint2, (cloudLevel + vec3(0.5, 0.5, 0.5)) * g_Tint, smoothstep(0.2, 0.02, cloudLevel));
	
	diamondBlend = diamondBlend * diamondPattern * noise + diamondBlend * noise * 0.2;
	albedo = mix(albedo, diamondBlend * g_Tint * 10, diamondBlend);
	
	hashPattern *= smoothstep(0.2, 0.02, cloudLevel) * smoothstep(0.02, 0.2, cloudLevel);
	
	//albedo = cloudLevel.rrr;
	
	gl_FragColor = vec4(albedo + hashPattern * 0.1, 1);

}
