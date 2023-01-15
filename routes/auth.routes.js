const { Router } = require('express');
const router = Router();
require('dotenv').config()

// /api
router.get('/auth', async (req, res) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;' },
            body: JSON.stringify({ "apiLogin": process.env.SYRVECLOUD_API_LOGIN })
        };
        fetch(`${process.env.SYRVECLOUD_URL}access_token`, requestOptions)
            .then((result) => result.json())
            .then((data) => res.status(200).json(data));

    } catch (err) {
        res.status(500).json({ message: "Что-то пошло не так" })
    }

})

module.exports = router;