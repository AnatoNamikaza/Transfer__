'use strict';

import * as WEMath from 'WEMath';

/**
 * Bind this script to the angles property of a layer for a pivoted 2D rotation.
 */

let rotationSpeed = 1;

/**
 * This sets the center of rotation. On X, -0.5 is left and 0.5 is right. On Y, -0.5 is the bottom and 0.5 the top.
 */
let normalizedPivot = new Vec3(0, -0.5);


var originalOrigin;
/**
 * @param {Vec3} value
 */
export function update(value) {

	let imageScale = new Vec3(thisLayer.size).multiply(thisLayer.scale);
	let pivot = imageScale.multiply(normalizedPivot);
	let newAngle = (engine.runtime * rotationSpeed);

	let angleCos = Math.cos(newAngle);
	let angleSin = Math.sin(newAngle);

	let offset = pivot.copy();
	// Rotate the pivot based on the own desired rotation of the layer.
	offset.x -= pivot.x * angleCos - pivot.y * angleSin;
	offset.y -= pivot.x * angleSin + pivot.y * angleCos;

	thisLayer.origin = originalOrigin.add(offset);

	value.z = newAngle * WEMath.rad2deg;
	return value;
}

/**
 * @param {Vec3} value
 */
export function init() {
	originalOrigin = thisLayer.origin;
}
