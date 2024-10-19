
attribute vec3 a_Position;
attribute vec2 a_TexCoord;

uniform mat4 g_ModelViewProjectionMatrix;
uniform float g_Time;

varying lowp vec3 v_Color;
varying mediump vec2 v_TexCoord;

uniform lowp vec3 g_Tint; // {"material":"tint","default":"1 1 1"}

void main() {
	v_TexCoord = a_TexCoord;
	v_Color = g_Tint * (sin(g_Time) * 0.5 + 0.5);
	gl_Position = mul(vec4(a_Position, 1.0), g_ModelViewProjectionMatrix);
}
