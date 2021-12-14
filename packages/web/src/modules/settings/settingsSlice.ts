import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchSettings, setSettings } from "./settingsAPI";

export interface SettingsState {
  value: Partial<Settings> | null;
  status: 'idle' | 'loading' | 'failed';
};

const initialState: SettingsState = {
  value: null,
  status: 'idle',
};

export const fetchSettingsAC = createAsyncThunk(
  'settings/fetch',
  async () => {
    const response = await fetchSettings();
    return response.data;
  }
);

export const setSettingsAC = createAsyncThunk(
  'settings/set',
  async (settings: Partial<Settings>) => {
    const response = await setSettings(settings);
    return response.data;
  }
);

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettingsAC.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSettingsAC.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(setSettingsAC.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setSettingsAC.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      });
  },
});

export const selectSettings = (state: RootState) => state.settings.value;

export default settingsSlice.reducer;