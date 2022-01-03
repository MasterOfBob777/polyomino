import { changeGameSetting, menu } from "../../display/menu";
import { Game } from "../../game";
import { t } from "../../utils/lang";
import { GroupSetting } from "../settings/GroupSetting";
import { Btn } from "../utils/Btn";

export function MarathonMenu() {
	return (
		<nav class="menu">
			<h1 class="boldish">Marathon</h1>
			<p class="no-margin">Standard game. Aim for a high score.</p>
			
			<GroupSetting
				setting="MarathonGoal"
				data={["150", "200", "300", "Endless"]}
				selected={Game.settings.marathon.limit.val}
				onClick={(index) => {
					changeGameSetting("marathon", "limit", index);
				}}
			/>

			<GroupSetting
				setting="MarathonLevelCap"
				data={["Off", "On"]}
				selected={Game.settings.marathon.cap.val}
				onClick={(index) => {
					changeGameSetting("marathon", "cap", index);
				}}
			/>

			<GroupSetting
				setting="MarathonEntryDelay"
				data={["None", "Short", "Long"]}
				selected={Game.settings.marathon.delay.val}
				onClick={(index) => {
					changeGameSetting("marathon", "delay", index);
				}}
			/>

			<GroupSetting
				setting="MarathonNoGravity"
				data={["Off", "On"]}
				selected={Game.settings.marathon.nograv.val}
				onClick={(index) => {
					changeGameSetting("marathon", "nograv", index);
				}}
			/>

			<GroupSetting
				setting="MarathonInvisible"
				data={["Off", "On"]}
				selected={Game.settings.marathon.invisible.val}
				onClick={(index) => {
					changeGameSetting("marathon", "invisible", index);
				}}
			/>

			<br />

			<Btn click={() => Game.init(1)} class="btn-inline width-50">
				{t("menu-start")}
			</Btn>
			<Btn click={() => menu(undefined, -1)} class="btn-inline width25-7">
				{t("menu-back")}
			</Btn>
		</nav>
	);
}
