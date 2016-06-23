import { connect } from 'react-redux'
// import { requestLogout } from '../modules/logout'
import { requestLogin } from '../../Login/modules/login'
import Logout from '../components/Logout'


/*const mapStateToProps = (state) => {
  return {
    userid: state.logout.userid,
    role: state.logout.role
  };
}*/

const mapActionCreators = {
	//requestLogout: () => requestLogout()
	requestLogout: () => requestLogin('guest', 100)
}

/*const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(requestLogout())
  };
}*/

export default connect(undefined, mapActionCreators)(Logout);
