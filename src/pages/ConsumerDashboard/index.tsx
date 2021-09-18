import React from 'react';
import styles from './index.module.scss';
import Nav from '../../components/Nav';
import Button from '../../components/Button';
import ExpandableCard from '../../components/ExpandableCard';

export enum RequestStatus {
	Accepted = 'Accepted',
	NotAccepted = 'Not Accepted'
}

export interface IRequest {
	date: string;
	time: string;
	status: RequestStatus;
	address: string;
}

const ConsumerDashboard = () => {
	const dummyData: IRequest[] = [
		{
			date: '21st sept 2021',
			time: '2pm',
			status: RequestStatus.Accepted,
			address: '123 bedok rd Block 123123 Singapore 123742'
		},
		{
			date: '21st sept 2021',
			time: '2pm',
			status: RequestStatus.NotAccepted,
			address: '123 bedok rd'
		},
		{
			date: '21st sept 2021',
			time: '2pm',
			status: RequestStatus.NotAccepted,
			address: '123 bedok rd'
		},
		{
			date: '21st sept 2021',
			time: '2pm',
			status: RequestStatus.NotAccepted,
			address: '123 bedok rd'
		}
	];

	const renderCard = ({ date, time, status, address }: IRequest) => {
		const isAccepted = status === RequestStatus.Accepted;
		const header = (
			<div className={styles.cardHeader}>
				<p>
					{date}, {time}
				</p>
				<p className={isAccepted ? styles.accepted : styles.notAccepted}>
					{status}
				</p>
			</div>
		);

		const body = (
			<div className={styles.cardBody}>
				<p>Location: {address}</p>
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
				/>
				{dummyData.map(renderCard)}
			</div>
		</div>
	);
};

export default ConsumerDashboard;
