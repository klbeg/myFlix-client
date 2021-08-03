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
      <Container className="header-element py-3">
        <Row>
          <Col
            md={4}
            className="d-flex justify-content-center align-items-center"
          >
            <h1>My Flix API</h1>
          </Col>
          <Col md={4}>{/* for use in eventual nav bar */}</Col>
          <Col md={4} className="d-flex flex-column justify-content-end">
            <h3 className="d-flex justify-content-center">
              Welcome {!user ? '' : user.Username}
            </h3>
            <div className="d-flex justify-content-center">
              <Button className={!user ? 'd-none' : ''} onClick={onLogOut}>
                Logout
              </Button>
              {user ? (
                //<Link to={`users/${user.Username}`}>
                <Button
                  type="button"
                  className="btn-primary"
                  onClick={
                    () =>
                      window.location.replace(
                        'http://' +
                          window.location.href.split('/')[2] +
                          `/users/${user.Username}`
                      )
                    //console.log(window.location.href.split('/')[2])
                  }
                >
                  Edit Profile
                </Button>
              ) : (
                //</Link>
                <div></div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
