import { useState, useEffect } from 'react';

export function useModalState(initialState = false) {
  const [isOpened, setIsOpened] = useState(initialState);

  useEffect(() => {
    setIsOpened(!!initialState);
  }, [initialState, setIsOpened]);

  return {
    isOpened,
    setIsOpened,
  };
}
