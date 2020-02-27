import { connect } from 'react-redux';
import SessionRound from './session_round';
import { fetchSession, updateSession } from '../../actions/session_actions';
import { updateUser, verifyUser } from '../../actions/users_actions';

const mSTP = (state) => {
  return {
    session: state.session,
    currentUser: state.currentUser,
    errors: state.errors.user
  }
};

const mDTP = (dispatch) => ({
  fetchSession: (sessionId) => dispatch(fetchSession(sessionId)),
  updateSession: (sessionData) => dispatch(updateSession(sessionData)),
  updateUser: (userData) => dispatch(updateUser(userData)),
  verifyUser: (userData) => dispatch(verifyUser(userData))
});

export default connect(mSTP,mDTP)(SessionRound);