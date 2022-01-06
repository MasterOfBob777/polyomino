import { changeGameSetting, menu } from "../../display/menu";
import { Game } from "../../game";
import { padZero } from "../../utils/string";
import { range } from "../../utils/utils";
import { GroupSetting } from "../settings/GroupSetting";

export function RetroMenu() {
	return (
		<nav class="menu">
			<h1 class="boldish">Retro</h1>
			<p class="no-margin">Classic game with a variety of options.</p>
			<div class="no-margin btn-container">
				<GroupSetting
					setting="RetroGameType"
					data={["A-Type", "B-Type"]}
					selected={Game.settings.retro.type.val}
					onClick={(index) => {
						changeGameSetting("retro", "type", index);
					}}
				/>

				{/*TODO: Change this into a jsx component */}
				<h4 class="option-header">Starting Level</h4>
				<p class="option-description">Choose a level to start</p>

				<GroupSetting
					setting="RetroStartingLevel"
					data={range(0,20).map(v => padZero(v))}
					selected={Game.settings.retro.level.val}
					onClick={(index) => {
						changeGameSetting("retro", "level", index);
					}}
				/>

				<GroupSetting
					setting="RetroHardDrop"
					data={["Off", "On"]}
					selected={Game.settings.retro.drop.val}
					onClick={(index) => {
						changeGameSetting("retro", "drop", index);
					}}
				/>

				<GroupSetting
					setting="RetroFlashing"
					data={["Off", "On"]}
					selected={Game.settings.retro.flash.val}
					onClick={(index) => {
						changeGameSetting("retro", "flash", index);
					}}
				/>
				<br />

				<a
					class="btn btn-inline width-50"
					onClick={() => Game.init(8, { proMode: false })}
				>
					Start
				</a>
				<a
					class="btn btn-inline width25-7"
					onClick={() => menu(undefined, -1)}
				>
					Back
				</a>
			</div>
		</nav>
	);
}
