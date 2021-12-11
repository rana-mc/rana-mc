import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchCores } from "./coresAPI";

export interface CoresState {
  value: Core[] | null;
  status: 'idle' | 'loading' | 'failed';
};

const initialState: CoresState = {
  value: null,
  status: 'idle',
};

// TODO: save cores for all versions, like { [version]: core }
export const fetchCoresAC = createAsyncThunk(
  'cores/fetch',
  async (gameVersion: string) => {
    const response = await fetchCores(gameVersion);
    return response.data;
  }
);

export const coresSlice = createSlice({
  name: 'cores',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoresAC.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCoresAC.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      });
  },
});

export const selectCores = (state: RootState) => state.cores.value;

export default coresSlice.reducer;