import { Game } from "../game";
import { settings } from "../settings";
import { binds, flags, Mutable, Elements } from "../utils/data";

/**
 * Draws grid in background.
 */
export function bg(ctx: CanvasRenderingContext2D) {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.fillStyle = "#1c1c1c";
	for (let x = -1; x < ctx.canvas.width + 1; x += Mutable.cellSize) {
		ctx.fillRect(x, 0, 2, ctx.canvas.height);
	}
	for (let y = -1; y < ctx.canvas.height + 1; y += Mutable.cellSize) {
		ctx.fillRect(0, y, ctx.canvas.width, 2);
	}
}

/**
 * Draws a pre-rendered mino.
 */
export function drawCell(x, y, color, ctx, darkness?: number) {
	const spriteCanvas = Elements.spriteCanvas;
	x = Math.floor(x * Mutable.cellSize);
	y = Math.floor(y * Mutable.cellSize);
	ctx.drawImage(
		spriteCanvas,
		color * Mutable.cellSize,
		0,
		Mutable.cellSize,
		Mutable.cellSize,
		x,
		y,
		Mutable.cellSize,
		Mutable.cellSize
	);
	if (darkness) {
		//ctx.globalCompositeOperation = 'source-atop';
		ctx.fillStyle = `rgba(0,0,0,${darkness})`;
		ctx.fillRect(x, y, Mutable.cellSize, Mutable.cellSize);
		//ctx.globalCompositeOperation = 'source-over';
	}
}

/**
 * Pre-renders all mino types in all colors.
 */
export const nes = [
	["#c1c1c1", "#ffffff00"],
	["#3ebeff", "#ffffff"],
	["#0058f8", "#ffffff00"],
	["#f83800", "#ffffff00"],
	["#ffa347", "#ffffff"],
	["#80d010", "#ffffff00"],
	["#db00cd", "#ffffff"],
	["#ab0023", "#ffffff00"],
	["#898989", "#ffffff00"],
	["#0058f8", "#ffffff"],
];
export const tetrjs = [
	["#EEEEEE", "#E0E0E0", "#BDBDBD"],
	["#26C6DA", "#00BCD4", "#00ACC1"],
	["#42A5F5", "#2196F3", "#1E88E5"],
	["#FFA726", "#FF9800", "#FB8C00"],
	["#FFEE58", "#FFEB3B", "#FDD835"],
	["#66BB6A", "#4CAF50", "#43A047"],
	["#AB47BC", "#9C27B0", "#8E24AA"],
	["#EF5350", "#F44336", "#E53935"],
	["#616161", "#424242", "#212121"],
	["#EEEEEE", "#E0E0E0", "#BDBDBD"],
];
export const shaded = [
	// 0         +10        -10        -20
	["#c1c1c1", "#dddddd", "#a6a6a6", "#8b8b8b"],
	["#25bb9b", "#4cd7b6", "#009f81", "#008568"],
	["#3397d9", "#57b1f6", "#007dbd", "#0064a2"],
	["#e67e23", "#ff993f", "#c86400", "#a94b00"],
	["#efc30f", "#ffdf3a", "#d1a800", "#b38e00"],
	["#9ccd38", "#b9e955", "#81b214", "#659700"],
	["#9c5ab8", "#b873d4", "#81409d", "#672782"],
	["#e64b3c", "#ff6853", "#c62c25", "#a70010"],
	["#898989", "#a3a3a3", "#6f6f6f", "#575757"],
	["#c1c1c1", "#dddddd", "#a6a6a6", "#8b8b8b"],
];
export const glossy = [
	//25         37         52         -21        -45
	["#ffffff", "#ffffff", "#ffffff", "#888888", "#4d4d4d"],
	["#7bffdf", "#9fffff", "#ccffff", "#008165", "#00442e"],
	["#6cdcff", "#93feff", "#c2ffff", "#00629f", "#002c60"],
	["#ffc166", "#ffe386", "#ffffb0", "#aa4800", "#650500"],
	["#ffff6a", "#ffff8c", "#ffffb8", "#b68a00", "#714f00"],
	["#efff81", "#ffffa2", "#ffffcd", "#6b9200", "#2c5600"],
	["#dc9dfe", "#ffbeff", "#ffe9ff", "#5d287e", "#210043"],
	["#ff9277", "#ffb497", "#ffe0bf", "#a7000a", "#600000"],
	["#cbcbcb", "#ededed", "#ffffff", "#545454", "#1f1f1f"],
	["#ffffff", "#ffffff", "#ffffff", "#888888", "#4d4d4d"],
];
export const tgm = [
	["#ababab", "#5a5a5a", "#9b9b9b", "#626262"],
	["#00e8f0", "#0070a0", "#00d0e0", "#0080a8"],
	["#00a8f8", "#0000b0", "#0090e8", "#0020c0"],
	["#f8a800", "#b84000", "#e89800", "#c85800"],
	["#e8e000", "#886800", "#d8c800", "#907800"],
	["#78f800", "#007800", "#58e000", "#008800"],
	["#f828f8", "#780078", "#e020e0", "#880088"],
	["#f08000", "#a00000", "#e86008", "#b00000"],
	["#7b7b7b", "#303030", "#6b6b6b", "#363636"],
	["#ababab", "#5a5a5a", "#9b9b9b", "#626262"],
];
export const friends = [
	["#aeaeae", "#808080", "#909090", "#737373", "#666666", "#373737"],
	["#5fcefe", "#09aef7", "#21beff", "#0f9bd7", "#098cc4", "#02586c"],
	["#4786e2", "#2159de", "#3177df", "#2141c6", "#1b46a9", "#012476"],
	["#feae5f", "#ff7900", "#fc942e", "#e35b02", "#db5802", "#993300"],
	["#fed678", "#ffb618", "#ffc729", "#e39f02", "#ec8e02", "#996600"],
	["#9fe732", "#63c710", "#84d718", "#59b101", "#559d0d", "#025c01"],
	["#db60cf", "#c529a6", "#d33ab9", "#af298a", "#9a2183", "#660066"],
	["#fe9292", "#f72039", "#fe4e71", "#d70f37", "#c70e33", "#9e0c29"],
	["#494949", "#353535", "#3c3c3c", "#303030", "#2a2a2a", "#171717"],
	["#aeaeae", "#808080", "#909090", "#737373", "#666666", "#373737"],
];
export const t99 = [
	["#909090", "#d8d6d6", "#5d5d5d", "#9ea09f", "#797979"],
	["#00e5ff", "#82ffff", "#00aaba", "#1ce7f7", "#00c2d3"],
	["#1a00fa", "#4287ff", "#000092", "#202aee", "#0000c4"],
	["#ff6d08", "#ffa76b", "#d14200", "#fb7325", "#f74800"],
	["#ffdd0d", "#fff45c", "#d59b00", "#f5c81b", "#f2b200"],
	["#69ff0c", "#a8ff6f", "#13c500", "#62fc1e", "#2fe900"],
	["#b400fd", "#ea78fe", "#70009a", "#bf20f0", "#7f00c8"],
	["#ff093b", "#ff7094", "#ba0625", "#fb0b3f", "#ef0020"],
	["#5e5e5e", "#a6a4a4", "#3c3c3c", "#303030", "#2a2a2a"],
	["#909090", "#d8d6d6", "#2b2b2b", "#6d6f6f", "#474747"],
];

export const tetcom = [
	["#bdbdbd", "#7f7f7f", "#e2e2e2", "#333333"],
	["#32808c", "#006274", "#00dff7", "#012c33"],
	["#28568d", "#003374", "#008bf3", "#021c3c"],
	["#926a2f", "#744300", "#f9af00", "#331e00"],
	["#8d8128", "#746600", "#f6e300", "#332e01"],
	["#218939", "#007419", "#00f84b", "#00330b"],
	["#7b2f92", "#580074", "#d300f9", "#270033"],
	["#8c3232", "#740000", "#f70000", "#330000"],
	["#3e3e3e", "#2d2d2d", "#606060", "#000000"],
	["#bdbdbd", "#7f7f7f", "#e2e2e2", "#333333"],
];
export const ppt = [
	// border    top side  lr side     down side  cntr fill  lit fill  drk fill
	[
		"#687070",
		"#e8e8e8",
		"#c8ccc8",
		"#b8b8b8",
		"#d5d5d5",
		"#f0f0f0",
		"#c0c4c0",
	],
	[
		"#086c70",
		"#d0fcf8",
		"#008cd8",
		"#05709d",
		"#00a4d8",
		"#00b4d0",
		"#0094d0",
	],
	[
		"#001060",
		"#80d4f8",
		"#004cb8",
		"#0038a0",
		"#005cb8",
		"#0098d0",
		"#0044a8",
	],
	[
		"#703000",
		"#f8dcb0",
		"#f05800",
		"#c85110",
		"#f87400",
		"#f8a400",
		"#f85c00",
	],
	[
		"#b86000",
		"#f8f4d8",
		"#f8b818",
		"#f8a810",
		"#f8c800",
		"#f8e458",
		"#f8b000",
	],
	[
		"#104c28",
		"#c0fc78",
		"#78c428",
		"#509828",
		"#68bc28",
		"#78d828",
		"#50a820",
	],
	[
		"#680088",
		"#f8a8f8",
		"#982c98",
		"#802c98",
		"#902c90",
		"#a82c98",
		"#802480",
	],
	[
		"#600800",
		"#e89c68",
		"#a01418",
		"#850b00",
		"#d82430",
		"#e86868",
		"#c51923",
	],
	[
		"#131616",
		"#6d6d6d",
		"#474747",
		"#3f433f",
		"#4c4c4c",
		"#868686",
		"#393c39",
	],
	[
		"#687070",
		"#e8e8e8",
		"#c8ccc8",
		"#b8b8b8",
		"#d5d5d5",
		"#f0f0f0",
		"#c0c4c0",
	],
];

export function makeSprite() {
	const spriteCanvas = Elements.spriteCanvas;
	const spriteCtx = Elements. spriteCtx;

	spriteCanvas.width = Mutable.cellSize * 10;
	spriteCanvas.height = Mutable.cellSize;
	for (let i = 0; i < 10; i++) {
		const iCurrent = i;
		const x = i * Mutable.cellSize;
		if (settings.Monochrome) {
			i = 0;
		}

		let k: number;
		let grad;

		if (settings.Block === 0) {
			// Shaded
			spriteCtx.fillStyle = shaded[i][1];
			spriteCtx.fillRect(x, 0, Mutable.cellSize, Mutable.cellSize);

			spriteCtx.fillStyle = shaded[i][3];
			spriteCtx.fillRect(
				x,
				Mutable.cellSize / 2,
				Mutable.cellSize,
				Mutable.cellSize / 2
			);

			spriteCtx.fillStyle = shaded[i][0];
			spriteCtx.beginPath();
			spriteCtx.moveTo(x, 0);
			spriteCtx.lineTo(x + Mutable.cellSize / 2, Mutable.cellSize / 2);
			spriteCtx.lineTo(x, Mutable.cellSize);
			spriteCtx.fill();

			spriteCtx.fillStyle = shaded[i][2];
			spriteCtx.beginPath();
			spriteCtx.moveTo(x + Mutable.cellSize, 0);
			spriteCtx.lineTo(x + Mutable.cellSize / 2, Mutable.cellSize / 2);
			spriteCtx.lineTo(x + Mutable.cellSize, Mutable.cellSize);
			spriteCtx.fill();
		} else if (settings.Block === 1) {
			// Flat
			spriteCtx.fillStyle = tetrjs[i][1];
			spriteCtx.fillRect(x, 0, Mutable.cellSize, Mutable.cellSize);
		} else if (settings.Block === 2) {
			// Glossy
			k = Math.max(Math.floor(Mutable.cellSize * 0.1), 1);

			grad = spriteCtx.createLinearGradient(
				x,
				0,
				x + Mutable.cellSize,
				Mutable.cellSize
			);
			grad.addColorStop(0.5, glossy[i][3]);
			grad.addColorStop(1, glossy[i][4]);
			spriteCtx.fillStyle = grad;
			spriteCtx.fillRect(x, 0, Mutable.cellSize, Mutable.cellSize);

			grad = spriteCtx.createLinearGradient(
				x,
				0,
				x + Mutable.cellSize,
				Mutable.cellSize
			);
			grad.addColorStop(0, glossy[i][2]);
			grad.addColorStop(0.5, glossy[i][1]);
			spriteCtx.fillStyle = grad;
			spriteCtx.fillRect(
				x,
				0,
				Mutable.cellSize - k,
				Mutable.cellSize - k
			);

			grad = spriteCtx.createLinearGradient(
				x + k,
				k,
				x + Mutable.cellSize - k,
				Mutable.cellSize - k
			);
			grad.addColorStop(0, shaded[i][0]);
			grad.addColorStop(0.5, glossy[i][0]);
			grad.addColorStop(0.5, shaded[i][0]);
			grad.addColorStop(1, glossy[i][0]);
			spriteCtx.fillStyle = grad;
			spriteCtx.fillRect(
				x + k,
				k,
				Mutable.cellSize - k * 2,
				Mutable.cellSize - k * 2
			);
		} else if (settings.Block === 3) {
			// Arika
			k = Math.max(Math.floor(Mutable.cellSize * 0.125), 1);

			spriteCtx.fillStyle = tgm[i][1];
			spriteCtx.fillRect(x, 0, Mutable.cellSize, Mutable.cellSize);
			spriteCtx.fillStyle = tgm[i][0];
			spriteCtx.fillRect(
				x,
				0,
				Mutable.cellSize,
				Math.floor(Mutable.cellSize / 2)
			);

			grad = spriteCtx.createLinearGradient(
				x,
				k,
				x,
				Mutable.cellSize - k
			);
			grad.addColorStop(0, tgm[i][2]);
			grad.addColorStop(1, tgm[i][3]);
			spriteCtx.fillStyle = grad;
			spriteCtx.fillRect(
				x + k,
				k,
				Mutable.cellSize - k * 2,
				Mutable.cellSize - k * 2
			);

			grad = spriteCtx.createLinearGradient(x, k, x, Mutable.cellSize);
			grad.addColorStop(0, tgm[i][0]);
			grad.addColorStop(1, tgm[i][3]);
			spriteCtx.fillStyle = grad;
			spriteCtx.fillRect(x, k, k, Mutable.cellSize - k);

			grad = spriteCtx.createLinearGradient(
				x,
				0,
				x,
				Mutable.cellSize - k
			);
			grad.addColorStop(0, tgm[i][2]);
			grad.addColorStop(1, tgm[i][1]);
			spriteCtx.fillStyle = grad;
			spriteCtx.fillRect(
				x + Mutable.cellSize - k,
				0,
				k,
				Mutable.cellSize - k
			);
		} else if (settings.Block === 4) {
			// Aqua
			k = Math.max(Math.floor(Mutable.cellSize * 0.1), 1);

			grad = spriteCtx.createLinearGradient(
				x,
				0,
				x + Mutable.cellSize,
				Mutable.cellSize
			);
			grad.addColorStop(0.5, glossy[i][3]);
			grad.addColorStop(1, glossy[i][4]);
			spriteCtx.fillStyle = grad;
			spriteCtx.fillRect(x, 0, Mutable.cellSize, Mutable.cellSize);

			grad = spriteCtx.createLinearGradient(x, k, x, Mutable.cellSize);
			grad.addColorStop(0, shaded[i][0]);
			grad.addColorStop(0.1, glossy[i][2]);
			grad.addColorStop(0.4, shaded[i][0]);
			grad.addColorStop(0.5, shaded[i][2]);
			spriteCtx.fillStyle = grad;
			spriteCtx.fillRect(
				x + k,
				k,
				Mutable.cellSize - k * 2,
				Mutable.cellSize - k * 2
			);
		} else if (settings.Block === 5) {
			// Arcade
			k = Math.max(Math.floor(Mutable.cellSize * 0.1), 1);

			grad = spriteCtx.createLinearGradient(
				x,
				0,
				x + Mutable.cellSize,
				Mutable.cellSize
			);
			grad.addColorStop(0.5, tgm[i][3]);
			grad.addColorStop(1, tgm[i][1]);
			spriteCtx.fillStyle = grad;
			spriteCtx.fillRect(x, 0, Mutable.cellSize, Mutable.cellSize);

			grad = spriteCtx.createLinearGradient(
				x,
				0,
				x + Mutable.cellSize,
				Mutable.cellSize
			);
			grad.addColorStop(0, glossy[i][2]);
			grad.addColorStop(0.5, glossy[i][1]);
			spriteCtx.fillStyle = grad;
			spriteCtx.fillRect(
				x,
				0,
				Mutable.cellSize - k,
				Mutable.cellSize - k
			);

			grad = spriteCtx.createLinearGradient(
				x + k,
				k,
				x + Mutable.cellSize - k,
				Mutable.cellSize - k
			);
			grad.addColorStop(0, tgm[i][2]);
			grad.addColorStop(0.3, tgm[i][2]);
			grad.addColorStop(0.4, tgm[i][0]);
			grad.addColorStop(0.7, tgm[i][0]);
			grad.addColorStop(0.87, tgm[i][1]);
			spriteCtx.fillStyle = grad;
			spriteCtx.fillRect(
				x + k,
				k,
				Mutable.cellSize - k * 2,
				Mutable.cellSize - k * 2
			);

			spriteCtx.fillStyle = tgm[i][1];
			spriteCtx.fillRect(
				x + 1.5 * k,
				1.5 * k,
				Mutable.cellSize / 8,
				Mutable.cellSize / 8
			);
		} else if (settings.Block === 6) {
			// N-Blox
			const k = Math.max(Math.floor(Mutable.cellSize * 0.1), 1);

			spriteCtx.fillStyle = glossy[i][4];
			spriteCtx.fillRect(x, 0, Mutable.cellSize, Mutable.cellSize);

			grad = spriteCtx.createLinearGradient(
				x + Mutable.cellSize - k,
				k,
				x + k,
				Mutable.cellSize - k
			);
			grad.addColorStop(0, glossy[i][0]);
			grad.addColorStop(0.5, glossy[i][0]);
			grad.addColorStop(0.5, shaded[i][0]);
			grad.addColorStop(1, shaded[i][0]);
			spriteCtx.fillStyle = grad;
			spriteCtx.fillRect(
				x + k,
				k,
				Mutable.cellSize - k * 2,
				Mutable.cellSize - k * 2
			);

			spriteCtx.fillStyle = shaded[i][1];
			spriteCtx.fillRect(
				x + Mutable.cellSize / 5.5,
				0 + Mutable.cellSize / 5.5,
				Mutable.cellSize / 1.64,
				Mutable.cellSize / 1.64
			);
		} else if (settings.Block === 7) {
			// Bone
			k = Math.max(Math.floor(Mutable.cellSize * 0.1), 1);

			spriteCtx.fillStyle = "#000";
			spriteCtx.fillRect(x, 0, Mutable.cellSize, Mutable.cellSize);

			spriteCtx.fillStyle = shaded[i][1];
			spriteCtx.fillRect(
				x + Mutable.cellSize / 7.5,
				0 + Mutable.cellSize / 7.5,
				Mutable.cellSize / 1.4,
				Mutable.cellSize / 1.4
			);

			spriteCtx.fillStyle = "#000";
			spriteCtx.fillRect(
				x + Mutable.cellSize / 3.5,
				0 + Mutable.cellSize / 3.5,
				Mutable.cellSize / 2.44,
				Mutable.cellSize / 2.44
			);

			spriteCtx.fillStyle = "#000";
			spriteCtx.fillRect(
				x + Mutable.cellSize / 2.7,
				0 + Mutable.cellSize / 8,
				Mutable.cellSize / 4.14,
				Mutable.cellSize / 1.2
			);
		} else if (settings.Block === 8) {
			// Retro
			spriteCtx.fillStyle = "#000";
			spriteCtx.fillRect(x, 0, Mutable.cellSize, Mutable.cellSize);

			spriteCtx.fillStyle = nes[i][0];
			spriteCtx.fillRect(
				x,
				0,
				Mutable.cellSize / 1.125,
				Mutable.cellSize / 1.125
			);

			spriteCtx.fillStyle = "#fff";
			spriteCtx.fillRect(
				x,
				0,
				Mutable.cellSize / 8,
				Mutable.cellSize / 8
			);

			spriteCtx.fillStyle = "#fff";
			spriteCtx.fillRect(
				x + Mutable.cellSize / 8,
				0 + Mutable.cellSize / 8,
				Mutable.cellSize / 8,
				Mutable.cellSize / 4
			);

			spriteCtx.fillStyle = "#fff";
			spriteCtx.fillRect(
				x + Mutable.cellSize / 8,
				0 + Mutable.cellSize / 8,
				Mutable.cellSize / 4,
				Mutable.cellSize / 8
			);

			spriteCtx.fillStyle = nes[i][1];
			spriteCtx.fillRect(
				x + Mutable.cellSize / 8,
				0 + Mutable.cellSize / 8,
				Mutable.cellSize / 1.6,
				Mutable.cellSize / 1.6
			);
		} else if (settings.Block === 9) {
			// Friends
			spriteCtx.fillStyle = friends[i][5];
			spriteCtx.fillRect(x, 0, Mutable.cellSize, Mutable.cellSize);

			spriteCtx.fillStyle = friends[i][1];
			spriteCtx.fillRect(
				x + Mutable.cellSize / 18,
				0 + Mutable.cellSize / 18,
				Mutable.cellSize / 1.125,
				Mutable.cellSize / 1.125
			);

			spriteCtx.fillStyle = "#fff";
			spriteCtx.fillRect(
				x + Mutable.cellSize / 18,
				0 + Mutable.cellSize / 18,
				Mutable.cellSize / 9,
				Mutable.cellSize / 9
			);

			spriteCtx.fillStyle = friends[i][0];
			spriteCtx.fillRect(
				x + Mutable.cellSize / 6,
				0 + Mutable.cellSize / 18,
				Mutable.cellSize / 1.5,
				Mutable.cellSize / 18
			);

			spriteCtx.fillStyle = friends[i][0];
			spriteCtx.fillRect(
				x + Mutable.cellSize / 18,
				0 + Mutable.cellSize / 6,
				Mutable.cellSize / 18,
				Mutable.cellSize / 1.5
			);

			spriteCtx.fillStyle = friends[i][4];
			spriteCtx.fillRect(
				x + Mutable.cellSize / 1.125,
				0 + Mutable.cellSize / 6,
				Mutable.cellSize / 18,
				Mutable.cellSize / 1.5
			);

			spriteCtx.fillStyle = friends[i][4];
			spriteCtx.fillRect(
				x + Mutable.cellSize / 6,
				0 + Mutable.cellSize / 1.125,
				Mutable.cellSize / 1.5,
				Mutable.cellSize / 18
			);

			spriteCtx.fillStyle = friends[i][2];
			spriteCtx.fillRect(
				x + Mutable.cellSize / 4.5,
				0 + Mutable.cellSize / 4.5,
				Mutable.cellSize / 1.8,
				Mutable.cellSize / 1.8
			);

			spriteCtx.fillStyle = friends[i][3];
			spriteCtx.fillRect(
				x + Mutable.cellSize / 3.6,
				0 + Mutable.cellSize / 3.6,
				Mutable.cellSize / 2.25,
				Mutable.cellSize / 2.25
			);
		} else if (settings.Block === 10) {
			// T99
			spriteCtx.fillStyle = t99[i][0];
			spriteCtx.fillRect(x, 0, Mutable.cellSize, Mutable.cellSize);
			//
			const grad = spriteCtx.createLinearGradient(
				x,
				0,
				x + Mutable.cellSize / 7,
				Mutable.cellSize / 2
			);
			grad.addColorStop(0, "#FFFFFFEE");
			grad.addColorStop(1, "#FFFFFF66");
			spriteCtx.beginPath();
			spriteCtx.moveTo(x + Mutable.cellSize / 8, Mutable.cellSize / 8);
			spriteCtx.lineTo(x + Mutable.cellSize / 8, Mutable.cellSize / 2);
			spriteCtx.quadraticCurveTo(
				x + Mutable.cellSize / 1.5,
				Mutable.cellSize / 4,
				x + Mutable.cellSize / (8 / 7),
				Mutable.cellSize / 4
			);
			spriteCtx.lineTo(
				x + Mutable.cellSize / (8 / 7),
				Mutable.cellSize / 8
			);
			spriteCtx.fillStyle = grad;
			spriteCtx.fill();

			spriteCtx.fillStyle = t99[i][1];
			spriteCtx.fillRect(x, 0, Mutable.cellSize, Mutable.cellSize / 8);

			spriteCtx.fillStyle = t99[i][2];
			spriteCtx.fillRect(
				x,
				Mutable.cellSize / (8 / 7),
				Mutable.cellSize,
				Mutable.cellSize / 8
			);
			//
			spriteCtx.beginPath();
			spriteCtx.moveTo(x, 0);
			spriteCtx.lineTo(x, Mutable.cellSize);
			spriteCtx.lineTo(
				x + Mutable.cellSize / 8,
				Mutable.cellSize / (8 / 7)
			);
			spriteCtx.lineTo(x + Mutable.cellSize / 8, Mutable.cellSize / 8);
			spriteCtx.fillStyle = t99[i][3];
			spriteCtx.fill();

			spriteCtx.beginPath();
			spriteCtx.moveTo(x + Mutable.cellSize, 0);
			spriteCtx.lineTo(x + Mutable.cellSize, Mutable.cellSize);
			spriteCtx.lineTo(
				x + Mutable.cellSize / (8 / 7),
				Mutable.cellSize / (8 / 7)
			);
			spriteCtx.lineTo(
				x + Mutable.cellSize / (8 / 7),
				Mutable.cellSize / 8
			);
			spriteCtx.fillStyle = t99[i][4];
			spriteCtx.fill();
		} else if (settings.Block === 11) {
			// .com
			spriteCtx.fillStyle = tetcom[i][0];
			roundRect(
				spriteCtx,
				x,
				0,
				Mutable.cellSize,
				Mutable.cellSize,
				Mutable.cellSize / 12,
				true,
				false
			);
			spriteCtx.fillStyle = tetcom[i][1];
			roundRect(
				spriteCtx,
				x + Mutable.cellSize / 18,
				0 + Mutable.cellSize / 18,
				Mutable.cellSize / 1.125,
				Mutable.cellSize / 1.125,
				Mutable.cellSize / 12,
				true,
				false
			);

			const grd = spriteCtx.createRadialGradient(
				x + Mutable.cellSize / 2,
				0 + Mutable.cellSize,
				Mutable.cellSize / 32,
				x + Mutable.cellSize / 2,
				0 + Mutable.cellSize / 1.5,
				Mutable.cellSize
			);
			grd.addColorStop(0, tetcom[i][2]);
			grd.addColorStop(1, tetcom[i][3]);
			spriteCtx.fillStyle = grd;
			spriteCtx.fillRect(
				x + Mutable.cellSize / (16 / 2.5),
				0 + Mutable.cellSize / (16 / 2.5),
				Mutable.cellSize / (16 / 11),
				Mutable.cellSize / (16 / 11)
			);

			spriteCtx.beginPath();
			spriteCtx.moveTo(
				x + Mutable.cellSize / (16 / 2.5),
				0 + Mutable.cellSize / (16 / 2.5)
			);
			spriteCtx.bezierCurveTo(
				x + Mutable.cellSize / (16 / 2.5),
				Mutable.cellSize / 2,
				x + Mutable.cellSize / (16 / 13.5),
				Mutable.cellSize / 2,
				x + Mutable.cellSize / (16 / 13.5),
				Mutable.cellSize / (16 / 2.5)
			);
			grad = spriteCtx.createLinearGradient(
				x,
				0,
				x,
				Mutable.cellSize / 2
			);
			grad.addColorStop(0, "#FFFFFF44");
			grad.addColorStop(1, "#FFFFFF88");
			spriteCtx.fillStyle = grad;
			spriteCtx.fill();

			grad = spriteCtx.createLinearGradient(
				x + Mutable.cellSize / 2,
				0,
				x + Mutable.cellSize / (16 / 5),
				Mutable.cellSize / 2
			);
			grad.addColorStop(0.65, "#FFFFFF00");
			grad.addColorStop(0.8, "#FFFFFF");
			spriteCtx.fillStyle = grad;
			spriteCtx.fill();
		} else if (settings.Block === 12) {
			// PPT
			spriteCtx.fillStyle = ppt[i][0];
			spriteCtx.fillRect(x, 0, Mutable.cellSize, Mutable.cellSize);

			spriteCtx.fillStyle = ppt[i][4];
			spriteCtx.fillRect(
				x + Mutable.cellSize / 16,
				Mutable.cellSize / 16,
				Mutable.cellSize / (16 / 14),
				Mutable.cellSize / (16 / 14)
			);

			let grd = spriteCtx.createRadialGradient(
				x + Mutable.cellSize / 2,
				0 + Mutable.cellSize,
				Mutable.cellSize / 64,
				x + Mutable.cellSize / 2,
				0 + Mutable.cellSize,
				Mutable.cellSize / 2
			);
			grd.addColorStop(0, ppt[i][5]);
			grd.addColorStop(1, ppt[i][6]);
			spriteCtx.fillStyle = grd;
			spriteCtx.fillRect(
				x + Mutable.cellSize / 16,
				Mutable.cellSize / 2,
				Mutable.cellSize / (16 / 14),
				Mutable.cellSize / (16 / 7)
			);

			grd = spriteCtx.createLinearGradient(x, 0, x, Mutable.cellSize / 2);
			grd.addColorStop(0.2, ppt[i][6]);
			grd.addColorStop(1, ppt[i][4]);
			spriteCtx.fillStyle = grd;
			spriteCtx.fillRect(
				x + Mutable.cellSize / 16,
				Mutable.cellSize / 16,
				Mutable.cellSize / (16 / 14),
				Mutable.cellSize / (16 / 7)
			);

			spriteCtx.fillStyle = ppt[i][1];
			spriteCtx.fillRect(
				x + Mutable.cellSize / 32,
				Mutable.cellSize / 32,
				Mutable.cellSize / (32 / 30),
				Mutable.cellSize / (32 / 3)
			);

			spriteCtx.fillStyle = ppt[i][3];
			spriteCtx.fillRect(
				x + Mutable.cellSize / 32,
				Mutable.cellSize / (32 / 28),
				Mutable.cellSize / (32 / 30),
				Mutable.cellSize / (32 / 3)
			);
			//

			spriteCtx.beginPath();
			spriteCtx.moveTo(x + Mutable.cellSize / 34, Mutable.cellSize / 32);
			spriteCtx.lineTo(
				x + Mutable.cellSize / 34,
				Mutable.cellSize / (32 / 31)
			);
			spriteCtx.lineTo(
				x + Mutable.cellSize / 8,
				Mutable.cellSize / (8 / 7)
			);
			spriteCtx.lineTo(x + Mutable.cellSize / 8, Mutable.cellSize / 8);
			spriteCtx.fillStyle = ppt[i][2];
			spriteCtx.fill();

			spriteCtx.beginPath();
			spriteCtx.moveTo(
				x + Mutable.cellSize / (34 / 33),
				Mutable.cellSize / 32
			);
			spriteCtx.lineTo(
				x + Mutable.cellSize / (34 / 33),
				Mutable.cellSize / (32 / 31)
			);
			spriteCtx.lineTo(
				x + Mutable.cellSize / (8 / 7),
				Mutable.cellSize / (8 / 7)
			);
			spriteCtx.lineTo(
				x + Mutable.cellSize / (8 / 7),
				Mutable.cellSize / 8
			);
			spriteCtx.fillStyle = ppt[i][2];
			spriteCtx.fill();
		} else if (settings.Block === 13) {
			// Tetr.js
			spriteCtx.fillStyle = tetrjs[i][2];
			spriteCtx.fillRect(x, 0, Mutable.cellSize, Mutable.cellSize);
			spriteCtx.beginPath();
			spriteCtx.moveTo(x + Mutable.cellSize / 16, Mutable.cellSize / 16);
			spriteCtx.lineTo(
				x + Mutable.cellSize / 16,
				Mutable.cellSize / (16 / 10)
			);
			spriteCtx.quadraticCurveTo(
				x + Mutable.cellSize / (16 / 8),
				Mutable.cellSize / (16 / 5),
				x + Mutable.cellSize / (16 / 15),
				Mutable.cellSize / (16 / 4)
			);
			spriteCtx.lineTo(
				x + Mutable.cellSize / (16 / 15),
				Mutable.cellSize / (16 / 1)
			);
			spriteCtx.fillStyle = tetrjs[i][0];
			spriteCtx.fill();
		}
		i = iCurrent;
	}
}

/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
export function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
	if (typeof stroke == "undefined") {
		stroke = true;
	}
	if (typeof radius === "undefined") {
		radius = 5;
	}
	if (typeof radius === "number") {
		radius = { tl: radius, tr: radius, br: radius, bl: radius };
	} else {
		const defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
		for (const side in defaultRadius) {
			radius[side] = radius[side] || defaultRadius[side];
		}
	}
	ctx.beginPath();
	ctx.moveTo(x + radius.tl, y);
	ctx.lineTo(x + width - radius.tr, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
	ctx.lineTo(x + width, y + height - radius.br);
	ctx.quadraticCurveTo(
		x + width,
		y + height,
		x + width - radius.br,
		y + height
	);
	ctx.lineTo(x + radius.bl, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
	ctx.lineTo(x, y + radius.tl);
	ctx.quadraticCurveTo(x, y, x + radius.tl, y);
	ctx.closePath();
	if (fill) {
		ctx.fill();
	}
	if (stroke) {
		ctx.stroke();
	}
}

/**
 * Draws a 2d array of minos.
 */
export function draw(tetro, cx, cy, ctx, color, darkness?) {
	for (let x = 0, len = tetro.length; x < len; x++) {
		for (let y = 0, wid = tetro[x].length; y < wid; y++) {
			if (tetro[x][y]) {
				drawCell(
					x + cx,
					y + cy,
					color !== undefined ? color : tetro[x][y],
					ctx,
					darkness
				);
			}
		}
	}
}

// ========================== Controller ======================================

export const keyToString = {
	8: "Backspace",
	9: "Tab",
	13: "Enter",
	16: "Shift",
	17: "Ctrl",
	18: "Alt",
	19: "Pause",
	20: "Caps Lock",
	27: "Esc",
	32: "Space",
	33: "PgUp",
	34: "PgDn",
	35: "End",
	36: "Home",
	37: "←",
	38: "↑",
	39: "→",
	40: "↓",
	45: "Insert",
	46: "Delete",
	48: "0",
	49: "1",
	50: "2",
	51: "3",
	52: "4",
	53: "5",
	54: "6",
	55: "7",
	56: "8",
	57: "9",
	59: ";",
	61: "=",
	65: "A",
	66: "B",
	67: "C",
	68: "D",
	69: "E",
	70: "F",
	71: "G",
	72: "H",
	73: "I",
	74: "J",
	75: "K",
	76: "L",
	77: "M",
	78: "N",
	79: "O",
	80: "P",
	81: "Q",
	82: "R",
	83: "S",
	84: "T",
	85: "U",
	86: "V",
	87: "W",
	88: "X",
	89: "Y",
	90: "Z",
	96: "0kpad",
	97: "1kpad",
	98: "2kpad",
	99: "3kpad",
	100: "4kpad",
	101: "5kpad",
	102: "6kpad",
	103: "7kpad",
	104: "8kpad",
	105: "9kpad",
	106: "*",
	107: "+",
	109: "-",
	110: ".",
	111: "/",
	112: "F1",
	113: "F2",
	114: "F3",
	115: "F4",
	116: "F5",
	117: "F6",
	118: "F7",
	119: "F8",
	120: "F9",
	121: "F10",
	122: "F11",
	123: "F12",
	173: "-",
	186: ";",
	187: "=",
	188: ",",
	189: "-",
	190: ".",
	191: "/",
	192: "`",
	219: "[",
	220: "\\",
	221: "]",
	222: "'",
	undefined: "---",
	0: "---",
};

export function keyUpDown(e) {
	// TODO send to menu or game depending on context.
	if ([32, 37, 38, 39, 40].indexOf(e.keyCode) !== -1) e.preventDefault();
	//TODO if active, prevent default for binded keys
	//if (bindsArr.indexOf(e.keyCode) !== -1)
	// e.preventDefault();
	if (e.type === "keydown" && e.keyCode === binds.pause) {
		if (Game.paused) {
			Game.unpause();
		} else {
			Game.pause();
		}
	}
	if (e.type === "keydown" && e.keyCode === binds.retry) {
		Game.init(Game.type, Game.params);
	}
	if (!Mutable.watchingReplay) {
		if (e.type === "keydown") {
			if (e.keyCode === binds.moveLeft) {
				Mutable.keysDown |= flags.moveLeft;
			} else if (e.keyCode === binds.moveRight) {
				Mutable.keysDown |= flags.moveRight;
			} else if (e.keyCode === binds.moveDown) {
				Mutable.keysDown |= flags.moveDown;
			} else if (e.keyCode === binds.hardDrop) {
				Mutable.keysDown |= flags.hardDrop;
			} else if (e.keyCode === binds.rotRight) {
				Mutable.keysDown |= flags.rotRight;
			} else if (e.keyCode === binds.rotLeft) {
				Mutable.keysDown |= flags.rotLeft;
			} else if (e.keyCode === binds.rot180) {
				Mutable.keysDown |= flags.rot180;
			} else if (e.keyCode === binds.moveLeft3) {
				Mutable.keysDown |= flags.moveLeft3;
			} else if (e.keyCode === binds.moveRight3) {
				Mutable.keysDown |= flags.moveRight3;
			} else if (e.keyCode === binds.holdPiece) {
				Mutable.keysDown |= flags.holdPiece;
			}
		} else if (e.type === "keyup") {
			if (
				e.keyCode === binds.moveLeft &&
				Mutable.keysDown & flags.moveLeft
			) {
				Mutable.keysDown ^= flags.moveLeft;
			} else if (
				e.keyCode === binds.moveRight &&
				Mutable.keysDown & flags.moveRight
			) {
				Mutable.keysDown ^= flags.moveRight;
			} else if (
				e.keyCode === binds.moveDown &&
				Mutable.keysDown & flags.moveDown
			) {
				Mutable.keysDown ^= flags.moveDown;
			} else if (
				e.keyCode === binds.hardDrop &&
				Mutable.keysDown & flags.hardDrop
			) {
				Mutable.keysDown ^= flags.hardDrop;
			} else if (
				e.keyCode === binds.rotRight &&
				Mutable.keysDown & flags.rotRight
			) {
				Mutable.keysDown ^= flags.rotRight;
			} else if (
				e.keyCode === binds.rotLeft &&
				Mutable.keysDown & flags.rotLeft
			) {
				Mutable.keysDown ^= flags.rotLeft;
			} else if (
				e.keyCode === binds.rot180 &&
				Mutable.keysDown & flags.rot180
			) {
				Mutable.keysDown ^= flags.rot180;
			} else if (
				e.keyCode === binds.moveLeft3 &&
				Mutable.keysDown & flags.moveLeft3
			) {
				Mutable.keysDown ^= flags.moveLeft3;
			} else if (
				e.keyCode === binds.moveRight3 &&
				Mutable.keysDown & flags.moveRight3
			) {
				Mutable.keysDown ^= flags.moveRight3;
			} else if (
				e.keyCode === binds.holdPiece &&
				Mutable.keysDown & flags.holdPiece
			) {
				Mutable.keysDown ^= flags.holdPiece;
			}
		}
	}
}
