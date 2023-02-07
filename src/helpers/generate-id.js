/**
 * Returns an alphanumeric ID with a length defined by the "length" parameter
 *
 * @param {Number} [length=20]  - Number of characters the id must have
 * @return {String} - Alphanumeric ID
 */
export function GenerateId(length = 20) {
	const CHARSETS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	let response = '';

	for (let i = 0; i < length; i++) {
		const index = Math.floor(Math.random() * CHARSETS.length);
		response += CHARSETS.charAt(index);
	}
	return response;
}
