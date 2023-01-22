import { useState, useCallback, useEffect } from "react";

const userData = 'userData'

function useLogin() {

    const [userToken, setUserToken] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);
    const [userId, setUserId] = useState(null);

    const login = useCallback((userToken, isAdmin, userId) => {
        setUserToken(userToken);
        setIsAdmin(isAdmin);
        setUserId(userId);
        localStorage.setItem(userData, JSON.stringify({ userToken, isAdmin, userId }))
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(userData));
        if (data && data.userToken) {
            login(data.userToken, data.isAdmin, data.userId)
        }
    }, [login])

    return { login, userToken, userId, isAdmin };
}

export default useLogin;