import { sound } from "../display/sound/sound";
import { Game } from "../game";
import { settings } from "../settings";
import { Mutable } from "../utils/data";
import { Nullable } from "../utils/types";
import { GameType } from "./base";

export class Marathon extends GameType {
	limit?: number;

	isPBValid(): boolean {
		return false;
	}

	checkWin(): boolean {
		return !!this.limit && Mutable.lines >= this.limit;
	}

	update(): void {
		// TODO: figure out if any code needs to go here
	}

	init() {
		switch (Game.settings.marathon.limit.val) {
			case 0:
				this.limit = 150;
				break;
			case 1:
				this.limit = 200;
				break;
			case 2:
				this.limit = undefined;
				break;
			case 3:
				this.limit = 300;
				break;
		}

		Game.params.entryDelay = Game.settings.marathon.delay.val;
		this.params.gravityOverride = Game.settings.marathon.nograv.val
			? 0
			: undefined;
		if (Game.settings.marathon.invisible.val === 1) {
			Game.params.invisibleMarathon = true;
		}
		if (Game.settings.marathon.cap.val === 1) {
			this.params.levelCap = 1;
		} else {
			this.params.levelCap = undefined;
		}

		sound.loadbgm("marathon");
		sound.loadbgm("marathon2");
		sound.loadbgm("marathon3");

		settings.Gravity = 0;
	}

	gravityFunc(): number {
		//Marathon
		// if (Scores.level < 20) {
		// this.gravity = [
		// 1/63, 1/50, 1/39, 1/30, 1/22, 1/16, 1/12, 1/8,  1/6,  1/4,
		// 1/3,  1/2,  1,  465/256,  731/256,  1280/256,    1707/256,   14,    19,    20
		// ]
		// [Scores.level];
		// } else {
		// this.gravity = 20;
		// this.lockDelayLimit = Math.floor(30 * Math.pow(0.93, (Math.pow(Scores.level-20, 0.8)))); // magic!
		// }
		if (Mutable.level < 18) {
			const x = Mutable.level + 1;
			return 1 / ((0.8 - (x - 1) * 0.007) ** (x - 1) * 60);
		} else if (Mutable.level < 19) {
			return 19.99;
		} else {
			return 20;
		}
	}

	lockDelayFunc(): Nullable<number> {
		if (Mutable.level < 19) {
			return Math.floor(
				30 * Math.pow(0.93, Math.pow(Mutable.level - 19, 0.8))
			); // magic!
		}
	}
}
