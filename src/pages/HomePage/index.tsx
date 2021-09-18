import React from 'react';
import RecyclingManVector from '../../Assets/VectorMan.png';
import Button from '../../components/Button';

const HomePage = () => {
	return (
		<>
			<h1> GUNI {<br/>} GUNI</h1>
			<img src={RecyclingManVector} alt="vector"/>
			<h1> Modern Recycling for Modern Families </h1>
			<Button 
				color="white"
				type="primary"
				size="small"
				title="Let's Start"
				onClick={() => null}
			/>
		</>
	);
};

export default HomePage;
