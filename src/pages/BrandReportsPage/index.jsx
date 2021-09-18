// Basic Imports
import React, { Component } from 'react';
// -------------------------------------------------------------------------
// Imports needed for redux
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';

// -------------------------------------------------------------------------
// Import CSS below
import './index.scss';

/** Container, renders home page.
 * @memberof Container
 * @param {Component} Component1, Component1.
 * @param {ReduxAction} Action1, Action1.
 */
class BrandReports extends Component {
	/**
	 * Called upon submission of login form, then calls redux-action (authLogin) to login and update redux state.
	 * @param {Object} event: contains form information about username and password.
	 */
	handleSubmit = (event) => {
		event.preventDefault();
		this.props.helloWorldAction(event.target.text.value);
	};

	render() {
		return (
			<div id="brandReports">
				<h1>Coming Soon!</h1>
			</div>
		);
	}
}

// Bringing in state from redux.
const mapStateToProps = (state) => {
	return {
		helloWorldStatus: state.helloWorld
	};
};

// Bringing in actions from redux.
const mapDispatchToProps = (dispatch) => {
	return {
		helloWorldAction: (text) => dispatch(actions.helloWorld(text))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandReports);
