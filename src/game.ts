import { GameState, GameType as GameTypeEnum, Gravity } from "./utils/enums";
import { GameType } from "./gametypes/base";
import { menu } from "./display/menu";
import { $, $setText, clear } from "./utils/utils";
import { run as runReplay } from "./leaderboard/replays";
import { rng } from "./utils/randomizer";
import {
	flags,
	gravityUnit,
	sprintRanks,
	Mutable,
	Elements,
} from "./utils/data";
import { settings } from "./settings";
import { sound } from "./display/sound/sound";
import { preview } from "./display/tetrion/preview";
import { stack } from "./display/tetrion/stack";
import { resize } from "./display/size";
import { piece, resetPiece } from "./display/tetrion/piece";
import { hold } from "./logic/hold";
import { makeSprite } from "./logic/view";
import { t } from "./utils/lang";
import { updateMatrixPosition } from "./display/tetrion/matrix";
import { statistics, statisticsStack } from "./display/tetrion/stats";
import { clearTetrisMessage } from "./display/tetrion/messages";
import {
	scoreNesRefresh,
	tetRateNesRefresh,
	updateScoreTime,
} from "./random_stuff";
import { Sprint } from "./gametypes/sprint";
import { Dig } from "./gametypes/dig";
import { Marathon } from "./gametypes/marathon";
import { Master } from "./gametypes/master";
import { Retro } from "./gametypes/retro";
import { ScoreAttack } from "./gametypes/scoreattack";
import { Grades } from "./gametypes/grades";
import { Survival } from "./gametypes/survival";

// TODO: Check all settings and make them work better with the new settings system.

export class Game {
	static type: GameTypeEnum = 0;

	static params: {
		[x: string]: any;
		proMode?: any;
		tournament?: boolean;
		allowHardDrop?: any;
		classicRule?: any;
		delayStrictness?: any;
		entryDelay?: any;
		noGravity?: any;
		pieceSet?: any;
		bType?: any;
		startingLevel?: any;
		backFire?: any;
		recordPB?: any;
		marathonLimit?: any;
		levelCap?: any;
		invisibleMarathon?: any;
		retroSkin?: any;
		digraceType?: any;
		digOffset?: any;
	} = {};

	static state: GameState = GameState.NotPlayed;

	/**
	 * Pausing variables
	 */
	static startPauseTime;

	static pauseTime;

	static paused = false;

	/**
	 * Resets all the settings and starts the game.
	 */
	static init(gt: GameTypeEnum | "replay", params?) {

		if (gt !== "replay") {
			Game.types[Game.type].done();
		}

		try {
			sound.killbgm();
		} catch (e) {}
		const linevectorEle = $<HTMLImageElement>("linevector");
		const levelEle = $("level");

		$("ivalue").style.color = "#ffffff";
		linevectorEle.classList.remove("drought-flash");
		linevectorEle.src = "./assets/linevector.svg";
		levelEle.classList.remove("level-flash");

		Mutable.leveltgm = 0;
		Mutable.leveltgmvisible = 0;
		Mutable.scoreNes = 0;
		Mutable.newScore = 0n;
		Mutable.tetRateNes = 0;
		Mutable.tetNes = 0;
		Mutable.nontetNes = 0;
		scoreNesRefresh();
		tetRateNesRefresh();
		Mutable.lineDrought = 0;
		Mutable.lineAmount = 0;
		makeSprite();

		sound.init();

		//Reset
		Mutable.column = 0;
		Mutable.keysDown = 0;
		Mutable.lastKeys = 0;
		Mutable.released = 255;
		// TODO: check if this is needed
		resetPiece();
		preview.reset();
		//preview.draw();
		Mutable.frame = 0;
		Mutable.frameSkipped = 0;
		Mutable.lastPos = "reset";
		stack["new"](10, 20, 4);
		Mutable.toGreyRow = stack.height - 1;
		hold.piece = undefined;
		if (settings.Gravity === Gravity.Auto) Mutable.gravity = gravityUnit;
		Mutable.b2b = 0;
		Mutable.combo = 0;
		Mutable.allclear = 0;
		Mutable.statsFinesse = 0;
		Mutable.lines = 0;
		Mutable.score = 0n;
		Mutable.piecesSet = 0;

		if (Game.type == GameTypeEnum.Retro) {
			Mutable.level = Game.params.startingLevel;
		} else {
			Mutable.level = 0;
		}

		Mutable.digLines = [];
		if (Game.params.noGravity == true) {
			settings.Gravity = 1;
		}

		clear(Elements.stackCtx);
		clear(Elements.activeCtx);
		clear(Elements.holdCtx);

		if (gt === "replay") {
			runReplay(params);
		} else {
			Mutable.watchingReplay = false;
			Game.type = gt;
			Game.params = params || {};
			//setup game parameters
			Game.types[Game.type].init();

			const seed = ~~(Math.random() * 2147483645) + 1;
			rng.seed = seed;

			Mutable.replay = {};
			Mutable.replay.keys = {};
			// TODO Make new seed and rng method.
			Mutable.replay.seed = seed;
			Mutable.replay.type = Game.type;
			Mutable.replay.params = Game.params;
			Mutable.replay.settings = settings;
		}

		if (Game.type === 7) {
			sound.cutsidebgm();
			sound.loadbgm("survival");
			sound.loadsidebgm("survivaldire");
		}

		if (Game.type === undefined) {
			Game.type = 0;
			sound.loadbgm("sprint");
		} //sometimes happens.....

		if (
			Game.type !== GameTypeEnum.Sprint &&
			Game.type !== GameTypeEnum.ScoreAttack &&
			Game.type !== GameTypeEnum.Retro
		) {
			if (Game.params.bType == true) {
				Mutable.lineLimit = 25;
			} else {
				Mutable.lineLimit = 0;
			}
		}

		if (Game.params.tournament === true) {
			$("b").classList.add("tournament");
		} else {
			$("b").classList.remove("tournament");
		}

		//html5 mobile device sound

		menu();

		// Only start a loop if one is not running already.
		// don't keep looping when not played
		// console.log(paused,Game.state);
		if (Game.paused || Game.state === GameState.NotPlayed) {
			// console.log("start inloop",inloop);
			Game.inloop = true;
			window.requestAnimationFrame(() => Game.gameLoop());
		}
		Game.startTime = Date.now();
		Game.startPauseTime = 0;
		Game.pauseTime = 0;
		Mutable.scoreTime = 0;
		Game.paused = false;
		statisticsStack();
		preview.draw();
		Game.state = GameState.Countdown;

		resize();
	}

	static types: { [key: number]: GameType } = {};

	static addGameType(num: GameTypeEnum, type: GameType) {
		Game.types[num] = type;
	}

	static inloop = false;

	static pause() {
		if (
			Game.state === GameState.Normal ||
			Game.state === GameState.Paused
		) {
			Game.paused = true;
			Game.startPauseTime = Date.now();
			$setText(Elements.msg, "Paused");
			menu(4);
		}
	}

	static unpause() {
		Game.paused = false;
		Game.pauseTime += Date.now() - Game.startPauseTime;
		$setText(Elements.msg, "");
		menu();
		// console.log("start inloop", inloop);
		Game.inloop = true;
		window.requestAnimationFrame(() => Game.gameLoop());
	}

	static defaultGameSettings = {
		marathon: {
			limit: {
				val: 0,
				max: 3,
			},
			delay: {
				val: 1,
				max: 2,
			},
			nograv: {
				val: 0,
				max: 1,
			},
			invisible: {
				val: 0,
				max: 1,
			},
			cap: {
				val: 0,
				max: 1,
			},
		},
		sprint: {
			limit: {
				val: 0,
				max: 2,
			},
			piece: {
				val: 0,
				max: 2,
			},
			backfire: {
				val: 0,
				max: 3,
			},
		},
		dig: {
			checker: {
				val: 0,
				max: 1,
			},
			zen: {
				val: 0,
				max: 1,
			},
		},
		survival: {
			zen: {
				val: 0,
				max: 1,
			},
			slevel: {
				val: 0,
				max: 4,
			},
		},
		master: {
			lock: {
				val: 1,
				max: 2,
			},
		},
		retro: {
			type: {
				val: 0,
				max: 1,
			},
			skin: {
				val: 1,
				max: 1,
			},
			drop: {
				val: 0,
				max: 1,
			},
			level: {
				val: 0,
				max: 19,
			},
			flash: {
				val: 1,
				max: 1,
			},
		},
		grades: {
			rule: {
				val: 1,
				max: 1,
			},
		},
	};

	static settings = Game.defaultGameSettings;

	static startTime;

	static mainLoop() {
		// for breaking
		if (
			!(Mutable.lastKeys & flags.holdPiece) &&
			flags.holdPiece & Mutable.keysDown
		) {
			piece.hold(); // may cause death
		}
		if (Game.state === GameState.Loss) {
			return;
		}

		if (
			flags.rotLeft & Mutable.keysDown &&
			!(Mutable.lastKeys & flags.rotLeft)
		) {
			piece.rotate(-1);
			piece.finesse++;
		} else if (
			flags.rotRight & Mutable.keysDown &&
			!(Mutable.lastKeys & flags.rotRight)
		) {
			piece.rotate(1);
			piece.finesse++;
		} else if (
			flags.rot180 & Mutable.keysDown &&
			!(Mutable.lastKeys & flags.rot180)
		) {
			//if (Game.type !== 8 || true) {
			piece.rotate(2);
			piece.finesse++;
			//}
		}

		piece.checkShift();

		if (flags.moveDown & Mutable.keysDown) {
			piece.shiftDown();
			//piece.finesse++;
		}
		if (
			!(Mutable.lastKeys & flags.hardDrop) &&
			flags.hardDrop & Mutable.keysDown
		) {
			Mutable.frameLastHarddropDown = Mutable.frame;
			piece.hardDrop();
		}

		piece.update(); // may turn to locked, even lock out death.

		Game.types[Game.type].update();
	}

	/**
	 * Runs every frame.
	 */
	static update() {
		//TODO Das preservation broken.
		if (Mutable.lastKeys !== Mutable.keysDown && !Mutable.watchingReplay) {
			Mutable.replay.keys[Mutable.frame] = Mutable.keysDown;
		} else if (Mutable.frame in Mutable.replay.keys) {
			Mutable.keysDown = Mutable.replay.keys[Mutable.frame];
		}

		/* 
		if (piece.dead) {
			piece.new(preview.next());
		}
		*/

		Game.mainLoop();

		updateScoreTime();

		if (Mutable.lastKeys !== Mutable.keysDown) {
			Mutable.lastKeys = Mutable.keysDown;
		}
	}

	static gameLoop() {
		//if (Mutable.frame % 60 == 0) console.log("running");
		const fps = 60;
		updateMatrixPosition();
		if (Mutable.lockflash > 0) {
			if (piece.tetro != undefined) {
				for (let i = 0; i < 4; i++) {
					for (let j = 0; j < 4; j++) {
						if (Mutable.lockflashTetro[i][j] > 0) {
							Elements.stackCtx.fillStyle = "#ffffff";
							Elements.stackCtx.fillRect(
								(Mutable.lockflashX + i) * Mutable.cellSize,
								(Math.floor(Mutable.lockflashY + j) - 4) *
									Mutable.cellSize,
								Mutable.cellSize,
								Mutable.cellSize
							);
						}
					}
				}
			}
			Mutable.lockflash--;
		} else if (Mutable.lockflashOn) {
			stack.draw();

			Mutable.lockflash = 0;
			Mutable.lockflashOn = false;
		}
		if (
			(Game.state !== 0 && Game.state !== 4 && Game.state !== 2) ||
			Mutable.killAllbgm == true
		) {
			sound.killbgm();
			Mutable.alarm = false;
			sound.stopSFX("alarm");
			$("bgStack").classList.remove("alarm");
		}
		const timeEle = $("time");
		if (Game.type === GameTypeEnum.Sprint) {
			const sprintPB = parseInt(localStorage.getItem("sprint40pb"));
			if (Mutable.scoreTime >= sprintPB + 100) {
				Elements.timeCtx.fillStyle = "#f00";
				timeEle.classList.add("drought-flash");

				if (settings.ResetPB) {
					Game.init(Game.type, Game.params);
				}
			} else {
				Elements.timeCtx.fillStyle = "#fff";
				timeEle.classList.remove("drought-flash");
			}
		} else {
			Elements.timeCtx.fillStyle = "#fff";
			timeEle.classList.remove("drought-flash");
		}

		if (!Game.paused && Game.state !== 3) {
			// eslint-disable-next-line @typescript-eslint/unbound-method
			window.requestAnimationFrame(Game.gameLoop);

			const repeat =
				~~(
					((Date.now() - Game.startTime - Game.pauseTime) / 1000) *
					fps
				) - Mutable.frame;
			if (repeat > 1) {
				Mutable.frameSkipped += repeat - 1;
			} else if (repeat <= 0) {
				Mutable.frameSkipped += repeat - 1;
			}

			for (let repf = 0; repf < repeat; repf++) {
				//TODO check to see how pause works in replays.

				if (Game.state === GameState.Normal) {
					// Playing

					Game.update();
				} else if (
					Game.state === GameState.Countdown ||
					Game.state === GameState.Paused
				) {
					if (
						Mutable.lastKeys !== Mutable.keysDown &&
						!Mutable.watchingReplay
					) {
						Mutable.replay.keys[Mutable.frame] = Mutable.keysDown;
					} else if (Mutable.frame in Mutable.replay.keys) {
						Mutable.keysDown = Mutable.replay.keys[Mutable.frame];
					}
					// DAS Preload
					if (Mutable.keysDown & flags.moveLeft) {
						// if (Game.params.classicTuning !== true) {
						piece.shiftDelay = settings.DAS;
						// }

						piece.shiftReleased = false;
						piece.shiftDir = -1;
					} else if (Mutable.keysDown & flags.moveRight) {
						// if (Game.params.classicTuning !== true) {
						piece.shiftDelay = settings.DAS;
						// }
						piece.shiftReleased = false;
						piece.shiftDir = 1;
					} else {
						piece.shiftDelay = 0;
						piece.shiftReleased = true;
						piece.shiftDir = 0;
					}
					if (settings.IRSMode != 0) {
						if (
							flags.rotLeft & Mutable.keysDown &&
							!(Mutable.lastKeys & flags.rotLeft)
						) {
							const amt = 3;
							if (settings.IRSMode == 3) {
								piece.irsDir =
									((piece.irsDir + 1 + amt) % 4) - 1;
							} else {
								piece.irsDir = -1;
							}
							if (settings.InitialVis) {
								sound.playSFX("rotate");
								preview.draw();
							}
						} else if (
							flags.rotRight & Mutable.keysDown &&
							!(Mutable.lastKeys & flags.rotRight)
						) {
							const amt = 1;
							if (settings.IRSMode == 3) {
								piece.irsDir =
									((piece.irsDir + 1 + amt) % 4) - 1;
							} else {
								piece.irsDir = amt;
							}
							if (settings.InitialVis) {
								sound.playSFX("rotate");
								preview.draw();
							}
						} else if (
							flags.rot180 & Mutable.keysDown &&
							!(Mutable.lastKeys & flags.rot180)
						) {
							const amt = 2;
							if (settings.IRSMode == 3) {
								piece.irsDir =
									((piece.irsDir + 1 + amt) % 4) - 1;
							} else {
								piece.irsDir = amt;
							}

							if (settings.InitialVis) {
								sound.playSFX("rotate");
								preview.draw();
							}
						} else if (
							piece.irsDir != 0 &&
							(flags.rotLeft & Mutable.keysDown) == 0 &&
							(flags.rotRight & Mutable.keysDown) == 0 &&
							(flags.rot180 & Mutable.keysDown) == 0 &&
							settings.IRSMode == 2
						) {
							piece.irsDir = 0;
							if (settings.InitialVis) {
								sound.playSFX("rotate");
								preview.draw();
							}
						}
					}
					const irsIndicator = $("irs-indicator");
					if (
						!(Mutable.lastKeys & flags.holdPiece) &&
						flags.holdPiece & Mutable.keysDown &&
						piece.ihs == false &&
						settings.IHSMode != 0
					) {
						if (Game.type !== 8) {
							piece.ihs = true;
							irsIndicator.classList.add("gone");
							if (settings.InitialVis) {
								hold.draw();
								preview.draw();
							}
						}
					} else if (
						piece.ihs == true &&
						(flags.holdPiece & Mutable.keysDown) !== 16 &&
						settings.IHSMode == 2
					) {
						if (Game.type !== 8) {
							piece.ihs = false;
							$("ihs-indicator").classList.add("gone");
							if (settings.InitialVis) {
								hold.draw();
								preview.draw();
							}
						}
					}
					if (Mutable.lastKeys !== Mutable.keysDown) {
						Mutable.lastKeys = Mutable.keysDown;
					}
					const { delayStrictness, tournament } = Game.params;
					let time1;
					let time2;
					if (tournament === true) {
						time1 = 10;
						time2 = 20;
					} else {
						time1 = 5;
						time2 = 10;
					}
					if (Game.state === GameState.Countdown) {
						// Count Down
						if (piece.irsDir !== 0) {
							irsIndicator.classList.remove("gone");
						}
						if (piece.ihs === true) {
							$("ihs-indicator").classList.remove("gone");
						}
						const strictInd = $("strict-ind");
						const myVideo = $("myVideo");
						if (delayStrictness === 2) {
							myVideo.classList.remove("gone");
							strictInd.classList.remove("gone");
						} else {
							myVideo.classList.add("gone");
							strictInd.classList.add("gone");
						}
						if (Mutable.frame === 0) {
							statisticsStack();
							makeSprite();

							Mutable.playedLevelingbgmGrades = [false, false];
							Mutable.playedLevelingbgmMarathon = [false, false];
							Mutable.killAllbgm = true;
							$setText(Elements.msg, t("ready"));
							clearTetrisMessage();
							$("msgdiv").classList.remove("startanim");
							if (tournament === true) {
								sound.playSFX("tourneyready");
							} else {
								sound.playSFX("ready");
							}
							Mutable.clearRows = [];
							sound.killbgm();
						} else if (Mutable.frame === ~~((fps * time1) / 6)) {
							Mutable.killAllbgm = false;
							if (tournament === true) {
								$setText(Elements.msg, "START!");
								sound.playSFX("tourneystart");

								$("msgdiv").classList.add("startanim");
							} else {
								$setText(Elements.msg, t("start"));
								sound.playSFX("go");
							}
							preview.draw();
							sound.killbgm();
						} else if (Mutable.frame === ~~((fps * time2) / 6)) {
							$("msgdiv").classList.remove("startanim");
							$setText(Elements.msg, "");
							Mutable.scoreStartTime = Date.now();
							if (Game.type === GameTypeEnum.Master) {
								if (delayStrictness === 2) {
									sound.playbgm("masterstrict");
									sound.playsidebgm("masterstrictdire");
								} else {
									sound.playbgm("master");
								}
							} else if (Game.type === GameTypeEnum.Marathon) {
								sound.playbgm("marathon");
							} else if (
								Game.type === GameTypeEnum.Sprint ||
								Game.type === GameTypeEnum.Dig ||
								Game.type === GameTypeEnum.ScoreAttack
							) {
								sound.playbgm("sprint");
							} else if (
								Game.type === GameTypeEnum.Survival ||
								Game.type === 7
							) {
								sound.cutsidebgm();
								sound.playbgm("survival");
								sound.playsidebgm("survivaldire");
							} else if (Game.type === GameTypeEnum.Retro) {
								if (Game.params.proMode == false) {
									sound.playbgm("retro");
								} else {
									sound.cutsidebgm();
									sound.playbgm("retropro");
									sound.playsidebgm("retroprodrought");
								}
							} else if (Game.type === GameTypeEnum.Grades) {
								sound.playbgm("grade1");
							}
							sound.lowersidebgm();
						}
						Mutable.scoreTime = 0;
					} else {
						// are
						if (Mutable.lineClear == 4) {
							if (
								Game.type === GameTypeEnum.Retro &&
								Game.settings.retro.flash.val === 1
							) {
								if (piece.are % 2 == 0) {
									document.body.style.backgroundColor =
										"white";
								} else {
									document.body.style.backgroundColor =
										"black";
								}
							}
						}
						if (piece.irsDir !== 0) {
							irsIndicator.classList.remove("gone");
						}
						if (piece.ihs === true) {
							$("ihs-indicator").classList.remove("gone");
						}
						if (piece.are >= Mutable.lineARE) {
							stack.clearLines();
						}
						piece.are++;
						updateScoreTime();
					}
					if (
						(Game.state === GameState.Countdown &&
							Mutable.frame >= (fps * time2) / 6) ||
						(Game.state === GameState.Paused &&
							piece.are >= piece.areLimit)
					) {
						document.body.style.backgroundColor = "black";
						Game.state = GameState.Normal;
						// console.time("123");
						if (piece.ihs && Game.type !== 8) {
							hold.soundCancel = 1;
							piece.index = preview.next();
							sound.playSFX("initialhold");
							piece.hold();
						} else {
							piece["new"](preview.next());
						}
						piece.draw();
						// console.timeEnd("123");
						// console.log(Mutable.frame);
						updateScoreTime();
					}
				} else if (
					Game.state === GameState.Loss ||
					Game.state === GameState.Win
				) {
					$("stack").classList.remove("invisible-replay");
					$("stack").classList.remove("invisible");
					if (Mutable.toGreyRow >= stack.hiddenHeight) {
						// Fade to grey animation played when player loses.
						if (Mutable.frame % 2) {
							for (let x = 0; x < stack.width; x++) {
								/* farter */ //WTF gamestate-1
								if (stack.grid[x][Mutable.toGreyRow])
									stack.grid[x][Mutable.toGreyRow] =
										Game.state === GameState.Loss ? 8 : 0;
							}
							stack.draw();

							Mutable.toGreyRow--;
						}
					} else {
						//clear(activeCtx);
						//piece.dead = true;
						// trysubmitscore(); disabled score submissions because they don't work
						Game.state = GameState.NotPlayed;
					}
				}
				Mutable.frame++;
			}

			statistics();

			// TODO improve this with 'dirty' flags.
			/* farter */ // as you draw for lock delay brightness gradient... give this up..

			if (
				piece.x !== Mutable.lastX ||
				Math.floor(piece.y) !== Mutable.lastY ||
				piece.pos !== Mutable.lastPos ||
				piece.lockDelay !== Mutable.lastLockDelay ||
				piece.dirty
			) {
				piece.draw();
			}
			Mutable.lastX = piece.x;
			Mutable.lastY = Math.floor(piece.y);
			Mutable.lastPos = piece.pos;
			Mutable.lastLockDelay = piece.lockDelay;
			piece.dirty = false;

			if (stack.dirty) {
				stack.draw();
			}
			if (preview.dirty) {
				preview.draw();
			}
		} else {
			// console.log("stop inloop",inloop)
			Game.inloop = false;
		}
	}

	// called after piece lock, may be called multple times when die-in-one-frame
	static checkWin() {
		if (
			Game.type === GameTypeEnum.Sprint ||
			(Game.type === GameTypeEnum.Retro && Game.params.bType == true)
		) {
			// 40L
			if (Mutable.lines >= Mutable.lineLimit) {
				Game.state = GameState.Win;
				if (Game.params?.backFire) {
					Elements.msg.innerHTML = "GREAT!";
				} else {
					let rank = null;
					const time =
						(Date.now() - Mutable.scoreStartTime - Game.pauseTime) /
						1000;

					for (let i = 0; i < sprintRanks.length; i++) {
						if (time > sprintRanks[i].t) {
							rank = sprintRanks[i];
							break;
						}
					}
					if (Game.type !== 8) {
						Elements.msg.innerHTML =
							"<small>" + rank.b + "</small>";
					}
				}
				piece.dead = true;
				menu(3);
				sound.playSFX("endingstart");
				sound.playvox("win");
				Game.types[Game.type].win();
			}
		} else {
			let isend = false;
			if (Game.type === GameTypeEnum.Marathon) {
				// Marathon
				if (
					settings.Gravity !== 0 &&
					Mutable.lines >= 200 &&
					Game.params.noGravity != true
				) {
					// not Auto, limit to 200 Lines
					// isend = true;
				} else if (
					Game.params.marathonLimit != undefined &&
					Mutable.lines >= Game.params.marathonLimit
				) {
					isend = true;
				}
			} else if (Game.type === GameTypeEnum.ScoreAttack) {
				// Score Attack
				if (Mutable.lines >= Mutable.lineLimit) {
					// not Auto, limit to 200 Lines
					isend = true;
				}
			} else if (Game.type === GameTypeEnum.Dig) {
				// Dig race
				if (Mutable.digLines.length === 0) {
					isend = true;
				}
			} else if (Game.type === GameTypeEnum.Master) {
				// 20G
				if (Mutable.lines >= 300) {
					// 200 + 100
					isend = true;
				}
			} else if (Game.type === 7) {
				// dig zen
				if (Mutable.lines >= 400) {
					// 300 + 100
					isend = true;
				}
			}
			if (isend) {
				Game.state = GameState.Win;
				$setText(Elements.msg, "GREAT!");
				piece.dead = true;
				menu(3);
				sound.playSFX("endingstart");
				sound.playvox("win");
			}
		}
	}
}

Game.addGameType(GameTypeEnum.Sprint, new Sprint());
Game.addGameType(GameTypeEnum.Marathon, new Marathon());
Game.addGameType(GameTypeEnum.ScoreAttack, new ScoreAttack());
Game.addGameType(GameTypeEnum.Dig, new Dig());
Game.addGameType(GameTypeEnum.Master, new Master());
Game.addGameType(GameTypeEnum.Retro, new Retro());
Game.addGameType(GameTypeEnum.Grades, new Grades());
Game.addGameType(GameTypeEnum.Survival, new Survival());
// Game.addGameType(GameTypeEnum.DigZen, new DigZen);
