import React, { Component } from 'react';
import { Row, Col, Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class Navbar extends Component {
  render() {
    const { user, onLogOut } = this.props;
    return (
      <Container>
        <Nav>
          <Row>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href={`/users/${this.props.user.Username}`}>
              User Details
            </Nav.Link>
            <Nav.Link onClick={this.props.onLogOut}>Log Out</Nav.Link>
          </Row>
        </Nav>
      </Container>
    );
  }
}
