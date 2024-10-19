
varying lowp vec3 color;
varying mediump vec4 v_TexCoord;

uniform sampler2D g_Texture0;
uniform sampler2D g_Texture1;

const float threshold = 0.3;
const float thresholdScale = 0.1;

void main() {

	float flowColor0 = texSample2D(g_Texture0, v_TexCoord.xy).r;
	float flowColor1 = texSample2D(g_Texture1, v_TexCoord.zw).r;
	
	float mixedColor = step(threshold - thresholdScale, flowColor0) * step(flowColor0, threshold + thresholdScale);
	mixedColor *= step(threshold - thresholdScale, flowColor1) * step(flowColor1, threshold + thresholdScale);
	
	float refractColor = flowColor0 * flowColor1;
	refractColor = texSample2D(g_Texture0, v_TexCoord.xy + refractColor * 0.6 + mixedColor).r;
	flowColor1 += smoothstep(0.4, 0.35, refractColor) * smoothstep(0.4, 0.45, flowColor1);
	
	
	
	vec3 result = flowColor0 * flowColor1 * color;
	//result = mixedColor * color;

	gl_FragColor = vec4(result, 1.0);
	
	
	//flowColor0 = texSample2D(g_Texture0, v_TexCoord.xy).r;
	//flowColor1 = texSample2D(g_Texture0, v_TexCoord.zw).r;
	
	//gl_FragColor = vec4(color * mixedColor, 1.0);
}
