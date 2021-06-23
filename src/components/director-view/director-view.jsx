import React from 'react';

import { Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './director-view.scss';

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <div className="component-container">
        <Card>
          <Row>
            <Col>
              <h2>{director.Name}</h2>
              <Card.Text>{director.Bio}</Card.Text>
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
