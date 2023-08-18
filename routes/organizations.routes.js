const { Router } = require('express');
const router = Router();
const axios = require('axios');
require('dotenv').config();


const getToday = (date) => {
    if (!(date instanceof Date)) {
        throw new Error('Invalid "date" argument. You must pass a date instance')
    }
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

// /api/organizations
router.post('/organizations', async (req, res) => {
    try {
        if (!req.body.token) {
            res.status(403).json({ message: 'token is required' });
        } else {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + req.body.token
                }
            };

            const requestData = {
                organizationIds: [],
                returnAdditionalInfo: true,
                includeDisabled: false
            };

            console.log(`POST /organizations [${new Date().toLocaleTimeString()}]`);

            axios.post(`${process.env.SYRVECLOUD_URL}organizations`, requestData, config)
                .then((response) => {
                    res.status(200).json(response.data);
                })
                .catch(error => {
                    console.log("error organizations", error);
                    res.status(500).json({ message: "Что-то пошло не так" });
                });
        }
    } catch (err) {
        res.status(500).json({ message: "Что-то пошло не так" });
    }
});

// /api/couriers
router.post('/couriers', async (req, res) => {
    const { token, organizationIDs } = req.body;
    try {
        if (!token || !organizationIDs || organizationIDs.length === 0) {
            res.status(403).json({ message: 'token and organizationIDs is required' });
        } else {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            };

            const requestData = { organizationIds: organizationIDs };

            console.log(`POST /couriers [${new Date().toLocaleTimeString()}]`);

            axios.post(`${process.env.SYRVECLOUD_URL}employees/couriers/active_location`, requestData, config)
                .then((response) => {
                    res.status(200).json(response.data);
                })
                .catch(error => {
                    console.log("error courier", error);
                    res.status(500).json({ message: "Что-то пошло не так" });
                });
        }
    } catch (err) {
        res.status(500).json({ message: "Что-то пошло не так" });
    }
});

// /api/orders
router.post('/orders', async (req, res) => {
    const { token, organizationIDs } = req.body;
    const today = getToday(new Date());
    try {
        if (!token || !organizationIDs || organizationIDs.length === 0) {
            res.status(403).json({ message: 'token and organizationIDs is required' });
        } else {
            const requestData = {
                organizationIds: organizationIDs,
                deliveryDateFrom: `${today} 00:00:00.000`,
                deliveryDateTo: `${today} 23:59:00.000`,
                statuses: [
                    "CookingStarted",
                    "CookingCompleted",
                    "OnWay",
                    "Unconfirmed",
                    "WaitCooking",
                    "Closed"
                ]
            };

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            };

            console.log(`POST /orders [${new Date().toLocaleTimeString()}]`);

            axios.post(`${process.env.SYRVECLOUD_URL}deliveries/by_delivery_date_and_status`, requestData, config)
                .then((response) => {
                    res.status(200).json(response.data);
                })
                .catch((error) => {
                    res.status(500).json({ message: "Что-то пошло не так", errorDescription: error });
                    console.log("error orders", error);
                });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Что-то пошло не так", errorDescription: err });
    }
});

module.exports = router;