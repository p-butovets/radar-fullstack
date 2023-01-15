const { Router } = require('express');
const router = Router();
require('dotenv').config();


// /api
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

module.exports = router;