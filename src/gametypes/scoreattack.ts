import { sound } from "../display/sound/sound";
import { Mutable } from "../utils/data";
import { GameType } from "./base";

export class ScoreAttack extends GameType {
	update(): void {
		// TODO: figure out if any code needs to go here
	}

	init() {
		sound.loadbgm("sprint");

		Mutable.lineLimit = 200;
	}
}
