import React from 'react';
// import { Wrapper } from "@googlemaps/react-wrapper";

/* Styling */
import './index.scss';

const SG = {
    lat: 1.3521,
    lng: 103.8198
}
const Map = () => {
    let map = <div id="map"/>;
    function initMap() {
    // @ts-ignore
      map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: SG.lat, lng: SG.lng },
        zoom: 11,
      });

      const marker = new window.google.maps.Marker({
        position: SG,
        map,
        title: "Hello World!",
      });
      marker.addListener("click", (e: any) => {
        console.log(e.latLng.lat());
      });
      marker.setMap(map);
    }

    React.useEffect(() => {
        initMap();
    }, [])
	return (
        <div>
            {map}
        </div>
	);
};

export default Map;
