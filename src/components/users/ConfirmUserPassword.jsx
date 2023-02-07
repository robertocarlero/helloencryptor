import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import Error from 'components/common/Error';
import { DB_COLLECTIONS } from 'constants/db-collections';
import database from 'helpers/database';

import { useModalState } from 'hooks/useModalState';
import { useState } from 'react';

import { SHA256, enc } from 'crypto-js';

const ConfirmUserPassword = ({
  opened,
  onClose,
  title,

  titleButton,
  userId,
  color = 'primary',
}) => {
  const { isOpened, setIsOpened } = useModalState(opened);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const DB = database();
  const { password } = DB.get(`${DB_COLLECTIONS.USERS}/${userId}`) || {};

  const handleClose = (value) => {
    setIsOpened(false);
    if (!onClose) return;
    onClose(value);
  };

  const onInputChange = ({ target }) => {
    const { value } = target;

    setInputValue(value);
  };

  const onConfirmButtonClick = () => {
    const hash = SHA256(inputValue);
    const confirmPassword = hash.toString(enc.Hex);

    if (password === confirmPassword) return handleClose(inputValue);

    return setError('Passwords do not match.');
  };

  const onRetryButtonClick = () => {
    setError('');
  };

  return (
    <div>
      <Dialog
        open={isOpened}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          className="text-center text-uppercase"
        >
          {title || 'Confirm user password'}
        </DialogTitle>
        <DialogContent
          style={{ width: '520px', minHeight: '200px' }}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          {!error && (
            <TextField
              name="password_check"
              fullWidth
              value={inputValue}
              onChange={onInputChange}
              variant="outlined"
              label="User password"
              required
            />
          )}
          {!!error && <Error title={error} onRetry={onRetryButtonClick} />}
        </DialogContent>
        <DialogActions>
          <Button
            className="mr-2"
            color={color}
            onClick={() => handleClose(false)}
          >
            Cancel
          </Button>
          <Button
            autoFocus
            color={color}
            variant="contained"
            onClick={onConfirmButtonClick}
            disabled={!inputValue || !!error}
          >
            {titleButton || 'Continue'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmUserPassword;
