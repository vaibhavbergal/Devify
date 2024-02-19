import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [], //  JSON.parse(localStorage.getItem("cart")) || [],
  reducers: {
    addCart: (state, action) => {
      state.push(action.payload);
      //   localStorage.setItem("cart", JSON.stringify(state));
    },
    removeCart: (state, action) => {
      return state.filter((cart) => cart.id !== action.payload);
    },
  },
});

export const { addCart, removeCart } = cartSlice.actions;

export default cartSlice.reducer;
