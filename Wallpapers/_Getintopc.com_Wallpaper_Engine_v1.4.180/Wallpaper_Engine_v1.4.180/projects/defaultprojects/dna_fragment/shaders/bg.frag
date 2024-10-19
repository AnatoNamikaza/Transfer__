
#include "common_fragment.h"

uniform lowp vec3 g_Tint; // {"material":"tint","default":"0.5 0.5 0.5"}
uniform lowp vec3 g_Tint2; // {"material":"tint2","default":"0.5 0.5 0.5"}

uniform sampler2D g_Texture0;
uniform sampler2D g_Texture1;

varying vec2 v_TexCoord;
varying vec4 a_TexCloudsCoord;
varying vec2 v_TexCoordPattern;

void main() {
	
	float clouds = pow(texSample2D(g_Texture0, a_TexCloudsCoord.xy).a *
					texSample2D(g_Texture0, a_TexCloudsCoord.zw).a * 1.4, 2);
	float vignette = smoothstep(1.2, 0, length(v_TexCoord - 0.5)) * 2;
	
	float pattern = texSample2D(g_Texture1, v_TexCoordPattern.xy).a * 0.1;
	pattern *= smoothstep(0.1, 0.7, length(v_TexCoord - 0.5));
	
	vec3 albedo = mix(g_Tint, g_Tint2, v_TexCoord.y * v_TexCoord.y) * ( clouds + pattern ) * vignette;
	
	float alpha = 1.0;
	
#if GRADIENT_FADE
	alpha = smoothstep( 0.2, 0.45, abs(v_TexCoord.y - 0.5));
#endif
	
	gl_FragColor = vec4(albedo, alpha);
}
