import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchGameVersions } from "./gameVersionsAPI";

export interface GameVersionsState {
  values: GameVersion[] | null;
  current: string | null;
  status: 'idle' | 'loading' | 'failed';
};

const initialState: GameVersionsState = {
  values: null,
  current: null,
  status: 'idle',
};

export const fetchGameVersionsAC = createAsyncThunk(
  'game-versions/fetch',
  async () => {
    const response = await fetchGameVersions();
    return response.data;
  }
);

export const gameVersionSlice = createSlice({
  name: 'gameVersions',
  initialState,
  reducers: {
    setCurrentGameVersion: (state, action: PayloadAction<string>) => {
      state.current = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGameVersionsAC.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGameVersionsAC.fulfilled, (state, action) => {
        state.status = 'idle';
        state.values = action.payload;
      });
  },
});

export const { setCurrentGameVersion } = gameVersionSlice.actions;

export const selectGameVersions = (state: RootState) => state.gameVersions.values;
export const selectCurrentGameVersion = (state: RootState) => state.gameVersions.current;

export default gameVersionSlice.reducer;