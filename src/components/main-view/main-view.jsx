//  imported modules
import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { match } from 'micromatch';

import { Header } from '../header/header';
import { UserView } from '../user-view/user-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      favMovies: [],
      user: null,
    };
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

  //  get's movies from API w/token auth, set's state.movies to movies
  //  uses state.movies to get movie objects for user.FavoriteMovies
  //  sets state.favMovies to FavoriteMovie objects
  getMovies(token) {
    axios
      .get('https://kb-movie-api.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          movies: response.data,
        });
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
          favMovies: [...favMovTemp],
        });
      })
      .catch(function (e) {
        console.log('The following error occured: ' + e);
      });
  }

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
    const { movies, user, favMovies } = this.state;
    return (
      <Router>
        <Row>
          <Header user={user} />
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
              return movies.map((m) => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ));
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
