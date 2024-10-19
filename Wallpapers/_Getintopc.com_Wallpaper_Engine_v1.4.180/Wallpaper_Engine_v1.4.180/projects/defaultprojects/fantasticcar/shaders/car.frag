
// Possible combos
// METAL: sine specular mod
// PAINTWORK: enable car paint colors
// NORMALMAP: enable normal maps
// SPECULARALPHA: scale specular by albedo alpha channel
// MASKPAINTCOLOR: use alpha channel to toggle paint color

#include "common_fragment.h"

varying vec3 v_Var0;
varying vec3 v_Var1;
varying mediump vec2 v_TexCoord;

// Predefined values
uniform sampler2D g_Texture0;
#ifdef NORMALMAP
uniform sampler2D g_Texture1;
#endif

// Material values
uniform mediump float g_SpecularStrength; // {"material":"specularstrength","default":1}
uniform mediump float g_SpecularPower; // {"material":"specularpower","default":6}
uniform mediump float g_SpecularSineScale; // {"material":"specularsinescale","default":15}
uniform lowp vec3 g_PaintColor; // {"material":"paintcolor","default":"1 1 1"}
uniform lowp vec3 g_PaintColorStripes; // {"material":"paintcolorstripes","default":"0 0 0"}
uniform lowp vec3 g_AmbientColor; // {"material":"ambientcolor","default":"1 1 1"}

void main() {
	vec4 albedo = texSample2D(g_Texture0, v_TexCoord);
	float alpha = 0.4;

#ifdef NORMALMAP
	// Everything is in tangent space
	vec3 normal = DecompressNormal(texSample2D(g_Texture1, v_TexCoord));
	//normal.y += 0.04;
	
	vec3 lightDir = normalize(v_Var0);
	vec3 viewDir = normalize(v_Var1);
	vec3 halfDir = normalize(lightDir + viewDir);
#else
	vec3 lightDir = vec3(0.577350259, 0.577350259, 0.577350259);
	vec3 normal = normalize(v_Var0);
	vec3 halfDir = normalize(v_Var1);
#endif

	float lighting = dot(lightDir, normal.xyz);
	lighting = max(0.0, lighting);
	lighting *= lighting;
	lighting *= 0.9;

	float specular = max(dot(normalize(halfDir), normal.xyz), 0.0);
	
	specular = pow(specular, g_SpecularPower);
#ifdef METAL
	specular = specular * smoothstep(0.0, 0.1, sin(specular * g_SpecularSineScale));
#endif
	specular *= g_SpecularStrength;
	
#if SPECULARALPHA
	specular *= albedo.a;
#endif

#ifdef PAINTWORK
	albedo.rgb = mix(g_PaintColor, g_PaintColorStripes, albedo.r) * albedo.g;
#else
#ifdef MASKPAINTCOLOR
	albedo.rgb *= mix(CAST3(1), g_PaintColor, step(0.5, albedo.a));
#else
	albedo.rgb *= g_PaintColor;
#endif
#endif
	
	gl_FragColor.rgb = (g_AmbientColor * 0.2 + lighting) * albedo.rgb + specular;
	gl_FragColor.a = alpha;
	
	//gl_FragColor.rgb = normal * 0.5 + 0.5;
	//gl_FragColor.rgb = texSample2D(g_Texture1, v_TexCoord).rgb *0.5;
}
