import { sound } from "../display/sound/sound";
import { preview } from "../display/tetrion/preview";
import { Game } from "../game";
import { settings } from "../settings";
import { nes } from "../utils/blackjack";
import { Mutable } from "../utils/data";
import { RotSys } from "../utils/enums";
import { GameType } from "./base";
import { GameParams } from "./params";

export class Retro extends GameType {
	params: GameParams = {
		allowHardDrop: false,
	};

	isPBValid(): boolean {
		return false;
	}

	checkWin(): boolean {
		return Game.params.bType && Mutable.lines >= Mutable.lineLimit;
	}

	update(): void {
		// TODO: figure out if any code needs to go here
	}

	init() {
		if (!Game.params.proMode) {
			sound.loadbgm("retro");
		} else {
			sound.cutsidebgm();
			sound.loadbgm("retropro");
			sound.loadsidebgm("retroprodrought");
		}

		if (Game.settings.retro.type.val === 1) {
			Game.params.bType = true;
		}
		if (Game.settings.retro.level.val >= 16) {
			Game.params.proMode = true;
		}
		if (Game.settings.retro.drop.val === 1) {
			this.params.allowHardDrop = true;
		} else {
			this.params.allowHardDrop = false;
		}
		if (Game.settings.retro.skin.val === 1) {
			Game.params.retroSkin = true;
		}
		this.params.startingLevel = Game.settings.retro.level.val;

		settings.Next = 1;
		settings.set("RotSys", RotSys.Nintendo);
		settings.LockDelay = 80;
		settings.DAS = 16;
		settings.ARR = 6;
		settings.SoftDrop = 5;
		settings.Ghost = 2;
		if (Game.params.retroSkin === true) {
			settings.Block = 8;
		}

		settings.Outline = 0;
		settings.Grid = false;
		settings.Gravity = 0;

		preview.randomizer = nes;
	}

	gravityFunc(): number {
		//Classic
		if (Mutable.level <= 29) {
			return [
				1 / 48,
				1 / 43,
				1 / 38,
				1 / 33,
				1 / 28,
				1 / 23,
				1 / 18,
				1 / 13,
				1 / 8,
				1 / 6,
				1 / 5,
				1 / 5,
				1 / 5,
				1 / 4,
				1 / 4,
				1 / 4,
				1 / 3,
				1 / 3,
				1 / 3,
				1 / 2,
				1 / 2,
				1 / 2,
				1 / 2,
				1 / 2,
				1 / 2,
				1 / 2,
				1 / 2,
				1 / 2,
				1 / 2,
				1,
			][Mutable.level];
		} else {
			return 1;
		}
	}
}
