import React from 'react';
import { useQuery } from 'react-query';

import { DB } from 'helpers/database';

import PasswordItem from 'components/passwords/PasswordItem';
import AdviceContainer from 'components/common/AdviceContainer';
import Empty from 'components/common/Empty';

import { DB_COLLECTIONS } from 'constants/db-collections';

const PasswordsItemsList = ({ onItemClick = null }) => {
  const { data: items } = useQuery(`/${DB_COLLECTIONS.PASSWORDS}`, {
    queryFn: () => DB.getAll(DB_COLLECTIONS.PASSWORDS),
    initialData: [],
  });

  return (
    <div className="Passwords-items-list pb-3">
      {!!items.length &&
        items.map((item) => (
          <PasswordItem
            key={item?.id}
            data={item}
            onClick={onItemClick ? () => onItemClick(item) : null}
            className="mb-3"
          />
        ))}
      {!items.length && (
        <AdviceContainer>
          <Empty title="No hay contraseñas para mostrar" />
        </AdviceContainer>
      )}
    </div>
  );
};

export default PasswordsItemsList;
