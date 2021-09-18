/* eslint-disable camelcase */
/* eslint-disable react/state-in-constructor */
// Basic Imports
import React, { Component } from 'react';
// -------------------------------------------------------------------------

// Imports needed for redux
import { connect } from 'react-redux';
import * as brandActions from '../../store/actions/brandActions';
// -------------------------------------------------------------------------

import './index.css';
// import BrandSquareButton from '../../components/BrandSquareButton';

function isASCII(str) {
	return /^[a-zA-Z0-9]*$/.test(str);
}

function isValidEmail(email) {
	const re = /\S+@\S+\.\S+/;
	return re.test(email);
}

/** Container, renders home page.
 * @memberof Container
 * @param {Component} Component1, Component1.
 * @param {ReduxAction} Action1, Action1.
 */
class BrandRegister extends Component {
	state = {
		managerNameError: '',
		passwordError: '',
		brandNameError: '',
		emailError: ''
	};

	componentDidMount() {
		try {
			const brandObject = JSON.parse(localStorage.getItem('brand'));
			this.props.brandAuthVerify(brandObject.brandToken);
		} catch (err) {
			// This means the user is not authenticated/Token is not found!
		}

		// If user is already authenticated, redirect to dashboard.
		if (this.props.creatorIsAuthenticated) {
			this.props.history.push('/creator');
		} else if (this.props.brandIsAuthenticated) {
			this.props.history.push('/brand');
		}
	}

	componentDidUpdate() {
		if (this.props.creatorIsAuthenticated) {
			this.props.history.push('/creator');
		} else if (this.props.brandIsAuthenticated) {
			this.props.history.push('/brand');
		}
	}

	/**
	 * Called upon submission of login form, then calls redux-action (authLogin) to login and update redux state.
	 * @param {Object} event: contains form information about username and password.
	 */
	handleSubmit = (event) => {
		event.preventDefault();
		let passedInputValidation = true;

		// Input validation for manager name
		if (event.target.account_manager_name.value.length < 4) {
			this.setState({
				managerNameError: 'Name must be of at least 4 characters.'
			});
			passedInputValidation = false;
		}

		if (!isASCII(event.target.account_manager_name.value)) {
			this.setState({
				managerNameError: 'Name must not contain any special characters.'
			});
			passedInputValidation = false;
		}

		if (passedInputValidation) {
			this.setState({ managerNameError: '' });
		}

		// Input validation for password
		if (event.target.brand_password.value.length < 8) {
			this.setState({
				passwordError: 'Password must be of at least 8 characters.'
			});
			passedInputValidation = false;
		} else {
			this.setState({ passwordError: '' });
		}

		// Input validation for organization name
		if (event.target.brand_name.value.length < 4) {
			this.setState({
				brandNameError: 'Organization name must be of at least 4 characters.'
			});
			passedInputValidation = false;
		} else {
			this.setState({ brandNameError: '' });
		}

		// Input validation for email
		if (!isValidEmail(event.target.brand_email.value)) {
			this.setState({ emailError: 'Email is invalid.' });
			passedInputValidation = false;
		} else {
			this.setState({ emailError: '' });
		}

		if (passedInputValidation) {
			this.props.brandRegister(
				event.target.brand_name.value,
				event.target.brand_website.value,
				event.target.brand_email.value,
				event.target.brand_password.value,
				event.target.account_manager_name.value
			);
		}
	};

	render() {
		return (
			<div className="brandRegister">
				<form onSubmit={this.handleSubmit} className="">
					<div className="brandRegisterBox">
						<div className="brandRegisterLeft">
							<div className="brandRegisterForm">
								<h2> Sign Up </h2>

								<div className="row">
									<div className="brandInputSmallRow brandInputSmallRowLeft">
										<i className="icofont icofont-ui-user brandInputIcon"></i>
										<input
											className="brandSmallInput"
											type="text"
											name="account_manager_name"
											placeholder="Name"
										/>
									</div>

									<div className="brandInputSmallRow">
										<i className="icofont icofont-lock brandInputIcon"></i>
										<input
											className="brandSmallInput"
											type="password"
											name="brand_password"
											placeholder="New Password"
										/>
									</div>
								</div>
								<p className="errorText"> {this.state.managerNameError} </p>
								<p className="errorText"> {this.state.passwordError} </p>

								<div className="brandInputRow">
									<i className="icofont icofont-briefcase-2 brandInputIcon"></i>
									<input
										className="brandInput"
										type="text"
										name="brand_name"
										placeholder="Organization Name"
									/>
								</div>
								<p className="errorText"> {this.state.brandNameError} </p>

								<div className="brandInputRow">
									<i className="icofont icofont-web brandInputIcon"></i>
									<input
										className="brandInput"
										type="text"
										name="brand_website"
										placeholder="Organization Website (if applicable)"
									/>
								</div>

								<div className="brandInputRow">
									<i className="icofont icofont-ui-email brandInputIcon"></i>
									<input
										className="brandInput"
										type="text"
										name="brand_email"
										placeholder="Email Address"
									/>
								</div>
								<p className="errorText"> {this.state.emailError} </p>
								<p className="errorText"> {this.props.authError} </p>

								<div className="brandInputRow">
									<i className="icofont icofont-chart-pie brandInputIcon"></i>
									<input
										className="brandInput"
										type="text"
										name=""
										placeholder="Content Category"
									/>
								</div>
								<br />
							</div>
						</div>
						<div className="brandRegisterRight">
							<div className="brandRegisterConfirm">
								<h1 className="btmText"> Welcome to {<br />} the Hashtap!</h1>
								{/* <BrandSquareButton
									content={<h2 className="bold"> Create My Account</h2>}
								/> */}
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
		brandIsAuthenticated: state.brand.brandIsAuthenticated,
		authError: state.authError
	};
};

// Bringing in actions from redux.
const mapDispatchToProps = (dispatch) => {
	return {
		brandRegister: (
			brand_name,
			brand_website,
			brand_email,
			brand_password,
			account_manager_name
		) =>
			dispatch(
				brandActions.brandRegister(
					brand_name,
					brand_website,
					brand_email,
					brand_password,
					account_manager_name
				)
			),
		brandAuthVerify: (brandToken) =>
			dispatch(brandActions.brandAuthVerify(brandToken))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandRegister);
