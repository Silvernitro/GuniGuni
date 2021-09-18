import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './Pages/Homepage';

const BaseRouter = () => (
	<Switch>
		<Route exact path="/" component={HomePage} />
	</Switch>
);

export default BaseRouter;
