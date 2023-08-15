import { useState } from 'react';

import { Alert, IconButton, Snackbar, Button } from '@mui/material';

import { DB } from 'helpers/database';
import { decryptData } from 'helpers/encrypt';

import AdviceContainer from 'components/common/AdviceContainer';
import LoadFileModal from 'components/files/LoadFileModal';
import ConfirmDecryptPassword from 'components/passwords/ConfirmDecryptPassword';

import { DB_COLLECTIONS } from 'constants/db-collections';

import encryptionAsset from 'assets/images/upload-amico.svg';

export default function ImportPasswords() {
  const [uploadFileModalIsVisible, setUploadFileModalIsVisible] =
    useState(false);
  const [encryptedData, setEncryptedData] = useState();
  const [message, setMessage] = useState('');

  const savePasswords = async ({ user, passwords }) => {
    try {
      const currentUser = await DB.get(`${DB_COLLECTIONS.USERS}/${user.id}`);
      if (!currentUser) {
        await DB.set(`${DB_COLLECTIONS.USERS}`, user);
      }
      const promises = passwords.map(async (password) => {
        return await DB.set(`${DB_COLLECTIONS.PASSWORDS}`, password);
      });

      await Promise.all(promises);

      setMessage('Passwords imported successfully.');
    } catch (error) {
      setMessage('Error: Passwords not imported.');
    }
  };

  const handleLoadFileModalClose = (data) => {
    setUploadFileModalIsVisible(false);
    if (!data) return;
    const [file] = data;
    const reader = new FileReader();
    reader.onload = () => setEncryptedData(reader.result);
    reader.readAsText(file);
  };

  const handleUploadButtonClick = () => {
    setUploadFileModalIsVisible(true);
  };

  const onConfirmPasswordClose = async (result) => {
    setEncryptedData(null);
    if (!result) return;
    const contentDecrypted = await decryptData(encryptedData, result);
    savePasswords(contentDecrypted);
  };

  const onToastClose = () => {
    setMessage('');
  };

  const isSuccess = !message?.toLowerCase()?.match('error');

  return (
    <section className="app-max-width m-auto h-100 d-flex flex-column justify-content-center align-items-center">
      <AdviceContainer>
        <figure>
          <img src={encryptionAsset} alt="A phone with encryption numbers" />
        </figure>
      </AdviceContainer>
      <p className="color_medium text-center">
        You can upload your password here
      </p>
      <Button variant="outlined" onClick={handleUploadButtonClick}>
        Upload File
      </Button>
      <LoadFileModal
        opened={uploadFileModalIsVisible}
        onClose={handleLoadFileModalClose}
      />
      <ConfirmDecryptPassword
        opened={!!encryptedData}
        onClose={onConfirmPasswordClose}
        data={encryptedData}
      />
      {!!message && (
        <Snackbar open autoHideDuration={3000} onClose={onToastClose}>
          <Alert
            onClose={onToastClose}
            severity={isSuccess ? 'success' : 'error'}
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
      )}
    </section>
  );
}
