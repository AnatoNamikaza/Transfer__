
uniform mat4 g_ModelViewProjectionMatrix;
uniform vec4 g_Texture0Resolution;

uniform float g_Time;

uniform float g_ScrollX; // {"material":"speedx","label":"ui_editor_properties_speed_x","default":0.2,"range":[-2,2]}

attribute vec3 a_Position;
attribute vec2 a_TexCoord;

varying vec4 v_TexCoord;
varying vec2 v_Scroll;

void main() {
	gl_Position = mul(vec4(a_Position, 1.0), g_ModelViewProjectionMatrix);
	v_TexCoord = a_TexCoord.xyxy;
	
	v_TexCoord.zw = (CAST2(0.5) - v_TexCoord.xy) * vec2(1.0, g_Texture0Resolution.w / g_Texture0Resolution.z) + CAST2(0.5);


	vec2 scroll = vec2(g_ScrollX, 0.0);
	scroll = sign(scroll) * pow(vec2(g_ScrollX, 0.0), CAST2(2.0));
	v_Scroll = scroll * g_Time;
}
