import { sound } from "../display/sound/sound";
import { piece } from "../display/tetrion/piece";
import { stack } from "../display/tetrion/stack";
import { Game } from "../game";
import { Elements, Mutable } from "../utils/data";
import { clamp } from "../utils/math";
import { rng } from "../utils/randomizer";
import { range, $setText } from "../utils/utils";
import { GameType } from "./base";

export class Dig extends GameType {
	update(): void {
		if (Game.params.zen) {
			for (
				;
				Mutable.lastPiecesSet < Mutable.piecesSet;
				Mutable.lastPiecesSet++
			) {
				Mutable.digZenBuffer++;
				const piecePerRise = [
					8,
					6.5,
					4,
					3.5,
					10 / 3,
					3,
					2.8,
					2.6,
					2.4,
					2.2,
					2,
				][clamp(Mutable.level, 0, 10)];
				if (Mutable.digZenBuffer - piecePerRise > -0.000000001) {
					Mutable.digZenBuffer -= piecePerRise;
					if (Math.abs(Mutable.digZenBuffer) < -0.000000001) {
						Mutable.digZenBuffer = 0;
					}
					const arrRow = [8, 8, 8, 8, 8, 8, 8, 8, 8, 8];
					arrRow[~~(rng.next() * 10)] = 0;

					stack.rowRise(arrRow, piece);
					sound.playSFX("garbage");
				}
			}
		}
	}

	init() {
		sound.loadbgm("sprint");

		Mutable.lastPiecesSet = 0;
		Mutable.digZenBuffer = 0;
		
		if (Game.settings.dig.checker.val == 1) {
			Game.params.digraceType = "checker";
		} else {
			Game.params.digraceType = "easy";
		}

		if (
			Game.params.digraceType === undefined ||
			Game.params.digraceType === "checker"
		) {
			// harder digrace: checkerboard
			Mutable.digLines = range(stack.height - 10, stack.height);
			$setText(Elements.statsLines, 10);
			for (let y = stack.height - 1; y > stack.height - 10 - 1; y--) {
				for (let x = 0; x < stack.width; x++) {
					if ((x + y) & 1) stack.grid[x][y] = 8;
				}
			}
		} else if (Game.params.digraceType === "easy") {
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

		Game.params.zen = Game.settings.dig.zen.val == 1;

		//stack.draw(); //resize
	}

	lineClear(lines: number): void {}
}
