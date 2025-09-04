(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'SmartFarm:web'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'SmartFarm:web'.");
    }
    root['SmartFarm:web'] = factory(typeof this['SmartFarm:web'] === 'undefined' ? {} : this['SmartFarm:web'], this['kotlin-kotlin-stdlib']);
  }
}(this, function (_, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var println = kotlin_kotlin.$_$.c;
  //endregion
  //region block: pre-declaration
  //endregion
  function main() {
    println('SmartFarm Web App Starting...');
  }
  main();
  return _;
}));

//# sourceMappingURL=SmartFarm-web.js.map
