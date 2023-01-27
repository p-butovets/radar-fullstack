import { createContext } from "react";

function noop() { }

export const CommonContext = createContext({
    userToken: null,
    userId: null,
    login: noop,
    logout: noop,
    isAdmin: null,
    userLogin: null,
    isAuthenticated: false,
    refreshUsers: noop,
    deleteUser: noop
})