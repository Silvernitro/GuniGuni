import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

/* Styles */
import styles from './index.module.scss';

interface Props {
	colorScheme: 'brand' | 'creator';
	type: 'primary' | 'secondary';
	size: 'small' | 'medium' | 'big';
	title: string;
	onClick?: () => any;
	to?: string;
	className?: string
}

const CTAButton = (props: Props) => {
	const { colorScheme, type, size, title, onClick, to, className } = props;
	const colorClassName = classnames(
		{ [styles.brand]: colorScheme === 'brand' },
		{ [styles.creator]: colorScheme === 'creator' }
	);

	const typeClassName = classnames(
		{ [styles.primary]: type === 'primary' },
		{ [styles.secondary]: type === 'secondary' }
	);

	const sizeClassName = classnames(
		{ [styles.small]: size === 'small' },
		{ [styles.medium]: size === 'medium' },
		{ [styles.big]: size === 'big' }
	);

	if (to) {
		return (
			<Link
			to={to}>
				<button
				className={`
					${styles.ctaButton}
					${colorClassName}
					${typeClassName} 
					${sizeClassName}
					${className}
				`}>
					{title}
				</button>
			</Link>
		);
	} else {
		return (
			<button
				onClick={onClick}
				className={`
					${styles.ctaButton}
					${colorClassName}
					${typeClassName} 
					${sizeClassName}
					${className}
				`}
			>
				{title}
			</button>
		);
	}
};

export default CTAButton;
