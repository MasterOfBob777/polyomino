const strs: Record<string, langData> = {};


export async function getLanguageData(lang: string) {
	if (!strs[lang]) {
		const data = await fetch(`/lang/${lang}.json`);
		if (data.ok) {
			strs[lang] = data.json() as any;
		}
	}
}

let userLang = navigator.language.substring(0, 2);

export function switchLanguage(str) {
	userLang = str;
}

type Specifiers = {
	s: string;
	d: number;
	b: boolean;
	D: Date;
};

type Spec = keyof Specifiers;

type Values<T extends string> = T extends `${infer _}%${infer K}${infer Rest}`
	? K extends Spec
		? [Specifiers[K], ...Values<Rest>]
		: Values<`${K}${Rest}`>
	: [];

export type langData = typeof import("../../lang/en.json");

const reg = /%(s|d|b|D)/g;
export function t<T extends keyof langData>(
	str: T,
	...replacements: Values<langData[T]>
): string {
	let final: string = strs[userLang][str] ?? strs.en[str];
	if (str && replacements.length > 0) {
		let i = 0;
		final = final.replace(reg, () => replacements[i++] as string);
		if (final.startsWith("$")) {
			const sliced = final.substring(1);
			final = strs[sliced][userLang];
		}
	}
	return final;
}
