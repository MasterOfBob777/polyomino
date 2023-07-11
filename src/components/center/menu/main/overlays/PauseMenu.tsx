import { createMenu, menu } from "../../menuHooks";
import { Game } from "../../../../../game";
import { MAIN_MENU_ID } from "../../MainMenu";

export const { menu: PauseMenu, id: PAUSE_MENU_ID } = createMenu({
	title: "none",
	id: "pause",
}, () => {
	return (
		<>
			<div class="btn-container btn-container-bottom">
				<a class="btn" onClick={() => Game.unpause()}>
					Resume
				</a>
				<a class="btn" onClick={() => Game.init(Game.type,Game.params)}>
					Restart
				</a>
				<a class="btn" onClick={() => menu(MAIN_MENU_ID)}>
					Main Menu
				</a>
			</div>
		</>
	);
});