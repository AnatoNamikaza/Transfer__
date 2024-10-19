'use strict';

var isDragging = false;
var dragOffset;

/**
 * @param {ICursorEvent} event
 */
export function cursorDown(event) {
	isDragging = true;
	dragOffset = thisLayer.origin.subtract(event.worldPosition);
}

/**
 * @param {ICursorEvent} event
 */
export function cursorUp(event) {
	isDragging = false;
}

/**
 * @param {ICursorEvent} event
 */
export function cursorMove(event) {
	if (isDragging) {
		thisLayer.origin = event.worldPosition.add(dragOffset);
	}
}
