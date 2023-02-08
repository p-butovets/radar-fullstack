const { Router } = require('express');
const router = Router();
require('dotenv').config();

let today = new Date().toISOString().slice(0, 10);

// /api/organizations
router.post('/organizations', async (req, res) => {
    try {
        if (!req.body.token) {
            res.status(403).json({ message: 'token is required' });
        }
        else {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;',
                    'Authorization': 'Bearer ' + req.body.token
                },
                body: JSON.stringify({
                    "organizationIds": [],
                    "returnAdditionalInfo": true,
                    "includeDisabled": true
                })
            };
            fetch(`${process.env.SYRVECLOUD_URL}organizations`, requestOptions)
                .then((result) => result.json())
                .then((data) => res.status(200).json(data));
        }

    } catch (err) {
        res.status(500).json({ message: "Что-то пошло не так" })
    }
})

// /api/couriers
router.post('/couriers', async (req, res) => {
    const { token, organizationIDs } = req.body;
    try {
        if (!token || !organizationIDs || organizationIDs.length === 0) {
            res.status(403).json({ message: 'token and organizationIDs is required' });
        }
        else {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({ "organizationIds": organizationIDs })
            };
            fetch(`${process.env.SYRVECLOUD_URL}employees/couriers/active_location`, requestOptions)
                .then((result) => result.json())
                .then((data) => res.status(200).json(data));
        }

    } catch (err) {
        res.status(500).json({ message: "Что-то пошло не так" })
    }
})

// /api/orders
router.post('/orders', async (req, res) => {
    const { token, organizationIDs } = req.body;
    try {
        if (!token || !organizationIDs || organizationIDs.length === 0) {
            res.status(403).json({ message: 'token and organizationIDs is required' });
        }
        else {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    "organizationIds": organizationIDs,
                    "deliveryDateFrom": `${today} 00:00:00.000`,
                    "deliveryDateTo": `${today} 23:59:00.000`,
                    "statuses": [
                        "CookingStarted",
                        "CookingCompleted",
                        "OnWay",
                        "Unconfirmed",
                        "WaitCooking",
                        "Closed"
                    ]
                })
            };
            fetch(`${process.env.SYRVECLOUD_URL}deliveries/by_delivery_date_and_status`, requestOptions)
                .then((result) => result.json())
                .then((data) => res.status(200).json(data));
        }

    } catch (err) {
        res.status(500).json({ message: "Что-то пошло не так" })
    }
})

module.exports = router;