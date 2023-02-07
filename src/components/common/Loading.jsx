import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import loadingAsset from '../../assets/images/loading-asset.svg';

const Loading = ({ title, simple, ...props }) => (
  <>
    {!simple && (
      <figure className="asset d-flex justify-content-center ">
        <img src={loadingAsset} alt="Loading asset" />
      </figure>
    )}
    <p className={`color_medium ${!simple ? 'text-center m-0 my-3' : ''}`}>
      {title || 'Cargando'}...
    </p>
    <CircularProgress {...props} />
  </>
);

export default Loading;
