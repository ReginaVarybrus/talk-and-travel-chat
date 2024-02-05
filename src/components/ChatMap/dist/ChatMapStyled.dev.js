"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapWrapper = exports.MainMapBlock = exports.ShowCountry = exports.CountryName = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _MapContainer = require("react-leaflet/MapContainer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n    width: 90vw;\n    height: 90vh;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    position: absolute;\n    left: 50%;\n    bottom: 30px;\n    transform: translate(-50%, 0);\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    position: absolute;\n    left: 50%;\n    bottom: 30px;\n    transform: translate(-50%, 0);\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var CountryName = _styledComponents["default"].h2(_templateObject());

exports.CountryName = CountryName;

var ShowCountry = _styledComponents["default"].h2(_templateObject2());

exports.ShowCountry = ShowCountry;

var MainMapBlock = _styledComponents["default"].div(_templateObject3());

exports.MainMapBlock = MainMapBlock;
var MapWrapper = (0, _styledComponents["default"])(_MapContainer.MapContainer)(_templateObject4());
exports.MapWrapper = MapWrapper;