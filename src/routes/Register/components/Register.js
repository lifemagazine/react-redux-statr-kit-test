import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import $ from 'jquery';


export default class Register extends React.Component {

	constructor(props) {
		super(props);

		this.cancelClick = this.cancelClick.bind(this);
		this.registerClick = this.registerClick.bind(this);
		this.onKeyPress = this.onKeyPress.bind(this);
		this.doRegister = this.doRegister.bind(this);
	}

	registerClick(e) {
		e.preventDefault();

		this.doRegister();
	}

	doRegister() {
		const textUserid = this.refs.userid.value;
		const textPwd = this.refs.pwd.value;
		const textName = this.refs.name.value;
		const textEmail = this.refs.email.value;
		//console.log('registerClick: ' + textUserid + ', ' + textPwd + ', ' + textName + ', ' + textEmail);


		let itself = this;

		var formData = {userid: textUserid, password: textPwd, email: textEmail, name: textName};

		$.ajax({
			url: '/register',
			async: false,
			type: "POST",
			data : JSON.stringify(formData),
			contentType: "application/json; charset=utf-8",
			success: function(data) {
				alert('register ok: ' + formData.userid);
				console.log('register ok: ' + formData.userid);
				itself.props.history.pushState(null, '/login');
			},
			error: function(err) {
				console.log(err);
				alert('register failed');
			}
		});
	}

	onKeyPress(e) {
		if (e.charCode == 13 || e.keyCode == 13) {
			this.doRegister();
		}
	}

	cancelClick(e) {
		e.preventDefault();
		this.refs.userid.value = "";
		this.refs.pwd.value = "";
		this.refs.name.value = "";
		this.refs.email.value = "";
	}

	render() {
		return (
			<div className="container">
					<br />
				<form className="form-horizontal" role="form">
				  <div className="form-group">
					<label className="control-label col-sm-2" for="userid">User ID:</label>
					<div className="col-sm-4">
					  <input type="email" className="form-control" id="userid" ref="userid" placeholder="Enter ID" />
					</div>
				  </div>
				  <div className="form-group">
					<label className="control-label col-sm-2" for="pwd">Password:</label>
					<div className="col-sm-4">
					  <input type="password" className="form-control" id="pwd" ref="pwd" placeholder="Enter password" />
					</div>
				  </div>
				  <div className="form-group">
					<label className="control-label col-sm-2" for="name">Name:</label>
					<div className="col-sm-4">
					  <input type="name" className="form-control" id="name" ref="name" placeholder="Enter your name" />
					</div>
				  </div>
				  <div className="form-group">
					<label className="control-label col-sm-2" for="email">E-mail:</label>
					<div className="col-sm-4">
					  <input type="email" className="form-control" id="email" ref="email" placeholder="Enter e-mail address" onKeyPress={this.onKeyPress} />
					</div>
				  </div>
				  <div className="form-group">
					<div className="col-sm-offset-2 col-sm-4">
					  <button type="buttnn" className="btn btn-default" onClick={this.registerClick}>Register</button>
					  { " " }
					  <button type="button" className="btn btn-default" onClick={this.cancelClick}>Cancel</button>
					</div>
				  </div>
				</form>
			</div>
		);
	}
}
