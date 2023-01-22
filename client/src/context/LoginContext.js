import { createContext } from "react";

function noop() { }

export const LoginContext = createContext({
    userToken: null,
    userId: null,
    login: noop,
    isAmin: null,
    isAuthenticated: false
})