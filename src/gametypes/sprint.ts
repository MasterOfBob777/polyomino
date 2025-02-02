import { getPB, setPB } from "../components/utils/PBView";
import { sound } from "../display/sound/sound";
import { preview } from "../display/tetrion/preview";
import { Game } from "../game";
import { guideline, iOnly, noI } from "../utils/blackjack";
import { Mutable } from "../utils/data";
import { timeString } from "../utils/string";
import { $setText, $ } from "../utils/utils";
import { GameType } from "./base";

export class Sprint extends GameType {
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

	pbKey = "sprint40pb";

	savePB = true;

	win() {
		const sprintPB = getPB("sprint40pb");
		if (
			(!sprintPB || Mutable.scoreTime < sprintPB) &&
			Mutable.watchingReplay == false &&
			Game.params.pieceSet == 0 &&
			Game.params.backFire == 0 &&
			Mutable.lineLimit == 40
		) {
			setPB("sprint40pb", Mutable.scoreTime);
		}
	}
}
