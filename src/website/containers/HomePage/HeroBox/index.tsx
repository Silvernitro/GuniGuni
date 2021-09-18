import React from 'react';

/* Styles */
import styles from './index.module.scss';

/* Components */
import CTAButton from '../../../../components/CTAButton';

/* Assets */
import Mobile from '../../../../Assets/hashtap_homepage_iphone.png';

const HeroBox = () => {
	return (
		<section className={`${styles.heroBox}`}>
			<img className="mobilePhoto" src={Mobile} alt="mobilePhoto" />

			<div>
				<h1 className={styles.title}>
					Hashtap connects {<br />}
					passionate content creators{<br />}
					to the right brands.
				</h1>

				<p className={styles.desc}> Let&apos;s get started.</p>

				<div className={styles.ctaButtons}>
					<CTAButton
						colorScheme="creator"
						type="primary"
						title="Creator"
						size="medium"
						to="/creator/register"
					/>
					<CTAButton
						to="/brand/register"
						title="Brand"
						colorScheme="brand"
						type="primary"
						size="medium"
					/>
				</div>
			</div>
		</section>
	);
};

export default HeroBox;
