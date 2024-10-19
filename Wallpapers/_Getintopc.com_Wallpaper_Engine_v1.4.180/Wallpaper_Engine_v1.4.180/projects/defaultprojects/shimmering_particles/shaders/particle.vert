
// [COMBO] {"material":"ui_editor_properties_refract","combo":"REFRACT","type":"options","default":0}

#include "common_particles.h"

// Declare dynamic attributes for all combinations
attribute vec3 a_Position;
attribute vec4 a_TexCoordVec4;
attribute vec4 a_Color;

#if THICKFORMAT
attribute vec4 a_TexCoordVec4C1;
#endif

#if HLSL_GS40_DISABLED
#else
// No geometry shaders
attribute vec2 a_TexCoordC2;

#if SPRITESHEET
varying vec4 v_TexCoord;
varying float v_TexCoordBlend;
#else
varying vec2 v_TexCoord;
#endif
#endif

varying vec4 v_Color;
varying float v_Blur;

uniform lowp vec3 g_Color1; // {"material":"color1","default":"1 1 1"}
uniform lowp vec3 g_Color2; // {"material":"color2","default":"1 1 1"}

uniform mat4 g_ModelMatrix;


#if HLSL_GS40_DISABLED
varying vec3 v_Rotation;
#if THICKFORMAT
varying vec4 v_VelocityLifetime;
#endif
#else

#if REFRACT
varying vec3 v_ScreenCoord;
varying vec4 v_ScreenTangents;
#endif

#endif

void main() {

	// Prepare input layout
#if HLSL_GS40_DISABLED
#define in_ParticleRotation (a_TexCoordVec4.xyz)
#else
#define in_ParticleRotation vec3(a_TexCoordC2.xy, a_TexCoordVec4.z)
#endif

#define in_ParticleSize (a_TexCoordVec4.w)
#define in_ParticleVelocity (a_TexCoordVec4C1.xyz)
#define in_ParticleLifeTime (a_TexCoordVec4C1.w)



#if SPRITESHEET
	float textureRatio = g_RenderVar1.w;
#else
	float textureRatio = g_Texture0Resolution.y / g_Texture0Resolution.x;
#endif



#if WORLDBLUR
	vec3 worldPos = mul(vec4(a_Position, 1.0), g_ModelMatrix);
	v_Blur = smoothstep(-250, 250, worldPos.z);
	v_Blur = pow(v_Blur, 3);
#else
	v_Blur = smoothstep(-1, 1, a_Position.z);
#endif



	// Prepare geometry shader input
	// or compute final vertex position
#if HLSL_GS40_DISABLED

#if THICKFORMAT
	v_VelocityLifetime = vec4(in_ParticleVelocity, in_ParticleLifeTime);
#endif
	v_Rotation = in_ParticleRotation;
	gl_Position = vec4(a_Position, in_ParticleSize);
#else

	vec3 right, up;
	mat3 mRotation;
#if TRAILRENDERER
	mRotation = CAST3X3(1.0);
	ComputeParticleTrailTangents(a_Position, in_ParticleVelocity, right, up);
#else
	ComputeParticleTangents(in_ParticleRotation * (1-v_Blur), mRotation, right, up);
#endif

	vec3 position = ComputeParticlePosition(a_TexCoordVec4.xy, textureRatio, vec4(a_Position.xyz, in_ParticleSize), right, up);
	gl_Position = mul(vec4(position, 1.0), g_ModelViewProjectionMatrix);

	v_TexCoord.xy = a_TexCoordVec4.xy;
#if SPRITESHEET
	vec2 uvOffsets;
	ComputeSpriteFrame(in_ParticleLifeTime, v_TexCoord, uvOffsets, v_TexCoordBlend);
	v_TexCoord += uvOffsets.xyxy;
#endif

#endif

	v_Color = a_Color;
	v_Color.a *= 0.5;
	v_Color.rgb  = mix(g_Color1, g_Color2, v_Color.r);

#if HLSL_GS40_DISABLED
#else
#if REFRACT
	ComputeScreenRefractionTangents(gl_Position.xyw, mRotation, v_ScreenCoord, v_ScreenTangents);
#endif
#endif
}
