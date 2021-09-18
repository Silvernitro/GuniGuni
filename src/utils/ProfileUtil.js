/* eslint-disable no-alert */
import * as ValidationUtil from './ValidationUtil';

export const validateUpdateProfile = async (
	name,
	dob,
	tiktokHandle,
	email,
	isOwnTiktok,
	isOwnEmail
) => {
	const nameErrorMsg = ValidationUtil.validateName(name);
	if (nameErrorMsg) {
		alert(nameErrorMsg);
		return false;
	}

	const dobErrorMsg = ValidationUtil.validateDob(dob.split('T')[0]);
	if (dobErrorMsg) {
		alert(dobErrorMsg);
		return false;
	}

	if (!isOwnTiktok) {
		const tiktokErrorMsg = await ValidationUtil.validateTiktok(tiktokHandle);
		if (tiktokErrorMsg) {
			alert(tiktokErrorMsg);
			return false;
		}
	}

	if (!isOwnEmail) {
		const emailErrorMsg = await ValidationUtil.validateEmail(email);
		if (emailErrorMsg) {
			alert(emailErrorMsg);
			return false;
		}
	}

	return true;
};
