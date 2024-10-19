
attribute vec3 a_Position;
attribute vec2 a_TexCoord;

uniform mat4 g_ModelViewProjectionMatrix;

varying lowp vec3 domeColor;

uniform lowp vec3 g_Tint; // {"material":"tint","default":"0.315, 0.135, 0.1125"}

void main() {
	gl_Position = mul(vec4(a_Position, 1.0), g_ModelViewProjectionMatrix);
	domeColor = mix(g_Tint * 0.333, g_Tint, a_TexCoord.y);
}
