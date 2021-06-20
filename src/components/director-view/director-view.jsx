import React from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './director-view.scss';

export class DirectorView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    console.log(movie);

    return {
      /*   <Card>
        <Row>
          <Col>
            <Card.Img src={movie.ImagePath} />
          </Col>
          <Col>
            <Card.Title>{movie.Director.Name}</Card.Title>
            <Card.Title>{movie.Director.Bio}</Card.Title>
          </Col>
          <Button
            variant="secondary"
            type="button"
            onClick={() => {
              onBackClick(null);
            }}
          >
            Back
          </Button>
        </Row>
          </Card> */
    };
  }
}
