
#include "common_particles.h"

#if THICKFORMAT
in vec4 v_EndPoint;
in vec4 v_Color2;
#else
in vec3 v_EndPoint;
#endif

in vec4 v_Color;
in vec4 gl_Position;
in vec2 v_UVMinMax;

in vec3 v_CPStart;
in vec3 v_CPEnd;

out vec2 v_TexCoord;
out vec4 v_Color;
out vec4 gl_Position;

vec3 cubicBezier(vec3 A, vec3 B, vec3 C, vec3 D, float t)
{
    vec3 p;
    float OneMinusT = 1.0 - t;
    float b0 = OneMinusT*OneMinusT*OneMinusT;
    float b1 = 3.0*t*OneMinusT*OneMinusT;
    float b2 = 3.0*t*t*OneMinusT;
    float b3 = t*t*t;
    return b0*A + b1*B + b2*C + b3*D;
}

[maxvertexcount(4 + TRAILSUBDIVISION * 2)]
void main() {

	vec3 startPosition = IN[0].gl_Position.xyz;
	vec3 endPosition = IN[0].v_EndPoint.xyz;
	vec3 CPStart = IN[0].v_CPStart.xyz;
	vec3 CPEnd = IN[0].v_CPEnd.xyz;
	
#if THICKFORMAT
	float sizeStart = IN[0].gl_Position.w;
	float sizeEnd = IN[0].v_EndPoint.w;
#else
	float sizeStart = IN[0].gl_Position.w;
	float sizeEnd = IN[0].gl_Position.w;
#endif
	
	vec3 eyeDirection = mul(g_OrientationForward, CAST3X3(g_ModelMatrixInverse));
	vec3 trailDelta = endPosition - startPosition;
	
	vec3 trailRightStart = cross(trailDelta + CPStart, eyeDirection);
	trailRightStart = normalize(trailRightStart) * sizeStart;
	
	vec3 trailRightEnd = cross(trailDelta - CPEnd, eyeDirection);
	trailRightEnd = normalize(trailRightEnd) * sizeEnd;
	
	float uvMinmimum = IN[0].v_UVMinMax.x;
	float uvMaximum = IN[0].v_UVMinMax.y;
	
	
	PS_INPUT v;
	
#if THICKFORMAT
	// Update color per set
	vec4 colorStart = IN[0].v_Color;
	vec4 colorEnd = IN[0].v_Color2;
	
	v.v_Color = colorStart;
	v.gl_Position = mul(vec4(startPosition - trailRightStart, 1.0), g_ModelViewProjectionMatrix);
	v.v_TexCoord = vec2(1, uvMinmimum);
	OUT.Append(v);
	v.gl_Position = mul(vec4(startPosition + trailRightStart, 1.0), g_ModelViewProjectionMatrix);
	v.v_TexCoord = vec2(0, uvMinmimum);
	OUT.Append(v);
	
#if TRAILSUBDIVISION != 0
	float subDivStep = 1.0 / (TRAILSUBDIVISION + 1);
	float subDivCounter = subDivStep;
	for (int s = 0; s < TRAILSUBDIVISION; ++s)
	{
		vec3 midPosition = cubicBezier(startPosition, startPosition + CPStart * 0.15, endPosition + CPEnd * 0.15, endPosition, subDivCounter);
		float midUV = mix(uvMinmimum, uvMaximum, subDivCounter);
		vec3 midRight = mix(trailRightStart, trailRightEnd, subDivCounter);
		vec4 color = mix(colorStart, colorEnd, subDivCounter);
		
		v.v_Color = color;
		
		v.gl_Position = mul(vec4(midPosition - midRight, 1.0), g_ModelViewProjectionMatrix);
		v.v_TexCoord = vec2(1, midUV);
		OUT.Append(v);
		v.gl_Position = mul(vec4(midPosition + midRight, 1.0), g_ModelViewProjectionMatrix);
		v.v_TexCoord = vec2(0, midUV);
		OUT.Append(v);

		subDivCounter += subDivStep;
	}
#endif
	v.v_Color = colorEnd;
	v.gl_Position = mul(vec4(endPosition - trailRightEnd, 1.0), g_ModelViewProjectionMatrix);
	v.v_TexCoord = vec2(1, uvMaximum);
	OUT.Append(v);
	v.gl_Position = mul(vec4(endPosition + trailRightEnd, 1.0), g_ModelViewProjectionMatrix);
	v.v_TexCoord = vec2(0, uvMaximum);
	OUT.Append(v);
#else // NOT THICKFORMAT
	// Just set color once
	v.v_Color = IN[0].v_Color;
	v.gl_Position = mul(vec4(startPosition - trailRightStart, 1.0), g_ModelViewProjectionMatrix);
	v.v_TexCoord = vec2(1, uvMinmimum);
	OUT.Append(v);
	v.gl_Position = mul(vec4(startPosition + trailRightStart, 1.0), g_ModelViewProjectionMatrix);
	v.v_TexCoord = vec2(0, uvMinmimum);
	OUT.Append(v);
	
#if TRAILSUBDIVISION != 0
	float subDivStep = 1.0 / (TRAILSUBDIVISION + 1);
	float subDivCounter = subDivStep;
	for (int s = 0; s < TRAILSUBDIVISION; ++s)
	{
		vec3 midPosition = cubicBezier(startPosition, startPosition + CPStart * 0.15, endPosition + CPEnd * 0.15, endPosition, subDivCounter);
		float midUV = mix(uvMinmimum, uvMaximum, subDivCounter);
		vec3 midRight = mix(trailRightStart, trailRightEnd, subDivCounter);
		
		v.gl_Position = mul(vec4(midPosition - midRight, 1.0), g_ModelViewProjectionMatrix);
		v.v_TexCoord = vec2(1, midUV);
		OUT.Append(v);
		v.gl_Position = mul(vec4(midPosition + midRight, 1.0), g_ModelViewProjectionMatrix);
		v.v_TexCoord = vec2(0, midUV);
		OUT.Append(v);
		subDivCounter += subDivStep;
	}
#endif
	
	v.gl_Position = mul(vec4(endPosition - trailRightEnd, 1.0), g_ModelViewProjectionMatrix);
	v.v_TexCoord = vec2(1, uvMaximum);
	OUT.Append(v);
	v.gl_Position = mul(vec4(endPosition + trailRightEnd, 1.0), g_ModelViewProjectionMatrix);
	v.v_TexCoord = vec2(0, uvMaximum);
	OUT.Append(v);
#endif
}





