
import { Mino } from "../utils/enums";
import { createGameTypeJson, Functions } from "../../tests/json/json";
import { guid } from "../utils/random-id";

const [I, S, J, O, Z, T, L] = [1, 5, 2, 4, 7, 6, 3];

const firstSetUnmirrored = [
	[I, S, 0, 0, 0, 0, 0, 0, 0, 0],
	[I, S, S, 0, 0, 0, 0, T, 0, 0],
	[I, J, S, 0, Z, Z, T, T, O, O],
	[I, J, J, J, 0, Z, Z, T, O, O],
];

const firstSetMirrored = [
	[0, 0, 0, 0, 0, 0, 0, 0, Z, I],
	[0, 0, T, 0, 0, 0, 0, Z, Z, I],
	[O, O, T, T, S, S, 0, Z, L, I],
	[O, O, T, S, S, 0, L, L, L, I],
];

const secondSetOUnmirrored = [
	[L, L, 0, 0, 0, 0, 0, 0, 0, I],
	[L, L, 0, 0, 0, 0, 0, 0, 0, I],
	[L, L, J, J, 0, 0, 0, 0, 0, I],
	[L, L, J, 0, 0, 0, 0, S, S, I],
	[0, 0, J, 0, Z, Z, S, S, O, O],
	[0, 0, 0, 0, 0, Z, Z, 0, O, O],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const secondSetSUnmirrored = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[J, J, O, O, 0, 0, 0, 0, 0, 0],
	[J, S, O, O, 0, 0, L, 0, 0, I],
	[J, S, S, 0, 0, 0, L, L, L, I],
	[0, 0, S, 0, Z, Z, L, L, L, I],
	[0, 0, 0, 0, 0, Z, Z, 0, L, I],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const secondSetIUnmirrored = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, S, S],
	[O, O, J, J, 0, 0, L, S, S, I],
	[O, O, J, 0, 0, 0, L, L, L, I],
	[0, 0, J, 0, Z, Z, L, L, L, I],
	[0, 0, 0, 0, 0, Z, Z, 0, L, I],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const secondSetOMirrored = [
	[L, L, 0, 0, 0, 0, 0, 0, 0, I],
	[L, L, 0, 0, 0, 0, 0, 0, 0, I],
	[L, L, J, J, 0, 0, 0, 0, 0, I],
	[L, L, J, 0, 0, 0, 0, S, S, I],
	[0, 0, J, 0, Z, Z, S, S, O, O],
	[0, 0, 0, 0, 0, Z, Z, 0, O, O],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const secondSetSMirrored = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[J, J, O, O, 0, 0, 0, 0, 0, 0],
	[J, S, O, O, 0, 0, L, 0, 0, I],
	[J, S, S, 0, 0, 0, L, L, L, I],
	[0, 0, S, 0, Z, Z, L, L, L, I],
	[0, 0, 0, 0, 0, Z, Z, 0, L, I],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const secondSetIMirrored = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, S, S],
	[O, O, J, J, 0, 0, L, S, S, I],
	[O, O, J, 0, 0, 0, L, L, L, I],
	[0, 0, J, 0, Z, Z, L, L, L, I],
	[0, 0, 0, 0, 0, Z, Z, 0, L, I],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function label(name: string) {
	return {
		type: "label",
		name,
	} as const;
}

function jump(label: string) {
	return {
		type: "jump",
		label,
	} as const;
}

function loop(functions: Array<Functions>) {
	const name = guid(5);

	return [label(name), ...functions, jump(name)];
}

function match(
	_case: string,
	functions: Record<string, Functions[]>
): Functions[] {
	const end = guid(5);

	return [
		{
			type: "run",
			code: `jump(${_case});cantContinue();index=index-1`,
		},
		...Object.entries(functions)
			.map(([case_, funcs]) => {
				return [label(case_), ...funcs, jump(end)];
			})
			.flat(),
		jump(end),
	];
}

function showGhostWaitMatched(ghost: number[][]): Functions[] {
	return [
		{
			type: "showGhost",
			board: ghost,
		},
		{
			type: "board",
			matchesGhost: true,
		},
	];
}

export const Training = createGameTypeJson({
	name: "Training",
	description: "Training",

	goal: {
		time: 100 * 60 * 1000,
	},

	functions: [
		{
			type: "run",
			code: `
				LorJ() = findFirstOf(bag, [Mino.L, Mino.J]);
				OSorI() = findFirstOf(bag, [Mino.O, Mino.S, Mino.I]);
			`,
		},

		...match(`LorJ()`, {
			[Mino.J]: [
				...showGhostWaitMatched(firstSetUnmirrored),
				...match(`OSorI()`, {
					[Mino.O]: showGhostWaitMatched(secondSetOUnmirrored),
					[Mino.S]: showGhostWaitMatched(secondSetSUnmirrored),
					[Mino.I]: showGhostWaitMatched(secondSetIUnmirrored),
				})
			],
			[Mino.L]: [
				...showGhostWaitMatched(firstSetMirrored),
				...match(`OSorI()`, {
					[Mino.O]: showGhostWaitMatched(secondSetOMirrored),
					[Mino.S]: showGhostWaitMatched(secondSetSMirrored),
					[Mino.I]: showGhostWaitMatched(secondSetIMirrored),
				})
			],
		}),
		{
			type: "score",
			value: 3000,
		},
		{
			type: "win",
		},
	],
});