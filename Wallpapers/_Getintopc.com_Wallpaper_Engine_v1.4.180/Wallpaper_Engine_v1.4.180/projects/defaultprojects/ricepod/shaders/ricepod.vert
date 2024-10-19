
attribute vec3 a_Position;
attribute vec3 a_Normal;
attribute vec2 a_TexCoord;

varying mediump vec2 v_TexCoord;
varying vec3 v_Normal;
varying vec3 v_HalfDir;
varying vec3 v_BoostColor;

uniform mat4 g_ModelMatrix;
uniform mat4 g_ViewProjectionMatrix;
uniform vec3 g_EyePosition;

const vec3 lightDir = vec3(-0.577350259, 0.577350259, 0.577350259);

void main() {
	vec4 worldPos = mul(vec4(a_Position, 1.0), g_ModelMatrix);
    gl_Position = mul(worldPos, g_ViewProjectionMatrix);
	
	v_TexCoord = a_TexCoord;
	v_Normal = a_Normal;
	
	vec3 viewDir = normalize(g_EyePosition - worldPos.xyz);
	v_HalfDir = lightDir + viewDir;
	
	float boostAmt = (1.0 - min(1.0, 2 * length(vec3(-0.592, 0.396, -1.412) - worldPos.xyz)));
	boostAmt += (1.0 - min(1.0, 2 * length(vec3(0.592, 0.396, -1.412) - worldPos.xyz)));
	boostAmt += (1.0 - min(1.0, 2 * length(vec3(0, -0.608, -1.412) - worldPos.xyz)));
	v_BoostColor = vec3(15, 6, 1) * boostAmt;
}
