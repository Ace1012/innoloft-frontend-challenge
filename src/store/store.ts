import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import configSlice from "./slices/configSlice";
import trlListSlice from "./slices/trlListSlice";

const store = configureStore({
  reducer: {
    config: configSlice.reducer,
    product: productSlice.reducer,
    trlList: trlListSlice.reducer,
  },
});

type RootType = ReturnType<typeof store.getState>;

/**
 * Actions
 */
export const { setProduct, editProduct } = productSlice.actions;
export const { setConfig } = configSlice.actions;
export const { setTrlList } = trlListSlice.actions;

/**
 * Selectors
 */
export const selectProduct = (state: RootType) => state.product;
export const selectConfig = (state: RootType) => state.config;
export const selectTrlList = (state: RootType) => state.trlList;

export default store;
