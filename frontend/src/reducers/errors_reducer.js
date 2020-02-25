import { combineReducers } from "redux";
import sessionErrorsReducer from "./session_errors_reducer";


// errors generated from session
const errorsReducer = combineReducers({
  session: sessionErrorsReducer
});

export default errorsReducer;