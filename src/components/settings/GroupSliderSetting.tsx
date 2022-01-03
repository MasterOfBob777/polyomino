import { useState } from "preact/hooks";
import { SettingMap } from "../../settings";
import { t } from "../../utils/lang";
import { GeneralSettings } from "../../utils/types";

export function GroupSliderSetting({
	setting,
	onInput,
	getName = (value) => value.toString(),
	value: initValue,
	min,
	max,
	step = 1,
}: GroupSliderSettingProps) {
	const [value, setValue] = useState(initValue);

	return (
		<>
			<h4 class="option-header">{t(`setting-${setting}-title`)}</h4>
			<div class="slidecontainer">
				<input
					type="range"
					min={min}
					max={max}
					step={step}
					value={value}
					class="slider"
					onInput={(e) => {
						const val = parseInt(e.currentTarget.value);
						setValue(val);
						onInput(val);
					}}
				/>
				<p class="slidervalue">{getName(value)}</p>
			</div>
		</>
	);
}

interface GroupSliderSettingProps {
	setting: keyof SettingMap | keyof GeneralSettings;
	onInput: (index: number) => void;
	value: number;
	getName?: (index: number) => string;
	min: number;
	max: number;
	step?: number;
}
