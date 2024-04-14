import { useState } from 'react';

export function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }
  function clear() {
    setValue('');
  }
  const inputProps = {
    value: value,
    onChange: handleChange,
    clear
  };

  return inputProps;
}
