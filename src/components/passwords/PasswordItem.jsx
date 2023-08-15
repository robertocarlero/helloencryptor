import React, { useState } from 'react';
import { useQuery } from 'react-query';

import { IconButton } from '@mui/material';

import { Delete, Visibility } from '@mui/icons-material';

import { DB } from 'helpers/database';

import { queryClient } from 'containers/CustomQueryClientProvider';
import { Avatar } from 'components/common/Avatar';
import ConfirmAlert from 'components/common/ConfirmAlert';
import ConfirmUserPassword from 'components/users/ConfirmUserPassword';

import { DB_COLLECTIONS } from 'constants/db-collections';

import PasswordDetailModal from './PasswordDetailModal';

const PasswordItem = ({ data = {}, className, onClick, onKeyUp, ...props }) => {
  const [confirmIsVisible, setConfirmIsVisible] = useState(false);
  const [passwordDetailIsVisible, setPasswordDetailIsVisible] = useState(false);
  const [secretKey, setSecretKey] = useState(false);
  const [confirmPasswordIsVisible, setConfirmPasswordIsVisible] =
    useState(false);

  const { name, user_id } = data || {};

  const { data: user } = useQuery(`/${DB_COLLECTIONS.USERS}/${user_id}`, {
    queryFn: () => DB.get(`${DB_COLLECTIONS.USERS}/${user_id}`),
    initialData: {},
  });

  const onDeleteButtonClick = () => {
    setConfirmIsVisible(true);
  };

  const onConfirmClose = async (result) => {
    setConfirmIsVisible(false);
    if (!result) return;
    await DB.erase(`${DB_COLLECTIONS.PASSWORDS}/${data?.id}`);
    queryClient.invalidateQueries({
      queryKey: [`/${DB_COLLECTIONS.PASSWORDS}`],
    });
  };

  const onConfirmPasswordClose = async (result) => {
    setConfirmPasswordIsVisible(false);
    if (!result) return;
    setSecretKey(result);
    setPasswordDetailIsVisible(true);
  };

  const onVisibilityButtonClick = () => {
    if (!secretKey) {
      setConfirmPasswordIsVisible(true);
      return;
    }
    setPasswordDetailIsVisible(true);
  };

  const onPasswordDetailClose = () => {
    setPasswordDetailIsVisible(false);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyUp={() => onKeyUp && onKeyUp()}
      className={`w-100 bg_white shadow-sm radius_medium d-flex justify-content-between align-items-center p-2 ${
        className || ''
      }`}
      onClick={() => onClick && onClick()}
      {...props}
    >
      <div className="w-100 h-100 d-flex ">
        <Avatar alt={name} />
        <div className="ml-3 d-flex flex-column justify-content-center">
          <b>{name || 'Unknown'}</b>
          <p className="m-0 color_medium">{user?.name || 'Without user'}</p>
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
      <PasswordDetailModal
        data={data}
        secretKey={secretKey}
        opened={passwordDetailIsVisible}
        onClose={onPasswordDetailClose}
      />
    </div>
  );
};

export default PasswordItem;
