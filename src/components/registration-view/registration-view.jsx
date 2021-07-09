import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import { host } from '../../config';

import './registration-view.scss';

export function RegistrationView(props) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState(0000 - 00 - 00);
  const [errors, setErrors] = useState({});

  //  Input validation for registration form
  userUpdateValidation = () => {
    console.log('userUpdateValidation being called');

    let isValid = true;
    const errors = {};

    if (!name) {
      errors.nameIsRequired = 'Name is a required field';
      isValid = false;
    }
    if (!/^[a-z ]*$/i.test(name)) {
      errors.nameContent = 'Name may contain letters only.';
      isValid = false;
    }
    if (!username) {
      errors.usernameIsRequired = 'Username is a required field.';
      isValid = false;
    } else {
      if (username.length <= 5) {
        errors.usernameLength = 'Username must be 5 or more characters.';
        isValid = false;
      }
      if (!/^[a-z0-9]+$/i.test(username)) {
        errors.usernameContent =
          'Username may only contain alphanumeric characters.';
        isValid = false;
      }
    }
    if (!password) {
      errors.passwordIsRequired = 'Password is a required field.';
      isValid = false;
    } else {
      if (password.length < 7) {
        errors.passwordLength = 'Passwords must be 7 or more characters.';
        isValid = false;
      }
    }
    if (!email) {
      errors.emailIsRequired = 'Email is a required field.';
      isValid = false;
    } else {
      if (!/[@]/g.test(email)) {
        errors.emailNotValid = 'Email must be valid email.';
        isValid = false;
      }
    }
    if (!birthdate) {
      errors.birthdateIsRequired = 'Birthdate is a required field.';
      isValid = false;
    }

    console.log(errors);
    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = this.userUpdateValidation();

    if (isValid) {
      axios
        .post(host + '/users', {
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
    }
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
      {Object.values(errors).map((value) => {
        return (
          <div className="display-errors" key={value}>
            {value}
          </div>
        );
      })}
    </Form>
  );
}
/*
RegistrationView.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  birthdate: PropTypes.instanceOf(Date),
};
*/
