import React from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './genre-view.scss';

export class GenreView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    console.log(movie);

    return (
      <Card>
        <Row>
          <Col>
            <Card.Img src={movie.ImagePath} />
          </Col>
          <Col>
            <Card.Title>{movie.Genre.Name}</Card.Title>
            <Card.Title>{movie.Genre.Description}</Card.Title>
          </Col>
        </Row>
      </Card>
    );
  }
}
