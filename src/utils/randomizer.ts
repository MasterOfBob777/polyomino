/**
 * Park Miller "Minimal Standard" PRNG.
 */
//TODO put random seed method in here.

import { wrapGenerator } from "./generators";

let seed = Math.floor(Math.random() * 2147483647);
export const rng = wrapGenerator(function* () {
	while (true) yield (seed = (seed * 16807) % 2147483647) / 2147483647;
});

export function setRNGSeed(newSeed: number) {
	seed = newSeed;
}

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
