const { Router } = require('express');
const jwt = require('jsonwebtoken');

const router = Router();

// /admin/login - returns mock user for public access
router.post(
    '/login',
    async (req, res) => {
        try {
            const token = jwt.sign(
                { userId: 'public-user' },
                "gps-tracker",
                { expiresIn: '24h' }
            )
            res.status(200).json({
                token,
                userId: 'public-user',
                isAdmin: false,
                message: '💪 Access granted',
                userLogin: 'public'
            })

        } catch (error) {
            res.status(500).json({ message: `😧 Server error [${error}]` });
        }
    });

module.exports = router;