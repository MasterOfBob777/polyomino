/**
 * Add divisor method so we can do clock arithmetics. This is later used to
 *  determine tetromino orientation.
 */
export function mod(v: number, n: number) {
	return ((v % n) + n) % n;
}

export function clamp(v: number, min: number, max: number) {
	return Math.min(Math.max(v, min), max);
}

export function fixed(v: number, digits: number) {
	return Math.round(v * Math.pow(10, digits)) / Math.pow(10, digits);
}

