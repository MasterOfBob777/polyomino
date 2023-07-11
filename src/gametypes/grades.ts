import { sound } from "../display/sound/sound";
import { piece } from "../display/tetrion/piece";
import { preview } from "../display/tetrion/preview";
import { Game } from "../game";
import { settings } from "../settings";
import { tgm3 } from "../utils/blackjack";
import { Mutable } from "../utils/data";
import { RotSys } from "../utils/enums";
import { GameType } from "./base";

export class Grades extends GameType {
	isPBValid(): boolean {
		return false;
	}

	checkWin(): boolean {
		throw new Error("Method not implemented.");
	}

	update(): void {
		// TODO: figure out if any code needs to go here
	}

	init() {
		piece.areLimit = 25;
		Mutable.lineARE = 40;
		Mutable.lineAREb = 0;
		settings.Next = 3;
		settings.DAS = 14;
		settings.LockDelay = 30;
		if (Game.params.classicRule === true) {
			settings.set("RotSys", RotSys.Arika);
			settings.Block = 3;
		} else {
			settings.set("RotSys", RotSys.Super);
			settings.Block = 2;
		}

		Game.params.classicRule = Game.settings.grades.rule.val !== 1;
		sound.loadbgm("grade1");
		sound.loadbgm("grade2");
		sound.loadbgm("grade3");

		preview.randomizer = tgm3;
	}

	
}
