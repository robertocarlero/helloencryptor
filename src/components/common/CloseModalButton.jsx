import React from 'react';

import { IconButton } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

const CloseModalButton = ({ onClick, className }) => (
  <div
    className={`position-absolute ${className || ''}`}
    style={{ right: '0px', top: '0px' }}
  >
    <IconButton onClick={onClick}>
      <CloseIcon />
    </IconButton>
  </div>
);

export default CloseModalButton;
