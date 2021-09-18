import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ConsumerDashboard from './pages/ConsumerDashboardPage';
import GuniDiscoverPage from './pages/GuniDiscoverPage';
import GuniDiscoverMapPage from './pages/GuniDiscoverMapPage';
import GuniAcceptedRequests from './pages/GuniAcceptedRequests';
import GuniAcceptedRequestsMapPage from './pages/GuniAcceptedRequestsMapPage';

const BaseRouter = () => (
	<Switch>
		<Route exact path="/" component={HomePage} />
		<Route exact path="/login" component={LoginPage} />
		<Route exact path="/consumer-dashboard" component={ConsumerDashboard} />
		<Route exact path="/guni/discover" component={GuniDiscoverPage} />
		<Route exact path="/guni/discover/:date" component={GuniDiscoverMapPage} />
		<Route exact path="/guni/accepted" component={GuniAcceptedRequests} />
		<Route exact path="/guni/accepted/:date" component={GuniAcceptedRequestsMapPage} />
	</Switch>
);

export default BaseRouter;
