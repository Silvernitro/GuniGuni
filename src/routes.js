import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GuniDiscoverPage from './pages/GuniDiscoverPage';
import GuniDiscoverMapPage from './pages/GuniDiscoverMapPage';

const BaseRouter = () => (
	<Switch>
		<Route exact path="/" component={HomePage} />
		<Route exact path="/guni/discover" component={GuniDiscoverPage} />
		<Route exact path="/guni/discover/:date" component={GuniDiscoverMapPage} />
	</Switch>
);

export default BaseRouter;
