import { changeGameSetting } from "../../../../../display/menu";
import { Game } from "../../../../../game";
import { t } from "../../../../../utils/lang";
import { createMenu } from "../../menuHooks";
import { GroupSetting } from "../../../../settings/GroupSetting";
import { Btn } from "../../../../utils/Btn";
import { BackBtn } from "../../BackBtn";

export const {
	button: SurvialMenuBtn,
	menu: SurvialMenu,
	id: SURVIAL_MENU_ID,
} = createMenu(
	{
		title: "game-survival",
		icon: "rising-arrow",
	},
	() => {
		return (
			<>
				<h1 class="boldish">Survival</h1>
				<p class="no-margin">
					Clear the bottom as line as soon as possible
				</p>

				<GroupSetting
					setting="SurvivalZenMode"
					data={["Off", "On"]}
					selected={Game.settings.survival.zen.val}
					onClick={(index) => {
						changeGameSetting("survival", "zen", index);
					}}
				/>

				<GroupSetting
					setting="SurvivalStartingLevel"
					data={["0", "500", "1000", "1500", "2000"]}
					selected={Game.settings.survival.slevel.val}
					onClick={(index) => {
						changeGameSetting("survival", "slevel", index);
					}}
				/>
				<br />

				<Btn click={() => Game.init(3)} class="btn-inline width-50">
					{t("menu-start")}
				</Btn>
				<BackBtn />
			</>
		);
	}
);
