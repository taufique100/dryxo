import { createSlice } from "@reduxjs/toolkit"
import { warningNotify } from "../Utils/toastNotify";

const initialState = {
    selectedProductId:null,
    openModal: false,
    cartItems: []
}

const orderSlice = createSlice({
    name:'order',
    initialState,
    reducers:{
        setSelectedProductId(state, action){
            const productId = action.payload;
            const existingItem = state.cartItems.find(item => item.id === productId);
            
            if (existingItem) {
                // existingItem.quantity += 1;
                warningNotify('Product already in cart');
                return;
            } else {
                state.cartItems.push({ id: productId, quantity: 1 });
            }
        },
        setOpenModal:(state, action)=>{
            state.openModal = action.payload
        },
        updateCartQuantity:(state, action)=>{
            const { id, quantity } = action.payload;
            const item = state.cartItems.find(item => item.id === id);
            if (item) {
                item.quantity = quantity;
            }
        },
        removeFromCart:(state, action)=>{
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
        },
        clearCart:(state)=>{
            state.cartItems = [];
        }
    }
})

export const {
    setSelectedProductId,
    setOpenModal,
    updateCartQuantity,
    removeFromCart,
    clearCart
} = orderSlice.actions;

export default orderSlice.reducer;