import { connect } from 'react-redux';
import MatchingRound from './matching_round';
import { fetchSession } from '../../actions/session_actions';

const mSTP = (state) => ({
  session: state.session
});

const mDTP = (dispatch) => ({
  fetchSession: (sessionId) => dispatch(fetchSession(sessionId)),
  
});

export default connect(mSTP,mDTP)(MatchingRound);