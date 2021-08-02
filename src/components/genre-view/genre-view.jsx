import React from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
//import { Link } from 'react-router-dom';

import './genre-view.scss';

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;
    return (
      <Card className="basic-component-background movie-view-container p-3">
        <div className="d-flex">
          {/*}
          <Card.Img
            variant="left"
            className="movie-image img-fluid col-md-4 basic-card-styling"
            src={movie.ImagePath}
          />
          {*/}
          <Card.Body>
            <h2>{genre.Name}</h2>
            <Card.Title>{genre.Description}</Card.Title>

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
