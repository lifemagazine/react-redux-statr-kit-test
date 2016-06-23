
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { IndexLink, Link, browserHistory } from 'react-router'
// import { requestLogout } from '../../routes/Logout/modules/logout';
// import { mapStateToProps, mapDispatchToProps } from '../../routes/Logout/containers/LogoutContainer';
import classes from './Header.scss'
import $ from 'jquery'

class Header extends Component {

constructor(props) {
  super(props);
  //this.logoutClick = this.logoutClick.bind(this);
}

componentWillReceiveProps() {
  console.log('componentWillReceiveProps() - ' + this.props.userid);
}
shouldComponentUpdate() {
  console.log('shouldComponentUpdate() - ' + this.props.userid);
  return true;
}
componentWillUpdate() {
  console.log('componentWillUpdate() - ' + this.props.userid);
}
componentDidUpdate() {
  console.log('componentDidUpdate() - ' + this.props.userid);
  /*if (this.preprops == undefined && this.props.role >= 100) {
    browserHistory.pushState(null, '/');
  }*/
}

/* logoutClick(e) {
  e.preventDefault();

  let itself = this;

  $.ajax({
    url: '/logout',
    async: false,
    type: "POST",
    success: function(data) {
      alert('logout ok');
      itself.props.logout();
      browserHistory.pushState(null, '/register');
    },
    error: function(err) {
      alert('failed to logout!');
    }
  });
} */

render() {
  console.log('this.props.userid: ' + this.props.userid);
  console.log('this.props.role: ' + this.props.role);
  let menuList = [];
  if (this.props.userid == 'guest') {
    return (
      <div>
        <IndexLink to='/home' activeClassName={classes.activeRoute}>Home</IndexLink>
        {' · '}
        <Link to='/login' activeClassName={classes.activeRoute}>Login</Link>
        {' · '}
        <Link to='/register' activeClassName={classes.activeRoute}>Register</Link>
      </div>
    );
  } else if (this.props.role == 1) {
    return (
      <div>
        <IndexLink to='/home' activeClassName={classes.activeRoute}>Home</IndexLink>
        {' · '}
        <Link to='/userlist' activeClassName={classes.activeRoute}>UserList</Link>
        {' · '}
        <Link to='/logout' activeClassName={classes.activeRoute}>Logout</Link>
      </div>
    );
  } else {
    return (
      <div>
        <IndexLink to='/home' activeClassName={classes.activeRoute}>Home</IndexLink>
        {' · '}
        <Link to='/logout' activeClassName={classes.activeRoute}>Logout</Link>
      </div>
    );
  }

}
}


// export default connect(mapStateToProps, mapDispatchToProps)(Header);
export default Header


