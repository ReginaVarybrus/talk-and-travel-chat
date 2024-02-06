"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonSendMessage = exports.VisuallyHiddenInput = exports.ButtonAttachFile = exports.TextareaAutosize = exports.MessageBar = exports.MessageBarWrapper = exports.MessageBlock = exports.HeaderContent = exports.Header = exports.Wrapper = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Button = _interopRequireDefault(require("@mui/material/Button"));

var _TextareaAutosize = require("@mui/base/TextareaAutosize");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n  min-width: 48px;\n  height: 48px;\n  background: var(--white-color);\n  border-radius: 8px;\n  cursor: pointer;\n  border: ", ";\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n  clip: rect(0 0 0 0);\n  clipPath: inset(50%);\n  height: 1;\n  overflow: hidden;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  whiteSpace: nowrap;\n  width: 1;\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  min-width: 48px;\n  height: 48px;\n  background: var(--white-color);\n  border: 1px solid var(--color-grey-6);\n  border-radius: 8px;\n  cursor: pointer;\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  box-sizing: border-box;\n  width: 100%;\n  max-height: 200px; \n  margin-left: 16px;\n  margin-right: 16px;\n  font-size: 0.875rem;\n  font-weight: 400;\n  line-height: 1.5;\n  padding: 13.2px 16px;\n  border-radius: 8px;\n  color: var(--color-grey-8);\n  border: 1px solid var(--color-grey-6);\n  resize: none;\n  outline: none;\n\n  &::placeholder {\n    font-size: 16px;\n    font-weight: 400;\n    line-height: 19px;\n    color: var(--color-grey-7);\n  }\n\n  &:focus {\n    border: 1px solid var(--color-grey-8);\n    &::placeholder {\n      color: transparent;\n    }\n  }\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: space-between;\n  align-items: end;\n  margin: 32px;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  min-height: 112px;\n  max-height: 444px;\n  background: var(--white-color);\n  border-top: 1px solid var(--color-grey-6);\n  width: 100%;\n  transition: height 0.3s ease;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  flex-grow: 1;\n  width: 100%;\n  background: var(--color-grey-3);\n  transition: height 0.3s ease;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  padding-left: 32px;\n  p {\n    font-size: 14px;\n    font-weight: 400;\n    line-height: 20px;\n    color: var(--color-grey-9);\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: start;\n  width: 100%;\n  min-height: 75px;\n  background: var(--white-color);\n  border-bottom: 1px solid var(--color-grey-6);\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n  min-height: 100vh;\n  background: var(--white-color);\n  position: relative;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Wrapper = _styledComponents["default"].div(_templateObject());

exports.Wrapper = Wrapper;

var Header = _styledComponents["default"].header(_templateObject2());

exports.Header = Header;

var HeaderContent = _styledComponents["default"].div(_templateObject3());

exports.HeaderContent = HeaderContent;

var MessageBlock = _styledComponents["default"].div(_templateObject4());

exports.MessageBlock = MessageBlock;

var MessageBarWrapper = _styledComponents["default"].footer(_templateObject5());

exports.MessageBarWrapper = MessageBarWrapper;

var MessageBar = _styledComponents["default"].div(_templateObject6());

exports.MessageBar = MessageBar;
var TextareaAutosize = (0, _styledComponents["default"])(_TextareaAutosize.TextareaAutosize)(_templateObject7());
exports.TextareaAutosize = TextareaAutosize;
var ButtonAttachFile = (0, _styledComponents["default"])(_Button["default"])(_templateObject8());
exports.ButtonAttachFile = ButtonAttachFile;

var VisuallyHiddenInput = _styledComponents["default"].input(_templateObject9());

exports.VisuallyHiddenInput = VisuallyHiddenInput;

var ButtonSendMessage = _styledComponents["default"].button(_templateObject10(), function (props) {
  return props.border ? '1px solid var(--color-brand-blue)' : '1px solid var(--color-grey-6)';
});

exports.ButtonSendMessage = ButtonSendMessage;