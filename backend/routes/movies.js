const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const auth = require('../middleware/auth');

router.get('/', movieController.searchMovies);
router.get('/analytics', auth , movieController.getAnalytics);
router.get('/:id', movieController.getMovieById);

module.exports = router;

