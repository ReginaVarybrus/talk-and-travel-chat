"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logo = exports.LogoBlock = exports.ChatWrapper = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  width: 240px;\n  height: 200px;\n  margin-bottom: 16px;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  & > p {\n    color: var(--color-dark);\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  max-height: 100vh;\n  margin: 0 auto;\n  background: var(--white-color);\n\n  @media screen and (min-width: 375px) {\n    max-width: 375px;\n  }\n  @media screen and (min-width: 768px) {\n    max-width: 1440px;\n  }\n  @media screen and (min-width: 1440px) {\n    max-width: 1920px;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ChatWrapper = _styledComponents["default"].div(_templateObject());

exports.ChatWrapper = ChatWrapper;

var LogoBlock = _styledComponents["default"].div(_templateObject2());

exports.LogoBlock = LogoBlock;

var Logo = _styledComponents["default"].img(_templateObject3());

exports.Logo = Logo;