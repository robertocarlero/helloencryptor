import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { useModalState } from 'hooks/useModalState';

import CreateUser from './CreateUser';
import CloseModalButton from '../common/CloseModalButton';

const CreateUserModal = ({ opened, onClose, ...props }) => {
  const { isOpened, setIsOpened } = useModalState(opened);

  const closeModal = (data = null) => {
    setIsOpened(false);
    onClose(data);
  };

  return (
    <Dialog open={isOpened} onClose={() => closeModal()} maxWidth="xl">
      <DialogContent className="bg_primary_light " style={{ width: '520px' }}>
        <CloseModalButton onClick={() => closeModal()} />
        <CreateUser
          {...props}
          onCancel={() => closeModal()}
          onSuccess={closeModal}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserModal;
