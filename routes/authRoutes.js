const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/admin/login
router.post('/login', authController.loginAdmin);
router.post('/logout',authController.logoutAdmin)

router.post('/register-admin', authController.registerAdmin);

module.exports = router;