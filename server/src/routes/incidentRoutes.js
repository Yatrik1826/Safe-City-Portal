const router = require('express').Router();
const { authMiddleware, roleGuard } = require('../middlewares/auth');
const {
  createIncident,
  listIncidents,
  nearbyIncidents,
  heatmapPoints,
  assignIncident,
  updateIncidentStatus,
} = require('../controllers/incidentController');

router.get('/', authMiddleware, listIncidents);
router.get('/nearby', authMiddleware, nearbyIncidents);
router.get('/heatmap', authMiddleware, heatmapPoints);
router.post('/', authMiddleware, createIncident);
router.put('/:id/assign', authMiddleware, roleGuard('admin', 'officer'), assignIncident);
router.put('/:id/status', authMiddleware, roleGuard('admin', 'officer'), updateIncidentStatus);

module.exports = router;
