(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './compose-multiplatform-core-ui-graphics.js', './compose-multiplatform-core-ui-unit.js', './kotlin-kotlin-stdlib.js', './compose-multiplatform-core-ui.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./compose-multiplatform-core-ui-graphics.js'), require('./compose-multiplatform-core-ui-unit.js'), require('./kotlin-kotlin-stdlib.js'), require('./compose-multiplatform-core-ui.js'));
  else {
    if (typeof this['compose-multiplatform-core-ui-graphics'] === 'undefined') {
      throw new Error("Error loading module 'components-library'. Its dependency 'compose-multiplatform-core-ui-graphics' was not found. Please, check whether 'compose-multiplatform-core-ui-graphics' is loaded prior to 'components-library'.");
    }
    if (typeof this['compose-multiplatform-core-ui-unit'] === 'undefined') {
      throw new Error("Error loading module 'components-library'. Its dependency 'compose-multiplatform-core-ui-unit' was not found. Please, check whether 'compose-multiplatform-core-ui-unit' is loaded prior to 'components-library'.");
    }
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'components-library'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'components-library'.");
    }
    if (typeof this['compose-multiplatform-core-ui'] === 'undefined') {
      throw new Error("Error loading module 'components-library'. Its dependency 'compose-multiplatform-core-ui' was not found. Please, check whether 'compose-multiplatform-core-ui' is loaded prior to 'components-library'.");
    }
    root['components-library'] = factory(typeof this['components-library'] === 'undefined' ? {} : this['components-library'], this['compose-multiplatform-core-ui-graphics'], this['compose-multiplatform-core-ui-unit'], this['kotlin-kotlin-stdlib'], this['compose-multiplatform-core-ui']);
  }
}(this, function (_, kotlin_org_jetbrains_compose_ui_ui_graphics, kotlin_org_jetbrains_compose_ui_ui_unit, kotlin_kotlin, kotlin_org_jetbrains_compose_ui_ui) {
  'use strict';
  //region block: imports
  var ImageBitmap = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.l;
  var _Dp___init__impl__ms3zkb = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.d2;
  var VOID = kotlin_kotlin.$_$.h;
  var Builder = kotlin_org_jetbrains_compose_ui_ui.$_$.f;
  var KProperty0 = kotlin_kotlin.$_$.ne;
  var getPropertyCallableRef = kotlin_kotlin.$_$.ic;
  var lazy = kotlin_kotlin.$_$.li;
  //endregion
  //region block: pre-declaration
  //endregion
  function get_emptyImageBitmap() {
    _init_properties_ComposeResource_common_kt__692f5z();
    // Inline function 'kotlin.getValue' call
    var this_0 = emptyImageBitmap$delegate;
    emptyImageBitmap$factory();
    return this_0.get_value_j01efc_k$();
  }
  var emptyImageBitmap$delegate;
  function get_emptyImageVector() {
    _init_properties_ComposeResource_common_kt__692f5z();
    // Inline function 'kotlin.getValue' call
    var this_0 = emptyImageVector$delegate;
    emptyImageVector$factory();
    return this_0.get_value_j01efc_k$();
  }
  var emptyImageVector$delegate;
  function emptyImageBitmap$delegate$lambda() {
    _init_properties_ComposeResource_common_kt__692f5z();
    return ImageBitmap(1, 1);
  }
  function emptyImageVector$delegate$lambda() {
    _init_properties_ComposeResource_common_kt__692f5z();
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp = _Dp___init__impl__ms3zkb(1);
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp$ret$1 = _Dp___init__impl__ms3zkb(1);
    return (new Builder(VOID, tmp, tmp$ret$1, 1.0, 1.0)).build_1k0s4u_k$();
  }
  function emptyImageBitmap$factory() {
    return getPropertyCallableRef('emptyImageBitmap', 0, KProperty0, function () {
      return get_emptyImageBitmap();
    }, null);
  }
  function emptyImageVector$factory() {
    return getPropertyCallableRef('emptyImageVector', 0, KProperty0, function () {
      return get_emptyImageVector();
    }, null);
  }
  var properties_initialized_ComposeResource_common_kt_eelrej;
  function _init_properties_ComposeResource_common_kt__692f5z() {
    if (!properties_initialized_ComposeResource_common_kt_eelrej) {
      properties_initialized_ComposeResource_common_kt_eelrej = true;
      emptyImageBitmap$delegate = lazy(emptyImageBitmap$delegate$lambda);
      emptyImageVector$delegate = lazy(emptyImageVector$delegate$lambda);
    }
  }
  return _;
}));
