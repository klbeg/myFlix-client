//  imported modules
import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import { match } from 'micromatch';

import {
  setMovies,
  setUser,
  setFavMovies,
  setToken,
} from '../../actions/actions.js';

import { host } from '../../config';
import { Header } from '../header/header';
import UserView from '../user-view/user-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';
import LoginView from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import MoviesList from '../movies-list/movies-list';

class MainView extends React.Component {
  constructor() {
    super();
    this.onLoggedOut = this.onLoggedOut.bind(this);
  }

  //  on componentMount get localStorage.token
  //  set props.user & this.props.token to logged in user
  //  call getMovies and pass access token
  componentDidMount() {
    this.props.setToken(localStorage.getItem('token'));
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.props.setUser(JSON.parse(localStorage.getItem('user'))),
        this.getMovies(accessToken);
    }
  }

  //  API.get movies
  //  sets store.movies, calls populateFavorites
  getMovies(token) {
    axios
      .get(host + '/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setMovies(response.data);
        this.populateFavMovies();
      })
      .catch(function (e) {
        console.log('The following error occured: ' + e);
      });
  }

  //  converts IDs from user.favMovies movie objects
  //  sets store.favMovies to array of movie objects
  populateFavMovies() {
    let favArr = [];
    this.props.user.FavoriteMovies.map((favID) => {
      this.props.movies.map((m) => {
        if (m._id === favID) {
          favArr.push(m);
        }
      });
    });
    this.props.setFavMovies(favArr);
  }

  //  on login, sets store.user
  //  stores user & token in local storage
  //  calls getMovies
  onLoggedIn(authData) {
    this.props.setUser(authData.user);
    this.props.setToken(authData.token);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', JSON.stringify(authData.user));
    this.getMovies(authData.token);
  }

  //  on log out
  //  sets store.movies & store.user to default
  onLoggedOut() {
    this.props.setMovies([]);
    this.props.setUser(null);
    this.props.setToken('');

    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  render() {
    const { onLoggedOut, movies, user, favMovies } = this.props;
    return (
      <Router>
        <Row>
          <Header user={user} onLogOut={this.onLoggedOut} />
        </Row>

        <Row className="main-view justify-content-md-center">
          {/* MainView renders LoginView (if !user) -or- */}
          {/* a list of all movies displayed as MovieCards */}
          <Route
            exact
            path="/"
            render={() => {
              //  if no user, show LoginView
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              //  if movies = null, show main-view while they load
              if (movies.length === 0) return <div className="main-view" />;
              //  map movies and return each movie as a 3 col wide MovieCard
              return <MoviesList movies={movies} />;
            }}
          />

          {/* RegistrationView */}
          <Route
            exact
            path="/register"
            render={() => {
              if (user) return <Redirect to="/" />;
              return (
                <Col>
                  <RegistrationView />
                </Col>
              );
            }}
          ></Route>

          {/* MovieView */}
          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          {/* UserView */}
          <Route
            exact
            path="/users/:username"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <UserView
                    movies={movies}
                    user={user}
                    favMovies={favMovies}
                    getMovies={this.getMovies}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          {/* GenreView */}
          <Route
            exact
            path="/genres/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <GenreView
                    genre={
                      movies.find((m) => m.Genre.Name === match.params.name)
                        .Genre
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          {/* DirectorView */}
          <Route
            exact
            path="/directors/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <DirectorView
                    director={
                      movies.find((m) => m.Director.Name === match.params.name)
                        .Director
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
        </Row>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    movies: state.movies,
    user: state.user,
    favMovies: state.favMovies,
    token: state.token,
  };
};

export default connect(mapStateToProps, {
  setMovies,
  setUser,
  setFavMovies,
  setToken,
})(MainView);
