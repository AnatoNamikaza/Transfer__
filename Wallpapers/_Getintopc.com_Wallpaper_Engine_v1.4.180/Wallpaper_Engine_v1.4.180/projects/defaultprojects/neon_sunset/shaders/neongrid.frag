
#include "common_fragment.h"

varying vec4 v_TexCoord;
varying vec4 v_Vars;
varying vec3 v_Position;

uniform vec3 g_ColorGridNear; // {"material":"gridnear","default":"1 0 0.2","type":"color"}
uniform vec3 g_ColorGridFar; // {"material":"gridfar","default":"0 0 1","type":"color"}
uniform vec3 g_ColorGridBackground; // {"material":"gridbackground","default":"0.1 0 0.1","type":"color"}
uniform float g_ShadingAmount; // {"material":"shading","default":"1"}

void main() {

	vec3 dx = ddx(v_Position);
	vec3 dy = ddy(v_Position);
	vec3 n = normalize(cross(dy, dx));
	vec3 lightDir = normalize(vec3(0, -0.15, -2) - v_Position);

	vec2 grid = abs(frac(v_TexCoord.zw) - 0.5);
	vec2 gridBlend = smoothstep(v_Vars.yz, CAST2(0.5), grid);
	float gridAlpha = gridBlend.x + gridBlend.y;
	
	gridBlend = smoothstep(CAST2(0), CAST2(1), grid);
	gridAlpha += (gridBlend.x + gridBlend.y) * saturate(0.3 - v_TexCoord.y);
	
	float alphaDistanceFade = smoothstep(1.0, 0.9, v_Vars.x);
	
	vec3 colorNear = g_ColorGridNear;
	vec3 colorFar = g_ColorGridFar;
	float colorDistanceBlend = pow(v_TexCoord.y, 0.8);
	
	float shadingNear = dot(vec3(0, 0, 1), n);
	float shadingFar = dot(lightDir, n);
	vec3 shadingColor = saturate(shadingNear) * g_ColorGridNear * (1.0 - colorDistanceBlend)
						+ saturate(shadingFar) * g_ColorGridFar;
	vec3 colorGrid = g_ColorGridBackground + shadingColor * g_ShadingAmount;
	
	vec3 resultColor = mix(colorGrid,
						mix(colorNear, colorFar, colorDistanceBlend),
						gridAlpha * alphaDistanceFade);

	gl_FragColor = vec4(resultColor, alphaDistanceFade);
}
