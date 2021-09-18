import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './website/pages/HomePage';
import Login from './website/pages/LoginPage';
import Register from './website/pages/RegisterPage';

import BrandRegister from './pages/BrandRegisterPage';
import BrandDashboard from './pages/BrandDashboardPage';
import BrandCampaignPage from './pages/BrandCampaignPage';
import BrandReports from './pages/BrandReportsPage';
import BrandNewCampaign from './pages/BrandCampaignNewPage';

const BaseRouter = () => (
	<Switch>
		<Route exact path="/brand/register" component={BrandRegister} />
		<Route exact path="/brand" component={BrandDashboard} />
		<Route exact path="/brand/campaigns/new" component={BrandNewCampaign} />
		<Route exact path="/brand/campaigns" component={BrandCampaignPage} />
		<Route exact path="/brand/reports" component={BrandReports} />
		<Route exact path="/login" component={Login} />
		<Route exact path="/register" component={Register} />
		<Route exact path="/" component={HomePage} />
	</Switch>
);

export default BaseRouter;
