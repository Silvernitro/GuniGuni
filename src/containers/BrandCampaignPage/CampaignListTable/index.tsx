// Basic Imports
import React from 'react';
import { Table } from 'rsuite';
import { SMALL_WIDTH, CENTER_ALIGN } from '../../../consts/table';
import ManageCreatorsCell from '../../../components/TableCells/ManageCreatorsCell';
import 'rsuite/dist/styles/rsuite-default.css';

import styles from './index.module.scss';
import './tableReset.scss';

interface Props {
	campaigns: any[];
}
const CampaignList = (props: Props) => {
	const { campaigns } = props;
	return (
		<section className={styles.campaignTableWrapper}>
			<Table
				height={400}
				id="campaignTable"
				data={campaigns}
				hover = {false}
				onRowClick={(data) => {
					console.log(data);
				}}
			>
				<Table.Column width={SMALL_WIDTH} fixed {...CENTER_ALIGN}>
					<Table.HeaderCell>Name</Table.HeaderCell>
					<Table.Cell dataKey="campaignName" />
				</Table.Column>

				<Table.Column width={SMALL_WIDTH} {...CENTER_ALIGN}>
					<Table.HeaderCell>Status</Table.HeaderCell>
					<Table.Cell dataKey="status" />
				</Table.Column>
				<Table.Column width={SMALL_WIDTH} {...CENTER_ALIGN}>
					<Table.HeaderCell>Start Date</Table.HeaderCell>
					<Table.Cell dataKey="startDate" />
				</Table.Column>
				<Table.Column width={SMALL_WIDTH} {...CENTER_ALIGN}>
					<Table.HeaderCell>End Date</Table.HeaderCell>
					<Table.Cell dataKey="endDate" />
				</Table.Column>
				<Table.Column width={SMALL_WIDTH} {...CENTER_ALIGN}>
					<Table.HeaderCell>End Date</Table.HeaderCell>
					<Table.Cell dataKey="startDate"/>
				</Table.Column>
				<Table.Column width={SMALL_WIDTH} {...CENTER_ALIGN}>
					<Table.HeaderCell>End Date</Table.HeaderCell>
					<ManageCreatorsCell 
						dataKey="creators" 
					/>
				</Table.Column>
			</Table>
		</section>
	);
};

export default CampaignList;
