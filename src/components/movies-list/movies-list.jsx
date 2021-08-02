import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';
import { Row } from 'react-bootstrap';

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter((m) =>
      m.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }

  if (!movies) return <div className="main-view" />;

  return (
    <>
      <Col className="mt-3 pl-0 d-flex">
        <div className="col-md-3 pl-0">
          <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </div>
      </Col>

      <Row>
        {filteredMovies.map((m) => (
          <Col lg={3} md={4} sm={12} key={m._id}>
            <MovieCard movie={m} />
          </Col>
        ))}
        ;
      </Row>
    </>
  );
}

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

export default connect(mapStateToProps)(MoviesList);
