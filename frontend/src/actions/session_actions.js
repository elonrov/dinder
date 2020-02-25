import * as APIUtil from "../util/session_util";

export const RECEIVE_SESSION = "RECEIVE_SESSION";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";

const receieveSession = session => { // receive action to allow session to be dispatch to sessionReducer
  return {
    type: RECEIVE_SESSION,
    session
  };
};

const receieveSessionErrors = errors => { // errors action to allow errors to be dispatch to sessionErrorsReducer
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors
  };
};

export const fetchSession = sessionId => dispatch => {  // sends axios request to get session from ID
  return APIUtil.fetchSession(sessionId)
    .then(session => dispatch(receieveSession(session)))
    .catch(err => dispatch(receieveSessionErrors(err)));
};