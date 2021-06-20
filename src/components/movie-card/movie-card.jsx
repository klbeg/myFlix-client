import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './movie-card.scss';

import { Link } from 'react-router-dom';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card className="movie-card-container">
        <div className="movie-card">
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Body>
            <h4>{movie.Title}</h4>
            <Card.Text>{movie.Genre.Name}</Card.Text>
            <Link to={`/movies/${movie._id}`}>
              <Button variant="link">Details</Button>
            </Link>
          </Card.Body>
        </div>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
  }).isRequired,
};
