import { t } from "../../utils/lang";
import { ButtonGroup } from "../utils/ButtonGroup";
import { SettingMap } from "../../settings";
import { GeneralSettings } from "../../utils/types";

interface GroupSettingProps {
	setting: keyof SettingMap | keyof GeneralSettings;
	onClick: (index: number) => void;
	data: string[];
	selected: number;
}

export function GroupSetting({
	setting,
	onClick,
	data,
	selected,
}: GroupSettingProps) {
	return (
		<>
			<h4 class="option-header">
				{t(`setting-${setting}-title`)}
			</h4>
			<p class="option-description">
				{t(`setting-${setting}-desc`)}
			</p>
			<ButtonGroup data={data} selected={selected} onClick={onClick} />
		</>
	);
}
