const express = require('express');
const router = express.Router();

const tourController = require('../controllers/tourController');
const auth = require('../middleware/authMiddleware');

// public routes
router.get('/', tourController.getAllTours);
router.get('/:id', tourController.getTourById);

// protected routes
router.post('/', auth, tourController.createTour);
router.put('/:id', auth, tourController.updateTour);
router.delete('/:id', auth, tourController.deleteTour);

module.exports = router;