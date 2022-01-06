import { useState, useEffect } from "preact/hooks";
import { timeString } from "../../utils/string";

const pbs = {};

const pbValues = {};

export function updatePB(key) {
	pbs[key]?.();
}

export function setPB(key: string, value: number) {
	localStorage.setItem(key, value.toString());
	pbs[key]?.();
	pbValues[key] = value;
}

export function getPB(key: string) {
	const pb = pbValues[key];
	if (pb) {
		return pb;
	}
	const pbStr = localStorage.getItem(key);
	if (pbStr) {
		return parseFloat(pbStr);
	}
	return 0;
}

export function PBView({ name }) {
	const [time, setTime] = useState(getPB(name));

	useEffect(() => {
		pbs[name] = setTime;
		return () => {
			delete pbs[name];
		}
	})

	return (
		<>
			Fastest time:{" "}
			<span id="sprint-pb">
				{timeString(time)}
			</span>
		</>
	);
}
