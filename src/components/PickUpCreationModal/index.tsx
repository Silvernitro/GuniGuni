import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import usePlacesAutocomplete, {
	getLatLng,
	getGeocode
} from 'use-places-autocomplete'; // getLatLng // getGeocode,
import Button from '../Button';
// import {Backend}” from ‘./src/firebase.js
import styles from './index.module.scss';

interface IPickUpCreationModal {
	open: boolean;
	handleClose(): void;
}

interface IPlacesAutocomplete {
	setAddress(address: string): void;
	setLatLng(latLng: { lat: number; lng: number }): void;
	setLocationId(locationId: string): void;
}

const PlacesAutocomplete = ({
	setAddress,
	setLatLng,
	setLocationId
}: IPlacesAutocomplete) => {
	const {
		ready,
		value,
		suggestions: { status, data },
		setValue,
		clearSuggestions
	} = usePlacesAutocomplete({
		requestOptions: {
			// center of singapore
			location: {
				lat: () => 1.3521,
				lng: () => 103.8198
			},
			// radius in metres
			radius: 20 * 1000
		},
		debounce: 300
	});

	const handleInput = (e: any) => {
		setValue(e.target.value);
	};

	const handleSelect = (suggestion: any) => () => {
		const {
			description,
			place_id: placeId,
			structured_formatting: {
				main_text: mainText,
				secondary_text: secondaryText
			}
		} = suggestion;

		clearSuggestions();
		setValue(description, false);
		setAddress(`${mainText}, ${secondaryText}`);
		setLocationId(placeId);

		getGeocode({ address: suggestion.description })
			.then((results) => getLatLng(results[0]))
			.then(({ lat, lng }) => {
				setLatLng({ lat, lng });
			})
			.catch((error) => {
				console.log('Error: ', error);
			});
	};

	const renderSuggestions = () =>
		data.map((suggestion) => {
			const {
				place_id: placeId,
				structured_formatting: {
					main_text: mainText,
					secondary_text: secondaryText
				}
			} = suggestion;
			const address = `${mainText}, ${secondaryText}`;

			return (
				<button
					className={styles.locationResult}
					key={placeId}
					onClick={handleSelect(suggestion)}
				>
					<p>{address}</p>
				</button>
			);
		});

	return (
		<div>
			<input
				value={value}
				onChange={handleInput}
				disabled={!ready}
				placeholder="Search here"
				className={styles.textInput}
			/>
			{status === 'OK' && (
				<ul className={styles.locationResults}>{renderSuggestions()}</ul>
			)}
		</div>
	);
};

const PickUpCreationModal = ({ open, handleClose }: IPickUpCreationModal) => {
	const [latlng, setLatLng] = useState({});
	const [locationId, setLocationId] = useState('');
	const [address, setAddress] = useState('');
	const [unitNumber, setUnitNumber] = useState('');
	const [selectedDate, setDate] = useState(new Date());
	const [selectedTimeSlots, setTimeSlots] = useState([] as number[]);
	console.log(latlng, locationId, address, unitNumber, selectedTimeSlots);

	const dates = [];
	for (let i = 0; i < 7; i++) {
		const date = new Date();
		date.setDate(date.getDate() + i);
		dates.push(date);
	}

	const renderDate = (date: Date) => {
		const isSelected = date.toDateString() === selectedDate.toDateString();
		return (
			<button
				className={styles[`timeSlot${isSelected ? 'Selected' : ''}`]}
				key={date.toISOString()}
				onClick={() => setDate(date)}
			>
				{`${date.getDate()}/${date.getMonth()}`}
			</button>
		);
	};

	interface ITimeSlot {
		value: number;
		label: string;
	}
	const timeSlots: ITimeSlot[] = [
		{ value: 9, label: '9am - 12pm' },
		{ value: 12, label: '12pm - 3pm' },
		{ value: 15, label: '3pm - 6pm' }
	];

	const renderTimeSlot = (timeslot: ITimeSlot) => {
		const isSelected = selectedTimeSlots.includes(timeslot.value);

		const handleClick = (timeslot: number) => {
			if (isSelected) {
				setTimeSlots(selectedTimeSlots.filter((slot) => slot !== timeslot));
			} else {
				setTimeSlots([...selectedTimeSlots, timeslot]);
			}
		};

		return (
			<button
				className={styles[`timeSlot${isSelected ? 'Selected' : ''}`]}
				key={timeslot.value}
				onClick={() => handleClick(timeslot.value)}
			>
				{timeslot.label}
			</button>
		);
	};

	const submit = () => {
		const payload = {
			coordinate: latlng,
			consumerId: '123',
			date: selectedDate.toDateString(),
			location: address,
			locationId,
			timeSlots: selectedTimeSlots,
			unitNum: unitNumber
		};
		console.log(payload);
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500
			}}
			className={styles.modalContainer}
		>
			<Fade in={open}>
				<div className={styles.formContainer}>
					<h2 className={styles.formLabel}>Create a Pickup</h2>
					<p className={styles.formLabel}>Location:</p>
					<PlacesAutocomplete
						setAddress={setAddress}
						setLatLng={setLatLng}
						setLocationId={setLocationId}
					/>
					<p className={styles.formLabel}>Unit number:</p>
					<input
						value={unitNumber}
						onChange={(e: any) => setUnitNumber(e.target.value)}
						placeholder="Optional"
						className={styles.textInput}
					/>
					<p className={styles.formLabel}>Date:</p>
					<div className={styles.dateContainer}>{dates.map(renderDate)}</div>
					<p className={styles.formLabel}>Time slots:</p>
					<div className={styles.timeSlotsContainer}>
						{timeSlots.map(renderTimeSlot)}
					</div>

					<Button
						color="white"
						type="primary"
						size="medium"
						title="Create!"
						className={styles.submitButton}
						onClick={submit}
					/>
				</div>
			</Fade>
		</Modal>
	);
};

export default PickUpCreationModal;
