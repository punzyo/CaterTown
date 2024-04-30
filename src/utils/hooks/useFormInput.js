import { useState, useEffect } from 'react';

export function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  function handleChange(e) {

    setValue(e.target.value);
  }
  function clear() {
    setValue('');
  }
  function reset() {
    setValue(initialValue);
  }
  const inputProps = {
    value: value,
    onChange: handleChange,
    clear,
    reset,
  };

  return inputProps;
}
