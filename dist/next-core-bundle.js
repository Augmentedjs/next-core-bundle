!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("next-core-bundle",[],t):"object"==typeof exports?exports["next-core-bundle"]=t():e["next-core-bundle"]=t()}(this,function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/dist/",r(r.s=0)}([function(e,t,r){"use strict";var n=r(1);e.exports.BundleObject=n.BundleObject,e.exports.ResourceBundle=n.ResourceBundle,e.exports.MessageReader=n.MessageReader,e.exports.MessageKeyFormatter=n.MessageKeyFormatter},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.BundleObject={name:"",mode:"both",cache:!0};class n{constructor(){}static getBundle(){return{}}static getString(){return""}}t.ResourceBundle=n;t.MessageReader=class{constructor(){}static getMessage(e){let t=n.getString(e),r=e.length,o=e;for(;r>0&&t=="["+e+"]";)r=e.lastIndexOf("."),e=e.substring(0,r),t=n.getString(e);return e?t:"["+o+"]"}};t.MessageKeyFormatter=class{constructor(){this.delimiter="."}static format(e){let t="";return e&&e.level&&(t+=e.level,e.kind&&(t+=this.delimiter+e.kind,e.rule&&(t+=this.delimiter+e.rule,e.values.title&&(t+=this.delimiter+e.values.title)))),t||""}}}])});
//# sourceMappingURL=next-core-bundle.js.map