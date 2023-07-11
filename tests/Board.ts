import { createRandomizer, guideline, Randomizer } from "../src/utils/blackjack";

class Scorer {
	score = 0;

	b2b = 0;

	lines = 0;

	combo = 0;

	constructor(func) {
		1+2;
	}
}

interface BoardOptions {
	boardWidth: number;

	boardHeight: number;

	hiddenRows: number;

	/**
	 * the number of held pieces allowed
	 */
	holdPieces: number;

	/**
	 * the number of preview pieces allowed
	 */
	previewPieces: number;

	// randomizer
	randomizer: string;

	// piece sets
	pieces: PieceSet;

	// rotation systems
	rotSys: RotationSystem;

	// scoring
	scorer: Scorer;
}

const TETROMINO_PIECESET: PieceSet = new PieceSet(4,4);
TETROMINO_PIECESET.add("I", [])
TETROMINO_PIECESET.add("J", [])
TETROMINO_PIECESET.add("L", [])
TETROMINO_PIECESET.add("O", [])
TETROMINO_PIECESET.add("S", [])
TETROMINO_PIECESET.add("T", [])
TETROMINO_PIECESET.add("Z", [])

const TETROMINO_ROTSYS: RotationSystem = new RotationSystem(TETROMINO_PIECESET);

const TETROMINO_SCORER: Scorer = new Scorer((lines, spin, scorer) => {
	let score = 100;
	if (spin) score *= 2;
	score *= lines;
	score *= scorer.b2b * 0.2 + 1;

	return score;
});

const TETROMINO_OPTIONS: BoardOptions = {
	boardWidth: 10,
	boardHeight: 20,
	hiddenRows: 0,
	holdPieces: 1,
	previewPieces: 7,
	randomizer: "bag of I,J,L,O,S,T,Z",
	pieces: TETROMINO_PIECESET,
	rotSys: TETROMINO_ROTSYS,
	scorer: TETROMINO_SCORER
};




class Board {
	//// dawta

	level = 0;

	levelCap = 0;

	// timing
	timeStarted = 0;

	timeElapsed = 0;

	private boardOptions: BoardOptions;

	private randomizer: Randomizer;

	// analysis
	private analyzer: Analyzer;

	constructor(options: BoardOptions) {
		this.boardOptions = options;
		this.randomizer = createRandomizer(this.boardOptions.randomizer);
	}
}
