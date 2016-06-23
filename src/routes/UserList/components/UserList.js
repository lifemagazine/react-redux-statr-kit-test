import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import UserInfo from './UserInfo';

export default class UserList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let tdStyle = { align: "center" };
		return (
			<div className="container">
				<br />
				<table className="table table-striped">
					<thead>
						<tr>
							<th style={tdStyle}>No.</th>
							<th style={tdStyle}>User ID</th>
							<th>Password</th>
							<th>Name</th>
							<th>E-mail</th>
						</tr>
					</thead>
					<tbody>
						{this.props.userlist.map((data, i) => {
							return (
								<UserInfo
									no={i+1}
									_id={data._id}
									userid={data.userid}
									name={data.name}
									email={data.email}
									div1={"active-div-" + data.userid}
									div2={"inactive-div-" + data.userid}
									key={i} />
								);
						})}
					</tbody>
				</table>

			</div>
		);
	}
}

