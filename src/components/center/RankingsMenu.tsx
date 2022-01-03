import { menu } from "../../display/menu";

export function RankingsMenu() {
	return (
		<div id="leader" class="menu">
			<h2>Rankings</h2>

			<div id="leaderboard" />
			<div style="clear: both">
				<a class="btn" onClick={() => menu(undefined,-1)}>
					Back
				</a>
			</div>
		</div>
	);
}
