import { connect } from 'react-redux';
import SessionForm from './session_form';
import { receiveClearErrors, createSession } from "../../actions/session_actions";
import { createUser } from "../../actions/users_actions";

const mapStateToProps = (state, ownProps) => {
    return {
        
        // maybe ui stuff otherwise null
    };
};

const mapDispatchToProps = dispatch => {
    return {

        clearErrors: () => dispatch(receiveClearErrors()),
        createSession: sessionData => dispatch(createSession(sessionData)),
        createUser: userData => dispatch(createUser(userData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);