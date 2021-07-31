import React, { useState, Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { setLoginUser, setLoginPass } from '../../actions/actions.js';

import { host } from '../../config';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './login-view.scss';

export function LoginView(props) {
  const setUsername = (e) => {
    props.setLoginUser(e.target.value);
  };

  const setPassword = (e) => {
    props.setLoginPass(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(host + '/login', {
        Username: props.loginUser,
        Password: props.loginPass,
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
        <Form.Control name="Username" type="text" onChange={setUsername} />
      </Form.Group>
      <Form.Group controlId="fromPassword">
        <Form.Label className="form-label">Password:</Form.Label>
        <Form.Control type="password" onChange={setPassword}></Form.Control>
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

let mapStateToProps = (state) => {
  return {
    loginUser: state.loginUser,
    loginPass: state.loginPass,
  };
};

export default connect(mapStateToProps, {
  setLoginUser,
  setLoginPass,
})(LoginView);
