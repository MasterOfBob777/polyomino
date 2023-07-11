

import { scorestring } from "../random_stuff";
import { Elements } from "../utils/data";
import { $setText } from "../utils/utils";
import { showreplaydata } from "./replays";

export function XMLHTTP(url, obj, fun) {
	let xmlhttp = null;
	const handler = function () {
		fun(xmlhttp);
	};
	if (window.XMLHttpRequest) {
		// code for all new browsers
		xmlhttp = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		// code for IE5 and IE6
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if (xmlhttp != null) {
		xmlhttp.onreadystatechange = handler;
		xmlhttp.open("POST", url, true);
		xmlhttp.send(JSON.stringify(obj));
	} else {
		alert("Your browser does not support XMLHTTP.");
	}
}

export function handleranking(xmlhttp: XMLHttpRequest) {
	if (xmlhttp.readyState == 4) {
		// 4 = "loaded"
		if (xmlhttp.status == 200) {
			let res;
			try {
				res = JSON.parse(xmlhttp.responseText);
				if (res.msg === "fail") {
					$setText(Elements.leaderboard, "error: " + res.info);
				} else if (res.msg === "ok") {
					Elements.leaderboard.innerHTML = "";
					const ranks = res.ranks;
					const now = new Date().getTime();
					const gettimedifftext = function (t) {
						t = Math.round(t / (60 * 1000));
						if (t < 100) return t <= 0 ? "!" : t + "m";
						else if (t < 99 * 60) return Math.round(t / 60) + "h";
						else return Math.round(t / (60 * 24)) + "d";
					};
					const gettimetext = function (t) {
						let hs = Math.round(t / 10);
						let s = Math.floor(hs / 100);
						const m = Math.floor(s / 60);
						hs -= s * 100;
						s -= m * 60;
						if (m == 0) return `${s}.${(hs > 9 ? "" : "0") + hs}`;
						else if (m < 10)
							return `${m}:${(s > 9 ? "" : "0") + s}.${
								(hs > 9 ? "" : "0") + hs
							}`;
						else
							return `${m}:${(s > 9 ? "" : "0") + s}.${Math.floor(
								hs / 10
							)}`; //
					};
					const getlinetxt = function (l) {
						if (l < 1000) return l + "L";
						else return l + "";
					};
					const getscoretext = function (s) {
						const arr = s.split("");
						for (let i = arr.length - 1 - 3; i >= 0; i -= 3) {
							arr[i] += " ";
						}
						return arr.join("");
					};
					for (let i = 0; i < ranks.length; i++) {
						const div = document.createElement("div");
						const spanname = document.createElement("span");
						const spanlines = document.createElement("span");
						const spantime = document.createElement("span");
						const spandate = document.createElement("span");
						const spanscore = document.createElement("span");
						$setText(spanname, ranks[i].name);
						spanname.style.width = "6em";
						spanname.style["text-align"] = "left";
						$setText(spanlines, ranks[i].Mutable.lines + "L");
						spanlines.style.width = "2.5em";
						$setText(spantime, gettimetext(ranks[i].time));
						spantime.style.width = "4em";
						$setText(
							spandate,
							gettimedifftext(now - ranks[i].date)
						);
						spandate.style.width = "2.5em";
						spandate.style["font-weight"] = "normal";
						if (res.mode === "score") {
							$setText(spanscore, scorestring(ranks[i].score, 7));
							spanscore.style.width = "15em";
							spanscore.classList.add("rank-score");
						}

						div.appendChild(spanname);
						div.appendChild(spanlines);
						div.appendChild(spantime);
						div.appendChild(spandate);
						if (res.mode === "score") {
							div.appendChild(spanscore);
						}
						if (typeof res.ranks[i].replay === "string") {
							div.classList.add("has-replay");
							const replaykey = ranks[i].replay;
							const closure = function (a) {
								return a;
							};
							div.addEventListener(
								"click",
								(function (k) {
									return function () {
										fetchreplay(k);
									};
								})(replaykey)
							);
						}
						Elements.leaderboard.appendChild(div);
						if (res.mode === "score" && i + 1 === 5) {
							break;
						}
					}
				} else {
					$setText(
						Elements.leaderboard,
						`Problem retrieving leaderboard data\n${xmlhttp.status}\n${xmlhttp.readyState}\n${xmlhttp.statusText}\n${xmlhttp.responseText}`
					);
				}
			} catch (e) {
				$setText(
					Elements.leaderboard,
					// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
					`Problem retrieving leaderboard data\n${e}`
				);
			}
		}
	}
}
export function handlereplay(xmlhttp: XMLHttpRequest) {
	if (xmlhttp.readyState == 4) {
		// 4 = "loaded"
		if (xmlhttp.status == 200) {
			let res;
			try {
				res = JSON.parse(xmlhttp.responseText);
				if (res.msg === "fail") {
					alert(`error: ${res.info as string}`);
				} else if (res.msg === "ok") {
					showreplaydata(res.replay);
				} else {
					console.log(
						`Problem retrieving leaderboard data\n${xmlhttp.status}\n${xmlhttp.readyState}\n${xmlhttp.statusText}\n${xmlhttp.responseText}`
					);
				}
			} catch (e) {
				console.log(
					// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
					`Problem retrieving leaderboard data\n${e}`
				);
			}
		}
	}
}

const hostaddr = "http://farter.tk:8888";
//"http://localhost:8888";

export function submitscore(obj) {
	console.log(obj);
	XMLHTTP(hostaddr, obj, handleranking);
}
export function fetchreplay(key) {
	XMLHTTP(hostaddr, { req: "replay", replaykey: key }, handlereplay);
}
