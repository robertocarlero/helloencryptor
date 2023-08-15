import React from 'react';

import { Button } from '@mui/material';
import successAsset from '../../assets/images/success-asset.svg';

const Success = ({ title, onContinue, color = 'primary' }) => {
  return (
    <>
      <figure className="asset px-5 d-flex justify-content-center w-100">
        <img src={successAsset} alt="Success asset" style={{ width: '100%' }} />
      </figure>
      {title && <p className="color_medium text-center m-0 my-3">{title}</p>}
      {onContinue && (
        <Button
          color={color}
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

export default Success;
