
#include "common_fragment.h"

uniform sampler2D g_Texture0;
uniform sampler2D g_Texture1;
uniform sampler2D g_Texture2;
uniform sampler2D g_Texture3;
uniform sampler2D g_Texture4;
uniform sampler2D g_Texture5;
uniform sampler2D g_Texture6;

uniform float g_Brightness; // {"material":"Bright","default":1,"range":[0,2]}
uniform float g_Time;
uniform float g_FlowAmp; // {"material":"Amount","default":1,"range":[0.01, 1]}

varying vec2 v_TexCoord;
varying vec4 v_Cycles01;
varying vec4 v_Cycles23;
//varying vec4 v_Cycles45;
varying vec4 v_Blend0123;
//varying vec2 v_Blend45;

void blendLayers(vec4 samp, inout vec4 albedo) {
	albedo.rgb = mix(albedo.rgb, samp.rgb, samp.a);
	albedo.a = max(albedo.a, samp.a);
}

void main() {
	vec3 flowColors = texSample2D(g_Texture0, v_TexCoord.xy).rgb;
	vec2 flowMask = (flowColors.rg - vec2(0.5, 0.5)) * 2.0;
	
	vec4 flowUVOffset0 = vec4(flowMask * g_FlowAmp * 0.1 * v_Cycles01.x, flowMask * g_FlowAmp * 0.1 * v_Cycles01.y);
	vec4 flowUVOffset1 = vec4(flowMask * g_FlowAmp * 0.1 * v_Cycles01.z, flowMask * g_FlowAmp * 0.1 * v_Cycles01.w);
	vec4 flowUVOffset2 = vec4(flowMask * g_FlowAmp * 0.1 * v_Cycles23.x, flowMask * g_FlowAmp * 0.1 * v_Cycles23.y);

	vec4 albedo = mix(texSample2D(g_Texture1, v_TexCoord.xy + flowUVOffset0.xy),
					texSample2D(g_Texture1, v_TexCoord.xy + flowUVOffset0.zw),
					v_Blend0123.x);
					
	blendLayers(mix(texSample2D(g_Texture2, v_TexCoord.xy + flowUVOffset1.xy),
					texSample2D(g_Texture2, v_TexCoord.xy + flowUVOffset1.zw),
					v_Blend0123.y), albedo);
	blendLayers(mix(texSample2D(g_Texture3, v_TexCoord.xy + flowUVOffset2.xy),
					texSample2D(g_Texture3, v_TexCoord.xy + flowUVOffset2.zw),
					v_Blend0123.z), albedo);

	albedo.rgb *= g_Brightness;
	gl_FragColor = albedo;
}
