
#include "common_particles.h"

#if HLSL_GS40
/////////////////////////
// Geometry shader
/////////////////////////
#if THICKFORMAT
attribute vec4 a_PositionVec4;
attribute vec4 a_TexCoordVec4;
attribute vec4 a_TexCoordVec4C1;
attribute vec4 a_TexCoordVec4C2;
attribute vec4 a_TexCoordVec4C3;
attribute vec4 a_Color;

varying vec4 v_EndPoint;
varying vec4 v_Color2;
#else
attribute vec4 a_PositionVec4;
attribute vec4 a_TexCoordVec4;
attribute vec4 a_TexCoordVec4C1;
attribute vec3 a_TexCoordVec3C2;
attribute vec4 a_Color;

varying vec3 v_EndPoint;
#endif

varying vec4 v_Color;
varying vec2 v_UVMinMax;

varying vec3 v_CPStart;
varying vec3 v_CPEnd;

void main() {

#define in_ParticleSize (a_PositionVec4.w)
#define in_SegmentUVTimeOffset (g_RenderVar0.z)
#define in_SegmentMaxCount (g_RenderVar0.w)
#define in_ParticleTrailLength (a_TexCoordVec4.w)
#define in_ParticleTrailPosition (a_TexCoordVec4C1.w)
#define in_SplineCP0 (a_TexCoordVec4C1.xyz)

	gl_Position = vec4(a_PositionVec4.xyz, in_ParticleSize);
	v_EndPoint.xyz = a_TexCoordVec4.xyz;
	
	float usableLength = in_ParticleTrailLength - 1;
	
#if THICKFORMAT
#define in_SplineCP1 (a_TexCoordVec4C2.xyz)

	v_EndPoint.w = a_TexCoordVec4C2.w;

	// New particles are at the end of the array
	float uvMinimum = 1.0 - (in_ParticleTrailPosition) / usableLength;
	float uvDelta = -1.0 / usableLength;
	//uvMinimum += uvDelta;
	v_Color2 = a_TexCoordVec4C3;
#else
#define in_SplineCP1 (a_TexCoordVec3C2.xyz)

	// Still spawning new elements, extend to physical end of trail
	if (in_ParticleTrailLength < in_SegmentMaxCount)
	{
		usableLength += in_SegmentUVTimeOffset;
	}
	
	float uvMinimum = (in_ParticleTrailPosition - (1.0 - in_SegmentUVTimeOffset)) / usableLength;
	float uvDelta = 1.0 / usableLength;
	
	// The first element is shorter based on the history timer and always starts and UV 0
	if (in_ParticleTrailPosition < 0.5)
	{
		uvMinimum = 0.0;
		uvDelta = in_SegmentUVTimeOffset / usableLength;
	}
#endif

	v_UVMinMax.x = uvMinimum;
	v_UVMinMax.y = uvMinimum + uvDelta;

	v_Color = a_Color;
	v_CPStart = a_PositionVec4.xyz - in_SplineCP0;
	v_CPEnd = v_EndPoint.xyz - in_SplineCP1;
}


#else
/////////////////////////
// No geometry shader
/////////////////////////

attribute vec4 a_PositionVec4;
attribute vec4 a_TexCoordVec4;
attribute vec4 a_TexCoordVec4C1;

#if THICKFORMAT
attribute vec4 a_TexCoordVec4C2;
attribute vec4 a_TexCoordVec4C3;
attribute vec2 a_TexCoordC4;
#else
attribute vec3 a_TexCoordVec3C2;
attribute vec2 a_TexCoordC3;
#endif

attribute vec4 a_Color;

varying vec2 v_TexCoord;
varying vec4 v_Color;

void main() {

#define in_SegmentUVTimeOffset (g_RenderVar0.z)
#define in_SegmentMaxCount (g_RenderVar0.w)
#define in_ParticleTrailLength (a_TexCoordVec4.w)
#define in_ParticleTrailPosition (a_TexCoordVec4C1.w)

	// Prepare input layout
	vec3 startPosition = a_PositionVec4.xyz;
	vec3 endPosition = a_TexCoordVec4.xyz;
	vec3 CPStart = startPosition - a_TexCoordVec4C1.xyz;
	
	float sizeStart = a_PositionVec4.w;
	vec4 colorStart = a_Color;
	

#if THICKFORMAT
	vec3 CPEnd = endPosition - a_TexCoordVec4C2.xyz;
	float sizeEnd = a_TexCoordVec4C2.w;
	vec4 colorEnd = a_TexCoordVec4C3;
	vec2 uvs = a_TexCoordC4.xy;
#else
	vec3 CPEnd = endPosition - a_TexCoordVec3C2.xyz;
	float sizeEnd = sizeStart;
	vec4 colorEnd = a_Color;
	vec2 uvs = a_TexCoordC3.xy;
#endif


	vec3 eyeDirection = mul(g_OrientationForward, CAST3X3(g_ModelMatrixInverse));
	vec3 trailDelta = endPosition - startPosition;

	vec3 trailRightStart = cross(eyeDirection, trailDelta + CPStart);
	trailRightStart = normalize(trailRightStart) * sizeStart;

	vec3 trailRightEnd = cross(eyeDirection, trailDelta - CPEnd);
	trailRightEnd = normalize(trailRightEnd) * sizeEnd;

	
	vec4 color = mix(colorStart, colorEnd, uvs.y);
	vec3 position = mix(startPosition, endPosition, uvs.y);
	vec3 right = mix(trailRightStart, trailRightEnd, uvs.y);
	right *= uvs.x * 2.0 - 1.0;

	gl_Position = mul(vec4(position + right, 1.0), g_ModelViewProjectionMatrix);


	float usableLength = in_ParticleTrailLength - 1;
	
#if THICKFORMAT
	float uvMinimum = 1.0 - (in_ParticleTrailPosition) / usableLength;
	float uvDelta = -1.0 / usableLength;
#else
	// Still spawning new elements, extend to physical end of trail
	if (in_ParticleTrailLength < in_SegmentMaxCount)
	{
		usableLength += in_SegmentUVTimeOffset;
	}
	
	float uvMinimum = (in_ParticleTrailPosition - (1.0 - in_SegmentUVTimeOffset)) / usableLength;
	float uvDelta = 1.0 / usableLength;
	
	// The first element is shorter based on the history timer and always starts and UV 0
	if (in_ParticleTrailPosition < 0.5)
	{
		uvMinimum = 0.0;
		uvDelta = in_SegmentUVTimeOffset / usableLength;
	}
#endif
	
	
	v_TexCoord.xy = uvs.xy;
	v_TexCoord.y = mix(uvMinimum, uvMinimum + uvDelta, uvs.y);

	v_Color = color;
}

#endif
