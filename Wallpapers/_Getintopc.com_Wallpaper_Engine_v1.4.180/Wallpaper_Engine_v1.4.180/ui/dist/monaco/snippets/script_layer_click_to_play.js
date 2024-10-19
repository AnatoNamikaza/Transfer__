'use strict';

// INFO: You must replace the name with the name of the layer in your scene!
//       Create that layer with the sound mode 'single' and choose the 'start silent' option too.
let soundLayerName = 'mysoundeffect';

/**
 * @param {ICursorEvent} event
 */
export function cursorClick(event) {
	thisScene.getLayer(soundLayerName).play();
}
