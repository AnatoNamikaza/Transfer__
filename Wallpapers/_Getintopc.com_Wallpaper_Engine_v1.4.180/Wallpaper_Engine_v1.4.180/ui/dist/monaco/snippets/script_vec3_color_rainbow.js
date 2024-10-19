'use strict';

import * as WEColor from 'WEColor';

let rainbowSpeed = 1;
let rainbowSaturation = 1;
let rainbowBrightness = 1;

/**
 * @param {Vec3} value
 */
export function update(value) {

	value = WEColor.hsv2rgb({
		x: Date.now() / 2000 * rainbowSpeed % 1,
		y: rainbowSaturation,
		z: rainbowBrightness
	});
	
	return value;
}
