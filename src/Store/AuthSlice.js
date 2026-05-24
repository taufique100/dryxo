import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLoginModal: false,
  showManagerLoginModal: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setShowLoginModal(state, action) {
      state.showLoginModal = action.payload;
    },
    setShowManagerLoginModal(state, action) {
      state.showManagerLoginModal = action.payload;
    },
  },
});

export const { setShowLoginModal, setShowManagerLoginModal } = authSlice.actions;
export default authSlice.reducer;
