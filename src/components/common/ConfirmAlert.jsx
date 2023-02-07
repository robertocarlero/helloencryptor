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

  const handleClose = (value) => {
    setIsOpened(false);
    if (!onClose) return;
    onClose(value);
  };

  return (
    <div>
      <Dialog
        open={isOpened}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title">
          {title || '¿Estás seguro?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message || 'Este cambio podría modificar data importante.'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            className="mr-2"
            color={color}
            onClick={() => handleClose(false)}
          >
            Cancelar
          </Button>
          <Button
            autoFocus
            color={color}
            variant="contained"
            onClick={() => handleClose(true)}
          >
            {titleButton || 'Continuar'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmAlert;
