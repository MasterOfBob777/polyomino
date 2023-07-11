import { menu } from "../../display/menu";
import { Game } from "../../game";

export function PauseMenu() {
	return (
		<nav id="pause" class="menu">
			<div class="btn-container btn-container-bottom">
				<a class="btn" onClick={() => Game.unpause()}>
					Resume
				</a>
				<a class="btn" onClick={() => Game.init(Game.type,Game.params)}>
					Restart
				</a>
				<a class="btn" onClick={() => menu(0)}>
					Main Menu
				</a>
			</div>
		</nav>
	);
}
