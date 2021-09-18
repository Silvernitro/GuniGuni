import React, { useState } from 'react';
import styles from './index.module.scss';
import Nav from '../../components/Nav';
import Button from '../../components/Button';
import ExpandableCard from '../../components/ExpandableCard';
import PickUpCreationModal from '../../components/PickUpCreationModal';

export enum RequestStatus {
	Accepted = 'Accepted',
	NotAccepted = 'Not Accepted'
}

export interface IRequest {
	date: string;
	selectedTimeSlot?: number;
	timeSlots: number[];
	status: RequestStatus;
	location: string;
}

export const timeSlotMap: { [index: number]: string } = {
	9: '9AM - 12PM',
	12: '12PM - 3PM',
	15: '3PM - 6PM'
};

const ConsumerDashboard = () => {
	const [isModalOpen, setModalOpen] = useState(false);

	const dummyData: IRequest[] = [
		{
			date: '21st sept 2021',
			timeSlots: [9, 12, 15],
			selectedTimeSlot: 9,
			status: RequestStatus.Accepted,
			location: '123 bedok rd Block 123123 Singapore 123742'
		},
		{
			date: '21st sept 2021',
			timeSlots: [9, 12, 15],
			status: RequestStatus.NotAccepted,
			location: '123 bedok rd Block 123123 Singapore 123742'
		},
		{
			date: '21st sept 2021',
			timeSlots: [9, 12, 15],
			status: RequestStatus.NotAccepted,
			location: '123 bedok rd Block 123123 Singapore 123742'
		},
		{
			date: '21st sept 2021',
			timeSlots: [9, 12, 15],
			status: RequestStatus.NotAccepted,
			location: '123 bedok rd Block 123123 Singapore 123742'
		}
	];

	const renderCard = ({
		date,
		timeSlots,
		selectedTimeSlot,
		status,
		location
	}: IRequest) => {
		const isAccepted = status === RequestStatus.Accepted;

		const header = (
			<div className={styles.cardHeader}>
				<p>{date}</p>
				{isAccepted && selectedTimeSlot && (
					<p>{timeSlotMap[selectedTimeSlot]}</p>
				)}
				<p className={isAccepted ? styles.accepted : styles.notAccepted}>
					{status}
				</p>
			</div>
		);

		const body = (
			<div className={styles.cardBody}>
				{!isAccepted && (
					<div style={{ marginBottom: '8px' }}>
						<p style={{ fontWeight: 700 }}>Selected timings:</p>
						<p>
							{timeSlots.map((timeSlot) => timeSlotMap[timeSlot]).join(', ')}
						</p>
					</div>
				)}

				<p style={{ fontWeight: 700 }}>Location:</p>
				<p>{location}</p>
				<Button
					color="white" // dummy value, it'll be overwritten to be red in the styles
					type="primary"
					size="medium"
					title="Delete"
					className={styles.deleteButton}
				/>
			</div>
		);

		return <ExpandableCard header={header} body={body} />;
	};

	return (
		<div className={`${styles.consumerDashboard} page-container`}>
			<Nav />
			<div className="page-background">
				<h2>My pickup requests</h2>
				<Button
					color="white"
					type="primary"
					size="medium"
					title="Create a new request"
					className={styles.addButton}
					onClick={() => setModalOpen(true)}
				/>
				{dummyData.map(renderCard)}
			</div>
			<PickUpCreationModal
				open={isModalOpen}
				handleClose={() => setModalOpen(false)}
			/>
		</div>
	);
};

export default ConsumerDashboard;
