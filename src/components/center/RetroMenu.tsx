import { changeGameSetting, menu } from "../../display/menu";
import { Game } from "../../game";
import { GroupSetting } from "../settings/GroupSetting";

export function RetroMenu() {
	return (
		<nav class="menu">
			<h1 class="boldish">Retro</h1>
			<p class="no-margin">Classic game with a variety of options.</p>
			<div class="no-margin btn-container">
				<GroupSetting
					setting="RetroGameType"
					data={["A-Type", "B-Type"]}
					selected={Game.settings.retro.type.val}
					onClick={(index) => {
						changeGameSetting("retro", "type", index);
					}}
				/>

				{/*TODO: Change this into a jsx component */}
				<h4 class="option-header">Starting Level</h4>
				<p class="option-description">Choose a level to start</p>
				<div
					class="btn-group btn-ensquishened"
					style="margin-left: 1em"
				>
					<button
						id="retro-level-0"
						onclick="changeSetting('retro', 'level', 0)"
					>
						00
					</button>
					<button
						id="retro-level-1"
						onclick="changeSetting('retro', 'level', 1)"
					>
						01
					</button>
					<button
						id="retro-level-2"
						onclick="changeSetting('retro', 'level', 2)"
					>
						02
					</button>
					<button
						id="retro-level-3"
						onclick="changeSetting('retro', 'level', 3)"
					>
						03
					</button>
					<button
						id="retro-level-4"
						onclick="changeSetting('retro', 'level', 4)"
					>
						04
					</button>
					<button
						id="retro-level-5"
						onclick="changeSetting('retro', 'level', 5)"
					>
						05
					</button>
					<button
						id="retro-level-6"
						onclick="changeSetting('retro', 'level', 6)"
					>
						06
					</button>
					<button
						id="retro-level-7"
						onclick="changeSetting('retro', 'level', 7)"
					>
						07
					</button>
					<button
						id="retro-level-8"
						onclick="changeSetting('retro', 'level', 8)"
					>
						08
					</button>
					<button
						id="retro-level-9"
						onclick="changeSetting('retro', 'level', 9)"
					>
						09
					</button>
				</div>
				<div
					class="btn-group btn-ensquishened"
					style="margin-left: 1em"
				>
					<button
						id="retro-level-10"
						onclick="changeSetting('retro', 'level', 10)"
					>
						10
					</button>
					<button
						id="retro-level-11"
						onclick="changeSetting('retro', 'level', 11)"
					>
						11
					</button>
					<button
						id="retro-level-12"
						onclick="changeSetting('retro', 'level', 12)"
					>
						12
					</button>
					<button
						id="retro-level-13"
						onclick="changeSetting('retro', 'level', 13)"
					>
						13
					</button>
					<button
						id="retro-level-14"
						onclick="changeSetting('retro', 'level', 14)"
					>
						14
					</button>
					<button
						id="retro-level-15"
						onclick="changeSetting('retro', 'level', 15)"
					>
						15
					</button>
					<button
						id="retro-level-16"
						onclick="changeSetting('retro', 'level', 16)"
					>
						16
					</button>
					<button
						id="retro-level-17"
						onclick="changeSetting('retro', 'level', 17)"
					>
						17
					</button>
					<button
						id="retro-level-18"
						onclick="changeSetting('retro', 'level', 18)"
					>
						18
					</button>
					<button
						id="retro-level-19"
						onclick="changeSetting('retro', 'level', 19)"
					>
						19
					</button>
				</div>

				<GroupSetting
					setting="RetroHardDrop"
					data={["Off", "On"]}
					selected={Game.settings.retro.drop.val}
					onClick={(index) => {
						changeGameSetting("retro", "drop", index);
					}}
				/>

				<GroupSetting
					setting="RetroFlashing"
					data={["Off", "On"]}
					selected={Game.settings.retro.flash.val}
					onClick={(index) => {
						changeGameSetting("retro", "flash", index);
					}}
				/>
				<br />

				<a
					class="btn btn-inline width-50"
					onClick={() => Game.init(8, { proMode: false })}
				>
					Start
				</a>
				<a
					class="btn btn-inline width25-7"
					onClick={() => menu(undefined, -1)}
				>
					Back
				</a>
			</div>
		</nav>
	);
}
