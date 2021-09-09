import React from 'react';

import { Row, Col, Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './genre-view.scss';

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;
    return (
      <Card className="basic-component-background movie-view-container p-3">
        <div className="d-flex justify-content-center">
          <Card.Body className="col-10">
            <h2>{genre.Name}</h2>
            <Card.Text>{genre.Description}</Card.Text>
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

GenreView.propTypes = {
  onBackClick: PropTypes.func.isRequired,
  genre: PropTypes.shape({
    Description: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired,
  }),
};
