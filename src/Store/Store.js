import { configureStore } from "@reduxjs/toolkit";
import { orderSlice, authReducer } from "./Index";
import loaderReducer from "./LoaderSlice";

const store = configureStore({
  reducer: {
    orderSlice: orderSlice,
    loader: loaderReducer,
    auth: authReducer,
  },
});

export default store;