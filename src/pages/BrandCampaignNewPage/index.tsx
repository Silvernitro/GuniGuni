// Basic Imports
import React from 'react';
import { connect } from 'react-redux';

/* Actions */
import * as brandActions from '../../store/actions/brandActions';

/* Styles */
import styles from './index.module.scss';

/* Components */
import PageHeader from '../../components/PageHeader';
import BrandNewCampaignProgressBar from '../../components/BrandNewCampaignProgressBar';
import ChooseCampaignObjective from '../../containers/BrandCampaignNewPage/ChooseCampaignObjective';
import CampaignDetailsForm from '../../containers/BrandCampaignNewPage/CampaignDetailsForm';

/* Constants */
import { campaignPhase } from '../../consts/brandNewCampaign';

const BrandCampaignPage = (props: any) => {
	const [createCampaignPhase, setCreateCampaignPhase] = React.useState<number>(0);
	
	const handleNext = () => {
		setCreateCampaignPhase(createCampaignPhase + 1);
	}

	const handleBack = () => {
		setCreateCampaignPhase(createCampaignPhase - 1);
	}

	let campaignPhaseContent;
	switch (createCampaignPhase) {
		case(campaignPhase.CHOOSE_CAMPAIGN_OBJECTIVE): 
			campaignPhaseContent = <ChooseCampaignObjective handleNext={handleNext}/>
			break;
		
		case (campaignPhase.ENTER_CAMPAIGN_DETAILS): 
			campaignPhaseContent = <CampaignDetailsForm handleNext={handleNext} handleBack={handleBack}/>
			break;
		
		default:
			campaignPhaseContent = <ChooseCampaignObjective handleNext={handleNext}/>
			break;
	}
	return (
		<>
		<main className="page-container">
			<PageHeader
				title="Dashboard"
				breadcrumb={[{ content: 'Home', to: '/brand' }, 
				{content:'Campaigns', to: '/brand/campaigns'},
				{content:'New Campaign'}]}
				callToAction='LOGOUT HERE!'
				history={props.history}
			/>			
			<div className={styles.headerRow}>
				<BrandNewCampaignProgressBar
						progress={createCampaignPhase * 30}
				/>
			</div>
			<h2 className={styles.headerText}> Getting started with something new </h2>
			<div className={styles.newCampaignFormContent}>
				{campaignPhaseContent}
			</div>
		</main>
		</>
	);
};

// Bringing in state from redux.
const mapStateToProps = (state: any) => {
	return {
		brandToken: state.brand.brandToken,
		brandCampaigns: state.brand.brandCampaigns
	};
};

// Bringing in actions from redux.
const mapDispatchToProps = (dispatch: any) => {
	return {
		getBrandCampaigns: (brandToken: string) =>
			dispatch(brandActions.getBrandCampaigns(brandToken))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandCampaignPage);
