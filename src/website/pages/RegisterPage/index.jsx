// Basic Imports
import React, { useEffect } from 'react';
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

import Arrow from '../../../Assets/hashtap_homepage_arrow.png';

/** Container, renders home page.
 * @memberof Container
 * @param {Component} Component1, Component1.
 * @param {ReduxAction} Action1, Action1.
 */
const Register = (props) => {
	useEffect(() => {
		try {
			const brandObject = JSON.parse(localStorage.getItem('brand'));
			props.brandAuthVerify(brandObject.brandToken);
		} catch (err) {
			// This means the user is not authenticated/Token is not found!
		}
		try {
			const creatorObject = JSON.parse(localStorage.getItem('creator'));
			props.creatorAuthVerify(creatorObject.creatorToken);
		} catch (err) {
			// This means the user is not authenticated/Token is not found!
		}

		// If user is already authenticated, redirect to dashboard.
		if (props.creatorIsAuthenticated) {
			props.history.push('/creator');
		} else if (props.brandIsAuthenticated) {
			props.history.push('/brand');
		}

		// Clears previous error messages
		props.authResetError();
	}, []);

	useEffect(() => {
		if (props.creatorIsAuthenticated) {
			props.history.push('/creator');
		} else if (props.brandIsAuthenticated) {
			props.history.push('/brand');
		}
	}, [props.creatorIsAuthenticated]);

	return (
		<div id="register">
			<img src={BG} className="heroBG" loading="lazy" alt="heroBG" />
			<GlobalNav history={props.history} />
			<div className="registerFormContainer">
				<div className="registerFormShadowContainer">
					<div className="registerForm">
						<h2>Sign Up</h2>
						<div className="registerTextBox">
							<h2> Let&apos;s jump straight into it.</h2>
							<h2> Tell us more about you!</h2>
							<img className="arrow" src={Arrow} alt="arrow" />
						</div>
						<h3 className="iAmText"> I am a ...</h3>
						<div className="row">
							<Link to="/creator/register">
								<div className="singleButton">lol</div>
							</Link>
							<Link to="/brand/register">lol</Link>
						</div>
					</div>
					<div className="loginRedirect">
						<p> Have an account? </p>
						<Link to="/login">lol</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

// Bringing in state from redux.
const mapStateToProps = (state) => {
	return {
		authError: state.authError,
		brandIsAuthenticated: state.brand.brandIsAuthenticated,
		creatorIsAuthenticated: state.creator.creatorIsAuthenticated
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
