import { useState, useEffect, useContext } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { TrackerContext } from '../../context/TrackerContext';
import Pin from '../pin/Pin';
import './map.scss';

import React from 'react';

function Map() {

    const { mapCenter, couriers } = useContext(TrackerContext);

    const pins = [];

    for (let i in couriers) {
        const {
            organizationId,
            latitude,
            longitude,
            orders,
            name,
            phone,
            baseLocation } = couriers[i];

        if (latitude && longitude) {
            pins.push(
                <Pin
                    key={i}
                    organizationId={organizationId}
                    latitude={latitude}
                    longitude={longitude}
                    orders={orders}
                    name={name}
                    phone={phone}
                    baseLocation={baseLocation}
                />)
        }
    }

    return (
        <MapContainer scrollWheelZoom={true} center={mapCenter} zoom={11}>
            {/* <ChangeView center={mapCenter} zoom={11} /> */}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* <MapZoomer /> */}
            {pins}
        </MapContainer>
    );
}



/*trying to add mapSenter changer */
/*компонент для смены вида карты
только через него можно сменить центр карты*/
const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

function MapZoomer() {
    const { mapZoomLevel, setMapZoomLevel } = useContext(TrackerContext);

    const mapEvents = useMapEvents({
        zoomend: () => {
            setMapZoomLevel(mapEvents.getZoom());
        },
    });
    console.log(mapZoomLevel);
    return null
}

export default Map;