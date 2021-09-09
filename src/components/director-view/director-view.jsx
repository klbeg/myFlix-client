import React from 'react';

import { Row, Col, Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './director-view.scss';
import '../../index.scss';

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <Card className="basic-component-background movie-view-container p-3">
        <div className="d-flex justify-content-center">
          <Card.Img
            variant="left"
            className="movie-image img-fluid col-md-4 basic-card-styling"
            src={director.Image}
          />

          <Card.Body className="col-sm-10 col-md-6">
            <h2>{director.Name}</h2>
            <Card.Text>{director.Bio}</Card.Text>
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

DirectorView.propTypes = {
  onBackClick: PropTypes.func.isRequired,
  director: PropTypes.shape({
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Image: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
  }),
};
