import { useState } from 'react';

import { Button } from '@mui/material';

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

  const savePasswords = ({ user, passwords }) => {
    DB.set(`${DB_COLLECTIONS.USERS}`, user);

    passwords.forEach((password) => {
      DB.set(`${DB_COLLECTIONS.PASSWORDS}`, password);
    });
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
    const contentDecrypted = decryptData(encryptedData, result);
    savePasswords(contentDecrypted);
  };

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
    </section>
  );
}
