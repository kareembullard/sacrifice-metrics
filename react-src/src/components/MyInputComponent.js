import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const MyInputComponent = () => {
  const [inputValue, setInputValue] = useLocalStorage('myInput', '');
  return (
    <div style={{ padding: '20px' }}>
      <h2>Persistent Input with localStorage</h2>
      <input
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder="Type something..."
        style={{ fontSize: '16px', padding: '8px', width: '300px' }}
      />
      <p>Saved value: <strong>{inputValue}</strong></p>
    </div>
  );
};

export default MyInputComponent;
