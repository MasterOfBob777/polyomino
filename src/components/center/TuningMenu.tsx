import { menu } from "../../display/menu";
import { settings } from "../../settings";
import { getStringKeys } from "../../utils/enum";
import { Gravity, SoftDrop, IRSMode, IHSMode, RotSys } from "../../utils/enums";
import { t } from "../../utils/lang";
import { GroupListSetting } from "../settings/GroupListSetting";
import { GroupSetting } from "../settings/GroupSetting";
import { GroupSliderSetting } from "../settings/GroupSliderSetting";
import { Btn } from "../utils/Btn";

export function TuningMenu() {
	const framesMs = (index) =>
		`${index} FRAMES; ${
			Math.round(((1000 / 60) * index + 0.00001) * 100) / 100
		} MS`;
	const framesHz = (index) =>
		index != 0
			? `${index} FRAMES; ${
					Math.round((60 / index + 0.00001) * 100) / 100
			  } HZ`
			: "INSTANT";

	return (
		<nav class="menu">
			<h1 class="boldish">Tuning</h1>

			<GroupSliderSetting
				setting="DAS"
				max={30}
				min={0}
				step={1}
				value={settings.DAS ?? 10}
				onInput={(value) => {
					settings.DAS = value;
				}}
				getName={framesMs}
			/>

			<GroupSliderSetting
				setting="ARR"
				max={10}
				min={0}
				step={1}
				value={settings.ARR ?? 2}
				onInput={(value) => {
					settings.ARR = value;
				}}
				getName={framesHz}
			/>

			<GroupSliderSetting
				setting="Gravity"
				max={9}
				min={0}
				step={1}
				value={settings.Gravity ?? 0}
				onInput={(value) => {
					settings.Gravity = value;
				}}
				getName={(index) => Gravity[index]}
			/>

			<GroupSliderSetting
				setting="SoftDrop"
				max={7}
				min={0}
				step={1}
				value={settings.SoftDrop ?? 6}
				onInput={(value) => {
					settings.SoftDrop = value;
				}}
				getName={(index) => SoftDrop[index + 2]}
			/>

			<GroupSliderSetting
				setting="LockDelay"
				max={100}
				min={0}
				step={0.1}
				value={settings.LockDelay ?? 30}
				onInput={(value) => {
					settings.LockDelay = value;
				}}
				getName={framesMs}
			/>

			<GroupListSetting
				setting="IRSMode"
				data={getStringKeys(IRSMode)}
				selected={settings.IRSMode}
				onClick={(index) => {
					settings.IRSMode = index;
				}}
			/>

			<GroupListSetting
				setting="IHSMode"
				data={getStringKeys(IHSMode)}
				selected={settings.IHSMode}
				onClick={(index) => {
					settings.IHSMode = index;
				}}
			/>

			<GroupListSetting
				setting="RotSys"
				data={getStringKeys(RotSys)}
				selected={settings.RotSys}
				onClick={(index) => {
					settings.set("RotSys", index);
				}}
			/>

			<GroupSetting
				setting="ResetPB"
				data={["Off", "On"]}
				selected={settings.ResetPB ? 1 : 0}
				onClick={(index) => {
					settings.ResetPB = index == 1;
				}}
			/>

			<br />
			<Btn click={() => menu(12)}>{t("menu-back")}</Btn>
		</nav>
	);
}
