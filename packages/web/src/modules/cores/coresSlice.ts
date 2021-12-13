import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CoreType } from "@utils";
import { RootState } from "../../app/store";
import { fetchForgeCores, fetchFabricCores } from "./coresAPI";

export interface CoresState {
  value: ForgeCore[] | FabricCore[] | null;
  type: CoreType.Forge | CoreType.Fabric;
  status: 'idle' | 'loading' | 'failed';
};

const initialState: CoresState = {
  value: null,
  type: CoreType.Forge,
  status: 'idle',
};

// TODO: save cores for all versions, like { [version]: core }
export const fetchForgeCoresAC = createAsyncThunk(
  'cores/fetch-forge',
  async (gameVersion: string) => {
    const response = await fetchForgeCores(gameVersion);
    return response.data;
  }
);

export const fetchFabricCoresAC = createAsyncThunk(
  'cores/fetch-fabric',
  async (gameVersion: string) => {
    const response = await fetchFabricCores(gameVersion);
    return response.data;
  }
);

export const coresSlice = createSlice({
  name: 'cores',
  initialState,
  reducers: {
    setCoreType: (state, action: PayloadAction<CoreType>) => {
      state.type = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchForgeCoresAC.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchForgeCoresAC.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(fetchFabricCoresAC.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFabricCoresAC.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      });
  },
});

export const { setCoreType } = coresSlice.actions;

export const selectCores = (state: RootState) => state.cores.value;
export const selectCoreType = (state: RootState) => state.cores.type;

export default coresSlice.reducer;