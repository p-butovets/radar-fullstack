import { createContext } from "react";

function noop() { }

export const TrackerContext = createContext({
    syrveToken: null,
    mapCenter: null,
    organizations: null,
    couriers: {},
    orders: [],
    setMapCenter: noop,
    showOrganizationID: null,
    setShowOrganizationID: noop,
    mapZoomLevel: 11,
    setMapZoomLevel: noop,
    updatedCouriers: []
});