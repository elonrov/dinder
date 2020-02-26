import * as APIUtil from "../util/session_util";

export const RECEIVE_SESSION = "RECEIVE_SESSION";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

const receieveSession = session => { // receive action to allow session to be dispatch to sessionReducer
  return {
    type: RECEIVE_SESSION,
    session: session.data
  };
};

const receieveSessionErrors = errors => { // errors action to allow errors to be dispatch to sessionErrorsReducer
  debugger
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors: errors.data
  };
};

export const receieveClearErrors = () => { // allows errors to be cleared from state
  return {
    type: CLEAR_ERRORS
  };
};

export const fetchSession = sessionId => dispatch => {  // sends axios request to get session from ID
  return APIUtil.fetchSession(sessionId)
    .then(session => dispatch(receieveSession(session)))
    .catch(err => dispatch(receieveSessionErrors(err)));
};

export const createSession = sessionData => dispatch => {  // sends axios request to create session with given data
  return APIUtil.createSession(sessionData)
    .then(session => dispatch(receieveSession(session)))
    .catch(err => dispatch(receieveSessionErrors(err)));
};

export const updateSession = sessionData => dispatch => {  // sends axios request to update session
  return APIUtil.updateSession(sessionData)
    .then(session => dispatch(receieveSession(session)))
    .catch(err => dispatch(receieveSessionErrors(err)));
};
