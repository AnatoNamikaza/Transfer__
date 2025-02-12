
uniform mat4 g_ModelViewProjectionMatrix;

uniform vec4 g_Texture0Resolution;

#if MASK == 1
uniform vec4 g_Texture2Resolution;
#endif

uniform float g_Time;

attribute vec3 a_Position;
attribute vec2 a_TexCoord;

varying vec4 v_TexCoord;
varying vec4 v_TexCoordGlitch;
varying vec4 v_TexCoordNoise;
varying vec4 v_TexCoordVHSNoise;

uniform float g_NoiseScale; // {"material":"ui_editor_properties_scale","default":10,"range":[0.0, 20.0]}

void main() {
	gl_Position = mul(vec4(a_Position, 1.0), g_ModelViewProjectionMatrix);
	
	float aspect = g_Texture0Resolution.z / g_Texture0Resolution.w;
	
	float t = frac(g_Time);
	v_TexCoord = a_TexCoord.xyxy;
	v_TexCoordNoise.xy = (a_TexCoord.xy + t) * g_NoiseScale;
	v_TexCoordNoise.zw = (a_TexCoord.xy - t * 2.5) * g_NoiseScale * 0.52;
	v_TexCoordNoise *= vec4(aspect, 1.0, aspect, 1.0);
	
#if MASK == 1
	v_TexCoord.zw = vec2(a_TexCoord.x * g_Texture2Resolution.z / g_Texture2Resolution.x,
						a_TexCoord.y * g_Texture2Resolution.w / g_Texture2Resolution.y);
#endif

	v_TexCoordVHSNoise.xy = v_TexCoordNoise.xy * vec2(0.01, 1);
	v_TexCoordVHSNoise.zw = v_TexCoordNoise.zw * vec2(0.001, 0.2);
	
	v_TexCoordNoise.xz *= 0.5;
	
	v_TexCoordGlitch = v_TexCoord.xyxy;
	
	vec3 glitchOffset = smoothstep(-0.5, 0.5, sin(g_Time * vec3(7, 13, 5) * 3)) * vec3(0.0003, 0.0003, 0.0002);
	v_TexCoordGlitch.xz += glitchOffset.xy + vec2(0.0005, -0.0005);
	//v_TexCoord.x += glitchOffset.z;
}
