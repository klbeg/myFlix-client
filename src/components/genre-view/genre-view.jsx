import React from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './genre-view.scss';

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;
    return (
      <div className="component-container">
        <Card>
          <Row>
            <Col>
              <h2>{genre.Name}</h2>
              <Card.Title>{genre.Description}</Card.Title>
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
