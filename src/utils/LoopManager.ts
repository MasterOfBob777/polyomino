import { sleep, syncToAnimFrame } from "./utils";

export class LoopManager {
	paused = false;

	queue: Array<(l: LoopManager) => Promise<void> | void> = [];

	inits: Array<(l: LoopManager) => Promise<void> | void> = [];

	constructor(public readonly syncAnimFrame = false) {}

	add(func: (l: LoopManager) => Promise<void> | void) {
		this.queue.push(func);
		return this;
	}

	addInitalizer(func: (l: LoopManager) => Promise<void> | void) {
		this.inits.push(func);
		return this;
	}

	async run() {
		for (const init of this.inits) {
			await init(this);
		}
		while (this.queue.length > 0) {
			if (this.syncAnimFrame) {
				await syncToAnimFrame();
			}
			await this.queue.shift()!(this);
			while (this.paused) {
				await sleep(100);
			}
		}
	}

	pause() {
		this.paused = true;
	}

	resume() {
		this.paused = false;
	}

	kill() {
		this.queue = [];
	}
}
