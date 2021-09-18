// Base imports
import React from 'react';

// Routing imports
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import BaseRouter from './routes';

// Import css to remove margin
import './index.css';
import './index.scss';
import 'semantic-ui-css/semantic.min.css'

const app = (
	<Router>
		<BaseRouter />
	</Router>
);

ReactDOM.render(app, document.getElementById('root'));
