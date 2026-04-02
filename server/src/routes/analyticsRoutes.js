const router = require('express').Router();
const { authMiddleware, roleGuard } = require('../middlewares/auth');
const { analyticsSummary, areaRiskScores } = require('../controllers/analyticsController');

router.get('/summary', authMiddleware, roleGuard('admin', 'officer'), analyticsSummary);
router.get('/area-risk', authMiddleware, roleGuard('admin', 'officer'), areaRiskScores);

module.exports = router;
