
attribute vec3 a_Position;
attribute vec2 a_TexCoord;

varying vec4 v_TexCoord;
varying vec4 v_TexCoordClouds;

uniform vec4 g_Texture0Resolution;
uniform float g_Time;
uniform vec2 g_CloudSpeeds; // {"material":"ui_editor_properties_speed","default":"0.0007 -0.0011"}
uniform vec4 g_CloudScales; // {"material":"ui_editor_properties_scale","default":"1.1 1.1 0.7 0.7"}

void main() {
	gl_Position = vec4(a_Position, 1.0);
	v_TexCoord.xy = a_TexCoord;
	
	float aspect = g_Texture0Resolution.z / g_Texture0Resolution.w;
	v_TexCoordClouds.xy = (a_TexCoord + g_Time * g_CloudSpeeds.x) * g_CloudScales.xy;
	v_TexCoordClouds.zw = (a_TexCoord + g_Time * g_CloudSpeeds.y) * g_CloudScales.zw;
	v_TexCoordClouds.xz *= aspect;
	v_TexCoordClouds.zw = vec2(-v_TexCoordClouds.w, v_TexCoordClouds.z);
	
	v_TexCoord.zw = a_TexCoord - vec2(0.5, 0.3);
	v_TexCoord.z *= aspect;
}
