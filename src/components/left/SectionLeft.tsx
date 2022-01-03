import { Stats } from "./Stats";

export function SectionLeft() {
	return (
		<div id="d">
			<h3 id="holdtext">
				<span class="white-border-span">Hold</span>
			</h3>

			<div id="a">
				<canvas id="hold" class="glow-flash-animation" />
				<br />

				<div id="divInp" />
			</div>
			<h3 id="ihs-indicator" class="flashing">
				INITIAL
			</h3>
			<Stats />
		</div>
	);
}


