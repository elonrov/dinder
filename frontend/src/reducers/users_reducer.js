import { RECEIVE_SESSION_USERS, CLEAR_USER } from "../actions/users_actions";

const usersReducer = (state=[], action) => {
  Object.freeze(state);
  switch (action.type) {
    case CLEAR_USER:
      return [];
    case RECEIVE_SESSION_USERS:
      return action.users
    default:
      return state;
  };
};

export default usersReducer;