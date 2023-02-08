import { useState, useCallback, useEffect } from "react";
import SyrveCloudService from "../services/syrveCloudService";
import M from 'materialize-css';
import config from '../data/common.conf.json';

const useSyrve = () => {

    /* экземпляр сервиса SyrveCloud*/
    const syrveCloud = new SyrveCloudService();

    /*surveCloud token */
    const [syrveToken, setSyrveToken] = useState(null);

    /*храним organizations data */
    const [organizations, setOrganizations] = useState(null);

    /* актуальные заказы */
    const [orders, setOrders] = useState(null);

    /* храним объекты курьеров */
    const [couriers, setCouriers] = useState({});


    const [couriersData, setCouriersData] = useState(null);

    /* закончилась ли загрузка данных */
    const [loading, setLoading] = useState(true);

    /* закончилась ли обновление курьеров */
    /*это костыль, который заставляет обновиться карте сразу после превого обновления курьеров */
    const [upd, setUpd] = useState(false);

    /*tick запускаем обновление тика при первом рендере
    стави его в зависисмоть для обновления orders*/
    const [tick, setTick] = useState(true);


    /***** METHODS HERE *****/
    /*обрабока ошибок */
    const handleError = (error) => {
        switch (error.name) {
            case 'SyntaxError':
                M.toast({ html: `${error.message}` });
                break;
            default:
                M.toast({ html: `Unknown error. Please, reload app` });
        }
    }

    /*work with token */
    const onTokenRefreshed = (token) => {
        setSyrveToken(token);
    };

    const refreshToken = useCallback(() => {
        syrveCloud.authorize()
            .then((result) => result.json())
            .then((data) => onTokenRefreshed(data.token))
            .catch(error => handleError(error));
    }, []);


    /*work with organisation list*/
    const onOrganizationsRefreshed = (data) => {
        setOrganizations(data);
    };

    const refreshOrganizations = useCallback((syrveToken) => {
        syrveCloud.organizations(syrveToken)
            .then((result) => result.json())
            .then((data) => onOrganizationsRefreshed(data.organizations))
            .catch(error => handleError(error));
    }, []);

    const collectOrgIds = (data) => {
        const ids = [];
        for (let i in data) { ids.push(data[i].id) }
        return ids;
    }


    /*work with couriers */

    const refreshCouriersData = (token, ids) => {
        syrveCloud.couriers(token, ids)
            .then((result) => result.json())
            .then((data) => onCouriresDataRefreshed(data.activeCourierLocations))
            .catch(error => handleError(error));
    }

    const onCouriresDataRefreshed = (data) => {
        setCouriersData(data);
        setLoading(false);
    }

    /*сбрасывает массивы заказов у курьеров */
    const clearOrders = (couriers) => {
        for (let i in couriers) {
            couriers[i].orders = []
        }
    }

    /*бейс локейшн для курьера*/
    const getBaseLocation = (organizationId, organizations) => {
        for (let i in organizations) {
            if (organizations[i].id === organizationId) {
                return [organizations[i].latitude, organizations[i].longitude]
            }
        }
    }

    /*отбирает из всех заказов заказы этого курьера */
    /*только если не статус closed */
    const sortCourierOrders = (courierId, orders) => {
        const ordersArray = [];
        for (let i in orders) {
            if (orders[i].order.status !== 'Closed') {
                const courierInfo = orders[i].order.courierInfo;
                if (courierInfo) {
                    const { id } = courierInfo.courier;
                    /**и это тот самый курьер */
                    if (id === courierId) {
                        ordersArray.push(orders[i]);
                    }
                }
            }
        }
        return ordersArray;
    }

    const getCourierLocation = (id, data) => {
        const location = {
            latitude: null,
            longitude: null
        }
        for (let i in data) {
            const { items } = data[i];
            for (let item of items) {
                const { courierId, lastActiveLatitude, lastActiveLongitude } = item;
                if (courierId === id) {
                    location.latitude = lastActiveLatitude;
                    location.longitude = lastActiveLongitude;
                }
            }
        }
        return location;
    }

    /* Обновляет объект айдишниками курьеров у которых уже есть заказы*/
    const updateCouriersOnDuty = (orders, orgs, couriersData) => {
        for (let i in orders) {
            const { organizationId, order } = orders[i];
            /*если доставка курьером и у заказа назначен курьер */
            if (order.orderType.id === config.ORDER_TYPE_ID && order.courierInfo) {
                const { id, name, phone } = order.courierInfo.courier;
                /*ищем координаты курьера */
                const { latitude, longitude } = getCourierLocation(id, couriersData);
                /* обновляем обьект */
                couriers[id] = {
                    id,
                    organizationId,
                    orders: sortCourierOrders(id, orders),
                    latitude,
                    longitude,
                    name: name,
                    phone: phone,
                    baseLocation: getBaseLocation(organizationId, orgs)
                };
            }
        }
        setUpd(upd => !upd)
    }

    /* work with orders */
    const refreshOrders = (token, ids) => {
        syrveCloud.orders(token, ids)
            .then((result) => result.json())
            .then((data) => {
                data.errorDescription ?
                    M.toast({ html: `<i class="material-icons white">portable_wifi_off</i> Lost connection with iiko/Syrve. Wait` })
                    :
                    onOrdersRefreshed(data.ordersByOrganizations)
            })
            .catch(error => handleError(error));
    }

    /** transform orders */
    const transformOrders = (data) => {
        const ordersList = [];
        for (let i in data) {
            const { orders } = data[i];
            for (let j in orders) {
                ordersList.push(orders[j]);
            }
        }
        return ordersList;
    }

    const onOrdersRefreshed = (data) => {
        const ordersList = transformOrders(data);
        setOrders(ordersList);
    }



    /***** WORKFLOW HERE *****/
    /*1. on first render*/
    useEffect(() => {
        refreshToken();
        const interval = setInterval(() => {
            setTick(tick => !tick)
        }, 20000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (syrveToken) {
            refreshOrganizations(syrveToken);
        }
    }, [syrveToken]);

    useEffect(() => {
        if (syrveToken && organizations) {
            const ids = collectOrgIds(organizations);
            refreshOrders(syrveToken, ids);
        }
    }, [organizations, tick]);


    useEffect(() => {
        if (syrveToken && organizations) {
            const ids = collectOrgIds(organizations);
            refreshCouriersData(syrveToken, ids)
        }
    }, [orders]);

    useEffect(() => {
        clearOrders(couriers);
        updateCouriersOnDuty(orders, organizations, couriersData);
    }, [couriersData])


    /***** RETURN HERE *****/
    return { syrveToken, organizations, orders, couriers, loading }
}

export default useSyrve;