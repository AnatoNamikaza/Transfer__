
varying vec2 v_TexCoord;
varying vec3 v_Position;

uniform vec4 g_BrushPosition; // {"material":"brushposition","default":"0 0"}
uniform vec4 g_BrushSettings; // {"material":"brushsettings","default":"0 0 0 0"}
uniform vec4 g_BrushColor; // {"material":"brushcolor","default":"0 0 0"}

#define BRUSHSIZE g_BrushSettings.x

void main() {
	vec4 albedo = CAST4(0);
	albedo.rgb = g_BrushColor;
	
	vec2 adjusted = (v_Position.xy - g_BrushPosition.xy) * g_BrushPosition.zw + g_BrushPosition.xy;

	vec2 texelSize = 1;
	vec4 multiSample = vec4(
						length(vec2(adjusted.x - texelSize.x, adjusted.y - texelSize.y) - g_BrushPosition.xy),
						length(vec2(adjusted.x + texelSize.x, adjusted.y - texelSize.y) - g_BrushPosition.xy),
						length(vec2(adjusted.x + texelSize.x, adjusted.y + texelSize.y) - g_BrushPosition.xy),
						length(vec2(adjusted.x - texelSize.x, adjusted.y + texelSize.y) - g_BrushPosition.xy)
						);
	
	float feather = max(0.5f, BRUSHSIZE * 0.5f * (1.0f - g_BrushSettings.y));
	vec4 blend4 = smoothstep(multiSample - feather, multiSample + feather, CAST4(BRUSHSIZE * 0.5f));
	float blend = dot(blend4, CAST4(0.25));
	
	float opacity = mix(0.0f, g_BrushSettings.z, blend);
	albedo.a = opacity;
	
#ifdef PINCH
	float pinchSign = albedo.g * 2.0 - 1.0;
	vec2 pinchDelta = ((adjusted - g_BrushPosition.xy) * pinchSign) / BRUSHSIZE;
	float pinchDistance = length(pinchDelta);
	pinchDelta /= pinchDistance;
	pinchDistance = saturate(pinchDistance);
	
	vec2 pinchColor = pinchDelta * pinchDistance * 0.5 + 0.5;
	albedo.b = 0.0;
	albedo.rg = mix(vec2(0.5, 0.5), pinchColor, albedo.r);
#endif

#if SPIN
	vec2 positionDelta = ((adjusted - g_BrushPosition.xy)) / BRUSHSIZE;
	positionDelta.y = -positionDelta.y;
	float temp = positionDelta.x;
	positionDelta.x = positionDelta.y;
	positionDelta.y = temp;
	vec2 spinColor = positionDelta * 0.5 + 0.5;
	
	albedo.b = 0.0;
	albedo.rg = mix(vec2(0.5, 0.5), spinColor, albedo.r);
#endif
	
	gl_FragColor = albedo;
}
