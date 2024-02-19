import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import STATUSES from "../status";
import axios from "axios";

export const fetchSingleProduct = createAsyncThunk(
  "fetch/fetchSingleProduct",
  async (id) => {
    const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return res.data;
  }
);

const initialState = {
  singleProduct: [],
  status: STATUSES.IDLE,
};

export const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProduct.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.singleProduct = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export default singleProductSlice.reducer;
