import { sound } from "../display/sound/sound";
import { Game } from "../game";
import { Mutable } from "../utils/data";
import { GameType } from "./base";

export class Sprint extends GameType {
	update(): void {
		// TODO: figure out if any code needs to go here
	}

	init() {
		sound.loadbgm("sprint");

		Game.params.pieceSet = Game.settings.sprint.piece.val;
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
}
