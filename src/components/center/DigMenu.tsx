import { changeGameSetting, menu } from "../../display/menu";
import { Game } from "../../game";
import { t } from "../../utils/lang";
import { GroupSetting } from "../settings/GroupSetting";
import { Btn } from "../utils/Btn";

export function DigMenu() {
	return (
		<nav class="menu">
			<h1 class="boldish">Dig</h1>
			<p class="no-margin">
				Clear the bottom as line as soon as possible
			</p>

			<GroupSetting
				setting="DigCheckered"
				data={["Off", "On"]}
				selected={Game.settings.dig.checker.val ? 1 : 0}
				onClick={(index) => {
					changeGameSetting("dig", "checker", index);
				}}
			/>
			<br />
			
			<Btn click={() => Game.init(4)} class="btn-inline width-50">
				{t("menu-start")}
			</Btn>
			<Btn click={() => menu(undefined, -1)} class="btn-inline width25-7">
				{t("menu-back")}
			</Btn>
		</nav>
	);
}
