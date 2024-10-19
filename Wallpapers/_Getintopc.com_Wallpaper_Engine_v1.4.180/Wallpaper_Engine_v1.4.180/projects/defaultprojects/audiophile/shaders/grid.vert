
uniform mat3 g_ModelMatrix;
uniform mat4 g_ViewProjectionMatrix;

attribute vec3 a_Position;
attribute vec3 a_Normal;
attribute vec2 a_TexCoord;

varying vec2 v_WorldPosition;
varying vec3 v_ScreenPos;
varying vec2 v_TexCoord;
varying vec3 v_HalfDir;

uniform vec3 g_EyePosition;

// Constants
// const vec3 lightDir = vec3(0.707f, 0.707f, 0.0f);
const vec3 lightDir = vec3(0.577350259, 0.577350259, 0.577350259);

void main() {
	gl_Position = mul(vec4(a_Position, 1.0), g_ViewProjectionMatrix);
	v_WorldPosition = a_Position.xz;
	v_ScreenPos = gl_Position.xyw;
	v_TexCoord = a_TexCoord;
	
	vec3 viewDir = normalize(g_EyePosition - vec3(v_WorldPosition.x, 0.0, v_WorldPosition.y));
	v_HalfDir = lightDir + viewDir;
}
