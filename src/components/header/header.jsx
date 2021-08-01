import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Button, Col, Card, Container } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import { UserView } from '../user-view/user-view';

import './header.scss';

export class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onLogOut, user } = this.props;

    return (
      <Container className="header-element">
        <Row>
          <Col md={3}>
            <h1>My Flix API</h1>
          </Col>
          <Col md={5}>
            <h3>Welcome {!user ? '' : user.Username}</h3>
            <Button className="btn-primary" onClick={onLogOut}>
              Logout
            </Button>
            {user ? (
              <Button type="button" className="btn-primary">
                <Link
                  className="edit-profile-button"
                  to={`users/${user.Username}`}
                >
                  Edit Profile
                </Link>
              </Button>
            ) : (
              <div></div>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}
