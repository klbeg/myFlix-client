import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Row, Button, Col, Container } from 'react-bootstrap';

import './header.scss';

import { Navbar } from '../navbar/navbar';

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
            <h1>Movie Craze</h1>
          </Col>
          <Col md={2} />
          {this.props.user ? (
            <Col md={6} className="d-flex align-items-center">
              <Navbar user={this.props.user} onLogOut={this.props.onLogOut} />
            </Col>
          ) : (
            <div />
          )}
        </Row>
      </Container>
    );
  }
}

Header.propTypes = {
  onLogOut: PropTypes.func.isRequired,
  user: PropTypes.shape({
    Birthdate: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.array.isRequired,
    Name: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
  }),
};

/*
inserted after Navbar in the event I can't get navbar working
<Col md={4} className="d-flex flex-column justify-content-end">
            <h3 className="header-username justify-content-center">
              Welcome {!user ? '' : user.Username}
            </h3>
            <div className="d-flex justify-content-center">
              <Button className={!user ? 'd-none' : ''} onClick={onLogOut}>
                Logout
              </Button>
              {user ? (
                <Button
                  type="button"
                  className="btn-primary"
                  onClick={() =>
                    window.location.replace(
                      'http://' +
                        window.location.href.split('/')[2] +
                        `/users/${user.Username}`
                    )
                  }
                >
                  Edit Profile
                </Button>
              ) : (
                <div></div>
              )}
            </div>
          </Col>
*/
