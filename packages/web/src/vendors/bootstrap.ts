import * as serviceWorker from './serviceWorker';
import { startListenRanaSocketIo } from './ranaSocketIo';

const bootstrap = () => {
  serviceWorker.unregister();
  startListenRanaSocketIo();
};

export default bootstrap;
