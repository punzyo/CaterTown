import { useState, useEffect } from 'react';

export function useFormInput(initialValue: string) {
  const [value, setValue] = useState<string>(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
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
