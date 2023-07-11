import { settings } from "../../../../../settings";
import { getStringKeys } from "../../../../../utils/enum";
import { NextType, Soundbank, Voicebank } from "../../../../../utils/enums";
import { GroupListSetting } from "../../../../settings/GroupListSetting";
import { GroupSetting } from "../../../../settings/GroupSetting";
import { GroupSliderSetting } from "../../../../settings/GroupSliderSetting";
import { BackBtn } from "../../BackBtn";
import { createMenu } from "../../menuHooks";

export const { button: AudioMenuBtn, menu: AudioMenu, id: AUDIO_MENU_ID } = createMenu(
	{
		title: "menu-settings-audio",
	},
	() => {
		return (
			<>
				<h1 class="boldish">Audio</h1>

				<GroupSetting
					setting="Sound"
					data={["Off", "On"]}
					selected={settings.Sound ? 1 : 0}
					onClick={(index) => {
						settings.Sound = index === 1;
					}}
				/>

				<GroupSliderSetting
					setting="Volume"
					min={0}
					max={100}
					value={settings.Volume ?? 50}
					onInput={(value) => {
						settings.Volume = value;
					}}
					getName={(index) => `${index}%`}
				/>

				<GroupSliderSetting
					setting="MusicVol"
					min={0}
					max={100}
					value={settings.MusicVol ?? 50}
					onInput={(value) => {
						settings.MusicVol = value;
					}}
					getName={(index) => `${index}%`}
				/>

				<GroupListSetting
					setting="Soundbank"
					data={getStringKeys(Soundbank)}
					selected={settings.Soundbank}
					onClick={(index) => {
						settings.Soundbank = index;
					}}
				/>

				<GroupSetting
					setting="NextSound"
					data={["Off", "On"]}
					selected={settings.NextSound ? 1 : 0}
					onClick={(index) => {
						settings.NextSound = index === 1;
					}}
				/>

				<GroupListSetting
					setting="NextType"
					data={getStringKeys(NextType)}
					onClick={(index) => {
						settings.NextType = index;
					}}
					selected={settings.NextType}
				/>

				<GroupSetting
					setting="Voice"
					data={["Off", "On"]}
					selected={settings.Voice ? 1 : 0}
					onClick={(index) => {
						settings.Voice = index === 1;
					}}
				/>

				<GroupListSetting
					setting="Voicebank"
					data={getStringKeys(Voicebank)}
					selected={settings.Voicebank}
					onClick={(index) => {
						settings.Voicebank = index;
					}}
				/>

				<br />

				<BackBtn />
			</>
		);
	}
);
