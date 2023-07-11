export function getFlag(keys: number, key: number) {
	return keys & key;
}

export function setFlag(keys: number, key: number) {
	return keys ^ key;
}
