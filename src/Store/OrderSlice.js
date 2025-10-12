import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    selectedProductId:null,
    openModal: false
}

const orderSlice = createSlice({
    name:'order',
    initialState,
    reducers:{
        setSelectedProductId(state, action){
            state.selectedProductId = action.payload
        },
        setOpenModal:(state, action)=>{
            state.openModal = action.payload
        }
    }
})

export const {
    setSelectedProductId,
    setOpenModal,
} = orderSlice.actions;

export default orderSlice.reducer;