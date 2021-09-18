import React from 'react';
// import RecyclingManVector from '../../Assets/VectorMan.png';
// import Button from '../../components/Button';
import { Loader } from 'semantic-ui-react';
import styles from './index.module.scss';
import Nav from '../../components/Nav';
import DayCard from '../../components/DayCard';
import Frog from '../../Assets/Frog.png';
import Frog1 from '../../Assets/Frog2.png';
import Frog2 from '../../Assets/Frog3.png';
import Backend from '../../backend/firebase';

const GuniDiscoverPage = (props:any) => {
	const [days, setDays] = React.useState<any[]>([]);
	const frogs = [Frog, Frog1, Frog2, Frog, Frog1]	
	React.useEffect(() => {
		const fetch = async () => {
			const daysArr = [];
			const currentDate = new Date();
			let dates:any[] = [new Date()];
			for (let i = 0; i <= 3; i++) {
				const newDate = currentDate.setDate(currentDate.getDate() + 1);
				dates = [...dates, new Date(newDate)];
			}
			const res:any = await Backend.getNumberOfRequest(dates, 'Not Accepted');			
			for (let i = 0; i <=4; i++) {
				const day:any = {
					day: dates[i].toLocaleString('default', {weekday:'short'}),
					date: dates[i].toLocaleString('default', {day:'numeric', month: 'short'}),
					desc: `${res[i]} requests available`,
					frog: frogs[i]
				}
				daysArr.push(day);
			}
			setDays(daysArr);
		}

		fetch();
	}, [])


	return (
		<div className={`${styles.homePage} page-container`}>
			<Nav/>
			<div className={`page-background`}>
				<h1 className={styles.title}> Requests Near You </h1>
				{days.length === 0 && <Loader active/>}
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
