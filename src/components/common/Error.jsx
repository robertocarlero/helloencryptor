import React from 'react';

import { Button } from '@mui/material';
import errorAsset from '../../assets/images/error-asset.svg';

const Error = ({ title, onCancel, onRetry, color = 'primary' }) => {
  return (
    <>
      <figure className="asset d-flex justify-content-center w-100">
        <img src={errorAsset} alt="Error asset" style={{ width: '100%' }} />
      </figure>
      {title && <p className="color_medium text-center m-0 my-3">{title}</p>}
      <div className="d-flex">
        {onCancel && (
          <Button color={color} variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
        )}
        {onRetry && (
          <Button
            className={onCancel ? 'ml-2' : ''}
            color={color}
            variant="contained"
            onClick={onRetry}
          >
            Try again
          </Button>
        )}
      </div>
    </>
  );
};

export default Error;
