import { useState, useCallback, useEffect } from "react";
import M from 'materialize-css';

const userData = 'userData'

function useLogin() {

    const [userToken, setUserToken] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userLogin, setUserLogin] = useState(null);

    const login = useCallback((userToken, isAdmin, userId, userLogin) => {
        setUserToken(userToken);
        setIsAdmin(isAdmin);
        setUserId(userId);
        setUserLogin(userLogin)
        localStorage.setItem(userData, JSON.stringify({ userToken, isAdmin, userId, userLogin }))
    }, []);

    const logout = useCallback(() => {
        setUserToken(null);
        setIsAdmin(false);
        setUserId(null);
        setUserLogin(null)
        localStorage.removeItem(userData);
        M.toast({ html: "👋😢 Logout success" });
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(userData));
        if (data && data.userToken) {
            login(data.userToken, data.isAdmin, data.userId, data.userLogin)
        } else {
            // Auto-login with public user token
            const publicToken = 'public-access-token';
            login(publicToken, false, 'public-user', 'public');
        }
    }, [login])

    return { login, logout, userToken, userId, isAdmin, userLogin };
}

export default useLogin;