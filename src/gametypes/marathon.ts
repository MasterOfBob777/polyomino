import { sound } from "../display/sound/sound";
import { Game } from "../game";
import { settings } from "../settings";
import { GameType } from "./base";

export class Marathon extends GameType {
	update(): void {
		// TODO: figure out if any code needs to go here
	}

	init() {
		switch (Game.settings.marathon.limit.val) {
			case 0:
				Game.params.marathonLimit = 150;
				break;
			case 1:
				Game.params.marathonLimit = 200;
				break;
			case 2:
				Game.params.marathonLimit = undefined;
				break;
			case 3:
				Game.params.marathonLimit = 300;
				break;
		}
		Game.params.entryDelay = Game.settings.marathon.delay.val;
		if (Game.settings.marathon.nograv.val == 1) {
			Game.params.noGravity = true;
		} else {
			Game.params.noGravity = false;
		}
		if (Game.settings.marathon.invisible.val == 1) {
			Game.params.invisibleMarathon = true;
		}
		if (Game.settings.marathon.cap.val == 1) {
			Game.params.levelCap = 1;
		}

		sound.loadbgm("marathon");
		sound.loadbgm("marathon2");
		sound.loadbgm("marathon3");

		settings.Gravity = 0;
	}
}
