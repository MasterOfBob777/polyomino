interface Profile {
	name?: string;
	pfp?: string;
	playtime?: number;
}

export class ProfileManager {
	profiles: Record<string, Profile> = {
		default: {},
	};

	current = "default";

	createProfile(name: string, obj: Profile = {}) {
		this.profiles[name] = Object.assign({}, obj);
	}

	switchProfile(name: string) {
		this.current = name;
	}

	save() {
		return JSON.stringify(this.profiles);
	}

	load(str: string) {
		this.profiles = JSON.parse(str);
	}

	get(key: keyof Profile) {
		return this.profiles[this.current][key];
	}

	getRaw() {
		return this.profiles[this.current];
	}

	set<T extends keyof Profile>(key: T, value: Profile[T]) {
		this.profiles[this.current][key] = value;
	}
}
