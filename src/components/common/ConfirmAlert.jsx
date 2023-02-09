import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { useModalState } from 'hooks/useModalState';

const ConfirmAlert = ({
  opened,
  onClose,
  title,
  message,
  titleButton,
  color = 'primary',
}) => {
  const { isOpened, setIsOpened } = useModalState(opened);

  const handleClose = (value = null) => {
    setIsOpened(false);
    if (!onClose) return;
    onClose(value);
  };

  return (
    <div>
      <Dialog
        open={isOpened}
        onClose={() => handleClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title">
          {title || 'Are you sure?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message || 'This change could modify important data.'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className="mr-2" color={color} onClick={() => handleClose()}>
            Cancel
          </Button>
          <Button
            autoFocus
            color={color}
            variant="contained"
            onClick={() => handleClose(true)}
          >
            {titleButton || 'Continue'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmAlert;
