'use strict';

import * as WEVector from 'WEVector';

/**
 * Attach this script to the 'origin' property of an image layer to make it bounce around the screen.
 * The layer must be smaller than the wallpaper or this script won't work!
 */

let bounceSpeed = 100;

// Choose a random direction in 90 degree steps
var direction = new Vec3(WEVector.angleVector2(45 + Math.floor(Math.random() * 4) * 90));

/**
 * @param {Vec3} value
 */
export function update(value) {

	let scale = thisLayer.scale;
	let imageSize = thisLayer.size;
	let canvasSize = engine.canvasSize;

	// We need the size from the center to the bounds.
	imageSize.x *= scale.x * 0.5;
	imageSize.y *= scale.y * 0.5;

	// Move along the direction.
	value = value.add(direction.multiply(engine.frametime * bounceSpeed));

	// Hit the screen bounds and reflect the direction.
	if (value.x < imageSize.x) {
		value.x = imageSize.x;
		direction = direction.reflect(new Vec3(1, 0));
	} else if (value.x > canvasSize.x - imageSize.x) {
		value.x = canvasSize.x - imageSize.x;
		direction = direction.reflect(new Vec3(-1, 0));
	}

	if (value.y < imageSize.y) {
		value.y = imageSize.y;
		direction = direction.reflect(new Vec3(0, 1));
	} else if (value.y > canvasSize.y - imageSize.y) {
		value.y = canvasSize.y - imageSize.y;
		direction = direction.reflect(new Vec3(0, -1));
	}

	return value;
}
