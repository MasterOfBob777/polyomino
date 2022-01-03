import { sound } from "../display/sound/sound";
import { preview } from "../display/tetrion/preview";
import { Game } from "../game";
import { settings } from "../settings";
import { Elements, pieces } from "../utils/data";
import { $, clear } from "../utils/utils";
import { draw } from "./view";

class Hold {
	soundCancel = 0;

	piece;

	draw() {
		if (this.soundCancel == 0 && Game.paused == false) {
			sound.playSFX("hold");
		}
		this.soundCancel = 0;
		// holdElement = ;

		const holdEle = $("hold");
		holdEle.classList.remove("glow-flash-animation");
		void holdEle.offsetWidth;
		holdEle.classList.add("glow-flash-animation");

		clear(Elements.holdCtx);
		let p;
		if (this.piece.ihs == true) {
			p = preview.grabBag[0];
		} else {
			$("ihs-indicator").classList.add("gone");
			p = this.piece;
		}
		// var p = this.piece;

		const rot = settings.RotSys;
		const initInfo = rot.initinfo[p];
		if (pieces[p] != undefined) {
			const rect = pieces[p].rect;
			draw(
				pieces[p].tetro[initInfo[2]],
				-rect[initInfo[2]][0] +
					(4 - rect[initInfo[2]][2] + rect[initInfo[2]][0]) / 2,
				-rect[initInfo[2]][1] +
					(3 - rect[initInfo[2]][3] + rect[initInfo[2]][1]) / 2,
				Elements.holdCtx,
				rot.color[p]
			);
		}
	}
}

export const hold = new Hold();
