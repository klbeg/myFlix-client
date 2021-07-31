export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const SET_CHANGE_USER = 'SET_CHANGE_USER';
export const SET_FAV_MOVIES = 'SET_FAV_MOVIES';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_DISABLE_FORM = 'SET_DISABLE_FORM';
export const SET_DISABLE_UPDATE_PASSWORD = 'SET_DISABLE_UPDATE_PASSWORD';
export const SET_ERRORS = 'SET_ERRORS';
export const SET_PASS_ERRORS = 'SET_PASS_ERRORS';
export const SET_LOGIN_USER = 'SET_LOGIN_USER';
export const SET_LOGIN_PASS = 'SET_LOGIN_PASS';

export function setMovies(value) {
  return {
    type: SET_MOVIES,
    value,
  };
}

//  used to filter moveis in main-view
export function setFilter(value) {
  return {
    type: SET_FILTER,
    value,
  };
}

export function setUser(value) {
  return {
    type: SET_USER,
    value,
  };
}

export function setChangeUser(value) {
  return {
    type: SET_CHANGE_USER,
    value,
  };
}

export function setFavMovies(value) {
  return {
    type: SET_FAV_MOVIES,
    value,
  };
}

export function setToken(value) {
  return {
    type: SET_TOKEN,
    value,
  };
}

export function setDisableForm(value) {
  return {
    type: SET_DISABLE_FORM,
    value,
  };
}

export function setDisableUpdatePassword(value) {
  return {
    type: SET_DISABLE_UPDATE_PASSWORD,
    value,
  };
}

//  used for update user input validation
export function setErrors(value) {
  return {
    type: SET_ERRORS,
    value,
  };
}

//  used for update password input validation
export function setPassErrors(value) {
  return {
    type: SET_PASS_ERRORS,
    value,
  };
}

export function setLoginUser(value) {
  return {
    type: SET_LOGIN_USER,
    value,
  };
}

export function setLoginPass(value) {
  return {
    type: SET_LOGIN_PASS,
    value,
  };
}
