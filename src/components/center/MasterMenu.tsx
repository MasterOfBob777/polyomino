import { changeGameSetting, menu } from "../../display/menu";
import { Game } from "../../game";
import { t } from "../../utils/lang";
import { GroupSetting } from "../settings/GroupSetting";
import { Btn } from "../utils/Btn";

export function MasterMenu() {
	return (
		<nav class="menu">
			<h1 class="boldish">Master</h1>
			<p class="no-margin">Super-fast game. Aim for 300 lines.</p>

			<GroupSetting 
				setting="MasterLock"
				data={["Forgiving", "Limited", "Strict"]}
				selected={Game.settings.master.lock.val}
				onClick={(index) => {
					changeGameSetting('master', 'lock', index)
				}}
			/>

			<br />

			<Btn click={() => Game.init(6)} class="btn-inline width-50">
				{t("menu-start")}
			</Btn>
			<Btn click={() => menu(undefined, -1)} class="btn-inline width25-7">
				{t("menu-back")}
			</Btn>
		</nav>
	);
}
