import { createSlice } from '@reduxjs/toolkit';
import
{
  fetchCurrentUser,
  updateUser,
} from '@/redux-store/UserOperations/UserOperations';

const initialState = {
  id: null,
  userName: '',
  userEmail: '',
  password: null,
  avatar: null,

};

const handlePending = state => ({
  ...state,
  isRefresh: true,
});

const handleRejected = (state, action) => ({
  ...state,
  isRefresh: false,
  error: action.payload,
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action) => ({
      ...state,
      ...action.payload.userDto,
    }),
    clearUser: (state) =>
      ({ ...state, ...initialState }),
  },
  extraReducers: builder =>
    builder
      .addCase(fetchCurrentUser.pending, handlePending)
      .addCase(fetchCurrentUser.rejected, handleRejected)
      .addCase(fetchCurrentUser.fulfilled, (state, action) => ({
        ...state,
        userDto: action.payload.userDto,
        isLoggedIn: true,
        isRefresh: false,
      }))

      .addCase(updateUser.fulfilled, (state, action) => ({
        ...state,
        userDto: { ...state.userDto, ...action.payload },
      })),
});

export const { setUsers, clearUser } = userSlice.actions;

export default userSlice.reducer;
