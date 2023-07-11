import { sound } from "../display/sound/sound";
import { Mutable } from "../utils/data";
import { GameType } from "./base";

const TWO_MINUTES = 1000 * 60 * 60 * 2;

export class ScoreAttack extends GameType {
	
	checkWin(): boolean {
		return Mutable.scoreTime >= TWO_MINUTES;
	}
	
	update(): void {
		// TODO: figure out if any code needs to go here
	}
	
	isPBValid(dead: boolean): boolean {
		return !dead;
	}

	init() {
		sound.loadbgm("sprint");
	}
}
