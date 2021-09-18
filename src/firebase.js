import { initializeApp } from 'firebase/app';
import {
	collection,
	query,
	where,
	getFirestore,
	getDocs,
	deleteDoc,
	doc,
	addDoc
} from 'firebase/firestore';
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

// function initFirebase() {
// 	if (!firebase.apps.length) {
// 		initializeApp(firebaseConfig);
// 	}
// }

// initFirebase();
initializeApp(firebaseConfig);

const db = getFirestore();

const createConsumerRequest = async (payload) => {
	try {
		const newPayload = {
			...payload,
			...{
				coordinate: payload.coordinate
					? JSON.stringify(payload.coordinate)
					: null,

				date: payload.date
					? new Date(payload.date).toDateString()
					: new Date().toDateString()
			}
		};
		console.log(payload);
		const doc = await addDoc(collection(db, 'request'), newPayload);
		console.log(doc);
		return doc.id;
	} catch (error) {
		console.error('Error adding document: ', error);
		return null;
	}
};

const getConsumerRequest = async (consumerId, date) => {
	const consumerRequests = [];
	try {
		let consumerRequestQuery;
		if (consumerId) {
			consumerRequestQuery = query(
				collection(db, 'request'),
				where('consumerId', '==', consumerId)
			);
		} else if (date) {
			consumerRequestQuery = query(
				collection(db, 'request'),
				where('date', '==', date)
			);
		}

		const querySnapshot = await getDocs(consumerRequestQuery);
		querySnapshot.forEach((doc) => {
			const data = doc.data();
			data.id = doc.id;
			data.coordinate = JSON.parse(data.coordinate);
			consumerRequests.push(data);
		});
	} catch (error) {
		console.error('Error getting document: ', error);
	}
	return consumerRequests;
};

const getGuniRequest = async (guniId) => {
	const acceptedRequests = [];
	try {
		const acceptedQuery = query(
			collection(db, 'request'),
			where('garangGuniId', '==', guniId)
		);

		const querySnapshot = await getDocs(acceptedQuery);
		querySnapshot.forEach((doc) => {
			const data = doc.data();
			data.id = doc.id;
			acceptedRequests.push(data);
		});
	} catch (error) {
		console.error('Error getting document: ', error);
	}
	return acceptedRequests.filter((req) => req.status === 'Accepted');
};

const deleteConsumerRequest = async (docId) => {
	try {
		await deleteDoc(doc(db, 'request', docId));
		return true;
	} catch (error) {
		console.error('Error deleting document: ', error);
		return false;
	}
};

export const Backend = {
	createConsumerRequest,
	getConsumerRequest,
	deleteConsumerRequest,
	getGuniRequest
};

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
