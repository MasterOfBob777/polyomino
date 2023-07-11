import { changeGameSetting } from "../../../../../display/menu";
import { Game } from "../../../../../game";
import { t } from "../../../../../utils/lang";
import { createMenu } from "../../menuHooks";
import { GroupSetting } from "../../../../settings/GroupSetting";
import { Btn } from "../../../../utils/Btn";
import { PBView } from "../../../../utils/PBView";
import { BackBtn } from "../../BackBtn";

export const {
	button: SprintMenuBtn,
	menu: SprintMenu,
	id: SPRINT_MENU_ID,
} = createMenu({ title: "game-sprint", icon: "rising-arrow" }, () => {
	return (
		<>
			<h1 class="boldish">Sprint</h1>
			<p class="no-margin">
				Clear the lines as fast as you can!
				<br />
				<PBView name="sprint40pb" />
			</p>

			<div class="no-margin btn-container">
				<GroupSetting
					setting="SprintLimit"
					data={["40", "100", "200"]}
					selected={Game.settings.sprint.limit.val}
					onClick={(index) => {
						changeGameSetting("sprint", "limit", index);
					}}
				/>

				<GroupSetting
					setting="SprintPieceSet"
					data={["Standard", "No I", "I Only"]}
					selected={Game.settings.sprint.piece.val}
					onClick={(index) => {
						changeGameSetting("sprint", "piece", index);
					}}
				/>

				<GroupSetting
					setting="SprintBackfire"
					data={["Off", "Low", "Med", "High"]}
					selected={Game.settings.sprint.backfire.val}
					onClick={(index) => {
						changeGameSetting("sprint", "backfire", index);
					}}
				/>

				<br />

				<Btn click={() => Game.init(0)} class="btn-inline width-50">
					{t("menu-start")}
				</Btn>
				<BackBtn />
			</div>
		</>
	);
});

