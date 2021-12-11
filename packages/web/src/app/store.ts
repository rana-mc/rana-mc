import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../modules/counter/counterSlice';
import gameVersionsReducer from '../modules/game-versions/gameVersionsSlice';
import coresReducer from '../modules/cores/coresSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    gameVersions: gameVersionsReducer,
    cores: coresReducer
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
