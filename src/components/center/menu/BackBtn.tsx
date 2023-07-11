import { t } from "../../../utils/lang";
import { menu } from "./menuHooks";
import { Btn } from "../../utils/Btn";


export function BackBtn() {
	return <Btn click={() => menu(undefined, -1)}>
		{t("menu-back")}
	</Btn>
}