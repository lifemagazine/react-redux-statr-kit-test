import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import $ from 'jquery';


class Logout extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log('logout componentDidMount()');

		let itself = this;
		$.ajax({
			url: '/logout',
			async: false,
			type: "POST",
			success: function(data) {
				alert('logout ok');
				//itself.props.requestLogout();
				itself.props.requestLogout();
				itself.props.history.pushState(null, '/home');
			},
			error: function(err) {
				alert('failed to logout!');
			}
		});
	}

	render() {
		return (
			<div className="container">
				Logout...
			</div>
		);
	}
}

export default Logout;
