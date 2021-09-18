import React from 'react';

/* Styling */
import styles from './index.module.scss';

interface Props {
	label: string;
	desc: string;
	iconImageLink: string;
	title: string;
	onClick: any;
	isYellow?: boolean;
}

const StatsCard: React.FC<Props> = (props) => {
	const { label, iconImageLink, title, desc, onClick, isYellow } = props;

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events
		<div className={`${styles.dayCard} ${isYellow ? styles.yellow : ''}`} onClick={onClick}>
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
