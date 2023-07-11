export const $ = <T extends HTMLElement>(id) =>
	document.getElementById(id) as T;

declare function querySelectorAll<K extends keyof HTMLElementTagNameMap>(
	selectors: K
): NodeListOf<HTMLElementTagNameMap[K]>;
declare function querySelectorAll<K extends keyof SVGElementTagNameMap>(
	selectors: K
): NodeListOf<SVGElementTagNameMap[K]>;
declare function querySelectorAll<E extends Element = Element>(
	selectors: string
): NodeListOf<E>;

export const $$ = ((selectors) =>
	document.querySelectorAll(selectors)) as typeof querySelectorAll;
export const $tag = <K extends keyof HTMLElementTagNameMap>(qualifiedName: K) =>
	document.getElementsByTagName(qualifiedName);
export const $setText = (ele, text) => (ele.textContent = text);
/**
 * Clear canvas.
 */
export function clear(ctx) {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

export function range(start: number, end: number, inc = 1) {
	const array: number[] = [];
	for (let i = start; i < end; i += inc) {
		array.push(i);
	}
	return array;
}

export async function sleep(ms: number) {
	await new Promise<void>((resolve) => {
		setTimeout(() => {
			resolve();
		}, ms);
	});
}

const sleepBuff = new Int32Array(new SharedArrayBuffer(4));
export function syncSleep(ms) {
	if (!crossOriginIsolated) throw new Error("Not cross-origin isolated. Please change server config.");
	return Atomics.wait(sleepBuff, 0, 0, ms);
}

export async function syncToAnimFrame() {
	await new Promise<void>((resolve) => {
		window.requestAnimationFrame(() => {
			resolve();
		});
	});
}
