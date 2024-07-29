const ULRs = {
  register: 'authentication/register',
  login: 'authentication/login',
  logout: 'authentication/logout',
  currentUser: 'current',
  updateUser: 'users',
  userCountries: userId => `countries/all-by-user/${userId}/participating`,
};

export default ULRs;
