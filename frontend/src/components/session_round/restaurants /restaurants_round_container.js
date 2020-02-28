import { connect } from 'react-redux';
import { fetchSession, updateSession } from '../../../actions/session_actions';
import { updateUser, verifyUser } from '../../../actions/users_actions';
import RestaurantRound from './restaurants_round';

const mSTP = (state) => {
  debugger
  return {
    session: state.session,
    currentUser: state.currentUser,
    restaurants: state.session.restaurants,
    errors: state.errors.user
  }
};

const mDTP = (dispatch) => ({
  fetchSession: (sessionId) => dispatch(fetchSession(sessionId)),
  updateSession: (sessionData) => dispatch(updateSession(sessionData)),
  updateUser: (userData) => dispatch(updateUser(userData)),
  verifyUser: (userData) => dispatch(verifyUser(userData))
});

export default connect(mSTP,mDTP)(RestaurantRound);