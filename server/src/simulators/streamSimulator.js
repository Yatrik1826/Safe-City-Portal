require('dotenv').config();
const { connectDB } = require('../config/db');
const { startStream } = require('./streamService');
const { initIO } = require('../sockets/io');

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  // In CLI mode we don't use socket.io, so init with noop
  initIO({ emit: () => {} });
  const freq = Number(process.env.SIM_FREQUENCY || 6);
  startStream(freq);
  console.log(`Streaming synthetic incidents at ${freq} per minute`);
};

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
