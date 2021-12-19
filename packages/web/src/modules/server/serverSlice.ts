import { RanaSocketEvents, ServerActions } from "@rana-mc/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ranaSocket } from '../../vendors/ranaSocketIo';
import { RootState } from "../../app/store";

export interface ServerActionState {
  status: 'idle' | 'loading' | 'failed';
};

const initialState: ServerActionState = {
  status: 'idle',
};

export const installServerAC = createAsyncThunk(
  'server/install',
  async (server: Server) => {
    ranaSocket.emit(ServerActions.InstallCore, server);
  }
);

export const startServerAC = createAsyncThunk(
  'server/start',
  async (server: Server) => {
    ranaSocket.emit(ServerActions.Start, server);
  }
);

export const stopServerAC = createAsyncThunk(
  'server/stop',
  async (server: Server) => {
    ranaSocket.emit(ServerActions.Stop, server);
  }
);

export const acceptEULAServerAC = createAsyncThunk(
  'server/eula',
  async ({ server, accept: acceptEULA }: { server: Server, accept: boolean }) => {
    ranaSocket.emit(ServerActions.Eula, server, acceptEULA);
  }
);

export const serverSlice = createSlice({
  name: 'server',
  initialState,
  reducers: {
    startListenSocket: () => {
      ranaSocket.on(RanaSocketEvents.ServerUpdate, (server) => {
        console.log(server);
      });
    }
  },
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
      .addCase(acceptEULAServerAC.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(acceptEULAServerAC.fulfilled, (state, action) => {
        state.status = 'idle';
      });
  },
});

export const { startListenSocket } = serverSlice.actions;
export const selectServerActionStatus = (state: RootState) => state.server.status;

export default serverSlice.reducer;