/**
 * Returns an alphanumeric ID with a length defined by the "length" parameter
 *
 * @param {Number} [length=20]  - Number of characters the id must have
 * @return {String} - Alphanumeric ID
 */
export function GenerateId(length = 20, pattern) {
  const generate = () => {
    const CHARSETS =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$@$¡!%*¿?&#_+-.=';
    let response = '';

    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * CHARSETS.length);
      response += CHARSETS.charAt(index);
    }

    return response;
  };

  let response = '';

  do {
    response = generate();
  } while (pattern && !new RegExp(pattern).test(response));

  return response;
}
