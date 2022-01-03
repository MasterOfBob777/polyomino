export interface GG4S3Tm5 {
	_id: string;
	shortid: string;
	user: User;
	endcontext: Endcontext;
	ts: string;
	gametype: string;
	verified: boolean;
	data: GG4S3Tm5Data;
}

export interface GG4S3Tm5Data {
	frames: number;
	events: Event[];
}

export interface BaseEvent {
	frame: number;
	type: string;
	data: any;
}

export interface StartEvent extends BaseEvent {
	type: "start";
	data: any;
}

export interface FullEvent extends BaseEvent {
	type: "full";
	data: {
		successful?: boolean;
		gameoverreason?: null;
		replay?: Assumptions;
		source?: Assumptions;
		options?: Options;
		stats?: Endcontext;
		targets?: any[];
		fire?: number;
		game?: DataGame;
		killer?: Killer;
		assumptions?: Assumptions;
		aggregatestats?: Aggregatestats;
		key?: Key;
		hoisted?: boolean;
		subframe?: number;
	};
}

enum ClearReasons {
	"clear",
}

type Assumptions = any;

export interface EndEvent extends BaseEvent {
	type: "end";
	data: {
		reason: string;
		export: {
			successful: boolean;
			gameoverreason: ClearReasons;
			replay: Assumptions;
			source: Assumptions;
			options: Options;
			stats: Endcontext;
			targets: any[];
			fire: number;
			game: ExportGame;
			killer: Killer;
			assumptions: Assumptions;
			aggregatestats: Aggregatestats;
		};
	};
}

export interface KeydownEvent extends BaseEvent {
	type: "keydown";
	data: {
		key: Key;
		hoisted?: boolean;
		subframe: number;
	};
}

export type Event = KeydownEvent | EndEvent | FullEvent | StartEvent;

export interface Aggregatestats {
	apm: number;
	pps: number;
	vsscore: number;
}

type Mino = "i" | "o" | "t" | "s" | "z" | "j" | "l" | null;

export type Board = Mino[][];

export interface ExportGame {
	board: Board;
	bag: string[];
	hold: Hold;
	g: number;
	controlling: Controlling;
	handling: Handling;
	playing: boolean;
}

export interface Controlling {
	ldas: number;
	ldasiter: number;
	lshift: boolean;
	rdas: number;
	rdasiter: number;
	rshift: boolean;
	lastshift: number;
	softdrop: boolean;
}

export interface Handling {
	arr: number;
	das: number;
	dcd: number;
	sdf: number;
	safelock: boolean;
	cancel: boolean;
}

export interface Hold {
	piece: Mino;
	locked: boolean;
}

export interface Killer {
	name: null;
	type: string;
}

export interface Options {
	version: number;
	seed_random: boolean;
	anchorseed: boolean;
	seed: number;
	allow180: boolean;
	g: number;
	objective: Objective;
	handling: Handling;
	countdown: boolean;
	countdown_interval: number;
	precountdown: number;
	prestart: number;
	mission: string;
	zoominto: string;
	bgmnoreset: boolean;
	slot_counter1: string;
	slot_counter2: string;
	slot_counter3: string;
	slot_counter4: string;
	slot_counter5: string;
	slot_bar2: string;
	can_retry: boolean;
	pro: boolean;
	stride: boolean;
	no_szo: boolean;
	garbagespeed: number;
	garbagecap: number;
	kickset: string;
	boardwidth: number;
	boardheight: number;
	boardbuffer: number;
	physical: boolean;
	nextcount: number;
	minoskin: Minoskin;
	ghostskin: string;
	boardskin: string;
}

export interface Minoskin {
	z: string;
	l: string;
	o: string;
	s: string;
	i: string;
	j: string;
	t: string;
	other: string;
}

export interface Objective {
	type: string;
	count: number;
}

export interface Endcontext {
	seed: number;
	lines: number;
	level_lines: number;
	level_lines_needed: number;
	inputs: number;
	holds: number;
	time: Time;
	score: number;
	zenlevel: number;
	zenprogress: number;
	level: number;
	combo: number;
	currentcombopower: number;
	topcombo: number;
	btb: number;
	topbtb: number;
	tspins: number;
	piecesplaced: number;
	clears: { [key: string]: number };
	garbage: Garbage;
	kills: number;
	finesse: Finesse;
	finalTime?: number;
	gametype?: string;
}

export interface Finesse {
	combo: number;
	faults: number;
	perfectpieces: number;
}

export interface Garbage {
	sent: number;
	received: number;
	attack: number;
	cleared: number;
}

export interface Time {
	start: number;
	zero: boolean;
	locked: boolean;
	prev: number;
	frameoffset: number;
}

export interface DataGame {
	board: Array<null[]>;
	bag: string[];
	hold: Hold;
	g: number;
	controlling: Controlling;
	handling: Handling;
	playing: boolean;
}

export enum Key {
	HardDrop = "hardDrop",
	Hold = "hold",
	MoveLeft = "moveLeft",
	MoveRight = "moveRight",
	Rotate180 = "rotate180",
	RotateCCW = "rotateCCW",
	RotateCW = "rotateCW",
}

export interface User {
	_id: string;
	username: string;
}
