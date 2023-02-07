import React from 'react';

import { Radio } from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Item = ({
  selectable,
  active,
  disabled,
  title,
  description,
  onSelect,
  startIcon,
  end,
  color = 'primary',
  className,
}) => {
  const emitSelection = () => {
    if (disabled) return;
    if (!onSelect) return;
    onSelect(!active);
  };

  const onClick = (event) => {
    event.preventDefault();
    emitSelection();
  };

  const onKeyUpHandler = (event) => {
    event.preventDefault();
    const allowedKey = 'Enter';
    if (event.key !== allowedKey) return;
    emitSelection();
  };

  return (
    <>
      <div
        aria-label="item"
        className={`w-100 container radius_large p-3 d-flex justify-content-between btn  ${
          active && !disabled ? `bg_${color}_light` : 'bg_medium'
        } ${className || ''}`}
        role="button"
        onClick={onClick}
        onKeyUp={onKeyUpHandler}
        tabIndex={0}
      >
        <div className="start d-flex align-items-center">
          {startIcon && (
            <div
              className={`asset bg_white radius_small p-2 ${
                active && !disabled ? `color_${color}` : 'color_dark'
              }`}
            >
              {startIcon}
            </div>
          )}
          <div
            className={`mx-3 m-0 text-truncate ${
              active && !disabled ? `color_${color}` : 'color_dark'
            }`}
          >
            <b>{title}</b> <br />
            <small className="float-left">{description}</small>
          </div>
        </div>
        <div className="end p-2">
          {end}
          {selectable && !end && (
            <Radio
              checked={selectable && active}
              color={active ? color : 'secondary'}
              checkedIcon={<CheckCircleIcon />}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Item;
