import CourierSelector from '../courierSelector/CourierSelector';
import KitchenSelector from '../kitchenSelector/KitchenSelector';
import './mapTools.scss';

const MapTools = () => {
    return (
        <div className="map-tools">
            <KitchenSelector />
            <CourierSelector />
        </div>
    )

}

export default MapTools;