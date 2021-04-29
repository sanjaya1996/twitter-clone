import { Server } from 'socket.io';

export default (io: Server) => {
  io.on('connection', (socket) => {
    console.log('Socket connected');
  });
};
