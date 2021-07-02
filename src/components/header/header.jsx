import React, { Component } from 'react';
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
            <button onClick={onLogOut}>Logout</button>
            {user ? (
              <button type="button">
                <Link
                  className="edit-profile-button"
                  to={`users/${user.Username}`}
                >
                  Edit Profile
                </Link>
              </button>
            ) : (
              <div></div>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

//  connect this function to a future logout button
//  this button should go in a future header component
//  the following is the code for said button
/*    onLoggedOut is located in MainView
<button onClick={() => { this.onLoggedOut() }}>Logout</button>
  */
