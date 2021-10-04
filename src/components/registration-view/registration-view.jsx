import React, { useState, Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { setNewUser, setErrors, setUser } from '../../actions/actions';

import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { host } from '../../config';

import './registration-view.scss';
import { Card, Row } from 'react-bootstrap';

class RegistrationView extends Component {
  constructor() {
    super();
    const onBackClick = props;
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  //  Input validation for registration form
  handleUserInput = (evt) => {
    props.setNewUser({
      [evt.target.name]: evt.target.value,
    });
  };

  userUpdateValidation = () => {
    console.log('userUpdateValidation being called');

    let isValid = true;
    const errors = this.props.errors;
    let name = props.newUser.Name;
    let username = props.newUser.Username;
    let password = props.newUser.Password;
    let email = props.newUser.Email;
    let birthdate = props.newUser.Birthdate;

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

    props.setErrors(errors);
    return isValid;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const isValid = this.userUpdateValidation();

    if (isValid) {
      axios
        .post(host + '/users', {
          Name: props.newUser.Name,
          Username: props.newUser.Username,
          Password: props.newUser.Password,
          Email: props.newUser.Email,
          Birthdate: props.newUser.Birthdate,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert(
            `Welcome ${props.newUser.Username}.  Your account has been created, please log in.`
          );
          window.open('/', '_self');
        })
        .catch((e) => {
          console.log('The following error occured: ' + e);
        });
    }
  };
  render() {
    return (
      <Card.Body className="registration-view-container basic-card-styling p-3">
        <div className="col-md-5 col-xsm-12">
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                name="Name"
                type="text"
                onChange={this.handleUserInput}
              />
            </Form.Group>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                name="Username"
                type="text"
                onChange={this.handleUserInput}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                name="Password"
                type="text"
                onChange={this.handleUserInput}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                name="Email"
                type="text"
                onChange={this.handleUserInput}
              />
            </Form.Group>
            <Form.Group controlId="formBirthdate">
              <Form.Label>Birthdate</Form.Label>
              <Form.Control
                name="Birthdate"
                type="date"
                onChange={this.handleUserInput}
              />
            </Form.Group>
            {Object.values(this.props.errors).map((value) => {
              return (
                <div className="display-errors" key={value}>
                  {value}
                </div>
              );
            })}
            <Button type="submit" onClick={this.props.handleSubmit}>
              Submit
            </Button>
            <Link className="btn btn-primary" to={`/`}>
              Back
            </Link>
          </Form>
        </div>
      </Card.Body>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    user: state.user,
    newUser: state.newUser,
    errors: state.errors,
  };
};

export default connect(mapStateToProps, {
  setUser,
  setNewUser,
  setErrors,
})(RegistrationView);

RegistrationView.propTypes = {
  name: PropTypes.string,
  username: PropTypes.string,
  password: PropTypes.string,
  email: PropTypes.string,
  birthdate: PropTypes.instanceOf(Date),
};
