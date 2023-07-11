import { Game } from "../../../../../game";
import { curreplaydata, showreplaydata } from "../../../../../leaderboard/replays";
import { t } from "../../../../../utils/lang";
import { createMenu, menu } from "../../menuHooks";
import { Btn } from "../../../../utils/Btn";
import { MAIN_MENU_ID } from "../../MainMenu";
import { Icon } from "../../../../utils/Icon";

export const { menu: FailedMenu, id: FAILED_MENU_ID } = createMenu({
	title: "none",
}, () => {

	return (
		<>
			<div class="btn-container btn-container-bottom">
				<Btn click={() => Game.init(Game.type, Game.params)}>
					{t("menu-retry")}
				</Btn>
				<Btn
					click={() => Game.init("replay")}
					class="btn-inline width-50"
				>
					{t("menu-replay")}
				</Btn>
				<Btn
					click={() => showreplaydata(curreplaydata())}
					class="btn-inline width25-7"
				>
					<Icon id="save" />
				</Btn>
				{/*
				<a
					class="btn highlight"
					onclick="menu(5,1);this.classList.remove('highlight')"
				>
					Rankings
				</a>
				Commented out rankings because they don't work
				*/}
				<Btn click={() => Game.init(1)} class="btn-inline width-50">
					{t("menu-start")}
				</Btn>
				<Btn click={() => menu(MAIN_MENU_ID)}>{t("menu-back")}</Btn>
			</div>
		</>
	);
});