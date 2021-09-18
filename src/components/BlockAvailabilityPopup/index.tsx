import React from 'react';
import {
    Sidebar,
  } from 'semantic-ui-react'

/* Styles */
import './index.scss';
import Button from '../Button';

interface Props {
    setOpen: (status: boolean) => void;
    isOpen: boolean;
}

const units = [
    {unitNumber: "#10-123", timeStamps : ['9AM-12PM', '12PM-3PM', '3PM-6PM']},
    {unitNumber: "#10-123", timeStamps : ['9AM-12PM', '12PM-3PM', '3PM-6PM']},
    {unitNumber: "#10-123", timeStamps : ['9AM-12PM', '12PM-3PM', '3PM-6PM']},
    {unitNumber: "#10-123", timeStamps : ['9AM-12PM', '12PM-3PM', '3PM-6PM']},
    {unitNumber: "#10-123", timeStamps : ['9AM-12PM', '12PM-3PM', '3PM-6PM']},
    {unitNumber: "#10-123", timeStamps : ['9AM-12PM', '12PM-3PM', '3PM-6PM']},
    {unitNumber: "#10-123", timeStamps : ['9AM-12PM', '12PM-3PM', '3PM-6PM']},
    {unitNumber: "#10-123", timeStamps : ['9AM-12PM', '12PM-3PM', '3PM-6PM']},
    {unitNumber: "#10-123", timeStamps : ['9AM-12PM', '12PM-3PM', '3PM-6PM']},
]

const BlockAvailabilityPopup = (props:Props) => {
    const {isOpen, setOpen} = props;
		return (
        <>
            <Sidebar
              direction='bottom'
              animation='overlay'
              icon='labeled'
              inverted
              onHide={() => setOpen(false)}
              vertical
              visible={isOpen}
              width='thin'
            >
                <div className={'blockAvailabilityPopup'}> 
                    <p className="blockNumber"> BLK 530001 </p>
                    {units.map((unit) => {
                        return (
                        <div className="unit">
                            <p className="unitNumber"> {unit.unitNumber}: Electronics</p>
                            <div className="timestamps">
                                {unit.timeStamps.map((timestamp) => {
                                    const [isAccepting, setAccepting] = React.useState<boolean>(false);
                                    return (
                                        !isAccepting ?
                                        <Button
                                            type='secondary' 
                                            color='green' 
                                            size='small' 
                                            title={timestamp}
                                            onClick={() => setAccepting(true)}
                                        />
                                        :
                                        <Button 
                                        className="animate__animated animate__zoomIn animate__faster"
                                        type='primary' 
                                        color='green' 
                                        size='small' 
                                        title="Accept"
                                        onClick={() => setAccepting(false)}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                        );
                    })}
                </div>
            </Sidebar>
        </>

		);
};

export default BlockAvailabilityPopup;
