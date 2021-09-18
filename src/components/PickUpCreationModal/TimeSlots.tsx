import React from 'react';
import styles from './index.module.scss';

interface ITimeSlot {
	value: number;
	label: string;
}

const timeSlots: ITimeSlot[] = [
	{ value: 9, label: '9AM - 12PM' },
	{ value: 12, label: '12PM - 3PM' },
	{ value: 15, label: '3PM- 6PM' }
];

interface ITimeSlotsProps {
	selectedTimeSlots: number[];
	setTimeSlots(timeslots: number[]): void;
}

const TimeSlots = ({ selectedTimeSlots, setTimeSlots }: ITimeSlotsProps) => {
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

	return (
		<div className={styles.timeSlotsContainer}>
			{timeSlots.map(renderTimeSlot)}
		</div>
	);
};

export default TimeSlots;
