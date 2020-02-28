import { RECEIVE_CURRENT_USER } from "../actions/users_actions";

const currentUserReducer = (state={}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return action.user;
    default:
      return state;
  };
};

export default currentUserReducer;