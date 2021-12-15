import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchServers, createServer, installServer } from "./serversAPI";

export interface ServersState {
  values: Server[] | null;
  currentId: string | null;
  status: 'idle' | 'loading' | 'failed';
};

const initialState: ServersState = {
  values: null,
  currentId: null,
  status: 'idle',
};

export const fetchServersAC = createAsyncThunk(
  'servers/fetch',
  async () => {
    const response = await fetchServers();
    return response.data;
  }
);

export const createServerAC = createAsyncThunk(
  'servers/create',
  async (server: Server) => {
    const response = await createServer(server);
    return response.data;
  }
);

export const installServerAC = createAsyncThunk(
  'servers/install',
  async (server: Server) => {
    const response = await installServer(server);
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
      .addCase(installServerAC.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(installServerAC.fulfilled, (state, action) => {
        state.status = 'idle';
        state.values = action.payload;
      });
  },
});

export const { setCurrentServerId } = serversSlice.actions;

export const selectServers = (state: RootState) => state.servers.values;
export const selectCurrentServerId = (state: RootState) => state.servers.currentId;
export const selectCurrentServer = (state: RootState) => {
  return state.servers.values ? state.servers.values.find(server => state.servers.currentId) : null;
}

export default serversSlice.reducer;