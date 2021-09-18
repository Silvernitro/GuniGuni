import React from 'react';
import { Loader } from 'semantic-ui-react';
import Map from '../../containers/Map';
import styles from './index.module.scss';
import Nav from '../../components/Nav';
import DateDropdown from '../../components/Dropdown';
import Button from '../../components/Button';
import Backend from '../../backend/firebase';


const GuniDiscoverMapPage = (props:any) => {
	const displayDate = props.match.params.date;
	const [currentDate, setCurrentDate] = React.useState<string>(displayDate);
	const [blocks, setBlocks] = React.useState<any>(false);
	const [isLoading, setLoading] = React.useState<boolean>(true);
	const dates = []
	const currDate = new Date();
	
	for (let i = 1; i <= 5; i++) {
		const parsedDate = currDate.toLocaleString('default', {day:'numeric', month: 'short'});
		dates.push({key: i, text: parsedDate, value: i});
		currDate.setDate(currDate.getDate() + 1);
	}

	React.useEffect(() => {
		const getBlocks = async () => {
			const myDate = new Date(`${currentDate} 2021`).toDateString();
			const test = await Backend.getConsumerRequests({date: myDate, status: 'Not Accepted'}, true);
			setBlocks(test);
			setLoading(false);
		}
		getBlocks();
	}, [currentDate]);

	return (
		<div className={`${styles.homePage} page-container`}>
			<Nav />
			<div className={`page-background`}>
				<div className={styles.headerRow}>
					<Button type='secondary' size='small' color='green' title='Back' to='/guni/discover'/>
					<p> discover </p>
					<DateDropdown 
						dates={dates} 
						placeholder={currentDate} 
						current={currentDate} 
						onChange={(selected:any) => (setCurrentDate(selected))}
					/>
				</div>
				{isLoading ? <Loader active/>: <Map blocks = {blocks}/>}
			</div>
		</div>
	);
};

export default GuniDiscoverMapPage;
