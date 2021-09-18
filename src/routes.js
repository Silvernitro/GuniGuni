import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GuniDiscoverPage from './pages/GuniDiscoverPage';
import Map from './components/Map';

const BaseRouter = () => (
	<Switch>
		<Route exact path="/" component={HomePage} />
		<Route exact path="/guni/discover" component={GuniDiscoverPage} />
		<Route exact path="/map" component={Map} />
	</Switch>
);

export default BaseRouter;
