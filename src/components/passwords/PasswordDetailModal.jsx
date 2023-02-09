import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { useModalState } from 'hooks/useModalState';

import PasswordDetail from './PasswordDetail';
import CloseModalButton from '../common/CloseModalButton';

const PasswordDetailModal = ({ opened, onClose, ...props }) => {
  const { isOpened, setIsOpened } = useModalState(opened);

  const closeModal = (data) => {
    setIsOpened(false);
    onClose(data);
  };

  return (
    <Dialog open={isOpened} onClose={() => closeModal(null)} maxWidth="xl">
      <DialogContent className="bg_primary_light " style={{ width: '520px' }}>
        <CloseModalButton onClick={() => closeModal(null)} />
        <PasswordDetail {...props} onContinue={closeModal} />
      </DialogContent>
    </Dialog>
  );
};

export default PasswordDetailModal;
