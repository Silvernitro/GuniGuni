import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ConsumerDashboard from './pages/ConsumerDashboard';

const BaseRouter = () => (
	<Switch>
		<Route exact path="/" component={HomePage} />
		<Route exact path="/consumer-dashboard" component={ConsumerDashboard} />
	</Switch>
);

export default BaseRouter;
