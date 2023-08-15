import { useState } from 'react';
import { useQuery } from 'react-query';

import { DB } from 'helpers/database';
import { createHash } from 'helpers/encrypt';
import { useModalState } from 'hooks/useModalState';

import ConfirmPassword from 'components/passwords/ConfirmPassword';

import { DB_COLLECTIONS } from 'constants/db-collections';

const ConfirmUserPassword = ({ opened, onClose, userId, ...props }) => {
  const { isOpened, setIsOpened } = useModalState(opened);
  const [error, setError] = useState('');

  const { data } = useQuery(`/${DB_COLLECTIONS.USERS}/${userId}`, {
    queryFn: () => DB.get(`${DB_COLLECTIONS.USERS}/${userId}`),
    initialData: {},
  });

  const { password } = data || {};

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
