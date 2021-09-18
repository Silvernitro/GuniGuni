import React from 'react';

/* Styling */
import styles from './index.module.scss';

interface Props {
	label: string;
	iconImageLink: string;
}

const StatsCard: React.FC<Props> = (props) => {
	const { label, iconImageLink } = props;

	return (
		<div className={`${styles.statsCard}`}>
			<img
				src={iconImageLink}
				alt="boo"
			/>
			<h3 className={styles.statsCount}>
				{label} <span>+</span>
			</h3>
			<p className={styles.statsMessage}>{label}</p>
		</div>
	);
};

export default StatsCard;
