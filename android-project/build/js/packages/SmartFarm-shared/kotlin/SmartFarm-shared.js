(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports'], factory);
  else if (typeof exports === 'object')
    factory(module.exports);
  else
    root['SmartFarm:shared'] = factory(typeof this['SmartFarm:shared'] === 'undefined' ? {} : this['SmartFarm:shared']);
}(this, function (_) {
  'use strict';
  //region block: pre-declaration
  //endregion
  return _;
}));

//# sourceMappingURL=SmartFarm-shared.js.map
