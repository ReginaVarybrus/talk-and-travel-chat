import { describe } from 'vitest';

import {
  getIsLoggedIn,
  getUserId,
  getUserName,
  getUserEmail,
  getUserPassword,
  getUserRefresh,
  getUser,
  getPersistedToken,
  getCountryName,
  getNumberOfParticipants,
  getCountryRooms,
} from '../selectors.js';

describe('selectors', () => {
  const state = {
    auth: {
      token: '1kjlkjlk23.hjjhvv.3654jhkjgjhg',
      isLoggedIn: true,
      userDto: {
        id: '2',
        userName: 'TestUser',
        userEmail: 'user@test.com',
        password: 'Test!234',
      },
      isRefresh: true,
      name: 'Ukraine',
      participants: '10',
    },
    room: {
      countryRooms: ['Ukraine', 'Ireland'],
    },
  };

  it('should return correct token', () => {
    const token = getPersistedToken(state);
    expect(token).toEqual('1kjlkjlk23.hjjhvv.3654jhkjgjhg');
  });

  it('should return correct isLoggedIn value', () => {
    const isLoggedIn = getIsLoggedIn(state);
    expect(isLoggedIn).toEqual(true);
  });

  it('should return correct userId', () => {
    const userId = getUserId(state);
    expect(userId).toEqual('2');
  });

  it('should return correct userName', () => {
    const userName = getUserName(state);
    expect(userName).toEqual('TestUser');
  });

  it('should return correct userEmail', () => {
    const userEmail = getUserEmail(state);
    expect(userEmail).toEqual('user@test.com');
  });

  it('should return correct password', () => {
    const userPassword = getUserPassword(state);
    expect(userPassword).toEqual('Test!234');
  });

  it('should return correct isRefresh value', () => {
    const userRefresh = getUserRefresh(state);
    expect(userRefresh).toEqual(true);
  });

  it('should return correct User data', () => {
    const user = getUser(state);
    expect(user).toEqual({
      token: '1kjlkjlk23.hjjhvv.3654jhkjgjhg',
      isLoggedIn: true,
      userDto: {
        id: '2',
        userName: 'TestUser',
        userEmail: 'user@test.com',
        password: 'Test!234',
      },
      isRefresh: true,
      name: 'Ukraine',
      participants: '10',
    });
  });

  it('should return correct countryRoom', () => {
    const countryRoom = getCountryName(state);
    expect(countryRoom).toEqual('Ukraine');
  });

  it('should return correct number of partisipants', () => {
    const numberOfParticipants = getNumberOfParticipants(state);
    expect(numberOfParticipants).toEqual('10');
  });

  it('should return correct countryRooms', () => {
    const countryRooms = getCountryRooms(state);
    expect(countryRooms).toEqual(['Ukraine', 'Ireland']);
  });
});
