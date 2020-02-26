import { connect } from 'react-redux';
import MatchingRound from './matching_round';
import { fetchSession, updateSession } from '../../actions/session_actions';

const mSTP = (state) => ({
  session: state.session,
  currentUser: state.currentUser
});

const mDTP = (dispatch) => ({
  fetchSession: (sessionId) => dispatch(fetchSession(sessionId)),
  updateSession: (sessionData) => dispatch(updateSession(sessionData))
});

export default connect(mSTP,mDTP)(MatchingRound);