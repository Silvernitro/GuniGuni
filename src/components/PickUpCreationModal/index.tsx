import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Button from '../Button';
import PlacesAutocomplete from './PlacesAutocomplete';
import Dates from './Dates';
import TimeSlots from './TimeSlots';

import Backend from '../../backend/firebase';
import styles from './index.module.scss';

interface IPickUpCreationModal {
	open: boolean;
	handleClose(): void;
}

const PickUpCreationModal = ({ open, handleClose }: IPickUpCreationModal) => {
	const [latlng, setLatLng] = useState({});
	const [locationId, setLocationId] = useState('');
	const [address, setAddress] = useState('');
	const [unitNumber, setUnitNumber] = useState('');
	const [selectedDate, setDate] = useState(new Date());
	const [selectedTimeSlots, setTimeSlots] = useState<number[]>([]);

	const submit = async () => {
		const payload = {
			coordinate: latlng,
			// TODO: get real customer id
			consumerId: '123',
			date: selectedDate.toDateString(),
			location: address,
			locationId,
			timeSlots: selectedTimeSlots,
			unitNum: unitNumber
		};
		console.log(payload);
		try {
			const id = await Backend.createConsumerRequest(payload);
			handleClose();
			console.log('id', id);
		} catch {
			console.log('error');
		}
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
					<Dates selectedDate={selectedDate} setDate={setDate} />

					<p className={styles.formLabel}>Time slots:</p>
					<TimeSlots
						selectedTimeSlots={selectedTimeSlots}
						setTimeSlots={setTimeSlots}
					/>

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
