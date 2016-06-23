import { connect } from 'react-redux'
import { requestLogin, requestLoginAsync } from '../modules/login'
import Login from '../components/Login'

const mapActionCreators = {
        requestLogin: (userId, role) => requestLogin(userId, role)
}

/*const mapStateToProps = (state) => ({
  userid: state.userid,
  role: state.role
})*/

export default connect(undefined, mapActionCreators)(Login);


