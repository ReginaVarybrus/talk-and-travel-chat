const ULRs = {
  register: 'authentication/register',
  login: 'authentication/login',
  logout: 'authentication/logout',
  currentUser: 'current',
  updateUser: 'users',
  userInfo: userId => `users/${userId}`,
  // getMainCountryChatByName: countryName => `chats/${countryName}/main`,
  getMainCountryChatByName: countryName =>
    `v2/country/${countryName}/main-chat`,

  // userCountries: userId => `countries/user/${userId}`,
  userCountries: 'v2/user/countries',
  subscriptionToMessages: chatId => `/countries/${chatId}/messages`,
  subscriptionToUserErrors: userId => `/user/${userId}/errors`,
  getChatsParticipants: chatId => `/chats/${chatId}/users`,
  lastReadMessage: chatId => `/chats/${chatId}/messages/last-read`,
  joinToGroupChat: '/chat/events.joinChat',
  leaveOutGroupChat: '/chat/events.leaveChat',
  startTyping: '/chat/events.startTyping',
  stopTyping: '/chat/events.stopTyping',
  // getPrivateChats: userId => `chats/user/${userId}/private`,
  getPrivateChats: 'v2/user/private-chats',

  createPrivateChat: 'chats/private',
  getChatsMessages: chatId => `chats/${chatId}`,
};

export default ULRs;
