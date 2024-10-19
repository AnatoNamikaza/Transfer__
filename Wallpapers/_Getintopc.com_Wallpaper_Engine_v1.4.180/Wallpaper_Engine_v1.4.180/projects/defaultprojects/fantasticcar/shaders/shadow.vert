
attribute vec3 a_Position;
attribute vec2 a_TexCoord;

uniform mat4 g_ModelViewProjectionMatrix;

varying mediump float shadowAlpha;

void main() {
	gl_Position = mul(vec4(a_Position, 1.0), g_ModelViewProjectionMatrix);
	shadowAlpha = pow(1.0 - a_TexCoord.y, 2.0) * 0.8;
}
