'use strict';

/**
 * Bind this script to the angles property of a layer for a simple 2D rotation.
 */

let rotationSpeed = 0.1;

/**
 * @param {Vec3} value
 */
export function update(value) {
	value.z = (engine.runtime * rotationSpeed) % 1.0 * 360;
	return value;
}
