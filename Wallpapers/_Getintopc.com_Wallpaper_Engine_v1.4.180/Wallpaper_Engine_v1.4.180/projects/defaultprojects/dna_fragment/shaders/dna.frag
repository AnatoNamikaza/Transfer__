
#include "common_fragment.h"

uniform lowp vec3 g_Tint; // {"material":"tint","default":"0.5 0.5 0.5"}

uniform sampler2D g_Texture0;
varying vec3 v_Normal;

varying vec2 v_TexCoord;
varying vec3 v_ViewDir;

void main() {
	// Vars
	vec4 albedo = vec4(g_Tint * texSample2D(g_Texture0, v_TexCoord.xy).rgb, 1);
	
	vec3 viewDir = normalize(v_ViewDir);
	vec3 normal = normalize(v_Normal);
	float rimlight = 1.0 - dot(viewDir, normal);

	albedo.rgb *= 1.0 + rimlight;
	gl_FragColor = albedo;
}
