const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find admin by email
        const [rows] = await pool.query(
            'SELECT * FROM admins WHERE email = ?',
            [email]
        );

        if (rows.length === 0) {
            return res.status(400).json({ message: 'Admin not found' });
        }

        const admin = rows[0];

        // Compare password
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

        return res.json({
            message: 'Login successful',
            token,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};