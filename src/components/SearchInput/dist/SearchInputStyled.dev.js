"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Flag = exports.Item = exports.ListItems = exports.ListWrapper = exports.IconSearch = exports.AutocompleteInput = exports.AutocompleteInputWrapper = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  width: 32px;\n  height: 24px;\n  padding-right: 12px;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  height: 72px;\n  padding: 0 16px;\n  background: var(--white-color);\n  &:hover {\n    background: var(--color-grey-3);\n  }\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  width: 299.4px;\n  height: 562px;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 130px;\n  left: -17px;\n  width: 299.4px;\n  height: 600px;\n  margin-bottom: 48px;\n  background: var(--white-color);\n  border-left: 1px solid var(--color-grey-6);\n  border-right: 1px solid var(--color-grey-6);\n  z-index: 10;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 8.5px;\n  left: 16px;\n  width: 16px;\n  height: 16px;\n  padding: 0;\n  border: none;\n  z-index: 1;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  box-sizing: border-box;\n  min-width: 100%;\n  height: 35px;\n  margin-bottom: 25px;\n  padding: 1px 10px 0 40px;\n  border: 1px solid var(--color-grey-7);\n  border-radius: 4px;\n  &::placeholder {\n    font-size: 16px;\n    font-weight: 400;\n    line-height: 19px;\n    color: var(--color-grey-7);\n    margin-top: 20px;\n  }\n  &:focus {\n    outline: none;\n    border: 1px solid var(--color-grey-8);\n    &::placeholder {\n      color: transparent;\n    }\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  min-width: 100%;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var AutocompleteInputWrapper = _styledComponents["default"].div(_templateObject());

exports.AutocompleteInputWrapper = AutocompleteInputWrapper;

var AutocompleteInput = _styledComponents["default"].input(_templateObject2());

exports.AutocompleteInput = AutocompleteInput;

var IconSearch = _styledComponents["default"].div(_templateObject3());

exports.IconSearch = IconSearch;

var ListWrapper = _styledComponents["default"].div(_templateObject4());

exports.ListWrapper = ListWrapper;

var ListItems = _styledComponents["default"].ul(_templateObject5());

exports.ListItems = ListItems;

var Item = _styledComponents["default"].li(_templateObject6());

exports.Item = Item;

var Flag = _styledComponents["default"].img(_templateObject7());

exports.Flag = Flag;