import { useState, useEffect  } from 'react';

export default function useValidatedInput(
  initialValue: string,
  regex: RegExp,
  maxLength?: number
) {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(regex.test(initialValue));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    if (maxLength && newValue.length > maxLength) {
      newValue = newValue.slice(0, maxLength);
    }
    setValue(newValue);
    setIsValid(regex.test(newValue));
  };
  const clear = () => {
    setValue('');
    setIsValid(false);
  };

  return {
    value,
    onChange: handleChange,
    isValid,
    clear,
  };
}
