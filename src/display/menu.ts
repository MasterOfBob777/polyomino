import { Game } from "../game";
import { SettingMap, settings } from "../settings";
import { Elements, setBinds, version } from "../utils/data";
import { $setText, $$ } from "../utils/utils";
import { resize } from "./size";
import { sound } from "./sound/sound";

let setLoop;
let arrowReleased = true;
let arrowDelay = 0;

export function resetGameSettings() {
	Game.settings = Game.defaultGameSettings;
	localStorage.setItem("Game.settings", JSON.stringify(Game.settings));
}

export function changeGameSetting(game: string, key: string, val: number) {
	Game.settings[game][key].val = val;
	localStorage.setItem("Game.settings", JSON.stringify(Game.settings));
}

/**
 * Show and hide menus.
 */
let menuStack = [];

export function menu(menuIndex?, stackOper?) {
	const menus = $$(".menu");

	sound.init();
	let current;
	for (let i = 0, len = menus.length; i < len; i++) {
		if (menus[i].classList.contains("on")) {
			current = i;
		}
		menus[i].classList.remove("on");
	}

	if (menuIndex !== undefined) {
		menus[menuIndex].classList.add("on");
	}

	if (stackOper === 1) {
		if (current !== undefined) {
			menuStack.push(current);
		}
	} else if (stackOper === -1) {
		current = menuStack.pop();
		if (current !== undefined && menuIndex === undefined) {
			menus[current].classList.add("on");
		}
	} else if (stackOper !== 0) {
		menuStack = [];
	}
}

let s;
let settingsArrow;

/**
 * Settings Menu
 */
export function settingsLoop() {
	if (arrowReleased || arrowDelay >= 6) {
		if (settingsArrow) {
			settings[s] =
				settings[s] === 0 ? settings[s].length - 1 : settings[s] - 1;
		} else {
			settings[s] =
				settings[s] === settings[s].length - 1 ? 0 : settings[s] + 1;
		}
		arrowReleased = false;
	} else {
		arrowDelay++;
	}
	setLoop = setTimeout(settingsLoop, 50);
}
// TODO DRY this.
export function arrowRelease(e) {
	resize();
	arrowReleased = true;
	arrowDelay = 0;
	clearTimeout(setLoop);
	this.onmouseup = undefined;
	this.onmouseout = undefined;
	this.ontouchend = undefined;
	this.ontouchcancel = undefined;
	if (e && e.preventDefault) {
		e.preventDefault();
	} //avoid selection by touch
}

export function left(e) {
	settingsArrow = 1;
	s = this.parentNode.id;
	this.onmouseup = arrowRelease;
	this.onmouseout = arrowRelease;
	this.ontouchend = arrowRelease;
	this.ontouchcancel = arrowRelease;
	if (e && e.preventDefault) {
		e.preventDefault();
	} //avoid selection by touch
	settingsLoop();
}

export function right(e) {
	settingsArrow = 0;
	s = this.parentNode.id;
	this.onmouseup = arrowRelease;
	this.onmouseout = arrowRelease;
	this.ontouchend = arrowRelease;
	this.ontouchcancel = arrowRelease;
	if (e && e.preventDefault) {
		e.preventDefault();
	} //avoid selection by touch
	settingsLoop();
}

function parseVersion(v) {
	return v.split(".").map(Number);
}

export function loadLocalData() {
	const bindData = localStorage.getItem("binds");
	if (bindData) {
		setBinds(JSON.parse(bindData));
	}
	const storedVersion = parseVersion(localStorage.getItem("version"));
	const parsedVersion = parseVersion(version);
	// TODO When new version just update with new stuff, rest stays unchanged.
	if (
		storedVersion[0] !== parsedVersion[0] ||
		storedVersion[1] !== parsedVersion[1]
	) {
		localStorage.removeItem("settings");
		localStorage.removeItem("Game.settings");
		localStorage.removeItem("binds");
		localStorage.setItem("version", version);
		resetGameSettings();
	}
	if (localStorage.getItem("settings")) {
		const storedSettings = JSON.parse(localStorage.getItem("settings"));
		for (const setting in storedSettings) {
			settings[setting] = storedSettings[setting];
		}
	}
}

export function data() {
	const storedSettings = localStorage.getItem("settings");
	if (storedSettings && localStorage.getItem("version") == version) {
		// console.log("not reset")
		const parsed = JSON.parse(storedSettings);
		for (const setting in parsed) {
			settings[setting] = parsed[setting];
		}
	} else {
		console.log("Game Settings Reset");
		resetGameSettings();
	}

	loadLocalData();
}

export function main() {
	for (const s in settings) {
		const setting = settings.getRaw(s as keyof SettingMap);

		const div = document.createElement("div");
		const sname = document.createElement("b");
		const iLeft = document.createElement("i");
		const span = document.createElement("span");
		const iRight = document.createElement("i");

		div.id = s;
		$setText(sname, setting.displayName());
		$setText(span, setting.value);
		iLeft.className = "material-icons left";
		iRight.className = "material-icons right";
		$setText(iLeft, "\uE314");
		$setText(iRight, "\uE315");
		iLeft.onmousedown = left;
		iLeft.ontouchstart = left;
		iRight.onmousedown = right;
		iRight.ontouchstart = right;

		Elements.set.appendChild(div);
		div.appendChild(sname);
		div.appendChild(iLeft);
		div.appendChild(span);
		div.appendChild(iRight);
	}
}
