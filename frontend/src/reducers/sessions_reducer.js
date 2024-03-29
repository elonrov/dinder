import { RECEIVE_SESSION } from "../actions/session_actions";
// import { RECEIVE_RESTAURANTS } from "../"

const sessionsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SESSION:
      return action.session; // Sets sessions to session,  may need to verify how data is sent up from backend
    // case RECEIVE_RESTAURANTS: 

    default:
      return state; // returns current state
  };
};

export default sessionsReducer;