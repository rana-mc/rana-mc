import * as serviceWorker from './serviceWorker';

export const bootstrap = () => {
  serviceWorker.unregister();
};