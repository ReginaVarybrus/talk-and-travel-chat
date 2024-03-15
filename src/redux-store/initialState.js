const initialState = {
  token: null,
  userDto: {
    userName: '',
    userEmail: '',
    avatar: '',
  },
  name: '',
  flagCode: '',
  userId: '',
  countryRooms: [],

  isLoggedIn: false,
  isRefresh: true,
  error: null,
};

export default initialState;
