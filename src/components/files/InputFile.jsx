import React, { useCallback } from 'react';

import { useDropzone } from 'react-dropzone';

import { Button } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

import LoadFileSingle from './LoadFileSingle';
import asset from '../../assets/images/upload-file-asset.svg';

const InputFile = ({ onChange }) => {
  const onDrop = useCallback((files) => onChange(files), [onChange]);

  const onLoadFileSingleChange = (files) => {
    onChange([...files]);
  };

  const { getRootProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <section
        aria-label="dropzone"
        {...getRootProps()}
        className={`main-container w-100 h-100 d-flex flex-column align-items-center border_dashed color_medium b-4 ${
          isDragActive ? 'bg_light' : ''
        }`}
      >
        <figure className="asset px-5 d-flex justify-content-center ">
          <img src={asset} alt="" />
        </figure>
        <h5 className="text-uppercase text-center m-0 color_black">
          Puedes arrastrar un archivo
        </h5>
        <p className="px-5 text-center color_dark">o también puedes</p>
        <div className="d-flex justify-content-center w-100 p-2">
          <Button variant="contained" color="primary" className="p-0 shadow">
            <LoadFileSingle
              className="px-4 py-2 btn d-flex align-items-center color_white mb-0"
              onLoad={onLoadFileSingleChange}
            >
              <SearchIcon />
              Burcar el archivo
            </LoadFileSingle>
          </Button>
        </div>
      </section>
    </>
  );
};

export default InputFile;
