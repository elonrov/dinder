import { RECEIVE_USER } from "../actions/users_actions";

const usersReducer = (state={}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USER:
      return action.user
    default:
      return state;
  };
};

export default usersReducer;