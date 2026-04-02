const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { errorHandler } = require('./middlewares/errorHandler');

const authRoutes = require('./routes/authRoutes');
const incidentRoutes = require('./routes/incidentRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const alertRoutes = require('./routes/alertRoutes');
const simulationRoutes = require('./routes/simulationRoutes');
const predictionRoutes = require('./routes/predictionRoutes');
const reportRoutes = require('./routes/reportRoutes');
const livesafeRoutes = require('./routes/livesafeRoutes');

const createApp = () => {
  const app = express();
  app.use(cors({ origin: '*', credentials: false }));
  app.use(helmet());
  app.use(express.json({ limit: '2mb' }));
  app.use(morgan('dev'));

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 300,
    })
  );

  app.get('/health', (req, res) => res.json({ status: 'ok' }));

  app.use('/api/auth', authRoutes);
  app.use('/api/incidents', incidentRoutes);
  app.use('/api/analytics', analyticsRoutes);
  app.use('/api/alerts', alertRoutes);
  app.use('/api/simulate', simulationRoutes);
  app.use('/api/predict', predictionRoutes);
  app.use('/api/reports', reportRoutes);
  app.use('/api/livesafe', livesafeRoutes);

  app.use(errorHandler);
  return app;
};

module.exports = { createApp };
