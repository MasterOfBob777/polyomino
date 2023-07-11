export abstract class GameType {
	savePB = false;
	
	pbKey = "";

	abstract init(): void;
	
	abstract update(): void;
	
	win(): void {}
	
	die(): void {}
	
	done() {}

	lineClear(lineClear: number) {}
}
