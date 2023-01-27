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
            const { login, password, isAdmin } = req.body;
            const candidate = await User.findOne({ login });
            if (candidate) {
                return res.status(400).json({ message: "Username is already taken 😬" });
            };
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({ login, password: hashedPassword, isAdmin });
            await user.save();
            res.status(201).json({
                message: `👏 User ${login} saved successfully`,
                id: user.id
            });
        } catch (error) {
            res.status(500).json({ message: `😧 Server error [${error}]` });
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
                return res.status(400).json({ message: '👀 User not found' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: '⛔ Invalid password' });
            }

            const token = jwt.sign(
                { userId: user.id },
                "gps-tracker",
                { expiresIn: '1h' }
            )
            res.status(200).json({
                token,
                userId: user.id,
                isAdmin: user.isAdmin,
                message: '💪 Login successful',
                userLogin: user.login
            })

        } catch (error) {
            res.status(500).json({ message: `😧 Server error [${error}]` });
        }
    });

// admin/getallusers
router.get(
    '/getallusers', async (req, res) => {
        try {
            const users = await User.find({})
            if (!users) {
                return res.status(400).json({ message: '👀 Users not found' });
            }
            res.status(200).send(users);

        } catch (error) {
            res.status(500).json({ message: `😧 Server error [${error}]` });
        }
    });

// admin/deleteuser
router.post(
    '/deleteuser',
    async (req, res) => {
        const login = req.body.login;
        try {
            //get user from mongo to user
            const user = await User.findOne({ login });
            if (!user) {
                return res.status(400).json({ message: '👀 User not found' });
            }
            //remove user from mongo
            await User.deleteOne({ login: login });
            res.status(200).json({ message: `👀 User ${login} deleted` });
        } catch (error) {
            res.status(500).json({ message: `😧 Server error [${error}]` });
        }
    });

module.exports = router;