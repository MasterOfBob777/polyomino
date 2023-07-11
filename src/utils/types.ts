export interface GeneralSettings {
	DigCheese;
	DigZen;
	SurvivalZenMode;
	SurvivalStartingLevel;
	SprintLimit;
	SprintPieceSet;
	SprintBackfire;
	RetroGameType;
	RetroStartingLevel;
	RetroSkin;
	RetroHardDrop;
	RetroFlashing;
	MasterLock;
	GradesGameRule;
	MarathonGoal;
	MarathonLevelCap;
	MarathonEntryDelay;
	MarathonNoGravity;
	MarathonInvisible;
}

export type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends Array<infer U>
		? Array<DeepPartial<U>>
		: T[P] extends ReadonlyArray<infer U>
		? ReadonlyArray<DeepPartial<U>>
		: DeepPartial<T[P]>;
};

export type DeepUnpartial<T> = T extends DeepPartial<infer U> ? U : T;

export type RangeX<
	N extends number,
	Result extends Array<unknown> = []
> = Result["length"] extends N
	? Result
	: RangeX<N, [...Result, Result["length"]]>;

export type toUnion<T extends any[]> = T[number];

export type Pop<T extends Array<unknown>> = T extends [infer _, ...infer U2]
	? [...U2]
	: [];

export type PopN<
	N extends number,
	T extends Array<unknown>,
	times extends number[] = []
> = times["length"] extends N ? T : PopN<N, Pop<T>, [1, ...times]>;

export type RangeOf<min extends number, max extends number> = PopN<min, RangeX<max>>;

export type ValuesOf<T extends Record<string, unknown>> = T[keyof T];

export type KeysOf<T extends Record<string, unknown>> = keyof T;

export type Nullable<T> = T | null | undefined;