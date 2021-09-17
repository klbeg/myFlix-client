import React, { Component } from 'react';
import { Row, Container, Nav } from 'react-bootstrap';

export class Navbar extends Component {
  render() {
    const { user, onLogOut } = this.props;
    return (
      <Container>
        <Nav className="d-flex navbar-container">
          <Row>
            <Nav.Link href="/" className="nav-item">
              Home
            </Nav.Link>
            <Nav.Link
              href={`/users/${this.props.user.Username}`}
              className="nav-item"
            >
              User Details
            </Nav.Link>
            <Nav.Link onClick={this.props.onLogOut} className="nav-item">
              Log Out
            </Nav.Link>
          </Row>
        </Nav>
      </Container>
    );
  }
}
