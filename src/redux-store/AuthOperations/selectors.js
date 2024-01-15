export const getIsLoggedIn = state => state.auth.isLoggedIn;
export const getUserId = state => state.auth.userDto.id;
export const getUserName = state => state.auth.userDto.userName;
export const getUserEmail = state => state.auth.userDto.userEmail;
export const getUserPassword = state => state.auth.userDto.password;
export const getVerifyToken = state => state.auth.userDto.verificationToken;
export const getUserRefresh = state => state.auth.isRefresh;
export const getUser = state => state.auth;
