import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MenuItem = ({ path = '', title, Icon }) => {
  const location = useLocation(path);
  const isSelected = location?.pathname?.match(path);

  return (
    <Link aria-label="link" to={path}>
      <li
        className={`item-link d-flex w-100 align-items-center mb-2 ${
          isSelected ? 'selected' : ''
        }`}
      >
        <div className="py-2 px-4">
          <Icon />
        </div>
        <p className="text-capitalize m-0">{title}</p>
      </li>
    </Link>
  );
};

export default MenuItem;
