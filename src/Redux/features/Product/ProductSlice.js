import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { best_seller, products_list } from "../../../services/Product-service";

// Create an async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ offset, limit, ...filters }, { rejectWithValue }) => {
    try {
      const response = await products_list({ offset, limit, ...filters });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchBestSellers = createAsyncThunk(
  "products/fetchBestSellers",
  async ({ _, rejectWithValue }) => {
    try {
      const response = await best_seller();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Load from localStorage on first load
const loadFromLocalStorage = () => {
  try {
    const items = localStorage.getItem("recentlyViewed");
    return items ? JSON.parse(items) : [];
  } catch (error) {
    return [];
  }
};

const saveToLocalStorage = (products) => {
  try {
    localStorage.setItem("recentlyViewed", JSON.stringify(products));
  } catch (error) {
    console.error("Couldn't save to localStorage", error);
  }
};

const productsSlice = createSlice({
  name: "products",
  initialState: {
    recentlyViewed: loadFromLocalStorage() || [],
    items: [],
    offset: 0,
    limit: 9,
    hasMore: true,
    status: "idle",
    error: null,
    filters: {
      category_id: "",
      subcategory_id: "",
      size_id: "",
      color_id: "",
      occution_id: "",
      suboccution_id: "",
      min_price: "",
      max_price: "",
      name: "",
      sort_by: "",
    },
  },
  reducers: {
    resetProducts: (state) => {
      state.items = [];
      state.offset = 0;
      state.hasMore = true;
      state.status = "idle";
      state.error = null;
    },
    incrementOffset: (state) => {
      state.offset += state.limit;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    addRecentlyViewedProduct: (state, action) => {
      const product = action?.payload;

      if (!product || !product.id) {
        console.error("Invalid product payload:", product);
        return;
      }

      const filtered = state.recentlyViewed?.filter(
        (item) => item && item.id !== product.id
      );

      const updated = [product, ...(filtered || [])];

      state.recentlyViewed = updated;
      saveToLocalStorage(updated);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = [...state.items, ...action.payload.products];
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchBestSellers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBestSellers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = [...state.items, ...action.payload.products];
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchBestSellers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  resetProducts,
  incrementOffset,
  setFilters,
  addRecentlyViewedProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
