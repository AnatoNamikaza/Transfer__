
#include "common_fragment.h"

varying vec2 v_TexCoord;

uniform float g_Time;
uniform vec3 g_ColorSunTop; // {"material":"colorsuntop","default":"1 0.85 0.05","type":"color"}
uniform vec3 g_ColorSunBottom; // {"material":"colorsunbottom","default":"1 0 0.35","type":"color"}

void main() {
	float sunSize = 0.05;
	float sunSizeSqrt = sqrt(sunSize);
	float blendSunColor = (v_TexCoord.y + sunSize * 2.5) / sunSizeSqrt;
	vec4 colorSun = vec4(mix(g_ColorSunTop, g_ColorSunBottom, blendSunColor), 0);
	float sunRadius = dot(v_TexCoord.xy, v_TexCoord.xy);
	colorSun.a = 1.0 - step(0.05, sunRadius);
	float glowAlpha = pow(smoothstep(0.08, 0.045, sunRadius), 2);
	
	float barPos = v_TexCoord.y + 0.1;
	//float sunCutOut = 1.0 - saturate(step(0, barPos) * step(1.0 - barPos * 8, sin(barPos * 200 + g_Time)));
	float sunCutOut = 1.0 - saturate(smoothstep(0, 0.005, barPos) * smoothstep(1.0 - barPos * 9, 1.0 - barPos * 8, sin(barPos * 200 + g_Time)));
	float sunCutOutSmooth = 1.0 - saturate(smoothstep(0, 0.05, barPos) * smoothstep(-1.0 - barPos * 8, 1.0 - barPos * 8, sin(barPos * 200 + g_Time)));
	
	gl_FragColor.rgb = g_ColorSunBottom;
	gl_FragColor.rgb = mix(gl_FragColor.rgb, colorSun.rgb, colorSun.a * sunCutOut);
	
	gl_FragColor.a = max(glowAlpha * sunCutOutSmooth, colorSun.a * sunCutOut);
}
