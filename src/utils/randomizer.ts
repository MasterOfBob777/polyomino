/**
 * Park Miller "Minimal Standard" PRNG.
 */
//TODO put random seed method in here.

class Random {
	seed: number;

	constructor() {
		this.seed = 1;
	}

	next(): number {
		// Returns a float between 0.0, and 1.0
		return this.gen() / 2147483647;
	}

	gen() {
		return (this.seed = (this.seed * 16807) % 2147483647);
	}
}

export const rng = new Random();

export function randomInt(min: number, max: number): number {
	return Math.floor(rng.next() * (max - min + 1)) + min;
}

export function randomIntExcept(
	min: number,
	max: number,
	exclude: number
): number {
	let r = randomInt(min, max);
	while (r === exclude) {
		r = randomInt(min, max);
	}
	return r;
}