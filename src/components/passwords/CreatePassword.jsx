import React, { useState } from 'react';

import { DB } from 'helpers/database';

import SimpleForm from 'components/common/SimpleForm';
import Success from 'components/common/Success';
import ConfirmUserPassword from 'components/users/ConfirmUserPassword';

import { PASSWORD_CREATE_FORM_SCHEMA } from 'constants/forms/schemas';
import { DB_COLLECTIONS } from 'constants/db-collections';

import { useQuery } from 'react-query';
import { queryClient } from 'containers/CustomQueryClientProvider';
import { encryptText } from 'helpers/encrypt';

const CreatePassword = ({ onCancel, onSuccess, data }) => {
  const [saved, setSaved] = useState(false);
  const [confirmIsVisible, setConfirmIsVisible] = useState(false);
  const [formValue, setFormValue] = useState();

  const fields = PASSWORD_CREATE_FORM_SCHEMA;

  const userFieldIndex = PASSWORD_CREATE_FORM_SCHEMA.findIndex(
    ({ name }) => name === 'user_id'
  );

  const { data: users } = useQuery(`/${DB_COLLECTIONS.USERS}`, {
    queryFn: () => DB.getAll(DB_COLLECTIONS.USERS),
    initialData: [],
  });

  fields[userFieldIndex].options = (users || []).map(({ id, name }) => ({
    title: name,
    value: id,
  }));

  const sendData = async (secretKey) => {
    const password = encryptText(formValue?.password, secretKey);

    const body = {
      ...formValue,
      password,
    };

    delete body.confirm_password;

    await DB.set(DB_COLLECTIONS.PASSWORDS, body);
    queryClient.invalidateQueries({
      queryKey: [`/${DB_COLLECTIONS.PASSWORDS}`],
    });
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
    sendData(result);
  };

  return (
    <div className="d-flex flex-column">
      <h5 className="font-weight-bold mb-5 text-center">Create Password</h5>

      {!saved && (
        <SimpleForm
          onCancel={onSimpleFormCancel}
          onSave={onSimpleFormSave}
          schema={fields}
          value={data}
        />
      )}

      {saved && <Success onContinue={onContinueSuccessButtonClick} />}
      <ConfirmUserPassword
        color="error"
        userId={formValue?.user_id}
        opened={confirmIsVisible}
        onClose={onConfirmClose}
      />
    </div>
  );
};

export default CreatePassword;
