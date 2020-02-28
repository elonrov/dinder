import * as APIUtil from "../util/users_util";

export const RECEIVE_SESSION_USERS = "RECEIVE_SESSION_USERS";
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";

const receiveUser = user => {
  return {
    type: RECEIVE_USER,
    user: user.data
  };
};

const receiveSessionUsers = users => {
  const usersState = {};

  for (let i = 0; i < users.data.length; i++) {
    const user = users.data[i];
    usersState[user._id] = user;
  }
  return {
    type: RECEIVE_SESSION_USERS,
    user: usersState
  };
};

const receiveCurrentUser = user => {
  return {
    type: RECEIVE_CURRENT_USER,
    user: user.data
  };
};

const receiveUserErrors = errors => {
  return {
    type: RECEIVE_USER_ERRORS,
    errors: errors
  };
};

export const createUser = userData => dispatch => {
  return APIUtil.createUser(userData)
    .then(user => dispatch(receiveUser(user)))
    .catch(err => { 
      return dispatch(receiveUserErrors(err.response))
    });
};

// requires editing
export const fetchSessionUsers = userData => dispatch => {
  return APIUtil.fetchSessionUsers(userData)
    .then(users => dispatch(receiveSessionUsers(users)))
    .catch(err => { 
      return dispatch(receiveUserErrors(err.response))
    });
};

export const verifyUser = userData => dispatch => {
  return APIUtil.verifyUser(userData)
    .then(user => { 
      debugger
      return dispatch(receiveCurrentUser(user))
    })
    .catch(err => dispatch(receiveUserErrors(err.response)))
}

export const updateUser = userData => dispatch => {
  return APIUtil.updateUser(userData)
    .then(user => dispatch(receiveUser(user)))
    .catch(err => dispatch(receiveUserErrors(err.response)))
}

// may need to add if we need a user fetch