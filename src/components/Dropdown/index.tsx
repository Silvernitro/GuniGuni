import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import './index.scss';

interface Props {
	dates: {key: number, text: string, value: number}[];
	placeholder: string;
	current: string;
	onChange: any;
}

const DateDropdown = (props: Props) => {

	const {dates, placeholder, current, onChange} = props;
	return (
		<Dropdown
			search
			fluid
			className="selectionFilter"
			options={dates}
			placeholder={placeholder}
			scrolling
			value={current}
			onChange={(e:any, data:any) => onChange(e, data)}
      />
  	)
}

export default DateDropdown
