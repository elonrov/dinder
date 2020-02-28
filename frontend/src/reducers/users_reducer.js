import { RECEIVE_USER, RECEIVE_SESSION_USERS } from "../actions/users_actions";

const usersReducer = (state={}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USER:
      return Object.assign({}, state, { [action.user._id]: action.user } )
    case RECEIVE_SESSION_USERS:
      return action.users
    default:
      return state;
  };
};

export default usersReducer;