import { BackBtn } from "../../BackBtn";
import { createMenu } from "../../menuHooks";
import { AudioMenuBtn } from "./AudioMenu";
import { ControlsMenuBtn } from "./ControlsMenu";
import { GraphicsMenuBtn } from "./GraphicsMenu";
import { TuningMenuBtn } from "./TuningMenu";

export const { button: SettingsMenuBtn, menu: SettingsMenu, id: SETTINGS_MENU_ID } = createMenu({
	title: "menu-settings",
	icon: "wrench",
}, () => {
	return (
		<>
			<h1 class="boldish">Settings</h1>
			<ControlsMenuBtn op={1} />
			<TuningMenuBtn op={1} />
			<GraphicsMenuBtn op={1} />
			<AudioMenuBtn op={1} />
			<BackBtn />
		</>
	);

}) 