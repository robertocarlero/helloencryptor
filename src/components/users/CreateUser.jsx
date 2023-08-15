import React, { useState } from 'react';

import ConfirmAlert from 'components/common/ConfirmAlert';

import Success from 'components/common/Success';

import { USER_CREATE_FORM_SCHEMA } from 'constants/forms/schemas';

import database from 'helpers/database';
import { DB_COLLECTIONS } from 'constants/db-collections';
import SimpleForm from 'components/common/SimpleForm';

import { createHash } from 'helpers/encrypt';

const CreateUser = ({ onCancel, onSuccess, data }) => {
  const [saved, setSaved] = useState(false);
  const [confirmIsVisible, setConfirmIsVisible] = useState(false);
  const [formValue, setFormValue] = useState();

  const DB = database();

  const sendData = async () => {
    const password = createHash(formValue?.password);
    const body = {
      ...formValue,
      password,
    };
    delete body.confirm_password;
    await DB.set(DB_COLLECTIONS.USERS, body);
    setSaved(true);
  };

  const onSimpleFormCancel = () => {
    onCancel();
  };

  const onSimpleFormSave = (value) => {
    setFormValue(value);
    setConfirmIsVisible(true);
  };

  const onContinueSuccessButtonClick = () => {
    onSuccess('All is success');
  };

  const onConfirmClose = async (result) => {
    setConfirmIsVisible(false);
    if (!result) return;
    sendData();
  };

  return (
    <div className="d-flex flex-column">
      <h5 className="font-weight-bold mb-5 text-center">Create User</h5>

      {!saved && (
        <SimpleForm
          onCancel={onSimpleFormCancel}
          onSave={onSimpleFormSave}
          schema={USER_CREATE_FORM_SCHEMA}
          value={data}
        />
      )}

      {saved && <Success onContinue={onContinueSuccessButtonClick} />}
      <ConfirmAlert
        color="error"
        opened={confirmIsVisible}
        onClose={onConfirmClose}
      />
    </div>
  );
};

export default CreateUser;
