import { TrackerContext } from '../../context/TrackerContext';
import { Helmet } from "react-helmet";
import useSyrve from '../../hooks/syrve.hooks';

import Spinner from '../../components/spinner/Spinner';
import Map from '../../components/map/Map';
import MapTools from '../../components/mapTools/MapTools';

import './tracker.scss';

const Tracker = () => {

    const { syrveToken, organizations, orders, couriers, loading } = useSyrve();

    return (
        <TrackerContext.Provider value={{
            syrveToken,
            organizations,
            couriers,
            orders
        }}>
            {loading ? <Spinner /> : <View />}
        </TrackerContext.Provider>
    )
};

const View = () => {

    return (
        <>
            <Helmet>
                <meta name="description" content="Tracker | Logistic Management App" />
                <title>Tracker | MisoMove</title>
            </Helmet>
            <MapTools />
            <Map />
        </>
    )
}

export default Tracker;
