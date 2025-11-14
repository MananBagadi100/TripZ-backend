const express = require('express');
const router = express.Router();
const { loginAdmin } = require('../controllers/authController');

// POST /api/admin/login
router.post('/login', loginAdmin);

module.exports = router;