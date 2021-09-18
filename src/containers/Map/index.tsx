import React from 'react';

/* Styling */
import './index.scss';

/* Components */
import BlockAvailabilityPopup from '../../components/BlockAvailabilityPopup';

const SG = {
    lat: 1.3521,
    lng: 103.8198
}

interface Props {
  blocks: any;
  isAccepted?: boolean;
}


const Map = (props:Props) => {
    // eslint-disable-next-line no-var
    const { blocks, isAccepted } = props;
    const [isPopupOpen, setPopupOpen] = React.useState<boolean>(false);
    const [displayedBlockRequests, setDisplayedBlockRequests] = React.useState<any[]>([])
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    const handleClick = (index:number) => {
      setDisplayedBlockRequests(blocks[index] && blocks[index].requests);
      setPopupOpen(true);
    }

    // eslint-disable-next-line vars-on-top
    let map = <div id="map"/>

    function initMap() {
      // @ts-ignore
      map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: SG.lat, lng: SG.lng },
        zoom: 11,
      });
    }

    function addBlocks() {
      // @ts-ignore
      blocks.map((blk:any, index: number) => {
        // @ts-ignore
        const marker = new window.google.maps.Marker({
          position: blk.latLng,
          map,
          title: blk.address,
        });
        marker.addListener("click", () => {
          handleClick(index);
        });
        marker.setMap(map);
        return 0;
      })
    }

    React.useEffect(() => {
        initMap();
        addBlocks();
    }, [])

	return (
        <div>
            {map}
            <BlockAvailabilityPopup units={displayedBlockRequests} isOpen={isPopupOpen} 
            setOpen = {setPopupOpen} isAccepted={isAccepted}/>
        </div>
	);
};

export default Map;
