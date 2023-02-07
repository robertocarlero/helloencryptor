import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { useModalState } from 'hooks/useModalState';

import CreatePassword from './CreatePassword';
import CloseModalButton from '../common/CloseModalButton';

const CreatePasswordModal = ({ opened, onClose, ...props }) => {
  const { isOpened, setIsOpened } = useModalState(opened);

  const closeModal = (data) => {
    setIsOpened(false);
    onClose(data);
  };

  return (
    <Dialog open={isOpened} onClose={() => closeModal(null)} maxWidth="xl">
      <DialogContent className="bg_primary_light " style={{ width: '520px' }}>
        <CloseModalButton onClick={() => closeModal(null)} />
        <CreatePassword
          {...props}
          onCancel={() => closeModal(null)}
          onSuccess={closeModal}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreatePasswordModal;
