import { Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3001';

// eslint-disable-next-line import/no-mutable-exports
export let ranaSocket: Socket;
export const startListenRanaSocketIo = () => {
  // @ts-ignore
  ranaSocket = io(SOCKET_URL);
};
