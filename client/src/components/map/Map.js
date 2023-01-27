import { useContext } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { TrackerContext } from '../../context/TrackerContext';
import './map.scss';

import React from 'react';

function Map() {

    const { mapCenter } = useContext(TrackerContext);

    return (
        <MapContainer scrollWheelZoom={true}>
            <ChangeView center={mapCenter} zoom={11} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    );
}

/*компонент для смены вида карты
только через него можно сменить центр карты*/
const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

export default Map;