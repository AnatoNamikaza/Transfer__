

uniform float g_Alpha;

uniform vec3 g_Color;

// Application time, starts with 0
uniform float g_Time;

// Maps 24 hrs to [0, 1]
uniform float g_Daytime;

uniform vec2 g_TexelSize;
uniform vec2 g_TexelSizeHalf;

uniform mat4 g_ModelMatrix;
uniform mat4 g_ViewProjectionMatrix;
uniform mat4 g_ModelViewProjectionMatrix;
uniform mat4 g_ModelViewProjectionMatrixInverse;

uniform vec3 g_EyePosition;
uniform vec3 g_ViewUp;
uniform vec3 g_ViewRight;

// Samplers that map to the textures[] array in the material
uniform sampler2D g_Texture0;
uniform sampler2D g_Texture1;
uniform sampler2D g_Texture2;
uniform sampler2D g_Texture3;
uniform sampler2D g_Texture4;
uniform sampler2D g_Texture5;
uniform sampler2D g_Texture6;
uniform sampler2D g_Texture7;

// For sprite sheets (GIFs)
uniform vec4 g_Texture0Rotation;
uniform vec4 g_Texture1Rotation;
uniform vec4 g_Texture2Rotation;
uniform vec4 g_Texture3Rotation;
uniform vec4 g_Texture4Rotation;
uniform vec4 g_Texture5Rotation;
uniform vec4 g_Texture6Rotation;
uniform vec4 g_Texture7Rotation;

uniform vec2 g_Texture0Translation;
uniform vec2 g_Texture1Translation;
uniform vec2 g_Texture2Translation;
uniform vec2 g_Texture3Translation;
uniform vec2 g_Texture4Translation;
uniform vec2 g_Texture5Translation;
uniform vec2 g_Texture6Translation;
uniform vec2 g_Texture7Translation;

uniform vec4 g_LightsColorRadius[4]; // color in XYZ, radius in W
uniform vec3 g_LightsPosition[4];

uniform vec3 g_LightAmbientColor;
uniform vec3 g_LightSkylightColor;

// lower frequencies at lower indices
uniform float g_AudioSpectrum16Left[16];
uniform float g_AudioSpectrum16Right[16];
uniform float g_AudioSpectrum32Left[32];
uniform float g_AudioSpectrum32Right[32];
uniform float g_AudioSpectrum64Left[64];
uniform float g_AudioSpectrum64Right[64];

// Normalized in UV space [0, 1]
uniform vec2 g_PointerPosition;

