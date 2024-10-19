'use strict';

export var scriptProperties = createScriptProperties()
	.addSlider({
		name: 'frequency',
		label: 'ui_editor_properties_audio_frequency',
		value: 0,
		min: 0,
		max: 15,
		integer: true
	})
	.addSlider({
		name: 'smoothing',
		label: 'ui_editor_properties_audio_response',
		value: 2,
		min: 0,
		max: 20,
		integer: false
	})
	.addSlider({
		name: 'minvalue',
		label: 'ui_editor_properties_min',
		value: 0.8,
		min: 0,
		max: 3,
		integer: false
	})
	.addSlider({
		name: 'maxvalue',
		label: 'ui_editor_properties_max',
		value: 1.2,
		min: 0,
		max: 3,
		integer: false
	})
	.finish();
	
/**
 * Configure these to control smoothing and the frequency.
 */
let frequencyResolution = 16; // Must be 16, 32 or 64 per channel.

/**
 * This creates a permanent link to the audio response data.
 */
let audioBuffer = engine.registerAudioBuffers(frequencyResolution);
var smoothValue = 0;
var initialValue;

/**
 */
export function update() {
	const valueDelta = scriptProperties.maxvalue - scriptProperties.minvalue;
	let audioDelta = audioBuffer.average[scriptProperties.frequency] - smoothValue;
	
	smoothValue += audioDelta * Math.min(1.0, engine.frametime * scriptProperties.smoothing);
	smoothValue = Math.min(1.0, smoothValue);

	return initialValue * (smoothValue * valueDelta + scriptProperties.minvalue);
}

/**
 */
export function init(value) {
	initialValue = value;
}

