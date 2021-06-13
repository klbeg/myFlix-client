import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function RegistrationView(props) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState(0000 - 00 - 00);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form>
      <label>
        Name:
        <input
          className="registration-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
      </label>
      <label>
        Username:
        <input
          className="registration-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
      </label>
      <label>
        Password:
        <input
          className="registration-input"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </label>
      <label>
        Email:
        <input
          className="registration-input"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </label>
      <label>
        Birthdate:
        <input
          className="registration-input"
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        ></input>
      </label>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}

RegistrationView.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  birthdate: PropTypes.instanceOf(Date),
};
