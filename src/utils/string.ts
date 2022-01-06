import { fixed } from "./math";

export function padZero(v: number) {
	return (v < 10 ? "0" : "") + v.toString();
}

export function timeString(ms: number) {
	const seconds = fixed((ms % 60000) / 1000, 2);
	const minutes = Math.floor(ms / 60000);
	return `${padZero(minutes)}:${(seconds < 10 ? "0" : "")}${seconds.toFixed(2)}`;
}
