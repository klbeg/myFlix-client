import React from 'react';
import axios from 'axios';

import { Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './user-view.scss';

export class UserView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users = []
    }
  }
  //  finds user from users api
  componentDidMount() {;
    axios
      .get(`https://kb-movie-api.herokuapp.com/users`, {})
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log('The following error occured in mount: ' + e);
      });
  }

  render() {
    const { user, onBackClick } = this.props;

    return <Card>{user}</Card>;
  }
}
