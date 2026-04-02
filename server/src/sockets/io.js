let ioRef = null;

const initIO = (io) => {
  ioRef = io;
};

const getIO = () => {
  if (!ioRef) throw new Error('Socket.io not initialized');
  return ioRef;
};

module.exports = { initIO, getIO };
