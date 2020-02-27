import { RECEIVE_SESSION } from "../actions/session_actions";

const sessionsReducer = (state = {}, action) => {
  Object.freeze(state);
  debugger
  switch (action.type) {
    case RECEIVE_SESSION:
      return action.session; // Sets sessions to session,  may need to verify how data is sent up from backend
    default:
      return state; // returns current state
  };
};

export default sessionsReducer;