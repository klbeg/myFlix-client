import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import './registration-view.scss';

export function RegistrationView(props) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState(0000 - 00 - 00);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://kb-movie-api.herokuapp.com/users', {
        Name: name,
        Username: username,
        Password: password,
        Email: email,
        Birthdate: birthdate,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self');
      })
      .catch((e) => {
        console.log('The following error occured: ' + e);
      });
  };

  return (
    <Form className="registration-view-container">
      <Form.Group controlId="formName">
        <Form.Label>Name:</Form.Label>
        <Form.Control type="text" onChange={(e) => setName(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="text" onChange={(e) => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formBirthdate">
        <Form.Label>Birthdate</Form.Label>
        <Form.Control
          type="date"
          onChange={(e) => setBirthdate(e.target.value)}
        />
      </Form.Group>
      <Button variant="secondary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}

RegistrationView.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  birthdate: PropTypes.instanceOf(Date),
};
