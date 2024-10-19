
#include "common_fragment.h"

uniform vec3 g_Color;
uniform float g_Alpha;

uniform sampler2D g_Texture0;

varying vec3 v_TexCoord;

void main() {
#if COLORFONT
	vec4 sample = texSample2D(g_Texture0, v_TexCoord.xy);
	gl_FragColor = vec4(sample.rgb * mix(CAST3(1.0), g_Color, v_TexCoord.z), sample.a * g_Alpha);
#else
	float sample = ConvertSampleR8(texSample2D(g_Texture0, v_TexCoord.xy));
	gl_FragColor = vec4(g_Color, sample * g_Alpha);
#endif
}
