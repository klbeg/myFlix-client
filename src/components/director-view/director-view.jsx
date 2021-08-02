import React from 'react';

import { Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './director-view.scss';

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <Card className="basic-component-background movie-view-container p-3">
        <div className="d-flex">
          <Card.Img
            variant="left"
            className="movie-image img-fluid col-md-4 basic-card-styling"
            src={director.Image}
          />

          <Card.Body>
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
