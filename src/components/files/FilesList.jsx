import React, { useState } from 'react';

import DescriptionIcon from '@mui/icons-material/Description';

import Item from '../common/Item';

const FilesList = ({ onSelect, files, multiple }) => {
  const [itemsSelected, setItemsSelected] = useState([]);

  const handleSelection = (value) => {
    setItemsSelected(value);
    onSelect(value);
  };

  const addItem = (item) => {
    const items = itemsSelected.slice();
    const data = !multiple ? [item] : [...items, item];
    handleSelection(data);
  };

  const removeItem = (index) => {
    const items = itemsSelected.slice();
    items.splice(index, 1);
    handleSelection(items);
  };

  const onOneItemSelected = (item) => {
    const items = itemsSelected;
    const index = items.findIndex((element) => element.name === item.name);
    if (index >= 0) return removeItem(index);
    return addItem(item);
  };

  return (
    <div className="w-100 main-container p-0">
      <div className="w-100">
        {files &&
          files.map((file) => (
            <div key={file.name} className="mb-3">
              <Item
                className="shadow"
                selectable
                startIcon={<DescriptionIcon />}
                title={file.name}
                description={
                  <span>
                    <b>Size:</b> {file.size}KB
                  </span>
                }
                onSelect={() => onOneItemSelected(file)}
                active={
                  itemsSelected &&
                  !!itemsSelected.find((item) => item.name === file.name)
                }
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default FilesList;
