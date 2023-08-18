import { useContext } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { TrackerContext } from '../../context/TrackerContext';
import Pin from '../pin/Pin';
import config from '../../data/common.conf.json';
import './map.scss';

import React from 'react';

function Map() {

    const { couriers } = useContext(TrackerContext);

    const pins = [];

    for (let i in couriers) {
        const {
            id,
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
                    id={id}
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
        <MapContainer scrollWheelZoom={true}
            center={config.DEFAULT_MAP_CENTER}
            zoom={11}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {pins}
        </MapContainer>
    );
}


export default Map;