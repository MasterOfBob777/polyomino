const strs = {
	ready: {
		en: "READY",
		es: "LISTOS",
		fr: "PRÊT?",
	},
	start: {
		en: "GO!",
		es: "¡YA!",
		fr: "C'EST PARTI!",
	},
	combo: {
		en: "<b>%d</b> COMBO!",
	},
	ren: {
		en: "<b>%d</b> REN!",
	},
	b2b: {
		en: "<b>BACK-TO</b>-BACK %s",
	},
	b2b_streak: {
		en: "%d <b>STREAK!</b>",
	},
	streak: {
		en: "<b>%d</b> STREAK",
	},
	spin: {
		en: "%s-<b>SPIN</b>",
	},
	mini: {
		en: " %s-<b>SPIN</b> MINI",
	},
	line: {
		en: "$line%d",
	},
	line1: {
		en: "SINGLE",
	},
	line2: {
		en: "DOUBLE",
	},
	line3: {
		en: "TRIPLE",
	},
	line4: {
		en: "QUAD",
	},
	line5: {
		en: "QUINT",
	},
	line6: {
		en: "SEXT",
	},
	line7: {
		en: "SEPT",
	},
	line8: {
		en: "OCT",
	},
	line9: {
		en: "NON",
	},
	line10: {
		en: "DECI",
	},
	line11: {
		en: "UNDECI",
	},
	line12: {
		en: "DODECI",
	},
	line13: {
		en: "TREEDECI",
	},
	line14: {
		en: "QUADREDECI",
	},
	line15: {
		en: "QUINTDECI",
	},
	line16: {
		en: "SEXDECI",
	},
	line17: {
		en: "SEPTDECI",
	},
	line18: {
		en: "OCTDECI",
	},
	line19: {
		en: "NONDECI",
	},
	line20: {
		en: "VIGESI",
	},
	line21: {
		en: "UNVIGESI",
	},
	lock_out: {
		en: "LOCK OUT!",
	},
	perfect_clear: {
		en: "<b>PERFECT</b> CLEAR!",
	},
	level: {
		en: "<b>LEVEL</b> %d",
	},
	level_m: {
		en: "<b>LEVEL</b> M%d",
	},
	"setting-Size-title": {
		en: "Game Size",
	},
	"setting-Size-desc": {
		en: "The size the game takes in the browser window",
	},
	"setting-Next-title": {
		en: "Next Queue Count",
	},
	"setting-Next-desc": {
		en: "Changes the length in pieces of the next queue",
	},
	"setting-NextSide-title": {
		en: "Next Queue Side",
	},
	"setting-NextSide-desc": {
		en: "Changes the side of the next queue",
	},
	"setting-Block-title": {
		en: "Block Skin",
	},
	"setting-Block-desc": {
		en: "The desired block skin",
	},
	"setting-Monochrome-title": {
		en: "Monochrome",
	},
	"setting-Monochrome-desc": {
		en: "Use only white for block skins",
	},
	"setting-Outline-title": {
		en: "Outline",
	},
	"setting-Outline-desc": {
		en: "Options for an outline around the pieces. 'Hidden' hides the stack.",
	},
	"setting-Ghost-title": {
		en: "Ghost",
	},
	"setting-Ghost-desc": {
		en: "Options for the ghost piece. 'Hidden' hides the active piece.",
	},
	"setting-Grid-title": {
		en: "Grid",
	},
	"setting-Grid-desc": {
		en: "Displays the background grid.",
	},
	"setting-Messages-title": {
		en: "Action Text",
	},
	"setting-Messages-desc": {
		en: 'Displays flying text for things like "SINGLE", "DOUBLE", etc. Also shows the combo and back-to-back streak counter.',
	},
	"setting-MatrixSway-title": {
		en: "Matrix Sway",
	},
	"setting-MatrixSway-desc": {
		en: "When enabled, the playfield will react to the force of the pieces and move slightly.",
	},
	"setting-InitialVis-title": {
		en: "Visual Initial Systems",
	},
	"setting-InitialVis-desc": {
		en: "When enabled, the initials systems will show during gameplay",
	},
	"setting-Sound-title": { en: "Enable Sound" },
	"setting-Sound-desc": {
		en: "Completely enable or disable the sound system",
	},
	"setting-Volume-title": { en: "Sound Volume" },
	"setting-Volume-desc": { en: "" },
	"setting-MusicVol-title": { en: "Music Volume" },
	"setting-MusicVol-desc": { en: "" },
	"setting-Soundbank-title": { en: "Soundbank" },
	"setting-Soundbank-desc": { en: "Modifies the audio bank of the game" },
	"setting-NextSound-title": { en: "Next Queue Audio Indicator" },
	"setting-NextSound-desc": {
		en: "Plays a sound for a specific piece when it arrives in the next queue",
	},
	"setting-NextType-title": { en: "Next Queue Soundbank" },
	"setting-NextType-desc": {
		en: "Modifies the audio bank of the next queue audio indicators",
	},
	"setting-Voice-title": { en: "Voice" },
	"setting-Voice-desc": { en: "Enable the announcer" },
	"setting-Voicebank-title": { en: "Voicebank" },
	"setting-Voicebank-desc": { en: "Modifies the soundbank of the announcer" },
	"setting-ARR-title": { en: "Autoshift Delay" },
	"setting-ARR-desc": {
		en: "How long it takes before the autoshift kicks in; default 10 frames",
	},
	"setting-DAS-title": { en: "Autoshift Rate" },
	"setting-DAS-desc": { en: "How fast the autoshift goes; default 2 frames" },
	"setting-Gravity-title": { en: "Gravity" },
	"setting-Gravity-desc": {
		en: "Override the speed at which pieces fall; default 'Auto'",
	},
	"setting-SoftDrop-title": { en: "Soft Drop Speed" },
	"setting-SoftDrop-desc": {
		en: "Speed at which the piece soft drops; default 1G",
	},
	"setting-LockDelay-title": { en: "Lock Delay" },
	"setting-LockDelay-desc": {
		en: "The amount of time a piece can stay landed before it locks to the stack; default 30 frames",
	},
	"setting-IRSMode-title": { en: "Initial Rotation" },
	"setting-IRSMode-desc": {
		en: "Allow the rotation of a piece before it appears",
	},
	"setting-IHSMode-title": { en: "Initial Hold" },
	"setting-IHSMode-desc": {
		en: "Allow the holding of a piece before it appears",
	},
	"setting-RotSys-title": { en: "Rotation System" },
	"setting-RotSys-desc": {
		en: "The desired rotation system; default 'Super'",
	},
	"setting-DigCheckered-title": { en: "Checkered" },
	"setting-DigCheckered-desc": {
		en: "Dig through a checkered stack instead of a diagonal one",
	},
	"setting-GradesGameRule-title": { en: "Game Rule" },
	"setting-GradesGameRule-desc": { en: "Determines the tuning of the game" },
	"setting-MarathonGoal-title": { en: "Goal" },
	"setting-MarathonGoal-desc": { en: "Lines to reach before winning" },
	"setting-MarathonLevelCap-title": { en: "Level Cap" },
	"setting-MarathonLevelCap-desc": {
		en: "When on, set the maximum level to 15. When off, level will continously rise with the lock delay shortening after 20G.",
	},
	"setting-MarathonEntryDelay-title": { en: "Entry Delay" },
	"setting-MarathonEntryDelay-desc": {
		en: "Determines how long the game pauses between pieces",
	},
	"setting-MarathonNoGravity-title": { en: "0G Mode" },
	"setting-MarathonNoGravity-desc": {
		en: "Disable gravity for a more relaxed game",
	},
	"setting-MarathonInvisible-title": { en: "Invisible Bonus" },
	"setting-MarathonInvisible-desc": {
		en: "Make the stack become invisible at level 21",
	},
	"setting-SurvivalZenMode-title": { en: "Zen Mode" },
	"setting-SurvivalZenMode-desc": {
		en: "Garbage will appear by piece instead of by time",
	},
	"setting-SurvivalStartingLevel-title": { en: "Starting Level" },
	"setting-SurvivalStartingLevel-desc": {
		en: "Determines how far ahead you'll start in the challenge (not compatible with zen, currently)",
	},
	"setting-SprintLimit-title": { en: "Goal" },
	"setting-SprintLimit-desc": { en: "Total lines to clear" },
	"setting-SprintPieceSet-title": { en: "Piece Set" },
	"setting-SprintPieceSet-desc": {
		en: "The types of pieces used during the game",
	},
	"setting-SprintBackfire-title": { en: "Backfire" },
	"setting-SprintBackfire-desc": { en: "Have lines sent back to you" },
	"setting-RetroGameType-title": { en: "Game Type" },
	"setting-RetroGameType-desc": {
		en: "A-Type: Play Forever \nB-Type: Reach 25 Lines",
	},
	"setting-RetroStartingLevel-title": { en: "Starting Level" },
	"setting-RetroStartingLevel-desc": { en: "Choose a level to start" },
	"setting-RetroSkin-title": { en: "Retro Skin" },
	"setting-RetroSkin-desc": { en: "Enable the colour-changing retro skin" },
	"setting-RetroHardDrop-title": { en: "Hard Drop" },
	"setting-RetroHardDrop-desc": { en: "Allow the use of hard drop" },
	"setting-RetroFlashing-title": { en: "Flashing Effect" },
	"setting-RetroFlashing-desc": {
		en: "Show a screen flash upon clearing a Quad",
	},
	"setting-MasterLock-title": { en: "Lockdown Mode" },
	"setting-MasterLock-desc": {
		en: "Determines how the lockdown will function.\n\nForgiving: Lock delay will reset upon all manipulations\n\nLimited: Lock delay will reset for a limited amount of manipulations\n\nStrict: Lock delay will reset only when a piece has fallen",
	},
	"menu-back": { en: "Back" },
	"menu-start": { en: "Start" },
	"menu-done": { en: "Done" },
	"menu-retry": { en: "Retry" },
	"menu-replay": { en: "Replay" },
	"menu-settings": { en: "Settings" },
	"menu-controls": { en: "Controls" },
	"game-sprint": { en: "Sprint" },
	"game-survival": { en: "Survival" },
	"game-marathon": { en: "Marathon" },
	"game-retro": { en: "Retro" },
	"game-master": { en: "Master" },
	"game-dig": { en: "Dig" },
	"game-grades": { en: "Grades (WIP)" },
} as const;

const lang = navigator.language.substring(0, 2);

type Specifiers = {
	s: string;
	d: number;
	b: boolean;
	D: Date;
};

type Spec = keyof Specifiers;

type Values<T extends string> = T extends `${infer _}%${infer K}${infer Rest}`
	? K extends Spec
		? [Specifiers[K], ...Values<Rest>]
		: Values<`${K}${Rest}`>
	: [];

type STRS = typeof strs;

const reg = /%(s|d|b|D)/g;
export function t<T extends keyof STRS>(
	str: T,
	...replacements: Values<STRS[T]["en"]>
): string {
	let final: string = strs[str][lang] ?? strs[str].en;
	if (str && replacements.length > 0) {
		let i = 0;
		final = final.replace(reg, () => replacements[i++] as string);
		if (final[0] == "$") {
			const sliced = final.substring(1);
			final = strs[sliced][lang];
		}
	}
	return final;
}
