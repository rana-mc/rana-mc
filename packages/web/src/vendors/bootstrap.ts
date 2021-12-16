import * as serviceWorker from './serviceWorker';
import { startListenRanaSocketIo } from './ranaSocketIo';

export const bootstrap = () => {
  serviceWorker.unregister();
  startListenRanaSocketIo();
};