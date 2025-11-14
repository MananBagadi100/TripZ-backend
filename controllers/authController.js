const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function loginAdmin(req, res) {
    const { email, password } = req.body;

    try {
        const [rows] = await pool.query(
            'SELECT * FROM admins WHERE email = ?',
            [email]
        );

        if (rows.length === 0) {
            return res.status(400).json({ message: 'Admin not found' });
        }

        const admin = rows[0];

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: admin.id, email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Send JWT in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,           // true in production (HTTPS)
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.json({ message: "Login successful" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

async function logoutAdmin(req, res) {
    return res.clearCookie("token").json({ message: "Logged out" });
}

module.exports = {
    loginAdmin,
    logoutAdmin
};