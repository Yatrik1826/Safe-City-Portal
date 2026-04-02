require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const { createApp } = require('./app');
const { connectDB } = require('./config/db');
const { initIO } = require('./sockets/io');
const { getEnv } = require('./config/env');

const start = async () => {
  const app = createApp();
  const server = http.createServer(app);

  const io = new Server(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] },
  });
  initIO(io);

  io.on('connection', (socket) => {
    socket.emit('system:hello', { message: 'Connected to Nirbhaya Safe City realtime service' });
  });

  await connectDB(getEnv('MONGO_URI', ''));

  const port = Number(getEnv('PORT', 4000));
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
