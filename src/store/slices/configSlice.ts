import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IConfig } from "../../interfaces/interfaces";
import axios from "axios";
import appBaseConfig from "../../config/appConfig";

interface IConfigSlice {
  loading: boolean;
  config: IConfig;
  error: string;
}

const initialState: IConfigSlice = {
  loading: false,
  config: {
    id: 1,
    logo: "https://img.innoloft.de/logo.svg",
    mainColor: "",
    hasUserSection: false,
  },
  error: "",
};

export const fetchConfig = createAsyncThunk("config/fetchConfig", async () => {
  const abrtctrlr = new AbortController();
  return axios
    .get<IConfig>(appBaseConfig.endpoints.getConfiguration, {
      signal: abrtctrlr.signal,
    })
    .then((res) => res.data);
});

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setConfig: (state, action: PayloadAction<IConfig>) => {
      state.config = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConfig.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchConfig.fulfilled, (state, action) => {
      state.loading = false;
      state.config = action.payload;
      state.error = "";
    });
    builder.addCase(fetchConfig.rejected, (state, action) => {
      console.log("Config error...");
      state.loading = false;
      state.config = initialState.config;
      state.error = action.error.message || "Error encountered!";
    });
  },
});

export default configSlice;
