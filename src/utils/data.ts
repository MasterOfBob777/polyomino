import { lazy } from "./decorators";
import { Mino, RotSys } from "./enums";
import { rng } from "./randomizer";
import { $, $$ } from "./utils";

export const version = "0.7.7";

export class Mutable {
	// Scoreing related status
	static allclear = 0;

	static combo = 0;

	static level = 0;

	static leveltgm = 0;

	static leveltgmvisible = 0;

	// Stats related status
	static lines = 0;

	static lineAmount = 0;

	static lineARE = 0;

	static lineAREb = 0;

	static lineDrought = 0;

	static score = 0n;

	static newScore = 0n;

	static statsFinesse = 0;

	static piecesSet = 0;

	static scoreTime = 0;

	static scoreStartTime = 0;

	static digLines = [];

	static b2b = 0;

	static gravity = 0;

	static gravityArr = (() => {
		const array = [];
		array.push(0);
		for (let i = 1; i < 64; i *= 2) array.push(i / 64);
		for (let i = 1; i <= 20; i += 19) array.push(i);
		return array;
	})();

	static lineLimit = 0;

	/**
	 * Playfield.
	 */
	static cellSize = 0;

	static column = 0;

	static lockDelayLimit = undefined;

	static sdArray = [];

	static frame = 0;

	static frameSkipped = 0;

	/**
	 * for dig challenge mode
	 */
	static frameLastRise = 0;

	static frameLastHarddropDown = 0;

	/**
	 * for dig zen mode
	 */
	static digZenBuffer = 0;

	static lastPiecesSet = 0;

	static toGreyRow = 0;

	//TODO Make dirty flags for each canvas, draw them all at once during frame call.
	static lastX = 0;

	static lastY = 0;

	static lastPos: number | string = 0;

	static lastLockDelay = 0;

	static usedHardDrop = false;

	static spinY = 0;

	static spinX = 0;

	static rotationFailed = false;

	static classicRuleDelayLast = 0;

	static lastYFrame = 0;

	static classicSoftDrop = 0;

	static classicGravTest = 0;

	static classicStoredY = 0;

	static stepSEPlayed: boolean;

	static keysDown = 0;

	static lastKeys = 0;

	static released = 0;

	static alarm = false;

	static replay: any;

	static watchingReplay: boolean;

	static lineClear = 0;

	static playedLevelingbgmGrades = [false, false];

	static playedLevelingbgmMarathon = [false, false];

	static lastbgmTime = 0;

	static killAllbgm = false;

	static currentLoading = "";

	static scoreNes = 0;

	static nontetNes = 0;

	static tetNes = 0;

	static tetRateNes = 0;

	static isSpin = false;

	static isMini = false;

	static lockflashX = 0;

	static lockflashY = 0;

	static lockflashTetro;

	static lockflash = 0;

	static lockflashOn = false;

	static alarmtest = false;

	static clearRows = [];

	static levelCheck = 0;
}

export let binds: { [key: string]: number } = {
	pause: 27,
	moveLeft: 37,
	moveRight: 39,
	moveLeft3: 0,
	moveRight3: 0,
	moveDown: 40,
	hardDrop: 32,
	holdPiece: 67,
	rotRight: 88,
	rotLeft: 90,
	rot180: 16,
	retry: 82,
};

export function setBinds(newBinds) {
	binds = newBinds;
}

export const flags = {
	hardDrop: 1,
	moveRight: 2,
	moveLeft: 4,
	moveDown: 8,
	holdPiece: 16,
	rotRight: 32,
	rotLeft: 64,
	rot180: 128,
	moveRight3: 256,
	moveLeft3: 512,
};

export const uitypes =
	"ppt,tgm,npm,yotipo,toj,nes,tf,99,com,party,ultimate,ace,tetrjs".split(",");

const base = 1 / 65536;

export const speedTableTGM = [
	{ level: 0, speed: base * 1024 },
	{ level: 30, speed: base * 1536 },
	{ level: 35, speed: base * 2048 },
	{ level: 40, speed: base * 2560 },
	{ level: 50, speed: base * 3072 },
	{ level: 60, speed: base * 4096 },
	{ level: 70, speed: base * 8192 },
	{ level: 80, speed: base * 12288 },
	{ level: 90, speed: base * 16384 },
	{ level: 100, speed: base * 20480 },
	{ level: 120, speed: base * 24576 },
	{ level: 140, speed: base * 28672 },
	{ level: 160, speed: base * 32768 },
	{ level: 170, speed: base * 36865 },
	{ level: 200, speed: base * 1024 },
	{ level: 220, speed: base * 8192 },
	{ level: 230, speed: base * 16384 },
	{ level: 233, speed: base * 24576 },
	{ level: 236, speed: base * 32768 },
	{ level: 239, speed: base * 40960 },
	{ level: 243, speed: base * 49152 },
	{ level: 247, speed: base * 57344 },
	{ level: 251, speed: 1 },
	{ level: 300, speed: 2 },
	{ level: 330, speed: 3 },
	{ level: 360, speed: 4 },
	{ level: 400, speed: 5 },
	{ level: 420, speed: 4 },
	{ level: 450, speed: 3 },
	{ level: 500, speed: 20 },
	{ level: 9999999999999, speed: 20 },
];

export const miscTableTGM = [
	{
		level: 0,
		are: 25,
		areline: 40,
		arelineb: 0,
		das: 14,
		lockdelay: 30,
	},
	{
		level: 500,
		are: 25,
		areline: 25,
		arelineb: 0,
		das: 8,
		lockdelay: 30,
	},
	{
		level: 600,
		are: 25,
		areline: 16,
		arelineb: -9,
		das: 8,
		lockdelay: 30,
	},
	{
		level: 700,
		are: 16,
		areline: 12,
		arelineb: -4,
		das: 8,
		lockdelay: 30,
	},
	{
		level: 800,
		are: 12,
		areline: 6,
		arelineb: -6,
		das: 8,
		lockdelay: 30,
	},
	{
		level: 900,
		are: 12,
		areline: 6,
		arelineb: -6,
		das: 6,
		lockdelay: 17,
	},
	{
		level: 1000,
		are: 6,
		areline: 6,
		arelineb: 0,
		das: 6,
		lockdelay: 17,
	},
	{
		level: 1100,
		are: 5,
		areline: 6,
		arelineb: 0,
		das: 6,
		lockdelay: 15,
	},
	{
		level: 1200,
		are: 4,
		areline: 6,
		arelineb: 0,
		das: 6,
		lockdelay: 15,
	},
	{
		level: 99999999999999,
		are: 4,
		areline: 6,
		das: 6,
		lockdelay: 15,
	},
];

/**
 * Piece data
 */

// [r][x][y]
export const TetroI = [
	[
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
	],
	[
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
	],
	[
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
	],
	[
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	],
];
export const TetroJ = [
	[
		[2, 2, 0, 0],
		[0, 2, 0, 0],
		[0, 2, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 0, 0, 0],
		[2, 2, 2, 0],
		[2, 0, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 2, 0, 0],
		[0, 2, 0, 0],
		[0, 2, 2, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 0, 2, 0],
		[2, 2, 2, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	],
];
export const TetroL = [
	[
		[0, 3, 0, 0],
		[0, 3, 0, 0],
		[3, 3, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 0, 0, 0],
		[3, 3, 3, 0],
		[0, 0, 3, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 3, 3, 0],
		[0, 3, 0, 0],
		[0, 3, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[3, 0, 0, 0],
		[3, 3, 3, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	],
];
export const TetroO = [
	[
		[0, 0, 0, 0],
		[4, 4, 0, 0],
		[4, 4, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 0, 0, 0],
		[4, 4, 0, 0],
		[4, 4, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 0, 0, 0],
		[4, 4, 0, 0],
		[4, 4, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 0, 0, 0],
		[4, 4, 0, 0],
		[4, 4, 0, 0],
		[0, 0, 0, 0],
	],
];
export const TetroS = [
	[
		[0, 5, 0, 0],
		[5, 5, 0, 0],
		[5, 0, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 0, 0, 0],
		[5, 5, 0, 0],
		[0, 5, 5, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 0, 5, 0],
		[0, 5, 5, 0],
		[0, 5, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[5, 5, 0, 0],
		[0, 5, 5, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	],
];
export const TetroT = [
	[
		[0, 6, 0, 0],
		[6, 6, 0, 0],
		[0, 6, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 0, 0, 0],
		[6, 6, 6, 0],
		[0, 6, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 6, 0, 0],
		[0, 6, 6, 0],
		[0, 6, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 6, 0, 0],
		[6, 6, 6, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	],
];
export const TetroZ = [
	[
		[7, 0, 0, 0],
		[7, 7, 0, 0],
		[0, 7, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 0, 0, 0],
		[0, 7, 7, 0],
		[7, 7, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 7, 0, 0],
		[0, 7, 7, 0],
		[0, 0, 7, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 7, 7, 0],
		[7, 7, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	],
];
// [r][MINX MINY MAXX MAXY]
export const RectI = [
	[0, 1, 4, 2],
	[2, 0, 3, 4],
	[0, 2, 4, 3],
	[1, 0, 2, 4],
]; // hacked for next display
export const RectJ = [
	[0, 0, 3, 2],
	[1, 0, 3, 3],
	[0, 1, 3, 3],
	[0, 0, 2, 3],
];
export const RectL = [
	[0, 0, 3, 2],
	[1, 0, 3, 3],
	[0, 1, 3, 3],
	[0, 0, 2, 3],
];
export const RectO = [
	[1, 0, 3, 2],
	[1, 0, 3, 2],
	[1, 0, 3, 2],
	[1, 0, 3, 2],
];
export const RectS = [
	[0, 0, 3, 2],
	[1, 0, 3, 3],
	[0, 1, 3, 3],
	[0, 0, 2, 3],
];
export const RectT = [
	[0, 0, 3, 2],
	[1, 0, 3, 3],
	[0, 1, 3, 3],
	[0, 0, 2, 3],
];
export const RectZ = [
	[0, 0, 3, 2],
	[1, 0, 3, 3],
	[0, 1, 3, 3],
	[0, 0, 2, 3],
];

export const SpinCheckI = {
	highX: [
		[1, 2, 2, 1],
		[1, 3, 1, 3],
		[1, 2, 2, 1],
		[0, 2, 0, 2],
	],
	highY: [
		[0, 2, 0, 2],
		[1, 2, 2, 1],
		[1, 3, 1, 3],
		[1, 2, 2, 1],
	],
	lowX: [
		[-1, 4, -1, 4],
		[2, 2, 2, 2],
		[-1, 4, -1, 4],
		[1, 1, 1, 1],
	],
	lowY: [
		[1, 1, 1, 1],
		[-1, 4, -1, 4],
		[2, 2, 2, 2],
		[-1, 4, -1, 4],
	],
};
export const SpinCheckJ = {
	highX: [
		[1, 2],
		[2, 2],
		[1, 0],
		[0, 0],
	],
	highY: [
		[0, 0],
		[1, 2],
		[2, 2],
		[1, 0],
	],
	lowX: [
		[0, 2],
		[0, 0],
		[2, 0],
		[2, 2],
	],
	lowY: [
		[2, 2],
		[0, 2],
		[0, 0],
		[2, 0],
	],
};
export const SpinCheckL = {
	highX: [
		[1, 0],
		[2, 2],
		[1, 2],
		[0, 0],
	],
	highY: [
		[0, 0],
		[1, 0],
		[2, 2],
		[1, 2],
	],
	lowX: [
		[2, 0],
		[0, 0],
		[0, 2],
		[2, 2],
	],
	lowY: [
		[2, 2],
		[2, 0],
		[0, 0],
		[0, 3],
	],
};
export const SpinCheckS = {
	highX: [
		[0, 2],
		[1, 2],
		[2, 0],
		[1, 0],
	],
	highY: [
		[0, 1],
		[2, 0],
		[2, 1],
		[0, 2],
	],
	lowX: [
		[0, -1],
		[1, 2],
		[-1, 3],
		[1, 0],
	],
	lowY: [
		[0, 1],
		[-1, 3],
		[2, 1],
		[3, -1],
	],
};
export const SpinCheckT = {
	highX: [
		[0, 2],
		[2, 2],
		[0, 2],
		[0, 0],
	],
	highY: [
		[0, 0],
		[0, 2],
		[2, 2],
		[0, 2],
	],
	lowX: [
		[0, 2],
		[0, 0],
		[0, 2],
		[2, 2],
	],
	lowY: [
		[2, 2],
		[0, 2],
		[0, 0],
		[0, 2],
	],
};
export const SpinCheckZ = {
	highX: [
		[2, 0],
		[2, 1],
		[0, 2],
		[0, 1],
	],
	highY: [
		[0, 1],
		[2, 0],
		[2, 1],
		[0, 2],
	],
	lowX: [
		[-1, 3],
		[2, 1],
		[3, -1],
		[0, 1],
	],
	lowY: [
		[0, 1],
		[-1, 3],
		[2, 1],
		[3, -1],
	],
};

export const WKTableSRSI_R = [
	[
		[0, 0],
		[-2, 0],
		[+1, 0],
		[-2, +1],
		[+1, -2],
	],
	[
		[0, 0],
		[-1, 0],
		[+2, 0],
		[-1, -2],
		[+2, +1],
	],
	[
		[0, 0],
		[+2, 0],
		[-1, 0],
		[+2, -1],
		[-1, +2],
	],
	[
		[0, 0],
		[+1, 0],
		[-2, 0],
		[+1, +2],
		[-2, -1],
	],
];
export const WKTableSRSI_L = [
	[
		[0, 0],
		[-1, 0],
		[+2, 0],
		[-1, -2],
		[+2, +1],
	],
	[
		[0, 0],
		[+2, 0],
		[-1, 0],
		[+2, -1],
		[-1, +2],
	],
	[
		[0, 0],
		[+1, 0],
		[-2, 0],
		[+1, +2],
		[-2, -1],
	],
	[
		[0, 0],
		[-2, 0],
		[+1, 0],
		[-2, +1],
		[+1, -2],
	],
];
export const WKTableSRSI_2 = [
	[
		[0, 0],
		[-1, 0],
		[-2, 0],
		[+1, 0],
		[+2, 0],
		[0, +1],
	],
	[
		[0, 0],
		[0, +1],
		[0, +2],
		[0, -1],
		[0, -2],
		[-1, 0],
	],
	[
		[0, 0],
		[+1, 0],
		[+2, 0],
		[-1, 0],
		[-2, 0],
		[0, -1],
	],
	[
		[0, 0],
		[0, +1],
		[0, +2],
		[0, -1],
		[0, -2],
		[+1, 0],
	],
];
export const WKTableSRSX_R = [
	[
		[0, 0],
		[-1, 0],
		[-1, -1],
		[0, +2],
		[-1, +2],
	],
	[
		[0, 0],
		[+1, 0],
		[+1, +1],
		[0, -2],
		[+1, -2],
	],
	[
		[0, 0],
		[+1, 0],
		[+1, -1],
		[0, +2],
		[+1, +2],
	],
	[
		[0, 0],
		[-1, 0],
		[-1, +1],
		[0, -2],
		[-1, -2],
	],
];
export const WKTableSRSX_L = [
	[
		[0, 0],
		[+1, 0],
		[+1, -1],
		[0, +2],
		[+1, +2],
	],
	[
		[0, 0],
		[+1, 0],
		[+1, +1],
		[0, -2],
		[+1, -2],
	],
	[
		[0, 0],
		[-1, 0],
		[-1, -1],
		[0, +2],
		[-1, +2],
	],
	[
		[0, 0],
		[-1, 0],
		[-1, +1],
		[0, -2],
		[-1, -2],
	],
];
export const WKTableSRSX_2 = [
	[
		[0, 0],
		[+1, 0],
		[+2, 0],
		[+1, +1],
		[+2, +1],
		[-1, 0],
		[-2, 0],
		[-1, +1],
		[-2, +1],
		[0, -1],
		[+3, 0],
		[-3, 0],
	],
	[
		[0, 0],
		[0, +1],
		[0, +2],
		[-1, +1],
		[-1, +2],
		[0, -1],
		[0, -2],
		[-1, -1],
		[-1, -2],
		[+1, 0],
		[0, +3],
		[0, -3],
	],
	[
		[0, 0],
		[-1, 0],
		[-2, 0],
		[-1, -1],
		[-2, -1],
		[+1, 0],
		[+2, 0],
		[+1, -1],
		[+2, -1],
		[0, +1],
		[-3, 0],
		[+3, 0],
	],
	[
		[0, 0],
		[0, +1],
		[0, +2],
		[+1, +1],
		[+1, +2],
		[0, -1],
		[0, -2],
		[+1, -1],
		[+1, -2],
		[-1, 0],
		[0, +3],
		[0, -3],
	],
];
export const WKTableSRSI = [WKTableSRSI_R, WKTableSRSI_L, WKTableSRSI_2];
export const WKTableSRSX = [WKTableSRSX_R, WKTableSRSX_L, WKTableSRSX_2];
export const WKTableSRS = [
	WKTableSRSI,
	WKTableSRSX,
	WKTableSRSX,
	WKTableSRSX,
	WKTableSRSX,
	WKTableSRSX,
	WKTableSRSX,
];

export const WKTableCultris = [
	[0, 0],
	[-1, 0],
	[+1, 0],
	[0, +1],
	[-1, +1],
	[+1, +1],
	[-2, 0],
	[+2, 0],
	[0, -1],
];

export const WKTableDRS_R = [
	[0, 0],
	[+1, 0],
	[-1, 0],
	[0, +1],
	[+1, +1],
	[-1, +1],
	[0, -1],
];
export const WKTableDRS_L = [
	[0, 0],
	[-1, 0],
	[+1, 0],
	[0, +1],
	[-1, +1],
	[+1, +1],
	[0, -1],
];
export const WKTableDRS = [WKTableDRS_R, WKTableDRS_L, WKTableDRS_L];

export const WKTableDX_R = [
	[
		[0, 0],
		[-1, -1],
	],
	[
		[0, 0],
		[+1, -1],
	],
	[
		[0, 0],
		[+1, +1],
	],
	[
		[0, 0],
		[-1, +1],
	],
];
export const WKTableDX_L = [
	[
		[0, 0],
		[+1, -1],
	],
	[
		[0, 0],
		[+1, +1],
	],
	[
		[0, 0],
		[-1, +1],
	],
	[
		[0, 0],
		[-1, -1],
	],
];
export const WKTableDX_2 = [
	[
		[0, 0],
		[0, -2],
	],
	[
		[0, 0],
		[-2, 0],
	],
	[
		[0, 0],
		[0, +2],
	],
	[
		[0, 0],
		[+2, 0],
	],
];
export const WKTableDX = [WKTableDX_R, WKTableDX_L, WKTableDX_2];

export const OffsetSRS = [
	[
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
	],
	[
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
	],
	[
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
	],
	[
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
	],
	[
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
	],
	[
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
	],
	[
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
	],
];
export const OffsetARS = [
	[
		[0, 0],
		[0, 0],
		[0, -1],
		[+1, 0],
	],
	[
		[0, +1],
		[0, 0],
		[0, 0],
		[0, 0],
	],
	[
		[0, +1],
		[0, 0],
		[0, 0],
		[0, 0],
	],
	[
		[0, +1],
		[0, +1],
		[0, +1],
		[0, +1],
	],
	[
		[0, +1],
		[-1, 0],
		[0, 0],
		[0, 0],
	],
	[
		[0, +1],
		[0, 0],
		[0, 0],
		[0, 0],
	],
	[
		[0, +1],
		[0, 0],
		[0, 0],
		[+1, 0],
	],
];
export const OffsetDRS = [
	[
		[0, +1],
		[0, 0],
		[0, 0],
		[0, 0],
	],
	[
		[0, +1],
		[0, 0],
		[0, 0],
		[0, 0],
	],
	[
		[0, +1],
		[0, 0],
		[0, 0],
		[0, 0],
	],
	[
		[0, +1],
		[0, +1],
		[0, +1],
		[0, +1],
	],
	[
		[0, +1],
		[0, 0],
		[0, 0],
		[0, 0],
	],
	[
		[0, +1],
		[0, 0],
		[0, 0],
		[0, 0],
	],
	[
		[0, +1],
		[0, 0],
		[0, 0],
		[0, 0],
	],
];
export const OffsetQRS = [
	[
		[0, 0],
		[0, 0],
		[0, -1],
		[+1, 0],
	],
	[
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
	],
	[
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
	],
	[
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
	],
	[
		[0, 0],
		[0, 0],
		[0, -1],
		[+1, 0],
	],
	[
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
	],
	[
		[0, 0],
		[0, 0],
		[0, -1],
		[+1, 0],
	],
];
export const OffsetAtari = [
	[
		[0, -1],
		[-1, 0],
		[0, -2],
		[0, 0],
	],
	[
		[0, 0],
		[-1, 0],
		[0, -1],
		[0, 0],
	],
	[
		[0, 0],
		[-1, 0],
		[0, -1],
		[0, 0],
	],
	[
		[-2, 0],
		[-2, 0],
		[-2, 0],
		[-2, 0],
	],
	[
		[0, 0],
		[-1, 0],
		[0, -1],
		[0, 0],
	],
	[
		[0, 0],
		[-1, 0],
		[0, -1],
		[0, 0],
	],
	[
		[0, 0],
		[-1, 0],
		[0, -1],
		[0, 0],
	],
];
export const OffsetNBlox = [
	[
		[0, 0],
		[-1, 0],
		[0, -1],
		[0, 0],
	],
	[
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
	],
	[
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
	],
	[
		[0, +1],
		[0, +1],
		[0, +1],
		[0, +1],
	],
	[
		[0, +1],
		[0, 0],
		[0, 0],
		[+1, 0],
	],
	[
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
	],
	[
		[0, +1],
		[0, 0],
		[0, 0],
		[+1, 0],
	],
];
export const OffsetNintendo = [
	[
		[0, +1],
		[0, 0],
		[0, 0],
		[+1, 0],
	],
	[
		[+1, 0],
		[+1, 0],
		[+1, 0],
		[+1, 0],
	],
	[
		[+1, 0],
		[+1, 0],
		[+1, 0],
		[+1, 0],
	],
	[
		[0, +1],
		[0, +1],
		[0, +1],
		[0, +1],
	],
	[
		[+1, +1],
		[+1, 0],
		[+1, 0],
		[+2, 0],
	],
	[
		[+1, 0],
		[+1, 0],
		[+1, 0],
		[+1, 0],
	],
	[
		[+1, +1],
		[+1, 0],
		[+1, 0],
		[+2, 0],
	],
];
export const OffsetMS = [
	[
		[0, 0],
		[0, 0],
		[0, -1],
		[+1, 0],
	],
	[
		[+1, 0],
		[+1, 0],
		[+1, 0],
		[+1, 0],
	],
	[
		[+1, 0],
		[+1, 0],
		[+1, 0],
		[+1, 0],
	],
	[
		[0, +1],
		[0, +1],
		[0, +1],
		[0, +1],
	],
	[
		[+1, +1],
		[0, +1],
		[+1, 0],
		[+1, +1],
	],
	[
		[+1, 0],
		[+1, 0],
		[+1, 0],
		[+1, 0],
	],
	[
		[+1, +1],
		[0, +1],
		[+1, 0],
		[+1, +1],
	],
];
export const OffsetE60 = [
	[
		[0, 0],
		[0, 0],
		[0, -1],
		[+1, 0],
	],
	[
		[+1, 0],
		[+1, 0],
		[+1, 0],
		[+1, 0],
	],
	[
		[+1, 0],
		[+1, 0],
		[+1, 0],
		[+1, 0],
	],
	[
		[0, +1],
		[0, +1],
		[0, +1],
		[0, +1],
	],
	[
		[+1, +1],
		[+1, 0],
		[+1, 0],
		[+2, 0],
	],
	[
		[+1, 0],
		[+1, 0],
		[+1, 0],
		[+1, 0],
	],
	[
		[+1, +1],
		[+1, 0],
		[+1, 0],
		[+2, 0],
	],
];
export const OffsetJJSRS = [
	[
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
	],
	[
		[+1, 0],
		[+1, 0],
		[+1, 0],
		[+1, 0],
	],
	[
		[+1, 0],
		[+1, 0],
		[+1, 0],
		[+1, 0],
	],
	[
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
	],
	[
		[+1, 0],
		[+1, 0],
		[+1, 0],
		[+1, 0],
	],
	[
		[+1, 0],
		[+1, 0],
		[+1, 0],
		[+1, 0],
	],
	[
		[+1, 0],
		[+1, 0],
		[+1, 0],
		[+1, 0],
	],
];
export const Offset5000 = [
	[
		[0, +1],
		[-1, 0],
		[0, 0],
		[0, 0],
	],
	[
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
	],
	[
		[0, +1],
		[0, +1],
		[0, +1],
		[0, +1],
	],
	[
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
	],
	[
		[0, 0],
		[0, 0],
		[0, -1],
		[+1, 0],
	],
	[
		[0, +1],
		[-1, 0],
		[0, -1],
		[+1, 0],
	],
	[
		[0, 0],
		[0, 0],
		[0, -1],
		[+1, 0],
	],
];
export const OffsetPlus = [
	[
		[0, 0],
		[0, 0],
		[0, -1],
		[+1, 0],
	],
	[
		[+1, +1],
		[+1, 0],
		[+1, 0],
		[+1, 0],
	],
	[
		[+1, +1],
		[+1, 0],
		[+1, 0],
		[+1, 0],
	],
	[
		[0, +1],
		[0, +1],
		[0, +1],
		[0, +1],
	],
	[
		[+1, +1],
		[0, 0],
		[+1, 0],
		[+1, 0],
	],
	[
		[+1, +1],
		[+1, 0],
		[+1, 0],
		[+1, 0],
	],
	[
		[+1, +1],
		[+1, 0],
		[+1, 0],
		[+2, 0],
	],
];
export const OffsetDX = [
	[
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
	],
	[
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
	],
	[
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
	],
	[
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
	],
	[
		[0, +1],
		[0, +1],
		[0, +1],
		[0, +1],
	],
	[
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
	],
	[
		[0, +1],
		[0, +1],
		[0, +1],
		[0, +1],
	],
];

//x, y, r
export const InitInfoSRS = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
];
export const InitInfoARS = [
	[0, 0, 0],
	[0, 0, 2],
	[0, 0, 2],
	[0, +1, 0],
	[0, +1, 0],
	[0, 0, 2],
	[0, +1, 0],
];
export const InitInfoDRS = [
	[0, +1, 0],
	[0, 0, 2],
	[0, 0, 2],
	[0, +1, 0],
	[0, +1, 0],
	[0, 0, 2],
	[0, +1, 0],
];
export const InitInfoQRS = [
	[0, 0, 0],
	[0, 0, 1],
	[0, 0, 3],
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 2],
	[0, 0, 0],
];
export const InitInfoAtari = [
	[+1, 0, 0],
	[+1, 0, 2],
	[+1, 0, 2],
	[0, +1, 0],
	[+1, +1, 0],
	[+1, 0, 2],
	[+1, +1, 0],
];
export const InitInfoNBlox = [
	[0, 0, 0],
	[0, 0, 2],
	[0, 0, 2],
	[0, +1, 0],
	[0, +1, 0],
	[0, 0, 2],
	[0, +1, 0],
];
export const InitInfoNintendo = [
	[0, 0, 0],
	[+1, 0, 2],
	[+1, 0, 2],
	[0, +1, 0],
	[+1, +1, 0],
	[+1, 0, 2],
	[+1, +1, 0],
];
export const InitInfoMS = [
	[0, 0, 0],
	[+1, 0, 2],
	[+1, 0, 2],
	[0, +1, 0],
	[+1, +1, 0],
	[+1, 0, 2],
	[+1, +1, 0],
];
export const InitInfoE60 = [
	[0, 0, 0],
	[+1, 0, 2],
	[+1, 0, 2],
	[0, +1, 0],
	[+1, +1, 0],
	[+1, 0, 2],
	[+1, +1, 0],
];
export const InitInfoJJSRS = [
	[0, 0, 0],
	[+1, 0, 0],
	[+1, 0, 0],
	[0, 0, 0],
	[+1, 0, 0],
	[+1, 0, 0],
	[+1, 0, 0],
];
export const InitInfo5000 = [
	[0, 0, 3],
	[0, 0, 1],
	[+1, 0, 3],
	[0, 0, 0],
	[0, 0, 0],
	[0, -1, 2],
	[0, 0, 0],
];
export const InitInfoPlus = [
	[0, 0, 0],
	[+1, 0, 2],
	[+1, 0, 2],
	[0, +1, 0],
	[+1, +1, 0],
	[+1, 0, 2],
	[+1, +1, 0],
];
export const InitInfoDX = [
	[0, 0, 0],
	[0, 0, 2],
	[0, 0, 2],
	[0, +1, 0],
	[0, +1, 0],
	[0, 0, 2],
	[0, +1, 0],
];

export const ColorSRS = [1, 2, 3, 4, 5, 6, 7];
export const ColorARS = [7, 2, 3, 4, 6, 1, 5];
export const ColorQRS = [7, 1, 3, 4, 5, 6, 2];
export const ColorTengen = [7, 3, 6, 2, 5, 4, 1];
export const ColorAtari = [7, 4, 6, 2, 1, 5, 3];
export const ColorNBlox = [3, 6, 2, 7, 1, 4, 5];
export const ColorC2 = [5, 2, 6, 4, 1, 7, 9];
export const ColorNintendo = [9, 2, 7, 9, 2, 9, 7];
export const ColorMS = [7, 6, 4, 1, 2, 8, 5];
export const ColorE60 = [5, 5, 5, 5, 5, 5, 5];
export const ColorIBM = [7, 9, 6, 2, 5, 3, 1];
export const ColorJJSRS = [5, 1, 3, 4, 7, 6, 2];
export const Color5000 = [7, 6, 8, 4, 5, 1, 2];
export const ColorDX = [9, 7, 2, 4, 3, 5, 6];

//SRS, C2, ARS, QRS, DRS
export const RotSysData = [
	{
		initinfo: InitInfoSRS,
		offset: OffsetSRS,
		color: ColorSRS,
		id: RotSys.Super,
	},
	{
		initinfo: InitInfoSRS,
		offset: OffsetSRS,
		color: ColorC2,
		id: RotSys.C2,
	},
	{
		initinfo: InitInfoARS,
		offset: OffsetARS,
		color: ColorARS,
		id: RotSys.Arika,
	},
	{
		initinfo: InitInfoDRS,
		offset: OffsetDRS,
		color: ColorARS,
		id: RotSys.DTET,
	},
	{
		initinfo: InitInfoQRS,
		offset: OffsetQRS,
		color: ColorQRS,
		id: RotSys.QQ,
	},
	{
		initinfo: InitInfoAtari,
		offset: OffsetAtari,
		color: ColorAtari,
		id: RotSys.Atari,
	},
	{
		initinfo: InitInfoAtari,
		offset: OffsetAtari,
		color: ColorTengen,
		id: RotSys.Tengen,
	},
	{
		initinfo: InitInfoNBlox,
		offset: OffsetNBlox,
		color: ColorNBlox,
		id: RotSys["N-Blox"],
	},
	{
		initinfo: InitInfoNintendo,
		offset: OffsetNintendo,
		color: ColorNintendo,
		id: RotSys.Nintendo,
	},
	{
		initinfo: InitInfoMS,
		offset: OffsetMS,
		color: ColorMS,
		id: RotSys.MS,
	},
	{
		initinfo: InitInfoE60,
		offset: OffsetE60,
		color: ColorE60,
		id: RotSys["E-60"],
	},
	{
		initinfo: InitInfoE60,
		offset: OffsetE60,
		color: ColorIBM,
		id: RotSys["IBM PC"],
	},
	{
		initinfo: InitInfoJJSRS,
		offset: OffsetJJSRS,
		color: ColorJJSRS,
		id: RotSys.JJ,
	},
	{
		initinfo: InitInfo5000,
		offset: Offset5000,
		color: Color5000,
		id: RotSys["5k"],
	},
	{
		initinfo: InitInfoPlus,
		offset: OffsetPlus,
		color: ColorARS,
		id: RotSys.Plus,
	},
	{
		initinfo: InitInfoDX,
		offset: OffsetDX,
		color: ColorDX,
		id: RotSys.DX,
	},
];
// Define shapes and spawns.
export const PieceData = {
	I: {
		index: Mino.I,
		tetro: TetroI,
		rect: RectI,
		spin: SpinCheckI,
	},
	J: {
		index: Mino.J,
		tetro: TetroJ,
		rect: RectJ,
		spin: SpinCheckJ,
	},
	L: {
		index: Mino.L,
		tetro: TetroL,
		rect: RectL,
		spin: SpinCheckL,
	},
	O: {
		index: Mino.O,
		tetro: TetroO,
		rect: RectO,
		spin: undefined,
	},
	S: {
		index: Mino.S,
		tetro: TetroS,
		rect: RectS,
		spin: SpinCheckS,
	},
	T: {
		index: Mino.T,
		tetro: TetroT,
		rect: RectT,
		spin: SpinCheckT,
	},
	Z: {
		index: Mino.Z,
		tetro: TetroZ,
		rect: RectZ,
		spin: SpinCheckZ,
	},
};

export const pieces = [
	PieceData.I,
	PieceData.J,
	PieceData.L,
	PieceData.O,
	PieceData.S,
	PieceData.T,
	PieceData.Z,
];

// Finesse data
// index x orientation x column = finesse
// finesse[0][0][4] = 1
// TODO double check these.
export const finesse = [
	[
		[1, 2, 1, 0, 1, 2, 1],
		[2, 2, 2, 2, 1, 1, 2, 2, 2, 2],
		[1, 2, 1, 0, 1, 2, 1],
		[2, 2, 2, 2, 1, 1, 2, 2, 2, 2],
	],
	[
		[1, 2, 1, 0, 1, 2, 2, 1],
		[2, 2, 3, 2, 1, 2, 3, 3, 2],
		[2, 3, 2, 1, 2, 3, 3, 2],
		[2, 3, 2, 1, 2, 3, 3, 2, 2],
	],
	[
		[1, 2, 1, 0, 1, 2, 2, 1],
		[2, 2, 3, 2, 1, 2, 3, 3, 2],
		[2, 3, 2, 1, 2, 3, 3, 2],
		[2, 3, 2, 1, 2, 3, 3, 2, 2],
	],
	[
		[1, 2, 2, 1, 0, 1, 2, 2, 1],
		[1, 2, 2, 1, 0, 1, 2, 2, 1],
		[1, 2, 2, 1, 0, 1, 2, 2, 1],
		[1, 2, 2, 1, 0, 1, 2, 2, 1],
	],
	[
		[1, 2, 1, 0, 1, 2, 2, 1],
		[2, 2, 2, 1, 1, 2, 3, 2, 2],
		[1, 2, 1, 0, 1, 2, 2, 1],
		[2, 2, 2, 1, 1, 2, 3, 2, 2],
	],
	[
		[1, 2, 1, 0, 1, 2, 2, 1],
		[2, 2, 3, 2, 1, 2, 3, 3, 2],
		[2, 3, 2, 1, 2, 3, 3, 2],
		[2, 3, 2, 1, 2, 3, 3, 2, 2],
	],
	[
		[1, 2, 1, 0, 1, 2, 2, 1],
		[2, 2, 2, 1, 1, 2, 3, 2, 2],
		[1, 2, 1, 0, 1, 2, 2, 1],
		[2, 2, 2, 1, 1, 2, 3, 2, 2],
	],
];

export const arrRowGen = {
	simple(arr, offset, range, width) {
		const holex = ~~(rng.next() * range) + offset;
		for (let x = 0; x < width; x++) {
			arr[holex + x] = 0;
		}
	},
	simplemessy(arr, ratio, width) {
		let hashole = false;
		for (let x = 0; x < width; x++) {
			if (rng.next() >= ratio) {
				hashole = true;
				arr[x] = 0;
			}
		}
		if (hashole === false) {
			arr[~~(rng.next() * 10)] = 0;
		}
	},
};

export const arrStages = [
	{
		begin: 0,
		delay: 60 * 5,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 0, 7, 4);
		},
	},
	{
		begin: 5,
		delay: 60 * 7,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 0, 7, 4);
		},
	},
	{
		begin: 20,
		delay: 60 * 5,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 0, 7, 4);
		},
	},
	{
		begin: 40,
		delay: 60 * 4,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 2, 3, 4);
		},
	},
	{
		begin: 50,
		delay: 60 * 2,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 4, 1, 2);
		},
	},
	{
		begin: 70,
		delay: 60 * 5,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 0, 9, 2);
		},
	},
	{
		begin: 80,
		delay: 60 * 4,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 0, 9, 2);
		},
	},
	{
		begin: 90,
		delay: 60 * 3,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 0, 9, 2);
		},
	},

	{
		begin: 100,
		delay: 60 * 4,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 0, 10, 1);
		},
	},
	{
		begin: 120,
		delay: 60 * 3.5,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 0, 10, 1);
		},
	},
	{
		begin: 150,
		delay: 60 * 4,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 0, 7, 4);
		},
	},
	{
		begin: 170,
		delay: 60 * 3.5,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 0, 7, 4);
		},
	},

	{
		begin: 200,
		delay: 60 * 3.5,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 0, 10, 1);
		},
	},
	{
		begin: 220,
		delay: 60 * 3,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 0, 10, 1);
		},
	},
	{
		begin: 250,
		delay: 60 * 2.5,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 0, 9, 2);
		},
	},

	{
		begin: 300,
		delay: 60 * 3.5,
		gen: (arr, stack) => {
			arrRowGen.simplemessy(arr, 0.9, stack.width);
		},
	},
	{
		begin: 320,
		delay: 60 * 3,
		gen: (arr, stack) => {
			arrRowGen.simplemessy(arr, 0.9, stack.width);
		},
	},
	{
		begin: 350,
		delay: 60 * 3.5,
		gen: (arr, stack) => {
			arrRowGen.simplemessy(arr, 0.8, stack.width);
		},
	},
	{
		begin: 390,
		delay: 60 * 3,
		gen: (arr, stack) => {
			arrRowGen.simplemessy(arr, 0.8, stack.width);
		},
	},
	{
		begin: 400,
		delay: 60 * 4,
		gen: (arr, stack) => {
			arrRowGen.simplemessy(arr, 0.6, stack.width);
		},
	},
	{
		begin: 430,
		delay: 60 * 5,
		gen: (arr, stack) => {
			arrRowGen.simplemessy(arr, 0.4, stack.width);
		},
	},
	{
		begin: 450,
		delay: 60 * 7,
		gen: (arr, stack) => {
			arrRowGen.simplemessy(arr, 0.1, stack.width);
		},
	},

	{
		begin: 470,
		delay: 60 * 7,
		gen: (arr, stack) => {
			arrRowGen.simplemessy(arr, 0.4, stack.width);
		},
	},
	{
		begin: 500,
		delay: 60 * 3,
		gen: (arr, stack) => {
			arrRowGen.simplemessy(arr, 0.8, stack.width);
		},
	},
	{
		begin: 550,
		delay: 60 * 2.5,
		gen: (arr, stack) => {
			arrRowGen.simplemessy(arr, 0.8, stack.width);
		},
	},
	{
		begin: 600,
		delay: 60 * 3,
		gen: (arr, stack) => {
			arrRowGen.simplemessy(arr, 0.6, stack.width);
		},
	},
	{
		begin: 650,
		delay: 60 * 2.5,
		gen: (arr, stack) => {
			arrRowGen.simplemessy(arr, 0.6, stack.width);
		},
	},
	{
		begin: 700,
		delay: 60 * 3.5,
		gen: (arr, stack) => {
			arrRowGen.simplemessy(arr, 0.4, stack.width);
		},
	},
	{
		begin: 750,
		delay: 60 * 3,
		gen: (arr, stack) => {
			arrRowGen.simplemessy(arr, 0.4, stack.width);
		},
	},
	{
		begin: 780,
		delay: 60 * 2.5,
		gen: (arr, stack) => {
			arrRowGen.simplemessy(arr, 0.4, stack.width);
		},
	},
	{
		begin: 800,
		delay: 60 * 2,
		gen: (arr, stack) => {
			arrRowGen.simplemessy(arr, 0.9, stack.width);
		},
	},
	{
		begin: 900,
		delay: 60 * 1.75,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 0, 10, 1);
		},
	},
	{
		begin: 950,
		delay: 60 * 1.5,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 0, 10, 1);
		},
	},

	{
		begin: 1000,
		delay: 60 * 5,
		gen: (arr, stack) => {
			arrRowGen.simplemessy(arr, 0.0, stack.width);
		},
	},
	{
		begin: 1020,
		delay: 60 * 4,
		gen: (arr, stack) => {
			arrRowGen.simplemessy(arr, 0.0, stack.width);
		},
	},
	{
		begin: 1050,
		delay: 60 * 4,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 1, 1, 8);
		},
	},
	{
		begin: 1100,
		delay: 60 * 3,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 2, 1, 6);
		},
	},
	{
		begin: 1150,
		delay: 60 * 3,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 3, 1, 4);
		},
	},
	{
		begin: 1200,
		delay: 60 * 2,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 4, 1, 2);
		},
	},
	{
		begin: 1210,
		delay: 60 * 1.5,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 4, 1, 2);
		},
	},
	{
		begin: 1210,
		delay: 60 * 1,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 4, 1, 2);
		},
	},
	{
		begin: 1250,
		delay: 60 * 2,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 9, 1, 1);
		},
	},
	{
		begin: 1260,
		delay: 60 * 0.5,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 9, 1, 1);
		},
	},
	{
		begin: 1300,
		delay: 60 * 3,
		gen: (arr, stack) => {
			arrRowGen.simplemessy(arr, 0.0, stack.width);
		},
	},
	{
		begin: 1350,
		delay: 60 * 3,
		gen: (arr, stack) => {
			arrRowGen.simplemessy(arr, 0.1, stack.width);
		},
	},
	{
		begin: 1400,
		delay: 60 * 4,
		gen: (arr, stack) => {
			arrRowGen.simplemessy(arr, 0.15, stack.width);
		},
	},
	{
		begin: 1450,
		delay: 60 * 4,
		gen: (arr, stack) => {
			arrRowGen.simplemessy(arr, 0.2, stack.width);
		},
	},
	{
		begin: 1480,
		delay: 60 * 5,
		gen: (arr, stack) => {
			arrRowGen.simplemessy(arr, 0.2, stack.width);
		},
	},

	{
		begin: 1500,
		delay: 60 * 1.5,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 0, 9, 2);
		},
	},
	{
		begin: 1550,
		delay: 60 * 1.4,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 0, 9, 2);
		},
	},
	{
		begin: 1600,
		delay: 60 * 1.3,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 0, 9, 2);
		},
	},
	{
		begin: 1650,
		delay: 60 * 1.2,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 0, 9, 2);
		},
	},
	{
		begin: 1700,
		delay: 60 * 1.3,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 0, 10, 1);
		},
	},
	{
		begin: 1800,
		delay: 60 * 1.2,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 0, 10, 1);
		},
	},
	{
		begin: 1850,
		delay: 60 * 1.15,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 0, 10, 1);
		},
	},
	{
		begin: 1900,
		delay: 60 * 1.1,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 0, 10, 1);
		},
	},
	{
		begin: 1950,
		delay: 60 * 1.05,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 0, 10, 1);
		},
	},

	{
		begin: 2000,
		delay: 60 * 1.0,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 0, 10, 1);
		},
	},
	{
		begin: 2050,
		delay: 60 * 0.95,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 0, 10, 1);
		},
	},
	{
		begin: 2100,
		delay: 60 * 0.9,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 0, 10, 1);
		},
	},
	{
		begin: 2150,
		delay: 60 * 0.85,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 0, 10, 1);
		},
	},
	{
		begin: 2180,
		delay: 60 * 0.8,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 0, 10, 1);
		},
	},
	{
		begin: 2190,
		delay: 60 * 1.0,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 0, 10, 1);
		},
	},
	{
		begin: 2200,
		delay: 60 * 0.8,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 0, 10, 1);
		},
	},
	{
		begin: 2300,
		delay: 60 * 0.75,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 0, 10, 1);
		},
	},
	{
		begin: 2400,
		delay: 60 * 0.7,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 0, 10, 1);
		},
	},
	{
		begin: 2450,
		delay: 60 * 0.6,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 0, 10, 1);
		},
	},
	{
		begin: 2500,
		delay: 60 * 0.5,
		gen: (arr, _) => {
			arrRowGen.simple(arr, 0, 10, 1);
		},
	},
];

export const sprintRanks = [
	{
		t: 600,
		u: "修仙去吧",
		b: "Zen",
	},
	{
		t: 540,
		u: "求进9分钟",
		b: "9 min...?",
	},
	{
		t: 480,
		u: "求进8分钟",
		b: "8 min...?",
	},
	{
		t: 420,
		u: "求进7分钟",
		b: "7 min...?",
	},
	{
		t: 360,
		u: "求进6分钟",
		b: "6 min...?",
	},
	{
		t: 300,
		u: "求进5分钟",
		b: "5 min...?",
	},
	{
		t: 240,
		u: "终于……",
		b: "Finally...",
	},
	{
		t: 210,
		u: "<small>你一定是在逗我</small>",
		b: "Too slow.",
	},
	{
		t: 180,
		u: "渣渣",
		b: "Well...",
	},
	{
		t: 160,
		u: "<small>速度速度加快</small>",
		b: "Go faster.",
	},
	{
		t: 140,
		u: "<small>还能再给力点么</small>",
		b: "Any more?",
	},
	{
		t: 120,
		u: "2分钟？",
		b: "Beat 2 min.",
	},
	{
		t: 110,
		u: "不难嘛",
		b: "So easy.",
	},
	{
		t: 100,
		u: "新世界",
		b: "New world.",
	},
	{
		t: 90,
		u: "超越秒针",
		b: "1 drop/sec!",
	},
	{
		t: 80,
		u: "恭喜入门",
		b: "Not bad.",
	},
	{
		t: 73,
		u: "渐入佳境",
		b: "Going deeper.",
	},
	{
		t: 69,
		u: "就差10秒",
		b: "10 sec faster.",
	},
	{
		t: 63,
		u: "还有几秒",
		b: "Approaching.",
	},
	{
		t: 60,
		u: "最后一点",
		b: "Almost there!",
	},
	{
		t: 56,
		u: "1分钟就够了",
		b: "1-min Sprinter!",
	},
	{
		t: 53,
		u: "并不是沙包",
		b: "<small>No longer rookie.</small>",
	},
	{
		t: 50,
		u: "50不是梦",
		b: "Beat 50.",
	},
	{
		t: 48,
		u: "每秒2块",
		b: "2 drops/sec!",
	},
	{
		t: 45,
		u: "很能打嘛",
		b: "u can tetris.",
	},
	{
		t: 42,
		u: "有点厉害",
		b: "Interesting.",
	},
	{
		t: 40,
		u: "于是呢？",
		b: "So?",
	},
	{
		t: 38,
		u: "高手",
		b: "Good.",
	},
	{
		t: 35,
		u: "停不下来",
		b: "Unstoppable.",
	},
	{
		t: 33,
		u: "触手",
		b: "Octopus",
	},
	{
		t: 31,
		u: "每秒3块",
		b: "3 drops/sec!",
	},
	{
		t: 30,
		u: "别这样",
		b: "Noooo",
	},
	{
		t: 29,
		u: "你赢了",
		b: "You win.",
	},
	{
		t: 27,
		u: "这不魔法",
		b: "Magic.",
	},
	{
		t: 25,
		u: "闪电",
		b: "Lightning!",
	},
	{
		t: 24,
		u: "每秒4块",
		b: "4 drops/sec!",
	},
	{
		t: 23,
		u: "神兽",
		b: "Alien.",
	},
	{
		t: 22,
		u: "神兽他妈",
		b: "Beats Alien.",
	},
	{
		t: 21,
		u: "拯救地球",
		b: "<small>Save the world?</small>",
	},
	{
		t: 20,
		u: "你确定？",
		b: "r u sure?",
	},
	{
		t: 19,
		u: "5块每秒",
		b: "5pps",
	},
	{
		t: 18,
		u: "……",
		b: "...",
	},
	{
		t: 16.66,
		u: "…………",
		b: "......",
	},
	{
		t: 14.28,
		u: "6块每秒",
		b: "6pps",
	},
	{
		t: 12.5,
		u: "7块每秒",
		b: "7pps",
	},
	{
		t: 11.11,
		u: "8块每秒",
		b: "8pps",
	},
	{
		t: 10.0,
		u: "9块每秒",
		b: "9pps",
	},
	{
		t: 9.0,
		u: "10块每秒",
		b: "10pps",
	},
	{
		t: 0.0,
		u: "←_←",
		b: "→_→",
	},
	{
		t: -1 / 0,
		u: "↑_↑",
		b: "↓_↓",
	},
];

export class Elements {
	/**
	 * Get html elements.
	 */
	@lazy static get msg() {
		return $("msg");
	}

	@lazy static get statsIpieces() {
		return $("ivalue");
	}

	@lazy static get stats() {
		return $("stats");
	}

	@lazy static get statsTime() {
		return $("time");
	}

	@lazy static get statsLines() {
		return $("line");
	}

	@lazy static get statsPiece() {
		return $("piece");
	}

	@lazy static get statsFinesse() {
		return $("finesse");
	}

	@lazy static get statsScore() {
		return $("score");
	}

	@lazy static get statsLevel() {
		return $("level");
	}

	@lazy static get h3() {
		return $$("h3");
	}

	@lazy static get set() {
		return $("settings");
	}

	@lazy static get leaderboard() {
		return $("leaderboard");
	}

	@lazy static get hidescroll() {
		return $("hidescroll");
	}

	@lazy static get holdCanvas() {
		return $<HTMLCanvasElement>("hold");
	}

	@lazy static get bgStackCanvas() {
		return $<HTMLCanvasElement>("bgStack");
	}

	@lazy static get stackCanvas() {
		return $<HTMLCanvasElement>("stack");
	}

	@lazy static get activeCanvas() {
		return $<HTMLCanvasElement>("active");
	}

	@lazy static get previewCanvas() {
		return $<HTMLCanvasElement>("preview");
	}

	@lazy static get spriteCanvas() {
		return $<HTMLCanvasElement>("sprite");
	}

	@lazy static get timeCanvas() {
		return $$("#time > canvas")[0] as HTMLCanvasElement;
	}

	@lazy static get holdCtx() {
		return Elements.holdCanvas.getContext("2d");
	}

	@lazy static get bgStackCtx() {
		return Elements.bgStackCanvas.getContext("2d");
	}

	@lazy static get stackCtx() {
		return Elements.stackCanvas.getContext("2d");
	}

	@lazy static get activeCtx() {
		return Elements.activeCanvas.getContext("2d");
	}

	@lazy static get previewCtx() {
		return Elements.previewCanvas.getContext("2d");
	}

	@lazy static get spriteCtx() {
		return Elements.spriteCanvas.getContext("2d");
	}

	@lazy static get timeCtx() {
		return Elements.timeCanvas.getContext("2d");
	}
}

/**
 * Gameplay specific vars.
 */
export const gravityUnit = 1.0 / 64;
