
uniform sampler2D g_Texture0;
uniform sampler2D g_Texture1;

uniform float g_Time;
uniform lowp vec3 g_Tint; // {"material":"tint","default":"1 1 1"}
uniform lowp vec3 g_TintAccent; // {"material":"tintaccent","default":"1 1 1"}

varying mediump float v_Dot;
//varying mediump float v_Flow;
varying mediump vec2 v_TexCoord;
varying mediump vec4 v_TexCoordAnim;

void main() {

	vec3 albedo = texSample2D(g_Texture0, v_TexCoord).rgb;
	albedo.r += step(0.01, albedo.r) * step(albedo.r, 0.9) * 5 * v_Dot;

	vec3 result = albedo.rrr * g_Tint;
	
	float accent = pow(albedo.g, 1.5);
	float modulate = texSample2D(g_Texture1, v_TexCoordAnim.xy).r * texSample2D(g_Texture1, v_TexCoordAnim.zw).r;
	modulate = smoothstep(0.05, 0.12, modulate) * 2;
	
	float flash = texSample2D(g_Texture1, v_TexCoordAnim.xy * 2).r - texSample2D(g_Texture1, v_TexCoordAnim.zw).r;
	flash = smoothstep(0.19, 0.2, flash) * albedo.r;
	
	result += modulate * accent * g_Tint;
	
	result = mix(result, g_TintAccent * 1.5, flash);
	//result += flash * v_Dot * g_TintAccent;
	
	//result += g_TintAccent * albedo.b * 0.1 * smoothstep(0.95, 1.0, v_Flow);
	
	gl_FragColor = vec4(result * v_Dot, 1.0);
}
