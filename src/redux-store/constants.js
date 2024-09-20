const ULRs = {
  register: 'authentication/register',
  login: 'authentication/login',
  logout: 'authentication/logout',
  currentUser: 'current',
  updateUser: 'users',
  userInfo: userId => `users/${userId}`,
  getMainCountryChatByName: countryName => `chats/${countryName}/main`,
  userCountries: userId => `countries/user/${userId}`,
  subscriptionToMessages: chatId => `/countries/${chatId}/messages`,
  subscriptionToUserErrors: userId => `/user/${userId}/errors`,
  getChatsParticipants: chatId => `/chats/${chatId}/users`,
  joinToGroupChat: '/chat/events.joinChat',
  leaveOutGroupChat: '/chat/events.leaveChat',
  startTyping: '/chat/events.startTyping',
  stopTyping: '/chat/events.stopTyping',
  getPrivateChats: userId => `chats/user/${userId}/private`,
  createPrivateChat: 'chats/private',
  getChatsMessages: chatId => `chats/${chatId}`,
};

export default ULRs;
