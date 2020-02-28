import { connect } from 'react-redux';
import { fetchSession, updateSession } from '../../actions/session_actions';
import Winner from './winner';
import { fetchSessionUsers } from '../../actions/users_actions';

const mapStateToProps = (state, ownProps) => {
    return {
        session: state.session,
        winner: state.session.winner,
        users: state.users,

    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchSession: (sessionId) => dispatch(fetchSession(sessionId)), 
        updateWinner: (winner) => dispatch(updateSession(winner)),
        fetchSessionUsers: (sessionId) => dispatch(fetchSessionUsers(sessionId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Winner);