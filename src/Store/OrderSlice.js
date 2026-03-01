import { createSlice } from "@reduxjs/toolkit"
import { warningNotify } from "../Utils/toastNotify";

const initialState = {
    selectedProductId: null,
    openModal: false,
    // cartItems: []
    cart: (typeof window !== 'undefined' && window.localStorage.getItem('dryxo_cart')) ? JSON.parse(window.localStorage.getItem('dryxo_cart')) : [] // { id, quantity }
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
        addToCart:(state, action)=>{
            const { id, quantity = 1 } = action.payload;
            const existing = state.cart.find(c => c.id === id);
            if(existing){
                existing.quantity += quantity;
            } else {
                state.cart.push({ id, quantity });
            }
        },
        removeFromCart:(state, action)=>{
            state.cart = state.cart.filter(c => c.id !== action.payload);
        },
        updateQuantity:(state, action)=>{
            const { id, quantity } = action.payload; // absolute quantity
            state.cart = state.cart.map(c => c.id === id ? { ...c, quantity } : c).filter(c => c.quantity > 0);
        },
        clearCart:(state)=>{
            state.cart = [];
        }
    }
})

export const {
    setSelectedProductId,
    setOpenModal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
} = orderSlice.actions;

export default orderSlice.reducer;