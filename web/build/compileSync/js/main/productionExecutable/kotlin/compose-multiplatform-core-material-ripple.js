(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports'], factory);
  else if (typeof exports === 'object')
    factory(module.exports);
  else
    root['compose-multiplatform-core-material-ripple'] = factory(typeof this['compose-multiplatform-core-material-ripple'] === 'undefined' ? {} : this['compose-multiplatform-core-material-ripple']);
}(this, function (_) {
  'use strict';
  //region block: pre-declaration
  //endregion
  return _;
}));

//# sourceMappingURL=compose-multiplatform-core-material-ripple.js.map
