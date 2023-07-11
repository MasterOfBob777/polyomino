import { getPB, setPB } from "../components/utils/PBView";
import { Mutable } from "../utils/data";
import { Mino } from "../utils/enums";
import { Nullable } from "../utils/types";
import { GameParams } from "./params";

export abstract class GameType {
	checkDie(): Nullable<boolean> {
		return;
	}

	customGhostDisplay(): Nullable<number[][]> {
		return;
	}

	lockDelayFunc(): Nullable<number> {
		return;
	}

	params: GameParams = {
		allowHardDrop: true,
	};

	defaultParams = {};

	customWinMessage(): Nullable<string> {
		return;
	}

	gravityFunc(): Nullable<number> {
		return;
	}

	win(): void {}

	die(): void {}

	done() {}

	abstract init(): void;

	abstract update(): void;

	abstract isPBValid(dead: boolean): boolean;

	get pbKey() {
		return "";
	}

	checkPB() {
		const pb = getPB(this.pbKey);
		if (
			(!pb || Mutable.scoreTime < pb) &&
			Mutable.watchingReplay === false
		) {
			setPB(this.pbKey, Mutable.scoreTime);
		}
	}

	abstract checkWin(): boolean;

	onLineClear(lines: number, piece: Mino, spin: boolean) {
		
	}
}
