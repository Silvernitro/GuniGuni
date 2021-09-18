import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import './index.scss';

interface Props {
	dates: {key: number, text: string, value: number}[];
	placeholder: string;
}

const DateDropdown = (props: Props) => {

	const {dates, placeholder} = props;
	return (
		<Dropdown
			search
			fluid
			className="selectionFilter"
			options={dates}
			placeholder={placeholder}
			scrolling
      />
  	)
}

export default DateDropdown
