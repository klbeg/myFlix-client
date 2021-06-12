//  imported modules
import React from 'react';
import axios from 'axios';
//  imported components
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
    };
  }
  componentDidMount() {
    axios
      .get('https://kb-movie-api.herokuapp.com/movies')
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //  creates and sets newSelectedMovie state for use with onClick button
  //  function
  //  still unsure about this function.  cmd+f search it on cf task 3.3
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  //  user login function
  onLoggedIn(user) {
    this.setState({ user });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    //  user not found error
    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        {selectedMovie ? (
          <MovieView
            movie={selectedMovie}
            onBackClick={(newSelectedMovie) => {
              this.setSelectedMovie(newSelectedMovie);
            }}
          />
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              //onMovieClick={(newSelectedMovie) => {
              //   this.setSelectedMovie(newSelectedMovie);
              // }}
            />
          ))
        )}
      </div>
    );
  }
}
