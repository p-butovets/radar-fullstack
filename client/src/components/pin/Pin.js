import { useSelector } from 'react-redux';

import { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import * as ReactDOMServer from 'react-dom/server';
import CustomMarker from '../customMarker/CustomMarker';
import OrderBlock from '../orderBlock/OrderBlock';
import RoutingMachine from '../routingMachine/RoutingMachine';
import { divIcon } from 'leaflet';
import L from "leaflet";
import './pin.scss';

const Pin = (props) => {

    const { showCouriers } = useSelector(state => state.tracker);

    const { organizationId, latitude, longitude, orders, name, phone, baseLocation } = props;

    //видимость маршрута
    const [showRoute, setShowRoute] = useState(false);

    //точки маршрута
    const [waypoints, setWayPoints] = useState([]);

    //список заказов курьера
    const [content, setContent] = useState(null);

    const setPopupContent = () => {
        //Список заказов курьера для модалки
        const ordersList = orders.length > 0 ?
            orders.map(i => {
                const { id, order } = i;
                return (
                    <OrderBlock key={id} orderInfo={order} />
                )
            })
            :
            <p>Вільний</p>
        setContent(ordersList)

        /*Формируем маршрут */
        // 1. из каждого заказа курьера берем координаты адреса доставки => массив
        const points = orders.map(i => {
            const { latitude, longitude } = i.order.deliveryPoint.coordinates;
            return (
                L.latLng(latitude, longitude)
            )
        })

        //2. добавляем первую точку - текущие координаты курьера из пропсов
        points.unshift(L.latLng(latitude, longitude))
        // !!! устанавливаем в стейт
        setWayPoints(points)

        //3. Обновляем waypoints - добавляем последнюю точку base location, если курьер свободен, значит едет на кухню
        if (!orders.length > 0) {
            setWayPoints(waypoints => ([...waypoints, L.latLng(baseLocation[0], baseLocation[1])]))
        }
    }


    /*когда обновился orders */
    useEffect(() => {
        /*ставим новый контент*/
        setPopupContent();
    }, [orders])


    return (
        <>
            {showCouriers === 'all' || organizationId === showCouriers ?
                <Marker
                    icon={divIcon({
                        className: "custom icon",
                        iconAnchor: [13, 37],
                        popupAnchor: [0, -21],
                        html: ReactDOMServer.renderToString(
                            <CustomMarker
                                status={orders.length > 0 ? "onway" : "free"}
                            />)
                    })}
                    position={[latitude, longitude]}>
                    <Popup>
                        <div className='courier__name'>{name}</div>
                        <div className='courier__phone'>{phone}</div>
                        <ul className="sessions">
                            {content}
                        </ul>
                        <div
                            onClick={() => setShowRoute(!showRoute)}
                            className="courier__route-toggler">
                            {showRoute ? 'выкл маршрут' : 'вкл маршрут'}
                        </div>
                    </Popup>
                    {showRoute ?
                        <RoutingMachine waypoints={waypoints} />
                        :
                        null
                    }
                </Marker>
                :
                null
            }
        </>
    )
}

export default Pin;