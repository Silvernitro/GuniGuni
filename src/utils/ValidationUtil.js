import { BACKEND } from '../config';

// Supporting functions ------------------------------------------------------------
function isASCII(str) {
	if (str.includes(' ')) {
		const strs = str.split(' ');
		let isValid = true;

		strs.forEach((string) => {
			if (!/^[a-zA-Z0-9]*$/.test(string)) {
				isValid = false;
			}
		});
		return isValid;
	}
	return /^[a-zA-Z0-9]*$/.test(str);
}

const isDate = (date) => {
	return /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(date);
};

const fetchTiktok = async (handle) => {
	const user = handle[0] === '@' ? handle.substring(1) : handle;
	try {
		const response = await fetch(
			`${BACKEND}/creator/registerationVerification/tiktokVerification/${user}`
		);

		const data = await response.json();
		return data;
	} catch (error) {
		return null;
	}
};

const fetchEmail = async (email) => {
	try {
		const response = await fetch(
			`${BACKEND}/creator/registerationVerification/emailVerification/${email}`
		);
		const data = await response.json();
		return data;
	} catch (error) {
		return null;
	}
};
//----------------------------------------------------------------------------

export const validateName = (name) => {
	let tempNameErrorMsg = null;
	if (!isASCII(name)) {
		tempNameErrorMsg = 'Name must not contain any special characters';
	}

	if (name.length < 4) {
		tempNameErrorMsg = 'Name must be of at least 4 characters';
	}

	return tempNameErrorMsg;
};

export const validateDob = (dob) => {
	if (dob === '') {
		return 'Date of Birth is empty';
	} else if (!isDate(dob)) {
		return 'Date of Birth is of invalid format';
	}
	return null;
};

export const validateGender = (gender) => {
	if (gender === '') {
		return 'Select a gender';
	}
	return null;
};

export const validatePass = (pass) => {
	if (pass.length < 8) {
		return 'Password must be of at least 8 characters';
	}
	return null;
};

export const validateCfmPass = (pass, cfmPass) => {
	if (pass !== cfmPass) {
		return 'Password is not the same';
	}
	return null;
};

export const validateEmail = async (email) => {
	if (email === '') {
		return 'Email is empty';
	} else {
		const response = await fetchEmail(email);

		if (response) {
			const { validEmail, emailNotInDb } = response;

			// check if is valid
			if (!validEmail) {
				return 'Email is invalid';
			} else if (!emailNotInDb) {
				return 'Email is already registered';
			}

			return null;
		} else {
			// if response is null
			return 'Server Error';
		}
	}
};

export const validateTiktok = async (tiktokHandle) => {
	if (tiktokHandle === '') {
		return 'Tiktok handle is empty';
	} else {
		const response = await fetchTiktok(tiktokHandle);

		if (response) {
			const { isValidAcc, doesNotExistInDb } = response;

			// check if valid
			if (!isValidAcc) {
				return 'Tiktok handle is invalid';
			} else if (!doesNotExistInDb) {
				return 'Tiktok handle is already registered';
			}

			return null;
		} else {
			// if response is null
			return 'Server Error';
		}
	}
};
