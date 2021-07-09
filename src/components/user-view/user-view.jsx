import React, { Component } from 'react';
import { useState } from 'react';
import axios from 'axios';

import './user-view.scss';

import { host } from '../../config';

import { MovieCard } from '../movie-card/movie-card';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './user-view.scss';

export class UserView extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      disableForm: 'disabled',
      name: '',
      username: '',
      birthdate: '',
      email: '',
      password: '',
      valPassword: '',
      errors: {},
    };
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  enableForm() {
    console.log('enableform');
    this.setState({
      disableForm: '',
    });
  }

  handleUserInput(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  componentDidUpdate() {
    console.log('user-view updated!');
  }

  componentDidMount() {
    console.log('UserView mounted');
    this.setState({
      token: localStorage.getItem('token'),
    });
  }

  //  Input validation for update user form
  userUpdateValidation() {
    console.log('userUpdateValidation being called');
    const { name, username, email, password, valPassword } = this.state;
    let isValid = true;
    const errors = {};
    if (name) {
      if (!/^[a-z]+$/i.test(name)) {
        errors.nameContent = 'Name may contain letters only.';
        isValid = false;
      }
    }
    if (username) {
      if (username.length <= 5) {
        errors.usernameLength = 'Username must be 5 or more characters.';
        isValid = false;
      }
      if (!/^[a-z0-9 ]+$/i.test(username)) {
        errors.usernameContent =
          'Username may only contain alphanumeric characters.';
        isValid = false;
      }
    }
    if (email) {
      if (!/[@]/g.test(email)) {
        errors.emailNotValid = 'Email must be valid email.';
        isValid = false;
      }
    }
    if (password && valPassword) {
      if (password.length < 7) {
        errors.passwordLength =
          'Passwords must be at least 8 characters in length.';
        isValid = false;
      }
      if (password !== valPassword) {
        errors.passwordsMustMatch = 'Both passwords must match';
        isValid = false;
      }
    }
    this.setState({
      errors: errors,
    });
    return isValid;
  }

  onSaveChanges(username) {
    const isValid = this.userUpdateValidation();

    if (isValid) {
      if (this.state.username) {
        localStorage.setItem('newUsername', this.state.username);
      }
      axios
        .put(
          host + `/users/${username}`,
          {
            Name: this.state.name ? this.state.name : this.props.user.Name,
            Username: this.state.username
              ? this.state.username
              : this.props.user.Username,
            Email: this.state.email ? this.state.email : this.props.user.Email,
            // Password: this.state.password
            //   ? this.state.password
            //   : this.props.user.Password,
            Birthdate: this.state.birthdate
              ? this.state.birthdate
              : this.props.user.Birthdate.slice(0, 10),
          },
          {
            headers: { Authorization: `Bearer ${this.state.token}` },
          }
        )
        .catch((e) => {
          console.log('the following error occured onSavedChanges: ', e);
        });

      this.setState({
        disableForm: 'disabled',
      });
      localStorage.setItem('changes', 'pending-changes');
    }
  }

  //  deletefavoritemovies
  onDeleteFavorite(movie, user) {
    alert(
      `${movie.Title} was deleted from ${user.Username}'s favorite movies.`
    );
    axios.delete(host + `/users/${user}/movies/${movie}`, {
      headers: { Authorization: `Bearer ${this.state.token}` },
    });
    localStorage.setItem('changes', 'pending-changes');
  }

  onDeleteAccount(username) {
    console.log(username);
    axios.delete(host + `/users/${username}`, {
      headers: { Authorization: `Bearer ${this.state.token}` },
    });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    alert(`Your account for ${username} has been deleted.`);
  }

  render() {
    const { user, onBackClick, favMovies } = this.props;
    console.log(Object.values(this.state.errors));
    return (
      <>
        <Row>
          <Col>
            <Card.Body className="user-info">
              <h2>User Info:</h2>
              <Card.Text>
                Name:
                <input
                  name="name"
                  type="text"
                  placeholder={user.Name}
                  value={this.state.name}
                  disabled={this.state.disableForm}
                  ref="searchStringInput"
                  onChange={this.handleUserInput}
                ></input>
              </Card.Text>
              <Card.Text>
                Username:{' '}
                <input
                  name="username"
                  type="text"
                  value={this.state.username}
                  placeholder={user.Username}
                  disabled={this.state.disableForm}
                  onChange={this.handleUserInput}
                ></input>
              </Card.Text>
              <Card.Text>
                Email:{' '}
                <input
                  name="email"
                  type="text"
                  value={this.state.email}
                  placeholder={user.Email}
                  disabled={this.state.disableForm}
                  onChange={this.handleUserInput}
                ></input>
              </Card.Text>
              <Card.Text>
                Change Password:{' '}
                <input
                  name="password"
                  type="password"
                  placeholder="Enter new password"
                  disabled={this.state.disableForm}
                  onChange={this.handleUserInput}
                ></input>
                <input
                  name="valPassword"
                  type="password"
                  placeholder="Re-enter new password"
                  disabled={this.state.disableForm}
                  onChange={this.handleUserInput}
                ></input>
              </Card.Text>
              <Card.Text>Birthdate: {user.Birthdate.slice(0, 10)}</Card.Text>
              <Card.Text>
                <input
                  name="birthdate"
                  type="date"
                  disabled={this.state.disableForm}
                  onChange={this.handleUserInput}
                ></input>
              </Card.Text>
              <div>
                {Object.values(this.state.errors).map((value) => {
                  return (
                    <div className="display-errors" key={value}>
                      {value}
                    </div>
                  );
                })}
              </div>
              <Card.Text>
                <button type="button" onClick={() => this.enableForm()}>
                  {' '}
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => this.onSaveChanges(user.Username)}
                >
                  Save Updates
                </button>
                <button
                  type="button"
                  onClick={() => this.onDeleteAccount(user.Username)}
                >
                  Delete Account
                </button>
              </Card.Text>
              <Col>
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => {
                    onBackClick(null);
                  }}
                >
                  Back
                </Button>
              </Col>
            </Card.Body>
          </Col>
        </Row>
        <Row>
          {favMovies.map((favMovie) => {
            return (
              <Col
                md={3}
                id={favMovie._id}
                key={favMovie._id}
                className={favMovie.deleted ? 'deleted-favorite' : ''}
              >
                <MovieCard movie={favMovie} />
                <button
                  type="button"
                  onClick={() =>
                    this.onDeleteFavorite(favMovie._id, user.Username)
                  }
                >
                  Delete Favorite
                </button>
              </Col>
            );
          })}
        </Row>
      </>
    );
  }
}

{
  /*  Old version of birthdate update
 <Card.Text>
  Birthdate:{' '}
  <input
    name="birthdate"
    type="text"
    value={this.state.birthdate}
    placeholder={user.Birthdate}
    disabled={this.state.disableForm}
    onChange={this.handleUserInput}
  ></input>
</Card.Text> */
}
