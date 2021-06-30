import React, { Component } from 'react';
import { useState } from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';

import { Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { match } from 'micromatch';

import './user-view.scss';

export class UserView extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      movies: [],
      disableForm: 'disabled',
    };
  }

  enableForm() {
    console.log('enableform');
    this.setState({
      disableForm: '',
    });
  }

  onSaveChanges() {
    //  still needs axios put request
    this.setState({
      disableForm: 'disabled',
    });
  }

  onDeleteFavorite(movie) {
    console.log('delete favorite movie: ', movie.Title);
  }

  onDeleteAccount() {
    console.log('delete account');
  }

  render() {
    const { user, onBackClick, favMovies } = this.props;
    return (
      <>
        <Row>
          <Col>
            <Card.Body>
              <h2>User Info:</h2>
              <Card.Text>
                Name:
                <input
                  id="name"
                  type="text"
                  value={user.Name}
                  disabled={this.state.disableForm}
                ></input>
              </Card.Text>
              <Card.Text>
                Username:
                <input
                  id="username"
                  type="text"
                  value={user.Username}
                  disabled={this.state.disableForm}
                ></input>
              </Card.Text>
              <Card.Text>
                Email:
                <input
                  id="email"
                  type="text"
                  value={user.Email}
                  disabled={this.state.disableForm}
                ></input>
              </Card.Text>
              <Card.Text>
                Birthdate:
                <input
                  id="birthdate"
                  type="text"
                  value={user.Birthdate.slice(0, 10)}
                  disabled={this.state.disableForm}
                ></input>
              </Card.Text>
              <Card.Text>
                <button type="button" onClick={() => this.enableForm()}>
                  Edit Info
                </button>
                <button type="button" onClick={() => this.onSaveChanges()}>
                  Save Updates
                </button>
                <button type="button" onClick={() => this.onDeleteAccount()}>
                  Delete Account
                </button>
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
        <Row>
          {this.props.favMovies.map((favMovie) => {
            return (
              <Col md={3}>
                <MovieCard movie={favMovie} key={favMovie._id} />
                <button
                  type="button"
                  onClick={() => this.onDeleteFavorite(favMovie)}
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
