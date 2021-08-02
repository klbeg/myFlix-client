import React, { useState, Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { setLoginUser, setLoginPass } from '../../actions/actions.js';

import { host } from '../../config';
import { Form, Button, Card } from 'react-bootstrap';
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
        alert('The username or password you entered is incorrect.');
        console.log('Username or password is incorrect.');
      });
  };
  const linkRegister = (e) => {
    e.preventDefault();
  };

  return (
    <Card.Body className="basic-card-styling">
      <Form className="component-container col-md-5 col-xsm-12">
        <Form.Group /* className="col-md-4 pl-0" */ controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control name="Username" type="text" onChange={setUsername} />
        </Form.Group>
        <Form.Group /* className="col-md-4 pl-0" */ controlId="fromPassword">
          <Form.Label className="form-label">Password:</Form.Label>
          <Form.Control type="password" onChange={setPassword}></Form.Control>
        </Form.Group>
        <Button
          className="login-view-button"
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
          <Button className="login-view-button" type="link">
            Register
          </Button>
        </Link>
      </Form>
    </Card.Body>
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
