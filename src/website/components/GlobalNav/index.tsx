import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

/* Actions */
import * as creatorActions from '../../../store/actions/creatorActions';
import * as brandActions from '../../../store/actions/brandActions';

/* Styles */
import styles from './index.module.scss';

interface Props {
	creatorLogout: () => void;
	brandLogout: () => void;
	brandIsAuthenticated: boolean;
	creatorIsAuthenticated: boolean;
	history: any;
}

const GlobalNav = (props: Props) => {
	const [isInAuthPhase, setIsInAuthPhase] = React.useState(false);
	const {
		creatorLogout,
		brandLogout,
		brandIsAuthenticated,
		creatorIsAuthenticated,
		history
	} = props;

	React.useEffect(() => {
		if (
			history.location.pathname === '/login' ||
			history.location.pathname === '/register' ||
			history.location.pathname === '/brand/login' ||
			history.location.pathname === '/brand/register' ||
			history.location.pathname === '/creator/login' ||
			history.location.pathname === '/creator/register'
		) {
			setIsInAuthPhase(true);
		} else {
			setIsInAuthPhase(false);
		}
	});

	const handleBrandLogout = (event: any) => {
		event.preventDefault();
		brandLogout();
		history.push('/');
	};

	const handleCreatorLogout = (event: any) => {
		event.preventDefault();
		creatorLogout();
		history.push('/login');
	};

	if (isInAuthPhase) {
		return (
			<div id="globalNavBox">
				<Link to="/">
					<h1 className="logo"> hashtap. </h1>
				</Link>
			</div>
		);
	} else {
		return (
			<div className={styles.nav}>
				<Link to="/">
					<p className={styles.logo}> hashtap. </p>
				</Link>
				<div className={styles.navOptions}>
					<Link to="/login" className={styles.navLink}>
						Contact Us
					</Link>
					<Link to="/login" className={styles.navLink}>
						How It Works
					</Link>
					{brandIsAuthenticated ? (
						<button
							className={styles.navLink}
							onClick={handleBrandLogout}
							onKeyPress={handleBrandLogout}
						>
							Log Out
						</button>
					) : creatorIsAuthenticated ? (
						<button
							className={styles.navLink}
							onClick={handleCreatorLogout}
							onKeyPress={handleCreatorLogout}
						>
							Log Out
						</button>
					) : (
						<Link to="/login" className={styles.navLink}>
							Log In
						</Link>
					)}
				</div>
			</div>
		);
	}
};

// Bringing in state from redux.
const mapStateToProps = (state: any) => {
	return {
		creatorIsAuthenticated: state.creator.creatorIsAuthenticated,
		brandIsAuthenticated: state.brand.brandIsAuthenticated
	};
};

// Bringing in actions from redux.
const mapDispatchToProps = (dispatch: any) => {
	return {
		creatorLogout: () => dispatch(creatorActions.creatorLogout()),
		brandLogout: () => dispatch(brandActions.brandLogout())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalNav);
