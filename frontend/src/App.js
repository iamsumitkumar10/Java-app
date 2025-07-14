import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const employee = { name, designation };

    try {
      const response = await fetch('http://localhost:9090/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });
      const data = await response.text();
      setResponseMessage(data);
      setName('');
      setDesignation('');
    } catch (error) {
      setResponseMessage('Error connecting to the backend');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>🎉 Congratulations! 🎉</h1>
      <p>You have successfully deployed a Java Full Stack application!</p>
      <h2>Employee Details Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Designation:
            <input
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default App;
