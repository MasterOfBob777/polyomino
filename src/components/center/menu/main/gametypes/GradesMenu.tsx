import { changeGameSetting } from "../../../../../display/menu";
import { createMenu } from "../../menuHooks";
import { Game } from "../../../../../game";
import { t } from "../../../../../utils/lang";
import { GroupSetting } from "../../../../settings/GroupSetting";
import { Btn } from "../../../../utils/Btn";
import { BackBtn } from "../../BackBtn";

export const {
	button: GradesMenuBtn,
	menu:GradesMenu,
	id: GRADES_MENU_ID,
} = createMenu(
	{
		title: "game-grades",
		icon: "rising-arrow",
	},
	() => {
		return (
			<>
				<h1 class="boldish">Grades</h1>
				<p class="no-margin">
					<span style="color: red">UNFINISHED</span>
					<br />
					Play as fast as possible to earn the highest grade!
				</p>

				<GroupSetting
					setting="GradesGameRule"
					data={["Classic", "World"]}
					selected={Game.settings.grades.rule.val}
					onClick={(index) => {
						changeGameSetting("grades", "rule", index);
					}}
				/>

				<br />

				<Btn click={() => Game.init(9)} class="btn-inline width-50">
					{t("menu-start")}
				</Btn>
				<BackBtn />
			</>
		);
	}
);
