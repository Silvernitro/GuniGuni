import React from 'react';

/* Styling */
import './index.scss';

/* Components */
import BlockAvailabilityPopup from '../../components/BlockAvailabilityPopup';

const SG = {
	lat: 1.3521,
	lng: 103.8198
};
const Map = () => {
	const [isPopupOpen, setPopupOpen] = React.useState<boolean>(false);
	let map = <div id="map" />;

	function initMap() {
		// @ts-ignore
		map = new window.google.maps.Map(document.getElementById('map'), {
			center: { lat: SG.lat, lng: SG.lng },
			zoom: 11
		});

		// @ts-ignore
		const marker = new window.google.maps.Marker({
			position: SG,
			map,
			title: 'Hello World!'
		});
		marker.addListener('click', () => {
			setPopupOpen(true);
		});
		marker.setMap(map);
	}

	React.useEffect(() => {
		initMap();
	}, []);
	return (
		<div>
			{map}
			<BlockAvailabilityPopup isOpen={isPopupOpen} setOpen={setPopupOpen} />
		</div>
	);
};

export default Map;
