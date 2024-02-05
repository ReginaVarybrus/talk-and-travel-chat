"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Flag = exports.Item = exports.ListItems = exports.Text = exports.Wrapper = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  width: 32px;\n  height: 24px;\n  padding-right: 12px;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  height: 72px;\n  padding: 0 16px;\n  background: var(--white-color);\n  &:hover {\n    background: var(--color-blue-1);\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  width: 299.4px;\n  height: 562px;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  text-align: center;\n  font-size: 14px;\n  color: var(--color-grey-9);\n  margin: 0 16px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  justify-content: start;\n  align-items: center;\n  width: 300px;\n  height: 100vh;\n  /* background: var(--color-blue-1); */\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Wrapper = _styledComponents["default"].div(_templateObject());

exports.Wrapper = Wrapper;

var Text = _styledComponents["default"].p(_templateObject2());

exports.Text = Text;

var ListItems = _styledComponents["default"].ul(_templateObject3());

exports.ListItems = ListItems;

var Item = _styledComponents["default"].li(_templateObject4());

exports.Item = Item;

var Flag = _styledComponents["default"].img(_templateObject5());

exports.Flag = Flag;