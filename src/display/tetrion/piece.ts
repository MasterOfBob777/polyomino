import { FAILED_MENU_ID } from "../../components/center/menu/main/overlays/FailedMenu";
import { menu } from "../../components/center/menu/menuHooks";
import { Game } from "../../game";
import { hold } from "../../logic/hold";
import { draw, drawCell } from "../../logic/view";
import { scoreNesRefresh } from "../../random_stuff";
import { settings } from "../../settings";
import {
	Elements,
	flags,
	gravityUnit,
	miscTableTGM,
	Mutable,
	PieceData,
	pieces,
	speedTableTGM,
	Tetro,
	WKTableCultris,
	WKTableDRS,
	WKTableDX,
	WKTableSRS
} from "../../utils/data";
import { GameState, GameType, Ghost } from "../../utils/enums";
import { getFlag } from "../../utils/keys";
import { mod } from "../../utils/math";
import { $, $setText, clear } from "../../utils/utils";
import { sound } from "../sound/sound";
import { MatrixDir, shiftMatrix } from "./matrix";
import { preview } from "./preview";
import { spinCheck, stack } from "./stack";

class Piece {
	x: number;

	y: number;

	pos: number;

	tetro: Tetro[number];

	index: number;

	gravity: any;

	lockDelay: number;

	lockDelayLimit: number;

	are: number;

	areLimit: number;

	irsDir: number;

	ihs: boolean;

	shiftDelay: number;

	shiftDir: number;

	shiftReleased: boolean;

	arrDelay: number;

	held: boolean;

	finesse: number;

	dirty: boolean;

	dead: boolean;

	rotateLimit: number;

	moveLimit: number;

	delayCounting: boolean;

	classicRuleDelayLast: number;

	constructor() {
		this.x;
		this.y;
		this.pos = 0;
		this.tetro;
		this.index;
		this.gravity = gravityUnit;
		this.lockDelay = 0;
		this.lockDelayLimit = 30;
		this.are = 0;
		this.areLimit = 0;
		this.irsDir = 0;
		this.ihs = false;
		this.shiftDelay = 0;
		this.shiftDir = 0;
		this.shiftReleased = false;
		this.arrDelay = 0;
		this.held = false;
		this.finesse = 0;
		this.dirty = false;
		this.dead = true;
		this.rotateLimit = 0;
		this.moveLimit = 0;
		this.delayCounting = false;
	}

	/**
	 * Removes last active piece, and gets the next active piece from the grab bag.
	 */
	new(index) {
		// TODO if no arguments, get next grabbag piece
		//console.log("new irs"+this.irsDir+", ihs"+this.ihs);
		$("irs-indicator").classList.add("gone");
		$("ihs-indicator").classList.add("gone");

		const rot = settings.RotSys.initinfo[index];
		this.pos = rot[2];
		this.x = Math.floor((stack.width - 4) / 2) + rot[0];
		if (Game.type === GameType.Retro || Game.type === GameType.Grades) {
			this.y = stack.hiddenHeight - 1 + rot[1];
		} else {
			this.y = stack.hiddenHeight + rot[1];
		}
		this.rotateLimit = 0;
		this.moveLimit = 0;
		this.delayCounting = false;
		this.index = index;
		this.tetro = [];
		this.held = false;
		$("a").classList.remove("greyed");
		this.ihs = false;
		this.finesse = 0;
		this.dirty = true;
		this.dead = false;
		this.lockDelay = 0;
		this.classicRuleDelayLast = 0;

		if (settings.NextSound) {
			sound.playSFX("piece" + preview.grabBag[0]);
		}
		const lineVector = $<HTMLImageElement>("linevector");
		const ivector = $("ivalue");
		if (index === 0 && Game.type === GameType.Retro) {
			Mutable.lineDrought = 0;
			Mutable.lineAmount++;
			ivector.style.color = "#ffffff";
			lineVector.classList.remove("drought-flash");
			lineVector.src = "./assets/linevector.svg";
			$setText(Elements.statsIpieces, Mutable.lineAmount);
		} else {
			Mutable.lineDrought++;
			if (Mutable.lineDrought >= 13) {
				if (Game.type === GameType.Retro) {
					sound.raisesidebgm();
				}

				ivector.style.color = "#ff0000";
				lineVector.classList.add("drought-flash");
				lineVector.src = "./assets/linevectorred.svg";
				if (Mutable.lineDrought < 25) {
					// sound.playse("drought")
				} else {
					// sound.playse("droughtintense")
				}
				$setText(Elements.statsIpieces, Mutable.lineDrought);
			} else if (Game.type === GameType.Retro) {
				sound.lowersidebgm();
			}
		}
		// TODO Do this better. Make clone object func maybe.
		//for property in pieces, this.prop = piece.prop
		if (this.irsDir !== 0) {
			sound.playSFX("initialrotate");
			const curPos = this.pos;
			const newPos = mod(this.pos + this.irsDir, 4);
			const _rot = settings.RotSys.offset[this.index];
			const offsetX = _rot[newPos][0] - _rot[curPos][0];
			const offsetY = _rot[newPos][1] - _rot[curPos][1];
			this.tetro = pieces[index].tetro[newPos];
			if (!this.moveValid(offsetX, offsetY, this.tetro)) {
				this.tetro = pieces[index].tetro[curPos];
			} else {
				this.x += offsetX;
				this.y += offsetY;
				this.pos = newPos;
			}
			this.irsDir = 0;
		} else {
			this.tetro = pieces[index].tetro[this.pos];
		}

		this.lockDelayLimit = settings.LockDelay;
		const currentGameType = Game.types[Game.type];
		if (Game.type === GameType.Master) {
			//Death
			this.gravity = 20;
			if (Mutable.level < 20) {
				this.lockDelayLimit = [
					30, 25, 22, 20, 20, 18, 17, 17, 15, 15, 13, 13, 13, 13, 13,
					12, 12, 12, 11, 11,
				][Mutable.level];
			} else {
				this.lockDelayLimit = 11;
			}
		} else if (settings.Gravity !== 0) {
			this.gravity = Mutable.gravityArr[settings.Gravity - 1];
		} else if (currentGameType.params.gravityOverride) {
			this.gravity = currentGameType.params.gravityOverride;
		} else {
			const grav = currentGameType.gravityFunc();
			if (grav) {
				this.gravity = grav;
			}
		}

		if (settings.LockDelay !== 0) {
			this.lockDelayLimit = settings.LockDelay;
		} else if (currentGameType.params.lockDelayOverride) {
			this.lockDelayLimit = currentGameType.params.lockDelayOverride;
		} else {
			const lockDelay = currentGameType.lockDelayFunc();
			if (lockDelay) {
				this.lockDelayLimit = lockDelay;
			}
		}

		if (Game.type === GameType.Grades) {
			//tgm

			let speedI = 0;
			while (Mutable.leveltgm > speedTableTGM[speedI].level) {
				if (Mutable.leveltgm < speedTableTGM[speedI + 1].level) {
					piece.gravity = speedTableTGM[speedI].speed;
				}
				speedI++;
			}

			if (Mutable.leveltgm < 100) {
				//ghost visiblity
				settings.Ghost = 1;
			} else {
				settings.Ghost = 2;
			}

			let miscI = 0;
			while (Mutable.leveltgm > miscTableTGM[miscI].level) {
				if (Mutable.leveltgm < miscTableTGM[miscI + 1].level) {
					piece.areLimit = miscTableTGM[miscI].are;
					Mutable.lineARE = miscTableTGM[miscI].areline;
					Mutable.lineAREb = miscTableTGM[miscI].arelineb;
					settings.DAS = miscTableTGM[miscI].das;
					settings.LockDelay = miscTableTGM[miscI].lockdelay;
				}
				miscI++;
			}
		} else {
			this.gravity = gravityUnit;
		}
		// Check for blockout.
		let blockOut = false;
		if (!this.moveValid(0, 0, this.tetro)) {
			if (Game.type === (8 || 9)) {
				blockOut = true;
			} else if (!this.moveValid(0, -1, this.tetro)) {
				if (!this.moveValid(0, -2, this.tetro)) {
					blockOut = true;
				} else {
					piece.y -= 2;
				}
			} else {
				piece.y -= 1;
			}
		}
		if (blockOut === true) {
			if (Game.type !== (8 || 9)) {
				piece.y -= 2;
			}
			Game.state = GameState.BlockOut;
			$setText(Elements.msg, "BLOCK OUT!");
			currentGameType.die();
			menu(FAILED_MENU_ID);
			sound.playSFX("gameover");
			sound.playvox("lose");
			return;
		}

		//real 20G
		if (this.gravity >= 20) {
			this.checkFall();
		}
		this.landed = !this.moveValid(0, 1, this.tetro);
		if (flags.moveDown & Mutable.keysDown) {
			const grav = Mutable.gravityArr[settings.SoftDrop + 1];
			if (grav >= 20)
				// 20G softdrop = 20G gravity
				this.y += this.getDrop(grav);
			//piece.finesse++;
		}
		// die-in-one-frame!
		if (this.landed && this.lockDelay >= this.lockDelayLimit) {
			this.checkLock();
		}
		this.delayCounting = false;
	}

	tryKickList(kickList, rotated, newPos, offsetX, offsetY) {
		let failedRotations = 0;
		Mutable.rotationFailed = false;

		for (let k = 0, len = kickList.length; k < len; k++) {
			if (
				this.moveValid(
					offsetX + kickList[k][0],
					offsetY + kickList[k][1],
					rotated
				)
			) {
				this.x += offsetX + kickList[k][0];
				this.y += offsetY + kickList[k][1];
				this.tetro = rotated;
				this.pos = newPos;
				this.finesse++;
				break;
			} else {
				failedRotations++;
			}
		}
		if (failedRotations >= kickList.length) {
			Mutable.rotationFailed = true;
		}
	}

	rotate(direction) {
		if (this.delayCounting === true) {
			this.rotateLimit++;
		}
		sound.playSFX("rotate");

		// Goes thorugh kick data until it finds a valid move.
		const curPos = mod(this.pos, 4);
		const newPos = mod(this.pos + direction, 4);
		// Rotates tetromino.
		const rotated = pieces[this.index].tetro[newPos];
		const rotSys = settings.RotSys;
		const rot = rotSys.offset[this.index];
		const offsetX = rot[newPos][0] - rot[curPos][0];
		const offsetY = rot[newPos][1] - rot[curPos][1];
		let kickList: number[][] = [];
		if (rotSys.id === 2 || rotSys.id === 14) {
			//ARS, Plus
			if (this.index === PieceData.I.index) {
				if (curPos === 1 || curPos === 3)
					kickList = [
						[0, 0],
						[+1, 0],
						[-1, 0],
						[+2, 0],
					];
				else
					kickList = [
						[0, 0],
						[0, -1],
						[0, -2],
					];
			} else if (
				newPos === 0 ||
				((this.index === PieceData.S.index ||
					this.index === PieceData.Z.index) &&
					newPos === 2)
			)
				kickList = [
					[0, 0],
					[+1, 0],
					[-1, 0],
					[0, -1],
				];
			else
				kickList = [
					[0, 0],
					[+1, 0],
					[-1, 0],
				];
			this.tryKickList(kickList, rotated, newPos, offsetX, offsetY);
		} else {
			const kickIndex = [1, -1, 2].indexOf(direction); // kickDataDirectionIndex
			if (rotSys.id === 0)
				kickList = WKTableSRS[this.index][kickIndex][curPos];
			else if (rotSys.id === 1) kickList = WKTableCultris;
			else if (rotSys.id === 15) kickList = WKTableDX[kickIndex][curPos];
			else kickList = WKTableDRS[kickIndex];

			this.tryKickList(kickList, rotated, newPos, offsetX, offsetY);
		}
		Mutable.spinX = Math.floor(piece.x);
		Mutable.spinY = Math.floor(piece.y);
		spinCheck();
		if (settings.Soundbank === 0 && Mutable.isSpin) {
			sound.playSFX("tspin0");
		}
		Mutable.isSpin = false;
		Mutable.isMini = false;
	}

	checkShift() {
		// Shift key pressed event.
		if (
			getFlag(Mutable.keysDown, flags.moveLeft) &&
			!(getFlag(Mutable.lastKeys, flags.moveLeft))
		) {
			this.shiftDelay = 0;
			this.arrDelay = 0;
			this.shiftReleased = true;
			this.shiftDir = -1;
			this.finesse++;
		} else if (
			getFlag(Mutable.keysDown, flags.moveRight) &&
			!(getFlag(Mutable.lastKeys, flags.moveRight))
		) {
			this.shiftDelay = 0;
			this.arrDelay = 0;
			this.shiftReleased = true;
			this.shiftDir = 1;

			this.finesse++;
		}
		// Shift key released event.
		if (
			this.shiftDir === 1 &&
			!(getFlag(Mutable.keysDown, flags.moveRight)) &&
			getFlag(Mutable.lastKeys, flags.moveRight) &&
			getFlag(Mutable.keysDown, flags.moveLeft)
		) {
			this.shiftDelay = 0;
			this.arrDelay = 0;
			this.shiftReleased = true;
			this.shiftDir = -1;
		} else if (
			this.shiftDir === -1 &&
			!(getFlag(Mutable.keysDown, flags.moveLeft)) &&
			getFlag(Mutable.lastKeys, flags.moveLeft) &&
			getFlag(Mutable.keysDown, flags.moveRight)
		) {
			this.shiftDelay = 0;
			this.arrDelay = 0;
			this.shiftReleased = true;
			this.shiftDir = 1;
		} else if (
			!(getFlag(Mutable.keysDown, flags.moveRight)) &&
			getFlag(Mutable.lastKeys, flags.moveRight) &&
			getFlag(Mutable.keysDown, flags.moveLeft)
		) {
			this.shiftDir = -1;
		} else if (
			!(getFlag(Mutable.keysDown, flags.moveLeft)) &&
			getFlag(Mutable.lastKeys, flags.moveLeft) &&
			getFlag(Mutable.keysDown, flags.moveRight)
		) {
			this.shiftDir = 1;
		} else if (
			(!(getFlag(Mutable.keysDown, flags.moveLeft)) &&
				getFlag(Mutable.lastKeys, flags.moveLeft)) ||
			(!(getFlag(Mutable.keysDown, flags.moveRight)) &&
				getFlag(Mutable.lastKeys, flags.moveRight))
		) {
			this.shiftDelay = 0;
			this.arrDelay = 0;
			this.shiftReleased = true;
			this.shiftDir = 0;
		}
		// Handle events
		/* farter */
		// here problem causes it taking 2 frames to move 1 grid even ARR=1
		const dascut = settings.DASCut;
		//if (dascut) {
		// this.ShiftDir = 0;
		// console.log("interrupt")
		//}

		const ARR = settings.ARR;
		const DAS = settings.DAS;

		if (this.shiftDir) {
			// 1. When key pressed instantly move over once.
			if (this.shiftReleased && DAS !== 0) {
				this.shift(this.shiftDir);
				this.shiftDelay++;
				this.shiftReleased = false;
				// 2. Apply DAS delay
			} else if (this.shiftDelay < DAS) {
				this.shiftDelay++;
				// 3. Once the delay is complete, move over once.
				// Increment delay so this doesn't run again.
				// if arr=0, repeat here, not entering 4
				// but if dascut, let shiftdelay == das + 1 and arrdelay = 0 which is not < arr
			} else if (this.shiftDelay === DAS) {
				this.shift(this.shiftDir);
				if (ARR !== 0 || dascut) this.shiftDelay++;
				// 4. Apply ARR delay
			} else if (this.arrDelay < ARR) {
				this.arrDelay++;
				// 5. If ARR Delay is full, move piece, and reset delay and repeat.
				/*
				} else if (this.arrDelay === settings.ARR && settings.ARR !== 0) {
				*/
				if (this.arrDelay === ARR && ARR !== 0) {
					this.shift(this.shiftDir);
					// console.log("moveright")
				}
			}
		}
		if (
			flags.moveLeft3 & Mutable.keysDown &&
			!(getFlag(Mutable.lastKeys, flags.moveLeft3))
		) {
			this.multiShift(-1, 3);
			this.finesse++;
		} else if (
			flags.moveRight3 & Mutable.keysDown &&
			!(getFlag(Mutable.lastKeys, flags.moveRight3))
		) {
			this.multiShift(1, 3);
			this.finesse++;
		}
	}

	shift(direction) {
		this.arrDelay = 0;
		const ARR = settings.ARR;
		const DAS = settings.DAS;
		if (ARR === 0 && this.shiftDelay === DAS) {
			if (this.moveValid(direction, 0, this.tetro)) {
				if (direction === 1) {
					shiftMatrix(MatrixDir.RIGHT);
				} else {
					shiftMatrix(MatrixDir.LEFT);
				}
				this.x += direction;
				/* farter */ //instant das under 20G
				if (this.gravity >= 20) {
					this.checkFall();
				}
				if (flags.moveDown & Mutable.keysDown) {
					const grav = Mutable.gravityArr[settings.SoftDrop + 1];
					if (grav >= 20)
						// 20G softdrop vs. 20G das
						this.y += this.getDrop(grav);
					//piece.finesse++;
				}
			}
		} else if (this.moveValid(direction, 0, this.tetro)) {
			if (this.delayCounting === true) {
				this.moveLimit++;
			}
			this.x += direction;
			sound.playSFX("move");
		} else if (direction === 1) {
			shiftMatrix(MatrixDir.RIGHT);
		} else {
			shiftMatrix(MatrixDir.LEFT);
		}
		if (
			!this.moveValid(direction, 0, this.tetro) &&
			Game.type === GameType.Retro
		) {
			this.arrDelay = ARR - 1;
			this.shiftDelay = DAS + 1;
		}
	}

	multiShift(direction, count) {
		for (
			let i = 0;
			i < count && this.moveValid(direction, 0, this.tetro);
			++i
		) {
			this.x += direction;
			if (this.gravity >= 20) {
				this.checkFall();
			}
			if (flags.moveDown & Mutable.keysDown) {
				const grav = Mutable.gravityArr[settings.SoftDrop + 1];
				if (grav >= 20)
					// 20G softdrop vs. 20G das
					this.y += this.getDrop(grav);
				//piece.finesse++;
			}
		}
	}

	shiftDown() {
		if (this.moveValid(0, 1, this.tetro)) {
			const grav = Mutable.gravityArr[settings.SoftDrop + 1];
			if (grav >= 1) {
				this.y += this.getDrop(grav);
			} else {
				this.y += grav;
			}
		}
	}

	hardDrop() {
		if (Game.types[Game.type].params.allowHardDrop) {
			if (Game.params.classicRule === true) {
				Mutable.usedHardDrop = false;
			} else {
				sound.playSFX("harddrop");
				Mutable.usedHardDrop = true;
			}

			const distance = this.getDrop(2147483647);
			this.y += distance;
			Mutable.score += BigInt(
				distance + this.lockDelayLimit - this.lockDelay
			);
			Mutable.newScore += BigInt(distance * 2);
			Mutable.scoreNes += distance * 2;
			scoreNesRefresh();
			//statisticsStack();
			if (Game.params.classicRule !== true) {
				this.lockDelay = this.lockDelayLimit;
			}
		}
	}

	getDrop(distance) {
		if (Game.type !== 8) {
			if (!this.moveValid(0, 0, this.tetro)) return 0;
			let i;
			for (i = 1; i <= distance; i++) {
				if (!this.moveValid(0, i, this.tetro)) return i - 1;
			}
			return i - 1;
		} else {
			if (!this.moveValid(0, 0, this.tetro)) return 0;
			let i;
			for (i = 1; i <= distance; i++) {
				if (!this.moveValid(0, i, this.tetro)) return i - 1;
			}
			return i - 1;
		}
	}

	hold() {
		if (Game.type !== 8) {
			const temp = hold.piece;
			if (!this.held) {
				if (hold.piece !== undefined) {
					hold.piece = this.index;
					this.new(temp);
				} else {
					hold.piece = this.index;
					this.new(preview.next());
				}
				this.held = true;
				$("a").classList.add("greyed");
				hold.draw();
			}
		}
	}

	/**
	 * Checks if position and orientation passed is valid.
	 *  We call it for every action instead of only once a frame in case one
	 *  of the actions is still valid, we don't want to block it.
	 */
	moveValid(cx, cy, tetro) {
		cx = cx + this.x;
		cy = Math.floor(cy + this.y);

		for (let x = 0; x < tetro.length; x++) {
			for (let y = 0; y < tetro[x].length; y++) {
				if (
					tetro[x][y] &&
					(cx + x < 0 ||
						cx + x >= stack.width ||
						cy + y >= stack.height ||
						(cy + y >= 0 && stack.grid[cx + x][cy + y]))
				) {
					return false;
				}
			}
		}
		if (
			Game.type === GameType.Grades ||
			(Game.type === GameType.Master &&
				(Game.params.delayStrictness === 1 ||
					Game.params.delayStrictness === 2))
		) {
			if (
				(Game.params.classicRule !== true &&
					Game.type === GameType.Grades) ||
				Game.params.delayStrictness === 1
			) {
				if (this.landed) {
					this.delayCounting = true;
					if (this.moveLimit < 11 && this.rotateLimit < 8) {
						this.lockDelay = 0;
					}
				} else {
					this.lockDelay = 0;
				}
			} else if (
				Game.params.classicRule === true ||
				Game.params.delayStrictness === 2
			) {
				if (this.classicRuleDelayLast < Math.floor(this.y)) {
					this.lockDelay = 0;
				}
				if (this.classicRuleDelayLast < Math.floor(this.y)) {
					this.classicRuleDelayLast = Math.floor(this.y);
				}

				if (!this.landed) {
					// this.lockDelay = 0;
				}
			}
		} else {
			this.lockDelay = 0;
		}

		return true;
	}

	checkFall() {
		const grav = this.gravity;
		if (grav > 1) {
			this.y += this.getDrop(grav);
		} else {
			this.y += grav;
		}
		/* farter */ // rounding problem
		if (Math.abs(this.y - Math.round(this.y)) < 0.000001)
			this.y = Math.round(this.y);
	}

	checkLock() {
		if (this.landed) {
			this.y = Math.floor(this.y); //@sega
			if (this.lockDelay >= this.lockDelayLimit) {
				this.dead = true;
				stack.addPiece(this.tetro);
				if (Mutable.usedHardDrop === false) {
					if (Game.type === GameType.Retro) {
						Mutable.scoreNes += Math.floor(Mutable.classicSoftDrop);
						scoreNesRefresh();
						Mutable.classicSoftDrop = 0;
						Mutable.lastYFrame = 0;
					}
					sound.playSFX("lock");
					if (Game.params.classicRule === true) {
						this.lockDelay = 0;
					}
				}
				Mutable.usedHardDrop = false;
				this.dirty = true;
				if (Game.state === GameState.Loss) {
					// lockout! don't spawn next piece
					return;
				} else {
					this.held = false;
					/* farter */
					// Win?
					Game.checkWin();
					if (Game.state === GameState.Normal && piece.dead) {
						// still playing, then spawn the next piece
						// determine next ARE limit
						if (Game.type === GameType.Master) {
							//Death
							if (Mutable.level < 20) {
								this.areLimit = [
									18, 18, 18, 15, 15, 12, 12, 12, 12, 12, 12,
									12, 10, 10, 10, 8, 8, 8, 8, 8,
								][Mutable.level];
							} else {
								this.lockDelayLimit = 11;
								this.areLimit = 6;
							}
							if (Mutable.lineClear !== 0) {
								Mutable.lineARE = this.areLimit;
								this.areLimit += Mutable.lineARE;
							} else {
								Mutable.lineARE = 0;
							}
						} else if (Game.type === GameType.Retro) {
							if (piece.y >= 21) {
								this.areLimit = 10;
							} else if (piece.y >= 17) {
								this.areLimit = 12;
							} else if (piece.y >= 13) {
								this.areLimit = 14;
							} else if (piece.y >= 9) {
								this.areLimit = 16;
							} else {
								this.areLimit = 18;
							}
							if (Mutable.lineClear !== 0) {
								Mutable.lineARE = 17;
								this.areLimit += Mutable.lineARE;
							} else {
								Mutable.lineARE = 0;
							}
						} else if (Game.type === GameType.Grades) {
							if (Mutable.lineClear !== 0) {
								this.areLimit += Mutable.lineARE;
								this.areLimit += Mutable.lineAREb;
							}
						} else if (Game.type === GameType.Marathon) {
							if (Game.params.entryDelay === 1) {
								Mutable.lineARE = 12;
								this.areLimit = 6;
								if (Mutable.lineClear !== 0) {
									this.areLimit = 24;
								}
							}
							if (Game.params.entryDelay === 2) {
								Mutable.lineARE = 40;
								this.areLimit = 25;
								if (Mutable.lineClear !== 0) {
									this.areLimit = 65;
								}
							}
						} else {
							this.areLimit = 0;
						}
						if (this.areLimit === 0) {
							// IRS IHS not possible
							this.new(preview.next()); // may die-in-one-frame
						} else {
							Game.state = GameState.Paused;
							this.are = 0;
							// $("irs-indicator").classList.add("gone");
						}
					}
				}
				/* farter */
			}
		}
	}

	landed = false;

	update() {
		this.landed = !this.moveValid(0, 1, this.tetro);

		if (!(this.moveLimit < 10 && this.rotateLimit < 8)) {
			this.lockDelay = this.lockDelayLimit;
		}

		if (Game.type === GameType.Retro) {
			if (flags.moveDown & Mutable.keysDown) {
				if (Mutable.lastYFrame !== 0) {
					Mutable.classicSoftDrop += piece.y - Mutable.lastYFrame;
				}
				Mutable.lastYFrame = piece.y;
			} else {
				Mutable.classicSoftDrop = 0;
			}
			if (this.landed) {
				if (flags.moveDown & Mutable.keysDown) {
					Mutable.classicGravTest +=
						Mutable.gravityArr[settings.SoftDrop];
				}
				Mutable.classicGravTest += Mutable.classicStoredY;
				Mutable.classicGravTest += this.gravity;
				if (Mutable.classicGravTest >= 1) {
					this.lockDelay = 99;
					Mutable.classicGravTest = 0;
				}
			} else {
				this.y += this.gravity;
				piece.y += Mutable.classicGravTest;
				Mutable.classicStoredY = piece.y % 1;
				Mutable.classicGravTest = 0;
			}
		} else if (flags.moveDown & Mutable.keysDown) {
			if (Mutable.lastYFrame !== 0 && piece.y - Mutable.lastYFrame > 0) {
				Mutable.newScore += BigInt(
					Math.floor(piece.y - Mutable.lastYFrame)
				);
				$setText(
					Elements.statsScore,
					(~~Mutable.newScore).toLocaleString()
				);
			}
			Mutable.lastYFrame = piece.y;
		}
		// if (Game.type === GameType.Grades) {
		// if (this.moveLimit < 10 && this.rotateLimit < 8) {
		// console.log("okay!" + piece.moveLimit + " " + piece.rotateLimit)
		// this.lockDelay = 0;
		// } else {
		// this.lockDelay = this.lockDelayLimit;
		// }
		// }

		if (this.moveValid(0, 1, this.tetro) && Game.type !== 8) {
			this.checkFall();
		}

		if (this.landed) {
			if (
				flags.moveDown & Mutable.keysDown &&
				Game.type === GameType.Grades
			) {
				if (Game.params.classicRule === true) {
					this.lockDelay = this.lockDelayLimit;
				} else {
					this.lockDelay += 3;
				}
			}
			if (piece.gravity !== 0) {
				this.lockDelay++;
			}

			this.checkLock();
		}
	}

	draw() {
		clear(Elements.activeCtx);
		if (!this.dead) {
			this.drawGhost();
			if (settings.Ghost !== 3) {
				let a;

				if (this.landed) {
					if (Mutable.stepSEPlayed !== true && Game.type !== 8) {
						sound.playSFX("step");
						Mutable.stepSEPlayed = true;
					}

					a = this.lockDelay / this.lockDelayLimit;
					if (this.lockDelayLimit === 0) a = 0;
					a = Math.pow(a, 2) * 0.5;
				} else {
					Mutable.stepSEPlayed = false;
				}
				draw(
					this.tetro,
					this.x,
					Math.floor(this.y) - stack.hiddenHeight,
					Elements.activeCtx,
					settings.RotSys.color[this.index],
					a
				);
			}
		}
	}

	drawGhost() {
		Elements.activeCtx.globalAlpha = 0.4;
		if (settings.Ghost === Ghost.Grey && !this.landed) {
			draw(
				this.tetro,
				this.x,
				Math.floor(this.y + this.getDrop(2147483647)) -
					stack.hiddenHeight,
				Elements.activeCtx,
				0
			);
		} else if (settings.Ghost === Ghost.Colored && !this.landed) {
			draw(
				this.tetro,
				this.x,
				Math.floor(this.y + this.getDrop(2147483647)) -
					stack.hiddenHeight,
				Elements.activeCtx,
				settings.RotSys.color[this.index]
			);
		}

		const customGhost = Game.types[Game.type].customGhostDisplay();
		if (customGhost) {
			const len = customGhost.length;
			const width = customGhost[0].length;
			for (let y = 0; y < width; y++) {
				for (let x = 0; x < len; x++) {
					if (customGhost[x][y]) {
						drawCell(
							y,
							x + stack.height - stack.hiddenHeight - len,
							customGhost[x][y],
							Elements.activeCtx
						);
					}
				}
			}
		}

		Elements.activeCtx.globalAlpha = 1;
	}
}

export let piece = new Piece();

export function resetPiece() {
	piece = new Piece();
}
