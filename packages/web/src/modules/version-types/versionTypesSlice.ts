import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchVersionTypes } from './versionTypesAPI';

export interface VersionTypesState {
  values: VersionType[] | null;
  current: number | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: VersionTypesState = {
  values: null,
  current: null,
  status: 'idle',
};

export const fetchVersionTypesAC = createAsyncThunk('version-types/fetch', async () => {
  const response = await fetchVersionTypes();
  return response.data;
});

export const versionTypesSlice = createSlice({
  name: 'versionTypes',
  initialState,
  reducers: {
    setCurrentVersionType: (state, action: PayloadAction<number>) => {
      state.current = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVersionTypesAC.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVersionTypesAC.fulfilled, (state, action) => {
        state.status = 'idle';
        state.values = action.payload;
      });
  },
});

export const { setCurrentVersionType } = versionTypesSlice.actions;

export const selectVersionTypes = (state: RootState) => state.versionTypes.values;
export const selectCurrentVersionTypeId = (state: RootState) => state.versionTypes.current;

export default versionTypesSlice.reducer;
