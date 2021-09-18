/* eslint-disable react/state-in-constructor */
// Basic Imports
import React from 'react';
import { connect } from 'react-redux';
import { TabList, TabPanel, Tabs, Tab } from 'react-tabs';

/* Actions */
import * as brandActions from '../../store/actions/brandActions';

/* Styles */
import styles from './index.module.scss';

/* Components */
import PageHeader from '../../components/PageHeader';
import CampaignList from '../../containers/BrandCampaignPage/CampaignListTable';
import CTAButton from '../../components/CTAButton';

/* Data */
import { campaigns } from '../../consts/brandCampaigns';

const BrandCampaignPage = (props: any) => {
	const [selectedTabList, setSelectedTabList] = React.useState<number>(0);
	const handleTabChange = (index: number) => {
		setSelectedTabList(index);
	};
	return (
		<>
		<main className="page-container">
			<PageHeader
				title="Dashboard"
				breadcrumb={[{ content: 'Home', to: '/brand' }, {content:'Campaigns'}]}
				callToAction='LOGOUT HERE!'
				history={props.history}
			/>
			
			<Tabs
				className={styles.productTabs}
				selectedTabClassName={styles.activeCampaignTab}
				onSelect={handleTabChange}
				selectedIndex={selectedTabList}
			>
				<div className={styles.campaignPageHeaderRow}>
					<TabList className={styles.campaignTabList}>
						<Tab>All Campaigns</Tab>
						<Tab>Current Campaigns</Tab>
					</TabList>

					<CTAButton
						colorScheme='brand'
						type='secondary'
						size='small'
						title='Create New'
						to='/brand/campaigns/new'
					/>
				</div>
				<TabPanel>
					<CampaignList campaigns={campaigns} />
				</TabPanel>

				<TabPanel>
					<CampaignList campaigns={campaigns} />
				</TabPanel>
			</Tabs>
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
