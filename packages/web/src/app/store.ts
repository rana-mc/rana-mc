import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../modules/counter/counterSlice';
import versionTypesReducer from '../modules/version-types/versionTypesSlice';
import gameVersionsReducer from '../modules/game-versions/gameVersionsSlice';
import serversReducer from '../modules/servers/serversSlice';
import serverReducer from '../modules/server/serverSlice';
import settingsReducer from '../modules/settings/settingsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    versionTypes: versionTypesReducer,
    gameVersions: gameVersionsReducer,
    servers: serversReducer,
    server: serverReducer,
    settings: settingsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
