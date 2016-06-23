import { connect } from 'react-redux'
import { requestUserlist } from '../modules/userlist'
import UserListContainer from '../components/UserListContainer'

const mapActionCreators = {
        requestLogin: () => requestUserlist()
}


export default connect(undefined, mapActionCreators)(UserListContainer);
