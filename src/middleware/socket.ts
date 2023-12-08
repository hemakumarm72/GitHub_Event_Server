import { SocketData } from '../@types';
import { io } from '../bin/www';

export const initSocket = () => {
  io.on('connection', (socket) => {
    console.log('connected to socket');
    socket.on('message', (message: object) => {
      console.log('receiving  message', message);
      socket.broadcast.emit('receiveMessage', message);
    });

    socket.on('disconnect', (reason) => {
      console.log(`User disconnected: ${reason}`);
    });
  });
};
