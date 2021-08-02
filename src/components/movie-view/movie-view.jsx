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
      <Card className="basic-component-background movie-view-container p-3">
        <div className="d-flex">
          <Card.Img
            variant="left"
            className="movie-image img-fluid col-md-4 basic-card-styling"
            src={movie.ImagePath}
          />

          <Card.Body className="basic-card-styling">
            <h1>{movie.Title}</h1>
            <Card.Title>Director: {movie.Director.Name}</Card.Title>
            <Card.Title>{movie.Genre.Name}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button>Director details</Button>
            </Link>
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button>Genre details</Button>
            </Link>

            <Button
              type="button"
              onClick={() => {
                onBackClick(null);
              }}
            >
              Back
            </Button>
          </Card.Body>
        </div>
      </Card>
    );
  }
}
