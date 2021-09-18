import React from 'react';
import { useHistory } from 'react-router-dom';
import RecyclingManVector from '../../Assets/VectorMan.png';
import Button from '../../components/Button';
import styles from './index.module.scss';
import Nav from '../../components/Nav';

const HomePage = () => {
	const history = useHistory();

	return (
		<div className={`${styles.homePage} page-container`}>
			<Nav />
			<img
				className={styles.heroVector}
				src={RecyclingManVector}
				alt="vector"
			/>
			<h1 className={styles.heroTitle}> GUNI {<br />} GUNI</h1>
			<p className={styles.heroDesc}>
				{' '}
				Modern Recycling {<br />}for Modern Families{' '}
			</p>
			<Button
				color="white"
				type="primary"
				size="medium"
				title="Let's Start"
				className={styles.button}
				onClick={() => {
					history.push('/login');
				}}
			/>
		</div>
	);
};

export default HomePage;
