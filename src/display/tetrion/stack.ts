import { Game } from "../../game";
import { makeSprite, draw } from "../../logic/view";
import { settings } from "../../settings";
import { finesse, pieces, Mutable, Elements } from "../../utils/data";
import { GameState, GameType } from "../../utils/enums";
import { randomInt } from "../../utils/randomizer";
import { $, $setText, clear } from "../../utils/utils";
import { menu } from "../../components/center/menu/menuHooks";
import { sound } from "../sound/sound";
import { piece } from "./piece";
import { MatrixDir, shiftMatrix } from "./matrix";
import { t } from "../../utils/lang";
import {
	sendClearTetrisMessage,
	showSpinMessage,
	showTetrisMessage,
} from "./messages";
import { statisticsStack } from "./stats";
import { scoreNesRefresh, tetRateNesRefresh } from "../../random_stuff";
import { FAILED_MENU_ID } from "../../components/center/menu/main/overlays/FailedMenu";

class Stack {
	dirty: boolean;

	width;

	height;

	hiddenHeight;

	grid;

	/**
	 * Creates a matrix for the playfield.
	 */
	new(x: number, y: number, hy: number) {
		const cells = new Array(x);
		for (let i = 0; i < x; i++) {
			cells[i] = new Array(hy + y);
		}
		this.width = x;
		this.height = hy + y;
		this.hiddenHeight = hy;
		this.grid = cells;

		this.dirty = true;
	}

	addPiece(tetro) {
		shiftMatrix(MatrixDir.DOWN);
		$("a").classList.remove("greyed");
		Mutable.lineClear = 0;

		let once = false;
		Mutable.lockflashX = piece.x;
		Mutable.lockflashY = piece.y;
		Mutable.lockflashTetro = tetro;
		Mutable.lockflash = 2;
		Mutable.lockflashOn = true;

		// spin check
		/*
		if (
			!piece.moveValid(-1, 0, piece.tetro) &&
			!piece.moveValid(1, 0, piece.tetro) &&
			!piece.moveValid(0, -1, piece.tetro)
		) {
			isSpin = true;
		}
		*/

		spinCheck();

		// Add the piece to the stack.
		let range = [];
		let valid = false;
		for (let x = 0; x < tetro.length; x++) {
			for (let y = 0; y < tetro[x].length; y++) {
				if (tetro[x][y] && y + piece.y >= 0) {
					this.grid[x + piece.x][y + piece.y] =
						settings.RotSys.color[piece.index];
					// Get column for finesse
					if (!once || x + piece.x < Mutable.column) {
						Mutable.column = x + piece.x;
						once = true;
					}
					// Check which lines get modified
					if (range.indexOf(y + piece.y) === -1) {
						range.push(y + piece.y);
						// This checks if any cell is in the play field. If there
						// isn't any this is called a lock out and the game ends.
						if (y + piece.y >= this.hiddenHeight) valid = true;
					}
				}
			}
		}

		// Lock out
		if (!valid) {
			Game.state = GameState.BlockOut;
			$setText(Elements.msg, t("lock_out"));

			Game.types[Game.type].die();

			menu(FAILED_MENU_ID);
			sound.playSFX("gameover");
			sound.playvox("lose");
			return;
		}

		// Check modified lines for full lines.
		range = range.sort((a, b) => a - b);
		for (let row = range[0], len = row + range.length; row < len; row++) {
			let count = 0;
			for (let x = 0; x < this.width; x++) {
				if (this.grid[x][row]) count++;
			}
			// Clear the line. This basically just moves down the stack.
			// TODO Ponder during the day and see if there is a more elegant solution.
			if (count === this.width) {
				Mutable.lineClear++; // NOTE stats
				const rowInDig = Mutable.digLines.indexOf(row);
				if (rowInDig !== -1) {
					for (let y = 0; y < rowInDig; y++) {
						Mutable.digLines[y]++;
					}
					Mutable.digLines.splice(rowInDig, 1);
				}
				Mutable.clearRows.push(row);
				for (let y = row; y >= row; y--) {
					for (let x = 0; x < this.width; x++) {
						this.grid[x][y] = 0;
					}
				}
				/*
				for (var y = row; y >= 1; y--) {
					for (var x = 0; x < this.width; x++) {
						this.grid[x][y] = this.grid[x][y - 1];
					}
				}
				*/

				for (let x = 0; x < this.width; x++) {
					this.grid[x][0] = undefined;
				}
			}
		}
		if (Mutable.lineClear !== 0) {
			Mutable.lockflash = 0;
			Mutable.lockflashOn = false;
		}
		if (
			piece.areLimit === 0 &&
			(Game.params.entryDelay !== 1 ||
				Game.params.entryDelay !== 2 ||
				Game.params.entryDelay === undefined)
		) {
			stack.clearLines();
		}
		if (Game.type === GameType.Grades) {
			Mutable.levelCheck = Mutable.leveltgm;
		}
		let scoreAdd = BigInt(Mutable.level + 1);
		let garbage = 0;

		const pieceName = ["I", "J", "L", "O", "S", "T", "Z"][piece.index];
		if (Game.type === GameType.Retro) {
			if (Mutable.lineClear !== 0) {
				switch (Mutable.lineClear) {
					case 1:
						Mutable.scoreNes += 40 * (Mutable.level + 1);
						Mutable.nontetNes += Mutable.lineClear;
						showTetrisMessage("SINGLE");
						break;
					case 2:
						Mutable.scoreNes += 100 * (Mutable.level + 1);
						Mutable.nontetNes += Mutable.lineClear;
						showTetrisMessage("DOUBLE");
						break;
					case 3:
						Mutable.scoreNes += 300 * (Mutable.level + 1);
						Mutable.nontetNes += Mutable.lineClear;
						showTetrisMessage("TRIPLE");
						break;
					case 4:
						Mutable.scoreNes += 1200 * (Mutable.level + 1);
						Mutable.tetNes += Mutable.lineClear;
						showTetrisMessage("TETRIS");
						break;
				}
				scoreNesRefresh();
				Mutable.tetRateNes =
					Mutable.tetNes / (Mutable.tetNes + Mutable.nontetNes);
				tetRateNesRefresh();

				sound.playSFX("erase", Mutable.lineClear);
				sound.playvox("erase", Mutable.lineClear);
			}
		} else if (Mutable.lineClear !== 0) {
			//console.log("C"+Scores.combo+" B"+Mutable.b2b)

			if (Mutable.isSpin) {
				scoreAdd =
					scoreAdd *
					([800n, 1200n, 1600n, 2000n][Mutable.lineClear - 1] *
						2n ** BigInt(Mutable.b2b + Mutable.combo));

				garbage = [
					[2, 4, 6, 8],
					[3, 6, 9, 12],
				][Mutable.b2b !== 0 ? 1 : 0][Mutable.lineClear - 1];
				if (piece.index === 5) {
					if (Mutable.b2b > 0) {
						sound.playvox("b2b_tspin", Mutable.lineClear);
					} else {
						sound.playvox("tspin", Mutable.lineClear);
					}
				} else {
					sound.playvox("erase", Mutable.lineClear);
				}
				if (Mutable.b2b > 0) {
					sound.playSFX("b2b_tspin", Mutable.lineClear);
				} else {
					sound.playSFX("tspin", Mutable.lineClear);
				}
				if (Mutable.isMini) {
					Mutable.newScore +=
						[0n, 200n, 400n, 600n, 800n][Mutable.lineClear] *
						BigInt(Mutable.level + 1);
				} else if (Mutable.b2b > 0) {
					Mutable.newScore += BigInt(
						Math.floor(
							[400, 800, 1200, 1600, 3000][Mutable.lineClear] *
								(Mutable.level + 1) *
								1.5
						)
					);
				} else {
					Mutable.newScore +=
						[400n, 800n, 1200n, 1600n, 3000n][Mutable.lineClear] *
						BigInt(Mutable.level + 1);
				}

				Mutable.b2b += 1;
			} else if (Mutable.lineClear === 4) {
				scoreAdd *= 800n * 2n ** BigInt(Mutable.b2b + Mutable.combo);

				garbage = [4, 5][Mutable.b2b !== 0 ? 1 : 0];
				if (Mutable.b2b > 0) {
					Mutable.newScore += BigInt(
						Math.floor(800 * (Mutable.level + 1) * 1.5)
					);
					sound.playvox("b2b_erase", Mutable.lineClear);
					sound.playSFX("b2b_erase", Mutable.lineClear);
				} else {
					Mutable.newScore += BigInt(800 * (Mutable.level + 1));
					sound.playvox("erase", Mutable.lineClear);
					sound.playSFX("erase", Mutable.lineClear);
				}
				Mutable.b2b += 1;
			} else {
				scoreAdd *=
					[100n, 300n, 500n, 800n][Mutable.lineClear - 1] *
					2n ** BigInt(Mutable.combo);
				Mutable.newScore += BigInt(
					[100, 300, 500, 800][Mutable.lineClear - 1] *
						(Mutable.level + 1)
				);
				Mutable.b2b = 0;
				$("b2bmsg").innerHTML = "";

				garbage = [0, 1, 2, 4][Mutable.lineClear - 1];
				sound.playSFX("erase", Mutable.lineClear);
				sound.playvox("erase", Mutable.lineClear);
			}
			garbage += Math.floor(Mutable.combo / 2); //[0,0,1,1,2,2,3,3,4,4,5,5,6,6,...]
			if (Mutable.combo < 1) {
				//
			} else if (Mutable.combo < 5) {
				sound.playvox("ren1");
			} else if (Mutable.combo < 10) {
				sound.playvox("ren2");
			} else {
				sound.playvox("ren3");
			}
			if (Mutable.combo > 0) {
				if (Mutable.combo > 7 && settings.Soundbank === 6) {
					sound.playSFX("ren/ren", 7);
				} else if (Mutable.combo > 4 && settings.Soundbank === 9) {
					sound.playSFX("ren/ren", 4);
				} else if (Mutable.combo > 20) {
					sound.playSFX("ren/ren", 20);
				} else {
					sound.playSFX("ren/ren", Mutable.combo);
				}
			}

			Mutable.combo += 1;
			if (Mutable.combo > 1) {
				Mutable.newScore += BigInt(
					50 * (Mutable.combo - 1) * Mutable.level
				);
			}

			if (Game.type === GameType.Grades) {
				switch (Mutable.lineClear) {
					case 1:
						Mutable.leveltgm += 1;
						Mutable.leveltgmvisible += 1;
						break;
					case 2:
						Mutable.leveltgm += 2;
						Mutable.leveltgmvisible += 2;
						break;
					case 3:
						Mutable.leveltgm += 4;
						Mutable.leveltgmvisible += 4;
						break;
					case 4:
						Mutable.leveltgm += 6;
						Mutable.leveltgmvisible += 6;
						break;
				}
			}

			sendClearTetrisMessage(
				Mutable.isSpin,
				Mutable.isMini && Mutable.isSpin
			);

			Game.types[Game.type].onLineClear(Mutable.lineClear, piece.index, Mutable.isSpin);
		} else {
			if (Mutable.isSpin) {
				scoreAdd *= 2n ** BigInt(Mutable.b2b) * 400n;
				if (settings.Soundbank !== 0 && Mutable.lineClear === 0) {
					sound.playSFX("tspin", Mutable.lineClear);
				}

				showSpinMessage(pieceName, Mutable.isMini);

				if (!Mutable.isMini) {
					Mutable.newScore +=
						[400n, 800n, 1200n, 1600n][Mutable.lineClear] *
						BigInt(Mutable.level + 1);
				} else {
					Mutable.newScore += 100n * BigInt(Mutable.level + 1);
				}
				if (piece.index === 5) {
					sound.playvox("tspin", Mutable.lineClear);
				}
			} else {
				scoreAdd = 0n;
			}
			if (Mutable.combo > 1) {
				if (settings.Voice && settings.Voicebank === 2) {
					showTetrisMessage(t("ren", Mutable.combo - 1));
				} else {
					showTetrisMessage(t("combo", Mutable.combo - 1));
				}
			}
			if (Mutable.combo > 10) {
				sound.playSFX("bravo");
			}

			Mutable.combo = 0;
			$("renmsg").innerHTML = "";
		}
		Mutable.lines += Mutable.lineClear;
		if (Game.type !== 9) {
			Mutable.levelCheck = Mutable.level;
		}

		if (Game.type === GameType.Marathon || Game.type === GameType.Master) {
			if (Game.types[Game.type].params.levelCap === 1) {
				Mutable.level = Math.min(Math.floor(Mutable.lines / 10), 14);
			} else {
				Mutable.level = Math.floor(Mutable.lines / 10);
			}
		} else if (Game.type === 7) {
			Mutable.level = Math.floor(Mutable.lines / 30);
		} else if (Game.type === GameType.Retro) {
			const startLevel = Game.types[Game.type].params?.startingLevel ?? 0;
			const startingLines = Math.min(
				Math.max(100, startLevel * 10 - 50),
				startLevel * 10 + 10
			);
			Mutable.level = Math.floor(
				Math.max(
					(Mutable.lines + 10 - startingLines + startLevel * 10) / 10,
					startLevel
				)
			);
			makeSprite();
			stack.draw();
		}
		if (Game.type !== 9) {
			if (Mutable.levelCheck !== Mutable.level) {
				sound.playSFX("levelup");
				const levelEle = $("level");
				levelEle.classList.remove("level-flash");
				void levelEle.offsetWidth;
				levelEle.classList.add("level-flash");
			}
		}
		if (Game.type === GameType.Marathon) {
			const stackEle = $("stack");
			if (Game.params.invisibleMarathon === true && Mutable.level > 19) {
				if (Mutable.watchingReplay) {
					stackEle.classList.add("invisible-replay");
				} else {
					stackEle.classList.add("invisible");
				}
			} else {
				stackEle.classList.remove("invisible-replay");
				stackEle.classList.remove("invisible");
			}
		}

		if (Mutable.level >= 20 && Game.type === GameType.Marathon) {
			if (Mutable.playedLevelingbgmMarathon[1] === false) {
				sound.killbgm();
				sound.playbgm("marathon3");
				Mutable.playedLevelingbgmMarathon[1] = true;
			}
		} else if (Mutable.level >= 10 && Game.type === GameType.Marathon) {
			if (Mutable.playedLevelingbgmMarathon[0] === false) {
				sound.killbgm();
				sound.playbgm("marathon2");
				Mutable.playedLevelingbgmMarathon[0] = true;
			}
		}

		if (Mutable.leveltgm >= 700 && Game.type === GameType.Grades) {
			if (Mutable.playedLevelingbgmGrades[1] === false) {
				sound.killbgm();
				sound.playbgm("grade3");
				Mutable.playedLevelingbgmGrades[1] = true;
			}
		} else if (Mutable.leveltgm >= 500 && Game.type === GameType.Grades) {
			if (Mutable.playedLevelingbgmGrades[0] === false) {
				sound.killbgm();
				sound.playbgm("grade2");
				Mutable.playedLevelingbgmGrades[0] = true;
			}
		}

		Mutable.score += BigInt(scoreAdd ** (16n ** BigInt(Mutable.allclear)));
		makeSprite();
		stack.draw();
		let pc = true;
		for (let x = 0; x < this.width; x++)
			for (let y = 0; y < this.height; y++)
				if (this.grid[x][y]) pc = false;
		if (pc) {
			Mutable.score += 1000000n * 16n ** BigInt(Mutable.allclear);
			Mutable.allclear++;
			sound.playSFX("bravo");
			showTetrisMessage(t("perfect_clear"));
			garbage += 10;
		}

		const { backFire } = Game.params;
		if (backFire) {
			if (backFire === 1) {
				garbage = [0, 0, 1, 2, 4][Mutable.lineClear];
			} else if (backFire === 3) {
				garbage *= Math.floor(Mutable.lines / 2);
			}
			if (garbage !== 0) {
				if (backFire === 1) {
					const bottomRow = [];
					for (let x = 0; x < this.width; x++) {
						bottomRow.push(
							this.grid[x][this.height - 1] > 0 ? 8 : 0
						);
					}
					for (let y = 0; y < garbage; y++) {
						this.rowRise(bottomRow, piece);
					}
				} else if (backFire === 2 || backFire === 3) {
					const hole = randomInt(0, 10);
					const arrRow = [8, 8, 8, 8, 8, 8, 8, 8, 8, 8];
					arrRow[hole] = 0;
					for (let y = 0; y < garbage; y++) {
						this.rowRise(arrRow, piece);
					}
				}
			}
		}

		//if (scoreAdd.cmp(0) > 0)
		//console.log(scoreAdd.toString());

		Mutable.statsFinesse +=
			piece.finesse - finesse[piece.index][piece.pos][Mutable.column];
		Mutable.piecesSet++;
		if (Game.type === GameType.Grades) {
			if (Mutable.leveltgmvisible % 100 !== 99) {
				Mutable.leveltgm++;
				Mutable.leveltgmvisible++;
			}
			if (Game.type === GameType.Grades) {
				if (
					Math.floor((Mutable.levelCheck / 100) % 10) !==
					Math.floor((Mutable.leveltgm / 100) % 10)
				) {
					sound.playSFX("levelup");
				}
			}

			/*
			if (Scores.leveltgmvisible > 70 && Mutable.scoreTime <= 52000) {
				console.log("Cool!");
				Scores.leveltgm += 100; //work on later
			}
			if (Scores.leveltgmvisible <= 100 && Mutable.scoreTime >= 75000) {
				console.log("REGRET");
			}
			*/

			//Section COOL
			// if (Scores.leveltgmvisible)
		}
		// NOTE Mutable
		// TODO Might not need this (same for in init)
		Mutable.column = 0;

		const grid = this.grid;
		let clearPath = false;
		for (let i = 0; i < stack.width; i++) {
			for (let j = 0; j <= stack.height; j++) {
				if (j === stack.height) {
					clearPath = true;
				}
				if (grid[i][j] !== undefined && grid[i][j] !== 0) {
					break;
				}
			}
			if (clearPath) {
				break;
			}
		}
		Mutable.alarmtest = false;
		for (const test in grid) {
			if (
				(grid[test][8] !== undefined && !Mutable.alarm && !clearPath) ||
				(grid[test][11] !== undefined && Mutable.alarm)
			) {
				Mutable.alarmtest = true;
			}
		}
		if (clearPath && Mutable.alarm) {
			Mutable.alarmtest = false;
		}
		if (Mutable.alarmtest && !Mutable.alarm) {
			Mutable.alarm = true;
			Mutable.alarmtest = false;
			sound.playSFX("alarm");
			$("bgStack").classList.add("alarm");
			if (
				Game.type === GameType.Survival ||
				Game.type === 7 ||
				(Game.type === GameType.Master &&
					Game.params.delayStrictness === 2)
			) {
				console.log("eee");
				sound.raisesidebgm();
			}
		} else if (!Mutable.alarmtest && !Mutable.alarm) {
			Mutable.alarm = false;
			sound.stopSFX("alarm");
			$("bgStack").classList.remove("alarm");
			if (
				Game.type === GameType.Survival ||
				Game.type === 7 ||
				(Game.type === GameType.Master &&
					Game.params.delayStrictness === 2)
			) {
				sound.lowersidebgm();
			}
		}

		this.dirty = true;
	}

	/**
	 * Raise a garbage line.
	 * @author farter
	 */
	clearLines() {
		// console.log("clearrow")

		Mutable.clearRows.forEach((element) => {
			for (let y = element; y >= 1; y--) {
				for (let x = 0; x < stack.width; x++) {
					stack.grid[x][y] = stack.grid[x][y - 1];
				}
			}
		});
		if (Mutable.clearRows.length !== 0) {
			if (Mutable.lineARE !== 0) {
				sound.playSFX("linefall");
			}
			Mutable.clearRows = [];
			stack.draw();
		}
	}

	rowRise(arrRow, objPiece) {
		let isEmpty = true;
		for (let x = 0; x < this.width; x++) {
			for (let y = 0; y < this.height - 1; y++) {
				this.grid[x][y] = this.grid[x][y + 1];
			}
			if (arrRow[x]) isEmpty = false;
			this.grid[x][this.height - 1] = arrRow[x];
		}
		let topout = false;
		for (let y = 0; y < Mutable.digLines.length; y++) {
			Mutable.digLines[y]--;
			if (Mutable.digLines[y] < 0) {
				// top out, but only detecting added lines
				topout = true;
			}
		}
		if (topout) {
			Game.state = GameState.BlockOut;
			$setText(Elements.msg, "TOP OUT!");
			menu(FAILED_MENU_ID);
			Game.types[Game.type].die();
			sound.playSFX("gameover");
			sound.playvox("lose");
		}
		if (!isEmpty) {
			Mutable.digLines.push(this.height - 1);
		}
		if (!piece.dead) {
			if (!piece.moveValid(0, 0, piece.tetro)) {
				piece.y -= 1;
				if (
					piece.y + pieces[piece.index].rect[3] <=
					this.hiddenHeight - 2
				) {
					// the bottom is >=2 cell away from visible part
					Game.state = GameState.BlockOut;
					$setText(Elements.msg, "OOPS!");
					menu(FAILED_MENU_ID);
					Game.types[Game.type].die();

					sound.playSFX("gameover");
					sound.playvox("lose");
				}
			}
			piece.dirty = true;
		}
		this.dirty = true;
	}

	/**
	 * Draws the stack.
	 * TODO: remove this, switch to only webgl
	 * @deprecated
	 */
	draw() {
		clear(Elements.stackCtx);
		if (
			settings.Outline === 0 ||
			settings.Outline === 1 ||
			(settings.Outline === 2 &&
				(Game.state === GameState.Loss || Game.state === GameState.Win))
		) {
			draw(
				this.grid,
				0,
				-this.hiddenHeight,
				Elements.stackCtx,
				undefined,
				0.3
			);
		}

		// Darken Stack
		// TODO wrap this with an option.
		// no fullscreen flush, see above
		//stackCtx.globalCompositeOperation = 'source-atop';
		//stackCtx.fillStyle = 'rgba(0,0,0,0.3)';
		//stackCtx.fillRect(0, 0, stackCanvas.width, stackCanvas.height);
		//stackCtx.globalCompositeOperation = 'source-over';

		if (settings.Outline === 1 || settings.Outline === 3) {
			const b = Math.floor(Mutable.cellSize / 8);
			const c = Mutable.cellSize;
			const hhc = this.hiddenHeight * c;
			const pi = Math.PI;
			const lineCanvas = document.createElement("canvas");
			lineCanvas.width = Elements.stackCanvas.width;
			lineCanvas.height = Elements.stackCanvas.height;

			const lineCtx = lineCanvas.getContext("2d");
			lineCtx.fillStyle = "rgba(255,255,255,.5)";
			lineCtx.beginPath();
			for (let x = 0, len = this.width; x < len; x++) {
				for (let y = 0, wid = this.height; y < wid; y++) {
					if (this.grid[x][y]) {
						if (x < this.width - 1 && !this.grid[x + 1][y]) {
							lineCtx.fillRect(x * c + c - b, y * c - hhc, b, c);
						}
						if (x > 0 && !this.grid[x - 1][y]) {
							lineCtx.fillRect(x * c, y * c - hhc, b, c);
						}
						if (y < this.height - 1 && !this.grid[x][y + 1]) {
							lineCtx.fillRect(x * c, y * c - hhc + c - b, c, b);
						}
						if (!this.grid[x][y - 1]) {
							lineCtx.fillRect(x * c, y * c - hhc, c, b);
						}
						// Diags
						if (x < this.width - 1 && y < this.height - 1) {
							if (!this.grid[x + 1][y] && !this.grid[x][y + 1]) {
								lineCtx.clearRect(
									x * c + c - b,
									y * c - hhc + c - b,
									b,
									b
								);
								lineCtx.fillRect(
									x * c + c - b,
									y * c - hhc + c - b,
									b,
									b
								);
							} else if (
								!this.grid[x + 1][y + 1] &&
								this.grid[x + 1][y] &&
								this.grid[x][y + 1]
							) {
								lineCtx.moveTo(x * c + c, y * c - hhc + c - b);
								lineCtx.lineTo(x * c + c, y * c - hhc + c);
								lineCtx.lineTo(x * c + c - b, y * c - hhc + c);
								lineCtx.arc(
									x * c + c,
									y * c - hhc + c,
									b,
									(3 * pi) / 2,
									pi,
									true
								);
							}
						}
						if (x < this.width - 1 && y > -this.hiddenHeight) {
							if (!this.grid[x + 1][y] && !this.grid[x][y - 1]) {
								lineCtx.clearRect(
									x * c + c - b,
									y * c - hhc,
									b,
									b
								);
								lineCtx.fillRect(
									x * c + c - b,
									y * c - hhc,
									b,
									b
								);
							} else if (
								!this.grid[x + 1][y - 1] &&
								this.grid[x + 1][y] &&
								this.grid[x][y - 1]
							) {
								lineCtx.moveTo(x * c + c - b, y * c - hhc);
								lineCtx.lineTo(x * c + c, y * c - hhc);
								lineCtx.lineTo(x * c + c, y * c - hhc + b);
								lineCtx.arc(
									x * c + c,
									y * c - hhc,
									b,
									pi / 2,
									pi,
									false
								);
							}
						}
						if (x > 0 && y < this.height - 1) {
							if (!this.grid[x - 1][y] && !this.grid[x][y + 1]) {
								lineCtx.clearRect(
									x * c,
									y * c - hhc + c - b,
									b,
									b
								);
								lineCtx.fillRect(
									x * c,
									y * c - hhc + c - b,
									b,
									b
								);
							} else if (
								!this.grid[x - 1][y + 1] &&
								this.grid[x - 1][y] &&
								this.grid[x][y + 1]
							) {
								lineCtx.moveTo(x * c, y * c - hhc + c - b);
								lineCtx.lineTo(x * c, y * c - hhc + c);
								lineCtx.lineTo(x * c + b, y * c - hhc + c);
								lineCtx.arc(
									x * c,
									y * c - hhc + c,
									b,
									pi * 2,
									(3 * pi) / 2,
									true
								);
							}
						}
						if (x > 0 && y > -this.hiddenHeight) {
							if (!this.grid[x - 1][y] && !this.grid[x][y - 1]) {
								lineCtx.clearRect(x * c, y * c - hhc, b, b);
								lineCtx.fillRect(x * c, y * c - hhc, b, b);
							} else if (
								!this.grid[x - 1][y - 1] &&
								this.grid[x - 1][y] &&
								this.grid[x][y - 1]
							) {
								lineCtx.moveTo(x * c + b, y * c - hhc);
								lineCtx.lineTo(x * c, y * c - hhc);
								lineCtx.lineTo(x * c, y * c - hhc + b);
								lineCtx.arc(
									x * c,
									y * c - hhc,
									b,
									pi / 2,
									pi * 2,
									true
								);
							}
						}
					}
				}
			}
			lineCtx.fill();
			Elements.stackCtx.globalCompositeOperation = "source-over";
			Elements.stackCtx.drawImage(lineCanvas, 0, 0);
			Elements.stackCtx.fillStyle = "#ffffff";
		}

		statisticsStack();

		this.dirty = false;
	}
}

/**
 * Adds tetro to the stack, and clears lines if they fill up.
 */
export function testSpace(x, y) {
	if (stack.grid[x] !== undefined && y < 24) {
		return stack.grid[x][y] !== undefined;
	}
	return true;
}

export function spinCheck() {
	Mutable.isSpin = false;
	Mutable.isMini = false;
	if (piece.index !== 0 && piece.index !== 3) {
		let spinCheckCount = 0;
		for (let i = 0; i < pieces[piece.index].spin.highX[0].length; i++) {
			if (
				testSpace(
					piece.x + pieces[piece.index].spin.highX[piece.pos][i],
					piece.y + pieces[piece.index].spin.highY[piece.pos][i]
				)
			) {
				spinCheckCount++;
			}
		}
		if (spinCheckCount < 2) {
			Mutable.isMini = true;
		}
		for (let i = 0; i < pieces[piece.index].spin.lowX[0].length; i++) {
			if (
				testSpace(
					piece.x + pieces[piece.index].spin.lowX[piece.pos][i],
					piece.y + pieces[piece.index].spin.lowY[piece.pos][i]
				)
			) {
				spinCheckCount++;
			}
		}
		if (
			spinCheckCount >= 3 &&
			Mutable.spinX === piece.x &&
			Mutable.spinY === piece.y &&
			!Mutable.rotationFailed
		) {
			Mutable.isSpin = true;
		}
	} else if (piece.index === 0) {
		let spinCheckCount = 0;
		for (let i = 0; i < 2; i++) {
			if (
				testSpace(
					piece.x + pieces[piece.index].spin.highX[piece.pos][i],
					piece.y + pieces[piece.index].spin.highY[piece.pos][i]
				) ||
				testSpace(
					piece.x + pieces[piece.index].spin.highX[piece.pos][i + 2],
					piece.y + pieces[piece.index].spin.highY[piece.pos][i + 2]
				)
			) {
				spinCheckCount++;
			}
		}
		if (spinCheckCount < 2) {
			Mutable.isMini = true;
		}
		for (let i = 0; i < 2; i++) {
			if (
				testSpace(
					piece.x + pieces[piece.index].spin.lowX[piece.pos][i],
					piece.y + pieces[piece.index].spin.lowY[piece.pos][i]
				) ||
				testSpace(
					piece.x + pieces[piece.index].spin.lowX[piece.pos][i + 2],
					piece.y + pieces[piece.index].spin.lowY[piece.pos][i + 2]
				)
			) {
				spinCheckCount++;
			}
		}
		if (
			spinCheckCount >= 3 &&
			Mutable.spinX === piece.x &&
			Mutable.spinY === piece.y &&
			!Mutable.rotationFailed
		) {
			Mutable.isSpin = true;
		}
	}
}

export const stack = new Stack();
