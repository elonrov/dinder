import { RECEIVE_USER, RECEIVE_SESSION_USERS } from "../actions/users_actions";

const usersReducer = (state=[], action) => {
  Object.freeze(state);
  const newState = state;
  switch (action.type) {
    case RECEIVE_USER:
      newState.push(action.user);
      return newState;
    case RECEIVE_SESSION_USERS:
      return action.users
    default:
      return state;
  };
};

export default usersReducer;