import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

/* Styles */
import styles from './index.module.scss';
import './progressbar.scss'

interface Props {
	progress: number
}

const BrandNewCampaignProgressBar = (props:Props) => {
	const { progress } = props;

	return (
		<div className={styles.progressBar}>
			<LinearProgress
				variant="determinate"
				value={progress}
			/>
		</div>
	);
	
}

export default BrandNewCampaignProgressBar;
