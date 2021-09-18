import React from 'react';
import { Table } from 'rsuite';
import Modal from 'react-modal';

/* Styling */
import styles from './index.module.scss';
import CreatorTable from '../../CreatorTable';

interface Props {
	rowData?: any;
	dataKey: string;
}

const ManageCreatorsCell = (props: Props) => {
	const {rowData, dataKey} = props;
	console.log(rowData);
	const [isOpen, setOpen] = React.useState(false);
	React.useEffect(() => {
		Modal.setAppElement('#manageCreators');
	}, []);

	const handleOpen = () => {
		setOpen(true);
	};
	return (
		<Table.Cell {...props}>
			<div className={`${styles.manageCreatorsCell}`}>
				<div id="manageCreators" />
				<Modal
					shouldCloseOnEsc
					isOpen={isOpen}
					onRequestClose={() => setOpen(false)}
					className="x"
					overlayClassName={styles.overlay}
					shouldCloseOnOverlayClick
				>
					<div
						id="manageCreators"
						className={`animate__animated 
						animate__slideInRight animate__faster ${styles.popup}`}
					>
						<h3>{rowData.campaignName} &gt; Creators </h3>
						<CreatorTable />
					</div>
				</Modal>
				<button onClick={handleOpen}>
					{rowData[dataKey]}
				</button>
			</div>
		</Table.Cell>
	);
};

export default ManageCreatorsCell;
