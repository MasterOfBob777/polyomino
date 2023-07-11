/*
Designed by simonlc
Overhauled by farter
Enhanced by Dr Ocelot
Remade by MasterOfBob777
*/
import { h, render } from "preact";
import { data as initMenuData } from "./display/menu";
import { resize } from "./display/size";
import { $ } from "./utils/utils";
import MainComponent from "./components/main";
import { sound } from "./display/sound/sound";

import "preact/debug";
import { keyUpDown } from "./logic/view";
import { Mutable } from "./utils/data";
import { Game } from "./game";

import { getLanguageData } from "./utils/lang";
import { LoopManager } from "./utils/LoopManager";

Promise.all([
	getLanguageData("en"),
	getLanguageData(navigator.language.substring(0, 2)),
]).then((v) => {
	// boom.

	initMenuData();

	render(h(MainComponent, {}), $("content"));

	addEventListener("resize", resize, false);
	addEventListener("load", resize, false);
	addEventListener("keydown", keyUpDown, false);
	addEventListener("keyup", keyUpDown, false);

	sound.init();

	window.addEventListener("focus", () => {
		try {
			if (Mutable.alarm) {
				sound.playSFX("alarm");
			}
			sound.unmutebgm();

			Game.pause();
		} catch (error) {}
	});

	window.addEventListener("blur", () => {
		try {
			sound.stopSFX("alarm");
			sound.mutebgm();

			Game.unpause();
		} catch (error) {}
	});
});
