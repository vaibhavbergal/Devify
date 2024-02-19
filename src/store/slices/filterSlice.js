import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import STATUSES from "../status";

export const fetchByCategory = createAsyncThunk(
  "fetch/fetchByCategory",
  async (category) => {
    const res = await axios.get(
      `https://fakestoreapi.com/products/category/${category}`
    );

    return res.data;
  }
);

const initialState = {
  products: [],
  status: STATUSES.IDLE,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchByCategory.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchByCategory.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchByCategory.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export default filterSlice.reducer;

// // categoriesSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   categories: [],
//   selectedCategory: null,
// };

// const categoriesSlice = createSlice({
//   name: 'categories',
//   initialState,
//   reducers: {
//     setCategories(state, action) {
//       state.categories = action.payload;
//     },
//     selectCategory(state, action) {
//       state.selectedCategory = action.payload;
//     },
//   },
// });

// export const { setCategories, selectCategory } = categoriesSlice.actions;

// export default categoriesSlice.reducer;

// ProductList.js
// ProductList.js
// import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { selectCategory } from './categoriesSlice';

// const ProductList = () => {
//   const { category } = useParams();
//   const dispatch = useDispatch();
//   const selectedCategory = useSelector((state) => state.categories.selectedCategory);

//   useEffect(() => {
//     dispatch(selectCategory(category));
//     // Fetch products based on the selected category
//     // You can dispatch another action here to fetch products from your backend
//   }, [category, dispatch]);

//   return (
//     <div>
//       <h2>Products in {selectedCategory}</h2>
//       {/* Render products here */}
//     </div>
//   );
// };

// export default ProductList;
// // ProductList.js
// import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { selectCategory } from './categoriesSlice';

// const ProductList = () => {
//   const { category } = useParams();
//   const dispatch = useDispatch();
//   const selectedCategory = useSelector((state) => state.categories.selectedCategory);

//   useEffect(() => {
//     dispatch(selectCategory(category));
//     // Fetch products based on the selected category
//     // You can dispatch another action here to fetch products from your backend
//   }, [category, dispatch]);

//   return (
//     <div>
//       <h2>Products in {selectedCategory}</h2>
//       {/* Render products here */}
//     </div>
//   );
// };

// export default ProductList;
// useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { selectCategory } from './categoriesSlice';

// const ProductList = () => {
//   const { category } = useParams();
//   const dispatch = useDispatch();
//   const selectedCategory = useSelector((state) => state.categories.selectedCategory);

//   useEffect(() => {
//     dispatch(selectCategory(category));
//     // Fetch products based on the selected category
//     // You can dispatch another action here to fetch products from your backend
//   }, [category, dispatch]);

//   return (
//     <div>
//       <h2>Products in {selectedCategory}</h2>
//       {/* Render products here */}
//     </div>
//   );
// };

// export default ProductList;
