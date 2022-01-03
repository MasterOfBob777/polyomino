import { menu } from "../../display/menu";
import { AudioMenu } from "./AudioMenu";
import { ControlsMenu } from "./ControlsMenu";
import { DigMenu } from "./DigMenu";
import { FailedMenu } from "./FailedMenu";
import { GradesMenu } from "./GradesMenu";
import { GraphicsMenu } from "./GraphicsMenu";
import { MainMenu } from "./MainMenu";
import { MarathonMenu } from "./MarathonMenu";
import { MasterMenu } from "./MasterMenu";
import { PauseMenu } from "./PauseMenu";
import { RankingsMenu } from "./RankingsMenu";
import { ReplayMenu } from "./ReplayMenu";
import { RetroMenu } from "./RetroMenu";
import { SettingsMenu } from "./SettingsMenu";
import { SprintMenu } from "./SprintMenu";
import { SurvialMenu } from "./SurvialMenu";
import { TuningMenu } from "./TuningMenu";

export function SectionMiddle() {
	return (
		<div id="b">
			<canvas id="bgStack" />
			<canvas id="stack">
				You need an up-to-date web browser to play this game.
			</canvas>
			<canvas id="active" />

			<div id="msgdiv">
				<span id="msg" />
			</div>

			<div id="cleardiv">
				<span id="clear" />
			</div>

			<div id="rendiv">
				<span id="renmsg" />
			</div>
			<div id="b2bdiv">
				<span id="b2bmsg" />
			</div>

			<MainMenu />

			<div class="menu">
				<h2 id="settings-button">Settings</h2>

				<div id="settings" />
				<div id="settings-done">
					<a class="btn" onClick={() => menu(0)}>
						Done
					</a>
				</div>
			</div>

			<ControlsMenu />
			<FailedMenu />
			<PauseMenu />
			<RankingsMenu />
			<ReplayMenu />

			<DigMenu />
			<RetroMenu />
			<SprintMenu />
			<MarathonMenu />
			<MasterMenu />
			<SettingsMenu />
			<TuningMenu />
			<AudioMenu />
			<GraphicsMenu />
			<SurvialMenu />
			<GradesMenu />
		</div>
	);
}
