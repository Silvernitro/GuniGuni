import React from 'react';
import {
    Sidebar,
  } from 'semantic-ui-react'

/* Styles */
import './index.scss';
import Button from '../Button';
import Backend from '../../backend/firebase';

interface Props {
    setOpen: (status: boolean) => void;
    isOpen: boolean;
    units: any[];
}

const BlockAvailabilityPopup = (props:Props) => {
    const {isOpen, setOpen, units} = props;

	return (
        <>
            <Sidebar
              direction='bottom'
              animation='overlay'
              icon='labeled'
              onHide={() => setOpen(false)}
              visible={isOpen}
              width='thin'
            >
                <div className={'blockAvailabilityPopup'}> 
                    <p className="blockNumber"> BLK 530001 </p>
                    {units.map((unit) => {
                        const [hide, setHide] = React.useState(false);
                        const handleAccept = (requestId: string) => {
                            Backend.updateConsumerRequest(requestId, {status: "Accepted"});
                            setHide(true);
                        }
                        return (
                        <div className={`${hide ? 'hide' : ''} unit`} key={unit.unitNumber}>
                            <p className="unitNumber"> {unit.unitNumber}: Electronics</p>
                            <div className="timestamps">
                                {unit.timeSlots.map((timestamp: any) => {
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
                                            onClick={() => handleAccept(unit.requestId)}
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
