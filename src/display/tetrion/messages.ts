import { settings } from "../../settings";
import { Mutable } from "../../utils/data";
import { piece } from "./piece";
import { $ } from "../../utils/utils";
import { t } from "../../utils/lang";

export function showTetrisMessage(contents) {
	if (settings.Messages) {
		const clearEle = $("clear");
		clearEle.innerHTML = contents;
		clearEle.classList.remove("flyaway");
		void clearEle.offsetWidth;
		clearEle.classList.add("flyaway");

		const comboname =
			settings.Voice && settings.Voicebank === 2 ? "ren" : "combo";

		const renEle = $("renmsg");
		const renDiv = $("rendiv");
		if (Mutable.combo < 2) {
			renEle.innerHTML = "";
		} else if (Mutable.combo > 19) {
			renEle.innerHTML = t(comboname, Mutable.combo - 1);
			renDiv.style["animation-duration"] = "0.041s";
		} else {
			renEle.innerHTML = t(comboname, Mutable.combo - 1);
			renDiv.style["animation-duration"] =
				0.5 - 0.485 * ((Mutable.combo - 2) / 18) + "s";
		}
		const b2bEle = $("b2bmsg");
		const b2bDiv = $("b2bdiv");
		if (Mutable.b2b <= 0) {
			b2bEle.innerHTML = "";
		} else {
			b2bEle.innerHTML = t("streak", Mutable.b2b);
			b2bDiv.classList.remove("b2b-fade");
			void b2bDiv.offsetWidth;
			b2bDiv.classList.add("b2b-fade");
		}
	}
}

export function showSpinMessage(piece, mini) {
	showTetrisMessage(t(mini ? "mini" : "spin", piece));
}

export function sendClearTetrisMessage(spin, mini) {
	const pieceName = ["I", "J", "L", "O", "S", "T", "Z"][piece.index];
	let message = "";

	if (spin) {
		message = t("spin", pieceName);
	} else if (mini) {
		message = t("mini", pieceName);
	}

	if (Mutable.b2b > 1 && (Mutable.lineClear > 3 || spin)) {
		message = t("b2b", message) + "<br>";
	}
	message += t("line", Mutable.lineClear);
	if (Mutable.b2b > 1 && (Mutable.lineClear > 3 || spin)) {
		message += "<br>" + t("b2b_streak", Mutable.b2b) + "</small>";
	}

	showTetrisMessage(message);
}

export function clearTetrisMessage() {
	$("clear").innerHTML = "";
	$("renmsg").innerHTML = "";
	$("b2bmsg").innerHTML = "";
}
