
#include "common_fragment.h"

uniform lowp vec3 g_Tint; // {"material":"tint","default":"0.95 0.85 0.7"}
uniform float g_Time;

uniform sampler2D g_Texture0;
uniform sampler2D g_Texture1;
uniform sampler2D g_Texture2;
uniform sampler2D g_Texture3;

varying vec2 v_TexCoord;
varying vec2 v_TexCoordsPattern;
varying vec2 v_TexCoordGrunge;
varying vec4 v_TexCoordNoise;

void main() {

	float circleScroll = g_Time * 0.3;
	float blendTime = frac(circleScroll);
	vec2 offset = CAST2(1.0 / 50.0);
	vec2 cloudsAligned = floor(v_TexCoordsPattern.xy + circleScroll - blendTime) / 50.0;
	
	float clouds = mix(texSample2D(g_Texture0, cloudsAligned.xy).a, texSample2D(g_Texture0, cloudsAligned.xy + offset).a, blendTime);
	//clouds += sin(circleScroll + v_TexCoord.x * 5) * 0.05;
	clouds = smoothstep(0.4, 0.7, clouds);
	
	float vignette = smoothstep(1, 0, length(v_TexCoord - 0.5));
	
	float pattern = texSample2D(g_Texture1, v_TexCoordsPattern.xy).a;
	
	
	
	vec2 center = vec2(texSample2D(g_Texture3, v_TexCoordNoise.xy).rg * 50);
	//center.x *= v_TexCoordNoise.w;
	float distToCenter = length((center - floor(v_TexCoordsPattern.xy)) / 50.0);
	distToCenter = distToCenter * 60 - 20 * v_TexCoordNoise.z;
	
	vec2 ringMapBlend = sin(vec2(max(0, distToCenter), v_TexCoordNoise.z * 3.141));
	clouds -= ringMapBlend.x * step(distToCenter, 3.141) * 0.5 * ringMapBlend.y;
	clouds = max(0.2, clouds);
	
	
	
	
	pattern = smoothstep(clouds - 0.1, clouds, pattern);
	
	vec3 albedo = pow(mix(g_Tint, g_Tint * 0.9, pattern), CAST3(1.0 / vignette));
	
	float alpha = 1.0;
	
	float grunge = texSample2D(g_Texture2, v_TexCoordGrunge.xy).a;
	albedo -= saturate(grunge - albedo);
	
	gl_FragColor = vec4(albedo, alpha);
}
