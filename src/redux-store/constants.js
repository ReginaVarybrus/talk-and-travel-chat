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
  getChat: chatId => `chats/${chatId}`,
  subscriptionToMessages: chatId => `/countries/${chatId}/messages`,
  subscriptionToUserErrors: userId => `/user/${userId}/errors`,
  getChatsParticipants: chatId => `/chats/${chatId}/users`,
  lastReadMessage: chatId => `/chats/${chatId}/messages/last-read`,
  getReadMessages: chatId => `/chats/${chatId}/messages/read`,
  getUnreadMessages: chatId => `/chats/${chatId}/messages/unread`,
  getMessages: chatId => `/chats/${chatId}/messages`,
  joinToGroupChat: '/chat/events.joinChat',
  leaveOutGroupChat: '/chat/events.leaveChat',
  startTyping: '/chat/events.startTyping',
  stopTyping: '/chat/events.stopTyping',
  getPrivateChats: 'v2/user/private-chats',
  createPrivateChat: 'chats/private',
};

export default ULRs;
