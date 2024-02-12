"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.authSlice = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _AuthOperations = require("../AuthOperations/AuthOperations");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  token: null,
  userDto: {
    userName: '',
    userEmail: '',
    avatar: ''
  },
  name: '',
  flagCode: '',
  userId: '',
  countryRooms: [],
  isLoggedIn: false,
  isRefresh: true,
  error: null
};

var handlePending = function handlePending(state) {
  state.isRefresh = true;
};

var handleRejected = function handleRejected(state, action) {
  state.isRefresh = false;
  state.error = action.payload;
};

var authSlice = (0, _toolkit.createSlice)({
  name: 'auth',
  initialState: initialState,
  extraReducers: function extraReducers(builder) {
    return builder.addCase(_AuthOperations.register.pending, handlePending).addCase(_AuthOperations.register.rejected, handleRejected).addCase(_AuthOperations.register.fulfilled, function (state, action) {
      return _objectSpread({}, state, {
        userDto: action.payload.userDto,
        token: action.payload.token,
        isLoggedIn: true
      });
    }).addCase(_AuthOperations.logIn.pending, handlePending).addCase(_AuthOperations.logIn.rejected, handleRejected).addCase(_AuthOperations.logIn.fulfilled, function (state, action) {
      console.log('login action', action);
      state.userDto = action.payload.userDto;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.error = null;
    }).addCase(_AuthOperations.logOut.pending, handlePending).addCase(_AuthOperations.logOut.rejected, handleRejected).addCase(_AuthOperations.logOut.fulfilled, function (state) {
      state.userDto = {
        userName: null,
        userEmail: null
      };
      state.token = null;
      state.isLoggedIn = false;
      state.isRefresh = false;
    }).addCase(_AuthOperations.fetchCurrentUser.pending, handlePending).addCase(_AuthOperations.fetchCurrentUser.rejected, handleRejected).addCase(_AuthOperations.fetchCurrentUser.fulfilled, function (state, action) {
      state.userDto = action.payload.userDto;
      state.isLoggedIn = true;
      state.isRefresh = false;
    }).addCase(_AuthOperations.updateUser.fulfilled, function (state, action) {
      state.userDto = _objectSpread({}, state.userDto, {}, action.payload);
    }).addCase(_AuthOperations.sendDataCountryToBackend.pending, handlePending).addCase(_AuthOperations.sendDataCountryToBackend.rejected, function (state, action) {
      console.error('failed with error:', action.error.message);
      console.log('action:', action);
      console.log('action.payload:', action.payload);
      console.log('action.meta.arg:', action.meta.arg);
      handleRejected(state, action);
    }).addCase(_AuthOperations.sendDataCountryToBackend.fulfilled, function (state, action) {
      console.log('Fulfilled Action:', action);
      state.name = action.payload.name;
      state.flagCode = action.payload.flagCode;
      state.isLoggedIn = true;
    });
  }
});
exports.authSlice = authSlice;
var _default = authSlice.reducer;
exports["default"] = _default;