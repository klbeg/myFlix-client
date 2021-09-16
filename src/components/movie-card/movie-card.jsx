import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import FavoriteButton from '../favorite-button/favorite-button';

import './movie-card.scss';

import { Link } from 'react-router-dom';

export class MovieCard extends Component {
  render() {
    const { movie, user } = this.props;

    return (
      <Card className="card-container">
        <div className="movie-card">
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Body className="basic-card-styling">
            <h4>{movie.Title}</h4>
            <Card.Text>{movie.Genre.Name}</Card.Text>
            <Link to={`/movies/${movie._id}`}>
              <Button variant="primary">Details</Button>
            </Link>
            <FavoriteButton movie={movie} user={user} />
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
