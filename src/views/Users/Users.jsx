import React, { useState } from 'react';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { queryClient } from 'containers/CustomQueryClientProvider';
import CreateUserModal from 'components/users/CreateUserModal';
import UsersList from 'components/users/UsersList';

import { DB_COLLECTIONS } from 'constants/db-collections';
import PasswordsListModal from 'components/passwords/PasswordsListModal';

const Users = () => {
  const [userCreateModalIsVisible, setUserCreateModalIsVisible] =
    useState(false);
  const [currentUser, setCurrentUser] = useState(false);

  const onModalUserCreateClose = (created) => {
    setUserCreateModalIsVisible(false);
    if (!created) return;
    queryClient.invalidateQueries({ queryKey: [`/${DB_COLLECTIONS.USERS}`] });
  };

  const onCreateButtonClick = () => {
    setUserCreateModalIsVisible(true);
  };

  const onUserPasswordsModalClose = () => {
    setCurrentUser(null);
  };

  const onUsersListItemClick = (data) => {
    setCurrentUser(data);
  };

  return (
    <section className="app-max-width m-auto h-100">
      <div className="wrapper d-flex align-items-stretch h-100">
        <div className="w-100 h-100 d-flex flex-column">
          <section className="w-100 p-3 overflow-auto">
            <header className="p-3 mt-3">
              <h1 className="font-weight-bold title color_dark">
                Users list
                <div className="float-sm-right">
                  <ButtonGroup
                    variant="outlined"
                    aria-label="outlined button group"
                  >
                    <Button onClick={onCreateButtonClick}>
                      <AddCircleIcon />
                      Create a user
                    </Button>
                  </ButtonGroup>
                </div>
              </h1>
              <p className="m-0 color_medium ">
                Here you can find the list of all users
              </p>
            </header>
          </section>
          <section className="p-4">
            <UsersList onItemClick={onUsersListItemClick} />
          </section>
        </div>
      </div>
      <CreateUserModal
        opened={userCreateModalIsVisible}
        onClose={onModalUserCreateClose}
      />
      {currentUser && (
        <PasswordsListModal
          opened={!!currentUser}
          onClose={onUserPasswordsModalClose}
          userId={currentUser?.id}
        />
      )}
    </section>
  );
};

export default Users;
