
#include "common_fragment.h"

uniform lowp vec3 g_Tint; // {"material":"tint","default":"0.5 0.5 0.5"}

uniform sampler2D g_Texture0;

varying vec2 v_TexCoord;

void main() {
	float curveOpacity = texSample2D(g_Texture0, v_TexCoord.xy).a;
	
	vec4 albedo = vec4(g_Tint * curveOpacity, 1);
	gl_FragColor = albedo;
}
