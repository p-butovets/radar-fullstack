import { createContext } from "react";

function noop() { }

export const CommonContext = createContext({
    userToken: null,
    userId: null,
    login: noop,
    isAmin: null,
    isAuthenticated: false
})