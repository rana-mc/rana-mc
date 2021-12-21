import { Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3001';
const SOCKET_MOCK = { emit: () => { }, on: () => { } };

// eslint-disable-next-line import/no-mutable-exports
export let ranaSocket: Socket | typeof SOCKET_MOCK = SOCKET_MOCK;
export const startListenRanaSocketIo = () => {
  try {
    // @ts-ignore
    ranaSocket = io(SOCKET_URL);
  } catch (e: unknown) {
    if (typeof e === "string") alert(e);
    else if (e instanceof Error) alert(e.message);
  }
};
