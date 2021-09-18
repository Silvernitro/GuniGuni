import React from 'react';
import styles from './index.module.scss';
import Nav from '../../components/Nav';
import Button from '../../components/Button';

const ConsumerDashboard = () => {
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
			</div>
		</div>
	);
};

export default ConsumerDashboard;
