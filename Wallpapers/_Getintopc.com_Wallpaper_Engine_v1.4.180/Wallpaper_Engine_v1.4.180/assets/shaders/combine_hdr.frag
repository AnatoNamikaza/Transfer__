
varying vec2 v_TexCoord;

uniform sampler2D g_Texture0;
uniform sampler2D g_Texture1;

uniform vec2 g_TexelSize;

// Proper gamma conversion http://chilliant.blogspot.com/2012/08/srgb-approximations-for-hlsl.html
vec3 srgb(vec3 v)
{
	vec3 c = step(0.04045, v);
	return c * (pow((v + 0.055) / 1.055, 2.4)) + (1 - c) * (v / 12.92);
}

void main()
{
	vec3 albedo = texSample2D(g_Texture0, v_TexCoord).rgb;
	vec3 bloom1 = texSample2D(g_Texture1, v_TexCoord + g_TexelSize).rgb +
				texSample2D(g_Texture1, v_TexCoord - g_TexelSize).rgb +
				texSample2D(g_Texture1, v_TexCoord + vec2(g_TexelSize.x, -g_TexelSize.y)).rgb +
				texSample2D(g_Texture1, v_TexCoord + vec2(-g_TexelSize.x, g_TexelSize.y)).rgb;
	bloom1 *= 0.25;

#if COMBINEDBG == 1
	albedo = mix(albedo + bloom1, bloom1, step(0.5, v_TexCoord.x) * step(v_TexCoord.y, 0.5));
#else
	albedo += bloom1;
#endif

#if LINEAR == 1
	gl_FragColor = vec4(saturate(albedo), 1.0);
#else
	gl_FragColor = vec4(srgb(saturate(albedo)), 1.0);
#endif
}
