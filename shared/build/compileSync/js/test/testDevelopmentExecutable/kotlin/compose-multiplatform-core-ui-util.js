(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-ui-util'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'compose-multiplatform-core-ui-util'.");
    }
    root['compose-multiplatform-core-ui-util'] = factory(typeof this['compose-multiplatform-core-ui-util'] === 'undefined' ? {} : this['compose-multiplatform-core-ui-util'], this['kotlin-kotlin-stdlib']);
  }
}(this, function (_, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var Long = kotlin_kotlin.$_$.ch;
  var toLong = kotlin_kotlin.$_$.ld;
  var FloatCompanionObject_getInstance = kotlin_kotlin.$_$.q4;
  var floatFromBits = kotlin_kotlin.$_$.dc;
  var toBits = kotlin_kotlin.$_$.ui;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.o;
  var get_lastIndex = kotlin_kotlin.$_$.r8;
  var compareTo = kotlin_kotlin.$_$.yb;
  var roundToInt = kotlin_kotlin.$_$.sd;
  //endregion
  //region block: pre-declaration
  //endregion
  function unpackInt1(value) {
    return value.shr_9fl3wl_k$(32).toInt_1tsl84_k$();
  }
  function unpackInt2(value) {
    return value.and_4spn93_k$(new Long(-1, 0)).toInt_1tsl84_k$();
  }
  function packInts(val1, val2) {
    return toLong(val1).shl_bg8if3_k$(32).or_v7fvkl_k$(toLong(val2).and_4spn93_k$(new Long(-1, 0)));
  }
  function unpackFloat1(value) {
    // Inline function 'kotlin.fromBits' call
    FloatCompanionObject_getInstance();
    var bits = value.shr_9fl3wl_k$(32).toInt_1tsl84_k$();
    return floatFromBits(bits);
  }
  function unpackFloat2(value) {
    // Inline function 'kotlin.fromBits' call
    FloatCompanionObject_getInstance();
    var bits = value.and_4spn93_k$(new Long(-1, 0)).toInt_1tsl84_k$();
    return floatFromBits(bits);
  }
  function packFloats(val1, val2) {
    var v1 = toLong(toBits(val1));
    var v2 = toLong(toBits(val2));
    return v1.shl_bg8if3_k$(32).or_v7fvkl_k$(v2.and_4spn93_k$(new Long(-1, 0)));
  }
  function fastForEach(_this__u8e3s4, action) {
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable = 0;
    var last = _this__u8e3s4.get_size_woubt6_k$() - 1 | 0;
    if (inductionVariable <= last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var item = _this__u8e3s4.get_c1px32_k$(index);
        action(item);
      }
       while (inductionVariable <= last);
  }
  function fastAny(_this__u8e3s4, predicate) {
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.ui.util.fastForEach' call
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable = 0;
    var last = _this__u8e3s4.get_size_woubt6_k$() - 1 | 0;
    if (inductionVariable <= last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var item = _this__u8e3s4.get_c1px32_k$(index);
        // Inline function 'androidx.compose.ui.util.fastAny.<anonymous>' call
        if (predicate(item))
          return true;
      }
       while (inductionVariable <= last);
    return false;
  }
  function fastMap(_this__u8e3s4, transform) {
    // Inline function 'kotlin.contracts.contract' call
    var target = ArrayList_init_$Create$(_this__u8e3s4.get_size_woubt6_k$());
    // Inline function 'androidx.compose.ui.util.fastForEach' call
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable = 0;
    var last = _this__u8e3s4.get_size_woubt6_k$() - 1 | 0;
    if (inductionVariable <= last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var item = _this__u8e3s4.get_c1px32_k$(index);
        // Inline function 'androidx.compose.ui.util.fastMap.<anonymous>' call
        // Inline function 'kotlin.collections.plusAssign' call
        var element = transform(item);
        target.add_utx5q5_k$(element);
      }
       while (inductionVariable <= last);
    return target;
  }
  function fastForEachReversed(_this__u8e3s4, action) {
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable = _this__u8e3s4.get_size_woubt6_k$() - 1 | 0;
    if (0 <= inductionVariable)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + -1 | 0;
        var item = _this__u8e3s4.get_c1px32_k$(index);
        action(item);
      }
       while (0 <= inductionVariable);
  }
  function fastAll(_this__u8e3s4, predicate) {
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.ui.util.fastForEach' call
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable = 0;
    var last = _this__u8e3s4.get_size_woubt6_k$() - 1 | 0;
    if (inductionVariable <= last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var item = _this__u8e3s4.get_c1px32_k$(index);
        // Inline function 'androidx.compose.ui.util.fastAll.<anonymous>' call
        if (!predicate(item))
          return false;
      }
       while (inductionVariable <= last);
    return true;
  }
  function fastFirstOrNull(_this__u8e3s4, predicate) {
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.ui.util.fastForEach' call
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable = 0;
    var last = _this__u8e3s4.get_size_woubt6_k$() - 1 | 0;
    if (inductionVariable <= last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var item = _this__u8e3s4.get_c1px32_k$(index);
        // Inline function 'androidx.compose.ui.util.fastFirstOrNull.<anonymous>' call
        if (predicate(item))
          return item;
      }
       while (inductionVariable <= last);
    return null;
  }
  function fastForEachIndexed(_this__u8e3s4, action) {
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable = 0;
    var last = _this__u8e3s4.get_size_woubt6_k$() - 1 | 0;
    if (inductionVariable <= last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var item = _this__u8e3s4.get_c1px32_k$(index);
        action(index, item);
      }
       while (inductionVariable <= last);
  }
  function fastMaxBy(_this__u8e3s4, selector) {
    // Inline function 'kotlin.contracts.contract' call
    if (_this__u8e3s4.isEmpty_y1axqb_k$())
      return null;
    var maxElem = _this__u8e3s4.get_c1px32_k$(0);
    var maxValue = selector(maxElem);
    var inductionVariable = 1;
    var last = get_lastIndex(_this__u8e3s4);
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var e = _this__u8e3s4.get_c1px32_k$(i);
        var v = selector(e);
        if (compareTo(maxValue, v) < 0) {
          maxElem = e;
          maxValue = v;
        }
      }
       while (!(i === last));
    return maxElem;
  }
  function lerp(start, stop, fraction) {
    return start + roundToInt((stop - start | 0) * fraction) | 0;
  }
  function lerp_0(start, stop, fraction) {
    return (1 - fraction) * start + fraction * stop;
  }
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = lerp_0;
  _.$_$.b = lerp;
  //endregion
  return _;
}));

//# sourceMappingURL=compose-multiplatform-core-ui-util.js.map
