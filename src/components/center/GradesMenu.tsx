import { changeGameSetting, menu } from "../../display/menu";
import { Game } from "../../game";
import { t } from "../../utils/lang";
import { GroupSetting } from "../settings/GroupSetting";
import { Btn } from "../utils/Btn";

export function GradesMenu() {
	return (
		<nav class="menu">
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
			<Btn click={() => menu(undefined, -1)} class="btn-inline width25-7">
				{t("menu-back")}
			</Btn>
		</nav>
	);
}
