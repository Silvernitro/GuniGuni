import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './index.module.scss';
import Nav from '../../components/Nav';
import Button from '../../components/Button';

enum Role {
	Guni,
	Recycler
}

const LoginPage = () => {
	const history = useHistory();
	const [role, setRole] = useState<Role>();
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const loginRef = useRef<HTMLDivElement>(null);

	const handleRoleChange = (role: Role) => {
		setRole(role);
		if (loginRef.current) {
			loginRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<div className={`page-container ${styles.loginPage}`}>
			<Nav />

			<div className={styles.section}>
				<h1 className={styles.header}>I am a...</h1>
				<Button
					color="white"
					type="primary"
					size="medium"
					title="Garang Guni"
					className={role === Role.Guni ? styles.activeButton : styles.button}
					onClick={() => handleRoleChange(Role.Guni)}
				/>
				<Button
					color="white"
					type="primary"
					size="medium"
					title="Home recycler"
					className={
						role === Role.Recycler ? styles.activeButton : styles.button
					}
					onClick={() => handleRoleChange(Role.Recycler)}
				/>
			</div>

			<div className={styles.section} ref={loginRef}>
				<h1 className={styles.header}>
					GUNI <br /> GUNI
				</h1>

				<div className={styles.subHeader}>
					<p>
						Modern recycling <br />
						for modern gunis
					</p>
				</div>

				<input
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
					placeholder="Phone number"
					className={styles.textInput}
				/>

				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
					className={styles.textInput}
				/>

				<Button
					color="white"
					type="primary"
					size="medium"
					title="Login"
					className={styles.button}
					onClick={() =>
						history.push(
							role === Role.Guni ? '/guni/discover' : '/consumer-dashboard'
						)
					}
				/>
			</div>
		</div>
	);
};

export default LoginPage;
