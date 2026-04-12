import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser as apiLoginUser,getallWishList} from '../../../services/User-service';

// Thunk for user login
export const loginUser = createAsyncThunk('user/login', async (userData, { rejectWithValue }) => {
  try {
    const data = await apiLoginUser(userData);
    
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const initialState = {
  userInfo: JSON.parse(localStorage.getItem('user')) || null,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userregister: (state,action) => {
      switch (action) {
        case action.pending:
            return { loading: true };
        case action.fulfilled:
            return { loading: false, userInfo: action.payload };
        case action.rejected:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
    },
    userupdate: (state,action) => {
      if(action.type='user/userupdate'){
        state.userInfo=action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      }
    },
    logout: (state,action) => {
     
      state.wishlist = null;
      state.userInfo = null;
      state.cart = null;     
      localStorage.removeItem('user');
      localStorage.removeItem('wishlistItems');
      localStorage.removeItem('cartItems');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInfo = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export const { userregister,userupdate,logout } = userSlice.actions;
export default userSlice.reducer;
