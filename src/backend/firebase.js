import {
	collection,
	getDocs,
	deleteDoc,
	doc,
	addDoc,
	updateDoc
} from 'firebase/firestore';
import db from '../firebase';

const toTimeSlot = (arg) => {
	let startTime = arg;
	if (startTime > 24) {
		startTime -= 24;
	}
	const start = `${startTime > 12 ? startTime - 12 : startTime}${
		startTime >= 12 ? 'PM' : 'AM'
	}`;
	let endTime = startTime + 3;
	if (endTime > 24) {
		endTime -= 24;
	}
	const end = `${endTime > 12 ? endTime - 12 : endTime}${
		endTime >= 12 ? 'PM' : 'AM'
	}`;
	return `${start}-${end}`;
};

const repackagedRequestResponse = (arr) => {
	const newArr = [];
	arr.forEach((req) => {
		let exist = false;
		let indexOfSimilar;
		for (let i = 0; i < newArr.length; i++) {
			if (newArr[i].location === req.location) {
				exist = true;
				indexOfSimilar = i;
			}
		}

		const newReq = {
			unitNumber: req.unitNum,
			timeSlots: req.timeSlots.map((start) => toTimeSlot(start)),
			garangGuniId: req.garangGuniId,
			requestId: req.id
		};

		if (exist) {
			newArr[indexOfSimilar].requests.push(newReq);
		} else {
			newArr.push({
				latLng: {
					lat: req.coordinate.lat,
					lng: req.coordinate.lng
				},
				address: req.location,
				requests: [newReq]
			});
		}
	});

	return newArr;
};

const validateConsumerRequest = (request, options) => {
	let validation = true;
	if (options) {
		Object.entries(options).forEach(([key, value]) => {
			if (value !== request[key]) {
				validation = false;
			}
		});
	}
	return validation;
};

class Backend {
	static createConsumerRequest = async (payload) => {
		try {
			const newPayload = {
				...payload,
				...{
					coordinate: payload.coordinate
						? JSON.stringify(payload.coordinate)
						: null,

					date: payload.date
						? new Date(payload.date).toDateString()
						: new Date().toDateString(),
					status: 'Not Accepted'
				}
			};
			const doc = await addDoc(collection(db, 'request'), newPayload);
			return doc.id;
		} catch (error) {
			console.error('Error adding document: ', error);
			return null;
		}
	};

	static getConsumerRequests = async (options) => {
		const consumerRequests = [];
		try {
			const allRequests = await getDocs(collection(db, 'request'));
			allRequests.forEach((doc) => {
				const data = doc.data();
				if (!validateConsumerRequest(data, options)) return;
				data.id = doc.id;
				data.coordinate = JSON.parse(data.coordinate);
				consumerRequests.push(data);
			});
		} catch (error) {
			console.error('Error getting document: ', error);
		}

		if (options && 'consumerId' in options) {
			return consumerRequests;
		}
		return repackagedRequestResponse(consumerRequests);
	};

	static updateConsumerRequest = async (requestId, payload) => {
		try {
			await updateDoc(doc(db, 'request', requestId), payload);
			return true;
		} catch (error) {
			console.error('Error getting document: ', error);
			return false;
		}
	};

	static deleteConsumerRequest = async (requestId) => {
		try {
			await deleteDoc(doc(db, 'request', requestId));
			return true;
		} catch (error) {
			console.error('Error deleting document: ', error);
			return false;
		}
	};
}

export default Backend;
// static getConsumerRequestsFilterByDate = async (date) => {
// 	const consumerRequests = [];
// 	try {
// 		const consumerRequestQuery = query(
// 			collection(db, 'request'),
// 			where('date', '==', new Date(date).toDateString())
// 		);
// 		const querySnapshot = await getDocs(consumerRequestQuery);
// 		querySnapshot.forEach((doc) => {
// 			const data = doc.data();
// 			data.id = doc.id;
// 			data.coordinate = JSON.parse(data.coordinate);
// 			consumerRequests.push(data);
// 		});
// 	} catch (error) {
// 		console.error('Error deleting document: ', error);
// 	}

// 	return repackagedRequestResponse(consumerRequests);
// };

// static getGuniRequest = async (guniId, status) => {
// 	const acceptedRequests = [];
// 	try {
// 		const acceptedQuery = query(
// 			collection(db, 'request'),
// 			where('garangGuniId', '==', guniId)
// 		);
// 		const querySnapshot = await getDocs(acceptedQuery);
// 		querySnapshot.forEach((doc) => {
// 			const data = doc.data();
// 			data.id = doc.id;
// 			data.coordinate = JSON.parse(data.coordinate);
// 			acceptedRequests.push(data);
// 		});
// 	} catch (error) {
// 		console.error('Error getting document: ', error);
// 	}
// 	if (status) {
// 		acceptedRequests.filter((req) => req.status === status);
// 	}
// 	return repackagedRequestResponse(acceptedRequests);
// };
