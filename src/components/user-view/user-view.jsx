import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';
import { host } from '../../config';
import { Row, Col, Button, Card, Form } from 'react-bootstrap';

import {
  setUser,
  setChangeUser,
  setToken,
  setDisableForm,
  setDisableUpdatePassword,
  setErrors,
  setPassErrors,
} from '../../actions/actions';

import { MovieCard } from '../movie-card/movie-card';

import './user-view.scss';

class UserView extends React.Component {
  constructor() {
    super();
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  enableForm() {
    this.props.setDisableForm('');
  }

  enablePasswordUpdate() {
    this.props.setDisableUpdatePassword('');
  }

  handleUserInput(evt) {
    this.props.setChangeUser({
      [evt.target.name]: evt.target.value,
    });
  }

  //  Input validation for update user form
  userUpdateValidation() {
    let name = this.props.changeUser.Name;
    let email = this.props.changeUser.Email;
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
    this.props.setErrors(errors);
    return isValid;
  }

  onSaveChanges(username) {
    const isValid = this.userUpdateValidation();
    let name = this.props.changeUser.Name;
    let email = this.props.changeUser.Email;
    let birthdate = this.props.changeUser.Birthdate;

    if (isValid) {
      axios
        .put(
          host + `/users/${username}`,
          {
            Name: name ? name : this.props.user.Name,
            Email: email ? email : this.props.user.Email,
            Birthdate: birthdate
              ? birthdate
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
    }
  }

  newPasswordValidation() {
    //const { password, valPassword } = this.state;
    let password = this.props.changeUser.Password;
    let valPassword = this.props.changeUser.ValPassword;

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
    this.props.setPassErrors(passErrors);
    this.props.setChangeUser({
      Password: '',
      ValPassword: '',
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
            Password: this.props.changeUser.Password,
          },
          {
            headers: { Authorization: `Bearer ${this.props.token}` },
          }
        )
        .catch((e) => {
          console.log('the following error occured onSavedChanges: ', e);
        });
    }
    this.props.setDisableUpdatePassword('disabled');
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
    const { onBackClick, favMovies, movies } = this.props;
    return (
      <>
        <Row>
          <Col className="p-0">
            <Card.Body className="basic-component-background">
              <h1>User Info:</h1>
              <Form className="col-md-5">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  name="Name"
                  type="text"
                  placeholder={this.props.user.Name}
                  disabled={this.props.disableForm}
                  ref="searchStringInput"
                  onChange={this.handleUserInput}
                ></Form.Control>
                <Form.Label> Email:</Form.Label>
                <Form.Control
                  name="Email"
                  type="text"
                  placeholder={this.props.user.Email}
                  disabled={this.props.disableForm}
                  onChange={this.handleUserInput}
                ></Form.Control>
                <Form.Label>
                  Birthdate: {this.props.user.Birthdate.slice(0, 10)}
                </Form.Label>
                <Form.Control
                  name="Birthdate"
                  type="date"
                  disabled={this.props.disableForm}
                  onChange={this.handleUserInput}
                ></Form.Control>
              </Form>
              <div>
                {Object.values(this.props.errors).map((value) => {
                  return (
                    <div className="display-errors" key={value}>
                      {value}
                    </div>
                  );
                })}
              </div>
              <Col className="pt-3 pb-2">
                <Button type="button" onClick={() => this.enableForm()}>
                  Edit
                </Button>
                <Button
                  type="button"
                  onClick={() => this.onSaveChanges(this.props.user.Username)}
                >
                  Save Updates
                </Button>
                <Button
                  type="button"
                  onClick={() => this.onDeleteAccount(this.props.user.Username)}
                >
                  Delete Account
                </Button>
              </Col>
              <Form className="col-md-5">
                <Form.Label>Change Password:</Form.Label>
                <Form.Control
                  name="Password"
                  type="password"
                  placeholder="Enter new password"
                  disabled={this.props.disableUpdatePassword}
                  onChange={this.handleUserInput}
                ></Form.Control>
                <Form.Label>Confirm New Password:</Form.Label>
                <Form.Control
                  name="ValPassword"
                  type="password"
                  placeholder="Enter new password"
                  disabled={this.props.disableUpdatePassword}
                  onChange={this.handleUserInput}
                ></Form.Control>
              </Form>
              <div>
                {Object.values(this.props.passErrors).map((value) => {
                  return (
                    <div className="display-errors" key={value}>
                      {value}
                    </div>
                  );
                })}
              </div>
              <Col className="pt-3 pb-2">
                <Button
                  type="button"
                  onClick={() => this.enablePasswordUpdate()}
                >
                  Change Password
                </Button>
                <Button
                  onClick={() => this.onSavePassword(this.props.user.Username)}
                >
                  Save Password
                </Button>
              </Col>
              <Col>
                <Button
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
                lg={4}
                md={6}
                sm={12}
                id={favMovie._id}
                key={favMovie._id}
                className={favMovie.deleted ? 'deleted-favorite' : ''}
              >
                <MovieCard movie={favMovie} />
                <Button
                  type="button"
                  onClick={() =>
                    this.onDeleteFavorite(
                      favMovie._id,
                      this.props.user.Username
                    )
                  }
                >
                  Delete Favorite
                </Button>
              </Col>
            );
          })}
        </Row>
      </>
    );
  }
}

UserView.propTypes = {
  changeUser: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Password: PropTypes.string,
    Email: PropTypes.string,
    Birthdate: PropTypes.instanceOf(Date),
  }),
};

let mapStateToProps = (state) => {
  return {
    user: state.user,
    changeUser: state.changeUser,
    movies: state.movies,
    favMovies: state.favMovies,
    token: state.token,
    disableForm: state.disableForm,
    disableUpdatePassword: state.disableUpdatePassword,
    errors: state.errors,
    passErrors: state.passErrors,
  };
};

export default connect(mapStateToProps, {
  setUser,
  setChangeUser,
  setToken,
  setDisableForm,
  setDisableUpdatePassword,
  setErrors,
  setPassErrors,
})(UserView);
