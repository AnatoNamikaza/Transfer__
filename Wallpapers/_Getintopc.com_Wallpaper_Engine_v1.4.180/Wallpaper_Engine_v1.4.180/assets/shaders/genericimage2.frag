
#include "common_fragment.h"

uniform sampler2D g_Texture0; // {"material":"Albedo"}

#ifndef VERSION
uniform float g_Brightness; // {"material":"Brightness","label":"ui_editor_properties_brightness","default":1,"range":[0,2]}
uniform float g_UserAlpha; // {"material":"Alpha","label":"ui_editor_properties_alpha","default":1,"range":[0,1]}
#else
uniform float g_Alpha;
uniform vec3 g_Color;
#endif

varying vec2 v_TexCoord;

void main() {
	vec2 texCoord = v_TexCoord.xy;
	vec4 color = texSample2D(g_Texture0, texCoord);

#ifndef VERSION
	color.rgb *= g_Brightness;
	color.a *= g_UserAlpha;
#else
	color.rgb *= g_Color;
	color.a *= g_Alpha;
#endif

	gl_FragColor = color;
}
