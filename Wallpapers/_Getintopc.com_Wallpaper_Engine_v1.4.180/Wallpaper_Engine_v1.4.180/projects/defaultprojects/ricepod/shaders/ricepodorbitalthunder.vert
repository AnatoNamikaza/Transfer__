
uniform mat4 g_ViewProjectionMatrix;
uniform vec3 g_EyePosition;
uniform float g_Time;

attribute vec3 a_Position;
attribute vec2 a_TexCoord;

varying mediump vec4 v_TexCoord;

void main() {
	gl_Position = mul(vec4(a_Position + g_EyePosition, 1.0), g_ViewProjectionMatrix);
	
	v_TexCoord.xy = a_TexCoord * 0.777;
	v_TexCoord.wz = a_TexCoord * 0.3;
	
	v_TexCoord.z += sin((1.7 + g_Time) * 0.1);
	v_TexCoord.w += cos(g_Time * 0.22);
}
