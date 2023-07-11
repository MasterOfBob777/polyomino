import { changeGameSetting } from "../../../../../display/menu";
import { createMenu } from "../../menuHooks";
import { Game } from "../../../../../game";
import { t } from "../../../../../utils/lang";
import { GroupSetting } from "../../../../settings/GroupSetting";
import { Btn } from "../../../../utils/Btn";
import { PBView } from "../../../../utils/PBView";
import { BackBtn } from "../../BackBtn";

export const { menu: DigMenu, button: DigMenuBtn, id: DIG_MENU_ID } = createMenu({
	title: "game-dig",
	icon: "rising-arrow",
}, () => {

	return (
		<>
			<h1 class="boldish">Dig</h1>
			<p class="no-margin">
				Clear the bottom as line as soon as possible
				<br />
				<PBView name="dig10pb" />
			</p>
	
			<GroupSetting
				setting="DigCheese"
				data={["Off", "On"]}
				selected={Game.settings.dig.checker.val ? 1 : 0}
				onClick={(index) => {
					changeGameSetting("dig", "checker", index);
				}}
			/>
	
			<GroupSetting
				setting="DigZen"
				data={["Off", "On"]}
				selected={Game.settings.dig.zen.val ? 1 : 0}
				onClick={(index) => {
					changeGameSetting("dig", "zen", index);
				}}
			/>
			<br />
	
			<Btn click={() => Game.init(4)} class="btn-inline width-50">
				{t("menu-start")}
			</Btn>
			<BackBtn />
		</>
	);
})
