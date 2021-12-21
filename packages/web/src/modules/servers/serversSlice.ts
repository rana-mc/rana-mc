import { ServerActions } from '@rana-mc/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ranaSocket } from '../../vendors/ranaSocketIo';
import { RootState } from '../../app/store';
import {
  fetchServers, createServer, removeServer, updateServer
} from './serversAPI';

export interface ServersState {
  values: Server[] | null;
  currentId: string | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ServersState = {
  values: null,
  currentId: null,
  status: 'idle',
};

export const fetchServersAC = createAsyncThunk('servers/fetch', async () => {
  const response = await fetchServers();
  return response.data;
});

export const createServerAC = createAsyncThunk(
  'servers/create',
  async (server: Server) => {
    const response = await createServer(server);
    ranaSocket.emit(ServerActions.FlushServers);
    return response.data;
  }
);

export const removeServerAC = createAsyncThunk(
  'servers/remove',
  async (server: Server) => {
    const response = await removeServer(server);
    ranaSocket.emit(ServerActions.RemoveServer, server);
    return response.data;
  }
);

export const updateServerAC = createAsyncThunk(
  'servers/update',
  async (server: Server) => {
    const response = await updateServer(server);
    ranaSocket.emit(ServerActions.FlushServers);
    return response.data;
  }
);

export const serversSlice = createSlice({
  name: 'servers',
  initialState,
  reducers: {
    setCurrentServerId: (state, action: PayloadAction<string>) => {
      state.currentId = action.payload;
    },
    updateServerState: (state, action: PayloadAction<Server>) => {
      const updatedServer = action.payload;

      if (state.values) {
        state.values = state.values?.map((server) =>
          (server.id === updatedServer?.id ? { ...server, ...updatedServer } : server));
      } else {
        console.error('Something went wrong. Unknown error.');
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServersAC.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchServersAC.fulfilled, (state, action) => {
        state.status = 'idle';
        state.values = action.payload;
      })
      .addCase(createServerAC.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createServerAC.fulfilled, (state, action) => {
        state.status = 'idle';
        state.values = action.payload;
      })
      .addCase(removeServerAC.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeServerAC.fulfilled, (state, action) => {
        state.status = 'idle';
        state.values = action.payload;
      })
      .addCase(updateServerAC.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateServerAC.fulfilled, (state, action) => {
        state.status = 'idle';
        state.values = action.payload;
      });
  },
});

export const { setCurrentServerId, updateServerState } = serversSlice.actions;
export const selectServers = (state: RootState) => state.servers.values;

export default serversSlice.reducer;
