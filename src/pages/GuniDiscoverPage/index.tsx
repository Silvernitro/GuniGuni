import React from 'react';
// import RecyclingManVector from '../../Assets/VectorMan.png';
// import Button from '../../components/Button';
import styles from './index.module.scss';
import Nav from '../../components/Nav';
import DayCard from '../../components/DayCard';
import Frog from '../../Assets/Frog.png';

const GuniDiscoverPage = () => {
	const date = new Date("08/09/2012");
	const fullDate = date.toLocaleString('default', {day:'numeric', month: 'short'});
	const day = date.toLocaleString('default', {weekday:'short'});

	return (
		<div className={`${styles.homePage} page-container`}>
			<Nav/>
			<div className="page-background">
				<DayCard
					title={day}
					label = {fullDate}
					iconImageLink={Frog}
					desc="60 Requests"
				/>
			</div>
		</div>
	);
};

export default GuniDiscoverPage;
