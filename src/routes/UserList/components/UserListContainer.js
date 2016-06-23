import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import UserList from './UserList';
// import { requestUserlist } from '../../routes/UserList/modules/actions';
// import { getUserlistReducer } from '../../routes/UserList/modules/reducers';
import $ from 'jquery';

export default class UserListContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: []
		};
		console.log('UserListContainer.constructor');
	}

	componentDidMount() {
		console.log('UserListContainer.componentDidUpdate');

		var itself = this;
		var result = { userlist: [], errMsg: '' };
		var jqxhr = $.getJSON( "/users", function( data ) {
			console.log(data);
			$.each(data, function(key, value) {
				var user = new Object();
				user._id = value._id;
				user.userid = value.id;
				user.password = "********";
				user.name = value.name;
				user.email = value.email;

				result.userlist.push(user);
			});
		}).done(function() {
			console.log( "succeeded to get user list" );
		}).fail(function() {
			console.log( "fail to get user list" );
			result.errMsg = 'fail to get user list';
		}).always(function() {
			itself.setState({userData: result.userlist});
			console.log('UserListContainer.componentDidMount.ok');
		});
	}

	componentWillReceiveProps() {
		console.log('componentWillReceiveProps()');
	}
	shouldComponentUpdate() {
		console.log('shouldComponentUpdate()');
		return true;
	}
	componentWillUpdate() {
		console.log('componentWillUpdate()');
	}
	componentDidUpdate() {
		console.log('componentDidUpdate()');
	}

	render() {
		console.log('begin UserListContainer.render');
		return (
			<UserList userlist={this.state.userData} />
		);
		console.log('end UserListContainer.render');
	}
}

export default UserListContainer;
