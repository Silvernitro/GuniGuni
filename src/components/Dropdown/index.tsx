import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import './index.scss';

interface Props {
	dates: {key: Number, text: string, value: Number}[];
}

const DateDropdown = (props: Props) => {

	const {dates} = props;
	console.log(dates);
	const options = [
		{key: 1, text: '23 AUG', value: 1},
		{key: 2, text: '24 Aug', value: 2},
		{key: 3, text: '25 Aug', value: 3},
	]
	return (
		<Dropdown
			search
			fluid
			className="selectionFilter"
			options={options}
			placeholder='23 AUG'
			scrolling
      />
  	)
}

export default DateDropdown
