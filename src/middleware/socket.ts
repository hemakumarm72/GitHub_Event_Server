import { SocketData } from '../@types';
import { io } from '../bin/www';

export const initSocket = () => {
  console.log('web socket connection established...');
  io.on('connection', (socket) => {
    const online = io.engine.clientsCount;
    console.log(`user Connection online: ${online}`);
    console.log(socket.id);
    socket.emit('me', socket.id);
    socket.on('disconnect', () => {
      socket.broadcast.emit('callEnded');
    });

    socket.on('callUser', (message: SocketData) => {
      io.to(message.userToCall).emit('callUser', {
        signal: message.signalData,
        from: message.from,
        name: message.name,
      });
    });
    socket.on('callScreen', (message: SocketData) => {
      io.to(message.userToCall).emit('callScreen', {
        signal: message.signalData,
        from: message.from,
        name: message.name,
      });
    });
    socket.on('answerCall', (data: SocketData) => {
      io.to(data.to).emit('callAccepted', data.signal);
    });
    socket.on('answerScreenCall', (data: SocketData) => {
      io.to(data.to).emit('callScreenAccepted', data.signal);
    });
  });
};
