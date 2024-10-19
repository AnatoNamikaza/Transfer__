
#include "common_vertex.h"

uniform mat4 g_ModelViewProjectionMatrix;
uniform vec4 g_Texture0Rotation;
uniform vec2 g_Texture0Translation;

#if SKINNING
uniform mat4x3 g_Bones[BONECOUNT];
#endif

attribute vec3 a_Position;
attribute vec2 a_TexCoord;

#if SKINNING
attribute uint4 a_BlendIndices;
attribute vec4 a_BlendWeights;
#endif

varying vec2 v_TexCoord;

void main() {

#if SKINNING
	vec3 localPos = mul(vec4(a_Position, 1.0), g_Bones[a_BlendIndices.x]) * a_BlendWeights.x +
					mul(vec4(a_Position, 1.0), g_Bones[a_BlendIndices.y]) * a_BlendWeights.y +
					mul(vec4(a_Position, 1.0), g_Bones[a_BlendIndices.z]) * a_BlendWeights.z +
					mul(vec4(a_Position, 1.0), g_Bones[a_BlendIndices.w]) * a_BlendWeights.w;
#else
	vec3 localPos = a_Position;
#endif
	
	gl_Position = mul(vec4(localPos, 1.0), g_ModelViewProjectionMatrix);
	
#if SPRITESHEET
	v_TexCoord.xy = g_Texture0Translation + a_TexCoord.x * g_Texture0Rotation.xy + a_TexCoord.y * g_Texture0Rotation.zw;
#else
	v_TexCoord.xy = a_TexCoord;
#endif
}
