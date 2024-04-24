import { useState } from 'react';

export default function useValidatedInput(initialValue, regex) {
    const [value, setValue] = useState(initialValue);
    const [isValid, setIsValid] = useState(false);
  
    const handleChange = (e) => {
      const newValue = e.target.value;
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
      clear
    };
  }