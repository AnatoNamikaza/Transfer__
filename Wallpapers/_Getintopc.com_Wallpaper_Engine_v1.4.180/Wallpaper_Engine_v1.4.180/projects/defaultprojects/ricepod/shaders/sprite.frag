
uniform sampler2D g_Texture0;
uniform float g_Alpha;

varying vec2 v_TexCoord;

void main() {
	vec4 color = texSample2D(g_Texture0, v_TexCoord);
	color.a *= g_Alpha;
	gl_FragColor = color;
}