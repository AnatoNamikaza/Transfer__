
varying mediump vec4 v_TexCoord;

uniform sampler2D g_Texture0;

void main() {
	float amt = texSample2D(g_Texture0, v_TexCoord.xy).r;
	amt *= texSample2D(g_Texture0, v_TexCoord.zw).r;
	
	vec3 color = mix(vec3(0.6, 0.5, 0.4), vec3(0.1, 0.3, 1.0), amt);
	
	gl_FragColor = vec4(color, amt);
}
