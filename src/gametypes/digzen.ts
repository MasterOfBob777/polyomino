import { sound } from "../display/sound/sound";
import { piece } from "../display/tetrion/piece";
import { stack } from "../display/tetrion/stack";
import { Mutable } from "../utils/data";
import { rng } from "../utils/randomizer";
import { GameType } from "./base";

export class DigZen extends GameType {
	init() {
		//
	}

	update() {
		//dig zen
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
			][Mutable.level > 10 ? 10 : Mutable.level];
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
