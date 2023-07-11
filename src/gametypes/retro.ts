import { sound } from "../display/sound/sound";
import { preview } from "../display/tetrion/preview";
import { Game } from "../game";
import { settings } from "../settings";
import { nes } from "../utils/blackjack";
import { RotSys } from "../utils/enums";
import { GameType } from "./base";

export class Retro extends GameType {
	update(): void {
		// TODO: figure out if any code needs to go here
	}
	
	init() {
		if (Game.params.proMode == false) {
			sound.loadbgm("retro");
		} else {
			sound.cutsidebgm();
			sound.loadbgm("retropro");
			sound.loadsidebgm("retroprodrought");
		}

		if (Game.settings.retro.type.val == 1) {
			Game.params.bType = true;
		}
		if (Game.settings.retro.level.val >= 16) {
			Game.params.proMode = true;
		}
		if (Game.settings.retro.drop.val == 1) {
			Game.params.allowHardDrop = true;
		}
		if (Game.settings.retro.skin.val == 1) {
			Game.params.retroSkin = true;
		}
		Game.params.startingLevel = Game.settings.retro.level.val;

		settings.Next = 1;
		settings.set("RotSys", RotSys.Nintendo);
		settings.LockDelay = 80;
		settings.DAS = 16;
		settings.ARR = 6;
		settings.SoftDrop = 5;
		settings.Ghost = 2;
		if (Game.params.retroSkin == true) {
			settings.Block = 8;
		}

		settings.Outline = 0;
		settings.Grid = false;
		settings.Gravity = 0;

		preview.randomizer = nes;
	}
}
