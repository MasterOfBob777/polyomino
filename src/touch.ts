import { resize } from "./display/size";
import { keyUpDown } from "./logic/view";
import { binds } from "./utils/data";
import { $ } from "./utils/utils";

type Weird = HTMLElement & { follow: FollowingButton; bindsMemberName: string };

const touchLayout = $("touchLayout");

class FollowingButton {
	enabled: boolean;

	rectX0: any;

	rectY0: any;

	rectX1: any;

	rectY1: any;

	x: number;

	y: number;

	recentTouches: any[];

	constructor(button) {
		this.rectX0 = button.offsetLeft;
		this.rectY0 = button.offsetTop;
		this.rectX1 = button.offsetLeft + button.offsetWidth;
		this.rectY1 = button.offsetTop + button.offsetHeight;
		this.x = (this.rectX0 + this.rectX1) / 2;
		this.y = (this.rectY0 + this.rectY1) / 2;
		this.recentTouches = [];
		this.enabled = true;
	}
}

class FollowingButtonSet {
	static readonly RANGE = 96;

	touchStart(pos) {
		//
	}

	posToBinds(pos) {
		let mindist = Infinity;
		let minbtnid;
		for (let i = 0; i < touchButtons.length; i++) {
			const btnflw = touchButtons[i].follow;
			const dist = Math.hypot(pos.x - btnflw.x, pos.y - btnflw.y);
			if (dist < mindist) {
				mindist = dist;
				minbtnid = i;
			}
		}
		return minbtnid;
	}
}

const touchLeft: Weird = $("touchLeft");
const touchRight: Weird = $("touchRight");
const touchDown: Weird = $("touchDown");
const touchDrop: Weird = $("touchDrop");
const touchHold: Weird = $("touchHold");
const touchRotLeft: Weird = $("touchRotLeft");
const touchRotRight: Weird = $("touchRotRight");
const touchRot180: Weird = $("touchRot180");

const touchButtons = [
	touchLeft,
	touchRight,
	touchDown,
	touchDrop,
	touchHold,
	touchRotRight,
	touchRotLeft,
	touchRot180,
];

touchLeft.bindsMemberName = "moveLeft";
touchRight.bindsMemberName = "moveRight";
touchDown.bindsMemberName = "moveDown";
touchDrop.bindsMemberName = "hardDrop";
touchHold.bindsMemberName = "holdPiece";
touchRotRight.bindsMemberName = "rotRight";
touchRotLeft.bindsMemberName = "rotLeft";
touchRot180.bindsMemberName = "rot180";

for (let i = 0; i < touchButtons.length; i++) {
	const btn = touchButtons[i];
	btn.follow = new FollowingButton(btn);
}

export function touchButtonsLayout() {
	const dpiX = 96;
	const dpiY = 96;
	const winW = window.innerWidth / dpiX;
	const winH = window.innerHeight / dpiY;
	const buttonH = 0.7;
	let buttonW = 1;
	const fontSize = 0.55;
	const margin = 0.1;
	const unit = "in";

	const setPos = (
		elem,
		posX,
		posY,
		sizeW,
		sizeH,
		alignX,
		alignY,
		offsetX,
		offsetY
	) => {
		elem.style.width = "" + sizeW + unit;
		elem.style.height = "" + sizeH + unit;
		// border ignored, for now
		elem.style.left =
			"" +
			(offsetX +
				alignX * 0.5 * (winW - sizeW) +
				posX * sizeW -
				((alignX - 1) * margin) / 2) +
			unit;
		elem.style.top =
			"" +
			(offsetY +
				alignY * 0.5 * (winH - sizeH) +
				posY * sizeH -
				((alignY - 1) * margin) / 2) +
			unit;
		elem.classList.remove("gone");
		elem.style.fontSize = "" + fontSize + unit;
	};

	const layouts = {
		//function array
		NONE: function () {
			for (let i = 0, len = touchButtons.length; i < len; i++)
				touchButtons[i].classList.add("gone");
		},
		KBD_R: function () {
			setPos(touchRotLeft, 0, -1, buttonW, buttonH, 0, 2, 0, 0);
			setPos(touchRot180, 0.5, -2, buttonW, buttonH, 0, 2, 0, 0);
			setPos(touchRotRight, 1, -1, buttonW, buttonH, 0, 2, 0, 0);
			setPos(touchHold, 1.5, 0, buttonW, buttonH, 0, 2, 0, 0);
			setPos(touchRight, 0, 0, buttonW, buttonH, 2, 2, 0, 0);
			setPos(touchLeft, -2, 0, buttonW, buttonH, 2, 2, 0, 0);
			setPos(touchDown, -1, 0, buttonW, buttonH, 2, 2, 0, 0);
			setPos(touchDrop, -1, -1, buttonW, buttonH, 2, 2, 0, 0);
		},
		KBD_L: function () {
			setPos(touchRotLeft, -1, -1, buttonW, buttonH, 2, 2, 0, 0);
			setPos(touchRot180, -0.4, -2, buttonW, buttonH, 2, 2, 0, 0);
			setPos(touchRotRight, 0, -1, buttonW, buttonH, 2, 2, 0, 0);
			setPos(touchHold, -1.5, 0, buttonW, buttonH, 2, 2, 0, 0);
			setPos(touchRight, 2, 0, buttonW, buttonH, 0, 2, 0, 0);
			setPos(touchLeft, 0, 0, buttonW, buttonH, 0, 2, 0, 0);
			setPos(touchDown, 1, 0, buttonW, buttonH, 0, 2, 0, 0);
			setPos(touchDrop, 1, -1, buttonW, buttonH, 0, 2, 0, 0);
		},
		JOY: function () {
			let oy /*offset Y by block*/;
			let ay /*align Y*/;
			if (winH - winW > buttonH * 1.5) {
				oy = -1;
				ay = 2;
			} else {
				oy = 0;
				ay = 1;
			}
			/* single finger */
			buttonW = 0.8;
			if ((winW - 0.1) / 4 < buttonW) {
				buttonW = (winW - 0.1) / 4;
			}
			setPos(touchRotLeft, -0.5, 1 + oy, buttonW, buttonH, 2, ay, 0, 0);
			setPos(touchRot180, -0.5, -1 + oy, buttonW, buttonH, 2, ay, 0, 0);
			setPos(touchRotRight, 0, 0 + oy, buttonW, buttonH, 2, ay, 0, 0);
			setPos(touchHold, -1, 0 + oy, buttonW, buttonH, 2, ay, 0, 0);
			setPos(touchRight, 1, 0 + oy, buttonW, buttonH, 0, ay, 0, 0);
			setPos(touchLeft, 0, 0 + oy, buttonW, buttonH, 0, ay, 0, 0);
			setPos(touchDown, 0.5, 1 + oy, buttonW, buttonH, 0, ay, 0, 0);
			setPos(touchDrop, 0.5, -1 + oy, buttonW, buttonH, 0, ay, 0, 0);
		},
		JOY2: function () {
			let oy /*offset Y by block*/;
			let ay /*align Y*/;
			if (winH - winW > buttonH * 1.5) {
				oy = -1;
				ay = 2;
			} else {
				oy = 0;
				ay = 1;
			}
			/* single finger */
			buttonW = 0.8;
			if ((winW - 0.1) / 4 < buttonW) {
				buttonW = (winW - 0.1) / 4;
			}
			setPos(touchRotLeft, -1, 1 + oy, buttonW, buttonH, 2, ay, 0, 0);
			setPos(touchRot180, -1, -1 + oy, buttonW, buttonH, 2, ay, 0, 0);
			setPos(touchRotRight, 0, 0 + oy, buttonW, buttonH, 2, ay, 0, 0);
			setPos(touchHold, -2, 0 + oy, buttonW, buttonH, 2, ay, 0, 0);
			setPos(touchRight, 2, 0 + oy, buttonW, buttonH, 0, ay, 0, 0);
			setPos(touchLeft, 0, 0 + oy, buttonW, buttonH, 0, ay, 0, 0);
			setPos(touchDown, 1, 1 + oy, buttonW, buttonH, 0, ay, 0, 0);
			setPos(touchDrop, 1, -1 + oy, buttonW, buttonH, 0, ay, 0, 0);
		},

		NARROW: function () {
			setPos(touchLeft, -2, 0, buttonW, buttonH, 2, 2, 0, 0);
			setPos(touchRight, 0, 0, buttonW, buttonH, 2, 2, 0, 0);
			if (winH - winW > buttonH * 1.5) {
				setPos(touchDown, -1, 0, buttonW, buttonH, 2, 2, 0, 0);
				setPos(touchDrop, -1, -1, buttonW, buttonH, 2, 2, 0, 0);
			} else {
				setPos(touchDown, 0, -1, buttonW, buttonH, 2, 2, 0, 0);
				setPos(touchDrop, -1, 0, buttonW, buttonH, 2, 2, 0, 0);
			}
			setPos(touchRotLeft, 0, -1.2, buttonW, buttonH, 0, 1, 0, 0);
			setPos(touchRotRight, 0, 0, buttonW, buttonH, 0, 1, 0, 0);
			setPos(touchHold, 0, 1.2, buttonW, buttonH, 0, 1, 0, 0);
			setPos(touchRot180, 0, -2.4, buttonW, buttonH, 0, 1, 0, 0);
		},
		NARROW_L: function () {
			setPos(touchRotLeft, -2, 0, buttonW, buttonH, 2, 2, 0, 0);
			setPos(touchRotRight, -1, 0, buttonW, buttonH, 2, 2, 0, 0);
			setPos(touchDrop, 0, 0, buttonW, buttonH, 2, 2, 0, 0);
			if (winH - winW > buttonH * 1.5) {
				setPos(touchRot180, -1, -1, buttonW, buttonH, 2, 2, 0, 0);
			} else {
				setPos(touchRot180, 0, -1, buttonW, buttonH, 2, 2, 0, 0);
			}
			setPos(touchLeft, 0, -1.2, buttonW, buttonH, 0, 1, 0, 0);
			setPos(touchDown, 0, 0, buttonW, buttonH, 0, 1, 0, 0);
			setPos(touchRight, 0, 1.2, buttonW, buttonH, 0, 1, 0, 0);
			setPos(touchHold, 0, -2.4, buttonW, buttonH, 0, 1, 0, 0);
		},
		NARROW_LM: function () {
			setPos(touchLeft, 0, 0, buttonW, buttonH, 0, 2, 0, 0);
			setPos(touchRight, 2, 0, buttonW, buttonH, 0, 2, 0, 0);
			if (winH - winW > buttonH * 1.5) {
				setPos(touchDown, 1, 0, buttonW, buttonH, 0, 2, 0, 0);
				setPos(touchDrop, 1, -1, buttonW, buttonH, 0, 2, 0, 0);
			} else {
				setPos(touchDown, 0, -1, buttonW, buttonH, 0, 2, 0, 0);
				setPos(touchDrop, 1, 0, buttonW, buttonH, 0, 2, 0, 0);
			}
			setPos(touchRotLeft, 0, -1.2, buttonW, buttonH, 2, 2, 0, 0);
			setPos(touchRotRight, 0, -2.4, buttonW, buttonH, 2, 2, 0, 0);
			setPos(touchHold, 0, 0, buttonW, buttonH, 2, 2, 0, 0);
			setPos(touchRot180, 0, -3.6, buttonW, buttonH, 2, 2, 0, 0);
		},

		DELUXE: function () {
			buttonW = 0.8;
			if ((winW - 0.1) / 4 < buttonW) {
				buttonW = (winW - 0.1) / 4;
			}
			setPos(touchLeft, 0, 0, buttonW, buttonH, 0, 2, 0, 0);
			setPos(touchRight, 1, 0, buttonW, buttonH, 0, 2, 0, 0);
			setPos(touchDown, 0, 0, buttonW, buttonH, 2, 2, 0, 0);
			setPos(touchDrop, 0, -1, buttonW, buttonH, 2, 2, 0, 0);
			setPos(touchRotLeft, -1, 0, buttonW, buttonH, 2, 2, 0, 0);
			setPos(touchRotRight, -1, -1, buttonW, buttonH, 2, 2, 0, 0);
			setPos(touchHold, 0.5, -1, buttonW, buttonH, 0, 2, 0, 0);
			//setPos(touchRot180,   0, -buttonH*2.4, buttonW, buttonH, 0, 1, 0, 0);
			touchRot180.classList.add("gone");
		},
	};

	setPos(touchLayout, 0, 0, buttonW, buttonH, 2, 0, 0, 0);
	if (currLayout === -2) {
		// none
		layouts.NONE();
	} else if (currLayout === -1) {
		// auto detection
		if (winW < buttonW * 3) {
			layouts.NONE();
		} else if (
			winW - winH * 0.5 > buttonW * 4.5 ||
			(winH - winW > 4 * buttonH && winW > buttonW * 5.5)
		) {
			layouts.KBD_R();
		} else if (winW - winH * 0.5 > buttonW * 3) {
			layouts.JOY();
		} else if (winH - winW > 0) {
			layouts.NARROW();
		} else if (winW >= buttonW * 4) {
			layouts.DELUXE();
		} else {
			layouts.NONE();
		}
	} else {
		layouts[
			[
				"KBD_R",
				"KBD_L",
				"JOY",
				"JOY2",
				"NARROW",
				"NARROW_L",
				"NARROW_LM",
				"DELUXE",
			][currLayout]
		]();
	}
}

const nLayouts = 7;
let currLayout = -2; /* none */

function touch(e) {
	//if (e.type==="touchmove")
	//e.preventDefault();
	if (
		(e.type === "touchstart" || e.type === "click") &&
		e.target === touchLayout
	) {
		currLayout++;
		if (currLayout === nLayouts) {
			currLayout = -2; //none, auto, 0, 1, 2...
		}
		resize();
	}
	if (
		e.type === "touchstart" ||
		e.type === "touchmove" ||
		e.type === "touchend"
	) {
		for (const i in binds)
			keyUpDown({
				type: "keyup",
				keyCode: binds[i],
				preventDefault: () => {},
			});
		for (let i = 0, l = e.touches.length; i < l; i++) {
			const tX = e.touches[i].pageX;
			const tY = e.touches[i].pageY;
			for (let j = 0; j < touchButtons.length; j++) {
				const oRef = touchButtons[j];
				if (
					tX >= oRef.offsetLeft &&
					tX < oRef.offsetLeft + oRef.offsetWidth &&
					tY >= oRef.offsetTop &&
					tY < oRef.offsetTop + oRef.offsetHeight
				) {
					keyUpDown({
						type: "keydown",
						keyCode: binds[oRef.bindsMemberName],
						preventDefault: () => {},
					});
					e.preventDefault();
				}
			}
		}
	}
}

const preventDefault = (e) => {
	e.preventDefault();
};

document.addEventListener("touchstart", touch, false);
document.addEventListener("touchmove", touch, false);
document.addEventListener("touchend", touch, false);
document.addEventListener("click", touch, false);

document.addEventListener("gesturestart", preventDefault, false);
document.addEventListener("gestureend", preventDefault, false);
document.addEventListener("gesturechange", preventDefault, false);
