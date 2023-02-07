import React from 'react';
import { useQuery } from 'react-query';

import { DB } from 'helpers/database';

import UserItem from 'components/users/UserItem';
import AdviceContainer from 'components/common/AdviceContainer';
import Empty from 'components/common/Empty';

import { DB_COLLECTIONS } from 'constants/db-collections';

const UsersItemsList = ({ onItemClick = null }) => {
  const { data: items } = useQuery(`/${DB_COLLECTIONS.USERS}`, {
    queryFn: () => DB.getAll(DB_COLLECTIONS.USERS),
    initialData: [],
  });

  return (
    <div className="users-items-list pb-3">
      {!!items?.length &&
        items.map((item) => (
          <UserItem
            key={item?.id}
            data={item}
            onClick={onItemClick ? () => onItemClick(item) : null}
            className="mb-3"
          />
        ))}
      {!items?.length && (
        <AdviceContainer>
          <Empty title="No users to display" />
        </AdviceContainer>
      )}
    </div>
  );
};

export default UsersItemsList;
