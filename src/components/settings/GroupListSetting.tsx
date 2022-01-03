import { t } from "../../utils/lang";
import { ButtonGroup as ButtonGroupList } from "../utils/ButtonGroup";
import { SettingMap } from "../../settings";
import { GeneralSettings } from "../../utils/types";

interface GroupListSettingProps {
	setting: keyof SettingMap | keyof GeneralSettings;
	onClick: (index: number) => void;
	data: string[];
	selected: number;
}

export function GroupListSetting({
	setting,
	onClick,
	data,
	selected,
}: GroupListSettingProps) {
	return (
		<>
			<h4 class="option-header">
				{t(`setting-${setting}-title`)}
			</h4>
			<p class="option-description">
				{t(`setting-${setting}-desc`)}
			</p>
			<ButtonGroupList data={data} selected={selected} onClick={onClick} />
		</>
	);
}
