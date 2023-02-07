import React, { useState } from 'react';

import FilesList from './FilesList';
import InputFile from './InputFile';

const LoadFile = ({ multiple = false, onChange }) => {
  const [files, setFiles] = useState();

  const onInputFileChange = (change) => {
    setFiles(change);
  };

  const onFilesListSelect = (value) => {
    onChange(value);
  };

  return (
    <>
      {!files ? (
        <InputFile onChange={onInputFileChange} />
      ) : (
        <FilesList
          onSelect={onFilesListSelect}
          multiple={multiple}
          files={files}
        />
      )}
    </>
  );
};

export default LoadFile;
