/*
Designed by simonlc
Overhauled by farter
Enhanced by Dr Ocelot
Remade by MasterOfBob777
*/
import { h, render } from "preact";
import { data as initMenuData , main as initMenu  } from "./display/menu";
import { resize } from "./display/size";
import { $ } from "./utils/utils";
import MainComponent from "./components/main";

// boom.
/*
let focused = true;

window.addEventListener("focus", () => {
	try {
		focused = true;
		if (Mutable.alarm) {
			sound.playSFX("alarm");
		}
		sound.unmutebgm();
	} catch (error) {}
});

window.addEventListener("blur", () => {
	try {
		focused = false;
		sound.stopSFX("alarm");
		sound.mutebgm();
	} catch (error) {}
});
*/
initMenuData()

render(h(MainComponent, {}), $("content"));

addEventListener("resize", resize, false);
addEventListener("load", resize, false);

initMenu();
