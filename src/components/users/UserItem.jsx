import React, { useState } from 'react';

import { IconButton } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

import { DB } from 'helpers/database';

import { Avatar } from 'components/common/Avatar';
import ConfirmAlert from 'components/common/ConfirmAlert';

import { DB_COLLECTIONS } from 'constants/db-collections';
import { queryClient } from 'containers/CustomQueryClientProvider';

const DealerItem = ({ data = {}, className, onClick, onKeyUp, ...props }) => {
  const [confirmIsVisible, setConfirmIsVisible] = useState(false);
  const { name } = data;

  const onDeleteButtonClick = () => {
    setConfirmIsVisible(true);
  };

  const onConfirmClose = async (result) => {
    setConfirmIsVisible(false);
    if (!result) return;
    DB.erase(`${DB_COLLECTIONS.USERS}/${data?.id}`);
    queryClient.invalidateQueries({ queryKey: [`/${DB_COLLECTIONS.USERS}`] });
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyUp={(...params) => onKeyUp && onKeyUp(...params)}
      className={`w-100 bg_white shadow radius_medium d-flex justify-content-between align-items-center p-2 ${
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
        <DeleteIcon fontSize="small" />
      </IconButton>
      <ConfirmAlert
        color="error"
        opened={confirmIsVisible}
        onClose={onConfirmClose}
      />
    </div>
  );
};

export default DealerItem;
