//  am I necessary?
//  import { useState } from 'react';
//  import { Link } from 'react-router-dom';

import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import axios from 'axios';

import { host } from '../../config';
import { Row, Col, Button, Card } from 'react-bootstrap';

import { setToken, setDisableForm } from '../../actions/actions';

import { MovieCard } from '../movie-card/movie-card';

import './user-view.scss';

class UserView extends React.Component {
  constructor() {
    super();
    this.state = {
      disableUpdatePassword: 'disabled',
      name: '',
      username: '',
      birthdate: '',
      email: '',
      password: '',
      valPassword: '',
      errors: {},
      passErrors: {},
    };
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  enableForm() {
    this.props.setDisableForm('');
  }

  enablePasswordUpdate() {
    this.setState({
      disableUpdatePassword: '',
    });
  }

  handleUserInput(evt) {
    //this.setChangeUser({
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  componentDidMount() {
    console.log('UserView mounted');
    this.props.setToken(localStorage.getItem('token'));

    this.setState({
      birthdate: this.props.user.Birthdate,
      name: this.props.user.Name,
      email: this.props.user.Email,
    });
  }

  //  Input validation for update user form
  userUpdateValidation() {
    console.log('userUpdateValidation being called');
    const { name, username, email } = this.state;
    let isValid = true;
    const errors = {};
    if (name) {
      if (!/^[a-z ]+$/i.test(name)) {
        errors.nameContent = 'Name may contain letters only.';
        isValid = false;
      }
    }
    if (email) {
      if (!/[@]/g.test(email)) {
        errors.emailNotValid = 'Email must be valid email.';
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
            Email: this.state.email ? this.state.email : this.props.user.Email,
            Birthdate: this.state.birthdate
              ? this.state.birthdate
              : this.props.user.Birthdate.slice(0, 10),
          },
          {
            headers: { Authorization: `Bearer ${this.props.token}` },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.statusText === 'OK') {
            this.setState({
              birthdate: response.data.Birthdate,
            });
          }
        })
        .catch((e) => {
          console.log('the following error occured onSavedChanges: ', e);
        });

      this.props.setDisableForm('disabled');
      localStorage.setItem('changes', 'pending-changes');
    }
  }

  newPasswordValidation() {
    const { password, valPassword } = this.state;
    const passErrors = {};
    let isValidPass = true;
    if (!password) {
      passErrors.passwordIsRequired = 'Password field is required';
      isValidPass = false;
    }
    if (password && valPassword) {
      if (password.length < 7) {
        passErrors.passwordLength =
          'Passwords must be at least 8 characters in length.';
        isValidPass = false;
      }
      if (password !== valPassword) {
        passErrors.passwordsMustMatch = 'Both passwords must match';
        isValidPass = false;
      }
    }
    this.setState({
      passErrors: passErrors,
      password: '',
      valPassword: '',
    });
    return isValidPass;
  }

  onSavePassword(username) {
    const isValidPass = this.newPasswordValidation();

    if (isValidPass) {
      axios
        .put(
          host + `/users/${username}/changePass`,
          {
            Password: this.state.password,
          },
          {
            headers: { Authorization: `Bearer ${this.props.token}` },
          }
        )
        .catch((e) => {
          console.log('the following error occured onSavedChanges: ', e);
        });
    }
    this.setState({
      disableUpdatePassword: 'disabled',
    });
  }

  //  deletefavoritemovies
  onDeleteFavorite(movie, user) {
    alert(
      `${movie.Title} was deleted from ${user.Username}'s favorite movies.`
    );
    axios
      .delete(host + `/users/${user}/movies/${movie}`, {
        headers: { Authorization: `Bearer ${this.props.token}` },
      })
      .then((response) => {
        let favArr = [];
        response.data.map((favID) => {
          this.props.movies.map((m) => {
            if (m._id === favID) {
              favArr.push(m);
            }
          });
        });
        let favMovTemp = [];
        favArr.map((favMovie) => {
          let favMovArr = Object.entries(favMovie);
          favMovArr.push(['deleted', false]);
          favMovie = Object.fromEntries(favMovArr);
          favMovTemp.push(favMovie);
        });
        this.props.setFavMovies(favMovTemp);
      });
  }

  onDeleteAccount(username) {
    axios.delete(host + `/users/${username}`, {
      headers: { Authorization: `Bearer ${this.props.token}` },
    });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.props.setUser(null);
    this.props.setToken('');
    alert(`Your account for ${username} has been deleted.`);
  }

  render() {
    const { user, onBackClick, favMovies, movies, token, disableForm } =
      this.props;
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
                  value={this.state.name}
                  disabled={this.props.disableForm}
                  ref="searchStringInput"
                  onChange={this.handleUserInput}
                ></input>
              </Card.Text>
              <Card.Text>
                Email:{' '}
                <input
                  name="email"
                  type="text"
                  value={this.state.email}
                  disabled={this.props.disableForm}
                  onChange={this.handleUserInput}
                ></input>
              </Card.Text>
              <Card.Text>
                Birthdate: {this.state.birthdate.slice(0, 10)}
              </Card.Text>
              {/*  <Card.Text>Birthdate: {user.Birthdate.slice(0, 10)}</Card.Text> */}
              <Card.Text>
                <input
                  name="birthdate"
                  type="date"
                  disabled={this.props.disableForm}
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
                <Button type="button" onClick={() => this.enableForm()}>
                  {' '}
                  Edit
                </Button>
                <Button
                  type="button"
                  onClick={() => this.onSaveChanges(user.Username)}
                >
                  Save Updates
                </Button>
                <Button
                  type="button"
                  onClick={() => this.onDeleteAccount(user.Username)}
                >
                  Delete Account
                </Button>
              </Card.Text>
              <Card.Text>
                Change Password:{' '}
                <input
                  name="password"
                  type="password"
                  placeholder="Enter new password"
                  disabled={this.state.disableUpdatePassword}
                  onChange={this.handleUserInput}
                ></input>
              </Card.Text>
              <Card.Text>
                Confirm New Password:
                <input
                  name="valPassword"
                  type="password"
                  placeholder="Enter new password"
                  disabled={this.state.disableUpdatePassword}
                  onChange={this.handleUserInput}
                ></input>
              </Card.Text>
              <div>
                {Object.values(this.state.passErrors).map((value) => {
                  return (
                    <div className="display-errors" key={value}>
                      {value}
                    </div>
                  );
                })}
              </div>
              <Col>
                <Button
                  type="button"
                  onClick={() => this.enablePasswordUpdate()}
                >
                  {' '}
                  Change Password
                </Button>
                <Button onClick={() => this.onSavePassword(user.Username)}>
                  Save Password
                </Button>
              </Col>
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
          {this.props.favMovies.map((favMovie) => {
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

let mapStateToProps = (state) => {
  return {
    movies: state.movies,
    user: state.user,
    favMovies: state.favMovies,
    token: state.token,
    disableForm: state.disableForm,
  };
};

export default connect(mapStateToProps, {
  setToken,
  setDisableForm,
})(UserView);
