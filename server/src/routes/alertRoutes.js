const router = require('express').Router();
const { authMiddleware, roleGuard } = require('../middlewares/auth');
const { triggerPanic, listAlerts, updateAlertStatus } = require('../controllers/alertController');

router.post('/panic', authMiddleware, triggerPanic);
router.get('/', authMiddleware, roleGuard('admin', 'officer'), listAlerts);
router.put('/:id/status', authMiddleware, roleGuard('admin', 'officer'), updateAlertStatus);

module.exports = router;
