import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// import {
// 	getAuth,
// 	RecaptchaVerifier,
// 	signInWithPhoneNumber
// } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyBl58EjCr6V3F8ZZBDVSsU7CkrjMTP6dlc',
	authDomain: 'guni-guni.firebaseapp.com',
	projectId: 'guni-guni',
	storageBucket: 'guni-guni.appspot.com',
	messagingSenderId: '983053380267',
	appId: '1:983053380267:web:cc1b5e42117024903565ee'
};
initializeApp(firebaseConfig);

const db = getFirestore();
export default db;

// const auth = getAuth();

// const setupCaptcha = async () => {
// 	window.recaptchaVerifier = new RecaptchaVerifier(
// 		'sendCode',
// 		{
// 			size: 'invisible',
// 			callback: (response) => {
// 				// reCAPTCHA solved, allow signInWithPhoneNumber.
// 				console.log(response);
// 			}
// 		},
// 		auth
// 	);
// };

// const appVerifier = window.recaptchaVerifier;

// const loginWithNumber = async (number) => {
// 	const result = await signInWithPhoneNumber(auth, `+65${number}`, appVerifier);

// 	result.confirm('123456').then((result) => {
// 		const { user } = result;
// 		console.log(user);
// 	});

// 	console.log(result);
// };
