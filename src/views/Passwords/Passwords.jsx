import React, { useState } from 'react';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import CreatePasswordModal from 'components/passwords/CreatePasswordModal';
import PasswordsList from 'components/passwords/PasswordsList';

const Passwords = () => {
  const [modalPasswordCreateModalIsVisible, setPasswordCreateModalIsVisible] =
    useState(false);

  const onModalPasswordCreateClose = () => {
    setPasswordCreateModalIsVisible(false);
  };

  const onCreateButtonClick = () => {
    setPasswordCreateModalIsVisible(true);
  };

  return (
    <section className="app-max-width m-auto h-100">
      <div className="wrapper d-flex align-items-stretch h-100">
        <div className="w-100 h-100 d-flex flex-column">
          <section className="w-100 p-3 overflow-auto">
            <header className="p-3 mt-3">
              <h1 className="font-weight-bold title color_dark">
                Passwords list
                <div className="float-sm-right">
                  <ButtonGroup
                    variant="outlined"
                    aria-label="outlined button group"
                  >
                    <Button onClick={onCreateButtonClick}>
                      <AddCircleIcon />
                      Create a password
                    </Button>
                  </ButtonGroup>
                </div>
              </h1>
              <p className="m-0 color_medium ">
                Here you can find the list of all passwords
              </p>
            </header>
          </section>
          <section className="p-4">
            <PasswordsList />
          </section>
        </div>
      </div>
      <CreatePasswordModal
        opened={modalPasswordCreateModalIsVisible}
        onClose={onModalPasswordCreateClose}
      />
    </section>
  );
};

export default Passwords;
