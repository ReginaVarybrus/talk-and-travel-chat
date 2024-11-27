const URLs = {
  // HTTP endpoints
  // Auth operations
  register: 'authentication/register',
  registerWithSocial: 'authentication/social/register',
  login: 'authentication/login',
  loginWithSocial: 'authentication/social/login',
  logout: 'authentication/logout',
  passwordRecovery: 'authentication/password-recovery',
  verifyEmail: 'authentication/registration-confirmation',

  // User operations
  currentUser: 'current',
  updateUser: 'users',
  usersAvatarUrl: `/v2/user/avatar`,
  getUsersOnlineStatusPath: 'v2/users/online',

  // Other http endpoints
  userInfo: userId => `users/${userId}`,
  getMainCountryChatByName: countryName =>
    `v2/country/${countryName}/main-chat`,
  getChat: chatId => `chats/${chatId}`,
  getChatsParticipants: chatId => `/chats/${chatId}/users`,
  lastReadMessage: chatId => `/chats/${chatId}/messages/last-read`,
  getReadMessages: chatId => `/chats/${chatId}/messages/read`,
  getUnreadMessages: chatId => `/chats/${chatId}/messages/unread`,
  getMessages: chatId => `/chats/${chatId}/messages`,
  getPrivateChats: 'v2/user/private-chats',
  createPrivateChat: 'chats/private',
  getAllUsers: 'v2/users',

  // websocket connection
  subscriptionToMessages: chatId => `/notify/chat/${chatId}/messages`,
  subscriptionToUserErrors: userId => `/notify/user/${userId}/errors`,
  getCountries: 'v2/main-countries-chats',
  getUserCountriesChats: '/v2/user/public-chats',
  getPrivateChats: 'v2/user/private-chats',
  createPrivateChat: 'chats/private',
  getAllUsers: 'v2/users',

  // WS endpoints
  subscriptionToMessages: chatId => `/notify/chat/${chatId}/messages`,
  subscriptionToUserErrors: userId => `/notify/user/${userId}/errors`,
  usersOnlineStatus: '/notify/users/onlineStatus',
  sendMessage: '/request/chat/messages',
  joinToGroupChat: '/request/chat/events.joinChat',
  leaveOutGroupChat: '/request/chat/events.leaveChat',
  startTyping: '/request/chat/events.startTyping',
  stopTyping: '/request/chat/events.stopTyping',
  usersOnlineStatus: '/notify/users/onlineStatus',
  updateOnlineStatus: '/request/auth-user/events.updateOnlineStatus',
};

export default URLs;
