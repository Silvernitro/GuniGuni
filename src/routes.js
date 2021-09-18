import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ConsumerDashboard from './pages/ConsumerDashboard';
import GuniDiscoverPage from './pages/GuniDiscoverPage';

const BaseRouter = () => (
	<Switch>
		<Route exact path="/" component={HomePage} />
		<Route exact path="/consumer-dashboard" component={ConsumerDashboard} />
		<Route exact path="/guni/discover" component={GuniDiscoverPage} />
	</Switch>
);

export default BaseRouter;
