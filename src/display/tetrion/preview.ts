import { Game } from "../../game";
import { hold } from "../../logic/hold";
import { draw } from "../../logic/view";
import { settings } from "../../settings";
import { guideline } from "../../utils/blackjack";
import { pieces, PieceData, Elements } from "../../utils/data";
import { GameState, GameType } from "../../utils/enums";
import { rng } from "../../utils/randomizer";
import { clear, $ } from "../../utils/utils";
import { piece } from "./piece";

class Preview {
	grabBag = [];

	randomizer = guideline;

	dirty: boolean;

	fillGrabBag() {
		while (this.grabBag.length <= 7) {
			this.grabBag.push(PieceData[this.randomizer.next()].index);
		}
		this.dirty = true;
	}

	reset() {
		this.grabBag = [];
		this.randomizer.reset();
		this.fillGrabBag();
		this.draw();
	}

	next() {
		const next = this.grabBag.shift();
		this.fillGrabBag();
		return next;
	}

	/**
	 * Draws the piece preview.
	 */
	draw() {
		clear(Elements.previewCtx);

		const drawCount = settings.Next === undefined ? 6 : settings.Next;
		if (Game.state === GameState.Normal) {
			// TODO: was this always empty?
		}
		for (let i = 0; i < drawCount; i++) {
			let p = this.grabBag[i];
			const initInfo = settings.RotSys.initinfo[p];
			const r = initInfo[2];
			const rect = pieces[p].rect;
			const rotSysColor = settings.RotSys.color[p];
			if (i == 0) {
				if (piece.ihs == true) {
					if (hold.piece == null) {
						p = this.grabBag[i + 1];
					} else {
						p = hold.piece;
					}
				}
				switch (piece.irsDir) {
					case -1: //left
						draw(
							pieces[p].tetro[(r + 3) % 4],
							-rect[r][0] + (4 - rect[r][2] + rect[r][0]) / 2,
							-rect[r][1] +
								(3 - rect[r][3] + rect[r][1]) / 2 +
								i * 3,
							Elements.previewCtx,
							rotSysColor
						);
						break;
					case 0: //nothing
						draw(
							pieces[p].tetro[r],
							-rect[r][0] + (4 - rect[r][2] + rect[r][0]) / 2,
							-rect[r][1] +
								(3 - rect[r][3] + rect[r][1]) / 2 +
								i * 3,
							Elements.previewCtx,
							rotSysColor
						);
						$("irs-indicator").classList.add("gone");
						break;
					case 1: //right
						draw(
							pieces[p].tetro[(r + 1) % 4],
							-rect[r][0] + (4 - rect[r][2] + rect[r][0]) / 2,
							-rect[r][1] +
								(3 - rect[r][3] + rect[r][1]) / 2 +
								i * 3,
							Elements.previewCtx,
							rotSysColor
						);
						break;
					case 2: //180
						draw(
							pieces[p].tetro[(r + 2) % 4],
							-rect[r][0] + (4 - rect[r][2] + rect[r][0]) / 2,
							-rect[r][1] +
								(3 - rect[r][3] + rect[r][1]) / 2 +
								i * 3,
							Elements.previewCtx,
							rotSysColor
						);
						break;
				}
			} else {
				if (piece.ihs == true && hold.piece == null) {
					p = this.grabBag[i + 1];
				}
				draw(
					pieces[p].tetro[r],
					-rect[r][0] + (4 - rect[r][2] + rect[r][0]) / 2,
					-rect[r][1] + (3 - rect[r][3] + rect[r][1]) / 2 + i * 3,
					Elements.previewCtx,
					rotSysColor
				);
			}

			//if(p===0)console.log(-rect[r][0], (4 - rect[r][2] + rect[r][0]) / 2);
		}
		this.dirty = false;
	}
}

export const preview = new Preview();
