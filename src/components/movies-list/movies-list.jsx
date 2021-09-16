import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';
import { Row, Col } from 'react-bootstrap';

function MoviesList(props) {
  const { movies, visibilityFilter, user } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter((m) =>
      m.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }

  if (!movies) return <div className="main-view" />;

  return (
    <>
      <Col className="p-3 pl-0 d-flex basic-card-styling">
        <div className="col-md-3 pl-0">
          <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </div>
      </Col>

      <Row>
        {filteredMovies.map((m) => (
          <Col lg={4} md={6} sm={12} key={m._id}>
            <MovieCard movie={m} user={user} />
          </Col>
        ))}
        ;
      </Row>
    </>
  );
}

MoviesList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  visibilityFilter: PropTypes.string,

  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Description: PropTypes.string.isRequired,
      Director: PropTypes.shape({
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired,
        Image: PropTypes.string.isRequired,
        Name: PropTypes.string.isRequired,
      }),
      Featured: PropTypes.bool.isRequired,
      Genre: PropTypes.shape({
        Description: PropTypes.string.isRequired,
        Name: PropTypes.string.isRequired,
      }),
      ImagePath: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    })
  ),
};

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

export default connect(mapStateToProps)(MoviesList);
