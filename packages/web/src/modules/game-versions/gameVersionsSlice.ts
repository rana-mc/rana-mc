import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchGameVersions } from "./gameVersionsAPI";

export interface GameVersionsState {
  value: GameVersion[];
  status: 'idle' | 'loading' | 'failed';
};

const initialState: GameVersionsState = {
  value: [],
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGameVersionsAC.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGameVersionsAC.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      });
  },
});

export const selectGameVersions = (state: RootState) => state.gameVersions.value;

export default gameVersionSlice.reducer;