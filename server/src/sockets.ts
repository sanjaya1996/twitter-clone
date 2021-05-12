import { Server } from 'socket.io';
import { IMessageObject } from './models/interfaces/Message';
import { LoggedInUserType } from './models/interfaces/User';

export default (io: Server) => {
  io.on('connection', (socket) => {
    socket.on('setup', (userData: LoggedInUserType) => {
      socket.join(userData?._id);
      console.log('Connected to Socket with id: ' + userData?._id);
      socket.emit('connected');
    });

    socket.on('join room', (room) => {
      console.log('Room Joined to :', room);
      socket.join(room);
    });
    socket.on('typing', (room) => socket.in(room).emit('typing', room));
    socket.on('stop typing', (room) =>
      socket.in(room).emit('stop typing', room)
    );
    socket.on('notification received', (room) =>
      socket.in(room).emit('notification received')
    );

    socket.on('new message', (newMessage: IMessageObject) => {
      const chat = newMessage.chat;
      if (!chat.users) return console.log('Chat.users not defined');

      chat.users.forEach((user) => {
        if (user._id === newMessage.sender._id) return;

        socket.in(user._id).emit('message received', newMessage);
      });
    });
  });
};
