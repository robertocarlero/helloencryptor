/* eslint no-eval: "off" */

import { FORM_ERROR_MESSAGES } from 'constants/forms/messages/errors';

const errorMessage = (error) => FORM_ERROR_MESSAGES[error];

export const validateObjectBySchema = (values, schema = []) => {
  const errors = {};

  schema.forEach(
    ({
      name,
      required,
      min,
      max,
      pattern,
      match,
      _eval_required,
      patternMessage,
    }) => {
      const value = values[name];

      const isRequired = _eval_required ? eval(_eval_required) : required;

      if (isRequired && !value && value !== 0 && value !== false) {
        errors[name] = errorMessage('required');
      }

      if (min && value && value < min) {
        const message = errorMessage('minlength');
        errors[name] = message.replace('{min}', min);
      }

      if (max && value && value > max) {
        const message = errorMessage('maxlength');
        errors[name] = message.replace('{max}', max);
      }

      if (pattern && !new RegExp(pattern).test(value)) {
        errors[name] = patternMessage || errorMessage('pattern');
      }

      if (match && value) {
        if (value === values[match]) return;
        errors[name] = errorMessage('match');
      }
    }
  );

  return errors;
};
