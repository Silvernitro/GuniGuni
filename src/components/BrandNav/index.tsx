// Basic Imports
import React from 'react';
// -------------------------------------------------------------------------

// Imports needed for redux
import { connect } from 'react-redux';
import * as brandActions from '../../store/actions/brandActions';
// -------------------------------------------------------------------------

import styles from './index.module.scss';

interface Props {
	history: any;
	// brandAuthVerify: (token:string) => void;
	brandLogout: () => void;
	// brandIsAuthenticated: boolean;
	// brandName: string;
	// brandManagerName: string;
	// brandRegisterAuthError: string;
}

const BrandNav = (props: Props) => {
	const {
		history,
		// brandAuthVerify,
		brandLogout
		// brandIsAuthenticated,
		// brandName,
		// brandManagerName,
		// brandRegisterAuthError,
	} = props;

	// React.useEffect(() => {
	// 	const brandObjectString = localStorage.getItem('brand');
	// 	if (brandObjectString) {
	// 		const brandObject = JSON.parse(brandObjectString)
	// 		brandAuthVerify(brandObject.brandToken);
	// 	} else {
	// 		history.push('/');
	// 	}
	// }, [])

	// React.useEffect(() => {
	// 	if (!brandIsAuthenticated) {
	// 		history.push('/');
	// 	}
	// }, [brandIsAuthenticated])

	const handleLogout = (e: any) => {
		e.preventDefault();
		brandLogout();
		history.push('/');
	};

	const handleChangePage = (newPage: string) => {
		history.push(newPage);
	};

	return (
		<section className={styles.brandNav}>
			<div className={styles.brandNavOptions}>
				<p className={styles.logo}> h. </p>
				<button
					className={`
						${styles.iconBox}
						${history.location.pathname === '/brand' && styles.iconBox_selected}
					`}
					onClick={() => handleChangePage('/brand')}
				>
					<i className={`bx bx-home-alt ${styles.icon}`} />
				</button>

				<button
					className={`
						${styles.iconBox}
						${history.location.pathname.includes('campaigns') && styles.iconBox_selected}
					`}
					onClick={() => handleChangePage('/brand/campaigns')}
				>
					<i className={`icofont icofont-megaphone ${styles.icon}`} />
				</button>

				<button
					className={`
						${styles.iconBox}
						${history.location.pathname.includes('reports') && styles.iconBox_selected}
					`}
					onClick={() => handleChangePage('/brand/reports')}
				>
					<i className={`icofont icofont-presentation ${styles.icon}`} />
				</button>
			</div>
			<button
				className={`
					${styles.iconBox}
				`}
				onClick={handleLogout}
			>
				<i className={`icofont icofont-logout ${styles.icon}`} />
			</button>
		</section>
	);
};

// Bringing in state from redux.
const mapStateToProps = (state: any) => {
	return {
		brandIsAuthenticated: state.brand.brandIsAuthenticated,
		brandName: state.brand.brandName,
		brandManagerName: state.brand.brandManagerName,
		brandRegisterAuthError: state.brand.brandAuthError
	};
};

// Bringing in actions from redux.
const mapDispatchToProps = (dispatch: any) => {
	return {
		brandLogout: () => dispatch(brandActions.brandLogout()),
		brandAuthVerify: (brandToken: string) =>
			dispatch(brandActions.brandAuthVerify(brandToken))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandNav);
