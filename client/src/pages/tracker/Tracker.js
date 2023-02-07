import { useState } from 'react';
import { TrackerContext } from '../../context/TrackerContext';
import useSyrve from '../../hooks/syrve.hooks';

import Spinner from '../../components/spinner/Spinner';
import Map from '../../components/map/Map';
import ButtonGroup from '../../components/buttonGroup/ButtonGroup';

import config from '../../data/common.conf.json';
import './tracker.scss';

const Tracker = () => {

    const { syrveToken, organizations, orders, couriers, loading } = useSyrve();

    /*по дефолту центр карты по Киеву */
    const [mapCenter, setMapCenter] = useState(config.DEFAULT_MAP_CENTER);

    /*дефолтный зум карты*/
    const [mapZoomLevel, setMapZoomLevel] = useState(11);

    /*отображать курьеров этой организации */
    const [showOrganizationID, setShowOrganizationID] = useState(null);


    return (
        <TrackerContext.Provider value={{
            syrveToken,
            mapCenter,
            setMapCenter,
            mapZoomLevel,
            setMapZoomLevel,
            organizations,
            couriers,
            orders,
            showOrganizationID,
            setShowOrganizationID,
        }}>
            {loading ? <Spinner /> : <View />}
        </TrackerContext.Provider>
    )
};

const View = () => {

    return (
        <>
            <ButtonGroup />
            <Map />
        </>
    )
}

export default Tracker;
