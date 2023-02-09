import React, { useMemo, useState } from 'react';

import {
  Alert,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Snackbar,
} from '@mui/material';
import { CopyAll, Visibility, VisibilityOff } from '@mui/icons-material';

import { DB } from 'helpers/database';

import { DB_COLLECTIONS } from 'constants/db-collections';
import { decryptText } from 'helpers/encrypt';

/**
 * @component
 * Component that displays a password details
 *
 * @param {*} onContinue - Function to close the modal
 * @param {*} data - Password details data
 * @param {string} data.name - Name of the password
 * @param {string} data.user_id - User id of the password
 * @param {string} data.site - Site of the password
 * @param {string} data.password - Value of the password
 */

const PasswordDetail = ({ onContinue, continueText, data, secretKey }) => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [message, setMessage] = useState('');

  const onContinueButtonClick = () => {
    onContinue();
  };
  const { password, name, user_id, site } = data;

  const user = DB.get(`${DB_COLLECTIONS.USERS}/${user_id}`) || {};

  const decryptedPassword = useMemo(() => {
    const passwordDecrypted = decryptText(password, secretKey);

    return passwordDecrypted;
  }, [password, secretKey]);

  const passwordHidden = decryptedPassword?.replace(/./g, '*');

  const onVisibilityButtonClick = () => {
    setPasswordIsVisible((current) => !current);
  };

  const onCopyButtonClick = async () => {
    try {
      await navigator.clipboard.writeText(decryptedPassword);
      setMessage('Password copied successfully!');
    } catch {
      setMessage('Error: Failed to copy');
    }
  };

  const onToastClose = () => {
    setMessage('');
  };

  const items = [
    {
      label: 'Name',
      value: name,
    },
    {
      label: 'Site',
      value: site,
    },
    {
      label: 'User',
      value: user?.name,
    },
  ];

  const isSuccess = !message?.toLowerCase()?.match('error');

  return (
    <div className="d-flex flex-column">
      <h5 className="font-weight-bold text-center text-uppercase">
        Password Detail
      </h5>

      <List dense>
        {items.map(({ label, value }) => (
          <>
            <ListItem>
              <ListItemText
                primary={value || '-'}
                secondary={<small className="text-uppercase">{label}</small>}
              />
            </ListItem>
            <Divider />
          </>
        ))}
        <ListItem
          secondaryAction={
            <>
              <IconButton onClick={onCopyButtonClick}>
                <CopyAll />
              </IconButton>
              <IconButton onClick={onVisibilityButtonClick}>
                {passwordIsVisible ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </>
          }
        >
          <ListItemText
            primaryTypographyProps={{ color: 'primary' }}
            primary={passwordIsVisible ? decryptedPassword : passwordHidden}
            secondary={<small className="text-uppercase">Password</small>}
          />
        </ListItem>
      </List>

      <footer className="w-100 d-flex justify-content-end mt-3">
        {!!onContinue && (
          <Button
            variant="contained"
            className="ml-2"
            onClick={onContinueButtonClick}
          >
            {continueText || 'Continue'}
          </Button>
        )}
      </footer>
      <Snackbar open={!!message} autoHideDuration={3000} onClose={onToastClose}>
        <Alert
          onClose={onToastClose}
          severity={isSuccess ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PasswordDetail;
