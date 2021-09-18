import React, { memo } from 'react';
import styles from './index.module.scss';

interface Props {
	label?: string;
	id: string;
	className?: string;
	hasError?: boolean;
	errorMessage?: string;
	type: 'text' | 'email' | 'password' | 'checkbox';
	name: string;
	autoComplete?: 'on' | 'off';
	placeholder?: string;
	value: string;
	textbox?: boolean;
	required?: boolean;
	onChange: (e: any) => void;
	checked?: boolean;
}

const FormInput: React.FC<Props> = (props) => {
	const {
		label,
		className,
		hasError,
		errorMessage,
		id,
		textbox,
		...otherProps
	} = props;

	const formInputClassName = !textbox ? `${styles.formInput}` : `${styles.formInput} ${styles.formInput__textBox}`

	return (
		<div className={className}>
			<>
				<div>{label}</div>
				{!textbox ? <input id={id} {...otherProps} className={formInputClassName}/>
				: <textarea id={id} {...otherProps} className={formInputClassName}/>}
				{hasError && <small>{errorMessage}</small>}
			</>
		</div>
	);
};

export default memo(FormInput);
