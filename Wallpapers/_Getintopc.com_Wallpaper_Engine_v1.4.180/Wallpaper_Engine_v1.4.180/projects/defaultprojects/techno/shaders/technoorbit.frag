
uniform sampler2D g_Texture0;
uniform sampler2D g_Texture1;

varying lowp vec3 v_Color;
varying mediump vec4 v_TexCoord;

void main() {

	float glow = texSample2D(g_Texture0, v_TexCoord.xy).r;
	//result = vec3(1,0,0);

#if CLOUDS && !RAYS
	float glow2 = texSample2D(g_Texture1, v_TexCoord.zw * 0.5).r;
	
	
	//glow = step(0.39, glow) * step(glow, 0.4);
	//glow2 = step(0.5, glow2);
	
	vec3 result = glow * glow2 * v_Color;
#endif
#if !CLOUDS && RAYS
	glow *= texSample2D(g_Texture0, v_TexCoord.zy).r;
	//glow = step(0.001, glow) * step(glow, 0.1);
	vec3 result = v_Color * glow;
#endif
#if !CLOUDS && !RAYS
	vec3 result = v_Color * pow(glow, 2);
#endif

	gl_FragColor = vec4(result, 1.0);
}
