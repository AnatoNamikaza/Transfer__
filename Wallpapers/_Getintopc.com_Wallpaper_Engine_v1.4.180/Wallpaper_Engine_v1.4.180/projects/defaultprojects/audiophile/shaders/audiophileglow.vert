
attribute vec3 a_Position;
attribute vec2 a_TexCoord;

uniform mat4 g_ModelViewProjectionMatrix;
uniform float g_AudioSpectrum16Left[16];

varying lowp vec3 color;
varying mediump vec2 v_TexCoord;

uniform lowp vec3 g_Tint; // {"material":"tint","default":"1 1 1"}

void main() {
	v_TexCoord = a_TexCoord;
	vec3 position = a_Position;
	
	float audio = g_AudioSpectrum16Left[0];
	audio = min(1.0, audio);
	position.xy *= audio;
	
	color = g_Tint * audio * 0.2;
	
	//	g_AudioSpectrum16[int(a_TexCoord.x * 16 + 0.51)];
	//audio *= 0.5;
	//audio = min(1.0, audio);
	//
	//vec3 position = a_Position;
	//position.y *= audio;
	//position.y = mix(position.y, a_Position.y, a_TexCoord.y);
	//color *= min(1.0, (audio * 0.8) + 0.2);
	//
	//color *= max(0.0, dot(a_Normal, vec3(0, 0.707, 0.707)) * 0.5 + 0.5);
	
	
	
	gl_Position = mul(vec4(position, 1.0), g_ModelViewProjectionMatrix);
}
