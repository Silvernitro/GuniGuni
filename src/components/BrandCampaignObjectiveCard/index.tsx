import React from 'react';
import VectorImg from '../../Assets/vector.png'
/* Styles */
import styles from './index.module.scss';

interface Props {
	image?: string,
	title: string
	onClick?: () => any;
	className?: string;
}

const BrandCampaignObjectiveCard = (props: Props) => {
	const {image, title, onClick, className} = props;
	return (
			<div 
				className={`${styles.campaignObjectiveCard} ${className}`}
				onClick={onClick}
				onKeyPress={onClick}
			>
				<img className={styles.objectiveImage} src={VectorImg} alt={image}/>
				<span className={styles.titleWrapper}>
					<h3 className={styles.title}>{title}</h3>
				</span>
			</div>);
};

export default BrandCampaignObjectiveCard;
