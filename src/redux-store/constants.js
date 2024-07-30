const ULRs = {
  register: 'authentication/register',
  login: 'authentication/login',
  logout: 'authentication/logout',
  currentUser: 'current',
  updateUser: 'users',
  userCountries: userId => `countries/all-by-user/${userId}/participating`,
  userAvatart: userId => `avatars/user/${userId}`,
  joinToCountryRoom: countryName => `countries/${countryName}/join`,
};

export default ULRs;
