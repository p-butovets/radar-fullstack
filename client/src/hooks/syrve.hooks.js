import { useState, useCallback, useEffect } from "react";
import SyrveCloudService from "../services/syrveCloudService";
import M from 'materialize-css';

const useSyrve = () => {

    /* экземпляр сервиса SyrveCloud*/
    const syrveCloud = new SyrveCloudService();

    /*surveCloud token */
    const [syrveToken, setSyrveToken] = useState(null);

    /*храним organizations data */
    const [organizations, setOrganizations] = useState(null);


    /***** METHODS HERE *****/
    /*обрабока ошибок */
    const handleError = (error, source) => {
        switch (error.name) {
            case 'SyntaxError':
                M.toast({ html: `Please, reload app ${error.message}` });
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

    /***** WORKFLOW HERE *****/
    /*1. on first render*/
    useEffect(() => {
        refreshToken();
    }, []);

    /*2. on syrveToken updated*/
    useEffect(() => {
        if (syrveToken) {
            refreshOrganizations(syrveToken);
        }
    }, [syrveToken]);

    return { syrveToken, organizations };

}

export default useSyrve;