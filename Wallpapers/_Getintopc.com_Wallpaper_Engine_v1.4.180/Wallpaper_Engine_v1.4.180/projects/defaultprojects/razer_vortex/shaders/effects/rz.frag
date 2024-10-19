
// [COMBO] {"material":"ui_editor_properties_blend_mode","combo":"HUEMODE","type":"options","default":0,"options":{"normal":0,"center":1}}

#include "common_blending.h"

varying vec4 v_TexCoord;
varying vec2 v_Scroll;

uniform sampler2D g_Texture0; // {"material":"framebuffer", "label":"ui_editor_properties_framebuffer", "hidden":true}
uniform sampler2D g_Texture1; // {"material":"mask", "label":"ui_editor_properties_opacity_mask","mode":"opacitymask","default":"util/white","paintdefaultcolor":"0 0 0 1"}

uniform float g_Brightness; // {"material":"brightness", "label":"ui_editor_properties_brightness","default":1,"range":[0,10]}
uniform float g_Length; // {"material":"length", "label":"ui_editor_properties_length","default":1,"range":[0,2]}
uniform float g_CMode; // {"material":"colormode", "label":"ui_editor_properties_color","default":1,"range":[0,2]}

void main() {
	vec4 albedo = texSample2D(g_Texture0, v_TexCoord.xy);
	
	vec3 col = albedo.rgb;
	albedo.rgb = vec3(1.0, 1.4, 1.0) * albedo.rrb;
	
	
	vec4 huePos = v_TexCoord;
	
#if HUEMODE
	huePos.xy = huePos.zw = CAST2(0.5);
#endif
	
	vec2 circleUV = vec2(0.5, 0.5) - (huePos.zw);
	circleUV.x = length(circleUV) * g_Length;
	circleUV.x -= v_Scroll.x;
	circleUV.x = frac(circleUV.x);
	circleUV.y = 0;
	
	vec2 scrollUV = huePos.xy + v_Scroll;
	vec2 centerUV = vec2(v_Scroll.x, 0.0);
	
	float circleActive = step(g_CMode, 0.1);
	float centerActive = step(1.1, g_CMode);
	float scrollActive = (1.0 - centerActive) * (1.0 - circleActive);
	
	centerUV *= centerActive;
	scrollUV *= scrollActive;
	circleUV *= circleActive;
	
	vec3 lighting = texSample2D(g_Texture1, centerUV + scrollUV + circleUV).rgb;
	

	albedo.rgb += col.ggg * lighting * g_Brightness;
	
	//albedo.a = 1.0;
	
	gl_FragColor = albedo;
}
