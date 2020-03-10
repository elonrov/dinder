import { connect } from 'react-redux';
import ThankYou from './thank_you';
// import { fetchSession } from '../../actions/session_actions';

const mapStateToProps = state => {
  return {
    session: state.session
  }
}; 

const mapDispatchToProps = dispatch => {
  return {
    // fetchSession: session => dispatch(fetchSession(session))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThankYou);