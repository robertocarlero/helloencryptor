import AdviceContainer from 'components/common/AdviceContainer';

import encryptionAsset from 'assets/images/encryption-amico.svg';

export default function Home() {
  return (
    <section className="app-max-width m-auto h-100 d-flex flex-column justify-content-center">
      <AdviceContainer>
        <figure>
          <img src={encryptionAsset} alt="A phone with encryption icons" />
        </figure>
      </AdviceContainer>
      <p className="color_medium text-center">
        Con Hello Encryptor, puede cifrar sus contraseñas en un archivo de Excel
        simple, para que nunca más olvide su contraseña. Mantenga sus
        contraseñas con usted en todo momento en un archivo cifrado.
      </p>
    </section>
  );
}
