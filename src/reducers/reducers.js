import { action } from 'commander';
import { combineReducers } from 'redux';

import {
  SET_FILTER,
  SET_MOVIES,
  SET_USER,
  SET_CHANGE_USER,
  SET_FAV_MOVIES,
  SET_TOKEN,
  SET_DISABLE_FORM,
  SET_DISABLE_UPDATE_PASSWORD,
  SET_ERRORS,
  SET_PASS_ERRORS,
  SET_LOGIN_USER,
  SET_LOGIN_PASS,
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

//  needs to add new keys, not overwrite old ones
function changeUser(state = {}, action) {
  switch (action.type) {
    case SET_CHANGE_USER:
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

function disableForm(state = 'disabled', action) {
  switch (action.type) {
    case SET_DISABLE_FORM:
      return action.value;
    default:
      return state;
  }
}

function disableUpdatePassword(state = 'disabled', action) {
  switch (action.type) {
    case SET_DISABLE_UPDATE_PASSWORD:
      return action.value;
    default:
      return state;
  }
}

//  should be an array containing all errors
//  can't test because changeUser isn't working right
function errors(state = {}, action) {
  switch (action.type) {
    case SET_ERRORS:
      return action.value;
    default:
      return state;
  }
}

function passErrors(state = {}, action) {
  switch (action.type) {
    case SET_PASS_ERRORS:
      return action.value;
    default:
      return state;
  }
}

function loginUser(state = '', action) {
  switch (action.type) {
    case SET_LOGIN_USER:
      return action.value;
    default:
      return state;
  }
}

function loginPass(state = '', action) {
  switch (action.type) {
    case SET_LOGIN_PASS:
      return action.value;
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user,
  changeUser,
  favMovies,
  token,
  disableForm,
  disableUpdatePassword,
  errors,
  passErrors,
  loginUser,
  loginPass,
});

export default moviesApp;
