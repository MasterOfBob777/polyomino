
import { Game } from "./game";
import { Mutable } from "./utils/data";
import { clamp } from "./utils/math";
import { $setText, $ } from "./utils/utils";

let scoreNes = 0;

export function scoreNesRefresh() {
	scoreNes = clamp(scoreNes, 0, 999999);
	$setText($("nesscore"), scoreNes);
}

export function tetRateNesRefresh() {
	const nesRate = $("nesrate");
	if (
		Mutable.tetRateNes <= 0.25 &&
		(Mutable.tetNes > 0 || Mutable.nontetNes > 3) &&
		Game.params.proMode 
	) {
		nesRate.style.color = "#ff0000";
		nesRate.classList.add("drought-flash");
	} else {
		nesRate.style.color = "#ffffff";
		nesRate.classList.remove("drought-flash");
	}
	$setText(nesRate, Math.floor(Mutable.tetRateNes * 100).toString() + "%");
}

export function scorestring(s, n) {
	const strsplit = s.split("");
	let spacetoggle = 0;
	for (let i = strsplit.length - 1 - 3; i >= 0; i -= 3) {
		strsplit[i] += spacetoggle === n - 1 ? " " : "\xA0";
		spacetoggle = (spacetoggle + 1) % n;
	}
	return strsplit.join("");
}

export function updateScoreTime() {
	Mutable.scoreTime = Date.now() - Mutable.scoreStartTime - Game.pauseTime;
}