import { configureStore } from "@reduxjs/toolkit";
import orderReducer from './OrderSlice'

const store = configureStore({
    reducer:{
        orderSlice: orderReducer,
    },
})

// persist cart to localStorage
store.subscribe(() => {
    try {
        const state = store.getState();
        const cart = state.orderSlice?.cart || [];
        window.localStorage.setItem('dryxo_cart', JSON.stringify(cart));
    } catch (e) {
        console.log(e);
    }
});

export default store;