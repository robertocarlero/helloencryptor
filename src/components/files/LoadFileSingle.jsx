import React, { useEffect } from 'react';
import { GenerateId } from '../../helpers/generate-id';

const LoadFileSingle = ({ children, onLoad, ...props }) => {
  const id = GenerateId();

  useEffect(() => {
    const label = document.getElementById(id);
    label.addEventListener('click', () => {
      const input = document.getElementById('__input_load__');
      input.value = null;
    });
  }, [id]);

  const handleChange = (event) => {
    const { files } = event.target;
    onLoad(files);
  };

  return (
    <>
      <input
        multiple
        type="file"
        className="d-none"
        id="__input_load__"
        onChange={handleChange}
        aria-label="input-file"
      />
      <label id={id} htmlFor="__input_load__" {...props}>
        {children}
      </label>
    </>
  );
};

export default LoadFileSingle;
