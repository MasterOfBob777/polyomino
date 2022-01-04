export enum GameType {
	Sprint = 0,
	Marathon = 1,
	Survival = 3,
	Dig = 4,
	ScoreAttack = 5,
	Master = 6,
	Unknown = 7,
	Retro = 8,
	Grades = 9,
}

export enum Mino {
	I,
	J,
	L,
	O,
	S,
	T,
	Z,
}

export enum GameState {
	Normal = 0,
	Win = 1,
	Countdown = 2,
	NotPlayed = 3,
	Paused = 4, // maybe?
	Loss = 5,
	BlockOut = 9,
}

export enum Gravity {
	"Auto" = 0,
	"0G" = 1,
	"1/64G" = 2,
	"1/32G" = 3,
	"1/16G" = 4,
	"1/8G" = 5,
	"1/4G" = 6,
	"1/2G" = 7,
	"1G" = 8,
	"20G" = 9,
}

export enum SoftDrop {
	"Auto" = 0,
	"0G" = 1,
	"1/64G" = 2,
	"1/32G" = 3,
	"1/16G" = 4,
	"1/8G" = 5,
	"1/4G" = 6,
	"1/2G" = 7,
	"1G" = 8,
	"20G" = 9,
}

export enum RotSys {
	"Super" = 0,
	"C2" = 1,
	"Arika" = 2,
	"DTET" = 3,
	"QQ" = 4,
	"Atari" = 5,
	"Tengen" = 6,
	"N-Blox" = 7,
	"Nintendo" = 8,
	"MS" = 9,
	"E-60" = 10,
	"IBM PC" = 11,
	"JJ" = 12,
	"5k" = 13,
	"Plus" = 14,
	"DX" = 15,
}

export enum Size {
	Full = 0,
	Small = 1,
	Medium = 2,
	Large = 3,
	"Extra Large" = 4,
}

export enum Soundbank {
	PPT = 0,
	TGM3 = 1,
	NullPM = 2,
	Yotipo = 3,
	TOJ = 4,
	Retro = 5,
	Friends = 6,
	T99 = 7,
	".com" = 8,
	Party = 9,
	Ultimate = 10,
	Ace = 11,
	"Tetr.js" = 12,
}

export enum Block {
	"Bevelled" = 0,
	"Flat" = 1,
	"Glossy" = 2,
	"Arika" = 3,
	"Aqua" = 4,
	"Arcade" = 5,
	"N-Blox" = 6,
	"Bone" = 7,
	"Retro" = 8,
	"Friends" = 9,
	"T99" = 10,
	".com" = 11,
	"PPT" = 12,
}

export enum NextType {
	"TGM3" = 0,
	"NullPM" = 1,
	"TGM1" = 2,
	"Tetr.js" = 3,
}

export enum Voicebank {
	"Alexey",
	"Friends",
	"TOJ",
}

export enum Ghost {
	"Grey" = 0,
	"Colored" = 1,
	"Off" = 2,
	"Hidden" = 3,
}

export enum Outline {
	"Off",
	"On",
	"Hidden",
	"Only",
}

export enum IRSMode {
	Off = 0,
	Tap = 1,
	Hold = 2,
	Additive = 3,
}

export enum IHSMode {
	Off = 0,
	Tap = 1,
	Hold = 2,
}