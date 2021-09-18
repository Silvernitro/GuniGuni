import React, { useState, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import styles from './index.module.scss';
import Nav from '../../components/Nav';
import Button from '../../components/Button';
import ExpandableCard from '../../components/ExpandableCard';
import PickUpCreationModal from '../../components/PickUpCreationModal';
import Backend from '../../backend/firebase';

export enum RequestStatus {
	Accepted = 'Accepted',
	NotAccepted = 'Not Accepted'
}

export interface IRequest {
	id: string;
	date: string;
	selectedTimeSlot?: number[];
	timeSlots: number[];
	status: RequestStatus;
	location: string;
}

export const timeSlotMap: { [index: number]: string } = {
	9: '9AM - 12PM',
	12: '12PM - 3PM',
	15: '3PM - 6PM'
};

const ConsumerDashboardPage = () => {
	const [isModalOpen, setModalOpen] = useState(false);
	const [requests, setRequests] = useState<IRequest[]>([]);
	const [refreshing, setRefreshing] = useState(true);

	useEffect(() => {
		if (refreshing) {
			(async () => {
				setRequests(await fetchData());
				setRefreshing(false);
			})();
		}
	}, [refreshing]);

	const fetchData = async () => {
		const requests = await Backend.getConsumerRequests({ consumerId: '123' });
		return requests as IRequest[];
	};

	const deleteRequest = async (id: string) => {
		const success = await Backend.deleteConsumerRequest(id);
		if (success) {
			setRefreshing(true);
		}
	};

	const renderCard = ({
		id,
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
					<p>{timeSlotMap[selectedTimeSlot[0]]}</p>
				)}
				<p className={isAccepted ? styles.accepted : styles.notAccepted}>
					{isAccepted ? 'Accepted' : 'Not Accepted'}
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
					onClick={() => deleteRequest(id)}
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
				{refreshing && <Loader active />}
				{requests.map(renderCard)}
			</div>
			<PickUpCreationModal
				open={isModalOpen}
				handleClose={() => setModalOpen(false)}
				refresh={() => setRefreshing(true)}
			/>
		</div>
	);
};

export default ConsumerDashboardPage;
