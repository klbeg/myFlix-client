import React from 'react';
import { useState } from 'react';
import axios from 'axios';

import { UserFavoriteMovies } from '../user-favorite-movies/user-favorite-movies';

import { Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { match } from 'micromatch';

import './user-view.scss';

export class UserView extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      movies: [],
      favMovies: [],
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: JSON.parse(localStorage.getItem('user')),
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios
      .get('https://kb-movie-api.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .then(() => {
        this.getFavTitles();
      })
      .catch(function (e) {
        console.log('The following error occured: ' + e);
      });
  }

  getFavTitles() {
    let favArr = [];
    this.state.user.FavoriteMovies.map((favID) => {
      this.state.movies.map((m) => {
        if (m._id === favID) {
          favArr.push(m.Title);
        }
      });
    });
    return favArr;
  }

  render() {
    const { user, onBackClick, getFavMovies } = this.props;
    console.log('user-render: ' + getFavMovies);
    return (
      <Row>
        <Col>
          <Card.Body>
            <h2>User Info:</h2>
            <Card.Text>Name: {user.Name}</Card.Text>
            <Card.Text>Username: {user.Username}</Card.Text>
            <Card.Text>Email: {user.Email}</Card.Text>
            <Card.Text>Birthdate: {user.Birthdate} </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    );
  }
}
