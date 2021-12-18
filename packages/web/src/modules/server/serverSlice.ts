import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { installServer, startServer, stopServer } from "./serverAPI";

export interface ServerActionState {
  status: 'idle' | 'loading' | 'failed';
};

const initialState: ServerActionState = {
  status: 'idle',
};

export const installServerAC = createAsyncThunk(
  'server/install',
  async (server: Server) => {
    const response = await installServer(server);
    return response.data;
  }
);

export const startServerAC = createAsyncThunk(
  'server/start',
  async (server: Server) => {
    const response = await startServer(server);
    return response.data;
  }
);

export const stopServerAC = createAsyncThunk(
  'server/stop',
  async (server: Server) => {
    const response = await stopServer(server);
    return response.data;
  }
);

export const serverSlice = createSlice({
  name: 'server',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(installServerAC.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(installServerAC.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(startServerAC.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(startServerAC.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(stopServerAC.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(stopServerAC.fulfilled, (state, action) => {
        state.status = 'idle';
      })
  },
});

export const selectServerActionStatus = (state: RootState) => state.server.status;

export default serverSlice.reducer;