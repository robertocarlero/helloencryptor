import React, { useState } from 'react';

import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';

import { useModalState } from 'hooks/useModalState';
import LoadFile from './LoadFile';

const LoadFileModal = ({ onClose, opened = false, multiple = false }) => {
  const { isOpened, setIsOpened } = useModalState(opened);
  const [items, setItems] = useState();

  const closeModal = (data) => {
    setItems(data);
    setIsOpened(false);
    onClose(data);
  };

  const onLoadFileChange = (files) => {
    setItems(files);
  };

  return (
    <Dialog open={isOpened} onClose={() => closeModal(null)}>
      <DialogContent dividers style={{ width: '600px', height: '500px' }}>
        <LoadFile onChange={onLoadFileChange} multiple={multiple} />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => closeModal(null)}
          color="primary"
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          disabled={!items || !items.length}
          onClick={() => closeModal(items)}
          color="primary"
          variant="contained"
          autoFocus
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoadFileModal;
