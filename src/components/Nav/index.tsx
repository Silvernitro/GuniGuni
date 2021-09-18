import React from 'react';
import { Icon, Sidebar } from 'semantic-ui-react';
import { Role } from '../../pages/LoginPage';

/* Styles */
import styles from './index.module.scss';
import NavIcon from '../../Assets/nav.svg';

const Nav = () => {
	const [visible, setVisible] = React.useState(false);
	const guniOptions: any[] = [
		{ title: 'Home', to: '/', icon: 'home' },
		{ title: 'Explore', to: '/guni/discover', icon: 'search' },
		{ title: 'Accepted', to: '/guni/accepted', icon: 'tags' }
	];

	const loggedInRole = localStorage.getItem('role');
	const options = loggedInRole === Role.Recycler ? [] : guniOptions;

	return (
		<>
			<button onClick={() => setVisible(true)} className={styles.navButton}>
				<img src={NavIcon} className={styles.navIcon} alt="icon" />{' '}
			</button>
			<p className={styles.guniguni}> GUNI GUNI</p>
			<Sidebar
				className={styles.nav}
				animation="overlay"
				icon="labeled"
				onHide={() => setVisible(false)}
				visible={visible}
				width="thin"
			>
				<div className={styles.nav}>
					{options.map((option) => {
						return (
							<a
								className={styles.navOption}
								href={option.to}
								key={option.title}
							>
								<Icon name={option.icon} className={styles.icon} />
								<p className={styles.navText}> {option.title} </p>
							</a>
						);
					})}
					{!!loggedInRole && (
						<a
							className={styles.navOption}
							href={'/'}
							onClick={() => localStorage.removeItem('role')}
						>
							<Icon name="log out" className={styles.icon} />
							<p className={styles.navText}> Logout </p>
						</a>
					)}
				</div>
			</Sidebar>
		</>
	);
};

export default Nav;
