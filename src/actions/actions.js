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

export function setMovies(value) {
  return {
    type: SET_MOVIES,
    value,
  };
}

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

// in future will house and change states
//  to user whene user updates info
export function setChangeUser(value) {
  return {
    type: SET_CHANGEUSER,
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

export function setErrors(value) {
  return {
    type: SET_ERRORS,
    value,
  };
}

export function setPassErrors(value) {
  return {
    type: SET_PASS_ERRORS,
    value,
  };
}
