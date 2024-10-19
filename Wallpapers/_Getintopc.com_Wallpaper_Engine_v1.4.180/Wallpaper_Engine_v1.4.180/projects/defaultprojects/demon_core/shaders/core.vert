
#include "common_vertex.h"

uniform mat4 g_ModelMatrix;
uniform mat4 g_ViewProjectionMatrix;
uniform vec3 g_EyePosition;
uniform vec3 g_LightsPosition[4];
uniform vec3 g_LightAmbientColor;
uniform vec3 g_LightSkylightColor;

uniform float g_AudioSpectrum16Left[16];
uniform float g_Time;

attribute vec3 a_Position;
attribute vec3 a_Normal;
attribute vec2 a_TexCoord;

varying vec3 v_Normal;

varying vec3 v_ViewDir;
varying vec2 v_TexCoord;
varying vec4 v_Light0DirectionL3X;
varying vec4 v_Light1DirectionL3Y;
varying vec4 v_Light2DirectionL3Z;

varying vec3 v_LightAmbientColor;
varying float v_LightScale;

void main() {
	vec3 localPos = a_Position;
	
	float angle = g_Time * 0.4;
	vec2 angleCS = vec2(cos(angle), sin(angle));
	vec2 rotTexCoord = vec2(angleCS.x * a_TexCoord.x - angleCS.y * a_TexCoord.y,
		angleCS.y * a_TexCoord.x + angleCS.x * a_TexCoord.y);
		
	float period = 3.14159 * 4.0;
	vec3 anims = (sin(vec3((rotTexCoord.x + rotTexCoord.y) * period + g_Time,
						(a_TexCoord.x + a_TexCoord.y) * period + g_Time,
						(a_TexCoord.x + a_TexCoord.y + 1) * period + g_Time)));
	int spectrumIndex = int(floor(anims.x * 7.98 + 8.01));
	
	anims = saturate(anims);
	
#if 1
	float audioAvg = g_AudioSpectrum16Left[0] + g_AudioSpectrum16Left[1] + g_AudioSpectrum16Left[2] + g_AudioSpectrum16Left[3] +
					g_AudioSpectrum16Left[4] + g_AudioSpectrum16Left[5] + g_AudioSpectrum16Left[6] + g_AudioSpectrum16Left[7] +
					g_AudioSpectrum16Left[8] + g_AudioSpectrum16Left[9] + g_AudioSpectrum16Left[10] + g_AudioSpectrum16Left[11] +
					g_AudioSpectrum16Left[12] + g_AudioSpectrum16Left[13] + g_AudioSpectrum16Left[14] + g_AudioSpectrum16Left[15];
	audioAvg = 1.0 - saturate(audioAvg / 16.0) * 0.3;
	localPos += localPos * step(0.0, a_TexCoord.x) * pow(saturate(g_AudioSpectrum16Left[spectrumIndex]) * 0.75, 2);
	localPos += localPos * step(0.0, a_TexCoord.x) * anims.y * 0.5;
	
	// Ensure that spectrumIndex e [0, 16]
	//localPos += localPos * step(spectrumIndex, -0.5);
	//localPos += localPos * step(15.5, spectrumIndex);
	audioAvg -= step(a_TexCoord.x, 0.0) * anims.z * 0.4;
	
#else
	localPos += localPos * step(0.0, a_TexCoord.x) * spectrumIndex / 8.0;
	float audioAvg = 0.5;
#endif
	
	v_LightScale = saturate(step(0.0, a_TexCoord.x) + audioAvg);
	
	
	vec4 worldPos = mul(vec4(localPos, 1.0), g_ModelMatrix);
	
	gl_Position = mul(worldPos, g_ViewProjectionMatrix);
	vec3 normal = normalize(mul(a_Normal, CAST3X3(g_ModelMatrix)));
	v_TexCoord = a_TexCoord;
	
	v_ViewDir = g_EyePosition - worldPos.xyz;

	v_Light0DirectionL3X.xyz = g_LightsPosition[0] - worldPos.xyz;
	v_Light1DirectionL3Y.xyz = g_LightsPosition[1] - worldPos.xyz;
	v_Light2DirectionL3Z.xyz = g_LightsPosition[2] - worldPos.xyz;
	
	vec3 l3 = g_LightsPosition[3] - worldPos.xyz;
	
	v_Normal = normal;

	v_Light0DirectionL3X.w = l3.x;
	v_Light1DirectionL3Y.w = l3.y;
	v_Light2DirectionL3Z.w = l3.z;
	v_LightAmbientColor = mix(g_LightSkylightColor, g_LightAmbientColor, dot(normal, vec3(0, 1, 0)) * 0.5 + 0.5);
}
