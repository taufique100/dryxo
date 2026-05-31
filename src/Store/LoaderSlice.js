import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  contactBarHide : false,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setLoader(state, action) {
      state.loading = action.payload;
    },
    setContactBarHide(state, action) {
      state.contactBarHide = action.payload;
    }
  },
});

export const { setLoader, setContactBarHide } = loaderSlice.actions;
export default loaderSlice.reducer;
