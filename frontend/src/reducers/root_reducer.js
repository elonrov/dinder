import { combineReducers } from "redux";
import sessionsReducer from "./sessions_reducer";
import errorsReducer from "./errors_reducer";
import usersReducer from "./users_reducer";

// may want to change sessions to entities if we add users, but should be complicated if we have both and no entities

const rootReducer = combineReducers({
  session: sessionsReducer,
  currentUser: usersReducer,
  errors: errorsReducer
});

export default rootReducer;