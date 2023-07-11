import { Game } from "../game";
import { settings } from "../settings";
import { Mutable } from "../utils/data";
import { GameState, GameType } from "../utils/enums";
import { curreplaydata } from "./replays";
import { submitscore } from "./ranking";

let playername;

export function requireplayername() {
	if (playername === undefined)
		playername = prompt(
			"Enter your name for leaderboard\n('cancel' = anonymous):\n请输入上榜大名：",
			""
		);
	if (playername === null) playername = "anonymous";
	if (playername === "") playername = "unnamed";
}

export function trysubmitscore() {
	if (Mutable.watchingReplay) return;
	const obj: any = {
		req: "ranking",
	};
	const time = Mutable.scoreTime;

	const { params } = Game;
	if (Game.type === GameType.Sprint) {
		// 40L
		obj.mode =
			"sprint" +
			(params?.pieceSet ? ["", "noi", "alli"][params.pieceSet] : "") +
			(params?.backFire
				? ["", "bf1", "bf2", "bf3"][params.backFire]
				: "");
	} else if (Game.type === GameType.Survival)
		// dig
		obj.mode = "dig" + (params?.digOffset ? params.digOffset : "");
	else if (Game.type === GameType.Dig)
		// dig race
		obj.mode =
			"digrace" + (params?.digraceType ? params.digraceType : "checker");
	else if (Game.type === GameType.Marathon)
		// marathon
		obj.mode = "marathon";
	else if (Game.type === GameType.ScoreAttack)
		// score attack
		obj.mode = "score";
	else if (Game.type === GameType.Master)
		// 20g
		obj.mode = "marathon20g";
	else if (Game.type === 7)
		// dig zen
		obj.mode = "digzen";
	else return;

	if (
		(Game.type === GameType.Sprint && Game.state === GameState.Win) ||
		(Game.type === GameType.Survival && Game.state === GameState.Loss) ||
		(Game.type === GameType.Dig && Game.state === GameState.Win) ||
		(Game.type === GameType.Marathon && settings.Gravity === 0) ||
		Game.type === GameType.ScoreAttack ||
		Game.type === GameType.Master ||
		Game.type === 7 ||
		false
	) {
		requireplayername();
		obj.lines = Mutable.lines;
		obj.time = time;
		obj.score = Mutable.score.toString();
		obj.name = playername;
		obj.replay = curreplaydata();

		submitscore(obj);
	} else {
		submitscore(obj);
	}
}
