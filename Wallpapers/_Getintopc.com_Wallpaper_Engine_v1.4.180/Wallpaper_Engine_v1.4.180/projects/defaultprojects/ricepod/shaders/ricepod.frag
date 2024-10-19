
varying mediump vec2 v_TexCoord;
varying vec3 v_Normal;
varying vec3 v_HalfDir;
varying vec3 v_BoostColor;

uniform sampler2D g_Texture0;

const vec3 lightDirection = vec3(-0.577350259, 0.577350259, 0.577350259);
const vec3 skyLightDirection = vec3(0, -3, 0);

void main() {
	vec3 color = texSample2D(g_Texture0, v_TexCoord).rgb;
	
#if SELFILLUM
	float lighting = 1.5;
#else
	vec3 normal = normalize(v_Normal);
	float directionalLighting = max(0, dot(normal, lightDirection));
	float skyLighting = max(0, dot(normal, skyLightDirection));
	
	float specular = max(dot(normalize(v_HalfDir), normal), 0.0);
	directionalLighting += pow(specular, 25 + 100 * smoothstep(0.3, 0.15, color.r)) * 2;
	//directionalLighting += pow(specular, 100) * 2;
	
	//vec3 lighting = CAST3(directionalLighting) + skyLighting * vec3(0.4, 0.45, 0.55) + v_BoostColor;
	vec3 lighting = directionalLighting * vec3(1.15, 1.1, 1.0) + skyLighting * vec3(0.4, 0.45, 0.55) + v_BoostColor;
#endif
	
	color *= lighting;
	
	//color = CAST3(directionalLighting);
	gl_FragColor = vec4(color, 1.0);
}
