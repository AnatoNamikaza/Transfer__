
uniform mat4 g_ViewProjectionMatrix;
uniform vec3 g_EyePosition;

attribute vec3 a_Position;
attribute vec2 a_TexCoord;

varying mediump vec2 v_TexCoord;

void main() {
	gl_Position = mul(vec4(a_Position + g_EyePosition, 1.0), g_ViewProjectionMatrix);
	v_TexCoord = a_TexCoord;
}
