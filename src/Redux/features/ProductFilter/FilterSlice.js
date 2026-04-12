import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { homeProducts } from "../../../services/Product-service";

const initialState = {
  searchedProduct: "",
  category: "",
  products: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchProductsByCategory = createAsyncThunk(
  'filterProduct/fetchProductsByCategory',
  async (category, { rejectWithValue }) => {
    try {
      const data = await homeProducts(category);
      
      return data.data;
    } catch (error) {
     
      // Check if error.response and error.response.data are available
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message || 'Something went wrong');
      }
    }
  }
);

const filterSlice = createSlice({
  name: "filterProduct",
  initialState,
  reducers: {
    setSearchProduct: (state, action) => {
      state.searchedProduct = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setCategory, setSearchProduct } = filterSlice.actions;
export default filterSlice.reducer;
