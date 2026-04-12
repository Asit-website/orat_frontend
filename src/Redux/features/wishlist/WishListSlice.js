import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getallWishList} from '../../../services/User-service';

export const getWishListd = createAsyncThunk('user/wishlists', async (userData, { rejectWithValue }) => {
  try {
    const data = await getallWishList(userData);
   
    const datawishlist=data.data;
    localStorage.setItem('wishlistItems', JSON.stringify(datawishlist));
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  } 
});

const initialState = {
  wishlistItems: localStorage.getItem("wishlistItems")
  ? JSON.parse(localStorage.getItem("wishlistItems"))
  : [],
  wishlistTotalQuantity: 0,
};

export const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishList(state, action) {
      let tempProductItemw= { ...action.payload, wishlistQuantity: 1 };
      state.wishlistItems.push(tempProductItemw);
      localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistItems));
    },
    removeFromWishList(state, action) {
      const newWishlist = state.wishlistItems.filter(
        (product) => product?.id !== action.payload.id
      );
      state.wishlistItems = newWishlist;
      localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistItems));
    },
    getWishList(state, action) {
      let {  quantity } = state.wishlistItems.reduce(
        (cartTotal,cartItem) => {
          const {  wishlistQuantity,user_id } = cartItem;          
          if(user_id===action.payload?.data?.user?.id){
          cartTotal.quantity += wishlistQuantity;
          }
          
          return cartTotal;
        },
        {
          quantity: 0,
        }
      );
      
      state.wishlistTotalQuantity = quantity;


    },
    removeFromWishListd(state, action) {
      const newWishlist = state.wishlistItems.filter(
        (product) => product?.id !== action.payload.product_id
      );
      state.wishlistItems = newWishlist;
      localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistItems));
    },
    removeAll(state) {
      state.wishlistItems = [];
      localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistItems));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWishListd.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getWishListd.fulfilled, (state, action) => {
        state.status = 'succeeded';        
        state.wishlistItems = action.payload?.data;
        state.wishlistQuantity = action.payload?.data?.length;
        state.wishlistTotalQuantity=action.payload.data?.length;
        localStorage.setItem("wishlistItems", JSON.stringify(action.payload?.data));
      })
      .addCase(getWishListd.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export const { addToWishList, removeFromWishList, removeFromWishListd,removeAll,getWishList } =
  wishListSlice.actions;
export default wishListSlice.reducer;