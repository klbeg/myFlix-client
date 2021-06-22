import React, { useState } from 'react';
import axios from 'axios';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://kb-movie-api.herokuapp.com/login', {
        //  .post('https://localhost:8080/myFlixDb/login', {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.log('The username you entered does not exist.');
      });
  };
  const linkRegister = (e) => {
    e.preventDefault();
  };

  return (
    <Form className="component-container">
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="fromPassword">
        <Form.Label className="form-label">Password:</Form.Label>
        <Form.Control
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Button
        className="login-view-button"
        variant="secondary"
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </Button>
      <br></br>
      <Form.Label className="register-link-label">
        Don't have an account?
      </Form.Label>
      <br></br>
      <Link to={'/register'}>
        <Button className="login-view-button" variant="secondary" type="link">
          Register
        </Button>
      </Link>
    </Form>
  );
}
