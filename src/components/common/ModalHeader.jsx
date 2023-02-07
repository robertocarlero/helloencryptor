import React from 'react';

import DialogTitle from '@mui/material/DialogTitle';

import CloseModalButton from './CloseModalButton';

const ModalHeader = ({
  children,
  onClose,
  title,
  color = 'primary',
  ...props
}) => {
  return (
    <DialogTitle {...props}>
      <span className={`color_${color}`}>{children || title}</span>
      {!!onClose && <CloseModalButton onClick={() => onClose(null)} />}
    </DialogTitle>
  );
};

export default ModalHeader;
