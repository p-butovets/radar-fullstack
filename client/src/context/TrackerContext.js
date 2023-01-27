import { createContext } from "react";

function noop() { }

export const TrackerContext = createContext({
    syrveToken: null,
    mapCenter: null,
    organizations: null,
    setMapCenter: noop,
    showOrganizationID: null,
    setShowOrganizationID: noop
});