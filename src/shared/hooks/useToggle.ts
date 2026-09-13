import { useState } from 'react';

export const useToggle = (initialValue: boolean = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = () => {
    setValue((prev) => !prev);
  };

  const open = () => setValue(true);
  const close = () => setValue(false);
  const isOpen = value;

  return {
    close,
    isOpen,
    open,
    toggle,
  };
};
