import React from 'react';
import { connect } from 'react-redux';

/* Actions */
import * as creatorActions from '../../../store/actions/creatorActions';
import * as brandActions from '../../../store/actions/brandActions';

import styles from './index.module.scss';
import GlobalNav from '../../components/GlobalNav';
import HeroBox from '../../containers/HomePage/HeroBox';

interface Props {
	brandAuthVerify: (token: string) => void;
	creatorAuthVerify: (token: string) => void;
	creatorIsAuthenticated: boolean;
	brandIsAuthenticated: boolean;
	history: any;
}

const HomePage = (props: Props) => {
	const {
		brandAuthVerify,
		creatorAuthVerify,
		creatorIsAuthenticated,
		brandIsAuthenticated,
		history
	} = props;

	React.useEffect(() => {
		// This is to check the cache, and see if the user is logged in already.
		const brandCachedString = localStorage.getItem('brand');
		const creatorCachedString = localStorage.getItem('creator');
		if (brandCachedString) {
			const brandObject = JSON.parse(brandCachedString);
			brandAuthVerify(brandObject.brandToken);
		} else if (creatorCachedString) {
			const creatorObject = JSON.parse(creatorCachedString);
			creatorAuthVerify(creatorObject.brandToken);
		}
	});

	React.useEffect(() => {
		// If user is already authenticated, redirect to dashboard.
		if (creatorIsAuthenticated) {
			history.push('/creator');
		} else if (brandIsAuthenticated) {
			history.push('/brand');
		}
	}, [creatorIsAuthenticated, brandIsAuthenticated]);

	return (
		<div className={styles.homePage}>
			<GlobalNav history={history} />
			<HeroBox />
		</div>
	);
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
		brandAuthVerify: (brandToken: string) =>
			dispatch(brandActions.brandAuthVerify(brandToken)),
		creatorAuthVerify: (creatorToken: string) =>
			dispatch(creatorActions.creatorAuthVerify(creatorToken))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
