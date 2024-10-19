
#include "common_fragment.h"

uniform sampler2D g_Texture0;
uniform sampler2D g_Texture1;

uniform float g_Brightness; // {"material":"Bright","default":1,"range":[0,2]}
uniform float g_Time;
uniform float g_SwaySpeed; // {"material":"Speed","default":1,"range":[0.01, 1]}
uniform float g_SwayAmp; // {"material":"Amount","default":1,"range":[0.01, 1]}

varying vec2 v_TexCoord;

void main() {
	//vec2 flowMask = (texSample2D(g_Texture1, v_TexCoord.xy).rg - vec2(0.506, 0.482)) * 2.0;
	
	//vec2 cycles = vec2(frac(g_Time * g_FlowSpeed), frac(g_Time * g_FlowSpeed + 0.5));
	//float blend = 2 * abs(cycles.x - 0.5);
	
	vec3 swayMask = texSample2D(g_Texture1, v_TexCoord.xy).rgb;
	
	float phase = v_TexCoord.x * 10 + swayMask.b; //(v_TexCoord.x * 10 + v_TexCoord.y + swayMask.b) * 10;
	vec4 baseTime = vec4(g_Time * 30.0, g_Time * 27.0, g_Time * 21.0, g_Time * 7.0) * g_SwaySpeed + phase;
	vec4 sines = sin(baseTime);
	
	float amt = dot(sines, vec4(1, 1, 1, 1));
	
	vec2 swayOffset = swayMask.xy * amt * g_SwayAmp * 0.01;

	vec4 albedo = texSample2D(g_Texture0, v_TexCoord.xy + swayOffset);
	
	albedo.rgb *= g_Brightness;
	//albedo.a *= g_UserAlpha;
	//albedo.rgb = pow(albedo.rgb, g_Power);
	
	gl_FragColor = albedo;
}
