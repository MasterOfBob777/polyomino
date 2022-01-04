import { menu } from "../../display/menu";

export function SettingsMenu() {
	return (
		<nav class="menu">
			<h1 class="boldish">Settings</h1>
			<a class="btn" onClick={() => menu(13)}>
				Tuning
			</a>
			<a class="btn" onClick={() => menu(15)}>
				Graphics
			</a>
			<a class="btn" onClick={() => menu(14)}>
				Audio
			</a>
			<a class="btn" onClick={() => menu(0)}>
				Back
			</a>
		</nav>
	);
}
