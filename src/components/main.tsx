import { useEffect } from "preact/hooks";
import { MAIN_MENU_ID } from "./center/menu/MainMenu";
import { menu } from "./center/menu/menuHooks";
import { SectionMiddle } from "./center/SectionMiddle";
import { SectionLeft } from "./left/SectionLeft";
import { SectionRight } from "./right/SectionRight";

export default function MainComponent() {
	useEffect(() => {
		menu(MAIN_MENU_ID, 1);
	}, [])


	return (
		<>
		{/* TODO: Flex layout */}
			<SectionLeft />

			<SectionMiddle />

			<SectionRight />
		</>
	);
}
