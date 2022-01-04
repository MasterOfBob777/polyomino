export abstract class GameType {
	abstract init(): void;
	
	abstract update(): void;
	
	win(): void {}
	
	die(): void {}
	
	done() {}

	lineClear(lineClear: number) {}
}
