import React from 'react';
import Map from '../../containers/Map';
import styles from './index.module.scss';
import Nav from '../../components/Nav';
import DateDropdown from '../../components/Dropdown';
import Button from '../../components/Button';


const GuniDiscoverMapPage = () => {
	const dates = [
		"23 Aug", "24 Aug", "25 Aug", "26 Aug"
	]
	// const date = new Date("08/09/2012");
	// const fullDate = date.toLocaleString('default', {day:'numeric', month: 'short'});
	// const day = date.toLocaleString('default', {weekday:'short'});

	return (
		<div className={`${styles.homePage} page-container`}>
			<Nav/>
			<div className={`page-background`}>
				<div className={styles.headerRow}>
					<Button type='secondary' size='small' color='green' title='Back'/>
					<DateDropdown dates={dates}/>
				</div>
				<Map/>
			</div>
		</div>
	);
};

export default GuniDiscoverMapPage;
