
attribute vec3 a_Position;
attribute vec2 a_TexCoord;
attribute vec3 a_Normal;

uniform mat4 g_ModelViewProjectionMatrix;
uniform float g_AudioSpectrum16Left[16];
uniform float g_AudioSpectrum16Right[16];

varying lowp vec3 color;

uniform lowp vec3 g_Tint; // {"material":"tint","default":"1 1 1"}

void main() {
	color = g_Tint;
	
	float audioLeft = g_AudioSpectrum16Left[int(a_TexCoord.x * 16 + 0.01)] +
		g_AudioSpectrum16Left[int(a_TexCoord.x * 16 + 0.51)];
	float audioRight = g_AudioSpectrum16Right[int(a_TexCoord.x * 16 + 0.01)] +
		g_AudioSpectrum16Right[int(a_TexCoord.x * 16 + 0.51)];
	float audio = mix(audioLeft, audioRight, step(0, a_Position.x));
	audio *= 0.5;
	audio = saturate(audio);
	
	vec3 position = a_Position;
	position.y *= audio;
	position.y = mix(position.y, a_Position.y, a_TexCoord.y);
	color *= min(1.0, (audio * 0.8) + 0.2);
	
	color *= max(0.0, dot(a_Normal, vec3(0, 0.707, 0.707)) * 0.5 + 0.5);
	
	
	
	gl_Position = mul(vec4(position, 1.0), g_ModelViewProjectionMatrix);
}
