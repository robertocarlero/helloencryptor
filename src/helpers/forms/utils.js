/**
 * It takes an array of fields and returns an object with the field names as keys and the field values
 * as values
 * @param fields - An array of objects that contain the following properties:
 * @returns An object with the field names as keys and the field values as values.
 */
export const getInitialFormState = (fields = []) => {
	const response = {};

	fields.forEach((field) => {
		response[field.name] = field.value || '';
	});

	return response;
};
