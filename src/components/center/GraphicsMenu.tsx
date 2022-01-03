import { menu } from "../../display/menu";
import { makeSprite } from "../../logic/view";
import { settings } from "../../settings";
import { getStringKeys } from "../../utils/enum";
import { Size, Block, Outline, Ghost } from "../../utils/enums";
import { t } from "../../utils/lang";
import { GroupListSetting } from "../settings/GroupListSetting";
import { GroupSetting } from "../settings/GroupSetting";
import { GroupSliderSetting } from "../settings/GroupSliderSetting";
import { Btn } from "../utils/Btn";

export function GraphicsMenu() {
	return (
		<nav class="menu">
			<h1 class="boldish">Graphics</h1>

			<GroupListSetting
				setting="Size"
				data={getStringKeys(Size)}
				selected={settings.Size}
				onClick={(index) => {
					settings.Size = index;
				}}
			/>

			<GroupSliderSetting
				setting="Next"
				max={6}
				min={0}
				step={1}
				value={settings.Next}
				onInput={(value) => {
					settings.Next = value;
				}}
				getName={(index) =>
					index != 0 ? `${index} PIECES` : "DISABLED"
				}
			/>

			<GroupSetting
				setting="NextSide"
				data={["Left", "Right"]}
				selected={settings.NextSide ? 1 : 0}
				onClick={(index) => {
					settings.NextSide = index == 1;
				}}
			/>

			<GroupListSetting
				setting="Block"
				data={getStringKeys(Block)}
				selected={settings.Block}
				onClick={(index) => {
					settings.Block = index;
					makeSprite();
				}}
			/>

			<canvas id="sprite" />

			<GroupSetting
				setting="Monochrome"
				data={["Off", "On"]}
				selected={settings.Monochrome ? 1 : 0}
				onClick={(index) => {
					settings.Monochrome = index == 1;
				}}
			/>

			<GroupSetting
				setting="Outline"
				data={getStringKeys(Outline)}
				selected={settings.Outline}
				onClick={(index) => {
					settings.Outline = index;
				}}
			/>

			<GroupSetting
				setting="Ghost"
				data={getStringKeys(Ghost)}
				selected={settings.Ghost}
				onClick={(index) => {
					settings.Ghost = index;
				}}
			/>

			<GroupSetting
				setting="Grid"
				data={["Off", "On"]}
				selected={settings.Grid ? 1 : 0}
				onClick={(index) => {
					settings.Grid = index == 1;
				}}
			/>

			<GroupSetting
				setting="Messages"
				data={["Off", "On"]}
				selected={settings.Messages ? 1 : 0}
				onClick={(index) => {
					settings.Messages = index == 1;
				}}
			/>

			<GroupSetting
				setting="MatrixSway"
				data={["Off", "On"]}
				selected={settings.MatrixSway ? 1 : 0}
				onClick={(index) => {
					settings.MatrixSway = index == 1;
				}}
			/>

			<GroupSetting
				setting="InitialVis"
				data={["Off", "On"]}
				selected={settings.InitialVis ? 1 : 0}
				onClick={(index) => {
					settings.InitialVis = index == 1;
				}}
			/>

			<br />

			<Btn click={() => menu(12)}>{t("menu-back")}</Btn>
		</nav>
	);
}
