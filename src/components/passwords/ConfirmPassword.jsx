import { useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

import { useModalState } from 'hooks/useModalState';

import Error from 'components/common/Error';
import AdviceContainer from 'components/common/AdviceContainer';
import { PasswordInput } from 'components/inputs/PasswordInput';

const ConfirmPassword = ({
  opened,
  onClose,
  title,
  titleButton,
  color = 'primary',
  error,
  onConfirm,
  onRetry,
}) => {
  const { isOpened, setIsOpened } = useModalState(opened);
  const [inputValue, setInputValue] = useState('');

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
    if (!onConfirm) return;
    onConfirm(inputValue);
  };

  return (
    <Dialog
      open={isOpened}
      onClose={() => handleClose(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        className="text-center text-uppercase"
      >
        {title || 'Confirm password'}
      </DialogTitle>
      <DialogContent
        style={{ width: '500px', minHeight: '150px' }}
        className="d-flex flex-column align-items-center justify-content-center"
      >
        {!error && (
          <PasswordInput
            name="password_check"
            fullWidth
            value={inputValue}
            onChange={onInputChange}
            variant="outlined"
            label="User password"
            required
          />
        )}
        {!!error && (
          <AdviceContainer maxWidth={200}>
            <Error title={error} onRetry={onRetry} />
          </AdviceContainer>
        )}
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
  );
};

export default ConfirmPassword;
