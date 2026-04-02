const router = require('express').Router();
const { authMiddleware, roleGuard } = require('../middlewares/auth');
const { areaPrediction, unsafeTimeWindows } = require('../controllers/predictionController');

router.get('/area', authMiddleware, roleGuard('admin', 'officer'), areaPrediction);
router.get('/time-windows', authMiddleware, roleGuard('admin', 'officer'), unsafeTimeWindows);

module.exports = router;
