// Basic Imports
import React from 'react';
import { Table } from 'rsuite';

import { SMALL_WIDTH, CENTER_ALIGN } from '../../consts/table';
import './tableReset.scss'

const CreatorTable = () => {
	const creators = [
		{
			name: 'Xupeng',
			followerCount: '100',
			status: 'active',
			feedback: 'Feedback',
			files: 'Submission V1.0'
		},
		{
			name: 'Xupeng',
			followerCount: '100',
			status: 'active',
			feedback: 'Feedback',
			files: 'Submission V1.0'
		},
	];

	return (
		<Table
			height={400}
			id="creatorTable"
			data={creators}

		>
			<Table.Column width={SMALL_WIDTH} {...CENTER_ALIGN} fixed>
				<Table.HeaderCell>Name</Table.HeaderCell>
				<Table.Cell dataKey="name" />
			</Table.Column>

			<Table.Column width={SMALL_WIDTH} {...CENTER_ALIGN} fixed>
				<Table.HeaderCell>Follower Count</Table.HeaderCell>
				<Table.Cell dataKey="followerCount" />
			</Table.Column>

			<Table.Column width={SMALL_WIDTH} {...CENTER_ALIGN} fixed>
				<Table.HeaderCell>Status</Table.HeaderCell>
				<Table.Cell dataKey="status" />
			</Table.Column>

			<Table.Column width={SMALL_WIDTH} {...CENTER_ALIGN} fixed>
				<Table.HeaderCell>Feedback</Table.HeaderCell>
				<Table.Cell dataKey="feedback" />
			</Table.Column>

			<Table.Column width={SMALL_WIDTH} {...CENTER_ALIGN} fixed>
				<Table.HeaderCell>Files</Table.HeaderCell>
				<Table.Cell dataKey="files" />
			</Table.Column>
		</Table>
	);
};

export default CreatorTable;
