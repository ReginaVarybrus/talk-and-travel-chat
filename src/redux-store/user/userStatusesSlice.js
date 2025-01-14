import { createSlice } from '@reduxjs/toolkit';
import { fetchUsersOnlineStatuses } from '@/redux-store/user/userOperations';

const initialState = {
  statuses: [],
  isLoading: false,
  error: null,
};

export const userStatusesSlice = createSlice({
  name: 'usersStatuses',
  initialState,
  reducers: {
    updateUserStatus: (state, action) => {
      const { userId, status } = action.payload;

      const userIndex = state.statuses.findIndex(
        user => user.userId === userId
      );

      if (userIndex !== -1) {
        state.statuses[userIndex].status.isOnline = status.isOnline;
        state.statuses[userIndex].status.lastSeenOn =
          status.lastSeenOn || new Date().toISOString();
      } else {
        state.statuses.push({
          userId,
          status: {
            isOnline: status.isOnline,
            lastSeenOn: status.lastSeenOn || new Date().toISOString(),
          },
        });
      }
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchUsersOnlineStatuses.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsersOnlineStatuses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchUsersOnlineStatuses.fulfilled, (state, action) => {
        state.statuses = action.payload;
        state.isLoading = false;
      }),
});

export const { updateUserStatus } = userStatusesSlice.actions;

export default userStatusesSlice.reducer;
