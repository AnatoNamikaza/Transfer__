
#include "common.h"

uniform sampler2D g_Texture0;
uniform sampler2D g_Texture1;
uniform float g_Time;

varying vec2 v_TexCoord;
varying vec2 v_TexCoordGrunge;
varying vec3 v_BaseColor;


void main() {
	vec2 baseUV = v_TexCoord;
	
#if DOTS
	baseUV.x -= g_Time * 0.02;
#endif

	vec4 col = texSample2D(g_Texture0, baseUV.xy);
	float grunge = texSample2D(g_Texture1, v_TexCoordGrunge.xy).a;
	vec4 albedo = col;
	
	
	vec3 hsv = v_BaseColor;
	hsv.x += albedo.g * 0.11;
	hsv.z *= albedo.b;
	albedo.rgb = hsv2rgb(hsv);
	
	albedo.rgb -= saturate(grunge - albedo.rgb);
	
#if DOTS
	float stepOffset = ceil(v_TexCoord.y * 4) * 0.24;
	albedo.a *= step(v_TexCoord.x, 1.1 + stepOffset);
	
	float kernelSize = smoothstep(0.1, 1.0, v_TexCoord.x - stepOffset) * 1.1;
	albedo.a *= smoothstep(kernelSize - 0.15, kernelSize, col.r);
#endif

	gl_FragColor = albedo;
}
