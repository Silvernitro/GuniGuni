import React from 'react';
// import RecyclingManVector from '../../Assets/VectorMan.png';
// import Button from '../../components/Button';
import styles from './index.module.scss';
import Nav from '../../components/Nav';
import DayCard from '../../components/DayCard';
import Frog from '../../Assets/Frog.png';

const GuniDiscoverPage = () => {
	
	return (
		<div className={`${styles.GuniDiscoverPage} page-background`}>
			<Nav/>
			<DayCard
				label =" hi"
				iconImageLink={Frog}
				/>
		</div>
	);
};

export default GuniDiscoverPage;
