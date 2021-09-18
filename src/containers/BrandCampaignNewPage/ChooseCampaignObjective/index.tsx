// Basic Imports
import React from 'react';

/* Components */
import CampaignObjectiveCarousel from './CampaignObjectiveCarousel';
import CTAButton from '../../../components/CTAButton';

/* Styles */
import styles from './index.module.scss';

/* Constants */
import { CAMPAIGN_OBJECTIVES } from '../../../consts/brandNewCampaign';

interface Props {
	handleNext: () => void;
}

const ChooseCampaignObjective = (props: Props) => {
	const {handleNext} = props;
	const [selectedObjective, setSelectedObjective] = React.useState<string>('');

	return (
		<section>
			<h2> Choose campaign objective</h2>
			<CampaignObjectiveCarousel
				options = {CAMPAIGN_OBJECTIVES}
				selectedObjective={selectedObjective}
				setSelectedObjective={setSelectedObjective}
			/>
			
			<div className={styles.buttonRow}>
				<CTAButton
					title="Next"
					colorScheme="brand"
					size="medium"
					type="primary"
					onClick={handleNext}
				/>
			</div>
		</section>
	);
};

export default ChooseCampaignObjective;
