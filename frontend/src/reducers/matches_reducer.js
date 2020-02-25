import { RECEIVE_SESSION } from "../actions/session_actions";

const matchesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SESSION:
      return action.session; // Sets matches to session,  may need to verify how data is sent up from backend
    default:
      return state; // returns current state
  };
};

export default matchesReducer;