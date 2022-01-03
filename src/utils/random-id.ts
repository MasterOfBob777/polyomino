export function guid(len) {
	return Math.random().toString(36).substring(2, len);
}