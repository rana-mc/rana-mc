import { RanaSocketEvents, ServerActions } from '@rana-mc/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { updateServerState } from '@modules/servers/serversSlice';
import { ranaSocket } from '../../vendors/ranaSocketIo';
import { AppThunk, RootState } from '../../app/store';

export interface ServerActionState {
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ServerActionState = {
  status: 'idle',
};

export const installServerAC = createAsyncThunk(
  'server/install',
  async (server: Server) => {
    ranaSocket.emit(ServerActions.InstallCore, server);
  }
);

export const startServerAC = createAsyncThunk('server/start', async (server: Server) => {
  ranaSocket.emit(ServerActions.Start, server);
});

export const stopServerAC = createAsyncThunk('server/stop', async (server: Server) => {
  ranaSocket.emit(ServerActions.Stop, server);
});

export const acceptEULAServerAC = createAsyncThunk(
  'server/eula',
  async ({ server, accept: acceptEULA }: { server: Server; accept: boolean }) => {
    ranaSocket.emit(ServerActions.Eula, server, acceptEULA);
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
      .addCase(installServerAC.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(startServerAC.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(startServerAC.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(stopServerAC.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(stopServerAC.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(acceptEULAServerAC.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(acceptEULAServerAC.fulfilled, (state) => {
        state.status = 'idle';
      });
  },
});

export const selectServerActionStatus = (state: RootState) => state.server.status;

export const startListenSocket = (): AppThunk => (dispatch) => {
  ranaSocket.on(RanaSocketEvents.ServerUpdate, (server: Server) => {
    dispatch(updateServerState(server));
  });
};

export default serverSlice.reducer;
