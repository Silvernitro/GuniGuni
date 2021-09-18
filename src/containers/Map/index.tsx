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
  blocks: any
}
const Map = (props:Props) => {
    const { blocks } = props;
    const [isPopupOpen, setPopupOpen] = React.useState<boolean>(false);
    const [displayedBlockRequests, setDisplayedBlockRequests] = React.useState<any[]>([])
    const handleClick = (index:number) => {
      setDisplayedBlockRequests(blocks[index].requests);
      setPopupOpen(true);
    }

    let map = <div id="map"/>;
    function initMap() {
      // @ts-ignore
      map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: SG.lat, lng: SG.lng },
        zoom: 11,
      });

      blocks.map((blk:any, index: number) => {
        console.log("lel");
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
    }, [])

	return (
        <div>
            {map}
            <BlockAvailabilityPopup units={displayedBlockRequests} isOpen={isPopupOpen} setOpen = {setPopupOpen}/>
        </div>
	);
};

export default Map;
