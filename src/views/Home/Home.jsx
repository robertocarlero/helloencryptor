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
        With Hello Encryptor, you can encrypt and save your passwords, so you
        never forget your password again. Keep your passwords with you at all
        times in an encrypted file.
      </p>
    </section>
  );
}
