import React from 'react';

/* Styling */
import styles from './index.module.scss';

interface Props {
	label: string;
	desc: string;
	iconImageLink: string;
	title: string;
}

const StatsCard: React.FC<Props> = (props) => {
	const { label, iconImageLink, title, desc } = props;

	return (
		<div className={`${styles.dayCard}`}>
			<div className={styles.imageBox}>
				<img
					src={iconImageLink}
					alt="boo"
				/>
				<h3 className={styles.date}>
					{title}
				</h3>
			</div>
			<p className={styles.label}>{label}</p>
			<p className={styles.desc}>{desc}</p>
		</div>
	);
};

export default StatsCard;
