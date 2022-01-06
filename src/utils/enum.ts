const regex = /^\d+$/;

export function getStringKeys(obj: any): string[] {
	return Object.keys(obj).filter((key) => regex.test(obj[key]));
}
