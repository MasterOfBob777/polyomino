import { createMenu } from "./menuHooks";
import { version } from "../../../utils/data";
import { SprintMenuBtn } from "./main/gametypes/SprintMenu";
import { MarathonMenuBtn } from "./main/gametypes/MarathonMenu";
import { MasterMenuBtn } from "./main/gametypes/MasterMenu";
import { RetroMenuBtn } from "./main/gametypes/RetroMenu";
import { DigMenuBtn } from "./main/gametypes/DigMenu";
import { SurvialMenuBtn } from "./main/gametypes/SurvialMenu";
import { GradesMenuBtn } from "./main/gametypes/GradesMenu";
import { SettingsMenuBtn } from "./main/settings/SettingsMenu";
import { ReplayMenuBtn } from "./main/overlays/ReplayMenu";

export const { menu: MainMenu, id: MAIN_MENU_ID } = createMenu(
	{
		title: "none",
	},
	() => {
		return (
			<>
				{/*
				<img
					class="no-margin"
					width="72%"
					src="tetrjslogoenhanced.svg"
				/> 
				*/}
				<h1 style="font-weight: 4; font-size: 2rem; margin: 0px">
					Polyomino
				</h1>
				<p class="no-margin">
					{version}
					{/*
					<a class="link" href="changelog.html">
						(view changelog)
					</a>
					*/}
				</p>

				<div class="btn-container no-margin">
					<a
						class="btn btn-inline"
						target="_blank"
						rel="noreferrer"
						href="javascript:void(0)"
					>
						Discord
					</a>

					<div class="spacer" />

					<SprintMenuBtn op={1} />
					<MarathonMenuBtn op={1} />
					<MasterMenuBtn op={1} />
					<RetroMenuBtn op={1} />
					<DigMenuBtn op={1} />
					<SurvialMenuBtn op={1} />
					<GradesMenuBtn op={1} />

					<div class="spacer" />

					<SettingsMenuBtn op={1} />
					<ReplayMenuBtn op={1} />
				</div>
			</>
		);
	}
);
