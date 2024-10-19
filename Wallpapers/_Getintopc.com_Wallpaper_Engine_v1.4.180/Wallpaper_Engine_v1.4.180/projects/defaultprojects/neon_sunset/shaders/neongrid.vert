
#include "common_vertex.h"

uniform mat4 g_ModelMatrix;
uniform mat4 g_ViewProjectionMatrix;
uniform float g_Time;

attribute vec3 a_Position;
attribute vec2 a_TexCoord;

varying vec4 v_TexCoord;
varying vec4 v_Vars;
varying vec3 v_Position;
uniform float g_MountainScale; // {"material":"mountainscale","default":1}

//uniform float g_AudioSpectrum16Left[16];
//uniform float g_AudioSpectrum16Right[16];

// https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83
#define NUM_OCTAVES 5

float rand(vec2 n)
{ 
	return frac(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p)
{
	vec2 ip = floor(p);
	vec2 u = frac(p);
	u = u*u*(3.0-2.0*u);
	
	float res = mix(
		mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
		mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
	return res*res;
}

float fbm(vec2 x)
{
	float v = 0.0;
	float a = 0.5;
	vec2 shift = CAST2(100);
	// Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
	for (int i = 0; i < NUM_OCTAVES; ++i) {
		v += a * noise(x);
		x = mul(rot, x) * 2.0 + shift;
		a *= 0.5;
	}
	return v;
}


void main() {
	v_Vars = CAST4(0);

	float speed = g_Time * 2;
	vec3 localPos = a_Position;
	vec2 gridPos = floor(a_TexCoord * 50 + vec2(0, speed));
	
	float dampenDistance = abs(a_TexCoord.x * 2.0 - 1.0);
	//dampenDistance = pow(dampenDistance, 1.5) * pow(1.05 - dampenDistance, 0.5);
	float fallOffSides = pow(1.05 - dampenDistance, 0.5);
	float fallOffCenter = (0.2 + 0.8 * pow(dampenDistance, 2.0));
	
	float speedFrac = frac(speed) / 50;
	v_Vars.x = a_TexCoord.y - speedFrac; // Scale along Y
	float dampenY = a_TexCoord.y - speedFrac;
	float clipCenter = saturate(0.8 - dampenDistance);
	
	float offsetY = max(0.0, fbm(gridPos * 0.1) * 2 - clipCenter) * fallOffCenter  * g_MountainScale;
	float maskUVSmoothing = step(0.005, offsetY);
	offsetY = offsetY * fallOffSides * dampenY + pow(dampenDistance, 2) * 0.02;
	
	localPos.z -= speedFrac * 2.0;
	localPos.y += offsetY;

	vec4 worldPos = mul(vec4(localPos, 1.0), g_ModelMatrix);
	v_Position = worldPos.xyz;
	gl_Position = mul(worldPos, g_ViewProjectionMatrix);
	
	v_TexCoord.xy = a_TexCoord;
	v_TexCoord.zw = a_TexCoord * 50;
	
	float dampenUVSmoothing = saturate(abs(a_TexCoord.x - 0.5) * 2.0 + maskUVSmoothing); // Dampen to center
	v_Vars.yz = 0.45 - v_TexCoord.y * vec2(0.05, 0.75 - dampenUVSmoothing * 0.7);
}
