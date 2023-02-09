import React, { useState } from 'react';

import { Alert, IconButton, Snackbar } from '@mui/material';
import { Download, Delete } from '@mui/icons-material';

import { DB } from 'helpers/database';

import { exportDataToEncryptedFile } from 'helpers/files';
import { queryClient } from 'containers/CustomQueryClientProvider';
import { Avatar } from 'components/common/Avatar';
import ConfirmAlert from 'components/common/ConfirmAlert';

import { DB_COLLECTIONS } from 'constants/db-collections';

import ConfirmUserPassword from './ConfirmUserPassword';

const DealerItem = ({ data = {}, className, onClick, onKeyUp, ...props }) => {
  const [confirmPasswordIsVisible, setConfirmPasswordIsVisible] =
    useState(false);
  const [confirmIsVisible, setConfirmIsVisible] = useState(false);
  const { name } = data;

  const [message, setMessage] = useState('');

  const getUserPasswords = () => {
    const passwords = DB.getAll(DB_COLLECTIONS.PASSWORDS);
    const userId = data?.id;
    const userPasswords = passwords.filter(({ user_id }) => user_id === userId);

    return userPasswords;
  };

  const downloadData = (secretKey) => {
    const userPasswords = getUserPasswords();

    exportDataToEncryptedFile(
      {
        user: data,
        passwords: userPasswords,
      },
      secretKey
    );

    setMessage('Passwords encrypted and downloaded successfully.');
  };

  const onConfirmClose = async (result) => {
    setConfirmIsVisible(false);

    if (!result) return;
    DB.erase(`${DB_COLLECTIONS.USERS}/${data?.id}`);
    const passwords = DB.getAll(DB_COLLECTIONS.PASSWORDS);
    const userPasswords = (passwords || []).filter(
      ({ user_id }) => user_id === data?.id
    );
    userPasswords.forEach(({ id }) => {
      DB.erase(`${DB_COLLECTIONS.PASSWORDS}/${id}`);
    });
    queryClient.invalidateQueries({ queryKey: [`/${DB_COLLECTIONS.USERS}`] });
  };

  const onConfirmPasswordClose = async (result) => {
    setConfirmPasswordIsVisible(false);

    if (!result) return;

    downloadData(result);
  };

  const onDeleteButtonClick = (event) => {
    event?.stopPropagation();
    setConfirmIsVisible(true);
  };

  const onDownloadButtonClick = (event) => {
    event?.stopPropagation();
    const userPasswords = getUserPasswords();

    if (!userPasswords?.length) {
      setMessage('Error: The user has no passwords.');
      return;
    }

    setConfirmPasswordIsVisible(true);
  };

  const onToastClose = () => {
    setMessage('');
  };

  const isSuccess = !message?.toLowerCase()?.match('error');

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onKeyUp={(...params) => onKeyUp && onKeyUp(...params)}
        className={`w-100 bg_white shadow-sm radius_medium d-flex justify-content-between align-items-center p-2 ${
          className || ''
        }`}
        onClick={(...params) => onClick && onClick(...params)}
        {...props}
      >
        <div className="w-100 h-100 d-flex ">
          <Avatar alt={name} />
          <div className="ml-3 d-flex flex-column justify-content-center">
            <b>{name || 'Unknown'}</b>
          </div>
        </div>
        <IconButton onClick={onDeleteButtonClick}>
          <Delete fontSize="small" />
        </IconButton>
        <IconButton onClick={onDownloadButtonClick}>
          <Download fontSize="small" />
        </IconButton>
        <ConfirmAlert
          color="error"
          opened={confirmIsVisible}
          onClose={onConfirmClose}
        />
      </div>
      <ConfirmUserPassword
        color="error"
        userId={data?.id}
        opened={confirmPasswordIsVisible}
        onClose={onConfirmPasswordClose}
      />
      {!!message && (
        <Snackbar open autoHideDuration={3000} onClose={onToastClose}>
          <Alert
            onClose={onToastClose}
            severity={isSuccess ? 'success' : 'error'}
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default DealerItem;
