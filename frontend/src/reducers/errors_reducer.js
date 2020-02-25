import { combineReducers } from "redux";
import sessionErrorsReducer from "./session_errors_reducer";
import usersErrorsReducer from "./users_errors_reducer";

// errors generated from session
const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  user: usersErrorsReducer
});

export default errorsReducer;