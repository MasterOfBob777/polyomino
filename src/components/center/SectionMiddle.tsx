import { AudioMenu } from "./menu/main/settings/AudioMenu";
import { ControlsMenu } from "./menu/main/settings/ControlsMenu";
import { DigMenu } from "./menu/main/gametypes/DigMenu";
import { FailedMenu } from "./menu/main/overlays/FailedMenu";
import { GradesMenu } from "./menu/main/gametypes/GradesMenu";
import { GraphicsMenu } from "./menu/main/settings/GraphicsMenu";
import { MainMenu } from "./menu/MainMenu";
import { MarathonMenu } from "./menu/main/gametypes/MarathonMenu";
import { MasterMenu } from "./menu/main/gametypes/MasterMenu";
import { PauseMenu } from "./menu/main/overlays/PauseMenu";
import { RankingsMenu } from "./menu/main/overlays/RankingsMenu";
import { ReplayMenu } from "./menu/main/overlays/ReplayMenu";
import { RetroMenu } from "./menu/main/gametypes/RetroMenu";
import { SettingsMenu } from "./menu/main/settings/SettingsMenu";
import { SprintMenu } from "./menu/main/gametypes/SprintMenu";
import { SurvialMenu } from "./menu/main/gametypes/SurvialMenu";
import { TuningMenu } from "./menu/main/settings/TuningMenu";

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

			<MainMenu  />

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
