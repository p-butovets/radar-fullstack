import { useState, useCallback, useEffect } from "react";
import SyrveCloudService from "../services/syrveCloudService";
import M from 'materialize-css';

const useSyrve = () => {

    /* экземпляр сервиса SyrveCloud*/
    const syrveCloud = new SyrveCloudService();

    /*surveCloud token */
    const [syrveToken, setSyrveToken] = useState(null);

    // /*храним organizations data */
    const [organizations, setOrganizations] = useState(null)

    /* закончилась ли загрузка данных */
    const [loading, setLoading] = useState(true);


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
        setLoading(false);
    };

    const refreshOrganizations = useCallback((syrveToken) => {
        syrveCloud.organizations(syrveToken)
            .then((result) => result.json())
            .then((data) => onOrganizationsRefreshed(data.organizations))
            .catch(error => handleError(error));
    }, []);


    /***** WORKFLOW HERE *****/
    /*1. on first render*/
    useEffect(() => {
        refreshToken();
        const interval = setInterval(() => refreshToken(), 20000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    /*2. when syrveToken upd */
    useEffect(() => {
        if (syrveToken) {
            refreshOrganizations(syrveToken);
        }
    }, [syrveToken])


    /***** RETURN HERE *****/
    return { syrveToken, organizations, loading }
}

export default useSyrve;