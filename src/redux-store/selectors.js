export const getIsLoggedIn = state => state.auth.isLoggedIn;
export const getUserRefresh = state => state.auth.isRefresh;
export const getToken = state => state.auth.token;
export const getUser = state => state.user;
export const getAvatar = state => state.user.avatar;

export const getUsersStatuses = state => state.usersStatuses.statuses;
