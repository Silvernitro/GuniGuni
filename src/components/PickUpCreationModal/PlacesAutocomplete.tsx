import React from 'react';
import usePlacesAutocomplete, {
	getLatLng,
	getGeocode
} from 'use-places-autocomplete'; // getLatLng // getGeocode,
import styles from './index.module.scss';

interface IPlacesAutocomplete {
	setAddress(address: string): void;
	setLatLng(latLng: { lat: number; lng: number }): void;
	setLocationId(locationId: string): void;
}

const PlacesAutocomplete = ({
	setAddress,
	setLatLng,
	setLocationId
}: IPlacesAutocomplete) => {
	const {
		ready,
		value,
		suggestions: { status, data },
		setValue,
		clearSuggestions
	} = usePlacesAutocomplete({
		requestOptions: {
			// center of singapore
			location: {
				lat: () => 1.3521,
				lng: () => 103.8198
			},
			// radius in metres
			radius: 20 * 1000
		},
		debounce: 300
	});

	const handleInput = (e: any) => {
		setValue(e.target.value);
	};

	const handleSelect = (suggestion: any) => () => {
		const {
			description,
			place_id: placeId,
			structured_formatting: {
				main_text: mainText,
				secondary_text: secondaryText
			}
		} = suggestion;

		clearSuggestions();
		setValue(description, false);
		setAddress(`${mainText}, ${secondaryText}`);
		setLocationId(placeId);

		getGeocode({ address: suggestion.description })
			.then((results) => getLatLng(results[0]))
			.then(({ lat, lng }) => {
				setLatLng({ lat, lng });
			})
			.catch((error) => {
				console.log('Error: ', error);
			});
	};

	const renderSuggestions = () =>
		data.map((suggestion) => {
			const {
				place_id: placeId,
				structured_formatting: {
					main_text: mainText,
					secondary_text: secondaryText
				}
			} = suggestion;
			const address = `${mainText}, ${secondaryText}`;

			return (
				<button
					className={styles.locationResult}
					key={placeId}
					onClick={handleSelect(suggestion)}
				>
					<p>{address}</p>
				</button>
			);
		});

	return (
		<div>
			<input
				value={value}
				onChange={handleInput}
				disabled={!ready}
				placeholder="Search here"
				className={styles.textInput}
			/>
			{status === 'OK' && (
				<ul className={styles.locationResults}>{renderSuggestions()}</ul>
			)}
		</div>
	);
};

export default PlacesAutocomplete;
