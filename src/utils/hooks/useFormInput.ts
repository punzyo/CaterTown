import { useState, useEffect } from 'react';

export function useFormInput(initialValue: string | number) {
  const [value, setValue] = useState<string | number>(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
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
