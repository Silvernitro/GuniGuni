import React from 'react';
// import RecyclingManVector from '../../Assets/VectorMan.png';
// import Button from '../../components/Button';
import styles from './index.module.scss';
import Nav from '../../components/Nav';
import DayCard from '../../components/DayCard';
import Frog from '../../Assets/Frog.png';
import Frog1 from '../../Assets/Frog2.png';
import Frog2 from '../../Assets/Frog3.png';

const GuniDiscoverPage = (props:any) => {
	const days = [
		{
			day: "Mon",
			date: "18 Sept",
			desc: "60 Requests",
			frog: Frog
		},
		{
			day: "Tue",
			date: "19 Sept",
			desc: "60 Requests",
			frog: Frog1
		},
		{
			day: "Wed",
			date: "20 Sept",
			desc: "60 Requests",
			frog: Frog2
		},
		{
			day: "Thu",
			date: "21 Sept",
			desc: "60 Requests",
			frog: Frog
		}
	]

	// const date = new Date("08/09/2012");
	// const fullDate = date.toLocaleString('default', {day:'numeric', month: 'short'});
	// const day = date.toLocaleString('default', {weekday:'short'});

	return (
		<div className={`${styles.homePage} page-container`}>
			<Nav/>
			<div className={`page-background`}>
				<h1 className={styles.title}> Requests Near You </h1>
				<div className={styles.requestDates}>
				{days.map((day:any) => {
					return (
						<DayCard
							title={day.day}
							label = {day.date}
							iconImageLink={day.frog}
							desc={day.desc}
							onClick={() => (props.history.push(`/guni/discover/${day.date}`))}
						/>
					)
				})}
				</div>
			</div>
		</div>
	);
};

export default GuniDiscoverPage;
