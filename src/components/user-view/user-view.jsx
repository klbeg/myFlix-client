import React from 'react';

import { Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './user-view.scss';

export class UserView extends React.Component {
  getFavoriteMovies;

  render() {
    const { user, movies, onBackClick } = this.props;
    console.log('user view: ', user);
    return (
      <Row>
        <Col>
          <Card.Body>
            <h2>User Info:</h2>
            <Card.Text>Name: {user.Name}</Card.Text>
            <Card.Text>Username: {user.Username}</Card.Text>
            <Card.Text>Email: {user.Email}</Card.Text>
            <Card.Text>Birthdate: {user.Birthdate} </Card.Text>
            <h3>Favorite Movies</h3>
          </Card.Body>
        </Col>
      </Row>
    );
  }
}
