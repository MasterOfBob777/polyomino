import { Game } from "../../game";
import { makeSprite, nes } from "../../logic/view";
import { Elements, Mutable } from "../../utils/data";
import { GameType } from "../../utils/enums";
import { t } from "../../utils/lang";
import { timeString } from "../../utils/string";
import { $, $setText } from "../../utils/utils";

export function statistics() {
	const {
		timeCanvas,
		timeCtx,
	} = Elements;

	const time = timeString(Mutable.scoreTime || 0);

	const fsbl = 30; /* frameskip bar length */
	let skipL = Mutable.frameSkipped % (fsbl * 2);
	let skipR = Mutable.frameSkipped % (fsbl * 2);
	skipL = skipL - fsbl < 0 ? 0 : skipL - fsbl;
	skipR = skipR > fsbl ? fsbl : skipR;
	skipL = (skipL / fsbl) * timeCanvas.width;
	skipR = (skipR / fsbl) * timeCanvas.width;

	timeCtx.clearRect(0, 0, timeCanvas.width, timeCanvas.height);
	timeCtx.fillText(time, timeCanvas.width / 2, timeCanvas.height / 2);
	timeCtx.fillRect(skipL, timeCanvas.height - 0.2, skipR, timeCanvas.height);
}

/**
 * Draws the stats about the stack next to the tetrion.
 */
// /* farter */

export function statisticsStack() {
	const {
		statsPiece,
		statsLines,
		statsLevel,
		statsIpieces,
		statsScore,
	} = Elements;

	$setText(statsPiece, Mutable.piecesSet);

	const scoreEle = $("score");
	const scoreLabelEle = $("score-label");
	const newScoreEle = $("nesscore");
	const nesratetr = $("nesratetr");
	if (Game.type === GameType.Retro) {
		scoreEle.classList.add("gone");
		scoreLabelEle.classList.remove("gone");
		newScoreEle.classList.remove("gone");
		nesratetr.classList.remove("gone");
	} else if (Game.type === GameType.Grades) {
		scoreEle.classList.add("gone");
		scoreLabelEle.classList.add("gone");
	} else {
		scoreEle.classList.remove("gone");
		scoreLabelEle.classList.remove("gone");
		newScoreEle.classList.add("gone");
		nesratetr.classList.add("gone");
	}
	const levelEle = $("level");
	if (Game.type === GameType.Sprint || Game.type === GameType.ScoreAttack) {
		$setText(statsLines, Mutable.lineLimit - Mutable.lines);
		$setText(statsLevel, "");
	} else if (Game.type === GameType.Marathon || Game.type === 7) {
		$setText(statsLines, Mutable.lines);
		if (Game.params.noGravity != true) {
			levelEle.innerHTML = t("level", Mutable.level + 1);
		}
	} else if (Game.type === GameType.Retro) {
		$setText(statsLines, Mutable.lines);
		levelEle.innerHTML = t("level", Mutable.level + 1);
		if (Mutable.lineDrought < 13) {
			$setText(statsIpieces, Mutable.lineAmount);
		}
		if (Game.params.bType == true) {
			$setText(statsLines, Mutable.lineLimit - Mutable.lines);
		}
	} else if (Game.type === GameType.Master) {
		$setText(statsLines, Mutable.lines);
		levelEle.innerHTML = t("level_m", Mutable.level + 1);
	} else if (Game.type === GameType.Survival) {
		if (Game.params.digOffset || Game.params.digOffset !== 0) {
			$setText(statsLevel, Game.params.digOffset + "+");
		} else {
			$setText(statsLevel, "");
		}
		$setText(statsLines, Mutable.lines);
	} else if (Game.type === GameType.Grades) {
		$setText(statsLines, Mutable.lines);
		$setText(
			statsLevel,
			`${Mutable.leveltgmvisible}/${
				(Math.floor((Mutable.leveltgm / 100) % 10) + 1) * 100
			}`
		);
	}
	//else if (Game.type === GameType.Dig){
	// $setText(statsLines, Mutable.digLines.length);
	//}
	else {
		$setText(statsLines, Mutable.lines);
		$setText(statsLevel, "");
	}
	const holdTextEle = $("holdtext");
	if (Game.type !== 8) {
		holdTextEle.innerHTML = "<span class='white-border-span'>Hold</span>";
	} else {
		holdTextEle.innerHTML = "";
	}

	if (Game.type === GameType.Retro) {
		$("lineshower").classList.remove("gone");
	} else {
		$("lineshower").classList.add("gone");
	}

	if (Game.type !== GameType.Master) {
		$("rainbow").classList.add("gone");
	} else {
		// $("rainbow").classList.remove("gone");
	}

	if (Game.type === GameType.Retro && Game.params.retroSkin == true) {
		makeSprite();
		switch (
			parseInt(
				Mutable.level
					.toString()
					.charAt(Mutable.level.toString().length - 1)
			)
		) {
			case 0:
				nes[9] = ["#0058f8", "#ffffff"];
				nes[2] = ["#0058f8", "#ffffff00"];
				nes[7] = ["#3ebeff", "#ffffff00"];
				break;
			case 1:
				nes[9] = ["#00a800", "#ffffff"];
				nes[2] = ["#00a800", "#ffffff00"];
				nes[7] = ["#80d010", "#ffffff00"];
				break;
			case 2:
				nes[9] = ["#db00cd", "#ffffff"];
				nes[2] = ["#db00cd", "#ffffff00"];
				nes[7] = ["#f878f8", "#ffffff00"];
				break;
			case 3:
				nes[9] = ["#0058f8", "#ffffff"];
				nes[2] = ["#0058f8", "#ffffff00"];
				nes[7] = ["#5bdb57", "#ffffff00"];
				break;
			case 4:
				nes[9] = ["#e7005b", "#ffffff"];
				nes[2] = ["#e7005b", "#ffffff00"];
				nes[7] = ["#58f898", "#ffffff00"];
				break;
			case 5:
				nes[9] = ["#58f898", "#ffffff"];
				nes[2] = ["#58f898", "#ffffff00"];
				nes[7] = ["#6b88ff", "#ffffff00"];
				break;
			case 6:
				nes[9] = ["#f83800", "#ffffff"];
				nes[2] = ["#f83800", "#ffffff00"];
				nes[7] = ["#7f7f7f", "#ffffff00"];
				break;
			case 7:
				nes[9] = ["#6b47ff", "#ffffff"];
				nes[2] = ["#6b47ff", "#ffffff00"];
				nes[7] = ["#ab0023", "#ffffff00"];
				break;
			case 8:
				nes[9] = ["#0058f8", "#ffffff"];
				nes[2] = ["#0058f8", "#ffffff00"];
				nes[7] = ["#f83800", "#ffffff00"];
				break;
			case 9:
				nes[9] = ["#f83800", "#ffffff"];
				nes[2] = ["#f83800", "#ffffff00"];
				nes[7] = ["#ffa347", "#ffffff00"];
				break;
		}
	} else {
		nes[0] = ["#c1c1c1", "#ffffff00"];
		nes[1] = ["#3ebeff", "#ffffff"];
		nes[2] = ["#0058f8", "#ffffff00"];
		nes[3] = ["#f83800", "#ffffff00"];
		nes[4] = ["#ffa347", "#ffffff"];
		nes[5] = ["#80d010", "#ffffff00"];
		nes[6] = ["#db00cd", "#ffffff"];
		nes[7] = ["#ab0023", "#ffffff00"];
		nes[8] = ["#898989", "#ffffff00"];
		nes[9] = ["#0058f8", "#ffffff"];
	}
	/*
	const light = [
		"#ffffff",
		"#EFB08C",
		"#EDDD82",
		"#8489C7",
		"#FFDB94",
		"#EFAFC5",
		"#98DF6E",
		"#6FC5C5",
		"#9A7FD1",
		"#78D4A3",
	];
	statsScore.style.color = (Mutable.b2b === 0 ? '' : light[Mutable.b2b % 10]);
	statsScore.style.textShadow = (Scores.combo === 0 ? '' : ('0 0 0.5em ' + light[(Scores.combo - 1) % 10]));
	$setText(statsScore, scorestring(Mutable.score.toString(), 2));
	*/
	$setText(statsScore, (~~Mutable.newScore).toLocaleString());
}
