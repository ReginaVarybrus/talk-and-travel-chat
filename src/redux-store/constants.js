const ULRs = {
  register: 'authentication/register',
  login: 'authentication/login',
  logout: 'authentication/logout',
  currentUser: 'current',
  updateUser: 'users',
  userInfo: userId => `users/${userId}`,
  userCountries: `v2/user/countries`,
  getMainCountryChatByName: countryName =>
    `v2/country/${countryName}/main-chat`,
  subscriptionToMessages: chatId => `/countries/${chatId}/messages`,
  subscriptionToUserErrors: userId => `/user/${userId}/errors`,
  lastReadMessage: chatId => `/chats/${chatId}/messages/last-read`,
  joinToGroupChat: '/chat/events.joinChat',
  leaveOutGroupChat: '/chat/events.leaveChat',
  startTyping: '/chat/events.startTyping',
  stopTyping: '/chat/events.stopTyping',
};

export default ULRs;
