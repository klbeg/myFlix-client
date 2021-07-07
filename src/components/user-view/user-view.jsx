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
      disableForm: 'disabled',
      name: undefined,
      username: undefined,
      birthdate: undefined,
      email: undefined,
      token: '',
    };
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  enableForm() {
    console.log('enableform');
    this.setState({
      disableForm: '',
      deletedFavorite: 'deleted-favorite',
    });
  }

  handleUserInput(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  componentDidUpdate() {
    console.log('updated!');
  }

  componentDidMount() {
    console.log('UserView mounted');
    this.setState({
      token: localStorage.getItem('token'),
    });
    //console.log(localStorage.getItem('token'));
  }

  onSaveChanges(username) {
    axios
      .put(
        host + `/users/${username}`,
        {
          Name: this.state.name ? this.state.name : this.props.user.Name,
          /* Username: this.state.username
            ? this.state.username
            : this.props.user.Username,
          Email: this.state.email ? this.state.email : this.props.user.Email,
          //  password will need to be different than all other fields
          //  maybe part of it's own update?
          Password: this.state.password
            ? this.state.password
            : this.props.user.Password, */
        },
        {
          headers: { Authorization: `Bearer ${this.state.token}` },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log('the following error occured onSavedChanges: ', e);
      });

    this.setState({
      disableForm: 'disabled',
    });
  }

  //  deletefavoritemovies
  onDeleteFavorite(movie, user) {
    movie.deleted = true;
    axios.delete(host + '/users/testuser1/movies/60a45ab9e8fd876d8ae55926', {
      headers: { Authorization: `Bearer ${this.state.token}` },
    });
    alert(
      `${movie.Title} was deleted from ${user.Username}'s favorite movies.`
    );
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
                Birthdate:{' '}
                <input
                  name="birthdate"
                  type="text"
                  value={this.state.birthdate}
                  placeholder={user.Birthdate}
                  disabled={this.state.disableForm}
                  onChange={this.handleUserInput}
                ></input>
              </Card.Text>
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
            </Card.Body>
          </Col>
        </Row>
        <Row>
          {favMovies.map((favMovie) => {
            return (
              <Col
                md={3}
                id={favMovie._id}
                className={favMovie.deleted ? 'deleted-favorite' : ''}
              >
                <MovieCard movie={favMovie} key={favMovie._id} />
                <button
                  type="button"
                  onClick={() => this.onDeleteFavorite(favMovie, user)}
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
