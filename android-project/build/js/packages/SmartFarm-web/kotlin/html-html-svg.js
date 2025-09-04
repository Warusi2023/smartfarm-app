(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports'], factory);
  else if (typeof exports === 'object')
    factory(module.exports);
  else
    root['html-html-svg'] = factory(typeof this['html-html-svg'] === 'undefined' ? {} : this['html-html-svg']);
}(this, function (_) {
  'use strict';
  //region block: pre-declaration
  //endregion
  return _;
}));

//# sourceMappingURL=html-html-svg.js.map
