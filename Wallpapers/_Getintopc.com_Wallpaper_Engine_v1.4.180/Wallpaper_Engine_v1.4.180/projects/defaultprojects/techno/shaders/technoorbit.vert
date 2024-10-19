
attribute vec3 a_Position;
attribute vec2 a_TexCoord;

uniform mat4 g_ModelViewProjectionMatrix;
uniform float g_Time;

varying lowp vec3 v_Color;
varying mediump vec4 v_TexCoord;

uniform lowp vec3 g_Tint; // {"material":"tint","default":"1 1 1"}
uniform mediump float g_Speed; // {"material":"speed","default":0.3}

void main() {
	v_TexCoord.xy = a_TexCoord;
	v_TexCoord.zw = a_TexCoord;
	
	v_Color = g_Tint;
	
#if CLOUDS && !RAYS
	v_Color *= 1.0 - abs(v_TexCoord.y * 2.0 - 1.0);
	
	v_TexCoord *= 1.2;
	v_TexCoord.x += g_Time * 0.01;
	v_TexCoord.x *= 10;
	v_TexCoord.z = v_TexCoord.z * 10 + g_Time * -0.01;
	v_TexCoord.y += g_Time * 0.2;
	v_TexCoord.w += g_Time * 0.3;
#endif
#if !CLOUDS && RAYS
	v_TexCoord.z -= g_Time * g_Speed * 0.77;
	v_TexCoord.x += g_Time * g_Speed;
	
	//v_Color *= pow(v_TexCoord.y, 5);
	//v_TexCoord.yw = v_TexCoord.xz;
#endif
#if !CLOUDS && !RAYS
	v_TexCoord.x += g_Time * g_Speed;
#endif
	
	gl_Position = mul(vec4(a_Position, 1.0), g_ModelViewProjectionMatrix);
}
