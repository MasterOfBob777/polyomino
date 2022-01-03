import { menu } from "../display/menu";
import { sound } from "../display/sound/sound";
import { piece } from "../display/tetrion/piece";
import { stack } from "../display/tetrion/stack";
import { Game } from "../game";
import { flags, arrStages, msg, Mutable } from "../utils/data";
import { rng } from "../utils/randomizer";
import { $setText } from "../utils/utils";
import { GameType } from "./base";

let frameLastRise;

export class Survival extends GameType {
	init() {
		sound.cutsidebgm();
		sound.loadbgm("survival");
		sound.loadsidebgm("survivaldire");

		frameLastRise = 0;
		Mutable.frameLastRise = 0;

		if (Game.settings.survival.zen.val == 1) {
			Game.type = 7;
		}
		Game.params.digOffset = 500 * Game.settings.survival.slevel.val;
	}

	update() {
		//Dig
		const fromLastRise = Mutable.frame - frameLastRise;
		const fromLastHD =
			flags.hardDrop & Mutable.keysDown
				? Mutable.frame - Mutable.frameLastRise
				: 0;

		const arrRow = [8, 8, 8, 8, 8, 8, 8, 8, 8, 8];
		let curStage = 0;
		const objCurStage = arrStages[curStage];

		while (
			curStage < arrStages.length &&
			arrStages[curStage].begin <=
				Mutable.lines + (Game.params["digOffset"] || 0)
		) {
			curStage++;
		}
		curStage--;
		// console.log(objCurStage.delay - fromLastRise)
		// rise display
		if (
			fromLastRise >= objCurStage.delay ||
			(fromLastHD >= 20 && fromLastRise >= 15)
		) {
			//IJLOSTZ
			const arrRainbow = [
				2, -1, 1, 5, 4, 3, 7, 6, -1, 8, 8, 8, 8, 6, 6, 2, 1, 5, 8, -1,
				7, 7, -1, 8, 8,
			];
			const flagAll = ~~(objCurStage.begin / 50) % 2;
			let idxRainbow = ~~(objCurStage.begin / 100);
			if (idxRainbow >= arrRainbow.length) {
				idxRainbow = arrRainbow.length - 1;
			}
			const colorUsed = arrRainbow[idxRainbow];
			for (
				let x = 0;
				x < stack.width;
				x += flagAll === 1 ? 1 : stack.width - 1
			) {
				if (colorUsed === -1) {
					arrRow[x] = ~~(rng.next() * 8 + 1);
				} else {
					arrRow[x] = colorUsed;
				}
			}

			objCurStage.gen(arrRow, stack);
			stack.rowRise(arrRow, piece);
			frameLastRise = Mutable.frame;
			sound.playSFX("garbage");
			let topOut = false;
			for (const test in stack.grid) {
				if (stack.grid[test][0] != undefined) {
					topOut = true;
				}
			}
			if (topOut) {
				piece.dead = true;
				Game.state = 9;
				$setText(msg, "TOP OUT!");
				menu(3);
				sound.playSFX("gameover");
				sound.playvox("lose");
				return;
			}
		}
	}
}
