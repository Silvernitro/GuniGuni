// Basic Imports
import React, { Component } from 'react';
// -------------------------------------------------------------------------
// Imports needed for redux
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';

// -------------------------------------------------------------------------
// Import CSS below
import './index.scss';
import BrandNav from '../../components/BrandNav';

/** Container, renders home page.
 * @memberof Container
 * @param {Component} Component1, Component1.
 * @param {ReduxAction} Action1, Action1.
 */
class BrandDashboard extends Component {
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
			<main>
				<BrandNav history={this.props.history} />
				<div id="brandDashboard" className="page-container">
					<h1> You&apos;ve no ongoing campaigns nowwww. </h1>
					<div className="creatorButton">
						{' '}
						<h2>Create new </h2>
					</div>
				</div>
			</main>
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

export default connect(mapStateToProps, mapDispatchToProps)(BrandDashboard);
