"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.persistor = exports.store = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _reduxPersist = require("redux-persist");

var _storage = _interopRequireDefault(require("redux-persist/lib/storage"));

var _authSlice = require("redux-store/slices/authSlice");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import rootReducer from './rootReducer';
_axios["default"].interceptors.request.use(function (request) {
  console.log('Starting Request', request);
  return request;
});

_axios["default"].interceptors.response.use(function (response) {
  console.log('Response:', response);
  return response;
});

var authPersistConfig = {
  key: 'auth',
  storage: _storage["default"],
  whitelist: ['token', 'userDto', 'countryDto']
}; // const persistedReducer = persistReducer(authPersistConfig, rootReducer);

var store = (0, _toolkit.configureStore)({
  reducer: {
    auth: (0, _reduxPersist.persistReducer)(authPersistConfig, _authSlice.authSlice.reducer)
  },
  middleware: function middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [_reduxPersist.FLUSH, _reduxPersist.REHYDRATE, _reduxPersist.PAUSE, _reduxPersist.PERSIST, _reduxPersist.PURGE, _reduxPersist.REGISTER]
      }
    });
  }
});
exports.store = store;
var persistor = (0, _reduxPersist.persistStore)(store);
exports.persistor = persistor;