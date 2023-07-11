export function* range2x2(x: number, y: number) {
	for (let i = 0; i < x; i++) {
		for (let j = 0; j < y; j++) {
			yield [i, j];
		}
	}
}

export function wrapGenerator<T>(gen: () => Generator<T>) {
	let iter = gen();

	return {
		next: () => {
			return iter.next().value as T;
		},
		reset: () => {
			iter = gen();
		},
		[Symbol.iterator]: () => {
			return iter;
		},
	};
}
