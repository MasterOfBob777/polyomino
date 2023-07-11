import { menu } from "../display/menu";
import { Game } from "../game";
import { settings } from "../settings";
import { Mutable } from "../utils/data";
import { rng } from "../utils/randomizer";
import { $ } from "../utils/utils";

// TODO: refactor this to death

const replaydata = $<HTMLInputElement>("replaydata");

export function tryreplaydata() {
	/*
	var strreplay = prompt("Paste replay data here: 在此贴入录像数据：");
	if (strreplay === null)
	return;
	*/
	const strreplay = replaydata.value;
	Game.init("replay", strreplay);
}

export function showreplaydata(strreplay) {
	/*
	var objblob = new Blob([strreplay],{type:"text/plain"});
	var url=URL.createObjectURL(objblob);
	window.open(url);
	*/
	replaydata.value = strreplay;
	replaydata.select();
	menu(6, 1);
}

export function curreplaydata() {
	//var strreplay = Compress(JSON.stringify(replay));
	const objKeys = Mutable.replay.keys;
	Mutable.replay.keys = keysEncode(Mutable.replay.keys);
	const strreplay = JSON.stringify(Mutable.replay);
	Mutable.replay.keys = objKeys;
	//strreplay = strreplay + Compress(strreplay);
	return strreplay;
}

export function run(params) {
	Mutable.watchingReplay = true;
	if (params !== undefined) {
		try {
			if (typeof params !== "string") throw "wtf";
			if (params === "" || params.slice(0, 1) !== "{")
				throw "please paste replay data, correctly...";
			Mutable.replay = JSON.parse(params);
			if (typeof Mutable.replay !== "object") throw "json parse fail";
			if (
				Mutable.replay.type === undefined ||
				Mutable.replay.keys === undefined ||
				Mutable.replay.settings === undefined ||
				Mutable.replay.seed === undefined
			) {
				throw "something's missing...";
			}
			Mutable.replay.keys = keysDecode(Mutable.replay.keys);
			if (Mutable.replay.keys === null) throw "keys decode fail";
		} catch (e) {
			alert("invalid replay data... 回放数据有误...\n" + e.toString());
			return;
		}
	}
	Game.type = Mutable.replay.type;
	Game.params = Mutable.replay.params;
	settings.setSettings("replay", Mutable.replay.settings); // by reference
	rng.seed = Mutable.replay.seed;
}
