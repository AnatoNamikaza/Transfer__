
attribute vec3 a_Position;
attribute vec2 a_TexCoord;
attribute vec3 a_Normal;

uniform mat4 g_ModelViewProjectionMatrix;
//uniform float g_AudioSpectrum16[16];
uniform vec3 g_EyePosition;
uniform float g_Time;

varying mediump float v_Dot;
//varying mediump float v_Flow;
varying mediump vec2 v_TexCoord;
varying mediump vec4 v_TexCoordAnim;

void main() {
	v_TexCoord = a_TexCoord * 2 + g_Time * 0.03;
	gl_Position = mul(vec4(a_Position, 1.0), g_ModelViewProjectionMatrix);
	
	vec3 eyeDir = normalize(g_EyePosition - a_Position);
	float dotProduct = dot(eyeDir, a_Normal);
	float d = (dotProduct * 0.5 + 0.5); // * abs(d);
	d = pow(d, 4);
	d *= abs(dotProduct);
	
	v_Dot = d * 12;
	
	v_TexCoordAnim.xy = 0.1 * a_TexCoord + g_Time * 0.2;
	v_TexCoordAnim.zw = 0.4 * a_TexCoord.yx - g_Time * 0.133;
	//v_Flow =sin(g_Time + v_TexCoordAnim.y * 5);
}
