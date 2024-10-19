
uniform mat4 g_ViewProjectionMatrix;
uniform vec3 g_EyePosition;
uniform float g_Time;

attribute vec3 a_Position;
attribute vec2 a_TexCoord;

varying mediump vec4 v_TexCoord;
varying float v_Alpha;

void main() {
	vec3 position = a_Position;
	
	position.x += sin(0.1 * g_Time + a_TexCoord.x * 5) * 0.05;
	position.y += sin(0.1 * g_Time + a_TexCoord.x * 3) * 0.02;
	
	gl_Position = mul(vec4(position + g_EyePosition, 1.0), g_ViewProjectionMatrix);
	
	v_TexCoord.xy = a_TexCoord;
	v_TexCoord.x *= 5.7;
	v_TexCoord.x += frac(g_Time * 0.05);
	
	v_TexCoord.zw = a_TexCoord.xx;
	v_TexCoord.z *= 0.5;
	v_TexCoord.w *= 8.3;
	v_TexCoord.z += frac(g_Time * 0.04);
	v_TexCoord.w -= frac(g_Time * 0.03);
	
	v_Alpha = smoothstep(0.0, 0.1, a_TexCoord.x) * smoothstep(1.0, 0.9, a_TexCoord.x) * 0.6;
}
