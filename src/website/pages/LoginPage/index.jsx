// Basic Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// -------------------------------------------------------------------------
// Imports needed for redux
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/actions';
import * as creatorActions from '../../../store/actions/creatorActions';
import * as brandActions from '../../../store/actions/brandActions';
// -------------------------------------------------------------------------
// Import CSS below
import './index.scss';
import GlobalNav from '../../components/GlobalNav';
import BG from '../../../Assets/hashtap_homepage_BG.png';

/** Container, renders login page.
 * @memberof Container
 * @param {Component} Component1, Component1.
 * @param {ReduxAction} Action1, Action1.
 */
class Login extends Component {
	componentDidMount() {
		// This is to check the cache, and see if the user is logged in already.
		try {
			const brandObject = JSON.parse(localStorage.getItem('brand'));
			this.props.brandAuthVerify(brandObject.brandToken);
		} catch (err) {
			// This means the user is not authenticated/Token is not found!
		}

		try {
			const creatorObject = JSON.parse(localStorage.getItem('creator'));
			this.props.creatorAuthVerify(creatorObject.creatorToken);
		} catch (err) {
			// This means the user is not authenticated/Token is not found!
		}

		// If user is already authenticated, redirect to dashboard.
		if (this.props.creatorIsAuthenticated) {
			this.props.history.push('/creator');
		} else if (this.props.brandIsAuthenticated) {
			this.props.history.push('/brand');
		}

		// Clears previous error messages
		this.props.authResetError();
	}

	componentDidUpdate() {
		if (this.props.creatorIsAuthenticated) {
			this.props.history.push('/creator');
		} else if (this.props.brandIsAuthenticated) {
			this.props.history.push('/brand');
		}
	}

	/**
	 * Called upon submission of login form, then calls redux-action (login) to login and update redux state.
	 * @param {Object} event: contains form information about username and password.
	 */
	handleSubmit = (event) => {
		event.preventDefault();
		this.props.login(event.target.email.value, event.target.password.value);
	};

	render() {
		return (
			<div id="login">
				<img src={BG} className="heroBG" loading="lazy" alt="heroBG" />
				<GlobalNav history={this.props.history} />
				<form onSubmit={this.handleSubmit} className="">
					<div className="loginFormContainer">
						<div className="loginShadowContainer">
							<div className="loginForm">
								<h2>Log in to Hashtap</h2>

								<div className="loginInputRow">
									<i className="icofont icofont-ui-user loginInputIcon"></i>
									<input
										className="loginInput"
										type="text"
										name="email"
										placeholder="Email Address"
									/>
								</div>
								<div className="loginInputRow bottomRow">
									<i className="icofont icofont-lock loginInputIcon"></i>
									<input
										className="loginInput"
										type="password"
										name="password"
										placeholder="Password"
									/>
								</div>
								{this.props.isAuthLoading ? <p>loading</p> : <p> lol</p>}
								<p className="errorMessage">{this.props.authError}</p>
							</div>
							<div className="signupRedirect">
								<p> New to Hashtap? </p>
								<Link to="/register">
									<p> lol</p>
								</Link>
							</div>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

// Bringing in state from redux.
const mapStateToProps = (state) => {
	return {
		authError: state.authError,
		isAuthLoading: state.isAuthLoading,
		creatorIsAuthenticated: state.creator.creatorIsAuthenticated,
		brandIsAuthenticated: state.brand.brandIsAuthenticated
	};
};

// Bringing in actions from redux.
const mapDispatchToProps = (dispatch) => {
	return {
		login: (email, password) => dispatch(actions.login(email, password)),
		brandAuthVerify: (brandToken) =>
			dispatch(brandActions.brandAuthVerify(brandToken)),
		creatorAuthVerify: (creatorToken) =>
			dispatch(creatorActions.creatorAuthVerify(creatorToken)),
		authResetError: () => dispatch(actions.authResetError())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
