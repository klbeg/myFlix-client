import { action } from 'commander';
import { combineReducers } from 'redux';

import {
  SET_FILTER,
  SET_MOVIES,
  SET_USER,
  SET_FAV_MOVIES,
  SET_TOKEN,
} from '../actions/actions';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function user(state = null, action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
    default:
      return state;
  }
}

function favMovies(state = [], action) {
  switch (action.type) {
    case SET_FAV_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function token(state = null, action) {
  switch (action.type) {
    case SET_TOKEN:
      return action.value;
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user,
  favMovies,
  token,
});

export default moviesApp;
