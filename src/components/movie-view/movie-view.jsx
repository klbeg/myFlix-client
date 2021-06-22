import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import './movie-view.scss';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view-container">
        <Card>
          <Row>
            <Col md={6}>
              <Card.Img src={movie.ImagePath} />
            </Col>
            <Col md={6}>
              <Card.Body>
                <h1>{movie.Title}</h1>
                <Card.Title>Director: {movie.Director.Name}</Card.Title>
                <Card.Title>{movie.Genre.Name}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
                <Link to={`/directors/${movie.Director.Name}`}>
                  <Button variant="link">Director details</Button>
                </Link>
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button variant="link">Genre details</Button>
                </Link>
              </Card.Body>
            </Col>
          </Row>

          <Button
            variant="secondary"
            type="button"
            onClick={() => {
              onBackClick(null);
            }}
          >
            Back
          </Button>
        </Card>
      </div>
    );
  }
}
