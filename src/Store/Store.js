import { configureStore } from "@reduxjs/toolkit";
import orderReducer from './OrderSlice'
import { orderSlice } from "./Index";


const store = configureStore({
    reducer:{
        orderSlice: orderSlice,
    },
})

export default store;