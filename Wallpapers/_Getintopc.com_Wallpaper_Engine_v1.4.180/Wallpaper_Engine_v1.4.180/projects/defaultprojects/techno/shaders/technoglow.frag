
uniform sampler2D g_Texture0;

varying lowp vec3 v_Color;
varying mediump vec2 v_TexCoord;

void main() {

	float glow = texSample2D(g_Texture0, v_TexCoord).r;
	glow = pow(glow, 5);
	vec3 result = mix(v_Color * glow, vec3(glow, glow, glow), glow);

	gl_FragColor = vec4(result, 1.0);
}
