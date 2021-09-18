import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

/* Styles */
import styles from './index.module.scss';

interface Props {
	color: 'white' | 'green';
	type: 'primary' | 'secondary';
	size: 'small' | 'medium';
	title: string;
	onClick?: () => any;
	to?: string;
	className?: string
}

const CTAButton = (props: Props) => {
	const { color, type, size, title, onClick, to, className } = props;
	const colorClassName = classnames(
		{ [styles.white]: color === 'white' },
		{ [styles.green]: color === 'green' }
	);

	const typeClassName = classnames(
		{ [styles.primary]: type === 'primary' },
		{ [styles.secondary]: type === 'secondary' }
	);

	const sizeClassName = classnames(
		{ [styles.small]: size === 'small' },
		{ [styles.medium]: size === 'medium' }
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
