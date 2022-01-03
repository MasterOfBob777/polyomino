import { menu } from "../../display/menu";
import { sound } from "../../display/sound/sound";
import { tryreplaydata } from "../../leaderboard/replays";

export function ReplayMenu() {
	return (
		<nav id="replay" class="menu">
			<h2>Replay</h2>

			<p>Ctrl+C / Ctrl+V</p>
			<textarea id="replaydata" spellcheck={false} />
			<ul>
				<li>
					<a
						class="btn"
						onClick={() => {
							tryreplaydata();
							sound.init();
						}}
					>
						Watch
					</a>
				</li>
				<li>
					<a class="btn" onClick={() => menu(undefined, -1)}>
						Back
					</a>
				</li>
			</ul>
		</nav>
	);
}
