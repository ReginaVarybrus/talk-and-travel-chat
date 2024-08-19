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
  joinToGroupChat: '/chat/events.joinChat',
  getChatsMembers: chatId => `/chats/${chatId}/users`,
};

export default ULRs;
