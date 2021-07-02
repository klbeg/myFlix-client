import React, { Component } from 'react';
import { Row, Button, Col, Card } from 'react-bootstrap';
import { UserView } from '../user-view/user-view';
import './header.scss';

export class Header extends Component {
  render() {
    return <Col className="header-element">hello</Col>;
  }
}

//  connect this function to a future logout button
//  this button should go in a future header component
//  the following is the code for said button
/*    onLoggedOut is located in MainView
<button onClick={() => { this.onLoggedOut() }}>Logout</button>
  */
