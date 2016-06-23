import React, { Component, PropTypes } from 'react';
import $ from 'jquery';

export default class UserInfo extends React.Component {
        constructor(props) {
                super(props);
                this.handleClick = this.handleClick.bind(this);
                this.updateClick = this.updateClick.bind(this);
                this.cancelClick = this.cancelClick.bind(this);
                this.onKeyPress = this.onKeyPress.bind(this);
                this.doUpdate = this.doUpdate.bind(this);

                this.state = {
                        div1Style: {display: 'block'},
                        div2Style: {display: 'none'}
                }
        }

        handleClick() {
                this.setState({
                        div1Style: {display: 'none'},
                        div2Style: {display: 'block'}
       });
        }

        updateClick() {

                this.doUpdate();
        }

        doUpdate() {
                let itself = this;
                let formData = {_id: this.props._id, password: this.refs.newPassword.value};
                console.log(formData);
                $.ajax({
            url: '/users/' + formData.userid,
            async: false,
            type: "POST",
            data : JSON.stringify(formData),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                alert('succeeded to update the password for ' + formData.userid);
                                itself.setState({
                                        div1Style: {display: 'block'},
                                        div2Style: {display: 'none'}
                                });
            },
            error: function(err) {
                alert('failed to update the password for ' + formData.userid);
                                itself.refs.newPassword.value = "";
            }
        });
        }

        cancelClick() {
                this.refs.newPassword.value = "";
                this.setState({
                        div1Style: {display: 'block', cursor: 'pointer'},
                        div2Style: {display: 'none'}
                });
        }

        onKeyPress(e) {
                if (e.charCode == 13 || e.keyCode == 13) {
                        this.doUpdate();
                }
        }

        render() {
                let txtStyle = { width: 100, height: 30 };
                let btnStyle = { height: 30 };
                return (
                        <tr>
                                <td>{this.props.no}</td>
                                <td>{this.props.userid}</td>
                                <td>
                                        <div id={this.props.div1} style={this.state.div1Style} onClick={this.handleClick}>********</div>
                                        <div id={this.props.div2} className="form-inline" style={this.state.div2Style}>
                                                <input type="password" style={txtStyle} className="form-control input-sm" id="newPassword" placeholder="New Password" ref="newPassword" onKeyPress={this.onKeyPress} />
                                                { " " }
                                                <button type="buttnn" style={btnStyle} className="btn btn-default btn-xs" onClick={this.updateClick}>Update</button>
                                                <button type="buttnn" style={btnStyle} className="btn btn-default btn-xs" onClick={this.cancelClick}>Cancel</button>
                                        </div>
                                </td>
                                <td>{this.props.name}</td>
                                <td>{this.props.email}</td>
                        </tr>
                );
        }
}
