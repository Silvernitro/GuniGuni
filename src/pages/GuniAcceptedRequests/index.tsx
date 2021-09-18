import React from 'react';
// import RecyclingManVector from '../../Assets/VectorMan.png';
// import Button from '../../components/Button';
import styles from './index.module.scss';
import Nav from '../../components/Nav';
import DayCard from '../../components/DayCard';
import Frog from '../../Assets/Frog.png';
import Frog1 from '../../Assets/Frog2.png';
import Frog2 from '../../Assets/Frog3.png';

const GuniAcceptedRequests = (props:any) => {
	const days = [
		{
			day: "Mon",
			date: "18 Sept",
			desc: "60 Accepted",
			frog: Frog
		},
		{
			day: "Tue",
			date: "19 Sept",
			desc: "60 Accepted",
			frog: Frog1
		},
		{
			day: "Wed",
			date: "20 Sept",
			desc: "60 Accepted",
			frog: Frog2
		},
		{
			day: "Thu",
			date: "21 Sept",
			desc: "60 Accepted",
			frog: Frog
		}
	]

	// const date = new Date("08/09/2012");
	// const fullDate = date.toLocaleString('default', {day:'numeric', month: 'short'});
	// const day = date.toLocaleString('default', {weekday:'short'});

	return (
		<div className={`${styles.accepted} page-container`}>
			<Nav/>
			<div className={`page-background`}>
				<h1 className={styles.title}> Your Accepted Requests </h1>
				<div className={styles.requestDates}>
				{days.map((day:any) => {
					return (
						<DayCard
							isYellow
							title={day.day}
							label = {day.date}
							iconImageLink={day.frog}
							desc={day.desc}
							onClick={() => (props.history.push(`/guni/accepted/${day.date}`))}
						/>
					)
				})}
				</div>
			</div>
		</div>
	);
};

export default GuniAcceptedRequests;
