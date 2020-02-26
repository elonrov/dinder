import { combineReducers } from "redux";
import matchesReducer from "./matches_reducer";
import errorsReducer from "./errors_reducer";
import usersReducer from "./users_reducer";

// may want to change matches to entities if we add users, but should be complicated if we have both and no entities

const rootReducer = combineReducers({
  matches: matchesReducer,
  users: usersReducer,
  errors: errorsReducer
});

export default rootReducer;