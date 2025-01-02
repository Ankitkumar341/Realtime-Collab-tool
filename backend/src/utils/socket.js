import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', {
  transports: ['websocket', 'polling'],
  autoConnect: true,
});

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
});

export default socket;