const ULRs = {
  register: 'authentication/register',
  login: 'authentication/login',
  logout: 'authentication/logout',
  currentUser: 'current',
  updateUser: 'users',
  userInfo: userId => `users/${userId}`,
  getMainCountryChatByName: countryName =>
    `v2/country/${countryName}/main-chat`,
  userCountries: 'v2/user/countries',
  subscriptionToMessages: chatId => `/countries/${chatId}/messages`,
  subscriptionToUserErrors: userId => `/user/${userId}/errors`,
  getChatsParticipants: chatId => `/chats/${chatId}/users`,
  lastReadMessage: chatId => `/chats/${chatId}/messages/last-read`,
  joinToGroupChat: '/chat/events.joinChat',
  leaveOutGroupChat: '/chat/events.leaveChat',
  startTyping: '/chat/events.startTyping',
  stopTyping: '/chat/events.stopTyping',
  updateOnlineStatus: '/auth-user/events.updateOnlineStatus',
  getPrivateChats: 'v2/user/private-chats',
  createPrivateChat: 'chats/private',
  getChatsMessages: chatId => `chats/${chatId}`,
  usersOnlineStatus: '/users/onlineStatus',
  getUsersOnlineStatusPath: 'v2/users/online',
};

export default ULRs;
