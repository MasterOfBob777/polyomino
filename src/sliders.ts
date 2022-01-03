import { $ } from "./utils/utils";

// menu(15)
export function updateSprint40PB() {
	// $("sprint-pb").innerHTML = displayTime;
	const sprintPB = localStorage.getItem("sprint40pbvisual");
	if (sprintPB != undefined) {
		$("sprint-pb").innerHTML = sprintPB;
		$("sprint-pb-menu").innerHTML = sprintPB;
	} else {
		$("sprint-pb").innerHTML = "?????";
		$("sprint-pb-menu").innerHTML = "?????";
	}
}

export function removeSprintPB() {
	localStorage.removeItem("sprint40pb");
	localStorage.removeItem("sprint40pbvisual");
	$("sprint-pb").innerHTML = "?????";
	$("sprint-pb-menu").innerHTML = "?????";
}
// updateSprint40PB();
