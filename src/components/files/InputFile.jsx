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
        <h5 className="text-center m-0 color_black">You can drag a file</h5>
        <p className="text-center color_medium">or you can also</p>

        <Button variant="outlined" color="primary" className="p-0">
          <LoadFileSingle
            className="px-4 py-2 btn d-flex align-items-center color_primary mb-0"
            onLoad={onLoadFileSingleChange}
          >
            <SearchIcon className="mr-2" />
            Search the file
          </LoadFileSingle>
        </Button>
      </section>
    </>
  );
};

export default InputFile;
