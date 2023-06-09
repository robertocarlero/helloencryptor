import { useState } from 'react';

import { DB } from 'helpers/database';
import { useModalState } from 'hooks/useModalState';

import { DB_COLLECTIONS } from 'constants/db-collections';
import { createHash } from 'helpers/encrypt';
import ConfirmPassword from 'components/passwords/ConfirmPassword';

const ConfirmUserPassword = ({ opened, onClose, userId, ...props }) => {
  const { isOpened, setIsOpened } = useModalState(opened);
  const [error, setError] = useState('');

  const { password } = DB.get(`${DB_COLLECTIONS.USERS}/${userId}`) || {};

  const handleClose = (value) => {
    setIsOpened(false);
    if (!onClose) return;
    onClose(value);
  };

  const onConfirm = (inputValue) => {
    const confirmPassword = createHash(inputValue);

    if (password === confirmPassword) return handleClose(inputValue);

    return setError('Passwords do not match.');
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

export default ConfirmUserPassword;
