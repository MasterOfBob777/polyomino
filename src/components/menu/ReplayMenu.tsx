import { sound } from "../../display/sound/sound";
import { tryreplaydata } from "../../leaderboard/replays";
import { BackBtn } from "../center/menu/BackBtn";
import { createMenu } from "../center/menu/menuHooks";

export const {
	button: ReplayMenuBtn,
	menu: ReplayMenu,
	id: REPLAY_MENU_ID,
} = createMenu(
	{
		title: "menu-replay",
		icon: "replay",
	},
	() => {
		return (
			<>
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
						<BackBtn />
					</li>
				</ul>
			</>
		);
	}
);
