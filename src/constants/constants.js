const URLs = {
  // Auth
  register: 'authentication/register',
  login: 'authentication/login',
  logout: 'authentication/logout',
  passwordRecovery: 'authentication/password-recovery',

  // User operations
  currentUser: 'current',
  updateUser: 'users',
  usersAvatarUrl: `/v2/user/avatar`,

  getCountries: 'v2/main-countries-chats',
  userInfo: userId => `users/${userId}`,
  getMainCountryChatByName: countryName =>
    `v2/country/${countryName}/main-chat`,
  userCountries: '/v2/user/public-chats',
  getChat: chatId => `chats/${chatId}`,
  subscriptionToMessages: chatId => `/notify/chat/${chatId}/messages`,
  subscriptionToUserErrors: userId => `/notify/user/${userId}/errors`,
  getChatsParticipants: chatId => `/chats/${chatId}/users`,
  lastReadMessage: chatId => `/chats/${chatId}/messages/last-read`,
  getReadMessages: chatId => `/chats/${chatId}/messages/read`,
  getUnreadMessages: chatId => `/chats/${chatId}/messages/unread`,
  getMessages: chatId => `/chats/${chatId}/messages`,
  sendMessage: '/request/chat/messages',
  joinToGroupChat: '/request/chat/events.joinChat',
  leaveOutGroupChat: '/request/chat/events.leaveChat',
  startTyping: '/request/chat/events.startTyping',
  stopTyping: '/request/chat/events.stopTyping',
  updateOnlineStatus: '/request/auth-user/events.updateOnlineStatus',
  getPrivateChats: 'v2/user/private-chats',
  createPrivateChat: 'chats/private',
  usersOnlineStatus: '/notify/users/onlineStatus',
  getUsersOnlineStatusPath: 'v2/users/online',
  getAllUsers: 'v2/users',
};

export default URLs;
