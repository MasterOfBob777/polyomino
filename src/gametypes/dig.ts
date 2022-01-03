import { sound } from "../display/sound/sound";
import { stack } from "../display/tetrion/stack";
import { Game } from "../game";
import { Elements, Mutable } from "../utils/data";
import { rng } from "../utils/randomizer";
import { range, $setText } from "../utils/utils";
import { GameType } from "./base";

export class Dig extends GameType {
	update(): void {
		// TODO: figure out if any code needs to go here
	}

	init() {
		sound.loadbgm("sprint");

		// Dig Race
		// make ten random numbers, make sure next isn't the same as last? t=rnd()*(size-1);t>=arr[i-1]?t++:; /* farter */
		//TODO make into function or own file.
		if (Game.settings.dig.checker.val == 1) {
			Game.params.digraceType = "checker";
		} else {
			Game.params.digraceType = "easy";
		}

		if (
			Game.params["digraceType"] === undefined ||
			Game.params["digraceType"] === "checker"
		) {
			// harder digrace: checkerboard
			Mutable.digLines = range(stack.height - 10, stack.height);
			$setText(Elements.statsLines, 10);
			for (let y = stack.height - 1; y > stack.height - 10 - 1; y--) {
				for (let x = 0; x < stack.width; x++) {
					if ((x + y) & 1) stack.grid[x][y] = 8;
				}
			}
		} else if (Game.params["digraceType"] === "easy") {
			const begin = ~~(rng.next() * stack.width);
			const dire = ~~(rng.next() * 2) * 2 - 1;
			Mutable.digLines = range(stack.height - 10, stack.height);
			$setText(Elements.statsLines, 10);
			for (let y = stack.height - 1; y > stack.height - 10 - 1; y--) {
				for (let x = 0; x < stack.width; x++) {
					if ((begin + dire * y + x + stack.width * 2) % 10 !== 0)
						stack.grid[x][y] = 8;
				}
			}
		}
		//stack.draw(); //resize
	}
}
