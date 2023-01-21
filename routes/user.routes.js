const { Router } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = Router();

// /admin/register
router.post(
    '/register',
    async (req, res) => {
        try {
            const { login, password } = req.body;
            const candidate = await User.findOne({ login });
            if (candidate) {
                return res.status(400).json({ message: "Username already is taken" });
            };
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({ login, password: hashedPassword });
            await user.save();
            res.status(201).json({
                message: `User ${login} saved successfully`,
                id: user.id
            });
        } catch (error) {
            res.status(500).json({ message: `Server error [${error}]` });
        }
    });

// /admin/login
router.post(
    '/login',
    async (req, res) => {
        try {
            const { login, password } = req.body;
            const user = await User.findOne({ login });
            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'invalid password' });
            }
            const token = jwt.sign(
                { userId: user.id },
                "gps-tracker",
                { expiresIn: '1h' }
            )
            res.json({ token, userId: user.id, admin: user.isAdmin })

        } catch (error) {
            res.status(500).json({ message: `Server error [${error}]` });
        }
    });

module.exports = router;