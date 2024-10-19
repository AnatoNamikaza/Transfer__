
uniform sampler2D g_Texture0;

varying lowp vec3 color;
varying mediump vec2 v_TexCoord;

void main() {

	vec3 result = texSample2D(g_Texture0, v_TexCoord).rgb;

	gl_FragColor = vec4(result * color, 1.0);
}
