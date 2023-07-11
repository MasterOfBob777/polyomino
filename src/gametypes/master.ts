import { sound } from "../display/sound/sound";
import { Game } from "../game";
import { Mutable } from "../utils/data";
import { GameType } from "./base";

export class Master extends GameType {
	isPBValid(): boolean {
		return false;
	}
	
	checkWin(): boolean {
		return Mutable.lines >= 300;
	}

	update(): void {
		// TODO: figure out if any code needs to go here
	}

	init() {
		if (Game.params.delayStrictness === 2) {
			sound.loadbgm("masterstrict");
			sound.loadsidebgm("masterstrictdire");
		} else {
			sound.loadbgm("master");
		}

		Game.params.delayStrictness = Game.settings.master.lock.val;
	}
}
