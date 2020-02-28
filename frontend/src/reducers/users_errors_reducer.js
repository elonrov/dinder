import { RECEIVE_USER_ERRORS } from "../actions/users_actions";
import { CLEAR_ERRORS } from "../actions/session_actions";

const usersErrorsReducer = (state=[], action) => {
  switch (action.type) {
    case RECEIVE_USER_ERRORS:
      return Object.values(action.errors.data);
    case CLEAR_ERRORS:
      return [];
    default:
      return state;
  };
};

export default usersErrorsReducer;