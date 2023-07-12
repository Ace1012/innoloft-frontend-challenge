import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ITrl } from "../../interfaces/interfaces";
import axios from "axios";
import appBaseConfig from "../../config/appConfig";

interface ITrlList {
  loading: boolean;
  trlList: ITrl[];
  error: string;
}

const initialState: ITrlList = {
  trlList: [],
  loading: false,
  error: "",
};

export const fetchTrlList = createAsyncThunk("TrlList/fetchTrlList", async () => {
  return axios
    .get<ITrl[]>(appBaseConfig.endpoints.getTrlList)
    .then((res) => res.data);
});

const trlListSlice = createSlice({
  name: "TrlList",
  initialState,
  reducers: {
    setTrlList: (state, action: PayloadAction<ITrl[]>) => {
      state.trlList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTrlList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTrlList.fulfilled, (state, action) => {
      state.loading = false;
      state.trlList = action.payload;
      state.error = "";
    });
    builder.addCase(fetchTrlList.rejected, (state, action) => {
      state.loading = false;
      state.trlList = initialState.trlList;
      state.error = action.error.message || "Error encountered!";
    });
  },
});

export default trlListSlice;
