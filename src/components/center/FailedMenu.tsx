import { menu } from "../../display/menu";
import { Game } from "../../game";
import { showreplaydata, curreplaydata } from "../../leaderboard/replays";
import { t } from "../../utils/lang";
import { Btn } from "../utils/Btn";

export function FailedMenu() {
	return (
		<nav id="go" class="menu">
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
					<i class="material-icons">&#xE161;</i>
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
				<Btn click={() => menu(0)}>{t("menu-back")}</Btn>
			</div>
		</nav>
	);
}
