import React from 'react'
import { Dropdown } from 'semantic-ui-react'

// TODO: This is missing functionality for sub-menu here from SUI core examples.
// The "Publish To Web" item should contain a sub-menu.
interface Props {
	dates: string[];
}

const DateDropdown = (props: Props) => {
	const {dates} = props;

	return (
		<Dropdown text='File'>
			<Dropdown.Menu>
			{dates.map((date) => (
				<Dropdown.Item text={date} />	
			))}
			</Dropdown.Menu>
		</Dropdown>
  	)
}

export default DateDropdown
