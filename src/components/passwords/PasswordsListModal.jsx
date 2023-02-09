import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { useModalState } from 'hooks/useModalState';

import PasswordsList from './PasswordsList';
import CloseModalButton from '../common/CloseModalButton';

const PasswordsListModal = ({ opened, onClose, ...props }) => {
  const { isOpened, setIsOpened } = useModalState(opened);

  const closeModal = (data = null) => {
    setIsOpened(false);
    onClose(data);
  };

  return (
    <Dialog open={isOpened} onClose={() => closeModal()} maxWidth="xl">
      <DialogContent
        className="bg_primary_light "
        style={{ width: '520px', minHeight: '400px' }}
      >
        <CloseModalButton onClick={() => closeModal()} />
        <PasswordsList {...props} />
      </DialogContent>
    </Dialog>
  );
};

export default PasswordsListModal;
