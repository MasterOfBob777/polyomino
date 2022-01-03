import { hold } from "../logic/hold";
import { makeSprite, bg } from "../logic/view";
import { settings } from "../settings";
import { Elements, Mutable } from "../utils/data";
import { piece } from "./tetrion/piece";
import { preview } from "./tetrion/preview";
import { stack } from "./tetrion/stack";
import { $ } from "../utils/utils";
import { touchButtonsLayout } from "../touch";
import { statistics, statisticsStack } from "./tetrion/stats";

export function resize() {
	const {
		stats,
		stackCanvas,
		activeCanvas,
		bgStackCanvas,
		holdCanvas,
		previewCanvas,
		msg,
		h3,
		timeCanvas,
		timeCtx,
		bgStackCtx,
	} = Elements;

	const a = $("a");
	const b = $("b");
	const c = $("c");
	const d = $("d");
	const content = $("content");
	/*
	if (settings.NextSide === 1) {
		content.innerHTML = "";
		content.appendChild(c);
		content.appendChild(b);
		content.appendChild(d);
	} else {
		content.innerHTML = "";
		content.appendChild(d);
		content.appendChild(b);
		content.appendChild(c);
	}
	*/
	// TODO Finalize this.
	// Aspect ratio: 1.024
	const padH = 12;
	let screenHeight = window.innerHeight - padH * 2;
	const screenWidth = ~~(screenHeight * 1.0);
	if (screenWidth > window.innerWidth)
		screenHeight = ~~(window.innerWidth / 1.0);

	Mutable.cellSize = Math.max(~~(screenHeight / 20), 10);
	if (settings.Size === 1 && Mutable.cellSize >= 16) Mutable.cellSize = 16;
	else if (settings.Size === 2 && Mutable.cellSize >= 24)
		Mutable.cellSize = 24;
	else if (settings.Size === 3 && Mutable.cellSize >= 32)
		Mutable.cellSize = 32;
	else if (settings.Size === 4 && Mutable.cellSize >= 48)
		Mutable.cellSize = 48;

	const pad = window.innerHeight - (Mutable.cellSize * 20 + 2);
	const padFinal = Math.min(pad / 2, padH);
	//console.log(pad);
	content.style.padding =
		//"0 0";
		//(pad / 2) + 'px' + ' 0';
		padFinal + "px" + " 0";

	stats.style.bottom =
		//(pad) + 'px';
		//(pad / 2) + 'px';
		pad - padFinal + "px";
	//(pad - padH) + 'px';

	// Size elements
	a.style.padding = "0 0.5rem " + ~~(Mutable.cellSize / 2) + "px";

	stackCanvas.width =
		activeCanvas.width =
		bgStackCanvas.width =
			Mutable.cellSize * 10;
	stackCanvas.height =
		activeCanvas.height =
		bgStackCanvas.height =
			Mutable.cellSize * 20;
	b.style.width = stackCanvas.width + "px";
	b.style.height = stackCanvas.height + "px";

	holdCanvas.width = Mutable.cellSize * 4;
	holdCanvas.height = Mutable.cellSize * 3;
	a.style.width = holdCanvas.width + "px";
	a.style.height = holdCanvas.height + "px";

	previewCanvas.width = Mutable.cellSize * 4;
	previewCanvas.height = stackCanvas.height - Mutable.cellSize * 2;
	c.style.width = previewCanvas.width + "px";
	c.style.height = b.style.height;

	// Scale the text so it fits in the thing.
	// TODO get rid of extra font sizes here.
	$("msgdiv").style.lineHeight = b.style.height;
	msg.style.fontSize = ~~(stackCanvas.width / 6) + "px";
	msg.style.lineHeight = msg.style.fontSize;
	stats.style.fontSize = ~~(stackCanvas.width / 11) + "px";
	document.documentElement.style.fontSize = ~~(stackCanvas.width / 16) + "px";

	for (let i = 0, len = h3.length; i < len; i++) {
		h3[i].style.lineHeight = Mutable.cellSize * 2 + "px";
		h3[i].style.fontSize = stats.style.fontSize;
	}
	stats.style.width = d.clientWidth + "px";

	timeCanvas.width = d.clientWidth;
	timeCanvas.height =
		timeCanvas.clientHeight ||
		timeCanvas.offsetHeight ||
		timeCanvas.getBoundingClientRect().height;

	timeCtx.font = '1em Roboto Mono, "Trebuchet MS"';
	timeCtx.textAlign = "center";
	timeCtx.textBaseline = "middle";

	touchButtonsLayout();

	// Redraw graphics
	makeSprite();

	if (settings.Grid) bg(bgStackCtx);

	//if (Game.state === GameState.Normal) {
	try {
		piece.draw();
		stack.draw();

		preview.draw();
		if (hold.piece !== undefined) {
			hold.draw();
		}
		statistics();
		statisticsStack();
	} catch (e) {}
	//}
}
