import React from 'react';
import styles from './index.module.scss';

interface IDatesProps {
	selectedDate: Date;
	setDate(date: Date): void;
}

const Dates = ({ selectedDate, setDate }: IDatesProps) => {
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

	return <div className={styles.dateContainer}>{dates.map(renderDate)}</div>;
};

export default Dates;
