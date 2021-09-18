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
    isAccepted?: boolean;
}

const BlockAvailabilityPopup = (props:Props) => {
    const {isOpen, setOpen, units, isAccepted} = props;
    console.log(isAccepted);
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
                        const handleAccept = (requestId: string, timestamp: string) => {
                            const time = timestamp.split("M")[0]
                            const add12 = time[time.length-1] === "P"
                            // eslint-disable-next-line radix
                            const timeNumber = Number.parseInt(time.substring(0, time.length - 1));
                            const timeSubmission = (add12 && timeNumber !== 12) ? timeNumber + 12 : timeNumber;
                            Backend.updateConsumerRequest(requestId, {status: "Accepted", 
                                selectedTimeSlot: [timeSubmission]});
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
                                            onClick={() => handleAccept(unit.requestId, timestamp)}
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
