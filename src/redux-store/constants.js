const ULRs = {
  register: 'authentication/register',
  login: 'authentication/login',
  logout: 'authentication/logout',
  currentUser: 'current',
  updateUser: 'users',
  getMainCountryChatByName: countryName => `chats/${countryName}/main`,
  userCountries: userId => `countries/user/${userId}`,
  subscriptionToGroupMessages: chatId => `/countries/${chatId}/messages`,
  subscriptionToGroupEvents: chatId => `/countries/${chatId}/events`,
  subscriptionToUserErrors: userId => `/user/${userId}/errors`,
  joinToGroupChat: '/chat/events.joinChat',
  leaveOutGroupChat: '/chat/events.leaveChat',
  startTyping: '/chat/events.startTyping',
  stopTyping: '/chat/events.stopTyping',
};

export default ULRs;
