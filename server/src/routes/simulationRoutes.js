const router = require('express').Router();
const { authMiddleware, roleGuard } = require('../middlewares/auth');
const {
  generateIncidents,
  startSimulation,
  stopSimulation,
  simulationStatus,
} = require('../controllers/simulationController');

router.get('/status', authMiddleware, roleGuard('admin'), simulationStatus);
router.post('/generate', authMiddleware, roleGuard('admin'), generateIncidents);
router.post('/start', authMiddleware, roleGuard('admin'), startSimulation);
router.post('/stop', authMiddleware, roleGuard('admin'), stopSimulation);

module.exports = router;
