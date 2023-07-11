import { useEffect, useState } from "preact/hooks";
import type { JSX } from "preact/jsx-runtime";
import { sound } from "../../../display/sound/sound";
import { langData, t } from "../../../utils/lang";
import { Btn } from "../../utils/Btn";
import { Icon, iconIds } from "../../utils/Icon";

const menus: ((val: boolean) => void)[] = [];
/*
Array(100)
	.fill(undefined)
	.map((_, i) => {
		return (v) => {
			if (v) console.warn(`Menu ${i} not found`);
		};
	});
*/
export function useMenu(menuId: number): boolean {
	const [on, setOn] = useState(false);

	useEffect(() => {
		menus[menuId] = (val) => {
			setOn(val);
			if (val) {
				for (let i = 0; i < menus.length; i++) {
					if (i !== menuId) {
						menus[i](false);
					}
				}
			}
		};

		return () => {
			delete menus[menuId];
		};
	});

	return on;
}

let id = 0;

export function createMenu(
	{
		title,
		icon,
		id: menuId,
	}: {
		icon?: iconIds;
		title: keyof langData;
		id?: string;
	},
	Ele: (this: void) => JSX.Element
) {
	const _id = id++;
	return {
		id: _id,
		button({ op = 1 }: { op?: number }) {
			return (
				<Btn click={() => menu(_id, op)}>
					{icon && <Icon id={icon} />} {t(title)}
				</Btn>
			);
		},
		menu() {
			return (
				<nav class={`menu ${useMenu(_id) ? "on" : ""}`} id={menuId}>
					<Ele />
				</nav>
			);
		},
	};
}
/**
 * Show and hide menus.
 */
let menuStack: number[] = [];
let lastMenuId;

export function menu(menuIndex?, stackOper?) {
	sound.init();

	if (menuIndex !== undefined) {
		if (menuIndex === -1) {
			for (let i = 0; i < menus.length; i++) {
				menus[i](false);
			}
		} else {
			menus[menuIndex](true);
		}
	}

	switch (stackOper) {
		case 0:
			break;

		case 1:
			if (lastMenuId === undefined) {
				menuStack.push(menuIndex);
				lastMenuId = menuIndex;
			} else {
				menuStack.push(lastMenuId);
				lastMenuId = menuIndex;
			}
			break;

		case -1:
			menu((lastMenuId = menuStack.pop()), 0);
			break;

		default:
			menuStack = [];
			lastMenuId = undefined;
			break;
	}
}
