import { Howl, Howler } from "howler";
import { settings } from "../../settings";
import { lazy } from "../../utils/decorators";
import { $, $setText } from "../../utils/utils";

// TODO: integrate this into the refactored codebase

const piecetypes = "tgm,npm,tgm1,tetrjs".split(",");
const gametypes =
	"ppt,tgm,npm,yotipo,toj,nes,tf,99,com,party,ultimate,ace,tetrjs".split(",");

const voxtypes = ["alexey", "friends", "toj"];
const waveData = [
	{ path: "alarm", type: "fixed" },
	{ path: "bravo", type: "game" },
	{ path: "levelup", type: "game" },
	{ path: "step", type: "game" },
	{ path: "endingstart", type: "ui" },
	{ path: "erase1", type: "game" },
	{ path: "erase2", type: "game" },
	{ path: "erase3", type: "game" },
	{ path: "erase4", type: "game" },
	{ path: "gameover", type: "ui" },
	{ path: "garbage", type: "game" },
	{ path: "lock", type: "game" },
	{ path: "tspin0", type: "game" },
	{ path: "tspin1", type: "game" },
	{ path: "tspin2", type: "game" },
	{ path: "tspin3", type: "game" },
	{ path: "piece0", type: "piece" },
	{ path: "piece1", type: "piece" },
	{ path: "piece2", type: "piece" },
	{ path: "piece3", type: "piece" },
	{ path: "piece4", type: "piece" },
	{ path: "piece5", type: "piece" },
	{ path: "piece6", type: "piece" },
	{ path: "harddrop", type: "game" },
	{ path: "move", type: "game" },
	{ path: "rotate", type: "game" },
	{ path: "initialrotate", type: "game" },
	{ path: "hold", type: "game" },
	{ path: "initialhold", type: "game" },
	{ path: "ready", type: "ui" },
	{ path: "go", type: "ui" },
	{ path: "linefall", type: "game" },
	{ path: "b2b_erase4", type: "vox" },
	{ path: "b2b_tspin1", type: "vox" },
	{ path: "b2b_tspin2", type: "vox" },
	{ path: "b2b_tspin3", type: "vox" },
	{ path: "erase1", type: "vox" },
	{ path: "erase2", type: "vox" },
	{ path: "erase3", type: "vox" },
	{ path: "erase4", type: "vox" },
	{ path: "lose", type: "vox" },
	{ path: "ren1", type: "vox" },
	{ path: "ren2", type: "vox" },
	{ path: "ren3", type: "vox" },
	{ path: "tspin0", type: "vox" },
	{ path: "tspin1", type: "vox" },
	{ path: "tspin2", type: "vox" },
	{ path: "tspin3", type: "vox" },
	{ path: "win", type: "vox" },
	{ path: "ren/ren1", type: "game" },
	{ path: "ren/ren2", type: "game" },
	{ path: "ren/ren3", type: "game" },
	{ path: "ren/ren4", type: "game" },
	{ path: "ren/ren5", type: "game" },
	{ path: "ren/ren6", type: "game" },
	{ path: "ren/ren7", type: "game" },
	{ path: "ren/ren8", type: "game" },
	{ path: "ren/ren9", type: "game" },
	{ path: "ren/ren10", type: "game" },
	{ path: "ren/ren11", type: "game" },
	{ path: "ren/ren12", type: "game" },
	{ path: "ren/ren13", type: "game" },
	{ path: "ren/ren14", type: "game" },
	{ path: "ren/ren15", type: "game" },
	{ path: "ren/ren16", type: "game" },
	{ path: "ren/ren17", type: "game" },
	{ path: "ren/ren18", type: "game" },
	{ path: "ren/ren19", type: "game" },
	{ path: "ren/ren20", type: "game" },
	{ path: "b2b_erase4", type: "game" },
	{ path: "b2b_tspin1", type: "game" },
	{ path: "b2b_tspin2", type: "game" },
	{ path: "b2b_tspin3", type: "game" },
	{ path: "grade1", type: "bgm" },
	{ path: "grade2", type: "bgm" },
	{ path: "grade3", type: "bgm" },
	{ path: "marathon", type: "bgm" },
	{ path: "marathon2", type: "bgm" },
	{ path: "marathon3", type: "bgm" },
	{ path: "master", type: "bgm" },
	{ path: "masterstrictdire", type: "bgm" },
	{ path: "masterstrict", type: "bgm" },
	{ path: "retro", type: "bgm" },
	{ path: "retropro", type: "bgm" },
	{ path: "retroprodrought", type: "bgm" },
	{ path: "sprint", type: "bgm" },
	{ path: "survial", type: "bgm" },
	{ path: "survialdire", type: "bgm" },
];

class Eles {
	@lazy static get soundLoadingBar() {
		return $<HTMLProgressElement>("sound-loading-bar");
	}

	@lazy static get soundLabel() {
		return $("sound-name");
	}

	@lazy static get soundsLoading() {
		return $("sounds-loading");
	}
}

let sidebgmraised = false;
let soundsLoaded = 0;
function addToLoad(name) {
	soundsLoaded++;

	Eles.soundLoadingBar.value = soundsLoaded;
	$setText(Eles.soundLabel, name);
	if (Eles.soundLoadingBar.value === Eles.soundLoadingBar.max) {
		Eles.soundsLoading.classList.add("gone");
	}
}

class Sound2 {
	sounds = {};

	music = {};

	voices = {};

	currentMusicName;

	sideMusicName;

	currentMusic: any;

	sideMusic: any;

	soundLoaded = "";

	amountToLoad = 0;

	addSound(iname: string, path: string, loop?: boolean) {
		this.sounds[iname] = new Howl({
			src: [path],
			volume: settings.Volume / 100,
			loop: loop,
			onload() {
				addToLoad(this._src);
			},
			onloaderror() {
				console.error(`loading ${this._src} failed!`);
			},
		});
	}

	addVoice(iname: string, path: string) {
		this.voices[iname] = new Howl({
			src: [path],
			volume: settings.Volume / 100,
			onload() {
				addToLoad(this._src);
			},
		});
	}

	addMusic(iname: string, path: (type: "start" | "loop") => string) {
		this.music[iname + "start"] = new Howl({
			src: [path("start")],
			volume: settings.MusicVol / 100,
			onend: () => {
				this.currentMusic =
					this.music[this.currentMusicName + "loop"].play();
			},
		});
		this.music[iname + "loop"] = new Howl({
			src: [path("loop")],
			volume: settings.MusicVol / 100,
			loop: true,
		});
	}

	addSideMusic(iname: string, path: (type: "start" | "loop") => string) {
		this.music[iname + "start"] = new Howl({
			src: [path("start")],
			volume: 0,
			onend: () => {
				this.currentMusic =
					this.music[this.sideMusicName + "loop"].play();
			},
		});
		this.music[iname + "loop"] = new Howl({
			src: [path("loop")],
			volume: 0,
			loop: true,
		});
	}

	init() {
		const soundbank = settings.Soundbank;
		const nextType = settings.NextType;
		const voicebank = settings.Voicebank;
		const nextSound = settings.NextSound;
		const voice = settings.Voice;
		const sound = settings.Sound;

		if (
			`${soundbank} ${nextType} ${voicebank} ${nextSound} ${voice} ${sound}` ===
			this.soundLoaded
		) {
			return;
		}
		if (sound) {
			Eles.soundsLoading.classList.remove("gone");
		}
		soundsLoaded = 0;
		Eles.soundLoadingBar.value = 0;

		this.amountToLoad = waveData.length;
		Howler.unload();
		if (!sound) return;

		const navLanguage = navigator.language;
		const languageBase = navLanguage.substring(0, 2);

		for (const { path: iname, type } of waveData) {
			switch (type) {
				case "game":
					this.addSound(
						iname,
						`assets/sfx/game/${gametypes[soundbank]}/${iname}.wav`
					);
					break;
				case "vox":
					if (!voice) break;
					this.addVoice(
						iname,
						`assets/vox/${voxtypes[voicebank]}/${iname}.wav`
					);
					break;
				case "ui":
					this.addSound(
						iname,
						`assets/sfx/ui/${gametypes[soundbank]}/${iname}_${
							soundbank === 12 ? languageBase : ""
						}.wav`
					);
					break;
				case "piece":
					//TODO: clean up logic here
					if (nextSound) {
						let language = "";
						if (nextType === 3) {
							if (
								navLanguage === "ja" &&
								[
									"piece1",
									"piece2",
									"piece4",
									"piece6",
								].indexOf(iname) >= 0
							) {
								language = "_jp";
							} else if (
								(navLanguage === "en-US" ||
									navLanguage === "en") &&
								iname === "piece6"
							) {
								language = "_us";
							} else if (
								languageBase === "zh" &&
								iname === "piece6"
							) {
								language = "_us";
							} else if (languageBase === "es") {
								language = "_es";
								if (
									navLanguage === "es-ES" &&
									iname === "piece6"
								) {
									language += "_spain";
								}
							} else if (languageBase === "fr") {
								language = "_fr";
							}
						}
						this.addSound(
							iname,
							`assets/sfx/piece/${piecetypes[nextType]}/${iname}${language}.wav`
						);
					}
					break;
				case "bgm":
					this.addMusic(iname, (v) => `assets/bgm/${iname}${v}.ogg`);
					break;
				case "bgmside":
					this.addSideMusic(
						iname,
						(v) => `assets/bgm/${iname}${v}.ogg`
					);
					break;
				case "fixed":
					this.addSound(
						iname,
						`assets/sfx/fixed/${iname}.wav`,
						iname === "alarm"
					);
					break;
			}
		}
		this.soundLoaded = `${soundbank} ${nextType} ${voicebank} ${nextSound} ${voice} ${sound}`;
		Eles.soundLoadingBar.max =
			Object.keys(this.sounds).length + Object.keys(this.voices).length;
	}

	updateVolume() {
		for (const currentname in this.music) {
			this.music[currentname].volume(settings.MusicVol / 100);
		}
		for (const currentname in this.sounds) {
			this.sounds[currentname].volume(settings.Volume / 100);
		}
		for (const currentname in this.voices) {
			this.voices[currentname].volume(settings.Volume / 100);
		}
	}

	playSFX(name, arg?) {
		let noStop;
		if (name === "ren/ren") {
			noStop = true;
		}
		if (settings.Sound) {
			if (arg !== undefined) {
				name += arg;
			}

			if (noStop !== true) {
				this.sounds[name].stop();
			}
			this.sounds[name].play();
		}
	}

	playvox(name, arg?) {
		if (settings.Sound && settings.Voice) {
			if (arg !== undefined) {
				name += arg;
			}
			this.voices[name].stop();
			this.voices[name].play();
		}
	}

	stopSFX(name, arg?) {
		if (settings.Sound) {
			if (arg !== undefined) {
				name += arg;
			}
			this.sounds[name].stop();
		}
	}

	loadbgm(name, arg?) {
		if (settings.Sound) {
			if (arg !== undefined) {
				name += arg;
			}
			this.music[name + "start"] = new Howl({
				src: ["assets/bgm/" + name + "start.ogg"],
				volume: settings.MusicVol / 100,
				onend: () => {
					this.currentMusic =
						this.music[this.currentMusicName + "loop"].play();
				},
			});
			this.music[name + "loop"] = new Howl({
				src: ["assets/bgm/" + name + "loop.ogg"],
				volume: settings.MusicVol / 100,
				loop: true,
			});
		}
	}

	loadsidebgm(name, arg?) {
		if (settings.Sound) {
			if (arg !== undefined) {
				name += arg;
			}
			this.music[name + "start"] = new Howl({
				src: ["assets/bgm/" + name + "start.ogg"],
				volume: 0,
				onend: () => {
					this.sideMusic =
						this.music[this.sideMusicName + "loop"].play();
				},
			});
			this.music[name + "loop"] = new Howl({
				src: ["assets/bgm/" + name + "loop.ogg"],
				volume: 0,
				loop: true,
			});
		}
	}

	playbgm(name, arg?) {
		if (settings.Sound) {
			if (arg !== undefined) {
				name += arg;
			}
			this.currentMusicName = name;
			this.currentMusic = this.music[name + "start"].play();
		}
	}

	playsidebgm(name, arg?) {
		if (settings.Sound) {
			if (arg !== undefined) {
				name += arg;
			}
			this.sideMusicName = name;
			this.sideMusic = this.music[name + "start"].play();
		}
	}

	killbgm() {
		if (settings.Sound) {
			for (const currentname in this.music) {
				this.music[currentname].stop();
			}
		}
	}

	raisesidebgm() {
		sound.syncbgm();
		if (settings.Sound) {
			if (sidebgmraised === false) {
				this.music[this.sideMusicName + "start"].fade(
					0,
					settings.MusicVol / 100,
					500
				);
				this.music[this.sideMusicName + "loop"].fade(
					0,
					settings.MusicVol / 100,
					500
				);
				sidebgmraised = true;
			}
		}
	}

	lowersidebgm() {
		if (!settings.Sound && !sidebgmraised) {
			return;
		}
		const vol = settings.MusicVol;
		const musName = this.sideMusicName;

		// TODO: figure out why this can be undefined
		if (musName) {
			this.music[musName + "start"].fade(vol / 100, 0, 500);
			this.music[musName + "loop"].fade(vol / 100, 0, 500);

			sidebgmraised = false;
		}
	}

	cutsidebgm() {
		if (!settings.Sound && sidebgmraised !== true) return;

		const vol = settings.MusicVol;
		const musName = this.sideMusicName;

		this.music[musName + "start"].fade(vol / 100, 0, 1);
		this.music[musName + "loop"].fade(vol / 100, 0, 1);
		sidebgmraised = false;
	}

	mutebgm() {
		if (settings.Sound) {
			for (const currentname in this.music) {
				this.music[currentname].mute(true);
			}
		}
	}

	unmutebgm() {
		if (settings.Sound) {
			for (const currentname in this.music) {
				this.music[currentname].mute(false);
			}
		}
	}

	seekbgm(arg?) {
		if (settings.Sound) {
			for (const currentname in this.music) {
				console.log(this.music[currentname].seek());
				this.music[currentname].seek(arg);
			}
		}
	}

	seeksidebgm(arg) {
		if (settings.Sound) {
			this.music[this.sideMusicName + "start"].seek(arg);
			this.music[this.sideMusicName + "loop"].seek(arg);
		}
	}

	syncbgm(arg?) {
		if (settings.Sound) {
			this.music[this.sideMusicName + "start"].seek(
				this.music[this.currentMusicName + "start"].seek()
			);
			this.music[this.sideMusicName + "loop"].seek(
				this.music[this.currentMusicName + "loop"].seek()
			);
		}
	}
}

export const sound = new Sound2();
