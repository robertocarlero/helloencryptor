import { Button } from '@mui/material';

import AdviceContainer from 'components/common/AdviceContainer';

import encryptionAsset from 'assets/images/encryption-amico.svg';
import { useState } from 'react';
import LoadFileModal from 'components/files/LoadFileModal';

export default function ImportPasswords() {
  const [uploadFileModalIsVisible, setUploadFileModalIsVisible] =
    useState(false);

  const handleUploadButtonClick = () => {
    setUploadFileModalIsVisible(true);
  };

  const handleLoadFileModalClose = (result) => {
    console.log(result);
    setUploadFileModalIsVisible(false);
  };

  return (
    <section className="app-max-width m-auto h-100 d-flex flex-column justify-content-center">
      <AdviceContainer>
        <figure>
          <img
            src={encryptionAsset}
            alt="Un teléfono con icónos de enriptación"
          />
        </figure>
      </AdviceContainer>
      <p className="color_medium text-center">
        Con Hello Encryptor, puede cifrar sus contraseñas en un archivo de Excel
        simple, para que nunca más olvide su contraseña. Mantenga sus
        contraseñas con usted en todo momento en un archivo cifrado.
      </p>
      <Button onClick={handleUploadButtonClick}>Cargar Archivo</Button>
      <LoadFileModal
        opened={uploadFileModalIsVisible}
        onClose={handleLoadFileModalClose}
      />
    </section>
  );
}
