import { connect } from 'react-redux';
import { fetchSession } from '../../actions/session_actions';
import Winner from './winner';

const mapStateToProps = state => {
    return {
        // winner: this.state.session.winner
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchSession: (sessionId) => dispatch(fetchSession(sessionId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Winner);