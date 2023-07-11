import { sound } from "../display/sound/sound";
import { piece } from "../display/tetrion/piece";
import { preview } from "../display/tetrion/preview";
import { Game } from "../game";
import { guideline, iOnly, noI } from "../utils/blackjack";
import { Mutable, sprintRanks } from "../utils/data";
import { Nullable } from "../utils/types";
import { GameType } from "./base";

export class Sprint extends GameType {
	checkWin(): boolean {
		return Mutable.lines >= Mutable.lineLimit;
	}

	customWinMessage() {
		if (Game.params?.backFire) {
			return "GREAT!";
		} else {
			let rank: Nullable<{
				t: number;
				u: string;
				b: string;
			}>;
			const time =
				(Date.now() - Mutable.scoreStartTime - Game.pauseTime) / 1000;

			for (let i = 0; i < sprintRanks.length; i++) {
				if (time > sprintRanks[i].t) {
					rank = sprintRanks[i];
					break;
				}
			}
			return rank?.b ?? "";
		}
	}

	update(): void {
		// TODO: figure out if any code needs to go here
	}

	init() {
		sound.loadbgm("sprint");

		Game.params.pieceSet = Game.settings.sprint.piece.val;

		preview.randomizer.reset();

		switch (Game.params.pieceSet) {
			case 0:
				preview.randomizer = guideline;
				break;
			case 1:
				preview.randomizer = noI;
				break;
			case 2:
				preview.randomizer = iOnly;
				break;
		}

		preview.reset();

		Game.params.backFire = Game.settings.sprint.backfire.val;
		switch (Game.settings.sprint.limit.val) {
			case 0:
				Mutable.lineLimit = 40;
				break;
			case 1:
				Mutable.lineLimit = 100;
				break;
			case 2:
				Mutable.lineLimit = 200;
				break;
		}
	}

	get pbKey() {
		return `sprint${Mutable.lineLimit}pb`;
	}

	isPBValid(dead: boolean): boolean {
		return (
			Game.params.pieceSet === 0 &&
			Game.params.backFire === 0 &&
			Mutable.lineLimit === 40 &&
			!dead
		);
	}

	lockDelayFunc(): Nullable<number> {
		if (piece.lockDelayLimit < 8) {
			return 8;
		}
	}
}
