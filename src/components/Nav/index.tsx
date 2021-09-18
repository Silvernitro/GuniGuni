import React from 'react';
import { Icon, Sidebar } from 'semantic-ui-react';

/* Styles */
import styles from './index.module.scss';
import NavIcon from '../../Assets/nav.svg';

const Nav = () => {
	const [visible, setVisible] = React.useState(false);
	const options: any[] = [
		{ title: 'Home', to: '/', icon: 'home' },
		{ title: 'Login', to: '/login', icon: 'user' },
		{ title: 'Explore', to: '/guni/discover', icon: 'search' },
		{ title: 'Accepted', to: '/guni/accepted', icon: 'tags' }
	];
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
				inverted
				onHide={() => setVisible(false)}
				vertical
				visible={visible}
				width="thin"
			>
				<div className={styles.nav}>
					{options.map((option) => {
						return (
							<a className={styles.navOption} href={option.to}>
								<Icon name={option.icon} className={styles.icon} />
								<p className={styles.navText}> {option.title} </p>
							</a>
						);
					})}
				</div>
			</Sidebar>
		</>
	);
};

export default Nav;
