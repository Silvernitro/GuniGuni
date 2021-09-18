// Basic Imports
import React from 'react';

/* Components */
import CTAButton from '../../../components/CTAButton';
import InputForm from '../../../components/InputForm';

/* Styles */
import styles from './index.module.scss';

interface Props {
	handleNext: () => void;
	handleBack: () => void;
}

const CampaignDetailsForm = (props: Props) => {
	const {handleNext, handleBack} = props;
	const [campaignTitle, setCampaignTitle] = React.useState<string>('');
	const [campaignBrief, setCampaignBrief] = React.useState<string>('');
	console.log(campaignTitle);
	console.log(campaignBrief);
	
	const handleTitleChange = (e:any) => {
		setCampaignTitle(e.target.value);
	}

	const handleBriefChange = (e:any) => {
		setCampaignBrief(e.target.value);
	}
	return (
		<section>
			<h2> Fill in campaign Details </h2>
			<form className={styles.campaignDetailsForm}>
				<InputForm
					label="Campaign Title"
					id="campaignTitle"
					type="text"
					name="campaignTitle"
					value={campaignTitle}
					onChange = {handleTitleChange}
					className={styles.formInput}
				/>

				<InputForm
					label="Campaign Brief"
					id="campaignBrief"
					type="text"
					name="campaignBrief"
					textbox
					value={campaignBrief}
					onChange = {handleBriefChange}
					className={`${styles.formInput}`}
				/>
			</form>
			<div className={styles.buttonRow}>
				<CTAButton
					title="Back"
					colorScheme="brand"
					size="medium"
					type="secondary"
					onClick={handleBack}
				/>
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

export default CampaignDetailsForm;
