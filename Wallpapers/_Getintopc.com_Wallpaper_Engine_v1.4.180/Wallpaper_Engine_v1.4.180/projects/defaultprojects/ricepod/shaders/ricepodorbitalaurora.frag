
varying mediump vec4 v_TexCoord;
varying float v_Alpha;

uniform sampler2D g_Texture0;

void main() {
	vec3 color = texSample2D(g_Texture0, v_TexCoord.xy).rgb;
	vec3 color2 = texSample2D(g_Texture0, v_TexCoord.wy).rgb;
	
	vec3 blend = texSample2D(g_Texture0, v_TexCoord.zy).rgb;
	
	color = mix(color * color2, blend, blend.r);
	
	gl_FragColor = vec4(color, v_Alpha);
}
