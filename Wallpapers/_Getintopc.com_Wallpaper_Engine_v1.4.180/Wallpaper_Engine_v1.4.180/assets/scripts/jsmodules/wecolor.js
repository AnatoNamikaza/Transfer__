'use strict';

export function rgb2hsv(r) {
	var g, b;
	g = r.y, b = r.z, r = r.r;
	var max = Math.max(r, g, b), min = Math.min(r, g, b),
		d = max - min,
		h,
		s = (max === 0 ? 0 : d / max),
		v = max;

	switch (max) {
		case min: h = 0; break;
		case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
		case g: h = (b - r) + d * 2; h /= 6 * d; break;
		case b: h = (r - g) + d * 4; h /= 6 * d; break;
	}

	return {
		x: h,
		y: s,
		z: v
	};
}

export function hsv2rgb(h) {
	var r, g, b, i, f, p, q, t, s, v;
	s = h.y, v = h.z, h = h.x;
	i = Math.floor(h * 6);
	f = h * 6 - i;
	p = v * (1 - s);
	q = v * (1 - f * s);
	t = v * (1 - (1 - f) * s);
	switch (i % 6) {
		case 0: r = v, g = t, b = p; break;
		case 1: r = q, g = v, b = p; break;
		case 2: r = p, g = v, b = t; break;
		case 3: r = p, g = q, b = v; break;
		case 4: r = t, g = p, b = v; break;
		case 5: r = v, g = p, b = q; break;
	}
	return {
		x: r,
		y: g,
		z: b
	};
}

export function normalizeColor(color) {
	return {
		x: color.x / 255,
		y: color.y / 255,
		z: color.z / 255
	};
}

export function expandColor(color) {
	return {
		x: color.x * 255,
		y: color.y * 255,
		z: color.z * 255
	};
}


