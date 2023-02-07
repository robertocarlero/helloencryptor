import { useCallback, useState } from 'react';
import { validateObjectBySchema } from '../helpers/forms/validate';

export const useForm = (initialState, callback, schema) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const onInputChange = (e) => {
    const { name, value, type } = e.target;

    setValues((currentvalue) => ({
      ...currentvalue,
      [name]: value,
    }));
  };

  const reset = () => {
    setValues(initialState);
    setErrors({});
  };

  const setValue = useCallback(
    (value) => {
      setValues(value);
    },
    [setValues]
  );

  const onSubmit = (e) => {
    if (e) e.preventDefault();
    const result = validateObjectBySchema(values, schema);
    if (!Object.keys(result).length) {
      setErrors({});
      callback(values);
    } else setErrors(result);
  };

  return {
    values,
    errors,
    onInputChange,
    reset,
    onSubmit,
    setValue,
  };
};
