import { useCallback, useMemo, useState } from 'react';
import { useQuery } from 'react-query';

import { DB } from 'helpers/database';

import PasswordItem from 'components/passwords/PasswordItem';
import AdviceContainer from 'components/common/AdviceContainer';
import Empty from 'components/common/Empty';
import SearchBar from 'components/common/SearchBar';

import { DB_COLLECTIONS } from 'constants/db-collections';

const PasswordsItemsList = ({
  onItemClick = null,
  searchable = true,
  userId,
}) => {
  const [query, setQuery] = useState('');

  const { data: items } = useQuery(`/${DB_COLLECTIONS.PASSWORDS}`, {
    queryFn: () => DB.getAll(DB_COLLECTIONS.PASSWORDS),
    initialData: [],
  });

  const matchesTheQuery = useCallback(
    (item) => {
      const match = query?.slice()?.toLowerCase();
      return item?.name?.toLowerCase()?.match(match);
    },
    [query]
  );

  const onSearchBarChange = (change) => {
    setQuery(change);
  };

  const filteredData = useMemo(() => {
    const data = (items || [])
      .filter(({ user_id } = {}) => (!userId ? true : user_id === userId))
      .filter((item) => (!searchable || !query ? true : matchesTheQuery(item)));

    return data;
  }, [userId, items, searchable, query, matchesTheQuery]);

  return (
    <>
      {searchable && <SearchBar onChange={onSearchBarChange} />}
      <div className="Passwords-items-list py-3">
        {filteredData?.map((item) => (
          <PasswordItem
            key={item?.id}
            data={item}
            onClick={onItemClick ? () => onItemClick(item) : null}
            className="mb-3"
          />
        ))}
        {!filteredData.length && (
          <AdviceContainer>
            <Empty title="No passwords to show" />
          </AdviceContainer>
        )}
      </div>
    </>
  );
};

export default PasswordsItemsList;
