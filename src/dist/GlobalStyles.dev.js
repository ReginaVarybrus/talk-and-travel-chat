"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlobalStyles = void 0;

var _styledComponents = require("styled-components");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n/* styled-components */\n\n/* !!!\u0414\u043E\u0434\u0430\u0442\u0438 \u0441\u0442\u0438\u043B\u0456 \u043F\u0456\u0441\u043B\u044F \u0437\u0430\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043D\u044F \u043C\u0430\u043A\u0435\u0442\u0443!!! */\n\n:root {\n  --color-success: #33d844;\n  --color-error: #d83333;\n  --color-info: #569aff;\n\n  --white-color: #ffffff;\n  --color-grey-2: #fdfdfd;\n  --color-grey-3: #f6f6f6;\n  --color-grey-4: #f2f2f2;\n  --color-grey-5: #dedede;\n  --color-grey-6: #c8c8c8;\n  --color-grey-7: #9c9c9c;\n  --color-grey-8: #6f6f6f;\n  --color-grey-9: #5e5e5e;\n  --color-grey-10: #434343;\n  --color-grey-11: #3d3d3d;\n  --color-grey-12: #343434;\n  --color-dark: #222222;\n\n  --color-blue-1: #e9f0fb;\n  --color-blue-2: #cbdbf4;\n  --color-blue-3: #a1bfec;\n  --color-blue-4: #76a1e3;\n  --color-blue-5: #4c85da;\n  --color-brand-blue: #256ad2;\n  --color-blue-7: #1f5ab3;\n  --color-blue-8: #1a4b95;\n  --color-blue-9: #153c78;\n  --color-blue-10: #11305e;\n}\n\n@font-face {\n  font-family: \"Inter\";\n  font-style: normal;\n  font-weight: 500;\n  src: local(\"Inter Medium\"),\n        local(\"Inter-Medium\"),\n        url(\"fonts/Inter-Medium.ttf\") format(\"ttf\");\n  font-display: swap;\n}\n@font-face {\n  font-family: \"Inter\";\n  font-style: normal;\n  font-weight: 600;\n  src: local(\"Inter SemiBold\"),\n        local(\"Inter-SemiBold\"),\n        url(\"fonts/Inter-SemiBold.ttf\") format(\"ttf\");\n  font-display: swap;\n}\n@font-face {\n  font-family: \"Inter\";\n  font-style: normal;\n  font-weight: 700;\n  src: local(\"Inter Bold\"),\n        local(\"Inter-Bold\"),\n        url(\"fonts/Inter-Bold.ttf\") format(\"ttf\");\n  font-display: swap;\n}\n\n@font-face {\n  font-family: \"Coolvetica\";\n    font-style: italic;\n  font-weight: 400;\n  src: local(\"Coolvetica Regular\"),\n        local(\"Coolvetica-Regular\"),\n        url(\"fonts/Coolvetica-Regular.ttf\") format(\"ttf\");\n  font-display: swap;\n} */\n\nbody {\n  margin: 0;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  background-color: var(--outlet-background-color);\n}\n\ncode {\n  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',\n    monospace;\n}\n\nul {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n\nli{\n    list-style: none;\n    margin: 0;\n    padding: 0;\n    text-decoration: none;\n}\n\nh1,h2,h3,h4,h5,h6,p{\n  margin: 0;\n  padding: 0;\n}\n\nh5 {\n  font-size: 16px;\n  font-weight: 700;\n  line-height: 19px;\n} \n\nh6 {\n  font-size: 18px;\n  font-weight: 400;\n  line-height: 21.6px;\n  color: var(--color-dark);\n}\n\nsvg{\n  margin: 0;\n  padding: 0;\n}\nul{\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\np{\n  margin: 0;\n  padding: 0;\n}\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var GlobalStyles = (0, _styledComponents.createGlobalStyle)(_templateObject());
exports.GlobalStyles = GlobalStyles;