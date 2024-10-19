
// [COMBO] {"material":"ui_editor_properties_shading","combo":"SHADING","type":"options","default":1}
// [COMBO] {"material":"ui_editor_properties_blend_mode","combo":"BLENDMODE","type":"imageblending","default":0}
// [COMBO] {"material":"ui_editor_properties_write_alpha","combo":"WRITEALPHA","type":"options","default":0}

#include "common.h"
#include "common_blending.h"

varying vec4 v_TexCoord;

uniform sampler2D g_Texture1; // {"material":"ui_editor_properties_albedo","default":"clouds_512"}

uniform vec3 g_Color1; // {"material":"clouds","default":"0.05 0.15 0.4","type":"color"}
uniform vec3 g_ColorHorizon; // {"material":"horizon","default":"0.05 0.15 0.4","type":"color"}

uniform float g_Time;

varying vec4 v_TexCoordClouds;

void main() {
	vec3 albedo = vec3(0, 0, 0);
	vec4 cloudTexCoods = v_TexCoordClouds;
	
	float cloud0 = texSample2D(g_Texture1, cloudTexCoods.xy).r;
	float cloud1 = texSample2D(g_Texture1, cloudTexCoods.zw).r;
	
	float cloudBlend = cloud0 * cloud1;

	albedo = g_Color1 * cloudBlend;
	
	albedo += (g_Color1 * 0.5 + albedo) * pow(smoothstep(0.5, 0.0, v_TexCoord.y), 2) * 2;
	
	float horizonBend = 1.0 - cos(saturate(v_TexCoord.x * 2 - 0.5) * 2 * M_PI);
	vec2 horizonDelta = (v_TexCoord.xy - vec2(0.5, 0.6)) * vec2(0.5, 1.5 - horizonBend * 0.3);
	float distanceToCenter = length(horizonDelta);
	albedo += g_ColorHorizon * pow(smoothstep(0.5, 0.0, distanceToCenter), 2) * 2;
	
	gl_FragColor.a = 1.0;
	gl_FragColor.rgb = albedo;
}
