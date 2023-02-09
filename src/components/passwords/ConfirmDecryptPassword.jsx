import { useState } from 'react';
import { useModalState } from 'hooks/useModalState';

import ConfirmPassword from 'components/passwords/ConfirmPassword';
import { decryptData } from 'helpers/encrypt';

const ConfirmDecryptPassword = ({ opened, onClose, data, ...props }) => {
  const { isOpened, setIsOpened } = useModalState(opened);
  const [error, setError] = useState('');

  const handleClose = (value) => {
    setIsOpened(false);
    if (!onClose) return;
    onClose(value);
  };

  const onConfirm = (inputValue) => {
    try {
      const decryptedData = decryptData(data, inputValue);
      if (!decryptedData) throw new Error();
      handleClose(inputValue);
    } catch {
      setError('Passwords do not match.');
    }
  };

  const onRetry = () => {
    setError('');
  };

  return (
    <ConfirmPassword
      {...props}
      opened={isOpened}
      onConfirm={onConfirm}
      onRetry={onRetry}
      error={error}
      onClose={handleClose}
    />
  );
};

export default ConfirmDecryptPassword;
