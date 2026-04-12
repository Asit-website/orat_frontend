import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllCart } from "../../../services/User-service";

export const getAllCartsd = createAsyncThunk(
  "user/carts",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await getAllCart(userData);

      const datacarts = data.data;
      localStorage.setItem("cartItems", JSON.stringify(datacarts));
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.activevar === action.payload.activevar
      );

      let tempProductItem = { ...action.payload, cartQuantity: 1 };
      state.cartItems.push(tempProductItem);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;

        toast.info("Decreased product quantity", {
          position: "bottom-right",
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );

        state.cartItems = nextCartItems;
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    updatecartCount(state, action) {
      state.cartTotalQuantity = action.payload;
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.activevar !== action.payload.activevar
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    changeSizeintoCart(state, action) {
      state.cartItems.map((cartItem) => {
        cartItem.activevar = action.payload;
      });

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      return state;
    },
    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { saleprice, cartQuantity } = cartItem;
          const itemTotal = saleprice * (cartQuantity || 1);
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity || 1;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    clearCart(state, action) {
      state.cartItems = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    setCartItems(state, action) {
      state.cartItems = Array.isArray(action.payload) ? [...action.payload] : [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCartsd.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCartsd.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = Array.isArray(action.payload?.data)
          ? [...action.payload.data]
          : [];
        state.cartTotalQuantity = state.cartItems.reduce(
          (sum, item) => sum + (item.cartQuantity || 1),
          0
        );
        state.cartTotalAmount = state.cartItems.reduce(
          (sum, item) => sum + item.saleprice * (item.cartQuantity || 1),
          0
        );
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      })
      .addCase(getAllCartsd.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export const {
  addToCart,
  decreaseCart,
  removeFromCart,
  getTotals,
  clearCart,
  updatecartCount,
  changeSizeintoCart,
  setCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
