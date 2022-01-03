export function getStringKeys(obj: any): string[] {
	return Object.keys(obj).filter(key => !Number.isNaN(parseInt(obj[key])));
}