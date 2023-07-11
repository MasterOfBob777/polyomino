import { getLanguageData } from "./utils/lang";
import { LoopManager } from "./utils/LoopManager";

const logicLoop = new LoopManager();
const renderLoop = new LoopManager();

renderLoop.add(async () => {
	await Promise.all([
		getLanguageData("en"),
		getLanguageData(navigator.language.substring(0, 2)),
	]);
});
