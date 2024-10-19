
varying mediump vec2 v_TexCoord;
varying float v_Alpha;

uniform sampler2D g_Texture0;

void main() {
	vec3 color = texSample2D(g_Texture0, v_TexCoord).rgb;
	
	color *= v_TexCoord.y * v_Alpha;
	
	gl_FragColor = vec4(color, 1.0);
}
