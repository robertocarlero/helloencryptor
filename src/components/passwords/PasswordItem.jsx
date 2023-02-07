import React, { useState } from 'react';

import { IconButton } from '@mui/material';

import { Delete, Visibility } from '@mui/icons-material';

import database from 'helpers/database';

import { Avatar } from 'components/common/Avatar';
import ConfirmAlert from 'components/common/ConfirmAlert';

import { DB_COLLECTIONS } from 'constants/db-collections';

import { AES, enc } from 'crypto-js';
import ConfirmUserPassword from 'components/users/ConfirmUserPassword';

const DealerItem = ({ data = {}, className, onClick, onKeyUp, ...props }) => {
  const [confirmIsVisible, setConfirmIsVisible] = useState(false);
  const [confirmPasswordIsVisible, setConfirmPasswordIsVisible] =
    useState(false);

  const { name, user_id, password } = data;

  const DB = database();
  const user = DB.get(`${DB_COLLECTIONS.USERS}/${user_id}`) || {};

  const decryptPassword = (secret_key) => {
    const cipherText = AES.decrypt(password, secret_key);
    const passwordDecrypted = cipherText.toString(enc.Utf8);
    console.log(passwordDecrypted);
  };

  const onDeleteButtonClick = () => {
    setConfirmIsVisible(true);
  };

  const onConfirmClose = async (result) => {
    setConfirmIsVisible(false);
    if (!result) return;
    DB.erase(`${DB_COLLECTIONS.PASSWORDS}/${data?.id}`);
  };

  const onConfirmPasswordClose = async (result) => {
    setConfirmIsVisible(false);
    if (!result) return;
    decryptPassword(result);
  };

  const onVisibilityButtonClick = () => {
    setConfirmPasswordIsVisible(true);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyUp={() => onKeyUp && onKeyUp()}
      className={`w-100 bg_white shadow radius_medium d-flex justify-content-between align-items-center p-2 ${
        className || ''
      }`}
      onClick={() => onClick && onClick()}
      {...props}
    >
      <div className="w-100 h-100 d-flex ">
        <Avatar alt={name} />
        <div className="ml-3 d-flex flex-column justify-content-center">
          <b>{name || 'Desconocido'}</b>
          <p className="m-0 color_medium">{user?.name || 'Sin usuario'}</p>
        </div>
      </div>
      <IconButton onClick={onDeleteButtonClick}>
        <Delete fontSize="small" />
      </IconButton>
      <IconButton onClick={onVisibilityButtonClick}>
        <Visibility fontSize="small" />
      </IconButton>
      <ConfirmAlert
        color="error"
        opened={confirmIsVisible}
        onClose={onConfirmClose}
      />
      <ConfirmUserPassword
        color="error"
        userId={user_id}
        opened={confirmPasswordIsVisible}
        onClose={onConfirmPasswordClose}
      />
    </div>
  );
};

export default DealerItem;
