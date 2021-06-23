import React from 'react';

import { UserFavoriteMovies } from '../user-favorite-movies/user-favorite-movies';

import { Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { match } from 'micromatch';

import './user-view.scss';

export class UserView extends React.Component {
  render() {
    const { user, movies, favMovies, onBackClick } = this.props;
    console.log('user view: ', favMovies);
    return (
      <Row>
        <Col>
          <Card.Body>
            <h2>User Info:</h2>
            <Card.Text>Name: {user.Name}</Card.Text>
            <Card.Text>Username: {user.Username}</Card.Text>
            <Card.Text>Email: {user.Email}</Card.Text>
            <Card.Text>Birthdate: {user.Birthdate} </Card.Text>

            {/* FavMoviesArr={user.FavoriteMovies.map((favID) => {
                let favArr = [];
                movies.map((m) => {
                  if (m._id === favID) {
                    favArr.push(m.Title);
                  }
                });
                this.setState({
                  favMovieNames: favArr,
                });
              })} */}
          </Card.Body>
        </Col>
      </Row>
    );
  }
}
