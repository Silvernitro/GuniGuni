import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';

import styles from './index.module.scss';

interface IExpandableCardProps {
	header: React.ReactNode; // shown in the top section of the card
	body: React.ReactNode; // shown in the expanded bottom section of the card
}

const ExpandableCard = ({ header, body }: IExpandableCardProps) => {
	const [expanded, setExpanded] = useState(false);
	return (
		<Card classes={{ root: styles.cardRoot }} elevation={0}>
			<CardContent classes={{ root: styles.cardHeader }}>
				{header}
				<IconButton onClick={() => setExpanded(!expanded)}>
					<ArrowDropDownCircleOutlinedIcon style={{ fontSize: '3.5rem' }} />
				</IconButton>
			</CardContent>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent classes={{ root: styles.cardBody }}>{body}</CardContent>
			</Collapse>
		</Card>
	);
};

export default ExpandableCard;
