function writeVL4(arr, num) {
	let halfByte;
	do {
		halfByte = num & 7;
		num >>= 3;
		if (num !== 0) halfByte |= 8;
		arr.push(halfByte);
	} while (num !== 0);
}

function scanVL4(arr, ptr, refNum) {
	let halfByte;
	let len = 0;
	let num = 0;
	do {
		halfByte = arr[ptr];
		if (halfByte === undefined) return null; // error
		//throw 4;
		num |= (halfByte & 7) << (len * 3);
		if ((halfByte & 8) === 8) len++;
		ptr++;
	} while ((halfByte & 8) === 8);
	if (len > 0 && num < 8) return -1;
	else {
		refNum[0] = num;
		return ptr;
	}
}

const base67 =
	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_+=@"; // 67*67 < 16*16*16 + 16*16 + 16
const base67rev = (() => {
	const rev = {};
	for (let i = 0; i < base67.length; i++) {
		rev[base67[i]] = i;
	}
	return rev;
})();

export function keysEncode(keys) {
	let lastFrame = 0;
	let lastKeys = 0;
	const arrHB = [];
	const arrBase67 = [];
	let curFrame; let curKeys;
	for (const i in keys) {
		curFrame = +i;
		curKeys = keys[i];
		for (let xhb = 0; xhb < 10; xhb++) {
			if ((curKeys ^ lastKeys) & (1 << xhb)) {
				writeVL4(arrHB, curFrame - lastFrame);
				arrHB.push(xhb);
				//console.log("key", curFrame - lastFrame, xhb, i)
				lastFrame = curFrame;
			}
		}
		lastKeys = curKeys;
	}
	arrHB.push(8);
	arrHB.push(0);

	//console.log(arrHB);

	const nHB = arrHB.length;
	let sum;
	for (let ptr = 0; ptr < nHB; ptr += 3) {
		if (nHB - ptr >= 3) {
			sum = arrHB[ptr] + arrHB[ptr + 1] * 16 + arrHB[ptr + 2] * 16 * 16;
		} else if (nHB - ptr == 2) {
			sum = arrHB[ptr] + arrHB[ptr + 1] * 16 + 16 * 16 * 16;
		} else if (nHB - ptr == 1) {
			sum = arrHB[ptr] + 16 * 16 + 16 * 16 * 16;
		}
		//console.log(sum);
		arrBase67.push(base67[sum % 67] + base67[Math.floor(sum / 67)]);
	}

	return arrBase67.join("");
}

export function keysDecode(str) {
	let lastFrame = 0;
	let lastKeys = 0;
	const keys = {};
	const arrHB = [];
	const arrBase67 = [];
	const objNum = [0]; // pass by reference

	if (str.length % 2 !== 0) return null;

	for (let ptr = 0; ptr < str.length; ptr += 2) {
		const lo67 = base67rev[str[ptr]];
			const hi67 = base67rev[str[ptr + 1]];
		//console.log(lo67 + " " + hi67 + " " + (lo67 + hi67 * 67));
		if (lo67 === undefined || hi67 === undefined) return null;
		//throw 1;
		arrBase67.push(lo67 + hi67 * 67);
	}

	for (let i = 0; i < arrBase67.length; i++) {
		let data = arrBase67[i];
		//console.log(data);
		if (data < 16 * 16 * 16) {
			arrHB.push(data & 15);
			data >>= 4;
			arrHB.push(data & 15);
			data >>= 4;
			arrHB.push(data & 15);
		} else if (data < 16 * 16 * 16 + 16 * 16) {
			data -= 16 * 16 * 16;
			arrHB.push(data & 15);
			data >>= 4;
			arrHB.push(data & 15);
		} else if (data < 16 * 16 * 16 + 16 * 16 + 16) {
			data -= 16 * 16 * 16 + 16 * 16;
			arrHB.push(data & 15);
		} else {
			//return null;
			throw 2;
		}
	}

	//console.log(arrHB.length, arrHB.toString());

	for (let i = 0; i < arrHB.length; ) {
		const nexti = scanVL4(arrHB, i, objNum);
		if (nexti === null) {
			//return null;
			console.log("scanVL4 null:", i, arrHB.length);
			throw 3;
		}
		if (nexti === -1) break;
		i = nexti;
		lastFrame += objNum[0];
		lastKeys ^= 1 << arrHB[i]; // flip that bit
		keys[lastFrame] = lastKeys;
		//console.log("event:",objNum[0],"F interval, key:", arrHB[i]);
		i++;
	}

	return keys;
}
