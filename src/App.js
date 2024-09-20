import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage('Welcome to TorSee!');
  }, []);

  return (
    <div>
      <h1>Hello, World!</h1>
      <h2>Message from server: {message}</h2>
    </div>
  );
}

export default App;