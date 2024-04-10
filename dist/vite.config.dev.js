"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vite = require("vite");

var _pluginReact = _interopRequireDefault(require("@vitejs/plugin-react"));

var _viteTsconfigPaths = _interopRequireDefault(require("vite-tsconfig-paths"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/// <reference types="vitest" />
/// <reference types="vite/client" />
var _default = (0, _vite.defineConfig)({
  base: process.env.NODE_ENV === 'production' ? '/talk-and-travel-chat/' : '/',
  plugins: [(0, _pluginReact["default"])({
    babel: {
      plugins: [['babel-plugin-styled-components', {
        displayname: true,
        filename: false
      }]]
    }
  }), (0, _viteTsconfigPaths["default"])()],
  build: {
    commonjsOptions: {
      include: [/node_modules/]
    }
  },
  server: {
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 3000
    port: 3000
  },
  resolve: {
    alias: {
      '@': _path["default"].resolve(__dirname, './src')
    },
    preserveSymlinks: true
  }
});

exports["default"] = _default;