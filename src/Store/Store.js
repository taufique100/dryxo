import { configureStore } from "@reduxjs/toolkit";
import { orderSlice } from "./Index";
import loaderReducer from "./LoaderSlice";

const store = configureStore({
  reducer: {
    orderSlice: orderSlice,
    loader: loaderReducer,
  },
});

export default store;