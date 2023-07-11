import { preview } from "../../src/display/tetrion/preview";
import { stack } from "../../src/display/tetrion/stack";
import { Mutable } from "../../src/utils/data";
import { Mino } from "../../src/utils/enums";
import { safeMath } from "./mathjs";
import type {
	DeepPartial,
	DeepUnpartial,
	Nullable,
	RangeOf,
	toUnion,
	ValuesOf,
} from "../../src/utils/types";
import { GameType } from "../../src/gametypes/base";
import { GameParams } from "../../src/gametypes/params";

export type Functions =
	| {
			type: "showGhost";
			board: number[][];
	  }
	| {
			type: "changeTuning";
			param: string;
			value: ValuesOf<
				DeepUnpartial<JSONGameType>["initialSettings"]["tuning"]
			>;
	  }
	| {
			type: "changeDisplay";
			param: string;
			value: ValuesOf<
				DeepUnpartial<JSONGameType>["initialSettings"]["display"]
			>;
	  }
	| {
			type: "score";
			value: number | string;
	  }
	| {
			type: "time";
			value: number | string;
	  }
	| {
			type: "lines";
			value: number | string;
	  }
	| {
			type: "lineClear";
			lines: number | string;
			piece: Mino | Mino[];
			spin: boolean;
	  }
	| {
			type: "board";
			// if the board matches the current ghost pieces
			matchesGhost: boolean;
			board?: number[][];
	  }
	| {
			type: "label";
			name: string;
	  }
	| {
			type: "jump";
			label: string;
	  }
	| {
			type: "die";
	  }
	| {
			type: "win";
	  }
	| {
			type: "run";
			code: string;
	  };

export type JSONGameType = DeepPartial<{
	name: string;
	description: string;

	initialSettings: {
		board: {
			width: number;
			height: number;
			state: number[][];
		};
		tuning: {
			arr: number;
			das: number;
			sdf: number;
			hardDrop: boolean;
			gravity: number;
			lockDelay: number;
		};
		display: {
			ghost: boolean;
			next: toUnion<RangeOf<1, 7>>;
		};
	};

	goal: {
		lines: number | string;
		score: number | string;
		time: number | string;
	};

	functions: Array<Functions>;
}>;

function matchBoardState(board: number[][]): boolean {
	const len = board.length;
	const width = board[0].length;
	for (let y = 0; y < width; y++) {
		for (let x = 0; x < len; x++) {
			if (board[x][y]) {
				const xx = y;
				const yy = x + stack.height - len;

				if (stack.grid[xx][yy] !== board[x][y]) {
					return false;
				}
			}
		}
	}
	return true;
}

function getFirst<T>(arr: T[], things: T[]): Nullable<T> {
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < things.length; j++) {
			const thing = things[j];
			if (arr[i] === thing) {
				return thing;
			}
		}
	}
}

export function createGameTypeJson(
	string: string | JSONGameType
): new () => GameType {
	const json: JSONGameType =
		typeof string === "string" ? JSON.parse(string) : string;

	const functions = json.functions ?? [];

	return class extends GameType {
		name = json.name ?? "unknown";

		description = json.description ?? "";

		defaultParams: GameParams = {
			allowHardDrop: json.initialSettings?.tuning?.hardDrop,
			gravityOverride: json.initialSettings?.tuning?.gravity,
			lockDelayOverride: json.initialSettings?.tuning?.lockDelay,
		};

		parser: math.Parser;

		canContinue = true;

		constructor() {
			super();
			this.parser = safeMath.parser();

			this.parser.set("Mino", Mino);
			this.parser.set("call", (f: (...args) => any, ...args) =>
				f(...args)
			);
			this.parser.set(
				"if",
				(cond: boolean, f1: (...args) => any, f2: (...args) => any) => {
					if (cond) {
						f1();
					} else {
						f2();
					}
				}
			);
			this.parser.set("switch", (cond: any, cases: any) => {
				cases?.[cond]?.();
			});
			this.parser.set("throw", (message: string) => {
				throw new Error(message);
			});
			this.parser.set("jump", (label: any) => {
				const name = label + "";
				this.index = functions.findIndex(
					(f) => f.type === "label" && f.name === name
				);
			});
			this.parser.set("findFirstOf", (arr: any[], things: any[]) => {
				return getFirst(arr, things);
			});
			this.parser.set("index", 0);
			this.parser.set("cantContinue", () => {
				this.canContinue = false;
			})
		}

		init(): void {
			this.index = 0;
			this.dead = false;
			this.won = false;
			this.currentGhost = [];
			this.waiting = false;
		}

		index = 0;

		currentGhost: Mino[][] = [];

		waiting = false;

		dead = false;

		won = false;

		compare(str: string | number | undefined, v: number | bigint): boolean {
			if (typeof str === "undefined") {
				throw new Error("No comparision string provided");
			}
			return typeof str === "number"
				? v === str
				: !!this.parser.evaluate(str);
		}

		update(): void {

			this.parser.set("score", Mutable.score);
			this.parser.set("time", Mutable.scoreTime);
			this.parser.set("lines", Mutable.lines);
			this.parser.set("combo", Mutable.combo);
			this.parser.set("level", Mutable.level);
			this.parser.set("b2b", Mutable.b2b);
			this.parser.set("bag", preview.grabBag);

			do {
				if (this.waiting || this.dead || this.won) return;

				const codeIndex = this.parser.get("index");
				if (codeIndex) {
					this.index = codeIndex;
				}

				if (this.index < 0 || this.index >= functions.length) { 
					throw new Error("Invalid function index");
				}

				this.parser.set("index", this.index);

				let current = functions[this.index];
				if (!current) {
					this.index = 0;
					current = functions[0];
				}
				switch (current.type) {
					case "showGhost":
						if (!current.board) {
							throw new Error("No board provided");
						}
						this.currentGhost = current.board as Mino[][];
						break;
					case "changeTuning":
						// this.changeTuning(current.param, current.value);
						break;
					case "changeDisplay":
						// this.changeDisplay(current.param, current.value);
						break;
					case "score":
						if (!this.compare(current.value, Mutable.score)) {
							this.index--;
							this.canContinue = false;
						}
						break;
					case "time":
						if (!this.compare(current.value, Mutable.scoreTime)) {
							this.index--;
							this.canContinue = false;
						}
						break;
					case "lines":
						if (!this.compare(current.value, Mutable.lines)) {
							this.index--;
							this.canContinue = false;
						}
						break;
					case "lineClear":
						this.waiting = true;
						this.index--;
						break;
					case "board":
						if (!current.matchesGhost && !current.board) {
							throw new Error("No board provided");
						}
						if (
							!matchBoardState(
								current?.matchesGhost
									? this.currentGhost
									: (current.board as Mino[][])
							)
						) {
							this.index--;
							this.canContinue = false;
						}
						break;
					case "label":
						break;
					case "jump":
						if (!current.label) {
							throw new Error("No label provided");
						}
						this.index = functions.findIndex(
							(v) =>
								v.type === "label" &&
								v.name === (current as { label: string }).label
						);
						this.index--;
						break;
					case "die":
						this.dead = true;
						this.canContinue = false;
						break;
					case "win":
						this.won = true;
						this.canContinue = false;
						break;
					case "run":
						if (!current.code) {
							throw new Error("No code provided");
						}
						this.parser.evaluate(current.code);
						break;
				}
				this.index++;
			} while (this.canContinue);
		}

		isPBValid(dead: boolean): boolean {
			return !dead;
		}

		checkWin(): boolean {
			if (this.won) {
				return true;
			}
			return false;
		}

		checkDead(): boolean {
			if (this.dead) {
				return true;
			}
			return false;
		}

		onLineClear(lines: number, piece: Mino, spin: boolean): void {
			if (this.waiting) {
				const current = functions[this.index];
				if (current.type === "lineClear") {
					if (
						this.compare(current.lines, lines) &&
						(typeof current.piece === "number"
							? current.piece === piece
							: (current.piece as number[]).includes(piece)) &&
						(current.spin ? true : current.spin === spin)
					) {
						this.waiting = false;
						this.index++;
					}
				}
			}
		}
	};
}
