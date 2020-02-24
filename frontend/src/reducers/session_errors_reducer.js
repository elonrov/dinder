import { RECEIVE_SESSION_ERRORS } from "../actions/session_actions";

const sessionErrorsReducer = (state=[], action) => {
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      action.errors;
    case CLEAR_ERRORS:
      return [];
    default:
      return state;
  };
};

export default sessionErrorsReducer;