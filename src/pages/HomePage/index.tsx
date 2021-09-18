import React from 'react';
import RecyclingManVector from '../../Assets/VectorMan.png';
import Button from '../../components/Button';
import styles from './index.module.scss';

const HomePage = () => {
	return (
		<div className={`${styles.homePage} page-container`}>
			<img className={styles.heroVector} src={RecyclingManVector} alt="vector"/>
			<h1 className={styles.heroTitle}> GUNI {<br/>} GUNI</h1>
			<p className={styles.heroDesc}> Modern Recycling for Modern Families </p>
			<Button 
				color="white"
				type="primary"
				size="medium"
				title="Let's Start"
				className={styles.button}
				onClick={() => null}
			/>
		</div>
	);
};

export default HomePage;
