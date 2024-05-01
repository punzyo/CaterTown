import { useState } from 'react';

export default function useValidatedInput(initialValue, regex, maxLength) {
    const [value, setValue] = useState(initialValue);
    const [isValid, setIsValid] = useState(false);
  
    const handleChange = (e) => {
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
      clear
    };
}
