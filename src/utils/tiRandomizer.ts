function tgm3Randomizer() {
	const pieces = ["I", "J", "L", "O", "S", "T", "Z"];
	const order = [];
	const piecelist = [];

	// Create 35 pool.
	const pool = pieces.concat(pieces, pieces, pieces, pieces);

	// First piece special conditions
	const firstPiece = ["I", "J", "L", "T"][Math.floor(Math.random() * 4)];
	piecelist.push(firstPiece);

	const history = ["S", "Z", "S", firstPiece];

	for (let j = 0; j < 100; j++) {
		let roll;
		let i;
		let piece;

		// Roll For piece
		for (roll = 0; roll < 6; ++roll) {
			i = Math.floor(Math.random() * 35);
			piece = pool[i];
			if (history.includes(piece) === false || roll === 5) {
				break;
			}
			if (order.length) pool[i] = order[0];
		}

		// Update piece order
		if (order.includes(piece)) {
			order.splice(order.indexOf(piece), 1);
		}
		order.push(piece);

		pool[i] = order[0];

		// Update history
		history.shift();
		history[3] = piece;

		piecelist.push(piece);
	}
	return piecelist;
}

// bag = ['j', 'i', 'z', 'l', 'o', 't', 's', 'j', 'i', 'z', 'l', 'o', 't', 's', 'j', 'i', 'z', 'l', 'o', 't', 's', 'j', 'i', 'z', 'l', 'o', 't', 's', 'j', 'i', 'z', 'l', 'o', 't', 's']

function choose(choices) {
	const index = Math.floor(Math.random() * choices.length);
	return choices[index];
}

function TiRandomizer() {
	const bag = [
		"j",
		"i",
		"z",
		"l",
		"o",
		"t",
		"s",
		"j",
		"i",
		"z",
		"l",
		"o",
		"t",
		"s",
		"j",
		"i",
		"z",
		"l",
		"o",
		"t",
		"s",
		"j",
		"i",
		"z",
		"l",
		"o",
		"t",
		"s",
		"j",
		"i",
		"z",
		"l",
		"o",
		"t",
		"s",
	];
	const history = ["s", "z", "s", "z"];
	const drought_order = ["j", "i", "z", "l", "o", "t", "s"];
	const count = { j: 0, i: 0, z: 0, l: 0, o: 0, t: 0, s: 0 };
	const n = 1;
	let piece;
	let roll = 0;
	let i;

	const first = choose(["j", "i", "l", "t"]);
	history.shift();
	history.push(first);
	console.log(first);

	for (let j = 0; j < 34; j++) {
		for (roll = 0; roll < 6; roll++) {
			i = Math.floor(Math.random() * 35);
			piece = bag[i];
			if (!history.includes(piece)) {
				break;
			}
			if (roll < 5) {
				bag[i] = drought_order[0];
			}
		}

		count[piece] += 1;
		if (
			!(
				piece == drought_order[0] &&
				roll > 0 &&
				Object.values(count).includes(0)
			)
		) {
			bag[i] = drought_order[0];
		}
		drought_order.splice(drought_order.indexOf(piece), 1);
		drought_order.push(piece);
		history.shift();
		history.push(piece);
		console.log(piece);
	}
}

/*
for (i = 0; i < 35; i++) {
	document.write(TiRandomizer().next().value)
}
*/
