import React from 'react';

import { Button } from '@mui/material';
import emptyAsset from '../../assets/images/empty-asset.svg';

const Empty = ({ title, onContinue }) => {
  return (
    <>
      <figure className="asset d-flex justify-content-center ">
        <img src={emptyAsset} alt="empty asset" style={{ width: '400px' }} />
      </figure>
      {title && <p className="color_medium text-center m-0 my-3">{title}</p>}
      {onContinue && (
        <Button
          className="rounded-pill px-5 shadow w-auto"
          color="primary"
          variant="contained"
          autoFocus
          onClick={onContinue}
        >
          Continue
        </Button>
      )}
    </>
  );
};

export default Empty;
