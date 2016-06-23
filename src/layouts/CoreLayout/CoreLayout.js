import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header'
import classes from './CoreLayout.scss'
import '../../styles/core.scss'

/*export const CoreLayout = ({ children }) => (
  <div className='container text-center'>
    <Header />
    <div className={classes.mainContainer}>
      {children}
    </div>
  </div>
)*/

class CoreLayout extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log('this.props.userid: ' + this.props.userid);
		console.log('this.props.role: ' + this.props.role);
		return (
  			<div className='container text-center'>
				<Header userid={this.props.userid} role={this.props.role} />
				<div className={classes.mainContainer}>
					{this.props.children}
				</div>
			</div>
		);
	}
}

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

const mapStateToProps = (state) => {
    console.log('state.login.userid: ' + JSON.stringify(state.login));
    if (state.login == undefined) {
      return { userid: 'guest' , role: 100 };
    } else {
      return {
        userid: state.login.userid,
        role: state.login.role
      };
    }
}

CoreLayout = connect(mapStateToProps)(CoreLayout);

export default CoreLayout
