import { createContext } from "react";

export const TrackerContext = createContext({
    syrveToken: null,
    organizations: null,
    couriers: {},
    orders: [],
    updatedCouriers: []
});