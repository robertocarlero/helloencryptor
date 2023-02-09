import React, { useEffect } from 'react';

import { Button } from '@mui/material';

import { getInitialFormState } from '../../helpers/forms/utils';

import { useForm } from '../../hooks/useForm';

import InputsDisplayer from './InputsDisplayer';

const SimpleForm = ({
  value,
  onSave,
  onCancel,
  saveText,
  cancelText,
  schema,
}) => {
  const INITIAL_STATE = getInitialFormState(schema);

  const { values, onInputChange, errors, onSubmit, setValue } = useForm(
    INITIAL_STATE,
    onSave,
    schema
  );

  useEffect(() => {
    setValue(value || {});
  }, [value, setValue]);

  const onCancelButtonClick = () => {
    onCancel();
  };

  const onSaveButtonClick = () => {
    onSubmit();
  };

  return (
    <>
      <InputsDisplayer
        fields={schema}
        values={values}
        errors={errors}
        onInputChange={onInputChange}
      />
      <footer className="w-100 d-flex justify-content-end mt-3">
        {!!onCancel && (
          <Button onClick={onCancelButtonClick}>
            {cancelText || 'Cancel'}
          </Button>
        )}
        {!!onSave && (
          <Button
            variant="contained"
            className="ml-2"
            onClick={onSaveButtonClick}
          >
            {saveText || 'Save'}
          </Button>
        )}
      </footer>
    </>
  );
};

export default SimpleForm;
