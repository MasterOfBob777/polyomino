import { getPB, setPB } from "../components/utils/PBView";
import { sound } from "../display/sound/sound";
import { piece } from "../display/tetrion/piece";
import { stack } from "../display/tetrion/stack";
import { Game } from "../game";
import { Elements, Mutable } from "../utils/data";
import { clamp, mod } from "../utils/math";
import { randomInt, randomIntExcept, rng } from "../utils/randomizer";
import { range, $setText } from "../utils/utils";
import { GameType } from "./base";

export class Dig extends GameType {
	update(): void {
		if (Game.params.zen) {
			while (Mutable.lastPiecesSet < Mutable.piecesSet) {
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
					arrRow[Math.floor(rng.next() * 10)] = 0;

					stack.rowRise(arrRow, piece);
					sound.playSFX("garbage");
				}
				Mutable.lastPiecesSet++;
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
			Mutable.digLines = range(stack.height - 10, stack.height);
			$setText(Elements.statsLines, 10);
			let last = stack.width;
			for (let y = stack.height - 1; y > stack.height - 10 - 1; y--) {
				const r = randomIntExcept(0, stack.width - 1, last);
				for (let x = 0; x < stack.width; x++) {
					stack.grid[x][y] = x == r ? 0 : 8;
				}
				last = r;
			}
		} else if (Game.params.digraceType === "easy") {
			let begin = randomInt(0, stack.width);
			Mutable.digLines = range(stack.height - 10, stack.height);
			$setText(Elements.statsLines, 10);
			for (let y = stack.height - 1; y > stack.height - 10 - 1; y--) {
				const m = mod(begin++, stack.width);
				for (let x = 0; x < stack.width; x++) {
					stack.grid[x][y] = m == x ? 0 : 8;
				}
			}
		}

		Game.params.zen = Game.settings.dig.zen.val == 1;

		//stack.draw(); //resize
	}

	pbKey = "dig10pb";

	savePB = true;

	win() {
		const digPB = getPB("dig10pb");
		if (
			(!digPB || Mutable.scoreTime < digPB) &&
			Mutable.watchingReplay == false &&
			Game.params.digraceType == "easy"
		) {
			setPB("dig10pb", Mutable.scoreTime);
		}
	}
}
