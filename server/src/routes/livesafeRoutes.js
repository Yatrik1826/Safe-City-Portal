const router = require('express').Router();
const { authMiddleware } = require('../middlewares/auth');
const { nearbyServices } = require('../controllers/livesafeController');

router.get('/nearby', authMiddleware, nearbyServices);

module.exports = router;
