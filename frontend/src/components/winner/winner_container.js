import { connect } from 'react-redux';
import { fetchSession, updateSession } from '../../actions/session_actions';
import Winner from './winner';

const mapStateToProps = (state, ownProps) => {
    return {
        session: this.state.session,
        winner: this.state.session.winner, 
        //make sure winner is added to session schema
    }
};

const mapDispatchToProps = dispatch => {
    return {
        // fetchSession: (sessionId) => dispatch(fetchSession(sessionId)), 
        updateWinner: (winner) => dispatch(updateSession(winner))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Winner);