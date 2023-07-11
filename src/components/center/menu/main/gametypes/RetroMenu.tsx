import { changeGameSetting } from "../../../../../display/menu";
import { createMenu } from "../../menuHooks";
import { Game } from "../../../../../game";
import { GameType } from "../../../../../utils/enums";
import { padZero } from "../../../../../utils/string";
import { range } from "../../../../../utils/utils";
import { GroupSetting } from "../../../../settings/GroupSetting";
import { BackBtn } from "../../BackBtn";

export const {
	button: RetroMenuBtn,
	menu: RetroMenu,
	id: RETRO_MENU_ID,
} = createMenu(
	{
		title: "game-retro",
		icon: "rising-arrow",
	},
	() => {
		return (
			<>
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

					<GroupSetting
						setting="RetroStartingLevel"
						data={range(0, 20).map((v) => padZero(v))}
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
						onClick={() => Game.init(GameType.Retro)}
					>
						Start
					</a>
					<BackBtn />
				</div>
			</>
		);
	}
);
