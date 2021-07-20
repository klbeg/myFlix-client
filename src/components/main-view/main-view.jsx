//  imported modules
import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import { match } from 'micromatch';

import { setMovies } from '../../actions/actions';

import { host } from '../../config';
import { Header } from '../header/header';
import { UserView } from '../user-view/user-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
//  import { MovieCard } from '../movie-card/movie-card';

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      favMovies: [],
      user: null,
    };
    this.onLoggedOut = this.onLoggedOut.bind(this);
  }

  //  on componentMount get localStorage.token
  //  set state.user to logged in user
  //  call getMovies and pass access token
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: JSON.parse(localStorage.getItem('user')),
      });
      this.getMovies(accessToken);
    }
  }

  //  if the username has been changed in user-view,
  //    then use the new username for get request and update
  //    user state, also updates user info in local storage
  //  last, sets newUsername in localStorage to ''.
  componentDidUpdate() {
    console.log('main-view updated');
    if (localStorage.changes) {
      console.log('changes is true');
      axios
        .get(host + `/users/${this.state.user.Username}`)
        .then((response) => {
          this.setState({
            user: response.data,
          });
          localStorage.setItem('user', JSON.stringify(response.data));
          this.populateFavMovies();
        });
    }
    localStorage.setItem('changes', '');
    localStorage.setItem('newUsername', '');
  }

  //  get's movies from API w/token auth, set's state.movies to movies
  //  uses state.movies to get movie objects for user.FavoriteMovies
  //  sets state.favMovies to FavoriteMovie objects
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
    console.log('get movies has completed');
  }

  populateFavMovies() {
    let favArr = [];
    this.state.user.FavoriteMovies.map((favID) => {
      this.state.movies.map((m) => {
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
    this.setState({
      favMovies: favMovTemp,
    });
  }

  //  will be used to update user from UserView
  //  as well as update favMovies
  //  will require get.user endpoint in movie-api to change
  //  or, create alternate endpoint.

  //  onLogin set state.user to logged in user
  //  saves the user and auth token in local storage
  onLoggedIn(authData) {
    this.setState({
      user: authData.user,
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', JSON.stringify(authData.user));
    this.getMovies(authData.token);
  }

  //  on Log Out reset state.(user, movies) to (null, [])
  //  remove token and user from localStorage
  onLoggedOut() {
    this.setState({
      user: null,
      movies: [],
    });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  render() {
    const { user, favMovies } = this.state;
    const { onLoggedOut, movies } = this.props;
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
  return { movies: state.movies };
};

export default connect(mapStateToProps, { setMovies })(MainView);
/*
//  creates and sets newSelectedMovie state for use with onClick button
//  function
//  still unsure about this function.  cmd+f search it on cf task 3.3
setSelectedMovie(movie) {
  this.setState({
    selectedMovie: movie,
  });
}
*/
