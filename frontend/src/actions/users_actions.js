import * as APIUtil from "../util/users_util";

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";

const receiveUser = user => {
  return {
    type: RECEIVE_USER,
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
      debugger
      return dispatch(receiveUserErrors(err))
    });
};

// export const fetchUser = userId => dispatch => {
//   return APIUtil.fetchUser(userId)
//     .then(user => dispatch(receiveUser(user)))
//     .catch(err => dispatch(receiveUserErrors(err)))
// }

// may need to add if we need a user fetch