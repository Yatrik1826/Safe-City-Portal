const router = require('express').Router();
const { authMiddleware, roleGuard } = require('../middlewares/auth');
const { reportSnapshot } = require('../controllers/reportController');

router.get('/snapshot', authMiddleware, roleGuard('admin', 'officer'), reportSnapshot);

module.exports = router;
