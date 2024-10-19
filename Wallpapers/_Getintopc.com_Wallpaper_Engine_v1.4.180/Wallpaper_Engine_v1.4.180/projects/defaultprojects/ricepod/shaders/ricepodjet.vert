
attribute vec3 a_Position;
attribute vec2 a_TexCoord;

varying mediump vec2 v_TexCoord;
varying float v_Alpha;

uniform mat4 g_ModelViewProjectionMatrix;
uniform float g_Time;

void main() {
	vec3 position = a_Position;
	
	float outside = step(0.5, a_TexCoord.x);
	float pulseSpeed = 5.0 + outside * 10.0;
	float pulseAmount = 1.0 - a_TexCoord.y;
	
	float pulseStrong = sin(g_Time * pulseSpeed);
	position.xy *= mix(1.0, pulseStrong * 0.05 + 1.0, pulseAmount);
	position.z += pulseAmount * (cos(g_Time * pulseSpeed) * 0.02 + 0.02);
	
	gl_Position = mul(vec4(position, 1.0), g_ModelViewProjectionMatrix);
	v_TexCoord = a_TexCoord;
	
	v_Alpha = pulseStrong * 0.25 + 0.75;
}
