import { useEffect, useRef, useState } from "preact/hooks";
import { menu } from "../../display/menu";
import { key } from "../../logic/view";
import { binds, defaultBinds, setBinds } from "../../utils/data";
import { t } from "../../utils/lang";
import { $, $setText } from "../../utils/utils";
import { Btn } from "../utils/Btn";
import { ButtonGroupList } from "../utils/ButtonGroupList";
import { Icon } from "../utils/Icon";

/**
 * Controls Menu
 */
let newKey: number;
let currCell;
let tempKey: number;

const bobBinds = {
	pause: 27,
	moveLeft: 37,
	moveRight: 39,
	moveLeft3: 0,
	moveRight3: 0,
	moveDown: 40,
	hardDrop: 38,
	holdPiece: 32,
	rotRight: 88,
	rotLeft: 90,
	rot180: 67,
	retry: 82,
};

document.addEventListener(
	"keyup",
	(e) => {
		// if click outside of cell or press esc clear currCell
		// reset binds button.
		if (currCell) {
			newKey = e.keyCode;
			if (newKey === 8) {
				newKey = undefined;
			}
			// Checks if key already in use, and unbinds it.
			if (newKey) {
				for (const i in binds) {
					if (newKey === binds[i]) {
						binds[i] = undefined;
						$setText($(i), key.undefined);
					}
				}
			}
			// Binds the key and saves the data.
			binds[currCell.id] = newKey;
			$setText(currCell, key[newKey] || newKey);
			localStorage.setItem("binds", JSON.stringify(binds));
			currCell = undefined;
		}
	},
	false
);

const buttons = [];
export const updatedBinds = () => {
	for (const cb of buttons) {
		cb();
	}
}

function ControlButton({ default: def, icon, text, id }) {
	const keycode = binds[id];
	const keyText = key[keycode] || keycode;

	const [txt, setTxt] = useState(keyText || def);
	const ref = useRef(null);

	useEffect(() => {
		const cb = () => {
			const kc = binds[id];
			setTxt(key[kc] || kc)
		}
		buttons.push(cb)
		return () => {
			buttons.splice(buttons.indexOf(cb), 1)
		}
	})

	return (
		<tr>
			<th>
				{text} <Icon id={icon} />
			</th>
			<td
				id={id}
				ref={ref}
				onClick={() => {
					// First check if we're already waiting for an input.
					if (currCell) {
						// TODO DRY
						// Make this into a function and call it when we press Esc.
						binds[currCell.id] = tempKey;
						$setText(currCell, key[tempKey] || tempKey);
					}
					tempKey = binds[id];
					setTxt("Press key");
					currCell = ref.current;
				}}
			>
				{txt}
			</td>
		</tr>
	);
}

export function ControlsMenu() {
	return (
		<div class="menu">
			<h2 class="no-margin">Controls</h2>

			<p class="no-margin">
				Click on the item you want to change, then press any key.
			</p>

			<ButtonGroupList
				data={["Custom", "Preset 1", "Preset 2"]}
				selected={0}
				onClick={(index) => {
					switch (index) {
						case 0:
							break;
						case 1:
							setBinds(defaultBinds);
							break;
						case 2:
							setBinds(bobBinds);
							break;
					}
					updatedBinds();
				}}
			/>

			<table id="controls" style="margin-top: 0px">
				<ControlButton
					default="←"
					text="Move"
					icon="left"
					id="moveLeft"
				/>
				<ControlButton
					default="→"
					text="Move"
					icon="right"
					id="moveRight"
				/>
				<ControlButton
					default="---"
					text="Triple"
					icon="left"
					id="moveLeft3"
				/>
				<ControlButton
					default="---"
					text="Triple"
					icon="right"
					id="moveRight3"
				/>
				<ControlButton
					default="↓"
					text="Move"
					icon="soft-drop"
					id="moveDown"
				/>
				<ControlButton
					default="Space"
					text="Drop"
					icon="hard-drop"
					id="hardDrop"
				/>
				<ControlButton
					default="C"
					text="Hold"
					icon="hold"
					id="holdPiece"
				/>
				<ControlButton
					default="X"
					text="Spin"
					icon="rot-right"
					id="rotRight"
				/>
				<ControlButton
					default="Z"
					text="Spin"
					icon="rot-left"
					id="rotLeft"
				/>
				<ControlButton
					default="Shift"
					text="Spin"
					icon="rot-180"
					id="rot180"
				/>
				<ControlButton
					default="R"
					text="Retry"
					icon="retry"
					id="retry"
				/>
				<ControlButton
					default="Esc"
					text="Pause"
					icon="pause"
					id="pause"
				/>
			</table>

			<Btn click={() => menu(0)} class="btn-bottom">
				{t("menu-done")}
			</Btn>
		</div>
	);
}
