import ProgressBar from "../utils/ProgressBar";
import { LineShower } from "../utils/LineShower";

export function SectionRight() {
	return (
		<div id="c">
			<div id="sounds-loading">
				<ProgressBar
					id={"sound-loading-bar"}
					label-id={"sound-name"}
					value={0}
					max={100}
				/>
			</div>
			<h3 id="irs-indicator" class="flashing">
				INITIAL
			</h3>
			<h3 style="font-weight: 300">
				<span class="white-border-span">Next</span>
			</h3>

			<canvas id="preview" />

			<LineShower />
		</div>
	);
}
