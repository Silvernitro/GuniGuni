import axios from 'axios';
import * as actionTypes from './actionTypes';
import * as ENV_VARIABLES from '../../config';

const { BACKEND } = ENV_VARIABLES;

/**
 *
 * Sends an action to reducer to change hello world to true.
 * @memberof ReduxAction
 */
export const helloWorld = (text) => {
	return {
		type: actionTypes.HELLO_WORLD,
		helloWorld: text
	};
};

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};

export const authResetError = () => {
	return {
		type: actionTypes.AUTH_CLEAR
	};
};
export const login = (email, password) => {
	return async (dispatch) => {
		dispatch(authStart);
		const loginDetails = {
			email,
			password
		};
		try {
			const registrationResponse = await axios.post(
				`${BACKEND}/login`,
				loginDetails
			);

			// Logged into brand account.
			if (
				registrationResponse.status === 200 &&
				registrationResponse.data.account_manager_name
			) {
				const brandToken = registrationResponse.data.jwt;
				const brandName = registrationResponse.data.brand_name;
				const brandManagerName = registrationResponse.data.account_manager_name;
				dispatch({
					type: actionTypes.BRAND_AUTH_SUCCESS,
					brandIsAuthenticated: true,
					brandToken,
					brandName,
					brandManagerName
				});
			} else if (
				registrationResponse.status === 200 &&
				registrationResponse.data.tiktokId
			) {
				// Logged into creator account.
				const creatorToken = registrationResponse.data.jwt;
				const creatorTiktokId = registrationResponse.data.tiktokId;
				dispatch({
					type: actionTypes.CREATOR_AUTH_SUCCESS,
					creatorIsAuthenticated: true,
					creatorToken,
					creatorTiktokId
				});
			} else {
				// Logged into death.
				dispatch({
					type: actionTypes.AUTH_FAILURE,
					errorMessage: registrationResponse.data
				});
			}
		} catch (err) {
			if (err.response) {
				dispatch({
					type: actionTypes.AUTH_FAILURE,
					errorMessage: err.response.data
				});
			} else {
				dispatch({
					type: actionTypes.AUTH_FAILURE,
					errorMessage: 'Server error.'
				});
			}
		}
	};
};
