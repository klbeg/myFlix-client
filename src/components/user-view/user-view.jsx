import React from 'react';
import axios from 'axios';

import { Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './user-view.scss';

//  finds user from users api
getUsers(user) {
  axios
    .get(`https://kb-movie-api.herokuapp.com/users/{user}`)
      .then((user) => {
         console.log(user);
      })
}

export class UserView extends React.Component {
  render() {
    const { user, onBackClick } = this.props;
    console.log(user);

    return <div>{user}</div>;
  }
}
