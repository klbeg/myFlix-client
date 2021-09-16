import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import axios from 'axios';

import { host } from '../../config';
import { setFavMovies, setToken } from '../../actions/actions';

class FavoriteButton extends Component {
  constructor() {
    super();
  }

  onDeleteFavorite(movie, user) {
    alert(
      `${movie.Title} was deleted from ${user.Username}'s favorite movies.`
    );
    axios
      .delete(host + `/users/${user.Username}/movies/${movie._id}`, {
        headers: { Authorization: `Bearer ${this.props.token}` },
      })
      .then((response) => {
        let favArr = [];
        response.data.map((favID) => {
          this.props.movies.map((m) => {
            if (m._id === favID) {
              favArr.push(m);
            }
          });
        });
        let favMovTemp = [];
        favArr.map((favMovie) => {
          let favMovArr = Object.entries(favMovie);
          favMovArr.push(['deleted', false]);
          favMovie = Object.fromEntries(favMovArr);
          favMovTemp.push(favMovie);
        });
        this.props.setFavMovies(favMovTemp);
      });
  }

  onAddFavorite(movie, user) {
    console.log('request: ', `/users/${user.Username}/movies/${movie._id}`);
    alert(`${movie.Title} was added to ${user.Username}'s favorite movies.`);
    axios
      .put(
        host + `/users/${user.Username}/movies/${movie._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${this.props.token}` },
        }
      )
      .then((response) => {
        console.log('reasonse: ', response);
        let favArr = [];
        response.data.map((favID) => {
          this.props.movies.map((m) => {
            if (m._id === favID) {
              favArr.push(m);
            }
          });
        });
        let favMovTemp = [];
        favArr.map((favMovie) => {
          let favMovArr = Object.entries(favMovie);
          favMovArr.push(['deleted', false]);
          favMovie = Object.fromEntries(favMovArr);
          favMovTemp.push(favMovie);
        });
        this.props.setFavMovies(favMovTemp);
      });
  }

  render() {
    const { movie, user } = this.props;
    return (
      <>
        {this.props.favMovies.filter((fav) => fav._id === movie._id).length >
        0 ? (
          <Button onClick={() => this.onDeleteFavorite(movie, user)}>
            Delete Favorite
          </Button>
        ) : (
          <Button onClick={() => this.onAddFavorite(movie, user)}>
            Add Favorite
          </Button>
        )}
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    token: state.token,
    movies: state.movies,
    favMovies: state.favMovies,
  };
};

export default connect(mapStateToProps, {
  setFavMovies,
})(FavoriteButton);
