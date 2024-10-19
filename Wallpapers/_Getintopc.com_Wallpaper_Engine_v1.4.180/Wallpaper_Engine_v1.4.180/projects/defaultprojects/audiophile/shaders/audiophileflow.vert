
attribute vec3 a_Position;
attribute vec2 a_TexCoord;

uniform mat4 g_ModelViewProjectionMatrix;
uniform float g_Time;

varying lowp vec3 color;
varying mediump vec4 v_TexCoord;

uniform lowp vec3 g_Tint; // {"material":"tint","default":"1 1 1"}

void main() {
	float fade = 1.0 - abs((a_TexCoord.x - 0.5) * 2);
	
	color = g_Tint * fade * 0.25;
	
	vec3 position = a_Position;
	position.x += sin(position.y + g_Time * 0.1) * 0.1;
	position.y += cos(position.x + g_Time * 0.05) * 0.1;
	gl_Position = mul(vec4(position, 1.0), g_ModelViewProjectionMatrix);
	
	v_TexCoord.xy = a_TexCoord;
	v_TexCoord.zw = a_TexCoord;
	
	v_TexCoord.y *= 15;
	v_TexCoord.y += g_Time * 0.006;
	v_TexCoord.w *= 14;
	v_TexCoord.w -= g_Time * 0.0133;
	v_TexCoord.z -= g_Time * 0.007;
}
