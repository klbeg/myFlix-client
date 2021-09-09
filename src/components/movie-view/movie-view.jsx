import React from 'react';

import PropTypes from 'prop-types';
import { Row, Col, Button, Card } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import './movie-view.scss';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Card className="basic-component-background movie-view-container p-3">
        <div className="d-flex justify-content-center">
          <Card.Img
            variant="left"
            className="movie-image img-fluid col-md-4 basic-card-styling"
            src={movie.ImagePath}
          />

          <Card.Body className="basic-card-styling col-6 ">
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

MovieView.propTypes = {
  onBackClick: PropTypes.func.isRequired,
  movie: PropTypes.shape({
    Description: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Image: PropTypes.string.isRequired,
      Name: PropTypes.string.isRequired,
    }),
    Featured: PropTypes.bool.isRequired,
    Genre: PropTypes.shape({
      Description: PropTypes.string.isRequired,
      Name: PropTypes.string.isRequired,
    }),
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }),
};
