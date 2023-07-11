import { changeGameSetting } from "../../../../../display/menu";
import { createMenu } from "../../menuHooks";
import { Game } from "../../../../../game";
import { t } from "../../../../../utils/lang";
import { GroupSetting } from "../../../../settings/GroupSetting";
import { Btn } from "../../../../utils/Btn";
import { BackBtn } from "../../BackBtn";

export const {
	menu: MasterMenu,
	button: MasterMenuBtn,
	id: MASTER_MENU_ID,
} = createMenu(
	{
		title: "game-master",
		icon: "rising-arrow",
	},
	() => {
		return (
			<>
				<h1 class="boldish">Master</h1>
				<p class="no-margin">Super-fast game. Aim for 300 lines.</p>

				<GroupSetting
					setting="MasterLock"
					data={["Forgiving", "Limited", "Strict"]}
					selected={Game.settings.master.lock.val}
					onClick={(index) => {
						changeGameSetting("master", "lock", index);
					}}
				/>

				<br />

				<Btn click={() => Game.init(6)} class="btn-inline width-50">
					{t("menu-start")}
				</Btn>
				<BackBtn />
			</>
		);
	}
);