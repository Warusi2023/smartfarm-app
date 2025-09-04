(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'kotlinx.coroutines-kotlinx-coroutines-test-js-ir'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'kotlinx.coroutines-kotlinx-coroutines-test-js-ir'.");
    }
    root['kotlinx.coroutines-kotlinx-coroutines-test-js-ir'] = factory(typeof this['kotlinx.coroutines-kotlinx-coroutines-test-js-ir'] === 'undefined' ? {} : this['kotlinx.coroutines-kotlinx-coroutines-test-js-ir'], this['kotlin-kotlin-stdlib']);
  }
}(this, function (_, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var Companion_getInstance = kotlin_kotlin.$_$.w4;
  var DurationUnit_SECONDS_getInstance = kotlin_kotlin.$_$.j;
  var toDuration = kotlin_kotlin.$_$.og;
  //endregion
  //region block: pre-declaration
  //endregion
  function get_DEFAULT_TIMEOUT() {
    _init_properties_TestBuilders_kt__o1twne();
    return DEFAULT_TIMEOUT;
  }
  var DEFAULT_TIMEOUT;
  var properties_initialized_TestBuilders_kt_4e1btg;
  function _init_properties_TestBuilders_kt__o1twne() {
    if (!properties_initialized_TestBuilders_kt_4e1btg) {
      properties_initialized_TestBuilders_kt_4e1btg = true;
      // Inline function 'kotlin.time.Companion.seconds' call
      Companion_getInstance();
      DEFAULT_TIMEOUT = toDuration(10, DurationUnit_SECONDS_getInstance());
    }
  }
  function set_catchNonTestRelatedExceptions(_set____db54di) {
    catchNonTestRelatedExceptions = _set____db54di;
  }
  function get_catchNonTestRelatedExceptions() {
    return catchNonTestRelatedExceptions;
  }
  var catchNonTestRelatedExceptions;
  //region block: init
  catchNonTestRelatedExceptions = true;
  //endregion
  return _;
}));
