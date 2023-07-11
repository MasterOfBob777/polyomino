import { Game } from "../game";
import { settings } from "../settings";
import { setBinds, version } from "../utils/data";

export function resetGameSettings() {
	Game.settings = Game.defaultGameSettings;
	localStorage.setItem("Game.settings", JSON.stringify(Game.settings));
}

export function changeGameSetting(game: string, key: string, val: number) {
	Game.settings[game][key].val = val;
	localStorage.setItem("Game.settings", JSON.stringify(Game.settings));
}

function parseVersion(v) {
	return v ? v.split(".").map(Number) : [0, 0, 0];
}

function differentVersion(v1, v2) {
	const v1p = parseVersion(v1);
	const v2p = parseVersion(v2);

	return v1p[0] !== v2p[0] || v1p[1] !== v2p[1];
}

export function data() {
	if (differentVersion(localStorage.getItem("version"), version)) {
		localStorage.removeItem("settings");
		localStorage.removeItem("Game.settings");
		localStorage.removeItem("binds");
		localStorage.setItem("version", version);
		resetGameSettings();
		return;
	}

	const storedSettings = localStorage.getItem("settings");
	if (storedSettings) {
		// console.log("not reset")
		const parsed = JSON.parse(storedSettings);
		for (const setting in parsed) {
			settings[setting] = parsed[setting];
		}
	}

	const bindData = localStorage.getItem("binds");
	if (bindData) {
		setBinds(JSON.parse(bindData));
	}
}