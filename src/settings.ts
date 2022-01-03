import { RotSysData } from "./utils/data";
import { getStringKeys } from "./utils/enum";
import {
	Gravity,
	SoftDrop,
	RotSys,
	Size,
	Soundbank,
	NextType,
	Voicebank,
	Block,
	Ghost,
	Outline,
	IRSMode,
	IHSMode,
} from "./utils/enums";

abstract class Setting<T = number, U = T> {
	name: string;

	value: T;

	defaultValue: T;

	validator: (value: T) => boolean;

	customGet: (value: T) => U = (v: unknown) => v as U;

	constructor(
		name: string,
		defaultValue: T,
		validator: (value: T) => boolean
	) {
		this.name = name;
		this.value = defaultValue;
		this.defaultValue = defaultValue;
		this.validator = validator;
	}

	set(value: T) {
		if (this.validator(value)) {
			this.value = value;
			return true;
		}
		console.warn(`Invalid value for setting ${this.name}: ${value}`);
		return false;
	}

	get(): U {
		return this.customGet(this.value);
	}

	displayName(): string {
		return this.value.toString();
	}

	reset() {
		this.value = this.defaultValue;
	}

	setCustomGet(get) {
		this.customGet = get;
		return this;
	}

	createElement(parent: HTMLElement) {
		// TODO: Implement
	}
}

class EnumSetting<T extends number, U = T> extends Setting<T, U> {
	values: string[];

	constructor(name: string, defaultValue: T, values: string[]) {
		super(name, defaultValue, (value: T) => {
			return values[value] !== undefined;
		});
		this.values = values;
	}

	displayName() {
		return this.values[this.value];
	}
}

class RangeSetting<U = number> extends Setting<number, U> {
	min: number;

	max: number;

	step: number;

	constructor(
		name: string,
		defaultValue: number,
		min: number,
		max: number,
		step = 1
	) {
		super(name, defaultValue, (value: number) => {
			if (value >= min && value <= max) {
				this.value = Math.ceil(value / step) * step;
				return true;
			}
			return false;
		});
		this.min = min;
		this.max = max;
		this.step = step;
	}
}

class BooleanSetting extends Setting<boolean> {
	constructor(name: string, defaultValue: boolean) {
		super(
			name,
			defaultValue,
			(value: boolean) => typeof value === "boolean"
		);
	}

	displayName(): string {
		return this.value ? "On" : "Off";
	}
}

class NamedBooleanSetting extends BooleanSetting {
	display: string[];

	constructor(name: string, defaultValue: boolean, display: string[]) {
		super(name, defaultValue);
		this.display = display;
	}

	displayName() {
		return this.display[this.value ? 0 : 1];
	}
}

const gravities = [
	"Auto",
	"0G",
	"1/64G",
	"1/32G",
	"1/16G",
	"1/8G",
	"1/4G",
	"1/2G",
	"1G",
	"20G",
];

export interface SettingMap {
	DAS: RangeSetting;
	ARR: RangeSetting;
	Gravity: EnumSetting<Gravity>;
	SoftDrop: EnumSetting<SoftDrop>;
	LockDelay: RangeSetting;
	RotSys: EnumSetting<
		RotSys,
		{
			initinfo: number[][];
			offset: number[][][];
			color: number[];
			id: RotSys;
		}
	>;
	Next: RangeSetting;
	Size: EnumSetting<Size>;
	Sound: BooleanSetting;
	Volume: RangeSetting;
	MusicVol: RangeSetting;
	Soundbank: EnumSetting<Soundbank>;
	NextSound: BooleanSetting;
	NextType: EnumSetting<NextType>;
	Voice: BooleanSetting;
	Voicebank: EnumSetting<Voicebank>;
	Block: EnumSetting<Block>;
	Ghost: EnumSetting<Ghost>;
	Grid: BooleanSetting;
	Outline: EnumSetting<Outline>;
	DASCut: BooleanSetting;
	NextSide: NamedBooleanSetting;
	Messages: NamedBooleanSetting;
	MatrixSway: BooleanSetting;
	IRSMode: EnumSetting<IRSMode>;
	IHSMode: EnumSetting<IHSMode>;
	InitialVis: BooleanSetting;
	Monochrome: BooleanSetting;
}

const defaultSettings: SettingMap = {
	DAS: new RangeSetting("DAS", 10, 0, 30),
	ARR: new RangeSetting("ARR", 2, 0, 30),
	Gravity: new EnumSetting<Gravity>("Gravity", 0, gravities),
	SoftDrop: new EnumSetting<SoftDrop>("Soft Drop", 0, gravities),
	LockDelay: new RangeSetting("Lock Delay", 30, 0, 100),
	RotSys: new EnumSetting<RotSys, typeof RotSysData[RotSys]>(
		"Rotation System",
		0,
		getStringKeys(RotSys)
	).setCustomGet((value) => RotSysData[value]),
	Next: new RangeSetting("Next", 6, 0, 6),
	Size: new EnumSetting<Size>("Size", 0, getStringKeys(Size)),
	Sound: new BooleanSetting("Sound", true),
	Volume: new RangeSetting("Volume", 50, 0, 100),
	MusicVol: new RangeSetting("Music Volume", 50, 0, 100),
	Soundbank: new EnumSetting<Soundbank>(
		"Soundbank",
		12,
		getStringKeys(Soundbank)
	),
	NextSound: new BooleanSetting("Next Sound", true),
	NextType: new EnumSetting<NextType>(
		"Next Type",
		3,
		getStringKeys(NextType)
	),
	Voice: new BooleanSetting("Voice", false),
	Voicebank: new EnumSetting<Voicebank>(
		"Voicebank",
		2,
		getStringKeys(Voicebank)
	),
	Block: new EnumSetting<Block>("Block", 13, getStringKeys(Block)),
	Ghost: new EnumSetting<Ghost>("Ghost", 1, getStringKeys(Ghost)),
	Grid: new BooleanSetting("Grid", true),
	Outline: new EnumSetting<Outline>("Outline", 1, getStringKeys(Outline)),
	DASCut: new BooleanSetting("DAS Cut", false),
	NextSide: new NamedBooleanSetting("Next Side", false, ["Right", "Left"]),
	Messages: new NamedBooleanSetting("Messages", true, ["Right", "Left"]),
	MatrixSway: new BooleanSetting("Matrix Sway", true),
	IRSMode: new EnumSetting<IRSMode>("IRS Mode", 0, getStringKeys(IRSMode)),
	IHSMode: new EnumSetting<IHSMode>("IHS Mode", 0, getStringKeys(IHSMode)),
	InitialVis: new BooleanSetting("Initial Visibility", true),
	Monochrome: new BooleanSetting("Monochrome", false),
};

type getSettingTypes<T extends keyof SettingMap> =
	SettingMap[T] extends Setting<infer K, infer U> ? [K, U] : never;
type SimpleReturn<T> = (...args: any[]) => T;

class SettingManager {
	#settings: Record<string, SettingMap> = {};

	#currentName = "default";

	setSettings(name: string, settings: SettingMap) {
		this.#settings[name] = settings;
	}

	set<T extends keyof SettingMap>(name: T, value: getSettingTypes<T>[0]) {
		const val = (
			this.#settings[this.#currentName][name].set as SimpleReturn<boolean>
		)(value);
		if (this.#currentName === "default") {
			const settingsCopy = {};
			for (const key in this.#settings["default"]) {
				settingsCopy[key] = this.#settings["default"][key].value;
			}
			localStorage.setItem("settings", JSON.stringify(settingsCopy));
		}
		return val;
	}

	get<T extends keyof SettingMap>(name: T): getSettingTypes<T>[1] {
		return this.#settings[this.#currentName][name].get();
	}

	getRaw<T extends keyof SettingMap>(name: T): SettingMap[T] {
		return this.#settings[this.#currentName][name];
	}

	switchSettings(name: string) {
		this.#currentName = name;
	}
}

for (const name in defaultSettings) {
	Object.defineProperty(SettingManager.prototype, name, {
		get() {
			return this.get(name);
		},
		set(value) {
			this.set(name, value);
		},
	});
}

export const settings: SettingManager & {
	[T in keyof SettingMap]: SettingMap[T] extends Setting<infer K, infer U>
		? K & U
		: never;
} = new SettingManager() as any;

settings.setSettings("default", defaultSettings);
