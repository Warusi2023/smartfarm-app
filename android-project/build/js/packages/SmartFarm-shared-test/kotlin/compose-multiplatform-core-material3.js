(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './compose-multiplatform-core-ui-unit.js', './compose-multiplatform-core-foundation-layout.js', './kotlin-kotlin-stdlib.js', './compose-multiplatform-core-animation-core.js', './compose-multiplatform-core-ui-graphics.js', './compose-multiplatform-core-runtime.js', './compose-multiplatform-core-animation.js', './compose-multiplatform-core-ui.js', './compose-multiplatform-core-material-ripple.js', './compose-multiplatform-core-ui-geometry.js', './compose-multiplatform-core-ui-util.js', './compose-multiplatform-core-foundation.js', './compose-multiplatform-core-ui-text.js', './Kotlin-DateTime-library-kotlinx-datetime-js-ir.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./compose-multiplatform-core-ui-unit.js'), require('./compose-multiplatform-core-foundation-layout.js'), require('./kotlin-kotlin-stdlib.js'), require('./compose-multiplatform-core-animation-core.js'), require('./compose-multiplatform-core-ui-graphics.js'), require('./compose-multiplatform-core-runtime.js'), require('./compose-multiplatform-core-animation.js'), require('./compose-multiplatform-core-ui.js'), require('./compose-multiplatform-core-material-ripple.js'), require('./compose-multiplatform-core-ui-geometry.js'), require('./compose-multiplatform-core-ui-util.js'), require('./compose-multiplatform-core-foundation.js'), require('./compose-multiplatform-core-ui-text.js'), require('./Kotlin-DateTime-library-kotlinx-datetime-js-ir.js'));
  else {
    if (typeof this['compose-multiplatform-core-ui-unit'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-material3'. Its dependency 'compose-multiplatform-core-ui-unit' was not found. Please, check whether 'compose-multiplatform-core-ui-unit' is loaded prior to 'compose-multiplatform-core-material3'.");
    }
    if (typeof this['compose-multiplatform-core-foundation-layout'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-material3'. Its dependency 'compose-multiplatform-core-foundation-layout' was not found. Please, check whether 'compose-multiplatform-core-foundation-layout' is loaded prior to 'compose-multiplatform-core-material3'.");
    }
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-material3'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'compose-multiplatform-core-material3'.");
    }
    if (typeof this['compose-multiplatform-core-animation-core'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-material3'. Its dependency 'compose-multiplatform-core-animation-core' was not found. Please, check whether 'compose-multiplatform-core-animation-core' is loaded prior to 'compose-multiplatform-core-material3'.");
    }
    if (typeof this['compose-multiplatform-core-ui-graphics'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-material3'. Its dependency 'compose-multiplatform-core-ui-graphics' was not found. Please, check whether 'compose-multiplatform-core-ui-graphics' is loaded prior to 'compose-multiplatform-core-material3'.");
    }
    if (typeof this['compose-multiplatform-core-runtime'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-material3'. Its dependency 'compose-multiplatform-core-runtime' was not found. Please, check whether 'compose-multiplatform-core-runtime' is loaded prior to 'compose-multiplatform-core-material3'.");
    }
    if (typeof this['compose-multiplatform-core-animation'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-material3'. Its dependency 'compose-multiplatform-core-animation' was not found. Please, check whether 'compose-multiplatform-core-animation' is loaded prior to 'compose-multiplatform-core-material3'.");
    }
    if (typeof this['compose-multiplatform-core-ui'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-material3'. Its dependency 'compose-multiplatform-core-ui' was not found. Please, check whether 'compose-multiplatform-core-ui' is loaded prior to 'compose-multiplatform-core-material3'.");
    }
    if (typeof this['compose-multiplatform-core-material-ripple'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-material3'. Its dependency 'compose-multiplatform-core-material-ripple' was not found. Please, check whether 'compose-multiplatform-core-material-ripple' is loaded prior to 'compose-multiplatform-core-material3'.");
    }
    if (typeof this['compose-multiplatform-core-ui-geometry'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-material3'. Its dependency 'compose-multiplatform-core-ui-geometry' was not found. Please, check whether 'compose-multiplatform-core-ui-geometry' is loaded prior to 'compose-multiplatform-core-material3'.");
    }
    if (typeof this['compose-multiplatform-core-ui-util'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-material3'. Its dependency 'compose-multiplatform-core-ui-util' was not found. Please, check whether 'compose-multiplatform-core-ui-util' is loaded prior to 'compose-multiplatform-core-material3'.");
    }
    if (typeof this['compose-multiplatform-core-foundation'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-material3'. Its dependency 'compose-multiplatform-core-foundation' was not found. Please, check whether 'compose-multiplatform-core-foundation' is loaded prior to 'compose-multiplatform-core-material3'.");
    }
    if (typeof this['compose-multiplatform-core-ui-text'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-material3'. Its dependency 'compose-multiplatform-core-ui-text' was not found. Please, check whether 'compose-multiplatform-core-ui-text' is loaded prior to 'compose-multiplatform-core-material3'.");
    }
    if (typeof this['Kotlin-DateTime-library-kotlinx-datetime-js-ir'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-material3'. Its dependency 'Kotlin-DateTime-library-kotlinx-datetime-js-ir' was not found. Please, check whether 'Kotlin-DateTime-library-kotlinx-datetime-js-ir' is loaded prior to 'compose-multiplatform-core-material3'.");
    }
    root['compose-multiplatform-core-material3'] = factory(typeof this['compose-multiplatform-core-material3'] === 'undefined' ? {} : this['compose-multiplatform-core-material3'], this['compose-multiplatform-core-ui-unit'], this['compose-multiplatform-core-foundation-layout'], this['kotlin-kotlin-stdlib'], this['compose-multiplatform-core-animation-core'], this['compose-multiplatform-core-ui-graphics'], this['compose-multiplatform-core-runtime'], this['compose-multiplatform-core-animation'], this['compose-multiplatform-core-ui'], this['compose-multiplatform-core-material-ripple'], this['compose-multiplatform-core-ui-geometry'], this['compose-multiplatform-core-ui-util'], this['compose-multiplatform-core-foundation'], this['compose-multiplatform-core-ui-text'], this['Kotlin-DateTime-library-kotlinx-datetime-js-ir']);
  }
}(this, function (_, kotlin_org_jetbrains_compose_ui_ui_unit, kotlin_org_jetbrains_compose_foundation_foundation_layout, kotlin_kotlin, kotlin_org_jetbrains_compose_animation_animation_core, kotlin_org_jetbrains_compose_ui_ui_graphics, kotlin_org_jetbrains_compose_runtime_runtime, kotlin_org_jetbrains_compose_animation_animation, kotlin_org_jetbrains_compose_ui_ui, kotlin_org_jetbrains_compose_material_material_ripple, kotlin_org_jetbrains_compose_ui_ui_geometry, kotlin_org_jetbrains_compose_ui_ui_util, kotlin_org_jetbrains_compose_foundation_foundation, kotlin_org_jetbrains_compose_ui_ui_text, kotlin_org_jetbrains_kotlinx_kotlinx_datetime) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var _Dp___init__impl__ms3zkb = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.d2;
  var PaddingValues = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.c;
  var VOID = kotlin_kotlin.$_$.h;
  var PaddingValues_0 = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.d;
  var _Dp___get_value__impl__geb1vb = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.g2;
  var CubicBezierEasing = kotlin_org_jetbrains_compose_animation_animation_core.$_$.c;
  var PaddingValues_1 = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.b;
  var Color = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.j;
  var structuralEqualityPolicy = kotlin_org_jetbrains_compose_runtime_runtime.$_$.o1;
  var mutableStateOf = kotlin_org_jetbrains_compose_runtime_runtime.$_$.h1;
  var protoOf = kotlin_kotlin.$_$.id;
  var classMeta = kotlin_kotlin.$_$.xb;
  var setMetadataFor = kotlin_kotlin.$_$.jd;
  var sourceInformationMarkerStart = kotlin_org_jetbrains_compose_runtime_runtime.$_$.l1;
  var traceEventStart = kotlin_org_jetbrains_compose_runtime_runtime.$_$.q1;
  var isTraceInProgress = kotlin_org_jetbrains_compose_runtime_runtime.$_$.b1;
  var traceEventEnd = kotlin_org_jetbrains_compose_runtime_runtime.$_$.p1;
  var sourceInformationMarkerEnd = kotlin_org_jetbrains_compose_runtime_runtime.$_$.k1;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.mi;
  var KMutableProperty1 = kotlin_kotlin.$_$.me;
  var getPropertyCallableRef = kotlin_kotlin.$_$.ic;
  var staticCompositionLocalOf = kotlin_org_jetbrains_compose_runtime_runtime.$_$.n1;
  var Companion_getInstance = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.n3;
  var compositionLocalOf = kotlin_org_jetbrains_compose_runtime_runtime.$_$.w;
  var get_FastOutSlowInEasing = kotlin_org_jetbrains_compose_animation_animation_core.$_$.d;
  var TweenSpec = kotlin_org_jetbrains_compose_animation_animation_core.$_$.g;
  var THROW_CCE = kotlin_kotlin.$_$.jh;
  var Annotation = kotlin_kotlin.$_$.pg;
  var numberToInt = kotlin_kotlin.$_$.ed;
  var tween = kotlin_org_jetbrains_compose_animation_animation_core.$_$.r;
  var fadeOut = kotlin_org_jetbrains_compose_animation_animation.$_$.f;
  var Companion_getInstance_0 = kotlin_org_jetbrains_compose_ui_ui.$_$.p2;
  var shrinkHorizontally = kotlin_org_jetbrains_compose_animation_animation.$_$.g;
  var fadeIn = kotlin_org_jetbrains_compose_animation_animation.$_$.e;
  var expandHorizontally = kotlin_org_jetbrains_compose_animation_animation.$_$.c;
  var Companion_getInstance_1 = kotlin_org_jetbrains_compose_ui_ui.$_$.q2;
  var size = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.m;
  var DpSize = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.t;
  var illegalDecoyCallException = kotlin_org_jetbrains_compose_runtime_runtime.$_$.d;
  var objectMeta = kotlin_kotlin.$_$.hd;
  var RippleAlpha = kotlin_org_jetbrains_compose_material_material_ripple.$_$.a;
  var drawWithContent = kotlin_org_jetbrains_compose_ui_ui.$_$.d;
  var sourceInformation = kotlin_org_jetbrains_compose_runtime_runtime.$_$.m1;
  var Companion_getInstance_2 = kotlin_org_jetbrains_compose_runtime_runtime.$_$.z1;
  var get_LocalLayoutDirection = kotlin_org_jetbrains_compose_ui_ui.$_$.s1;
  var $get_currentCompositeKeyHash$$composable_u3vbzj = kotlin_org_jetbrains_compose_runtime_runtime.$_$.f;
  var Companion_getInstance_3 = kotlin_org_jetbrains_compose_ui_ui.$_$.n2;
  var materializerOf = kotlin_org_jetbrains_compose_ui_ui.$_$.z;
  var invalidApplier = kotlin_org_jetbrains_compose_runtime_runtime.$_$.a1;
  var Applier = kotlin_org_jetbrains_compose_runtime_runtime.$_$.h;
  var isInterface = kotlin_kotlin.$_$.vc;
  var _Updater___init__impl__rbfxm8 = kotlin_org_jetbrains_compose_runtime_runtime.$_$.v1;
  var Updater__set_impl_v7kwss = kotlin_org_jetbrains_compose_runtime_runtime.$_$.x1;
  var _Updater___get_composer__impl__9ty7av = kotlin_org_jetbrains_compose_runtime_runtime.$_$.w1;
  var Unit_getInstance = kotlin_kotlin.$_$.e5;
  var equals = kotlin_kotlin.$_$.bc;
  var _SkippableUpdater___init__impl__4ft0t9 = kotlin_org_jetbrains_compose_runtime_runtime.$_$.t1;
  var SkippableUpdater = kotlin_org_jetbrains_compose_runtime_runtime.$_$.u;
  var layoutId = kotlin_org_jetbrains_compose_ui_ui.$_$.y;
  var rememberBoxMeasurePolicy$composable = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.l;
  var BoxScopeInstance_getInstance = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.r;
  var calculateStartPadding = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.f;
  var calculateEndPadding = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.e;
  var coerceAtLeast = kotlin_kotlin.$_$.zd;
  var heightIn = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.i;
  var wrapContentHeight = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.q;
  var padding = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.k;
  var lerp = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.i1;
  var padding_0 = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.j;
  var NoSuchElementException_init_$Create$ = kotlin_kotlin.$_$.h2;
  var Constraints__copy$default_impl_f452rp = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.w2;
  var get_layoutId = kotlin_org_jetbrains_compose_ui_ui.$_$.x;
  var offset = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.l1;
  var Size = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.i;
  var Size_0 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.j;
  var Companion_getInstance_4 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.y2;
  var Constraints = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.a;
  var MeasurePolicy = kotlin_org_jetbrains_compose_ui_ui.$_$.v;
  var LayoutDirection_Ltr_getInstance = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.s1;
  var roundToInt = kotlin_kotlin.$_$.sd;
  var _Constraints___get_minWidth__impl__hi9lfi = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.c2;
  var _Constraints___get_minHeight__impl__ev4bgx = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.b2;
  var maxOf = kotlin_kotlin.$_$.ma;
  var Companion_getInstance_5 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.c3;
  var lerp_0 = kotlin_org_jetbrains_compose_ui_ui_util.$_$.b;
  var _Size___get_width__impl__58y75t = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.h1;
  var _Size___get_height__impl__a04p02 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.d1;
  var Companion_getInstance_6 = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.m3;
  var updateChangedFlags = kotlin_org_jetbrains_compose_runtime_runtime.$_$.r1;
  var Companion_getInstance_7 = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.s;
  var get_statusBars = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.n;
  var Long = kotlin_kotlin.$_$.ch;
  var _ULong___init__impl__c78o9k = kotlin_kotlin.$_$.s3;
  var _Color___init__impl__r6cqi2 = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.j2;
  var Color__copy$default_impl_ectz3s = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.f3;
  var get_LocalTextSelectionColors = kotlin_org_jetbrains_compose_foundation_foundation.$_$.f;
  var getKClassFromExpression = kotlin_kotlin.$_$.d;
  var Color__hashCode_impl_vjyivj = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.r2;
  var expandVertically = kotlin_org_jetbrains_compose_animation_animation.$_$.d;
  var shrinkVertically = kotlin_org_jetbrains_compose_animation_animation.$_$.h;
  var hashCode = kotlin_kotlin.$_$.kc;
  var get_CircleShape = kotlin_org_jetbrains_compose_foundation_foundation.$_$.b;
  var get_RectangleShape = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.t;
  var CornerSize = kotlin_org_jetbrains_compose_foundation_foundation.$_$.c;
  var widthIn = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.o;
  var Dp = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.u;
  var get_sp = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.p1;
  var CompositionLocalProvider$composable = kotlin_org_jetbrains_compose_runtime_runtime.$_$.l;
  var Companion_getInstance_8 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.z2;
  var Offset = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.d;
  var KProperty0 = kotlin_kotlin.$_$.ne;
  var THROW_ISE = kotlin_kotlin.$_$.lh;
  var getLocalDelegateReference = kotlin_kotlin.$_$.fc;
  var collectIsFocusedAsState$composable = kotlin_org_jetbrains_compose_foundation_foundation.$_$.a;
  var rememberUpdatedState$composable = kotlin_org_jetbrains_compose_runtime_runtime.$_$.i1;
  var animateColorAsState$composable = kotlin_org_jetbrains_compose_animation_animation.$_$.b;
  var get_NoInspectorInfo = kotlin_org_jetbrains_compose_ui_ui.$_$.t1;
  var get_isDebugInspectorInfoEnabled = kotlin_org_jetbrains_compose_ui_ui.$_$.u1;
  var composed$composable = kotlin_org_jetbrains_compose_ui_ui.$_$.b2;
  var background = kotlin_org_jetbrains_compose_foundation_foundation.$_$.h;
  var Box$composable = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.a;
  var composableLambda = kotlin_org_jetbrains_compose_runtime_runtime.$_$.c;
  var animateDpAsState$composable = kotlin_org_jetbrains_compose_animation_animation_core.$_$.l;
  var SolidColor = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.x;
  var BorderStroke = kotlin_org_jetbrains_compose_foundation_foundation.$_$.g;
  var border = kotlin_org_jetbrains_compose_foundation_foundation.$_$.i;
  var THROW_IAE = kotlin_kotlin.$_$.kh;
  var Enum = kotlin_kotlin.$_$.xg;
  var AnnotatedString_init_$Create$ = kotlin_org_jetbrains_compose_ui_ui_text.$_$.l;
  var charSequenceLength = kotlin_kotlin.$_$.vb;
  var _Color___get_value__impl__1pls5m = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.s2;
  var spring = kotlin_org_jetbrains_compose_animation_animation_core.$_$.q;
  var get_LinearEasing = kotlin_org_jetbrains_compose_animation_animation_core.$_$.e;
  var _ULong___get_data__impl__fggpzb = kotlin_kotlin.$_$.t3;
  var updateTransition$composable = kotlin_org_jetbrains_compose_animation_animation_core.$_$.s;
  var FloatCompanionObject_getInstance = kotlin_kotlin.$_$.q4;
  var get_VectorConverter = kotlin_org_jetbrains_compose_animation_animation_core.$_$.i;
  var createTransitionAnimation$composable = kotlin_org_jetbrains_compose_animation_animation_core.$_$.n;
  var _Color___get_colorSpace__impl__jqqozk = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.l2;
  var get_VectorConverter_0 = kotlin_org_jetbrains_compose_animation_animation.$_$.a;
  var LayoutIdParentData = kotlin_org_jetbrains_compose_ui_ui.$_$.q;
  var lerp_1 = kotlin_org_jetbrains_compose_ui_ui_text.$_$.k;
  var alpha = kotlin_org_jetbrains_compose_ui_ui.$_$.b;
  var error = kotlin_org_jetbrains_compose_ui_ui.$_$.w1;
  var semantics = kotlin_org_jetbrains_compose_ui_ui.$_$.x1;
  var Companion_getInstance_9 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.m1;
  var defaultMinSize = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.g;
  var listOf = kotlin_kotlin.$_$.z8;
  var collectionSizeOrDefault = kotlin_kotlin.$_$.t6;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.o;
  var Color_0 = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.g;
  var RoundedCornerShape = kotlin_org_jetbrains_compose_foundation_foundation.$_$.d;
  var RoundedCornerShape_0 = kotlin_org_jetbrains_compose_foundation_foundation.$_$.e;
  var get_sp_0 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.o1;
  var checkArithmetic = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.d1;
  var _TextUnit___get_rawType__impl__tu8yq5 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.r2;
  var _TextUnit___get_value__impl__hpbx0k = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.t2;
  var pack = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.m1;
  var Companion_getInstance_10 = kotlin_org_jetbrains_compose_ui_ui_text.$_$.q;
  var Companion_getInstance_11 = kotlin_org_jetbrains_compose_ui_ui_text.$_$.r;
  var Companion_getInstance_12 = kotlin_org_jetbrains_compose_ui_ui_text.$_$.u;
  var LocalTime_init_$Create$ = kotlin_org_jetbrains_kotlinx_kotlinx_datetime.$_$.a;
  //endregion
  //region block: pre-declaration
  setMetadataFor(ColorScheme, 'ColorScheme', classMeta);
  setMetadataFor(ExperimentalMaterial3Api, 'ExperimentalMaterial3Api', classMeta, VOID, [Annotation]);
  setMetadataFor(MaterialTheme, 'MaterialTheme', objectMeta);
  setMetadataFor(OutlinedTextFieldMeasurePolicy, 'OutlinedTextFieldMeasurePolicy', classMeta, VOID, [MeasurePolicy]);
  setMetadataFor(FabPlacement, 'FabPlacement', classMeta);
  setMetadataFor(SearchBarDefaults, 'SearchBarDefaults', objectMeta);
  setMetadataFor(SearchBarColors, 'SearchBarColors', classMeta);
  setMetadataFor(Shapes, 'Shapes', classMeta, VOID, VOID, Shapes);
  setMetadataFor(ShapeDefaults, 'ShapeDefaults', objectMeta);
  setMetadataFor(Companion, 'Companion', objectMeta);
  setMetadataFor(Strings, 'Strings', classMeta);
  setMetadataFor(TextFieldMeasurePolicy, 'TextFieldMeasurePolicy', classMeta, VOID, [MeasurePolicy]);
  setMetadataFor(TextFieldColors, 'TextFieldColors', classMeta);
  setMetadataFor(TextFieldDefaults, 'TextFieldDefaults', objectMeta);
  setMetadataFor(OutlinedTextFieldDefaults, 'OutlinedTextFieldDefaults', objectMeta);
  setMetadataFor(TextFieldType, 'TextFieldType', classMeta, Enum);
  setMetadataFor(InputPhase, 'InputPhase', classMeta, Enum);
  setMetadataFor(TextFieldTransitionScope, 'TextFieldTransitionScope', objectMeta);
  setMetadataFor(TonalPalette, 'TonalPalette', classMeta);
  setMetadataFor(Typography, 'Typography', classMeta, VOID, VOID, Typography);
  setMetadataFor(CircularProgressIndicatorTokens, 'CircularProgressIndicatorTokens', objectMeta);
  setMetadataFor(ColorLightTokens, 'ColorLightTokens', objectMeta);
  setMetadataFor(ColorSchemeKeyTokens, 'ColorSchemeKeyTokens', classMeta, Enum);
  setMetadataFor(ElevationTokens, 'ElevationTokens', objectMeta);
  setMetadataFor(FilledTextFieldTokens, 'FilledTextFieldTokens', objectMeta);
  setMetadataFor(IconButtonTokens, 'IconButtonTokens', objectMeta);
  setMetadataFor(LinearProgressIndicatorTokens, 'LinearProgressIndicatorTokens', objectMeta);
  setMetadataFor(MotionTokens, 'MotionTokens', objectMeta);
  setMetadataFor(NavigationBarTokens, 'NavigationBarTokens', objectMeta);
  setMetadataFor(NavigationRailTokens, 'NavigationRailTokens', objectMeta);
  setMetadataFor(OutlinedTextFieldTokens, 'OutlinedTextFieldTokens', objectMeta);
  setMetadataFor(PaletteTokens, 'PaletteTokens', objectMeta);
  setMetadataFor(PrimaryNavigationTabTokens, 'PrimaryNavigationTabTokens', objectMeta);
  setMetadataFor(SearchBarTokens, 'SearchBarTokens', objectMeta);
  setMetadataFor(SearchViewTokens, 'SearchViewTokens', objectMeta);
  setMetadataFor(ShapeKeyTokens, 'ShapeKeyTokens', classMeta, Enum);
  setMetadataFor(ShapeTokens, 'ShapeTokens', objectMeta);
  setMetadataFor(SliderTokens, 'SliderTokens', objectMeta);
  setMetadataFor(StateTokens, 'StateTokens', objectMeta);
  setMetadataFor(SwitchTokens, 'SwitchTokens', objectMeta);
  setMetadataFor(TypeScaleTokens, 'TypeScaleTokens', objectMeta);
  setMetadataFor(TypefaceTokens, 'TypefaceTokens', objectMeta);
  setMetadataFor(TypographyKeyTokens, 'TypographyKeyTokens', classMeta, Enum);
  setMetadataFor(TypographyTokens, 'TypographyTokens', objectMeta);
  //endregion
  function get_DialogMinWidth() {
    _init_properties_AlertDialog_kt__pwewa6();
    return DialogMinWidth;
  }
  var DialogMinWidth;
  function get_DialogMaxWidth() {
    _init_properties_AlertDialog_kt__pwewa6();
    return DialogMaxWidth;
  }
  var DialogMaxWidth;
  function get_DialogPadding() {
    _init_properties_AlertDialog_kt__pwewa6();
    return DialogPadding;
  }
  var DialogPadding;
  function get_IconPadding() {
    _init_properties_AlertDialog_kt__pwewa6();
    return IconPadding;
  }
  var IconPadding;
  function get_TitlePadding() {
    _init_properties_AlertDialog_kt__pwewa6();
    return TitlePadding;
  }
  var TitlePadding;
  function get_TextPadding() {
    _init_properties_AlertDialog_kt__pwewa6();
    return TextPadding;
  }
  var TextPadding;
  var properties_initialized_AlertDialog_kt_toy5h0;
  function _init_properties_AlertDialog_kt__pwewa6() {
    if (!properties_initialized_AlertDialog_kt_toy5h0) {
      properties_initialized_AlertDialog_kt_toy5h0 = true;
      // Inline function 'androidx.compose.ui.unit.dp' call
      DialogMinWidth = _Dp___init__impl__ms3zkb(280);
      // Inline function 'androidx.compose.ui.unit.dp' call
      DialogMaxWidth = _Dp___init__impl__ms3zkb(560);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$0 = _Dp___init__impl__ms3zkb(24);
      DialogPadding = PaddingValues(tmp$ret$0);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$0_0 = _Dp___init__impl__ms3zkb(16);
      IconPadding = PaddingValues_0(VOID, VOID, VOID, tmp$ret$0_0);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$0_1 = _Dp___init__impl__ms3zkb(16);
      TitlePadding = PaddingValues_0(VOID, VOID, VOID, tmp$ret$0_1);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$0_2 = _Dp___init__impl__ms3zkb(24);
      TextPadding = PaddingValues_0(VOID, VOID, VOID, tmp$ret$0_2);
    }
  }
  function get_BottomAppBarHorizontalPadding() {
    _init_properties_AppBar_kt__51suc2();
    return BottomAppBarHorizontalPadding;
  }
  var BottomAppBarHorizontalPadding;
  function get_BottomAppBarVerticalPadding() {
    _init_properties_AppBar_kt__51suc2();
    return BottomAppBarVerticalPadding;
  }
  var BottomAppBarVerticalPadding;
  function get_FABHorizontalPadding() {
    _init_properties_AppBar_kt__51suc2();
    return FABHorizontalPadding;
  }
  var FABHorizontalPadding;
  function get_FABVerticalPadding() {
    _init_properties_AppBar_kt__51suc2();
    return FABVerticalPadding;
  }
  var FABVerticalPadding;
  function get_TopTitleAlphaEasing() {
    _init_properties_AppBar_kt__51suc2();
    return TopTitleAlphaEasing;
  }
  var TopTitleAlphaEasing;
  function get_MediumTitleBottomPadding() {
    _init_properties_AppBar_kt__51suc2();
    return MediumTitleBottomPadding;
  }
  var MediumTitleBottomPadding;
  function get_LargeTitleBottomPadding() {
    _init_properties_AppBar_kt__51suc2();
    return LargeTitleBottomPadding;
  }
  var LargeTitleBottomPadding;
  function get_TopAppBarHorizontalPadding() {
    _init_properties_AppBar_kt__51suc2();
    return TopAppBarHorizontalPadding;
  }
  var TopAppBarHorizontalPadding;
  function get_TopAppBarTitleInset() {
    _init_properties_AppBar_kt__51suc2();
    return TopAppBarTitleInset;
  }
  var TopAppBarTitleInset;
  var properties_initialized_AppBar_kt_if00s4;
  function _init_properties_AppBar_kt__51suc2() {
    if (!properties_initialized_AppBar_kt_if00s4) {
      properties_initialized_AppBar_kt_if00s4 = true;
      // Inline function 'androidx.compose.ui.unit.Dp.minus' call
      // Inline function 'androidx.compose.ui.unit.dp' call
      var this_0 = _Dp___init__impl__ms3zkb(16);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var other = _Dp___init__impl__ms3zkb(12);
      BottomAppBarHorizontalPadding = _Dp___init__impl__ms3zkb(_Dp___get_value__impl__geb1vb(this_0) - _Dp___get_value__impl__geb1vb(other));
      // Inline function 'androidx.compose.ui.unit.Dp.minus' call
      // Inline function 'androidx.compose.ui.unit.dp' call
      var this_1 = _Dp___init__impl__ms3zkb(16);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var other_0 = _Dp___init__impl__ms3zkb(12);
      BottomAppBarVerticalPadding = _Dp___init__impl__ms3zkb(_Dp___get_value__impl__geb1vb(this_1) - _Dp___get_value__impl__geb1vb(other_0));
      // Inline function 'androidx.compose.ui.unit.Dp.minus' call
      // Inline function 'androidx.compose.ui.unit.dp' call
      var this_2 = _Dp___init__impl__ms3zkb(16);
      var other_1 = get_BottomAppBarHorizontalPadding();
      FABHorizontalPadding = _Dp___init__impl__ms3zkb(_Dp___get_value__impl__geb1vb(this_2) - _Dp___get_value__impl__geb1vb(other_1));
      // Inline function 'androidx.compose.ui.unit.Dp.minus' call
      // Inline function 'androidx.compose.ui.unit.dp' call
      var this_3 = _Dp___init__impl__ms3zkb(12);
      var other_2 = get_BottomAppBarVerticalPadding();
      FABVerticalPadding = _Dp___init__impl__ms3zkb(_Dp___get_value__impl__geb1vb(this_3) - _Dp___get_value__impl__geb1vb(other_2));
      TopTitleAlphaEasing = new CubicBezierEasing(0.8, 0.0, 0.8, 0.15);
      // Inline function 'androidx.compose.ui.unit.dp' call
      MediumTitleBottomPadding = _Dp___init__impl__ms3zkb(24);
      // Inline function 'androidx.compose.ui.unit.dp' call
      LargeTitleBottomPadding = _Dp___init__impl__ms3zkb(28);
      // Inline function 'androidx.compose.ui.unit.dp' call
      TopAppBarHorizontalPadding = _Dp___init__impl__ms3zkb(4);
      // Inline function 'androidx.compose.ui.unit.Dp.minus' call
      // Inline function 'androidx.compose.ui.unit.dp' call
      var this_4 = _Dp___init__impl__ms3zkb(16);
      var other_3 = get_TopAppBarHorizontalPadding();
      TopAppBarTitleInset = _Dp___init__impl__ms3zkb(_Dp___get_value__impl__geb1vb(this_4) - _Dp___get_value__impl__geb1vb(other_3));
    }
  }
  function get_BadgeWithContentHorizontalPadding() {
    _init_properties_Badge_kt__4ajdxr();
    return BadgeWithContentHorizontalPadding;
  }
  var BadgeWithContentHorizontalPadding;
  function get_BadgeWithContentHorizontalOffset() {
    _init_properties_Badge_kt__4ajdxr();
    return BadgeWithContentHorizontalOffset;
  }
  var BadgeWithContentHorizontalOffset;
  function get_BadgeWithContentVerticalOffset() {
    _init_properties_Badge_kt__4ajdxr();
    return BadgeWithContentVerticalOffset;
  }
  var BadgeWithContentVerticalOffset;
  function get_BadgeOffset() {
    _init_properties_Badge_kt__4ajdxr();
    return BadgeOffset;
  }
  var BadgeOffset;
  var properties_initialized_Badge_kt_dqvlbn;
  function _init_properties_Badge_kt__4ajdxr() {
    if (!properties_initialized_Badge_kt_dqvlbn) {
      properties_initialized_Badge_kt_dqvlbn = true;
      // Inline function 'androidx.compose.ui.unit.dp' call
      BadgeWithContentHorizontalPadding = _Dp___init__impl__ms3zkb(4);
      // Inline function 'androidx.compose.ui.unit.Dp.unaryMinus' call
      // Inline function 'androidx.compose.ui.unit.dp' call
      var this_0 = _Dp___init__impl__ms3zkb(4);
      BadgeWithContentHorizontalOffset = _Dp___init__impl__ms3zkb(-_Dp___get_value__impl__geb1vb(this_0));
      // Inline function 'androidx.compose.ui.unit.Dp.unaryMinus' call
      // Inline function 'androidx.compose.ui.unit.dp' call
      var this_1 = _Dp___init__impl__ms3zkb(4);
      BadgeWithContentVerticalOffset = _Dp___init__impl__ms3zkb(-_Dp___get_value__impl__geb1vb(this_1));
      // Inline function 'androidx.compose.ui.unit.dp' call
      BadgeOffset = _Dp___init__impl__ms3zkb(0);
    }
  }
  function get_CheckboxDefaultPadding() {
    _init_properties_Checkbox_kt__x46qhp();
    return CheckboxDefaultPadding;
  }
  var CheckboxDefaultPadding;
  function get_CheckboxSize() {
    _init_properties_Checkbox_kt__x46qhp();
    return CheckboxSize;
  }
  var CheckboxSize;
  function get_StrokeWidth() {
    _init_properties_Checkbox_kt__x46qhp();
    return StrokeWidth;
  }
  var StrokeWidth;
  function get_RadiusSize() {
    _init_properties_Checkbox_kt__x46qhp();
    return RadiusSize;
  }
  var RadiusSize;
  var properties_initialized_Checkbox_kt_pem0wr;
  function _init_properties_Checkbox_kt__x46qhp() {
    if (!properties_initialized_Checkbox_kt_pem0wr) {
      properties_initialized_Checkbox_kt_pem0wr = true;
      // Inline function 'androidx.compose.ui.unit.dp' call
      CheckboxDefaultPadding = _Dp___init__impl__ms3zkb(2);
      // Inline function 'androidx.compose.ui.unit.dp' call
      CheckboxSize = _Dp___init__impl__ms3zkb(20);
      // Inline function 'androidx.compose.ui.unit.dp' call
      StrokeWidth = _Dp___init__impl__ms3zkb(2);
      // Inline function 'androidx.compose.ui.unit.dp' call
      RadiusSize = _Dp___init__impl__ms3zkb(2);
    }
  }
  function get_HorizontalElementsPadding() {
    _init_properties_Chip_kt__5v35sk();
    return HorizontalElementsPadding;
  }
  var HorizontalElementsPadding;
  function get_AssistChipPadding() {
    _init_properties_Chip_kt__5v35sk();
    return AssistChipPadding;
  }
  var AssistChipPadding;
  function get_FilterChipPadding() {
    _init_properties_Chip_kt__5v35sk();
    return FilterChipPadding;
  }
  var FilterChipPadding;
  function get_SuggestionChipPadding() {
    _init_properties_Chip_kt__5v35sk();
    return SuggestionChipPadding;
  }
  var SuggestionChipPadding;
  var properties_initialized_Chip_kt_fc50mq;
  function _init_properties_Chip_kt__5v35sk() {
    if (!properties_initialized_Chip_kt_fc50mq) {
      properties_initialized_Chip_kt_fc50mq = true;
      // Inline function 'androidx.compose.ui.unit.dp' call
      HorizontalElementsPadding = _Dp___init__impl__ms3zkb(8);
      AssistChipPadding = PaddingValues_1(get_HorizontalElementsPadding());
      FilterChipPadding = PaddingValues_1(get_HorizontalElementsPadding());
      SuggestionChipPadding = PaddingValues_1(get_HorizontalElementsPadding());
    }
  }
  function get_LocalColorScheme() {
    _init_properties_ColorScheme_kt__xhtsty();
    return LocalColorScheme;
  }
  var LocalColorScheme;
  function get_$stableprop() {
    return 0;
  }
  function ColorScheme(primary, onPrimary, primaryContainer, onPrimaryContainer, inversePrimary, secondary, onSecondary, secondaryContainer, onSecondaryContainer, tertiary, onTertiary, tertiaryContainer, onTertiaryContainer, background, onBackground, surface, onSurface, surfaceVariant, onSurfaceVariant, surfaceTint, inverseSurface, inverseOnSurface, error, onError, errorContainer, onErrorContainer, outline, outlineVariant, scrim) {
    this.primary$delegate_1 = mutableStateOf(new Color(primary), structuralEqualityPolicy());
    this.onPrimary$delegate_1 = mutableStateOf(new Color(onPrimary), structuralEqualityPolicy());
    this.primaryContainer$delegate_1 = mutableStateOf(new Color(primaryContainer), structuralEqualityPolicy());
    this.onPrimaryContainer$delegate_1 = mutableStateOf(new Color(onPrimaryContainer), structuralEqualityPolicy());
    this.inversePrimary$delegate_1 = mutableStateOf(new Color(inversePrimary), structuralEqualityPolicy());
    this.secondary$delegate_1 = mutableStateOf(new Color(secondary), structuralEqualityPolicy());
    this.onSecondary$delegate_1 = mutableStateOf(new Color(onSecondary), structuralEqualityPolicy());
    this.secondaryContainer$delegate_1 = mutableStateOf(new Color(secondaryContainer), structuralEqualityPolicy());
    this.onSecondaryContainer$delegate_1 = mutableStateOf(new Color(onSecondaryContainer), structuralEqualityPolicy());
    this.tertiary$delegate_1 = mutableStateOf(new Color(tertiary), structuralEqualityPolicy());
    this.onTertiary$delegate_1 = mutableStateOf(new Color(onTertiary), structuralEqualityPolicy());
    this.tertiaryContainer$delegate_1 = mutableStateOf(new Color(tertiaryContainer), structuralEqualityPolicy());
    this.onTertiaryContainer$delegate_1 = mutableStateOf(new Color(onTertiaryContainer), structuralEqualityPolicy());
    this.background$delegate_1 = mutableStateOf(new Color(background), structuralEqualityPolicy());
    this.onBackground$delegate_1 = mutableStateOf(new Color(onBackground), structuralEqualityPolicy());
    this.surface$delegate_1 = mutableStateOf(new Color(surface), structuralEqualityPolicy());
    this.onSurface$delegate_1 = mutableStateOf(new Color(onSurface), structuralEqualityPolicy());
    this.surfaceVariant$delegate_1 = mutableStateOf(new Color(surfaceVariant), structuralEqualityPolicy());
    this.onSurfaceVariant$delegate_1 = mutableStateOf(new Color(onSurfaceVariant), structuralEqualityPolicy());
    this.surfaceTint$delegate_1 = mutableStateOf(new Color(surfaceTint), structuralEqualityPolicy());
    this.inverseSurface$delegate_1 = mutableStateOf(new Color(inverseSurface), structuralEqualityPolicy());
    this.inverseOnSurface$delegate_1 = mutableStateOf(new Color(inverseOnSurface), structuralEqualityPolicy());
    this.error$delegate_1 = mutableStateOf(new Color(error), structuralEqualityPolicy());
    this.onError$delegate_1 = mutableStateOf(new Color(onError), structuralEqualityPolicy());
    this.errorContainer$delegate_1 = mutableStateOf(new Color(errorContainer), structuralEqualityPolicy());
    this.onErrorContainer$delegate_1 = mutableStateOf(new Color(onErrorContainer), structuralEqualityPolicy());
    this.outline$delegate_1 = mutableStateOf(new Color(outline), structuralEqualityPolicy());
    this.outlineVariant$delegate_1 = mutableStateOf(new Color(outlineVariant), structuralEqualityPolicy());
    this.scrim$delegate_1 = mutableStateOf(new Color(scrim), structuralEqualityPolicy());
    this.$stable_1 = 0;
  }
  protoOf(ColorScheme).set_primary_1oxcea_k$ = function (_set____db54di) {
    var this_0 = this.primary$delegate_1;
    primary$factory();
    var value = new Color(_set____db54di);
    return this_0.set_value_v1vabv_k$(value);
  };
  protoOf(ColorScheme).get_primary_gfn28_k$ = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.primary$delegate_1;
    primary$factory_0();
    return this_0.get_value_j01efc_k$().value_1;
  };
  protoOf(ColorScheme).set_onPrimary_8yocyr_k$ = function (_set____db54di) {
    var this_0 = this.onPrimary$delegate_1;
    onPrimary$factory();
    var value = new Color(_set____db54di);
    return this_0.set_value_v1vabv_k$(value);
  };
  protoOf(ColorScheme).get_onPrimary_45hgxt_k$ = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.onPrimary$delegate_1;
    onPrimary$factory_0();
    return this_0.get_value_j01efc_k$().value_1;
  };
  protoOf(ColorScheme).set_primaryContainer_qlrn21_k$ = function (_set____db54di) {
    var this_0 = this.primaryContainer$delegate_1;
    primaryContainer$factory();
    var value = new Color(_set____db54di);
    return this_0.set_value_v1vabv_k$(value);
  };
  protoOf(ColorScheme).get_primaryContainer_7luo29_k$ = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.primaryContainer$delegate_1;
    primaryContainer$factory_0();
    return this_0.get_value_j01efc_k$().value_1;
  };
  protoOf(ColorScheme).set_onPrimaryContainer_n35pu0_k$ = function (_set____db54di) {
    var this_0 = this.onPrimaryContainer$delegate_1;
    onPrimaryContainer$factory();
    var value = new Color(_set____db54di);
    return this_0.set_value_v1vabv_k$(value);
  };
  protoOf(ColorScheme).get_onPrimaryContainer_fg0rle_k$ = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.onPrimaryContainer$delegate_1;
    onPrimaryContainer$factory_0();
    return this_0.get_value_j01efc_k$().value_1;
  };
  protoOf(ColorScheme).set_inversePrimary_lkn910_k$ = function (_set____db54di) {
    var this_0 = this.inversePrimary$delegate_1;
    inversePrimary$factory();
    var value = new Color(_set____db54di);
    return this_0.set_value_v1vabv_k$(value);
  };
  protoOf(ColorScheme).get_inversePrimary_e3nmhq_k$ = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.inversePrimary$delegate_1;
    inversePrimary$factory_0();
    return this_0.get_value_j01efc_k$().value_1;
  };
  protoOf(ColorScheme).set_secondary_m6t3ck_k$ = function (_set____db54di) {
    var this_0 = this.secondary$delegate_1;
    secondary$factory();
    var value = new Color(_set____db54di);
    return this_0.set_value_v1vabv_k$(value);
  };
  protoOf(ColorScheme).get_secondary_tgxf9q_k$ = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.secondary$delegate_1;
    secondary$factory_0();
    return this_0.get_value_j01efc_k$().value_1;
  };
  protoOf(ColorScheme).set_onSecondary_ml65pn_k$ = function (_set____db54di) {
    var this_0 = this.onSecondary$delegate_1;
    onSecondary$factory();
    var value = new Color(_set____db54di);
    return this_0.set_value_v1vabv_k$(value);
  };
  protoOf(ColorScheme).get_onSecondary_taplxp_k$ = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.onSecondary$delegate_1;
    onSecondary$factory_0();
    return this_0.get_value_j01efc_k$().value_1;
  };
  protoOf(ColorScheme).set_secondaryContainer_f10xon_k$ = function (_set____db54di) {
    var this_0 = this.secondaryContainer$delegate_1;
    secondaryContainer$factory();
    var value = new Color(_set____db54di);
    return this_0.set_value_v1vabv_k$(value);
  };
  protoOf(ColorScheme).get_secondaryContainer_nfol4t_k$ = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.secondaryContainer$delegate_1;
    secondaryContainer$factory_0();
    return this_0.get_value_j01efc_k$().value_1;
  };
  protoOf(ColorScheme).set_onSecondaryContainer_6lr9ve_k$ = function (_set____db54di) {
    var this_0 = this.onSecondaryContainer$delegate_1;
    onSecondaryContainer$factory();
    var value = new Color(_set____db54di);
    return this_0.set_value_v1vabv_k$(value);
  };
  protoOf(ColorScheme).get_onSecondaryContainer_kcu4m4_k$ = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.onSecondaryContainer$delegate_1;
    onSecondaryContainer$factory_0();
    return this_0.get_value_j01efc_k$().value_1;
  };
  protoOf(ColorScheme).set_tertiary_6scu7g_k$ = function (_set____db54di) {
    var this_0 = this.tertiary$delegate_1;
    tertiary$factory();
    var value = new Color(_set____db54di);
    return this_0.set_value_v1vabv_k$(value);
  };
  protoOf(ColorScheme).get_tertiary_1tbb2a_k$ = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.tertiary$delegate_1;
    tertiary$factory_0();
    return this_0.get_value_j01efc_k$().value_1;
  };
  protoOf(ColorScheme).set_onTertiary_j3a5wr_k$ = function (_set____db54di) {
    var this_0 = this.onTertiary$delegate_1;
    onTertiary$factory();
    var value = new Color(_set____db54di);
    return this_0.set_value_v1vabv_k$(value);
  };
  protoOf(ColorScheme).get_onTertiary_poc2ov_k$ = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.onTertiary$delegate_1;
    onTertiary$factory_0();
    return this_0.get_value_j01efc_k$().value_1;
  };
  protoOf(ColorScheme).set_tertiaryContainer_w1d25t_k$ = function (_set____db54di) {
    var this_0 = this.tertiaryContainer$delegate_1;
    tertiaryContainer$factory();
    var value = new Color(_set____db54di);
    return this_0.set_value_v1vabv_k$(value);
  };
  protoOf(ColorScheme).get_tertiaryContainer_hjp3yr_k$ = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.tertiaryContainer$delegate_1;
    tertiaryContainer$factory_0();
    return this_0.get_value_j01efc_k$().value_1;
  };
  protoOf(ColorScheme).set_onTertiaryContainer_9tlya8_k$ = function (_set____db54di) {
    var this_0 = this.onTertiaryContainer$delegate_1;
    onTertiaryContainer$factory();
    var value = new Color(_set____db54di);
    return this_0.set_value_v1vabv_k$(value);
  };
  protoOf(ColorScheme).get_onTertiaryContainer_nli2ge_k$ = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.onTertiaryContainer$delegate_1;
    onTertiaryContainer$factory_0();
    return this_0.get_value_j01efc_k$().value_1;
  };
  protoOf(ColorScheme).set_background_jj6oi0_k$ = function (_set____db54di) {
    var this_0 = this.background$delegate_1;
    background$factory();
    var value = new Color(_set____db54di);
    return this_0.set_value_v1vabv_k$(value);
  };
  protoOf(ColorScheme).get_background_8l4942_k$ = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.background$delegate_1;
    background$factory_0();
    return this_0.get_value_j01efc_k$().value_1;
  };
  protoOf(ColorScheme).set_onBackground_iz12ux_k$ = function (_set____db54di) {
    var this_0 = this.onBackground$delegate_1;
    onBackground$factory();
    var value = new Color(_set____db54di);
    return this_0.set_value_v1vabv_k$(value);
  };
  protoOf(ColorScheme).get_onBackground_38dzr7_k$ = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.onBackground$delegate_1;
    onBackground$factory_0();
    return this_0.get_value_j01efc_k$().value_1;
  };
  protoOf(ColorScheme).set_surface_59aa25_k$ = function (_set____db54di) {
    var this_0 = this.surface$delegate_1;
    surface$factory();
    var value = new Color(_set____db54di);
    return this_0.set_value_v1vabv_k$(value);
  };
  protoOf(ColorScheme).get_surface_ya87t7_k$ = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.surface$delegate_1;
    surface$factory_0();
    return this_0.get_value_j01efc_k$().value_1;
  };
  protoOf(ColorScheme).set_onSurface_cj1amm_k$ = function (_set____db54di) {
    var this_0 = this.onSurface$delegate_1;
    onSurface$factory();
    var value = new Color(_set____db54di);
    return this_0.set_value_v1vabv_k$(value);
  };
  protoOf(ColorScheme).get_onSurface_x1u0ac_k$ = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.onSurface$delegate_1;
    onSurface$factory_0();
    return this_0.get_value_j01efc_k$().value_1;
  };
  protoOf(ColorScheme).set_surfaceVariant_dmx09a_k$ = function (_set____db54di) {
    var this_0 = this.surfaceVariant$delegate_1;
    surfaceVariant$factory();
    var value = new Color(_set____db54di);
    return this_0.set_value_v1vabv_k$(value);
  };
  protoOf(ColorScheme).get_surfaceVariant_jeodjc_k$ = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.surfaceVariant$delegate_1;
    surfaceVariant$factory_0();
    return this_0.get_value_j01efc_k$().value_1;
  };
  protoOf(ColorScheme).set_onSurfaceVariant_oax19t_k$ = function (_set____db54di) {
    var this_0 = this.onSurfaceVariant$delegate_1;
    onSurfaceVariant$factory();
    var value = new Color(_set____db54di);
    return this_0.set_value_v1vabv_k$(value);
  };
  protoOf(ColorScheme).get_onSurfaceVariant_3w3xj_k$ = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.onSurfaceVariant$delegate_1;
    onSurfaceVariant$factory_0();
    return this_0.get_value_j01efc_k$().value_1;
  };
  protoOf(ColorScheme).set_surfaceTint_ega53c_k$ = function (_set____db54di) {
    var this_0 = this.surfaceTint$delegate_1;
    surfaceTint$factory();
    var value = new Color(_set____db54di);
    return this_0.set_value_v1vabv_k$(value);
  };
  protoOf(ColorScheme).get_surfaceTint_65z9bu_k$ = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.surfaceTint$delegate_1;
    surfaceTint$factory_0();
    return this_0.get_value_j01efc_k$().value_1;
  };
  protoOf(ColorScheme).set_inverseSurface_i0abd5_k$ = function (_set____db54di) {
    var this_0 = this.inverseSurface$delegate_1;
    inverseSurface$factory();
    var value = new Color(_set____db54di);
    return this_0.set_value_v1vabv_k$(value);
  };
  protoOf(ColorScheme).get_inverseSurface_jq4y99_k$ = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.inverseSurface$delegate_1;
    inverseSurface$factory_0();
    return this_0.get_value_j01efc_k$().value_1;
  };
  protoOf(ColorScheme).set_inverseOnSurface_sqqo0o_k$ = function (_set____db54di) {
    var this_0 = this.inverseOnSurface$delegate_1;
    inverseOnSurface$factory();
    var value = new Color(_set____db54di);
    return this_0.set_value_v1vabv_k$(value);
  };
  protoOf(ColorScheme).get_inverseOnSurface_u9t8k2_k$ = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.inverseOnSurface$delegate_1;
    inverseOnSurface$factory_0();
    return this_0.get_value_j01efc_k$().value_1;
  };
  protoOf(ColorScheme).set_error_xl056w_k$ = function (_set____db54di) {
    var this_0 = this.error$delegate_1;
    error$factory();
    var value = new Color(_set____db54di);
    return this_0.set_value_v1vabv_k$(value);
  };
  protoOf(ColorScheme).get_error_5j21ve_k$ = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.error$delegate_1;
    error$factory_0();
    return this_0.get_value_j01efc_k$().value_1;
  };
  protoOf(ColorScheme).set_onError_c35gwn_k$ = function (_set____db54di) {
    var this_0 = this.onError$delegate_1;
    onError$factory();
    var value = new Color(_set____db54di);
    return this_0.set_value_v1vabv_k$(value);
  };
  protoOf(ColorScheme).get_onError_r18it5_k$ = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.onError$delegate_1;
    onError$factory_0();
    return this_0.get_value_j01efc_k$().value_1;
  };
  protoOf(ColorScheme).set_errorContainer_lqw837_k$ = function (_set____db54di) {
    var this_0 = this.errorContainer$delegate_1;
    errorContainer$factory();
    var value = new Color(_set____db54di);
    return this_0.set_value_v1vabv_k$(value);
  };
  protoOf(ColorScheme).get_errorContainer_2c9dd5_k$ = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.errorContainer$delegate_1;
    errorContainer$factory_0();
    return this_0.get_value_j01efc_k$().value_1;
  };
  protoOf(ColorScheme).set_onErrorContainer_bcdscu_k$ = function (_set____db54di) {
    var this_0 = this.onErrorContainer$delegate_1;
    onErrorContainer$factory();
    var value = new Color(_set____db54di);
    return this_0.set_value_v1vabv_k$(value);
  };
  protoOf(ColorScheme).get_onErrorContainer_gyiw8o_k$ = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.onErrorContainer$delegate_1;
    onErrorContainer$factory_0();
    return this_0.get_value_j01efc_k$().value_1;
  };
  protoOf(ColorScheme).set_outline_q7gshu_k$ = function (_set____db54di) {
    var this_0 = this.outline$delegate_1;
    outline$factory();
    var value = new Color(_set____db54di);
    return this_0.set_value_v1vabv_k$(value);
  };
  protoOf(ColorScheme).get_outline_ezfrnk_k$ = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.outline$delegate_1;
    outline$factory_0();
    return this_0.get_value_j01efc_k$().value_1;
  };
  protoOf(ColorScheme).set_outlineVariant_y39dkt_k$ = function (_set____db54di) {
    var this_0 = this.outlineVariant$delegate_1;
    outlineVariant$factory();
    var value = new Color(_set____db54di);
    return this_0.set_value_v1vabv_k$(value);
  };
  protoOf(ColorScheme).get_outlineVariant_ctjh3h_k$ = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.outlineVariant$delegate_1;
    outlineVariant$factory_0();
    return this_0.get_value_j01efc_k$().value_1;
  };
  protoOf(ColorScheme).set_scrim_vz501m_k$ = function (_set____db54di) {
    var this_0 = this.scrim$delegate_1;
    scrim$factory();
    var value = new Color(_set____db54di);
    return this_0.set_value_v1vabv_k$(value);
  };
  protoOf(ColorScheme).get_scrim_ltye0s_k$ = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.scrim$delegate_1;
    scrim$factory_0();
    return this_0.get_value_j01efc_k$().value_1;
  };
  protoOf(ColorScheme).copy_fmcge_k$ = function (primary, onPrimary, primaryContainer, onPrimaryContainer, inversePrimary, secondary, onSecondary, secondaryContainer, onSecondaryContainer, tertiary, onTertiary, tertiaryContainer, onTertiaryContainer, background, onBackground, surface, onSurface, surfaceVariant, onSurfaceVariant, surfaceTint, inverseSurface, inverseOnSurface, error, onError, errorContainer, onErrorContainer, outline, outlineVariant, scrim) {
    return new ColorScheme(primary, onPrimary, primaryContainer, onPrimaryContainer, inversePrimary, secondary, onSecondary, secondaryContainer, onSecondaryContainer, tertiary, onTertiary, tertiaryContainer, onTertiaryContainer, background, onBackground, surface, onSurface, surfaceVariant, onSurfaceVariant, surfaceTint, inverseSurface, inverseOnSurface, error, onError, errorContainer, onErrorContainer, outline, outlineVariant, scrim);
  };
  protoOf(ColorScheme).copy$default_tn8h97_k$ = function (primary, onPrimary, primaryContainer, onPrimaryContainer, inversePrimary, secondary, onSecondary, secondaryContainer, onSecondaryContainer, tertiary, onTertiary, tertiaryContainer, onTertiaryContainer, background, onBackground, surface, onSurface, surfaceVariant, onSurfaceVariant, surfaceTint, inverseSurface, inverseOnSurface, error, onError, errorContainer, onErrorContainer, outline, outlineVariant, scrim, $super) {
    primary = primary === VOID ? this.get_primary_gfn28_k$() : primary;
    onPrimary = onPrimary === VOID ? this.get_onPrimary_45hgxt_k$() : onPrimary;
    primaryContainer = primaryContainer === VOID ? this.get_primaryContainer_7luo29_k$() : primaryContainer;
    onPrimaryContainer = onPrimaryContainer === VOID ? this.get_onPrimaryContainer_fg0rle_k$() : onPrimaryContainer;
    inversePrimary = inversePrimary === VOID ? this.get_inversePrimary_e3nmhq_k$() : inversePrimary;
    secondary = secondary === VOID ? this.get_secondary_tgxf9q_k$() : secondary;
    onSecondary = onSecondary === VOID ? this.get_onSecondary_taplxp_k$() : onSecondary;
    secondaryContainer = secondaryContainer === VOID ? this.get_secondaryContainer_nfol4t_k$() : secondaryContainer;
    onSecondaryContainer = onSecondaryContainer === VOID ? this.get_onSecondaryContainer_kcu4m4_k$() : onSecondaryContainer;
    tertiary = tertiary === VOID ? this.get_tertiary_1tbb2a_k$() : tertiary;
    onTertiary = onTertiary === VOID ? this.get_onTertiary_poc2ov_k$() : onTertiary;
    tertiaryContainer = tertiaryContainer === VOID ? this.get_tertiaryContainer_hjp3yr_k$() : tertiaryContainer;
    onTertiaryContainer = onTertiaryContainer === VOID ? this.get_onTertiaryContainer_nli2ge_k$() : onTertiaryContainer;
    background = background === VOID ? this.get_background_8l4942_k$() : background;
    onBackground = onBackground === VOID ? this.get_onBackground_38dzr7_k$() : onBackground;
    surface = surface === VOID ? this.get_surface_ya87t7_k$() : surface;
    onSurface = onSurface === VOID ? this.get_onSurface_x1u0ac_k$() : onSurface;
    surfaceVariant = surfaceVariant === VOID ? this.get_surfaceVariant_jeodjc_k$() : surfaceVariant;
    onSurfaceVariant = onSurfaceVariant === VOID ? this.get_onSurfaceVariant_3w3xj_k$() : onSurfaceVariant;
    surfaceTint = surfaceTint === VOID ? this.get_surfaceTint_65z9bu_k$() : surfaceTint;
    inverseSurface = inverseSurface === VOID ? this.get_inverseSurface_jq4y99_k$() : inverseSurface;
    inverseOnSurface = inverseOnSurface === VOID ? this.get_inverseOnSurface_u9t8k2_k$() : inverseOnSurface;
    error = error === VOID ? this.get_error_5j21ve_k$() : error;
    onError = onError === VOID ? this.get_onError_r18it5_k$() : onError;
    errorContainer = errorContainer === VOID ? this.get_errorContainer_2c9dd5_k$() : errorContainer;
    onErrorContainer = onErrorContainer === VOID ? this.get_onErrorContainer_gyiw8o_k$() : onErrorContainer;
    outline = outline === VOID ? this.get_outline_ezfrnk_k$() : outline;
    outlineVariant = outlineVariant === VOID ? this.get_outlineVariant_ctjh3h_k$() : outlineVariant;
    scrim = scrim === VOID ? this.get_scrim_ltye0s_k$() : scrim;
    return $super === VOID ? this.copy_fmcge_k$(primary, onPrimary, primaryContainer, onPrimaryContainer, inversePrimary, secondary, onSecondary, secondaryContainer, onSecondaryContainer, tertiary, onTertiary, tertiaryContainer, onTertiaryContainer, background, onBackground, surface, onSurface, surfaceVariant, onSurfaceVariant, surfaceTint, inverseSurface, inverseOnSurface, error, onError, errorContainer, onErrorContainer, outline, outlineVariant, scrim) : $super.copy_fmcge_k$.call(this, new Color(primary), new Color(onPrimary), new Color(primaryContainer), new Color(onPrimaryContainer), new Color(inversePrimary), new Color(secondary), new Color(onSecondary), new Color(secondaryContainer), new Color(onSecondaryContainer), new Color(tertiary), new Color(onTertiary), new Color(tertiaryContainer), new Color(onTertiaryContainer), new Color(background), new Color(onBackground), new Color(surface), new Color(onSurface), new Color(surfaceVariant), new Color(onSurfaceVariant), new Color(surfaceTint), new Color(inverseSurface), new Color(inverseOnSurface), new Color(error), new Color(onError), new Color(errorContainer), new Color(onErrorContainer), new Color(outline), new Color(outlineVariant), new Color(scrim));
  };
  protoOf(ColorScheme).toString = function () {
    return 'ColorScheme(' + ('primary=' + new Color(this.get_primary_gfn28_k$())) + ('onPrimary=' + new Color(this.get_onPrimary_45hgxt_k$())) + ('primaryContainer=' + new Color(this.get_primaryContainer_7luo29_k$())) + ('onPrimaryContainer=' + new Color(this.get_onPrimaryContainer_fg0rle_k$())) + ('inversePrimary=' + new Color(this.get_inversePrimary_e3nmhq_k$())) + ('secondary=' + new Color(this.get_secondary_tgxf9q_k$())) + ('onSecondary=' + new Color(this.get_onSecondary_taplxp_k$())) + ('secondaryContainer=' + new Color(this.get_secondaryContainer_nfol4t_k$())) + ('onSecondaryContainer=' + new Color(this.get_onSecondaryContainer_kcu4m4_k$())) + ('tertiary=' + new Color(this.get_tertiary_1tbb2a_k$())) + ('onTertiary=' + new Color(this.get_onTertiary_poc2ov_k$())) + ('tertiaryContainer=' + new Color(this.get_tertiaryContainer_hjp3yr_k$())) + ('onTertiaryContainer=' + new Color(this.get_onTertiaryContainer_nli2ge_k$())) + ('background=' + new Color(this.get_background_8l4942_k$())) + ('onBackground=' + new Color(this.get_onBackground_38dzr7_k$())) + ('surface=' + new Color(this.get_surface_ya87t7_k$())) + ('onSurface=' + new Color(this.get_onSurface_x1u0ac_k$())) + ('surfaceVariant=' + new Color(this.get_surfaceVariant_jeodjc_k$())) + ('onSurfaceVariant=' + new Color(this.get_onSurfaceVariant_3w3xj_k$())) + ('surfaceTint=' + new Color(this.get_surfaceTint_65z9bu_k$())) + ('inverseSurface=' + new Color(this.get_inverseSurface_jq4y99_k$())) + ('inverseOnSurface=' + new Color(this.get_inverseOnSurface_u9t8k2_k$())) + ('error=' + new Color(this.get_error_5j21ve_k$())) + ('onError=' + new Color(this.get_onError_r18it5_k$())) + ('errorContainer=' + new Color(this.get_errorContainer_2c9dd5_k$())) + ('onErrorContainer=' + new Color(this.get_onErrorContainer_gyiw8o_k$())) + ('outline=' + new Color(this.get_outline_ezfrnk_k$())) + ('outlineVariant=' + new Color(this.get_outlineVariant_ctjh3h_k$())) + ('scrim=' + new Color(this.get_scrim_ltye0s_k$())) + ')';
  };
  function lightColorScheme(primary, onPrimary, primaryContainer, onPrimaryContainer, inversePrimary, secondary, onSecondary, secondaryContainer, onSecondaryContainer, tertiary, onTertiary, tertiaryContainer, onTertiaryContainer, background, onBackground, surface, onSurface, surfaceVariant, onSurfaceVariant, surfaceTint, inverseSurface, inverseOnSurface, error, onError, errorContainer, onErrorContainer, outline, outlineVariant, scrim) {
    primary = primary === VOID ? ColorLightTokens_getInstance().get_Primary_dhch28_k$() : primary;
    onPrimary = onPrimary === VOID ? ColorLightTokens_getInstance().get_OnPrimary_k24na9_k$() : onPrimary;
    primaryContainer = primaryContainer === VOID ? ColorLightTokens_getInstance().get_PrimaryContainer_4731lb_k$() : primaryContainer;
    onPrimaryContainer = onPrimaryContainer === VOID ? ColorLightTokens_getInstance().get_OnPrimaryContainer_y30c4u_k$() : onPrimaryContainer;
    inversePrimary = inversePrimary === VOID ? ColorLightTokens_getInstance().get_InversePrimary_wbtmrm_k$() : inversePrimary;
    secondary = secondary === VOID ? ColorLightTokens_getInstance().get_Secondary_dka8xa_k$() : secondary;
    onSecondary = onSecondary === VOID ? ColorLightTokens_getInstance().get_OnSecondary_ej90fh_k$() : onSecondary;
    secondaryContainer = secondaryContainer === VOID ? ColorLightTokens_getInstance().get_SecondaryContainer_1xlmvx_k$() : secondaryContainer;
    onSecondaryContainer = onSecondaryContainer === VOID ? ColorLightTokens_getInstance().get_OnSecondaryContainer_qntw58_k$() : onSecondaryContainer;
    tertiary = tertiary === VOID ? ColorLightTokens_getInstance().get_Tertiary_kl36se_k$() : tertiary;
    onTertiary = onTertiary === VOID ? ColorLightTokens_getInstance().get_OnTertiary_ts5zsv_k$() : onTertiary;
    tertiaryContainer = tertiaryContainer === VOID ? ColorLightTokens_getInstance().get_TertiaryContainer_6s8ak3_k$() : tertiaryContainer;
    onTertiaryContainer = onTertiaryContainer === VOID ? ColorLightTokens_getInstance().get_OnTertiaryContainer_3p0xf6_k$() : onTertiaryContainer;
    background = background === VOID ? ColorLightTokens_getInstance().get_Background_coy682_k$() : background;
    onBackground = onBackground === VOID ? ColorLightTokens_getInstance().get_OnBackground_s88731_k$() : onBackground;
    surface = surface === VOID ? ColorLightTokens_getInstance().get_Surface_npz05x_k$() : surface;
    onSurface = onSurface === VOID ? ColorLightTokens_getInstance().get_OnSurface_h56txw_k$() : onSurface;
    surfaceVariant = surfaceVariant === VOID ? ColorLightTokens_getInstance().get_SurfaceVariant_56yf6g_k$() : surfaceVariant;
    onSurfaceVariant = onSurfaceVariant === VOID ? ColorLightTokens_getInstance().get_OnSurfaceVariant_bwttl3_k$() : onSurfaceVariant;
    surfaceTint = surfaceTint === VOID ? primary : surfaceTint;
    inverseSurface = inverseSurface === VOID ? ColorLightTokens_getInstance().get_InverseSurface_4vhugj_k$() : inverseSurface;
    inverseOnSurface = inverseOnSurface === VOID ? ColorLightTokens_getInstance().get_InverseOnSurface_igviwi_k$() : inverseOnSurface;
    error = error === VOID ? ColorLightTokens_getInstance().get_Error_kfehgm_k$() : error;
    onError = onError === VOID ? ColorLightTokens_getInstance().get_OnError_e0bot5_k$() : onError;
    errorContainer = errorContainer === VOID ? ColorLightTokens_getInstance().get_ErrorContainer_m9dfcn_k$() : errorContainer;
    onErrorContainer = onErrorContainer === VOID ? ColorLightTokens_getInstance().get_OnErrorContainer_55l6l4_k$() : onErrorContainer;
    outline = outline === VOID ? ColorLightTokens_getInstance().get_Outline_s0clnk_k$() : outline;
    outlineVariant = outlineVariant === VOID ? ColorLightTokens_getInstance().get_OutlineVariant_xlxs5v_k$() : outlineVariant;
    scrim = scrim === VOID ? ColorLightTokens_getInstance().get_Scrim_44i5b8_k$() : scrim;
    _init_properties_ColorScheme_kt__xhtsty();
    return new ColorScheme(primary, onPrimary, primaryContainer, onPrimaryContainer, inversePrimary, secondary, onSecondary, secondaryContainer, onSecondaryContainer, tertiary, onTertiary, tertiaryContainer, onTertiaryContainer, background, onBackground, surface, onSurface, surfaceVariant, onSurfaceVariant, surfaceTint, inverseSurface, inverseOnSurface, error, onError, errorContainer, onErrorContainer, outline, outlineVariant, scrim);
  }
  function toColor$composable(_this__u8e3s4, $composer, $changed) {
    _init_properties_ColorScheme_kt__xhtsty();
    var $composer_0 = $composer;
    sourceInformationMarkerStart($composer_0, 1129189448, 'C(toColor$composable)612@27498L11:ColorScheme.kt#uh7d8r');
    if (isTraceInProgress()) {
      traceEventStart(1129189448, $changed, -1, 'androidx.compose.material3.toColor$composable (ColorScheme.kt:611)');
    }
    var tmp0 = fromToken(MaterialTheme_getInstance().$get_colorScheme$$composable_t1waqp_k$($composer_0, 6), _this__u8e3s4);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    sourceInformationMarkerEnd($composer_0);
    return tmp0;
  }
  function fromToken(_this__u8e3s4, value) {
    _init_properties_ColorScheme_kt__xhtsty();
    var tmp;
    switch (value.get_ordinal_ip24qg_k$()) {
      case 0:
        tmp = _this__u8e3s4.get_background_8l4942_k$();
        break;
      case 1:
        tmp = _this__u8e3s4.get_error_5j21ve_k$();
        break;
      case 2:
        tmp = _this__u8e3s4.get_errorContainer_2c9dd5_k$();
        break;
      case 3:
        tmp = _this__u8e3s4.get_inverseOnSurface_u9t8k2_k$();
        break;
      case 4:
        tmp = _this__u8e3s4.get_inversePrimary_e3nmhq_k$();
        break;
      case 5:
        tmp = _this__u8e3s4.get_inverseSurface_jq4y99_k$();
        break;
      case 6:
        tmp = _this__u8e3s4.get_onBackground_38dzr7_k$();
        break;
      case 7:
        tmp = _this__u8e3s4.get_onError_r18it5_k$();
        break;
      case 8:
        tmp = _this__u8e3s4.get_onErrorContainer_gyiw8o_k$();
        break;
      case 9:
        tmp = _this__u8e3s4.get_onPrimary_45hgxt_k$();
        break;
      case 10:
        tmp = _this__u8e3s4.get_onPrimaryContainer_fg0rle_k$();
        break;
      case 11:
        tmp = _this__u8e3s4.get_onSecondary_taplxp_k$();
        break;
      case 12:
        tmp = _this__u8e3s4.get_onSecondaryContainer_kcu4m4_k$();
        break;
      case 13:
        tmp = _this__u8e3s4.get_onSurface_x1u0ac_k$();
        break;
      case 14:
        tmp = _this__u8e3s4.get_onSurfaceVariant_3w3xj_k$();
        break;
      case 25:
        tmp = _this__u8e3s4.get_surfaceTint_65z9bu_k$();
        break;
      case 15:
        tmp = _this__u8e3s4.get_onTertiary_poc2ov_k$();
        break;
      case 16:
        tmp = _this__u8e3s4.get_onTertiaryContainer_nli2ge_k$();
        break;
      case 17:
        tmp = _this__u8e3s4.get_outline_ezfrnk_k$();
        break;
      case 18:
        tmp = _this__u8e3s4.get_outlineVariant_ctjh3h_k$();
        break;
      case 19:
        tmp = _this__u8e3s4.get_primary_gfn28_k$();
        break;
      case 20:
        tmp = _this__u8e3s4.get_primaryContainer_7luo29_k$();
        break;
      case 21:
        tmp = _this__u8e3s4.get_scrim_ltye0s_k$();
        break;
      case 22:
        tmp = _this__u8e3s4.get_secondary_tgxf9q_k$();
        break;
      case 23:
        tmp = _this__u8e3s4.get_secondaryContainer_nfol4t_k$();
        break;
      case 24:
        tmp = _this__u8e3s4.get_surface_ya87t7_k$();
        break;
      case 26:
        tmp = _this__u8e3s4.get_surfaceVariant_jeodjc_k$();
        break;
      case 27:
        tmp = _this__u8e3s4.get_tertiary_1tbb2a_k$();
        break;
      case 28:
        tmp = _this__u8e3s4.get_tertiaryContainer_hjp3yr_k$();
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  }
  function LocalColorScheme$lambda() {
    _init_properties_ColorScheme_kt__xhtsty();
    return lightColorScheme();
  }
  function primary$factory() {
    return getPropertyCallableRef('primary', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_primary_gfn28_k$());
    }, function (receiver, value) {
      return receiver.set_primary_1oxcea_k$(value.value_1);
    });
  }
  function primary$factory_0() {
    return getPropertyCallableRef('primary', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_primary_gfn28_k$());
    }, function (receiver, value) {
      return receiver.set_primary_1oxcea_k$(value.value_1);
    });
  }
  function onPrimary$factory() {
    return getPropertyCallableRef('onPrimary', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_onPrimary_45hgxt_k$());
    }, function (receiver, value) {
      return receiver.set_onPrimary_8yocyr_k$(value.value_1);
    });
  }
  function onPrimary$factory_0() {
    return getPropertyCallableRef('onPrimary', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_onPrimary_45hgxt_k$());
    }, function (receiver, value) {
      return receiver.set_onPrimary_8yocyr_k$(value.value_1);
    });
  }
  function primaryContainer$factory() {
    return getPropertyCallableRef('primaryContainer', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_primaryContainer_7luo29_k$());
    }, function (receiver, value) {
      return receiver.set_primaryContainer_qlrn21_k$(value.value_1);
    });
  }
  function primaryContainer$factory_0() {
    return getPropertyCallableRef('primaryContainer', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_primaryContainer_7luo29_k$());
    }, function (receiver, value) {
      return receiver.set_primaryContainer_qlrn21_k$(value.value_1);
    });
  }
  function onPrimaryContainer$factory() {
    return getPropertyCallableRef('onPrimaryContainer', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_onPrimaryContainer_fg0rle_k$());
    }, function (receiver, value) {
      return receiver.set_onPrimaryContainer_n35pu0_k$(value.value_1);
    });
  }
  function onPrimaryContainer$factory_0() {
    return getPropertyCallableRef('onPrimaryContainer', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_onPrimaryContainer_fg0rle_k$());
    }, function (receiver, value) {
      return receiver.set_onPrimaryContainer_n35pu0_k$(value.value_1);
    });
  }
  function inversePrimary$factory() {
    return getPropertyCallableRef('inversePrimary', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_inversePrimary_e3nmhq_k$());
    }, function (receiver, value) {
      return receiver.set_inversePrimary_lkn910_k$(value.value_1);
    });
  }
  function inversePrimary$factory_0() {
    return getPropertyCallableRef('inversePrimary', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_inversePrimary_e3nmhq_k$());
    }, function (receiver, value) {
      return receiver.set_inversePrimary_lkn910_k$(value.value_1);
    });
  }
  function secondary$factory() {
    return getPropertyCallableRef('secondary', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_secondary_tgxf9q_k$());
    }, function (receiver, value) {
      return receiver.set_secondary_m6t3ck_k$(value.value_1);
    });
  }
  function secondary$factory_0() {
    return getPropertyCallableRef('secondary', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_secondary_tgxf9q_k$());
    }, function (receiver, value) {
      return receiver.set_secondary_m6t3ck_k$(value.value_1);
    });
  }
  function onSecondary$factory() {
    return getPropertyCallableRef('onSecondary', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_onSecondary_taplxp_k$());
    }, function (receiver, value) {
      return receiver.set_onSecondary_ml65pn_k$(value.value_1);
    });
  }
  function onSecondary$factory_0() {
    return getPropertyCallableRef('onSecondary', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_onSecondary_taplxp_k$());
    }, function (receiver, value) {
      return receiver.set_onSecondary_ml65pn_k$(value.value_1);
    });
  }
  function secondaryContainer$factory() {
    return getPropertyCallableRef('secondaryContainer', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_secondaryContainer_nfol4t_k$());
    }, function (receiver, value) {
      return receiver.set_secondaryContainer_f10xon_k$(value.value_1);
    });
  }
  function secondaryContainer$factory_0() {
    return getPropertyCallableRef('secondaryContainer', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_secondaryContainer_nfol4t_k$());
    }, function (receiver, value) {
      return receiver.set_secondaryContainer_f10xon_k$(value.value_1);
    });
  }
  function onSecondaryContainer$factory() {
    return getPropertyCallableRef('onSecondaryContainer', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_onSecondaryContainer_kcu4m4_k$());
    }, function (receiver, value) {
      return receiver.set_onSecondaryContainer_6lr9ve_k$(value.value_1);
    });
  }
  function onSecondaryContainer$factory_0() {
    return getPropertyCallableRef('onSecondaryContainer', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_onSecondaryContainer_kcu4m4_k$());
    }, function (receiver, value) {
      return receiver.set_onSecondaryContainer_6lr9ve_k$(value.value_1);
    });
  }
  function tertiary$factory() {
    return getPropertyCallableRef('tertiary', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_tertiary_1tbb2a_k$());
    }, function (receiver, value) {
      return receiver.set_tertiary_6scu7g_k$(value.value_1);
    });
  }
  function tertiary$factory_0() {
    return getPropertyCallableRef('tertiary', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_tertiary_1tbb2a_k$());
    }, function (receiver, value) {
      return receiver.set_tertiary_6scu7g_k$(value.value_1);
    });
  }
  function onTertiary$factory() {
    return getPropertyCallableRef('onTertiary', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_onTertiary_poc2ov_k$());
    }, function (receiver, value) {
      return receiver.set_onTertiary_j3a5wr_k$(value.value_1);
    });
  }
  function onTertiary$factory_0() {
    return getPropertyCallableRef('onTertiary', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_onTertiary_poc2ov_k$());
    }, function (receiver, value) {
      return receiver.set_onTertiary_j3a5wr_k$(value.value_1);
    });
  }
  function tertiaryContainer$factory() {
    return getPropertyCallableRef('tertiaryContainer', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_tertiaryContainer_hjp3yr_k$());
    }, function (receiver, value) {
      return receiver.set_tertiaryContainer_w1d25t_k$(value.value_1);
    });
  }
  function tertiaryContainer$factory_0() {
    return getPropertyCallableRef('tertiaryContainer', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_tertiaryContainer_hjp3yr_k$());
    }, function (receiver, value) {
      return receiver.set_tertiaryContainer_w1d25t_k$(value.value_1);
    });
  }
  function onTertiaryContainer$factory() {
    return getPropertyCallableRef('onTertiaryContainer', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_onTertiaryContainer_nli2ge_k$());
    }, function (receiver, value) {
      return receiver.set_onTertiaryContainer_9tlya8_k$(value.value_1);
    });
  }
  function onTertiaryContainer$factory_0() {
    return getPropertyCallableRef('onTertiaryContainer', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_onTertiaryContainer_nli2ge_k$());
    }, function (receiver, value) {
      return receiver.set_onTertiaryContainer_9tlya8_k$(value.value_1);
    });
  }
  function background$factory() {
    return getPropertyCallableRef('background', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_background_8l4942_k$());
    }, function (receiver, value) {
      return receiver.set_background_jj6oi0_k$(value.value_1);
    });
  }
  function background$factory_0() {
    return getPropertyCallableRef('background', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_background_8l4942_k$());
    }, function (receiver, value) {
      return receiver.set_background_jj6oi0_k$(value.value_1);
    });
  }
  function onBackground$factory() {
    return getPropertyCallableRef('onBackground', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_onBackground_38dzr7_k$());
    }, function (receiver, value) {
      return receiver.set_onBackground_iz12ux_k$(value.value_1);
    });
  }
  function onBackground$factory_0() {
    return getPropertyCallableRef('onBackground', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_onBackground_38dzr7_k$());
    }, function (receiver, value) {
      return receiver.set_onBackground_iz12ux_k$(value.value_1);
    });
  }
  function surface$factory() {
    return getPropertyCallableRef('surface', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_surface_ya87t7_k$());
    }, function (receiver, value) {
      return receiver.set_surface_59aa25_k$(value.value_1);
    });
  }
  function surface$factory_0() {
    return getPropertyCallableRef('surface', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_surface_ya87t7_k$());
    }, function (receiver, value) {
      return receiver.set_surface_59aa25_k$(value.value_1);
    });
  }
  function onSurface$factory() {
    return getPropertyCallableRef('onSurface', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_onSurface_x1u0ac_k$());
    }, function (receiver, value) {
      return receiver.set_onSurface_cj1amm_k$(value.value_1);
    });
  }
  function onSurface$factory_0() {
    return getPropertyCallableRef('onSurface', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_onSurface_x1u0ac_k$());
    }, function (receiver, value) {
      return receiver.set_onSurface_cj1amm_k$(value.value_1);
    });
  }
  function surfaceVariant$factory() {
    return getPropertyCallableRef('surfaceVariant', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_surfaceVariant_jeodjc_k$());
    }, function (receiver, value) {
      return receiver.set_surfaceVariant_dmx09a_k$(value.value_1);
    });
  }
  function surfaceVariant$factory_0() {
    return getPropertyCallableRef('surfaceVariant', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_surfaceVariant_jeodjc_k$());
    }, function (receiver, value) {
      return receiver.set_surfaceVariant_dmx09a_k$(value.value_1);
    });
  }
  function onSurfaceVariant$factory() {
    return getPropertyCallableRef('onSurfaceVariant', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_onSurfaceVariant_3w3xj_k$());
    }, function (receiver, value) {
      return receiver.set_onSurfaceVariant_oax19t_k$(value.value_1);
    });
  }
  function onSurfaceVariant$factory_0() {
    return getPropertyCallableRef('onSurfaceVariant', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_onSurfaceVariant_3w3xj_k$());
    }, function (receiver, value) {
      return receiver.set_onSurfaceVariant_oax19t_k$(value.value_1);
    });
  }
  function surfaceTint$factory() {
    return getPropertyCallableRef('surfaceTint', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_surfaceTint_65z9bu_k$());
    }, function (receiver, value) {
      return receiver.set_surfaceTint_ega53c_k$(value.value_1);
    });
  }
  function surfaceTint$factory_0() {
    return getPropertyCallableRef('surfaceTint', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_surfaceTint_65z9bu_k$());
    }, function (receiver, value) {
      return receiver.set_surfaceTint_ega53c_k$(value.value_1);
    });
  }
  function inverseSurface$factory() {
    return getPropertyCallableRef('inverseSurface', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_inverseSurface_jq4y99_k$());
    }, function (receiver, value) {
      return receiver.set_inverseSurface_i0abd5_k$(value.value_1);
    });
  }
  function inverseSurface$factory_0() {
    return getPropertyCallableRef('inverseSurface', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_inverseSurface_jq4y99_k$());
    }, function (receiver, value) {
      return receiver.set_inverseSurface_i0abd5_k$(value.value_1);
    });
  }
  function inverseOnSurface$factory() {
    return getPropertyCallableRef('inverseOnSurface', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_inverseOnSurface_u9t8k2_k$());
    }, function (receiver, value) {
      return receiver.set_inverseOnSurface_sqqo0o_k$(value.value_1);
    });
  }
  function inverseOnSurface$factory_0() {
    return getPropertyCallableRef('inverseOnSurface', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_inverseOnSurface_u9t8k2_k$());
    }, function (receiver, value) {
      return receiver.set_inverseOnSurface_sqqo0o_k$(value.value_1);
    });
  }
  function error$factory() {
    return getPropertyCallableRef('error', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_error_5j21ve_k$());
    }, function (receiver, value) {
      return receiver.set_error_xl056w_k$(value.value_1);
    });
  }
  function error$factory_0() {
    return getPropertyCallableRef('error', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_error_5j21ve_k$());
    }, function (receiver, value) {
      return receiver.set_error_xl056w_k$(value.value_1);
    });
  }
  function onError$factory() {
    return getPropertyCallableRef('onError', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_onError_r18it5_k$());
    }, function (receiver, value) {
      return receiver.set_onError_c35gwn_k$(value.value_1);
    });
  }
  function onError$factory_0() {
    return getPropertyCallableRef('onError', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_onError_r18it5_k$());
    }, function (receiver, value) {
      return receiver.set_onError_c35gwn_k$(value.value_1);
    });
  }
  function errorContainer$factory() {
    return getPropertyCallableRef('errorContainer', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_errorContainer_2c9dd5_k$());
    }, function (receiver, value) {
      return receiver.set_errorContainer_lqw837_k$(value.value_1);
    });
  }
  function errorContainer$factory_0() {
    return getPropertyCallableRef('errorContainer', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_errorContainer_2c9dd5_k$());
    }, function (receiver, value) {
      return receiver.set_errorContainer_lqw837_k$(value.value_1);
    });
  }
  function onErrorContainer$factory() {
    return getPropertyCallableRef('onErrorContainer', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_onErrorContainer_gyiw8o_k$());
    }, function (receiver, value) {
      return receiver.set_onErrorContainer_bcdscu_k$(value.value_1);
    });
  }
  function onErrorContainer$factory_0() {
    return getPropertyCallableRef('onErrorContainer', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_onErrorContainer_gyiw8o_k$());
    }, function (receiver, value) {
      return receiver.set_onErrorContainer_bcdscu_k$(value.value_1);
    });
  }
  function outline$factory() {
    return getPropertyCallableRef('outline', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_outline_ezfrnk_k$());
    }, function (receiver, value) {
      return receiver.set_outline_q7gshu_k$(value.value_1);
    });
  }
  function outline$factory_0() {
    return getPropertyCallableRef('outline', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_outline_ezfrnk_k$());
    }, function (receiver, value) {
      return receiver.set_outline_q7gshu_k$(value.value_1);
    });
  }
  function outlineVariant$factory() {
    return getPropertyCallableRef('outlineVariant', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_outlineVariant_ctjh3h_k$());
    }, function (receiver, value) {
      return receiver.set_outlineVariant_y39dkt_k$(value.value_1);
    });
  }
  function outlineVariant$factory_0() {
    return getPropertyCallableRef('outlineVariant', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_outlineVariant_ctjh3h_k$());
    }, function (receiver, value) {
      return receiver.set_outlineVariant_y39dkt_k$(value.value_1);
    });
  }
  function scrim$factory() {
    return getPropertyCallableRef('scrim', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_scrim_ltye0s_k$());
    }, function (receiver, value) {
      return receiver.set_scrim_vz501m_k$(value.value_1);
    });
  }
  function scrim$factory_0() {
    return getPropertyCallableRef('scrim', 1, KMutableProperty1, function (receiver) {
      return new Color(receiver.get_scrim_ltye0s_k$());
    }, function (receiver, value) {
      return receiver.set_scrim_vz501m_k$(value.value_1);
    });
  }
  var properties_initialized_ColorScheme_kt_ox8mco;
  function _init_properties_ColorScheme_kt__xhtsty() {
    if (!properties_initialized_ColorScheme_kt_ox8mco) {
      properties_initialized_ColorScheme_kt_ox8mco = true;
      LocalColorScheme = staticCompositionLocalOf(LocalColorScheme$lambda);
    }
  }
  function get_LocalContentColor() {
    _init_properties_ContentColor_kt__5mda8a();
    return LocalContentColor;
  }
  var LocalContentColor;
  function LocalContentColor$lambda() {
    _init_properties_ContentColor_kt__5mda8a();
    return new Color(Companion_getInstance().get_Black_t4k9fh_k$());
  }
  var properties_initialized_ContentColor_kt_sc8rw;
  function _init_properties_ContentColor_kt__5mda8a() {
    if (!properties_initialized_ContentColor_kt_sc8rw) {
      properties_initialized_ContentColor_kt_sc8rw = true;
      LocalContentColor = compositionLocalOf(VOID, LocalContentColor$lambda);
    }
  }
  function get_InputTextFieldPadding() {
    _init_properties_DateInput_kt__jvuocq();
    return InputTextFieldPadding;
  }
  var InputTextFieldPadding;
  function get_InputTextNonErroneousBottomPadding() {
    _init_properties_DateInput_kt__jvuocq();
    return InputTextNonErroneousBottomPadding;
  }
  var InputTextNonErroneousBottomPadding;
  var properties_initialized_DateInput_kt_esn6dw;
  function _init_properties_DateInput_kt__jvuocq() {
    if (!properties_initialized_DateInput_kt_esn6dw) {
      properties_initialized_DateInput_kt_esn6dw = true;
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp0_start = _Dp___init__impl__ms3zkb(24);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp1_end = _Dp___init__impl__ms3zkb(24);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp2_top = _Dp___init__impl__ms3zkb(10);
      InputTextFieldPadding = PaddingValues_0(tmp0_start, tmp2_top, tmp1_end);
      // Inline function 'androidx.compose.ui.unit.dp' call
      InputTextNonErroneousBottomPadding = _Dp___init__impl__ms3zkb(16);
    }
  }
  function get_RecommendedSizeForAccessibility() {
    _init_properties_DatePicker_kt__2h6qbg();
    return RecommendedSizeForAccessibility;
  }
  var RecommendedSizeForAccessibility;
  function get_MonthYearHeight() {
    _init_properties_DatePicker_kt__2h6qbg();
    return MonthYearHeight;
  }
  var MonthYearHeight;
  function get_DatePickerHorizontalPadding() {
    _init_properties_DatePicker_kt__2h6qbg();
    return DatePickerHorizontalPadding;
  }
  var DatePickerHorizontalPadding;
  function get_DatePickerModeTogglePadding() {
    _init_properties_DatePicker_kt__2h6qbg();
    return DatePickerModeTogglePadding;
  }
  var DatePickerModeTogglePadding;
  function get_DatePickerTitlePadding() {
    _init_properties_DatePicker_kt__2h6qbg();
    return DatePickerTitlePadding;
  }
  var DatePickerTitlePadding;
  function get_DatePickerHeadlinePadding() {
    _init_properties_DatePicker_kt__2h6qbg();
    return DatePickerHeadlinePadding;
  }
  var DatePickerHeadlinePadding;
  function get_YearsVerticalPadding() {
    _init_properties_DatePicker_kt__2h6qbg();
    return YearsVerticalPadding;
  }
  var YearsVerticalPadding;
  var properties_initialized_DatePicker_kt_jeimvy;
  function _init_properties_DatePicker_kt__2h6qbg() {
    if (!properties_initialized_DatePicker_kt_jeimvy) {
      properties_initialized_DatePicker_kt_jeimvy = true;
      // Inline function 'androidx.compose.ui.unit.dp' call
      RecommendedSizeForAccessibility = _Dp___init__impl__ms3zkb(48);
      // Inline function 'androidx.compose.ui.unit.dp' call
      MonthYearHeight = _Dp___init__impl__ms3zkb(56);
      // Inline function 'androidx.compose.ui.unit.dp' call
      DatePickerHorizontalPadding = _Dp___init__impl__ms3zkb(12);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp = _Dp___init__impl__ms3zkb(12);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$1 = _Dp___init__impl__ms3zkb(12);
      DatePickerModeTogglePadding = PaddingValues_0(VOID, VOID, tmp, tmp$ret$1);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp0_start = _Dp___init__impl__ms3zkb(24);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp1_end = _Dp___init__impl__ms3zkb(12);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp2_top = _Dp___init__impl__ms3zkb(16);
      DatePickerTitlePadding = PaddingValues_0(tmp0_start, tmp2_top, tmp1_end);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp_0 = _Dp___init__impl__ms3zkb(24);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp_1 = _Dp___init__impl__ms3zkb(12);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$2 = _Dp___init__impl__ms3zkb(12);
      DatePickerHeadlinePadding = PaddingValues_0(tmp_0, VOID, tmp_1, tmp$ret$2);
      // Inline function 'androidx.compose.ui.unit.dp' call
      YearsVerticalPadding = _Dp___init__impl__ms3zkb(16);
    }
  }
  function get_TextFieldSpacing() {
    _init_properties_DateRangeInput_kt__b3a4l7();
    return TextFieldSpacing;
  }
  var TextFieldSpacing;
  var properties_initialized_DateRangeInput_kt_g6vt4t;
  function _init_properties_DateRangeInput_kt__b3a4l7() {
    if (!properties_initialized_DateRangeInput_kt_g6vt4t) {
      properties_initialized_DateRangeInput_kt_g6vt4t = true;
      // Inline function 'androidx.compose.ui.unit.dp' call
      TextFieldSpacing = _Dp___init__impl__ms3zkb(8);
    }
  }
  function get_CalendarMonthSubheadPadding() {
    _init_properties_DateRangePicker_kt__dzxxij();
    return CalendarMonthSubheadPadding;
  }
  var CalendarMonthSubheadPadding;
  function get_DateRangePickerTitlePadding() {
    _init_properties_DateRangePicker_kt__dzxxij();
    return DateRangePickerTitlePadding;
  }
  var DateRangePickerTitlePadding;
  function get_DateRangePickerHeadlinePadding() {
    _init_properties_DateRangePicker_kt__dzxxij();
    return DateRangePickerHeadlinePadding;
  }
  var DateRangePickerHeadlinePadding;
  function get_HeaderHeightOffset() {
    _init_properties_DateRangePicker_kt__dzxxij();
    return HeaderHeightOffset;
  }
  var HeaderHeightOffset;
  var properties_initialized_DateRangePicker_kt_efpjo3;
  function _init_properties_DateRangePicker_kt__dzxxij() {
    if (!properties_initialized_DateRangePicker_kt_efpjo3) {
      properties_initialized_DateRangePicker_kt_efpjo3 = true;
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp = _Dp___init__impl__ms3zkb(24);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp_0 = _Dp___init__impl__ms3zkb(20);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$2 = _Dp___init__impl__ms3zkb(8);
      CalendarMonthSubheadPadding = PaddingValues_0(tmp, tmp_0, VOID, tmp$ret$2);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp_1 = _Dp___init__impl__ms3zkb(64);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$1 = _Dp___init__impl__ms3zkb(12);
      DateRangePickerTitlePadding = PaddingValues_0(tmp_1, VOID, tmp$ret$1);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp_2 = _Dp___init__impl__ms3zkb(64);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp_3 = _Dp___init__impl__ms3zkb(12);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$2_0 = _Dp___init__impl__ms3zkb(12);
      DateRangePickerHeadlinePadding = PaddingValues_0(tmp_2, VOID, tmp_3, tmp$ret$2_0);
      // Inline function 'androidx.compose.ui.unit.dp' call
      HeaderHeightOffset = _Dp___init__impl__ms3zkb(60);
    }
  }
  function get_mouseSlop() {
    _init_properties_DragGestureDetectorCopy_kt__xx601u();
    return mouseSlop;
  }
  var mouseSlop;
  function get_defaultTouchSlop() {
    _init_properties_DragGestureDetectorCopy_kt__xx601u();
    return defaultTouchSlop;
  }
  var defaultTouchSlop;
  function get_mouseToTouchSlopRatio() {
    _init_properties_DragGestureDetectorCopy_kt__xx601u();
    return mouseToTouchSlopRatio;
  }
  var mouseToTouchSlopRatio;
  var properties_initialized_DragGestureDetectorCopy_kt_anevhc;
  function _init_properties_DragGestureDetectorCopy_kt__xx601u() {
    if (!properties_initialized_DragGestureDetectorCopy_kt_anevhc) {
      properties_initialized_DragGestureDetectorCopy_kt_anevhc = true;
      // Inline function 'androidx.compose.ui.unit.dp' call
      mouseSlop = _Dp___init__impl__ms3zkb(0.125);
      // Inline function 'androidx.compose.ui.unit.dp' call
      defaultTouchSlop = _Dp___init__impl__ms3zkb(18);
      // Inline function 'androidx.compose.ui.unit.Dp.div' call
      var this_0 = get_mouseSlop();
      var other = get_defaultTouchSlop();
      mouseToTouchSlopRatio = _Dp___get_value__impl__geb1vb(this_0) / _Dp___get_value__impl__geb1vb(other);
    }
  }
  function get_OutgoingSpecEasing() {
    _init_properties_Elevation_kt__80i8t1();
    return OutgoingSpecEasing;
  }
  var OutgoingSpecEasing;
  function get_DefaultIncomingSpec() {
    _init_properties_Elevation_kt__80i8t1();
    return DefaultIncomingSpec;
  }
  var DefaultIncomingSpec;
  function get_DefaultOutgoingSpec() {
    _init_properties_Elevation_kt__80i8t1();
    return DefaultOutgoingSpec;
  }
  var DefaultOutgoingSpec;
  function get_HoveredOutgoingSpec() {
    _init_properties_Elevation_kt__80i8t1();
    return HoveredOutgoingSpec;
  }
  var HoveredOutgoingSpec;
  var properties_initialized_Elevation_kt_70s6ab;
  function _init_properties_Elevation_kt__80i8t1() {
    if (!properties_initialized_Elevation_kt_70s6ab) {
      properties_initialized_Elevation_kt_70s6ab = true;
      OutgoingSpecEasing = new CubicBezierEasing(0.4, 0.0, 0.6, 1.0);
      DefaultIncomingSpec = new TweenSpec(120, VOID, get_FastOutSlowInEasing());
      DefaultOutgoingSpec = new TweenSpec(150, VOID, get_OutgoingSpecEasing());
      HoveredOutgoingSpec = new TweenSpec(120, VOID, get_OutgoingSpecEasing());
    }
  }
  function ExperimentalMaterial3Api() {
  }
  protoOf(ExperimentalMaterial3Api).equals = function (other) {
    if (!(other instanceof ExperimentalMaterial3Api))
      return false;
    other instanceof ExperimentalMaterial3Api || THROW_CCE();
    return true;
  };
  protoOf(ExperimentalMaterial3Api).hashCode = function () {
    return 0;
  };
  protoOf(ExperimentalMaterial3Api).toString = function () {
    return '@androidx.compose.material3.ExperimentalMaterial3Api()';
  };
  function get_ExposedDropdownMenuItemHorizontalPadding() {
    _init_properties_ExposedDropdownMenu_kt__xv4axu();
    return ExposedDropdownMenuItemHorizontalPadding;
  }
  var ExposedDropdownMenuItemHorizontalPadding;
  var properties_initialized_ExposedDropdownMenu_kt_akgksg;
  function _init_properties_ExposedDropdownMenu_kt__xv4axu() {
    if (!properties_initialized_ExposedDropdownMenu_kt_akgksg) {
      properties_initialized_ExposedDropdownMenu_kt_akgksg = true;
      // Inline function 'androidx.compose.ui.unit.dp' call
      ExposedDropdownMenuItemHorizontalPadding = _Dp___init__impl__ms3zkb(16);
    }
  }
  function get_ExtendedFabStartIconPadding() {
    _init_properties_FloatingActionButton_kt__r7rs26();
    return ExtendedFabStartIconPadding;
  }
  var ExtendedFabStartIconPadding;
  function get_ExtendedFabEndIconPadding() {
    _init_properties_FloatingActionButton_kt__r7rs26();
    return ExtendedFabEndIconPadding;
  }
  var ExtendedFabEndIconPadding;
  function get_ExtendedFabTextPadding() {
    _init_properties_FloatingActionButton_kt__r7rs26();
    return ExtendedFabTextPadding;
  }
  var ExtendedFabTextPadding;
  function get_ExtendedFabMinimumWidth() {
    _init_properties_FloatingActionButton_kt__r7rs26();
    return ExtendedFabMinimumWidth;
  }
  var ExtendedFabMinimumWidth;
  function get_ExtendedFabCollapseAnimation() {
    _init_properties_FloatingActionButton_kt__r7rs26();
    return ExtendedFabCollapseAnimation;
  }
  var ExtendedFabCollapseAnimation;
  function get_ExtendedFabExpandAnimation() {
    _init_properties_FloatingActionButton_kt__r7rs26();
    return ExtendedFabExpandAnimation;
  }
  var ExtendedFabExpandAnimation;
  var properties_initialized_FloatingActionButton_kt_6gm10w;
  function _init_properties_FloatingActionButton_kt__r7rs26() {
    if (!properties_initialized_FloatingActionButton_kt_6gm10w) {
      properties_initialized_FloatingActionButton_kt_6gm10w = true;
      // Inline function 'androidx.compose.ui.unit.dp' call
      ExtendedFabStartIconPadding = _Dp___init__impl__ms3zkb(16);
      // Inline function 'androidx.compose.ui.unit.dp' call
      ExtendedFabEndIconPadding = _Dp___init__impl__ms3zkb(12);
      // Inline function 'androidx.compose.ui.unit.dp' call
      ExtendedFabTextPadding = _Dp___init__impl__ms3zkb(20);
      // Inline function 'androidx.compose.ui.unit.dp' call
      ExtendedFabMinimumWidth = _Dp___init__impl__ms3zkb(80);
      ExtendedFabCollapseAnimation = fadeOut(tween(numberToInt(MotionTokens_getInstance().get_DurationShort2_c04snn_k$()), VOID, MotionTokens_getInstance().get_EasingLinearCubicBezier_dc4v3k_k$())).plus_buzi7t_k$(shrinkHorizontally(tween(numberToInt(MotionTokens_getInstance().get_DurationLong2_e150hl_k$()), VOID, MotionTokens_getInstance().get_EasingEmphasizedCubicBezier_6bhect_k$()), Companion_getInstance_0().get_Start_ih4i6x_k$()));
      ExtendedFabExpandAnimation = fadeIn(tween(numberToInt(MotionTokens_getInstance().get_DurationShort4_c04snp_k$()), numberToInt(MotionTokens_getInstance().get_DurationShort2_c04snn_k$()), MotionTokens_getInstance().get_EasingLinearCubicBezier_dc4v3k_k$())).plus_w36lq9_k$(expandHorizontally(tween(numberToInt(MotionTokens_getInstance().get_DurationLong2_e150hl_k$()), VOID, MotionTokens_getInstance().get_EasingEmphasizedCubicBezier_6bhect_k$()), Companion_getInstance_0().get_Start_ih4i6x_k$()));
    }
  }
  function get_DefaultIconSizeModifier() {
    _init_properties_Icon_kt__pgqcnt();
    return DefaultIconSizeModifier;
  }
  var DefaultIconSizeModifier;
  var properties_initialized_Icon_kt_u3g1lx;
  function _init_properties_Icon_kt__pgqcnt() {
    if (!properties_initialized_Icon_kt_u3g1lx) {
      properties_initialized_Icon_kt_u3g1lx = true;
      DefaultIconSizeModifier = size(Companion_getInstance_1(), IconButtonTokens_getInstance().get_IconSize_fa6wyo_k$());
    }
  }
  function get_LocalMinimumInteractiveComponentEnforcement() {
    _init_properties_InteractiveComponentSize_kt__58cq2s();
    return LocalMinimumInteractiveComponentEnforcement;
  }
  var LocalMinimumInteractiveComponentEnforcement;
  function get_LocalMinimumTouchTargetEnforcement() {
    _init_properties_InteractiveComponentSize_kt__58cq2s();
    return LocalMinimumTouchTargetEnforcement;
  }
  var LocalMinimumTouchTargetEnforcement;
  function get_minimumInteractiveComponentSize() {
    _init_properties_InteractiveComponentSize_kt__58cq2s();
    return minimumInteractiveComponentSize;
  }
  var minimumInteractiveComponentSize;
  function LocalMinimumInteractiveComponentEnforcement$lambda() {
    _init_properties_InteractiveComponentSize_kt__58cq2s();
    return true;
  }
  var properties_initialized_InteractiveComponentSize_kt_3r58bm;
  function _init_properties_InteractiveComponentSize_kt__58cq2s() {
    if (!properties_initialized_InteractiveComponentSize_kt_3r58bm) {
      properties_initialized_InteractiveComponentSize_kt_3r58bm = true;
      LocalMinimumInteractiveComponentEnforcement = staticCompositionLocalOf(LocalMinimumInteractiveComponentEnforcement$lambda);
      LocalMinimumTouchTargetEnforcement = get_LocalMinimumInteractiveComponentEnforcement();
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp = _Dp___init__impl__ms3zkb(48);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$1 = _Dp___init__impl__ms3zkb(48);
      minimumInteractiveComponentSize = DpSize(tmp, tmp$ret$1);
    }
  }
  function get_ListItemVerticalPadding() {
    _init_properties_ListItem_kt__vmar8x();
    return ListItemVerticalPadding;
  }
  var ListItemVerticalPadding;
  function get_ListItemThreeLineVerticalPadding() {
    _init_properties_ListItem_kt__vmar8x();
    return ListItemThreeLineVerticalPadding;
  }
  var ListItemThreeLineVerticalPadding;
  function get_ListItemHorizontalPadding() {
    _init_properties_ListItem_kt__vmar8x();
    return ListItemHorizontalPadding;
  }
  var ListItemHorizontalPadding;
  function get_LeadingContentEndPadding() {
    _init_properties_ListItem_kt__vmar8x();
    return LeadingContentEndPadding;
  }
  var LeadingContentEndPadding;
  function get_ContentEndPadding() {
    _init_properties_ListItem_kt__vmar8x();
    return ContentEndPadding;
  }
  var ContentEndPadding;
  function get_TrailingHorizontalPadding() {
    _init_properties_ListItem_kt__vmar8x();
    return TrailingHorizontalPadding;
  }
  var TrailingHorizontalPadding;
  var properties_initialized_ListItem_kt_p7f99v;
  function _init_properties_ListItem_kt__vmar8x() {
    if (!properties_initialized_ListItem_kt_p7f99v) {
      properties_initialized_ListItem_kt_p7f99v = true;
      // Inline function 'androidx.compose.ui.unit.dp' call
      ListItemVerticalPadding = _Dp___init__impl__ms3zkb(8);
      // Inline function 'androidx.compose.ui.unit.dp' call
      ListItemThreeLineVerticalPadding = _Dp___init__impl__ms3zkb(16);
      // Inline function 'androidx.compose.ui.unit.dp' call
      ListItemHorizontalPadding = _Dp___init__impl__ms3zkb(16);
      // Inline function 'androidx.compose.ui.unit.dp' call
      LeadingContentEndPadding = _Dp___init__impl__ms3zkb(16);
      // Inline function 'androidx.compose.ui.unit.dp' call
      ContentEndPadding = _Dp___init__impl__ms3zkb(8);
      // Inline function 'androidx.compose.ui.unit.dp' call
      TrailingHorizontalPadding = _Dp___init__impl__ms3zkb(8);
    }
  }
  function get_DefaultRippleAlpha() {
    _init_properties_MaterialTheme_kt__ccmets();
    return DefaultRippleAlpha;
  }
  var DefaultRippleAlpha;
  function get_$stableprop_0() {
    return 0;
  }
  function MaterialTheme() {
    MaterialTheme_instance = this;
    this.$stable_1 = 0;
  }
  protoOf(MaterialTheme).get_colorScheme_tvg6f3_k$ = function () {
    illegalDecoyCallException('<get-colorScheme>');
  };
  protoOf(MaterialTheme).get_typography_tk20co_k$ = function () {
    illegalDecoyCallException('<get-typography>');
  };
  protoOf(MaterialTheme).get_shapes_jgtjwb_k$ = function () {
    illegalDecoyCallException('<get-shapes>');
  };
  protoOf(MaterialTheme).$get_colorScheme$$composable_t1waqp_k$ = function ($composer, $changed) {
    var $composer_0 = $composer;
    sourceInformationMarkerStart($composer_0, -1686668101, 'C($get-colorScheme$$composable)95@4170L7:MaterialTheme.kt#uh7d8r');
    if (isTraceInProgress()) {
      traceEventStart(-1686668101, $changed, -1, 'androidx.compose.material3.MaterialTheme.$get-colorScheme$$composable (MaterialTheme.kt:95)');
    }
    // Inline function 'androidx.compose.runtime.CompositionLocal.$get-current$$composable' call
    var this_0 = get_LocalColorScheme();
    var $composer_1 = $composer_0;
    sourceInformationMarkerStart($composer_1, 858843746, 'CC($get-current$$composable):CompositionLocal.kt#9igjgp');
    var tmp0 = $composer_1.consume_ebzcrh_k$(this_0);
    sourceInformationMarkerEnd($composer_1);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    sourceInformationMarkerEnd($composer_0);
    return tmp0;
  };
  protoOf(MaterialTheme).$get_typography$$composable_99iyci_k$ = function ($composer, $changed) {
    var $composer_0 = $composer;
    sourceInformationMarkerStart($composer_0, 800335301, 'C($get-typography$$composable)103@4394L7:MaterialTheme.kt#uh7d8r');
    if (isTraceInProgress()) {
      traceEventStart(800335301, $changed, -1, 'androidx.compose.material3.MaterialTheme.$get-typography$$composable (MaterialTheme.kt:103)');
    }
    // Inline function 'androidx.compose.runtime.CompositionLocal.$get-current$$composable' call
    var this_0 = get_LocalTypography();
    var $composer_1 = $composer_0;
    sourceInformationMarkerStart($composer_1, 858843746, 'CC($get-current$$composable):CompositionLocal.kt#9igjgp');
    var tmp0 = $composer_1.consume_ebzcrh_k$(this_0);
    sourceInformationMarkerEnd($composer_1);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    sourceInformationMarkerEnd($composer_0);
    return tmp0;
  };
  protoOf(MaterialTheme).$get_shapes$$composable_gkckn5_k$ = function ($composer, $changed) {
    var $composer_0 = $composer;
    sourceInformationMarkerStart($composer_0, -394650369, 'C($get-shapes$$composable)111@4602L7:MaterialTheme.kt#uh7d8r');
    if (isTraceInProgress()) {
      traceEventStart(-394650369, $changed, -1, 'androidx.compose.material3.MaterialTheme.$get-shapes$$composable (MaterialTheme.kt:111)');
    }
    // Inline function 'androidx.compose.runtime.CompositionLocal.$get-current$$composable' call
    var this_0 = get_LocalShapes();
    var $composer_1 = $composer_0;
    sourceInformationMarkerStart($composer_1, 858843746, 'CC($get-current$$composable):CompositionLocal.kt#9igjgp');
    var tmp0 = $composer_1.consume_ebzcrh_k$(this_0);
    sourceInformationMarkerEnd($composer_1);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    sourceInformationMarkerEnd($composer_0);
    return tmp0;
  };
  var MaterialTheme_instance;
  function MaterialTheme_getInstance() {
    if (MaterialTheme_instance == null)
      new MaterialTheme();
    return MaterialTheme_instance;
  }
  var properties_initialized_MaterialTheme_kt_8j16em;
  function _init_properties_MaterialTheme_kt__ccmets() {
    if (!properties_initialized_MaterialTheme_kt_8j16em) {
      properties_initialized_MaterialTheme_kt_8j16em = true;
      var tmp0_pressedAlpha = StateTokens_getInstance().get_PressedStateLayerOpacity_gdafla_k$();
      var tmp1_focusedAlpha = StateTokens_getInstance().get_FocusStateLayerOpacity_rqckro_k$();
      var tmp2_draggedAlpha = StateTokens_getInstance().get_DraggedStateLayerOpacity_svon4y_k$();
      var tmp3_hoveredAlpha = StateTokens_getInstance().get_HoverStateLayerOpacity_gc8e7s_k$();
      DefaultRippleAlpha = new RippleAlpha(tmp2_draggedAlpha, tmp1_focusedAlpha, tmp3_hoveredAlpha, tmp0_pressedAlpha);
    }
  }
  function get_MenuVerticalMargin() {
    _init_properties_Menu_kt__roln5r();
    return MenuVerticalMargin;
  }
  var MenuVerticalMargin;
  function get_DropdownMenuItemHorizontalPadding() {
    _init_properties_Menu_kt__roln5r();
    return DropdownMenuItemHorizontalPadding;
  }
  var DropdownMenuItemHorizontalPadding;
  function get_DropdownMenuVerticalPadding() {
    _init_properties_Menu_kt__roln5r();
    return DropdownMenuVerticalPadding;
  }
  var DropdownMenuVerticalPadding;
  function get_DropdownMenuItemDefaultMinWidth() {
    _init_properties_Menu_kt__roln5r();
    return DropdownMenuItemDefaultMinWidth;
  }
  var DropdownMenuItemDefaultMinWidth;
  function get_DropdownMenuItemDefaultMaxWidth() {
    _init_properties_Menu_kt__roln5r();
    return DropdownMenuItemDefaultMaxWidth;
  }
  var DropdownMenuItemDefaultMaxWidth;
  var properties_initialized_Menu_kt_ipl1mn;
  function _init_properties_Menu_kt__roln5r() {
    if (!properties_initialized_Menu_kt_ipl1mn) {
      properties_initialized_Menu_kt_ipl1mn = true;
      // Inline function 'androidx.compose.ui.unit.dp' call
      MenuVerticalMargin = _Dp___init__impl__ms3zkb(48);
      // Inline function 'androidx.compose.ui.unit.dp' call
      DropdownMenuItemHorizontalPadding = _Dp___init__impl__ms3zkb(12);
      // Inline function 'androidx.compose.ui.unit.dp' call
      DropdownMenuVerticalPadding = _Dp___init__impl__ms3zkb(8);
      // Inline function 'androidx.compose.ui.unit.dp' call
      DropdownMenuItemDefaultMinWidth = _Dp___init__impl__ms3zkb(112);
      // Inline function 'androidx.compose.ui.unit.dp' call
      DropdownMenuItemDefaultMaxWidth = _Dp___init__impl__ms3zkb(280);
    }
  }
  function get_NavigationBarHeight() {
    _init_properties_NavigationBar_kt__bsbxjn();
    return NavigationBarHeight;
  }
  var NavigationBarHeight;
  function get_NavigationBarItemHorizontalPadding() {
    _init_properties_NavigationBar_kt__bsbxjn();
    return NavigationBarItemHorizontalPadding;
  }
  var NavigationBarItemHorizontalPadding;
  function get_NavigationBarItemVerticalPadding() {
    _init_properties_NavigationBar_kt__bsbxjn();
    return NavigationBarItemVerticalPadding;
  }
  var NavigationBarItemVerticalPadding;
  function get_IndicatorHorizontalPadding() {
    _init_properties_NavigationBar_kt__bsbxjn();
    return IndicatorHorizontalPadding;
  }
  var IndicatorHorizontalPadding;
  function get_IndicatorVerticalPadding() {
    _init_properties_NavigationBar_kt__bsbxjn();
    return IndicatorVerticalPadding;
  }
  var IndicatorVerticalPadding;
  function get_IndicatorVerticalOffset() {
    _init_properties_NavigationBar_kt__bsbxjn();
    return IndicatorVerticalOffset;
  }
  var IndicatorVerticalOffset;
  var properties_initialized_NavigationBar_kt_9s7nqn;
  function _init_properties_NavigationBar_kt__bsbxjn() {
    if (!properties_initialized_NavigationBar_kt_9s7nqn) {
      properties_initialized_NavigationBar_kt_9s7nqn = true;
      NavigationBarHeight = NavigationBarTokens_getInstance().get_ContainerHeight_9lch44_k$();
      // Inline function 'androidx.compose.ui.unit.dp' call
      NavigationBarItemHorizontalPadding = _Dp___init__impl__ms3zkb(8);
      // Inline function 'androidx.compose.ui.unit.dp' call
      NavigationBarItemVerticalPadding = _Dp___init__impl__ms3zkb(16);
      // Inline function 'androidx.compose.ui.unit.Dp.div' call
      // Inline function 'androidx.compose.ui.unit.Dp.minus' call
      var this_0 = NavigationBarTokens_getInstance().get_ActiveIndicatorWidth_9j3j1_k$();
      var other = NavigationBarTokens_getInstance().get_IconSize_fa6wyo_k$();
      var this_1 = _Dp___init__impl__ms3zkb(_Dp___get_value__impl__geb1vb(this_0) - _Dp___get_value__impl__geb1vb(other));
      IndicatorHorizontalPadding = _Dp___init__impl__ms3zkb(_Dp___get_value__impl__geb1vb(this_1) / 2);
      // Inline function 'androidx.compose.ui.unit.Dp.div' call
      // Inline function 'androidx.compose.ui.unit.Dp.minus' call
      var this_2 = NavigationBarTokens_getInstance().get_ActiveIndicatorHeight_7eyzzw_k$();
      var other_0 = NavigationBarTokens_getInstance().get_IconSize_fa6wyo_k$();
      var this_3 = _Dp___init__impl__ms3zkb(_Dp___get_value__impl__geb1vb(this_2) - _Dp___get_value__impl__geb1vb(other_0));
      IndicatorVerticalPadding = _Dp___init__impl__ms3zkb(_Dp___get_value__impl__geb1vb(this_3) / 2);
      // Inline function 'androidx.compose.ui.unit.dp' call
      IndicatorVerticalOffset = _Dp___init__impl__ms3zkb(12);
    }
  }
  function get_DrawerVelocityThreshold() {
    _init_properties_NavigationDrawer_kt__nnphad();
    return DrawerVelocityThreshold;
  }
  var DrawerVelocityThreshold;
  function get_MinimumDrawerWidth() {
    _init_properties_NavigationDrawer_kt__nnphad();
    return MinimumDrawerWidth;
  }
  var MinimumDrawerWidth;
  function get_AnimationSpec() {
    _init_properties_NavigationDrawer_kt__nnphad();
    return AnimationSpec;
  }
  var AnimationSpec;
  var properties_initialized_NavigationDrawer_kt_nyyxzb;
  function _init_properties_NavigationDrawer_kt__nnphad() {
    if (!properties_initialized_NavigationDrawer_kt_nyyxzb) {
      properties_initialized_NavigationDrawer_kt_nyyxzb = true;
      // Inline function 'androidx.compose.ui.unit.dp' call
      DrawerVelocityThreshold = _Dp___init__impl__ms3zkb(400);
      // Inline function 'androidx.compose.ui.unit.dp' call
      MinimumDrawerWidth = _Dp___init__impl__ms3zkb(240);
      AnimationSpec = new TweenSpec(256);
    }
  }
  function get_NavigationRailVerticalPadding() {
    _init_properties_NavigationRail_kt__le76sm();
    return NavigationRailVerticalPadding;
  }
  var NavigationRailVerticalPadding;
  function get_NavigationRailHeaderPadding() {
    _init_properties_NavigationRail_kt__le76sm();
    return NavigationRailHeaderPadding;
  }
  var NavigationRailHeaderPadding;
  function get_NavigationRailItemWidth() {
    _init_properties_NavigationRail_kt__le76sm();
    return NavigationRailItemWidth;
  }
  var NavigationRailItemWidth;
  function get_NavigationRailItemHeight() {
    _init_properties_NavigationRail_kt__le76sm();
    return NavigationRailItemHeight;
  }
  var NavigationRailItemHeight;
  function get_NavigationRailItemVerticalPadding() {
    _init_properties_NavigationRail_kt__le76sm();
    return NavigationRailItemVerticalPadding;
  }
  var NavigationRailItemVerticalPadding;
  function get_IndicatorHorizontalPadding_0() {
    _init_properties_NavigationRail_kt__le76sm();
    return IndicatorHorizontalPadding_0;
  }
  var IndicatorHorizontalPadding_0;
  function get_IndicatorVerticalPaddingWithLabel() {
    _init_properties_NavigationRail_kt__le76sm();
    return IndicatorVerticalPaddingWithLabel;
  }
  var IndicatorVerticalPaddingWithLabel;
  function get_IndicatorVerticalPaddingNoLabel() {
    _init_properties_NavigationRail_kt__le76sm();
    return IndicatorVerticalPaddingNoLabel;
  }
  var IndicatorVerticalPaddingNoLabel;
  var properties_initialized_NavigationRail_kt_2gzc3c;
  function _init_properties_NavigationRail_kt__le76sm() {
    if (!properties_initialized_NavigationRail_kt_2gzc3c) {
      properties_initialized_NavigationRail_kt_2gzc3c = true;
      // Inline function 'androidx.compose.ui.unit.dp' call
      NavigationRailVerticalPadding = _Dp___init__impl__ms3zkb(4);
      // Inline function 'androidx.compose.ui.unit.dp' call
      NavigationRailHeaderPadding = _Dp___init__impl__ms3zkb(8);
      NavigationRailItemWidth = NavigationRailTokens_getInstance().get_ContainerWidth_77irhx_k$();
      NavigationRailItemHeight = NavigationRailTokens_getInstance().get_NoLabelActiveIndicatorHeight_91igar_k$();
      // Inline function 'androidx.compose.ui.unit.dp' call
      NavigationRailItemVerticalPadding = _Dp___init__impl__ms3zkb(4);
      // Inline function 'androidx.compose.ui.unit.Dp.div' call
      // Inline function 'androidx.compose.ui.unit.Dp.minus' call
      var this_0 = NavigationRailTokens_getInstance().get_ActiveIndicatorWidth_9j3j1_k$();
      var other = NavigationRailTokens_getInstance().get_IconSize_fa6wyo_k$();
      var this_1 = _Dp___init__impl__ms3zkb(_Dp___get_value__impl__geb1vb(this_0) - _Dp___get_value__impl__geb1vb(other));
      IndicatorHorizontalPadding_0 = _Dp___init__impl__ms3zkb(_Dp___get_value__impl__geb1vb(this_1) / 2);
      // Inline function 'androidx.compose.ui.unit.Dp.div' call
      // Inline function 'androidx.compose.ui.unit.Dp.minus' call
      var this_2 = NavigationRailTokens_getInstance().get_ActiveIndicatorHeight_7eyzzw_k$();
      var other_0 = NavigationRailTokens_getInstance().get_IconSize_fa6wyo_k$();
      var this_3 = _Dp___init__impl__ms3zkb(_Dp___get_value__impl__geb1vb(this_2) - _Dp___get_value__impl__geb1vb(other_0));
      IndicatorVerticalPaddingWithLabel = _Dp___init__impl__ms3zkb(_Dp___get_value__impl__geb1vb(this_3) / 2);
      // Inline function 'androidx.compose.ui.unit.Dp.div' call
      // Inline function 'androidx.compose.ui.unit.Dp.minus' call
      var this_4 = NavigationRailTokens_getInstance().get_NoLabelActiveIndicatorHeight_91igar_k$();
      var other_1 = NavigationRailTokens_getInstance().get_IconSize_fa6wyo_k$();
      var this_5 = _Dp___init__impl__ms3zkb(_Dp___get_value__impl__geb1vb(this_4) - _Dp___get_value__impl__geb1vb(other_1));
      IndicatorVerticalPaddingNoLabel = _Dp___init__impl__ms3zkb(_Dp___get_value__impl__geb1vb(this_5) / 2);
    }
  }
  function get_OutlinedTextFieldInnerPadding() {
    _init_properties_OutlinedTextField_kt__36w0dj();
    return OutlinedTextFieldInnerPadding;
  }
  var OutlinedTextFieldInnerPadding;
  function get_OutlinedTextFieldTopPadding() {
    _init_properties_OutlinedTextField_kt__36w0dj();
    return OutlinedTextFieldTopPadding;
  }
  var OutlinedTextFieldTopPadding;
  function outlineCutout(_this__u8e3s4, labelSize, paddingValues) {
    _init_properties_OutlinedTextField_kt__36w0dj();
    return drawWithContent(_this__u8e3s4, outlineCutout$lambda(labelSize, paddingValues));
  }
  function OutlinedTextFieldLayout$composable(modifier, textField, placeholder, label, leading, trailing, prefix, suffix, singleLine, animationProgress, onLabelMeasured, container, supporting, paddingValues, $composer, $changed, $changed1) {
    _init_properties_OutlinedTextField_kt__36w0dj();
    var $composer_0 = $composer;
    $composer_0 = $composer_0.startRestartGroup_lebv1i_k$(-588056437);
    sourceInformation($composer_0, 'C(OutlinedTextFieldLayout$composable)P(4,12,7,2,3,13,8,10,9!1,5!1,11)518@25327L239,526@25614L7,527@25626L3534:OutlinedTextField.kt#uh7d8r');
    var $dirty = $changed;
    var $dirty1 = $changed1;
    if (($changed & 14) === 0)
      $dirty = $dirty | ($composer_0.changed_ga7h3f_k$(modifier) ? 4 : 2);
    if (($changed & 112) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(textField) ? 32 : 16);
    if (($changed & 896) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(placeholder) ? 256 : 128);
    if (($changed & 7168) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(label) ? 2048 : 1024);
    if (($changed & 57344) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(leading) ? 16384 : 8192);
    if (($changed & 458752) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(trailing) ? 131072 : 65536);
    if (($changed & 3670016) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(prefix) ? 1048576 : 524288);
    if (($changed & 29360128) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(suffix) ? 8388608 : 4194304);
    if (($changed & 234881024) === 0)
      $dirty = $dirty | ($composer_0.changed_jpyyrz_k$(singleLine) ? 67108864 : 33554432);
    if (($changed & 1879048192) === 0)
      $dirty = $dirty | ($composer_0.changed_i8bvic_k$(animationProgress) ? 536870912 : 268435456);
    if (($changed1 & 14) === 0)
      $dirty1 = $dirty1 | ($composer_0.changedInstance_s1wkiy_k$(onLabelMeasured) ? 4 : 2);
    if (($changed1 & 112) === 0)
      $dirty1 = $dirty1 | ($composer_0.changedInstance_s1wkiy_k$(container) ? 32 : 16);
    if (($changed1 & 896) === 0)
      $dirty1 = $dirty1 | ($composer_0.changedInstance_s1wkiy_k$(supporting) ? 256 : 128);
    if (($changed1 & 7168) === 0)
      $dirty1 = $dirty1 | ($composer_0.changed_ga7h3f_k$(paddingValues) ? 2048 : 1024);
    if ((!(($dirty & 1533916891) === 306783378) ? true : !(($dirty1 & 5851) === 1170)) ? true : !$composer_0.get_skipping_3owdve_k$()) {
      if (isTraceInProgress()) {
        traceEventStart(-588056437, $dirty, $dirty1, 'androidx.compose.material3.OutlinedTextFieldLayout$composable (OutlinedTextField.kt:502)');
      }
      // Inline function 'androidx.compose.runtime.remember$composable' call
      var keys = [onLabelMeasured, singleLine, animationProgress, paddingValues];
      var $composer_1 = $composer_0;
      $composer_1.startReplaceableGroup_ip860b_k$(-1603429786);
      sourceInformation($composer_1, 'CC(remember$composable)P(1):Composables.kt#9igjgp');
      var invalid = false;
      var inductionVariable = 0;
      var last = keys.length;
      while (inductionVariable < last) {
        var key = keys[inductionVariable];
        inductionVariable = inductionVariable + 1 | 0;
        invalid = !!(invalid | $composer_1.changed_ga7h3f_k$(key));
      }
      // Inline function 'androidx.compose.runtime.cache' call
      var invalid_0 = invalid;
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it = $composer_1.rememberedValue_4dg93v_k$();
      var tmp;
      if (invalid_0 ? true : it === Companion_getInstance_2().get_Empty_i9b85g_k$()) {
        // Inline function 'androidx.compose.material3.OutlinedTextFieldLayout$composable.<anonymous>' call
        var value = new OutlinedTextFieldMeasurePolicy(onLabelMeasured, singleLine, animationProgress, paddingValues);
        $composer_1.updateRememberedValue_l1wh71_k$(value);
        tmp = value;
      } else {
        tmp = it;
      }
      var tmp_0 = tmp;
      var tmp0 = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
      $composer_1.endReplaceableGroup_ern0ak_k$();
      var measurePolicy = tmp0;
      // Inline function 'androidx.compose.runtime.CompositionLocal.$get-current$$composable' call
      var this_0 = get_LocalLayoutDirection();
      var $composer_2 = $composer_0;
      sourceInformationMarkerStart($composer_2, 858843746, 'CC($get-current$$composable):CompositionLocal.kt#9igjgp');
      var tmp0_0 = $composer_2.consume_ebzcrh_k$(this_0);
      sourceInformationMarkerEnd($composer_2);
      var layoutDirection = tmp0_0;
      // Inline function 'androidx.compose.ui.layout.Layout$composable' call
      var $composer_3 = $composer_0;
      var $changed_0 = 112 & $dirty << 3;
      var modifier_0 = modifier;
      var $composer_4 = $composer_3;
      $composer_4.startReplaceableGroup_ip860b_k$(1725976829);
      sourceInformation($composer_4, 'CC(Layout$composable)P(!1,2)78@3158L23,80@3248L420:Layout.kt#80mrfh');
      if (!((0 & 2) === 0))
        modifier_0 = Companion_getInstance_1();
      var compositeKeyHash = $get_currentCompositeKeyHash$$composable_u3vbzj($composer_4, 0);
      var localMap = $composer_4.get_currentCompositionLocalMap_fmcf79_k$();
      // Inline function 'androidx.compose.runtime.ReusableComposeNode$composable' call
      var factory = Companion_getInstance_3().get_Constructor_f7ieep_k$();
      var skippableUpdate = materializerOf(modifier_0);
      var $changed_1 = 6 | 7168 & $changed_0 << 9;
      var $composer_5 = $composer_4;
      var tmp_1 = $composer_5.get_applier_bupu8u_k$();
      if (!isInterface(tmp_1, Applier)) {
        invalidApplier();
      }
      $composer_5.startReusableNode_jjgeyp_k$();
      if ($composer_5.get_inserting_25mlsw_k$()) {
        $composer_5.createNode_ahrd54_k$(factory);
      } else {
        $composer_5.useNode_io5s9l_k$();
      }
      // Inline function 'androidx.compose.ui.layout.Layout$composable.<anonymous>' call
      var $this$ReusableComposeNode = _Updater___init__impl__rbfxm8($composer_5);
      Updater__set_impl_v7kwss($this$ReusableComposeNode, measurePolicy, Companion_getInstance_3().get_SetMeasurePolicy_on6ujt_k$());
      Updater__set_impl_v7kwss($this$ReusableComposeNode, localMap, Companion_getInstance_3().get_SetResolvedCompositionLocals_rc2u9t_k$());
      // Inline function 'androidx.compose.runtime.Updater.set' call
      var block = Companion_getInstance_3().get_SetCompositeKeyHash_n8lgg1_k$();
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      var $this$with = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode);
      var tmp_2;
      if ($this$with.get_inserting_25mlsw_k$() ? true : !equals($this$with.rememberedValue_4dg93v_k$(), compositeKeyHash)) {
        $this$with.updateRememberedValue_l1wh71_k$(compositeKeyHash);
        _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode).apply_pk82p8_k$(compositeKeyHash, block);
        tmp_2 = Unit_getInstance();
      }
      skippableUpdate(new SkippableUpdater(_SkippableUpdater___init__impl__4ft0t9($composer_5)), $composer_5, 112 & $changed_1 >> 3);
      $composer_5.startReplaceableGroup_ip860b_k$(2058660585);
      // Inline function 'androidx.compose.material3.OutlinedTextFieldLayout$composable.<anonymous>' call
      var $composer_6 = $composer_5;
      sourceInformationMarkerStart($composer_6, -1484249279, 'C530@25695L11,600@28180L228:OutlinedTextField.kt#uh7d8r');
      container($composer_6, 14 & $dirty1 >> 3);
      $composer_6.startReplaceableGroup_ip860b_k$(-1484249254);
      sourceInformation($composer_6, '533@25759L219');
      if (!(leading == null)) {
        // Inline function 'androidx.compose.foundation.layout.Box$composable' call
        var modifier_1 = layoutId(Companion_getInstance_1(), get_LeadingId()).then_g5qrxq_k$(get_IconDefaultSizeModifier());
        var contentAlignment = Companion_getInstance_0().get_Center_3arb0i_k$();
        var propagateMinConstraints = false;
        var $composer_7 = $composer_6;
        $composer_7.startReplaceableGroup_ip860b_k$(1330882304);
        sourceInformation($composer_7, 'CC(Box$composable)P(2,1,3)69@3214L67,70@3286L130:Box.kt#2w3rfo');
        if (!((4 & 1) === 0))
          modifier_1 = Companion_getInstance_1();
        if (!((4 & 2) === 0))
          contentAlignment = Companion_getInstance_0().get_TopStart_o4x792_k$();
        if (!((4 & 4) === 0))
          propagateMinConstraints = false;
        var measurePolicy_0 = rememberBoxMeasurePolicy$composable(contentAlignment, propagateMinConstraints, $composer_7, 14 & 48 >> 3 | 112 & 48 >> 3);
        // Inline function 'androidx.compose.ui.layout.Layout$composable' call
        var modifier_2 = modifier_1;
        var $changed_2 = 112 & 48 << 3;
        var modifier_3 = modifier_2;
        var $composer_8 = $composer_7;
        $composer_8.startReplaceableGroup_ip860b_k$(1725976829);
        sourceInformation($composer_8, 'CC(Layout$composable)P(!1,2)78@3158L23,80@3248L420:Layout.kt#80mrfh');
        if (!((0 & 2) === 0))
          modifier_3 = Companion_getInstance_1();
        var compositeKeyHash_0 = $get_currentCompositeKeyHash$$composable_u3vbzj($composer_8, 0);
        var localMap_0 = $composer_8.get_currentCompositionLocalMap_fmcf79_k$();
        // Inline function 'androidx.compose.runtime.ReusableComposeNode$composable' call
        var factory_0 = Companion_getInstance_3().get_Constructor_f7ieep_k$();
        var skippableUpdate_0 = materializerOf(modifier_3);
        var $changed_3 = 6 | 7168 & $changed_2 << 9;
        var $composer_9 = $composer_8;
        var tmp_3 = $composer_9.get_applier_bupu8u_k$();
        if (!isInterface(tmp_3, Applier)) {
          invalidApplier();
        }
        $composer_9.startReusableNode_jjgeyp_k$();
        if ($composer_9.get_inserting_25mlsw_k$()) {
          $composer_9.createNode_ahrd54_k$(factory_0);
        } else {
          $composer_9.useNode_io5s9l_k$();
        }
        // Inline function 'androidx.compose.ui.layout.Layout$composable.<anonymous>' call
        var $this$ReusableComposeNode_0 = _Updater___init__impl__rbfxm8($composer_9);
        Updater__set_impl_v7kwss($this$ReusableComposeNode_0, measurePolicy_0, Companion_getInstance_3().get_SetMeasurePolicy_on6ujt_k$());
        Updater__set_impl_v7kwss($this$ReusableComposeNode_0, localMap_0, Companion_getInstance_3().get_SetResolvedCompositionLocals_rc2u9t_k$());
        // Inline function 'androidx.compose.runtime.Updater.set' call
        var block_0 = Companion_getInstance_3().get_SetCompositeKeyHash_n8lgg1_k$();
        // Inline function 'kotlin.with' call
        // Inline function 'kotlin.contracts.contract' call
        var $this$with_0 = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_0);
        var tmp_4;
        if ($this$with_0.get_inserting_25mlsw_k$() ? true : !equals($this$with_0.rememberedValue_4dg93v_k$(), compositeKeyHash_0)) {
          $this$with_0.updateRememberedValue_l1wh71_k$(compositeKeyHash_0);
          _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_0).apply_pk82p8_k$(compositeKeyHash_0, block_0);
          tmp_4 = Unit_getInstance();
        }
        skippableUpdate_0(new SkippableUpdater(_SkippableUpdater___init__impl__4ft0t9($composer_9)), $composer_9, 112 & $changed_3 >> 3);
        $composer_9.startReplaceableGroup_ip860b_k$(2058660585);
        // Inline function 'androidx.compose.foundation.layout.Box$composable.<anonymous>' call
        var $composer_10 = $composer_9;
        sourceInformationMarkerStart($composer_10, -1851536925, 'C71@3331L9:Box.kt#2w3rfo');
        // Inline function 'androidx.compose.material3.OutlinedTextFieldLayout$composable.<anonymous>.<anonymous>' call
        BoxScopeInstance_getInstance();
        var $composer_11 = $composer_10;
        sourceInformationMarkerStart($composer_11, 681043810, 'C537@25951L9:OutlinedTextField.kt#uh7d8r');
        leading($composer_11, 14 & $dirty >> 12);
        sourceInformationMarkerEnd($composer_11);
        sourceInformationMarkerEnd($composer_10);
        $composer_9.endReplaceableGroup_ern0ak_k$();
        $composer_9.endNode_3m0yfn_k$();
        $composer_8.endReplaceableGroup_ern0ak_k$();
        $composer_7.endReplaceableGroup_ern0ak_k$();
      }
      $composer_6.endReplaceableGroup_ern0ak_k$();
      $composer_6.startReplaceableGroup_ip860b_k$(-1484248969);
      sourceInformation($composer_6, '541@26045L221');
      if (!(trailing == null)) {
        // Inline function 'androidx.compose.foundation.layout.Box$composable' call
        var modifier_4 = layoutId(Companion_getInstance_1(), get_TrailingId()).then_g5qrxq_k$(get_IconDefaultSizeModifier());
        var contentAlignment_0 = Companion_getInstance_0().get_Center_3arb0i_k$();
        var propagateMinConstraints_0 = false;
        var $composer_12 = $composer_6;
        $composer_12.startReplaceableGroup_ip860b_k$(1330882304);
        sourceInformation($composer_12, 'CC(Box$composable)P(2,1,3)69@3214L67,70@3286L130:Box.kt#2w3rfo');
        if (!((4 & 1) === 0))
          modifier_4 = Companion_getInstance_1();
        if (!((4 & 2) === 0))
          contentAlignment_0 = Companion_getInstance_0().get_TopStart_o4x792_k$();
        if (!((4 & 4) === 0))
          propagateMinConstraints_0 = false;
        var measurePolicy_1 = rememberBoxMeasurePolicy$composable(contentAlignment_0, propagateMinConstraints_0, $composer_12, 14 & 48 >> 3 | 112 & 48 >> 3);
        // Inline function 'androidx.compose.ui.layout.Layout$composable' call
        var modifier_5 = modifier_4;
        var $changed_4 = 112 & 48 << 3;
        var modifier_6 = modifier_5;
        var $composer_13 = $composer_12;
        $composer_13.startReplaceableGroup_ip860b_k$(1725976829);
        sourceInformation($composer_13, 'CC(Layout$composable)P(!1,2)78@3158L23,80@3248L420:Layout.kt#80mrfh');
        if (!((0 & 2) === 0))
          modifier_6 = Companion_getInstance_1();
        var compositeKeyHash_1 = $get_currentCompositeKeyHash$$composable_u3vbzj($composer_13, 0);
        var localMap_1 = $composer_13.get_currentCompositionLocalMap_fmcf79_k$();
        // Inline function 'androidx.compose.runtime.ReusableComposeNode$composable' call
        var factory_1 = Companion_getInstance_3().get_Constructor_f7ieep_k$();
        var skippableUpdate_1 = materializerOf(modifier_6);
        var $changed_5 = 6 | 7168 & $changed_4 << 9;
        var $composer_14 = $composer_13;
        var tmp_5 = $composer_14.get_applier_bupu8u_k$();
        if (!isInterface(tmp_5, Applier)) {
          invalidApplier();
        }
        $composer_14.startReusableNode_jjgeyp_k$();
        if ($composer_14.get_inserting_25mlsw_k$()) {
          $composer_14.createNode_ahrd54_k$(factory_1);
        } else {
          $composer_14.useNode_io5s9l_k$();
        }
        // Inline function 'androidx.compose.ui.layout.Layout$composable.<anonymous>' call
        var $this$ReusableComposeNode_1 = _Updater___init__impl__rbfxm8($composer_14);
        Updater__set_impl_v7kwss($this$ReusableComposeNode_1, measurePolicy_1, Companion_getInstance_3().get_SetMeasurePolicy_on6ujt_k$());
        Updater__set_impl_v7kwss($this$ReusableComposeNode_1, localMap_1, Companion_getInstance_3().get_SetResolvedCompositionLocals_rc2u9t_k$());
        // Inline function 'androidx.compose.runtime.Updater.set' call
        var block_1 = Companion_getInstance_3().get_SetCompositeKeyHash_n8lgg1_k$();
        // Inline function 'kotlin.with' call
        // Inline function 'kotlin.contracts.contract' call
        var $this$with_1 = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_1);
        var tmp_6;
        if ($this$with_1.get_inserting_25mlsw_k$() ? true : !equals($this$with_1.rememberedValue_4dg93v_k$(), compositeKeyHash_1)) {
          $this$with_1.updateRememberedValue_l1wh71_k$(compositeKeyHash_1);
          _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_1).apply_pk82p8_k$(compositeKeyHash_1, block_1);
          tmp_6 = Unit_getInstance();
        }
        skippableUpdate_1(new SkippableUpdater(_SkippableUpdater___init__impl__4ft0t9($composer_14)), $composer_14, 112 & $changed_5 >> 3);
        $composer_14.startReplaceableGroup_ip860b_k$(2058660585);
        // Inline function 'androidx.compose.foundation.layout.Box$composable.<anonymous>' call
        var $composer_15 = $composer_14;
        sourceInformationMarkerStart($composer_15, -1851536925, 'C71@3331L9:Box.kt#2w3rfo');
        // Inline function 'androidx.compose.material3.OutlinedTextFieldLayout$composable.<anonymous>.<anonymous>' call
        BoxScopeInstance_getInstance();
        var $composer_16 = $composer_15;
        sourceInformationMarkerStart($composer_16, 681044097, 'C545@26238L10:OutlinedTextField.kt#uh7d8r');
        trailing($composer_16, 14 & $dirty >> 15);
        sourceInformationMarkerEnd($composer_16);
        sourceInformationMarkerEnd($composer_15);
        $composer_14.endReplaceableGroup_ern0ak_k$();
        $composer_14.endNode_3m0yfn_k$();
        $composer_13.endReplaceableGroup_ern0ak_k$();
        $composer_12.endReplaceableGroup_ern0ak_k$();
      }
      $composer_6.endReplaceableGroup_ern0ak_k$();
      var startTextFieldPadding = calculateStartPadding(paddingValues, layoutDirection);
      var endTextFieldPadding = calculateEndPadding(paddingValues, layoutDirection);
      var tmp_7;
      if (!(leading == null)) {
        // Inline function 'androidx.compose.ui.unit.coerceAtLeast' call
        // Inline function 'androidx.compose.ui.unit.Dp.minus' call
        var other = get_HorizontalIconPadding();
        var this_1 = _Dp___init__impl__ms3zkb(_Dp___get_value__impl__geb1vb(startTextFieldPadding) - _Dp___get_value__impl__geb1vb(other));
        // Inline function 'androidx.compose.ui.unit.dp' call
        var minimumValue = _Dp___init__impl__ms3zkb(0);
        tmp_7 = _Dp___init__impl__ms3zkb(coerceAtLeast(_Dp___get_value__impl__geb1vb(this_1), _Dp___get_value__impl__geb1vb(minimumValue)));
      } else {
        tmp_7 = startTextFieldPadding;
      }
      var startPadding = tmp_7;
      var tmp_8;
      if (!(trailing == null)) {
        // Inline function 'androidx.compose.ui.unit.coerceAtLeast' call
        // Inline function 'androidx.compose.ui.unit.Dp.minus' call
        var other_0 = get_HorizontalIconPadding();
        var this_2 = _Dp___init__impl__ms3zkb(_Dp___get_value__impl__geb1vb(endTextFieldPadding) - _Dp___get_value__impl__geb1vb(other_0));
        // Inline function 'androidx.compose.ui.unit.dp' call
        var minimumValue_0 = _Dp___init__impl__ms3zkb(0);
        tmp_8 = _Dp___init__impl__ms3zkb(coerceAtLeast(_Dp___get_value__impl__geb1vb(this_2), _Dp___get_value__impl__geb1vb(minimumValue_0)));
      } else {
        tmp_8 = endTextFieldPadding;
      }
      var endPadding = tmp_8;
      $composer_6.startReplaceableGroup_ip860b_k$(-1484248079);
      sourceInformation($composer_6, '564@26933L334');
      if (!(prefix == null)) {
        // Inline function 'androidx.compose.foundation.layout.Box$composable' call
        var modifier_7 = padding(wrapContentHeight(heightIn(layoutId(Companion_getInstance_1(), get_PrefixId()), get_MinTextLineHeight())), startPadding, VOID, get_PrefixSuffixTextPadding());
        var contentAlignment_1 = null;
        var propagateMinConstraints_1 = false;
        var $composer_17 = $composer_6;
        $composer_17.startReplaceableGroup_ip860b_k$(1330882304);
        sourceInformation($composer_17, 'CC(Box$composable)P(2,1,3)69@3214L67,70@3286L130:Box.kt#2w3rfo');
        if (!((6 & 1) === 0))
          modifier_7 = Companion_getInstance_1();
        if (!((6 & 2) === 0))
          contentAlignment_1 = Companion_getInstance_0().get_TopStart_o4x792_k$();
        if (!((6 & 4) === 0))
          propagateMinConstraints_1 = false;
        var measurePolicy_2 = rememberBoxMeasurePolicy$composable(contentAlignment_1, propagateMinConstraints_1, $composer_17, 14 & 0 >> 3 | 112 & 0 >> 3);
        // Inline function 'androidx.compose.ui.layout.Layout$composable' call
        var modifier_8 = modifier_7;
        var $changed_6 = 112 & 0 << 3;
        var modifier_9 = modifier_8;
        var $composer_18 = $composer_17;
        $composer_18.startReplaceableGroup_ip860b_k$(1725976829);
        sourceInformation($composer_18, 'CC(Layout$composable)P(!1,2)78@3158L23,80@3248L420:Layout.kt#80mrfh');
        if (!((0 & 2) === 0))
          modifier_9 = Companion_getInstance_1();
        var compositeKeyHash_2 = $get_currentCompositeKeyHash$$composable_u3vbzj($composer_18, 0);
        var localMap_2 = $composer_18.get_currentCompositionLocalMap_fmcf79_k$();
        // Inline function 'androidx.compose.runtime.ReusableComposeNode$composable' call
        var factory_2 = Companion_getInstance_3().get_Constructor_f7ieep_k$();
        var skippableUpdate_2 = materializerOf(modifier_9);
        var $changed_7 = 6 | 7168 & $changed_6 << 9;
        var $composer_19 = $composer_18;
        var tmp_9 = $composer_19.get_applier_bupu8u_k$();
        if (!isInterface(tmp_9, Applier)) {
          invalidApplier();
        }
        $composer_19.startReusableNode_jjgeyp_k$();
        if ($composer_19.get_inserting_25mlsw_k$()) {
          $composer_19.createNode_ahrd54_k$(factory_2);
        } else {
          $composer_19.useNode_io5s9l_k$();
        }
        // Inline function 'androidx.compose.ui.layout.Layout$composable.<anonymous>' call
        var $this$ReusableComposeNode_2 = _Updater___init__impl__rbfxm8($composer_19);
        Updater__set_impl_v7kwss($this$ReusableComposeNode_2, measurePolicy_2, Companion_getInstance_3().get_SetMeasurePolicy_on6ujt_k$());
        Updater__set_impl_v7kwss($this$ReusableComposeNode_2, localMap_2, Companion_getInstance_3().get_SetResolvedCompositionLocals_rc2u9t_k$());
        // Inline function 'androidx.compose.runtime.Updater.set' call
        var block_2 = Companion_getInstance_3().get_SetCompositeKeyHash_n8lgg1_k$();
        // Inline function 'kotlin.with' call
        // Inline function 'kotlin.contracts.contract' call
        var $this$with_2 = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_2);
        var tmp_10;
        if ($this$with_2.get_inserting_25mlsw_k$() ? true : !equals($this$with_2.rememberedValue_4dg93v_k$(), compositeKeyHash_2)) {
          $this$with_2.updateRememberedValue_l1wh71_k$(compositeKeyHash_2);
          _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_2).apply_pk82p8_k$(compositeKeyHash_2, block_2);
          tmp_10 = Unit_getInstance();
        }
        skippableUpdate_2(new SkippableUpdater(_SkippableUpdater___init__impl__4ft0t9($composer_19)), $composer_19, 112 & $changed_7 >> 3);
        $composer_19.startReplaceableGroup_ip860b_k$(2058660585);
        // Inline function 'androidx.compose.foundation.layout.Box$composable.<anonymous>' call
        var $composer_20 = $composer_19;
        sourceInformationMarkerStart($composer_20, -1851536925, 'C71@3331L9:Box.kt#2w3rfo');
        // Inline function 'androidx.compose.material3.OutlinedTextFieldLayout$composable.<anonymous>.<anonymous>' call
        BoxScopeInstance_getInstance();
        var $composer_21 = $composer_20;
        sourceInformationMarkerStart($composer_21, 681045100, 'C571@27241L8:OutlinedTextField.kt#uh7d8r');
        prefix($composer_21, 14 & $dirty >> 18);
        sourceInformationMarkerEnd($composer_21);
        sourceInformationMarkerEnd($composer_20);
        $composer_19.endReplaceableGroup_ern0ak_k$();
        $composer_19.endNode_3m0yfn_k$();
        $composer_18.endReplaceableGroup_ern0ak_k$();
        $composer_17.endReplaceableGroup_ern0ak_k$();
      }
      $composer_6.endReplaceableGroup_ern0ak_k$();
      $composer_6.startReplaceableGroup_ip860b_k$(-1484247680);
      sourceInformation($composer_6, '575@27332L332');
      if (!(suffix == null)) {
        // Inline function 'androidx.compose.foundation.layout.Box$composable' call
        var modifier_10 = padding(wrapContentHeight(heightIn(layoutId(Companion_getInstance_1(), get_SuffixId()), get_MinTextLineHeight())), get_PrefixSuffixTextPadding(), VOID, endPadding);
        var contentAlignment_2 = null;
        var propagateMinConstraints_2 = false;
        var $composer_22 = $composer_6;
        $composer_22.startReplaceableGroup_ip860b_k$(1330882304);
        sourceInformation($composer_22, 'CC(Box$composable)P(2,1,3)69@3214L67,70@3286L130:Box.kt#2w3rfo');
        if (!((6 & 1) === 0))
          modifier_10 = Companion_getInstance_1();
        if (!((6 & 2) === 0))
          contentAlignment_2 = Companion_getInstance_0().get_TopStart_o4x792_k$();
        if (!((6 & 4) === 0))
          propagateMinConstraints_2 = false;
        var measurePolicy_3 = rememberBoxMeasurePolicy$composable(contentAlignment_2, propagateMinConstraints_2, $composer_22, 14 & 0 >> 3 | 112 & 0 >> 3);
        // Inline function 'androidx.compose.ui.layout.Layout$composable' call
        var modifier_11 = modifier_10;
        var $changed_8 = 112 & 0 << 3;
        var modifier_12 = modifier_11;
        var $composer_23 = $composer_22;
        $composer_23.startReplaceableGroup_ip860b_k$(1725976829);
        sourceInformation($composer_23, 'CC(Layout$composable)P(!1,2)78@3158L23,80@3248L420:Layout.kt#80mrfh');
        if (!((0 & 2) === 0))
          modifier_12 = Companion_getInstance_1();
        var compositeKeyHash_3 = $get_currentCompositeKeyHash$$composable_u3vbzj($composer_23, 0);
        var localMap_3 = $composer_23.get_currentCompositionLocalMap_fmcf79_k$();
        // Inline function 'androidx.compose.runtime.ReusableComposeNode$composable' call
        var factory_3 = Companion_getInstance_3().get_Constructor_f7ieep_k$();
        var skippableUpdate_3 = materializerOf(modifier_12);
        var $changed_9 = 6 | 7168 & $changed_8 << 9;
        var $composer_24 = $composer_23;
        var tmp_11 = $composer_24.get_applier_bupu8u_k$();
        if (!isInterface(tmp_11, Applier)) {
          invalidApplier();
        }
        $composer_24.startReusableNode_jjgeyp_k$();
        if ($composer_24.get_inserting_25mlsw_k$()) {
          $composer_24.createNode_ahrd54_k$(factory_3);
        } else {
          $composer_24.useNode_io5s9l_k$();
        }
        // Inline function 'androidx.compose.ui.layout.Layout$composable.<anonymous>' call
        var $this$ReusableComposeNode_3 = _Updater___init__impl__rbfxm8($composer_24);
        Updater__set_impl_v7kwss($this$ReusableComposeNode_3, measurePolicy_3, Companion_getInstance_3().get_SetMeasurePolicy_on6ujt_k$());
        Updater__set_impl_v7kwss($this$ReusableComposeNode_3, localMap_3, Companion_getInstance_3().get_SetResolvedCompositionLocals_rc2u9t_k$());
        // Inline function 'androidx.compose.runtime.Updater.set' call
        var block_3 = Companion_getInstance_3().get_SetCompositeKeyHash_n8lgg1_k$();
        // Inline function 'kotlin.with' call
        // Inline function 'kotlin.contracts.contract' call
        var $this$with_3 = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_3);
        var tmp_12;
        if ($this$with_3.get_inserting_25mlsw_k$() ? true : !equals($this$with_3.rememberedValue_4dg93v_k$(), compositeKeyHash_3)) {
          $this$with_3.updateRememberedValue_l1wh71_k$(compositeKeyHash_3);
          _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_3).apply_pk82p8_k$(compositeKeyHash_3, block_3);
          tmp_12 = Unit_getInstance();
        }
        skippableUpdate_3(new SkippableUpdater(_SkippableUpdater___init__impl__4ft0t9($composer_24)), $composer_24, 112 & $changed_9 >> 3);
        $composer_24.startReplaceableGroup_ip860b_k$(2058660585);
        // Inline function 'androidx.compose.foundation.layout.Box$composable.<anonymous>' call
        var $composer_25 = $composer_24;
        sourceInformationMarkerStart($composer_25, -1851536925, 'C71@3331L9:Box.kt#2w3rfo');
        // Inline function 'androidx.compose.material3.OutlinedTextFieldLayout$composable.<anonymous>.<anonymous>' call
        BoxScopeInstance_getInstance();
        var $composer_26 = $composer_25;
        sourceInformationMarkerStart($composer_26, 681045497, 'C582@27638L8:OutlinedTextField.kt#uh7d8r');
        suffix($composer_26, 14 & $dirty >> 21);
        sourceInformationMarkerEnd($composer_26);
        sourceInformationMarkerEnd($composer_25);
        $composer_24.endReplaceableGroup_ern0ak_k$();
        $composer_24.endNode_3m0yfn_k$();
        $composer_23.endReplaceableGroup_ern0ak_k$();
        $composer_22.endReplaceableGroup_ern0ak_k$();
      }
      $composer_6.endReplaceableGroup_ern0ak_k$();
      var tmp_13 = wrapContentHeight(heightIn(Companion_getInstance_1(), get_MinTextLineHeight()));
      var tmp_14;
      if (prefix == null) {
        tmp_14 = startPadding;
      } else {
        // Inline function 'androidx.compose.ui.unit.dp' call
        tmp_14 = _Dp___init__impl__ms3zkb(0);
      }
      var tmp_15 = tmp_14;
      var tmp_16;
      if (suffix == null) {
        tmp_16 = endPadding;
      } else {
        // Inline function 'androidx.compose.ui.unit.dp' call
        tmp_16 = _Dp___init__impl__ms3zkb(0);
      }
      var textPadding = padding(tmp_13, tmp_15, VOID, tmp_16);
      $composer_6.startReplaceableGroup_ip860b_k$(-1484246970);
      sourceInformation($composer_6, '595@28047L105');
      if (!(placeholder == null)) {
        placeholder(layoutId(Companion_getInstance_1(), get_PlaceholderId()).then_g5qrxq_k$(textPadding), $composer_6, 112 & $dirty >> 3);
      }
      $composer_6.endReplaceableGroup_ern0ak_k$();
      // Inline function 'androidx.compose.foundation.layout.Box$composable' call
      var modifier_13 = layoutId(Companion_getInstance_1(), get_TextFieldId()).then_g5qrxq_k$(textPadding);
      var contentAlignment_3 = null;
      var propagateMinConstraints_3 = true;
      var $composer_27 = $composer_6;
      $composer_27.startReplaceableGroup_ip860b_k$(1330882304);
      sourceInformation($composer_27, 'CC(Box$composable)P(2,1,3)69@3214L67,70@3286L130:Box.kt#2w3rfo');
      if (!((2 & 1) === 0))
        modifier_13 = Companion_getInstance_1();
      if (!((2 & 2) === 0))
        contentAlignment_3 = Companion_getInstance_0().get_TopStart_o4x792_k$();
      if (!((2 & 4) === 0))
        propagateMinConstraints_3 = false;
      var measurePolicy_4 = rememberBoxMeasurePolicy$composable(contentAlignment_3, propagateMinConstraints_3, $composer_27, 14 & 384 >> 3 | 112 & 384 >> 3);
      // Inline function 'androidx.compose.ui.layout.Layout$composable' call
      var modifier_14 = modifier_13;
      var $changed_10 = 112 & 384 << 3;
      var modifier_15 = modifier_14;
      var $composer_28 = $composer_27;
      $composer_28.startReplaceableGroup_ip860b_k$(1725976829);
      sourceInformation($composer_28, 'CC(Layout$composable)P(!1,2)78@3158L23,80@3248L420:Layout.kt#80mrfh');
      if (!((0 & 2) === 0))
        modifier_15 = Companion_getInstance_1();
      var compositeKeyHash_4 = $get_currentCompositeKeyHash$$composable_u3vbzj($composer_28, 0);
      var localMap_4 = $composer_28.get_currentCompositionLocalMap_fmcf79_k$();
      // Inline function 'androidx.compose.runtime.ReusableComposeNode$composable' call
      var factory_4 = Companion_getInstance_3().get_Constructor_f7ieep_k$();
      var skippableUpdate_4 = materializerOf(modifier_15);
      var $changed_11 = 6 | 7168 & $changed_10 << 9;
      var $composer_29 = $composer_28;
      var tmp_17 = $composer_29.get_applier_bupu8u_k$();
      if (!isInterface(tmp_17, Applier)) {
        invalidApplier();
      }
      $composer_29.startReusableNode_jjgeyp_k$();
      if ($composer_29.get_inserting_25mlsw_k$()) {
        $composer_29.createNode_ahrd54_k$(factory_4);
      } else {
        $composer_29.useNode_io5s9l_k$();
      }
      // Inline function 'androidx.compose.ui.layout.Layout$composable.<anonymous>' call
      var $this$ReusableComposeNode_4 = _Updater___init__impl__rbfxm8($composer_29);
      Updater__set_impl_v7kwss($this$ReusableComposeNode_4, measurePolicy_4, Companion_getInstance_3().get_SetMeasurePolicy_on6ujt_k$());
      Updater__set_impl_v7kwss($this$ReusableComposeNode_4, localMap_4, Companion_getInstance_3().get_SetResolvedCompositionLocals_rc2u9t_k$());
      // Inline function 'androidx.compose.runtime.Updater.set' call
      var block_4 = Companion_getInstance_3().get_SetCompositeKeyHash_n8lgg1_k$();
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      var $this$with_4 = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_4);
      var tmp_18;
      if ($this$with_4.get_inserting_25mlsw_k$() ? true : !equals($this$with_4.rememberedValue_4dg93v_k$(), compositeKeyHash_4)) {
        $this$with_4.updateRememberedValue_l1wh71_k$(compositeKeyHash_4);
        _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_4).apply_pk82p8_k$(compositeKeyHash_4, block_4);
        tmp_18 = Unit_getInstance();
      }
      skippableUpdate_4(new SkippableUpdater(_SkippableUpdater___init__impl__4ft0t9($composer_29)), $composer_29, 112 & $changed_11 >> 3);
      $composer_29.startReplaceableGroup_ip860b_k$(2058660585);
      // Inline function 'androidx.compose.foundation.layout.Box$composable.<anonymous>' call
      var $composer_30 = $composer_29;
      sourceInformationMarkerStart($composer_30, -1851536925, 'C71@3331L9:Box.kt#2w3rfo');
      // Inline function 'androidx.compose.material3.OutlinedTextFieldLayout$composable.<anonymous>.<anonymous>' call
      BoxScopeInstance_getInstance();
      var $composer_31 = $composer_30;
      sourceInformationMarkerStart($composer_31, 681046242, 'C606@28383L11:OutlinedTextField.kt#uh7d8r');
      textField($composer_31, 14 & $dirty >> 3);
      sourceInformationMarkerEnd($composer_31);
      sourceInformationMarkerEnd($composer_30);
      $composer_29.endReplaceableGroup_ern0ak_k$();
      $composer_29.endNode_3m0yfn_k$();
      $composer_28.endReplaceableGroup_ern0ak_k$();
      $composer_27.endReplaceableGroup_ern0ak_k$();
      $composer_6.startReplaceableGroup_ip860b_k$(-1484246552);
      sourceInformation($composer_6, '610@28459L237');
      if (!(label == null)) {
        // Inline function 'androidx.compose.foundation.layout.Box$composable' call
        var modifier_16 = layoutId(wrapContentHeight(heightIn(Companion_getInstance_1(), lerp(get_MinTextLineHeight(), get_MinFocusedLabelLineHeight(), animationProgress))), get_LabelId());
        var contentAlignment_4 = null;
        var propagateMinConstraints_4 = false;
        var $composer_32 = $composer_6;
        $composer_32.startReplaceableGroup_ip860b_k$(1330882304);
        sourceInformation($composer_32, 'CC(Box$composable)P(2,1,3)69@3214L67,70@3286L130:Box.kt#2w3rfo');
        if (!((6 & 1) === 0))
          modifier_16 = Companion_getInstance_1();
        if (!((6 & 2) === 0))
          contentAlignment_4 = Companion_getInstance_0().get_TopStart_o4x792_k$();
        if (!((6 & 4) === 0))
          propagateMinConstraints_4 = false;
        var measurePolicy_5 = rememberBoxMeasurePolicy$composable(contentAlignment_4, propagateMinConstraints_4, $composer_32, 14 & 0 >> 3 | 112 & 0 >> 3);
        // Inline function 'androidx.compose.ui.layout.Layout$composable' call
        var modifier_17 = modifier_16;
        var $changed_12 = 112 & 0 << 3;
        var modifier_18 = modifier_17;
        var $composer_33 = $composer_32;
        $composer_33.startReplaceableGroup_ip860b_k$(1725976829);
        sourceInformation($composer_33, 'CC(Layout$composable)P(!1,2)78@3158L23,80@3248L420:Layout.kt#80mrfh');
        if (!((0 & 2) === 0))
          modifier_18 = Companion_getInstance_1();
        var compositeKeyHash_5 = $get_currentCompositeKeyHash$$composable_u3vbzj($composer_33, 0);
        var localMap_5 = $composer_33.get_currentCompositionLocalMap_fmcf79_k$();
        // Inline function 'androidx.compose.runtime.ReusableComposeNode$composable' call
        var factory_5 = Companion_getInstance_3().get_Constructor_f7ieep_k$();
        var skippableUpdate_5 = materializerOf(modifier_18);
        var $changed_13 = 6 | 7168 & $changed_12 << 9;
        var $composer_34 = $composer_33;
        var tmp_19 = $composer_34.get_applier_bupu8u_k$();
        if (!isInterface(tmp_19, Applier)) {
          invalidApplier();
        }
        $composer_34.startReusableNode_jjgeyp_k$();
        if ($composer_34.get_inserting_25mlsw_k$()) {
          $composer_34.createNode_ahrd54_k$(factory_5);
        } else {
          $composer_34.useNode_io5s9l_k$();
        }
        // Inline function 'androidx.compose.ui.layout.Layout$composable.<anonymous>' call
        var $this$ReusableComposeNode_5 = _Updater___init__impl__rbfxm8($composer_34);
        Updater__set_impl_v7kwss($this$ReusableComposeNode_5, measurePolicy_5, Companion_getInstance_3().get_SetMeasurePolicy_on6ujt_k$());
        Updater__set_impl_v7kwss($this$ReusableComposeNode_5, localMap_5, Companion_getInstance_3().get_SetResolvedCompositionLocals_rc2u9t_k$());
        // Inline function 'androidx.compose.runtime.Updater.set' call
        var block_5 = Companion_getInstance_3().get_SetCompositeKeyHash_n8lgg1_k$();
        // Inline function 'kotlin.with' call
        // Inline function 'kotlin.contracts.contract' call
        var $this$with_5 = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_5);
        var tmp_20;
        if ($this$with_5.get_inserting_25mlsw_k$() ? true : !equals($this$with_5.rememberedValue_4dg93v_k$(), compositeKeyHash_5)) {
          $this$with_5.updateRememberedValue_l1wh71_k$(compositeKeyHash_5);
          _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_5).apply_pk82p8_k$(compositeKeyHash_5, block_5);
          tmp_20 = Unit_getInstance();
        }
        skippableUpdate_5(new SkippableUpdater(_SkippableUpdater___init__impl__4ft0t9($composer_34)), $composer_34, 112 & $changed_13 >> 3);
        $composer_34.startReplaceableGroup_ip860b_k$(2058660585);
        // Inline function 'androidx.compose.foundation.layout.Box$composable.<anonymous>' call
        var $composer_35 = $composer_34;
        sourceInformationMarkerStart($composer_35, -1851536925, 'C71@3331L9:Box.kt#2w3rfo');
        // Inline function 'androidx.compose.material3.OutlinedTextFieldLayout$composable.<anonymous>.<anonymous>' call
        BoxScopeInstance_getInstance();
        var $composer_36 = $composer_35;
        sourceInformationMarkerStart($composer_36, 681046546, 'C614@28687L7:OutlinedTextField.kt#uh7d8r');
        label($composer_36, 14 & $dirty >> 9);
        sourceInformationMarkerEnd($composer_36);
        sourceInformationMarkerEnd($composer_35);
        $composer_34.endReplaceableGroup_ern0ak_k$();
        $composer_34.endNode_3m0yfn_k$();
        $composer_33.endReplaceableGroup_ern0ak_k$();
        $composer_32.endReplaceableGroup_ern0ak_k$();
      }
      $composer_6.endReplaceableGroup_ern0ak_k$();
      $composer_6.startReplaceableGroup_ip860b_k$(-1390179723);
      sourceInformation($composer_6, '619@28822L269');
      if (!(supporting == null)) {
        // Inline function 'androidx.compose.foundation.layout.Box$composable' call
        var modifier_19 = padding_0(wrapContentHeight(heightIn(layoutId(Companion_getInstance_1(), get_SupportingId()), get_MinSupportingTextLineHeight())), TextFieldDefaults_getInstance().supportingTextPadding$default_4m2tf2_k$());
        var contentAlignment_5 = null;
        var propagateMinConstraints_5 = false;
        var $composer_37 = $composer_6;
        $composer_37.startReplaceableGroup_ip860b_k$(1330882304);
        sourceInformation($composer_37, 'CC(Box$composable)P(2,1,3)69@3214L67,70@3286L130:Box.kt#2w3rfo');
        if (!((6 & 1) === 0))
          modifier_19 = Companion_getInstance_1();
        if (!((6 & 2) === 0))
          contentAlignment_5 = Companion_getInstance_0().get_TopStart_o4x792_k$();
        if (!((6 & 4) === 0))
          propagateMinConstraints_5 = false;
        var measurePolicy_6 = rememberBoxMeasurePolicy$composable(contentAlignment_5, propagateMinConstraints_5, $composer_37, 14 & 0 >> 3 | 112 & 0 >> 3);
        // Inline function 'androidx.compose.ui.layout.Layout$composable' call
        var modifier_20 = modifier_19;
        var $changed_14 = 112 & 0 << 3;
        var modifier_21 = modifier_20;
        var $composer_38 = $composer_37;
        $composer_38.startReplaceableGroup_ip860b_k$(1725976829);
        sourceInformation($composer_38, 'CC(Layout$composable)P(!1,2)78@3158L23,80@3248L420:Layout.kt#80mrfh');
        if (!((0 & 2) === 0))
          modifier_21 = Companion_getInstance_1();
        var compositeKeyHash_6 = $get_currentCompositeKeyHash$$composable_u3vbzj($composer_38, 0);
        var localMap_6 = $composer_38.get_currentCompositionLocalMap_fmcf79_k$();
        // Inline function 'androidx.compose.runtime.ReusableComposeNode$composable' call
        var factory_6 = Companion_getInstance_3().get_Constructor_f7ieep_k$();
        var skippableUpdate_6 = materializerOf(modifier_21);
        var $changed_15 = 6 | 7168 & $changed_14 << 9;
        var $composer_39 = $composer_38;
        var tmp_21 = $composer_39.get_applier_bupu8u_k$();
        if (!isInterface(tmp_21, Applier)) {
          invalidApplier();
        }
        $composer_39.startReusableNode_jjgeyp_k$();
        if ($composer_39.get_inserting_25mlsw_k$()) {
          $composer_39.createNode_ahrd54_k$(factory_6);
        } else {
          $composer_39.useNode_io5s9l_k$();
        }
        // Inline function 'androidx.compose.ui.layout.Layout$composable.<anonymous>' call
        var $this$ReusableComposeNode_6 = _Updater___init__impl__rbfxm8($composer_39);
        Updater__set_impl_v7kwss($this$ReusableComposeNode_6, measurePolicy_6, Companion_getInstance_3().get_SetMeasurePolicy_on6ujt_k$());
        Updater__set_impl_v7kwss($this$ReusableComposeNode_6, localMap_6, Companion_getInstance_3().get_SetResolvedCompositionLocals_rc2u9t_k$());
        // Inline function 'androidx.compose.runtime.Updater.set' call
        var block_6 = Companion_getInstance_3().get_SetCompositeKeyHash_n8lgg1_k$();
        // Inline function 'kotlin.with' call
        // Inline function 'kotlin.contracts.contract' call
        var $this$with_6 = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_6);
        var tmp_22;
        if ($this$with_6.get_inserting_25mlsw_k$() ? true : !equals($this$with_6.rememberedValue_4dg93v_k$(), compositeKeyHash_6)) {
          $this$with_6.updateRememberedValue_l1wh71_k$(compositeKeyHash_6);
          _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_6).apply_pk82p8_k$(compositeKeyHash_6, block_6);
          tmp_22 = Unit_getInstance();
        }
        skippableUpdate_6(new SkippableUpdater(_SkippableUpdater___init__impl__4ft0t9($composer_39)), $composer_39, 112 & $changed_15 >> 3);
        $composer_39.startReplaceableGroup_ip860b_k$(2058660585);
        // Inline function 'androidx.compose.foundation.layout.Box$composable.<anonymous>' call
        var $composer_40 = $composer_39;
        sourceInformationMarkerStart($composer_40, -1851536925, 'C71@3331L9:Box.kt#2w3rfo');
        // Inline function 'androidx.compose.material3.OutlinedTextFieldLayout$composable.<anonymous>.<anonymous>' call
        BoxScopeInstance_getInstance();
        var $composer_41 = $composer_40;
        sourceInformationMarkerStart($composer_41, 681046936, 'C624@29077L12:OutlinedTextField.kt#uh7d8r');
        supporting($composer_41, 14 & $dirty1 >> 6);
        sourceInformationMarkerEnd($composer_41);
        sourceInformationMarkerEnd($composer_40);
        $composer_39.endReplaceableGroup_ern0ak_k$();
        $composer_39.endNode_3m0yfn_k$();
        $composer_38.endReplaceableGroup_ern0ak_k$();
        $composer_37.endReplaceableGroup_ern0ak_k$();
      }
      $composer_6.endReplaceableGroup_ern0ak_k$();
      sourceInformationMarkerEnd($composer_6);
      $composer_5.endReplaceableGroup_ern0ak_k$();
      $composer_5.endNode_3m0yfn_k$();
      $composer_4.endReplaceableGroup_ern0ak_k$();
      if (isTraceInProgress()) {
        traceEventEnd();
      }
    } else {
      $composer_0.skipToGroupEnd_lh3zi2_k$();
    }
    var tmp0_safe_receiver = $composer_0.endRestartGroup_yxpjv9_k$();
    if (tmp0_safe_receiver === null)
      null;
    else {
      tmp0_safe_receiver.updateScope_t8jcf_k$(OutlinedTextFieldLayout$composable$lambda(modifier, textField, placeholder, label, leading, trailing, prefix, suffix, singleLine, animationProgress, onLabelMeasured, container, supporting, paddingValues, $changed, $changed1));
    }
  }
  function _get_onLabelMeasured__w7euve($this) {
    return $this.onLabelMeasured_1;
  }
  function _get_singleLine__awe4rz($this) {
    return $this.singleLine_1;
  }
  function _get_animationProgress__6qh674($this) {
    return $this.animationProgress_1;
  }
  function _get_paddingValues__qy7l9e($this) {
    return $this.paddingValues_1;
  }
  function intrinsicWidth(_this__u8e3s4, $this, measurables, height, intrinsicMeasurer) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.collections.first' call
      var tmp0_iterator = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator.hasNext_bitz1p_k$()) {
        var element = tmp0_iterator.next_20eer_k$();
        // Inline function 'androidx.compose.material3.OutlinedTextFieldMeasurePolicy.intrinsicWidth.<anonymous>' call
        if (equals(get_layoutId_0(element), get_TextFieldId())) {
          tmp$ret$1 = element;
          break $l$block;
        }
      }
      throw NoSuchElementException_init_$Create$('Collection contains no element matching the predicate.');
    }
    var textFieldWidth = intrinsicMeasurer(tmp$ret$1, height);
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$3;
    $l$block_0: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator_0 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_0.hasNext_bitz1p_k$()) {
        var element_0 = tmp0_iterator_0.next_20eer_k$();
        // Inline function 'androidx.compose.material3.OutlinedTextFieldMeasurePolicy.intrinsicWidth.<anonymous>' call
        if (equals(get_layoutId_0(element_0), get_LabelId())) {
          tmp$ret$3 = element_0;
          break $l$block_0;
        }
      }
      tmp$ret$3 = null;
    }
    var tmp0_safe_receiver = tmp$ret$3;
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.material3.OutlinedTextFieldMeasurePolicy.intrinsicWidth.<anonymous>' call
      tmp = intrinsicMeasurer(tmp0_safe_receiver, height);
    }
    var tmp1_elvis_lhs = tmp;
    var labelWidth = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$8;
    $l$block_1: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator_1 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_1.hasNext_bitz1p_k$()) {
        var element_1 = tmp0_iterator_1.next_20eer_k$();
        // Inline function 'androidx.compose.material3.OutlinedTextFieldMeasurePolicy.intrinsicWidth.<anonymous>' call
        if (equals(get_layoutId_0(element_1), get_TrailingId())) {
          tmp$ret$8 = element_1;
          break $l$block_1;
        }
      }
      tmp$ret$8 = null;
    }
    var tmp2_safe_receiver = tmp$ret$8;
    var tmp_0;
    if (tmp2_safe_receiver == null) {
      tmp_0 = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.material3.OutlinedTextFieldMeasurePolicy.intrinsicWidth.<anonymous>' call
      tmp_0 = intrinsicMeasurer(tmp2_safe_receiver, height);
    }
    var tmp3_elvis_lhs = tmp_0;
    var trailingWidth = tmp3_elvis_lhs == null ? 0 : tmp3_elvis_lhs;
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$13;
    $l$block_2: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator_2 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_2.hasNext_bitz1p_k$()) {
        var element_2 = tmp0_iterator_2.next_20eer_k$();
        // Inline function 'androidx.compose.material3.OutlinedTextFieldMeasurePolicy.intrinsicWidth.<anonymous>' call
        if (equals(get_layoutId_0(element_2), get_LeadingId())) {
          tmp$ret$13 = element_2;
          break $l$block_2;
        }
      }
      tmp$ret$13 = null;
    }
    var tmp4_safe_receiver = tmp$ret$13;
    var tmp_1;
    if (tmp4_safe_receiver == null) {
      tmp_1 = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.material3.OutlinedTextFieldMeasurePolicy.intrinsicWidth.<anonymous>' call
      tmp_1 = intrinsicMeasurer(tmp4_safe_receiver, height);
    }
    var tmp5_elvis_lhs = tmp_1;
    var leadingWidth = tmp5_elvis_lhs == null ? 0 : tmp5_elvis_lhs;
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$18;
    $l$block_3: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator_3 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_3.hasNext_bitz1p_k$()) {
        var element_3 = tmp0_iterator_3.next_20eer_k$();
        // Inline function 'androidx.compose.material3.OutlinedTextFieldMeasurePolicy.intrinsicWidth.<anonymous>' call
        if (equals(get_layoutId_0(element_3), get_PrefixId())) {
          tmp$ret$18 = element_3;
          break $l$block_3;
        }
      }
      tmp$ret$18 = null;
    }
    var tmp6_safe_receiver = tmp$ret$18;
    var tmp_2;
    if (tmp6_safe_receiver == null) {
      tmp_2 = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.material3.OutlinedTextFieldMeasurePolicy.intrinsicWidth.<anonymous>' call
      tmp_2 = intrinsicMeasurer(tmp6_safe_receiver, height);
    }
    var tmp7_elvis_lhs = tmp_2;
    var prefixWidth = tmp7_elvis_lhs == null ? 0 : tmp7_elvis_lhs;
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$23;
    $l$block_4: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator_4 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_4.hasNext_bitz1p_k$()) {
        var element_4 = tmp0_iterator_4.next_20eer_k$();
        // Inline function 'androidx.compose.material3.OutlinedTextFieldMeasurePolicy.intrinsicWidth.<anonymous>' call
        if (equals(get_layoutId_0(element_4), get_SuffixId())) {
          tmp$ret$23 = element_4;
          break $l$block_4;
        }
      }
      tmp$ret$23 = null;
    }
    var tmp8_safe_receiver = tmp$ret$23;
    var tmp_3;
    if (tmp8_safe_receiver == null) {
      tmp_3 = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.material3.OutlinedTextFieldMeasurePolicy.intrinsicWidth.<anonymous>' call
      tmp_3 = intrinsicMeasurer(tmp8_safe_receiver, height);
    }
    var tmp9_elvis_lhs = tmp_3;
    var suffixWidth = tmp9_elvis_lhs == null ? 0 : tmp9_elvis_lhs;
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$28;
    $l$block_5: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator_5 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_5.hasNext_bitz1p_k$()) {
        var element_5 = tmp0_iterator_5.next_20eer_k$();
        // Inline function 'androidx.compose.material3.OutlinedTextFieldMeasurePolicy.intrinsicWidth.<anonymous>' call
        if (equals(get_layoutId_0(element_5), get_PlaceholderId())) {
          tmp$ret$28 = element_5;
          break $l$block_5;
        }
      }
      tmp$ret$28 = null;
    }
    var tmp10_safe_receiver = tmp$ret$28;
    var tmp_4;
    if (tmp10_safe_receiver == null) {
      tmp_4 = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.material3.OutlinedTextFieldMeasurePolicy.intrinsicWidth.<anonymous>' call
      tmp_4 = intrinsicMeasurer(tmp10_safe_receiver, height);
    }
    var tmp11_elvis_lhs = tmp_4;
    var placeholderWidth = tmp11_elvis_lhs == null ? 0 : tmp11_elvis_lhs;
    return calculateWidth(leadingWidth, trailingWidth, prefixWidth, suffixWidth, textFieldWidth, labelWidth, placeholderWidth, $this.animationProgress_1 < 1.0, get_ZeroConstraints(), _this__u8e3s4.get_density_qy0267_k$(), $this.paddingValues_1);
  }
  function intrinsicHeight(_this__u8e3s4, $this, measurables, width, intrinsicMeasurer) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.collections.first' call
      var tmp0_iterator = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator.hasNext_bitz1p_k$()) {
        var element = tmp0_iterator.next_20eer_k$();
        // Inline function 'androidx.compose.material3.OutlinedTextFieldMeasurePolicy.intrinsicHeight.<anonymous>' call
        if (equals(get_layoutId_0(element), get_TextFieldId())) {
          tmp$ret$1 = element;
          break $l$block;
        }
      }
      throw NoSuchElementException_init_$Create$('Collection contains no element matching the predicate.');
    }
    var textFieldHeight = intrinsicMeasurer(tmp$ret$1, width);
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$3;
    $l$block_0: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator_0 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_0.hasNext_bitz1p_k$()) {
        var element_0 = tmp0_iterator_0.next_20eer_k$();
        // Inline function 'androidx.compose.material3.OutlinedTextFieldMeasurePolicy.intrinsicHeight.<anonymous>' call
        if (equals(get_layoutId_0(element_0), get_LabelId())) {
          tmp$ret$3 = element_0;
          break $l$block_0;
        }
      }
      tmp$ret$3 = null;
    }
    var tmp0_safe_receiver = tmp$ret$3;
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.material3.OutlinedTextFieldMeasurePolicy.intrinsicHeight.<anonymous>' call
      tmp = intrinsicMeasurer(tmp0_safe_receiver, width);
    }
    var tmp1_elvis_lhs = tmp;
    var labelHeight = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$8;
    $l$block_1: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator_1 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_1.hasNext_bitz1p_k$()) {
        var element_1 = tmp0_iterator_1.next_20eer_k$();
        // Inline function 'androidx.compose.material3.OutlinedTextFieldMeasurePolicy.intrinsicHeight.<anonymous>' call
        if (equals(get_layoutId_0(element_1), get_TrailingId())) {
          tmp$ret$8 = element_1;
          break $l$block_1;
        }
      }
      tmp$ret$8 = null;
    }
    var tmp2_safe_receiver = tmp$ret$8;
    var tmp_0;
    if (tmp2_safe_receiver == null) {
      tmp_0 = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.material3.OutlinedTextFieldMeasurePolicy.intrinsicHeight.<anonymous>' call
      tmp_0 = intrinsicMeasurer(tmp2_safe_receiver, width);
    }
    var tmp3_elvis_lhs = tmp_0;
    var trailingHeight = tmp3_elvis_lhs == null ? 0 : tmp3_elvis_lhs;
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$13;
    $l$block_2: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator_2 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_2.hasNext_bitz1p_k$()) {
        var element_2 = tmp0_iterator_2.next_20eer_k$();
        // Inline function 'androidx.compose.material3.OutlinedTextFieldMeasurePolicy.intrinsicHeight.<anonymous>' call
        if (equals(get_layoutId_0(element_2), get_LeadingId())) {
          tmp$ret$13 = element_2;
          break $l$block_2;
        }
      }
      tmp$ret$13 = null;
    }
    var tmp4_safe_receiver = tmp$ret$13;
    var tmp_1;
    if (tmp4_safe_receiver == null) {
      tmp_1 = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.material3.OutlinedTextFieldMeasurePolicy.intrinsicHeight.<anonymous>' call
      tmp_1 = intrinsicMeasurer(tmp4_safe_receiver, width);
    }
    var tmp5_elvis_lhs = tmp_1;
    var leadingHeight = tmp5_elvis_lhs == null ? 0 : tmp5_elvis_lhs;
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$18;
    $l$block_3: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator_3 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_3.hasNext_bitz1p_k$()) {
        var element_3 = tmp0_iterator_3.next_20eer_k$();
        // Inline function 'androidx.compose.material3.OutlinedTextFieldMeasurePolicy.intrinsicHeight.<anonymous>' call
        if (equals(get_layoutId_0(element_3), get_PrefixId())) {
          tmp$ret$18 = element_3;
          break $l$block_3;
        }
      }
      tmp$ret$18 = null;
    }
    var tmp6_safe_receiver = tmp$ret$18;
    var tmp_2;
    if (tmp6_safe_receiver == null) {
      tmp_2 = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.material3.OutlinedTextFieldMeasurePolicy.intrinsicHeight.<anonymous>' call
      tmp_2 = intrinsicMeasurer(tmp6_safe_receiver, width);
    }
    var tmp7_elvis_lhs = tmp_2;
    var prefixHeight = tmp7_elvis_lhs == null ? 0 : tmp7_elvis_lhs;
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$23;
    $l$block_4: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator_4 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_4.hasNext_bitz1p_k$()) {
        var element_4 = tmp0_iterator_4.next_20eer_k$();
        // Inline function 'androidx.compose.material3.OutlinedTextFieldMeasurePolicy.intrinsicHeight.<anonymous>' call
        if (equals(get_layoutId_0(element_4), get_SuffixId())) {
          tmp$ret$23 = element_4;
          break $l$block_4;
        }
      }
      tmp$ret$23 = null;
    }
    var tmp8_safe_receiver = tmp$ret$23;
    var tmp_3;
    if (tmp8_safe_receiver == null) {
      tmp_3 = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.material3.OutlinedTextFieldMeasurePolicy.intrinsicHeight.<anonymous>' call
      tmp_3 = intrinsicMeasurer(tmp8_safe_receiver, width);
    }
    var tmp9_elvis_lhs = tmp_3;
    var suffixHeight = tmp9_elvis_lhs == null ? 0 : tmp9_elvis_lhs;
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$28;
    $l$block_5: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator_5 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_5.hasNext_bitz1p_k$()) {
        var element_5 = tmp0_iterator_5.next_20eer_k$();
        // Inline function 'androidx.compose.material3.OutlinedTextFieldMeasurePolicy.intrinsicHeight.<anonymous>' call
        if (equals(get_layoutId_0(element_5), get_PlaceholderId())) {
          tmp$ret$28 = element_5;
          break $l$block_5;
        }
      }
      tmp$ret$28 = null;
    }
    var tmp10_safe_receiver = tmp$ret$28;
    var tmp_4;
    if (tmp10_safe_receiver == null) {
      tmp_4 = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.material3.OutlinedTextFieldMeasurePolicy.intrinsicHeight.<anonymous>' call
      tmp_4 = intrinsicMeasurer(tmp10_safe_receiver, width);
    }
    var tmp11_elvis_lhs = tmp_4;
    var placeholderHeight = tmp11_elvis_lhs == null ? 0 : tmp11_elvis_lhs;
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$33;
    $l$block_6: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator_6 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_6.hasNext_bitz1p_k$()) {
        var element_6 = tmp0_iterator_6.next_20eer_k$();
        // Inline function 'androidx.compose.material3.OutlinedTextFieldMeasurePolicy.intrinsicHeight.<anonymous>' call
        if (equals(get_layoutId_0(element_6), get_SupportingId())) {
          tmp$ret$33 = element_6;
          break $l$block_6;
        }
      }
      tmp$ret$33 = null;
    }
    var tmp12_safe_receiver = tmp$ret$33;
    var tmp_5;
    if (tmp12_safe_receiver == null) {
      tmp_5 = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.material3.OutlinedTextFieldMeasurePolicy.intrinsicHeight.<anonymous>' call
      tmp_5 = intrinsicMeasurer(tmp12_safe_receiver, width);
    }
    var tmp13_elvis_lhs = tmp_5;
    var supportingHeight = tmp13_elvis_lhs == null ? 0 : tmp13_elvis_lhs;
    return calculateHeight(leadingHeight, trailingHeight, prefixHeight, suffixHeight, textFieldHeight, labelHeight, placeholderHeight, supportingHeight, get_ZeroConstraints(), _this__u8e3s4.get_density_qy0267_k$(), $this.paddingValues_1);
  }
  function OutlinedTextFieldMeasurePolicy$measure$lambda($totalHeight, $width, $leadingPlaceable, $trailingPlaceable, $prefixPlaceable, $suffixPlaceable, $textFieldPlaceable, $labelPlaceable, $placeholderPlaceable, $containerPlaceable, $supportingPlaceable, this$0, $this_measure) {
    return function ($this$layout) {
      place($this$layout, $totalHeight, $width, $leadingPlaceable, $trailingPlaceable, $prefixPlaceable, $suffixPlaceable, $textFieldPlaceable, $labelPlaceable, $placeholderPlaceable, $containerPlaceable, $supportingPlaceable, this$0.animationProgress_1, this$0.singleLine_1, $this_measure.get_density_qy0267_k$(), $this_measure.get_layoutDirection_7e37v0_k$(), this$0.paddingValues_1);
      return Unit_getInstance();
    };
  }
  function OutlinedTextFieldMeasurePolicy$maxIntrinsicHeight$lambda(intrinsicMeasurable, w) {
    return intrinsicMeasurable.maxIntrinsicHeight_b0krtc_k$(w);
  }
  function OutlinedTextFieldMeasurePolicy$minIntrinsicHeight$lambda(intrinsicMeasurable, w) {
    return intrinsicMeasurable.minIntrinsicHeight_p2a4ou_k$(w);
  }
  function OutlinedTextFieldMeasurePolicy$maxIntrinsicWidth$lambda(intrinsicMeasurable, h) {
    return intrinsicMeasurable.maxIntrinsicWidth_b8umbx_k$(h);
  }
  function OutlinedTextFieldMeasurePolicy$minIntrinsicWidth$lambda(intrinsicMeasurable, h) {
    return intrinsicMeasurable.minIntrinsicWidth_jyhjuj_k$(h);
  }
  function OutlinedTextFieldMeasurePolicy(onLabelMeasured, singleLine, animationProgress, paddingValues) {
    this.onLabelMeasured_1 = onLabelMeasured;
    this.singleLine_1 = singleLine;
    this.animationProgress_1 = animationProgress;
    this.paddingValues_1 = paddingValues;
  }
  protoOf(OutlinedTextFieldMeasurePolicy).measure_xg9b01_k$ = function (_this__u8e3s4, measurables, constraints) {
    var occupiedSpaceHorizontally = 0;
    var occupiedSpaceVertically = 0;
    var bottomPadding = _this__u8e3s4.roundToPx_yb7vg8_k$(this.paddingValues_1.calculateBottomPadding_6z7ugt_k$());
    var relaxedConstraints = Constraints__copy$default_impl_f452rp(constraints, 0, VOID, 0);
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator.hasNext_bitz1p_k$()) {
        var element = tmp0_iterator.next_20eer_k$();
        // Inline function 'androidx.compose.material3.OutlinedTextFieldMeasurePolicy.measure.<anonymous>' call
        if (equals(get_layoutId(element), get_LeadingId())) {
          tmp$ret$1 = element;
          break $l$block;
        }
      }
      tmp$ret$1 = null;
    }
    var tmp0_safe_receiver = tmp$ret$1;
    var leadingPlaceable = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.measure_4dmfk1_k$(relaxedConstraints);
    occupiedSpaceHorizontally = occupiedSpaceHorizontally + widthOrZero(leadingPlaceable) | 0;
    // Inline function 'kotlin.math.max' call
    var a = occupiedSpaceVertically;
    var b = heightOrZero(leadingPlaceable);
    occupiedSpaceVertically = Math.max(a, b);
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$5;
    $l$block_0: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator_0 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_0.hasNext_bitz1p_k$()) {
        var element_0 = tmp0_iterator_0.next_20eer_k$();
        // Inline function 'androidx.compose.material3.OutlinedTextFieldMeasurePolicy.measure.<anonymous>' call
        if (equals(get_layoutId(element_0), get_TrailingId())) {
          tmp$ret$5 = element_0;
          break $l$block_0;
        }
      }
      tmp$ret$5 = null;
    }
    var tmp1_safe_receiver = tmp$ret$5;
    var trailingPlaceable = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.measure_4dmfk1_k$(offset(relaxedConstraints, -occupiedSpaceHorizontally | 0));
    occupiedSpaceHorizontally = occupiedSpaceHorizontally + widthOrZero(trailingPlaceable) | 0;
    // Inline function 'kotlin.math.max' call
    var a_0 = occupiedSpaceVertically;
    var b_0 = heightOrZero(trailingPlaceable);
    occupiedSpaceVertically = Math.max(a_0, b_0);
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$9;
    $l$block_1: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator_1 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_1.hasNext_bitz1p_k$()) {
        var element_1 = tmp0_iterator_1.next_20eer_k$();
        // Inline function 'androidx.compose.material3.OutlinedTextFieldMeasurePolicy.measure.<anonymous>' call
        if (equals(get_layoutId(element_1), get_PrefixId())) {
          tmp$ret$9 = element_1;
          break $l$block_1;
        }
      }
      tmp$ret$9 = null;
    }
    var tmp2_safe_receiver = tmp$ret$9;
    var prefixPlaceable = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.measure_4dmfk1_k$(offset(relaxedConstraints, -occupiedSpaceHorizontally | 0));
    occupiedSpaceHorizontally = occupiedSpaceHorizontally + widthOrZero(prefixPlaceable) | 0;
    // Inline function 'kotlin.math.max' call
    var a_1 = occupiedSpaceVertically;
    var b_1 = heightOrZero(prefixPlaceable);
    occupiedSpaceVertically = Math.max(a_1, b_1);
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$13;
    $l$block_2: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator_2 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_2.hasNext_bitz1p_k$()) {
        var element_2 = tmp0_iterator_2.next_20eer_k$();
        // Inline function 'androidx.compose.material3.OutlinedTextFieldMeasurePolicy.measure.<anonymous>' call
        if (equals(get_layoutId(element_2), get_SuffixId())) {
          tmp$ret$13 = element_2;
          break $l$block_2;
        }
      }
      tmp$ret$13 = null;
    }
    var tmp3_safe_receiver = tmp$ret$13;
    var suffixPlaceable = tmp3_safe_receiver == null ? null : tmp3_safe_receiver.measure_4dmfk1_k$(offset(relaxedConstraints, -occupiedSpaceHorizontally | 0));
    occupiedSpaceHorizontally = occupiedSpaceHorizontally + widthOrZero(suffixPlaceable) | 0;
    // Inline function 'kotlin.math.max' call
    var a_2 = occupiedSpaceVertically;
    var b_2 = heightOrZero(suffixPlaceable);
    occupiedSpaceVertically = Math.max(a_2, b_2);
    var isLabelInMiddleSection = this.animationProgress_1 < 1.0;
    var labelHorizontalPaddingOffset = _this__u8e3s4.roundToPx_yb7vg8_k$(this.paddingValues_1.calculateLeftPadding_trh5z9_k$(_this__u8e3s4.get_layoutDirection_7e37v0_k$())) + _this__u8e3s4.roundToPx_yb7vg8_k$(this.paddingValues_1.calculateRightPadding_yc2gi_k$(_this__u8e3s4.get_layoutDirection_7e37v0_k$())) | 0;
    var tmp;
    if (isLabelInMiddleSection) {
      tmp = (-occupiedSpaceHorizontally | 0) - labelHorizontalPaddingOffset | 0;
    } else {
      tmp = -labelHorizontalPaddingOffset | 0;
    }
    var labelConstraints = offset(relaxedConstraints, tmp, -bottomPadding | 0);
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$17;
    $l$block_3: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator_3 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_3.hasNext_bitz1p_k$()) {
        var element_3 = tmp0_iterator_3.next_20eer_k$();
        // Inline function 'androidx.compose.material3.OutlinedTextFieldMeasurePolicy.measure.<anonymous>' call
        if (equals(get_layoutId(element_3), get_LabelId())) {
          tmp$ret$17 = element_3;
          break $l$block_3;
        }
      }
      tmp$ret$17 = null;
    }
    var tmp4_safe_receiver = tmp$ret$17;
    var labelPlaceable = tmp4_safe_receiver == null ? null : tmp4_safe_receiver.measure_4dmfk1_k$(labelConstraints);
    if (labelPlaceable == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      this.onLabelMeasured_1(new Size_0(Size(labelPlaceable.get_width_j0q4yl_k$(), labelPlaceable.get_height_e7t92o_k$())));
    }
    // Inline function 'kotlin.math.max' call
    var a_3 = heightOrZero(labelPlaceable) / 2 | 0;
    var b_3 = _this__u8e3s4.roundToPx_yb7vg8_k$(this.paddingValues_1.calculateTopPadding_vlylwf_k$());
    var topPadding = Math.max(a_3, b_3);
    var textConstraints = Constraints__copy$default_impl_f452rp(offset(constraints, -occupiedSpaceHorizontally | 0, (-bottomPadding | 0) - topPadding | 0), VOID, VOID, 0);
    var tmp$ret$22;
    $l$block_4: {
      // Inline function 'kotlin.collections.first' call
      var tmp0_iterator_4 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_4.hasNext_bitz1p_k$()) {
        var element_4 = tmp0_iterator_4.next_20eer_k$();
        // Inline function 'androidx.compose.material3.OutlinedTextFieldMeasurePolicy.measure.<anonymous>' call
        if (equals(get_layoutId(element_4), get_TextFieldId())) {
          tmp$ret$22 = element_4;
          break $l$block_4;
        }
      }
      throw NoSuchElementException_init_$Create$('Collection contains no element matching the predicate.');
    }
    var textFieldPlaceable = tmp$ret$22.measure_4dmfk1_k$(textConstraints);
    var placeholderConstraints = Constraints__copy$default_impl_f452rp(textConstraints, 0);
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$24;
    $l$block_5: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator_5 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_5.hasNext_bitz1p_k$()) {
        var element_5 = tmp0_iterator_5.next_20eer_k$();
        // Inline function 'androidx.compose.material3.OutlinedTextFieldMeasurePolicy.measure.<anonymous>' call
        if (equals(get_layoutId(element_5), get_PlaceholderId())) {
          tmp$ret$24 = element_5;
          break $l$block_5;
        }
      }
      tmp$ret$24 = null;
    }
    var tmp6_safe_receiver = tmp$ret$24;
    var placeholderPlaceable = tmp6_safe_receiver == null ? null : tmp6_safe_receiver.measure_4dmfk1_k$(placeholderConstraints);
    // Inline function 'kotlin.math.max' call
    var a_4 = occupiedSpaceVertically;
    // Inline function 'kotlin.math.max' call
    var a_5 = heightOrZero(textFieldPlaceable);
    var b_4 = heightOrZero(placeholderPlaceable);
    var b_5 = (Math.max(a_5, b_4) + topPadding | 0) + bottomPadding | 0;
    occupiedSpaceVertically = Math.max(a_4, b_5);
    var supportingConstraints = Constraints__copy$default_impl_f452rp(offset(relaxedConstraints, VOID, -occupiedSpaceVertically | 0), VOID, VOID, 0);
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$29;
    $l$block_6: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator_6 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_6.hasNext_bitz1p_k$()) {
        var element_6 = tmp0_iterator_6.next_20eer_k$();
        // Inline function 'androidx.compose.material3.OutlinedTextFieldMeasurePolicy.measure.<anonymous>' call
        if (equals(get_layoutId(element_6), get_SupportingId())) {
          tmp$ret$29 = element_6;
          break $l$block_6;
        }
      }
      tmp$ret$29 = null;
    }
    var tmp7_safe_receiver = tmp$ret$29;
    var supportingPlaceable = tmp7_safe_receiver == null ? null : tmp7_safe_receiver.measure_4dmfk1_k$(supportingConstraints);
    var supportingHeight = heightOrZero(supportingPlaceable);
    var width = calculateWidth(widthOrZero(leadingPlaceable), widthOrZero(trailingPlaceable), widthOrZero(prefixPlaceable), widthOrZero(suffixPlaceable), textFieldPlaceable.get_width_j0q4yl_k$(), widthOrZero(labelPlaceable), widthOrZero(placeholderPlaceable), isLabelInMiddleSection, constraints, _this__u8e3s4.get_density_qy0267_k$(), this.paddingValues_1);
    var totalHeight = calculateHeight(heightOrZero(leadingPlaceable), heightOrZero(trailingPlaceable), heightOrZero(prefixPlaceable), heightOrZero(suffixPlaceable), textFieldPlaceable.get_height_e7t92o_k$(), heightOrZero(labelPlaceable), heightOrZero(placeholderPlaceable), heightOrZero(supportingPlaceable), constraints, _this__u8e3s4.get_density_qy0267_k$(), this.paddingValues_1);
    var height = totalHeight - supportingHeight | 0;
    var tmp$ret$32;
    $l$block_7: {
      // Inline function 'kotlin.collections.first' call
      var tmp0_iterator_7 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_7.hasNext_bitz1p_k$()) {
        var element_7 = tmp0_iterator_7.next_20eer_k$();
        // Inline function 'androidx.compose.material3.OutlinedTextFieldMeasurePolicy.measure.<anonymous>' call
        if (equals(get_layoutId(element_7), get_ContainerId())) {
          tmp$ret$32 = element_7;
          break $l$block_7;
        }
      }
      throw NoSuchElementException_init_$Create$('Collection contains no element matching the predicate.');
    }
    var containerPlaceable = tmp$ret$32.measure_4dmfk1_k$(Constraints(!(width === Companion_getInstance_4().get_Infinity_rvchkf_k$()) ? width : 0, width, !(height === Companion_getInstance_4().get_Infinity_rvchkf_k$()) ? height : 0, height));
    return _this__u8e3s4.layout$default_n19e5l_k$(width, totalHeight, VOID, OutlinedTextFieldMeasurePolicy$measure$lambda(totalHeight, width, leadingPlaceable, trailingPlaceable, prefixPlaceable, suffixPlaceable, textFieldPlaceable, labelPlaceable, placeholderPlaceable, containerPlaceable, supportingPlaceable, this, _this__u8e3s4));
  };
  protoOf(OutlinedTextFieldMeasurePolicy).maxIntrinsicHeight_3a4xm1_k$ = function (_this__u8e3s4, measurables, width) {
    return intrinsicHeight(_this__u8e3s4, this, measurables, width, OutlinedTextFieldMeasurePolicy$maxIntrinsicHeight$lambda);
  };
  protoOf(OutlinedTextFieldMeasurePolicy).minIntrinsicHeight_xlhgwn_k$ = function (_this__u8e3s4, measurables, width) {
    return intrinsicHeight(_this__u8e3s4, this, measurables, width, OutlinedTextFieldMeasurePolicy$minIntrinsicHeight$lambda);
  };
  protoOf(OutlinedTextFieldMeasurePolicy).maxIntrinsicWidth_cx7ze4_k$ = function (_this__u8e3s4, measurables, height) {
    return intrinsicWidth(_this__u8e3s4, this, measurables, height, OutlinedTextFieldMeasurePolicy$maxIntrinsicWidth$lambda);
  };
  protoOf(OutlinedTextFieldMeasurePolicy).minIntrinsicWidth_dwfcse_k$ = function (_this__u8e3s4, measurables, height) {
    return intrinsicWidth(_this__u8e3s4, this, measurables, height, OutlinedTextFieldMeasurePolicy$minIntrinsicWidth$lambda);
  };
  function calculateWidth(leadingPlaceableWidth, trailingPlaceableWidth, prefixPlaceableWidth, suffixPlaceableWidth, textFieldPlaceableWidth, labelPlaceableWidth, placeholderPlaceableWidth, isLabelInMiddleSection, constraints, density, paddingValues) {
    _init_properties_OutlinedTextField_kt__36w0dj();
    var affixTotalWidth = prefixPlaceableWidth + suffixPlaceableWidth | 0;
    // Inline function 'kotlin.comparisons.maxOf' call
    var a = textFieldPlaceableWidth + affixTotalWidth | 0;
    var b = placeholderPlaceableWidth + affixTotalWidth | 0;
    var c = isLabelInMiddleSection ? labelPlaceableWidth : 0;
    var middleSection = Math.max(a, b, c);
    var wrappedWidth = (leadingPlaceableWidth + middleSection | 0) + trailingPlaceableWidth | 0;
    var tmp;
    if (!isLabelInMiddleSection) {
      // Inline function 'androidx.compose.ui.unit.Dp.plus' call
      var this_0 = paddingValues.calculateLeftPadding_trh5z9_k$(LayoutDirection_Ltr_getInstance());
      var other = paddingValues.calculateRightPadding_yc2gi_k$(LayoutDirection_Ltr_getInstance());
      var tmp$ret$1 = _Dp___init__impl__ms3zkb(_Dp___get_value__impl__geb1vb(this_0) + _Dp___get_value__impl__geb1vb(other));
      var labelHorizontalPadding = _Dp___get_value__impl__geb1vb(tmp$ret$1) * density;
      // Inline function 'kotlin.math.roundToInt' call
      tmp = labelPlaceableWidth + roundToInt(labelHorizontalPadding) | 0;
    } else {
      tmp = 0;
    }
    var focusedLabelWidth = tmp;
    // Inline function 'kotlin.comparisons.maxOf' call
    var c_0 = _Constraints___get_minWidth__impl__hi9lfi(constraints);
    return Math.max(wrappedWidth, focusedLabelWidth, c_0);
  }
  function calculateHeight(leadingPlaceableHeight, trailingPlaceableHeight, prefixPlaceableHeight, suffixPlaceableHeight, textFieldPlaceableHeight, labelPlaceableHeight, placeholderPlaceableHeight, supportingPlaceableHeight, constraints, density, paddingValues) {
    _init_properties_OutlinedTextField_kt__36w0dj();
    // Inline function 'kotlin.math.max' call
    var inputFieldHeight = Math.max(textFieldPlaceableHeight, placeholderPlaceableHeight);
    var topPadding = _Dp___get_value__impl__geb1vb(paddingValues.calculateTopPadding_vlylwf_k$()) * density;
    var bottomPadding = _Dp___get_value__impl__geb1vb(paddingValues.calculateBottomPadding_6z7ugt_k$()) * density;
    var tmp = inputFieldHeight + bottomPadding;
    // Inline function 'kotlin.math.max' call
    var b = labelPlaceableHeight / 2.0;
    var middleSectionHeight = tmp + Math.max(topPadding, b);
    // Inline function 'kotlin.math.max' call
    var a = _Constraints___get_minHeight__impl__ev4bgx(constraints);
    // Inline function 'kotlin.math.roundToInt' call
    var tmp$ret$2 = roundToInt(middleSectionHeight);
    var b_0 = maxOf(leadingPlaceableHeight, new Int32Array([trailingPlaceableHeight, prefixPlaceableHeight, suffixPlaceableHeight, tmp$ret$2])) + supportingPlaceableHeight | 0;
    return Math.max(a, b_0);
  }
  function place(_this__u8e3s4, totalHeight, width, leadingPlaceable, trailingPlaceable, prefixPlaceable, suffixPlaceable, textFieldPlaceable, labelPlaceable, placeholderPlaceable, containerPlaceable, supportingPlaceable, animationProgress, singleLine, density, layoutDirection, paddingValues) {
    _init_properties_OutlinedTextField_kt__36w0dj();
    _this__u8e3s4.place$default_gmqxva_k$(containerPlaceable, Companion_getInstance_5().get_Zero_6hc3i8_k$());
    var height = totalHeight - heightOrZero(supportingPlaceable) | 0;
    // Inline function 'kotlin.math.roundToInt' call
    var this_0 = _Dp___get_value__impl__geb1vb(paddingValues.calculateTopPadding_vlylwf_k$()) * density;
    var topPadding = roundToInt(this_0);
    // Inline function 'kotlin.math.roundToInt' call
    var this_1 = _Dp___get_value__impl__geb1vb(calculateStartPadding(paddingValues, layoutDirection)) * density;
    var startPadding = roundToInt(this_1);
    var iconPadding = _Dp___get_value__impl__geb1vb(get_HorizontalIconPadding()) * density;
    if (leadingPlaceable == null)
      null;
    else {
      _this__u8e3s4.placeRelative$default_yv6dex_k$(leadingPlaceable, 0, Companion_getInstance_0().get_CenterVertically_dmkbbz_k$().align_k316px_k$(leadingPlaceable.get_height_e7t92o_k$(), height));
    }
    if (trailingPlaceable == null)
      null;
    else {
      _this__u8e3s4.placeRelative$default_yv6dex_k$(trailingPlaceable, width - trailingPlaceable.get_width_j0q4yl_k$() | 0, Companion_getInstance_0().get_CenterVertically_dmkbbz_k$().align_k316px_k$(trailingPlaceable.get_height_e7t92o_k$(), height));
    }
    if (labelPlaceable == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      var tmp;
      if (singleLine) {
        tmp = Companion_getInstance_0().get_CenterVertically_dmkbbz_k$().align_k316px_k$(labelPlaceable.get_height_e7t92o_k$(), height);
      } else {
        tmp = topPadding;
      }
      var startPositionY = tmp;
      var positionY = lerp_0(startPositionY, -(labelPlaceable.get_height_e7t92o_k$() / 2 | 0) | 0, animationProgress);
      // Inline function 'kotlin.math.roundToInt' call
      var tmp_0;
      if (leadingPlaceable == null) {
        tmp_0 = 0.0;
      } else {
        tmp_0 = (widthOrZero(leadingPlaceable) - iconPadding) * (1 - animationProgress);
      }
      var this_2 = tmp_0;
      var positionX = roundToInt(this_2) + startPadding | 0;
      _this__u8e3s4.placeRelative$default_yv6dex_k$(labelPlaceable, positionX, positionY);
    }
    if (prefixPlaceable == null)
      null;
    else {
      _this__u8e3s4.placeRelative$default_yv6dex_k$(prefixPlaceable, widthOrZero(leadingPlaceable), place$calculateVerticalPosition(singleLine, height, topPadding, labelPlaceable, prefixPlaceable));
    }
    if (suffixPlaceable == null)
      null;
    else {
      _this__u8e3s4.placeRelative$default_yv6dex_k$(suffixPlaceable, (width - widthOrZero(trailingPlaceable) | 0) - suffixPlaceable.get_width_j0q4yl_k$() | 0, place$calculateVerticalPosition(singleLine, height, topPadding, labelPlaceable, suffixPlaceable));
    }
    var textHorizontalPosition = widthOrZero(leadingPlaceable) + widthOrZero(prefixPlaceable) | 0;
    _this__u8e3s4.placeRelative$default_yv6dex_k$(textFieldPlaceable, textHorizontalPosition, place$calculateVerticalPosition(singleLine, height, topPadding, labelPlaceable, textFieldPlaceable));
    if (placeholderPlaceable == null)
      null;
    else {
      _this__u8e3s4.placeRelative$default_yv6dex_k$(placeholderPlaceable, textHorizontalPosition, place$calculateVerticalPosition(singleLine, height, topPadding, labelPlaceable, placeholderPlaceable));
    }
    if (supportingPlaceable == null)
      null;
    else {
      _this__u8e3s4.placeRelative$default_yv6dex_k$(supportingPlaceable, 0, height);
    }
  }
  function place$calculateVerticalPosition($singleLine, height, topPadding, $labelPlaceable, placeable) {
    // Inline function 'kotlin.math.max' call
    var tmp;
    if ($singleLine) {
      tmp = Companion_getInstance_0().get_CenterVertically_dmkbbz_k$().align_k316px_k$(placeable.get_height_e7t92o_k$(), height);
    } else {
      tmp = topPadding;
    }
    var a = tmp;
    var b = heightOrZero($labelPlaceable) / 2 | 0;
    return Math.max(a, b);
  }
  function outlineCutout$lambda($labelSize, $paddingValues) {
    return function ($this$drawWithContent) {
      var labelWidth = _Size___get_width__impl__58y75t($labelSize);
      var tmp;
      if (labelWidth > 0.0) {
        var innerPadding = $this$drawWithContent.toPx_mycba2_k$(get_OutlinedTextFieldInnerPadding());
        var leftLtr = $this$drawWithContent.toPx_mycba2_k$($paddingValues.calculateLeftPadding_trh5z9_k$($this$drawWithContent.get_layoutDirection_7e37v0_k$())) - innerPadding;
        var rightLtr = leftLtr + labelWidth + 2 * innerPadding;
        var left = $this$drawWithContent.get_layoutDirection_7e37v0_k$().get_ordinal_ip24qg_k$() === 1 ? _Size___get_width__impl__58y75t($this$drawWithContent.get_size_cxx1ym_k$()) - rightLtr : coerceAtLeast(leftLtr, 0.0);
        var right = $this$drawWithContent.get_layoutDirection_7e37v0_k$().get_ordinal_ip24qg_k$() === 1 ? _Size___get_width__impl__58y75t($this$drawWithContent.get_size_cxx1ym_k$()) - coerceAtLeast(leftLtr, 0.0) : rightLtr;
        var labelHeight = _Size___get_height__impl__a04p02($labelSize);
        // Inline function 'androidx.compose.ui.graphics.drawscope.clipRect' call
        var top = -labelHeight / 2;
        var bottom = labelHeight / 2;
        var clipOp = Companion_getInstance_6().get_Difference_lo2jbz_k$();
        // Inline function 'androidx.compose.ui.graphics.drawscope.withTransform' call
        // Inline function 'kotlin.with' call
        // Inline function 'kotlin.contracts.contract' call
        var $this$with = $this$drawWithContent.get_drawContext_ffwztu_k$();
        var previousSize = $this$with.get_size_cxx1ym_k$();
        $this$with.get_canvas_bshgm9_k$().save_fbe7h_k$();
        // Inline function 'androidx.compose.ui.graphics.drawscope.clipRect.<anonymous>' call
        $this$with.get_transform_px941v_k$().clipRect_3spswv_k$(left, top, right, bottom, clipOp);
        // Inline function 'androidx.compose.material3.outlineCutout.<anonymous>.<anonymous>' call
        $this$drawWithContent.drawContent_m0wwjp_k$();
        $this$with.get_canvas_bshgm9_k$().restore_a1ykhu_k$();
        $this$with.set_size_6a0e6q_k$(previousSize);
        tmp = Unit_getInstance();
      } else {
        $this$drawWithContent.drawContent_m0wwjp_k$();
        tmp = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function OutlinedTextFieldLayout$composable$lambda($modifier, $textField, $placeholder, $label, $leading, $trailing, $prefix, $suffix, $singleLine, $animationProgress, $onLabelMeasured, $container, $supporting, $paddingValues, $$changed, $$changed1) {
    return function ($composer, $force) {
      OutlinedTextFieldLayout$composable($modifier, $textField, $placeholder, $label, $leading, $trailing, $prefix, $suffix, $singleLine, $animationProgress, $onLabelMeasured, $container, $supporting, $paddingValues, $composer, updateChangedFlags($$changed | 1), updateChangedFlags($$changed1));
      return Unit_getInstance();
    };
  }
  var properties_initialized_OutlinedTextField_kt_gr7zs5;
  function _init_properties_OutlinedTextField_kt__36w0dj() {
    if (!properties_initialized_OutlinedTextField_kt_gr7zs5) {
      properties_initialized_OutlinedTextField_kt_gr7zs5 = true;
      // Inline function 'androidx.compose.ui.unit.dp' call
      OutlinedTextFieldInnerPadding = _Dp___init__impl__ms3zkb(4);
      // Inline function 'androidx.compose.ui.unit.dp' call
      OutlinedTextFieldTopPadding = _Dp___init__impl__ms3zkb(8);
    }
  }
  function get_LinearIndicatorWidth() {
    _init_properties_ProgressIndicator_kt__3rbzw0();
    return LinearIndicatorWidth;
  }
  var LinearIndicatorWidth;
  function get_LinearIndicatorHeight() {
    _init_properties_ProgressIndicator_kt__3rbzw0();
    return LinearIndicatorHeight;
  }
  var LinearIndicatorHeight;
  function get_CircularIndicatorDiameter() {
    _init_properties_ProgressIndicator_kt__3rbzw0();
    return CircularIndicatorDiameter;
  }
  var CircularIndicatorDiameter;
  function get_FirstLineHeadEasing() {
    _init_properties_ProgressIndicator_kt__3rbzw0();
    return FirstLineHeadEasing;
  }
  var FirstLineHeadEasing;
  function get_FirstLineTailEasing() {
    _init_properties_ProgressIndicator_kt__3rbzw0();
    return FirstLineTailEasing;
  }
  var FirstLineTailEasing;
  function get_SecondLineHeadEasing() {
    _init_properties_ProgressIndicator_kt__3rbzw0();
    return SecondLineHeadEasing;
  }
  var SecondLineHeadEasing;
  function get_SecondLineTailEasing() {
    _init_properties_ProgressIndicator_kt__3rbzw0();
    return SecondLineTailEasing;
  }
  var SecondLineTailEasing;
  function get_CircularEasing() {
    _init_properties_ProgressIndicator_kt__3rbzw0();
    return CircularEasing;
  }
  var CircularEasing;
  var properties_initialized_ProgressIndicator_kt_5iutny;
  function _init_properties_ProgressIndicator_kt__3rbzw0() {
    if (!properties_initialized_ProgressIndicator_kt_5iutny) {
      properties_initialized_ProgressIndicator_kt_5iutny = true;
      // Inline function 'androidx.compose.ui.unit.dp' call
      LinearIndicatorWidth = _Dp___init__impl__ms3zkb(240);
      LinearIndicatorHeight = LinearProgressIndicatorTokens_getInstance().get_TrackHeight_mo2hpi_k$();
      // Inline function 'androidx.compose.ui.unit.Dp.minus' call
      var this_0 = CircularProgressIndicatorTokens_getInstance().get_Size_nmi75z_k$();
      // Inline function 'androidx.compose.ui.unit.Dp.times' call
      var this_1 = CircularProgressIndicatorTokens_getInstance().get_ActiveIndicatorWidth_9j3j1_k$();
      var other = _Dp___init__impl__ms3zkb(_Dp___get_value__impl__geb1vb(this_1) * 2);
      CircularIndicatorDiameter = _Dp___init__impl__ms3zkb(_Dp___get_value__impl__geb1vb(this_0) - _Dp___get_value__impl__geb1vb(other));
      FirstLineHeadEasing = new CubicBezierEasing(0.2, 0.0, 0.8, 1.0);
      FirstLineTailEasing = new CubicBezierEasing(0.4, 0.0, 1.0, 1.0);
      SecondLineHeadEasing = new CubicBezierEasing(0.0, 0.0, 0.65, 1.0);
      SecondLineTailEasing = new CubicBezierEasing(0.1, 0.0, 0.45, 1.0);
      CircularEasing = new CubicBezierEasing(0.4, 0.0, 0.2, 1.0);
    }
  }
  function get_RadioButtonPadding() {
    _init_properties_RadioButton_kt__dpeme3();
    return RadioButtonPadding;
  }
  var RadioButtonPadding;
  function get_RadioButtonDotSize() {
    _init_properties_RadioButton_kt__dpeme3();
    return RadioButtonDotSize;
  }
  var RadioButtonDotSize;
  function get_RadioStrokeWidth() {
    _init_properties_RadioButton_kt__dpeme3();
    return RadioStrokeWidth;
  }
  var RadioStrokeWidth;
  var properties_initialized_RadioButton_kt_x3rbx;
  function _init_properties_RadioButton_kt__dpeme3() {
    if (!properties_initialized_RadioButton_kt_x3rbx) {
      properties_initialized_RadioButton_kt_x3rbx = true;
      // Inline function 'androidx.compose.ui.unit.dp' call
      RadioButtonPadding = _Dp___init__impl__ms3zkb(2);
      // Inline function 'androidx.compose.ui.unit.dp' call
      RadioButtonDotSize = _Dp___init__impl__ms3zkb(12);
      // Inline function 'androidx.compose.ui.unit.dp' call
      RadioStrokeWidth = _Dp___init__impl__ms3zkb(2);
    }
  }
  function get_LocalFabPlacement() {
    _init_properties_Scaffold_kt__o4wwkq();
    return LocalFabPlacement;
  }
  var LocalFabPlacement;
  function get_FabSpacing() {
    _init_properties_Scaffold_kt__o4wwkq();
    return FabSpacing;
  }
  var FabSpacing;
  function FabPlacement(left, width, height) {
    this.left_1 = left;
    this.width_1 = width;
    this.height_1 = height;
  }
  protoOf(FabPlacement).get_left_woprgw_k$ = function () {
    return this.left_1;
  };
  protoOf(FabPlacement).get_width_j0q4yl_k$ = function () {
    return this.width_1;
  };
  protoOf(FabPlacement).get_height_e7t92o_k$ = function () {
    return this.height_1;
  };
  function LocalFabPlacement$lambda() {
    _init_properties_Scaffold_kt__o4wwkq();
    return null;
  }
  var properties_initialized_Scaffold_kt_ayrd2w;
  function _init_properties_Scaffold_kt__o4wwkq() {
    if (!properties_initialized_Scaffold_kt_ayrd2w) {
      properties_initialized_Scaffold_kt_ayrd2w = true;
      LocalFabPlacement = staticCompositionLocalOf(LocalFabPlacement$lambda);
      // Inline function 'androidx.compose.ui.unit.dp' call
      FabSpacing = _Dp___init__impl__ms3zkb(16);
    }
  }
  function get_SearchBarCornerRadius() {
    _init_properties_SearchBar_kt__k9s8x3();
    return SearchBarCornerRadius;
  }
  var SearchBarCornerRadius;
  function get_DockedActiveTableMinHeight() {
    _init_properties_SearchBar_kt__k9s8x3();
    return DockedActiveTableMinHeight;
  }
  var DockedActiveTableMinHeight;
  function get_SearchBarMinWidth() {
    _init_properties_SearchBar_kt__k9s8x3();
    return SearchBarMinWidth;
  }
  var SearchBarMinWidth;
  function get_SearchBarMaxWidth() {
    _init_properties_SearchBar_kt__k9s8x3();
    return SearchBarMaxWidth;
  }
  var SearchBarMaxWidth;
  function get_SearchBarVerticalPadding() {
    _init_properties_SearchBar_kt__k9s8x3();
    return SearchBarVerticalPadding;
  }
  var SearchBarVerticalPadding;
  function get_SearchBarIconOffsetX() {
    _init_properties_SearchBar_kt__k9s8x3();
    return SearchBarIconOffsetX;
  }
  var SearchBarIconOffsetX;
  function get_AnimationEnterEasing() {
    _init_properties_SearchBar_kt__k9s8x3();
    return AnimationEnterEasing;
  }
  var AnimationEnterEasing;
  function get_AnimationExitEasing() {
    _init_properties_SearchBar_kt__k9s8x3();
    return AnimationExitEasing;
  }
  var AnimationExitEasing;
  function get_AnimationEnterFloatSpec() {
    _init_properties_SearchBar_kt__k9s8x3();
    return AnimationEnterFloatSpec;
  }
  var AnimationEnterFloatSpec;
  function get_AnimationExitFloatSpec() {
    _init_properties_SearchBar_kt__k9s8x3();
    return AnimationExitFloatSpec;
  }
  var AnimationExitFloatSpec;
  function get_AnimationEnterSizeSpec() {
    _init_properties_SearchBar_kt__k9s8x3();
    return AnimationEnterSizeSpec;
  }
  var AnimationEnterSizeSpec;
  function get_AnimationExitSizeSpec() {
    _init_properties_SearchBar_kt__k9s8x3();
    return AnimationExitSizeSpec;
  }
  var AnimationExitSizeSpec;
  function get_DockedEnterTransition() {
    _init_properties_SearchBar_kt__k9s8x3();
    return DockedEnterTransition;
  }
  var DockedEnterTransition;
  function get_DockedExitTransition() {
    _init_properties_SearchBar_kt__k9s8x3();
    return DockedExitTransition;
  }
  var DockedExitTransition;
  function get_$stableprop_1() {
    return 0;
  }
  function SearchBarDefaults() {
    SearchBarDefaults_instance = this;
    this.Elevation_1 = SearchBarTokens_getInstance().get_ContainerElevation_414o2_k$();
    this.InputFieldHeight_1 = SearchBarTokens_getInstance().get_ContainerHeight_9lch44_k$();
    this.$stable_1 = 0;
  }
  protoOf(SearchBarDefaults).get_Elevation_qqrwmp_k$ = function () {
    return this.Elevation_1;
  };
  protoOf(SearchBarDefaults).get_InputFieldHeight_2ehlpf_k$ = function () {
    return this.InputFieldHeight_1;
  };
  protoOf(SearchBarDefaults).get_inputFieldShape_s2icso_k$ = function () {
    illegalDecoyCallException('<get-inputFieldShape>');
  };
  protoOf(SearchBarDefaults).get_fullScreenShape_btq3qb_k$ = function () {
    illegalDecoyCallException('<get-fullScreenShape>');
  };
  protoOf(SearchBarDefaults).get_dockedShape_t43bui_k$ = function () {
    illegalDecoyCallException('<get-dockedShape>');
  };
  protoOf(SearchBarDefaults).get_windowInsets_ipw88h_k$ = function () {
    illegalDecoyCallException('<get-windowInsets>');
  };
  protoOf(SearchBarDefaults).colors_sbz689_k$ = function (containerColor, dividerColor, inputFieldColors) {
    illegalDecoyCallException('colors');
  };
  protoOf(SearchBarDefaults).inputFieldColors_i8jz1m_k$ = function (focusedTextColor, unfocusedTextColor, disabledTextColor, cursorColor, selectionColors, focusedLeadingIconColor, unfocusedLeadingIconColor, disabledLeadingIconColor, focusedTrailingIconColor, unfocusedTrailingIconColor, disabledTrailingIconColor, focusedPlaceholderColor, unfocusedPlaceholderColor, disabledPlaceholderColor) {
    illegalDecoyCallException('inputFieldColors');
  };
  protoOf(SearchBarDefaults).inputFieldColors_vfp8y8_k$ = function (textColor, disabledTextColor, cursorColor, selectionColors, focusedLeadingIconColor, unfocusedLeadingIconColor, disabledLeadingIconColor, focusedTrailingIconColor, unfocusedTrailingIconColor, disabledTrailingIconColor, placeholderColor, disabledPlaceholderColor) {
    illegalDecoyCallException('inputFieldColors');
  };
  protoOf(SearchBarDefaults).$get_inputFieldShape$$composable_8thudm_k$ = function ($composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(-1372032202);
    sourceInformation($composer_0, 'C($get-inputFieldShape$$composable)521@23689L9:SearchBar.kt#uh7d8r');
    if (isTraceInProgress()) {
      traceEventStart(-1372032202, $changed, -1, 'androidx.compose.material3.SearchBarDefaults.$get-inputFieldShape$$composable (SearchBar.kt:521)');
    }
    var tmp0 = toShape$composable(SearchBarTokens_getInstance().get_ContainerShape_ur17m1_k$(), $composer_0, 6);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0;
  };
  protoOf(SearchBarDefaults).$get_fullScreenShape$$composable_daolkx_k$ = function ($composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(-1782740021);
    sourceInformation($composer_0, 'C($get-fullScreenShape$$composable)525@23865L9:SearchBar.kt#uh7d8r');
    if (isTraceInProgress()) {
      traceEventStart(-1782740021, $changed, -1, 'androidx.compose.material3.SearchBarDefaults.$get-fullScreenShape$$composable (SearchBar.kt:525)');
    }
    var tmp0 = toShape$composable(SearchViewTokens_getInstance().get_FullScreenContainerShape_bamnjw_k$(), $composer_0, 6);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0;
  };
  protoOf(SearchBarDefaults).$get_dockedShape$$composable_zfi8c8_k$ = function ($composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(2031855540);
    sourceInformation($composer_0, 'C($get-dockedShape$$composable)528@24011L9:SearchBar.kt#uh7d8r');
    if (isTraceInProgress()) {
      traceEventStart(2031855540, $changed, -1, 'androidx.compose.material3.SearchBarDefaults.$get-dockedShape$$composable (SearchBar.kt:528)');
    }
    var tmp0 = toShape$composable(SearchViewTokens_getInstance().get_DockedContainerShape_f2issl_k$(), $composer_0, 6);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0;
  };
  protoOf(SearchBarDefaults).$get_windowInsets$$composable_2hlmmt_k$ = function ($composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(2028672630);
    sourceInformation($composer_0, 'C($get-windowInsets$$composable):SearchBar.kt#uh7d8r');
    if (isTraceInProgress()) {
      traceEventStart(2028672630, $changed, -1, 'androidx.compose.material3.SearchBarDefaults.$get-windowInsets$$composable (SearchBar.kt:531)');
    }
    var tmp0 = get_statusBars(Companion_getInstance_7());
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0;
  };
  protoOf(SearchBarDefaults).colors$composable_ux941u_k$ = function (containerColor, dividerColor, inputFieldColors, $composer, $changed, $default) {
    var containerColor_0 = containerColor;
    var dividerColor_0 = dividerColor;
    var inputFieldColors_0 = inputFieldColors;
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(649871209);
    sourceInformation($composer_0, 'C(colors$composable)P(0:c#ui.graphics.Color,1:c#ui.graphics.Color)543@24631L9,544@24702L9,545@24757L18:SearchBar.kt#uh7d8r');
    if (!(($default & 1) === 0))
      containerColor_0 = toColor$composable(SearchBarTokens_getInstance().get_ContainerColor_uid763_k$(), $composer_0, 6);
    if (!(($default & 2) === 0))
      dividerColor_0 = toColor$composable(SearchViewTokens_getInstance().get_DividerColor_d6g0r1_k$(), $composer_0, 6);
    if (!(($default & 4) === 0)) {
      var tmp = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
      var tmp_0 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
      var tmp_1 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
      var tmp_2 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
      var tmp_3 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
      var tmp_4 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
      var tmp_5 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
      var tmp_6 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
      var tmp_7 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
      var tmp_8 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
      var tmp_9 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
      var tmp_10 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
      inputFieldColors_0 = this.inputFieldColors$composable_m3e0mb_k$(tmp, tmp_0, tmp_1, tmp_2, null, tmp_3, tmp_4, tmp_5, tmp_6, tmp_7, tmp_8, tmp_9, tmp_10, _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0))), $composer_0, 0, 0, 16383);
    }
    if (isTraceInProgress()) {
      traceEventStart(649871209, $changed, -1, 'androidx.compose.material3.SearchBarDefaults.colors$composable (SearchBar.kt:542)');
    }
    var tmp0 = new SearchBarColors(containerColor_0, dividerColor_0, inputFieldColors_0);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0;
  };
  protoOf(SearchBarDefaults).inputFieldColors$composable_m3e0mb_k$ = function (focusedTextColor, unfocusedTextColor, disabledTextColor, cursorColor, selectionColors, focusedLeadingIconColor, unfocusedLeadingIconColor, disabledLeadingIconColor, focusedTrailingIconColor, unfocusedTrailingIconColor, disabledTrailingIconColor, focusedPlaceholderColor, unfocusedPlaceholderColor, disabledPlaceholderColor, $composer, $changed, $changed1, $default) {
    var focusedTextColor_0 = focusedTextColor;
    var unfocusedTextColor_0 = unfocusedTextColor;
    var disabledTextColor_0 = disabledTextColor;
    var cursorColor_0 = cursorColor;
    var selectionColors_0 = selectionColors;
    var focusedLeadingIconColor_0 = focusedLeadingIconColor;
    var unfocusedLeadingIconColor_0 = unfocusedLeadingIconColor;
    var disabledLeadingIconColor_0 = disabledLeadingIconColor;
    var focusedTrailingIconColor_0 = focusedTrailingIconColor;
    var unfocusedTrailingIconColor_0 = unfocusedTrailingIconColor;
    var disabledTrailingIconColor_0 = disabledTrailingIconColor;
    var focusedPlaceholderColor_0 = focusedPlaceholderColor;
    var unfocusedPlaceholderColor_0 = unfocusedPlaceholderColor;
    var disabledPlaceholderColor_0 = disabledPlaceholderColor;
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(1839070386);
    sourceInformation($composer_0, 'C(inputFieldColors$composable)P(7:c#ui.graphics.Color,12:c#ui.graphics.Color,3:c#ui.graphics.Color,0:c#ui.graphics.Color,9,5:c#ui.graphics.Color,10:c#ui.graphics.Color,1:c#ui.graphics.Color,8:c#ui.graphics.Color,13:c#ui.graphics.Color,4:c#ui.graphics.Color,6:c#ui.graphics.Color,11:c#ui.graphics.Color,2:c#ui.graphics.Color)578@26724L9,579@26802L9,580@26889L9,582@27032L9,583@27115L7,584@27198L9,585@27285L9,587@27398L9,588@27548L9,589@27637L9,591@27752L9,592@27904L9,593@27994L9,594@28088L9,597@28220L847:SearchBar.kt#uh7d8r');
    if (!(($default & 1) === 0))
      focusedTextColor_0 = toColor$composable(SearchBarTokens_getInstance().get_InputTextColor_m3lwej_k$(), $composer_0, 6);
    if (!(($default & 2) === 0))
      unfocusedTextColor_0 = toColor$composable(SearchBarTokens_getInstance().get_InputTextColor_m3lwej_k$(), $composer_0, 6);
    if (!(($default & 4) === 0))
      disabledTextColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(FilledTextFieldTokens_getInstance().get_DisabledInputColor_84w2ke_k$(), $composer_0, 6), FilledTextFieldTokens_getInstance().get_DisabledInputOpacity_vi261m_k$());
    if (!(($default & 8) === 0))
      cursorColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_CaretColor_hxe08n_k$(), $composer_0, 6);
    if (!(($default & 16) === 0)) {
      // Inline function 'androidx.compose.runtime.CompositionLocal.$get-current$$composable' call
      var this_0 = get_LocalTextSelectionColors();
      var $composer_1 = $composer_0;
      sourceInformationMarkerStart($composer_1, 858843746, 'CC($get-current$$composable):CompositionLocal.kt#9igjgp');
      var tmp0 = $composer_1.consume_ebzcrh_k$(this_0);
      sourceInformationMarkerEnd($composer_1);
      selectionColors_0 = tmp0;
    }
    if (!(($default & 32) === 0))
      focusedLeadingIconColor_0 = toColor$composable(SearchBarTokens_getInstance().get_LeadingIconColor_4sfzzh_k$(), $composer_0, 6);
    if (!(($default & 64) === 0))
      unfocusedLeadingIconColor_0 = toColor$composable(SearchBarTokens_getInstance().get_LeadingIconColor_4sfzzh_k$(), $composer_0, 6);
    if (!(($default & 128) === 0))
      disabledLeadingIconColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(FilledTextFieldTokens_getInstance().get_DisabledLeadingIconColor_dtgxah_k$(), $composer_0, 6), FilledTextFieldTokens_getInstance().get_DisabledLeadingIconOpacity_va1u41_k$());
    if (!(($default & 256) === 0))
      focusedTrailingIconColor_0 = toColor$composable(SearchBarTokens_getInstance().get_TrailingIconColor_qrzqp1_k$(), $composer_0, 6);
    if (!(($default & 512) === 0))
      unfocusedTrailingIconColor_0 = toColor$composable(SearchBarTokens_getInstance().get_TrailingIconColor_qrzqp1_k$(), $composer_0, 6);
    if (!(($default & 1024) === 0))
      disabledTrailingIconColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(FilledTextFieldTokens_getInstance().get_DisabledTrailingIconColor_mjc79l_k$(), $composer_0, 6), FilledTextFieldTokens_getInstance().get_DisabledTrailingIconOpacity_s6onap_k$());
    if (!(($default & 2048) === 0))
      focusedPlaceholderColor_0 = toColor$composable(SearchBarTokens_getInstance().get_SupportingTextColor_ogcu2i_k$(), $composer_0, 6);
    if (!(($default & 4096) === 0))
      unfocusedPlaceholderColor_0 = toColor$composable(SearchBarTokens_getInstance().get_SupportingTextColor_ogcu2i_k$(), $composer_0, 6);
    if (!(($default & 8192) === 0))
      disabledPlaceholderColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(FilledTextFieldTokens_getInstance().get_DisabledInputColor_84w2ke_k$(), $composer_0, 6), FilledTextFieldTokens_getInstance().get_DisabledInputOpacity_vi261m_k$());
    if (isTraceInProgress()) {
      traceEventStart(1839070386, $changed, $changed1, 'androidx.compose.material3.SearchBarDefaults.inputFieldColors$composable (SearchBar.kt:577)');
    }
    var tmp = TextFieldDefaults_getInstance();
    var tmp_0 = focusedTextColor_0;
    var tmp_1 = unfocusedTextColor_0;
    var tmp_2 = disabledTextColor_0;
    var tmp_3 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
    var tmp_4 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
    var tmp_5 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
    var tmp_6 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
    var tmp_7 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
    var tmp_8 = cursorColor_0;
    var tmp_9 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
    var tmp_10 = selectionColors_0;
    var tmp_11 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
    var tmp_12 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
    var tmp_13 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
    var tmp_14 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
    var tmp_15 = focusedLeadingIconColor_0;
    var tmp_16 = unfocusedLeadingIconColor_0;
    var tmp_17 = disabledLeadingIconColor_0;
    var tmp_18 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
    var tmp_19 = focusedTrailingIconColor_0;
    var tmp_20 = unfocusedTrailingIconColor_0;
    var tmp_21 = disabledTrailingIconColor_0;
    var tmp_22 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
    var tmp_23 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
    var tmp_24 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
    var tmp_25 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
    var tmp_26 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
    var tmp_27 = focusedPlaceholderColor_0;
    var tmp_28 = unfocusedPlaceholderColor_0;
    var tmp_29 = disabledPlaceholderColor_0;
    var tmp_30 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
    var tmp_31 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
    var tmp_32 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
    var tmp_33 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
    var tmp_34 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
    var tmp_35 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
    var tmp_36 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
    var tmp_37 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
    var tmp_38 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
    var tmp_39 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
    var tmp_40 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
    var tmp_41 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
    var tmp0_0 = tmp.colors$composable_uqty46_k$(tmp_0, tmp_1, tmp_2, tmp_3, tmp_4, tmp_5, tmp_6, tmp_7, tmp_8, tmp_9, tmp_10, tmp_11, tmp_12, tmp_13, tmp_14, tmp_15, tmp_16, tmp_17, tmp_18, tmp_19, tmp_20, tmp_21, tmp_22, tmp_23, tmp_24, tmp_25, tmp_26, tmp_27, tmp_28, tmp_29, tmp_30, tmp_31, tmp_32, tmp_33, tmp_34, tmp_35, tmp_36, tmp_37, tmp_38, tmp_39, tmp_40, tmp_41, _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0))), $composer_0, 14 & $changed | 112 & $changed | 896 & $changed | 234881024 & $changed << 15, 14 & $changed >> 12 | 458752 & $changed | 3670016 & $changed | 29360128 & $changed | 1879048192 & $changed << 3, 14 & $changed >> 27 | 112 & $changed1 << 3 | 29360128 & $changed1 << 18 | 234881024 & $changed1 << 18 | 1879048192 & $changed1 << 18, 0, 3072, 1204058872, 4095);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0_0;
  };
  protoOf(SearchBarDefaults).inputFieldColors$composable_b2psqr_k$ = function (textColor, disabledTextColor, cursorColor, selectionColors, focusedLeadingIconColor, unfocusedLeadingIconColor, disabledLeadingIconColor, focusedTrailingIconColor, unfocusedTrailingIconColor, disabledTrailingIconColor, placeholderColor, disabledPlaceholderColor, $composer, $changed, $changed1, $default) {
    var textColor_0 = textColor;
    var disabledTextColor_0 = disabledTextColor;
    var cursorColor_0 = cursorColor;
    var selectionColors_0 = selectionColors;
    var focusedLeadingIconColor_0 = focusedLeadingIconColor;
    var unfocusedLeadingIconColor_0 = unfocusedLeadingIconColor;
    var disabledLeadingIconColor_0 = disabledLeadingIconColor;
    var focusedTrailingIconColor_0 = focusedTrailingIconColor;
    var unfocusedTrailingIconColor_0 = unfocusedTrailingIconColor;
    var disabledTrailingIconColor_0 = disabledTrailingIconColor;
    var placeholderColor_0 = placeholderColor;
    var disabledPlaceholderColor_0 = disabledPlaceholderColor;
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(1390477146);
    sourceInformation($composer_0, 'C(inputFieldColors$composable)P(9:c#ui.graphics.Color,3:c#ui.graphics.Color,0:c#ui.graphics.Color,8,5:c#ui.graphics.Color,10:c#ui.graphics.Color,1:c#ui.graphics.Color,6:c#ui.graphics.Color,11:c#ui.graphics.Color,4:c#ui.graphics.Color,7:c#ui.graphics.Color,2:c#ui.graphics.Color)617@29257L9,618@29344L9,620@29487L9,621@29570L7,622@29653L9,623@29740L9,625@29853L9,626@30003L9,627@30092L9,629@30207L9,630@30352L9,631@30446L9,633@30535L765:SearchBar.kt#uh7d8r');
    if (!(($default & 1) === 0))
      textColor_0 = toColor$composable(SearchBarTokens_getInstance().get_InputTextColor_m3lwej_k$(), $composer_0, 6);
    if (!(($default & 2) === 0))
      disabledTextColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(FilledTextFieldTokens_getInstance().get_DisabledInputColor_84w2ke_k$(), $composer_0, 6), FilledTextFieldTokens_getInstance().get_DisabledInputOpacity_vi261m_k$());
    if (!(($default & 4) === 0))
      cursorColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_CaretColor_hxe08n_k$(), $composer_0, 6);
    if (!(($default & 8) === 0)) {
      // Inline function 'androidx.compose.runtime.CompositionLocal.$get-current$$composable' call
      var this_0 = get_LocalTextSelectionColors();
      var $composer_1 = $composer_0;
      sourceInformationMarkerStart($composer_1, 858843746, 'CC($get-current$$composable):CompositionLocal.kt#9igjgp');
      var tmp0 = $composer_1.consume_ebzcrh_k$(this_0);
      sourceInformationMarkerEnd($composer_1);
      selectionColors_0 = tmp0;
    }
    if (!(($default & 16) === 0))
      focusedLeadingIconColor_0 = toColor$composable(SearchBarTokens_getInstance().get_LeadingIconColor_4sfzzh_k$(), $composer_0, 6);
    if (!(($default & 32) === 0))
      unfocusedLeadingIconColor_0 = toColor$composable(SearchBarTokens_getInstance().get_LeadingIconColor_4sfzzh_k$(), $composer_0, 6);
    if (!(($default & 64) === 0))
      disabledLeadingIconColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(FilledTextFieldTokens_getInstance().get_DisabledLeadingIconColor_dtgxah_k$(), $composer_0, 6), FilledTextFieldTokens_getInstance().get_DisabledLeadingIconOpacity_va1u41_k$());
    if (!(($default & 128) === 0))
      focusedTrailingIconColor_0 = toColor$composable(SearchBarTokens_getInstance().get_TrailingIconColor_qrzqp1_k$(), $composer_0, 6);
    if (!(($default & 256) === 0))
      unfocusedTrailingIconColor_0 = toColor$composable(SearchBarTokens_getInstance().get_TrailingIconColor_qrzqp1_k$(), $composer_0, 6);
    if (!(($default & 512) === 0))
      disabledTrailingIconColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(FilledTextFieldTokens_getInstance().get_DisabledTrailingIconColor_mjc79l_k$(), $composer_0, 6), FilledTextFieldTokens_getInstance().get_DisabledTrailingIconOpacity_s6onap_k$());
    if (!(($default & 1024) === 0))
      placeholderColor_0 = toColor$composable(SearchBarTokens_getInstance().get_SupportingTextColor_ogcu2i_k$(), $composer_0, 6);
    if (!(($default & 2048) === 0))
      disabledPlaceholderColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(FilledTextFieldTokens_getInstance().get_DisabledInputColor_84w2ke_k$(), $composer_0, 6), FilledTextFieldTokens_getInstance().get_DisabledInputOpacity_vi261m_k$());
    if (isTraceInProgress()) {
      traceEventStart(1390477146, $changed, $changed1, 'androidx.compose.material3.SearchBarDefaults.inputFieldColors$composable (SearchBar.kt:616)');
    }
    var tmp0_0 = this.inputFieldColors$composable_m3e0mb_k$(textColor_0, textColor_0, disabledTextColor_0, cursorColor_0, selectionColors_0, focusedLeadingIconColor_0, unfocusedLeadingIconColor_0, disabledLeadingIconColor_0, focusedTrailingIconColor_0, unfocusedTrailingIconColor_0, disabledTrailingIconColor_0, placeholderColor_0, placeholderColor_0, disabledPlaceholderColor_0, $composer_0, 14 & $changed | 112 & $changed << 3 | 896 & $changed << 3 | 7168 & $changed << 3 | 57344 & $changed << 3 | 458752 & $changed << 3 | 3670016 & $changed << 3 | 29360128 & $changed << 3 | 234881024 & $changed << 3 | 1879048192 & $changed << 3, 14 & $changed >> 27 | 112 & $changed1 << 3 | 896 & $changed1 << 6 | 7168 & $changed1 << 6 | 57344 & $changed1 << 6, 0);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0_0;
  };
  var SearchBarDefaults_instance;
  function SearchBarDefaults_getInstance() {
    if (SearchBarDefaults_instance == null)
      new SearchBarDefaults();
    return SearchBarDefaults_instance;
  }
  function get_AnimationEnterDurationMillis() {
    return AnimationEnterDurationMillis;
  }
  var AnimationEnterDurationMillis;
  function get_AnimationDelayMillis() {
    return AnimationDelayMillis;
  }
  var AnimationDelayMillis;
  function get_AnimationExitDurationMillis() {
    return AnimationExitDurationMillis;
  }
  var AnimationExitDurationMillis;
  function get_$stableprop_2() {
    return 0;
  }
  function SearchBarColors(containerColor, dividerColor, inputFieldColors) {
    this.containerColor_1 = containerColor;
    this.dividerColor_1 = dividerColor;
    this.inputFieldColors_1 = inputFieldColors;
    this.$stable_1 = 0;
  }
  protoOf(SearchBarColors).get_containerColor_qwz2lq_k$ = function () {
    return this.containerColor_1;
  };
  protoOf(SearchBarColors).get_dividerColor_b8tgee_k$ = function () {
    return this.dividerColor_1;
  };
  protoOf(SearchBarColors).get_inputFieldColors_abrzc9_k$ = function () {
    return this.inputFieldColors_1;
  };
  protoOf(SearchBarColors).equals = function (other) {
    if (this === other)
      return true;
    if (other == null ? true : !getKClassFromExpression(this).equals(getKClassFromExpression(other)))
      return false;
    if (!(other instanceof SearchBarColors))
      THROW_CCE();
    if (!equals(this.containerColor_1, other.containerColor_1))
      return false;
    if (!equals(this.dividerColor_1, other.dividerColor_1))
      return false;
    if (!this.inputFieldColors_1.equals(other.inputFieldColors_1))
      return false;
    return true;
  };
  protoOf(SearchBarColors).hashCode = function () {
    var result = Color__hashCode_impl_vjyivj(this.containerColor_1);
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.dividerColor_1) | 0;
    result = imul(31, result) + this.inputFieldColors_1.hashCode() | 0;
    return result;
  };
  var properties_initialized_SearchBar_kt_r8xo9x;
  function _init_properties_SearchBar_kt__k9s8x3() {
    if (!properties_initialized_SearchBar_kt_r8xo9x) {
      properties_initialized_SearchBar_kt_r8xo9x = true;
      // Inline function 'androidx.compose.ui.unit.Dp.div' call
      var this_0 = SearchBarDefaults_getInstance().InputFieldHeight_1;
      SearchBarCornerRadius = _Dp___init__impl__ms3zkb(_Dp___get_value__impl__geb1vb(this_0) / 2);
      // Inline function 'androidx.compose.ui.unit.dp' call
      DockedActiveTableMinHeight = _Dp___init__impl__ms3zkb(240);
      // Inline function 'androidx.compose.ui.unit.dp' call
      SearchBarMinWidth = _Dp___init__impl__ms3zkb(360);
      // Inline function 'androidx.compose.ui.unit.dp' call
      SearchBarMaxWidth = _Dp___init__impl__ms3zkb(720);
      // Inline function 'androidx.compose.ui.unit.dp' call
      SearchBarVerticalPadding = _Dp___init__impl__ms3zkb(8);
      // Inline function 'androidx.compose.ui.unit.dp' call
      SearchBarIconOffsetX = _Dp___init__impl__ms3zkb(4);
      AnimationEnterEasing = MotionTokens_getInstance().get_EasingEmphasizedDecelerateCubicBezier_sygdvt_k$();
      AnimationExitEasing = new CubicBezierEasing(0.0, 1.0, 0.0, 1.0);
      AnimationEnterFloatSpec = tween(600, 100, get_AnimationEnterEasing());
      AnimationExitFloatSpec = tween(350, 100, get_AnimationExitEasing());
      AnimationEnterSizeSpec = tween(600, 100, get_AnimationEnterEasing());
      AnimationExitSizeSpec = tween(350, 100, get_AnimationExitEasing());
      DockedEnterTransition = fadeIn(get_AnimationEnterFloatSpec()).plus_w36lq9_k$(expandVertically(get_AnimationEnterSizeSpec()));
      DockedExitTransition = fadeOut(get_AnimationExitFloatSpec()).plus_buzi7t_k$(shrinkVertically(get_AnimationExitSizeSpec()));
    }
  }
  function get_LocalShapes() {
    _init_properties_Shapes_kt__48nj2q();
    return LocalShapes;
  }
  var LocalShapes;
  function toShape$composable(_this__u8e3s4, $composer, $changed) {
    _init_properties_Shapes_kt__48nj2q();
    var $composer_0 = $composer;
    sourceInformationMarkerStart($composer_0, 122218565, 'C(toShape$composable)189@7718L6:Shapes.kt#uh7d8r');
    if (isTraceInProgress()) {
      traceEventStart(122218565, $changed, -1, 'androidx.compose.material3.toShape$composable (Shapes.kt:188)');
    }
    var tmp0 = fromToken_0(MaterialTheme_getInstance().$get_shapes$$composable_gkckn5_k$($composer_0, 6), _this__u8e3s4);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    sourceInformationMarkerEnd($composer_0);
    return tmp0;
  }
  function get_$stableprop_3() {
    return 0;
  }
  function Shapes(extraSmall, small, medium, large, extraLarge) {
    extraSmall = extraSmall === VOID ? ShapeDefaults_getInstance().ExtraSmall_1 : extraSmall;
    small = small === VOID ? ShapeDefaults_getInstance().Small_1 : small;
    medium = medium === VOID ? ShapeDefaults_getInstance().Medium_1 : medium;
    large = large === VOID ? ShapeDefaults_getInstance().Large_1 : large;
    extraLarge = extraLarge === VOID ? ShapeDefaults_getInstance().ExtraLarge_1 : extraLarge;
    this.extraSmall_1 = extraSmall;
    this.small_1 = small;
    this.medium_1 = medium;
    this.large_1 = large;
    this.extraLarge_1 = extraLarge;
    this.$stable_1 = 0;
  }
  protoOf(Shapes).get_extraSmall_7zpwo0_k$ = function () {
    return this.extraSmall_1;
  };
  protoOf(Shapes).get_small_iylg4e_k$ = function () {
    return this.small_1;
  };
  protoOf(Shapes).get_medium_gky7we_k$ = function () {
    return this.medium_1;
  };
  protoOf(Shapes).get_large_iujklu_k$ = function () {
    return this.large_1;
  };
  protoOf(Shapes).get_extraLarge_83rs6k_k$ = function () {
    return this.extraLarge_1;
  };
  protoOf(Shapes).copy_3fs9y3_k$ = function (extraSmall, small, medium, large, extraLarge) {
    return new Shapes(extraSmall, small, medium, large, extraLarge);
  };
  protoOf(Shapes).copy$default_w51fnq_k$ = function (extraSmall, small, medium, large, extraLarge, $super) {
    extraSmall = extraSmall === VOID ? this.extraSmall_1 : extraSmall;
    small = small === VOID ? this.small_1 : small;
    medium = medium === VOID ? this.medium_1 : medium;
    large = large === VOID ? this.large_1 : large;
    extraLarge = extraLarge === VOID ? this.extraLarge_1 : extraLarge;
    return $super === VOID ? this.copy_3fs9y3_k$(extraSmall, small, medium, large, extraLarge) : $super.copy_3fs9y3_k$.call(this, extraSmall, small, medium, large, extraLarge);
  };
  protoOf(Shapes).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Shapes))
      return false;
    if (!equals(this.extraSmall_1, other.extraSmall_1))
      return false;
    if (!equals(this.small_1, other.small_1))
      return false;
    if (!equals(this.medium_1, other.medium_1))
      return false;
    if (!equals(this.large_1, other.large_1))
      return false;
    if (!equals(this.extraLarge_1, other.extraLarge_1))
      return false;
    return true;
  };
  protoOf(Shapes).hashCode = function () {
    var result = hashCode(this.extraSmall_1);
    result = imul(31, result) + hashCode(this.small_1) | 0;
    result = imul(31, result) + hashCode(this.medium_1) | 0;
    result = imul(31, result) + hashCode(this.large_1) | 0;
    result = imul(31, result) + hashCode(this.extraLarge_1) | 0;
    return result;
  };
  protoOf(Shapes).toString = function () {
    return 'Shapes(' + ('extraSmall=' + this.extraSmall_1 + ', ') + ('small=' + this.small_1 + ', ') + ('medium=' + this.medium_1 + ', ') + ('large=' + this.large_1 + ', ') + ('extraLarge=' + this.extraLarge_1 + ')');
  };
  function fromToken_0(_this__u8e3s4, value) {
    _init_properties_Shapes_kt__48nj2q();
    var tmp;
    switch (value.get_ordinal_ip24qg_k$()) {
      case 0:
        tmp = _this__u8e3s4.extraLarge_1;
        break;
      case 1:
        tmp = top(_this__u8e3s4.extraLarge_1);
        break;
      case 2:
        tmp = _this__u8e3s4.extraSmall_1;
        break;
      case 3:
        tmp = top(_this__u8e3s4.extraSmall_1);
        break;
      case 4:
        tmp = get_CircleShape();
        break;
      case 5:
        tmp = _this__u8e3s4.large_1;
        break;
      case 6:
        tmp = end(_this__u8e3s4.large_1);
        break;
      case 7:
        tmp = top(_this__u8e3s4.large_1);
        break;
      case 8:
        tmp = _this__u8e3s4.medium_1;
        break;
      case 9:
        tmp = get_RectangleShape();
        break;
      case 10:
        tmp = _this__u8e3s4.small_1;
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  }
  function get_$stableprop_4() {
    return 0;
  }
  function ShapeDefaults() {
    ShapeDefaults_instance = this;
    this.ExtraSmall_1 = ShapeTokens_getInstance().get_CornerExtraSmall_r1y31x_k$();
    this.Small_1 = ShapeTokens_getInstance().get_CornerSmall_s291yh_k$();
    this.Medium_1 = ShapeTokens_getInstance().get_CornerMedium_eltswj_k$();
    this.Large_1 = ShapeTokens_getInstance().get_CornerLarge_ry76fx_k$();
    this.ExtraLarge_1 = ShapeTokens_getInstance().get_CornerExtraLarge_qxw7jd_k$();
    this.$stable_1 = 0;
  }
  protoOf(ShapeDefaults).get_ExtraSmall_oz4yo0_k$ = function () {
    return this.ExtraSmall_1;
  };
  protoOf(ShapeDefaults).get_Small_ih014u_k$ = function () {
    return this.Small_1;
  };
  protoOf(ShapeDefaults).get_Medium_1fiba6_k$ = function () {
    return this.Medium_1;
  };
  protoOf(ShapeDefaults).get_Large_icy5ma_k$ = function () {
    return this.Large_1;
  };
  protoOf(ShapeDefaults).get_ExtraLarge_ov335g_k$ = function () {
    return this.ExtraLarge_1;
  };
  var ShapeDefaults_instance;
  function ShapeDefaults_getInstance() {
    if (ShapeDefaults_instance == null)
      new ShapeDefaults();
    return ShapeDefaults_instance;
  }
  function top(_this__u8e3s4) {
    _init_properties_Shapes_kt__48nj2q();
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp$ret$0 = _Dp___init__impl__ms3zkb(0.0);
    var tmp0_bottomStart = CornerSize(tmp$ret$0);
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp$ret$1 = _Dp___init__impl__ms3zkb(0.0);
    var tmp1_bottomEnd = CornerSize(tmp$ret$1);
    return _this__u8e3s4.copy$default_s4pzap_k$(VOID, VOID, tmp1_bottomEnd, tmp0_bottomStart);
  }
  function end(_this__u8e3s4) {
    _init_properties_Shapes_kt__48nj2q();
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp$ret$0 = _Dp___init__impl__ms3zkb(0.0);
    var tmp = CornerSize(tmp$ret$0);
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp$ret$1 = _Dp___init__impl__ms3zkb(0.0);
    return _this__u8e3s4.copy$default_s4pzap_k$(tmp, VOID, VOID, CornerSize(tmp$ret$1));
  }
  function LocalShapes$lambda() {
    _init_properties_Shapes_kt__48nj2q();
    return new Shapes();
  }
  var properties_initialized_Shapes_kt_91wqbw;
  function _init_properties_Shapes_kt__48nj2q() {
    if (!properties_initialized_Shapes_kt_91wqbw) {
      properties_initialized_Shapes_kt_91wqbw = true;
      LocalShapes = staticCompositionLocalOf(LocalShapes$lambda);
    }
  }
  function get_DragHandleVerticalPadding() {
    _init_properties_SheetDefaults_kt__jcfowv();
    return DragHandleVerticalPadding;
  }
  var DragHandleVerticalPadding;
  function get_BottomSheetMaxWidth() {
    _init_properties_SheetDefaults_kt__jcfowv();
    return BottomSheetMaxWidth;
  }
  var BottomSheetMaxWidth;
  var properties_initialized_SheetDefaults_kt_xzf6ap;
  function _init_properties_SheetDefaults_kt__jcfowv() {
    if (!properties_initialized_SheetDefaults_kt_xzf6ap) {
      properties_initialized_SheetDefaults_kt_xzf6ap = true;
      // Inline function 'androidx.compose.ui.unit.dp' call
      DragHandleVerticalPadding = _Dp___init__impl__ms3zkb(22);
      // Inline function 'androidx.compose.ui.unit.dp' call
      BottomSheetMaxWidth = _Dp___init__impl__ms3zkb(640);
    }
  }
  function get_ThumbWidth() {
    _init_properties_Slider_kt__a50341();
    return ThumbWidth;
  }
  var ThumbWidth;
  function get_ThumbHeight() {
    _init_properties_Slider_kt__a50341();
    return ThumbHeight;
  }
  var ThumbHeight;
  function get_ThumbSize() {
    _init_properties_Slider_kt__a50341();
    return ThumbSize;
  }
  var ThumbSize;
  function get_ThumbDefaultElevation() {
    _init_properties_Slider_kt__a50341();
    return ThumbDefaultElevation;
  }
  var ThumbDefaultElevation;
  function get_ThumbPressedElevation() {
    _init_properties_Slider_kt__a50341();
    return ThumbPressedElevation;
  }
  var ThumbPressedElevation;
  function get_TickSize() {
    _init_properties_Slider_kt__a50341();
    return TickSize;
  }
  var TickSize;
  function get_TrackHeight() {
    _init_properties_Slider_kt__a50341();
    return TrackHeight;
  }
  var TrackHeight;
  function get_SliderHeight() {
    _init_properties_Slider_kt__a50341();
    return SliderHeight;
  }
  var SliderHeight;
  function get_SliderMinWidth() {
    _init_properties_Slider_kt__a50341();
    return SliderMinWidth;
  }
  var SliderMinWidth;
  function get_DefaultSliderConstraints() {
    _init_properties_Slider_kt__a50341();
    return DefaultSliderConstraints;
  }
  var DefaultSliderConstraints;
  function get_SliderToTickAnimation() {
    _init_properties_Slider_kt__a50341();
    return SliderToTickAnimation;
  }
  var SliderToTickAnimation;
  var properties_initialized_Slider_kt_mzompp;
  function _init_properties_Slider_kt__a50341() {
    if (!properties_initialized_Slider_kt_mzompp) {
      properties_initialized_Slider_kt_mzompp = true;
      ThumbWidth = SliderTokens_getInstance().get_HandleWidth_47nfbm_k$();
      ThumbHeight = SliderTokens_getInstance().get_HandleHeight_aokvkb_k$();
      ThumbSize = DpSize(get_ThumbWidth(), get_ThumbHeight());
      // Inline function 'androidx.compose.ui.unit.dp' call
      ThumbDefaultElevation = _Dp___init__impl__ms3zkb(1);
      // Inline function 'androidx.compose.ui.unit.dp' call
      ThumbPressedElevation = _Dp___init__impl__ms3zkb(6);
      TickSize = SliderTokens_getInstance().get_TickMarksContainerSize_za1egv_k$();
      TrackHeight = SliderTokens_getInstance().get_InactiveTrackHeight_c1dghn_k$();
      // Inline function 'androidx.compose.ui.unit.dp' call
      SliderHeight = _Dp___init__impl__ms3zkb(48);
      // Inline function 'androidx.compose.ui.unit.dp' call
      SliderMinWidth = _Dp___init__impl__ms3zkb(144);
      DefaultSliderConstraints = heightIn(widthIn(Companion_getInstance_1(), get_SliderMinWidth()), VOID, get_SliderHeight());
      SliderToTickAnimation = new TweenSpec(100);
    }
  }
  function get_ContainerMaxWidth() {
    _init_properties_Snackbar_kt__sxelwb();
    return ContainerMaxWidth;
  }
  var ContainerMaxWidth;
  function get_HeightToFirstLine() {
    _init_properties_Snackbar_kt__sxelwb();
    return HeightToFirstLine;
  }
  var HeightToFirstLine;
  function get_HorizontalSpacing() {
    _init_properties_Snackbar_kt__sxelwb();
    return HorizontalSpacing;
  }
  var HorizontalSpacing;
  function get_HorizontalSpacingButtonSide() {
    _init_properties_Snackbar_kt__sxelwb();
    return HorizontalSpacingButtonSide;
  }
  var HorizontalSpacingButtonSide;
  function get_SeparateButtonExtraY() {
    _init_properties_Snackbar_kt__sxelwb();
    return SeparateButtonExtraY;
  }
  var SeparateButtonExtraY;
  function get_SnackbarVerticalPadding() {
    _init_properties_Snackbar_kt__sxelwb();
    return SnackbarVerticalPadding;
  }
  var SnackbarVerticalPadding;
  function get_TextEndExtraSpacing() {
    _init_properties_Snackbar_kt__sxelwb();
    return TextEndExtraSpacing;
  }
  var TextEndExtraSpacing;
  function get_LongButtonVerticalOffset() {
    _init_properties_Snackbar_kt__sxelwb();
    return LongButtonVerticalOffset;
  }
  var LongButtonVerticalOffset;
  var properties_initialized_Snackbar_kt_4x36ah;
  function _init_properties_Snackbar_kt__sxelwb() {
    if (!properties_initialized_Snackbar_kt_4x36ah) {
      properties_initialized_Snackbar_kt_4x36ah = true;
      // Inline function 'androidx.compose.ui.unit.dp' call
      ContainerMaxWidth = _Dp___init__impl__ms3zkb(600);
      // Inline function 'androidx.compose.ui.unit.dp' call
      HeightToFirstLine = _Dp___init__impl__ms3zkb(30);
      // Inline function 'androidx.compose.ui.unit.dp' call
      HorizontalSpacing = _Dp___init__impl__ms3zkb(16);
      // Inline function 'androidx.compose.ui.unit.dp' call
      HorizontalSpacingButtonSide = _Dp___init__impl__ms3zkb(8);
      // Inline function 'androidx.compose.ui.unit.dp' call
      SeparateButtonExtraY = _Dp___init__impl__ms3zkb(2);
      // Inline function 'androidx.compose.ui.unit.dp' call
      SnackbarVerticalPadding = _Dp___init__impl__ms3zkb(6);
      // Inline function 'androidx.compose.ui.unit.dp' call
      TextEndExtraSpacing = _Dp___init__impl__ms3zkb(8);
      // Inline function 'androidx.compose.ui.unit.dp' call
      LongButtonVerticalOffset = _Dp___init__impl__ms3zkb(12);
    }
  }
  function _set_id__dl8o4k($this, _set____db54di) {
    $this.id_1 = _set____db54di;
  }
  function _get_id__ndc34g($this) {
    return $this.id_1;
  }
  function nextId($this) {
    var tmp1 = $this.id_1;
    $this.id_1 = tmp1 + 1 | 0;
    return tmp1;
  }
  function _Strings___init__impl__htkkc7(value) {
    value = value === VOID ? nextId(Companion_getInstance_13()) : value;
    return value;
  }
  function _get_value__a43j40($this) {
    return $this;
  }
  function Companion() {
    Companion_instance = this;
    this.id_1 = 0;
    this.NavigationMenu_1 = _Strings___init__impl__htkkc7();
    this.CloseDrawer_1 = _Strings___init__impl__htkkc7();
    this.CloseSheet_1 = _Strings___init__impl__htkkc7();
    this.DefaultErrorMessage_1 = _Strings___init__impl__htkkc7();
    this.ExposedDropdownMenu_1 = _Strings___init__impl__htkkc7();
    this.SliderRangeStart_1 = _Strings___init__impl__htkkc7();
    this.SliderRangeEnd_1 = _Strings___init__impl__htkkc7();
    this.Dialog_1 = _Strings___init__impl__htkkc7();
    this.MenuExpanded_1 = _Strings___init__impl__htkkc7();
    this.MenuCollapsed_1 = _Strings___init__impl__htkkc7();
    this.SnackbarDismiss_1 = _Strings___init__impl__htkkc7();
    this.SearchBarSearch_1 = _Strings___init__impl__htkkc7();
    this.SuggestionsAvailable_1 = _Strings___init__impl__htkkc7();
    this.DatePickerTitle_1 = _Strings___init__impl__htkkc7();
    this.DatePickerHeadline_1 = _Strings___init__impl__htkkc7();
    this.DatePickerYearPickerPaneTitle_1 = _Strings___init__impl__htkkc7();
    this.DatePickerSwitchToYearSelection_1 = _Strings___init__impl__htkkc7();
    this.DatePickerSwitchToDaySelection_1 = _Strings___init__impl__htkkc7();
    this.DatePickerSwitchToNextMonth_1 = _Strings___init__impl__htkkc7();
    this.DatePickerSwitchToPreviousMonth_1 = _Strings___init__impl__htkkc7();
    this.DatePickerNavigateToYearDescription_1 = _Strings___init__impl__htkkc7();
    this.DatePickerHeadlineDescription_1 = _Strings___init__impl__htkkc7();
    this.DatePickerNoSelectionDescription_1 = _Strings___init__impl__htkkc7();
    this.DatePickerTodayDescription_1 = _Strings___init__impl__htkkc7();
    this.DatePickerScrollToShowLaterYears_1 = _Strings___init__impl__htkkc7();
    this.DatePickerScrollToShowEarlierYears_1 = _Strings___init__impl__htkkc7();
    this.DateInputTitle_1 = _Strings___init__impl__htkkc7();
    this.DateInputHeadline_1 = _Strings___init__impl__htkkc7();
    this.DateInputLabel_1 = _Strings___init__impl__htkkc7();
    this.DateInputHeadlineDescription_1 = _Strings___init__impl__htkkc7();
    this.DateInputNoInputDescription_1 = _Strings___init__impl__htkkc7();
    this.DateInputInvalidNotAllowed_1 = _Strings___init__impl__htkkc7();
    this.DateInputInvalidForPattern_1 = _Strings___init__impl__htkkc7();
    this.DateInputInvalidYearRange_1 = _Strings___init__impl__htkkc7();
    this.DatePickerSwitchToCalendarMode_1 = _Strings___init__impl__htkkc7();
    this.DatePickerSwitchToInputMode_1 = _Strings___init__impl__htkkc7();
    this.DateRangePickerTitle_1 = _Strings___init__impl__htkkc7();
    this.DateRangePickerStartHeadline_1 = _Strings___init__impl__htkkc7();
    this.DateRangePickerEndHeadline_1 = _Strings___init__impl__htkkc7();
    this.DateRangePickerScrollToShowNextMonth_1 = _Strings___init__impl__htkkc7();
    this.DateRangePickerScrollToShowPreviousMonth_1 = _Strings___init__impl__htkkc7();
    this.DateRangePickerDayInRange_1 = _Strings___init__impl__htkkc7();
    this.DateRangeInputTitle_1 = _Strings___init__impl__htkkc7();
    this.DateRangeInputInvalidRangeInput_1 = _Strings___init__impl__htkkc7();
    this.BottomSheetPaneTitle_1 = _Strings___init__impl__htkkc7();
    this.BottomSheetDragHandleDescription_1 = _Strings___init__impl__htkkc7();
    this.BottomSheetPartialExpandDescription_1 = _Strings___init__impl__htkkc7();
    this.BottomSheetDismissDescription_1 = _Strings___init__impl__htkkc7();
    this.BottomSheetExpandDescription_1 = _Strings___init__impl__htkkc7();
    this.TooltipLongPressLabel_1 = _Strings___init__impl__htkkc7();
    this.TimePickerAM_1 = _Strings___init__impl__htkkc7();
    this.TimePickerPM_1 = _Strings___init__impl__htkkc7();
    this.TimePickerPeriodToggle_1 = _Strings___init__impl__htkkc7();
    this.TimePickerHourSelection_1 = _Strings___init__impl__htkkc7();
    this.TimePickerMinuteSelection_1 = _Strings___init__impl__htkkc7();
    this.TimePickerHourSuffix_1 = _Strings___init__impl__htkkc7();
    this.TimePicker24HourSuffix_1 = _Strings___init__impl__htkkc7();
    this.TimePickerMinuteSuffix_1 = _Strings___init__impl__htkkc7();
    this.TimePickerHour_1 = _Strings___init__impl__htkkc7();
    this.TimePickerMinute_1 = _Strings___init__impl__htkkc7();
    this.TimePickerHourTextField_1 = _Strings___init__impl__htkkc7();
    this.TimePickerMinuteTextField_1 = _Strings___init__impl__htkkc7();
    this.TooltipPaneDescription_1 = _Strings___init__impl__htkkc7();
  }
  protoOf(Companion).get_NavigationMenu_l6ew4i_k$ = function () {
    return this.NavigationMenu_1;
  };
  protoOf(Companion).get_CloseDrawer_jfb00u_k$ = function () {
    return this.CloseDrawer_1;
  };
  protoOf(Companion).get_CloseSheet_qxweqa_k$ = function () {
    return this.CloseSheet_1;
  };
  protoOf(Companion).get_DefaultErrorMessage_s4db5l_k$ = function () {
    return this.DefaultErrorMessage_1;
  };
  protoOf(Companion).get_ExposedDropdownMenu_4k1c95_k$ = function () {
    return this.ExposedDropdownMenu_1;
  };
  protoOf(Companion).get_SliderRangeStart_awfyhd_k$ = function () {
    return this.SliderRangeStart_1;
  };
  protoOf(Companion).get_SliderRangeEnd_bzsgk6_k$ = function () {
    return this.SliderRangeEnd_1;
  };
  protoOf(Companion).get_Dialog_sutjgt_k$ = function () {
    return this.Dialog_1;
  };
  protoOf(Companion).get_MenuExpanded_xkmtlv_k$ = function () {
    return this.MenuExpanded_1;
  };
  protoOf(Companion).get_MenuCollapsed_ne9ssv_k$ = function () {
    return this.MenuCollapsed_1;
  };
  protoOf(Companion).get_SnackbarDismiss_5edi6_k$ = function () {
    return this.SnackbarDismiss_1;
  };
  protoOf(Companion).get_SearchBarSearch_wf9gs_k$ = function () {
    return this.SearchBarSearch_1;
  };
  protoOf(Companion).get_SuggestionsAvailable_glxrej_k$ = function () {
    return this.SuggestionsAvailable_1;
  };
  protoOf(Companion).get_DatePickerTitle_bymthx_k$ = function () {
    return this.DatePickerTitle_1;
  };
  protoOf(Companion).get_DatePickerHeadline_wmgh17_k$ = function () {
    return this.DatePickerHeadline_1;
  };
  protoOf(Companion).get_DatePickerYearPickerPaneTitle_n09d8e_k$ = function () {
    return this.DatePickerYearPickerPaneTitle_1;
  };
  protoOf(Companion).get_DatePickerSwitchToYearSelection_dylohv_k$ = function () {
    return this.DatePickerSwitchToYearSelection_1;
  };
  protoOf(Companion).get_DatePickerSwitchToDaySelection_qlvs3q_k$ = function () {
    return this.DatePickerSwitchToDaySelection_1;
  };
  protoOf(Companion).get_DatePickerSwitchToNextMonth_w01gxn_k$ = function () {
    return this.DatePickerSwitchToNextMonth_1;
  };
  protoOf(Companion).get_DatePickerSwitchToPreviousMonth_4k99fb_k$ = function () {
    return this.DatePickerSwitchToPreviousMonth_1;
  };
  protoOf(Companion).get_DatePickerNavigateToYearDescription_wpqo34_k$ = function () {
    return this.DatePickerNavigateToYearDescription_1;
  };
  protoOf(Companion).get_DatePickerHeadlineDescription_ye47ut_k$ = function () {
    return this.DatePickerHeadlineDescription_1;
  };
  protoOf(Companion).get_DatePickerNoSelectionDescription_54245k_k$ = function () {
    return this.DatePickerNoSelectionDescription_1;
  };
  protoOf(Companion).get_DatePickerTodayDescription_kycx8i_k$ = function () {
    return this.DatePickerTodayDescription_1;
  };
  protoOf(Companion).get_DatePickerScrollToShowLaterYears_3q77ze_k$ = function () {
    return this.DatePickerScrollToShowLaterYears_1;
  };
  protoOf(Companion).get_DatePickerScrollToShowEarlierYears_qxi4ki_k$ = function () {
    return this.DatePickerScrollToShowEarlierYears_1;
  };
  protoOf(Companion).get_DateInputTitle_ym31pj_k$ = function () {
    return this.DateInputTitle_1;
  };
  protoOf(Companion).get_DateInputHeadline_nuhnyv_k$ = function () {
    return this.DateInputHeadline_1;
  };
  protoOf(Companion).get_DateInputLabel_jgmc1p_k$ = function () {
    return this.DateInputLabel_1;
  };
  protoOf(Companion).get_DateInputHeadlineDescription_3kwld5_k$ = function () {
    return this.DateInputHeadlineDescription_1;
  };
  protoOf(Companion).get_DateInputNoInputDescription_7dy6xk_k$ = function () {
    return this.DateInputNoInputDescription_1;
  };
  protoOf(Companion).get_DateInputInvalidNotAllowed_x0xyuz_k$ = function () {
    return this.DateInputInvalidNotAllowed_1;
  };
  protoOf(Companion).get_DateInputInvalidForPattern_vtdnmb_k$ = function () {
    return this.DateInputInvalidForPattern_1;
  };
  protoOf(Companion).get_DateInputInvalidYearRange_5x8l4y_k$ = function () {
    return this.DateInputInvalidYearRange_1;
  };
  protoOf(Companion).get_DatePickerSwitchToCalendarMode_4xx68n_k$ = function () {
    return this.DatePickerSwitchToCalendarMode_1;
  };
  protoOf(Companion).get_DatePickerSwitchToInputMode_ceyerf_k$ = function () {
    return this.DatePickerSwitchToInputMode_1;
  };
  protoOf(Companion).get_DateRangePickerTitle_a32re_k$ = function () {
    return this.DateRangePickerTitle_1;
  };
  protoOf(Companion).get_DateRangePickerStartHeadline_aqp62s_k$ = function () {
    return this.DateRangePickerStartHeadline_1;
  };
  protoOf(Companion).get_DateRangePickerEndHeadline_f7otib_k$ = function () {
    return this.DateRangePickerEndHeadline_1;
  };
  protoOf(Companion).get_DateRangePickerScrollToShowNextMonth_2rt9iu_k$ = function () {
    return this.DateRangePickerScrollToShowNextMonth_1;
  };
  protoOf(Companion).get_DateRangePickerScrollToShowPreviousMonth_do711q_k$ = function () {
    return this.DateRangePickerScrollToShowPreviousMonth_1;
  };
  protoOf(Companion).get_DateRangePickerDayInRange_2iyzta_k$ = function () {
    return this.DateRangePickerDayInRange_1;
  };
  protoOf(Companion).get_DateRangeInputTitle_txs5re_k$ = function () {
    return this.DateRangeInputTitle_1;
  };
  protoOf(Companion).get_DateRangeInputInvalidRangeInput_8blhcu_k$ = function () {
    return this.DateRangeInputInvalidRangeInput_1;
  };
  protoOf(Companion).get_BottomSheetPaneTitle_uvopw9_k$ = function () {
    return this.BottomSheetPaneTitle_1;
  };
  protoOf(Companion).get_BottomSheetDragHandleDescription_uvywn_k$ = function () {
    return this.BottomSheetDragHandleDescription_1;
  };
  protoOf(Companion).get_BottomSheetPartialExpandDescription_to67rm_k$ = function () {
    return this.BottomSheetPartialExpandDescription_1;
  };
  protoOf(Companion).get_BottomSheetDismissDescription_emlf4x_k$ = function () {
    return this.BottomSheetDismissDescription_1;
  };
  protoOf(Companion).get_BottomSheetExpandDescription_kv6deh_k$ = function () {
    return this.BottomSheetExpandDescription_1;
  };
  protoOf(Companion).get_TooltipLongPressLabel_mjkt2h_k$ = function () {
    return this.TooltipLongPressLabel_1;
  };
  protoOf(Companion).get_TimePickerAM_fz8fym_k$ = function () {
    return this.TimePickerAM_1;
  };
  protoOf(Companion).get_TimePickerPM_x0e28t_k$ = function () {
    return this.TimePickerPM_1;
  };
  protoOf(Companion).get_TimePickerPeriodToggle_p2d64l_k$ = function () {
    return this.TimePickerPeriodToggle_1;
  };
  protoOf(Companion).get_TimePickerHourSelection_9fbrja_k$ = function () {
    return this.TimePickerHourSelection_1;
  };
  protoOf(Companion).get_TimePickerMinuteSelection_88p69i_k$ = function () {
    return this.TimePickerMinuteSelection_1;
  };
  protoOf(Companion).get_TimePickerHourSuffix_usx8d7_k$ = function () {
    return this.TimePickerHourSuffix_1;
  };
  protoOf(Companion).get_TimePicker24HourSuffix_q0ehyb_k$ = function () {
    return this.TimePicker24HourSuffix_1;
  };
  protoOf(Companion).get_TimePickerMinuteSuffix_4y4jij_k$ = function () {
    return this.TimePickerMinuteSuffix_1;
  };
  protoOf(Companion).get_TimePickerHour_1wby7q_k$ = function () {
    return this.TimePickerHour_1;
  };
  protoOf(Companion).get_TimePickerMinute_uhla2i_k$ = function () {
    return this.TimePickerMinute_1;
  };
  protoOf(Companion).get_TimePickerHourTextField_hv1chz_k$ = function () {
    return this.TimePickerHourTextField_1;
  };
  protoOf(Companion).get_TimePickerMinuteTextField_goer87_k$ = function () {
    return this.TimePickerMinuteTextField_1;
  };
  protoOf(Companion).get_TooltipPaneDescription_olnuo4_k$ = function () {
    return this.TooltipPaneDescription_1;
  };
  var Companion_instance;
  function Companion_getInstance_13() {
    if (Companion_instance == null)
      new Companion();
    return Companion_instance;
  }
  function Strings__toString_impl_n1wfxd($this) {
    return 'Strings(value=' + $this + ')';
  }
  function Strings__hashCode_impl_q81p8w($this) {
    return $this;
  }
  function Strings__equals_impl_rtlpxw($this, other) {
    if (!(other instanceof Strings))
      return false;
    if (!($this === (other instanceof Strings ? other.value_1 : THROW_CCE())))
      return false;
    return true;
  }
  function Strings(value) {
    Companion_getInstance_13();
    this.value_1 = value;
  }
  protoOf(Strings).toString = function () {
    return Strings__toString_impl_n1wfxd(this.value_1);
  };
  protoOf(Strings).hashCode = function () {
    return Strings__hashCode_impl_q81p8w(this.value_1);
  };
  protoOf(Strings).equals = function (other) {
    return Strings__equals_impl_rtlpxw(this.value_1, other);
  };
  function get_LocalAbsoluteTonalElevation() {
    _init_properties_Surface_kt__8o7unv();
    return LocalAbsoluteTonalElevation;
  }
  var LocalAbsoluteTonalElevation;
  function LocalAbsoluteTonalElevation$lambda() {
    _init_properties_Surface_kt__8o7unv();
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp$ret$0 = _Dp___init__impl__ms3zkb(0);
    return new Dp(tmp$ret$0);
  }
  var properties_initialized_Surface_kt_k203pf;
  function _init_properties_Surface_kt__8o7unv() {
    if (!properties_initialized_Surface_kt_k203pf) {
      properties_initialized_Surface_kt_k203pf = true;
      LocalAbsoluteTonalElevation = compositionLocalOf(VOID, LocalAbsoluteTonalElevation$lambda);
    }
  }
  function get_DismissThreshold() {
    _init_properties_SwipeToDismiss_kt__qpd5jp();
    return DismissThreshold;
  }
  var DismissThreshold;
  var properties_initialized_SwipeToDismiss_kt_n9jaax;
  function _init_properties_SwipeToDismiss_kt__qpd5jp() {
    if (!properties_initialized_SwipeToDismiss_kt_n9jaax) {
      properties_initialized_SwipeToDismiss_kt_n9jaax = true;
      // Inline function 'androidx.compose.ui.unit.dp' call
      DismissThreshold = _Dp___init__impl__ms3zkb(125);
    }
  }
  function get_ThumbDiameter() {
    _init_properties_Switch_kt__dwcqr0();
    return ThumbDiameter;
  }
  var ThumbDiameter;
  function get_UncheckedThumbDiameter() {
    _init_properties_Switch_kt__dwcqr0();
    return UncheckedThumbDiameter;
  }
  var UncheckedThumbDiameter;
  function get_SwitchWidth() {
    _init_properties_Switch_kt__dwcqr0();
    return SwitchWidth;
  }
  var SwitchWidth;
  function get_SwitchHeight() {
    _init_properties_Switch_kt__dwcqr0();
    return SwitchHeight;
  }
  var SwitchHeight;
  function get_ThumbPadding() {
    _init_properties_Switch_kt__dwcqr0();
    return ThumbPadding;
  }
  var ThumbPadding;
  function get_ThumbPathLength() {
    _init_properties_Switch_kt__dwcqr0();
    return ThumbPathLength;
  }
  var ThumbPathLength;
  function get_AnimationSpec_0() {
    _init_properties_Switch_kt__dwcqr0();
    return AnimationSpec_0;
  }
  var AnimationSpec_0;
  var properties_initialized_Switch_kt_7kkg8m;
  function _init_properties_Switch_kt__dwcqr0() {
    if (!properties_initialized_Switch_kt_7kkg8m) {
      properties_initialized_Switch_kt_7kkg8m = true;
      ThumbDiameter = SwitchTokens_getInstance().get_SelectedHandleWidth_quai4p_k$();
      UncheckedThumbDiameter = SwitchTokens_getInstance().get_UnselectedHandleWidth_iwk7ya_k$();
      SwitchWidth = SwitchTokens_getInstance().get_TrackWidth_fc081r_k$();
      SwitchHeight = SwitchTokens_getInstance().get_TrackHeight_mo2hpi_k$();
      // Inline function 'androidx.compose.ui.unit.Dp.div' call
      // Inline function 'androidx.compose.ui.unit.Dp.minus' call
      var this_0 = get_SwitchHeight();
      var other = get_ThumbDiameter();
      var this_1 = _Dp___init__impl__ms3zkb(_Dp___get_value__impl__geb1vb(this_0) - _Dp___get_value__impl__geb1vb(other));
      ThumbPadding = _Dp___init__impl__ms3zkb(_Dp___get_value__impl__geb1vb(this_1) / 2);
      // Inline function 'androidx.compose.ui.unit.Dp.minus' call
      // Inline function 'androidx.compose.ui.unit.Dp.minus' call
      var this_2 = get_SwitchWidth();
      var other_0 = get_ThumbDiameter();
      var this_3 = _Dp___init__impl__ms3zkb(_Dp___get_value__impl__geb1vb(this_2) - _Dp___get_value__impl__geb1vb(other_0));
      var other_1 = get_ThumbPadding();
      ThumbPathLength = _Dp___init__impl__ms3zkb(_Dp___get_value__impl__geb1vb(this_3) - _Dp___get_value__impl__geb1vb(other_1));
      AnimationSpec_0 = new TweenSpec(100);
    }
  }
  function get_SmallTabHeight() {
    _init_properties_Tab_kt__2zykwz();
    return SmallTabHeight;
  }
  var SmallTabHeight;
  function get_LargeTabHeight() {
    _init_properties_Tab_kt__2zykwz();
    return LargeTabHeight;
  }
  var LargeTabHeight;
  function get_HorizontalTextPadding() {
    _init_properties_Tab_kt__2zykwz();
    return HorizontalTextPadding;
  }
  var HorizontalTextPadding;
  function get_SingleLineTextBaselineWithIcon() {
    _init_properties_Tab_kt__2zykwz();
    return SingleLineTextBaselineWithIcon;
  }
  var SingleLineTextBaselineWithIcon;
  function get_DoubleLineTextBaselineWithIcon() {
    _init_properties_Tab_kt__2zykwz();
    return DoubleLineTextBaselineWithIcon;
  }
  var DoubleLineTextBaselineWithIcon;
  function get_IconDistanceFromBaseline() {
    _init_properties_Tab_kt__2zykwz();
    return IconDistanceFromBaseline;
  }
  var IconDistanceFromBaseline;
  function get_TextDistanceFromLeadingIcon() {
    _init_properties_Tab_kt__2zykwz();
    return TextDistanceFromLeadingIcon;
  }
  var TextDistanceFromLeadingIcon;
  var properties_initialized_Tab_kt_t1ydej;
  function _init_properties_Tab_kt__2zykwz() {
    if (!properties_initialized_Tab_kt_t1ydej) {
      properties_initialized_Tab_kt_t1ydej = true;
      SmallTabHeight = PrimaryNavigationTabTokens_getInstance().get_ContainerHeight_9lch44_k$();
      // Inline function 'androidx.compose.ui.unit.dp' call
      LargeTabHeight = _Dp___init__impl__ms3zkb(72);
      // Inline function 'androidx.compose.ui.unit.dp' call
      HorizontalTextPadding = _Dp___init__impl__ms3zkb(16);
      // Inline function 'androidx.compose.ui.unit.dp' call
      SingleLineTextBaselineWithIcon = _Dp___init__impl__ms3zkb(14);
      // Inline function 'androidx.compose.ui.unit.dp' call
      DoubleLineTextBaselineWithIcon = _Dp___init__impl__ms3zkb(6);
      IconDistanceFromBaseline = get_sp(20);
      // Inline function 'androidx.compose.ui.unit.dp' call
      TextDistanceFromLeadingIcon = _Dp___init__impl__ms3zkb(8);
    }
  }
  function get_ScrollableTabRowMinimumTabWidth() {
    _init_properties_TabRow_kt__gm58f9();
    return ScrollableTabRowMinimumTabWidth;
  }
  var ScrollableTabRowMinimumTabWidth;
  function get_ScrollableTabRowPadding() {
    _init_properties_TabRow_kt__gm58f9();
    return ScrollableTabRowPadding;
  }
  var ScrollableTabRowPadding;
  function get_ScrollableTabRowScrollSpec() {
    _init_properties_TabRow_kt__gm58f9();
    return ScrollableTabRowScrollSpec;
  }
  var ScrollableTabRowScrollSpec;
  var properties_initialized_TabRow_kt_8vmbon;
  function _init_properties_TabRow_kt__gm58f9() {
    if (!properties_initialized_TabRow_kt_8vmbon) {
      properties_initialized_TabRow_kt_8vmbon = true;
      // Inline function 'androidx.compose.ui.unit.dp' call
      ScrollableTabRowMinimumTabWidth = _Dp___init__impl__ms3zkb(90);
      // Inline function 'androidx.compose.ui.unit.dp' call
      ScrollableTabRowPadding = _Dp___init__impl__ms3zkb(52);
      ScrollableTabRowScrollSpec = tween(250, VOID, get_FastOutSlowInEasing());
    }
  }
  function get_LocalTextStyle() {
    _init_properties_Text_kt__l2j80d();
    return LocalTextStyle;
  }
  var LocalTextStyle;
  function ProvideTextStyle$composable(value, content, $composer, $changed) {
    _init_properties_Text_kt__l2j80d();
    var $composer_0 = $composer;
    $composer_0 = $composer_0.startRestartGroup_lebv1i_k$(915084672);
    sourceInformation($composer_0, 'C(ProvideTextStyle$composable)P(1)358@14903L7,359@14928L80:Text.kt#uh7d8r');
    var $dirty = $changed;
    if (($changed & 14) === 0)
      $dirty = $dirty | ($composer_0.changed_ga7h3f_k$(value) ? 4 : 2);
    if (($changed & 112) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(content) ? 32 : 16);
    if (!(($dirty & 91) === 18) ? true : !$composer_0.get_skipping_3owdve_k$()) {
      if (isTraceInProgress()) {
        traceEventStart(915084672, $dirty, -1, 'androidx.compose.material3.ProvideTextStyle$composable (Text.kt:357)');
      }
      // Inline function 'androidx.compose.runtime.CompositionLocal.$get-current$$composable' call
      var this_0 = get_LocalTextStyle();
      var $composer_1 = $composer_0;
      sourceInformationMarkerStart($composer_1, 858843746, 'CC($get-current$$composable):CompositionLocal.kt#9igjgp');
      var tmp0 = $composer_1.consume_ebzcrh_k$(this_0);
      sourceInformationMarkerEnd($composer_1);
      var mergedStyle = tmp0.merge_grd1yz_k$(value);
      CompositionLocalProvider$composable([get_LocalTextStyle().provides_3agxel_k$(mergedStyle)], content, $composer_0, 112 & $dirty);
      if (isTraceInProgress()) {
        traceEventEnd();
      }
    } else {
      $composer_0.skipToGroupEnd_lh3zi2_k$();
    }
    var tmp0_safe_receiver = $composer_0.endRestartGroup_yxpjv9_k$();
    if (tmp0_safe_receiver === null)
      null;
    else {
      tmp0_safe_receiver.updateScope_t8jcf_k$(ProvideTextStyle$composable$lambda(value, content, $changed));
    }
  }
  function LocalTextStyle$lambda() {
    _init_properties_Text_kt__l2j80d();
    return get_DefaultTextStyle();
  }
  function ProvideTextStyle$composable$lambda($value, $content, $$changed) {
    return function ($composer, $force) {
      ProvideTextStyle$composable($value, $content, $composer, updateChangedFlags($$changed | 1));
      return Unit_getInstance();
    };
  }
  var properties_initialized_Text_kt_kgdrtb;
  function _init_properties_Text_kt__l2j80d() {
    if (!properties_initialized_Text_kt_kgdrtb) {
      properties_initialized_Text_kt_kgdrtb = true;
      var tmp = structuralEqualityPolicy();
      LocalTextStyle = compositionLocalOf(tmp, LocalTextStyle$lambda);
    }
  }
  function get_TextFieldWithLabelVerticalPadding() {
    _init_properties_TextField_kt__b1se5h();
    return TextFieldWithLabelVerticalPadding;
  }
  var TextFieldWithLabelVerticalPadding;
  function drawIndicatorLine(_this__u8e3s4, indicatorBorder) {
    _init_properties_TextField_kt__b1se5h();
    var strokeWidthDp = indicatorBorder.get_width_7o61hi_k$();
    return drawWithContent(_this__u8e3s4, drawIndicatorLine$lambda(strokeWidthDp, indicatorBorder));
  }
  function TextFieldLayout$composable(modifier, textField, label, placeholder, leading, trailing, prefix, suffix, singleLine, animationProgress, container, supporting, paddingValues, $composer, $changed, $changed1) {
    _init_properties_TextField_kt__b1se5h();
    var $composer_0 = $composer;
    $composer_0 = $composer_0.startRestartGroup_lebv1i_k$(1292895375);
    sourceInformation($composer_0, 'C(TextFieldLayout$composable)P(4,11,2,6,3,12,7,9,8!2,10)512@24588L139,515@24775L7,516@24787L3994:TextField.kt#uh7d8r');
    var $dirty = $changed;
    var $dirty1 = $changed1;
    if (($changed & 14) === 0)
      $dirty = $dirty | ($composer_0.changed_ga7h3f_k$(modifier) ? 4 : 2);
    if (($changed & 112) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(textField) ? 32 : 16);
    if (($changed & 896) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(label) ? 256 : 128);
    if (($changed & 7168) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(placeholder) ? 2048 : 1024);
    if (($changed & 57344) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(leading) ? 16384 : 8192);
    if (($changed & 458752) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(trailing) ? 131072 : 65536);
    if (($changed & 3670016) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(prefix) ? 1048576 : 524288);
    if (($changed & 29360128) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(suffix) ? 8388608 : 4194304);
    if (($changed & 234881024) === 0)
      $dirty = $dirty | ($composer_0.changed_jpyyrz_k$(singleLine) ? 67108864 : 33554432);
    if (($changed & 1879048192) === 0)
      $dirty = $dirty | ($composer_0.changed_i8bvic_k$(animationProgress) ? 536870912 : 268435456);
    if (($changed1 & 14) === 0)
      $dirty1 = $dirty1 | ($composer_0.changedInstance_s1wkiy_k$(container) ? 4 : 2);
    if (($changed1 & 112) === 0)
      $dirty1 = $dirty1 | ($composer_0.changedInstance_s1wkiy_k$(supporting) ? 32 : 16);
    if (($changed1 & 896) === 0)
      $dirty1 = $dirty1 | ($composer_0.changed_ga7h3f_k$(paddingValues) ? 256 : 128);
    if ((!(($dirty & 1533916891) === 306783378) ? true : !(($dirty1 & 731) === 146)) ? true : !$composer_0.get_skipping_3owdve_k$()) {
      if (isTraceInProgress()) {
        traceEventStart(1292895375, $dirty, $dirty1, 'androidx.compose.material3.TextFieldLayout$composable (TextField.kt:497)');
      }
      // Inline function 'androidx.compose.runtime.remember$composable' call
      var $composer_1 = $composer_0;
      $composer_1.startReplaceableGroup_ip860b_k$(-1058148781);
      sourceInformation($composer_1, 'CC(remember$composable)P(1,2,3):Composables.kt#9igjgp');
      // Inline function 'androidx.compose.runtime.cache' call
      var invalid = !!(!!($composer_1.changed_ga7h3f_k$(singleLine) | $composer_1.changed_ga7h3f_k$(animationProgress)) | $composer_1.changed_ga7h3f_k$(paddingValues));
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it = $composer_1.rememberedValue_4dg93v_k$();
      var tmp;
      if (invalid ? true : it === Companion_getInstance_2().get_Empty_i9b85g_k$()) {
        // Inline function 'androidx.compose.material3.TextFieldLayout$composable.<anonymous>' call
        var value = new TextFieldMeasurePolicy(singleLine, animationProgress, paddingValues);
        $composer_1.updateRememberedValue_l1wh71_k$(value);
        tmp = value;
      } else {
        tmp = it;
      }
      var tmp_0 = tmp;
      var tmp0 = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
      $composer_1.endReplaceableGroup_ern0ak_k$();
      var measurePolicy = tmp0;
      // Inline function 'androidx.compose.runtime.CompositionLocal.$get-current$$composable' call
      var this_0 = get_LocalLayoutDirection();
      var $composer_2 = $composer_0;
      sourceInformationMarkerStart($composer_2, 858843746, 'CC($get-current$$composable):CompositionLocal.kt#9igjgp');
      var tmp0_0 = $composer_2.consume_ebzcrh_k$(this_0);
      sourceInformationMarkerEnd($composer_2);
      var layoutDirection = tmp0_0;
      // Inline function 'androidx.compose.ui.layout.Layout$composable' call
      var $composer_3 = $composer_0;
      var $changed_0 = 112 & $dirty << 3;
      var modifier_0 = modifier;
      var $composer_4 = $composer_3;
      $composer_4.startReplaceableGroup_ip860b_k$(1725976829);
      sourceInformation($composer_4, 'CC(Layout$composable)P(!1,2)78@3158L23,80@3248L420:Layout.kt#80mrfh');
      if (!((0 & 2) === 0))
        modifier_0 = Companion_getInstance_1();
      var compositeKeyHash = $get_currentCompositeKeyHash$$composable_u3vbzj($composer_4, 0);
      var localMap = $composer_4.get_currentCompositionLocalMap_fmcf79_k$();
      // Inline function 'androidx.compose.runtime.ReusableComposeNode$composable' call
      var factory = Companion_getInstance_3().get_Constructor_f7ieep_k$();
      var skippableUpdate = materializerOf(modifier_0);
      var $changed_1 = 6 | 7168 & $changed_0 << 9;
      var $composer_5 = $composer_4;
      var tmp_1 = $composer_5.get_applier_bupu8u_k$();
      if (!isInterface(tmp_1, Applier)) {
        invalidApplier();
      }
      $composer_5.startReusableNode_jjgeyp_k$();
      if ($composer_5.get_inserting_25mlsw_k$()) {
        $composer_5.createNode_ahrd54_k$(factory);
      } else {
        $composer_5.useNode_io5s9l_k$();
      }
      // Inline function 'androidx.compose.ui.layout.Layout$composable.<anonymous>' call
      var $this$ReusableComposeNode = _Updater___init__impl__rbfxm8($composer_5);
      Updater__set_impl_v7kwss($this$ReusableComposeNode, measurePolicy, Companion_getInstance_3().get_SetMeasurePolicy_on6ujt_k$());
      Updater__set_impl_v7kwss($this$ReusableComposeNode, localMap, Companion_getInstance_3().get_SetResolvedCompositionLocals_rc2u9t_k$());
      // Inline function 'androidx.compose.runtime.Updater.set' call
      var block = Companion_getInstance_3().get_SetCompositeKeyHash_n8lgg1_k$();
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      var $this$with = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode);
      var tmp_2;
      if ($this$with.get_inserting_25mlsw_k$() ? true : !equals($this$with.rememberedValue_4dg93v_k$(), compositeKeyHash)) {
        $this$with.updateRememberedValue_l1wh71_k$(compositeKeyHash);
        _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode).apply_pk82p8_k$(compositeKeyHash, block);
        tmp_2 = Unit_getInstance();
      }
      skippableUpdate(new SkippableUpdater(_SkippableUpdater___init__impl__4ft0t9($composer_5)), $composer_5, 112 & $changed_1 >> 3);
      $composer_5.startReplaceableGroup_ip860b_k$(2058660585);
      // Inline function 'androidx.compose.material3.TextFieldLayout$composable.<anonymous>' call
      var $composer_6 = $composer_5;
      sourceInformationMarkerStart($composer_6, -1940134730, 'C522@25106L11,605@28102L229:TextField.kt#uh7d8r');
      container($composer_6, 14 & $dirty1);
      $composer_6.startReplaceableGroup_ip860b_k$(-1940134705);
      sourceInformation($composer_6, '525@25170L269');
      if (!(leading == null)) {
        // Inline function 'androidx.compose.foundation.layout.Box$composable' call
        var modifier_1 = layoutId(Companion_getInstance_1(), get_LeadingId()).then_g5qrxq_k$(get_IconDefaultSizeModifier());
        var contentAlignment = Companion_getInstance_0().get_Center_3arb0i_k$();
        var propagateMinConstraints = false;
        var $composer_7 = $composer_6;
        $composer_7.startReplaceableGroup_ip860b_k$(1330882304);
        sourceInformation($composer_7, 'CC(Box$composable)P(2,1,3)69@3214L67,70@3286L130:Box.kt#2w3rfo');
        if (!((4 & 1) === 0))
          modifier_1 = Companion_getInstance_1();
        if (!((4 & 2) === 0))
          contentAlignment = Companion_getInstance_0().get_TopStart_o4x792_k$();
        if (!((4 & 4) === 0))
          propagateMinConstraints = false;
        var measurePolicy_0 = rememberBoxMeasurePolicy$composable(contentAlignment, propagateMinConstraints, $composer_7, 14 & 48 >> 3 | 112 & 48 >> 3);
        // Inline function 'androidx.compose.ui.layout.Layout$composable' call
        var modifier_2 = modifier_1;
        var $changed_2 = 112 & 48 << 3;
        var modifier_3 = modifier_2;
        var $composer_8 = $composer_7;
        $composer_8.startReplaceableGroup_ip860b_k$(1725976829);
        sourceInformation($composer_8, 'CC(Layout$composable)P(!1,2)78@3158L23,80@3248L420:Layout.kt#80mrfh');
        if (!((0 & 2) === 0))
          modifier_3 = Companion_getInstance_1();
        var compositeKeyHash_0 = $get_currentCompositeKeyHash$$composable_u3vbzj($composer_8, 0);
        var localMap_0 = $composer_8.get_currentCompositionLocalMap_fmcf79_k$();
        // Inline function 'androidx.compose.runtime.ReusableComposeNode$composable' call
        var factory_0 = Companion_getInstance_3().get_Constructor_f7ieep_k$();
        var skippableUpdate_0 = materializerOf(modifier_3);
        var $changed_3 = 6 | 7168 & $changed_2 << 9;
        var $composer_9 = $composer_8;
        var tmp_3 = $composer_9.get_applier_bupu8u_k$();
        if (!isInterface(tmp_3, Applier)) {
          invalidApplier();
        }
        $composer_9.startReusableNode_jjgeyp_k$();
        if ($composer_9.get_inserting_25mlsw_k$()) {
          $composer_9.createNode_ahrd54_k$(factory_0);
        } else {
          $composer_9.useNode_io5s9l_k$();
        }
        // Inline function 'androidx.compose.ui.layout.Layout$composable.<anonymous>' call
        var $this$ReusableComposeNode_0 = _Updater___init__impl__rbfxm8($composer_9);
        Updater__set_impl_v7kwss($this$ReusableComposeNode_0, measurePolicy_0, Companion_getInstance_3().get_SetMeasurePolicy_on6ujt_k$());
        Updater__set_impl_v7kwss($this$ReusableComposeNode_0, localMap_0, Companion_getInstance_3().get_SetResolvedCompositionLocals_rc2u9t_k$());
        // Inline function 'androidx.compose.runtime.Updater.set' call
        var block_0 = Companion_getInstance_3().get_SetCompositeKeyHash_n8lgg1_k$();
        // Inline function 'kotlin.with' call
        // Inline function 'kotlin.contracts.contract' call
        var $this$with_0 = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_0);
        var tmp_4;
        if ($this$with_0.get_inserting_25mlsw_k$() ? true : !equals($this$with_0.rememberedValue_4dg93v_k$(), compositeKeyHash_0)) {
          $this$with_0.updateRememberedValue_l1wh71_k$(compositeKeyHash_0);
          _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_0).apply_pk82p8_k$(compositeKeyHash_0, block_0);
          tmp_4 = Unit_getInstance();
        }
        skippableUpdate_0(new SkippableUpdater(_SkippableUpdater___init__impl__4ft0t9($composer_9)), $composer_9, 112 & $changed_3 >> 3);
        $composer_9.startReplaceableGroup_ip860b_k$(2058660585);
        // Inline function 'androidx.compose.foundation.layout.Box$composable.<anonymous>' call
        var $composer_10 = $composer_9;
        sourceInformationMarkerStart($composer_10, -1851536925, 'C71@3331L9:Box.kt#2w3rfo');
        // Inline function 'androidx.compose.material3.TextFieldLayout$composable.<anonymous>.<anonymous>' call
        BoxScopeInstance_getInstance();
        var $composer_11 = $composer_10;
        sourceInformationMarkerStart($composer_11, -368045559, 'C531@25412L9:TextField.kt#uh7d8r');
        leading($composer_11, 14 & $dirty >> 12);
        sourceInformationMarkerEnd($composer_11);
        sourceInformationMarkerEnd($composer_10);
        $composer_9.endReplaceableGroup_ern0ak_k$();
        $composer_9.endNode_3m0yfn_k$();
        $composer_8.endReplaceableGroup_ern0ak_k$();
        $composer_7.endReplaceableGroup_ern0ak_k$();
      }
      $composer_6.endReplaceableGroup_ern0ak_k$();
      $composer_6.startReplaceableGroup_ip860b_k$(-1940134370);
      sourceInformation($composer_6, '535@25506L271');
      if (!(trailing == null)) {
        // Inline function 'androidx.compose.foundation.layout.Box$composable' call
        var modifier_4 = layoutId(Companion_getInstance_1(), get_TrailingId()).then_g5qrxq_k$(get_IconDefaultSizeModifier());
        var contentAlignment_0 = Companion_getInstance_0().get_Center_3arb0i_k$();
        var propagateMinConstraints_0 = false;
        var $composer_12 = $composer_6;
        $composer_12.startReplaceableGroup_ip860b_k$(1330882304);
        sourceInformation($composer_12, 'CC(Box$composable)P(2,1,3)69@3214L67,70@3286L130:Box.kt#2w3rfo');
        if (!((4 & 1) === 0))
          modifier_4 = Companion_getInstance_1();
        if (!((4 & 2) === 0))
          contentAlignment_0 = Companion_getInstance_0().get_TopStart_o4x792_k$();
        if (!((4 & 4) === 0))
          propagateMinConstraints_0 = false;
        var measurePolicy_1 = rememberBoxMeasurePolicy$composable(contentAlignment_0, propagateMinConstraints_0, $composer_12, 14 & 48 >> 3 | 112 & 48 >> 3);
        // Inline function 'androidx.compose.ui.layout.Layout$composable' call
        var modifier_5 = modifier_4;
        var $changed_4 = 112 & 48 << 3;
        var modifier_6 = modifier_5;
        var $composer_13 = $composer_12;
        $composer_13.startReplaceableGroup_ip860b_k$(1725976829);
        sourceInformation($composer_13, 'CC(Layout$composable)P(!1,2)78@3158L23,80@3248L420:Layout.kt#80mrfh');
        if (!((0 & 2) === 0))
          modifier_6 = Companion_getInstance_1();
        var compositeKeyHash_1 = $get_currentCompositeKeyHash$$composable_u3vbzj($composer_13, 0);
        var localMap_1 = $composer_13.get_currentCompositionLocalMap_fmcf79_k$();
        // Inline function 'androidx.compose.runtime.ReusableComposeNode$composable' call
        var factory_1 = Companion_getInstance_3().get_Constructor_f7ieep_k$();
        var skippableUpdate_1 = materializerOf(modifier_6);
        var $changed_5 = 6 | 7168 & $changed_4 << 9;
        var $composer_14 = $composer_13;
        var tmp_5 = $composer_14.get_applier_bupu8u_k$();
        if (!isInterface(tmp_5, Applier)) {
          invalidApplier();
        }
        $composer_14.startReusableNode_jjgeyp_k$();
        if ($composer_14.get_inserting_25mlsw_k$()) {
          $composer_14.createNode_ahrd54_k$(factory_1);
        } else {
          $composer_14.useNode_io5s9l_k$();
        }
        // Inline function 'androidx.compose.ui.layout.Layout$composable.<anonymous>' call
        var $this$ReusableComposeNode_1 = _Updater___init__impl__rbfxm8($composer_14);
        Updater__set_impl_v7kwss($this$ReusableComposeNode_1, measurePolicy_1, Companion_getInstance_3().get_SetMeasurePolicy_on6ujt_k$());
        Updater__set_impl_v7kwss($this$ReusableComposeNode_1, localMap_1, Companion_getInstance_3().get_SetResolvedCompositionLocals_rc2u9t_k$());
        // Inline function 'androidx.compose.runtime.Updater.set' call
        var block_1 = Companion_getInstance_3().get_SetCompositeKeyHash_n8lgg1_k$();
        // Inline function 'kotlin.with' call
        // Inline function 'kotlin.contracts.contract' call
        var $this$with_1 = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_1);
        var tmp_6;
        if ($this$with_1.get_inserting_25mlsw_k$() ? true : !equals($this$with_1.rememberedValue_4dg93v_k$(), compositeKeyHash_1)) {
          $this$with_1.updateRememberedValue_l1wh71_k$(compositeKeyHash_1);
          _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_1).apply_pk82p8_k$(compositeKeyHash_1, block_1);
          tmp_6 = Unit_getInstance();
        }
        skippableUpdate_1(new SkippableUpdater(_SkippableUpdater___init__impl__4ft0t9($composer_14)), $composer_14, 112 & $changed_5 >> 3);
        $composer_14.startReplaceableGroup_ip860b_k$(2058660585);
        // Inline function 'androidx.compose.foundation.layout.Box$composable.<anonymous>' call
        var $composer_15 = $composer_14;
        sourceInformationMarkerStart($composer_15, -1851536925, 'C71@3331L9:Box.kt#2w3rfo');
        // Inline function 'androidx.compose.material3.TextFieldLayout$composable.<anonymous>.<anonymous>' call
        BoxScopeInstance_getInstance();
        var $composer_16 = $composer_15;
        sourceInformationMarkerStart($composer_16, -368045222, 'C541@25749L10:TextField.kt#uh7d8r');
        trailing($composer_16, 14 & $dirty >> 15);
        sourceInformationMarkerEnd($composer_16);
        sourceInformationMarkerEnd($composer_15);
        $composer_14.endReplaceableGroup_ern0ak_k$();
        $composer_14.endNode_3m0yfn_k$();
        $composer_13.endReplaceableGroup_ern0ak_k$();
        $composer_12.endReplaceableGroup_ern0ak_k$();
      }
      $composer_6.endReplaceableGroup_ern0ak_k$();
      var startTextFieldPadding = calculateStartPadding(paddingValues, layoutDirection);
      var endTextFieldPadding = calculateEndPadding(paddingValues, layoutDirection);
      var tmp_7;
      if (!(leading == null)) {
        // Inline function 'androidx.compose.ui.unit.coerceAtLeast' call
        // Inline function 'androidx.compose.ui.unit.Dp.minus' call
        var other = get_HorizontalIconPadding();
        var this_1 = _Dp___init__impl__ms3zkb(_Dp___get_value__impl__geb1vb(startTextFieldPadding) - _Dp___get_value__impl__geb1vb(other));
        // Inline function 'androidx.compose.ui.unit.dp' call
        var minimumValue = _Dp___init__impl__ms3zkb(0);
        tmp_7 = _Dp___init__impl__ms3zkb(coerceAtLeast(_Dp___get_value__impl__geb1vb(this_1), _Dp___get_value__impl__geb1vb(minimumValue)));
      } else {
        tmp_7 = startTextFieldPadding;
      }
      var startPadding = tmp_7;
      var tmp_8;
      if (!(trailing == null)) {
        // Inline function 'androidx.compose.ui.unit.coerceAtLeast' call
        // Inline function 'androidx.compose.ui.unit.Dp.minus' call
        var other_0 = get_HorizontalIconPadding();
        var this_2 = _Dp___init__impl__ms3zkb(_Dp___get_value__impl__geb1vb(endTextFieldPadding) - _Dp___get_value__impl__geb1vb(other_0));
        // Inline function 'androidx.compose.ui.unit.dp' call
        var minimumValue_0 = _Dp___init__impl__ms3zkb(0);
        tmp_8 = _Dp___init__impl__ms3zkb(coerceAtLeast(_Dp___get_value__impl__geb1vb(this_2), _Dp___get_value__impl__geb1vb(minimumValue_0)));
      } else {
        tmp_8 = endTextFieldPadding;
      }
      var endPadding = tmp_8;
      $composer_6.startReplaceableGroup_ip860b_k$(-1940133430);
      sourceInformation($composer_6, '560@26444L334');
      if (!(prefix == null)) {
        // Inline function 'androidx.compose.foundation.layout.Box$composable' call
        var modifier_7 = padding(wrapContentHeight(heightIn(layoutId(Companion_getInstance_1(), get_PrefixId()), get_MinTextLineHeight())), startPadding, VOID, get_PrefixSuffixTextPadding());
        var contentAlignment_1 = null;
        var propagateMinConstraints_1 = false;
        var $composer_17 = $composer_6;
        $composer_17.startReplaceableGroup_ip860b_k$(1330882304);
        sourceInformation($composer_17, 'CC(Box$composable)P(2,1,3)69@3214L67,70@3286L130:Box.kt#2w3rfo');
        if (!((6 & 1) === 0))
          modifier_7 = Companion_getInstance_1();
        if (!((6 & 2) === 0))
          contentAlignment_1 = Companion_getInstance_0().get_TopStart_o4x792_k$();
        if (!((6 & 4) === 0))
          propagateMinConstraints_1 = false;
        var measurePolicy_2 = rememberBoxMeasurePolicy$composable(contentAlignment_1, propagateMinConstraints_1, $composer_17, 14 & 0 >> 3 | 112 & 0 >> 3);
        // Inline function 'androidx.compose.ui.layout.Layout$composable' call
        var modifier_8 = modifier_7;
        var $changed_6 = 112 & 0 << 3;
        var modifier_9 = modifier_8;
        var $composer_18 = $composer_17;
        $composer_18.startReplaceableGroup_ip860b_k$(1725976829);
        sourceInformation($composer_18, 'CC(Layout$composable)P(!1,2)78@3158L23,80@3248L420:Layout.kt#80mrfh');
        if (!((0 & 2) === 0))
          modifier_9 = Companion_getInstance_1();
        var compositeKeyHash_2 = $get_currentCompositeKeyHash$$composable_u3vbzj($composer_18, 0);
        var localMap_2 = $composer_18.get_currentCompositionLocalMap_fmcf79_k$();
        // Inline function 'androidx.compose.runtime.ReusableComposeNode$composable' call
        var factory_2 = Companion_getInstance_3().get_Constructor_f7ieep_k$();
        var skippableUpdate_2 = materializerOf(modifier_9);
        var $changed_7 = 6 | 7168 & $changed_6 << 9;
        var $composer_19 = $composer_18;
        var tmp_9 = $composer_19.get_applier_bupu8u_k$();
        if (!isInterface(tmp_9, Applier)) {
          invalidApplier();
        }
        $composer_19.startReusableNode_jjgeyp_k$();
        if ($composer_19.get_inserting_25mlsw_k$()) {
          $composer_19.createNode_ahrd54_k$(factory_2);
        } else {
          $composer_19.useNode_io5s9l_k$();
        }
        // Inline function 'androidx.compose.ui.layout.Layout$composable.<anonymous>' call
        var $this$ReusableComposeNode_2 = _Updater___init__impl__rbfxm8($composer_19);
        Updater__set_impl_v7kwss($this$ReusableComposeNode_2, measurePolicy_2, Companion_getInstance_3().get_SetMeasurePolicy_on6ujt_k$());
        Updater__set_impl_v7kwss($this$ReusableComposeNode_2, localMap_2, Companion_getInstance_3().get_SetResolvedCompositionLocals_rc2u9t_k$());
        // Inline function 'androidx.compose.runtime.Updater.set' call
        var block_2 = Companion_getInstance_3().get_SetCompositeKeyHash_n8lgg1_k$();
        // Inline function 'kotlin.with' call
        // Inline function 'kotlin.contracts.contract' call
        var $this$with_2 = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_2);
        var tmp_10;
        if ($this$with_2.get_inserting_25mlsw_k$() ? true : !equals($this$with_2.rememberedValue_4dg93v_k$(), compositeKeyHash_2)) {
          $this$with_2.updateRememberedValue_l1wh71_k$(compositeKeyHash_2);
          _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_2).apply_pk82p8_k$(compositeKeyHash_2, block_2);
          tmp_10 = Unit_getInstance();
        }
        skippableUpdate_2(new SkippableUpdater(_SkippableUpdater___init__impl__4ft0t9($composer_19)), $composer_19, 112 & $changed_7 >> 3);
        $composer_19.startReplaceableGroup_ip860b_k$(2058660585);
        // Inline function 'androidx.compose.foundation.layout.Box$composable.<anonymous>' call
        var $composer_20 = $composer_19;
        sourceInformationMarkerStart($composer_20, -1851536925, 'C71@3331L9:Box.kt#2w3rfo');
        // Inline function 'androidx.compose.material3.TextFieldLayout$composable.<anonymous>.<anonymous>' call
        BoxScopeInstance_getInstance();
        var $composer_21 = $composer_20;
        sourceInformationMarkerStart($composer_21, -368044219, 'C567@26752L8:TextField.kt#uh7d8r');
        prefix($composer_21, 14 & $dirty >> 18);
        sourceInformationMarkerEnd($composer_21);
        sourceInformationMarkerEnd($composer_20);
        $composer_19.endReplaceableGroup_ern0ak_k$();
        $composer_19.endNode_3m0yfn_k$();
        $composer_18.endReplaceableGroup_ern0ak_k$();
        $composer_17.endReplaceableGroup_ern0ak_k$();
      }
      $composer_6.endReplaceableGroup_ern0ak_k$();
      $composer_6.startReplaceableGroup_ip860b_k$(-1940133031);
      sourceInformation($composer_6, '571@26843L332');
      if (!(suffix == null)) {
        // Inline function 'androidx.compose.foundation.layout.Box$composable' call
        var modifier_10 = padding(wrapContentHeight(heightIn(layoutId(Companion_getInstance_1(), get_SuffixId()), get_MinTextLineHeight())), get_PrefixSuffixTextPadding(), VOID, endPadding);
        var contentAlignment_2 = null;
        var propagateMinConstraints_2 = false;
        var $composer_22 = $composer_6;
        $composer_22.startReplaceableGroup_ip860b_k$(1330882304);
        sourceInformation($composer_22, 'CC(Box$composable)P(2,1,3)69@3214L67,70@3286L130:Box.kt#2w3rfo');
        if (!((6 & 1) === 0))
          modifier_10 = Companion_getInstance_1();
        if (!((6 & 2) === 0))
          contentAlignment_2 = Companion_getInstance_0().get_TopStart_o4x792_k$();
        if (!((6 & 4) === 0))
          propagateMinConstraints_2 = false;
        var measurePolicy_3 = rememberBoxMeasurePolicy$composable(contentAlignment_2, propagateMinConstraints_2, $composer_22, 14 & 0 >> 3 | 112 & 0 >> 3);
        // Inline function 'androidx.compose.ui.layout.Layout$composable' call
        var modifier_11 = modifier_10;
        var $changed_8 = 112 & 0 << 3;
        var modifier_12 = modifier_11;
        var $composer_23 = $composer_22;
        $composer_23.startReplaceableGroup_ip860b_k$(1725976829);
        sourceInformation($composer_23, 'CC(Layout$composable)P(!1,2)78@3158L23,80@3248L420:Layout.kt#80mrfh');
        if (!((0 & 2) === 0))
          modifier_12 = Companion_getInstance_1();
        var compositeKeyHash_3 = $get_currentCompositeKeyHash$$composable_u3vbzj($composer_23, 0);
        var localMap_3 = $composer_23.get_currentCompositionLocalMap_fmcf79_k$();
        // Inline function 'androidx.compose.runtime.ReusableComposeNode$composable' call
        var factory_3 = Companion_getInstance_3().get_Constructor_f7ieep_k$();
        var skippableUpdate_3 = materializerOf(modifier_12);
        var $changed_9 = 6 | 7168 & $changed_8 << 9;
        var $composer_24 = $composer_23;
        var tmp_11 = $composer_24.get_applier_bupu8u_k$();
        if (!isInterface(tmp_11, Applier)) {
          invalidApplier();
        }
        $composer_24.startReusableNode_jjgeyp_k$();
        if ($composer_24.get_inserting_25mlsw_k$()) {
          $composer_24.createNode_ahrd54_k$(factory_3);
        } else {
          $composer_24.useNode_io5s9l_k$();
        }
        // Inline function 'androidx.compose.ui.layout.Layout$composable.<anonymous>' call
        var $this$ReusableComposeNode_3 = _Updater___init__impl__rbfxm8($composer_24);
        Updater__set_impl_v7kwss($this$ReusableComposeNode_3, measurePolicy_3, Companion_getInstance_3().get_SetMeasurePolicy_on6ujt_k$());
        Updater__set_impl_v7kwss($this$ReusableComposeNode_3, localMap_3, Companion_getInstance_3().get_SetResolvedCompositionLocals_rc2u9t_k$());
        // Inline function 'androidx.compose.runtime.Updater.set' call
        var block_3 = Companion_getInstance_3().get_SetCompositeKeyHash_n8lgg1_k$();
        // Inline function 'kotlin.with' call
        // Inline function 'kotlin.contracts.contract' call
        var $this$with_3 = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_3);
        var tmp_12;
        if ($this$with_3.get_inserting_25mlsw_k$() ? true : !equals($this$with_3.rememberedValue_4dg93v_k$(), compositeKeyHash_3)) {
          $this$with_3.updateRememberedValue_l1wh71_k$(compositeKeyHash_3);
          _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_3).apply_pk82p8_k$(compositeKeyHash_3, block_3);
          tmp_12 = Unit_getInstance();
        }
        skippableUpdate_3(new SkippableUpdater(_SkippableUpdater___init__impl__4ft0t9($composer_24)), $composer_24, 112 & $changed_9 >> 3);
        $composer_24.startReplaceableGroup_ip860b_k$(2058660585);
        // Inline function 'androidx.compose.foundation.layout.Box$composable.<anonymous>' call
        var $composer_25 = $composer_24;
        sourceInformationMarkerStart($composer_25, -1851536925, 'C71@3331L9:Box.kt#2w3rfo');
        // Inline function 'androidx.compose.material3.TextFieldLayout$composable.<anonymous>.<anonymous>' call
        BoxScopeInstance_getInstance();
        var $composer_26 = $composer_25;
        sourceInformationMarkerStart($composer_26, -368043822, 'C578@27149L8:TextField.kt#uh7d8r');
        suffix($composer_26, 14 & $dirty >> 21);
        sourceInformationMarkerEnd($composer_26);
        sourceInformationMarkerEnd($composer_25);
        $composer_24.endReplaceableGroup_ern0ak_k$();
        $composer_24.endNode_3m0yfn_k$();
        $composer_23.endReplaceableGroup_ern0ak_k$();
        $composer_22.endReplaceableGroup_ern0ak_k$();
      }
      $composer_6.endReplaceableGroup_ern0ak_k$();
      $composer_6.startReplaceableGroup_ip860b_k$(-1940132633);
      sourceInformation($composer_6, '583@27240L347');
      if (!(label == null)) {
        // Inline function 'androidx.compose.foundation.layout.Box$composable' call
        var modifier_13 = padding(wrapContentHeight(heightIn(layoutId(Companion_getInstance_1(), get_LabelId()), lerp(get_MinTextLineHeight(), get_MinFocusedLabelLineHeight(), animationProgress))), startPadding, VOID, endPadding);
        var contentAlignment_3 = null;
        var propagateMinConstraints_3 = false;
        var $composer_27 = $composer_6;
        $composer_27.startReplaceableGroup_ip860b_k$(1330882304);
        sourceInformation($composer_27, 'CC(Box$composable)P(2,1,3)69@3214L67,70@3286L130:Box.kt#2w3rfo');
        if (!((6 & 1) === 0))
          modifier_13 = Companion_getInstance_1();
        if (!((6 & 2) === 0))
          contentAlignment_3 = Companion_getInstance_0().get_TopStart_o4x792_k$();
        if (!((6 & 4) === 0))
          propagateMinConstraints_3 = false;
        var measurePolicy_4 = rememberBoxMeasurePolicy$composable(contentAlignment_3, propagateMinConstraints_3, $composer_27, 14 & 0 >> 3 | 112 & 0 >> 3);
        // Inline function 'androidx.compose.ui.layout.Layout$composable' call
        var modifier_14 = modifier_13;
        var $changed_10 = 112 & 0 << 3;
        var modifier_15 = modifier_14;
        var $composer_28 = $composer_27;
        $composer_28.startReplaceableGroup_ip860b_k$(1725976829);
        sourceInformation($composer_28, 'CC(Layout$composable)P(!1,2)78@3158L23,80@3248L420:Layout.kt#80mrfh');
        if (!((0 & 2) === 0))
          modifier_15 = Companion_getInstance_1();
        var compositeKeyHash_4 = $get_currentCompositeKeyHash$$composable_u3vbzj($composer_28, 0);
        var localMap_4 = $composer_28.get_currentCompositionLocalMap_fmcf79_k$();
        // Inline function 'androidx.compose.runtime.ReusableComposeNode$composable' call
        var factory_4 = Companion_getInstance_3().get_Constructor_f7ieep_k$();
        var skippableUpdate_4 = materializerOf(modifier_15);
        var $changed_11 = 6 | 7168 & $changed_10 << 9;
        var $composer_29 = $composer_28;
        var tmp_13 = $composer_29.get_applier_bupu8u_k$();
        if (!isInterface(tmp_13, Applier)) {
          invalidApplier();
        }
        $composer_29.startReusableNode_jjgeyp_k$();
        if ($composer_29.get_inserting_25mlsw_k$()) {
          $composer_29.createNode_ahrd54_k$(factory_4);
        } else {
          $composer_29.useNode_io5s9l_k$();
        }
        // Inline function 'androidx.compose.ui.layout.Layout$composable.<anonymous>' call
        var $this$ReusableComposeNode_4 = _Updater___init__impl__rbfxm8($composer_29);
        Updater__set_impl_v7kwss($this$ReusableComposeNode_4, measurePolicy_4, Companion_getInstance_3().get_SetMeasurePolicy_on6ujt_k$());
        Updater__set_impl_v7kwss($this$ReusableComposeNode_4, localMap_4, Companion_getInstance_3().get_SetResolvedCompositionLocals_rc2u9t_k$());
        // Inline function 'androidx.compose.runtime.Updater.set' call
        var block_4 = Companion_getInstance_3().get_SetCompositeKeyHash_n8lgg1_k$();
        // Inline function 'kotlin.with' call
        // Inline function 'kotlin.contracts.contract' call
        var $this$with_4 = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_4);
        var tmp_14;
        if ($this$with_4.get_inserting_25mlsw_k$() ? true : !equals($this$with_4.rememberedValue_4dg93v_k$(), compositeKeyHash_4)) {
          $this$with_4.updateRememberedValue_l1wh71_k$(compositeKeyHash_4);
          _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_4).apply_pk82p8_k$(compositeKeyHash_4, block_4);
          tmp_14 = Unit_getInstance();
        }
        skippableUpdate_4(new SkippableUpdater(_SkippableUpdater___init__impl__4ft0t9($composer_29)), $composer_29, 112 & $changed_11 >> 3);
        $composer_29.startReplaceableGroup_ip860b_k$(2058660585);
        // Inline function 'androidx.compose.foundation.layout.Box$composable.<anonymous>' call
        var $composer_30 = $composer_29;
        sourceInformationMarkerStart($composer_30, -1851536925, 'C71@3331L9:Box.kt#2w3rfo');
        // Inline function 'androidx.compose.material3.TextFieldLayout$composable.<anonymous>.<anonymous>' call
        BoxScopeInstance_getInstance();
        var $composer_31 = $composer_30;
        sourceInformationMarkerStart($composer_31, -368043393, 'C589@27578L7:TextField.kt#uh7d8r');
        label($composer_31, 14 & $dirty >> 6);
        sourceInformationMarkerEnd($composer_31);
        sourceInformationMarkerEnd($composer_30);
        $composer_29.endReplaceableGroup_ern0ak_k$();
        $composer_29.endNode_3m0yfn_k$();
        $composer_28.endReplaceableGroup_ern0ak_k$();
        $composer_27.endReplaceableGroup_ern0ak_k$();
      }
      $composer_6.endReplaceableGroup_ern0ak_k$();
      var tmp_15 = wrapContentHeight(heightIn(Companion_getInstance_1(), get_MinTextLineHeight()));
      var tmp_16;
      if (prefix == null) {
        tmp_16 = startPadding;
      } else {
        // Inline function 'androidx.compose.ui.unit.dp' call
        tmp_16 = _Dp___init__impl__ms3zkb(0);
      }
      var tmp_17 = tmp_16;
      var tmp_18;
      if (suffix == null) {
        tmp_18 = endPadding;
      } else {
        // Inline function 'androidx.compose.ui.unit.dp' call
        tmp_18 = _Dp___init__impl__ms3zkb(0);
      }
      var textPadding = padding(tmp_15, tmp_17, VOID, tmp_18);
      $composer_6.startReplaceableGroup_ip860b_k$(-1940131909);
      sourceInformation($composer_6, '601@27970L105');
      if (!(placeholder == null)) {
        placeholder(layoutId(Companion_getInstance_1(), get_PlaceholderId()).then_g5qrxq_k$(textPadding), $composer_6, 112 & $dirty >> 6);
      }
      $composer_6.endReplaceableGroup_ern0ak_k$();
      // Inline function 'androidx.compose.foundation.layout.Box$composable' call
      var modifier_16 = layoutId(Companion_getInstance_1(), get_TextFieldId()).then_g5qrxq_k$(textPadding);
      var contentAlignment_4 = null;
      var propagateMinConstraints_4 = true;
      var $composer_32 = $composer_6;
      $composer_32.startReplaceableGroup_ip860b_k$(1330882304);
      sourceInformation($composer_32, 'CC(Box$composable)P(2,1,3)69@3214L67,70@3286L130:Box.kt#2w3rfo');
      if (!((2 & 1) === 0))
        modifier_16 = Companion_getInstance_1();
      if (!((2 & 2) === 0))
        contentAlignment_4 = Companion_getInstance_0().get_TopStart_o4x792_k$();
      if (!((2 & 4) === 0))
        propagateMinConstraints_4 = false;
      var measurePolicy_5 = rememberBoxMeasurePolicy$composable(contentAlignment_4, propagateMinConstraints_4, $composer_32, 14 & 384 >> 3 | 112 & 384 >> 3);
      // Inline function 'androidx.compose.ui.layout.Layout$composable' call
      var modifier_17 = modifier_16;
      var $changed_12 = 112 & 384 << 3;
      var modifier_18 = modifier_17;
      var $composer_33 = $composer_32;
      $composer_33.startReplaceableGroup_ip860b_k$(1725976829);
      sourceInformation($composer_33, 'CC(Layout$composable)P(!1,2)78@3158L23,80@3248L420:Layout.kt#80mrfh');
      if (!((0 & 2) === 0))
        modifier_18 = Companion_getInstance_1();
      var compositeKeyHash_5 = $get_currentCompositeKeyHash$$composable_u3vbzj($composer_33, 0);
      var localMap_5 = $composer_33.get_currentCompositionLocalMap_fmcf79_k$();
      // Inline function 'androidx.compose.runtime.ReusableComposeNode$composable' call
      var factory_5 = Companion_getInstance_3().get_Constructor_f7ieep_k$();
      var skippableUpdate_5 = materializerOf(modifier_18);
      var $changed_13 = 6 | 7168 & $changed_12 << 9;
      var $composer_34 = $composer_33;
      var tmp_19 = $composer_34.get_applier_bupu8u_k$();
      if (!isInterface(tmp_19, Applier)) {
        invalidApplier();
      }
      $composer_34.startReusableNode_jjgeyp_k$();
      if ($composer_34.get_inserting_25mlsw_k$()) {
        $composer_34.createNode_ahrd54_k$(factory_5);
      } else {
        $composer_34.useNode_io5s9l_k$();
      }
      // Inline function 'androidx.compose.ui.layout.Layout$composable.<anonymous>' call
      var $this$ReusableComposeNode_5 = _Updater___init__impl__rbfxm8($composer_34);
      Updater__set_impl_v7kwss($this$ReusableComposeNode_5, measurePolicy_5, Companion_getInstance_3().get_SetMeasurePolicy_on6ujt_k$());
      Updater__set_impl_v7kwss($this$ReusableComposeNode_5, localMap_5, Companion_getInstance_3().get_SetResolvedCompositionLocals_rc2u9t_k$());
      // Inline function 'androidx.compose.runtime.Updater.set' call
      var block_5 = Companion_getInstance_3().get_SetCompositeKeyHash_n8lgg1_k$();
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      var $this$with_5 = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_5);
      var tmp_20;
      if ($this$with_5.get_inserting_25mlsw_k$() ? true : !equals($this$with_5.rememberedValue_4dg93v_k$(), compositeKeyHash_5)) {
        $this$with_5.updateRememberedValue_l1wh71_k$(compositeKeyHash_5);
        _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_5).apply_pk82p8_k$(compositeKeyHash_5, block_5);
        tmp_20 = Unit_getInstance();
      }
      skippableUpdate_5(new SkippableUpdater(_SkippableUpdater___init__impl__4ft0t9($composer_34)), $composer_34, 112 & $changed_13 >> 3);
      $composer_34.startReplaceableGroup_ip860b_k$(2058660585);
      // Inline function 'androidx.compose.foundation.layout.Box$composable.<anonymous>' call
      var $composer_35 = $composer_34;
      sourceInformationMarkerStart($composer_35, -1851536925, 'C71@3331L9:Box.kt#2w3rfo');
      // Inline function 'androidx.compose.material3.TextFieldLayout$composable.<anonymous>.<anonymous>' call
      BoxScopeInstance_getInstance();
      var $composer_36 = $composer_35;
      sourceInformationMarkerStart($composer_36, -368042665, 'C611@28306L11:TextField.kt#uh7d8r');
      textField($composer_36, 14 & $dirty >> 3);
      sourceInformationMarkerEnd($composer_36);
      sourceInformationMarkerEnd($composer_35);
      $composer_34.endReplaceableGroup_ern0ak_k$();
      $composer_34.endNode_3m0yfn_k$();
      $composer_33.endReplaceableGroup_ern0ak_k$();
      $composer_32.endReplaceableGroup_ern0ak_k$();
      $composer_6.startReplaceableGroup_ip860b_k$(-875078724);
      sourceInformation($composer_6, '616@28443L269');
      if (!(supporting == null)) {
        // Inline function 'androidx.compose.foundation.layout.Box$composable' call
        var modifier_19 = padding_0(wrapContentHeight(heightIn(layoutId(Companion_getInstance_1(), get_SupportingId()), get_MinSupportingTextLineHeight())), TextFieldDefaults_getInstance().supportingTextPadding$default_4m2tf2_k$());
        var contentAlignment_5 = null;
        var propagateMinConstraints_5 = false;
        var $composer_37 = $composer_6;
        $composer_37.startReplaceableGroup_ip860b_k$(1330882304);
        sourceInformation($composer_37, 'CC(Box$composable)P(2,1,3)69@3214L67,70@3286L130:Box.kt#2w3rfo');
        if (!((6 & 1) === 0))
          modifier_19 = Companion_getInstance_1();
        if (!((6 & 2) === 0))
          contentAlignment_5 = Companion_getInstance_0().get_TopStart_o4x792_k$();
        if (!((6 & 4) === 0))
          propagateMinConstraints_5 = false;
        var measurePolicy_6 = rememberBoxMeasurePolicy$composable(contentAlignment_5, propagateMinConstraints_5, $composer_37, 14 & 0 >> 3 | 112 & 0 >> 3);
        // Inline function 'androidx.compose.ui.layout.Layout$composable' call
        var modifier_20 = modifier_19;
        var $changed_14 = 112 & 0 << 3;
        var modifier_21 = modifier_20;
        var $composer_38 = $composer_37;
        $composer_38.startReplaceableGroup_ip860b_k$(1725976829);
        sourceInformation($composer_38, 'CC(Layout$composable)P(!1,2)78@3158L23,80@3248L420:Layout.kt#80mrfh');
        if (!((0 & 2) === 0))
          modifier_21 = Companion_getInstance_1();
        var compositeKeyHash_6 = $get_currentCompositeKeyHash$$composable_u3vbzj($composer_38, 0);
        var localMap_6 = $composer_38.get_currentCompositionLocalMap_fmcf79_k$();
        // Inline function 'androidx.compose.runtime.ReusableComposeNode$composable' call
        var factory_6 = Companion_getInstance_3().get_Constructor_f7ieep_k$();
        var skippableUpdate_6 = materializerOf(modifier_21);
        var $changed_15 = 6 | 7168 & $changed_14 << 9;
        var $composer_39 = $composer_38;
        var tmp_21 = $composer_39.get_applier_bupu8u_k$();
        if (!isInterface(tmp_21, Applier)) {
          invalidApplier();
        }
        $composer_39.startReusableNode_jjgeyp_k$();
        if ($composer_39.get_inserting_25mlsw_k$()) {
          $composer_39.createNode_ahrd54_k$(factory_6);
        } else {
          $composer_39.useNode_io5s9l_k$();
        }
        // Inline function 'androidx.compose.ui.layout.Layout$composable.<anonymous>' call
        var $this$ReusableComposeNode_6 = _Updater___init__impl__rbfxm8($composer_39);
        Updater__set_impl_v7kwss($this$ReusableComposeNode_6, measurePolicy_6, Companion_getInstance_3().get_SetMeasurePolicy_on6ujt_k$());
        Updater__set_impl_v7kwss($this$ReusableComposeNode_6, localMap_6, Companion_getInstance_3().get_SetResolvedCompositionLocals_rc2u9t_k$());
        // Inline function 'androidx.compose.runtime.Updater.set' call
        var block_6 = Companion_getInstance_3().get_SetCompositeKeyHash_n8lgg1_k$();
        // Inline function 'kotlin.with' call
        // Inline function 'kotlin.contracts.contract' call
        var $this$with_6 = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_6);
        var tmp_22;
        if ($this$with_6.get_inserting_25mlsw_k$() ? true : !equals($this$with_6.rememberedValue_4dg93v_k$(), compositeKeyHash_6)) {
          $this$with_6.updateRememberedValue_l1wh71_k$(compositeKeyHash_6);
          _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_6).apply_pk82p8_k$(compositeKeyHash_6, block_6);
          tmp_22 = Unit_getInstance();
        }
        skippableUpdate_6(new SkippableUpdater(_SkippableUpdater___init__impl__4ft0t9($composer_39)), $composer_39, 112 & $changed_15 >> 3);
        $composer_39.startReplaceableGroup_ip860b_k$(2058660585);
        // Inline function 'androidx.compose.foundation.layout.Box$composable.<anonymous>' call
        var $composer_40 = $composer_39;
        sourceInformationMarkerStart($composer_40, -1851536925, 'C71@3331L9:Box.kt#2w3rfo');
        // Inline function 'androidx.compose.material3.TextFieldLayout$composable.<anonymous>.<anonymous>' call
        BoxScopeInstance_getInstance();
        var $composer_41 = $composer_40;
        sourceInformationMarkerStart($composer_41, -368042273, 'C621@28698L12:TextField.kt#uh7d8r');
        supporting($composer_41, 14 & $dirty1 >> 3);
        sourceInformationMarkerEnd($composer_41);
        sourceInformationMarkerEnd($composer_40);
        $composer_39.endReplaceableGroup_ern0ak_k$();
        $composer_39.endNode_3m0yfn_k$();
        $composer_38.endReplaceableGroup_ern0ak_k$();
        $composer_37.endReplaceableGroup_ern0ak_k$();
      }
      $composer_6.endReplaceableGroup_ern0ak_k$();
      sourceInformationMarkerEnd($composer_6);
      $composer_5.endReplaceableGroup_ern0ak_k$();
      $composer_5.endNode_3m0yfn_k$();
      $composer_4.endReplaceableGroup_ern0ak_k$();
      if (isTraceInProgress()) {
        traceEventEnd();
      }
    } else {
      $composer_0.skipToGroupEnd_lh3zi2_k$();
    }
    var tmp0_safe_receiver = $composer_0.endRestartGroup_yxpjv9_k$();
    if (tmp0_safe_receiver === null)
      null;
    else {
      tmp0_safe_receiver.updateScope_t8jcf_k$(TextFieldLayout$composable$lambda(modifier, textField, label, placeholder, leading, trailing, prefix, suffix, singleLine, animationProgress, container, supporting, paddingValues, $changed, $changed1));
    }
  }
  function _get_singleLine__awe4rz_0($this) {
    return $this.singleLine_1;
  }
  function _get_animationProgress__6qh674_0($this) {
    return $this.animationProgress_1;
  }
  function _get_paddingValues__qy7l9e_0($this) {
    return $this.paddingValues_1;
  }
  function intrinsicWidth_0($this, measurables, height, intrinsicMeasurer) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.collections.first' call
      var tmp0_iterator = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator.hasNext_bitz1p_k$()) {
        var element = tmp0_iterator.next_20eer_k$();
        // Inline function 'androidx.compose.material3.TextFieldMeasurePolicy.intrinsicWidth.<anonymous>' call
        if (equals(get_layoutId_0(element), get_TextFieldId())) {
          tmp$ret$1 = element;
          break $l$block;
        }
      }
      throw NoSuchElementException_init_$Create$('Collection contains no element matching the predicate.');
    }
    var textFieldWidth = intrinsicMeasurer(tmp$ret$1, height);
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$3;
    $l$block_0: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator_0 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_0.hasNext_bitz1p_k$()) {
        var element_0 = tmp0_iterator_0.next_20eer_k$();
        // Inline function 'androidx.compose.material3.TextFieldMeasurePolicy.intrinsicWidth.<anonymous>' call
        if (equals(get_layoutId_0(element_0), get_LabelId())) {
          tmp$ret$3 = element_0;
          break $l$block_0;
        }
      }
      tmp$ret$3 = null;
    }
    var tmp0_safe_receiver = tmp$ret$3;
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.material3.TextFieldMeasurePolicy.intrinsicWidth.<anonymous>' call
      tmp = intrinsicMeasurer(tmp0_safe_receiver, height);
    }
    var tmp1_elvis_lhs = tmp;
    var labelWidth = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$8;
    $l$block_1: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator_1 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_1.hasNext_bitz1p_k$()) {
        var element_1 = tmp0_iterator_1.next_20eer_k$();
        // Inline function 'androidx.compose.material3.TextFieldMeasurePolicy.intrinsicWidth.<anonymous>' call
        if (equals(get_layoutId_0(element_1), get_TrailingId())) {
          tmp$ret$8 = element_1;
          break $l$block_1;
        }
      }
      tmp$ret$8 = null;
    }
    var tmp2_safe_receiver = tmp$ret$8;
    var tmp_0;
    if (tmp2_safe_receiver == null) {
      tmp_0 = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.material3.TextFieldMeasurePolicy.intrinsicWidth.<anonymous>' call
      tmp_0 = intrinsicMeasurer(tmp2_safe_receiver, height);
    }
    var tmp3_elvis_lhs = tmp_0;
    var trailingWidth = tmp3_elvis_lhs == null ? 0 : tmp3_elvis_lhs;
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$13;
    $l$block_2: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator_2 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_2.hasNext_bitz1p_k$()) {
        var element_2 = tmp0_iterator_2.next_20eer_k$();
        // Inline function 'androidx.compose.material3.TextFieldMeasurePolicy.intrinsicWidth.<anonymous>' call
        if (equals(get_layoutId_0(element_2), get_PrefixId())) {
          tmp$ret$13 = element_2;
          break $l$block_2;
        }
      }
      tmp$ret$13 = null;
    }
    var tmp4_safe_receiver = tmp$ret$13;
    var tmp_1;
    if (tmp4_safe_receiver == null) {
      tmp_1 = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.material3.TextFieldMeasurePolicy.intrinsicWidth.<anonymous>' call
      tmp_1 = intrinsicMeasurer(tmp4_safe_receiver, height);
    }
    var tmp5_elvis_lhs = tmp_1;
    var prefixWidth = tmp5_elvis_lhs == null ? 0 : tmp5_elvis_lhs;
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$18;
    $l$block_3: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator_3 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_3.hasNext_bitz1p_k$()) {
        var element_3 = tmp0_iterator_3.next_20eer_k$();
        // Inline function 'androidx.compose.material3.TextFieldMeasurePolicy.intrinsicWidth.<anonymous>' call
        if (equals(get_layoutId_0(element_3), get_SuffixId())) {
          tmp$ret$18 = element_3;
          break $l$block_3;
        }
      }
      tmp$ret$18 = null;
    }
    var tmp6_safe_receiver = tmp$ret$18;
    var tmp_2;
    if (tmp6_safe_receiver == null) {
      tmp_2 = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.material3.TextFieldMeasurePolicy.intrinsicWidth.<anonymous>' call
      tmp_2 = intrinsicMeasurer(tmp6_safe_receiver, height);
    }
    var tmp7_elvis_lhs = tmp_2;
    var suffixWidth = tmp7_elvis_lhs == null ? 0 : tmp7_elvis_lhs;
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$23;
    $l$block_4: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator_4 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_4.hasNext_bitz1p_k$()) {
        var element_4 = tmp0_iterator_4.next_20eer_k$();
        // Inline function 'androidx.compose.material3.TextFieldMeasurePolicy.intrinsicWidth.<anonymous>' call
        if (equals(get_layoutId_0(element_4), get_LeadingId())) {
          tmp$ret$23 = element_4;
          break $l$block_4;
        }
      }
      tmp$ret$23 = null;
    }
    var tmp8_safe_receiver = tmp$ret$23;
    var tmp_3;
    if (tmp8_safe_receiver == null) {
      tmp_3 = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.material3.TextFieldMeasurePolicy.intrinsicWidth.<anonymous>' call
      tmp_3 = intrinsicMeasurer(tmp8_safe_receiver, height);
    }
    var tmp9_elvis_lhs = tmp_3;
    var leadingWidth = tmp9_elvis_lhs == null ? 0 : tmp9_elvis_lhs;
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$28;
    $l$block_5: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator_5 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_5.hasNext_bitz1p_k$()) {
        var element_5 = tmp0_iterator_5.next_20eer_k$();
        // Inline function 'androidx.compose.material3.TextFieldMeasurePolicy.intrinsicWidth.<anonymous>' call
        if (equals(get_layoutId_0(element_5), get_PlaceholderId())) {
          tmp$ret$28 = element_5;
          break $l$block_5;
        }
      }
      tmp$ret$28 = null;
    }
    var tmp10_safe_receiver = tmp$ret$28;
    var tmp_4;
    if (tmp10_safe_receiver == null) {
      tmp_4 = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.material3.TextFieldMeasurePolicy.intrinsicWidth.<anonymous>' call
      tmp_4 = intrinsicMeasurer(tmp10_safe_receiver, height);
    }
    var tmp11_elvis_lhs = tmp_4;
    var placeholderWidth = tmp11_elvis_lhs == null ? 0 : tmp11_elvis_lhs;
    return calculateWidth_0(leadingWidth, trailingWidth, prefixWidth, suffixWidth, textFieldWidth, labelWidth, placeholderWidth, get_ZeroConstraints());
  }
  function intrinsicHeight_0(_this__u8e3s4, $this, measurables, width, intrinsicMeasurer) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.collections.first' call
      var tmp0_iterator = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator.hasNext_bitz1p_k$()) {
        var element = tmp0_iterator.next_20eer_k$();
        // Inline function 'androidx.compose.material3.TextFieldMeasurePolicy.intrinsicHeight.<anonymous>' call
        if (equals(get_layoutId_0(element), get_TextFieldId())) {
          tmp$ret$1 = element;
          break $l$block;
        }
      }
      throw NoSuchElementException_init_$Create$('Collection contains no element matching the predicate.');
    }
    var textFieldHeight = intrinsicMeasurer(tmp$ret$1, width);
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$3;
    $l$block_0: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator_0 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_0.hasNext_bitz1p_k$()) {
        var element_0 = tmp0_iterator_0.next_20eer_k$();
        // Inline function 'androidx.compose.material3.TextFieldMeasurePolicy.intrinsicHeight.<anonymous>' call
        if (equals(get_layoutId_0(element_0), get_LabelId())) {
          tmp$ret$3 = element_0;
          break $l$block_0;
        }
      }
      tmp$ret$3 = null;
    }
    var tmp0_safe_receiver = tmp$ret$3;
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.material3.TextFieldMeasurePolicy.intrinsicHeight.<anonymous>' call
      tmp = intrinsicMeasurer(tmp0_safe_receiver, width);
    }
    var tmp1_elvis_lhs = tmp;
    var labelHeight = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$8;
    $l$block_1: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator_1 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_1.hasNext_bitz1p_k$()) {
        var element_1 = tmp0_iterator_1.next_20eer_k$();
        // Inline function 'androidx.compose.material3.TextFieldMeasurePolicy.intrinsicHeight.<anonymous>' call
        if (equals(get_layoutId_0(element_1), get_TrailingId())) {
          tmp$ret$8 = element_1;
          break $l$block_1;
        }
      }
      tmp$ret$8 = null;
    }
    var tmp2_safe_receiver = tmp$ret$8;
    var tmp_0;
    if (tmp2_safe_receiver == null) {
      tmp_0 = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.material3.TextFieldMeasurePolicy.intrinsicHeight.<anonymous>' call
      tmp_0 = intrinsicMeasurer(tmp2_safe_receiver, width);
    }
    var tmp3_elvis_lhs = tmp_0;
    var trailingHeight = tmp3_elvis_lhs == null ? 0 : tmp3_elvis_lhs;
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$13;
    $l$block_2: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator_2 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_2.hasNext_bitz1p_k$()) {
        var element_2 = tmp0_iterator_2.next_20eer_k$();
        // Inline function 'androidx.compose.material3.TextFieldMeasurePolicy.intrinsicHeight.<anonymous>' call
        if (equals(get_layoutId_0(element_2), get_LeadingId())) {
          tmp$ret$13 = element_2;
          break $l$block_2;
        }
      }
      tmp$ret$13 = null;
    }
    var tmp4_safe_receiver = tmp$ret$13;
    var tmp_1;
    if (tmp4_safe_receiver == null) {
      tmp_1 = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.material3.TextFieldMeasurePolicy.intrinsicHeight.<anonymous>' call
      tmp_1 = intrinsicMeasurer(tmp4_safe_receiver, width);
    }
    var tmp5_elvis_lhs = tmp_1;
    var leadingHeight = tmp5_elvis_lhs == null ? 0 : tmp5_elvis_lhs;
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$18;
    $l$block_3: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator_3 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_3.hasNext_bitz1p_k$()) {
        var element_3 = tmp0_iterator_3.next_20eer_k$();
        // Inline function 'androidx.compose.material3.TextFieldMeasurePolicy.intrinsicHeight.<anonymous>' call
        if (equals(get_layoutId_0(element_3), get_PrefixId())) {
          tmp$ret$18 = element_3;
          break $l$block_3;
        }
      }
      tmp$ret$18 = null;
    }
    var tmp6_safe_receiver = tmp$ret$18;
    var tmp_2;
    if (tmp6_safe_receiver == null) {
      tmp_2 = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.material3.TextFieldMeasurePolicy.intrinsicHeight.<anonymous>' call
      tmp_2 = intrinsicMeasurer(tmp6_safe_receiver, width);
    }
    var tmp7_elvis_lhs = tmp_2;
    var prefixHeight = tmp7_elvis_lhs == null ? 0 : tmp7_elvis_lhs;
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$23;
    $l$block_4: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator_4 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_4.hasNext_bitz1p_k$()) {
        var element_4 = tmp0_iterator_4.next_20eer_k$();
        // Inline function 'androidx.compose.material3.TextFieldMeasurePolicy.intrinsicHeight.<anonymous>' call
        if (equals(get_layoutId_0(element_4), get_SuffixId())) {
          tmp$ret$23 = element_4;
          break $l$block_4;
        }
      }
      tmp$ret$23 = null;
    }
    var tmp8_safe_receiver = tmp$ret$23;
    var tmp_3;
    if (tmp8_safe_receiver == null) {
      tmp_3 = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.material3.TextFieldMeasurePolicy.intrinsicHeight.<anonymous>' call
      tmp_3 = intrinsicMeasurer(tmp8_safe_receiver, width);
    }
    var tmp9_elvis_lhs = tmp_3;
    var suffixHeight = tmp9_elvis_lhs == null ? 0 : tmp9_elvis_lhs;
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$28;
    $l$block_5: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator_5 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_5.hasNext_bitz1p_k$()) {
        var element_5 = tmp0_iterator_5.next_20eer_k$();
        // Inline function 'androidx.compose.material3.TextFieldMeasurePolicy.intrinsicHeight.<anonymous>' call
        if (equals(get_layoutId_0(element_5), get_PlaceholderId())) {
          tmp$ret$28 = element_5;
          break $l$block_5;
        }
      }
      tmp$ret$28 = null;
    }
    var tmp10_safe_receiver = tmp$ret$28;
    var tmp_4;
    if (tmp10_safe_receiver == null) {
      tmp_4 = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.material3.TextFieldMeasurePolicy.intrinsicHeight.<anonymous>' call
      tmp_4 = intrinsicMeasurer(tmp10_safe_receiver, width);
    }
    var tmp11_elvis_lhs = tmp_4;
    var placeholderHeight = tmp11_elvis_lhs == null ? 0 : tmp11_elvis_lhs;
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$33;
    $l$block_6: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator_6 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_6.hasNext_bitz1p_k$()) {
        var element_6 = tmp0_iterator_6.next_20eer_k$();
        // Inline function 'androidx.compose.material3.TextFieldMeasurePolicy.intrinsicHeight.<anonymous>' call
        if (equals(get_layoutId_0(element_6), get_SupportingId())) {
          tmp$ret$33 = element_6;
          break $l$block_6;
        }
      }
      tmp$ret$33 = null;
    }
    var tmp12_safe_receiver = tmp$ret$33;
    var tmp_5;
    if (tmp12_safe_receiver == null) {
      tmp_5 = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.material3.TextFieldMeasurePolicy.intrinsicHeight.<anonymous>' call
      tmp_5 = intrinsicMeasurer(tmp12_safe_receiver, width);
    }
    var tmp13_elvis_lhs = tmp_5;
    var supportingHeight = tmp13_elvis_lhs == null ? 0 : tmp13_elvis_lhs;
    return calculateHeight_0(textFieldHeight, labelHeight, leadingHeight, trailingHeight, prefixHeight, suffixHeight, placeholderHeight, supportingHeight, $this.animationProgress_1 === 1.0, get_ZeroConstraints(), _this__u8e3s4.get_density_qy0267_k$(), $this.paddingValues_1);
  }
  function TextFieldMeasurePolicy$measure$lambda($labelPlaceable, $width, $totalHeight, $textFieldPlaceable, $placeholderPlaceable, $leadingPlaceable, $trailingPlaceable, $prefixPlaceable, $suffixPlaceable, $containerPlaceable, $supportingPlaceable, this$0, $topPaddingValue, $this_measure) {
    return function ($this$layout) {
      var tmp;
      if (!($labelPlaceable == null)) {
        placeWithLabel($this$layout, $width, $totalHeight, $textFieldPlaceable, $labelPlaceable, $placeholderPlaceable, $leadingPlaceable, $trailingPlaceable, $prefixPlaceable, $suffixPlaceable, $containerPlaceable, $supportingPlaceable, this$0.singleLine_1, $topPaddingValue, $topPaddingValue + $labelPlaceable.get_height_e7t92o_k$() | 0, this$0.animationProgress_1, $this_measure.get_density_qy0267_k$());
        tmp = Unit_getInstance();
      } else {
        placeWithoutLabel($this$layout, $width, $totalHeight, $textFieldPlaceable, $placeholderPlaceable, $leadingPlaceable, $trailingPlaceable, $prefixPlaceable, $suffixPlaceable, $containerPlaceable, $supportingPlaceable, this$0.singleLine_1, $this_measure.get_density_qy0267_k$(), this$0.paddingValues_1);
        tmp = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function TextFieldMeasurePolicy$maxIntrinsicHeight$lambda(intrinsicMeasurable, w) {
    return intrinsicMeasurable.maxIntrinsicHeight_b0krtc_k$(w);
  }
  function TextFieldMeasurePolicy$minIntrinsicHeight$lambda(intrinsicMeasurable, w) {
    return intrinsicMeasurable.minIntrinsicHeight_p2a4ou_k$(w);
  }
  function TextFieldMeasurePolicy$maxIntrinsicWidth$lambda(intrinsicMeasurable, h) {
    return intrinsicMeasurable.maxIntrinsicWidth_b8umbx_k$(h);
  }
  function TextFieldMeasurePolicy$minIntrinsicWidth$lambda(intrinsicMeasurable, h) {
    return intrinsicMeasurable.minIntrinsicWidth_jyhjuj_k$(h);
  }
  function TextFieldMeasurePolicy(singleLine, animationProgress, paddingValues) {
    this.singleLine_1 = singleLine;
    this.animationProgress_1 = animationProgress;
    this.paddingValues_1 = paddingValues;
  }
  protoOf(TextFieldMeasurePolicy).measure_xg9b01_k$ = function (_this__u8e3s4, measurables, constraints) {
    var topPaddingValue = _this__u8e3s4.roundToPx_yb7vg8_k$(this.paddingValues_1.calculateTopPadding_vlylwf_k$());
    var bottomPaddingValue = _this__u8e3s4.roundToPx_yb7vg8_k$(this.paddingValues_1.calculateBottomPadding_6z7ugt_k$());
    var occupiedSpaceHorizontally = 0;
    var occupiedSpaceVertically = 0;
    var looseConstraints = Constraints__copy$default_impl_f452rp(constraints, 0, VOID, 0);
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator.hasNext_bitz1p_k$()) {
        var element = tmp0_iterator.next_20eer_k$();
        // Inline function 'androidx.compose.material3.TextFieldMeasurePolicy.measure.<anonymous>' call
        if (equals(get_layoutId(element), get_LeadingId())) {
          tmp$ret$1 = element;
          break $l$block;
        }
      }
      tmp$ret$1 = null;
    }
    var tmp0_safe_receiver = tmp$ret$1;
    var leadingPlaceable = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.measure_4dmfk1_k$(looseConstraints);
    occupiedSpaceHorizontally = occupiedSpaceHorizontally + widthOrZero(leadingPlaceable) | 0;
    // Inline function 'kotlin.math.max' call
    var a = occupiedSpaceVertically;
    var b = heightOrZero(leadingPlaceable);
    occupiedSpaceVertically = Math.max(a, b);
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$5;
    $l$block_0: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator_0 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_0.hasNext_bitz1p_k$()) {
        var element_0 = tmp0_iterator_0.next_20eer_k$();
        // Inline function 'androidx.compose.material3.TextFieldMeasurePolicy.measure.<anonymous>' call
        if (equals(get_layoutId(element_0), get_TrailingId())) {
          tmp$ret$5 = element_0;
          break $l$block_0;
        }
      }
      tmp$ret$5 = null;
    }
    var tmp1_safe_receiver = tmp$ret$5;
    var trailingPlaceable = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.measure_4dmfk1_k$(offset(looseConstraints, -occupiedSpaceHorizontally | 0));
    occupiedSpaceHorizontally = occupiedSpaceHorizontally + widthOrZero(trailingPlaceable) | 0;
    // Inline function 'kotlin.math.max' call
    var a_0 = occupiedSpaceVertically;
    var b_0 = heightOrZero(trailingPlaceable);
    occupiedSpaceVertically = Math.max(a_0, b_0);
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$9;
    $l$block_1: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator_1 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_1.hasNext_bitz1p_k$()) {
        var element_1 = tmp0_iterator_1.next_20eer_k$();
        // Inline function 'androidx.compose.material3.TextFieldMeasurePolicy.measure.<anonymous>' call
        if (equals(get_layoutId(element_1), get_PrefixId())) {
          tmp$ret$9 = element_1;
          break $l$block_1;
        }
      }
      tmp$ret$9 = null;
    }
    var tmp2_safe_receiver = tmp$ret$9;
    var prefixPlaceable = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.measure_4dmfk1_k$(offset(looseConstraints, -occupiedSpaceHorizontally | 0));
    occupiedSpaceHorizontally = occupiedSpaceHorizontally + widthOrZero(prefixPlaceable) | 0;
    // Inline function 'kotlin.math.max' call
    var a_1 = occupiedSpaceVertically;
    var b_1 = heightOrZero(prefixPlaceable);
    occupiedSpaceVertically = Math.max(a_1, b_1);
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$13;
    $l$block_2: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator_2 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_2.hasNext_bitz1p_k$()) {
        var element_2 = tmp0_iterator_2.next_20eer_k$();
        // Inline function 'androidx.compose.material3.TextFieldMeasurePolicy.measure.<anonymous>' call
        if (equals(get_layoutId(element_2), get_SuffixId())) {
          tmp$ret$13 = element_2;
          break $l$block_2;
        }
      }
      tmp$ret$13 = null;
    }
    var tmp3_safe_receiver = tmp$ret$13;
    var suffixPlaceable = tmp3_safe_receiver == null ? null : tmp3_safe_receiver.measure_4dmfk1_k$(offset(looseConstraints, -occupiedSpaceHorizontally | 0));
    occupiedSpaceHorizontally = occupiedSpaceHorizontally + widthOrZero(suffixPlaceable) | 0;
    // Inline function 'kotlin.math.max' call
    var a_2 = occupiedSpaceVertically;
    var b_2 = heightOrZero(suffixPlaceable);
    occupiedSpaceVertically = Math.max(a_2, b_2);
    var tmp4_vertical = -bottomPaddingValue | 0;
    var tmp5_horizontal = -occupiedSpaceHorizontally | 0;
    var labelConstraints = offset(looseConstraints, tmp5_horizontal, tmp4_vertical);
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$17;
    $l$block_3: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator_3 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_3.hasNext_bitz1p_k$()) {
        var element_3 = tmp0_iterator_3.next_20eer_k$();
        // Inline function 'androidx.compose.material3.TextFieldMeasurePolicy.measure.<anonymous>' call
        if (equals(get_layoutId(element_3), get_LabelId())) {
          tmp$ret$17 = element_3;
          break $l$block_3;
        }
      }
      tmp$ret$17 = null;
    }
    var tmp6_safe_receiver = tmp$ret$17;
    var labelPlaceable = tmp6_safe_receiver == null ? null : tmp6_safe_receiver.measure_4dmfk1_k$(labelConstraints);
    var effectiveTopOffset = topPaddingValue + heightOrZero(labelPlaceable) | 0;
    var verticalConstraintOffset = (-effectiveTopOffset | 0) - bottomPaddingValue | 0;
    var tmp7_$receiver = Constraints__copy$default_impl_f452rp(constraints, VOID, VOID, 0);
    var tmp8_horizontal = -occupiedSpaceHorizontally | 0;
    var textFieldConstraints = offset(tmp7_$receiver, tmp8_horizontal, verticalConstraintOffset);
    var tmp$ret$20;
    $l$block_4: {
      // Inline function 'kotlin.collections.first' call
      var tmp0_iterator_4 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_4.hasNext_bitz1p_k$()) {
        var element_4 = tmp0_iterator_4.next_20eer_k$();
        // Inline function 'androidx.compose.material3.TextFieldMeasurePolicy.measure.<anonymous>' call
        if (equals(get_layoutId(element_4), get_TextFieldId())) {
          tmp$ret$20 = element_4;
          break $l$block_4;
        }
      }
      throw NoSuchElementException_init_$Create$('Collection contains no element matching the predicate.');
    }
    var textFieldPlaceable = tmp$ret$20.measure_4dmfk1_k$(textFieldConstraints);
    var placeholderConstraints = Constraints__copy$default_impl_f452rp(textFieldConstraints, 0);
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$22;
    $l$block_5: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator_5 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_5.hasNext_bitz1p_k$()) {
        var element_5 = tmp0_iterator_5.next_20eer_k$();
        // Inline function 'androidx.compose.material3.TextFieldMeasurePolicy.measure.<anonymous>' call
        if (equals(get_layoutId(element_5), get_PlaceholderId())) {
          tmp$ret$22 = element_5;
          break $l$block_5;
        }
      }
      tmp$ret$22 = null;
    }
    var tmp9_safe_receiver = tmp$ret$22;
    var placeholderPlaceable = tmp9_safe_receiver == null ? null : tmp9_safe_receiver.measure_4dmfk1_k$(placeholderConstraints);
    // Inline function 'kotlin.math.max' call
    var a_3 = occupiedSpaceVertically;
    // Inline function 'kotlin.math.max' call
    var a_4 = heightOrZero(textFieldPlaceable);
    var b_3 = heightOrZero(placeholderPlaceable);
    var b_4 = (Math.max(a_4, b_3) + effectiveTopOffset | 0) + bottomPaddingValue | 0;
    occupiedSpaceVertically = Math.max(a_3, b_4);
    var supportingConstraints = Constraints__copy$default_impl_f452rp(offset(looseConstraints, VOID, -occupiedSpaceVertically | 0), VOID, VOID, 0);
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$27;
    $l$block_6: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator_6 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_6.hasNext_bitz1p_k$()) {
        var element_6 = tmp0_iterator_6.next_20eer_k$();
        // Inline function 'androidx.compose.material3.TextFieldMeasurePolicy.measure.<anonymous>' call
        if (equals(get_layoutId(element_6), get_SupportingId())) {
          tmp$ret$27 = element_6;
          break $l$block_6;
        }
      }
      tmp$ret$27 = null;
    }
    var tmp10_safe_receiver = tmp$ret$27;
    var supportingPlaceable = tmp10_safe_receiver == null ? null : tmp10_safe_receiver.measure_4dmfk1_k$(supportingConstraints);
    var supportingHeight = heightOrZero(supportingPlaceable);
    var width = calculateWidth_0(widthOrZero(leadingPlaceable), widthOrZero(trailingPlaceable), widthOrZero(prefixPlaceable), widthOrZero(suffixPlaceable), textFieldPlaceable.get_width_j0q4yl_k$(), widthOrZero(labelPlaceable), widthOrZero(placeholderPlaceable), constraints);
    var totalHeight = calculateHeight_0(textFieldPlaceable.get_height_e7t92o_k$(), heightOrZero(labelPlaceable), heightOrZero(leadingPlaceable), heightOrZero(trailingPlaceable), heightOrZero(prefixPlaceable), heightOrZero(suffixPlaceable), heightOrZero(placeholderPlaceable), heightOrZero(supportingPlaceable), this.animationProgress_1 === 1.0, constraints, _this__u8e3s4.get_density_qy0267_k$(), this.paddingValues_1);
    var height = totalHeight - supportingHeight | 0;
    var tmp$ret$30;
    $l$block_7: {
      // Inline function 'kotlin.collections.first' call
      var tmp0_iterator_7 = measurables.iterator_jk1svi_k$();
      while (tmp0_iterator_7.hasNext_bitz1p_k$()) {
        var element_7 = tmp0_iterator_7.next_20eer_k$();
        // Inline function 'androidx.compose.material3.TextFieldMeasurePolicy.measure.<anonymous>' call
        if (equals(get_layoutId(element_7), get_ContainerId())) {
          tmp$ret$30 = element_7;
          break $l$block_7;
        }
      }
      throw NoSuchElementException_init_$Create$('Collection contains no element matching the predicate.');
    }
    var containerPlaceable = tmp$ret$30.measure_4dmfk1_k$(Constraints(!(width === Companion_getInstance_4().get_Infinity_rvchkf_k$()) ? width : 0, width, !(height === Companion_getInstance_4().get_Infinity_rvchkf_k$()) ? height : 0, height));
    return _this__u8e3s4.layout$default_n19e5l_k$(width, totalHeight, VOID, TextFieldMeasurePolicy$measure$lambda(labelPlaceable, width, totalHeight, textFieldPlaceable, placeholderPlaceable, leadingPlaceable, trailingPlaceable, prefixPlaceable, suffixPlaceable, containerPlaceable, supportingPlaceable, this, topPaddingValue, _this__u8e3s4));
  };
  protoOf(TextFieldMeasurePolicy).maxIntrinsicHeight_3a4xm1_k$ = function (_this__u8e3s4, measurables, width) {
    return intrinsicHeight_0(_this__u8e3s4, this, measurables, width, TextFieldMeasurePolicy$maxIntrinsicHeight$lambda);
  };
  protoOf(TextFieldMeasurePolicy).minIntrinsicHeight_xlhgwn_k$ = function (_this__u8e3s4, measurables, width) {
    return intrinsicHeight_0(_this__u8e3s4, this, measurables, width, TextFieldMeasurePolicy$minIntrinsicHeight$lambda);
  };
  protoOf(TextFieldMeasurePolicy).maxIntrinsicWidth_cx7ze4_k$ = function (_this__u8e3s4, measurables, height) {
    return intrinsicWidth_0(this, measurables, height, TextFieldMeasurePolicy$maxIntrinsicWidth$lambda);
  };
  protoOf(TextFieldMeasurePolicy).minIntrinsicWidth_dwfcse_k$ = function (_this__u8e3s4, measurables, height) {
    return intrinsicWidth_0(this, measurables, height, TextFieldMeasurePolicy$minIntrinsicWidth$lambda);
  };
  function calculateWidth_0(leadingWidth, trailingWidth, prefixWidth, suffixWidth, textFieldWidth, labelWidth, placeholderWidth, constraints) {
    _init_properties_TextField_kt__b1se5h();
    var affixTotalWidth = prefixWidth + suffixWidth | 0;
    // Inline function 'kotlin.comparisons.maxOf' call
    var a = textFieldWidth + affixTotalWidth | 0;
    var b = placeholderWidth + affixTotalWidth | 0;
    var middleSection = Math.max(a, b, labelWidth);
    var wrappedWidth = (leadingWidth + middleSection | 0) + trailingWidth | 0;
    // Inline function 'kotlin.math.max' call
    var b_0 = _Constraints___get_minWidth__impl__hi9lfi(constraints);
    return Math.max(wrappedWidth, b_0);
  }
  function calculateHeight_0(textFieldHeight, labelHeight, leadingHeight, trailingHeight, prefixHeight, suffixHeight, placeholderHeight, supportingHeight, isLabelFocused, constraints, density, paddingValues) {
    _init_properties_TextField_kt__b1se5h();
    var hasLabel = labelHeight > 0;
    var tmp;
    if (!hasLabel ? true : isLabelFocused) {
      // Inline function 'androidx.compose.ui.unit.Dp.plus' call
      var this_0 = paddingValues.calculateTopPadding_vlylwf_k$();
      var other = paddingValues.calculateBottomPadding_6z7ugt_k$();
      var tmp$ret$0 = _Dp___init__impl__ms3zkb(_Dp___get_value__impl__geb1vb(this_0) + _Dp___get_value__impl__geb1vb(other));
      tmp = _Dp___get_value__impl__geb1vb(tmp$ret$0);
    } else {
      // Inline function 'androidx.compose.ui.unit.Dp.times' call
      var this_1 = get_TextFieldPadding();
      var tmp$ret$1 = _Dp___init__impl__ms3zkb(_Dp___get_value__impl__geb1vb(this_1) * 2);
      tmp = _Dp___get_value__impl__geb1vb(tmp$ret$1);
    }
    var verticalPadding = density * tmp;
    var tmp_0;
    if (hasLabel ? isLabelFocused : false) {
      var tmp_1 = verticalPadding + labelHeight;
      // Inline function 'kotlin.math.max' call
      tmp_0 = tmp_1 + Math.max(textFieldHeight, placeholderHeight);
    } else {
      // Inline function 'kotlin.comparisons.maxOf' call
      tmp_0 = verticalPadding + Math.max(labelHeight, textFieldHeight, placeholderHeight);
    }
    var middleSectionHeight = tmp_0;
    // Inline function 'kotlin.math.max' call
    var a = _Constraints___get_minHeight__impl__ev4bgx(constraints);
    // Inline function 'kotlin.math.roundToInt' call
    var tmp$ret$4 = roundToInt(middleSectionHeight);
    var b = maxOf(leadingHeight, new Int32Array([trailingHeight, prefixHeight, suffixHeight, tmp$ret$4])) + supportingHeight | 0;
    return Math.max(a, b);
  }
  function placeWithLabel(_this__u8e3s4, width, totalHeight, textfieldPlaceable, labelPlaceable, placeholderPlaceable, leadingPlaceable, trailingPlaceable, prefixPlaceable, suffixPlaceable, containerPlaceable, supportingPlaceable, singleLine, labelEndPosition, textPosition, animationProgress, density) {
    _init_properties_TextField_kt__b1se5h();
    _this__u8e3s4.place$default_gmqxva_k$(containerPlaceable, Companion_getInstance_5().get_Zero_6hc3i8_k$());
    var height = totalHeight - heightOrZero(supportingPlaceable) | 0;
    if (leadingPlaceable == null)
      null;
    else {
      _this__u8e3s4.placeRelative$default_yv6dex_k$(leadingPlaceable, 0, Companion_getInstance_0().get_CenterVertically_dmkbbz_k$().align_k316px_k$(leadingPlaceable.get_height_e7t92o_k$(), height));
    }
    if (trailingPlaceable == null)
      null;
    else {
      _this__u8e3s4.placeRelative$default_yv6dex_k$(trailingPlaceable, width - trailingPlaceable.get_width_j0q4yl_k$() | 0, Companion_getInstance_0().get_CenterVertically_dmkbbz_k$().align_k316px_k$(trailingPlaceable.get_height_e7t92o_k$(), height));
    }
    if (labelPlaceable == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      var tmp;
      if (singleLine) {
        tmp = Companion_getInstance_0().get_CenterVertically_dmkbbz_k$().align_k316px_k$(labelPlaceable.get_height_e7t92o_k$(), height);
      } else {
        // Inline function 'kotlin.math.roundToInt' call
        var this_0 = _Dp___get_value__impl__geb1vb(get_TextFieldPadding()) * density;
        tmp = roundToInt(this_0);
      }
      var startPosition = tmp;
      var distance = startPosition - labelEndPosition | 0;
      // Inline function 'kotlin.math.roundToInt' call
      var this_1 = distance * animationProgress;
      var positionY = startPosition - roundToInt(this_1) | 0;
      _this__u8e3s4.placeRelative$default_yv6dex_k$(labelPlaceable, widthOrZero(leadingPlaceable), positionY);
    }
    if (prefixPlaceable == null)
      null;
    else {
      _this__u8e3s4.placeRelative$default_yv6dex_k$(prefixPlaceable, widthOrZero(leadingPlaceable), textPosition);
    }
    if (suffixPlaceable == null)
      null;
    else {
      _this__u8e3s4.placeRelative$default_yv6dex_k$(suffixPlaceable, (width - widthOrZero(trailingPlaceable) | 0) - suffixPlaceable.get_width_j0q4yl_k$() | 0, textPosition);
    }
    var textHorizontalPosition = widthOrZero(leadingPlaceable) + widthOrZero(prefixPlaceable) | 0;
    _this__u8e3s4.placeRelative$default_yv6dex_k$(textfieldPlaceable, textHorizontalPosition, textPosition);
    if (placeholderPlaceable == null)
      null;
    else {
      _this__u8e3s4.placeRelative$default_yv6dex_k$(placeholderPlaceable, textHorizontalPosition, textPosition);
    }
    if (supportingPlaceable == null)
      null;
    else {
      _this__u8e3s4.placeRelative$default_yv6dex_k$(supportingPlaceable, 0, height);
    }
  }
  function placeWithoutLabel(_this__u8e3s4, width, totalHeight, textPlaceable, placeholderPlaceable, leadingPlaceable, trailingPlaceable, prefixPlaceable, suffixPlaceable, containerPlaceable, supportingPlaceable, singleLine, density, paddingValues) {
    _init_properties_TextField_kt__b1se5h();
    _this__u8e3s4.place$default_gmqxva_k$(containerPlaceable, Companion_getInstance_5().get_Zero_6hc3i8_k$());
    var height = totalHeight - heightOrZero(supportingPlaceable) | 0;
    // Inline function 'kotlin.math.roundToInt' call
    var this_0 = _Dp___get_value__impl__geb1vb(paddingValues.calculateTopPadding_vlylwf_k$()) * density;
    var topPadding = roundToInt(this_0);
    if (leadingPlaceable == null)
      null;
    else {
      _this__u8e3s4.placeRelative$default_yv6dex_k$(leadingPlaceable, 0, Companion_getInstance_0().get_CenterVertically_dmkbbz_k$().align_k316px_k$(leadingPlaceable.get_height_e7t92o_k$(), height));
    }
    if (trailingPlaceable == null)
      null;
    else {
      _this__u8e3s4.placeRelative$default_yv6dex_k$(trailingPlaceable, width - trailingPlaceable.get_width_j0q4yl_k$() | 0, Companion_getInstance_0().get_CenterVertically_dmkbbz_k$().align_k316px_k$(trailingPlaceable.get_height_e7t92o_k$(), height));
    }
    if (prefixPlaceable == null)
      null;
    else {
      _this__u8e3s4.placeRelative$default_yv6dex_k$(prefixPlaceable, widthOrZero(leadingPlaceable), placeWithoutLabel$calculateVerticalPosition(singleLine, height, topPadding, prefixPlaceable));
    }
    if (suffixPlaceable == null)
      null;
    else {
      _this__u8e3s4.placeRelative$default_yv6dex_k$(suffixPlaceable, (width - widthOrZero(trailingPlaceable) | 0) - suffixPlaceable.get_width_j0q4yl_k$() | 0, placeWithoutLabel$calculateVerticalPosition(singleLine, height, topPadding, suffixPlaceable));
    }
    var textHorizontalPosition = widthOrZero(leadingPlaceable) + widthOrZero(prefixPlaceable) | 0;
    _this__u8e3s4.placeRelative$default_yv6dex_k$(textPlaceable, textHorizontalPosition, placeWithoutLabel$calculateVerticalPosition(singleLine, height, topPadding, textPlaceable));
    if (placeholderPlaceable == null)
      null;
    else {
      _this__u8e3s4.placeRelative$default_yv6dex_k$(placeholderPlaceable, textHorizontalPosition, placeWithoutLabel$calculateVerticalPosition(singleLine, height, topPadding, placeholderPlaceable));
    }
    if (supportingPlaceable == null)
      null;
    else {
      _this__u8e3s4.placeRelative$default_yv6dex_k$(supportingPlaceable, 0, height);
    }
  }
  function placeWithoutLabel$calculateVerticalPosition($singleLine, height, topPadding, placeable) {
    var tmp;
    if ($singleLine) {
      tmp = Companion_getInstance_0().get_CenterVertically_dmkbbz_k$().align_k316px_k$(placeable.get_height_e7t92o_k$(), height);
    } else {
      tmp = topPadding;
    }
    return tmp;
  }
  function drawIndicatorLine$lambda($strokeWidthDp, $indicatorBorder) {
    return function ($this$drawWithContent) {
      $this$drawWithContent.drawContent_m0wwjp_k$();
      var tmp;
      if (equals($strokeWidthDp, Companion_getInstance_8().get_Hairline_cy72lg_k$())) {
        return Unit_getInstance();
      }
      var strokeWidth = _Dp___get_value__impl__geb1vb($strokeWidthDp) * $this$drawWithContent.get_density_qy0267_k$();
      var y = _Size___get_height__impl__a04p02($this$drawWithContent.get_size_cxx1ym_k$()) - strokeWidth / 2;
      $this$drawWithContent.drawLine$default_gyf64g_k$($indicatorBorder.get_brush_ipcjyp_k$(), Offset(0.0, y), Offset(_Size___get_width__impl__58y75t($this$drawWithContent.get_size_cxx1ym_k$()), y), strokeWidth);
      return Unit_getInstance();
    };
  }
  function TextFieldLayout$composable$lambda($modifier, $textField, $label, $placeholder, $leading, $trailing, $prefix, $suffix, $singleLine, $animationProgress, $container, $supporting, $paddingValues, $$changed, $$changed1) {
    return function ($composer, $force) {
      TextFieldLayout$composable($modifier, $textField, $label, $placeholder, $leading, $trailing, $prefix, $suffix, $singleLine, $animationProgress, $container, $supporting, $paddingValues, $composer, updateChangedFlags($$changed | 1), updateChangedFlags($$changed1));
      return Unit_getInstance();
    };
  }
  var properties_initialized_TextField_kt_dspx0j;
  function _init_properties_TextField_kt__b1se5h() {
    if (!properties_initialized_TextField_kt_dspx0j) {
      properties_initialized_TextField_kt_dspx0j = true;
      // Inline function 'androidx.compose.ui.unit.dp' call
      TextFieldWithLabelVerticalPadding = _Dp___init__impl__ms3zkb(8);
    }
  }
  function _get_focusedTextColor__fn68yc($this) {
    return $this.focusedTextColor_1;
  }
  function _get_unfocusedTextColor__5fhj7x($this) {
    return $this.unfocusedTextColor_1;
  }
  function _get_disabledTextColor__67t7yh($this) {
    return $this.disabledTextColor_1;
  }
  function _get_errorTextColor__wyqhtp($this) {
    return $this.errorTextColor_1;
  }
  function _get_focusedContainerColor__dm9ut4($this) {
    return $this.focusedContainerColor_1;
  }
  function _get_unfocusedContainerColor__3w81bj($this) {
    return $this.unfocusedContainerColor_1;
  }
  function _get_disabledContainerColor__ptzvm5($this) {
    return $this.disabledContainerColor_1;
  }
  function _get_errorContainerColor__z9w1bt($this) {
    return $this.errorContainerColor_1;
  }
  function _get_cursorColor__9ezk3g($this) {
    return $this.cursorColor_1;
  }
  function _get_errorCursorColor__mgp8gq($this) {
    return $this.errorCursorColor_1;
  }
  function _get_textSelectionColors__hk2gn2($this) {
    return $this.textSelectionColors_1;
  }
  function _get_focusedIndicatorColor__c2ipbu($this) {
    return $this.focusedIndicatorColor_1;
  }
  function _get_unfocusedIndicatorColor__tl0lgh($this) {
    return $this.unfocusedIndicatorColor_1;
  }
  function _get_disabledIndicatorColor__57bh7($this) {
    return $this.disabledIndicatorColor_1;
  }
  function _get_errorIndicatorColor__a2fgid($this) {
    return $this.errorIndicatorColor_1;
  }
  function _get_focusedLeadingIconColor__6wii8m($this) {
    return $this.focusedLeadingIconColor_1;
  }
  function _get_unfocusedLeadingIconColor__agkujz($this) {
    return $this.unfocusedLeadingIconColor_1;
  }
  function _get_disabledLeadingIconColor__oykz6z($this) {
    return $this.disabledLeadingIconColor_1;
  }
  function _get_errorLeadingIconColor__s9c3bv($this) {
    return $this.errorLeadingIconColor_1;
  }
  function _get_focusedTrailingIconColor__7nr7m4($this) {
    return $this.focusedTrailingIconColor_1;
  }
  function _get_unfocusedTrailingIconColor__vl5c6z($this) {
    return $this.unfocusedTrailingIconColor_1;
  }
  function _get_disabledTrailingIconColor__g4j1tt($this) {
    return $this.disabledTrailingIconColor_1;
  }
  function _get_errorTrailingIconColor__w8eym3($this) {
    return $this.errorTrailingIconColor_1;
  }
  function _get_focusedLabelColor__3tk19n($this) {
    return $this.focusedLabelColor_1;
  }
  function _get_unfocusedLabelColor__ypq2v0($this) {
    return $this.unfocusedLabelColor_1;
  }
  function _get_disabledLabelColor__bxbo8w($this) {
    return $this.disabledLabelColor_1;
  }
  function _get_errorLabelColor__j1dxx6($this) {
    return $this.errorLabelColor_1;
  }
  function _get_focusedPlaceholderColor__9mmfmy($this) {
    return $this.focusedPlaceholderColor_1;
  }
  function _get_unfocusedPlaceholderColor__d6oryb($this) {
    return $this.unfocusedPlaceholderColor_1;
  }
  function _get_disabledPlaceholderColor__roowlb($this) {
    return $this.disabledPlaceholderColor_1;
  }
  function _get_errorPlaceholderColor__pj85xj($this) {
    return $this.errorPlaceholderColor_1;
  }
  function _get_focusedSupportingTextColor__k2zo73($this) {
    return $this.focusedSupportingTextColor_1;
  }
  function _get_unfocusedSupportingTextColor__jd3ao6($this) {
    return $this.unfocusedSupportingTextColor_1;
  }
  function _get_disabledSupportingTextColor__i5bm0m($this) {
    return $this.disabledSupportingTextColor_1;
  }
  function _get_errorSupportingTextColor__d5lu9c($this) {
    return $this.errorSupportingTextColor_1;
  }
  function _get_focusedPrefixColor__vbpycv($this) {
    return $this.focusedPrefixColor_1;
  }
  function _get_unfocusedPrefixColor__ieikrs($this) {
    return $this.unfocusedPrefixColor_1;
  }
  function _get_disabledPrefixColor__6tqo2k($this) {
    return $this.disabledPrefixColor_1;
  }
  function _get_errorPrefixColor__e8cu1u($this) {
    return $this.errorPrefixColor_1;
  }
  function _get_focusedSuffixColor__oqhjrk($this) {
    return $this.focusedSuffixColor_1;
  }
  function _get_unfocusedSuffixColor__xdf4mh($this) {
    return $this.unfocusedSuffixColor_1;
  }
  function _get_disabledSuffixColor__855vs5($this) {
    return $this.disabledSuffixColor_1;
  }
  function _get_errorSuffixColor__qjpsv($this) {
    return $this.errorSuffixColor_1;
  }
  function get_$stableprop_5() {
    return 0;
  }
  function leadingIconColor$composable$lambda($focused$delegate) {
    // Inline function 'androidx.compose.runtime.getValue' call
    getLocalDelegateReference('focused', KProperty0, false, function () {
      return THROW_ISE();
    });
    return $focused$delegate.get_value_j01efc_k$();
  }
  function trailingIconColor$composable$lambda($focused$delegate) {
    // Inline function 'androidx.compose.runtime.getValue' call
    getLocalDelegateReference('focused', KProperty0, false, function () {
      return THROW_ISE();
    });
    return $focused$delegate.get_value_j01efc_k$();
  }
  function indicatorColor$composable$lambda($focused$delegate) {
    // Inline function 'androidx.compose.runtime.getValue' call
    getLocalDelegateReference('focused', KProperty0, false, function () {
      return THROW_ISE();
    });
    return $focused$delegate.get_value_j01efc_k$();
  }
  function containerColor$composable$lambda($focused$delegate) {
    // Inline function 'androidx.compose.runtime.getValue' call
    getLocalDelegateReference('focused', KProperty0, false, function () {
      return THROW_ISE();
    });
    return $focused$delegate.get_value_j01efc_k$();
  }
  function placeholderColor$composable$lambda($focused$delegate) {
    // Inline function 'androidx.compose.runtime.getValue' call
    getLocalDelegateReference('focused', KProperty0, false, function () {
      return THROW_ISE();
    });
    return $focused$delegate.get_value_j01efc_k$();
  }
  function labelColor$composable$lambda($focused$delegate) {
    // Inline function 'androidx.compose.runtime.getValue' call
    getLocalDelegateReference('focused', KProperty0, false, function () {
      return THROW_ISE();
    });
    return $focused$delegate.get_value_j01efc_k$();
  }
  function textColor$composable$lambda($focused$delegate) {
    // Inline function 'androidx.compose.runtime.getValue' call
    getLocalDelegateReference('focused', KProperty0, false, function () {
      return THROW_ISE();
    });
    return $focused$delegate.get_value_j01efc_k$();
  }
  function supportingTextColor$composable$lambda($focused$delegate) {
    // Inline function 'androidx.compose.runtime.getValue' call
    getLocalDelegateReference('focused', KProperty0, false, function () {
      return THROW_ISE();
    });
    return $focused$delegate.get_value_j01efc_k$();
  }
  function prefixColor$composable$lambda($focused$delegate) {
    // Inline function 'androidx.compose.runtime.getValue' call
    getLocalDelegateReference('focused', KProperty0, false, function () {
      return THROW_ISE();
    });
    return $focused$delegate.get_value_j01efc_k$();
  }
  function suffixColor$composable$lambda($focused$delegate) {
    // Inline function 'androidx.compose.runtime.getValue' call
    getLocalDelegateReference('focused', KProperty0, false, function () {
      return THROW_ISE();
    });
    return $focused$delegate.get_value_j01efc_k$();
  }
  function TextFieldColors(focusedTextColor, unfocusedTextColor, disabledTextColor, errorTextColor, focusedContainerColor, unfocusedContainerColor, disabledContainerColor, errorContainerColor, cursorColor, errorCursorColor, textSelectionColors, focusedIndicatorColor, unfocusedIndicatorColor, disabledIndicatorColor, errorIndicatorColor, focusedLeadingIconColor, unfocusedLeadingIconColor, disabledLeadingIconColor, errorLeadingIconColor, focusedTrailingIconColor, unfocusedTrailingIconColor, disabledTrailingIconColor, errorTrailingIconColor, focusedLabelColor, unfocusedLabelColor, disabledLabelColor, errorLabelColor, focusedPlaceholderColor, unfocusedPlaceholderColor, disabledPlaceholderColor, errorPlaceholderColor, focusedSupportingTextColor, unfocusedSupportingTextColor, disabledSupportingTextColor, errorSupportingTextColor, focusedPrefixColor, unfocusedPrefixColor, disabledPrefixColor, errorPrefixColor, focusedSuffixColor, unfocusedSuffixColor, disabledSuffixColor, errorSuffixColor) {
    this.focusedTextColor_1 = focusedTextColor;
    this.unfocusedTextColor_1 = unfocusedTextColor;
    this.disabledTextColor_1 = disabledTextColor;
    this.errorTextColor_1 = errorTextColor;
    this.focusedContainerColor_1 = focusedContainerColor;
    this.unfocusedContainerColor_1 = unfocusedContainerColor;
    this.disabledContainerColor_1 = disabledContainerColor;
    this.errorContainerColor_1 = errorContainerColor;
    this.cursorColor_1 = cursorColor;
    this.errorCursorColor_1 = errorCursorColor;
    this.textSelectionColors_1 = textSelectionColors;
    this.focusedIndicatorColor_1 = focusedIndicatorColor;
    this.unfocusedIndicatorColor_1 = unfocusedIndicatorColor;
    this.disabledIndicatorColor_1 = disabledIndicatorColor;
    this.errorIndicatorColor_1 = errorIndicatorColor;
    this.focusedLeadingIconColor_1 = focusedLeadingIconColor;
    this.unfocusedLeadingIconColor_1 = unfocusedLeadingIconColor;
    this.disabledLeadingIconColor_1 = disabledLeadingIconColor;
    this.errorLeadingIconColor_1 = errorLeadingIconColor;
    this.focusedTrailingIconColor_1 = focusedTrailingIconColor;
    this.unfocusedTrailingIconColor_1 = unfocusedTrailingIconColor;
    this.disabledTrailingIconColor_1 = disabledTrailingIconColor;
    this.errorTrailingIconColor_1 = errorTrailingIconColor;
    this.focusedLabelColor_1 = focusedLabelColor;
    this.unfocusedLabelColor_1 = unfocusedLabelColor;
    this.disabledLabelColor_1 = disabledLabelColor;
    this.errorLabelColor_1 = errorLabelColor;
    this.focusedPlaceholderColor_1 = focusedPlaceholderColor;
    this.unfocusedPlaceholderColor_1 = unfocusedPlaceholderColor;
    this.disabledPlaceholderColor_1 = disabledPlaceholderColor;
    this.errorPlaceholderColor_1 = errorPlaceholderColor;
    this.focusedSupportingTextColor_1 = focusedSupportingTextColor;
    this.unfocusedSupportingTextColor_1 = unfocusedSupportingTextColor;
    this.disabledSupportingTextColor_1 = disabledSupportingTextColor;
    this.errorSupportingTextColor_1 = errorSupportingTextColor;
    this.focusedPrefixColor_1 = focusedPrefixColor;
    this.unfocusedPrefixColor_1 = unfocusedPrefixColor;
    this.disabledPrefixColor_1 = disabledPrefixColor;
    this.errorPrefixColor_1 = errorPrefixColor;
    this.focusedSuffixColor_1 = focusedSuffixColor;
    this.unfocusedSuffixColor_1 = unfocusedSuffixColor;
    this.disabledSuffixColor_1 = disabledSuffixColor;
    this.errorSuffixColor_1 = errorSuffixColor;
    this.$stable_1 = 0;
  }
  protoOf(TextFieldColors).leadingIconColor_qcntvr_k$ = function (enabled, isError, interactionSource) {
    illegalDecoyCallException('leadingIconColor');
  };
  protoOf(TextFieldColors).trailingIconColor_wrim8t_k$ = function (enabled, isError, interactionSource) {
    illegalDecoyCallException('trailingIconColor');
  };
  protoOf(TextFieldColors).indicatorColor_kt3nnt_k$ = function (enabled, isError, interactionSource) {
    illegalDecoyCallException('indicatorColor');
  };
  protoOf(TextFieldColors).containerColor_f20qg9_k$ = function (enabled, isError, interactionSource) {
    illegalDecoyCallException('containerColor');
  };
  protoOf(TextFieldColors).placeholderColor_mkxoh1_k$ = function (enabled, isError, interactionSource) {
    illegalDecoyCallException('placeholderColor');
  };
  protoOf(TextFieldColors).labelColor_v5dpzw_k$ = function (enabled, isError, interactionSource) {
    illegalDecoyCallException('labelColor');
  };
  protoOf(TextFieldColors).textColor_no69p1_k$ = function (enabled, isError, interactionSource) {
    illegalDecoyCallException('textColor');
  };
  protoOf(TextFieldColors).supportingTextColor_5yjq8o_k$ = function (enabled, isError, interactionSource) {
    illegalDecoyCallException('supportingTextColor');
  };
  protoOf(TextFieldColors).prefixColor_v15fnq_k$ = function (enabled, isError, interactionSource) {
    illegalDecoyCallException('prefixColor');
  };
  protoOf(TextFieldColors).suffixColor_z4fex3_k$ = function (enabled, isError, interactionSource) {
    illegalDecoyCallException('suffixColor');
  };
  protoOf(TextFieldColors).cursorColor_gqst5k_k$ = function (isError) {
    illegalDecoyCallException('cursorColor');
  };
  protoOf(TextFieldColors).get_selectionColors_1k8g1f_k$ = function () {
    illegalDecoyCallException('<get-selectionColors>');
  };
  protoOf(TextFieldColors).equals = function (other) {
    if (this === other)
      return true;
    var tmp;
    if (other == null) {
      tmp = true;
    } else {
      tmp = !(other instanceof TextFieldColors);
    }
    if (tmp)
      return false;
    if (!equals(this.focusedTextColor_1, other.focusedTextColor_1))
      return false;
    if (!equals(this.unfocusedTextColor_1, other.unfocusedTextColor_1))
      return false;
    if (!equals(this.disabledTextColor_1, other.disabledTextColor_1))
      return false;
    if (!equals(this.errorTextColor_1, other.errorTextColor_1))
      return false;
    if (!equals(this.focusedContainerColor_1, other.focusedContainerColor_1))
      return false;
    if (!equals(this.unfocusedContainerColor_1, other.unfocusedContainerColor_1))
      return false;
    if (!equals(this.disabledContainerColor_1, other.disabledContainerColor_1))
      return false;
    if (!equals(this.errorContainerColor_1, other.errorContainerColor_1))
      return false;
    if (!equals(this.cursorColor_1, other.cursorColor_1))
      return false;
    if (!equals(this.errorCursorColor_1, other.errorCursorColor_1))
      return false;
    if (!this.textSelectionColors_1.equals(other.textSelectionColors_1))
      return false;
    if (!equals(this.focusedIndicatorColor_1, other.focusedIndicatorColor_1))
      return false;
    if (!equals(this.unfocusedIndicatorColor_1, other.unfocusedIndicatorColor_1))
      return false;
    if (!equals(this.disabledIndicatorColor_1, other.disabledIndicatorColor_1))
      return false;
    if (!equals(this.errorIndicatorColor_1, other.errorIndicatorColor_1))
      return false;
    if (!equals(this.focusedLeadingIconColor_1, other.focusedLeadingIconColor_1))
      return false;
    if (!equals(this.unfocusedLeadingIconColor_1, other.unfocusedLeadingIconColor_1))
      return false;
    if (!equals(this.disabledLeadingIconColor_1, other.disabledLeadingIconColor_1))
      return false;
    if (!equals(this.errorLeadingIconColor_1, other.errorLeadingIconColor_1))
      return false;
    if (!equals(this.focusedTrailingIconColor_1, other.focusedTrailingIconColor_1))
      return false;
    if (!equals(this.unfocusedTrailingIconColor_1, other.unfocusedTrailingIconColor_1))
      return false;
    if (!equals(this.disabledTrailingIconColor_1, other.disabledTrailingIconColor_1))
      return false;
    if (!equals(this.errorTrailingIconColor_1, other.errorTrailingIconColor_1))
      return false;
    if (!equals(this.focusedLabelColor_1, other.focusedLabelColor_1))
      return false;
    if (!equals(this.unfocusedLabelColor_1, other.unfocusedLabelColor_1))
      return false;
    if (!equals(this.disabledLabelColor_1, other.disabledLabelColor_1))
      return false;
    if (!equals(this.errorLabelColor_1, other.errorLabelColor_1))
      return false;
    if (!equals(this.focusedPlaceholderColor_1, other.focusedPlaceholderColor_1))
      return false;
    if (!equals(this.unfocusedPlaceholderColor_1, other.unfocusedPlaceholderColor_1))
      return false;
    if (!equals(this.disabledPlaceholderColor_1, other.disabledPlaceholderColor_1))
      return false;
    if (!equals(this.errorPlaceholderColor_1, other.errorPlaceholderColor_1))
      return false;
    if (!equals(this.focusedSupportingTextColor_1, other.focusedSupportingTextColor_1))
      return false;
    if (!equals(this.unfocusedSupportingTextColor_1, other.unfocusedSupportingTextColor_1))
      return false;
    if (!equals(this.disabledSupportingTextColor_1, other.disabledSupportingTextColor_1))
      return false;
    if (!equals(this.errorSupportingTextColor_1, other.errorSupportingTextColor_1))
      return false;
    if (!equals(this.focusedPrefixColor_1, other.focusedPrefixColor_1))
      return false;
    if (!equals(this.unfocusedPrefixColor_1, other.unfocusedPrefixColor_1))
      return false;
    if (!equals(this.disabledPrefixColor_1, other.disabledPrefixColor_1))
      return false;
    if (!equals(this.errorPrefixColor_1, other.errorPrefixColor_1))
      return false;
    if (!equals(this.focusedSuffixColor_1, other.focusedSuffixColor_1))
      return false;
    if (!equals(this.unfocusedSuffixColor_1, other.unfocusedSuffixColor_1))
      return false;
    if (!equals(this.disabledSuffixColor_1, other.disabledSuffixColor_1))
      return false;
    if (!equals(this.errorSuffixColor_1, other.errorSuffixColor_1))
      return false;
    return true;
  };
  protoOf(TextFieldColors).hashCode = function () {
    var result = Color__hashCode_impl_vjyivj(this.focusedTextColor_1);
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.unfocusedTextColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.disabledTextColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.errorTextColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.focusedContainerColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.unfocusedContainerColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.disabledContainerColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.errorContainerColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.cursorColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.errorCursorColor_1) | 0;
    result = imul(31, result) + this.textSelectionColors_1.hashCode() | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.focusedIndicatorColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.unfocusedIndicatorColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.disabledIndicatorColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.errorIndicatorColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.focusedLeadingIconColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.unfocusedLeadingIconColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.disabledLeadingIconColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.errorLeadingIconColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.focusedTrailingIconColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.unfocusedTrailingIconColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.disabledTrailingIconColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.errorTrailingIconColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.focusedLabelColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.unfocusedLabelColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.disabledLabelColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.errorLabelColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.focusedPlaceholderColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.unfocusedPlaceholderColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.disabledPlaceholderColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.errorPlaceholderColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.focusedSupportingTextColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.unfocusedSupportingTextColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.disabledSupportingTextColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.errorSupportingTextColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.focusedPrefixColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.unfocusedPrefixColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.disabledPrefixColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.errorPrefixColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.focusedSuffixColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.unfocusedSuffixColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.disabledSuffixColor_1) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.errorSuffixColor_1) | 0;
    return result;
  };
  protoOf(TextFieldColors).leadingIconColor$composable_yt7eij_k$ = function (enabled, isError, interactionSource, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(1928926212);
    sourceInformation($composer_0, 'C(leadingIconColor$composable)P(!1,2)1753@97489L25,1755@97531L267:TextFieldDefaults.kt#uh7d8r');
    if (isTraceInProgress()) {
      traceEventStart(1928926212, $changed, -1, 'androidx.compose.material3.TextFieldColors.leadingIconColor$composable (TextFieldDefaults.kt:1748)');
    }
    var focused$delegate = collectIsFocusedAsState$composable(interactionSource, $composer_0, 14 & $changed >> 6);
    var tmp0 = rememberUpdatedState$composable(new Color(!enabled ? this.disabledLeadingIconColor_1 : isError ? this.errorLeadingIconColor_1 : leadingIconColor$composable$lambda(focused$delegate) ? this.focusedLeadingIconColor_1 : this.unfocusedLeadingIconColor_1), $composer_0, 0);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0;
  };
  protoOf(TextFieldColors).trailingIconColor$composable_w4yizz_k$ = function (enabled, isError, interactionSource, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(-1677136250);
    sourceInformation($composer_0, 'C(trailingIconColor$composable)P(!1,2)1779@98384L25,1781@98426L271:TextFieldDefaults.kt#uh7d8r');
    if (isTraceInProgress()) {
      traceEventStart(-1677136250, $changed, -1, 'androidx.compose.material3.TextFieldColors.trailingIconColor$composable (TextFieldDefaults.kt:1774)');
    }
    var focused$delegate = collectIsFocusedAsState$composable(interactionSource, $composer_0, 14 & $changed >> 6);
    var tmp0 = rememberUpdatedState$composable(new Color(!enabled ? this.disabledTrailingIconColor_1 : isError ? this.errorTrailingIconColor_1 : trailingIconColor$composable$lambda(focused$delegate) ? this.focusedTrailingIconColor_1 : this.unfocusedTrailingIconColor_1), $composer_0, 0);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0;
  };
  protoOf(TextFieldColors).indicatorColor$composable_dhpqjv_k$ = function (enabled, isError, interactionSource, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(-738828908);
    sourceInformation($composer_0, 'C(indicatorColor$composable)P(!1,2)1805@99283L25:TextFieldDefaults.kt#uh7d8r');
    if (isTraceInProgress()) {
      traceEventStart(-738828908, $changed, -1, 'androidx.compose.material3.TextFieldColors.indicatorColor$composable (TextFieldDefaults.kt:1800)');
    }
    var focused$delegate = collectIsFocusedAsState$composable(interactionSource, $composer_0, 14 & $changed >> 6);
    var targetValue = !enabled ? this.disabledIndicatorColor_1 : isError ? this.errorIndicatorColor_1 : indicatorColor$composable$lambda(focused$delegate) ? this.focusedIndicatorColor_1 : this.unfocusedIndicatorColor_1;
    var tmp;
    if (enabled) {
      $composer_0.startReplaceableGroup_ip860b_k$(2080447103);
      sourceInformation($composer_0, '1814@99574L75');
      var tmp_0 = tween(get_AnimationDuration());
      var tmp1_group = animateColorAsState$composable(targetValue, tmp_0, null, null, $composer_0, 48, 12);
      $composer_0.endReplaceableGroup_ern0ak_k$();
      tmp = tmp1_group;
    } else {
      $composer_0.startReplaceableGroup_ip860b_k$(2080447208);
      sourceInformation($composer_0, '1816@99679L33');
      var tmp2_group = rememberUpdatedState$composable(new Color(targetValue), $composer_0, 0);
      $composer_0.endReplaceableGroup_ern0ak_k$();
      tmp = tmp2_group;
    }
    var tmp0 = tmp;
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0;
  };
  protoOf(TextFieldColors).containerColor$composable_wme525_k$ = function (enabled, isError, interactionSource, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(-2029214238);
    sourceInformation($composer_0, 'C(containerColor$composable)P(!1,2)1834@100289L25,1842@100553L75:TextFieldDefaults.kt#uh7d8r');
    if (isTraceInProgress()) {
      traceEventStart(-2029214238, $changed, -1, 'androidx.compose.material3.TextFieldColors.containerColor$composable (TextFieldDefaults.kt:1829)');
    }
    var focused$delegate = collectIsFocusedAsState$composable(interactionSource, $composer_0, 14 & $changed >> 6);
    var targetValue = !enabled ? this.disabledContainerColor_1 : isError ? this.errorContainerColor_1 : containerColor$composable$lambda(focused$delegate) ? this.focusedContainerColor_1 : this.unfocusedContainerColor_1;
    var tmp = tween(get_AnimationDuration());
    var tmp0 = animateColorAsState$composable(targetValue, tmp, null, null, $composer_0, 48, 12);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0;
  };
  protoOf(TextFieldColors).placeholderColor$composable_kd6i9d_k$ = function (enabled, isError, interactionSource, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(-1466696016);
    sourceInformation($composer_0, 'C(placeholderColor$composable)P(!1,2)1859@101211L25,1867@101483L33:TextFieldDefaults.kt#uh7d8r');
    if (isTraceInProgress()) {
      traceEventStart(-1466696016, $changed, -1, 'androidx.compose.material3.TextFieldColors.placeholderColor$composable (TextFieldDefaults.kt:1854)');
    }
    var focused$delegate = collectIsFocusedAsState$composable(interactionSource, $composer_0, 14 & $changed >> 6);
    var targetValue = !enabled ? this.disabledPlaceholderColor_1 : isError ? this.errorPlaceholderColor_1 : placeholderColor$composable$lambda(focused$delegate) ? this.focusedPlaceholderColor_1 : this.unfocusedPlaceholderColor_1;
    var tmp0 = rememberUpdatedState$composable(new Color(targetValue), $composer_0, 0);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0;
  };
  protoOf(TextFieldColors).labelColor$composable_5qlvjk_k$ = function (enabled, isError, interactionSource, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(-941303153);
    sourceInformation($composer_0, 'C(labelColor$composable)P(!1,2)1884@102087L25,1892@102335L33:TextFieldDefaults.kt#uh7d8r');
    if (isTraceInProgress()) {
      traceEventStart(-941303153, $changed, -1, 'androidx.compose.material3.TextFieldColors.labelColor$composable (TextFieldDefaults.kt:1879)');
    }
    var focused$delegate = collectIsFocusedAsState$composable(interactionSource, $composer_0, 14 & $changed >> 6);
    var targetValue = !enabled ? this.disabledLabelColor_1 : isError ? this.errorLabelColor_1 : labelColor$composable$lambda(focused$delegate) ? this.focusedLabelColor_1 : this.unfocusedLabelColor_1;
    var tmp0 = rememberUpdatedState$composable(new Color(targetValue), $composer_0, 0);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0;
  };
  protoOf(TextFieldColors).textColor$composable_fhzjg7_k$ = function (enabled, isError, interactionSource, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(389936398);
    sourceInformation($composer_0, 'C(textColor$composable)P(!1,2)1909@102944L25,1917@103188L33:TextFieldDefaults.kt#uh7d8r');
    if (isTraceInProgress()) {
      traceEventStart(389936398, $changed, -1, 'androidx.compose.material3.TextFieldColors.textColor$composable (TextFieldDefaults.kt:1904)');
    }
    var focused$delegate = collectIsFocusedAsState$composable(interactionSource, $composer_0, 14 & $changed >> 6);
    var targetValue = !enabled ? this.disabledTextColor_1 : isError ? this.errorTextColor_1 : textColor$composable$lambda(focused$delegate) ? this.focusedTextColor_1 : this.unfocusedTextColor_1;
    var tmp0 = rememberUpdatedState$composable(new Color(targetValue), $composer_0, 0);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0;
  };
  protoOf(TextFieldColors).supportingTextColor$composable_4ozvg_k$ = function (enabled, isError, interactionSource, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(-735962405);
    sourceInformation($composer_0, 'C(supportingTextColor$composable)P(!1,2)1926@103443L25,1928@103485L279:TextFieldDefaults.kt#uh7d8r');
    if (isTraceInProgress()) {
      traceEventStart(-735962405, $changed, -1, 'androidx.compose.material3.TextFieldColors.supportingTextColor$composable (TextFieldDefaults.kt:1921)');
    }
    var focused$delegate = collectIsFocusedAsState$composable(interactionSource, $composer_0, 14 & $changed >> 6);
    var tmp0 = rememberUpdatedState$composable(new Color(!enabled ? this.disabledSupportingTextColor_1 : isError ? this.errorSupportingTextColor_1 : supportingTextColor$composable$lambda(focused$delegate) ? this.focusedSupportingTextColor_1 : this.unfocusedSupportingTextColor_1), $composer_0, 0);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0;
  };
  protoOf(TextFieldColors).prefixColor$composable_bs3i36_k$ = function (enabled, isError, interactionSource, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(1750245513);
    sourceInformation($composer_0, 'C(prefixColor$composable)P(!1,2)1952@104337L25,1960@104589L33:TextFieldDefaults.kt#uh7d8r');
    if (isTraceInProgress()) {
      traceEventStart(1750245513, $changed, -1, 'androidx.compose.material3.TextFieldColors.prefixColor$composable (TextFieldDefaults.kt:1947)');
    }
    var focused$delegate = collectIsFocusedAsState$composable(interactionSource, $composer_0, 14 & $changed >> 6);
    var targetValue = !enabled ? this.disabledPrefixColor_1 : isError ? this.errorPrefixColor_1 : prefixColor$composable$lambda(focused$delegate) ? this.focusedPrefixColor_1 : this.unfocusedPrefixColor_1;
    var tmp0 = rememberUpdatedState$composable(new Color(targetValue), $composer_0, 0);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0;
  };
  protoOf(TextFieldColors).suffixColor$composable_ueuhgt_k$ = function (enabled, isError, interactionSource, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(-1087718038);
    sourceInformation($composer_0, 'C(suffixColor$composable)P(!1,2)1977@105195L25,1985@105447L33:TextFieldDefaults.kt#uh7d8r');
    if (isTraceInProgress()) {
      traceEventStart(-1087718038, $changed, -1, 'androidx.compose.material3.TextFieldColors.suffixColor$composable (TextFieldDefaults.kt:1972)');
    }
    var focused$delegate = collectIsFocusedAsState$composable(interactionSource, $composer_0, 14 & $changed >> 6);
    var targetValue = !enabled ? this.disabledSuffixColor_1 : isError ? this.errorSuffixColor_1 : suffixColor$composable$lambda(focused$delegate) ? this.focusedSuffixColor_1 : this.unfocusedSuffixColor_1;
    var tmp0 = rememberUpdatedState$composable(new Color(targetValue), $composer_0, 0);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0;
  };
  protoOf(TextFieldColors).cursorColor$composable_jx2sfc_k$ = function (isError, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(859567483);
    sourceInformation($composer_0, 'C(cursorColor$composable)1995@105746L68:TextFieldDefaults.kt#uh7d8r');
    if (isTraceInProgress()) {
      traceEventStart(859567483, $changed, -1, 'androidx.compose.material3.TextFieldColors.cursorColor$composable (TextFieldDefaults.kt:1994)');
    }
    var tmp0 = rememberUpdatedState$composable(new Color(isError ? this.errorCursorColor_1 : this.cursorColor_1), $composer_0, 0);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0;
  };
  protoOf(TextFieldColors).$get_selectionColors$$composable_n108b_k$ = function ($composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(-1287193133);
    sourceInformation($composer_0, 'C($get-selectionColors$$composable):TextFieldDefaults.kt#uh7d8r');
    if (isTraceInProgress()) {
      traceEventStart(-1287193133, $changed, -1, 'androidx.compose.material3.TextFieldColors.$get-selectionColors$$composable (TextFieldDefaults.kt:2002)');
    }
    var tmp0 = this.textSelectionColors_1;
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0;
  };
  function get_$stableprop_6() {
    return 0;
  }
  function TextFieldDefaults$indicatorLine$lambda($enabled, $isError, $interactionSource, $colors, $focusedIndicatorLineThickness, $unfocusedIndicatorLineThickness) {
    return function ($this$null) {
      $this$null.set_name_wkmnld_k$('indicatorLine');
      $this$null.get_properties_zhllqc_k$().set_vvveh5_k$('enabled', $enabled);
      $this$null.get_properties_zhllqc_k$().set_vvveh5_k$('isError', $isError);
      $this$null.get_properties_zhllqc_k$().set_vvveh5_k$('interactionSource', $interactionSource);
      $this$null.get_properties_zhllqc_k$().set_vvveh5_k$('colors', $colors);
      $this$null.get_properties_zhllqc_k$().set_vvveh5_k$('focusedIndicatorLineThickness', new Dp($focusedIndicatorLineThickness));
      $this$null.get_properties_zhllqc_k$().set_vvveh5_k$('unfocusedIndicatorLineThickness', new Dp($unfocusedIndicatorLineThickness));
      return Unit_getInstance();
    };
  }
  function TextFieldDefaults$indicatorLine$lambda_0($enabled, $isError, $interactionSource, $colors, $focusedIndicatorLineThickness, $unfocusedIndicatorLineThickness) {
    return function ($this$composed, $composer, $changed) {
      var $composer_0 = $composer;
      $composer_0.startReplaceableGroup_ip860b_k$(-891038934);
      sourceInformation($composer_0, 'C140@6028L217:TextFieldDefaults.kt#uh7d8r');
      var tmp;
      if (isTraceInProgress()) {
        traceEventStart(-891038934, $changed, -1, 'androidx.compose.material3.TextFieldDefaults.indicatorLine.<anonymous> (TextFieldDefaults.kt:139)');
        tmp = Unit_getInstance();
      }
      var stroke = animateBorderStrokeAsState$composable($enabled, $isError, $interactionSource, $colors, $focusedIndicatorLineThickness, $unfocusedIndicatorLineThickness, $composer_0, 0);
      var tmp0 = drawIndicatorLine(Companion_getInstance_1(), stroke.get_value_j01efc_k$());
      var tmp_0;
      if (isTraceInProgress()) {
        traceEventEnd();
        tmp_0 = Unit_getInstance();
      }
      $composer_0.endReplaceableGroup_ern0ak_k$();
      return tmp0;
    };
  }
  function TextFieldDefaults$ContainerBox$composable$lambda($tmp0_rcvr, $enabled, $isError, $interactionSource, $colors, $shape, $$changed, $$default) {
    return function ($composer, $force) {
      $tmp0_rcvr.ContainerBox$composable_fxa6bu_k$($enabled, $isError, $interactionSource, $colors, $shape._v, $composer, updateChangedFlags($$changed | 1), $$default);
      return Unit_getInstance();
    };
  }
  function TextFieldDefaults$DecorationBox$composable$lambda($enabled, $isError, $interactionSource, $colors, $shape, $$dirty, $$dirty1) {
    return function ($composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C434@24948L64:TextFieldDefaults.kt#uh7d8r');
      var tmp;
      if (!(($changed & 11) === 2) ? true : !$composer_0.get_skipping_3owdve_k$()) {
        if (isTraceInProgress()) {
          traceEventStart(-435523791, $changed, -1, 'androidx.compose.material3.TextFieldDefaults.DecorationBox$composable.<anonymous> (TextFieldDefaults.kt:433)');
        }
        TextFieldDefaults_getInstance().ContainerBox$composable_fxa6bu_k$($enabled, $isError._v, $interactionSource, $colors._v, $shape._v, $composer_0, 196608 | 14 & $$dirty >> 6 | 112 & $$dirty >> 15 | 896 & $$dirty >> 9 | 7168 & $$dirty1 >> 6 | 57344 & $$dirty1, 0);
        var tmp_0;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_0 = Unit_getInstance();
        }
        tmp = tmp_0;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref($boundThis) {
    return function (p0, p1) {
      return $boundThis.invoke_z8di7s_k$(p0, p1);
    };
  }
  function TextFieldDefaults$DecorationBox$composable$lambda_0($tmp0_rcvr, $value, $innerTextField, $enabled, $singleLine, $visualTransformation, $interactionSource, $isError, $label, $placeholder, $leadingIcon, $trailingIcon, $prefix, $suffix, $supportingText, $shape, $colors, $contentPadding, $container, $$changed, $$changed1, $$default) {
    return function ($composer, $force) {
      $tmp0_rcvr.DecorationBox$composable_56lh3b_k$($value, $innerTextField, $enabled, $singleLine, $visualTransformation, $interactionSource, $isError._v, $label._v, $placeholder._v, $leadingIcon._v, $trailingIcon._v, $prefix._v, $suffix._v, $supportingText._v, $shape._v, $colors._v, $contentPadding._v, $container._v, $composer, updateChangedFlags($$changed | 1), updateChangedFlags($$changed1), $$default);
      return Unit_getInstance();
    };
  }
  function TextFieldDefaults$FilledContainerBox$composable$lambda($tmp0_rcvr, $enabled, $isError, $interactionSource, $colors, $shape, $$changed, $$default) {
    return function ($composer, $force) {
      $tmp0_rcvr.FilledContainerBox$composable_n4zut0_k$($enabled, $isError, $interactionSource, $colors, $shape._v, $composer, updateChangedFlags($$changed | 1), $$default);
      return Unit_getInstance();
    };
  }
  function TextFieldDefaults$OutlinedBorderContainerBox$composable$lambda($tmp0_rcvr, $enabled, $isError, $interactionSource, $colors, $shape, $focusedBorderThickness, $unfocusedBorderThickness, $$changed, $$default) {
    return function ($composer, $force) {
      $tmp0_rcvr.OutlinedBorderContainerBox$composable_xo5wzs_k$($enabled, $isError, $interactionSource, $colors, $shape._v, $focusedBorderThickness._v.value_1, $unfocusedBorderThickness._v.value_1, $composer, updateChangedFlags($$changed | 1), $$default);
      return Unit_getInstance();
    };
  }
  function TextFieldDefaults$TextFieldDecorationBox$composable$lambda($enabled, $isError, $interactionSource, $colors, $shape, $$dirty, $$dirty1) {
    return function ($composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C967@54325L64:TextFieldDefaults.kt#uh7d8r');
      var tmp;
      if (!(($changed & 11) === 2) ? true : !$composer_0.get_skipping_3owdve_k$()) {
        if (isTraceInProgress()) {
          traceEventStart(2023266550, $changed, -1, 'androidx.compose.material3.TextFieldDefaults.TextFieldDecorationBox$composable.<anonymous> (TextFieldDefaults.kt:966)');
        }
        TextFieldDefaults_getInstance().ContainerBox$composable_fxa6bu_k$($enabled, $isError._v, $interactionSource, $colors._v, $shape._v, $composer_0, 196608 | 14 & $$dirty >> 6 | 112 & $$dirty >> 15 | 896 & $$dirty >> 9 | 7168 & $$dirty1 >> 6 | 57344 & $$dirty1, 0);
        var tmp_0;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_0 = Unit_getInstance();
        }
        tmp = tmp_0;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_0($boundThis) {
    return function (p0, p1) {
      return $boundThis.invoke_z8di7s_k$(p0, p1);
    };
  }
  function TextFieldDefaults$TextFieldDecorationBox$composable$lambda_0($tmp0_rcvr, $value, $innerTextField, $enabled, $singleLine, $visualTransformation, $interactionSource, $isError, $label, $placeholder, $leadingIcon, $trailingIcon, $prefix, $suffix, $supportingText, $shape, $colors, $contentPadding, $container, $$changed, $$changed1, $$default) {
    return function ($composer, $force) {
      $tmp0_rcvr.TextFieldDecorationBox$composable_cccfv0_k$($value, $innerTextField, $enabled, $singleLine, $visualTransformation, $interactionSource, $isError._v, $label._v, $placeholder._v, $leadingIcon._v, $trailingIcon._v, $prefix._v, $suffix._v, $supportingText._v, $shape._v, $colors._v, $contentPadding._v, $container._v, $composer, updateChangedFlags($$changed | 1), updateChangedFlags($$changed1), $$default);
      return Unit_getInstance();
    };
  }
  function TextFieldDefaults$OutlinedTextFieldDecorationBox$composable$lambda($enabled, $isError, $interactionSource, $colors, $$dirty, $$dirty1) {
    return function ($composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C1034@57160L57:TextFieldDefaults.kt#uh7d8r');
      var tmp;
      if (!(($changed & 11) === 2) ? true : !$composer_0.get_skipping_3owdve_k$()) {
        if (isTraceInProgress()) {
          traceEventStart(-1153197597, $changed, -1, 'androidx.compose.material3.TextFieldDefaults.OutlinedTextFieldDecorationBox$composable.<anonymous> (TextFieldDefaults.kt:1033)');
        }
        var tmp_0 = OutlinedTextFieldDefaults_getInstance();
        var tmp_1 = $isError._v;
        var tmp_2 = $colors._v;
        var tmp_3 = _Dp___init__impl__ms3zkb(0.0);
        tmp_0.ContainerBox$composable_cszs2e_k$($enabled, tmp_1, $interactionSource, tmp_2, null, tmp_3, _Dp___init__impl__ms3zkb(0.0), $composer_0, 12582912 | 14 & $$dirty >> 6 | 112 & $$dirty >> 15 | 896 & $$dirty >> 9 | 7168 & $$dirty1 >> 3, 112);
        var tmp_4;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_4 = Unit_getInstance();
        }
        tmp = tmp_4;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_1($boundThis) {
    return function (p0, p1) {
      return $boundThis.invoke_z8di7s_k$(p0, p1);
    };
  }
  function TextFieldDefaults$OutlinedTextFieldDecorationBox$composable$lambda_0($tmp0_rcvr, $value, $innerTextField, $enabled, $singleLine, $visualTransformation, $interactionSource, $isError, $label, $placeholder, $leadingIcon, $trailingIcon, $prefix, $suffix, $supportingText, $colors, $contentPadding, $container, $$changed, $$changed1, $$default) {
    return function ($composer, $force) {
      $tmp0_rcvr.OutlinedTextFieldDecorationBox$composable_xrcvxe_k$($value, $innerTextField, $enabled, $singleLine, $visualTransformation, $interactionSource, $isError._v, $label._v, $placeholder._v, $leadingIcon._v, $trailingIcon._v, $prefix._v, $suffix._v, $supportingText._v, $colors._v, $contentPadding._v, $container._v, $composer, updateChangedFlags($$changed | 1), updateChangedFlags($$changed1), $$default);
      return Unit_getInstance();
    };
  }
  function TextFieldDefaults$TextFieldDecorationBox$composable$lambda_1($enabled, $isError, $interactionSource, $colors, $shape, $$dirty, $$dirty1) {
    return function ($composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C1271@71620L64:TextFieldDefaults.kt#uh7d8r');
      var tmp;
      if (!(($changed & 11) === 2) ? true : !$composer_0.get_skipping_3owdve_k$()) {
        if (isTraceInProgress()) {
          traceEventStart(-1171460386, $changed, -1, 'androidx.compose.material3.TextFieldDefaults.TextFieldDecorationBox$composable.<anonymous> (TextFieldDefaults.kt:1270)');
        }
        TextFieldDefaults_getInstance().ContainerBox$composable_fxa6bu_k$($enabled, $isError._v, $interactionSource, $colors._v, $shape._v, $composer_0, 196608 | 14 & $$dirty >> 6 | 112 & $$dirty >> 15 | 896 & $$dirty >> 9 | 7168 & $$dirty1 | 57344 & $$dirty1 << 6, 0);
        var tmp_0;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_0 = Unit_getInstance();
        }
        tmp = tmp_0;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_2($boundThis) {
    return function (p0, p1) {
      return $boundThis.invoke_z8di7s_k$(p0, p1);
    };
  }
  function TextFieldDefaults$TextFieldDecorationBox$composable$lambda_2($tmp0_rcvr, $value, $innerTextField, $enabled, $singleLine, $visualTransformation, $interactionSource, $isError, $label, $placeholder, $leadingIcon, $trailingIcon, $supportingText, $shape, $colors, $contentPadding, $container, $$changed, $$changed1, $$default) {
    return function ($composer, $force) {
      $tmp0_rcvr.TextFieldDecorationBox$composable_1zgafo_k$($value, $innerTextField, $enabled, $singleLine, $visualTransformation, $interactionSource, $isError._v, $label._v, $placeholder._v, $leadingIcon._v, $trailingIcon._v, $supportingText._v, $shape._v, $colors._v, $contentPadding._v, $container._v, $composer, updateChangedFlags($$changed | 1), updateChangedFlags($$changed1), $$default);
      return Unit_getInstance();
    };
  }
  function TextFieldDefaults$OutlinedTextFieldDecorationBox$composable$lambda_1($enabled, $isError, $interactionSource, $colors, $$dirty, $$dirty1) {
    return function ($composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C1315@73357L57:TextFieldDefaults.kt#uh7d8r');
      var tmp;
      if (!(($changed & 11) === 2) ? true : !$composer_0.get_skipping_3owdve_k$()) {
        if (isTraceInProgress()) {
          traceEventStart(144282315, $changed, -1, 'androidx.compose.material3.TextFieldDefaults.OutlinedTextFieldDecorationBox$composable.<anonymous> (TextFieldDefaults.kt:1314)');
        }
        var tmp_0 = OutlinedTextFieldDefaults_getInstance();
        var tmp_1 = $isError._v;
        var tmp_2 = $colors._v;
        var tmp_3 = _Dp___init__impl__ms3zkb(0.0);
        tmp_0.ContainerBox$composable_cszs2e_k$($enabled, tmp_1, $interactionSource, tmp_2, null, tmp_3, _Dp___init__impl__ms3zkb(0.0), $composer_0, 12582912 | 14 & $$dirty >> 6 | 112 & $$dirty >> 15 | 896 & $$dirty >> 9 | 7168 & $$dirty1 << 3, 112);
        var tmp_4;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_4 = Unit_getInstance();
        }
        tmp = tmp_4;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_3($boundThis) {
    return function (p0, p1) {
      return $boundThis.invoke_z8di7s_k$(p0, p1);
    };
  }
  function TextFieldDefaults$OutlinedTextFieldDecorationBox$composable$lambda_2($tmp0_rcvr, $value, $innerTextField, $enabled, $singleLine, $visualTransformation, $interactionSource, $isError, $label, $placeholder, $leadingIcon, $trailingIcon, $supportingText, $colors, $contentPadding, $container, $$changed, $$changed1, $$default) {
    return function ($composer, $force) {
      $tmp0_rcvr.OutlinedTextFieldDecorationBox$composable_nawpoe_k$($value, $innerTextField, $enabled, $singleLine, $visualTransformation, $interactionSource, $isError._v, $label._v, $placeholder._v, $leadingIcon._v, $trailingIcon._v, $supportingText._v, $colors._v, $contentPadding._v, $container._v, $composer, updateChangedFlags($$changed | 1), updateChangedFlags($$changed1), $$default);
      return Unit_getInstance();
    };
  }
  function TextFieldDefaults() {
    TextFieldDefaults_instance = this;
    var tmp = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp.MinHeight_1 = _Dp___init__impl__ms3zkb(56);
    var tmp_0 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_0.MinWidth_1 = _Dp___init__impl__ms3zkb(280);
    var tmp_1 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_1.UnfocusedIndicatorThickness_1 = _Dp___init__impl__ms3zkb(1);
    var tmp_2 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_2.FocusedIndicatorThickness_1 = _Dp___init__impl__ms3zkb(2);
    this.UnfocusedBorderThickness_1 = this.UnfocusedIndicatorThickness_1;
    this.FocusedBorderThickness_1 = this.FocusedIndicatorThickness_1;
    this.$stable_1 = 0;
  }
  protoOf(TextFieldDefaults).get_shape_iyi9a0_k$ = function () {
    illegalDecoyCallException('<get-shape>');
  };
  protoOf(TextFieldDefaults).get_MinHeight_87ywfh_k$ = function () {
    return this.MinHeight_1;
  };
  protoOf(TextFieldDefaults).get_MinWidth_bp2e3e_k$ = function () {
    return this.MinWidth_1;
  };
  protoOf(TextFieldDefaults).get_UnfocusedIndicatorThickness_jy8td5_k$ = function () {
    return this.UnfocusedIndicatorThickness_1;
  };
  protoOf(TextFieldDefaults).get_FocusedIndicatorThickness_1jeu0g_k$ = function () {
    return this.FocusedIndicatorThickness_1;
  };
  protoOf(TextFieldDefaults).ContainerBox_pourf7_k$ = function (enabled, isError, interactionSource, colors, shape) {
    illegalDecoyCallException('ContainerBox');
  };
  protoOf(TextFieldDefaults).indicatorLine_nvizjm_k$ = function (_this__u8e3s4, enabled, isError, interactionSource, colors, focusedIndicatorLineThickness, unfocusedIndicatorLineThickness) {
    // Inline function 'androidx.compose.ui.platform.debugInspectorInfo' call
    var tmp;
    if (get_isDebugInspectorInfoEnabled()) {
      tmp = TextFieldDefaults$indicatorLine$lambda(enabled, isError, interactionSource, colors, focusedIndicatorLineThickness, unfocusedIndicatorLineThickness);
    } else {
      tmp = get_NoInspectorInfo();
    }
    var tmp_0 = tmp;
    return composed$composable(_this__u8e3s4, tmp_0, TextFieldDefaults$indicatorLine$lambda_0(enabled, isError, interactionSource, colors, focusedIndicatorLineThickness, unfocusedIndicatorLineThickness));
  };
  protoOf(TextFieldDefaults).indicatorLine$default_p2smxj_k$ = function (_this__u8e3s4, enabled, isError, interactionSource, colors, focusedIndicatorLineThickness, unfocusedIndicatorLineThickness, $super) {
    focusedIndicatorLineThickness = focusedIndicatorLineThickness === VOID ? this.FocusedIndicatorThickness_1 : focusedIndicatorLineThickness;
    unfocusedIndicatorLineThickness = unfocusedIndicatorLineThickness === VOID ? this.UnfocusedIndicatorThickness_1 : unfocusedIndicatorLineThickness;
    return $super === VOID ? this.indicatorLine_nvizjm_k$(_this__u8e3s4, enabled, isError, interactionSource, colors, focusedIndicatorLineThickness, unfocusedIndicatorLineThickness) : $super.indicatorLine_nvizjm_k$.call(this, _this__u8e3s4, enabled, isError, interactionSource, colors, new Dp(focusedIndicatorLineThickness), new Dp(unfocusedIndicatorLineThickness));
  };
  protoOf(TextFieldDefaults).contentPaddingWithLabel_lfv6hi_k$ = function (start, end, top, bottom) {
    return PaddingValues_0(start, top, end, bottom);
  };
  protoOf(TextFieldDefaults).contentPaddingWithLabel$default_n9hc89_k$ = function (start, end, top, bottom, $super) {
    start = start === VOID ? get_TextFieldPadding() : start;
    end = end === VOID ? get_TextFieldPadding() : end;
    top = top === VOID ? get_TextFieldWithLabelVerticalPadding() : top;
    bottom = bottom === VOID ? get_TextFieldWithLabelVerticalPadding() : bottom;
    return $super === VOID ? this.contentPaddingWithLabel_lfv6hi_k$(start, end, top, bottom) : $super.contentPaddingWithLabel_lfv6hi_k$.call(this, new Dp(start), new Dp(end), new Dp(top), new Dp(bottom));
  };
  protoOf(TextFieldDefaults).contentPaddingWithoutLabel_656ofw_k$ = function (start, top, end, bottom) {
    return PaddingValues_0(start, top, end, bottom);
  };
  protoOf(TextFieldDefaults).contentPaddingWithoutLabel$default_h0esvv_k$ = function (start, top, end, bottom, $super) {
    start = start === VOID ? get_TextFieldPadding() : start;
    top = top === VOID ? get_TextFieldPadding() : top;
    end = end === VOID ? get_TextFieldPadding() : end;
    bottom = bottom === VOID ? get_TextFieldPadding() : bottom;
    return $super === VOID ? this.contentPaddingWithoutLabel_656ofw_k$(start, top, end, bottom) : $super.contentPaddingWithoutLabel_656ofw_k$.call(this, new Dp(start), new Dp(top), new Dp(end), new Dp(bottom));
  };
  protoOf(TextFieldDefaults).supportingTextPadding_ieljjl_k$ = function (start, top, end, bottom) {
    return PaddingValues_0(start, top, end, bottom);
  };
  protoOf(TextFieldDefaults).supportingTextPadding$default_4m2tf2_k$ = function (start, top, end, bottom, $super) {
    start = start === VOID ? get_TextFieldPadding() : start;
    top = top === VOID ? get_SupportingTopPadding() : top;
    end = end === VOID ? get_TextFieldPadding() : end;
    var tmp;
    if (bottom === VOID) {
      // Inline function 'androidx.compose.ui.unit.dp' call
      tmp = _Dp___init__impl__ms3zkb(0);
    } else {
      tmp = bottom;
    }
    bottom = tmp;
    return $super === VOID ? this.supportingTextPadding_ieljjl_k$(start, top, end, bottom) : $super.supportingTextPadding_ieljjl_k$.call(this, new Dp(start), new Dp(top), new Dp(end), new Dp(bottom));
  };
  protoOf(TextFieldDefaults).colors_c7gkr7_k$ = function (focusedTextColor, unfocusedTextColor, disabledTextColor, errorTextColor, focusedContainerColor, unfocusedContainerColor, disabledContainerColor, errorContainerColor, cursorColor, errorCursorColor, selectionColors, focusedIndicatorColor, unfocusedIndicatorColor, disabledIndicatorColor, errorIndicatorColor, focusedLeadingIconColor, unfocusedLeadingIconColor, disabledLeadingIconColor, errorLeadingIconColor, focusedTrailingIconColor, unfocusedTrailingIconColor, disabledTrailingIconColor, errorTrailingIconColor, focusedLabelColor, unfocusedLabelColor, disabledLabelColor, errorLabelColor, focusedPlaceholderColor, unfocusedPlaceholderColor, disabledPlaceholderColor, errorPlaceholderColor, focusedSupportingTextColor, unfocusedSupportingTextColor, disabledSupportingTextColor, errorSupportingTextColor, focusedPrefixColor, unfocusedPrefixColor, disabledPrefixColor, errorPrefixColor, focusedSuffixColor, unfocusedSuffixColor, disabledSuffixColor, errorSuffixColor) {
    illegalDecoyCallException('colors');
  };
  protoOf(TextFieldDefaults).DecorationBox_wz9zm7_k$ = function (value, innerTextField, enabled, singleLine, visualTransformation, interactionSource, isError, label, placeholder, leadingIcon, trailingIcon, prefix, suffix, supportingText, shape, colors, contentPadding, container) {
    illegalDecoyCallException('DecorationBox');
  };
  protoOf(TextFieldDefaults).get_outlinedShape_vpn8dy_k$ = function () {
    illegalDecoyCallException('<get-outlinedShape>');
  };
  protoOf(TextFieldDefaults).get_filledShape_p4qubu_k$ = function () {
    illegalDecoyCallException('<get-filledShape>');
  };
  protoOf(TextFieldDefaults).get_UnfocusedBorderThickness_7t081c_k$ = function () {
    return this.UnfocusedBorderThickness_1;
  };
  protoOf(TextFieldDefaults).get_FocusedBorderThickness_4i9nsn_k$ = function () {
    return this.FocusedBorderThickness_1;
  };
  protoOf(TextFieldDefaults).FilledContainerBox_gx8nit_k$ = function (enabled, isError, interactionSource, colors, shape) {
    illegalDecoyCallException('FilledContainerBox');
  };
  protoOf(TextFieldDefaults).OutlinedBorderContainerBox_kgufb3_k$ = function (enabled, isError, interactionSource, colors, shape, focusedBorderThickness, unfocusedBorderThickness) {
    illegalDecoyCallException('OutlinedBorderContainerBox');
  };
  protoOf(TextFieldDefaults).textFieldWithLabelPadding_otn6vk_k$ = function (start, end, top, bottom) {
    return this.contentPaddingWithLabel_lfv6hi_k$(start, end, top, bottom);
  };
  protoOf(TextFieldDefaults).textFieldWithLabelPadding$default_kv8fpt_k$ = function (start, end, top, bottom, $super) {
    start = start === VOID ? get_TextFieldPadding() : start;
    end = end === VOID ? get_TextFieldPadding() : end;
    top = top === VOID ? get_TextFieldWithLabelVerticalPadding() : top;
    bottom = bottom === VOID ? get_TextFieldWithLabelVerticalPadding() : bottom;
    return $super === VOID ? this.textFieldWithLabelPadding_otn6vk_k$(start, end, top, bottom) : $super.textFieldWithLabelPadding_otn6vk_k$.call(this, new Dp(start), new Dp(end), new Dp(top), new Dp(bottom));
  };
  protoOf(TextFieldDefaults).textFieldWithoutLabelPadding_4mckns_k$ = function (start, top, end, bottom) {
    return this.contentPaddingWithoutLabel_656ofw_k$(start, top, end, bottom);
  };
  protoOf(TextFieldDefaults).textFieldWithoutLabelPadding$default_6ssh9j_k$ = function (start, top, end, bottom, $super) {
    start = start === VOID ? get_TextFieldPadding() : start;
    top = top === VOID ? get_TextFieldPadding() : top;
    end = end === VOID ? get_TextFieldPadding() : end;
    bottom = bottom === VOID ? get_TextFieldPadding() : bottom;
    return $super === VOID ? this.textFieldWithoutLabelPadding_4mckns_k$(start, top, end, bottom) : $super.textFieldWithoutLabelPadding_4mckns_k$.call(this, new Dp(start), new Dp(top), new Dp(end), new Dp(bottom));
  };
  protoOf(TextFieldDefaults).outlinedTextFieldPadding_xwh1h6_k$ = function (start, top, end, bottom) {
    return OutlinedTextFieldDefaults_getInstance().contentPadding_rnzes8_k$(start, top, end, bottom);
  };
  protoOf(TextFieldDefaults).outlinedTextFieldPadding$default_nn0jr_k$ = function (start, top, end, bottom, $super) {
    start = start === VOID ? get_TextFieldPadding() : start;
    top = top === VOID ? get_TextFieldPadding() : top;
    end = end === VOID ? get_TextFieldPadding() : end;
    bottom = bottom === VOID ? get_TextFieldPadding() : bottom;
    return $super === VOID ? this.outlinedTextFieldPadding_xwh1h6_k$(start, top, end, bottom) : $super.outlinedTextFieldPadding_xwh1h6_k$.call(this, new Dp(start), new Dp(top), new Dp(end), new Dp(bottom));
  };
  protoOf(TextFieldDefaults).textFieldColors_8ruzdm_k$ = function (focusedTextColor, unfocusedTextColor, disabledTextColor, errorTextColor, containerColor, errorContainerColor, cursorColor, errorCursorColor, selectionColors, focusedIndicatorColor, unfocusedIndicatorColor, disabledIndicatorColor, errorIndicatorColor, focusedLeadingIconColor, unfocusedLeadingIconColor, disabledLeadingIconColor, errorLeadingIconColor, focusedTrailingIconColor, unfocusedTrailingIconColor, disabledTrailingIconColor, errorTrailingIconColor, focusedLabelColor, unfocusedLabelColor, disabledLabelColor, errorLabelColor, focusedPlaceholderColor, unfocusedPlaceholderColor, disabledPlaceholderColor, errorPlaceholderColor, focusedSupportingTextColor, unfocusedSupportingTextColor, disabledSupportingTextColor, errorSupportingTextColor, focusedPrefixColor, unfocusedPrefixColor, disabledPrefixColor, errorPrefixColor, focusedSuffixColor, unfocusedSuffixColor, disabledSuffixColor, errorSuffixColor) {
    illegalDecoyCallException('textFieldColors');
  };
  protoOf(TextFieldDefaults).outlinedTextFieldColors_d7iu5g_k$ = function (focusedTextColor, unfocusedTextColor, disabledTextColor, errorTextColor, containerColor, errorContainerColor, cursorColor, errorCursorColor, selectionColors, focusedBorderColor, unfocusedBorderColor, disabledBorderColor, errorBorderColor, focusedLeadingIconColor, unfocusedLeadingIconColor, disabledLeadingIconColor, errorLeadingIconColor, focusedTrailingIconColor, unfocusedTrailingIconColor, disabledTrailingIconColor, errorTrailingIconColor, focusedLabelColor, unfocusedLabelColor, disabledLabelColor, errorLabelColor, focusedPlaceholderColor, unfocusedPlaceholderColor, disabledPlaceholderColor, errorPlaceholderColor, focusedSupportingTextColor, unfocusedSupportingTextColor, disabledSupportingTextColor, errorSupportingTextColor, focusedPrefixColor, unfocusedPrefixColor, disabledPrefixColor, errorPrefixColor, focusedSuffixColor, unfocusedSuffixColor, disabledSuffixColor, errorSuffixColor) {
    illegalDecoyCallException('outlinedTextFieldColors');
  };
  protoOf(TextFieldDefaults).TextFieldDecorationBox_oj6fc4_k$ = function (value, innerTextField, enabled, singleLine, visualTransformation, interactionSource, isError, label, placeholder, leadingIcon, trailingIcon, prefix, suffix, supportingText, shape, colors, contentPadding, container) {
    illegalDecoyCallException('TextFieldDecorationBox');
  };
  protoOf(TextFieldDefaults).OutlinedTextFieldDecorationBox_wc3fsl_k$ = function (value, innerTextField, enabled, singleLine, visualTransformation, interactionSource, isError, label, placeholder, leadingIcon, trailingIcon, prefix, suffix, supportingText, colors, contentPadding, container) {
    illegalDecoyCallException('OutlinedTextFieldDecorationBox');
  };
  protoOf(TextFieldDefaults).textFieldColors_ytd6v9_k$ = function (textColor, disabledTextColor, containerColor, cursorColor, errorCursorColor, selectionColors, focusedIndicatorColor, unfocusedIndicatorColor, disabledIndicatorColor, errorIndicatorColor, focusedLeadingIconColor, unfocusedLeadingIconColor, disabledLeadingIconColor, errorLeadingIconColor, focusedTrailingIconColor, unfocusedTrailingIconColor, disabledTrailingIconColor, errorTrailingIconColor, focusedLabelColor, unfocusedLabelColor, disabledLabelColor, errorLabelColor, placeholderColor, disabledPlaceholderColor, focusedSupportingTextColor, unfocusedSupportingTextColor, disabledSupportingTextColor, errorSupportingTextColor, focusedPrefixColor, unfocusedPrefixColor, disabledPrefixColor, errorPrefixColor, focusedSuffixColor, unfocusedSuffixColor, disabledSuffixColor, errorSuffixColor) {
    illegalDecoyCallException('textFieldColors');
  };
  protoOf(TextFieldDefaults).outlinedTextFieldColors_etn39f_k$ = function (textColor, disabledTextColor, containerColor, cursorColor, errorCursorColor, selectionColors, focusedBorderColor, unfocusedBorderColor, disabledBorderColor, errorBorderColor, focusedLeadingIconColor, unfocusedLeadingIconColor, disabledLeadingIconColor, errorLeadingIconColor, focusedTrailingIconColor, unfocusedTrailingIconColor, disabledTrailingIconColor, errorTrailingIconColor, focusedLabelColor, unfocusedLabelColor, disabledLabelColor, errorLabelColor, placeholderColor, disabledPlaceholderColor, focusedSupportingTextColor, unfocusedSupportingTextColor, disabledSupportingTextColor, errorSupportingTextColor, focusedPrefixColor, unfocusedPrefixColor, disabledPrefixColor, errorPrefixColor, focusedSuffixColor, unfocusedSuffixColor, disabledSuffixColor, errorSuffixColor) {
    illegalDecoyCallException('outlinedTextFieldColors');
  };
  protoOf(TextFieldDefaults).TextFieldDecorationBox_dvjvda_k$ = function (value, innerTextField, enabled, singleLine, visualTransformation, interactionSource, isError, label, placeholder, leadingIcon, trailingIcon, supportingText, shape, colors, contentPadding, container) {
    illegalDecoyCallException('TextFieldDecorationBox');
  };
  protoOf(TextFieldDefaults).OutlinedTextFieldDecorationBox_ani3z3_k$ = function (value, innerTextField, enabled, singleLine, visualTransformation, interactionSource, isError, label, placeholder, leadingIcon, trailingIcon, supportingText, colors, contentPadding, container) {
    illegalDecoyCallException('OutlinedTextFieldDecorationBox');
  };
  protoOf(TextFieldDefaults).$get_shape$$composable_df7h3a_k$ = function ($composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(958150564);
    sourceInformation($composer_0, 'C($get-shape$$composable)57@2544L9:TextFieldDefaults.kt#uh7d8r');
    if (isTraceInProgress()) {
      traceEventStart(958150564, $changed, -1, 'androidx.compose.material3.TextFieldDefaults.$get-shape$$composable (TextFieldDefaults.kt:57)');
    }
    var tmp0 = toShape$composable(FilledTextFieldTokens_getInstance().get_ContainerShape_ur17m1_k$(), $composer_0, 6);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0;
  };
  protoOf(TextFieldDefaults).ContainerBox$composable_fxa6bu_k$ = function (enabled, isError, interactionSource, colors, shape, $composer, $changed, $default) {
    var shape_0 = {_v: shape};
    var $composer_0 = $composer;
    $composer_0 = $composer_0.startRestartGroup_lebv1i_k$(1275373963);
    sourceInformation($composer_0, 'C(ContainerBox$composable)P(1,3,2)100@4155L5,104@4239L51,102@4178L203:TextFieldDefaults.kt#uh7d8r');
    var $dirty = $changed;
    if (!(($default & 1) === 0))
      $dirty = $dirty | 6;
    else if (($changed & 14) === 0)
      $dirty = $dirty | ($composer_0.changed_jpyyrz_k$(enabled) ? 4 : 2);
    if (!(($default & 2) === 0))
      $dirty = $dirty | 48;
    else if (($changed & 112) === 0)
      $dirty = $dirty | ($composer_0.changed_jpyyrz_k$(isError) ? 32 : 16);
    if (!(($default & 4) === 0))
      $dirty = $dirty | 384;
    else if (($changed & 896) === 0)
      $dirty = $dirty | ($composer_0.changed_ga7h3f_k$(interactionSource) ? 256 : 128);
    if (!(($default & 8) === 0))
      $dirty = $dirty | 3072;
    else if (($changed & 7168) === 0)
      $dirty = $dirty | ($composer_0.changed_ga7h3f_k$(colors) ? 2048 : 1024);
    if (($changed & 57344) === 0)
      $dirty = $dirty | ((($default & 16) === 0 ? $composer_0.changed_ga7h3f_k$(shape_0._v) : false) ? 16384 : 8192);
    if (!(($default & 32) === 0))
      $dirty = $dirty | 196608;
    else if (($changed & 458752) === 0)
      $dirty = $dirty | ($composer_0.changed_ga7h3f_k$(this) ? 131072 : 65536);
    if (!(($dirty & 374491) === 74898) ? true : !$composer_0.get_skipping_3owdve_k$()) {
      $composer_0.startDefaults_g83kzo_k$();
      if (($changed & 1) === 0 ? true : $composer_0.get_defaultsInvalid_y88fc4_k$()) {
        if (!(($default & 16) === 0)) {
          shape_0._v = TextFieldDefaults_getInstance().$get_shape$$composable_df7h3a_k$($composer_0, 6);
          $dirty = $dirty & -57345;
        }
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        if (!(($default & 16) === 0))
          $dirty = $dirty & -57345;
      }
      $composer_0.endDefaults_b0s0ot_k$();
      if (isTraceInProgress()) {
        traceEventStart(1275373963, $dirty, -1, 'androidx.compose.material3.TextFieldDefaults.ContainerBox$composable (TextFieldDefaults.kt:95)');
      }
      Box$composable(this.indicatorLine$default_p2smxj_k$(background(Companion_getInstance_1(), colors.containerColor$composable_wme525_k$(enabled, isError, interactionSource, $composer_0, 14 & $dirty | 112 & $dirty | 896 & $dirty | 7168 & $dirty).get_value_j01efc_k$().value_1, shape_0._v), enabled, isError, interactionSource, colors), $composer_0, 0);
      if (isTraceInProgress()) {
        traceEventEnd();
      }
    } else {
      $composer_0.skipToGroupEnd_lh3zi2_k$();
    }
    var tmp1_safe_receiver = $composer_0.endRestartGroup_yxpjv9_k$();
    if (tmp1_safe_receiver === null)
      null;
    else {
      tmp1_safe_receiver.updateScope_t8jcf_k$(TextFieldDefaults$ContainerBox$composable$lambda(this, enabled, isError, interactionSource, colors, shape_0, $changed, $default));
    }
  };
  protoOf(TextFieldDefaults).colors$composable_uqty46_k$ = function (focusedTextColor, unfocusedTextColor, disabledTextColor, errorTextColor, focusedContainerColor, unfocusedContainerColor, disabledContainerColor, errorContainerColor, cursorColor, errorCursorColor, selectionColors, focusedIndicatorColor, unfocusedIndicatorColor, disabledIndicatorColor, errorIndicatorColor, focusedLeadingIconColor, unfocusedLeadingIconColor, disabledLeadingIconColor, errorLeadingIconColor, focusedTrailingIconColor, unfocusedTrailingIconColor, disabledTrailingIconColor, errorTrailingIconColor, focusedLabelColor, unfocusedLabelColor, disabledLabelColor, errorLabelColor, focusedPlaceholderColor, unfocusedPlaceholderColor, disabledPlaceholderColor, errorPlaceholderColor, focusedSupportingTextColor, unfocusedSupportingTextColor, disabledSupportingTextColor, errorSupportingTextColor, focusedPrefixColor, unfocusedPrefixColor, disabledPrefixColor, errorPrefixColor, focusedSuffixColor, unfocusedSuffixColor, disabledSuffixColor, errorSuffixColor, $composer, $changed, $changed1, $changed2, $changed3, $changed4, $default, $default1) {
    var focusedTextColor_0 = focusedTextColor;
    var unfocusedTextColor_0 = unfocusedTextColor;
    var disabledTextColor_0 = disabledTextColor;
    var errorTextColor_0 = errorTextColor;
    var focusedContainerColor_0 = focusedContainerColor;
    var unfocusedContainerColor_0 = unfocusedContainerColor;
    var disabledContainerColor_0 = disabledContainerColor;
    var errorContainerColor_0 = errorContainerColor;
    var cursorColor_0 = cursorColor;
    var errorCursorColor_0 = errorCursorColor;
    var selectionColors_0 = selectionColors;
    var focusedIndicatorColor_0 = focusedIndicatorColor;
    var unfocusedIndicatorColor_0 = unfocusedIndicatorColor;
    var disabledIndicatorColor_0 = disabledIndicatorColor;
    var errorIndicatorColor_0 = errorIndicatorColor;
    var focusedLeadingIconColor_0 = focusedLeadingIconColor;
    var unfocusedLeadingIconColor_0 = unfocusedLeadingIconColor;
    var disabledLeadingIconColor_0 = disabledLeadingIconColor;
    var errorLeadingIconColor_0 = errorLeadingIconColor;
    var focusedTrailingIconColor_0 = focusedTrailingIconColor;
    var unfocusedTrailingIconColor_0 = unfocusedTrailingIconColor;
    var disabledTrailingIconColor_0 = disabledTrailingIconColor;
    var errorTrailingIconColor_0 = errorTrailingIconColor;
    var focusedLabelColor_0 = focusedLabelColor;
    var unfocusedLabelColor_0 = unfocusedLabelColor;
    var disabledLabelColor_0 = disabledLabelColor;
    var errorLabelColor_0 = errorLabelColor;
    var focusedPlaceholderColor_0 = focusedPlaceholderColor;
    var unfocusedPlaceholderColor_0 = unfocusedPlaceholderColor;
    var disabledPlaceholderColor_0 = disabledPlaceholderColor;
    var errorPlaceholderColor_0 = errorPlaceholderColor;
    var focusedSupportingTextColor_0 = focusedSupportingTextColor;
    var unfocusedSupportingTextColor_0 = unfocusedSupportingTextColor;
    var disabledSupportingTextColor_0 = disabledSupportingTextColor;
    var errorSupportingTextColor_0 = errorSupportingTextColor;
    var focusedPrefixColor_0 = focusedPrefixColor;
    var unfocusedPrefixColor_0 = unfocusedPrefixColor;
    var disabledPrefixColor_0 = disabledPrefixColor;
    var errorPrefixColor_0 = errorPrefixColor;
    var focusedSuffixColor_0 = focusedSuffixColor;
    var unfocusedSuffixColor_0 = unfocusedSuffixColor;
    var disabledSuffixColor_0 = disabledSuffixColor;
    var errorSuffixColor_0 = errorSuffixColor;
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(-1100815008);
    sourceInformation($composer_0, 'C(colors$composable)P(30:c#ui.graphics.Color,41:c#ui.graphics.Color,9:c#ui.graphics.Color,20:c#ui.graphics.Color,22:c#ui.graphics.Color,33:c#ui.graphics.Color,1:c#ui.graphics.Color,11:c#ui.graphics.Color,0:c#ui.graphics.Color,12:c#ui.graphics.Color,32,23:c#ui.graphics.Color,34:c#ui.graphics.Color,2:c#ui.graphics.Color,13:c#ui.graphics.Color,25:c#ui.graphics.Color,36:c#ui.graphics.Color,4:c#ui.graphics.Color,15:c#ui.graphics.Color,31:c#ui.graphics.Color,42:c#ui.graphics.Color,10:c#ui.graphics.Color,21:c#ui.graphics.Color,24:c#ui.graphics.Color,35:c#ui.graphics.Color,3:c#ui.graphics.Color,14:c#ui.graphics.Color,26:c#ui.graphics.Color,37:c#ui.graphics.Color,5:c#ui.graphics.Color,16:c#ui.graphics.Color,29:c#ui.graphics.Color,40:c#ui.graphics.Color,8:c#ui.graphics.Color,19:c#ui.graphics.Color,27:c#ui.graphics.Color,38:c#ui.graphics.Color,6:c#ui.graphics.Color,17:c#ui.graphics.Color,28:c#ui.graphics.Color,39:c#ui.graphics.Color,7:c#ui.graphics.Color,18:c#ui.graphics.Color)247@12192L9,248@12272L9,249@12359L9,251@12510L9,252@12597L9,253@12686L9,254@12774L9,255@12859L9,256@12932L9,257@13020L9,258@13103L7,259@13199L9,260@13294L9,261@13396L9,263@13572L9,264@13668L9,265@13761L9,266@13861L9,268@14031L9,269@14129L9,270@14224L9,271@14326L9,273@14499L9,274@14583L9,275@14664L9,276@14752L9,278@14904L9,279@15000L9,280@15098L9,281@15192L9,283@15356L9,284@15454L9,285@15549L9,286@15651L9,288@15822L9,289@15908L9,290@15996L9,291@16083L9,293@16237L9,294@16323L9,295@16411L9,296@16498L9,298@16652L9:TextFieldDefaults.kt#uh7d8r');
    if (!(($default & 1) === 0))
      focusedTextColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_FocusInputColor_ydhhuw_k$(), $composer_0, 6);
    if (!(($default & 2) === 0))
      unfocusedTextColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_InputColor_zapq3m_k$(), $composer_0, 6);
    if (!(($default & 4) === 0))
      disabledTextColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(FilledTextFieldTokens_getInstance().get_DisabledInputColor_84w2ke_k$(), $composer_0, 6), FilledTextFieldTokens_getInstance().get_DisabledInputOpacity_vi261m_k$());
    if (!(($default & 8) === 0))
      errorTextColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_ErrorInputColor_hh1yg_k$(), $composer_0, 6);
    if (!(($default & 16) === 0))
      focusedContainerColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_ContainerColor_uid763_k$(), $composer_0, 6);
    if (!(($default & 32) === 0))
      unfocusedContainerColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_ContainerColor_uid763_k$(), $composer_0, 6);
    if (!(($default & 64) === 0))
      disabledContainerColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_ContainerColor_uid763_k$(), $composer_0, 6);
    if (!(($default & 128) === 0))
      errorContainerColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_ContainerColor_uid763_k$(), $composer_0, 6);
    if (!(($default & 256) === 0))
      cursorColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_CaretColor_hxe08n_k$(), $composer_0, 6);
    if (!(($default & 512) === 0))
      errorCursorColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_ErrorFocusCaretColor_vrfnbt_k$(), $composer_0, 6);
    if (!(($default & 1024) === 0)) {
      // Inline function 'androidx.compose.runtime.CompositionLocal.$get-current$$composable' call
      var this_0 = get_LocalTextSelectionColors();
      var $composer_1 = $composer_0;
      sourceInformationMarkerStart($composer_1, 858843746, 'CC($get-current$$composable):CompositionLocal.kt#9igjgp');
      var tmp0 = $composer_1.consume_ebzcrh_k$(this_0);
      sourceInformationMarkerEnd($composer_1);
      selectionColors_0 = tmp0;
    }
    if (!(($default & 2048) === 0))
      focusedIndicatorColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_FocusActiveIndicatorColor_9rlorb_k$(), $composer_0, 6);
    if (!(($default & 4096) === 0))
      unfocusedIndicatorColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_ActiveIndicatorColor_qs91el_k$(), $composer_0, 6);
    if (!(($default & 8192) === 0))
      disabledIndicatorColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(FilledTextFieldTokens_getInstance().get_DisabledActiveIndicatorColor_bvdiyn_k$(), $composer_0, 6), FilledTextFieldTokens_getInstance().get_DisabledActiveIndicatorOpacity_6y9rl3_k$());
    if (!(($default & 16384) === 0))
      errorIndicatorColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_ErrorActiveIndicatorColor_vkr8ux_k$(), $composer_0, 6);
    if (!(($default & 32768) === 0))
      focusedLeadingIconColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_FocusLeadingIconColor_pqzv77_k$(), $composer_0, 6);
    if (!(($default & 65536) === 0))
      unfocusedLeadingIconColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_LeadingIconColor_4sfzzh_k$(), $composer_0, 6);
    if (!(($default & 131072) === 0))
      disabledLeadingIconColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(FilledTextFieldTokens_getInstance().get_DisabledLeadingIconColor_dtgxah_k$(), $composer_0, 6), FilledTextFieldTokens_getInstance().get_DisabledLeadingIconOpacity_va1u41_k$());
    if (!(($default & 262144) === 0))
      errorLeadingIconColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_ErrorLeadingIconColor_b3l6n7_k$(), $composer_0, 6);
    if (!(($default & 524288) === 0))
      focusedTrailingIconColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_FocusTrailingIconColor_xs0xep_k$(), $composer_0, 6);
    if (!(($default & 1048576) === 0))
      unfocusedTrailingIconColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_TrailingIconColor_qrzqp1_k$(), $composer_0, 6);
    if (!(($default & 2097152) === 0))
      disabledTrailingIconColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(FilledTextFieldTokens_getInstance().get_DisabledTrailingIconColor_mjc79l_k$(), $composer_0, 6), FilledTextFieldTokens_getInstance().get_DisabledTrailingIconOpacity_s6onap_k$());
    if (!(($default & 4194304) === 0))
      errorTrailingIconColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_ErrorTrailingIconColor_9a4b73_k$(), $composer_0, 6);
    if (!(($default & 8388608) === 0))
      focusedLabelColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_FocusLabelColor_fu63wi_k$(), $composer_0, 6);
    if (!(($default & 16777216) === 0))
      unfocusedLabelColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_LabelColor_ewxvns_k$(), $composer_0, 6);
    if (!(($default & 33554432) === 0))
      disabledLabelColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(FilledTextFieldTokens_getInstance().get_DisabledLabelColor_sycis4_k$(), $composer_0, 6), FilledTextFieldTokens_getInstance().get_DisabledLabelOpacity_f5f918_k$());
    if (!(($default & 67108864) === 0))
      errorLabelColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_ErrorLabelColor_kbze9a_k$(), $composer_0, 6);
    if (!(($default & 134217728) === 0))
      focusedPlaceholderColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_InputPlaceholderColor_5cj1ap_k$(), $composer_0, 6);
    if (!(($default & 268435456) === 0))
      unfocusedPlaceholderColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_InputPlaceholderColor_5cj1ap_k$(), $composer_0, 6);
    if (!(($default & 536870912) === 0))
      disabledPlaceholderColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(FilledTextFieldTokens_getInstance().get_DisabledInputColor_84w2ke_k$(), $composer_0, 6), FilledTextFieldTokens_getInstance().get_DisabledInputOpacity_vi261m_k$());
    if (!(($default & 1073741824) === 0))
      errorPlaceholderColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_InputPlaceholderColor_5cj1ap_k$(), $composer_0, 6);
    if (!(($default1 & 1) === 0))
      focusedSupportingTextColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_FocusSupportingColor_nyu4nz_k$(), $composer_0, 6);
    if (!(($default1 & 2) === 0))
      unfocusedSupportingTextColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_SupportingColor_eb3yw7_k$(), $composer_0, 6);
    if (!(($default1 & 4) === 0))
      disabledSupportingTextColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(FilledTextFieldTokens_getInstance().get_DisabledSupportingColor_hh8a7p_k$(), $composer_0, 6), FilledTextFieldTokens_getInstance().get_DisabledSupportingOpacity_prppv_k$());
    if (!(($default1 & 8) === 0))
      errorSupportingTextColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_ErrorSupportingColor_63y79r_k$(), $composer_0, 6);
    if (!(($default1 & 16) === 0))
      focusedPrefixColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_InputPrefixColor_l0lf3k_k$(), $composer_0, 6);
    if (!(($default1 & 32) === 0))
      unfocusedPrefixColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_InputPrefixColor_l0lf3k_k$(), $composer_0, 6);
    if (!(($default1 & 64) === 0))
      disabledPrefixColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(FilledTextFieldTokens_getInstance().get_InputPrefixColor_l0lf3k_k$(), $composer_0, 6), FilledTextFieldTokens_getInstance().get_DisabledInputOpacity_vi261m_k$());
    if (!(($default1 & 128) === 0))
      errorPrefixColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_InputPrefixColor_l0lf3k_k$(), $composer_0, 6);
    if (!(($default1 & 256) === 0))
      focusedSuffixColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_InputSuffixColor_ya4w9d_k$(), $composer_0, 6);
    if (!(($default1 & 512) === 0))
      unfocusedSuffixColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_InputSuffixColor_ya4w9d_k$(), $composer_0, 6);
    if (!(($default1 & 1024) === 0))
      disabledSuffixColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(FilledTextFieldTokens_getInstance().get_InputSuffixColor_ya4w9d_k$(), $composer_0, 6), FilledTextFieldTokens_getInstance().get_DisabledInputOpacity_vi261m_k$());
    if (!(($default1 & 2048) === 0))
      errorSuffixColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_InputSuffixColor_ya4w9d_k$(), $composer_0, 6);
    if (isTraceInProgress()) {
      traceEventStart(-1100815008, $changed, $changed1, 'androidx.compose.material3.TextFieldDefaults.colors$composable (TextFieldDefaults.kt:246)');
    }
    var tmp0_0 = new TextFieldColors(focusedTextColor_0, unfocusedTextColor_0, disabledTextColor_0, errorTextColor_0, focusedContainerColor_0, unfocusedContainerColor_0, disabledContainerColor_0, errorContainerColor_0, cursorColor_0, errorCursorColor_0, selectionColors_0, focusedIndicatorColor_0, unfocusedIndicatorColor_0, disabledIndicatorColor_0, errorIndicatorColor_0, focusedLeadingIconColor_0, unfocusedLeadingIconColor_0, disabledLeadingIconColor_0, errorLeadingIconColor_0, focusedTrailingIconColor_0, unfocusedTrailingIconColor_0, disabledTrailingIconColor_0, errorTrailingIconColor_0, focusedLabelColor_0, unfocusedLabelColor_0, disabledLabelColor_0, errorLabelColor_0, focusedPlaceholderColor_0, unfocusedPlaceholderColor_0, disabledPlaceholderColor_0, errorPlaceholderColor_0, focusedSupportingTextColor_0, unfocusedSupportingTextColor_0, disabledSupportingTextColor_0, errorSupportingTextColor_0, focusedPrefixColor_0, unfocusedPrefixColor_0, disabledPrefixColor_0, errorPrefixColor_0, focusedSuffixColor_0, unfocusedSuffixColor_0, disabledSuffixColor_0, errorSuffixColor_0);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0_0;
  };
  protoOf(TextFieldDefaults).DecorationBox$composable_56lh3b_k$ = function (value, innerTextField, enabled, singleLine, visualTransformation, interactionSource, isError, label, placeholder, leadingIcon, trailingIcon, prefix, suffix, supportingText, shape, colors, contentPadding, container, $composer, $changed, $changed1, $default) {
    var isError_0 = {_v: isError};
    var label_0 = {_v: label};
    var placeholder_0 = {_v: placeholder};
    var leadingIcon_0 = {_v: leadingIcon};
    var trailingIcon_0 = {_v: trailingIcon};
    var prefix_0 = {_v: prefix};
    var suffix_0 = {_v: suffix};
    var supportingText_0 = {_v: supportingText};
    var shape_0 = {_v: shape};
    var colors_0 = {_v: colors};
    var contentPadding_0 = {_v: contentPadding};
    var container_0 = {_v: container};
    var $composer_0 = $composer;
    $composer_0 = $composer_0.startRestartGroup_lebv1i_k$(1621472693);
    sourceInformation($composer_0, 'C(DecorationBox$composable)P(16,4,3,12,17,5,6,7,9,8,15,10,13,14,11!1,2)425@24643L5,426@24684L8,437@25039L707:TextFieldDefaults.kt#uh7d8r');
    var $dirty = $changed;
    var $dirty1 = $changed1;
    if (!(($default & 1) === 0))
      $dirty = $dirty | 6;
    else if (($changed & 14) === 0)
      $dirty = $dirty | ($composer_0.changed_ga7h3f_k$(value) ? 4 : 2);
    if (!(($default & 2) === 0))
      $dirty = $dirty | 48;
    else if (($changed & 112) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(innerTextField) ? 32 : 16);
    if (!(($default & 4) === 0))
      $dirty = $dirty | 384;
    else if (($changed & 896) === 0)
      $dirty = $dirty | ($composer_0.changed_jpyyrz_k$(enabled) ? 256 : 128);
    if (!(($default & 8) === 0))
      $dirty = $dirty | 3072;
    else if (($changed & 7168) === 0)
      $dirty = $dirty | ($composer_0.changed_jpyyrz_k$(singleLine) ? 2048 : 1024);
    if (!(($default & 16) === 0))
      $dirty = $dirty | 24576;
    else if (($changed & 57344) === 0)
      $dirty = $dirty | ($composer_0.changed_ga7h3f_k$(visualTransformation) ? 16384 : 8192);
    if (!(($default & 32) === 0))
      $dirty = $dirty | 196608;
    else if (($changed & 458752) === 0)
      $dirty = $dirty | ($composer_0.changed_ga7h3f_k$(interactionSource) ? 131072 : 65536);
    if (!(($default & 64) === 0))
      $dirty = $dirty | 1572864;
    else if (($changed & 3670016) === 0)
      $dirty = $dirty | ($composer_0.changed_jpyyrz_k$(isError_0._v) ? 1048576 : 524288);
    if (!(($default & 128) === 0))
      $dirty = $dirty | 12582912;
    else if (($changed & 29360128) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(label_0._v) ? 8388608 : 4194304);
    if (!(($default & 256) === 0))
      $dirty = $dirty | 100663296;
    else if (($changed & 234881024) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(placeholder_0._v) ? 67108864 : 33554432);
    if (!(($default & 512) === 0))
      $dirty = $dirty | 805306368;
    else if (($changed & 1879048192) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(leadingIcon_0._v) ? 536870912 : 268435456);
    if (!(($default & 1024) === 0))
      $dirty1 = $dirty1 | 6;
    else if (($changed1 & 14) === 0)
      $dirty1 = $dirty1 | ($composer_0.changedInstance_s1wkiy_k$(trailingIcon_0._v) ? 4 : 2);
    if (!(($default & 2048) === 0))
      $dirty1 = $dirty1 | 48;
    else if (($changed1 & 112) === 0)
      $dirty1 = $dirty1 | ($composer_0.changedInstance_s1wkiy_k$(prefix_0._v) ? 32 : 16);
    if (!(($default & 4096) === 0))
      $dirty1 = $dirty1 | 384;
    else if (($changed1 & 896) === 0)
      $dirty1 = $dirty1 | ($composer_0.changedInstance_s1wkiy_k$(suffix_0._v) ? 256 : 128);
    if (!(($default & 8192) === 0))
      $dirty1 = $dirty1 | 3072;
    else if (($changed1 & 7168) === 0)
      $dirty1 = $dirty1 | ($composer_0.changedInstance_s1wkiy_k$(supportingText_0._v) ? 2048 : 1024);
    if (($changed1 & 57344) === 0)
      $dirty1 = $dirty1 | ((($default & 16384) === 0 ? $composer_0.changed_ga7h3f_k$(shape_0._v) : false) ? 16384 : 8192);
    if (($changed1 & 458752) === 0)
      $dirty1 = $dirty1 | ((($default & 32768) === 0 ? $composer_0.changed_ga7h3f_k$(colors_0._v) : false) ? 131072 : 65536);
    if (($changed1 & 3670016) === 0)
      $dirty1 = $dirty1 | ((($default & 65536) === 0 ? $composer_0.changed_ga7h3f_k$(contentPadding_0._v) : false) ? 1048576 : 524288);
    if (!(($default & 131072) === 0))
      $dirty1 = $dirty1 | 12582912;
    else if (($changed1 & 29360128) === 0)
      $dirty1 = $dirty1 | ($composer_0.changedInstance_s1wkiy_k$(container_0._v) ? 8388608 : 4194304);
    if ((!(($dirty & 1533916891) === 306783378) ? true : !(($dirty1 & 23967451) === 4793490)) ? true : !$composer_0.get_skipping_3owdve_k$()) {
      $composer_0.startDefaults_g83kzo_k$();
      if (($changed & 1) === 0 ? true : $composer_0.get_defaultsInvalid_y88fc4_k$()) {
        if (!(($default & 64) === 0)) {
          isError_0._v = false;
        }
        if (!(($default & 128) === 0)) {
          label_0._v = null;
        }
        if (!(($default & 256) === 0)) {
          placeholder_0._v = null;
        }
        if (!(($default & 512) === 0)) {
          leadingIcon_0._v = null;
        }
        if (!(($default & 1024) === 0)) {
          trailingIcon_0._v = null;
        }
        if (!(($default & 2048) === 0)) {
          prefix_0._v = null;
        }
        if (!(($default & 4096) === 0)) {
          suffix_0._v = null;
        }
        if (!(($default & 8192) === 0)) {
          supportingText_0._v = null;
        }
        if (!(($default & 16384) === 0)) {
          shape_0._v = TextFieldDefaults_getInstance().$get_shape$$composable_df7h3a_k$($composer_0, 6);
          $dirty1 = $dirty1 & -57345;
        }
        if (!(($default & 32768) === 0)) {
          var tmp = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_0 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_1 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_2 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_3 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_4 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_5 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_6 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_7 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_8 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_9 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_10 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_11 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_12 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_13 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_14 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_15 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_16 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_17 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_18 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_19 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_20 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_21 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_22 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_23 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_24 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_25 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_26 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_27 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_28 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_29 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_30 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_31 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_32 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_33 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_34 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_35 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_36 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_37 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_38 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_39 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          colors_0._v = this.colors$composable_uqty46_k$(tmp, tmp_0, tmp_1, tmp_2, tmp_3, tmp_4, tmp_5, tmp_6, tmp_7, tmp_8, null, tmp_9, tmp_10, tmp_11, tmp_12, tmp_13, tmp_14, tmp_15, tmp_16, tmp_17, tmp_18, tmp_19, tmp_20, tmp_21, tmp_22, tmp_23, tmp_24, tmp_25, tmp_26, tmp_27, tmp_28, tmp_29, tmp_30, tmp_31, tmp_32, tmp_33, tmp_34, tmp_35, tmp_36, tmp_37, tmp_38, tmp_39, _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0))), $composer_0, 0, 0, 0, 0, 0, 2147483647, 4095);
          $dirty1 = $dirty1 & -458753;
        }
        if (!(($default & 65536) === 0)) {
          var tmp_40;
          if (label_0._v == null) {
            tmp_40 = this.contentPaddingWithoutLabel$default_h0esvv_k$();
          } else {
            tmp_40 = this.contentPaddingWithLabel$default_n9hc89_k$();
          }
          contentPadding_0._v = tmp_40;
          $dirty1 = $dirty1 & -3670017;
        }
        if (!(($default & 131072) === 0)) {
          // Inline function 'kotlin.run' call
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'androidx.compose.material3.TextFieldDefaults.DecorationBox$composable.<anonymous>' call
          var tmp_41 = $composer_0;
          var dispatchReceiver = composableLambda(tmp_41, -435523791, true, TextFieldDefaults$DecorationBox$composable$lambda(enabled, isError_0, interactionSource, colors_0, shape_0, $dirty, $dirty1));
          // Inline function 'androidx.compose.runtime.remember$composable' call
          var $composer_1 = $composer_0;
          $composer_1.startReplaceableGroup_ip860b_k$(-838505973);
          sourceInformation($composer_1, 'CC(remember$composable)P(1):Composables.kt#9igjgp');
          // Inline function 'androidx.compose.runtime.cache' call
          var invalid = $composer_1.changed_ga7h3f_k$(dispatchReceiver);
          // Inline function 'kotlin.let' call
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
          var it = $composer_1.rememberedValue_4dg93v_k$();
          var tmp_42;
          if (invalid ? true : it === Companion_getInstance_2().get_Empty_i9b85g_k$()) {
            // Inline function 'androidx.compose.material3.TextFieldDefaults.DecorationBox$composable.<anonymous>.<anonymous>' call
            var value_0 = ComposableLambda$invoke$ref(dispatchReceiver);
            $composer_1.updateRememberedValue_l1wh71_k$(value_0);
            tmp_42 = value_0;
          } else {
            tmp_42 = it;
          }
          var tmp_43 = tmp_42;
          var tmp0 = (tmp_43 == null ? true : !(tmp_43 == null)) ? tmp_43 : THROW_CCE();
          $composer_1.endReplaceableGroup_ern0ak_k$();
          container_0._v = tmp0;
        }
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        if (!(($default & 16384) === 0))
          $dirty1 = $dirty1 & -57345;
        if (!(($default & 32768) === 0))
          $dirty1 = $dirty1 & -458753;
        if (!(($default & 65536) === 0))
          $dirty1 = $dirty1 & -3670017;
      }
      $composer_0.endDefaults_b0s0ot_k$();
      if (isTraceInProgress()) {
        traceEventStart(1621472693, $dirty, $dirty1, 'androidx.compose.material3.TextFieldDefaults.DecorationBox$composable (TextFieldDefaults.kt:410)');
      }
      var tmp0_type = TextFieldType_Filled_getInstance();
      CommonDecorationBox$composable(tmp0_type, value, innerTextField, visualTransformation, label_0._v, placeholder_0._v, leadingIcon_0._v, trailingIcon_0._v, prefix_0._v, suffix_0._v, supportingText_0._v, singleLine, enabled, isError_0._v, interactionSource, contentPadding_0._v, colors_0._v, container_0._v, $composer_0, 6 | 112 & $dirty << 3 | 896 & $dirty << 3 | 7168 & $dirty >> 3 | 57344 & $dirty >> 9 | 458752 & $dirty >> 9 | 3670016 & $dirty >> 9 | 29360128 & $dirty1 << 21 | 234881024 & $dirty1 << 21 | 1879048192 & $dirty1 << 21, 14 & $dirty1 >> 9 | 112 & $dirty >> 6 | 896 & $dirty | 7168 & $dirty >> 9 | 57344 & $dirty >> 3 | 458752 & $dirty1 >> 3 | 3670016 & $dirty1 << 3 | 29360128 & $dirty1, 0);
      if (isTraceInProgress()) {
        traceEventEnd();
      }
    } else {
      $composer_0.skipToGroupEnd_lh3zi2_k$();
    }
    var tmp1_safe_receiver = $composer_0.endRestartGroup_yxpjv9_k$();
    if (tmp1_safe_receiver === null)
      null;
    else {
      tmp1_safe_receiver.updateScope_t8jcf_k$(TextFieldDefaults$DecorationBox$composable$lambda_0(this, value, innerTextField, enabled, singleLine, visualTransformation, interactionSource, isError_0, label_0, placeholder_0, leadingIcon_0, trailingIcon_0, prefix_0, suffix_0, supportingText_0, shape_0, colors_0, contentPadding_0, container_0, $changed, $changed1, $default));
    }
  };
  protoOf(TextFieldDefaults).$get_outlinedShape$$composable_rgg4hk_k$ = function ($composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(1734589154);
    sourceInformation($composer_0, 'C($get-outlinedShape$$composable)465@26096L5:TextFieldDefaults.kt#uh7d8r');
    if (isTraceInProgress()) {
      traceEventStart(1734589154, $changed, -1, 'androidx.compose.material3.TextFieldDefaults.$get-outlinedShape$$composable (TextFieldDefaults.kt:465)');
    }
    var tmp0 = OutlinedTextFieldDefaults_getInstance().$get_shape$$composable_df7h3a_k$($composer_0, 6);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0;
  };
  protoOf(TextFieldDefaults).$get_filledShape$$composable_1u3gnc_k$ = function ($composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(1278941090);
    sourceInformation($composer_0, 'C($get-filledShape$$composable)472@26334L5:TextFieldDefaults.kt#uh7d8r');
    if (isTraceInProgress()) {
      traceEventStart(1278941090, $changed, -1, 'androidx.compose.material3.TextFieldDefaults.$get-filledShape$$composable (TextFieldDefaults.kt:472)');
    }
    var tmp0 = this.$get_shape$$composable_df7h3a_k$($composer_0, 14 & $changed);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0;
  };
  protoOf(TextFieldDefaults).FilledContainerBox$composable_n4zut0_k$ = function (enabled, isError, interactionSource, colors, shape, $composer, $changed, $default) {
    var shape_0 = {_v: shape};
    var $composer_0 = $composer;
    $composer_0 = $composer_0.startRestartGroup_lebv1i_k$(-62496115);
    sourceInformation($composer_0, 'C(FilledContainerBox$composable)P(1,3,2)508@27835L5,509@27850L168:TextFieldDefaults.kt#uh7d8r');
    var $dirty = $changed;
    if (!(($default & 1) === 0))
      $dirty = $dirty | 6;
    else if (($changed & 14) === 0)
      $dirty = $dirty | ($composer_0.changed_jpyyrz_k$(enabled) ? 4 : 2);
    if (!(($default & 2) === 0))
      $dirty = $dirty | 48;
    else if (($changed & 112) === 0)
      $dirty = $dirty | ($composer_0.changed_jpyyrz_k$(isError) ? 32 : 16);
    if (!(($default & 4) === 0))
      $dirty = $dirty | 384;
    else if (($changed & 896) === 0)
      $dirty = $dirty | ($composer_0.changed_ga7h3f_k$(interactionSource) ? 256 : 128);
    if (!(($default & 8) === 0))
      $dirty = $dirty | 3072;
    else if (($changed & 7168) === 0)
      $dirty = $dirty | ($composer_0.changed_ga7h3f_k$(colors) ? 2048 : 1024);
    if (($changed & 57344) === 0)
      $dirty = $dirty | ((($default & 16) === 0 ? $composer_0.changed_ga7h3f_k$(shape_0._v) : false) ? 16384 : 8192);
    if (!(($default & 32) === 0))
      $dirty = $dirty | 196608;
    else if (($changed & 458752) === 0)
      $dirty = $dirty | ($composer_0.changed_ga7h3f_k$(this) ? 131072 : 65536);
    if (!(($dirty & 374491) === 74898) ? true : !$composer_0.get_skipping_3owdve_k$()) {
      $composer_0.startDefaults_g83kzo_k$();
      if (($changed & 1) === 0 ? true : $composer_0.get_defaultsInvalid_y88fc4_k$()) {
        if (!(($default & 16) === 0)) {
          shape_0._v = TextFieldDefaults_getInstance().$get_shape$$composable_df7h3a_k$($composer_0, 6);
          $dirty = $dirty & -57345;
        }
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        if (!(($default & 16) === 0))
          $dirty = $dirty & -57345;
      }
      $composer_0.endDefaults_b0s0ot_k$();
      if (isTraceInProgress()) {
        traceEventStart(-62496115, $dirty, -1, 'androidx.compose.material3.TextFieldDefaults.FilledContainerBox$composable (TextFieldDefaults.kt:503)');
      }
      this.ContainerBox$composable_fxa6bu_k$(enabled, isError, interactionSource, colors, shape_0._v, $composer_0, 14 & $dirty | 112 & $dirty | 896 & $dirty | 7168 & $dirty | 57344 & $dirty | 458752 & $dirty, 0);
      if (isTraceInProgress()) {
        traceEventEnd();
      }
    } else {
      $composer_0.skipToGroupEnd_lh3zi2_k$();
    }
    var tmp1_safe_receiver = $composer_0.endRestartGroup_yxpjv9_k$();
    if (tmp1_safe_receiver === null)
      null;
    else {
      tmp1_safe_receiver.updateScope_t8jcf_k$(TextFieldDefaults$FilledContainerBox$composable$lambda(this, enabled, isError, interactionSource, colors, shape_0, $changed, $default));
    }
  };
  protoOf(TextFieldDefaults).OutlinedBorderContainerBox$composable_xo5wzs_k$ = function (enabled, isError, interactionSource, colors, shape, focusedBorderThickness, unfocusedBorderThickness, $composer, $changed, $default) {
    var shape_0 = {_v: shape};
    var focusedBorderThickness_0 = {_v: new Dp(focusedBorderThickness)};
    var unfocusedBorderThickness_0 = {_v: new Dp(unfocusedBorderThickness)};
    var $composer_0 = $composer;
    $composer_0 = $composer_0.startRestartGroup_lebv1i_k$(-846963751);
    sourceInformation($composer_0, 'C(OutlinedBorderContainerBox$composable)P(1,4,3!1,5,2:c#ui.unit.Dp,6:c#ui.unit.Dp)538@28994L9,541@29216L286:TextFieldDefaults.kt#uh7d8r');
    var $dirty = $changed;
    if (!(($default & 1) === 0))
      $dirty = $dirty | 6;
    else if (($changed & 14) === 0)
      $dirty = $dirty | ($composer_0.changed_jpyyrz_k$(enabled) ? 4 : 2);
    if (!(($default & 2) === 0))
      $dirty = $dirty | 48;
    else if (($changed & 112) === 0)
      $dirty = $dirty | ($composer_0.changed_jpyyrz_k$(isError) ? 32 : 16);
    if (!(($default & 4) === 0))
      $dirty = $dirty | 384;
    else if (($changed & 896) === 0)
      $dirty = $dirty | ($composer_0.changed_ga7h3f_k$(interactionSource) ? 256 : 128);
    if (!(($default & 8) === 0))
      $dirty = $dirty | 3072;
    else if (($changed & 7168) === 0)
      $dirty = $dirty | ($composer_0.changed_ga7h3f_k$(colors) ? 2048 : 1024);
    if (($changed & 57344) === 0)
      $dirty = $dirty | ((($default & 16) === 0 ? $composer_0.changed_ga7h3f_k$(shape_0._v) : false) ? 16384 : 8192);
    if (!(($default & 32) === 0))
      $dirty = $dirty | 196608;
    else if (($changed & 458752) === 0)
      $dirty = $dirty | ($composer_0.changed_i8bvic_k$(_Dp___get_value__impl__geb1vb(focusedBorderThickness_0._v.value_1)) ? 131072 : 65536);
    if (!(($default & 64) === 0))
      $dirty = $dirty | 1572864;
    else if (($changed & 3670016) === 0)
      $dirty = $dirty | ($composer_0.changed_i8bvic_k$(_Dp___get_value__impl__geb1vb(unfocusedBorderThickness_0._v.value_1)) ? 1048576 : 524288);
    if (!(($dirty & 2995931) === 599186) ? true : !$composer_0.get_skipping_3owdve_k$()) {
      $composer_0.startDefaults_g83kzo_k$();
      if (($changed & 1) === 0 ? true : $composer_0.get_defaultsInvalid_y88fc4_k$()) {
        if (!(($default & 16) === 0)) {
          shape_0._v = toShape$composable(OutlinedTextFieldTokens_getInstance().get_ContainerShape_ur17m1_k$(), $composer_0, 6);
          $dirty = $dirty & -57345;
        }
        if (!(($default & 32) === 0)) {
          focusedBorderThickness_0._v = new Dp(OutlinedTextFieldDefaults_getInstance().FocusedBorderThickness_1);
        }
        if (!(($default & 64) === 0)) {
          unfocusedBorderThickness_0._v = new Dp(OutlinedTextFieldDefaults_getInstance().UnfocusedBorderThickness_1);
        }
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        if (!(($default & 16) === 0))
          $dirty = $dirty & -57345;
      }
      $composer_0.endDefaults_b0s0ot_k$();
      if (isTraceInProgress()) {
        traceEventStart(-846963751, $dirty, -1, 'androidx.compose.material3.TextFieldDefaults.OutlinedBorderContainerBox$composable (TextFieldDefaults.kt:533)');
      }
      OutlinedTextFieldDefaults_getInstance().ContainerBox$composable_cszs2e_k$(enabled, isError, interactionSource, colors, shape_0._v, focusedBorderThickness_0._v.value_1, unfocusedBorderThickness_0._v.value_1, $composer_0, 12582912 | 14 & $dirty | 112 & $dirty | 896 & $dirty | 7168 & $dirty | 57344 & $dirty | 458752 & $dirty | 3670016 & $dirty, 0);
      if (isTraceInProgress()) {
        traceEventEnd();
      }
    } else {
      $composer_0.skipToGroupEnd_lh3zi2_k$();
    }
    var tmp1_safe_receiver = $composer_0.endRestartGroup_yxpjv9_k$();
    if (tmp1_safe_receiver === null)
      null;
    else {
      tmp1_safe_receiver.updateScope_t8jcf_k$(TextFieldDefaults$OutlinedBorderContainerBox$composable$lambda(this, enabled, isError, interactionSource, colors, shape_0, focusedBorderThickness_0, unfocusedBorderThickness_0, $changed, $default));
    }
  };
  protoOf(TextFieldDefaults).textFieldColors$composable_v5pgs1_k$ = function (focusedTextColor, unfocusedTextColor, disabledTextColor, errorTextColor, containerColor, errorContainerColor, cursorColor, errorCursorColor, selectionColors, focusedIndicatorColor, unfocusedIndicatorColor, disabledIndicatorColor, errorIndicatorColor, focusedLeadingIconColor, unfocusedLeadingIconColor, disabledLeadingIconColor, errorLeadingIconColor, focusedTrailingIconColor, unfocusedTrailingIconColor, disabledTrailingIconColor, errorTrailingIconColor, focusedLabelColor, unfocusedLabelColor, disabledLabelColor, errorLabelColor, focusedPlaceholderColor, unfocusedPlaceholderColor, disabledPlaceholderColor, errorPlaceholderColor, focusedSupportingTextColor, unfocusedSupportingTextColor, disabledSupportingTextColor, errorSupportingTextColor, focusedPrefixColor, unfocusedPrefixColor, disabledPrefixColor, errorPrefixColor, focusedSuffixColor, unfocusedSuffixColor, disabledSuffixColor, errorSuffixColor, $composer, $changed, $changed1, $changed2, $changed3, $changed4, $default, $default1) {
    var focusedTextColor_0 = focusedTextColor;
    var unfocusedTextColor_0 = unfocusedTextColor;
    var disabledTextColor_0 = disabledTextColor;
    var errorTextColor_0 = errorTextColor;
    var containerColor_0 = containerColor;
    var errorContainerColor_0 = errorContainerColor;
    var cursorColor_0 = cursorColor;
    var errorCursorColor_0 = errorCursorColor;
    var selectionColors_0 = selectionColors;
    var focusedIndicatorColor_0 = focusedIndicatorColor;
    var unfocusedIndicatorColor_0 = unfocusedIndicatorColor;
    var disabledIndicatorColor_0 = disabledIndicatorColor;
    var errorIndicatorColor_0 = errorIndicatorColor;
    var focusedLeadingIconColor_0 = focusedLeadingIconColor;
    var unfocusedLeadingIconColor_0 = unfocusedLeadingIconColor;
    var disabledLeadingIconColor_0 = disabledLeadingIconColor;
    var errorLeadingIconColor_0 = errorLeadingIconColor;
    var focusedTrailingIconColor_0 = focusedTrailingIconColor;
    var unfocusedTrailingIconColor_0 = unfocusedTrailingIconColor;
    var disabledTrailingIconColor_0 = disabledTrailingIconColor;
    var errorTrailingIconColor_0 = errorTrailingIconColor;
    var focusedLabelColor_0 = focusedLabelColor;
    var unfocusedLabelColor_0 = unfocusedLabelColor;
    var disabledLabelColor_0 = disabledLabelColor;
    var errorLabelColor_0 = errorLabelColor;
    var focusedPlaceholderColor_0 = focusedPlaceholderColor;
    var unfocusedPlaceholderColor_0 = unfocusedPlaceholderColor;
    var disabledPlaceholderColor_0 = disabledPlaceholderColor;
    var errorPlaceholderColor_0 = errorPlaceholderColor;
    var focusedSupportingTextColor_0 = focusedSupportingTextColor;
    var unfocusedSupportingTextColor_0 = unfocusedSupportingTextColor;
    var disabledSupportingTextColor_0 = disabledSupportingTextColor;
    var errorSupportingTextColor_0 = errorSupportingTextColor;
    var focusedPrefixColor_0 = focusedPrefixColor;
    var unfocusedPrefixColor_0 = unfocusedPrefixColor;
    var disabledPrefixColor_0 = disabledPrefixColor;
    var errorPrefixColor_0 = errorPrefixColor;
    var focusedSuffixColor_0 = focusedSuffixColor;
    var unfocusedSuffixColor_0 = unfocusedSuffixColor;
    var disabledSuffixColor_0 = disabledSuffixColor;
    var errorSuffixColor_0 = errorSuffixColor;
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(-1275840713);
    sourceInformation($composer_0, 'C(textFieldColors$composable)P(29:c#ui.graphics.Color,39:c#ui.graphics.Color,9:c#ui.graphics.Color,20:c#ui.graphics.Color,0:c#ui.graphics.Color,11:c#ui.graphics.Color,1:c#ui.graphics.Color,12:c#ui.graphics.Color,31,22:c#ui.graphics.Color,32:c#ui.graphics.Color,2:c#ui.graphics.Color,13:c#ui.graphics.Color,24:c#ui.graphics.Color,34:c#ui.graphics.Color,4:c#ui.graphics.Color,15:c#ui.graphics.Color,30:c#ui.graphics.Color,40:c#ui.graphics.Color,10:c#ui.graphics.Color,21:c#ui.graphics.Color,23:c#ui.graphics.Color,33:c#ui.graphics.Color,3:c#ui.graphics.Color,14:c#ui.graphics.Color,25:c#ui.graphics.Color,35:c#ui.graphics.Color,5:c#ui.graphics.Color,16:c#ui.graphics.Color,28:c#ui.graphics.Color,38:c#ui.graphics.Color,8:c#ui.graphics.Color,19:c#ui.graphics.Color,26:c#ui.graphics.Color,36:c#ui.graphics.Color,6:c#ui.graphics.Color,17:c#ui.graphics.Color,27:c#ui.graphics.Color,37:c#ui.graphics.Color,7:c#ui.graphics.Color,18:c#ui.graphics.Color)671@35322L9,672@35402L9,673@35489L9,675@35640L9,676@35720L9,677@35805L9,678@35878L9,679@35966L9,680@36049L7,681@36145L9,682@36240L9,683@36342L9,685@36518L9,686@36614L9,687@36707L9,688@36807L9,690@36977L9,691@37075L9,692@37170L9,693@37272L9,695@37445L9,696@37529L9,697@37610L9,698@37698L9,700@37850L9,701@37946L9,702@38044L9,703@38138L9,705@38302L9,706@38400L9,707@38495L9,708@38597L9,710@38768L9,711@38854L9,712@38942L9,713@39029L9,715@39183L9,716@39269L9,717@39357L9,718@39444L9,720@39598L9,721@39634L2308:TextFieldDefaults.kt#uh7d8r');
    if (!(($default & 1) === 0))
      focusedTextColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_FocusInputColor_ydhhuw_k$(), $composer_0, 6);
    if (!(($default & 2) === 0))
      unfocusedTextColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_InputColor_zapq3m_k$(), $composer_0, 6);
    if (!(($default & 4) === 0))
      disabledTextColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(FilledTextFieldTokens_getInstance().get_DisabledInputColor_84w2ke_k$(), $composer_0, 6), FilledTextFieldTokens_getInstance().get_DisabledInputOpacity_vi261m_k$());
    if (!(($default & 8) === 0))
      errorTextColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_ErrorInputColor_hh1yg_k$(), $composer_0, 6);
    if (!(($default & 16) === 0))
      containerColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_ContainerColor_uid763_k$(), $composer_0, 6);
    if (!(($default & 32) === 0))
      errorContainerColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_ContainerColor_uid763_k$(), $composer_0, 6);
    if (!(($default & 64) === 0))
      cursorColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_CaretColor_hxe08n_k$(), $composer_0, 6);
    if (!(($default & 128) === 0))
      errorCursorColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_ErrorFocusCaretColor_vrfnbt_k$(), $composer_0, 6);
    if (!(($default & 256) === 0)) {
      // Inline function 'androidx.compose.runtime.CompositionLocal.$get-current$$composable' call
      var this_0 = get_LocalTextSelectionColors();
      var $composer_1 = $composer_0;
      sourceInformationMarkerStart($composer_1, 858843746, 'CC($get-current$$composable):CompositionLocal.kt#9igjgp');
      var tmp0 = $composer_1.consume_ebzcrh_k$(this_0);
      sourceInformationMarkerEnd($composer_1);
      selectionColors_0 = tmp0;
    }
    if (!(($default & 512) === 0))
      focusedIndicatorColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_FocusActiveIndicatorColor_9rlorb_k$(), $composer_0, 6);
    if (!(($default & 1024) === 0))
      unfocusedIndicatorColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_ActiveIndicatorColor_qs91el_k$(), $composer_0, 6);
    if (!(($default & 2048) === 0))
      disabledIndicatorColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(FilledTextFieldTokens_getInstance().get_DisabledActiveIndicatorColor_bvdiyn_k$(), $composer_0, 6), FilledTextFieldTokens_getInstance().get_DisabledActiveIndicatorOpacity_6y9rl3_k$());
    if (!(($default & 4096) === 0))
      errorIndicatorColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_ErrorActiveIndicatorColor_vkr8ux_k$(), $composer_0, 6);
    if (!(($default & 8192) === 0))
      focusedLeadingIconColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_FocusLeadingIconColor_pqzv77_k$(), $composer_0, 6);
    if (!(($default & 16384) === 0))
      unfocusedLeadingIconColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_LeadingIconColor_4sfzzh_k$(), $composer_0, 6);
    if (!(($default & 32768) === 0))
      disabledLeadingIconColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(FilledTextFieldTokens_getInstance().get_DisabledLeadingIconColor_dtgxah_k$(), $composer_0, 6), FilledTextFieldTokens_getInstance().get_DisabledLeadingIconOpacity_va1u41_k$());
    if (!(($default & 65536) === 0))
      errorLeadingIconColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_ErrorLeadingIconColor_b3l6n7_k$(), $composer_0, 6);
    if (!(($default & 131072) === 0))
      focusedTrailingIconColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_FocusTrailingIconColor_xs0xep_k$(), $composer_0, 6);
    if (!(($default & 262144) === 0))
      unfocusedTrailingIconColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_TrailingIconColor_qrzqp1_k$(), $composer_0, 6);
    if (!(($default & 524288) === 0))
      disabledTrailingIconColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(FilledTextFieldTokens_getInstance().get_DisabledTrailingIconColor_mjc79l_k$(), $composer_0, 6), FilledTextFieldTokens_getInstance().get_DisabledTrailingIconOpacity_s6onap_k$());
    if (!(($default & 1048576) === 0))
      errorTrailingIconColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_ErrorTrailingIconColor_9a4b73_k$(), $composer_0, 6);
    if (!(($default & 2097152) === 0))
      focusedLabelColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_FocusLabelColor_fu63wi_k$(), $composer_0, 6);
    if (!(($default & 4194304) === 0))
      unfocusedLabelColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_LabelColor_ewxvns_k$(), $composer_0, 6);
    if (!(($default & 8388608) === 0))
      disabledLabelColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(FilledTextFieldTokens_getInstance().get_DisabledLabelColor_sycis4_k$(), $composer_0, 6), FilledTextFieldTokens_getInstance().get_DisabledLabelOpacity_f5f918_k$());
    if (!(($default & 16777216) === 0))
      errorLabelColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_ErrorLabelColor_kbze9a_k$(), $composer_0, 6);
    if (!(($default & 33554432) === 0))
      focusedPlaceholderColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_InputPlaceholderColor_5cj1ap_k$(), $composer_0, 6);
    if (!(($default & 67108864) === 0))
      unfocusedPlaceholderColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_InputPlaceholderColor_5cj1ap_k$(), $composer_0, 6);
    if (!(($default & 134217728) === 0))
      disabledPlaceholderColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(FilledTextFieldTokens_getInstance().get_DisabledInputColor_84w2ke_k$(), $composer_0, 6), FilledTextFieldTokens_getInstance().get_DisabledInputOpacity_vi261m_k$());
    if (!(($default & 268435456) === 0))
      errorPlaceholderColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_InputPlaceholderColor_5cj1ap_k$(), $composer_0, 6);
    if (!(($default & 536870912) === 0))
      focusedSupportingTextColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_FocusSupportingColor_nyu4nz_k$(), $composer_0, 6);
    if (!(($default & 1073741824) === 0))
      unfocusedSupportingTextColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_SupportingColor_eb3yw7_k$(), $composer_0, 6);
    if (!(($default1 & 1) === 0))
      disabledSupportingTextColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(FilledTextFieldTokens_getInstance().get_DisabledSupportingColor_hh8a7p_k$(), $composer_0, 6), FilledTextFieldTokens_getInstance().get_DisabledSupportingOpacity_prppv_k$());
    if (!(($default1 & 2) === 0))
      errorSupportingTextColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_ErrorSupportingColor_63y79r_k$(), $composer_0, 6);
    if (!(($default1 & 4) === 0))
      focusedPrefixColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_InputPrefixColor_l0lf3k_k$(), $composer_0, 6);
    if (!(($default1 & 8) === 0))
      unfocusedPrefixColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_InputPrefixColor_l0lf3k_k$(), $composer_0, 6);
    if (!(($default1 & 16) === 0))
      disabledPrefixColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(FilledTextFieldTokens_getInstance().get_InputPrefixColor_l0lf3k_k$(), $composer_0, 6), FilledTextFieldTokens_getInstance().get_DisabledInputOpacity_vi261m_k$());
    if (!(($default1 & 32) === 0))
      errorPrefixColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_InputPrefixColor_l0lf3k_k$(), $composer_0, 6);
    if (!(($default1 & 64) === 0))
      focusedSuffixColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_InputSuffixColor_ya4w9d_k$(), $composer_0, 6);
    if (!(($default1 & 128) === 0))
      unfocusedSuffixColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_InputSuffixColor_ya4w9d_k$(), $composer_0, 6);
    if (!(($default1 & 256) === 0))
      disabledSuffixColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(FilledTextFieldTokens_getInstance().get_InputSuffixColor_ya4w9d_k$(), $composer_0, 6), FilledTextFieldTokens_getInstance().get_DisabledInputOpacity_vi261m_k$());
    if (!(($default1 & 512) === 0))
      errorSuffixColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_InputSuffixColor_ya4w9d_k$(), $composer_0, 6);
    if (isTraceInProgress()) {
      traceEventStart(-1275840713, $changed, $changed1, 'androidx.compose.material3.TextFieldDefaults.textFieldColors$composable (TextFieldDefaults.kt:670)');
    }
    var tmp0_0 = this.colors$composable_uqty46_k$(focusedTextColor_0, unfocusedTextColor_0, disabledTextColor_0, errorTextColor_0, containerColor_0, containerColor_0, containerColor_0, errorContainerColor_0, cursorColor_0, errorCursorColor_0, selectionColors_0, focusedIndicatorColor_0, unfocusedIndicatorColor_0, disabledIndicatorColor_0, errorIndicatorColor_0, focusedLeadingIconColor_0, unfocusedLeadingIconColor_0, disabledLeadingIconColor_0, errorLeadingIconColor_0, focusedTrailingIconColor_0, unfocusedTrailingIconColor_0, disabledTrailingIconColor_0, errorTrailingIconColor_0, focusedLabelColor_0, unfocusedLabelColor_0, disabledLabelColor_0, errorLabelColor_0, focusedPlaceholderColor_0, unfocusedPlaceholderColor_0, disabledPlaceholderColor_0, errorPlaceholderColor_0, focusedSupportingTextColor_0, unfocusedSupportingTextColor_0, disabledSupportingTextColor_0, errorSupportingTextColor_0, focusedPrefixColor_0, unfocusedPrefixColor_0, disabledPrefixColor_0, errorPrefixColor_0, focusedSuffixColor_0, unfocusedSuffixColor_0, disabledSuffixColor_0, errorSuffixColor_0, $composer_0, 14 & $changed | 112 & $changed | 896 & $changed | 7168 & $changed | 57344 & $changed | 458752 & $changed << 3 | 3670016 & $changed << 6 | 29360128 & $changed << 6 | 234881024 & $changed << 6 | 1879048192 & $changed << 6, 14 & $changed >> 24 | 112 & $changed >> 24 | 896 & $changed1 << 6 | 7168 & $changed1 << 6 | 57344 & $changed1 << 6 | 458752 & $changed1 << 6 | 3670016 & $changed1 << 6 | 29360128 & $changed1 << 6 | 234881024 & $changed1 << 6 | 1879048192 & $changed1 << 6, 14 & $changed1 >> 24 | 112 & $changed1 >> 24 | 896 & $changed2 << 6 | 7168 & $changed2 << 6 | 57344 & $changed2 << 6 | 458752 & $changed2 << 6 | 3670016 & $changed2 << 6 | 29360128 & $changed2 << 6 | 234881024 & $changed2 << 6 | 1879048192 & $changed2 << 6, 14 & $changed2 >> 24 | 112 & $changed2 >> 24 | 896 & $changed3 << 6 | 7168 & $changed3 << 6 | 57344 & $changed3 << 6 | 458752 & $changed3 << 6 | 3670016 & $changed3 << 6 | 29360128 & $changed3 << 6 | 234881024 & $changed3 << 6 | 1879048192 & $changed3 << 6, 14 & $changed3 >> 24 | 112 & $changed3 >> 24 | 896 & $changed4 << 6 | 7168 & $changed4 << 6, 0, 0);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0_0;
  };
  protoOf(TextFieldDefaults).outlinedTextFieldColors$composable_x5c8fj_k$ = function (focusedTextColor, unfocusedTextColor, disabledTextColor, errorTextColor, containerColor, errorContainerColor, cursorColor, errorCursorColor, selectionColors, focusedBorderColor, unfocusedBorderColor, disabledBorderColor, errorBorderColor, focusedLeadingIconColor, unfocusedLeadingIconColor, disabledLeadingIconColor, errorLeadingIconColor, focusedTrailingIconColor, unfocusedTrailingIconColor, disabledTrailingIconColor, errorTrailingIconColor, focusedLabelColor, unfocusedLabelColor, disabledLabelColor, errorLabelColor, focusedPlaceholderColor, unfocusedPlaceholderColor, disabledPlaceholderColor, errorPlaceholderColor, focusedSupportingTextColor, unfocusedSupportingTextColor, disabledSupportingTextColor, errorSupportingTextColor, focusedPrefixColor, unfocusedPrefixColor, disabledPrefixColor, errorPrefixColor, focusedSuffixColor, unfocusedSuffixColor, disabledSuffixColor, errorSuffixColor, $composer, $changed, $changed1, $changed2, $changed3, $changed4, $default, $default1) {
    var focusedTextColor_0 = focusedTextColor;
    var unfocusedTextColor_0 = unfocusedTextColor;
    var disabledTextColor_0 = disabledTextColor;
    var errorTextColor_0 = errorTextColor;
    var containerColor_0 = containerColor;
    var errorContainerColor_0 = errorContainerColor;
    var cursorColor_0 = cursorColor;
    var errorCursorColor_0 = errorCursorColor;
    var selectionColors_0 = selectionColors;
    var focusedBorderColor_0 = focusedBorderColor;
    var unfocusedBorderColor_0 = unfocusedBorderColor;
    var disabledBorderColor_0 = disabledBorderColor;
    var errorBorderColor_0 = errorBorderColor;
    var focusedLeadingIconColor_0 = focusedLeadingIconColor;
    var unfocusedLeadingIconColor_0 = unfocusedLeadingIconColor;
    var disabledLeadingIconColor_0 = disabledLeadingIconColor;
    var errorLeadingIconColor_0 = errorLeadingIconColor;
    var focusedTrailingIconColor_0 = focusedTrailingIconColor;
    var unfocusedTrailingIconColor_0 = unfocusedTrailingIconColor;
    var disabledTrailingIconColor_0 = disabledTrailingIconColor;
    var errorTrailingIconColor_0 = errorTrailingIconColor;
    var focusedLabelColor_0 = focusedLabelColor;
    var unfocusedLabelColor_0 = unfocusedLabelColor;
    var disabledLabelColor_0 = disabledLabelColor;
    var errorLabelColor_0 = errorLabelColor;
    var focusedPlaceholderColor_0 = focusedPlaceholderColor;
    var unfocusedPlaceholderColor_0 = unfocusedPlaceholderColor;
    var disabledPlaceholderColor_0 = disabledPlaceholderColor;
    var errorPlaceholderColor_0 = errorPlaceholderColor;
    var focusedSupportingTextColor_0 = focusedSupportingTextColor;
    var unfocusedSupportingTextColor_0 = unfocusedSupportingTextColor;
    var disabledSupportingTextColor_0 = disabledSupportingTextColor;
    var errorSupportingTextColor_0 = errorSupportingTextColor;
    var focusedPrefixColor_0 = focusedPrefixColor;
    var unfocusedPrefixColor_0 = unfocusedPrefixColor;
    var disabledPrefixColor_0 = disabledPrefixColor;
    var errorPrefixColor_0 = errorPrefixColor;
    var focusedSuffixColor_0 = focusedSuffixColor;
    var unfocusedSuffixColor_0 = unfocusedSuffixColor;
    var disabledSuffixColor_0 = disabledSuffixColor;
    var errorSuffixColor_0 = errorSuffixColor;
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(847412025);
    sourceInformation($composer_0, 'C(outlinedTextFieldColors$composable)P(29:c#ui.graphics.Color,39:c#ui.graphics.Color,9:c#ui.graphics.Color,20:c#ui.graphics.Color,0:c#ui.graphics.Color,12:c#ui.graphics.Color,1:c#ui.graphics.Color,13:c#ui.graphics.Color,31,22:c#ui.graphics.Color,32:c#ui.graphics.Color,2:c#ui.graphics.Color,11:c#ui.graphics.Color,24:c#ui.graphics.Color,34:c#ui.graphics.Color,4:c#ui.graphics.Color,15:c#ui.graphics.Color,30:c#ui.graphics.Color,40:c#ui.graphics.Color,10:c#ui.graphics.Color,21:c#ui.graphics.Color,23:c#ui.graphics.Color,33:c#ui.graphics.Color,3:c#ui.graphics.Color,14:c#ui.graphics.Color,25:c#ui.graphics.Color,35:c#ui.graphics.Color,5:c#ui.graphics.Color,16:c#ui.graphics.Color,28:c#ui.graphics.Color,38:c#ui.graphics.Color,8:c#ui.graphics.Color,19:c#ui.graphics.Color,26:c#ui.graphics.Color,36:c#ui.graphics.Color,6:c#ui.graphics.Color,17:c#ui.graphics.Color,27:c#ui.graphics.Color,37:c#ui.graphics.Color,7:c#ui.graphics.Color,18:c#ui.graphics.Color)821@45523L9,822@45605L9,823@45694L9,825@45849L9,828@46031L9,829@46121L9,830@46204L7,831@46291L9,832@46377L9,833@46470L9,835@46631L9,836@46729L9,837@46824L9,838@46926L9,840@47100L9,841@47200L9,842@47297L9,844@47414L9,845@47578L9,846@47664L9,847@47747L9,848@47837L9,850@47993L9,851@48091L9,852@48191L9,853@48287L9,855@48455L9,856@48555L9,857@48652L9,859@48769L9,860@48931L9,861@49019L9,862@49109L9,863@49198L9,865@49356L9,866@49444L9,867@49534L9,868@49623L9,870@49781L9,871@49843L2284:TextFieldDefaults.kt#uh7d8r');
    if (!(($default & 1) === 0))
      focusedTextColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_FocusInputColor_ydhhuw_k$(), $composer_0, 6);
    if (!(($default & 2) === 0))
      unfocusedTextColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_InputColor_zapq3m_k$(), $composer_0, 6);
    if (!(($default & 4) === 0))
      disabledTextColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(OutlinedTextFieldTokens_getInstance().get_DisabledInputColor_84w2ke_k$(), $composer_0, 6), OutlinedTextFieldTokens_getInstance().get_DisabledInputOpacity_vi261m_k$());
    if (!(($default & 8) === 0))
      errorTextColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_ErrorInputColor_hh1yg_k$(), $composer_0, 6);
    if (!(($default & 16) === 0))
      containerColor_0 = Companion_getInstance().get_Transparent_if5ln4_k$();
    if (!(($default & 32) === 0))
      errorContainerColor_0 = Companion_getInstance().get_Transparent_if5ln4_k$();
    if (!(($default & 64) === 0))
      cursorColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_CaretColor_hxe08n_k$(), $composer_0, 6);
    if (!(($default & 128) === 0))
      errorCursorColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_ErrorFocusCaretColor_vrfnbt_k$(), $composer_0, 6);
    if (!(($default & 256) === 0)) {
      // Inline function 'androidx.compose.runtime.CompositionLocal.$get-current$$composable' call
      var this_0 = get_LocalTextSelectionColors();
      var $composer_1 = $composer_0;
      sourceInformationMarkerStart($composer_1, 858843746, 'CC($get-current$$composable):CompositionLocal.kt#9igjgp');
      var tmp0 = $composer_1.consume_ebzcrh_k$(this_0);
      sourceInformationMarkerEnd($composer_1);
      selectionColors_0 = tmp0;
    }
    if (!(($default & 512) === 0))
      focusedBorderColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_FocusOutlineColor_j0f8fk_k$(), $composer_0, 6);
    if (!(($default & 1024) === 0))
      unfocusedBorderColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_OutlineColor_hddgeu_k$(), $composer_0, 6);
    if (!(($default & 2048) === 0))
      disabledBorderColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(OutlinedTextFieldTokens_getInstance().get_DisabledOutlineColor_jjhidi_k$(), $composer_0, 6), OutlinedTextFieldTokens_getInstance().get_DisabledOutlineOpacity_9n3m4y_k$());
    if (!(($default & 4096) === 0))
      errorBorderColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_ErrorOutlineColor_pvtv8g_k$(), $composer_0, 6);
    if (!(($default & 8192) === 0))
      focusedLeadingIconColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_FocusLeadingIconColor_pqzv77_k$(), $composer_0, 6);
    if (!(($default & 16384) === 0))
      unfocusedLeadingIconColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_LeadingIconColor_4sfzzh_k$(), $composer_0, 6);
    if (!(($default & 32768) === 0))
      disabledLeadingIconColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(OutlinedTextFieldTokens_getInstance().get_DisabledLeadingIconColor_dtgxah_k$(), $composer_0, 6), OutlinedTextFieldTokens_getInstance().get_DisabledLeadingIconOpacity_va1u41_k$());
    if (!(($default & 65536) === 0))
      errorLeadingIconColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_ErrorLeadingIconColor_b3l6n7_k$(), $composer_0, 6);
    if (!(($default & 131072) === 0))
      focusedTrailingIconColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_FocusTrailingIconColor_xs0xep_k$(), $composer_0, 6);
    if (!(($default & 262144) === 0))
      unfocusedTrailingIconColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_TrailingIconColor_qrzqp1_k$(), $composer_0, 6);
    if (!(($default & 524288) === 0))
      disabledTrailingIconColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(OutlinedTextFieldTokens_getInstance().get_DisabledTrailingIconColor_mjc79l_k$(), $composer_0, 6), OutlinedTextFieldTokens_getInstance().get_DisabledTrailingIconOpacity_s6onap_k$());
    if (!(($default & 1048576) === 0))
      errorTrailingIconColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_ErrorTrailingIconColor_9a4b73_k$(), $composer_0, 6);
    if (!(($default & 2097152) === 0))
      focusedLabelColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_FocusLabelColor_fu63wi_k$(), $composer_0, 6);
    if (!(($default & 4194304) === 0))
      unfocusedLabelColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_LabelColor_ewxvns_k$(), $composer_0, 6);
    if (!(($default & 8388608) === 0))
      disabledLabelColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(OutlinedTextFieldTokens_getInstance().get_DisabledLabelColor_sycis4_k$(), $composer_0, 6), OutlinedTextFieldTokens_getInstance().get_DisabledLabelOpacity_f5f918_k$());
    if (!(($default & 16777216) === 0))
      errorLabelColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_ErrorLabelColor_kbze9a_k$(), $composer_0, 6);
    if (!(($default & 33554432) === 0))
      focusedPlaceholderColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_InputPlaceholderColor_5cj1ap_k$(), $composer_0, 6);
    if (!(($default & 67108864) === 0))
      unfocusedPlaceholderColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_InputPlaceholderColor_5cj1ap_k$(), $composer_0, 6);
    if (!(($default & 134217728) === 0))
      disabledPlaceholderColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(OutlinedTextFieldTokens_getInstance().get_DisabledInputColor_84w2ke_k$(), $composer_0, 6), OutlinedTextFieldTokens_getInstance().get_DisabledInputOpacity_vi261m_k$());
    if (!(($default & 268435456) === 0))
      errorPlaceholderColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_InputPlaceholderColor_5cj1ap_k$(), $composer_0, 6);
    if (!(($default & 536870912) === 0))
      focusedSupportingTextColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_FocusSupportingColor_nyu4nz_k$(), $composer_0, 6);
    if (!(($default & 1073741824) === 0))
      unfocusedSupportingTextColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_SupportingColor_eb3yw7_k$(), $composer_0, 6);
    if (!(($default1 & 1) === 0))
      disabledSupportingTextColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(OutlinedTextFieldTokens_getInstance().get_DisabledSupportingColor_hh8a7p_k$(), $composer_0, 6), OutlinedTextFieldTokens_getInstance().get_DisabledSupportingOpacity_prppv_k$());
    if (!(($default1 & 2) === 0))
      errorSupportingTextColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_ErrorSupportingColor_63y79r_k$(), $composer_0, 6);
    if (!(($default1 & 4) === 0))
      focusedPrefixColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_InputPrefixColor_l0lf3k_k$(), $composer_0, 6);
    if (!(($default1 & 8) === 0))
      unfocusedPrefixColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_InputPrefixColor_l0lf3k_k$(), $composer_0, 6);
    if (!(($default1 & 16) === 0))
      disabledPrefixColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(OutlinedTextFieldTokens_getInstance().get_InputPrefixColor_l0lf3k_k$(), $composer_0, 6), OutlinedTextFieldTokens_getInstance().get_DisabledInputOpacity_vi261m_k$());
    if (!(($default1 & 32) === 0))
      errorPrefixColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_InputPrefixColor_l0lf3k_k$(), $composer_0, 6);
    if (!(($default1 & 64) === 0))
      focusedSuffixColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_InputSuffixColor_ya4w9d_k$(), $composer_0, 6);
    if (!(($default1 & 128) === 0))
      unfocusedSuffixColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_InputSuffixColor_ya4w9d_k$(), $composer_0, 6);
    if (!(($default1 & 256) === 0))
      disabledSuffixColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(OutlinedTextFieldTokens_getInstance().get_InputSuffixColor_ya4w9d_k$(), $composer_0, 6), OutlinedTextFieldTokens_getInstance().get_DisabledInputOpacity_vi261m_k$());
    if (!(($default1 & 512) === 0))
      errorSuffixColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_InputSuffixColor_ya4w9d_k$(), $composer_0, 6);
    if (isTraceInProgress()) {
      traceEventStart(847412025, $changed, $changed1, 'androidx.compose.material3.TextFieldDefaults.outlinedTextFieldColors$composable (TextFieldDefaults.kt:820)');
    }
    var tmp0_0 = OutlinedTextFieldDefaults_getInstance().colors$composable_uqty46_k$(focusedTextColor_0, unfocusedTextColor_0, disabledTextColor_0, errorTextColor_0, containerColor_0, containerColor_0, containerColor_0, errorContainerColor_0, cursorColor_0, errorCursorColor_0, selectionColors_0, focusedBorderColor_0, unfocusedBorderColor_0, disabledBorderColor_0, errorBorderColor_0, focusedLeadingIconColor_0, unfocusedLeadingIconColor_0, disabledLeadingIconColor_0, errorLeadingIconColor_0, focusedTrailingIconColor_0, unfocusedTrailingIconColor_0, disabledTrailingIconColor_0, errorTrailingIconColor_0, focusedLabelColor_0, unfocusedLabelColor_0, disabledLabelColor_0, errorLabelColor_0, focusedPlaceholderColor_0, unfocusedPlaceholderColor_0, disabledPlaceholderColor_0, errorPlaceholderColor_0, focusedSupportingTextColor_0, unfocusedSupportingTextColor_0, disabledSupportingTextColor_0, errorSupportingTextColor_0, focusedPrefixColor_0, unfocusedPrefixColor_0, disabledPrefixColor_0, errorPrefixColor_0, focusedSuffixColor_0, unfocusedSuffixColor_0, disabledSuffixColor_0, errorSuffixColor_0, $composer_0, 14 & $changed | 112 & $changed | 896 & $changed | 7168 & $changed | 57344 & $changed | 458752 & $changed << 3 | 3670016 & $changed << 6 | 29360128 & $changed << 6 | 234881024 & $changed << 6 | 1879048192 & $changed << 6, 14 & $changed >> 24 | 112 & $changed >> 24 | 896 & $changed1 << 6 | 7168 & $changed1 << 6 | 57344 & $changed1 << 6 | 458752 & $changed1 << 6 | 3670016 & $changed1 << 6 | 29360128 & $changed1 << 6 | 234881024 & $changed1 << 6 | 1879048192 & $changed1 << 6, 14 & $changed1 >> 24 | 112 & $changed1 >> 24 | 896 & $changed2 << 6 | 7168 & $changed2 << 6 | 57344 & $changed2 << 6 | 458752 & $changed2 << 6 | 3670016 & $changed2 << 6 | 29360128 & $changed2 << 6 | 234881024 & $changed2 << 6 | 1879048192 & $changed2 << 6, 14 & $changed2 >> 24 | 112 & $changed2 >> 24 | 896 & $changed3 << 6 | 7168 & $changed3 << 6 | 57344 & $changed3 << 6 | 458752 & $changed3 << 6 | 3670016 & $changed3 << 6 | 29360128 & $changed3 << 6 | 234881024 & $changed3 << 6 | 1879048192 & $changed3 << 6, 3072 | 14 & $changed3 >> 24 | 112 & $changed3 >> 24 | 896 & $changed4 << 6, 0, 0);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0_0;
  };
  protoOf(TextFieldDefaults).TextFieldDecorationBox$composable_cccfv0_k$ = function (value, innerTextField, enabled, singleLine, visualTransformation, interactionSource, isError, label, placeholder, leadingIcon, trailingIcon, prefix, suffix, supportingText, shape, colors, contentPadding, container, $composer, $changed, $changed1, $default) {
    var isError_0 = {_v: isError};
    var label_0 = {_v: label};
    var placeholder_0 = {_v: placeholder};
    var leadingIcon_0 = {_v: leadingIcon};
    var trailingIcon_0 = {_v: trailingIcon};
    var prefix_0 = {_v: prefix};
    var suffix_0 = {_v: suffix};
    var supportingText_0 = {_v: supportingText};
    var shape_0 = {_v: shape};
    var colors_0 = {_v: colors};
    var contentPadding_0 = {_v: contentPadding};
    var container_0 = {_v: container};
    var $composer_0 = $composer;
    $composer_0 = $composer_0.startRestartGroup_lebv1i_k$(-1624449858);
    sourceInformation($composer_0, 'C(TextFieldDecorationBox$composable)P(16,4,3,12,17,5,6,7,9,8,15,10,13,14,11!1,2)958@54020L5,959@54061L8,969@54408L612:TextFieldDefaults.kt#uh7d8r');
    var $dirty = $changed;
    var $dirty1 = $changed1;
    if (!(($default & 1) === 0))
      $dirty = $dirty | 6;
    else if (($changed & 14) === 0)
      $dirty = $dirty | ($composer_0.changed_ga7h3f_k$(value) ? 4 : 2);
    if (!(($default & 2) === 0))
      $dirty = $dirty | 48;
    else if (($changed & 112) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(innerTextField) ? 32 : 16);
    if (!(($default & 4) === 0))
      $dirty = $dirty | 384;
    else if (($changed & 896) === 0)
      $dirty = $dirty | ($composer_0.changed_jpyyrz_k$(enabled) ? 256 : 128);
    if (!(($default & 8) === 0))
      $dirty = $dirty | 3072;
    else if (($changed & 7168) === 0)
      $dirty = $dirty | ($composer_0.changed_jpyyrz_k$(singleLine) ? 2048 : 1024);
    if (!(($default & 16) === 0))
      $dirty = $dirty | 24576;
    else if (($changed & 57344) === 0)
      $dirty = $dirty | ($composer_0.changed_ga7h3f_k$(visualTransformation) ? 16384 : 8192);
    if (!(($default & 32) === 0))
      $dirty = $dirty | 196608;
    else if (($changed & 458752) === 0)
      $dirty = $dirty | ($composer_0.changed_ga7h3f_k$(interactionSource) ? 131072 : 65536);
    if (!(($default & 64) === 0))
      $dirty = $dirty | 1572864;
    else if (($changed & 3670016) === 0)
      $dirty = $dirty | ($composer_0.changed_jpyyrz_k$(isError_0._v) ? 1048576 : 524288);
    if (!(($default & 128) === 0))
      $dirty = $dirty | 12582912;
    else if (($changed & 29360128) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(label_0._v) ? 8388608 : 4194304);
    if (!(($default & 256) === 0))
      $dirty = $dirty | 100663296;
    else if (($changed & 234881024) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(placeholder_0._v) ? 67108864 : 33554432);
    if (!(($default & 512) === 0))
      $dirty = $dirty | 805306368;
    else if (($changed & 1879048192) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(leadingIcon_0._v) ? 536870912 : 268435456);
    if (!(($default & 1024) === 0))
      $dirty1 = $dirty1 | 6;
    else if (($changed1 & 14) === 0)
      $dirty1 = $dirty1 | ($composer_0.changedInstance_s1wkiy_k$(trailingIcon_0._v) ? 4 : 2);
    if (!(($default & 2048) === 0))
      $dirty1 = $dirty1 | 48;
    else if (($changed1 & 112) === 0)
      $dirty1 = $dirty1 | ($composer_0.changedInstance_s1wkiy_k$(prefix_0._v) ? 32 : 16);
    if (!(($default & 4096) === 0))
      $dirty1 = $dirty1 | 384;
    else if (($changed1 & 896) === 0)
      $dirty1 = $dirty1 | ($composer_0.changedInstance_s1wkiy_k$(suffix_0._v) ? 256 : 128);
    if (!(($default & 8192) === 0))
      $dirty1 = $dirty1 | 3072;
    else if (($changed1 & 7168) === 0)
      $dirty1 = $dirty1 | ($composer_0.changedInstance_s1wkiy_k$(supportingText_0._v) ? 2048 : 1024);
    if (($changed1 & 57344) === 0)
      $dirty1 = $dirty1 | ((($default & 16384) === 0 ? $composer_0.changed_ga7h3f_k$(shape_0._v) : false) ? 16384 : 8192);
    if (($changed1 & 458752) === 0)
      $dirty1 = $dirty1 | ((($default & 32768) === 0 ? $composer_0.changed_ga7h3f_k$(colors_0._v) : false) ? 131072 : 65536);
    if (($changed1 & 3670016) === 0)
      $dirty1 = $dirty1 | ((($default & 65536) === 0 ? $composer_0.changed_ga7h3f_k$(contentPadding_0._v) : false) ? 1048576 : 524288);
    if (!(($default & 131072) === 0))
      $dirty1 = $dirty1 | 12582912;
    else if (($changed1 & 29360128) === 0)
      $dirty1 = $dirty1 | ($composer_0.changedInstance_s1wkiy_k$(container_0._v) ? 8388608 : 4194304);
    if (!(($default & 262144) === 0))
      $dirty1 = $dirty1 | 100663296;
    else if (($changed1 & 234881024) === 0)
      $dirty1 = $dirty1 | ($composer_0.changed_ga7h3f_k$(this) ? 67108864 : 33554432);
    if ((!(($dirty & 1533916891) === 306783378) ? true : !(($dirty1 & 191739611) === 38347922)) ? true : !$composer_0.get_skipping_3owdve_k$()) {
      $composer_0.startDefaults_g83kzo_k$();
      if (($changed & 1) === 0 ? true : $composer_0.get_defaultsInvalid_y88fc4_k$()) {
        if (!(($default & 64) === 0)) {
          isError_0._v = false;
        }
        if (!(($default & 128) === 0)) {
          label_0._v = null;
        }
        if (!(($default & 256) === 0)) {
          placeholder_0._v = null;
        }
        if (!(($default & 512) === 0)) {
          leadingIcon_0._v = null;
        }
        if (!(($default & 1024) === 0)) {
          trailingIcon_0._v = null;
        }
        if (!(($default & 2048) === 0)) {
          prefix_0._v = null;
        }
        if (!(($default & 4096) === 0)) {
          suffix_0._v = null;
        }
        if (!(($default & 8192) === 0)) {
          supportingText_0._v = null;
        }
        if (!(($default & 16384) === 0)) {
          shape_0._v = TextFieldDefaults_getInstance().$get_shape$$composable_df7h3a_k$($composer_0, 6);
          $dirty1 = $dirty1 & -57345;
        }
        if (!(($default & 32768) === 0)) {
          var tmp = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_0 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_1 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_2 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_3 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_4 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_5 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_6 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_7 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_8 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_9 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_10 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_11 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_12 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_13 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_14 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_15 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_16 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_17 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_18 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_19 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_20 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_21 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_22 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_23 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_24 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_25 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_26 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_27 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_28 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_29 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_30 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_31 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_32 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_33 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_34 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_35 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_36 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_37 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_38 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_39 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          colors_0._v = this.colors$composable_uqty46_k$(tmp, tmp_0, tmp_1, tmp_2, tmp_3, tmp_4, tmp_5, tmp_6, tmp_7, tmp_8, null, tmp_9, tmp_10, tmp_11, tmp_12, tmp_13, tmp_14, tmp_15, tmp_16, tmp_17, tmp_18, tmp_19, tmp_20, tmp_21, tmp_22, tmp_23, tmp_24, tmp_25, tmp_26, tmp_27, tmp_28, tmp_29, tmp_30, tmp_31, tmp_32, tmp_33, tmp_34, tmp_35, tmp_36, tmp_37, tmp_38, tmp_39, _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0))), $composer_0, 0, 0, 0, 0, 0, 2147483647, 4095);
          $dirty1 = $dirty1 & -458753;
        }
        if (!(($default & 65536) === 0)) {
          var tmp_40;
          if (label_0._v == null) {
            tmp_40 = this.contentPaddingWithoutLabel$default_h0esvv_k$();
          } else {
            tmp_40 = this.contentPaddingWithLabel$default_n9hc89_k$();
          }
          contentPadding_0._v = tmp_40;
          $dirty1 = $dirty1 & -3670017;
        }
        if (!(($default & 131072) === 0)) {
          // Inline function 'kotlin.run' call
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'androidx.compose.material3.TextFieldDefaults.TextFieldDecorationBox$composable.<anonymous>' call
          var tmp_41 = $composer_0;
          var dispatchReceiver = composableLambda(tmp_41, 2023266550, true, TextFieldDefaults$TextFieldDecorationBox$composable$lambda(enabled, isError_0, interactionSource, colors_0, shape_0, $dirty, $dirty1));
          // Inline function 'androidx.compose.runtime.remember$composable' call
          var $composer_1 = $composer_0;
          $composer_1.startReplaceableGroup_ip860b_k$(-838505973);
          sourceInformation($composer_1, 'CC(remember$composable)P(1):Composables.kt#9igjgp');
          // Inline function 'androidx.compose.runtime.cache' call
          var invalid = $composer_1.changed_ga7h3f_k$(dispatchReceiver);
          // Inline function 'kotlin.let' call
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
          var it = $composer_1.rememberedValue_4dg93v_k$();
          var tmp_42;
          if (invalid ? true : it === Companion_getInstance_2().get_Empty_i9b85g_k$()) {
            // Inline function 'androidx.compose.material3.TextFieldDefaults.TextFieldDecorationBox$composable.<anonymous>.<anonymous>' call
            var value_0 = ComposableLambda$invoke$ref_0(dispatchReceiver);
            $composer_1.updateRememberedValue_l1wh71_k$(value_0);
            tmp_42 = value_0;
          } else {
            tmp_42 = it;
          }
          var tmp_43 = tmp_42;
          var tmp0 = (tmp_43 == null ? true : !(tmp_43 == null)) ? tmp_43 : THROW_CCE();
          $composer_1.endReplaceableGroup_ern0ak_k$();
          container_0._v = tmp0;
        }
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        if (!(($default & 16384) === 0))
          $dirty1 = $dirty1 & -57345;
        if (!(($default & 32768) === 0))
          $dirty1 = $dirty1 & -458753;
        if (!(($default & 65536) === 0))
          $dirty1 = $dirty1 & -3670017;
      }
      $composer_0.endDefaults_b0s0ot_k$();
      if (isTraceInProgress()) {
        traceEventStart(-1624449858, $dirty, $dirty1, 'androidx.compose.material3.TextFieldDefaults.TextFieldDecorationBox$composable (TextFieldDefaults.kt:943)');
      }
      this.DecorationBox$composable_56lh3b_k$(value, innerTextField, enabled, singleLine, visualTransformation, interactionSource, isError_0._v, label_0._v, placeholder_0._v, leadingIcon_0._v, trailingIcon_0._v, prefix_0._v, suffix_0._v, supportingText_0._v, shape_0._v, colors_0._v, contentPadding_0._v, container_0._v, $composer_0, 14 & $dirty | 112 & $dirty | 896 & $dirty | 7168 & $dirty | 57344 & $dirty | 458752 & $dirty | 3670016 & $dirty | 29360128 & $dirty | 234881024 & $dirty | 1879048192 & $dirty, 14 & $dirty1 | 112 & $dirty1 | 896 & $dirty1 | 7168 & $dirty1 | 57344 & $dirty1 | 458752 & $dirty1 | 3670016 & $dirty1 | 29360128 & $dirty1 | 234881024 & $dirty1, 0);
      if (isTraceInProgress()) {
        traceEventEnd();
      }
    } else {
      $composer_0.skipToGroupEnd_lh3zi2_k$();
    }
    var tmp1_safe_receiver = $composer_0.endRestartGroup_yxpjv9_k$();
    if (tmp1_safe_receiver === null)
      null;
    else {
      tmp1_safe_receiver.updateScope_t8jcf_k$(TextFieldDefaults$TextFieldDecorationBox$composable$lambda_0(this, value, innerTextField, enabled, singleLine, visualTransformation, interactionSource, isError_0, label_0, placeholder_0, leadingIcon_0, trailingIcon_0, prefix_0, suffix_0, supportingText_0, shape_0, colors_0, contentPadding_0, container_0, $changed, $changed1, $default));
    }
  };
  protoOf(TextFieldDefaults).OutlinedTextFieldDecorationBox$composable_xrcvxe_k$ = function (value, innerTextField, enabled, singleLine, visualTransformation, interactionSource, isError, label, placeholder, leadingIcon, trailingIcon, prefix, suffix, supportingText, colors, contentPadding, container, $composer, $changed, $changed1, $default) {
    var isError_0 = {_v: isError};
    var label_0 = {_v: label};
    var placeholder_0 = {_v: placeholder};
    var leadingIcon_0 = {_v: leadingIcon};
    var trailingIcon_0 = {_v: trailingIcon};
    var prefix_0 = {_v: prefix};
    var suffix_0 = {_v: suffix};
    var supportingText_0 = {_v: supportingText};
    var colors_0 = {_v: colors};
    var contentPadding_0 = {_v: contentPadding};
    var container_0 = {_v: container};
    var $composer_0 = $composer;
    $composer_0 = $composer_0.startRestartGroup_lebv1i_k$(-1893274910);
    sourceInformation($composer_0, 'C(OutlinedTextFieldDecorationBox$composable)P(15,4,3,11,16,5,6,7,9,8,14,10,12,13!1,2)1031@56982L8,1036@57262L589:TextFieldDefaults.kt#uh7d8r');
    var $dirty = $changed;
    var $dirty1 = $changed1;
    if (!(($default & 1) === 0))
      $dirty = $dirty | 6;
    else if (($changed & 14) === 0)
      $dirty = $dirty | ($composer_0.changed_ga7h3f_k$(value) ? 4 : 2);
    if (!(($default & 2) === 0))
      $dirty = $dirty | 48;
    else if (($changed & 112) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(innerTextField) ? 32 : 16);
    if (!(($default & 4) === 0))
      $dirty = $dirty | 384;
    else if (($changed & 896) === 0)
      $dirty = $dirty | ($composer_0.changed_jpyyrz_k$(enabled) ? 256 : 128);
    if (!(($default & 8) === 0))
      $dirty = $dirty | 3072;
    else if (($changed & 7168) === 0)
      $dirty = $dirty | ($composer_0.changed_jpyyrz_k$(singleLine) ? 2048 : 1024);
    if (!(($default & 16) === 0))
      $dirty = $dirty | 24576;
    else if (($changed & 57344) === 0)
      $dirty = $dirty | ($composer_0.changed_ga7h3f_k$(visualTransformation) ? 16384 : 8192);
    if (!(($default & 32) === 0))
      $dirty = $dirty | 196608;
    else if (($changed & 458752) === 0)
      $dirty = $dirty | ($composer_0.changed_ga7h3f_k$(interactionSource) ? 131072 : 65536);
    if (!(($default & 64) === 0))
      $dirty = $dirty | 1572864;
    else if (($changed & 3670016) === 0)
      $dirty = $dirty | ($composer_0.changed_jpyyrz_k$(isError_0._v) ? 1048576 : 524288);
    if (!(($default & 128) === 0))
      $dirty = $dirty | 12582912;
    else if (($changed & 29360128) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(label_0._v) ? 8388608 : 4194304);
    if (!(($default & 256) === 0))
      $dirty = $dirty | 100663296;
    else if (($changed & 234881024) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(placeholder_0._v) ? 67108864 : 33554432);
    if (!(($default & 512) === 0))
      $dirty = $dirty | 805306368;
    else if (($changed & 1879048192) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(leadingIcon_0._v) ? 536870912 : 268435456);
    if (!(($default & 1024) === 0))
      $dirty1 = $dirty1 | 6;
    else if (($changed1 & 14) === 0)
      $dirty1 = $dirty1 | ($composer_0.changedInstance_s1wkiy_k$(trailingIcon_0._v) ? 4 : 2);
    if (!(($default & 2048) === 0))
      $dirty1 = $dirty1 | 48;
    else if (($changed1 & 112) === 0)
      $dirty1 = $dirty1 | ($composer_0.changedInstance_s1wkiy_k$(prefix_0._v) ? 32 : 16);
    if (!(($default & 4096) === 0))
      $dirty1 = $dirty1 | 384;
    else if (($changed1 & 896) === 0)
      $dirty1 = $dirty1 | ($composer_0.changedInstance_s1wkiy_k$(suffix_0._v) ? 256 : 128);
    if (!(($default & 8192) === 0))
      $dirty1 = $dirty1 | 3072;
    else if (($changed1 & 7168) === 0)
      $dirty1 = $dirty1 | ($composer_0.changedInstance_s1wkiy_k$(supportingText_0._v) ? 2048 : 1024);
    if (($changed1 & 57344) === 0)
      $dirty1 = $dirty1 | ((($default & 16384) === 0 ? $composer_0.changed_ga7h3f_k$(colors_0._v) : false) ? 16384 : 8192);
    if (($changed1 & 458752) === 0)
      $dirty1 = $dirty1 | ((($default & 32768) === 0 ? $composer_0.changed_ga7h3f_k$(contentPadding_0._v) : false) ? 131072 : 65536);
    if (!(($default & 65536) === 0))
      $dirty1 = $dirty1 | 1572864;
    else if (($changed1 & 3670016) === 0)
      $dirty1 = $dirty1 | ($composer_0.changedInstance_s1wkiy_k$(container_0._v) ? 1048576 : 524288);
    if ((!(($dirty & 1533916891) === 306783378) ? true : !(($dirty1 & 2995931) === 599186)) ? true : !$composer_0.get_skipping_3owdve_k$()) {
      $composer_0.startDefaults_g83kzo_k$();
      if (($changed & 1) === 0 ? true : $composer_0.get_defaultsInvalid_y88fc4_k$()) {
        if (!(($default & 64) === 0)) {
          isError_0._v = false;
        }
        if (!(($default & 128) === 0)) {
          label_0._v = null;
        }
        if (!(($default & 256) === 0)) {
          placeholder_0._v = null;
        }
        if (!(($default & 512) === 0)) {
          leadingIcon_0._v = null;
        }
        if (!(($default & 1024) === 0)) {
          trailingIcon_0._v = null;
        }
        if (!(($default & 2048) === 0)) {
          prefix_0._v = null;
        }
        if (!(($default & 4096) === 0)) {
          suffix_0._v = null;
        }
        if (!(($default & 8192) === 0)) {
          supportingText_0._v = null;
        }
        if (!(($default & 16384) === 0)) {
          var tmp = OutlinedTextFieldDefaults_getInstance();
          var tmp_0 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_1 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_2 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_3 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_4 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_5 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_6 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_7 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_8 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_9 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_10 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_11 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_12 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_13 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_14 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_15 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_16 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_17 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_18 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_19 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_20 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_21 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_22 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_23 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_24 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_25 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_26 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_27 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_28 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_29 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_30 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_31 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_32 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_33 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_34 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_35 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_36 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_37 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_38 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_39 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_40 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          colors_0._v = tmp.colors$composable_uqty46_k$(tmp_0, tmp_1, tmp_2, tmp_3, tmp_4, tmp_5, tmp_6, tmp_7, tmp_8, tmp_9, null, tmp_10, tmp_11, tmp_12, tmp_13, tmp_14, tmp_15, tmp_16, tmp_17, tmp_18, tmp_19, tmp_20, tmp_21, tmp_22, tmp_23, tmp_24, tmp_25, tmp_26, tmp_27, tmp_28, tmp_29, tmp_30, tmp_31, tmp_32, tmp_33, tmp_34, tmp_35, tmp_36, tmp_37, tmp_38, tmp_39, tmp_40, _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0))), $composer_0, 0, 0, 0, 0, 3072, 2147483647, 4095);
          $dirty1 = $dirty1 & -57345;
        }
        if (!(($default & 32768) === 0)) {
          contentPadding_0._v = OutlinedTextFieldDefaults_getInstance().contentPadding$default_qqopph_k$();
          $dirty1 = $dirty1 & -458753;
        }
        if (!(($default & 65536) === 0)) {
          // Inline function 'kotlin.run' call
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'androidx.compose.material3.TextFieldDefaults.OutlinedTextFieldDecorationBox$composable.<anonymous>' call
          var tmp_41 = $composer_0;
          var dispatchReceiver = composableLambda(tmp_41, -1153197597, true, TextFieldDefaults$OutlinedTextFieldDecorationBox$composable$lambda(enabled, isError_0, interactionSource, colors_0, $dirty, $dirty1));
          // Inline function 'androidx.compose.runtime.remember$composable' call
          var $composer_1 = $composer_0;
          $composer_1.startReplaceableGroup_ip860b_k$(-838505973);
          sourceInformation($composer_1, 'CC(remember$composable)P(1):Composables.kt#9igjgp');
          // Inline function 'androidx.compose.runtime.cache' call
          var invalid = $composer_1.changed_ga7h3f_k$(dispatchReceiver);
          // Inline function 'kotlin.let' call
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
          var it = $composer_1.rememberedValue_4dg93v_k$();
          var tmp_42;
          if (invalid ? true : it === Companion_getInstance_2().get_Empty_i9b85g_k$()) {
            // Inline function 'androidx.compose.material3.TextFieldDefaults.OutlinedTextFieldDecorationBox$composable.<anonymous>.<anonymous>' call
            var value_0 = ComposableLambda$invoke$ref_1(dispatchReceiver);
            $composer_1.updateRememberedValue_l1wh71_k$(value_0);
            tmp_42 = value_0;
          } else {
            tmp_42 = it;
          }
          var tmp_43 = tmp_42;
          var tmp0 = (tmp_43 == null ? true : !(tmp_43 == null)) ? tmp_43 : THROW_CCE();
          $composer_1.endReplaceableGroup_ern0ak_k$();
          container_0._v = tmp0;
        }
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        if (!(($default & 16384) === 0))
          $dirty1 = $dirty1 & -57345;
        if (!(($default & 32768) === 0))
          $dirty1 = $dirty1 & -458753;
      }
      $composer_0.endDefaults_b0s0ot_k$();
      if (isTraceInProgress()) {
        traceEventStart(-1893274910, $dirty, $dirty1, 'androidx.compose.material3.TextFieldDefaults.OutlinedTextFieldDecorationBox$composable (TextFieldDefaults.kt:1016)');
      }
      OutlinedTextFieldDefaults_getInstance().DecorationBox$composable_5dzloz_k$(value, innerTextField, enabled, singleLine, visualTransformation, interactionSource, isError_0._v, label_0._v, placeholder_0._v, leadingIcon_0._v, trailingIcon_0._v, prefix_0._v, suffix_0._v, supportingText_0._v, colors_0._v, contentPadding_0._v, container_0._v, $composer_0, 14 & $dirty | 112 & $dirty | 896 & $dirty | 7168 & $dirty | 57344 & $dirty | 458752 & $dirty | 3670016 & $dirty | 29360128 & $dirty | 234881024 & $dirty | 1879048192 & $dirty, 12582912 | 14 & $dirty1 | 112 & $dirty1 | 896 & $dirty1 | 7168 & $dirty1 | 57344 & $dirty1 | 458752 & $dirty1 | 3670016 & $dirty1, 0);
      if (isTraceInProgress()) {
        traceEventEnd();
      }
    } else {
      $composer_0.skipToGroupEnd_lh3zi2_k$();
    }
    var tmp1_safe_receiver = $composer_0.endRestartGroup_yxpjv9_k$();
    if (tmp1_safe_receiver === null)
      null;
    else {
      tmp1_safe_receiver.updateScope_t8jcf_k$(TextFieldDefaults$OutlinedTextFieldDecorationBox$composable$lambda_0(this, value, innerTextField, enabled, singleLine, visualTransformation, interactionSource, isError_0, label_0, placeholder_0, leadingIcon_0, trailingIcon_0, prefix_0, suffix_0, supportingText_0, colors_0, contentPadding_0, container_0, $changed, $changed1, $default));
    }
  };
  protoOf(TextFieldDefaults).textFieldColors$composable_boiubu_k$ = function (textColor, disabledTextColor, containerColor, cursorColor, errorCursorColor, selectionColors, focusedIndicatorColor, unfocusedIndicatorColor, disabledIndicatorColor, errorIndicatorColor, focusedLeadingIconColor, unfocusedLeadingIconColor, disabledLeadingIconColor, errorLeadingIconColor, focusedTrailingIconColor, unfocusedTrailingIconColor, disabledTrailingIconColor, errorTrailingIconColor, focusedLabelColor, unfocusedLabelColor, disabledLabelColor, errorLabelColor, placeholderColor, disabledPlaceholderColor, focusedSupportingTextColor, unfocusedSupportingTextColor, disabledSupportingTextColor, errorSupportingTextColor, focusedPrefixColor, unfocusedPrefixColor, disabledPrefixColor, errorPrefixColor, focusedSuffixColor, unfocusedSuffixColor, disabledSuffixColor, errorSuffixColor, $composer, $changed, $changed1, $changed2, $changed3, $default, $default1) {
    var textColor_0 = textColor;
    var disabledTextColor_0 = disabledTextColor;
    var containerColor_0 = containerColor;
    var cursorColor_0 = cursorColor;
    var errorCursorColor_0 = errorCursorColor;
    var selectionColors_0 = selectionColors;
    var focusedIndicatorColor_0 = focusedIndicatorColor;
    var unfocusedIndicatorColor_0 = unfocusedIndicatorColor;
    var disabledIndicatorColor_0 = disabledIndicatorColor;
    var errorIndicatorColor_0 = errorIndicatorColor;
    var focusedLeadingIconColor_0 = focusedLeadingIconColor;
    var unfocusedLeadingIconColor_0 = unfocusedLeadingIconColor;
    var disabledLeadingIconColor_0 = disabledLeadingIconColor;
    var errorLeadingIconColor_0 = errorLeadingIconColor;
    var focusedTrailingIconColor_0 = focusedTrailingIconColor;
    var unfocusedTrailingIconColor_0 = unfocusedTrailingIconColor;
    var disabledTrailingIconColor_0 = disabledTrailingIconColor;
    var errorTrailingIconColor_0 = errorTrailingIconColor;
    var focusedLabelColor_0 = focusedLabelColor;
    var unfocusedLabelColor_0 = unfocusedLabelColor;
    var disabledLabelColor_0 = disabledLabelColor;
    var errorLabelColor_0 = errorLabelColor;
    var placeholderColor_0 = placeholderColor;
    var disabledPlaceholderColor_0 = disabledPlaceholderColor;
    var focusedSupportingTextColor_0 = focusedSupportingTextColor;
    var unfocusedSupportingTextColor_0 = unfocusedSupportingTextColor;
    var disabledSupportingTextColor_0 = disabledSupportingTextColor;
    var errorSupportingTextColor_0 = errorSupportingTextColor;
    var focusedPrefixColor_0 = focusedPrefixColor;
    var unfocusedPrefixColor_0 = unfocusedPrefixColor;
    var disabledPrefixColor_0 = disabledPrefixColor;
    var errorPrefixColor_0 = errorPrefixColor;
    var focusedSuffixColor_0 = focusedSuffixColor;
    var unfocusedSuffixColor_0 = unfocusedSuffixColor;
    var disabledSuffixColor_0 = disabledSuffixColor;
    var errorSuffixColor_0 = errorSuffixColor;
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(-945501304);
    sourceInformation($composer_0, 'C(textFieldColors$composable)P(28:c#ui.graphics.Color,9:c#ui.graphics.Color,0:c#ui.graphics.Color,1:c#ui.graphics.Color,11:c#ui.graphics.Color,27,19:c#ui.graphics.Color,29:c#ui.graphics.Color,2:c#ui.graphics.Color,12:c#ui.graphics.Color,21:c#ui.graphics.Color,31:c#ui.graphics.Color,4:c#ui.graphics.Color,14:c#ui.graphics.Color,25:c#ui.graphics.Color,35:c#ui.graphics.Color,10:c#ui.graphics.Color,18:c#ui.graphics.Color,20:c#ui.graphics.Color,30:c#ui.graphics.Color,3:c#ui.graphics.Color,13:c#ui.graphics.Color,26:c#ui.graphics.Color,5:c#ui.graphics.Color,24:c#ui.graphics.Color,34:c#ui.graphics.Color,8:c#ui.graphics.Color,17:c#ui.graphics.Color,22:c#ui.graphics.Color,32:c#ui.graphics.Color,6:c#ui.graphics.Color,15:c#ui.graphics.Color,23:c#ui.graphics.Color,33:c#ui.graphics.Color,7:c#ui.graphics.Color,16:c#ui.graphics.Color)1060@58072L9,1061@58159L9,1063@58309L9,1064@58382L9,1065@58470L9,1066@58553L7,1067@58649L9,1068@58744L9,1069@58846L9,1071@59022L9,1072@59118L9,1073@59211L9,1074@59311L9,1076@59481L9,1077@59579L9,1078@59674L9,1079@59776L9,1081@59949L9,1082@60033L9,1083@60114L9,1084@60202L9,1086@60354L9,1087@60443L9,1088@60537L9,1090@60705L9,1091@60800L9,1092@60902L9,1094@61073L9,1095@61159L9,1096@61247L9,1097@61334L9,1099@61488L9,1100@61574L9,1101@61662L9,1102@61749L9,1104@61903L9,1105@61939L2261:TextFieldDefaults.kt#uh7d8r');
    if (!(($default & 1) === 0))
      textColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_InputColor_zapq3m_k$(), $composer_0, 6);
    if (!(($default & 2) === 0))
      disabledTextColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(FilledTextFieldTokens_getInstance().get_DisabledInputColor_84w2ke_k$(), $composer_0, 6), FilledTextFieldTokens_getInstance().get_DisabledInputOpacity_vi261m_k$());
    if (!(($default & 4) === 0))
      containerColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_ContainerColor_uid763_k$(), $composer_0, 6);
    if (!(($default & 8) === 0))
      cursorColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_CaretColor_hxe08n_k$(), $composer_0, 6);
    if (!(($default & 16) === 0))
      errorCursorColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_ErrorFocusCaretColor_vrfnbt_k$(), $composer_0, 6);
    if (!(($default & 32) === 0)) {
      // Inline function 'androidx.compose.runtime.CompositionLocal.$get-current$$composable' call
      var this_0 = get_LocalTextSelectionColors();
      var $composer_1 = $composer_0;
      sourceInformationMarkerStart($composer_1, 858843746, 'CC($get-current$$composable):CompositionLocal.kt#9igjgp');
      var tmp0 = $composer_1.consume_ebzcrh_k$(this_0);
      sourceInformationMarkerEnd($composer_1);
      selectionColors_0 = tmp0;
    }
    if (!(($default & 64) === 0))
      focusedIndicatorColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_FocusActiveIndicatorColor_9rlorb_k$(), $composer_0, 6);
    if (!(($default & 128) === 0))
      unfocusedIndicatorColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_ActiveIndicatorColor_qs91el_k$(), $composer_0, 6);
    if (!(($default & 256) === 0))
      disabledIndicatorColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(FilledTextFieldTokens_getInstance().get_DisabledActiveIndicatorColor_bvdiyn_k$(), $composer_0, 6), FilledTextFieldTokens_getInstance().get_DisabledActiveIndicatorOpacity_6y9rl3_k$());
    if (!(($default & 512) === 0))
      errorIndicatorColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_ErrorActiveIndicatorColor_vkr8ux_k$(), $composer_0, 6);
    if (!(($default & 1024) === 0))
      focusedLeadingIconColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_FocusLeadingIconColor_pqzv77_k$(), $composer_0, 6);
    if (!(($default & 2048) === 0))
      unfocusedLeadingIconColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_LeadingIconColor_4sfzzh_k$(), $composer_0, 6);
    if (!(($default & 4096) === 0))
      disabledLeadingIconColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(FilledTextFieldTokens_getInstance().get_DisabledLeadingIconColor_dtgxah_k$(), $composer_0, 6), FilledTextFieldTokens_getInstance().get_DisabledLeadingIconOpacity_va1u41_k$());
    if (!(($default & 8192) === 0))
      errorLeadingIconColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_ErrorLeadingIconColor_b3l6n7_k$(), $composer_0, 6);
    if (!(($default & 16384) === 0))
      focusedTrailingIconColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_FocusTrailingIconColor_xs0xep_k$(), $composer_0, 6);
    if (!(($default & 32768) === 0))
      unfocusedTrailingIconColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_TrailingIconColor_qrzqp1_k$(), $composer_0, 6);
    if (!(($default & 65536) === 0))
      disabledTrailingIconColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(FilledTextFieldTokens_getInstance().get_DisabledTrailingIconColor_mjc79l_k$(), $composer_0, 6), FilledTextFieldTokens_getInstance().get_DisabledTrailingIconOpacity_s6onap_k$());
    if (!(($default & 131072) === 0))
      errorTrailingIconColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_ErrorTrailingIconColor_9a4b73_k$(), $composer_0, 6);
    if (!(($default & 262144) === 0))
      focusedLabelColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_FocusLabelColor_fu63wi_k$(), $composer_0, 6);
    if (!(($default & 524288) === 0))
      unfocusedLabelColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_LabelColor_ewxvns_k$(), $composer_0, 6);
    if (!(($default & 1048576) === 0))
      disabledLabelColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(FilledTextFieldTokens_getInstance().get_DisabledLabelColor_sycis4_k$(), $composer_0, 6), FilledTextFieldTokens_getInstance().get_DisabledLabelOpacity_f5f918_k$());
    if (!(($default & 2097152) === 0))
      errorLabelColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_ErrorLabelColor_kbze9a_k$(), $composer_0, 6);
    if (!(($default & 4194304) === 0))
      placeholderColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_InputPlaceholderColor_5cj1ap_k$(), $composer_0, 6);
    if (!(($default & 8388608) === 0))
      disabledPlaceholderColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(FilledTextFieldTokens_getInstance().get_DisabledInputColor_84w2ke_k$(), $composer_0, 6), FilledTextFieldTokens_getInstance().get_DisabledInputOpacity_vi261m_k$());
    if (!(($default & 16777216) === 0))
      focusedSupportingTextColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_FocusSupportingColor_nyu4nz_k$(), $composer_0, 6);
    if (!(($default & 33554432) === 0))
      unfocusedSupportingTextColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_SupportingColor_eb3yw7_k$(), $composer_0, 6);
    if (!(($default & 67108864) === 0))
      disabledSupportingTextColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(FilledTextFieldTokens_getInstance().get_DisabledSupportingColor_hh8a7p_k$(), $composer_0, 6), FilledTextFieldTokens_getInstance().get_DisabledSupportingOpacity_prppv_k$());
    if (!(($default & 134217728) === 0))
      errorSupportingTextColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_ErrorSupportingColor_63y79r_k$(), $composer_0, 6);
    if (!(($default & 268435456) === 0))
      focusedPrefixColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_InputPrefixColor_l0lf3k_k$(), $composer_0, 6);
    if (!(($default & 536870912) === 0))
      unfocusedPrefixColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_InputPrefixColor_l0lf3k_k$(), $composer_0, 6);
    if (!(($default & 1073741824) === 0))
      disabledPrefixColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(FilledTextFieldTokens_getInstance().get_InputPrefixColor_l0lf3k_k$(), $composer_0, 6), FilledTextFieldTokens_getInstance().get_DisabledInputOpacity_vi261m_k$());
    if (!(($default1 & 1) === 0))
      errorPrefixColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_InputPrefixColor_l0lf3k_k$(), $composer_0, 6);
    if (!(($default1 & 2) === 0))
      focusedSuffixColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_InputSuffixColor_ya4w9d_k$(), $composer_0, 6);
    if (!(($default1 & 4) === 0))
      unfocusedSuffixColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_InputSuffixColor_ya4w9d_k$(), $composer_0, 6);
    if (!(($default1 & 8) === 0))
      disabledSuffixColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(FilledTextFieldTokens_getInstance().get_InputSuffixColor_ya4w9d_k$(), $composer_0, 6), FilledTextFieldTokens_getInstance().get_DisabledInputOpacity_vi261m_k$());
    if (!(($default1 & 16) === 0))
      errorSuffixColor_0 = toColor$composable(FilledTextFieldTokens_getInstance().get_InputSuffixColor_ya4w9d_k$(), $composer_0, 6);
    if (isTraceInProgress()) {
      traceEventStart(-945501304, $changed, $changed1, 'androidx.compose.material3.TextFieldDefaults.textFieldColors$composable (TextFieldDefaults.kt:1059)');
    }
    var tmp0_0 = this.colors$composable_uqty46_k$(textColor_0, textColor_0, disabledTextColor_0, textColor_0, containerColor_0, containerColor_0, containerColor_0, containerColor_0, cursorColor_0, errorCursorColor_0, selectionColors_0, focusedIndicatorColor_0, unfocusedIndicatorColor_0, disabledIndicatorColor_0, errorIndicatorColor_0, focusedLeadingIconColor_0, unfocusedLeadingIconColor_0, disabledLeadingIconColor_0, errorLeadingIconColor_0, focusedTrailingIconColor_0, unfocusedTrailingIconColor_0, disabledTrailingIconColor_0, errorTrailingIconColor_0, focusedLabelColor_0, unfocusedLabelColor_0, disabledLabelColor_0, errorLabelColor_0, placeholderColor_0, placeholderColor_0, disabledPlaceholderColor_0, placeholderColor_0, focusedSupportingTextColor_0, unfocusedSupportingTextColor_0, disabledSupportingTextColor_0, errorSupportingTextColor_0, focusedPrefixColor_0, unfocusedPrefixColor_0, disabledPrefixColor_0, errorPrefixColor_0, focusedSuffixColor_0, unfocusedSuffixColor_0, disabledSuffixColor_0, errorSuffixColor_0, $composer_0, 14 & $changed | 112 & $changed << 3 | 896 & $changed << 3 | 7168 & $changed << 9 | 57344 & $changed << 6 | 458752 & $changed << 9 | 3670016 & $changed << 12 | 29360128 & $changed << 15 | 234881024 & $changed << 15 | 1879048192 & $changed << 15, 14 & $changed >> 15 | 112 & $changed >> 15 | 896 & $changed >> 15 | 7168 & $changed >> 15 | 57344 & $changed >> 15 | 458752 & $changed1 << 15 | 3670016 & $changed1 << 15 | 29360128 & $changed1 << 15 | 234881024 & $changed1 << 15 | 1879048192 & $changed1 << 15, 14 & $changed1 >> 15 | 112 & $changed1 >> 15 | 896 & $changed1 >> 15 | 7168 & $changed1 >> 15 | 57344 & $changed1 >> 15 | 458752 & $changed2 << 15 | 3670016 & $changed2 << 15 | 29360128 & $changed2 << 15 | 234881024 & $changed2 << 18 | 1879048192 & $changed2 << 18, 14 & $changed2 >> 6 | 112 & $changed2 >> 9 | 896 & $changed2 >> 9 | 7168 & $changed2 >> 9 | 57344 & $changed2 >> 9 | 458752 & $changed2 >> 9 | 3670016 & $changed2 >> 9 | 29360128 & $changed3 << 21 | 234881024 & $changed3 << 21 | 1879048192 & $changed3 << 21, 14 & $changed3 >> 9 | 112 & $changed3 >> 9 | 896 & $changed3 >> 9 | 7168 & $changed3 >> 9, 0, 0);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0_0;
  };
  protoOf(TextFieldDefaults).outlinedTextFieldColors$composable_7h4bm4_k$ = function (textColor, disabledTextColor, containerColor, cursorColor, errorCursorColor, selectionColors, focusedBorderColor, unfocusedBorderColor, disabledBorderColor, errorBorderColor, focusedLeadingIconColor, unfocusedLeadingIconColor, disabledLeadingIconColor, errorLeadingIconColor, focusedTrailingIconColor, unfocusedTrailingIconColor, disabledTrailingIconColor, errorTrailingIconColor, focusedLabelColor, unfocusedLabelColor, disabledLabelColor, errorLabelColor, placeholderColor, disabledPlaceholderColor, focusedSupportingTextColor, unfocusedSupportingTextColor, disabledSupportingTextColor, errorSupportingTextColor, focusedPrefixColor, unfocusedPrefixColor, disabledPrefixColor, errorPrefixColor, focusedSuffixColor, unfocusedSuffixColor, disabledSuffixColor, errorSuffixColor, $composer, $changed, $changed1, $changed2, $changed3, $default, $default1) {
    var textColor_0 = textColor;
    var disabledTextColor_0 = disabledTextColor;
    var containerColor_0 = containerColor;
    var cursorColor_0 = cursorColor;
    var errorCursorColor_0 = errorCursorColor;
    var selectionColors_0 = selectionColors;
    var focusedBorderColor_0 = focusedBorderColor;
    var unfocusedBorderColor_0 = unfocusedBorderColor;
    var disabledBorderColor_0 = disabledBorderColor;
    var errorBorderColor_0 = errorBorderColor;
    var focusedLeadingIconColor_0 = focusedLeadingIconColor;
    var unfocusedLeadingIconColor_0 = unfocusedLeadingIconColor;
    var disabledLeadingIconColor_0 = disabledLeadingIconColor;
    var errorLeadingIconColor_0 = errorLeadingIconColor;
    var focusedTrailingIconColor_0 = focusedTrailingIconColor;
    var unfocusedTrailingIconColor_0 = unfocusedTrailingIconColor;
    var disabledTrailingIconColor_0 = disabledTrailingIconColor;
    var errorTrailingIconColor_0 = errorTrailingIconColor;
    var focusedLabelColor_0 = focusedLabelColor;
    var unfocusedLabelColor_0 = unfocusedLabelColor;
    var disabledLabelColor_0 = disabledLabelColor;
    var errorLabelColor_0 = errorLabelColor;
    var placeholderColor_0 = placeholderColor;
    var disabledPlaceholderColor_0 = disabledPlaceholderColor;
    var focusedSupportingTextColor_0 = focusedSupportingTextColor;
    var unfocusedSupportingTextColor_0 = unfocusedSupportingTextColor;
    var disabledSupportingTextColor_0 = disabledSupportingTextColor;
    var errorSupportingTextColor_0 = errorSupportingTextColor;
    var focusedPrefixColor_0 = focusedPrefixColor;
    var unfocusedPrefixColor_0 = unfocusedPrefixColor;
    var disabledPrefixColor_0 = disabledPrefixColor;
    var errorPrefixColor_0 = errorPrefixColor;
    var focusedSuffixColor_0 = focusedSuffixColor;
    var unfocusedSuffixColor_0 = unfocusedSuffixColor;
    var disabledSuffixColor_0 = disabledSuffixColor;
    var errorSuffixColor_0 = errorSuffixColor;
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(-819021558);
    sourceInformation($composer_0, 'C(outlinedTextFieldColors$composable)P(28:c#ui.graphics.Color,9:c#ui.graphics.Color,0:c#ui.graphics.Color,1:c#ui.graphics.Color,12:c#ui.graphics.Color,27,19:c#ui.graphics.Color,29:c#ui.graphics.Color,2:c#ui.graphics.Color,11:c#ui.graphics.Color,21:c#ui.graphics.Color,31:c#ui.graphics.Color,4:c#ui.graphics.Color,14:c#ui.graphics.Color,25:c#ui.graphics.Color,35:c#ui.graphics.Color,10:c#ui.graphics.Color,18:c#ui.graphics.Color,20:c#ui.graphics.Color,30:c#ui.graphics.Color,3:c#ui.graphics.Color,13:c#ui.graphics.Color,26:c#ui.graphics.Color,5:c#ui.graphics.Color,24:c#ui.graphics.Color,34:c#ui.graphics.Color,8:c#ui.graphics.Color,17:c#ui.graphics.Color,22:c#ui.graphics.Color,32:c#ui.graphics.Color,6:c#ui.graphics.Color,15:c#ui.graphics.Color,23:c#ui.graphics.Color,33:c#ui.graphics.Color,7:c#ui.graphics.Color,16:c#ui.graphics.Color)1155@64431L9,1156@64520L9,1159@64718L9,1160@64808L9,1161@64891L7,1162@64978L9,1163@65064L9,1164@65157L9,1166@65318L9,1167@65416L9,1168@65511L9,1169@65613L9,1171@65787L9,1172@65887L9,1173@65984L9,1175@66101L9,1176@66265L9,1177@66351L9,1178@66434L9,1179@66524L9,1181@66680L9,1182@66771L9,1183@66867L9,1185@67039L9,1186@67136L9,1188@67253L9,1189@67415L9,1190@67503L9,1191@67593L9,1192@67682L9,1194@67840L9,1195@67928L9,1196@68018L9,1197@68107L9,1199@68265L9,1200@68327L2237:TextFieldDefaults.kt#uh7d8r');
    if (!(($default & 1) === 0))
      textColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_InputColor_zapq3m_k$(), $composer_0, 6);
    if (!(($default & 2) === 0))
      disabledTextColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(OutlinedTextFieldTokens_getInstance().get_DisabledInputColor_84w2ke_k$(), $composer_0, 6), OutlinedTextFieldTokens_getInstance().get_DisabledInputOpacity_vi261m_k$());
    if (!(($default & 4) === 0))
      containerColor_0 = Companion_getInstance().get_Transparent_if5ln4_k$();
    if (!(($default & 8) === 0))
      cursorColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_CaretColor_hxe08n_k$(), $composer_0, 6);
    if (!(($default & 16) === 0))
      errorCursorColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_ErrorFocusCaretColor_vrfnbt_k$(), $composer_0, 6);
    if (!(($default & 32) === 0)) {
      // Inline function 'androidx.compose.runtime.CompositionLocal.$get-current$$composable' call
      var this_0 = get_LocalTextSelectionColors();
      var $composer_1 = $composer_0;
      sourceInformationMarkerStart($composer_1, 858843746, 'CC($get-current$$composable):CompositionLocal.kt#9igjgp');
      var tmp0 = $composer_1.consume_ebzcrh_k$(this_0);
      sourceInformationMarkerEnd($composer_1);
      selectionColors_0 = tmp0;
    }
    if (!(($default & 64) === 0))
      focusedBorderColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_FocusOutlineColor_j0f8fk_k$(), $composer_0, 6);
    if (!(($default & 128) === 0))
      unfocusedBorderColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_OutlineColor_hddgeu_k$(), $composer_0, 6);
    if (!(($default & 256) === 0))
      disabledBorderColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(OutlinedTextFieldTokens_getInstance().get_DisabledOutlineColor_jjhidi_k$(), $composer_0, 6), OutlinedTextFieldTokens_getInstance().get_DisabledOutlineOpacity_9n3m4y_k$());
    if (!(($default & 512) === 0))
      errorBorderColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_ErrorOutlineColor_pvtv8g_k$(), $composer_0, 6);
    if (!(($default & 1024) === 0))
      focusedLeadingIconColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_FocusLeadingIconColor_pqzv77_k$(), $composer_0, 6);
    if (!(($default & 2048) === 0))
      unfocusedLeadingIconColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_LeadingIconColor_4sfzzh_k$(), $composer_0, 6);
    if (!(($default & 4096) === 0))
      disabledLeadingIconColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(OutlinedTextFieldTokens_getInstance().get_DisabledLeadingIconColor_dtgxah_k$(), $composer_0, 6), OutlinedTextFieldTokens_getInstance().get_DisabledLeadingIconOpacity_va1u41_k$());
    if (!(($default & 8192) === 0))
      errorLeadingIconColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_ErrorLeadingIconColor_b3l6n7_k$(), $composer_0, 6);
    if (!(($default & 16384) === 0))
      focusedTrailingIconColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_FocusTrailingIconColor_xs0xep_k$(), $composer_0, 6);
    if (!(($default & 32768) === 0))
      unfocusedTrailingIconColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_TrailingIconColor_qrzqp1_k$(), $composer_0, 6);
    if (!(($default & 65536) === 0))
      disabledTrailingIconColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(OutlinedTextFieldTokens_getInstance().get_DisabledTrailingIconColor_mjc79l_k$(), $composer_0, 6), OutlinedTextFieldTokens_getInstance().get_DisabledTrailingIconOpacity_s6onap_k$());
    if (!(($default & 131072) === 0))
      errorTrailingIconColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_ErrorTrailingIconColor_9a4b73_k$(), $composer_0, 6);
    if (!(($default & 262144) === 0))
      focusedLabelColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_FocusLabelColor_fu63wi_k$(), $composer_0, 6);
    if (!(($default & 524288) === 0))
      unfocusedLabelColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_LabelColor_ewxvns_k$(), $composer_0, 6);
    if (!(($default & 1048576) === 0))
      disabledLabelColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(OutlinedTextFieldTokens_getInstance().get_DisabledLabelColor_sycis4_k$(), $composer_0, 6), OutlinedTextFieldTokens_getInstance().get_DisabledLabelOpacity_f5f918_k$());
    if (!(($default & 2097152) === 0))
      errorLabelColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_ErrorLabelColor_kbze9a_k$(), $composer_0, 6);
    if (!(($default & 4194304) === 0))
      placeholderColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_InputPlaceholderColor_5cj1ap_k$(), $composer_0, 6);
    if (!(($default & 8388608) === 0))
      disabledPlaceholderColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(OutlinedTextFieldTokens_getInstance().get_DisabledInputColor_84w2ke_k$(), $composer_0, 6), OutlinedTextFieldTokens_getInstance().get_DisabledInputOpacity_vi261m_k$());
    if (!(($default & 16777216) === 0))
      focusedSupportingTextColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_FocusSupportingColor_nyu4nz_k$(), $composer_0, 6);
    if (!(($default & 33554432) === 0))
      unfocusedSupportingTextColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_SupportingColor_eb3yw7_k$(), $composer_0, 6);
    if (!(($default & 67108864) === 0))
      disabledSupportingTextColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(OutlinedTextFieldTokens_getInstance().get_DisabledSupportingColor_hh8a7p_k$(), $composer_0, 6), OutlinedTextFieldTokens_getInstance().get_DisabledSupportingOpacity_prppv_k$());
    if (!(($default & 134217728) === 0))
      errorSupportingTextColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_ErrorSupportingColor_63y79r_k$(), $composer_0, 6);
    if (!(($default & 268435456) === 0))
      focusedPrefixColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_InputPrefixColor_l0lf3k_k$(), $composer_0, 6);
    if (!(($default & 536870912) === 0))
      unfocusedPrefixColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_InputPrefixColor_l0lf3k_k$(), $composer_0, 6);
    if (!(($default & 1073741824) === 0))
      disabledPrefixColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(OutlinedTextFieldTokens_getInstance().get_InputPrefixColor_l0lf3k_k$(), $composer_0, 6), OutlinedTextFieldTokens_getInstance().get_DisabledInputOpacity_vi261m_k$());
    if (!(($default1 & 1) === 0))
      errorPrefixColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_InputPrefixColor_l0lf3k_k$(), $composer_0, 6);
    if (!(($default1 & 2) === 0))
      focusedSuffixColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_InputSuffixColor_ya4w9d_k$(), $composer_0, 6);
    if (!(($default1 & 4) === 0))
      unfocusedSuffixColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_InputSuffixColor_ya4w9d_k$(), $composer_0, 6);
    if (!(($default1 & 8) === 0))
      disabledSuffixColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(OutlinedTextFieldTokens_getInstance().get_InputSuffixColor_ya4w9d_k$(), $composer_0, 6), OutlinedTextFieldTokens_getInstance().get_DisabledInputOpacity_vi261m_k$());
    if (!(($default1 & 16) === 0))
      errorSuffixColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_InputSuffixColor_ya4w9d_k$(), $composer_0, 6);
    if (isTraceInProgress()) {
      traceEventStart(-819021558, $changed, $changed1, 'androidx.compose.material3.TextFieldDefaults.outlinedTextFieldColors$composable (TextFieldDefaults.kt:1154)');
    }
    var tmp0_0 = OutlinedTextFieldDefaults_getInstance().colors$composable_uqty46_k$(textColor_0, textColor_0, disabledTextColor_0, textColor_0, containerColor_0, containerColor_0, containerColor_0, containerColor_0, cursorColor_0, errorCursorColor_0, selectionColors_0, focusedBorderColor_0, unfocusedBorderColor_0, disabledBorderColor_0, errorBorderColor_0, focusedLeadingIconColor_0, unfocusedLeadingIconColor_0, disabledLeadingIconColor_0, errorLeadingIconColor_0, focusedTrailingIconColor_0, unfocusedTrailingIconColor_0, disabledTrailingIconColor_0, errorTrailingIconColor_0, focusedLabelColor_0, unfocusedLabelColor_0, disabledLabelColor_0, errorLabelColor_0, placeholderColor_0, placeholderColor_0, disabledPlaceholderColor_0, placeholderColor_0, focusedSupportingTextColor_0, unfocusedSupportingTextColor_0, disabledSupportingTextColor_0, errorSupportingTextColor_0, focusedPrefixColor_0, unfocusedPrefixColor_0, disabledPrefixColor_0, errorPrefixColor_0, focusedSuffixColor_0, unfocusedSuffixColor_0, disabledSuffixColor_0, errorSuffixColor_0, $composer_0, 14 & $changed | 112 & $changed << 3 | 896 & $changed << 3 | 7168 & $changed << 9 | 57344 & $changed << 6 | 458752 & $changed << 9 | 3670016 & $changed << 12 | 29360128 & $changed << 15 | 234881024 & $changed << 15 | 1879048192 & $changed << 15, 14 & $changed >> 15 | 112 & $changed >> 15 | 896 & $changed >> 15 | 7168 & $changed >> 15 | 57344 & $changed >> 15 | 458752 & $changed1 << 15 | 3670016 & $changed1 << 15 | 29360128 & $changed1 << 15 | 234881024 & $changed1 << 15 | 1879048192 & $changed1 << 15, 14 & $changed1 >> 15 | 112 & $changed1 >> 15 | 896 & $changed1 >> 15 | 7168 & $changed1 >> 15 | 57344 & $changed1 >> 15 | 458752 & $changed2 << 15 | 3670016 & $changed2 << 15 | 29360128 & $changed2 << 15 | 234881024 & $changed2 << 18 | 1879048192 & $changed2 << 18, 14 & $changed2 >> 6 | 112 & $changed2 >> 9 | 896 & $changed2 >> 9 | 7168 & $changed2 >> 9 | 57344 & $changed2 >> 9 | 458752 & $changed2 >> 9 | 3670016 & $changed2 >> 9 | 29360128 & $changed3 << 21 | 234881024 & $changed3 << 21 | 1879048192 & $changed3 << 21, 3072 | 14 & $changed3 >> 9 | 112 & $changed3 >> 9 | 896 & $changed3 >> 9, 0, 0);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0_0;
  };
  protoOf(TextFieldDefaults).TextFieldDecorationBox$composable_1zgafo_k$ = function (value, innerTextField, enabled, singleLine, visualTransformation, interactionSource, isError, label, placeholder, leadingIcon, trailingIcon, supportingText, shape, colors, contentPadding, container, $composer, $changed, $changed1, $default) {
    var isError_0 = {_v: isError};
    var label_0 = {_v: label};
    var placeholder_0 = {_v: placeholder};
    var leadingIcon_0 = {_v: leadingIcon};
    var trailingIcon_0 = {_v: trailingIcon};
    var supportingText_0 = {_v: supportingText};
    var shape_0 = {_v: shape};
    var colors_0 = {_v: colors};
    var contentPadding_0 = {_v: contentPadding};
    var container_0 = {_v: container};
    var $composer_0 = $composer;
    $composer_0 = $composer_0.startRestartGroup_lebv1i_k$(-1958588812);
    sourceInformation($composer_0, 'C(TextFieldDecorationBox$composable)P(14,4,3,11,15,5,6,7,9,8,13,12,10!1,2)1262@71315L5,1263@71356L8,1274@71711L684:TextFieldDefaults.kt#uh7d8r');
    var $dirty = $changed;
    var $dirty1 = $changed1;
    if (!(($default & 1) === 0))
      $dirty = $dirty | 6;
    else if (($changed & 14) === 0)
      $dirty = $dirty | ($composer_0.changed_ga7h3f_k$(value) ? 4 : 2);
    if (!(($default & 2) === 0))
      $dirty = $dirty | 48;
    else if (($changed & 112) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(innerTextField) ? 32 : 16);
    if (!(($default & 4) === 0))
      $dirty = $dirty | 384;
    else if (($changed & 896) === 0)
      $dirty = $dirty | ($composer_0.changed_jpyyrz_k$(enabled) ? 256 : 128);
    if (!(($default & 8) === 0))
      $dirty = $dirty | 3072;
    else if (($changed & 7168) === 0)
      $dirty = $dirty | ($composer_0.changed_jpyyrz_k$(singleLine) ? 2048 : 1024);
    if (!(($default & 16) === 0))
      $dirty = $dirty | 24576;
    else if (($changed & 57344) === 0)
      $dirty = $dirty | ($composer_0.changed_ga7h3f_k$(visualTransformation) ? 16384 : 8192);
    if (!(($default & 32) === 0))
      $dirty = $dirty | 196608;
    else if (($changed & 458752) === 0)
      $dirty = $dirty | ($composer_0.changed_ga7h3f_k$(interactionSource) ? 131072 : 65536);
    if (!(($default & 64) === 0))
      $dirty = $dirty | 1572864;
    else if (($changed & 3670016) === 0)
      $dirty = $dirty | ($composer_0.changed_jpyyrz_k$(isError_0._v) ? 1048576 : 524288);
    if (!(($default & 128) === 0))
      $dirty = $dirty | 12582912;
    else if (($changed & 29360128) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(label_0._v) ? 8388608 : 4194304);
    if (!(($default & 256) === 0))
      $dirty = $dirty | 100663296;
    else if (($changed & 234881024) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(placeholder_0._v) ? 67108864 : 33554432);
    if (!(($default & 512) === 0))
      $dirty = $dirty | 805306368;
    else if (($changed & 1879048192) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(leadingIcon_0._v) ? 536870912 : 268435456);
    if (!(($default & 1024) === 0))
      $dirty1 = $dirty1 | 6;
    else if (($changed1 & 14) === 0)
      $dirty1 = $dirty1 | ($composer_0.changedInstance_s1wkiy_k$(trailingIcon_0._v) ? 4 : 2);
    if (!(($default & 2048) === 0))
      $dirty1 = $dirty1 | 48;
    else if (($changed1 & 112) === 0)
      $dirty1 = $dirty1 | ($composer_0.changedInstance_s1wkiy_k$(supportingText_0._v) ? 32 : 16);
    if (($changed1 & 896) === 0)
      $dirty1 = $dirty1 | ((($default & 4096) === 0 ? $composer_0.changed_ga7h3f_k$(shape_0._v) : false) ? 256 : 128);
    if (($changed1 & 7168) === 0)
      $dirty1 = $dirty1 | ((($default & 8192) === 0 ? $composer_0.changed_ga7h3f_k$(colors_0._v) : false) ? 2048 : 1024);
    if (($changed1 & 57344) === 0)
      $dirty1 = $dirty1 | ((($default & 16384) === 0 ? $composer_0.changed_ga7h3f_k$(contentPadding_0._v) : false) ? 16384 : 8192);
    if (!(($default & 32768) === 0))
      $dirty1 = $dirty1 | 196608;
    else if (($changed1 & 458752) === 0)
      $dirty1 = $dirty1 | ($composer_0.changedInstance_s1wkiy_k$(container_0._v) ? 131072 : 65536);
    if (!(($default & 65536) === 0))
      $dirty1 = $dirty1 | 1572864;
    else if (($changed1 & 3670016) === 0)
      $dirty1 = $dirty1 | ($composer_0.changed_ga7h3f_k$(this) ? 1048576 : 524288);
    if ((!(($dirty & 1533916891) === 306783378) ? true : !(($dirty1 & 2995931) === 599186)) ? true : !$composer_0.get_skipping_3owdve_k$()) {
      $composer_0.startDefaults_g83kzo_k$();
      if (($changed & 1) === 0 ? true : $composer_0.get_defaultsInvalid_y88fc4_k$()) {
        if (!(($default & 64) === 0)) {
          isError_0._v = false;
        }
        if (!(($default & 128) === 0)) {
          label_0._v = null;
        }
        if (!(($default & 256) === 0)) {
          placeholder_0._v = null;
        }
        if (!(($default & 512) === 0)) {
          leadingIcon_0._v = null;
        }
        if (!(($default & 1024) === 0)) {
          trailingIcon_0._v = null;
        }
        if (!(($default & 2048) === 0)) {
          supportingText_0._v = null;
        }
        if (!(($default & 4096) === 0)) {
          shape_0._v = TextFieldDefaults_getInstance().$get_shape$$composable_df7h3a_k$($composer_0, 6);
          $dirty1 = $dirty1 & -897;
        }
        if (!(($default & 8192) === 0)) {
          var tmp = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_0 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_1 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_2 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_3 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_4 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_5 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_6 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_7 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_8 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_9 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_10 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_11 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_12 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_13 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_14 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_15 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_16 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_17 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_18 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_19 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_20 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_21 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_22 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_23 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_24 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_25 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_26 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_27 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_28 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_29 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_30 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_31 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_32 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_33 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_34 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_35 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_36 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_37 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_38 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_39 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          colors_0._v = this.colors$composable_uqty46_k$(tmp, tmp_0, tmp_1, tmp_2, tmp_3, tmp_4, tmp_5, tmp_6, tmp_7, tmp_8, null, tmp_9, tmp_10, tmp_11, tmp_12, tmp_13, tmp_14, tmp_15, tmp_16, tmp_17, tmp_18, tmp_19, tmp_20, tmp_21, tmp_22, tmp_23, tmp_24, tmp_25, tmp_26, tmp_27, tmp_28, tmp_29, tmp_30, tmp_31, tmp_32, tmp_33, tmp_34, tmp_35, tmp_36, tmp_37, tmp_38, tmp_39, _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0))), $composer_0, 0, 0, 0, 0, 0, 2147483647, 4095);
          $dirty1 = $dirty1 & -7169;
        }
        if (!(($default & 16384) === 0)) {
          var tmp_40;
          if (label_0._v == null) {
            tmp_40 = this.contentPaddingWithoutLabel$default_h0esvv_k$();
          } else {
            tmp_40 = this.contentPaddingWithLabel$default_n9hc89_k$();
          }
          contentPadding_0._v = tmp_40;
          $dirty1 = $dirty1 & -57345;
        }
        if (!(($default & 32768) === 0)) {
          // Inline function 'kotlin.run' call
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'androidx.compose.material3.TextFieldDefaults.TextFieldDecorationBox$composable.<anonymous>' call
          var tmp_41 = $composer_0;
          var dispatchReceiver = composableLambda(tmp_41, -1171460386, true, TextFieldDefaults$TextFieldDecorationBox$composable$lambda_1(enabled, isError_0, interactionSource, colors_0, shape_0, $dirty, $dirty1));
          // Inline function 'androidx.compose.runtime.remember$composable' call
          var $composer_1 = $composer_0;
          $composer_1.startReplaceableGroup_ip860b_k$(-838505973);
          sourceInformation($composer_1, 'CC(remember$composable)P(1):Composables.kt#9igjgp');
          // Inline function 'androidx.compose.runtime.cache' call
          var invalid = $composer_1.changed_ga7h3f_k$(dispatchReceiver);
          // Inline function 'kotlin.let' call
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
          var it = $composer_1.rememberedValue_4dg93v_k$();
          var tmp_42;
          if (invalid ? true : it === Companion_getInstance_2().get_Empty_i9b85g_k$()) {
            // Inline function 'androidx.compose.material3.TextFieldDefaults.TextFieldDecorationBox$composable.<anonymous>.<anonymous>' call
            var value_0 = ComposableLambda$invoke$ref_2(dispatchReceiver);
            $composer_1.updateRememberedValue_l1wh71_k$(value_0);
            tmp_42 = value_0;
          } else {
            tmp_42 = it;
          }
          var tmp_43 = tmp_42;
          var tmp0 = (tmp_43 == null ? true : !(tmp_43 == null)) ? tmp_43 : THROW_CCE();
          $composer_1.endReplaceableGroup_ern0ak_k$();
          container_0._v = tmp0;
        }
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        if (!(($default & 4096) === 0))
          $dirty1 = $dirty1 & -897;
        if (!(($default & 8192) === 0))
          $dirty1 = $dirty1 & -7169;
        if (!(($default & 16384) === 0))
          $dirty1 = $dirty1 & -57345;
      }
      $composer_0.endDefaults_b0s0ot_k$();
      if (isTraceInProgress()) {
        traceEventStart(-1958588812, $dirty, $dirty1, 'androidx.compose.material3.TextFieldDefaults.TextFieldDecorationBox$composable (TextFieldDefaults.kt:1249)');
      }
      this.DecorationBox$composable_56lh3b_k$(value, innerTextField, enabled, singleLine, visualTransformation, interactionSource, isError_0._v, label_0._v, placeholder_0._v, leadingIcon_0._v, trailingIcon_0._v, null, null, supportingText_0._v, shape_0._v, colors_0._v, contentPadding_0._v, container_0._v, $composer_0, 14 & $dirty | 112 & $dirty | 896 & $dirty | 7168 & $dirty | 57344 & $dirty | 458752 & $dirty | 3670016 & $dirty | 29360128 & $dirty | 234881024 & $dirty | 1879048192 & $dirty, 432 | 14 & $dirty1 | 7168 & $dirty1 << 6 | 57344 & $dirty1 << 6 | 458752 & $dirty1 << 6 | 3670016 & $dirty1 << 6 | 29360128 & $dirty1 << 6 | 234881024 & $dirty1 << 6, 0);
      if (isTraceInProgress()) {
        traceEventEnd();
      }
    } else {
      $composer_0.skipToGroupEnd_lh3zi2_k$();
    }
    var tmp1_safe_receiver = $composer_0.endRestartGroup_yxpjv9_k$();
    if (tmp1_safe_receiver === null)
      null;
    else {
      tmp1_safe_receiver.updateScope_t8jcf_k$(TextFieldDefaults$TextFieldDecorationBox$composable$lambda_2(this, value, innerTextField, enabled, singleLine, visualTransformation, interactionSource, isError_0, label_0, placeholder_0, leadingIcon_0, trailingIcon_0, supportingText_0, shape_0, colors_0, contentPadding_0, container_0, $changed, $changed1, $default));
    }
  };
  protoOf(TextFieldDefaults).OutlinedTextFieldDecorationBox$composable_nawpoe_k$ = function (value, innerTextField, enabled, singleLine, visualTransformation, interactionSource, isError, label, placeholder, leadingIcon, trailingIcon, supportingText, colors, contentPadding, container, $composer, $changed, $changed1, $default) {
    var isError_0 = {_v: isError};
    var label_0 = {_v: label};
    var placeholder_0 = {_v: placeholder};
    var leadingIcon_0 = {_v: leadingIcon};
    var trailingIcon_0 = {_v: trailingIcon};
    var supportingText_0 = {_v: supportingText};
    var colors_0 = {_v: colors};
    var contentPadding_0 = {_v: contentPadding};
    var container_0 = {_v: container};
    var $composer_0 = $composer;
    $composer_0 = $composer_0.startRestartGroup_lebv1i_k$(1665855384);
    sourceInformation($composer_0, 'C(OutlinedTextFieldDecorationBox$composable)P(13,4,3,10,14,5,6,7,9,8,12,11!1,2)1312@73179L8,1318@73467L656:TextFieldDefaults.kt#uh7d8r');
    var $dirty = $changed;
    var $dirty1 = $changed1;
    if (!(($default & 1) === 0))
      $dirty = $dirty | 6;
    else if (($changed & 14) === 0)
      $dirty = $dirty | ($composer_0.changed_ga7h3f_k$(value) ? 4 : 2);
    if (!(($default & 2) === 0))
      $dirty = $dirty | 48;
    else if (($changed & 112) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(innerTextField) ? 32 : 16);
    if (!(($default & 4) === 0))
      $dirty = $dirty | 384;
    else if (($changed & 896) === 0)
      $dirty = $dirty | ($composer_0.changed_jpyyrz_k$(enabled) ? 256 : 128);
    if (!(($default & 8) === 0))
      $dirty = $dirty | 3072;
    else if (($changed & 7168) === 0)
      $dirty = $dirty | ($composer_0.changed_jpyyrz_k$(singleLine) ? 2048 : 1024);
    if (!(($default & 16) === 0))
      $dirty = $dirty | 24576;
    else if (($changed & 57344) === 0)
      $dirty = $dirty | ($composer_0.changed_ga7h3f_k$(visualTransformation) ? 16384 : 8192);
    if (!(($default & 32) === 0))
      $dirty = $dirty | 196608;
    else if (($changed & 458752) === 0)
      $dirty = $dirty | ($composer_0.changed_ga7h3f_k$(interactionSource) ? 131072 : 65536);
    if (!(($default & 64) === 0))
      $dirty = $dirty | 1572864;
    else if (($changed & 3670016) === 0)
      $dirty = $dirty | ($composer_0.changed_jpyyrz_k$(isError_0._v) ? 1048576 : 524288);
    if (!(($default & 128) === 0))
      $dirty = $dirty | 12582912;
    else if (($changed & 29360128) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(label_0._v) ? 8388608 : 4194304);
    if (!(($default & 256) === 0))
      $dirty = $dirty | 100663296;
    else if (($changed & 234881024) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(placeholder_0._v) ? 67108864 : 33554432);
    if (!(($default & 512) === 0))
      $dirty = $dirty | 805306368;
    else if (($changed & 1879048192) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(leadingIcon_0._v) ? 536870912 : 268435456);
    if (!(($default & 1024) === 0))
      $dirty1 = $dirty1 | 6;
    else if (($changed1 & 14) === 0)
      $dirty1 = $dirty1 | ($composer_0.changedInstance_s1wkiy_k$(trailingIcon_0._v) ? 4 : 2);
    if (!(($default & 2048) === 0))
      $dirty1 = $dirty1 | 48;
    else if (($changed1 & 112) === 0)
      $dirty1 = $dirty1 | ($composer_0.changedInstance_s1wkiy_k$(supportingText_0._v) ? 32 : 16);
    if (($changed1 & 896) === 0)
      $dirty1 = $dirty1 | ((($default & 4096) === 0 ? $composer_0.changed_ga7h3f_k$(colors_0._v) : false) ? 256 : 128);
    if (($changed1 & 7168) === 0)
      $dirty1 = $dirty1 | ((($default & 8192) === 0 ? $composer_0.changed_ga7h3f_k$(contentPadding_0._v) : false) ? 2048 : 1024);
    if (!(($default & 16384) === 0))
      $dirty1 = $dirty1 | 24576;
    else if (($changed1 & 57344) === 0)
      $dirty1 = $dirty1 | ($composer_0.changedInstance_s1wkiy_k$(container_0._v) ? 16384 : 8192);
    if ((!(($dirty & 1533916891) === 306783378) ? true : !(($dirty1 & 46811) === 9362)) ? true : !$composer_0.get_skipping_3owdve_k$()) {
      $composer_0.startDefaults_g83kzo_k$();
      if (($changed & 1) === 0 ? true : $composer_0.get_defaultsInvalid_y88fc4_k$()) {
        if (!(($default & 64) === 0)) {
          isError_0._v = false;
        }
        if (!(($default & 128) === 0)) {
          label_0._v = null;
        }
        if (!(($default & 256) === 0)) {
          placeholder_0._v = null;
        }
        if (!(($default & 512) === 0)) {
          leadingIcon_0._v = null;
        }
        if (!(($default & 1024) === 0)) {
          trailingIcon_0._v = null;
        }
        if (!(($default & 2048) === 0)) {
          supportingText_0._v = null;
        }
        if (!(($default & 4096) === 0)) {
          var tmp = OutlinedTextFieldDefaults_getInstance();
          var tmp_0 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_1 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_2 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_3 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_4 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_5 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_6 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_7 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_8 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_9 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_10 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_11 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_12 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_13 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_14 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_15 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_16 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_17 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_18 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_19 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_20 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_21 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_22 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_23 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_24 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_25 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_26 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_27 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_28 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_29 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_30 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_31 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_32 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_33 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_34 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_35 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_36 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_37 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_38 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_39 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_40 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          colors_0._v = tmp.colors$composable_uqty46_k$(tmp_0, tmp_1, tmp_2, tmp_3, tmp_4, tmp_5, tmp_6, tmp_7, tmp_8, tmp_9, null, tmp_10, tmp_11, tmp_12, tmp_13, tmp_14, tmp_15, tmp_16, tmp_17, tmp_18, tmp_19, tmp_20, tmp_21, tmp_22, tmp_23, tmp_24, tmp_25, tmp_26, tmp_27, tmp_28, tmp_29, tmp_30, tmp_31, tmp_32, tmp_33, tmp_34, tmp_35, tmp_36, tmp_37, tmp_38, tmp_39, tmp_40, _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0))), $composer_0, 0, 0, 0, 0, 3072, 2147483647, 4095);
          $dirty1 = $dirty1 & -897;
        }
        if (!(($default & 8192) === 0)) {
          contentPadding_0._v = OutlinedTextFieldDefaults_getInstance().contentPadding$default_qqopph_k$();
          $dirty1 = $dirty1 & -7169;
        }
        if (!(($default & 16384) === 0)) {
          // Inline function 'kotlin.run' call
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'androidx.compose.material3.TextFieldDefaults.OutlinedTextFieldDecorationBox$composable.<anonymous>' call
          var tmp_41 = $composer_0;
          var dispatchReceiver = composableLambda(tmp_41, 144282315, true, TextFieldDefaults$OutlinedTextFieldDecorationBox$composable$lambda_1(enabled, isError_0, interactionSource, colors_0, $dirty, $dirty1));
          // Inline function 'androidx.compose.runtime.remember$composable' call
          var $composer_1 = $composer_0;
          $composer_1.startReplaceableGroup_ip860b_k$(-838505973);
          sourceInformation($composer_1, 'CC(remember$composable)P(1):Composables.kt#9igjgp');
          // Inline function 'androidx.compose.runtime.cache' call
          var invalid = $composer_1.changed_ga7h3f_k$(dispatchReceiver);
          // Inline function 'kotlin.let' call
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
          var it = $composer_1.rememberedValue_4dg93v_k$();
          var tmp_42;
          if (invalid ? true : it === Companion_getInstance_2().get_Empty_i9b85g_k$()) {
            // Inline function 'androidx.compose.material3.TextFieldDefaults.OutlinedTextFieldDecorationBox$composable.<anonymous>.<anonymous>' call
            var value_0 = ComposableLambda$invoke$ref_3(dispatchReceiver);
            $composer_1.updateRememberedValue_l1wh71_k$(value_0);
            tmp_42 = value_0;
          } else {
            tmp_42 = it;
          }
          var tmp_43 = tmp_42;
          var tmp0 = (tmp_43 == null ? true : !(tmp_43 == null)) ? tmp_43 : THROW_CCE();
          $composer_1.endReplaceableGroup_ern0ak_k$();
          container_0._v = tmp0;
        }
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        if (!(($default & 4096) === 0))
          $dirty1 = $dirty1 & -897;
        if (!(($default & 8192) === 0))
          $dirty1 = $dirty1 & -7169;
      }
      $composer_0.endDefaults_b0s0ot_k$();
      if (isTraceInProgress()) {
        traceEventStart(1665855384, $dirty, $dirty1, 'androidx.compose.material3.TextFieldDefaults.OutlinedTextFieldDecorationBox$composable (TextFieldDefaults.kt:1299)');
      }
      OutlinedTextFieldDefaults_getInstance().DecorationBox$composable_5dzloz_k$(value, innerTextField, enabled, singleLine, visualTransformation, interactionSource, isError_0._v, label_0._v, placeholder_0._v, leadingIcon_0._v, trailingIcon_0._v, null, null, supportingText_0._v, colors_0._v, contentPadding_0._v, container_0._v, $composer_0, 14 & $dirty | 112 & $dirty | 896 & $dirty | 7168 & $dirty | 57344 & $dirty | 458752 & $dirty | 3670016 & $dirty | 29360128 & $dirty | 234881024 & $dirty | 1879048192 & $dirty, 12583344 | 14 & $dirty1 | 7168 & $dirty1 << 6 | 57344 & $dirty1 << 6 | 458752 & $dirty1 << 6 | 3670016 & $dirty1 << 6, 0);
      if (isTraceInProgress()) {
        traceEventEnd();
      }
    } else {
      $composer_0.skipToGroupEnd_lh3zi2_k$();
    }
    var tmp1_safe_receiver = $composer_0.endRestartGroup_yxpjv9_k$();
    if (tmp1_safe_receiver === null)
      null;
    else {
      tmp1_safe_receiver.updateScope_t8jcf_k$(TextFieldDefaults$OutlinedTextFieldDecorationBox$composable$lambda_2(this, value, innerTextField, enabled, singleLine, visualTransformation, interactionSource, isError_0, label_0, placeholder_0, leadingIcon_0, trailingIcon_0, supportingText_0, colors_0, contentPadding_0, container_0, $changed, $changed1, $default));
    }
  };
  var TextFieldDefaults_instance;
  function TextFieldDefaults_getInstance() {
    if (TextFieldDefaults_instance == null)
      new TextFieldDefaults();
    return TextFieldDefaults_instance;
  }
  function animateBorderStrokeAsState$composable(enabled, isError, interactionSource, colors, focusedBorderThickness, unfocusedBorderThickness, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(1175954513);
    sourceInformation($composer_0, 'C(animateBorderStrokeAsState$composable)P(1,4,3!1,2:c#ui.unit.Dp,5:c#ui.unit.Dp)2112@112642L25,2113@112700L51,2120@113057L107:TextFieldDefaults.kt#uh7d8r');
    if (isTraceInProgress()) {
      traceEventStart(1175954513, $changed, -1, 'androidx.compose.material3.animateBorderStrokeAsState$composable (TextFieldDefaults.kt:2104)');
    }
    var focused$delegate = collectIsFocusedAsState$composable(interactionSource, $composer_0, 14 & $changed >> 6);
    var indicatorColor = colors.indicatorColor$composable_dhpqjv_k$(enabled, isError, interactionSource, $composer_0, 14 & $changed | 112 & $changed | 896 & $changed | 7168 & $changed);
    var targetThickness = animateBorderStrokeAsState$composable$lambda(focused$delegate) ? focusedBorderThickness : unfocusedBorderThickness;
    var tmp;
    if (enabled) {
      $composer_0.startReplaceableGroup_ip860b_k$(-1860194271);
      sourceInformation($composer_0, '2116@112895L76');
      var tmp_0 = tween(get_AnimationDuration());
      var tmp1_group = animateDpAsState$composable(targetThickness, tmp_0, null, null, $composer_0, 48, 12);
      $composer_0.endReplaceableGroup_ern0ak_k$();
      tmp = tmp1_group;
    } else {
      $composer_0.startReplaceableGroup_ip860b_k$(-1860194173);
      sourceInformation($composer_0, '2118@112993L46');
      var tmp2_group = rememberUpdatedState$composable(new Dp(unfocusedBorderThickness), $composer_0, 14 & $changed >> 15);
      $composer_0.endReplaceableGroup_ern0ak_k$();
      tmp = tmp2_group;
    }
    var animatedThickness = tmp;
    var tmp0 = rememberUpdatedState$composable(new BorderStroke(animatedThickness.get_value_j01efc_k$().value_1, new SolidColor(indicatorColor.get_value_j01efc_k$().value_1)), $composer_0, 0);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0;
  }
  function get_$stableprop_7() {
    return 0;
  }
  function OutlinedTextFieldDefaults$ContainerBox$composable$lambda($tmp0_rcvr, $enabled, $isError, $interactionSource, $colors, $shape, $focusedBorderThickness, $unfocusedBorderThickness, $$changed, $$default) {
    return function ($composer, $force) {
      $tmp0_rcvr.ContainerBox$composable_cszs2e_k$($enabled, $isError, $interactionSource, $colors, $shape._v, $focusedBorderThickness._v.value_1, $unfocusedBorderThickness._v.value_1, $composer, updateChangedFlags($$changed | 1), $$default);
      return Unit_getInstance();
    };
  }
  function OutlinedTextFieldDefaults$DecorationBox$composable$lambda($enabled, $isError, $interactionSource, $colors, $$dirty, $$dirty1) {
    return function ($composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C1655@93646L135:TextFieldDefaults.kt#uh7d8r');
      var tmp;
      if (!(($changed & 11) === 2) ? true : !$composer_0.get_skipping_3owdve_k$()) {
        if (isTraceInProgress()) {
          traceEventStart(-1448570018, $changed, -1, 'androidx.compose.material3.OutlinedTextFieldDefaults.DecorationBox$composable.<anonymous> (TextFieldDefaults.kt:1654)');
        }
        var tmp_0 = OutlinedTextFieldDefaults_getInstance();
        var tmp_1 = $isError._v;
        var tmp_2 = $colors._v;
        var tmp_3 = _Dp___init__impl__ms3zkb(0.0);
        tmp_0.ContainerBox$composable_cszs2e_k$($enabled, tmp_1, $interactionSource, tmp_2, null, tmp_3, _Dp___init__impl__ms3zkb(0.0), $composer_0, 12582912 | 14 & $$dirty >> 6 | 112 & $$dirty >> 15 | 896 & $$dirty >> 9 | 7168 & $$dirty1 >> 3, 112);
        var tmp_4;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_4 = Unit_getInstance();
        }
        tmp = tmp_4;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_4($boundThis) {
    return function (p0, p1) {
      return $boundThis.invoke_z8di7s_k$(p0, p1);
    };
  }
  function OutlinedTextFieldDefaults$DecorationBox$composable$lambda_0($tmp0_rcvr, $value, $innerTextField, $enabled, $singleLine, $visualTransformation, $interactionSource, $isError, $label, $placeholder, $leadingIcon, $trailingIcon, $prefix, $suffix, $supportingText, $colors, $contentPadding, $container, $$changed, $$changed1, $$default) {
    return function ($composer, $force) {
      $tmp0_rcvr.DecorationBox$composable_5dzloz_k$($value, $innerTextField, $enabled, $singleLine, $visualTransformation, $interactionSource, $isError._v, $label._v, $placeholder._v, $leadingIcon._v, $trailingIcon._v, $prefix._v, $suffix._v, $supportingText._v, $colors._v, $contentPadding._v, $container._v, $composer, updateChangedFlags($$changed | 1), updateChangedFlags($$changed1), $$default);
      return Unit_getInstance();
    };
  }
  function OutlinedTextFieldDefaults() {
    OutlinedTextFieldDefaults_instance = this;
    var tmp = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp.MinHeight_1 = _Dp___init__impl__ms3zkb(56);
    var tmp_0 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_0.MinWidth_1 = _Dp___init__impl__ms3zkb(280);
    var tmp_1 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_1.UnfocusedBorderThickness_1 = _Dp___init__impl__ms3zkb(1);
    var tmp_2 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_2.FocusedBorderThickness_1 = _Dp___init__impl__ms3zkb(2);
    this.$stable_1 = 0;
  }
  protoOf(OutlinedTextFieldDefaults).get_shape_iyi9a0_k$ = function () {
    illegalDecoyCallException('<get-shape>');
  };
  protoOf(OutlinedTextFieldDefaults).get_MinHeight_87ywfh_k$ = function () {
    return this.MinHeight_1;
  };
  protoOf(OutlinedTextFieldDefaults).get_MinWidth_bp2e3e_k$ = function () {
    return this.MinWidth_1;
  };
  protoOf(OutlinedTextFieldDefaults).get_UnfocusedBorderThickness_7t081c_k$ = function () {
    return this.UnfocusedBorderThickness_1;
  };
  protoOf(OutlinedTextFieldDefaults).get_FocusedBorderThickness_4i9nsn_k$ = function () {
    return this.FocusedBorderThickness_1;
  };
  protoOf(OutlinedTextFieldDefaults).ContainerBox_942kxf_k$ = function (enabled, isError, interactionSource, colors, shape, focusedBorderThickness, unfocusedBorderThickness) {
    illegalDecoyCallException('ContainerBox');
  };
  protoOf(OutlinedTextFieldDefaults).contentPadding_rnzes8_k$ = function (start, top, end, bottom) {
    return PaddingValues_0(start, top, end, bottom);
  };
  protoOf(OutlinedTextFieldDefaults).contentPadding$default_qqopph_k$ = function (start, top, end, bottom, $super) {
    start = start === VOID ? get_TextFieldPadding() : start;
    top = top === VOID ? get_TextFieldPadding() : top;
    end = end === VOID ? get_TextFieldPadding() : end;
    bottom = bottom === VOID ? get_TextFieldPadding() : bottom;
    return $super === VOID ? this.contentPadding_rnzes8_k$(start, top, end, bottom) : $super.contentPadding_rnzes8_k$.call(this, new Dp(start), new Dp(top), new Dp(end), new Dp(bottom));
  };
  protoOf(OutlinedTextFieldDefaults).colors_c7gkr7_k$ = function (focusedTextColor, unfocusedTextColor, disabledTextColor, errorTextColor, focusedContainerColor, unfocusedContainerColor, disabledContainerColor, errorContainerColor, cursorColor, errorCursorColor, selectionColors, focusedBorderColor, unfocusedBorderColor, disabledBorderColor, errorBorderColor, focusedLeadingIconColor, unfocusedLeadingIconColor, disabledLeadingIconColor, errorLeadingIconColor, focusedTrailingIconColor, unfocusedTrailingIconColor, disabledTrailingIconColor, errorTrailingIconColor, focusedLabelColor, unfocusedLabelColor, disabledLabelColor, errorLabelColor, focusedPlaceholderColor, unfocusedPlaceholderColor, disabledPlaceholderColor, errorPlaceholderColor, focusedSupportingTextColor, unfocusedSupportingTextColor, disabledSupportingTextColor, errorSupportingTextColor, focusedPrefixColor, unfocusedPrefixColor, disabledPrefixColor, errorPrefixColor, focusedSuffixColor, unfocusedSuffixColor, disabledSuffixColor, errorSuffixColor) {
    illegalDecoyCallException('colors');
  };
  protoOf(OutlinedTextFieldDefaults).DecorationBox_dfg05c_k$ = function (value, innerTextField, enabled, singleLine, visualTransformation, interactionSource, isError, label, placeholder, leadingIcon, trailingIcon, prefix, suffix, supportingText, colors, contentPadding, container) {
    illegalDecoyCallException('DecorationBox');
  };
  protoOf(OutlinedTextFieldDefaults).$get_shape$$composable_df7h3a_k$ = function ($composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(-681249626);
    sourceInformation($composer_0, 'C($get-shape$$composable)1347@74442L9:TextFieldDefaults.kt#uh7d8r');
    if (isTraceInProgress()) {
      traceEventStart(-681249626, $changed, -1, 'androidx.compose.material3.OutlinedTextFieldDefaults.$get-shape$$composable (TextFieldDefaults.kt:1347)');
    }
    var tmp0 = toShape$composable(OutlinedTextFieldTokens_getInstance().get_ContainerShape_ur17m1_k$(), $composer_0, 6);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0;
  };
  protoOf(OutlinedTextFieldDefaults).ContainerBox$composable_cszs2e_k$ = function (enabled, isError, interactionSource, colors, shape, focusedBorderThickness, unfocusedBorderThickness, $composer, $changed, $default) {
    var shape_0 = {_v: shape};
    var focusedBorderThickness_0 = {_v: new Dp(focusedBorderThickness)};
    var unfocusedBorderThickness_0 = {_v: new Dp(unfocusedBorderThickness)};
    var $composer_0 = $composer;
    $composer_0 = $composer_0.startRestartGroup_lebv1i_k$(-281994739);
    sourceInformation($composer_0, 'C(ContainerBox$composable)P(1,4,3!1,5,2:c#ui.unit.Dp,6:c#ui.unit.Dp)1394@76327L9,1398@76498L203,1410@76843L51,1406@76710L199:TextFieldDefaults.kt#uh7d8r');
    var $dirty = $changed;
    if (!(($default & 1) === 0))
      $dirty = $dirty | 6;
    else if (($changed & 14) === 0)
      $dirty = $dirty | ($composer_0.changed_jpyyrz_k$(enabled) ? 4 : 2);
    if (!(($default & 2) === 0))
      $dirty = $dirty | 48;
    else if (($changed & 112) === 0)
      $dirty = $dirty | ($composer_0.changed_jpyyrz_k$(isError) ? 32 : 16);
    if (!(($default & 4) === 0))
      $dirty = $dirty | 384;
    else if (($changed & 896) === 0)
      $dirty = $dirty | ($composer_0.changed_ga7h3f_k$(interactionSource) ? 256 : 128);
    if (!(($default & 8) === 0))
      $dirty = $dirty | 3072;
    else if (($changed & 7168) === 0)
      $dirty = $dirty | ($composer_0.changed_ga7h3f_k$(colors) ? 2048 : 1024);
    if (($changed & 57344) === 0)
      $dirty = $dirty | ((($default & 16) === 0 ? $composer_0.changed_ga7h3f_k$(shape_0._v) : false) ? 16384 : 8192);
    if (($changed & 458752) === 0)
      $dirty = $dirty | ((($default & 32) === 0 ? $composer_0.changed_i8bvic_k$(_Dp___get_value__impl__geb1vb(focusedBorderThickness_0._v.value_1)) : false) ? 131072 : 65536);
    if (($changed & 3670016) === 0)
      $dirty = $dirty | ((($default & 64) === 0 ? $composer_0.changed_i8bvic_k$(_Dp___get_value__impl__geb1vb(unfocusedBorderThickness_0._v.value_1)) : false) ? 1048576 : 524288);
    if (!(($dirty & 2995931) === 599186) ? true : !$composer_0.get_skipping_3owdve_k$()) {
      $composer_0.startDefaults_g83kzo_k$();
      if (($changed & 1) === 0 ? true : $composer_0.get_defaultsInvalid_y88fc4_k$()) {
        if (!(($default & 16) === 0)) {
          shape_0._v = toShape$composable(OutlinedTextFieldTokens_getInstance().get_ContainerShape_ur17m1_k$(), $composer_0, 6);
          $dirty = $dirty & -57345;
        }
        if (!(($default & 32) === 0)) {
          focusedBorderThickness_0._v = new Dp(this.FocusedBorderThickness_1);
          $dirty = $dirty & -458753;
        }
        if (!(($default & 64) === 0)) {
          unfocusedBorderThickness_0._v = new Dp(this.UnfocusedBorderThickness_1);
          $dirty = $dirty & -3670017;
        }
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        if (!(($default & 16) === 0))
          $dirty = $dirty & -57345;
        if (!(($default & 32) === 0))
          $dirty = $dirty & -458753;
        if (!(($default & 64) === 0))
          $dirty = $dirty & -3670017;
      }
      $composer_0.endDefaults_b0s0ot_k$();
      if (isTraceInProgress()) {
        traceEventStart(-281994739, $dirty, -1, 'androidx.compose.material3.OutlinedTextFieldDefaults.ContainerBox$composable (TextFieldDefaults.kt:1389)');
      }
      var borderStroke = animateBorderStrokeAsState$composable(enabled, isError, interactionSource, colors, focusedBorderThickness_0._v.value_1, unfocusedBorderThickness_0._v.value_1, $composer_0, 14 & $dirty | 112 & $dirty | 896 & $dirty | 7168 & $dirty | 57344 & $dirty >> 3 | 458752 & $dirty >> 3);
      Box$composable(background(border(Companion_getInstance_1(), borderStroke.get_value_j01efc_k$(), shape_0._v), colors.containerColor$composable_wme525_k$(enabled, isError, interactionSource, $composer_0, 14 & $dirty | 112 & $dirty | 896 & $dirty | 7168 & $dirty).get_value_j01efc_k$().value_1, shape_0._v), $composer_0, 0);
      if (isTraceInProgress()) {
        traceEventEnd();
      }
    } else {
      $composer_0.skipToGroupEnd_lh3zi2_k$();
    }
    var tmp1_safe_receiver = $composer_0.endRestartGroup_yxpjv9_k$();
    if (tmp1_safe_receiver === null)
      null;
    else {
      tmp1_safe_receiver.updateScope_t8jcf_k$(OutlinedTextFieldDefaults$ContainerBox$composable$lambda(this, enabled, isError, interactionSource, colors, shape_0, focusedBorderThickness_0, unfocusedBorderThickness_0, $changed, $default));
    }
  };
  protoOf(OutlinedTextFieldDefaults).colors$composable_uqty46_k$ = function (focusedTextColor, unfocusedTextColor, disabledTextColor, errorTextColor, focusedContainerColor, unfocusedContainerColor, disabledContainerColor, errorContainerColor, cursorColor, errorCursorColor, selectionColors, focusedBorderColor, unfocusedBorderColor, disabledBorderColor, errorBorderColor, focusedLeadingIconColor, unfocusedLeadingIconColor, disabledLeadingIconColor, errorLeadingIconColor, focusedTrailingIconColor, unfocusedTrailingIconColor, disabledTrailingIconColor, errorTrailingIconColor, focusedLabelColor, unfocusedLabelColor, disabledLabelColor, errorLabelColor, focusedPlaceholderColor, unfocusedPlaceholderColor, disabledPlaceholderColor, errorPlaceholderColor, focusedSupportingTextColor, unfocusedSupportingTextColor, disabledSupportingTextColor, errorSupportingTextColor, focusedPrefixColor, unfocusedPrefixColor, disabledPrefixColor, errorPrefixColor, focusedSuffixColor, unfocusedSuffixColor, disabledSuffixColor, errorSuffixColor, $composer, $changed, $changed1, $changed2, $changed3, $changed4, $default, $default1) {
    var focusedTextColor_0 = focusedTextColor;
    var unfocusedTextColor_0 = unfocusedTextColor;
    var disabledTextColor_0 = disabledTextColor;
    var errorTextColor_0 = errorTextColor;
    var focusedContainerColor_0 = focusedContainerColor;
    var unfocusedContainerColor_0 = unfocusedContainerColor;
    var disabledContainerColor_0 = disabledContainerColor;
    var errorContainerColor_0 = errorContainerColor;
    var cursorColor_0 = cursorColor;
    var errorCursorColor_0 = errorCursorColor;
    var selectionColors_0 = selectionColors;
    var focusedBorderColor_0 = focusedBorderColor;
    var unfocusedBorderColor_0 = unfocusedBorderColor;
    var disabledBorderColor_0 = disabledBorderColor;
    var errorBorderColor_0 = errorBorderColor;
    var focusedLeadingIconColor_0 = focusedLeadingIconColor;
    var unfocusedLeadingIconColor_0 = unfocusedLeadingIconColor;
    var disabledLeadingIconColor_0 = disabledLeadingIconColor;
    var errorLeadingIconColor_0 = errorLeadingIconColor;
    var focusedTrailingIconColor_0 = focusedTrailingIconColor;
    var unfocusedTrailingIconColor_0 = unfocusedTrailingIconColor;
    var disabledTrailingIconColor_0 = disabledTrailingIconColor;
    var errorTrailingIconColor_0 = errorTrailingIconColor;
    var focusedLabelColor_0 = focusedLabelColor;
    var unfocusedLabelColor_0 = unfocusedLabelColor;
    var disabledLabelColor_0 = disabledLabelColor;
    var errorLabelColor_0 = errorLabelColor;
    var focusedPlaceholderColor_0 = focusedPlaceholderColor;
    var unfocusedPlaceholderColor_0 = unfocusedPlaceholderColor;
    var disabledPlaceholderColor_0 = disabledPlaceholderColor;
    var errorPlaceholderColor_0 = errorPlaceholderColor;
    var focusedSupportingTextColor_0 = focusedSupportingTextColor;
    var unfocusedSupportingTextColor_0 = unfocusedSupportingTextColor;
    var disabledSupportingTextColor_0 = disabledSupportingTextColor;
    var errorSupportingTextColor_0 = errorSupportingTextColor;
    var focusedPrefixColor_0 = focusedPrefixColor;
    var unfocusedPrefixColor_0 = unfocusedPrefixColor;
    var disabledPrefixColor_0 = disabledPrefixColor;
    var errorPrefixColor_0 = errorPrefixColor;
    var focusedSuffixColor_0 = focusedSuffixColor;
    var unfocusedSuffixColor_0 = unfocusedSuffixColor;
    var disabledSuffixColor_0 = disabledSuffixColor;
    var errorSuffixColor_0 = errorSuffixColor;
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(1319587102);
    sourceInformation($composer_0, 'C(colors$composable)P(30:c#ui.graphics.Color,41:c#ui.graphics.Color,9:c#ui.graphics.Color,20:c#ui.graphics.Color,23:c#ui.graphics.Color,34:c#ui.graphics.Color,2:c#ui.graphics.Color,12:c#ui.graphics.Color,0:c#ui.graphics.Color,13:c#ui.graphics.Color,32,22:c#ui.graphics.Color,33:c#ui.graphics.Color,1:c#ui.graphics.Color,11:c#ui.graphics.Color,25:c#ui.graphics.Color,36:c#ui.graphics.Color,4:c#ui.graphics.Color,15:c#ui.graphics.Color,31:c#ui.graphics.Color,42:c#ui.graphics.Color,10:c#ui.graphics.Color,21:c#ui.graphics.Color,24:c#ui.graphics.Color,35:c#ui.graphics.Color,3:c#ui.graphics.Color,14:c#ui.graphics.Color,26:c#ui.graphics.Color,37:c#ui.graphics.Color,5:c#ui.graphics.Color,16:c#ui.graphics.Color,29:c#ui.graphics.Color,40:c#ui.graphics.Color,8:c#ui.graphics.Color,19:c#ui.graphics.Color,27:c#ui.graphics.Color,38:c#ui.graphics.Color,6:c#ui.graphics.Color,17:c#ui.graphics.Color,28:c#ui.graphics.Color,39:c#ui.graphics.Color,7:c#ui.graphics.Color,18:c#ui.graphics.Color)1479@81602L9,1480@81684L9,1481@81773L9,1483@81928L9,1488@82236L9,1489@82326L9,1490@82409L7,1491@82496L9,1492@82582L9,1493@82675L9,1495@82836L9,1496@82934L9,1497@83029L9,1498@83131L9,1500@83305L9,1501@83405L9,1502@83502L9,1504@83619L9,1505@83783L9,1506@83869L9,1507@83952L9,1508@84042L9,1510@84198L9,1511@84296L9,1512@84396L9,1513@84492L9,1515@84660L9,1516@84760L9,1517@84857L9,1519@84974L9,1520@85136L9,1521@85224L9,1522@85314L9,1523@85403L9,1525@85561L9,1526@85649L9,1527@85739L9,1528@85828L9,1530@85986L9:TextFieldDefaults.kt#uh7d8r');
    if (!(($default & 1) === 0))
      focusedTextColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_FocusInputColor_ydhhuw_k$(), $composer_0, 6);
    if (!(($default & 2) === 0))
      unfocusedTextColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_InputColor_zapq3m_k$(), $composer_0, 6);
    if (!(($default & 4) === 0))
      disabledTextColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(OutlinedTextFieldTokens_getInstance().get_DisabledInputColor_84w2ke_k$(), $composer_0, 6), OutlinedTextFieldTokens_getInstance().get_DisabledInputOpacity_vi261m_k$());
    if (!(($default & 8) === 0))
      errorTextColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_ErrorInputColor_hh1yg_k$(), $composer_0, 6);
    if (!(($default & 16) === 0))
      focusedContainerColor_0 = Companion_getInstance().get_Transparent_if5ln4_k$();
    if (!(($default & 32) === 0))
      unfocusedContainerColor_0 = Companion_getInstance().get_Transparent_if5ln4_k$();
    if (!(($default & 64) === 0))
      disabledContainerColor_0 = Companion_getInstance().get_Transparent_if5ln4_k$();
    if (!(($default & 128) === 0))
      errorContainerColor_0 = Companion_getInstance().get_Transparent_if5ln4_k$();
    if (!(($default & 256) === 0))
      cursorColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_CaretColor_hxe08n_k$(), $composer_0, 6);
    if (!(($default & 512) === 0))
      errorCursorColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_ErrorFocusCaretColor_vrfnbt_k$(), $composer_0, 6);
    if (!(($default & 1024) === 0)) {
      // Inline function 'androidx.compose.runtime.CompositionLocal.$get-current$$composable' call
      var this_0 = get_LocalTextSelectionColors();
      var $composer_1 = $composer_0;
      sourceInformationMarkerStart($composer_1, 858843746, 'CC($get-current$$composable):CompositionLocal.kt#9igjgp');
      var tmp0 = $composer_1.consume_ebzcrh_k$(this_0);
      sourceInformationMarkerEnd($composer_1);
      selectionColors_0 = tmp0;
    }
    if (!(($default & 2048) === 0))
      focusedBorderColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_FocusOutlineColor_j0f8fk_k$(), $composer_0, 6);
    if (!(($default & 4096) === 0))
      unfocusedBorderColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_OutlineColor_hddgeu_k$(), $composer_0, 6);
    if (!(($default & 8192) === 0))
      disabledBorderColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(OutlinedTextFieldTokens_getInstance().get_DisabledOutlineColor_jjhidi_k$(), $composer_0, 6), OutlinedTextFieldTokens_getInstance().get_DisabledOutlineOpacity_9n3m4y_k$());
    if (!(($default & 16384) === 0))
      errorBorderColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_ErrorOutlineColor_pvtv8g_k$(), $composer_0, 6);
    if (!(($default & 32768) === 0))
      focusedLeadingIconColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_FocusLeadingIconColor_pqzv77_k$(), $composer_0, 6);
    if (!(($default & 65536) === 0))
      unfocusedLeadingIconColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_LeadingIconColor_4sfzzh_k$(), $composer_0, 6);
    if (!(($default & 131072) === 0))
      disabledLeadingIconColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(OutlinedTextFieldTokens_getInstance().get_DisabledLeadingIconColor_dtgxah_k$(), $composer_0, 6), OutlinedTextFieldTokens_getInstance().get_DisabledLeadingIconOpacity_va1u41_k$());
    if (!(($default & 262144) === 0))
      errorLeadingIconColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_ErrorLeadingIconColor_b3l6n7_k$(), $composer_0, 6);
    if (!(($default & 524288) === 0))
      focusedTrailingIconColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_FocusTrailingIconColor_xs0xep_k$(), $composer_0, 6);
    if (!(($default & 1048576) === 0))
      unfocusedTrailingIconColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_TrailingIconColor_qrzqp1_k$(), $composer_0, 6);
    if (!(($default & 2097152) === 0))
      disabledTrailingIconColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(OutlinedTextFieldTokens_getInstance().get_DisabledTrailingIconColor_mjc79l_k$(), $composer_0, 6), OutlinedTextFieldTokens_getInstance().get_DisabledTrailingIconOpacity_s6onap_k$());
    if (!(($default & 4194304) === 0))
      errorTrailingIconColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_ErrorTrailingIconColor_9a4b73_k$(), $composer_0, 6);
    if (!(($default & 8388608) === 0))
      focusedLabelColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_FocusLabelColor_fu63wi_k$(), $composer_0, 6);
    if (!(($default & 16777216) === 0))
      unfocusedLabelColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_LabelColor_ewxvns_k$(), $composer_0, 6);
    if (!(($default & 33554432) === 0))
      disabledLabelColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(OutlinedTextFieldTokens_getInstance().get_DisabledLabelColor_sycis4_k$(), $composer_0, 6), OutlinedTextFieldTokens_getInstance().get_DisabledLabelOpacity_f5f918_k$());
    if (!(($default & 67108864) === 0))
      errorLabelColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_ErrorLabelColor_kbze9a_k$(), $composer_0, 6);
    if (!(($default & 134217728) === 0))
      focusedPlaceholderColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_InputPlaceholderColor_5cj1ap_k$(), $composer_0, 6);
    if (!(($default & 268435456) === 0))
      unfocusedPlaceholderColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_InputPlaceholderColor_5cj1ap_k$(), $composer_0, 6);
    if (!(($default & 536870912) === 0))
      disabledPlaceholderColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(OutlinedTextFieldTokens_getInstance().get_DisabledInputColor_84w2ke_k$(), $composer_0, 6), OutlinedTextFieldTokens_getInstance().get_DisabledInputOpacity_vi261m_k$());
    if (!(($default & 1073741824) === 0))
      errorPlaceholderColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_InputPlaceholderColor_5cj1ap_k$(), $composer_0, 6);
    if (!(($default1 & 1) === 0))
      focusedSupportingTextColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_FocusSupportingColor_nyu4nz_k$(), $composer_0, 6);
    if (!(($default1 & 2) === 0))
      unfocusedSupportingTextColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_SupportingColor_eb3yw7_k$(), $composer_0, 6);
    if (!(($default1 & 4) === 0))
      disabledSupportingTextColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(OutlinedTextFieldTokens_getInstance().get_DisabledSupportingColor_hh8a7p_k$(), $composer_0, 6), OutlinedTextFieldTokens_getInstance().get_DisabledSupportingOpacity_prppv_k$());
    if (!(($default1 & 8) === 0))
      errorSupportingTextColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_ErrorSupportingColor_63y79r_k$(), $composer_0, 6);
    if (!(($default1 & 16) === 0))
      focusedPrefixColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_InputPrefixColor_l0lf3k_k$(), $composer_0, 6);
    if (!(($default1 & 32) === 0))
      unfocusedPrefixColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_InputPrefixColor_l0lf3k_k$(), $composer_0, 6);
    if (!(($default1 & 64) === 0))
      disabledPrefixColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(OutlinedTextFieldTokens_getInstance().get_InputPrefixColor_l0lf3k_k$(), $composer_0, 6), OutlinedTextFieldTokens_getInstance().get_DisabledInputOpacity_vi261m_k$());
    if (!(($default1 & 128) === 0))
      errorPrefixColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_InputPrefixColor_l0lf3k_k$(), $composer_0, 6);
    if (!(($default1 & 256) === 0))
      focusedSuffixColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_InputSuffixColor_ya4w9d_k$(), $composer_0, 6);
    if (!(($default1 & 512) === 0))
      unfocusedSuffixColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_InputSuffixColor_ya4w9d_k$(), $composer_0, 6);
    if (!(($default1 & 1024) === 0))
      disabledSuffixColor_0 = Color__copy$default_impl_ectz3s(toColor$composable(OutlinedTextFieldTokens_getInstance().get_InputSuffixColor_ya4w9d_k$(), $composer_0, 6), OutlinedTextFieldTokens_getInstance().get_DisabledInputOpacity_vi261m_k$());
    if (!(($default1 & 2048) === 0))
      errorSuffixColor_0 = toColor$composable(OutlinedTextFieldTokens_getInstance().get_InputSuffixColor_ya4w9d_k$(), $composer_0, 6);
    if (isTraceInProgress()) {
      traceEventStart(1319587102, $changed, $changed1, 'androidx.compose.material3.OutlinedTextFieldDefaults.colors$composable (TextFieldDefaults.kt:1478)');
    }
    var tmp0_0 = new TextFieldColors(focusedTextColor_0, unfocusedTextColor_0, disabledTextColor_0, errorTextColor_0, focusedContainerColor_0, unfocusedContainerColor_0, disabledContainerColor_0, errorContainerColor_0, cursorColor_0, errorCursorColor_0, selectionColors_0, focusedBorderColor_0, unfocusedBorderColor_0, disabledBorderColor_0, errorBorderColor_0, focusedLeadingIconColor_0, unfocusedLeadingIconColor_0, disabledLeadingIconColor_0, errorLeadingIconColor_0, focusedTrailingIconColor_0, unfocusedTrailingIconColor_0, disabledTrailingIconColor_0, errorTrailingIconColor_0, focusedLabelColor_0, unfocusedLabelColor_0, disabledLabelColor_0, errorLabelColor_0, focusedPlaceholderColor_0, unfocusedPlaceholderColor_0, disabledPlaceholderColor_0, errorPlaceholderColor_0, focusedSupportingTextColor_0, unfocusedSupportingTextColor_0, disabledSupportingTextColor_0, errorSupportingTextColor_0, focusedPrefixColor_0, unfocusedPrefixColor_0, disabledPrefixColor_0, errorPrefixColor_0, focusedSuffixColor_0, unfocusedSuffixColor_0, disabledSuffixColor_0, errorSuffixColor_0);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0_0;
  };
  protoOf(OutlinedTextFieldDefaults).DecorationBox$composable_5dzloz_k$ = function (value, innerTextField, enabled, singleLine, visualTransformation, interactionSource, isError, label, placeholder, leadingIcon, trailingIcon, prefix, suffix, supportingText, colors, contentPadding, container, $composer, $changed, $changed1, $default) {
    var isError_0 = {_v: isError};
    var label_0 = {_v: label};
    var placeholder_0 = {_v: placeholder};
    var leadingIcon_0 = {_v: leadingIcon};
    var trailingIcon_0 = {_v: trailingIcon};
    var prefix_0 = {_v: prefix};
    var suffix_0 = {_v: suffix};
    var supportingText_0 = {_v: supportingText};
    var colors_0 = {_v: colors};
    var contentPadding_0 = {_v: contentPadding};
    var container_0 = {_v: container};
    var $composer_0 = $composer;
    $composer_0 = $composer_0.startRestartGroup_lebv1i_k$(1743324829);
    sourceInformation($composer_0, 'C(DecorationBox$composable)P(15,4,3,11,16,5,6,7,9,8,14,10,12,13!1,2)1652@93520L8,1663@93808L709:TextFieldDefaults.kt#uh7d8r');
    var $dirty = $changed;
    var $dirty1 = $changed1;
    if (!(($default & 1) === 0))
      $dirty = $dirty | 6;
    else if (($changed & 14) === 0)
      $dirty = $dirty | ($composer_0.changed_ga7h3f_k$(value) ? 4 : 2);
    if (!(($default & 2) === 0))
      $dirty = $dirty | 48;
    else if (($changed & 112) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(innerTextField) ? 32 : 16);
    if (!(($default & 4) === 0))
      $dirty = $dirty | 384;
    else if (($changed & 896) === 0)
      $dirty = $dirty | ($composer_0.changed_jpyyrz_k$(enabled) ? 256 : 128);
    if (!(($default & 8) === 0))
      $dirty = $dirty | 3072;
    else if (($changed & 7168) === 0)
      $dirty = $dirty | ($composer_0.changed_jpyyrz_k$(singleLine) ? 2048 : 1024);
    if (!(($default & 16) === 0))
      $dirty = $dirty | 24576;
    else if (($changed & 57344) === 0)
      $dirty = $dirty | ($composer_0.changed_ga7h3f_k$(visualTransformation) ? 16384 : 8192);
    if (!(($default & 32) === 0))
      $dirty = $dirty | 196608;
    else if (($changed & 458752) === 0)
      $dirty = $dirty | ($composer_0.changed_ga7h3f_k$(interactionSource) ? 131072 : 65536);
    if (!(($default & 64) === 0))
      $dirty = $dirty | 1572864;
    else if (($changed & 3670016) === 0)
      $dirty = $dirty | ($composer_0.changed_jpyyrz_k$(isError_0._v) ? 1048576 : 524288);
    if (!(($default & 128) === 0))
      $dirty = $dirty | 12582912;
    else if (($changed & 29360128) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(label_0._v) ? 8388608 : 4194304);
    if (!(($default & 256) === 0))
      $dirty = $dirty | 100663296;
    else if (($changed & 234881024) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(placeholder_0._v) ? 67108864 : 33554432);
    if (!(($default & 512) === 0))
      $dirty = $dirty | 805306368;
    else if (($changed & 1879048192) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(leadingIcon_0._v) ? 536870912 : 268435456);
    if (!(($default & 1024) === 0))
      $dirty1 = $dirty1 | 6;
    else if (($changed1 & 14) === 0)
      $dirty1 = $dirty1 | ($composer_0.changedInstance_s1wkiy_k$(trailingIcon_0._v) ? 4 : 2);
    if (!(($default & 2048) === 0))
      $dirty1 = $dirty1 | 48;
    else if (($changed1 & 112) === 0)
      $dirty1 = $dirty1 | ($composer_0.changedInstance_s1wkiy_k$(prefix_0._v) ? 32 : 16);
    if (!(($default & 4096) === 0))
      $dirty1 = $dirty1 | 384;
    else if (($changed1 & 896) === 0)
      $dirty1 = $dirty1 | ($composer_0.changedInstance_s1wkiy_k$(suffix_0._v) ? 256 : 128);
    if (!(($default & 8192) === 0))
      $dirty1 = $dirty1 | 3072;
    else if (($changed1 & 7168) === 0)
      $dirty1 = $dirty1 | ($composer_0.changedInstance_s1wkiy_k$(supportingText_0._v) ? 2048 : 1024);
    if (($changed1 & 57344) === 0)
      $dirty1 = $dirty1 | ((($default & 16384) === 0 ? $composer_0.changed_ga7h3f_k$(colors_0._v) : false) ? 16384 : 8192);
    if (($changed1 & 458752) === 0)
      $dirty1 = $dirty1 | ((($default & 32768) === 0 ? $composer_0.changed_ga7h3f_k$(contentPadding_0._v) : false) ? 131072 : 65536);
    if (!(($default & 65536) === 0))
      $dirty1 = $dirty1 | 1572864;
    else if (($changed1 & 3670016) === 0)
      $dirty1 = $dirty1 | ($composer_0.changedInstance_s1wkiy_k$(container_0._v) ? 1048576 : 524288);
    if ((!(($dirty & 1533916891) === 306783378) ? true : !(($dirty1 & 2995931) === 599186)) ? true : !$composer_0.get_skipping_3owdve_k$()) {
      $composer_0.startDefaults_g83kzo_k$();
      if (($changed & 1) === 0 ? true : $composer_0.get_defaultsInvalid_y88fc4_k$()) {
        if (!(($default & 64) === 0)) {
          isError_0._v = false;
        }
        if (!(($default & 128) === 0)) {
          label_0._v = null;
        }
        if (!(($default & 256) === 0)) {
          placeholder_0._v = null;
        }
        if (!(($default & 512) === 0)) {
          leadingIcon_0._v = null;
        }
        if (!(($default & 1024) === 0)) {
          trailingIcon_0._v = null;
        }
        if (!(($default & 2048) === 0)) {
          prefix_0._v = null;
        }
        if (!(($default & 4096) === 0)) {
          suffix_0._v = null;
        }
        if (!(($default & 8192) === 0)) {
          supportingText_0._v = null;
        }
        if (!(($default & 16384) === 0)) {
          var tmp = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_0 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_1 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_2 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_3 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_4 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_5 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_6 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_7 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_8 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_9 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_10 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_11 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_12 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_13 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_14 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_15 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_16 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_17 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_18 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_19 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_20 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_21 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_22 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_23 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_24 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_25 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_26 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_27 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_28 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_29 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_30 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_31 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_32 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_33 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_34 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_35 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_36 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_37 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_38 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          var tmp_39 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
          colors_0._v = this.colors$composable_uqty46_k$(tmp, tmp_0, tmp_1, tmp_2, tmp_3, tmp_4, tmp_5, tmp_6, tmp_7, tmp_8, null, tmp_9, tmp_10, tmp_11, tmp_12, tmp_13, tmp_14, tmp_15, tmp_16, tmp_17, tmp_18, tmp_19, tmp_20, tmp_21, tmp_22, tmp_23, tmp_24, tmp_25, tmp_26, tmp_27, tmp_28, tmp_29, tmp_30, tmp_31, tmp_32, tmp_33, tmp_34, tmp_35, tmp_36, tmp_37, tmp_38, tmp_39, _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0))), $composer_0, 0, 0, 0, 0, 0, 2147483647, 4095);
          $dirty1 = $dirty1 & -57345;
        }
        if (!(($default & 32768) === 0)) {
          contentPadding_0._v = this.contentPadding$default_qqopph_k$();
          $dirty1 = $dirty1 & -458753;
        }
        if (!(($default & 65536) === 0)) {
          // Inline function 'kotlin.run' call
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'androidx.compose.material3.OutlinedTextFieldDefaults.DecorationBox$composable.<anonymous>' call
          var tmp_40 = $composer_0;
          var dispatchReceiver = composableLambda(tmp_40, -1448570018, true, OutlinedTextFieldDefaults$DecorationBox$composable$lambda(enabled, isError_0, interactionSource, colors_0, $dirty, $dirty1));
          // Inline function 'androidx.compose.runtime.remember$composable' call
          var $composer_1 = $composer_0;
          $composer_1.startReplaceableGroup_ip860b_k$(-838505973);
          sourceInformation($composer_1, 'CC(remember$composable)P(1):Composables.kt#9igjgp');
          // Inline function 'androidx.compose.runtime.cache' call
          var invalid = $composer_1.changed_ga7h3f_k$(dispatchReceiver);
          // Inline function 'kotlin.let' call
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
          var it = $composer_1.rememberedValue_4dg93v_k$();
          var tmp_41;
          if (invalid ? true : it === Companion_getInstance_2().get_Empty_i9b85g_k$()) {
            // Inline function 'androidx.compose.material3.OutlinedTextFieldDefaults.DecorationBox$composable.<anonymous>.<anonymous>' call
            var value_0 = ComposableLambda$invoke$ref_4(dispatchReceiver);
            $composer_1.updateRememberedValue_l1wh71_k$(value_0);
            tmp_41 = value_0;
          } else {
            tmp_41 = it;
          }
          var tmp_42 = tmp_41;
          var tmp0 = (tmp_42 == null ? true : !(tmp_42 == null)) ? tmp_42 : THROW_CCE();
          $composer_1.endReplaceableGroup_ern0ak_k$();
          container_0._v = tmp0;
        }
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        if (!(($default & 16384) === 0))
          $dirty1 = $dirty1 & -57345;
        if (!(($default & 32768) === 0))
          $dirty1 = $dirty1 & -458753;
      }
      $composer_0.endDefaults_b0s0ot_k$();
      if (isTraceInProgress()) {
        traceEventStart(1743324829, $dirty, $dirty1, 'androidx.compose.material3.OutlinedTextFieldDefaults.DecorationBox$composable (TextFieldDefaults.kt:1637)');
      }
      var tmp0_type = TextFieldType_Outlined_getInstance();
      CommonDecorationBox$composable(tmp0_type, value, innerTextField, visualTransformation, label_0._v, placeholder_0._v, leadingIcon_0._v, trailingIcon_0._v, prefix_0._v, suffix_0._v, supportingText_0._v, singleLine, enabled, isError_0._v, interactionSource, contentPadding_0._v, colors_0._v, container_0._v, $composer_0, 6 | 112 & $dirty << 3 | 896 & $dirty << 3 | 7168 & $dirty >> 3 | 57344 & $dirty >> 9 | 458752 & $dirty >> 9 | 3670016 & $dirty >> 9 | 29360128 & $dirty1 << 21 | 234881024 & $dirty1 << 21 | 1879048192 & $dirty1 << 21, 14 & $dirty1 >> 9 | 112 & $dirty >> 6 | 896 & $dirty | 7168 & $dirty >> 9 | 57344 & $dirty >> 3 | 458752 & $dirty1 | 3670016 & $dirty1 << 6 | 29360128 & $dirty1 << 3, 0);
      if (isTraceInProgress()) {
        traceEventEnd();
      }
    } else {
      $composer_0.skipToGroupEnd_lh3zi2_k$();
    }
    var tmp1_safe_receiver = $composer_0.endRestartGroup_yxpjv9_k$();
    if (tmp1_safe_receiver === null)
      null;
    else {
      tmp1_safe_receiver.updateScope_t8jcf_k$(OutlinedTextFieldDefaults$DecorationBox$composable$lambda_0(this, value, innerTextField, enabled, singleLine, visualTransformation, interactionSource, isError_0, label_0, placeholder_0, leadingIcon_0, trailingIcon_0, prefix_0, suffix_0, supportingText_0, colors_0, contentPadding_0, container_0, $changed, $changed1, $default));
    }
  };
  var OutlinedTextFieldDefaults_instance;
  function OutlinedTextFieldDefaults_getInstance() {
    if (OutlinedTextFieldDefaults_instance == null)
      new OutlinedTextFieldDefaults();
    return OutlinedTextFieldDefaults_instance;
  }
  function animateBorderStrokeAsState$composable$lambda($focused$delegate) {
    // Inline function 'androidx.compose.runtime.getValue' call
    getLocalDelegateReference('focused', KProperty0, false, function () {
      return THROW_ISE();
    });
    return $focused$delegate.get_value_j01efc_k$();
  }
  function get_ZeroConstraints() {
    _init_properties_TextFieldImpl_kt__7vp9id();
    return ZeroConstraints;
  }
  var ZeroConstraints;
  function get_TextFieldPadding() {
    _init_properties_TextFieldImpl_kt__7vp9id();
    return TextFieldPadding;
  }
  var TextFieldPadding;
  function get_HorizontalIconPadding() {
    _init_properties_TextFieldImpl_kt__7vp9id();
    return HorizontalIconPadding;
  }
  var HorizontalIconPadding;
  function get_SupportingTopPadding() {
    _init_properties_TextFieldImpl_kt__7vp9id();
    return SupportingTopPadding;
  }
  var SupportingTopPadding;
  function get_PrefixSuffixTextPadding() {
    _init_properties_TextFieldImpl_kt__7vp9id();
    return PrefixSuffixTextPadding;
  }
  var PrefixSuffixTextPadding;
  function get_MinTextLineHeight() {
    _init_properties_TextFieldImpl_kt__7vp9id();
    return MinTextLineHeight;
  }
  var MinTextLineHeight;
  function get_MinFocusedLabelLineHeight() {
    _init_properties_TextFieldImpl_kt__7vp9id();
    return MinFocusedLabelLineHeight;
  }
  var MinFocusedLabelLineHeight;
  function get_MinSupportingTextLineHeight() {
    _init_properties_TextFieldImpl_kt__7vp9id();
    return MinSupportingTextLineHeight;
  }
  var MinSupportingTextLineHeight;
  function get_IconDefaultSizeModifier() {
    _init_properties_TextFieldImpl_kt__7vp9id();
    return IconDefaultSizeModifier;
  }
  var IconDefaultSizeModifier;
  function get_AnimationDuration() {
    return AnimationDuration;
  }
  var AnimationDuration;
  var TextFieldType_Filled_instance;
  var TextFieldType_Outlined_instance;
  function values() {
    return [TextFieldType_Filled_getInstance(), TextFieldType_Outlined_getInstance()];
  }
  function valueOf(value) {
    switch (value) {
      case 'Filled':
        return TextFieldType_Filled_getInstance();
      case 'Outlined':
        return TextFieldType_Outlined_getInstance();
      default:
        TextFieldType_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  var TextFieldType_entriesInitialized;
  function TextFieldType_initEntries() {
    if (TextFieldType_entriesInitialized)
      return Unit_getInstance();
    TextFieldType_entriesInitialized = true;
    TextFieldType_Filled_instance = new TextFieldType('Filled', 0);
    TextFieldType_Outlined_instance = new TextFieldType('Outlined', 1);
  }
  function TextFieldType(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function CommonDecorationBox$composable(type, value, innerTextField, visualTransformation, label, placeholder, leadingIcon, trailingIcon, prefix, suffix, supportingText, singleLine, enabled, isError, interactionSource, contentPadding, colors, container, $composer, $changed, $changed1, $default) {
    _init_properties_TextFieldImpl_kt__7vp9id();
    var placeholder_0 = {_v: placeholder};
    var leadingIcon_0 = {_v: leadingIcon};
    var trailingIcon_0 = {_v: trailingIcon};
    var prefix_0 = {_v: prefix};
    var suffix_0 = {_v: suffix};
    var supportingText_0 = {_v: supportingText};
    var singleLine_0 = {_v: singleLine};
    var enabled_0 = {_v: enabled};
    var isError_0 = {_v: isError};
    var $composer_0 = $composer;
    $composer_0 = $composer_0.startRestartGroup_lebv1i_k$(203596693);
    sourceInformation($composer_0, 'C(CommonDecorationBox$composable)P(15,16,4,17,7,9,8,14,10,12,13,11,3,6,5,2)81@3217L105,85@3372L25,96@3756L10,103@4099L7282:TextFieldImpl.kt#uh7d8r');
    var $dirty = $changed;
    var $dirty1 = $changed1;
    if (!(($default & 1) === 0))
      $dirty = $dirty | 6;
    else if (($changed & 14) === 0)
      $dirty = $dirty | ($composer_0.changed_ga7h3f_k$(type) ? 4 : 2);
    if (!(($default & 2) === 0))
      $dirty = $dirty | 48;
    else if (($changed & 112) === 0)
      $dirty = $dirty | ($composer_0.changed_ga7h3f_k$(value) ? 32 : 16);
    if (!(($default & 4) === 0))
      $dirty = $dirty | 384;
    else if (($changed & 896) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(innerTextField) ? 256 : 128);
    if (!(($default & 8) === 0))
      $dirty = $dirty | 3072;
    else if (($changed & 7168) === 0)
      $dirty = $dirty | ($composer_0.changed_ga7h3f_k$(visualTransformation) ? 2048 : 1024);
    if (!(($default & 16) === 0))
      $dirty = $dirty | 24576;
    else if (($changed & 57344) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(label) ? 16384 : 8192);
    if (!(($default & 32) === 0))
      $dirty = $dirty | 196608;
    else if (($changed & 458752) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(placeholder_0._v) ? 131072 : 65536);
    if (!(($default & 64) === 0))
      $dirty = $dirty | 1572864;
    else if (($changed & 3670016) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(leadingIcon_0._v) ? 1048576 : 524288);
    if (!(($default & 128) === 0))
      $dirty = $dirty | 12582912;
    else if (($changed & 29360128) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(trailingIcon_0._v) ? 8388608 : 4194304);
    if (!(($default & 256) === 0))
      $dirty = $dirty | 100663296;
    else if (($changed & 234881024) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(prefix_0._v) ? 67108864 : 33554432);
    if (!(($default & 512) === 0))
      $dirty = $dirty | 805306368;
    else if (($changed & 1879048192) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(suffix_0._v) ? 536870912 : 268435456);
    if (!(($default & 1024) === 0))
      $dirty1 = $dirty1 | 6;
    else if (($changed1 & 14) === 0)
      $dirty1 = $dirty1 | ($composer_0.changedInstance_s1wkiy_k$(supportingText_0._v) ? 4 : 2);
    if (!(($default & 2048) === 0))
      $dirty1 = $dirty1 | 48;
    else if (($changed1 & 112) === 0)
      $dirty1 = $dirty1 | ($composer_0.changed_jpyyrz_k$(singleLine_0._v) ? 32 : 16);
    if (!(($default & 4096) === 0))
      $dirty1 = $dirty1 | 384;
    else if (($changed1 & 896) === 0)
      $dirty1 = $dirty1 | ($composer_0.changed_jpyyrz_k$(enabled_0._v) ? 256 : 128);
    if (!(($default & 8192) === 0))
      $dirty1 = $dirty1 | 3072;
    else if (($changed1 & 7168) === 0)
      $dirty1 = $dirty1 | ($composer_0.changed_jpyyrz_k$(isError_0._v) ? 2048 : 1024);
    if (!(($default & 16384) === 0))
      $dirty1 = $dirty1 | 24576;
    else if (($changed1 & 57344) === 0)
      $dirty1 = $dirty1 | ($composer_0.changed_ga7h3f_k$(interactionSource) ? 16384 : 8192);
    if (!(($default & 32768) === 0))
      $dirty1 = $dirty1 | 196608;
    else if (($changed1 & 458752) === 0)
      $dirty1 = $dirty1 | ($composer_0.changed_ga7h3f_k$(contentPadding) ? 131072 : 65536);
    if (!(($default & 65536) === 0))
      $dirty1 = $dirty1 | 1572864;
    else if (($changed1 & 3670016) === 0)
      $dirty1 = $dirty1 | ($composer_0.changed_ga7h3f_k$(colors) ? 1048576 : 524288);
    if (!(($default & 131072) === 0))
      $dirty1 = $dirty1 | 12582912;
    else if (($changed1 & 29360128) === 0)
      $dirty1 = $dirty1 | ($composer_0.changedInstance_s1wkiy_k$(container) ? 8388608 : 4194304);
    if ((!(($dirty & 1533916891) === 306783378) ? true : !(($dirty1 & 23967451) === 4793490)) ? true : !$composer_0.get_skipping_3owdve_k$()) {
      if (!(($default & 32) === 0)) {
        placeholder_0._v = null;
      }
      if (!(($default & 64) === 0)) {
        leadingIcon_0._v = null;
      }
      if (!(($default & 128) === 0)) {
        trailingIcon_0._v = null;
      }
      if (!(($default & 256) === 0)) {
        prefix_0._v = null;
      }
      if (!(($default & 512) === 0)) {
        suffix_0._v = null;
      }
      if (!(($default & 1024) === 0)) {
        supportingText_0._v = null;
      }
      if (!(($default & 2048) === 0)) {
        singleLine_0._v = false;
      }
      if (!(($default & 4096) === 0)) {
        enabled_0._v = true;
      }
      if (!(($default & 8192) === 0)) {
        isError_0._v = false;
      }
      if (isTraceInProgress()) {
        traceEventStart(203596693, $dirty, $dirty1, 'androidx.compose.material3.CommonDecorationBox$composable (TextFieldImpl.kt:61)');
      }
      // Inline function 'androidx.compose.runtime.remember$composable' call
      var $composer_1 = $composer_0;
      $composer_1.startReplaceableGroup_ip860b_k$(-1124426577);
      sourceInformation($composer_1, 'CC(remember$composable)P(1,2):Composables.kt#9igjgp');
      // Inline function 'androidx.compose.runtime.cache' call
      var invalid = !!($composer_1.changed_ga7h3f_k$(value) | $composer_1.changed_ga7h3f_k$(visualTransformation));
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it = $composer_1.rememberedValue_4dg93v_k$();
      var tmp;
      if (invalid ? true : it === Companion_getInstance_2().get_Empty_i9b85g_k$()) {
        // Inline function 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>' call
        var value_0 = visualTransformation.filter_ki86nb_k$(AnnotatedString_init_$Create$(value));
        $composer_1.updateRememberedValue_l1wh71_k$(value_0);
        tmp = value_0;
      } else {
        tmp = it;
      }
      var tmp_0 = tmp;
      var tmp0 = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
      $composer_1.endReplaceableGroup_ern0ak_k$();
      var transformedText = tmp0.get_text_wouvsm_k$().get_text_wouvsm_k$();
      var isFocused = collectIsFocusedAsState$composable(interactionSource, $composer_0, 14 & $dirty1 >> 12).get_value_j01efc_k$();
      var tmp_1;
      if (isFocused) {
        tmp_1 = InputPhase_Focused_getInstance();
      } else {
        // Inline function 'kotlin.text.isEmpty' call
        if (charSequenceLength(transformedText) === 0) {
          tmp_1 = InputPhase_UnfocusedEmpty_getInstance();
        } else {
          tmp_1 = InputPhase_UnfocusedNotEmpty_getInstance();
        }
      }
      var inputState = tmp_1;
      var labelColor = CommonDecorationBox$composable$lambda(colors, enabled_0, isError_0, interactionSource, $dirty1);
      var typography = MaterialTheme_getInstance().$get_typography$$composable_99iyci_k$($composer_0, 6);
      var bodyLarge = typography.get_bodyLarge_sxra4w_k$();
      var bodySmall = typography.get_bodySmall_t1t5ng_k$();
      var shouldOverrideTextStyleColor = (equals(bodyLarge.get_color_lnp1vl_k$(), Companion_getInstance().get_Unspecified_j397pn_k$()) ? !equals(bodySmall.get_color_lnp1vl_k$(), Companion_getInstance().get_Unspecified_j397pn_k$()) : false) ? true : !equals(bodyLarge.get_color_lnp1vl_k$(), Companion_getInstance().get_Unspecified_j397pn_k$()) ? equals(bodySmall.get_color_lnp1vl_k$(), Companion_getInstance().get_Unspecified_j397pn_k$()) : false;
      var tmp_2 = TextFieldTransitionScope_getInstance();
      $composer_0.startReplaceableGroup_ip860b_k$(665025228);
      sourceInformation($composer_0, '*105@4195L10,106@4289L22');
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>' call
      var $this$with = MaterialTheme_getInstance().$get_typography$$composable_99iyci_k$($composer_0, 6).get_bodySmall_t1t5ng_k$().get_color_lnp1vl_k$();
      var tmp_3;
      if (shouldOverrideTextStyleColor) {
        // Inline function 'androidx.compose.ui.graphics.takeOrElse' call
        var tmp_4;
        // Inline function 'androidx.compose.ui.graphics.isSpecified' call
        if (!equals(_Color___get_value__impl__1pls5m($this$with), _Color___get_value__impl__1pls5m(Companion_getInstance().get_Unspecified_j397pn_k$()))) {
          tmp_4 = $this$with;
        } else {
          // Inline function 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous>' call
          tmp_4 = labelColor(inputState, $composer_0, 0).value_1;
        }
        tmp_3 = tmp_4;
      } else {
        tmp_3 = $this$with;
      }
      var tmp0_group = tmp_3;
      $composer_0.endReplaceableGroup_ern0ak_k$();
      $composer_0.startReplaceableGroup_ip860b_k$(665025421);
      sourceInformation($composer_0, '*108@4388L10,109@4482L22');
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>' call
      var $this$with_0 = MaterialTheme_getInstance().$get_typography$$composable_99iyci_k$($composer_0, 6).get_bodyLarge_sxra4w_k$().get_color_lnp1vl_k$();
      var tmp_5;
      if (shouldOverrideTextStyleColor) {
        // Inline function 'androidx.compose.ui.graphics.takeOrElse' call
        var tmp_6;
        // Inline function 'androidx.compose.ui.graphics.isSpecified' call
        if (!equals(_Color___get_value__impl__1pls5m($this$with_0), _Color___get_value__impl__1pls5m(Companion_getInstance().get_Unspecified_j397pn_k$()))) {
          tmp_6 = $this$with_0;
        } else {
          // Inline function 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous>' call
          tmp_6 = labelColor(inputState, $composer_0, 0).value_1;
        }
        tmp_5 = tmp_6;
      } else {
        tmp_5 = $this$with_0;
      }
      var tmp1_group = tmp_5;
      $composer_0.endReplaceableGroup_ern0ak_k$();
      var tmp_7 = !(label == null);
      // Inline function 'kotlin.run' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>' call
      var tmp_8 = $composer_0;
      var dispatchReceiver = composableLambda(tmp_8, 1290853831, true, CommonDecorationBox$composable$lambda_0(label, placeholder_0, transformedText, colors, enabled_0, isError_0, interactionSource, $dirty1, prefix_0, suffix_0, leadingIcon_0, trailingIcon_0, supportingText_0, type, innerTextField, singleLine_0, contentPadding, $dirty, shouldOverrideTextStyleColor, bodyLarge, bodySmall, container));
      // Inline function 'androidx.compose.runtime.remember$composable' call
      var $composer_2 = $composer_0;
      $composer_2.startReplaceableGroup_ip860b_k$(-838505973);
      sourceInformation($composer_2, 'CC(remember$composable)P(1):Composables.kt#9igjgp');
      // Inline function 'androidx.compose.runtime.cache' call
      var invalid_0 = $composer_2.changed_ga7h3f_k$(dispatchReceiver);
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it_0 = $composer_2.rememberedValue_4dg93v_k$();
      var tmp_9;
      if (invalid_0 ? true : it_0 === Companion_getInstance_2().get_Empty_i9b85g_k$()) {
        // Inline function 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous>' call
        var value_1 = ComposableLambda$invoke$ref_14(dispatchReceiver);
        $composer_2.updateRememberedValue_l1wh71_k$(value_1);
        tmp_9 = value_1;
      } else {
        tmp_9 = it_0;
      }
      var tmp_10 = tmp_9;
      var tmp0_0 = (tmp_10 == null ? true : !(tmp_10 == null)) ? tmp_10 : THROW_CCE();
      $composer_2.endReplaceableGroup_ern0ak_k$();
      tmp_2.Transition$composable_i5euit_k$(inputState, tmp0_group, tmp1_group, labelColor, tmp_7, tmp0_0, $composer_0, 1769472);
      if (isTraceInProgress()) {
        traceEventEnd();
      }
    } else {
      $composer_0.skipToGroupEnd_lh3zi2_k$();
    }
    var tmp2_safe_receiver = $composer_0.endRestartGroup_yxpjv9_k$();
    if (tmp2_safe_receiver === null)
      null;
    else {
      tmp2_safe_receiver.updateScope_t8jcf_k$(CommonDecorationBox$composable$lambda_1(type, value, innerTextField, visualTransformation, label, placeholder_0, leadingIcon_0, trailingIcon_0, prefix_0, suffix_0, supportingText_0, singleLine_0, enabled_0, isError_0, interactionSource, contentPadding, colors, container, $changed, $changed1, $default));
    }
  }
  var InputPhase_Focused_instance;
  var InputPhase_UnfocusedEmpty_instance;
  var InputPhase_UnfocusedNotEmpty_instance;
  function values_0() {
    return [InputPhase_Focused_getInstance(), InputPhase_UnfocusedEmpty_getInstance(), InputPhase_UnfocusedNotEmpty_getInstance()];
  }
  function valueOf_0(value) {
    switch (value) {
      case 'Focused':
        return InputPhase_Focused_getInstance();
      case 'UnfocusedEmpty':
        return InputPhase_UnfocusedEmpty_getInstance();
      case 'UnfocusedNotEmpty':
        return InputPhase_UnfocusedNotEmpty_getInstance();
      default:
        InputPhase_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  var InputPhase_entriesInitialized;
  function InputPhase_initEntries() {
    if (InputPhase_entriesInitialized)
      return Unit_getInstance();
    InputPhase_entriesInitialized = true;
    InputPhase_Focused_instance = new InputPhase('Focused', 0);
    InputPhase_UnfocusedEmpty_instance = new InputPhase('UnfocusedEmpty', 1);
    InputPhase_UnfocusedNotEmpty_instance = new InputPhase('UnfocusedNotEmpty', 2);
  }
  function InputPhase(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function Transition$composable$lambda($labelProgress$delegate) {
    // Inline function 'androidx.compose.runtime.getValue' call
    getLocalDelegateReference('labelProgress', KProperty0, false, function () {
      return THROW_ISE();
    });
    return $labelProgress$delegate.get_value_j01efc_k$();
  }
  function Transition$composable$lambda_0($placeholderOpacity$delegate) {
    // Inline function 'androidx.compose.runtime.getValue' call
    getLocalDelegateReference('placeholderOpacity', KProperty0, false, function () {
      return THROW_ISE();
    });
    return $placeholderOpacity$delegate.get_value_j01efc_k$();
  }
  function Transition$composable$lambda_1($prefixSuffixOpacity$delegate) {
    // Inline function 'androidx.compose.runtime.getValue' call
    getLocalDelegateReference('prefixSuffixOpacity', KProperty0, false, function () {
      return THROW_ISE();
    });
    return $prefixSuffixOpacity$delegate.get_value_j01efc_k$();
  }
  function Transition$composable$lambda_2($labelTextStyleColor$delegate) {
    // Inline function 'androidx.compose.runtime.getValue' call
    getLocalDelegateReference('labelTextStyleColor', KProperty0, false, function () {
      return THROW_ISE();
    });
    return $labelTextStyleColor$delegate.get_value_j01efc_k$().value_1;
  }
  function Transition$composable$lambda_3($labelContentColor$delegate) {
    // Inline function 'androidx.compose.runtime.getValue' call
    getLocalDelegateReference('labelContentColor', KProperty0, false, function () {
      return THROW_ISE();
    });
    return $labelContentColor$delegate.get_value_j01efc_k$().value_1;
  }
  function TextFieldTransitionScope$Transition$composable$lambda($this$animateFloat, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(-4765522);
    if (isTraceInProgress()) {
      traceEventStart(-4765522, $changed, -1, 'androidx.compose.material3.TextFieldTransitionScope.Transition$composable.<anonymous> (TextFieldImpl.kt:314)');
    }
    var tmp0 = tween(150);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0;
  }
  function TextFieldTransitionScope$Transition$composable$lambda_0($this$null, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(-522164544);
    if (isTraceInProgress()) {
      traceEventStart(-522164544, $changed, -1, 'androidx.compose.animation.core.animateFloat$composable.<anonymous> (Transition.kt:935)');
    }
    var tmp0 = spring();
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0;
  }
  function TextFieldTransitionScope$Transition$composable$lambda_1($this$null, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(-895531546);
    if (isTraceInProgress()) {
      traceEventStart(-895531546, $changed, -1, 'androidx.compose.animation.core.animateValue$composable.<anonymous> (Transition.kt:852)');
    }
    var tmp0 = spring();
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0;
  }
  function TextFieldTransitionScope$Transition$composable$lambda_2($this$animateFloat, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(-1635067817);
    if (isTraceInProgress()) {
      traceEventStart(-1635067817, $changed, -1, 'androidx.compose.material3.TextFieldTransitionScope.Transition$composable.<anonymous> (TextFieldImpl.kt:325)');
    }
    var tmp;
    if ($this$animateFloat.isTransitioningTo_mjamuk_k$(InputPhase_Focused_getInstance(), InputPhase_UnfocusedEmpty_getInstance())) {
      tmp = tween(67, VOID, get_LinearEasing());
    } else if ($this$animateFloat.isTransitioningTo_mjamuk_k$(InputPhase_UnfocusedEmpty_getInstance(), InputPhase_Focused_getInstance()) ? true : $this$animateFloat.isTransitioningTo_mjamuk_k$(InputPhase_UnfocusedNotEmpty_getInstance(), InputPhase_UnfocusedEmpty_getInstance())) {
      tmp = tween(83, 67, get_LinearEasing());
    } else {
      tmp = spring();
    }
    var tmp0 = tmp;
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0;
  }
  function TextFieldTransitionScope$Transition$composable$lambda_3($this$null, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(-522164544);
    if (isTraceInProgress()) {
      traceEventStart(-522164544, $changed, -1, 'androidx.compose.animation.core.animateFloat$composable.<anonymous> (Transition.kt:935)');
    }
    var tmp0 = spring();
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0;
  }
  function TextFieldTransitionScope$Transition$composable$lambda_4($this$null, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(-895531546);
    if (isTraceInProgress()) {
      traceEventStart(-895531546, $changed, -1, 'androidx.compose.animation.core.animateValue$composable.<anonymous> (Transition.kt:852)');
    }
    var tmp0 = spring();
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0;
  }
  function TextFieldTransitionScope$Transition$composable$lambda_5($this$animateFloat, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(1189967029);
    if (isTraceInProgress()) {
      traceEventStart(1189967029, $changed, -1, 'androidx.compose.material3.TextFieldTransitionScope.Transition$composable.<anonymous> (TextFieldImpl.kt:353)');
    }
    var tmp0 = tween(150);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0;
  }
  function TextFieldTransitionScope$Transition$composable$lambda_6($this$null, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(-522164544);
    if (isTraceInProgress()) {
      traceEventStart(-522164544, $changed, -1, 'androidx.compose.animation.core.animateFloat$composable.<anonymous> (Transition.kt:935)');
    }
    var tmp0 = spring();
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0;
  }
  function TextFieldTransitionScope$Transition$composable$lambda_7($this$null, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(-895531546);
    if (isTraceInProgress()) {
      traceEventStart(-895531546, $changed, -1, 'androidx.compose.animation.core.animateValue$composable.<anonymous> (Transition.kt:852)');
    }
    var tmp0 = spring();
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0;
  }
  function TextFieldTransitionScope$Transition$composable$lambda_8($this$animateColor, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(2041936647);
    if (isTraceInProgress()) {
      traceEventStart(2041936647, $changed, -1, 'androidx.compose.material3.TextFieldTransitionScope.Transition$composable.<anonymous> (TextFieldImpl.kt:363)');
    }
    var tmp0 = tween(150);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0;
  }
  function TextFieldTransitionScope$Transition$composable$lambda_9($this$null, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(-1457805428);
    if (isTraceInProgress()) {
      traceEventStart(-1457805428, $changed, -1, 'androidx.compose.animation.animateColor$composable.<anonymous> (Transition.kt:64)');
    }
    var tmp0 = spring();
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0;
  }
  function TextFieldTransitionScope$Transition$composable$lambda_10($this$null, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(-895531546);
    if (isTraceInProgress()) {
      traceEventStart(-895531546, $changed, -1, 'androidx.compose.animation.core.animateValue$composable.<anonymous> (Transition.kt:852)');
    }
    var tmp0 = spring();
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0;
  }
  function TextFieldTransitionScope$Transition$composable$lambda_11($this$animateColor, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(766065458);
    if (isTraceInProgress()) {
      traceEventStart(766065458, $changed, -1, 'androidx.compose.material3.TextFieldTransitionScope.Transition$composable.<anonymous> (TextFieldImpl.kt:373)');
    }
    var tmp0 = tween(150);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0;
  }
  function TextFieldTransitionScope$Transition$composable$lambda_12($this$null, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(-1457805428);
    if (isTraceInProgress()) {
      traceEventStart(-1457805428, $changed, -1, 'androidx.compose.animation.animateColor$composable.<anonymous> (Transition.kt:64)');
    }
    var tmp0 = spring();
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0;
  }
  function TextFieldTransitionScope$Transition$composable$lambda_13($this$null, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(-895531546);
    if (isTraceInProgress()) {
      traceEventStart(-895531546, $changed, -1, 'androidx.compose.animation.core.animateValue$composable.<anonymous> (Transition.kt:852)');
    }
    var tmp0 = spring();
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0;
  }
  function TextFieldTransitionScope$Transition$composable$lambda_14($tmp0_rcvr, $inputState, $focusedTextStyleColor, $unfocusedTextStyleColor, $contentColor, $showLabel, $content, $$changed) {
    return function ($composer, $force) {
      $tmp0_rcvr.Transition$composable_i5euit_k$($inputState, $focusedTextStyleColor, $unfocusedTextStyleColor, $contentColor, $showLabel, $content, $composer, updateChangedFlags($$changed | 1));
      return Unit_getInstance();
    };
  }
  function TextFieldTransitionScope() {
    TextFieldTransitionScope_instance = this;
  }
  protoOf(TextFieldTransitionScope).Transition_osm5gr_k$ = function (inputState, focusedTextStyleColor, unfocusedTextStyleColor, contentColor, showLabel, content) {
    illegalDecoyCallException('Transition');
  };
  protoOf(TextFieldTransitionScope).Transition$composable_i5euit_k$ = function (inputState, focusedTextStyleColor, unfocusedTextStyleColor, contentColor, showLabel, content, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0 = $composer_0.startRestartGroup_lebv1i_k$(-1577017868);
    sourceInformation($composer_0, 'C(Transition$composable)P(3,2:c#ui.graphics.Color,5:c#ui.graphics.Color,1,4)310@12822L59,312@12923L325,323@13295L1101,351@14444L354,362@14846L299,372@15191L186,378@15387L174:TextFieldImpl.kt#uh7d8r');
    var $dirty = $changed;
    if (($changed & 14) === 0)
      $dirty = $dirty | ($composer_0.changed_ga7h3f_k$(inputState) ? 4 : 2);
    if (($changed & 112) === 0)
      $dirty = $dirty | ($composer_0.changed_j54hty_k$(_ULong___get_data__impl__fggpzb(_Color___get_value__impl__1pls5m(focusedTextStyleColor))) ? 32 : 16);
    if (($changed & 896) === 0)
      $dirty = $dirty | ($composer_0.changed_j54hty_k$(_ULong___get_data__impl__fggpzb(_Color___get_value__impl__1pls5m(unfocusedTextStyleColor))) ? 256 : 128);
    if (($changed & 7168) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(contentColor) ? 2048 : 1024);
    if (($changed & 57344) === 0)
      $dirty = $dirty | ($composer_0.changed_jpyyrz_k$(showLabel) ? 16384 : 8192);
    if (($changed & 458752) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(content) ? 131072 : 65536);
    if (!(($dirty & 374491) === 74898) ? true : !$composer_0.get_skipping_3owdve_k$()) {
      if (isTraceInProgress()) {
        traceEventStart(-1577017868, $dirty, -1, 'androidx.compose.material3.TextFieldTransitionScope.Transition$composable (TextFieldImpl.kt:293)');
      }
      var transition = updateTransition$composable(inputState, 'TextFieldInputState', $composer_0, 48 | 14 & $dirty, 0);
      // Inline function 'androidx.compose.animation.core.animateFloat$composable' call
      var transitionSpec = TextFieldTransitionScope$Transition$composable$lambda;
      var label = 'LabelProgress';
      var $composer_1 = $composer_0;
      $composer_1.startReplaceableGroup_ip860b_k$(1610198356);
      sourceInformation($composer_1, 'CC(animateFloat$composable)P(2)939@37552L78:Transition.kt#pdpnli');
      if (!((0 & 1) === 0)) {
        transitionSpec = TextFieldTransitionScope$Transition$composable$lambda_0;
      }
      if (!((0 & 2) === 0))
        label = 'FloatAnimation';
      // Inline function 'androidx.compose.animation.core.animateValue$composable' call
      var typeConverter = get_VectorConverter(FloatCompanionObject_getInstance());
      var $changed_0 = 14 & 384 | 896 & 384 << 3 | 7168 & 384 << 3 | 57344 & 384 << 3;
      var transitionSpec_0 = transitionSpec;
      var label_0 = label;
      var $composer_2 = $composer_1;
      $composer_2.startReplaceableGroup_ip860b_k$(-1940744337);
      sourceInformation($composer_2, 'CC(animateValue$composable)P(3,2)857@34142L32,858@34197L31,859@34253L23,861@34289L89:Transition.kt#pdpnli');
      if (!((0 & 2) === 0)) {
        transitionSpec_0 = TextFieldTransitionScope$Transition$composable$lambda_1;
      }
      if (!((0 & 4) === 0))
        label_0 = 'ValueAnimation';
      // Inline function 'androidx.compose.material3.TextFieldTransitionScope.Transition$composable.<anonymous>' call
      var it = transition.get_currentState_snihnl_k$();
      var $changed_1 = 112 & $changed_0 >> 9;
      var $composer_3 = $composer_2;
      $composer_3.startReplaceableGroup_ip860b_k$(240378898);
      sourceInformation($composer_3, 'C:TextFieldImpl.kt#uh7d8r');
      if (isTraceInProgress()) {
        traceEventStart(240378898, $changed_1, -1, 'androidx.compose.material3.TextFieldTransitionScope.Transition$composable.<anonymous> (TextFieldImpl.kt:315)');
      }
      var tmp;
      switch (it.get_ordinal_ip24qg_k$()) {
        case 0:
          tmp = 1.0;
          break;
        case 1:
          tmp = 0.0;
          break;
        case 2:
          tmp = 1.0;
          break;
        default:
          noWhenBranchMatchedException();
          break;
      }
      var tmp0 = tmp;
      if (isTraceInProgress()) {
        traceEventEnd();
      }
      $composer_3.endReplaceableGroup_ern0ak_k$();
      var initialValue = tmp0;
      // Inline function 'androidx.compose.material3.TextFieldTransitionScope.Transition$composable.<anonymous>' call
      var it_0 = transition.get_targetState_kri3mx_k$();
      var $changed_2 = 112 & $changed_0 >> 9;
      var $composer_4 = $composer_2;
      $composer_4.startReplaceableGroup_ip860b_k$(240378898);
      sourceInformation($composer_4, 'C:TextFieldImpl.kt#uh7d8r');
      if (isTraceInProgress()) {
        traceEventStart(240378898, $changed_2, -1, 'androidx.compose.material3.TextFieldTransitionScope.Transition$composable.<anonymous> (TextFieldImpl.kt:315)');
      }
      var tmp_0;
      switch (it_0.get_ordinal_ip24qg_k$()) {
        case 0:
          tmp_0 = 1.0;
          break;
        case 1:
          tmp_0 = 0.0;
          break;
        case 2:
          tmp_0 = 1.0;
          break;
        default:
          noWhenBranchMatchedException();
          break;
      }
      var tmp0_0 = tmp_0;
      if (isTraceInProgress()) {
        traceEventEnd();
      }
      $composer_4.endReplaceableGroup_ern0ak_k$();
      var targetValue = tmp0_0;
      var animationSpec = transitionSpec_0(transition.get_segment_xwnoei_k$(), $composer_2, 112 & $changed_0 >> 3);
      var tmp0_1 = createTransitionAnimation$composable(transition, initialValue, targetValue, animationSpec, typeConverter, label_0, $composer_2, 14 & $changed_0 | 57344 & $changed_0 << 9 | 458752 & $changed_0 << 6);
      $composer_2.endReplaceableGroup_ern0ak_k$();
      $composer_1.endReplaceableGroup_ern0ak_k$();
      var labelProgress$delegate = tmp0_1;
      // Inline function 'androidx.compose.animation.core.animateFloat$composable' call
      var transitionSpec_1 = TextFieldTransitionScope$Transition$composable$lambda_2;
      var label_1 = 'PlaceholderOpacity';
      var $composer_5 = $composer_0;
      $composer_5.startReplaceableGroup_ip860b_k$(1610198356);
      sourceInformation($composer_5, 'CC(animateFloat$composable)P(2)939@37552L78:Transition.kt#pdpnli');
      if (!((0 & 1) === 0)) {
        transitionSpec_1 = TextFieldTransitionScope$Transition$composable$lambda_3;
      }
      if (!((0 & 2) === 0))
        label_1 = 'FloatAnimation';
      // Inline function 'androidx.compose.animation.core.animateValue$composable' call
      var typeConverter_0 = get_VectorConverter(FloatCompanionObject_getInstance());
      var $changed_3 = 14 & 384 | 896 & 384 << 3 | 7168 & 384 << 3 | 57344 & 384 << 3;
      var transitionSpec_2 = transitionSpec_1;
      var label_2 = label_1;
      var $composer_6 = $composer_5;
      $composer_6.startReplaceableGroup_ip860b_k$(-1940744337);
      sourceInformation($composer_6, 'CC(animateValue$composable)P(3,2)857@34142L32,858@34197L31,859@34253L23,861@34289L89:Transition.kt#pdpnli');
      if (!((0 & 2) === 0)) {
        transitionSpec_2 = TextFieldTransitionScope$Transition$composable$lambda_4;
      }
      if (!((0 & 4) === 0))
        label_2 = 'ValueAnimation';
      // Inline function 'androidx.compose.material3.TextFieldTransitionScope.Transition$composable.<anonymous>' call
      var it_1 = transition.get_currentState_snihnl_k$();
      var $changed_4 = 112 & $changed_3 >> 9;
      var $composer_7 = $composer_6;
      $composer_7.startReplaceableGroup_ip860b_k$(2067512179);
      sourceInformation($composer_7, 'C:TextFieldImpl.kt#uh7d8r');
      if (isTraceInProgress()) {
        traceEventStart(2067512179, $changed_4, -1, 'androidx.compose.material3.TextFieldTransitionScope.Transition$composable.<anonymous> (TextFieldImpl.kt:343)');
      }
      var tmp_1;
      switch (it_1.get_ordinal_ip24qg_k$()) {
        case 0:
          tmp_1 = 1.0;
          break;
        case 1:
          tmp_1 = showLabel ? 0.0 : 1.0;
          break;
        case 2:
          tmp_1 = 0.0;
          break;
        default:
          noWhenBranchMatchedException();
          break;
      }
      var tmp0_2 = tmp_1;
      if (isTraceInProgress()) {
        traceEventEnd();
      }
      $composer_7.endReplaceableGroup_ern0ak_k$();
      var initialValue_0 = tmp0_2;
      // Inline function 'androidx.compose.material3.TextFieldTransitionScope.Transition$composable.<anonymous>' call
      var it_2 = transition.get_targetState_kri3mx_k$();
      var $changed_5 = 112 & $changed_3 >> 9;
      var $composer_8 = $composer_6;
      $composer_8.startReplaceableGroup_ip860b_k$(2067512179);
      sourceInformation($composer_8, 'C:TextFieldImpl.kt#uh7d8r');
      if (isTraceInProgress()) {
        traceEventStart(2067512179, $changed_5, -1, 'androidx.compose.material3.TextFieldTransitionScope.Transition$composable.<anonymous> (TextFieldImpl.kt:343)');
      }
      var tmp_2;
      switch (it_2.get_ordinal_ip24qg_k$()) {
        case 0:
          tmp_2 = 1.0;
          break;
        case 1:
          tmp_2 = showLabel ? 0.0 : 1.0;
          break;
        case 2:
          tmp_2 = 0.0;
          break;
        default:
          noWhenBranchMatchedException();
          break;
      }
      var tmp0_3 = tmp_2;
      if (isTraceInProgress()) {
        traceEventEnd();
      }
      $composer_8.endReplaceableGroup_ern0ak_k$();
      var targetValue_0 = tmp0_3;
      var animationSpec_0 = transitionSpec_2(transition.get_segment_xwnoei_k$(), $composer_6, 112 & $changed_3 >> 3);
      var tmp0_4 = createTransitionAnimation$composable(transition, initialValue_0, targetValue_0, animationSpec_0, typeConverter_0, label_2, $composer_6, 14 & $changed_3 | 57344 & $changed_3 << 9 | 458752 & $changed_3 << 6);
      $composer_6.endReplaceableGroup_ern0ak_k$();
      $composer_5.endReplaceableGroup_ern0ak_k$();
      var placeholderOpacity$delegate = tmp0_4;
      // Inline function 'androidx.compose.animation.core.animateFloat$composable' call
      var transitionSpec_3 = TextFieldTransitionScope$Transition$composable$lambda_5;
      var label_3 = 'PrefixSuffixOpacity';
      var $composer_9 = $composer_0;
      $composer_9.startReplaceableGroup_ip860b_k$(1610198356);
      sourceInformation($composer_9, 'CC(animateFloat$composable)P(2)939@37552L78:Transition.kt#pdpnli');
      if (!((0 & 1) === 0)) {
        transitionSpec_3 = TextFieldTransitionScope$Transition$composable$lambda_6;
      }
      if (!((0 & 2) === 0))
        label_3 = 'FloatAnimation';
      // Inline function 'androidx.compose.animation.core.animateValue$composable' call
      var typeConverter_1 = get_VectorConverter(FloatCompanionObject_getInstance());
      var $changed_6 = 14 & 384 | 896 & 384 << 3 | 7168 & 384 << 3 | 57344 & 384 << 3;
      var transitionSpec_4 = transitionSpec_3;
      var label_4 = label_3;
      var $composer_10 = $composer_9;
      $composer_10.startReplaceableGroup_ip860b_k$(-1940744337);
      sourceInformation($composer_10, 'CC(animateValue$composable)P(3,2)857@34142L32,858@34197L31,859@34253L23,861@34289L89:Transition.kt#pdpnli');
      if (!((0 & 2) === 0)) {
        transitionSpec_4 = TextFieldTransitionScope$Transition$composable$lambda_7;
      }
      if (!((0 & 4) === 0))
        label_4 = 'ValueAnimation';
      // Inline function 'androidx.compose.material3.TextFieldTransitionScope.Transition$composable.<anonymous>' call
      var it_3 = transition.get_currentState_snihnl_k$();
      var $changed_7 = 112 & $changed_6 >> 9;
      var $composer_11 = $composer_10;
      $composer_11.startReplaceableGroup_ip860b_k$(5829913);
      sourceInformation($composer_11, 'C:TextFieldImpl.kt#uh7d8r');
      if (isTraceInProgress()) {
        traceEventStart(5829913, $changed_7, -1, 'androidx.compose.material3.TextFieldTransitionScope.Transition$composable.<anonymous> (TextFieldImpl.kt:354)');
      }
      var tmp_3;
      switch (it_3.get_ordinal_ip24qg_k$()) {
        case 0:
          tmp_3 = 1.0;
          break;
        case 1:
          tmp_3 = showLabel ? 0.0 : 1.0;
          break;
        case 2:
          tmp_3 = 1.0;
          break;
        default:
          noWhenBranchMatchedException();
          break;
      }
      var tmp0_5 = tmp_3;
      if (isTraceInProgress()) {
        traceEventEnd();
      }
      $composer_11.endReplaceableGroup_ern0ak_k$();
      var initialValue_1 = tmp0_5;
      // Inline function 'androidx.compose.material3.TextFieldTransitionScope.Transition$composable.<anonymous>' call
      var it_4 = transition.get_targetState_kri3mx_k$();
      var $changed_8 = 112 & $changed_6 >> 9;
      var $composer_12 = $composer_10;
      $composer_12.startReplaceableGroup_ip860b_k$(5829913);
      sourceInformation($composer_12, 'C:TextFieldImpl.kt#uh7d8r');
      if (isTraceInProgress()) {
        traceEventStart(5829913, $changed_8, -1, 'androidx.compose.material3.TextFieldTransitionScope.Transition$composable.<anonymous> (TextFieldImpl.kt:354)');
      }
      var tmp_4;
      switch (it_4.get_ordinal_ip24qg_k$()) {
        case 0:
          tmp_4 = 1.0;
          break;
        case 1:
          tmp_4 = showLabel ? 0.0 : 1.0;
          break;
        case 2:
          tmp_4 = 1.0;
          break;
        default:
          noWhenBranchMatchedException();
          break;
      }
      var tmp0_6 = tmp_4;
      if (isTraceInProgress()) {
        traceEventEnd();
      }
      $composer_12.endReplaceableGroup_ern0ak_k$();
      var targetValue_1 = tmp0_6;
      var animationSpec_1 = transitionSpec_4(transition.get_segment_xwnoei_k$(), $composer_10, 112 & $changed_6 >> 3);
      var tmp0_7 = createTransitionAnimation$composable(transition, initialValue_1, targetValue_1, animationSpec_1, typeConverter_1, label_4, $composer_10, 14 & $changed_6 | 57344 & $changed_6 << 9 | 458752 & $changed_6 << 6);
      $composer_10.endReplaceableGroup_ern0ak_k$();
      $composer_9.endReplaceableGroup_ern0ak_k$();
      var prefixSuffixOpacity$delegate = tmp0_7;
      // Inline function 'androidx.compose.animation.animateColor$composable' call
      var transitionSpec_5 = TextFieldTransitionScope$Transition$composable$lambda_8;
      var label_5 = 'LabelTextStyleColor';
      var $composer_13 = $composer_0;
      $composer_13.startReplaceableGroup_ip860b_k$(-1488075038);
      sourceInformation($composer_13, 'CC(animateColor$composable)P(2)68@3220L31,69@3287L70,73@3370L70:Transition.kt#xbi5r1');
      if (!((0 & 1) === 0)) {
        transitionSpec_5 = TextFieldTransitionScope$Transition$composable$lambda_9;
      }
      if (!((0 & 2) === 0))
        label_5 = 'ColorAnimation';
      // Inline function 'androidx.compose.material3.TextFieldTransitionScope.Transition$composable.<anonymous>' call
      var it_5 = transition.get_targetState_kri3mx_k$();
      var $changed_9 = 112 & 384 >> 6;
      var $composer_14 = $composer_13;
      $composer_14.startReplaceableGroup_ip860b_k$(-1468066062);
      sourceInformation($composer_14, 'C:TextFieldImpl.kt#uh7d8r');
      if (isTraceInProgress()) {
        traceEventStart(-1468066062, $changed_9, -1, 'androidx.compose.material3.TextFieldTransitionScope.Transition$composable.<anonymous> (TextFieldImpl.kt:365)');
      }
      var tmp0_8 = it_5.get_ordinal_ip24qg_k$() === 0 ? focusedTextStyleColor : unfocusedTextStyleColor;
      if (isTraceInProgress()) {
        traceEventEnd();
      }
      $composer_14.endReplaceableGroup_ern0ak_k$();
      var colorSpace = _Color___get_colorSpace__impl__jqqozk(tmp0_8);
      // Inline function 'androidx.compose.runtime.remember$composable' call
      var $composer_15 = $composer_13;
      $composer_15.startReplaceableGroup_ip860b_k$(-838505973);
      sourceInformation($composer_15, 'CC(remember$composable)P(1):Composables.kt#9igjgp');
      // Inline function 'androidx.compose.runtime.cache' call
      var invalid = $composer_15.changed_ga7h3f_k$(colorSpace);
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it_6 = $composer_15.rememberedValue_4dg93v_k$();
      var tmp_5;
      if (invalid ? true : it_6 === Companion_getInstance_2().get_Empty_i9b85g_k$()) {
        // Inline function 'androidx.compose.animation.animateColor$composable.<anonymous>' call
        var value = get_VectorConverter_0(Companion_getInstance())(colorSpace);
        $composer_15.updateRememberedValue_l1wh71_k$(value);
        tmp_5 = value;
      } else {
        tmp_5 = it_6;
      }
      var tmp_6 = tmp_5;
      var tmp0_9 = (tmp_6 == null ? true : !(tmp_6 == null)) ? tmp_6 : THROW_CCE();
      $composer_15.endReplaceableGroup_ern0ak_k$();
      var typeConverter_2 = tmp0_9;
      // Inline function 'androidx.compose.animation.core.animateValue$composable' call
      var $changed_10 = 14 & 384 | 896 & 384 << 3 | 7168 & 384 << 3 | 57344 & 384 << 3;
      var transitionSpec_6 = transitionSpec_5;
      var label_6 = label_5;
      var $composer_16 = $composer_13;
      $composer_16.startReplaceableGroup_ip860b_k$(-1940744337);
      sourceInformation($composer_16, 'CC(animateValue$composable)P(3,2)857@34142L32,858@34197L31,859@34253L23,861@34289L89:Transition.kt#pdpnli');
      if (!((0 & 2) === 0)) {
        transitionSpec_6 = TextFieldTransitionScope$Transition$composable$lambda_10;
      }
      if (!((0 & 4) === 0))
        label_6 = 'ValueAnimation';
      // Inline function 'androidx.compose.material3.TextFieldTransitionScope.Transition$composable.<anonymous>' call
      var it_7 = transition.get_currentState_snihnl_k$();
      var $changed_11 = 112 & $changed_10 >> 9;
      var $composer_17 = $composer_16;
      $composer_17.startReplaceableGroup_ip860b_k$(-1468066062);
      sourceInformation($composer_17, 'C:TextFieldImpl.kt#uh7d8r');
      if (isTraceInProgress()) {
        traceEventStart(-1468066062, $changed_11, -1, 'androidx.compose.material3.TextFieldTransitionScope.Transition$composable.<anonymous> (TextFieldImpl.kt:365)');
      }
      var tmp0_10 = it_7.get_ordinal_ip24qg_k$() === 0 ? focusedTextStyleColor : unfocusedTextStyleColor;
      if (isTraceInProgress()) {
        traceEventEnd();
      }
      $composer_17.endReplaceableGroup_ern0ak_k$();
      var initialValue_2 = tmp0_10;
      // Inline function 'androidx.compose.material3.TextFieldTransitionScope.Transition$composable.<anonymous>' call
      var it_8 = transition.get_targetState_kri3mx_k$();
      var $changed_12 = 112 & $changed_10 >> 9;
      var $composer_18 = $composer_16;
      $composer_18.startReplaceableGroup_ip860b_k$(-1468066062);
      sourceInformation($composer_18, 'C:TextFieldImpl.kt#uh7d8r');
      if (isTraceInProgress()) {
        traceEventStart(-1468066062, $changed_12, -1, 'androidx.compose.material3.TextFieldTransitionScope.Transition$composable.<anonymous> (TextFieldImpl.kt:365)');
      }
      var tmp0_11 = it_8.get_ordinal_ip24qg_k$() === 0 ? focusedTextStyleColor : unfocusedTextStyleColor;
      if (isTraceInProgress()) {
        traceEventEnd();
      }
      $composer_18.endReplaceableGroup_ern0ak_k$();
      var targetValue_2 = tmp0_11;
      var animationSpec_2 = transitionSpec_6(transition.get_segment_xwnoei_k$(), $composer_16, 112 & $changed_10 >> 3);
      var tmp0_12 = createTransitionAnimation$composable(transition, new Color(initialValue_2), new Color(targetValue_2), animationSpec_2, typeConverter_2, label_6, $composer_16, 14 & $changed_10 | 57344 & $changed_10 << 9 | 458752 & $changed_10 << 6);
      $composer_16.endReplaceableGroup_ern0ak_k$();
      $composer_13.endReplaceableGroup_ern0ak_k$();
      var labelTextStyleColor$delegate = tmp0_12;
      // Inline function 'androidx.compose.animation.animateColor$composable' call
      var $changed_13 = 384 | 7168 & $dirty;
      var transitionSpec_7 = TextFieldTransitionScope$Transition$composable$lambda_11;
      var label_7 = 'LabelContentColor';
      var $composer_19 = $composer_0;
      $composer_19.startReplaceableGroup_ip860b_k$(-1488075038);
      sourceInformation($composer_19, 'CC(animateColor$composable)P(2)68@3220L31,69@3287L70,73@3370L70:Transition.kt#xbi5r1');
      if (!((0 & 1) === 0)) {
        transitionSpec_7 = TextFieldTransitionScope$Transition$composable$lambda_12;
      }
      if (!((0 & 2) === 0))
        label_7 = 'ColorAnimation';
      var colorSpace_0 = _Color___get_colorSpace__impl__jqqozk(contentColor(transition.get_targetState_kri3mx_k$(), $composer_19, 112 & $changed_13 >> 6).value_1);
      // Inline function 'androidx.compose.runtime.remember$composable' call
      var $composer_20 = $composer_19;
      $composer_20.startReplaceableGroup_ip860b_k$(-838505973);
      sourceInformation($composer_20, 'CC(remember$composable)P(1):Composables.kt#9igjgp');
      // Inline function 'androidx.compose.runtime.cache' call
      var invalid_0 = $composer_20.changed_ga7h3f_k$(colorSpace_0);
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it_9 = $composer_20.rememberedValue_4dg93v_k$();
      var tmp_7;
      if (invalid_0 ? true : it_9 === Companion_getInstance_2().get_Empty_i9b85g_k$()) {
        // Inline function 'androidx.compose.animation.animateColor$composable.<anonymous>' call
        var value_0 = get_VectorConverter_0(Companion_getInstance())(colorSpace_0);
        $composer_20.updateRememberedValue_l1wh71_k$(value_0);
        tmp_7 = value_0;
      } else {
        tmp_7 = it_9;
      }
      var tmp_8 = tmp_7;
      var tmp0_13 = (tmp_8 == null ? true : !(tmp_8 == null)) ? tmp_8 : THROW_CCE();
      $composer_20.endReplaceableGroup_ern0ak_k$();
      var typeConverter_3 = tmp0_13;
      // Inline function 'androidx.compose.animation.core.animateValue$composable' call
      var $changed_14 = 14 & $changed_13 | 896 & $changed_13 << 3 | 7168 & $changed_13 << 3 | 57344 & $changed_13 << 3;
      var transitionSpec_8 = transitionSpec_7;
      var label_8 = label_7;
      var $composer_21 = $composer_19;
      $composer_21.startReplaceableGroup_ip860b_k$(-1940744337);
      sourceInformation($composer_21, 'CC(animateValue$composable)P(3,2)857@34142L32,858@34197L31,859@34253L23,861@34289L89:Transition.kt#pdpnli');
      if (!((0 & 2) === 0)) {
        transitionSpec_8 = TextFieldTransitionScope$Transition$composable$lambda_13;
      }
      if (!((0 & 4) === 0))
        label_8 = 'ValueAnimation';
      var initialValue_3 = contentColor(transition.get_currentState_snihnl_k$(), $composer_21, 112 & $changed_14 >> 9).value_1;
      var targetValue_3 = contentColor(transition.get_targetState_kri3mx_k$(), $composer_21, 112 & $changed_14 >> 9).value_1;
      var animationSpec_3 = transitionSpec_8(transition.get_segment_xwnoei_k$(), $composer_21, 112 & $changed_14 >> 3);
      var tmp0_14 = createTransitionAnimation$composable(transition, new Color(initialValue_3), new Color(targetValue_3), animationSpec_3, typeConverter_3, label_8, $composer_21, 14 & $changed_14 | 57344 & $changed_14 << 9 | 458752 & $changed_14 << 6);
      $composer_21.endReplaceableGroup_ern0ak_k$();
      $composer_19.endReplaceableGroup_ern0ak_k$();
      var labelContentColor$delegate = tmp0_14;
      content(Transition$composable$lambda(labelProgress$delegate), new Color(Transition$composable$lambda_2(labelTextStyleColor$delegate)), new Color(Transition$composable$lambda_3(labelContentColor$delegate)), Transition$composable$lambda_0(placeholderOpacity$delegate), Transition$composable$lambda_1(prefixSuffixOpacity$delegate), $composer_0, 458752 & $dirty);
      if (isTraceInProgress()) {
        traceEventEnd();
      }
    } else {
      $composer_0.skipToGroupEnd_lh3zi2_k$();
    }
    var tmp1_safe_receiver = $composer_0.endRestartGroup_yxpjv9_k$();
    if (tmp1_safe_receiver === null)
      null;
    else {
      tmp1_safe_receiver.updateScope_t8jcf_k$(TextFieldTransitionScope$Transition$composable$lambda_14(this, inputState, focusedTextStyleColor, unfocusedTextStyleColor, contentColor, showLabel, content, $changed));
    }
  };
  var TextFieldTransitionScope_instance;
  function TextFieldTransitionScope_getInstance() {
    if (TextFieldTransitionScope_instance == null)
      new TextFieldTransitionScope();
    return TextFieldTransitionScope_instance;
  }
  function Decoration$composable(contentColor, typography, content, $composer, $changed, $default) {
    _init_properties_TextFieldImpl_kt__7vp9id();
    var typography_0 = {_v: typography};
    var $composer_0 = $composer;
    $composer_0 = $composer_0.startRestartGroup_lebv1i_k$(-800811936);
    sourceInformation($composer_0, 'C(Decoration$composable)P(1:c#ui.graphics.Color,2):TextFieldImpl.kt#uh7d8r');
    var $dirty = $changed;
    if (!(($default & 1) === 0))
      $dirty = $dirty | 6;
    else if (($changed & 14) === 0)
      $dirty = $dirty | ($composer_0.changed_j54hty_k$(_ULong___get_data__impl__fggpzb(_Color___get_value__impl__1pls5m(contentColor))) ? 4 : 2);
    if (!(($default & 2) === 0))
      $dirty = $dirty | 48;
    else if (($changed & 112) === 0)
      $dirty = $dirty | ($composer_0.changed_ga7h3f_k$(typography_0._v) ? 32 : 16);
    if (!(($default & 4) === 0))
      $dirty = $dirty | 384;
    else if (($changed & 896) === 0)
      $dirty = $dirty | ($composer_0.changedInstance_s1wkiy_k$(content) ? 256 : 128);
    if (!(($dirty & 731) === 146) ? true : !$composer_0.get_skipping_3owdve_k$()) {
      if (!(($default & 2) === 0)) {
        typography_0._v = null;
      }
      if (isTraceInProgress()) {
        traceEventStart(-800811936, $dirty, -1, 'androidx.compose.material3.Decoration$composable (TextFieldImpl.kt:274)');
      }
      // Inline function 'kotlin.run' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.material3.Decoration$composable.<anonymous>' call
      var tmp = $composer_0;
      var dispatchReceiver = composableLambda(tmp, 1449369305, true, Decoration$composable$lambda(contentColor, content, $dirty));
      // Inline function 'androidx.compose.runtime.remember$composable' call
      var $composer_1 = $composer_0;
      $composer_1.startReplaceableGroup_ip860b_k$(-838505973);
      sourceInformation($composer_1, 'CC(remember$composable)P(1):Composables.kt#9igjgp');
      // Inline function 'androidx.compose.runtime.cache' call
      var invalid = $composer_1.changed_ga7h3f_k$(dispatchReceiver);
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it = $composer_1.rememberedValue_4dg93v_k$();
      var tmp_0;
      if (invalid ? true : it === Companion_getInstance_2().get_Empty_i9b85g_k$()) {
        // Inline function 'androidx.compose.material3.Decoration$composable.<anonymous>.<anonymous>' call
        var value = ComposableLambda$invoke$ref_15(dispatchReceiver);
        $composer_1.updateRememberedValue_l1wh71_k$(value);
        tmp_0 = value;
      } else {
        tmp_0 = it;
      }
      var tmp_1 = tmp_0;
      var tmp0 = (tmp_1 == null ? true : !(tmp_1 == null)) ? tmp_1 : THROW_CCE();
      $composer_1.endReplaceableGroup_ern0ak_k$();
      var contentWithColor = tmp0;
      if (!(typography_0._v == null)) {
        $composer_0.startReplaceableGroup_ip860b_k$(-758496651);
        sourceInformation($composer_0, '285@11827L46');
        ProvideTextStyle$composable(typography_0._v, contentWithColor, $composer_0, 48 | 14 & $dirty >> 3);
        $composer_0.endReplaceableGroup_ern0ak_k$();
      } else {
        $composer_0.startReplaceableGroup_ip860b_k$(-758496599);
        sourceInformation($composer_0, '285@11879L18');
        contentWithColor($composer_0, 6);
        $composer_0.endReplaceableGroup_ern0ak_k$();
      }
      if (isTraceInProgress()) {
        traceEventEnd();
      }
    } else {
      $composer_0.skipToGroupEnd_lh3zi2_k$();
    }
    var tmp0_safe_receiver = $composer_0.endRestartGroup_yxpjv9_k$();
    if (tmp0_safe_receiver === null)
      null;
    else {
      tmp0_safe_receiver.updateScope_t8jcf_k$(Decoration$composable$lambda_0(contentColor, typography_0, content, $changed, $default));
    }
  }
  function get_ContainerId() {
    return ContainerId;
  }
  var ContainerId;
  function get_PlaceholderAnimationDelayOrDuration() {
    return PlaceholderAnimationDelayOrDuration;
  }
  var PlaceholderAnimationDelayOrDuration;
  function get_PlaceholderAnimationDuration() {
    return PlaceholderAnimationDuration;
  }
  var PlaceholderAnimationDuration;
  function get_LeadingId() {
    return LeadingId;
  }
  var LeadingId;
  function get_TrailingId() {
    return TrailingId;
  }
  var TrailingId;
  function get_PrefixId() {
    return PrefixId;
  }
  var PrefixId;
  function get_SuffixId() {
    return SuffixId;
  }
  var SuffixId;
  function get_LabelId() {
    return LabelId;
  }
  var LabelId;
  function get_PlaceholderId() {
    return PlaceholderId;
  }
  var PlaceholderId;
  function get_TextFieldId() {
    return TextFieldId;
  }
  var TextFieldId;
  function get_SupportingId() {
    return SupportingId;
  }
  var SupportingId;
  function widthOrZero(placeable) {
    _init_properties_TextFieldImpl_kt__7vp9id();
    var tmp1_elvis_lhs = placeable == null ? null : placeable.get_width_j0q4yl_k$();
    return tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
  }
  function heightOrZero(placeable) {
    _init_properties_TextFieldImpl_kt__7vp9id();
    var tmp1_elvis_lhs = placeable == null ? null : placeable.get_height_e7t92o_k$();
    return tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
  }
  function get_layoutId_0(_this__u8e3s4) {
    _init_properties_TextFieldImpl_kt__7vp9id();
    var tmp = _this__u8e3s4.get_parentData_o87vnn_k$();
    var tmp0_safe_receiver = (!(tmp == null) ? isInterface(tmp, LayoutIdParentData) : false) ? tmp : null;
    return tmp0_safe_receiver == null ? null : tmp0_safe_receiver.get_layoutId_hve20e_k$();
  }
  function CommonDecorationBox$composable$lambda($colors, $enabled, $isError, $interactionSource, $$dirty1) {
    return function (it, $composer, $changed) {
      var $composer_0 = $composer;
      $composer_0.startReplaceableGroup_ip860b_k$(-502832279);
      sourceInformation($composer_0, 'C93@3660L47:TextFieldImpl.kt#uh7d8r');
      var tmp;
      if (isTraceInProgress()) {
        traceEventStart(-502832279, $changed, -1, 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous> (TextFieldImpl.kt:92)');
        tmp = Unit_getInstance();
      }
      var tmp0 = $colors.labelColor$composable_5qlvjk_k$($enabled._v, $isError._v, $interactionSource, $composer_0, 14 & $$dirty1 >> 6 | 112 & $$dirty1 >> 6 | 896 & $$dirty1 >> 6 | 7168 & $$dirty1 >> 9).get_value_j01efc_k$().value_1;
      var tmp_0;
      if (isTraceInProgress()) {
        traceEventEnd();
        tmp_0 = Unit_getInstance();
      }
      $composer_0.endReplaceableGroup_ern0ak_k$();
      return new Color(tmp0);
    };
  }
  function CommonDecorationBox$composable$lambda$lambda($labelProgress, $shouldOverrideTextStyleColor, $labelTextStyleColor, $labelContentColor, $this, $$dirty) {
    return function ($composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C*119@4896L10,120@4952L10,125@5165L49:TextFieldImpl.kt#uh7d8r');
      var tmp;
      if (!(($changed & 11) === 2) ? true : !$composer_0.get_skipping_3owdve_k$()) {
        if (isTraceInProgress()) {
          traceEventStart(-382297919, $changed, -1, 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous>.<anonymous> (TextFieldImpl.kt:117)');
        }
        // Inline function 'kotlin.let' call
        // Inline function 'kotlin.contracts.contract' call
        // Inline function 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous>' call
        var it = lerp_1(MaterialTheme_getInstance().$get_typography$$composable_99iyci_k$($composer_0, 6).get_bodyLarge_sxra4w_k$(), MaterialTheme_getInstance().$get_typography$$composable_99iyci_k$($composer_0, 6).get_bodySmall_t1t5ng_k$(), $labelProgress);
        var labelTextStyle = $shouldOverrideTextStyleColor ? it.copy$default_82cxxr_k$($labelTextStyleColor) : it;
        Decoration$composable($labelContentColor, labelTextStyle, $this, $composer_0, 14 & $$dirty >> 6, 0);
        var tmp_0;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_0 = Unit_getInstance();
        }
        tmp = tmp_0;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_5($boundThis) {
    return function (p0, p1) {
      return $boundThis.invoke_z8di7s_k$(p0, p1);
    };
  }
  function CommonDecorationBox$composable$lambda$lambda_0($placeholderAlphaProgress, $colors, $enabled, $isError, $interactionSource, $$dirty1, $placeholder, $$dirty) {
    return function (modifier, $composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C135@5640L401:TextFieldImpl.kt#uh7d8r');
      var $dirty = $changed;
      var tmp;
      if (($changed & 14) === 0) {
        $dirty = $dirty | ($composer_0.changed_ga7h3f_k$(modifier) ? 4 : 2);
        tmp = Unit_getInstance();
      }
      var tmp_0;
      if (!(($dirty & 91) === 18) ? true : !$composer_0.get_skipping_3owdve_k$()) {
        if (isTraceInProgress()) {
          traceEventStart(-524658155, $changed, -1, 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous> (TextFieldImpl.kt:134)');
        }
        // Inline function 'androidx.compose.foundation.layout.Box$composable' call
        var modifier_0 = alpha(modifier, $placeholderAlphaProgress);
        var contentAlignment = null;
        var propagateMinConstraints = false;
        var $composer_1 = $composer_0;
        $composer_1.startReplaceableGroup_ip860b_k$(1330882304);
        sourceInformation($composer_1, 'CC(Box$composable)P(2,1,3)69@3214L67,70@3286L130:Box.kt#2w3rfo');
        if (!((6 & 1) === 0))
          modifier_0 = Companion_getInstance_1();
        if (!((6 & 2) === 0))
          contentAlignment = Companion_getInstance_0().get_TopStart_o4x792_k$();
        if (!((6 & 4) === 0))
          propagateMinConstraints = false;
        var measurePolicy = rememberBoxMeasurePolicy$composable(contentAlignment, propagateMinConstraints, $composer_1, 14 & 0 >> 3 | 112 & 0 >> 3);
        // Inline function 'androidx.compose.ui.layout.Layout$composable' call
        var modifier_1 = modifier_0;
        var $changed_0 = 112 & 0 << 3;
        var modifier_2 = modifier_1;
        var $composer_2 = $composer_1;
        $composer_2.startReplaceableGroup_ip860b_k$(1725976829);
        sourceInformation($composer_2, 'CC(Layout$composable)P(!1,2)78@3158L23,80@3248L420:Layout.kt#80mrfh');
        if (!((0 & 2) === 0))
          modifier_2 = Companion_getInstance_1();
        var compositeKeyHash = $get_currentCompositeKeyHash$$composable_u3vbzj($composer_2, 0);
        var localMap = $composer_2.get_currentCompositionLocalMap_fmcf79_k$();
        // Inline function 'androidx.compose.runtime.ReusableComposeNode$composable' call
        var factory = Companion_getInstance_3().get_Constructor_f7ieep_k$();
        var skippableUpdate = materializerOf(modifier_2);
        var $changed_1 = 6 | 7168 & $changed_0 << 9;
        var $composer_3 = $composer_2;
        var tmp_1 = $composer_3.get_applier_bupu8u_k$();
        if (!isInterface(tmp_1, Applier)) {
          invalidApplier();
        }
        $composer_3.startReusableNode_jjgeyp_k$();
        if ($composer_3.get_inserting_25mlsw_k$()) {
          $composer_3.createNode_ahrd54_k$(factory);
        } else {
          $composer_3.useNode_io5s9l_k$();
        }
        // Inline function 'androidx.compose.ui.layout.Layout$composable.<anonymous>' call
        var $this$ReusableComposeNode = _Updater___init__impl__rbfxm8($composer_3);
        Updater__set_impl_v7kwss($this$ReusableComposeNode, measurePolicy, Companion_getInstance_3().get_SetMeasurePolicy_on6ujt_k$());
        Updater__set_impl_v7kwss($this$ReusableComposeNode, localMap, Companion_getInstance_3().get_SetResolvedCompositionLocals_rc2u9t_k$());
        // Inline function 'androidx.compose.runtime.Updater.set' call
        var block = Companion_getInstance_3().get_SetCompositeKeyHash_n8lgg1_k$();
        // Inline function 'kotlin.with' call
        // Inline function 'kotlin.contracts.contract' call
        var $this$with = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode);
        var tmp_2;
        if ($this$with.get_inserting_25mlsw_k$() ? true : !equals($this$with.rememberedValue_4dg93v_k$(), compositeKeyHash)) {
          $this$with.updateRememberedValue_l1wh71_k$(compositeKeyHash);
          _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode).apply_pk82p8_k$(compositeKeyHash, block);
          tmp_2 = Unit_getInstance();
        }
        skippableUpdate(new SkippableUpdater(_SkippableUpdater___init__impl__4ft0t9($composer_3)), $composer_3, 112 & $changed_1 >> 3);
        $composer_3.startReplaceableGroup_ip860b_k$(2058660585);
        // Inline function 'androidx.compose.foundation.layout.Box$composable.<anonymous>' call
        var $composer_4 = $composer_3;
        sourceInformationMarkerStart($composer_4, -1851536925, 'C71@3331L9:Box.kt#2w3rfo');
        // Inline function 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous>' call
        BoxScopeInstance_getInstance();
        var $composer_5 = $composer_4;
        sourceInformationMarkerStart($composer_5, 1076542639, 'C138@5806L53,139@5922L10,136@5712L307:TextFieldImpl.kt#uh7d8r');
        Decoration$composable($colors.placeholderColor$composable_kd6i9d_k$($enabled._v, $isError._v, $interactionSource, $composer_5, 14 & $$dirty1 >> 6 | 112 & $$dirty1 >> 6 | 896 & $$dirty1 >> 6 | 7168 & $$dirty1 >> 9).get_value_j01efc_k$().value_1, MaterialTheme_getInstance().$get_typography$$composable_99iyci_k$($composer_5, 6).get_bodyLarge_sxra4w_k$(), $placeholder._v, $composer_5, 896 & $$dirty >> 9, 0);
        sourceInformationMarkerEnd($composer_5);
        sourceInformationMarkerEnd($composer_4);
        $composer_3.endReplaceableGroup_ern0ak_k$();
        $composer_3.endNode_3m0yfn_k$();
        $composer_2.endReplaceableGroup_ern0ak_k$();
        $composer_1.endReplaceableGroup_ern0ak_k$();
        var tmp_3;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_3 = Unit_getInstance();
        }
        tmp_0 = tmp_3;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp_0 = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_6($boundThis) {
    return function (p0, p1, p2) {
      return $boundThis.invoke_c9vvnb_k$(p0, p1, p2);
    };
  }
  function CommonDecorationBox$composable$lambda$lambda_1($prefixSuffixAlphaProgress, $prefixColor, $bodyLarge, $prefix, $$dirty) {
    return function ($composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C150@6348L285:TextFieldImpl.kt#uh7d8r');
      var tmp;
      if (!(($changed & 11) === 2) ? true : !$composer_0.get_skipping_3owdve_k$()) {
        if (isTraceInProgress()) {
          traceEventStart(1824482619, $changed, -1, 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous> (TextFieldImpl.kt:149)');
        }
        // Inline function 'androidx.compose.foundation.layout.Box$composable' call
        var modifier = alpha(Companion_getInstance_1(), $prefixSuffixAlphaProgress);
        var contentAlignment = null;
        var propagateMinConstraints = false;
        var $composer_1 = $composer_0;
        $composer_1.startReplaceableGroup_ip860b_k$(1330882304);
        sourceInformation($composer_1, 'CC(Box$composable)P(2,1,3)69@3214L67,70@3286L130:Box.kt#2w3rfo');
        if (!((6 & 1) === 0))
          modifier = Companion_getInstance_1();
        if (!((6 & 2) === 0))
          contentAlignment = Companion_getInstance_0().get_TopStart_o4x792_k$();
        if (!((6 & 4) === 0))
          propagateMinConstraints = false;
        var measurePolicy = rememberBoxMeasurePolicy$composable(contentAlignment, propagateMinConstraints, $composer_1, 14 & 0 >> 3 | 112 & 0 >> 3);
        // Inline function 'androidx.compose.ui.layout.Layout$composable' call
        var modifier_0 = modifier;
        var $changed_0 = 112 & 0 << 3;
        var modifier_1 = modifier_0;
        var $composer_2 = $composer_1;
        $composer_2.startReplaceableGroup_ip860b_k$(1725976829);
        sourceInformation($composer_2, 'CC(Layout$composable)P(!1,2)78@3158L23,80@3248L420:Layout.kt#80mrfh');
        if (!((0 & 2) === 0))
          modifier_1 = Companion_getInstance_1();
        var compositeKeyHash = $get_currentCompositeKeyHash$$composable_u3vbzj($composer_2, 0);
        var localMap = $composer_2.get_currentCompositionLocalMap_fmcf79_k$();
        // Inline function 'androidx.compose.runtime.ReusableComposeNode$composable' call
        var factory = Companion_getInstance_3().get_Constructor_f7ieep_k$();
        var skippableUpdate = materializerOf(modifier_1);
        var $changed_1 = 6 | 7168 & $changed_0 << 9;
        var $composer_3 = $composer_2;
        var tmp_0 = $composer_3.get_applier_bupu8u_k$();
        if (!isInterface(tmp_0, Applier)) {
          invalidApplier();
        }
        $composer_3.startReusableNode_jjgeyp_k$();
        if ($composer_3.get_inserting_25mlsw_k$()) {
          $composer_3.createNode_ahrd54_k$(factory);
        } else {
          $composer_3.useNode_io5s9l_k$();
        }
        // Inline function 'androidx.compose.ui.layout.Layout$composable.<anonymous>' call
        var $this$ReusableComposeNode = _Updater___init__impl__rbfxm8($composer_3);
        Updater__set_impl_v7kwss($this$ReusableComposeNode, measurePolicy, Companion_getInstance_3().get_SetMeasurePolicy_on6ujt_k$());
        Updater__set_impl_v7kwss($this$ReusableComposeNode, localMap, Companion_getInstance_3().get_SetResolvedCompositionLocals_rc2u9t_k$());
        // Inline function 'androidx.compose.runtime.Updater.set' call
        var block = Companion_getInstance_3().get_SetCompositeKeyHash_n8lgg1_k$();
        // Inline function 'kotlin.with' call
        // Inline function 'kotlin.contracts.contract' call
        var $this$with = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode);
        var tmp_1;
        if ($this$with.get_inserting_25mlsw_k$() ? true : !equals($this$with.rememberedValue_4dg93v_k$(), compositeKeyHash)) {
          $this$with.updateRememberedValue_l1wh71_k$(compositeKeyHash);
          _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode).apply_pk82p8_k$(compositeKeyHash, block);
          tmp_1 = Unit_getInstance();
        }
        skippableUpdate(new SkippableUpdater(_SkippableUpdater___init__impl__4ft0t9($composer_3)), $composer_3, 112 & $changed_1 >> 3);
        $composer_3.startReplaceableGroup_ip860b_k$(2058660585);
        // Inline function 'androidx.compose.foundation.layout.Box$composable.<anonymous>' call
        var $composer_4 = $composer_3;
        sourceInformationMarkerStart($composer_4, -1851536925, 'C71@3331L9:Box.kt#2w3rfo');
        // Inline function 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous>' call
        BoxScopeInstance_getInstance();
        var $composer_5 = $composer_4;
        sourceInformationMarkerStart($composer_5, 1076543348, 'C151@6421L190:TextFieldImpl.kt#uh7d8r');
        Decoration$composable($prefixColor, $bodyLarge, $prefix._v, $composer_5, 896 & $$dirty >> 18, 0);
        sourceInformationMarkerEnd($composer_5);
        sourceInformationMarkerEnd($composer_4);
        $composer_3.endReplaceableGroup_ern0ak_k$();
        $composer_3.endNode_3m0yfn_k$();
        $composer_2.endReplaceableGroup_ern0ak_k$();
        $composer_1.endReplaceableGroup_ern0ak_k$();
        var tmp_2;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_2 = Unit_getInstance();
        }
        tmp = tmp_2;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_7($boundThis) {
    return function (p0, p1) {
      return $boundThis.invoke_z8di7s_k$(p0, p1);
    };
  }
  function CommonDecorationBox$composable$lambda$lambda_2($prefixSuffixAlphaProgress, $suffixColor, $bodyLarge, $suffix, $$dirty) {
    return function ($composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C164@6940L285:TextFieldImpl.kt#uh7d8r');
      var tmp;
      if (!(($changed & 11) === 2) ? true : !$composer_0.get_skipping_3owdve_k$()) {
        if (isTraceInProgress()) {
          traceEventStart(907456412, $changed, -1, 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous> (TextFieldImpl.kt:163)');
        }
        // Inline function 'androidx.compose.foundation.layout.Box$composable' call
        var modifier = alpha(Companion_getInstance_1(), $prefixSuffixAlphaProgress);
        var contentAlignment = null;
        var propagateMinConstraints = false;
        var $composer_1 = $composer_0;
        $composer_1.startReplaceableGroup_ip860b_k$(1330882304);
        sourceInformation($composer_1, 'CC(Box$composable)P(2,1,3)69@3214L67,70@3286L130:Box.kt#2w3rfo');
        if (!((6 & 1) === 0))
          modifier = Companion_getInstance_1();
        if (!((6 & 2) === 0))
          contentAlignment = Companion_getInstance_0().get_TopStart_o4x792_k$();
        if (!((6 & 4) === 0))
          propagateMinConstraints = false;
        var measurePolicy = rememberBoxMeasurePolicy$composable(contentAlignment, propagateMinConstraints, $composer_1, 14 & 0 >> 3 | 112 & 0 >> 3);
        // Inline function 'androidx.compose.ui.layout.Layout$composable' call
        var modifier_0 = modifier;
        var $changed_0 = 112 & 0 << 3;
        var modifier_1 = modifier_0;
        var $composer_2 = $composer_1;
        $composer_2.startReplaceableGroup_ip860b_k$(1725976829);
        sourceInformation($composer_2, 'CC(Layout$composable)P(!1,2)78@3158L23,80@3248L420:Layout.kt#80mrfh');
        if (!((0 & 2) === 0))
          modifier_1 = Companion_getInstance_1();
        var compositeKeyHash = $get_currentCompositeKeyHash$$composable_u3vbzj($composer_2, 0);
        var localMap = $composer_2.get_currentCompositionLocalMap_fmcf79_k$();
        // Inline function 'androidx.compose.runtime.ReusableComposeNode$composable' call
        var factory = Companion_getInstance_3().get_Constructor_f7ieep_k$();
        var skippableUpdate = materializerOf(modifier_1);
        var $changed_1 = 6 | 7168 & $changed_0 << 9;
        var $composer_3 = $composer_2;
        var tmp_0 = $composer_3.get_applier_bupu8u_k$();
        if (!isInterface(tmp_0, Applier)) {
          invalidApplier();
        }
        $composer_3.startReusableNode_jjgeyp_k$();
        if ($composer_3.get_inserting_25mlsw_k$()) {
          $composer_3.createNode_ahrd54_k$(factory);
        } else {
          $composer_3.useNode_io5s9l_k$();
        }
        // Inline function 'androidx.compose.ui.layout.Layout$composable.<anonymous>' call
        var $this$ReusableComposeNode = _Updater___init__impl__rbfxm8($composer_3);
        Updater__set_impl_v7kwss($this$ReusableComposeNode, measurePolicy, Companion_getInstance_3().get_SetMeasurePolicy_on6ujt_k$());
        Updater__set_impl_v7kwss($this$ReusableComposeNode, localMap, Companion_getInstance_3().get_SetResolvedCompositionLocals_rc2u9t_k$());
        // Inline function 'androidx.compose.runtime.Updater.set' call
        var block = Companion_getInstance_3().get_SetCompositeKeyHash_n8lgg1_k$();
        // Inline function 'kotlin.with' call
        // Inline function 'kotlin.contracts.contract' call
        var $this$with = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode);
        var tmp_1;
        if ($this$with.get_inserting_25mlsw_k$() ? true : !equals($this$with.rememberedValue_4dg93v_k$(), compositeKeyHash)) {
          $this$with.updateRememberedValue_l1wh71_k$(compositeKeyHash);
          _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode).apply_pk82p8_k$(compositeKeyHash, block);
          tmp_1 = Unit_getInstance();
        }
        skippableUpdate(new SkippableUpdater(_SkippableUpdater___init__impl__4ft0t9($composer_3)), $composer_3, 112 & $changed_1 >> 3);
        $composer_3.startReplaceableGroup_ip860b_k$(2058660585);
        // Inline function 'androidx.compose.foundation.layout.Box$composable.<anonymous>' call
        var $composer_4 = $composer_3;
        sourceInformationMarkerStart($composer_4, -1851536925, 'C71@3331L9:Box.kt#2w3rfo');
        // Inline function 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous>' call
        BoxScopeInstance_getInstance();
        var $composer_5 = $composer_4;
        sourceInformationMarkerStart($composer_5, 1076543940, 'C165@7013L190:TextFieldImpl.kt#uh7d8r');
        Decoration$composable($suffixColor, $bodyLarge, $suffix._v, $composer_5, 896 & $$dirty >> 21, 0);
        sourceInformationMarkerEnd($composer_5);
        sourceInformationMarkerEnd($composer_4);
        $composer_3.endReplaceableGroup_ern0ak_k$();
        $composer_3.endNode_3m0yfn_k$();
        $composer_2.endReplaceableGroup_ern0ak_k$();
        $composer_1.endReplaceableGroup_ern0ak_k$();
        var tmp_2;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_2 = Unit_getInstance();
        }
        tmp = tmp_2;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_8($boundThis) {
    return function (p0, p1) {
      return $boundThis.invoke_z8di7s_k$(p0, p1);
    };
  }
  function CommonDecorationBox$composable$lambda$lambda_3($isError, $defaultErrorMessage) {
    return function ($this$semantics) {
      var tmp;
      if ($isError._v) {
        error($this$semantics, $defaultErrorMessage);
        tmp = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function CommonDecorationBox$composable$lambda$lambda_4($leadingIconColor, $this) {
    return function ($composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C183@7858L57:TextFieldImpl.kt#uh7d8r');
      var tmp;
      if (!(($changed & 11) === 2) ? true : !$composer_0.get_skipping_3owdve_k$()) {
        if (isTraceInProgress()) {
          traceEventStart(90769583, $changed, -1, 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous>.<anonymous> (TextFieldImpl.kt:182)');
        }
        Decoration$composable($leadingIconColor, null, $this, $composer_0, 0, 2);
        var tmp_0;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_0 = Unit_getInstance();
        }
        tmp = tmp_0;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_9($boundThis) {
    return function (p0, p1) {
      return $boundThis.invoke_z8di7s_k$(p0, p1);
    };
  }
  function CommonDecorationBox$composable$lambda$lambda_5($trailingIconColor, $this) {
    return function ($composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C190@8162L58:TextFieldImpl.kt#uh7d8r');
      var tmp;
      if (!(($changed & 11) === 2) ? true : !$composer_0.get_skipping_3owdve_k$()) {
        if (isTraceInProgress()) {
          traceEventStart(2077796155, $changed, -1, 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous>.<anonymous> (TextFieldImpl.kt:189)');
        }
        Decoration$composable($trailingIconColor, null, $this, $composer_0, 0, 2);
        var tmp_0;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_0 = Unit_getInstance();
        }
        tmp = tmp_0;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_10($boundThis) {
    return function (p0, p1) {
      return $boundThis.invoke_z8di7s_k$(p0, p1);
    };
  }
  function CommonDecorationBox$composable$lambda$lambda_6($supportingTextColor, $bodySmall, $this) {
    return function ($composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C198@8487L84:TextFieldImpl.kt#uh7d8r');
      var tmp;
      if (!(($changed & 11) === 2) ? true : !$composer_0.get_skipping_3owdve_k$()) {
        if (isTraceInProgress()) {
          traceEventStart(-1531019900, $changed, -1, 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous>.<anonymous> (TextFieldImpl.kt:197)');
        }
        Decoration$composable($supportingTextColor, $bodySmall, $this, $composer_0, 0, 0);
        var tmp_0;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_0 = Unit_getInstance();
        }
        tmp = tmp_0;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_11($boundThis) {
    return function (p0, p1) {
      return $boundThis.invoke_z8di7s_k$(p0, p1);
    };
  }
  function CommonDecorationBox$composable$lambda$lambda_7($container, $$dirty1) {
    return function ($composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C205@8741L151:TextFieldImpl.kt#uh7d8r');
      var tmp;
      if (!(($changed & 11) === 2) ? true : !$composer_0.get_skipping_3owdve_k$()) {
        if (isTraceInProgress()) {
          traceEventStart(-2124779163, $changed, -1, 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous> (TextFieldImpl.kt:204)');
        }
        // Inline function 'androidx.compose.foundation.layout.Box$composable' call
        var modifier = layoutId(Companion_getInstance_1(), 'Container');
        var contentAlignment = null;
        var propagateMinConstraints = true;
        var $composer_1 = $composer_0;
        $composer_1.startReplaceableGroup_ip860b_k$(1330882304);
        sourceInformation($composer_1, 'CC(Box$composable)P(2,1,3)69@3214L67,70@3286L130:Box.kt#2w3rfo');
        if (!((2 & 1) === 0))
          modifier = Companion_getInstance_1();
        if (!((2 & 2) === 0))
          contentAlignment = Companion_getInstance_0().get_TopStart_o4x792_k$();
        if (!((2 & 4) === 0))
          propagateMinConstraints = false;
        var measurePolicy = rememberBoxMeasurePolicy$composable(contentAlignment, propagateMinConstraints, $composer_1, 14 & 390 >> 3 | 112 & 390 >> 3);
        // Inline function 'androidx.compose.ui.layout.Layout$composable' call
        var modifier_0 = modifier;
        var $changed_0 = 112 & 390 << 3;
        var modifier_1 = modifier_0;
        var $composer_2 = $composer_1;
        $composer_2.startReplaceableGroup_ip860b_k$(1725976829);
        sourceInformation($composer_2, 'CC(Layout$composable)P(!1,2)78@3158L23,80@3248L420:Layout.kt#80mrfh');
        if (!((0 & 2) === 0))
          modifier_1 = Companion_getInstance_1();
        var compositeKeyHash = $get_currentCompositeKeyHash$$composable_u3vbzj($composer_2, 0);
        var localMap = $composer_2.get_currentCompositionLocalMap_fmcf79_k$();
        // Inline function 'androidx.compose.runtime.ReusableComposeNode$composable' call
        var factory = Companion_getInstance_3().get_Constructor_f7ieep_k$();
        var skippableUpdate = materializerOf(modifier_1);
        var $changed_1 = 6 | 7168 & $changed_0 << 9;
        var $composer_3 = $composer_2;
        var tmp_0 = $composer_3.get_applier_bupu8u_k$();
        if (!isInterface(tmp_0, Applier)) {
          invalidApplier();
        }
        $composer_3.startReusableNode_jjgeyp_k$();
        if ($composer_3.get_inserting_25mlsw_k$()) {
          $composer_3.createNode_ahrd54_k$(factory);
        } else {
          $composer_3.useNode_io5s9l_k$();
        }
        // Inline function 'androidx.compose.ui.layout.Layout$composable.<anonymous>' call
        var $this$ReusableComposeNode = _Updater___init__impl__rbfxm8($composer_3);
        Updater__set_impl_v7kwss($this$ReusableComposeNode, measurePolicy, Companion_getInstance_3().get_SetMeasurePolicy_on6ujt_k$());
        Updater__set_impl_v7kwss($this$ReusableComposeNode, localMap, Companion_getInstance_3().get_SetResolvedCompositionLocals_rc2u9t_k$());
        // Inline function 'androidx.compose.runtime.Updater.set' call
        var block = Companion_getInstance_3().get_SetCompositeKeyHash_n8lgg1_k$();
        // Inline function 'kotlin.with' call
        // Inline function 'kotlin.contracts.contract' call
        var $this$with = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode);
        var tmp_1;
        if ($this$with.get_inserting_25mlsw_k$() ? true : !equals($this$with.rememberedValue_4dg93v_k$(), compositeKeyHash)) {
          $this$with.updateRememberedValue_l1wh71_k$(compositeKeyHash);
          _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode).apply_pk82p8_k$(compositeKeyHash, block);
          tmp_1 = Unit_getInstance();
        }
        skippableUpdate(new SkippableUpdater(_SkippableUpdater___init__impl__4ft0t9($composer_3)), $composer_3, 112 & $changed_1 >> 3);
        $composer_3.startReplaceableGroup_ip860b_k$(2058660585);
        // Inline function 'androidx.compose.foundation.layout.Box$composable.<anonymous>' call
        var $composer_4 = $composer_3;
        sourceInformationMarkerStart($composer_4, -1851536925, 'C71@3331L9:Box.kt#2w3rfo');
        // Inline function 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous>' call
        BoxScopeInstance_getInstance();
        var $composer_5 = $composer_4;
        sourceInformationMarkerStart($composer_5, 1076545786, 'C207@8859L11:TextFieldImpl.kt#uh7d8r');
        $container($composer_5, 14 & $$dirty1 >> 21);
        sourceInformationMarkerEnd($composer_5);
        sourceInformationMarkerEnd($composer_4);
        $composer_3.endReplaceableGroup_ern0ak_k$();
        $composer_3.endNode_3m0yfn_k$();
        $composer_2.endReplaceableGroup_ern0ak_k$();
        $composer_1.endReplaceableGroup_ern0ak_k$();
        var tmp_2;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_2 = Unit_getInstance();
        }
        tmp = tmp_2;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_12($boundThis) {
    return function (p0, p1) {
      return $boundThis.invoke_z8di7s_k$(p0, p1);
    };
  }
  function CommonDecorationBox$composable$lambda$lambda_8($labelSize, $contentPadding, $container, $$dirty1) {
    return function ($composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C231@9859L302:TextFieldImpl.kt#uh7d8r');
      var tmp;
      if (!(($changed & 11) === 2) ? true : !$composer_0.get_skipping_3owdve_k$()) {
        if (isTraceInProgress()) {
          traceEventStart(1902535592, $changed, -1, 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous> (TextFieldImpl.kt:230)');
        }
        // Inline function 'androidx.compose.foundation.layout.Box$composable' call
        var modifier = outlineCutout(layoutId(Companion_getInstance_1(), 'Container'), $labelSize.get_value_j01efc_k$().packedValue_1, $contentPadding);
        var contentAlignment = null;
        var propagateMinConstraints = true;
        var $composer_1 = $composer_0;
        $composer_1.startReplaceableGroup_ip860b_k$(1330882304);
        sourceInformation($composer_1, 'CC(Box$composable)P(2,1,3)69@3214L67,70@3286L130:Box.kt#2w3rfo');
        if (!((2 & 1) === 0))
          modifier = Companion_getInstance_1();
        if (!((2 & 2) === 0))
          contentAlignment = Companion_getInstance_0().get_TopStart_o4x792_k$();
        if (!((2 & 4) === 0))
          propagateMinConstraints = false;
        var measurePolicy = rememberBoxMeasurePolicy$composable(contentAlignment, propagateMinConstraints, $composer_1, 14 & 384 >> 3 | 112 & 384 >> 3);
        // Inline function 'androidx.compose.ui.layout.Layout$composable' call
        var modifier_0 = modifier;
        var $changed_0 = 112 & 384 << 3;
        var modifier_1 = modifier_0;
        var $composer_2 = $composer_1;
        $composer_2.startReplaceableGroup_ip860b_k$(1725976829);
        sourceInformation($composer_2, 'CC(Layout$composable)P(!1,2)78@3158L23,80@3248L420:Layout.kt#80mrfh');
        if (!((0 & 2) === 0))
          modifier_1 = Companion_getInstance_1();
        var compositeKeyHash = $get_currentCompositeKeyHash$$composable_u3vbzj($composer_2, 0);
        var localMap = $composer_2.get_currentCompositionLocalMap_fmcf79_k$();
        // Inline function 'androidx.compose.runtime.ReusableComposeNode$composable' call
        var factory = Companion_getInstance_3().get_Constructor_f7ieep_k$();
        var skippableUpdate = materializerOf(modifier_1);
        var $changed_1 = 6 | 7168 & $changed_0 << 9;
        var $composer_3 = $composer_2;
        var tmp_0 = $composer_3.get_applier_bupu8u_k$();
        if (!isInterface(tmp_0, Applier)) {
          invalidApplier();
        }
        $composer_3.startReusableNode_jjgeyp_k$();
        if ($composer_3.get_inserting_25mlsw_k$()) {
          $composer_3.createNode_ahrd54_k$(factory);
        } else {
          $composer_3.useNode_io5s9l_k$();
        }
        // Inline function 'androidx.compose.ui.layout.Layout$composable.<anonymous>' call
        var $this$ReusableComposeNode = _Updater___init__impl__rbfxm8($composer_3);
        Updater__set_impl_v7kwss($this$ReusableComposeNode, measurePolicy, Companion_getInstance_3().get_SetMeasurePolicy_on6ujt_k$());
        Updater__set_impl_v7kwss($this$ReusableComposeNode, localMap, Companion_getInstance_3().get_SetResolvedCompositionLocals_rc2u9t_k$());
        // Inline function 'androidx.compose.runtime.Updater.set' call
        var block = Companion_getInstance_3().get_SetCompositeKeyHash_n8lgg1_k$();
        // Inline function 'kotlin.with' call
        // Inline function 'kotlin.contracts.contract' call
        var $this$with = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode);
        var tmp_1;
        if ($this$with.get_inserting_25mlsw_k$() ? true : !equals($this$with.rememberedValue_4dg93v_k$(), compositeKeyHash)) {
          $this$with.updateRememberedValue_l1wh71_k$(compositeKeyHash);
          _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode).apply_pk82p8_k$(compositeKeyHash, block);
          tmp_1 = Unit_getInstance();
        }
        skippableUpdate(new SkippableUpdater(_SkippableUpdater___init__impl__4ft0t9($composer_3)), $composer_3, 112 & $changed_1 >> 3);
        $composer_3.startReplaceableGroup_ip860b_k$(2058660585);
        // Inline function 'androidx.compose.foundation.layout.Box$composable.<anonymous>' call
        var $composer_4 = $composer_3;
        sourceInformationMarkerStart($composer_4, -1851536925, 'C71@3331L9:Box.kt#2w3rfo');
        // Inline function 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous>' call
        BoxScopeInstance_getInstance();
        var $composer_5 = $composer_4;
        sourceInformationMarkerStart($composer_5, 1076547055, 'C237@10128L11:TextFieldImpl.kt#uh7d8r');
        $container($composer_5, 14 & $$dirty1 >> 21);
        sourceInformationMarkerEnd($composer_5);
        sourceInformationMarkerEnd($composer_4);
        $composer_3.endReplaceableGroup_ern0ak_k$();
        $composer_3.endNode_3m0yfn_k$();
        $composer_2.endReplaceableGroup_ern0ak_k$();
        $composer_1.endReplaceableGroup_ern0ak_k$();
        var tmp_2;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_2 = Unit_getInstance();
        }
        tmp = tmp_2;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_13($boundThis) {
    return function (p0, p1) {
      return $boundThis.invoke_z8di7s_k$(p0, p1);
    };
  }
  function CommonDecorationBox$composable$lambda$lambda_9($labelProgress, $labelSize) {
    return function (it) {
      var labelWidth = _Size___get_width__impl__58y75t(it.packedValue_1) * $labelProgress;
      var labelHeight = _Size___get_height__impl__a04p02(it.packedValue_1) * $labelProgress;
      var tmp;
      if (!(_Size___get_width__impl__58y75t($labelSize.get_value_j01efc_k$().packedValue_1) === labelWidth) ? true : !(_Size___get_height__impl__a04p02($labelSize.get_value_j01efc_k$().packedValue_1) === labelHeight)) {
        $labelSize.set_value_v1vabv_k$(new Size_0(Size(labelWidth, labelHeight)));
        tmp = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function CommonDecorationBox$composable$lambda_0($label, $placeholder, $transformedText, $colors, $enabled, $isError, $interactionSource, $$dirty1, $prefix, $suffix, $leadingIcon, $trailingIcon, $supportingText, $type, $innerTextField, $singleLine, $contentPadding, $$dirty, $shouldOverrideTextStyleColor, $bodyLarge, $bodySmall, $container) {
    return function (labelProgress, labelTextStyleColor, labelContentColor, placeholderAlphaProgress, prefixSuffixAlphaProgress, $composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'CP(1,2:c#ui.graphics.Color,0:c#ui.graphics.Color)146@6118L48,160@6710L48,177@7510L30,178@7596L43,180@7679L53,187@7980L54,195@8299L56:TextFieldImpl.kt#uh7d8r');
      var $dirty = $changed;
      var tmp;
      if (($changed & 14) === 0) {
        $dirty = $dirty | ($composer_0.changed_i8bvic_k$(labelProgress) ? 4 : 2);
        tmp = Unit_getInstance();
      }
      var tmp_0;
      if (($changed & 112) === 0) {
        $dirty = $dirty | ($composer_0.changed_j54hty_k$(_ULong___get_data__impl__fggpzb(_Color___get_value__impl__1pls5m(labelTextStyleColor.value_1))) ? 32 : 16);
        tmp_0 = Unit_getInstance();
      }
      var tmp_1;
      if (($changed & 896) === 0) {
        $dirty = $dirty | ($composer_0.changed_j54hty_k$(_ULong___get_data__impl__fggpzb(_Color___get_value__impl__1pls5m(labelContentColor.value_1))) ? 256 : 128);
        tmp_1 = Unit_getInstance();
      }
      var tmp_2;
      if (($changed & 7168) === 0) {
        $dirty = $dirty | ($composer_0.changed_i8bvic_k$(placeholderAlphaProgress) ? 2048 : 1024);
        tmp_2 = Unit_getInstance();
      }
      var tmp_3;
      if (($changed & 57344) === 0) {
        $dirty = $dirty | ($composer_0.changed_i8bvic_k$(prefixSuffixAlphaProgress) ? 16384 : 8192);
        tmp_3 = Unit_getInstance();
      }
      var tmp_4;
      if (!(($dirty & 374491) === 74898) ? true : !$composer_0.get_skipping_3owdve_k$()) {
        if (isTraceInProgress()) {
          traceEventStart(1290853831, $dirty, -1, 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous> (TextFieldImpl.kt:113)');
        }
        var tmp0_safe_receiver = $label;
        var tmp_5;
        if (tmp0_safe_receiver == null) {
          tmp_5 = null;
        } else {
          // Inline function 'kotlin.let' call
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous>.<anonymous>' call
          // Inline function 'kotlin.run' call
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous>.<anonymous>.<anonymous>' call
          var tmp_6 = $composer_0;
          var dispatchReceiver = composableLambda(tmp_6, -382297919, true, CommonDecorationBox$composable$lambda$lambda(labelProgress, $shouldOverrideTextStyleColor, labelTextStyleColor.value_1, labelContentColor.value_1, tmp0_safe_receiver, $dirty));
          // Inline function 'androidx.compose.runtime.remember$composable' call
          var $composer_1 = $composer_0;
          $composer_1.startReplaceableGroup_ip860b_k$(-838505973);
          sourceInformation($composer_1, 'CC(remember$composable)P(1):Composables.kt#9igjgp');
          // Inline function 'androidx.compose.runtime.cache' call
          var invalid = $composer_1.changed_ga7h3f_k$(dispatchReceiver);
          // Inline function 'kotlin.let' call
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
          var it = $composer_1.rememberedValue_4dg93v_k$();
          var tmp_7;
          if (invalid ? true : it === Companion_getInstance_2().get_Empty_i9b85g_k$()) {
            // Inline function 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous>' call
            var value = ComposableLambda$invoke$ref_5(dispatchReceiver);
            $composer_1.updateRememberedValue_l1wh71_k$(value);
            tmp_7 = value;
          } else {
            tmp_7 = it;
          }
          var tmp_8 = tmp_7;
          var tmp0 = (tmp_8 == null ? true : !(tmp_8 == null)) ? tmp_8 : THROW_CCE();
          $composer_1.endReplaceableGroup_ern0ak_k$();
          tmp_5 = tmp0;
        }
        var decoratedLabel = tmp_5;
        var tmp_9;
        var tmp_10;
        var tmp_11;
        if (!($placeholder._v == null)) {
          // Inline function 'kotlin.text.isEmpty' call
          var this_0 = $transformedText;
          tmp_11 = charSequenceLength(this_0) === 0;
        } else {
          tmp_11 = false;
        }
        if (tmp_11) {
          tmp_10 = placeholderAlphaProgress > 0.0;
        } else {
          tmp_10 = false;
        }
        if (tmp_10) {
          // Inline function 'kotlin.run' call
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous>.<anonymous>' call
          var tmp_12 = $composer_0;
          var dispatchReceiver_0 = composableLambda(tmp_12, -524658155, true, CommonDecorationBox$composable$lambda$lambda_0(placeholderAlphaProgress, $colors, $enabled, $isError, $interactionSource, $$dirty1, $placeholder, $$dirty));
          // Inline function 'androidx.compose.runtime.remember$composable' call
          var $composer_2 = $composer_0;
          $composer_2.startReplaceableGroup_ip860b_k$(-838505973);
          sourceInformation($composer_2, 'CC(remember$composable)P(1):Composables.kt#9igjgp');
          // Inline function 'androidx.compose.runtime.cache' call
          var invalid_0 = $composer_2.changed_ga7h3f_k$(dispatchReceiver_0);
          // Inline function 'kotlin.let' call
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
          var it_0 = $composer_2.rememberedValue_4dg93v_k$();
          var tmp_13;
          if (invalid_0 ? true : it_0 === Companion_getInstance_2().get_Empty_i9b85g_k$()) {
            // Inline function 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous>.<anonymous>.<anonymous>' call
            var value_0 = ComposableLambda$invoke$ref_6(dispatchReceiver_0);
            $composer_2.updateRememberedValue_l1wh71_k$(value_0);
            tmp_13 = value_0;
          } else {
            tmp_13 = it_0;
          }
          var tmp_14 = tmp_13;
          var tmp0_0 = (tmp_14 == null ? true : !(tmp_14 == null)) ? tmp_14 : THROW_CCE();
          $composer_2.endReplaceableGroup_ern0ak_k$();
          tmp_9 = tmp0_0;
        } else {
          tmp_9 = null;
        }
        var decoratedPlaceholder = tmp_9;
        var prefixColor = $colors.prefixColor$composable_bs3i36_k$($enabled._v, $isError._v, $interactionSource, $composer_0, 14 & $$dirty1 >> 6 | 112 & $$dirty1 >> 6 | 896 & $$dirty1 >> 6 | 7168 & $$dirty1 >> 9).get_value_j01efc_k$().value_1;
        var tmp_15;
        if (!($prefix._v == null) ? prefixSuffixAlphaProgress > 0.0 : false) {
          // Inline function 'kotlin.run' call
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous>.<anonymous>' call
          var tmp_16 = $composer_0;
          var dispatchReceiver_1 = composableLambda(tmp_16, 1824482619, true, CommonDecorationBox$composable$lambda$lambda_1(prefixSuffixAlphaProgress, prefixColor, $bodyLarge, $prefix, $$dirty));
          // Inline function 'androidx.compose.runtime.remember$composable' call
          var $composer_3 = $composer_0;
          $composer_3.startReplaceableGroup_ip860b_k$(-838505973);
          sourceInformation($composer_3, 'CC(remember$composable)P(1):Composables.kt#9igjgp');
          // Inline function 'androidx.compose.runtime.cache' call
          var invalid_1 = $composer_3.changed_ga7h3f_k$(dispatchReceiver_1);
          // Inline function 'kotlin.let' call
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
          var it_1 = $composer_3.rememberedValue_4dg93v_k$();
          var tmp_17;
          if (invalid_1 ? true : it_1 === Companion_getInstance_2().get_Empty_i9b85g_k$()) {
            // Inline function 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous>.<anonymous>.<anonymous>' call
            var value_1 = ComposableLambda$invoke$ref_7(dispatchReceiver_1);
            $composer_3.updateRememberedValue_l1wh71_k$(value_1);
            tmp_17 = value_1;
          } else {
            tmp_17 = it_1;
          }
          var tmp_18 = tmp_17;
          var tmp0_1 = (tmp_18 == null ? true : !(tmp_18 == null)) ? tmp_18 : THROW_CCE();
          $composer_3.endReplaceableGroup_ern0ak_k$();
          tmp_15 = tmp0_1;
        } else {
          tmp_15 = null;
        }
        var decoratedPrefix = tmp_15;
        var suffixColor = $colors.suffixColor$composable_ueuhgt_k$($enabled._v, $isError._v, $interactionSource, $composer_0, 14 & $$dirty1 >> 6 | 112 & $$dirty1 >> 6 | 896 & $$dirty1 >> 6 | 7168 & $$dirty1 >> 9).get_value_j01efc_k$().value_1;
        var tmp_19;
        if (!($suffix._v == null) ? prefixSuffixAlphaProgress > 0.0 : false) {
          // Inline function 'kotlin.run' call
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous>.<anonymous>' call
          var tmp_20 = $composer_0;
          var dispatchReceiver_2 = composableLambda(tmp_20, 907456412, true, CommonDecorationBox$composable$lambda$lambda_2(prefixSuffixAlphaProgress, suffixColor, $bodyLarge, $suffix, $$dirty));
          // Inline function 'androidx.compose.runtime.remember$composable' call
          var $composer_4 = $composer_0;
          $composer_4.startReplaceableGroup_ip860b_k$(-838505973);
          sourceInformation($composer_4, 'CC(remember$composable)P(1):Composables.kt#9igjgp');
          // Inline function 'androidx.compose.runtime.cache' call
          var invalid_2 = $composer_4.changed_ga7h3f_k$(dispatchReceiver_2);
          // Inline function 'kotlin.let' call
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
          var it_2 = $composer_4.rememberedValue_4dg93v_k$();
          var tmp_21;
          if (invalid_2 ? true : it_2 === Companion_getInstance_2().get_Empty_i9b85g_k$()) {
            // Inline function 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous>.<anonymous>.<anonymous>' call
            var value_2 = ComposableLambda$invoke$ref_8(dispatchReceiver_2);
            $composer_4.updateRememberedValue_l1wh71_k$(value_2);
            tmp_21 = value_2;
          } else {
            tmp_21 = it_2;
          }
          var tmp_22 = tmp_21;
          var tmp0_2 = (tmp_22 == null ? true : !(tmp_22 == null)) ? tmp_22 : THROW_CCE();
          $composer_4.endReplaceableGroup_ern0ak_k$();
          tmp_19 = tmp0_2;
        } else {
          tmp_19 = null;
        }
        var decoratedSuffix = tmp_19;
        var defaultErrorMessage = getString$composable(Companion_getInstance_13().get_DefaultErrorMessage_s4db5l_k$(), $composer_0, 6);
        var tmp_23 = Companion_getInstance_1();
        // Inline function 'androidx.compose.runtime.remember$composable' call
        var key1 = $isError._v;
        var $composer_5 = $composer_0;
        $composer_5.startReplaceableGroup_ip860b_k$(-1124426577);
        sourceInformation($composer_5, 'CC(remember$composable)P(1,2):Composables.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid_3 = !!($composer_5.changed_ga7h3f_k$(key1) | $composer_5.changed_ga7h3f_k$(defaultErrorMessage));
        // Inline function 'kotlin.let' call
        // Inline function 'kotlin.contracts.contract' call
        // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
        var it_3 = $composer_5.rememberedValue_4dg93v_k$();
        var tmp_24;
        if (invalid_3 ? true : it_3 === Companion_getInstance_2().get_Empty_i9b85g_k$()) {
          // Inline function 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous>.<anonymous>' call
          var value_3 = CommonDecorationBox$composable$lambda$lambda_3($isError, defaultErrorMessage);
          $composer_5.updateRememberedValue_l1wh71_k$(value_3);
          tmp_24 = value_3;
        } else {
          tmp_24 = it_3;
        }
        var tmp_25 = tmp_24;
        var tmp0_3 = (tmp_25 == null ? true : !(tmp_25 == null)) ? tmp_25 : THROW_CCE();
        $composer_5.endReplaceableGroup_ern0ak_k$();
        var decorationBoxModifier = semantics(tmp_23, VOID, tmp0_3);
        var leadingIconColor = $colors.leadingIconColor$composable_yt7eij_k$($enabled._v, $isError._v, $interactionSource, $composer_0, 14 & $$dirty1 >> 6 | 112 & $$dirty1 >> 6 | 896 & $$dirty1 >> 6 | 7168 & $$dirty1 >> 9).get_value_j01efc_k$().value_1;
        var tmp1_safe_receiver = $leadingIcon._v;
        var tmp_26;
        if (tmp1_safe_receiver == null) {
          tmp_26 = null;
        } else {
          // Inline function 'kotlin.let' call
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous>.<anonymous>' call
          // Inline function 'kotlin.run' call
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous>.<anonymous>.<anonymous>' call
          var tmp_27 = $composer_0;
          var dispatchReceiver_3 = composableLambda(tmp_27, 90769583, true, CommonDecorationBox$composable$lambda$lambda_4(leadingIconColor, tmp1_safe_receiver));
          // Inline function 'androidx.compose.runtime.remember$composable' call
          var $composer_6 = $composer_0;
          $composer_6.startReplaceableGroup_ip860b_k$(-838505973);
          sourceInformation($composer_6, 'CC(remember$composable)P(1):Composables.kt#9igjgp');
          // Inline function 'androidx.compose.runtime.cache' call
          var invalid_4 = $composer_6.changed_ga7h3f_k$(dispatchReceiver_3);
          // Inline function 'kotlin.let' call
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
          var it_4 = $composer_6.rememberedValue_4dg93v_k$();
          var tmp_28;
          if (invalid_4 ? true : it_4 === Companion_getInstance_2().get_Empty_i9b85g_k$()) {
            // Inline function 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous>' call
            var value_4 = ComposableLambda$invoke$ref_9(dispatchReceiver_3);
            $composer_6.updateRememberedValue_l1wh71_k$(value_4);
            tmp_28 = value_4;
          } else {
            tmp_28 = it_4;
          }
          var tmp_29 = tmp_28;
          var tmp0_4 = (tmp_29 == null ? true : !(tmp_29 == null)) ? tmp_29 : THROW_CCE();
          $composer_6.endReplaceableGroup_ern0ak_k$();
          tmp_26 = tmp0_4;
        }
        var decoratedLeading = tmp_26;
        var trailingIconColor = $colors.trailingIconColor$composable_w4yizz_k$($enabled._v, $isError._v, $interactionSource, $composer_0, 14 & $$dirty1 >> 6 | 112 & $$dirty1 >> 6 | 896 & $$dirty1 >> 6 | 7168 & $$dirty1 >> 9).get_value_j01efc_k$().value_1;
        var tmp2_safe_receiver = $trailingIcon._v;
        var tmp_30;
        if (tmp2_safe_receiver == null) {
          tmp_30 = null;
        } else {
          // Inline function 'kotlin.let' call
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous>.<anonymous>' call
          // Inline function 'kotlin.run' call
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous>.<anonymous>.<anonymous>' call
          var tmp_31 = $composer_0;
          var dispatchReceiver_4 = composableLambda(tmp_31, 2077796155, true, CommonDecorationBox$composable$lambda$lambda_5(trailingIconColor, tmp2_safe_receiver));
          // Inline function 'androidx.compose.runtime.remember$composable' call
          var $composer_7 = $composer_0;
          $composer_7.startReplaceableGroup_ip860b_k$(-838505973);
          sourceInformation($composer_7, 'CC(remember$composable)P(1):Composables.kt#9igjgp');
          // Inline function 'androidx.compose.runtime.cache' call
          var invalid_5 = $composer_7.changed_ga7h3f_k$(dispatchReceiver_4);
          // Inline function 'kotlin.let' call
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
          var it_5 = $composer_7.rememberedValue_4dg93v_k$();
          var tmp_32;
          if (invalid_5 ? true : it_5 === Companion_getInstance_2().get_Empty_i9b85g_k$()) {
            // Inline function 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous>' call
            var value_5 = ComposableLambda$invoke$ref_10(dispatchReceiver_4);
            $composer_7.updateRememberedValue_l1wh71_k$(value_5);
            tmp_32 = value_5;
          } else {
            tmp_32 = it_5;
          }
          var tmp_33 = tmp_32;
          var tmp0_5 = (tmp_33 == null ? true : !(tmp_33 == null)) ? tmp_33 : THROW_CCE();
          $composer_7.endReplaceableGroup_ern0ak_k$();
          tmp_30 = tmp0_5;
        }
        var decoratedTrailing = tmp_30;
        var supportingTextColor = $colors.supportingTextColor$composable_4ozvg_k$($enabled._v, $isError._v, $interactionSource, $composer_0, 14 & $$dirty1 >> 6 | 112 & $$dirty1 >> 6 | 896 & $$dirty1 >> 6 | 7168 & $$dirty1 >> 9).get_value_j01efc_k$().value_1;
        var tmp3_safe_receiver = $supportingText._v;
        var tmp_34;
        if (tmp3_safe_receiver == null) {
          tmp_34 = null;
        } else {
          // Inline function 'kotlin.let' call
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous>.<anonymous>' call
          // Inline function 'kotlin.run' call
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous>.<anonymous>.<anonymous>' call
          var tmp_35 = $composer_0;
          var dispatchReceiver_5 = composableLambda(tmp_35, -1531019900, true, CommonDecorationBox$composable$lambda$lambda_6(supportingTextColor, $bodySmall, tmp3_safe_receiver));
          // Inline function 'androidx.compose.runtime.remember$composable' call
          var $composer_8 = $composer_0;
          $composer_8.startReplaceableGroup_ip860b_k$(-838505973);
          sourceInformation($composer_8, 'CC(remember$composable)P(1):Composables.kt#9igjgp');
          // Inline function 'androidx.compose.runtime.cache' call
          var invalid_6 = $composer_8.changed_ga7h3f_k$(dispatchReceiver_5);
          // Inline function 'kotlin.let' call
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
          var it_6 = $composer_8.rememberedValue_4dg93v_k$();
          var tmp_36;
          if (invalid_6 ? true : it_6 === Companion_getInstance_2().get_Empty_i9b85g_k$()) {
            // Inline function 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous>' call
            var value_6 = ComposableLambda$invoke$ref_11(dispatchReceiver_5);
            $composer_8.updateRememberedValue_l1wh71_k$(value_6);
            tmp_36 = value_6;
          } else {
            tmp_36 = it_6;
          }
          var tmp_37 = tmp_36;
          var tmp0_6 = (tmp_37 == null ? true : !(tmp_37 == null)) ? tmp_37 : THROW_CCE();
          $composer_8.endReplaceableGroup_ern0ak_k$();
          tmp_34 = tmp0_6;
        }
        var decoratedSupporting = tmp_34;
        switch ($type.get_ordinal_ip24qg_k$()) {
          case 0:
            $composer_0.startReplaceableGroup_ip860b_k$(1279439980);
            sourceInformation($composer_0, '211@8928L680');
            // Inline function 'kotlin.run' call

            // Inline function 'kotlin.contracts.contract' call

            // Inline function 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous>.<anonymous>' call

            var tmp_38 = $composer_0;
            var dispatchReceiver_6 = composableLambda(tmp_38, -2124779163, true, CommonDecorationBox$composable$lambda$lambda_7($container, $$dirty1));
            // Inline function 'androidx.compose.runtime.remember$composable' call

            var $composer_9 = $composer_0;
            $composer_9.startReplaceableGroup_ip860b_k$(-838505973);
            sourceInformation($composer_9, 'CC(remember$composable)P(1):Composables.kt#9igjgp');
            // Inline function 'androidx.compose.runtime.cache' call

            var invalid_7 = $composer_9.changed_ga7h3f_k$(dispatchReceiver_6);
            // Inline function 'kotlin.let' call

            // Inline function 'kotlin.contracts.contract' call

            // Inline function 'androidx.compose.runtime.cache.<anonymous>' call

            var it_7 = $composer_9.rememberedValue_4dg93v_k$();
            var tmp_39;
            if (invalid_7 ? true : it_7 === Companion_getInstance_2().get_Empty_i9b85g_k$()) {
              // Inline function 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous>.<anonymous>.<anonymous>' call
              var value_7 = ComposableLambda$invoke$ref_12(dispatchReceiver_6);
              $composer_9.updateRememberedValue_l1wh71_k$(value_7);
              tmp_39 = value_7;
            } else {
              tmp_39 = it_7;
            }

            var tmp_40 = tmp_39;
            var tmp0_7 = (tmp_40 == null ? true : !(tmp_40 == null)) ? tmp_40 : THROW_CCE();
            $composer_9.endReplaceableGroup_ern0ak_k$();
            var containerWithId = tmp0_7;
            TextFieldLayout$composable(decorationBoxModifier, $innerTextField, decoratedLabel, decoratedPlaceholder, decoratedLeading, decoratedTrailing, decoratedPrefix, decoratedSuffix, $singleLine._v, labelProgress, containerWithId, decoratedSupporting, $contentPadding, $composer_0, 112 & $$dirty >> 3 | 234881024 & $$dirty1 << 21 | 1879048192 & $dirty << 27, 6 | 896 & $$dirty1 >> 9);
            $composer_0.endReplaceableGroup_ern0ak_k$();
            break;
          case 1:
            $composer_0.startReplaceableGroup_ip860b_k$(1279440986);
            sourceInformation($composer_0, '229@9730L38,252@10751L420,241@10197L1154');
            // Inline function 'androidx.compose.runtime.remember$composable' call

            var $composer_10 = $composer_0;
            $composer_10.startReplaceableGroup_ip860b_k$(547886695);
            sourceInformation($composer_10, 'CC(remember$composable):Composables.kt#9igjgp');
            // Inline function 'androidx.compose.runtime.cache' call

            // Inline function 'kotlin.let' call

            // Inline function 'kotlin.contracts.contract' call

            // Inline function 'androidx.compose.runtime.cache.<anonymous>' call

            var it_8 = $composer_10.rememberedValue_4dg93v_k$();
            var tmp_41;
            if (false ? true : it_8 === Companion_getInstance_2().get_Empty_i9b85g_k$()) {
              // Inline function 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous>.<anonymous>' call
              var value_8 = mutableStateOf(new Size_0(Companion_getInstance_9().get_Zero_rugywl_k$()));
              $composer_10.updateRememberedValue_l1wh71_k$(value_8);
              tmp_41 = value_8;
            } else {
              tmp_41 = it_8;
            }

            var tmp_42 = tmp_41;
            var tmp0_8 = (tmp_42 == null ? true : !(tmp_42 == null)) ? tmp_42 : THROW_CCE();
            $composer_10.endReplaceableGroup_ern0ak_k$();
            var labelSize = tmp0_8;
            // Inline function 'kotlin.run' call

            // Inline function 'kotlin.contracts.contract' call

            // Inline function 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous>.<anonymous>' call

            var tmp_43 = $composer_0;
            var dispatchReceiver_7 = composableLambda(tmp_43, 1902535592, true, CommonDecorationBox$composable$lambda$lambda_8(labelSize, $contentPadding, $container, $$dirty1));
            // Inline function 'androidx.compose.runtime.remember$composable' call

            var $composer_11 = $composer_0;
            $composer_11.startReplaceableGroup_ip860b_k$(-838505973);
            sourceInformation($composer_11, 'CC(remember$composable)P(1):Composables.kt#9igjgp');
            // Inline function 'androidx.compose.runtime.cache' call

            var invalid_8 = $composer_11.changed_ga7h3f_k$(dispatchReceiver_7);
            // Inline function 'kotlin.let' call

            // Inline function 'kotlin.contracts.contract' call

            // Inline function 'androidx.compose.runtime.cache.<anonymous>' call

            var it_9 = $composer_11.rememberedValue_4dg93v_k$();
            var tmp_44;
            if (invalid_8 ? true : it_9 === Companion_getInstance_2().get_Empty_i9b85g_k$()) {
              // Inline function 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous>.<anonymous>.<anonymous>' call
              var value_9 = ComposableLambda$invoke$ref_13(dispatchReceiver_7);
              $composer_11.updateRememberedValue_l1wh71_k$(value_9);
              tmp_44 = value_9;
            } else {
              tmp_44 = it_9;
            }

            var tmp_45 = tmp_44;
            var tmp0_9 = (tmp_45 == null ? true : !(tmp_45 == null)) ? tmp_45 : THROW_CCE();
            $composer_11.endReplaceableGroup_ern0ak_k$();
            var borderContainerWithId = tmp0_9;
            var tmp_46 = $singleLine._v;
            // Inline function 'androidx.compose.runtime.remember$composable' call

            var $composer_12 = $composer_0;
            $composer_12.startReplaceableGroup_ip860b_k$(-1124426577);
            sourceInformation($composer_12, 'CC(remember$composable)P(1,2):Composables.kt#9igjgp');
            // Inline function 'androidx.compose.runtime.cache' call

            var invalid_9 = !!($composer_12.changed_ga7h3f_k$(labelProgress) | $composer_12.changed_ga7h3f_k$(labelSize));
            // Inline function 'kotlin.let' call

            // Inline function 'kotlin.contracts.contract' call

            // Inline function 'androidx.compose.runtime.cache.<anonymous>' call

            var it_10 = $composer_12.rememberedValue_4dg93v_k$();
            var tmp_47;
            if (invalid_9 ? true : it_10 === Companion_getInstance_2().get_Empty_i9b85g_k$()) {
              // Inline function 'androidx.compose.material3.CommonDecorationBox$composable.<anonymous>.<anonymous>.<anonymous>' call
              var value_10 = CommonDecorationBox$composable$lambda$lambda_9(labelProgress, labelSize);
              $composer_12.updateRememberedValue_l1wh71_k$(value_10);
              tmp_47 = value_10;
            } else {
              tmp_47 = it_10;
            }

            var tmp_48 = tmp_47;
            var tmp0_10 = (tmp_48 == null ? true : !(tmp_48 == null)) ? tmp_48 : THROW_CCE();
            $composer_12.endReplaceableGroup_ern0ak_k$();
            OutlinedTextFieldLayout$composable(decorationBoxModifier, $innerTextField, decoratedPlaceholder, decoratedLabel, decoratedLeading, decoratedTrailing, decoratedPrefix, decoratedSuffix, tmp_46, labelProgress, tmp0_10, borderContainerWithId, decoratedSupporting, $contentPadding, $composer_0, 112 & $$dirty >> 3 | 234881024 & $$dirty1 << 21 | 1879048192 & $dirty << 27, 48 | 7168 & $$dirty1 >> 6);
            $composer_0.endReplaceableGroup_ern0ak_k$();
            break;
          default:
            $composer_0.startReplaceableGroup_ip860b_k$(1279442700);
            $composer_0.endReplaceableGroup_ern0ak_k$();
            break;
        }
        var tmp_49;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_49 = Unit_getInstance();
        }
        tmp_4 = tmp_49;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp_4 = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_14($boundThis) {
    return function (p0, p1, p2, p3, p4, p5, p6) {
      return $boundThis.invoke_dqornx_k$(p0, p1, p2, p3, p4, p5, p6);
    };
  }
  function CommonDecorationBox$composable$lambda_1($type, $value, $innerTextField, $visualTransformation, $label, $placeholder, $leadingIcon, $trailingIcon, $prefix, $suffix, $supportingText, $singleLine, $enabled, $isError, $interactionSource, $contentPadding, $colors, $container, $$changed, $$changed1, $$default) {
    return function ($composer, $force) {
      CommonDecorationBox$composable($type, $value, $innerTextField, $visualTransformation, $label, $placeholder._v, $leadingIcon._v, $trailingIcon._v, $prefix._v, $suffix._v, $supportingText._v, $singleLine._v, $enabled._v, $isError._v, $interactionSource, $contentPadding, $colors, $container, $composer, updateChangedFlags($$changed | 1), updateChangedFlags($$changed1), $$default);
      return Unit_getInstance();
    };
  }
  function Decoration$composable$lambda($contentColor, $content, $$dirty) {
    return function ($composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C280@11674L118:TextFieldImpl.kt#uh7d8r');
      var tmp;
      if (!(($changed & 11) === 2) ? true : !$composer_0.get_skipping_3owdve_k$()) {
        if (isTraceInProgress()) {
          traceEventStart(1449369305, $changed, -1, 'androidx.compose.material3.Decoration$composable.<anonymous> (TextFieldImpl.kt:279)');
        }
        CompositionLocalProvider$composable([get_LocalContentColor().provides_3agxel_k$(new Color($contentColor))], $content, $composer_0, 112 & $$dirty >> 3);
        var tmp_0;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_0 = Unit_getInstance();
        }
        tmp = tmp_0;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_15($boundThis) {
    return function (p0, p1) {
      return $boundThis.invoke_z8di7s_k$(p0, p1);
    };
  }
  function Decoration$composable$lambda_0($contentColor, $typography, $content, $$changed, $$default) {
    return function ($composer, $force) {
      Decoration$composable($contentColor, $typography._v, $content, $composer, updateChangedFlags($$changed | 1), $$default);
      return Unit_getInstance();
    };
  }
  function TextFieldType_Filled_getInstance() {
    TextFieldType_initEntries();
    return TextFieldType_Filled_instance;
  }
  function TextFieldType_Outlined_getInstance() {
    TextFieldType_initEntries();
    return TextFieldType_Outlined_instance;
  }
  function InputPhase_Focused_getInstance() {
    InputPhase_initEntries();
    return InputPhase_Focused_instance;
  }
  function InputPhase_UnfocusedEmpty_getInstance() {
    InputPhase_initEntries();
    return InputPhase_UnfocusedEmpty_instance;
  }
  function InputPhase_UnfocusedNotEmpty_getInstance() {
    InputPhase_initEntries();
    return InputPhase_UnfocusedNotEmpty_instance;
  }
  var properties_initialized_TextFieldImpl_kt_by5wbh;
  function _init_properties_TextFieldImpl_kt__7vp9id() {
    if (!properties_initialized_TextFieldImpl_kt_by5wbh) {
      properties_initialized_TextFieldImpl_kt_by5wbh = true;
      ZeroConstraints = Constraints(0, 0, 0, 0);
      // Inline function 'androidx.compose.ui.unit.dp' call
      TextFieldPadding = _Dp___init__impl__ms3zkb(16);
      // Inline function 'androidx.compose.ui.unit.dp' call
      HorizontalIconPadding = _Dp___init__impl__ms3zkb(12);
      // Inline function 'androidx.compose.ui.unit.dp' call
      SupportingTopPadding = _Dp___init__impl__ms3zkb(4);
      // Inline function 'androidx.compose.ui.unit.dp' call
      PrefixSuffixTextPadding = _Dp___init__impl__ms3zkb(2);
      // Inline function 'androidx.compose.ui.unit.dp' call
      MinTextLineHeight = _Dp___init__impl__ms3zkb(24);
      // Inline function 'androidx.compose.ui.unit.dp' call
      MinFocusedLabelLineHeight = _Dp___init__impl__ms3zkb(16);
      // Inline function 'androidx.compose.ui.unit.dp' call
      MinSupportingTextLineHeight = _Dp___init__impl__ms3zkb(16);
      var tmp = Companion_getInstance_1();
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp_0 = _Dp___init__impl__ms3zkb(48);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$1 = _Dp___init__impl__ms3zkb(48);
      IconDefaultSizeModifier = defaultMinSize(tmp, tmp_0, tmp$ret$1);
    }
  }
  function get_OuterCircleSizeRadius() {
    _init_properties_TimePicker_kt__s14w0r();
    return OuterCircleSizeRadius;
  }
  var OuterCircleSizeRadius;
  function get_InnerCircleRadius() {
    _init_properties_TimePicker_kt__s14w0r();
    return InnerCircleRadius;
  }
  var InnerCircleRadius;
  function get_ClockDisplayBottomMargin() {
    _init_properties_TimePicker_kt__s14w0r();
    return ClockDisplayBottomMargin;
  }
  var ClockDisplayBottomMargin;
  function get_ClockFaceBottomMargin() {
    _init_properties_TimePicker_kt__s14w0r();
    return ClockFaceBottomMargin;
  }
  var ClockFaceBottomMargin;
  function get_DisplaySeparatorWidth() {
    _init_properties_TimePicker_kt__s14w0r();
    return DisplaySeparatorWidth;
  }
  var DisplaySeparatorWidth;
  function get_SupportLabelTop() {
    _init_properties_TimePicker_kt__s14w0r();
    return SupportLabelTop;
  }
  var SupportLabelTop;
  function get_TimeInputBottomPadding() {
    _init_properties_TimePicker_kt__s14w0r();
    return TimeInputBottomPadding;
  }
  var TimeInputBottomPadding;
  function get_MaxDistance() {
    _init_properties_TimePicker_kt__s14w0r();
    return MaxDistance;
  }
  var MaxDistance;
  function get_MinimumInteractiveSize() {
    _init_properties_TimePicker_kt__s14w0r();
    return MinimumInteractiveSize;
  }
  var MinimumInteractiveSize;
  function get_Minutes() {
    _init_properties_TimePicker_kt__s14w0r();
    return Minutes;
  }
  var Minutes;
  function get_Hours() {
    _init_properties_TimePicker_kt__s14w0r();
    return Hours;
  }
  var Hours;
  function get_ExtraHours() {
    _init_properties_TimePicker_kt__s14w0r();
    return ExtraHours;
  }
  var ExtraHours;
  function get_PeriodToggleMargin() {
    _init_properties_TimePicker_kt__s14w0r();
    return PeriodToggleMargin;
  }
  var PeriodToggleMargin;
  var properties_initialized_TimePicker_kt_dzv7h9;
  function _init_properties_TimePicker_kt__s14w0r() {
    if (!properties_initialized_TimePicker_kt_dzv7h9) {
      properties_initialized_TimePicker_kt_dzv7h9 = true;
      // Inline function 'androidx.compose.ui.unit.dp' call
      OuterCircleSizeRadius = _Dp___init__impl__ms3zkb(101);
      // Inline function 'androidx.compose.ui.unit.dp' call
      InnerCircleRadius = _Dp___init__impl__ms3zkb(69);
      // Inline function 'androidx.compose.ui.unit.dp' call
      ClockDisplayBottomMargin = _Dp___init__impl__ms3zkb(36);
      // Inline function 'androidx.compose.ui.unit.dp' call
      ClockFaceBottomMargin = _Dp___init__impl__ms3zkb(24);
      // Inline function 'androidx.compose.ui.unit.dp' call
      DisplaySeparatorWidth = _Dp___init__impl__ms3zkb(24);
      // Inline function 'androidx.compose.ui.unit.dp' call
      SupportLabelTop = _Dp___init__impl__ms3zkb(7);
      // Inline function 'androidx.compose.ui.unit.dp' call
      TimeInputBottomPadding = _Dp___init__impl__ms3zkb(24);
      // Inline function 'androidx.compose.ui.unit.dp' call
      MaxDistance = _Dp___init__impl__ms3zkb(74);
      // Inline function 'androidx.compose.ui.unit.dp' call
      MinimumInteractiveSize = _Dp___init__impl__ms3zkb(48);
      Minutes = listOf([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);
      Hours = listOf([12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
      // Inline function 'kotlin.collections.map' call
      var this_0 = get_Hours();
      // Inline function 'kotlin.collections.mapTo' call
      var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_0, 10));
      var tmp0_iterator = this_0.iterator_jk1svi_k$();
      while (tmp0_iterator.hasNext_bitz1p_k$()) {
        var item = tmp0_iterator.next_20eer_k$();
        // Inline function 'androidx.compose.material3.ExtraHours.<anonymous>' call
        var tmp$ret$0 = (item % 12 | 0) + 12 | 0;
        destination.add_utx5q5_k$(tmp$ret$0);
      }
      ExtraHours = destination;
      // Inline function 'androidx.compose.ui.unit.dp' call
      PeriodToggleMargin = _Dp___init__impl__ms3zkb(12);
    }
  }
  function get_BaselineTonalPalette() {
    _init_properties_TonalPalette_kt__piztod();
    return BaselineTonalPalette;
  }
  var BaselineTonalPalette;
  function TonalPalette(neutral100, neutral99, neutral95, neutral90, neutral80, neutral70, neutral60, neutral50, neutral40, neutral30, neutral20, neutral10, neutral0, neutralVariant100, neutralVariant99, neutralVariant95, neutralVariant90, neutralVariant80, neutralVariant70, neutralVariant60, neutralVariant50, neutralVariant40, neutralVariant30, neutralVariant20, neutralVariant10, neutralVariant0, primary100, primary99, primary95, primary90, primary80, primary70, primary60, primary50, primary40, primary30, primary20, primary10, primary0, secondary100, secondary99, secondary95, secondary90, secondary80, secondary70, secondary60, secondary50, secondary40, secondary30, secondary20, secondary10, secondary0, tertiary100, tertiary99, tertiary95, tertiary90, tertiary80, tertiary70, tertiary60, tertiary50, tertiary40, tertiary30, tertiary20, tertiary10, tertiary0) {
    this.neutral100__1 = neutral100;
    this.neutral99__1 = neutral99;
    this.neutral95__1 = neutral95;
    this.neutral90__1 = neutral90;
    this.neutral80__1 = neutral80;
    this.neutral70__1 = neutral70;
    this.neutral60__1 = neutral60;
    this.neutral50__1 = neutral50;
    this.neutral40__1 = neutral40;
    this.neutral30__1 = neutral30;
    this.neutral20__1 = neutral20;
    this.neutral10__1 = neutral10;
    this.neutral0__1 = neutral0;
    this.neutralVariant100__1 = neutralVariant100;
    this.neutralVariant99__1 = neutralVariant99;
    this.neutralVariant95__1 = neutralVariant95;
    this.neutralVariant90__1 = neutralVariant90;
    this.neutralVariant80__1 = neutralVariant80;
    this.neutralVariant70__1 = neutralVariant70;
    this.neutralVariant60__1 = neutralVariant60;
    this.neutralVariant50__1 = neutralVariant50;
    this.neutralVariant40__1 = neutralVariant40;
    this.neutralVariant30__1 = neutralVariant30;
    this.neutralVariant20__1 = neutralVariant20;
    this.neutralVariant10__1 = neutralVariant10;
    this.neutralVariant0__1 = neutralVariant0;
    this.primary100__1 = primary100;
    this.primary99__1 = primary99;
    this.primary95__1 = primary95;
    this.primary90__1 = primary90;
    this.primary80__1 = primary80;
    this.primary70__1 = primary70;
    this.primary60__1 = primary60;
    this.primary50__1 = primary50;
    this.primary40__1 = primary40;
    this.primary30__1 = primary30;
    this.primary20__1 = primary20;
    this.primary10__1 = primary10;
    this.primary0__1 = primary0;
    this.secondary100__1 = secondary100;
    this.secondary99__1 = secondary99;
    this.secondary95__1 = secondary95;
    this.secondary90__1 = secondary90;
    this.secondary80__1 = secondary80;
    this.secondary70__1 = secondary70;
    this.secondary60__1 = secondary60;
    this.secondary50__1 = secondary50;
    this.secondary40__1 = secondary40;
    this.secondary30__1 = secondary30;
    this.secondary20__1 = secondary20;
    this.secondary10__1 = secondary10;
    this.secondary0__1 = secondary0;
    this.tertiary100__1 = tertiary100;
    this.tertiary99__1 = tertiary99;
    this.tertiary95__1 = tertiary95;
    this.tertiary90__1 = tertiary90;
    this.tertiary80__1 = tertiary80;
    this.tertiary70__1 = tertiary70;
    this.tertiary60__1 = tertiary60;
    this.tertiary50__1 = tertiary50;
    this.tertiary40__1 = tertiary40;
    this.tertiary30__1 = tertiary30;
    this.tertiary20__1 = tertiary20;
    this.tertiary10__1 = tertiary10;
    this.tertiary0__1 = tertiary0;
  }
  protoOf(TonalPalette).get_neutral100_5k6gw6_k$ = function () {
    return this.neutral100__1;
  };
  protoOf(TonalPalette).get_neutral99_4qikcl_k$ = function () {
    return this.neutral99__1;
  };
  protoOf(TonalPalette).get_neutral95_ue5fr5_k$ = function () {
    return this.neutral95__1;
  };
  protoOf(TonalPalette).get_neutral90_96uzj0_k$ = function () {
    return this.neutral90__1;
  };
  protoOf(TonalPalette).get_neutral80_mtkxib_k$ = function () {
    return this.neutral80__1;
  };
  protoOf(TonalPalette).get_neutral70_g737fi_k$ = function () {
    return this.neutral70__1;
  };
  protoOf(TonalPalette).get_neutral60_ftcplt_k$ = function () {
    return this.neutral60__1;
  };
  protoOf(TonalPalette).get_neutral50_n7bfc0_k$ = function () {
    return this.neutral50__1;
  };
  protoOf(TonalPalette).get_neutral40_8t4hpb_k$ = function () {
    return this.neutral40__1;
  };
  protoOf(TonalPalette).get_neutral30_u7jn8i_k$ = function () {
    return this.neutral30__1;
  };
  protoOf(TonalPalette).get_neutral20_1sw9st_k$ = function () {
    return this.neutral20__1;
  };
  protoOf(TonalPalette).get_neutral10_xtc6u4_k$ = function () {
    return this.neutral10__1;
  };
  protoOf(TonalPalette).get_neutral0_36ymjd_k$ = function () {
    return this.neutral0__1;
  };
  protoOf(TonalPalette).get_neutralVariant100_1i7v5_k$ = function () {
    return this.neutralVariant100__1;
  };
  protoOf(TonalPalette).get_neutralVariant99_c1oi6_k$ = function () {
    return this.neutralVariant99__1;
  };
  protoOf(TonalPalette).get_neutralVariant95_pzojwq_k$ = function () {
    return this.neutralVariant95__1;
  };
  protoOf(TonalPalette).get_neutralVariant90_4se3ol_k$ = function () {
    return this.neutralVariant90__1;
  };
  protoOf(TonalPalette).get_neutralVariant80_r81tcq_k$ = function () {
    return this.neutralVariant80__1;
  };
  protoOf(TonalPalette).get_neutralVariant70_bsmbl3_k$ = function () {
    return this.neutralVariant70__1;
  };
  protoOf(TonalPalette).get_neutralVariant60_k7tlg8_k$ = function () {
    return this.neutralVariant60__1;
  };
  protoOf(TonalPalette).get_neutralVariant50_isujhl_k$ = function () {
    return this.neutralVariant50__1;
  };
  protoOf(TonalPalette).get_neutralVariant40_d7ldjq_k$ = function () {
    return this.neutralVariant40__1;
  };
  protoOf(TonalPalette).get_neutralVariant30_pt2re3_k$ = function () {
    return this.neutralVariant30__1;
  };
  protoOf(TonalPalette).get_neutralVariant20_67d5n8_k$ = function () {
    return this.neutralVariant20__1;
  };
  protoOf(TonalPalette).get_neutralVariant10_wtazal_k$ = function () {
    return this.neutralVariant10__1;
  };
  protoOf(TonalPalette).get_neutralVariant0_qqhjyo_k$ = function () {
    return this.neutralVariant0__1;
  };
  protoOf(TonalPalette).get_primary100_htpbb3_k$ = function () {
    return this.primary100__1;
  };
  protoOf(TonalPalette).get_primary99_5yrijk_k$ = function () {
    return this.primary99__1;
  };
  protoOf(TonalPalette).get_primary95_jovcv0_k$ = function () {
    return this.primary95__1;
  };
  protoOf(TonalPalette).get_primary90_1if3d5_k$ = function () {
    return this.primary90__1;
  };
  protoOf(TonalPalette).get_primary80_xiv0eg_k$ = function () {
    return this.primary80__1;
  };
  protoOf(TonalPalette).get_primary70_5ht4jd_k$ = function () {
    return this.primary70__1;
  };
  protoOf(TonalPalette).get_primary60_qimshy_k$ = function () {
    return this.primary60__1;
  };
  protoOf(TonalPalette).get_primary50_ci1cfv_k$ = function () {
    return this.primary50__1;
  };
  protoOf(TonalPalette).get_primary40_jieklg_k$ = function () {
    return this.primary40__1;
  };
  protoOf(TonalPalette).get_primary30_ji9kcd_k$ = function () {
    return this.primary30__1;
  };
  protoOf(TonalPalette).get_primary20_ci6coy_k$ = function () {
    return this.primary20__1;
  };
  protoOf(TonalPalette).get_primary10_qihs8v_k$ = function () {
    return this.primary10__1;
  };
  protoOf(TonalPalette).get_primary0_8lwjoi_k$ = function () {
    return this.primary0__1;
  };
  protoOf(TonalPalette).get_secondary100_l02myb_k$ = function () {
    return this.secondary100__1;
  };
  protoOf(TonalPalette).get_secondary99_1y3glu_k$ = function () {
    return this.secondary99__1;
  };
  protoOf(TonalPalette).get_secondary95_rlqc0e_k$ = function () {
    return this.secondary95__1;
  };
  protoOf(TonalPalette).get_secondary90_6efvs9_k$ = function () {
    return this.secondary90__1;
  };
  protoOf(TonalPalette).get_secondary80_pm0192_k$ = function () {
    return this.secondary80__1;
  };
  protoOf(TonalPalette).get_secondary70_deo3or_k$ = function () {
    return this.secondary70__1;
  };
  protoOf(TonalPalette).get_secondary60_ilrtck_k$ = function () {
    return this.secondary60__1;
  };
  protoOf(TonalPalette).get_secondary50_kewbl9_k$ = function () {
    return this.secondary50__1;
  };
  protoOf(TonalPalette).get_secondary40_bljlg2_k$ = function () {
    return this.secondary40__1;
  };
  protoOf(TonalPalette).get_secondary30_rf4jhr_k$ = function () {
    return this.secondary30__1;
  };
  protoOf(TonalPalette).get_secondary20_4lbdjk_k$ = function () {
    return this.secondary20__1;
  };
  protoOf(TonalPalette).get_secondary10_yfcre9_k$ = function () {
    return this.secondary10__1;
  };
  protoOf(TonalPalette).get_secondary0_cxouac_k$ = function () {
    return this.secondary0__1;
  };
  protoOf(TonalPalette).get_tertiary100_kjf0n7_k$ = function () {
    return this.tertiary100__1;
  };
  protoOf(TonalPalette).get_tertiary99_kaj7du_k$ = function () {
    return this.tertiary99__1;
  };
  protoOf(TonalPalette).get_tertiary95_p2xz6q_k$ = function () {
    return this.tertiary95__1;
  };
  protoOf(TonalPalette).get_tertiary90_oqvmk9_k$ = function () {
    return this.tertiary90__1;
  };
  protoOf(TonalPalette).get_tertiary80_79kah2_k$ = function () {
    return this.tertiary80__1;
  };
  protoOf(TonalPalette).get_tertiary70_vr3ugr_k$ = function () {
    return this.tertiary70__1;
  };
  protoOf(TonalPalette).get_tertiary60_9c2kk_k$ = function () {
    return this.tertiary60__1;
  };
  protoOf(TonalPalette).get_tertiary50_w9rzlv_k$ = function () {
    return this.tertiary50__1;
  };
  protoOf(TonalPalette).get_tertiary40_6qw5by_k$ = function () {
    return this.tertiary40__1;
  };
  protoOf(TonalPalette).get_tertiary30_p9jrpd_k$ = function () {
    return this.tertiary30__1;
  };
  protoOf(TonalPalette).get_tertiary20_dr4d8g_k$ = function () {
    return this.tertiary20__1;
  };
  protoOf(TonalPalette).get_tertiary10_i9bjsv_k$ = function () {
    return this.tertiary10__1;
  };
  protoOf(TonalPalette).get_tertiary0_xhd4d8_k$ = function () {
    return this.tertiary0__1;
  };
  var properties_initialized_TonalPalette_kt_vxlo3l;
  function _init_properties_TonalPalette_kt__piztod() {
    if (!properties_initialized_TonalPalette_kt_vxlo3l) {
      properties_initialized_TonalPalette_kt_vxlo3l = true;
      BaselineTonalPalette = new TonalPalette(PaletteTokens_getInstance().get_Neutral100_9o0e06_k$(), PaletteTokens_getInstance().get_Neutral99_kn5qp1_k$(), PaletteTokens_getInstance().get_Neutral95_oqbfvj_k$(), PaletteTokens_getInstance().get_Neutral90_p3i5vg_k$(), PaletteTokens_getInstance().get_Neutral80_6wxr5v_k$(), PaletteTokens_getInstance().get_Neutral70_w3qdry_k$(), PaletteTokens_getInstance().get_Neutral60_3agqn_k$(), PaletteTokens_getInstance().get_Neutral50_vx5gao_k$(), PaletteTokens_getInstance().get_Neutral40_73ion5_k$(), PaletteTokens_getInstance().get_Neutral30_owx8e6_k$(), PaletteTokens_getInstance().get_Neutral20_e3qwjn_k$(), PaletteTokens_getInstance().get_Neutral10_hwp0ho_k$(), PaletteTokens_getInstance().get_Neutral0_j7fvbb_k$(), PaletteTokens_getInstance().get_NeutralVariant100_asz19t_k$(), PaletteTokens_getInstance().get_NeutralVariant99_c4ze5q_k$(), PaletteTokens_getInstance().get_NeutralVariant95_x8hseu_k$(), PaletteTokens_getInstance().get_NeutralVariant90_glbtc5_k$(), PaletteTokens_getInstance().get_NeutralVariant80_ff43p6_k$(), PaletteTokens_getInstance().get_NeutralVariant70_nlk18n_k$(), PaletteTokens_getInstance().get_NeutralVariant60_8evvso_k$(), PaletteTokens_getInstance().get_NeutralVariant50_uls955_k$(), PaletteTokens_getInstance().get_NeutralVariant40_1ennw6_k$(), PaletteTokens_getInstance().get_NeutralVariant30_xf3kxh_k$(), PaletteTokens_getInstance().get_NeutralVariant20_5lkk0c_k$(), PaletteTokens_getInstance().get_NeutralVariant10_qevd0z_k$(), PaletteTokens_getInstance().get_NeutralVariant0_80vofk_k$(), PaletteTokens_getInstance().get_Primary100_dpve73_k$(), PaletteTokens_getInstance().get_Primary99_9xvnsw_k$(), PaletteTokens_getInstance().get_Primary95_zfliro_k$(), PaletteTokens_getInstance().get_Primary90_ee82zb_k$(), PaletteTokens_getInstance().get_Primary80_hm7u20_k$(), PaletteTokens_getInstance().get_Primary70_legavt_k$(), PaletteTokens_getInstance().get_Primary60_alzm5i_k$(), PaletteTokens_getInstance().get_Primary50_seoisb_k$(), PaletteTokens_getInstance().get_Primary40_3lre90_k$(), PaletteTokens_getInstance().get_Primary30_zewqot_k$(), PaletteTokens_getInstance().get_Primary20_3egtni_k$(), PaletteTokens_getInstance().get_Primary10_slz3dt_k$(), PaletteTokens_getInstance().get_Primary0_v0b1j6_k$(), PaletteTokens_getInstance().get_Secondary100_agjjvx_k$(), PaletteTokens_getInstance().get_Secondary99_gpk242_k$(), PaletteTokens_getInstance().get_Secondary95_snx4gi_k$(), PaletteTokens_getInstance().get_Secondary90_l5whah_k$(), PaletteTokens_getInstance().get_Secondary80_aujfqu_k$(), PaletteTokens_getInstance().get_Secondary70_s64p6z_k$(), PaletteTokens_getInstance().get_Secondary60_3ub7uc_k$(), PaletteTokens_getInstance().get_Secondary50_z6cx3h_k$(), PaletteTokens_getInstance().get_Secondary40_35x026_k$(), PaletteTokens_getInstance().get_Secondary30_suiwz5_k$(), PaletteTokens_getInstance().get_Secondary20_a657yo_k$(), PaletteTokens_getInstance().get_Secondary10_luap2n_k$(), PaletteTokens_getInstance().get_Secondary0_h1irec_k$(), PaletteTokens_getInstance().get_Tertiary100_5ryf4z_k$(), PaletteTokens_getInstance().get_Tertiary99_g6pa9u_k$(), PaletteTokens_getInstance().get_Tertiary95_t6rwaq_k$(), PaletteTokens_getInstance().get_Tertiary90_kn1pg9_k$(), PaletteTokens_getInstance().get_Tertiary80_bde7l2_k$(), PaletteTokens_getInstance().get_Tertiary70_rn9xcr_k$(), PaletteTokens_getInstance().get_Tertiary60_4d5zok_k$(), PaletteTokens_getInstance().get_Tertiary50_yni599_k$(), PaletteTokens_getInstance().get_Tertiary40_2n287y_k$(), PaletteTokens_getInstance().get_Tertiary30_tddotd_k$(), PaletteTokens_getInstance().get_Tertiary20_9nag4g_k$(), PaletteTokens_getInstance().get_Tertiary10_md5gwv_k$(), PaletteTokens_getInstance().get_Tertiary0_ln3r9g_k$());
    }
  }
  function get_TooltipAnchorPadding() {
    _init_properties_Tooltip_kt__palx2n();
    return TooltipAnchorPadding;
  }
  var TooltipAnchorPadding;
  function get_TooltipMinHeight() {
    _init_properties_Tooltip_kt__palx2n();
    return TooltipMinHeight;
  }
  var TooltipMinHeight;
  function get_TooltipMinWidth() {
    _init_properties_Tooltip_kt__palx2n();
    return TooltipMinWidth;
  }
  var TooltipMinWidth;
  function get_PlainTooltipMaxWidth() {
    _init_properties_Tooltip_kt__palx2n();
    return PlainTooltipMaxWidth;
  }
  var PlainTooltipMaxWidth;
  function get_PlainTooltipVerticalPadding() {
    _init_properties_Tooltip_kt__palx2n();
    return PlainTooltipVerticalPadding;
  }
  var PlainTooltipVerticalPadding;
  function get_PlainTooltipHorizontalPadding() {
    _init_properties_Tooltip_kt__palx2n();
    return PlainTooltipHorizontalPadding;
  }
  var PlainTooltipHorizontalPadding;
  function get_PlainTooltipContentPadding() {
    _init_properties_Tooltip_kt__palx2n();
    return PlainTooltipContentPadding;
  }
  var PlainTooltipContentPadding;
  function get_RichTooltipMaxWidth() {
    _init_properties_Tooltip_kt__palx2n();
    return RichTooltipMaxWidth;
  }
  var RichTooltipMaxWidth;
  function get_RichTooltipHorizontalPadding() {
    _init_properties_Tooltip_kt__palx2n();
    return RichTooltipHorizontalPadding;
  }
  var RichTooltipHorizontalPadding;
  function get_HeightToSubheadFirstLine() {
    _init_properties_Tooltip_kt__palx2n();
    return HeightToSubheadFirstLine;
  }
  var HeightToSubheadFirstLine;
  function get_HeightFromSubheadToTextFirstLine() {
    _init_properties_Tooltip_kt__palx2n();
    return HeightFromSubheadToTextFirstLine;
  }
  var HeightFromSubheadToTextFirstLine;
  function get_TextBottomPadding() {
    _init_properties_Tooltip_kt__palx2n();
    return TextBottomPadding;
  }
  var TextBottomPadding;
  function get_ActionLabelMinHeight() {
    _init_properties_Tooltip_kt__palx2n();
    return ActionLabelMinHeight;
  }
  var ActionLabelMinHeight;
  function get_ActionLabelBottomPadding() {
    _init_properties_Tooltip_kt__palx2n();
    return ActionLabelBottomPadding;
  }
  var ActionLabelBottomPadding;
  var properties_initialized_Tooltip_kt_68t07n;
  function _init_properties_Tooltip_kt__palx2n() {
    if (!properties_initialized_Tooltip_kt_68t07n) {
      properties_initialized_Tooltip_kt_68t07n = true;
      // Inline function 'androidx.compose.ui.unit.dp' call
      TooltipAnchorPadding = _Dp___init__impl__ms3zkb(4);
      // Inline function 'androidx.compose.ui.unit.dp' call
      TooltipMinHeight = _Dp___init__impl__ms3zkb(24);
      // Inline function 'androidx.compose.ui.unit.dp' call
      TooltipMinWidth = _Dp___init__impl__ms3zkb(40);
      // Inline function 'androidx.compose.ui.unit.dp' call
      PlainTooltipMaxWidth = _Dp___init__impl__ms3zkb(200);
      // Inline function 'androidx.compose.ui.unit.dp' call
      PlainTooltipVerticalPadding = _Dp___init__impl__ms3zkb(4);
      // Inline function 'androidx.compose.ui.unit.dp' call
      PlainTooltipHorizontalPadding = _Dp___init__impl__ms3zkb(8);
      PlainTooltipContentPadding = PaddingValues_1(get_PlainTooltipHorizontalPadding(), get_PlainTooltipVerticalPadding());
      // Inline function 'androidx.compose.ui.unit.dp' call
      RichTooltipMaxWidth = _Dp___init__impl__ms3zkb(320);
      // Inline function 'androidx.compose.ui.unit.dp' call
      RichTooltipHorizontalPadding = _Dp___init__impl__ms3zkb(16);
      // Inline function 'androidx.compose.ui.unit.dp' call
      HeightToSubheadFirstLine = _Dp___init__impl__ms3zkb(28);
      // Inline function 'androidx.compose.ui.unit.dp' call
      HeightFromSubheadToTextFirstLine = _Dp___init__impl__ms3zkb(24);
      // Inline function 'androidx.compose.ui.unit.dp' call
      TextBottomPadding = _Dp___init__impl__ms3zkb(16);
      // Inline function 'androidx.compose.ui.unit.dp' call
      ActionLabelMinHeight = _Dp___init__impl__ms3zkb(36);
      // Inline function 'androidx.compose.ui.unit.dp' call
      ActionLabelBottomPadding = _Dp___init__impl__ms3zkb(8);
    }
  }
  function get_LocalTypography() {
    _init_properties_Typography_kt__rm3fch();
    return LocalTypography;
  }
  var LocalTypography;
  function get_$stableprop_8() {
    return 0;
  }
  function Typography(displayLarge, displayMedium, displaySmall, headlineLarge, headlineMedium, headlineSmall, titleLarge, titleMedium, titleSmall, bodyLarge, bodyMedium, bodySmall, labelLarge, labelMedium, labelSmall) {
    displayLarge = displayLarge === VOID ? TypographyTokens_getInstance().get_DisplayLarge_xob476_k$() : displayLarge;
    displayMedium = displayMedium === VOID ? TypographyTokens_getInstance().get_DisplayMedium_l04ak2_k$() : displayMedium;
    displaySmall = displaySmall === VOID ? TypographyTokens_getInstance().get_DisplaySmall_xsczpq_k$() : displaySmall;
    headlineLarge = headlineLarge === VOID ? TypographyTokens_getInstance().get_HeadlineLarge_y6x9c2_k$() : headlineLarge;
    headlineMedium = headlineMedium === VOID ? TypographyTokens_getInstance().get_HeadlineMedium_611p5e_k$() : headlineMedium;
    headlineSmall = headlineSmall === VOID ? TypographyTokens_getInstance().get_HeadlineSmall_y2vdti_k$() : headlineSmall;
    titleLarge = titleLarge === VOID ? TypographyTokens_getInstance().get_TitleLarge_gtzkic_k$() : titleLarge;
    titleMedium = titleMedium === VOID ? TypographyTokens_getInstance().get_TitleMedium_o2ud24_k$() : titleMedium;
    titleSmall = titleSmall === VOID ? TypographyTokens_getInstance().get_TitleSmall_gpxozs_k$() : titleSmall;
    bodyLarge = bodyLarge === VOID ? TypographyTokens_getInstance().get_BodyLarge_8y8s9c_k$() : bodyLarge;
    bodyMedium = bodyMedium === VOID ? TypographyTokens_getInstance().get_BodyMedium_75vsrk_k$() : bodyMedium;
    bodySmall = bodySmall === VOID ? TypographyTokens_getInstance().get_BodySmall_8u6wqs_k$() : bodySmall;
    labelLarge = labelLarge === VOID ? TypographyTokens_getInstance().get_LabelLarge_es8jw0_k$() : labelLarge;
    labelMedium = labelMedium === VOID ? TypographyTokens_getInstance().get_LabelMedium_vlovsw_k$() : labelMedium;
    labelSmall = labelSmall === VOID ? TypographyTokens_getInstance().get_LabelSmall_eo6odg_k$() : labelSmall;
    this.displayLarge_1 = displayLarge;
    this.displayMedium_1 = displayMedium;
    this.displaySmall_1 = displaySmall;
    this.headlineLarge_1 = headlineLarge;
    this.headlineMedium_1 = headlineMedium;
    this.headlineSmall_1 = headlineSmall;
    this.titleLarge_1 = titleLarge;
    this.titleMedium_1 = titleMedium;
    this.titleSmall_1 = titleSmall;
    this.bodyLarge_1 = bodyLarge;
    this.bodyMedium_1 = bodyMedium;
    this.bodySmall_1 = bodySmall;
    this.labelLarge_1 = labelLarge;
    this.labelMedium_1 = labelMedium;
    this.labelSmall_1 = labelSmall;
    this.$stable_1 = 0;
  }
  protoOf(Typography).get_displayLarge_uyh5uq_k$ = function () {
    return this.displayLarge_1;
  };
  protoOf(Typography).get_displayMedium_y7staq_k$ = function () {
    return this.displayMedium_1;
  };
  protoOf(Typography).get_displaySmall_v2j1da_k$ = function () {
    return this.displaySmall_1;
  };
  protoOf(Typography).get_headlineLarge_nmi9we_k$ = function () {
    return this.headlineLarge_1;
  };
  protoOf(Typography).get_headlineMedium_mllw1e_k$ = function () {
    return this.headlineMedium_1;
  };
  protoOf(Typography).get_headlineSmall_nqk5ey_k$ = function () {
    return this.headlineSmall_1;
  };
  protoOf(Typography).get_titleLarge_l89m4s_k$ = function () {
    return this.titleLarge_1;
  };
  protoOf(Typography).get_titleMedium_jd9h8k_k$ = function () {
    return this.titleMedium_1;
  };
  protoOf(Typography).get_titleSmall_lcbhnc_k$ = function () {
    return this.titleSmall_1;
  };
  protoOf(Typography).get_bodyLarge_sxra4w_k$ = function () {
    return this.bodyLarge_1;
  };
  protoOf(Typography).get_bodyMedium_psz2kg_k$ = function () {
    return this.bodyMedium_1;
  };
  protoOf(Typography).get_bodySmall_t1t5ng_k$ = function () {
    return this.bodySmall_1;
  };
  protoOf(Typography).get_labelLarge_na0mr4_k$ = function () {
    return this.labelLarge_1;
  };
  protoOf(Typography).get_labelMedium_bueyhs_k$ = function () {
    return this.labelMedium_1;
  };
  protoOf(Typography).get_labelSmall_ne2i9o_k$ = function () {
    return this.labelSmall_1;
  };
  protoOf(Typography).copy_jfuzuz_k$ = function (displayLarge, displayMedium, displaySmall, headlineLarge, headlineMedium, headlineSmall, titleLarge, titleMedium, titleSmall, bodyLarge, bodyMedium, bodySmall, labelLarge, labelMedium, labelSmall) {
    return new Typography(displayLarge, displayMedium, displaySmall, headlineLarge, headlineMedium, headlineSmall, titleLarge, titleMedium, titleSmall, bodyLarge, bodyMedium, bodySmall, labelLarge, labelMedium, labelSmall);
  };
  protoOf(Typography).copy$default_nt0ut9_k$ = function (displayLarge, displayMedium, displaySmall, headlineLarge, headlineMedium, headlineSmall, titleLarge, titleMedium, titleSmall, bodyLarge, bodyMedium, bodySmall, labelLarge, labelMedium, labelSmall, $super) {
    displayLarge = displayLarge === VOID ? this.displayLarge_1 : displayLarge;
    displayMedium = displayMedium === VOID ? this.displayMedium_1 : displayMedium;
    displaySmall = displaySmall === VOID ? this.displaySmall_1 : displaySmall;
    headlineLarge = headlineLarge === VOID ? this.headlineLarge_1 : headlineLarge;
    headlineMedium = headlineMedium === VOID ? this.headlineMedium_1 : headlineMedium;
    headlineSmall = headlineSmall === VOID ? this.headlineSmall_1 : headlineSmall;
    titleLarge = titleLarge === VOID ? this.titleLarge_1 : titleLarge;
    titleMedium = titleMedium === VOID ? this.titleMedium_1 : titleMedium;
    titleSmall = titleSmall === VOID ? this.titleSmall_1 : titleSmall;
    bodyLarge = bodyLarge === VOID ? this.bodyLarge_1 : bodyLarge;
    bodyMedium = bodyMedium === VOID ? this.bodyMedium_1 : bodyMedium;
    bodySmall = bodySmall === VOID ? this.bodySmall_1 : bodySmall;
    labelLarge = labelLarge === VOID ? this.labelLarge_1 : labelLarge;
    labelMedium = labelMedium === VOID ? this.labelMedium_1 : labelMedium;
    labelSmall = labelSmall === VOID ? this.labelSmall_1 : labelSmall;
    return $super === VOID ? this.copy_jfuzuz_k$(displayLarge, displayMedium, displaySmall, headlineLarge, headlineMedium, headlineSmall, titleLarge, titleMedium, titleSmall, bodyLarge, bodyMedium, bodySmall, labelLarge, labelMedium, labelSmall) : $super.copy_jfuzuz_k$.call(this, displayLarge, displayMedium, displaySmall, headlineLarge, headlineMedium, headlineSmall, titleLarge, titleMedium, titleSmall, bodyLarge, bodyMedium, bodySmall, labelLarge, labelMedium, labelSmall);
  };
  protoOf(Typography).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Typography))
      return false;
    if (!this.displayLarge_1.equals(other.displayLarge_1))
      return false;
    if (!this.displayMedium_1.equals(other.displayMedium_1))
      return false;
    if (!this.displaySmall_1.equals(other.displaySmall_1))
      return false;
    if (!this.headlineLarge_1.equals(other.headlineLarge_1))
      return false;
    if (!this.headlineMedium_1.equals(other.headlineMedium_1))
      return false;
    if (!this.headlineSmall_1.equals(other.headlineSmall_1))
      return false;
    if (!this.titleLarge_1.equals(other.titleLarge_1))
      return false;
    if (!this.titleMedium_1.equals(other.titleMedium_1))
      return false;
    if (!this.titleSmall_1.equals(other.titleSmall_1))
      return false;
    if (!this.bodyLarge_1.equals(other.bodyLarge_1))
      return false;
    if (!this.bodyMedium_1.equals(other.bodyMedium_1))
      return false;
    if (!this.bodySmall_1.equals(other.bodySmall_1))
      return false;
    if (!this.labelLarge_1.equals(other.labelLarge_1))
      return false;
    if (!this.labelMedium_1.equals(other.labelMedium_1))
      return false;
    if (!this.labelSmall_1.equals(other.labelSmall_1))
      return false;
    return true;
  };
  protoOf(Typography).hashCode = function () {
    var result = this.displayLarge_1.hashCode();
    result = imul(31, result) + this.displayMedium_1.hashCode() | 0;
    result = imul(31, result) + this.displaySmall_1.hashCode() | 0;
    result = imul(31, result) + this.headlineLarge_1.hashCode() | 0;
    result = imul(31, result) + this.headlineMedium_1.hashCode() | 0;
    result = imul(31, result) + this.headlineSmall_1.hashCode() | 0;
    result = imul(31, result) + this.titleLarge_1.hashCode() | 0;
    result = imul(31, result) + this.titleMedium_1.hashCode() | 0;
    result = imul(31, result) + this.titleSmall_1.hashCode() | 0;
    result = imul(31, result) + this.bodyLarge_1.hashCode() | 0;
    result = imul(31, result) + this.bodyMedium_1.hashCode() | 0;
    result = imul(31, result) + this.bodySmall_1.hashCode() | 0;
    result = imul(31, result) + this.labelLarge_1.hashCode() | 0;
    result = imul(31, result) + this.labelMedium_1.hashCode() | 0;
    result = imul(31, result) + this.labelSmall_1.hashCode() | 0;
    return result;
  };
  protoOf(Typography).toString = function () {
    return 'Typography(displayLarge=' + this.displayLarge_1 + ', displayMedium=' + this.displayMedium_1 + ',' + ('displaySmall=' + this.displaySmall_1 + ', ') + ('headlineLarge=' + this.headlineLarge_1 + ', headlineMedium=' + this.headlineMedium_1 + ',') + (' headlineSmall=' + this.headlineSmall_1 + ', ') + ('titleLarge=' + this.titleLarge_1 + ', titleMedium=' + this.titleMedium_1 + ', titleSmall=' + this.titleSmall_1 + ', ') + ('bodyLarge=' + this.bodyLarge_1 + ', bodyMedium=' + this.bodyMedium_1 + ', bodySmall=' + this.bodySmall_1 + ', ') + ('labelLarge=' + this.labelLarge_1 + ', labelMedium=' + this.labelMedium_1 + ', labelSmall=' + this.labelSmall_1 + ')');
  };
  function LocalTypography$lambda() {
    _init_properties_Typography_kt__rm3fch();
    return new Typography();
  }
  var properties_initialized_Typography_kt_bpd27j;
  function _init_properties_Typography_kt__rm3fch() {
    if (!properties_initialized_Typography_kt_bpd27j) {
      properties_initialized_Typography_kt_bpd27j = true;
      LocalTypography = staticCompositionLocalOf(LocalTypography$lambda);
    }
  }
  function CircularProgressIndicatorTokens() {
    CircularProgressIndicatorTokens_instance = this;
    this.ActiveIndicatorColor_1 = ColorSchemeKeyTokens_Primary_getInstance();
    this.ActiveShape_1 = ShapeKeyTokens_CornerNone_getInstance();
    var tmp = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp.ActiveIndicatorWidth_1 = _Dp___init__impl__ms3zkb(4.0);
    this.FourColorActiveIndicatorFourColor_1 = ColorSchemeKeyTokens_TertiaryContainer_getInstance();
    this.FourColorActiveIndicatorOneColor_1 = ColorSchemeKeyTokens_Primary_getInstance();
    this.FourColorActiveIndicatorThreeColor_1 = ColorSchemeKeyTokens_Tertiary_getInstance();
    this.FourColorActiveIndicatorTwoColor_1 = ColorSchemeKeyTokens_PrimaryContainer_getInstance();
    var tmp_0 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_0.Size_1 = _Dp___init__impl__ms3zkb(48.0);
  }
  protoOf(CircularProgressIndicatorTokens).get_ActiveIndicatorColor_qs91el_k$ = function () {
    return this.ActiveIndicatorColor_1;
  };
  protoOf(CircularProgressIndicatorTokens).get_ActiveShape_nwghiq_k$ = function () {
    return this.ActiveShape_1;
  };
  protoOf(CircularProgressIndicatorTokens).get_ActiveIndicatorWidth_9j3j1_k$ = function () {
    return this.ActiveIndicatorWidth_1;
  };
  protoOf(CircularProgressIndicatorTokens).get_FourColorActiveIndicatorFourColor_57qe8o_k$ = function () {
    return this.FourColorActiveIndicatorFourColor_1;
  };
  protoOf(CircularProgressIndicatorTokens).get_FourColorActiveIndicatorOneColor_ti63im_k$ = function () {
    return this.FourColorActiveIndicatorOneColor_1;
  };
  protoOf(CircularProgressIndicatorTokens).get_FourColorActiveIndicatorThreeColor_ocviuy_k$ = function () {
    return this.FourColorActiveIndicatorThreeColor_1;
  };
  protoOf(CircularProgressIndicatorTokens).get_FourColorActiveIndicatorTwoColor_woh65w_k$ = function () {
    return this.FourColorActiveIndicatorTwoColor_1;
  };
  protoOf(CircularProgressIndicatorTokens).get_Size_nmi75z_k$ = function () {
    return this.Size_1;
  };
  var CircularProgressIndicatorTokens_instance;
  function CircularProgressIndicatorTokens_getInstance() {
    if (CircularProgressIndicatorTokens_instance == null)
      new CircularProgressIndicatorTokens();
    return CircularProgressIndicatorTokens_instance;
  }
  function ColorLightTokens() {
    ColorLightTokens_instance = this;
    this.Background_1 = PaletteTokens_getInstance().get_Neutral99_kn5qp1_k$();
    this.Error_1 = PaletteTokens_getInstance().get_Error40_5envtq_k$();
    this.ErrorContainer_1 = PaletteTokens_getInstance().get_Error90_clblel_k$();
    this.InverseOnSurface_1 = PaletteTokens_getInstance().get_Neutral95_oqbfvj_k$();
    this.InversePrimary_1 = PaletteTokens_getInstance().get_Primary80_hm7u20_k$();
    this.InverseSurface_1 = PaletteTokens_getInstance().get_Neutral20_e3qwjn_k$();
    this.OnBackground_1 = PaletteTokens_getInstance().get_Neutral10_hwp0ho_k$();
    this.OnError_1 = PaletteTokens_getInstance().get_Error100_sv0bbt_k$();
    this.OnErrorContainer_1 = PaletteTokens_getInstance().get_Error10_uevkyj_k$();
    this.OnPrimary_1 = PaletteTokens_getInstance().get_Primary100_dpve73_k$();
    this.OnPrimaryContainer_1 = PaletteTokens_getInstance().get_Primary10_slz3dt_k$();
    this.OnSecondary_1 = PaletteTokens_getInstance().get_Secondary100_agjjvx_k$();
    this.OnSecondaryContainer_1 = PaletteTokens_getInstance().get_Secondary10_luap2n_k$();
    this.OnSurface_1 = PaletteTokens_getInstance().get_Neutral10_hwp0ho_k$();
    this.OnSurfaceVariant_1 = PaletteTokens_getInstance().get_NeutralVariant30_xf3kxh_k$();
    this.OnTertiary_1 = PaletteTokens_getInstance().get_Tertiary100_5ryf4z_k$();
    this.OnTertiaryContainer_1 = PaletteTokens_getInstance().get_Tertiary10_md5gwv_k$();
    this.Outline_1 = PaletteTokens_getInstance().get_NeutralVariant50_uls955_k$();
    this.OutlineVariant_1 = PaletteTokens_getInstance().get_NeutralVariant80_ff43p6_k$();
    this.Primary_1 = PaletteTokens_getInstance().get_Primary40_3lre90_k$();
    this.PrimaryContainer_1 = PaletteTokens_getInstance().get_Primary90_ee82zb_k$();
    this.Scrim_1 = PaletteTokens_getInstance().get_Neutral0_j7fvbb_k$();
    this.Secondary_1 = PaletteTokens_getInstance().get_Secondary40_35x026_k$();
    this.SecondaryContainer_1 = PaletteTokens_getInstance().get_Secondary90_l5whah_k$();
    this.Surface_1 = PaletteTokens_getInstance().get_Neutral99_kn5qp1_k$();
    this.SurfaceTint_1 = this.Primary_1;
    this.SurfaceVariant_1 = PaletteTokens_getInstance().get_NeutralVariant90_glbtc5_k$();
    this.Tertiary_1 = PaletteTokens_getInstance().get_Tertiary40_2n287y_k$();
    this.TertiaryContainer_1 = PaletteTokens_getInstance().get_Tertiary90_kn1pg9_k$();
  }
  protoOf(ColorLightTokens).get_Background_coy682_k$ = function () {
    return this.Background_1;
  };
  protoOf(ColorLightTokens).get_Error_kfehgm_k$ = function () {
    return this.Error_1;
  };
  protoOf(ColorLightTokens).get_ErrorContainer_m9dfcn_k$ = function () {
    return this.ErrorContainer_1;
  };
  protoOf(ColorLightTokens).get_InverseOnSurface_igviwi_k$ = function () {
    return this.InverseOnSurface_1;
  };
  protoOf(ColorLightTokens).get_InversePrimary_wbtmrm_k$ = function () {
    return this.InversePrimary_1;
  };
  protoOf(ColorLightTokens).get_InverseSurface_4vhugj_k$ = function () {
    return this.InverseSurface_1;
  };
  protoOf(ColorLightTokens).get_OnBackground_s88731_k$ = function () {
    return this.OnBackground_1;
  };
  protoOf(ColorLightTokens).get_OnError_e0bot5_k$ = function () {
    return this.OnError_1;
  };
  protoOf(ColorLightTokens).get_OnErrorContainer_55l6l4_k$ = function () {
    return this.OnErrorContainer_1;
  };
  protoOf(ColorLightTokens).get_OnPrimary_k24na9_k$ = function () {
    return this.OnPrimary_1;
  };
  protoOf(ColorLightTokens).get_OnPrimaryContainer_y30c4u_k$ = function () {
    return this.OnPrimaryContainer_1;
  };
  protoOf(ColorLightTokens).get_OnSecondary_ej90fh_k$ = function () {
    return this.OnSecondary_1;
  };
  protoOf(ColorLightTokens).get_OnSecondaryContainer_qntw58_k$ = function () {
    return this.OnSecondaryContainer_1;
  };
  protoOf(ColorLightTokens).get_OnSurface_h56txw_k$ = function () {
    return this.OnSurface_1;
  };
  protoOf(ColorLightTokens).get_OnSurfaceVariant_bwttl3_k$ = function () {
    return this.OnSurfaceVariant_1;
  };
  protoOf(ColorLightTokens).get_OnTertiary_ts5zsv_k$ = function () {
    return this.OnTertiary_1;
  };
  protoOf(ColorLightTokens).get_OnTertiaryContainer_3p0xf6_k$ = function () {
    return this.OnTertiaryContainer_1;
  };
  protoOf(ColorLightTokens).get_Outline_s0clnk_k$ = function () {
    return this.Outline_1;
  };
  protoOf(ColorLightTokens).get_OutlineVariant_xlxs5v_k$ = function () {
    return this.OutlineVariant_1;
  };
  protoOf(ColorLightTokens).get_Primary_dhch28_k$ = function () {
    return this.Primary_1;
  };
  protoOf(ColorLightTokens).get_PrimaryContainer_4731lb_k$ = function () {
    return this.PrimaryContainer_1;
  };
  protoOf(ColorLightTokens).get_Scrim_44i5b8_k$ = function () {
    return this.Scrim_1;
  };
  protoOf(ColorLightTokens).get_Secondary_dka8xa_k$ = function () {
    return this.Secondary_1;
  };
  protoOf(ColorLightTokens).get_SecondaryContainer_1xlmvx_k$ = function () {
    return this.SecondaryContainer_1;
  };
  protoOf(ColorLightTokens).get_Surface_npz05x_k$ = function () {
    return this.Surface_1;
  };
  protoOf(ColorLightTokens).get_SurfaceTint_8lhc6e_k$ = function () {
    return this.SurfaceTint_1;
  };
  protoOf(ColorLightTokens).get_SurfaceVariant_56yf6g_k$ = function () {
    return this.SurfaceVariant_1;
  };
  protoOf(ColorLightTokens).get_Tertiary_kl36se_k$ = function () {
    return this.Tertiary_1;
  };
  protoOf(ColorLightTokens).get_TertiaryContainer_6s8ak3_k$ = function () {
    return this.TertiaryContainer_1;
  };
  var ColorLightTokens_instance;
  function ColorLightTokens_getInstance() {
    if (ColorLightTokens_instance == null)
      new ColorLightTokens();
    return ColorLightTokens_instance;
  }
  var ColorSchemeKeyTokens_Background_instance;
  var ColorSchemeKeyTokens_Error_instance;
  var ColorSchemeKeyTokens_ErrorContainer_instance;
  var ColorSchemeKeyTokens_InverseOnSurface_instance;
  var ColorSchemeKeyTokens_InversePrimary_instance;
  var ColorSchemeKeyTokens_InverseSurface_instance;
  var ColorSchemeKeyTokens_OnBackground_instance;
  var ColorSchemeKeyTokens_OnError_instance;
  var ColorSchemeKeyTokens_OnErrorContainer_instance;
  var ColorSchemeKeyTokens_OnPrimary_instance;
  var ColorSchemeKeyTokens_OnPrimaryContainer_instance;
  var ColorSchemeKeyTokens_OnSecondary_instance;
  var ColorSchemeKeyTokens_OnSecondaryContainer_instance;
  var ColorSchemeKeyTokens_OnSurface_instance;
  var ColorSchemeKeyTokens_OnSurfaceVariant_instance;
  var ColorSchemeKeyTokens_OnTertiary_instance;
  var ColorSchemeKeyTokens_OnTertiaryContainer_instance;
  var ColorSchemeKeyTokens_Outline_instance;
  var ColorSchemeKeyTokens_OutlineVariant_instance;
  var ColorSchemeKeyTokens_Primary_instance;
  var ColorSchemeKeyTokens_PrimaryContainer_instance;
  var ColorSchemeKeyTokens_Scrim_instance;
  var ColorSchemeKeyTokens_Secondary_instance;
  var ColorSchemeKeyTokens_SecondaryContainer_instance;
  var ColorSchemeKeyTokens_Surface_instance;
  var ColorSchemeKeyTokens_SurfaceTint_instance;
  var ColorSchemeKeyTokens_SurfaceVariant_instance;
  var ColorSchemeKeyTokens_Tertiary_instance;
  var ColorSchemeKeyTokens_TertiaryContainer_instance;
  function values_1() {
    return [ColorSchemeKeyTokens_Background_getInstance(), ColorSchemeKeyTokens_Error_getInstance(), ColorSchemeKeyTokens_ErrorContainer_getInstance(), ColorSchemeKeyTokens_InverseOnSurface_getInstance(), ColorSchemeKeyTokens_InversePrimary_getInstance(), ColorSchemeKeyTokens_InverseSurface_getInstance(), ColorSchemeKeyTokens_OnBackground_getInstance(), ColorSchemeKeyTokens_OnError_getInstance(), ColorSchemeKeyTokens_OnErrorContainer_getInstance(), ColorSchemeKeyTokens_OnPrimary_getInstance(), ColorSchemeKeyTokens_OnPrimaryContainer_getInstance(), ColorSchemeKeyTokens_OnSecondary_getInstance(), ColorSchemeKeyTokens_OnSecondaryContainer_getInstance(), ColorSchemeKeyTokens_OnSurface_getInstance(), ColorSchemeKeyTokens_OnSurfaceVariant_getInstance(), ColorSchemeKeyTokens_OnTertiary_getInstance(), ColorSchemeKeyTokens_OnTertiaryContainer_getInstance(), ColorSchemeKeyTokens_Outline_getInstance(), ColorSchemeKeyTokens_OutlineVariant_getInstance(), ColorSchemeKeyTokens_Primary_getInstance(), ColorSchemeKeyTokens_PrimaryContainer_getInstance(), ColorSchemeKeyTokens_Scrim_getInstance(), ColorSchemeKeyTokens_Secondary_getInstance(), ColorSchemeKeyTokens_SecondaryContainer_getInstance(), ColorSchemeKeyTokens_Surface_getInstance(), ColorSchemeKeyTokens_SurfaceTint_getInstance(), ColorSchemeKeyTokens_SurfaceVariant_getInstance(), ColorSchemeKeyTokens_Tertiary_getInstance(), ColorSchemeKeyTokens_TertiaryContainer_getInstance()];
  }
  function valueOf_1(value) {
    switch (value) {
      case 'Background':
        return ColorSchemeKeyTokens_Background_getInstance();
      case 'Error':
        return ColorSchemeKeyTokens_Error_getInstance();
      case 'ErrorContainer':
        return ColorSchemeKeyTokens_ErrorContainer_getInstance();
      case 'InverseOnSurface':
        return ColorSchemeKeyTokens_InverseOnSurface_getInstance();
      case 'InversePrimary':
        return ColorSchemeKeyTokens_InversePrimary_getInstance();
      case 'InverseSurface':
        return ColorSchemeKeyTokens_InverseSurface_getInstance();
      case 'OnBackground':
        return ColorSchemeKeyTokens_OnBackground_getInstance();
      case 'OnError':
        return ColorSchemeKeyTokens_OnError_getInstance();
      case 'OnErrorContainer':
        return ColorSchemeKeyTokens_OnErrorContainer_getInstance();
      case 'OnPrimary':
        return ColorSchemeKeyTokens_OnPrimary_getInstance();
      case 'OnPrimaryContainer':
        return ColorSchemeKeyTokens_OnPrimaryContainer_getInstance();
      case 'OnSecondary':
        return ColorSchemeKeyTokens_OnSecondary_getInstance();
      case 'OnSecondaryContainer':
        return ColorSchemeKeyTokens_OnSecondaryContainer_getInstance();
      case 'OnSurface':
        return ColorSchemeKeyTokens_OnSurface_getInstance();
      case 'OnSurfaceVariant':
        return ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
      case 'OnTertiary':
        return ColorSchemeKeyTokens_OnTertiary_getInstance();
      case 'OnTertiaryContainer':
        return ColorSchemeKeyTokens_OnTertiaryContainer_getInstance();
      case 'Outline':
        return ColorSchemeKeyTokens_Outline_getInstance();
      case 'OutlineVariant':
        return ColorSchemeKeyTokens_OutlineVariant_getInstance();
      case 'Primary':
        return ColorSchemeKeyTokens_Primary_getInstance();
      case 'PrimaryContainer':
        return ColorSchemeKeyTokens_PrimaryContainer_getInstance();
      case 'Scrim':
        return ColorSchemeKeyTokens_Scrim_getInstance();
      case 'Secondary':
        return ColorSchemeKeyTokens_Secondary_getInstance();
      case 'SecondaryContainer':
        return ColorSchemeKeyTokens_SecondaryContainer_getInstance();
      case 'Surface':
        return ColorSchemeKeyTokens_Surface_getInstance();
      case 'SurfaceTint':
        return ColorSchemeKeyTokens_SurfaceTint_getInstance();
      case 'SurfaceVariant':
        return ColorSchemeKeyTokens_SurfaceVariant_getInstance();
      case 'Tertiary':
        return ColorSchemeKeyTokens_Tertiary_getInstance();
      case 'TertiaryContainer':
        return ColorSchemeKeyTokens_TertiaryContainer_getInstance();
      default:
        ColorSchemeKeyTokens_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  var ColorSchemeKeyTokens_entriesInitialized;
  function ColorSchemeKeyTokens_initEntries() {
    if (ColorSchemeKeyTokens_entriesInitialized)
      return Unit_getInstance();
    ColorSchemeKeyTokens_entriesInitialized = true;
    ColorSchemeKeyTokens_Background_instance = new ColorSchemeKeyTokens('Background', 0);
    ColorSchemeKeyTokens_Error_instance = new ColorSchemeKeyTokens('Error', 1);
    ColorSchemeKeyTokens_ErrorContainer_instance = new ColorSchemeKeyTokens('ErrorContainer', 2);
    ColorSchemeKeyTokens_InverseOnSurface_instance = new ColorSchemeKeyTokens('InverseOnSurface', 3);
    ColorSchemeKeyTokens_InversePrimary_instance = new ColorSchemeKeyTokens('InversePrimary', 4);
    ColorSchemeKeyTokens_InverseSurface_instance = new ColorSchemeKeyTokens('InverseSurface', 5);
    ColorSchemeKeyTokens_OnBackground_instance = new ColorSchemeKeyTokens('OnBackground', 6);
    ColorSchemeKeyTokens_OnError_instance = new ColorSchemeKeyTokens('OnError', 7);
    ColorSchemeKeyTokens_OnErrorContainer_instance = new ColorSchemeKeyTokens('OnErrorContainer', 8);
    ColorSchemeKeyTokens_OnPrimary_instance = new ColorSchemeKeyTokens('OnPrimary', 9);
    ColorSchemeKeyTokens_OnPrimaryContainer_instance = new ColorSchemeKeyTokens('OnPrimaryContainer', 10);
    ColorSchemeKeyTokens_OnSecondary_instance = new ColorSchemeKeyTokens('OnSecondary', 11);
    ColorSchemeKeyTokens_OnSecondaryContainer_instance = new ColorSchemeKeyTokens('OnSecondaryContainer', 12);
    ColorSchemeKeyTokens_OnSurface_instance = new ColorSchemeKeyTokens('OnSurface', 13);
    ColorSchemeKeyTokens_OnSurfaceVariant_instance = new ColorSchemeKeyTokens('OnSurfaceVariant', 14);
    ColorSchemeKeyTokens_OnTertiary_instance = new ColorSchemeKeyTokens('OnTertiary', 15);
    ColorSchemeKeyTokens_OnTertiaryContainer_instance = new ColorSchemeKeyTokens('OnTertiaryContainer', 16);
    ColorSchemeKeyTokens_Outline_instance = new ColorSchemeKeyTokens('Outline', 17);
    ColorSchemeKeyTokens_OutlineVariant_instance = new ColorSchemeKeyTokens('OutlineVariant', 18);
    ColorSchemeKeyTokens_Primary_instance = new ColorSchemeKeyTokens('Primary', 19);
    ColorSchemeKeyTokens_PrimaryContainer_instance = new ColorSchemeKeyTokens('PrimaryContainer', 20);
    ColorSchemeKeyTokens_Scrim_instance = new ColorSchemeKeyTokens('Scrim', 21);
    ColorSchemeKeyTokens_Secondary_instance = new ColorSchemeKeyTokens('Secondary', 22);
    ColorSchemeKeyTokens_SecondaryContainer_instance = new ColorSchemeKeyTokens('SecondaryContainer', 23);
    ColorSchemeKeyTokens_Surface_instance = new ColorSchemeKeyTokens('Surface', 24);
    ColorSchemeKeyTokens_SurfaceTint_instance = new ColorSchemeKeyTokens('SurfaceTint', 25);
    ColorSchemeKeyTokens_SurfaceVariant_instance = new ColorSchemeKeyTokens('SurfaceVariant', 26);
    ColorSchemeKeyTokens_Tertiary_instance = new ColorSchemeKeyTokens('Tertiary', 27);
    ColorSchemeKeyTokens_TertiaryContainer_instance = new ColorSchemeKeyTokens('TertiaryContainer', 28);
  }
  function ColorSchemeKeyTokens(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function ColorSchemeKeyTokens_Background_getInstance() {
    ColorSchemeKeyTokens_initEntries();
    return ColorSchemeKeyTokens_Background_instance;
  }
  function ColorSchemeKeyTokens_Error_getInstance() {
    ColorSchemeKeyTokens_initEntries();
    return ColorSchemeKeyTokens_Error_instance;
  }
  function ColorSchemeKeyTokens_ErrorContainer_getInstance() {
    ColorSchemeKeyTokens_initEntries();
    return ColorSchemeKeyTokens_ErrorContainer_instance;
  }
  function ColorSchemeKeyTokens_InverseOnSurface_getInstance() {
    ColorSchemeKeyTokens_initEntries();
    return ColorSchemeKeyTokens_InverseOnSurface_instance;
  }
  function ColorSchemeKeyTokens_InversePrimary_getInstance() {
    ColorSchemeKeyTokens_initEntries();
    return ColorSchemeKeyTokens_InversePrimary_instance;
  }
  function ColorSchemeKeyTokens_InverseSurface_getInstance() {
    ColorSchemeKeyTokens_initEntries();
    return ColorSchemeKeyTokens_InverseSurface_instance;
  }
  function ColorSchemeKeyTokens_OnBackground_getInstance() {
    ColorSchemeKeyTokens_initEntries();
    return ColorSchemeKeyTokens_OnBackground_instance;
  }
  function ColorSchemeKeyTokens_OnError_getInstance() {
    ColorSchemeKeyTokens_initEntries();
    return ColorSchemeKeyTokens_OnError_instance;
  }
  function ColorSchemeKeyTokens_OnErrorContainer_getInstance() {
    ColorSchemeKeyTokens_initEntries();
    return ColorSchemeKeyTokens_OnErrorContainer_instance;
  }
  function ColorSchemeKeyTokens_OnPrimary_getInstance() {
    ColorSchemeKeyTokens_initEntries();
    return ColorSchemeKeyTokens_OnPrimary_instance;
  }
  function ColorSchemeKeyTokens_OnPrimaryContainer_getInstance() {
    ColorSchemeKeyTokens_initEntries();
    return ColorSchemeKeyTokens_OnPrimaryContainer_instance;
  }
  function ColorSchemeKeyTokens_OnSecondary_getInstance() {
    ColorSchemeKeyTokens_initEntries();
    return ColorSchemeKeyTokens_OnSecondary_instance;
  }
  function ColorSchemeKeyTokens_OnSecondaryContainer_getInstance() {
    ColorSchemeKeyTokens_initEntries();
    return ColorSchemeKeyTokens_OnSecondaryContainer_instance;
  }
  function ColorSchemeKeyTokens_OnSurface_getInstance() {
    ColorSchemeKeyTokens_initEntries();
    return ColorSchemeKeyTokens_OnSurface_instance;
  }
  function ColorSchemeKeyTokens_OnSurfaceVariant_getInstance() {
    ColorSchemeKeyTokens_initEntries();
    return ColorSchemeKeyTokens_OnSurfaceVariant_instance;
  }
  function ColorSchemeKeyTokens_OnTertiary_getInstance() {
    ColorSchemeKeyTokens_initEntries();
    return ColorSchemeKeyTokens_OnTertiary_instance;
  }
  function ColorSchemeKeyTokens_OnTertiaryContainer_getInstance() {
    ColorSchemeKeyTokens_initEntries();
    return ColorSchemeKeyTokens_OnTertiaryContainer_instance;
  }
  function ColorSchemeKeyTokens_Outline_getInstance() {
    ColorSchemeKeyTokens_initEntries();
    return ColorSchemeKeyTokens_Outline_instance;
  }
  function ColorSchemeKeyTokens_OutlineVariant_getInstance() {
    ColorSchemeKeyTokens_initEntries();
    return ColorSchemeKeyTokens_OutlineVariant_instance;
  }
  function ColorSchemeKeyTokens_Primary_getInstance() {
    ColorSchemeKeyTokens_initEntries();
    return ColorSchemeKeyTokens_Primary_instance;
  }
  function ColorSchemeKeyTokens_PrimaryContainer_getInstance() {
    ColorSchemeKeyTokens_initEntries();
    return ColorSchemeKeyTokens_PrimaryContainer_instance;
  }
  function ColorSchemeKeyTokens_Scrim_getInstance() {
    ColorSchemeKeyTokens_initEntries();
    return ColorSchemeKeyTokens_Scrim_instance;
  }
  function ColorSchemeKeyTokens_Secondary_getInstance() {
    ColorSchemeKeyTokens_initEntries();
    return ColorSchemeKeyTokens_Secondary_instance;
  }
  function ColorSchemeKeyTokens_SecondaryContainer_getInstance() {
    ColorSchemeKeyTokens_initEntries();
    return ColorSchemeKeyTokens_SecondaryContainer_instance;
  }
  function ColorSchemeKeyTokens_Surface_getInstance() {
    ColorSchemeKeyTokens_initEntries();
    return ColorSchemeKeyTokens_Surface_instance;
  }
  function ColorSchemeKeyTokens_SurfaceTint_getInstance() {
    ColorSchemeKeyTokens_initEntries();
    return ColorSchemeKeyTokens_SurfaceTint_instance;
  }
  function ColorSchemeKeyTokens_SurfaceVariant_getInstance() {
    ColorSchemeKeyTokens_initEntries();
    return ColorSchemeKeyTokens_SurfaceVariant_instance;
  }
  function ColorSchemeKeyTokens_Tertiary_getInstance() {
    ColorSchemeKeyTokens_initEntries();
    return ColorSchemeKeyTokens_Tertiary_instance;
  }
  function ColorSchemeKeyTokens_TertiaryContainer_getInstance() {
    ColorSchemeKeyTokens_initEntries();
    return ColorSchemeKeyTokens_TertiaryContainer_instance;
  }
  function ElevationTokens() {
    ElevationTokens_instance = this;
    var tmp = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp.Level0__1 = _Dp___init__impl__ms3zkb(0.0);
    var tmp_0 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_0.Level1__1 = _Dp___init__impl__ms3zkb(1.0);
    var tmp_1 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_1.Level2__1 = _Dp___init__impl__ms3zkb(3.0);
    var tmp_2 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_2.Level3__1 = _Dp___init__impl__ms3zkb(6.0);
    var tmp_3 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_3.Level4__1 = _Dp___init__impl__ms3zkb(8.0);
    var tmp_4 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_4.Level5__1 = _Dp___init__impl__ms3zkb(12.0);
  }
  protoOf(ElevationTokens).get_Level0_p4lxse_k$ = function () {
    return this.Level0__1;
  };
  protoOf(ElevationTokens).get_Level1_9secab_k$ = function () {
    return this.Level1__1;
  };
  protoOf(ElevationTokens).get_Level2_qbpfm4_k$ = function () {
    return this.Level2__1;
  };
  protoOf(ElevationTokens).get_Level3_8laugl_k$ = function () {
    return this.Level3__1;
  };
  protoOf(ElevationTokens).get_Level4_risxfu_k$ = function () {
    return this.Level4__1;
  };
  protoOf(ElevationTokens).get_Level5_7e7cmv_k$ = function () {
    return this.Level5__1;
  };
  var ElevationTokens_instance;
  function ElevationTokens_getInstance() {
    if (ElevationTokens_instance == null)
      new ElevationTokens();
    return ElevationTokens_instance;
  }
  function FilledTextFieldTokens() {
    FilledTextFieldTokens_instance = this;
    this.ActiveIndicatorColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    var tmp = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp.ActiveIndicatorHeight_1 = _Dp___init__impl__ms3zkb(1.0);
    this.CaretColor_1 = ColorSchemeKeyTokens_Primary_getInstance();
    this.ContainerColor_1 = ColorSchemeKeyTokens_SurfaceVariant_getInstance();
    var tmp_0 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_0.ContainerHeight_1 = _Dp___init__impl__ms3zkb(56.0);
    this.ContainerShape_1 = ShapeKeyTokens_CornerExtraSmallTop_getInstance();
    this.DisabledActiveIndicatorColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    var tmp_1 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_1.DisabledActiveIndicatorHeight_1 = _Dp___init__impl__ms3zkb(1.0);
    this.DisabledActiveIndicatorOpacity_1 = 0.38;
    this.DisabledContainerColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.DisabledContainerOpacity_1 = 0.04;
    this.DisabledInputColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.DisabledInputOpacity_1 = 0.38;
    this.DisabledLabelColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.DisabledLabelOpacity_1 = 0.38;
    this.DisabledLeadingIconColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.DisabledLeadingIconOpacity_1 = 0.38;
    this.DisabledSupportingColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.DisabledSupportingOpacity_1 = 0.38;
    this.DisabledTrailingIconColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.DisabledTrailingIconOpacity_1 = 0.38;
    this.ErrorActiveIndicatorColor_1 = ColorSchemeKeyTokens_Error_getInstance();
    this.ErrorFocusActiveIndicatorColor_1 = ColorSchemeKeyTokens_Error_getInstance();
    this.ErrorFocusCaretColor_1 = ColorSchemeKeyTokens_Error_getInstance();
    this.ErrorFocusInputColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.ErrorFocusLabelColor_1 = ColorSchemeKeyTokens_Error_getInstance();
    this.ErrorFocusLeadingIconColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.ErrorFocusSupportingColor_1 = ColorSchemeKeyTokens_Error_getInstance();
    this.ErrorFocusTrailingIconColor_1 = ColorSchemeKeyTokens_Error_getInstance();
    this.ErrorHoverActiveIndicatorColor_1 = ColorSchemeKeyTokens_OnErrorContainer_getInstance();
    this.ErrorHoverInputColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.ErrorHoverLabelColor_1 = ColorSchemeKeyTokens_OnErrorContainer_getInstance();
    this.ErrorHoverLeadingIconColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.ErrorHoverSupportingColor_1 = ColorSchemeKeyTokens_Error_getInstance();
    this.ErrorHoverTrailingIconColor_1 = ColorSchemeKeyTokens_OnErrorContainer_getInstance();
    this.ErrorInputColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.ErrorLabelColor_1 = ColorSchemeKeyTokens_Error_getInstance();
    this.ErrorLeadingIconColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.ErrorSupportingColor_1 = ColorSchemeKeyTokens_Error_getInstance();
    this.ErrorTrailingIconColor_1 = ColorSchemeKeyTokens_Error_getInstance();
    this.FocusActiveIndicatorColor_1 = ColorSchemeKeyTokens_Primary_getInstance();
    var tmp_2 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_2.FocusActiveIndicatorHeight_1 = _Dp___init__impl__ms3zkb(2.0);
    this.FocusInputColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.FocusLabelColor_1 = ColorSchemeKeyTokens_Primary_getInstance();
    this.FocusLeadingIconColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.FocusSupportingColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.FocusTrailingIconColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.HoverActiveIndicatorColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    var tmp_3 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_3.HoverActiveIndicatorHeight_1 = _Dp___init__impl__ms3zkb(1.0);
    this.HoverInputColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.HoverLabelColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.HoverLeadingIconColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.HoverSupportingColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.HoverTrailingIconColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.InputColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.InputFont_1 = TypographyKeyTokens_BodyLarge_getInstance();
    this.InputPlaceholderColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.InputPrefixColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.InputSuffixColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.LabelColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.LabelFont_1 = TypographyKeyTokens_BodyLarge_getInstance();
    this.LeadingIconColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    var tmp_4 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_4.LeadingIconSize_1 = _Dp___init__impl__ms3zkb(20.0);
    this.SupportingColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.SupportingFont_1 = TypographyKeyTokens_BodySmall_getInstance();
    this.TrailingIconColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    var tmp_5 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_5.TrailingIconSize_1 = _Dp___init__impl__ms3zkb(24.0);
  }
  protoOf(FilledTextFieldTokens).get_ActiveIndicatorColor_qs91el_k$ = function () {
    return this.ActiveIndicatorColor_1;
  };
  protoOf(FilledTextFieldTokens).get_ActiveIndicatorHeight_7eyzzw_k$ = function () {
    return this.ActiveIndicatorHeight_1;
  };
  protoOf(FilledTextFieldTokens).get_CaretColor_hxe08n_k$ = function () {
    return this.CaretColor_1;
  };
  protoOf(FilledTextFieldTokens).get_ContainerColor_uid763_k$ = function () {
    return this.ContainerColor_1;
  };
  protoOf(FilledTextFieldTokens).get_ContainerHeight_9lch44_k$ = function () {
    return this.ContainerHeight_1;
  };
  protoOf(FilledTextFieldTokens).get_ContainerShape_ur17m1_k$ = function () {
    return this.ContainerShape_1;
  };
  protoOf(FilledTextFieldTokens).get_DisabledActiveIndicatorColor_bvdiyn_k$ = function () {
    return this.DisabledActiveIndicatorColor_1;
  };
  protoOf(FilledTextFieldTokens).get_DisabledActiveIndicatorHeight_lackig_k$ = function () {
    return this.DisabledActiveIndicatorHeight_1;
  };
  protoOf(FilledTextFieldTokens).get_DisabledActiveIndicatorOpacity_6y9rl3_k$ = function () {
    return this.DisabledActiveIndicatorOpacity_1;
  };
  protoOf(FilledTextFieldTokens).get_DisabledContainerColor_brbm55_k$ = function () {
    return this.DisabledContainerColor_1;
  };
  protoOf(FilledTextFieldTokens).get_DisabledContainerOpacity_rx61u7_k$ = function () {
    return this.DisabledContainerOpacity_1;
  };
  protoOf(FilledTextFieldTokens).get_DisabledInputColor_84w2ke_k$ = function () {
    return this.DisabledInputColor_1;
  };
  protoOf(FilledTextFieldTokens).get_DisabledInputOpacity_vi261m_k$ = function () {
    return this.DisabledInputOpacity_1;
  };
  protoOf(FilledTextFieldTokens).get_DisabledLabelColor_sycis4_k$ = function () {
    return this.DisabledLabelColor_1;
  };
  protoOf(FilledTextFieldTokens).get_DisabledLabelOpacity_f5f918_k$ = function () {
    return this.DisabledLabelOpacity_1;
  };
  protoOf(FilledTextFieldTokens).get_DisabledLeadingIconColor_dtgxah_k$ = function () {
    return this.DisabledLeadingIconColor_1;
  };
  protoOf(FilledTextFieldTokens).get_DisabledLeadingIconOpacity_va1u41_k$ = function () {
    return this.DisabledLeadingIconOpacity_1;
  };
  protoOf(FilledTextFieldTokens).get_DisabledSupportingColor_hh8a7p_k$ = function () {
    return this.DisabledSupportingColor_1;
  };
  protoOf(FilledTextFieldTokens).get_DisabledSupportingOpacity_prppv_k$ = function () {
    return this.DisabledSupportingOpacity_1;
  };
  protoOf(FilledTextFieldTokens).get_DisabledTrailingIconColor_mjc79l_k$ = function () {
    return this.DisabledTrailingIconColor_1;
  };
  protoOf(FilledTextFieldTokens).get_DisabledTrailingIconOpacity_s6onap_k$ = function () {
    return this.DisabledTrailingIconOpacity_1;
  };
  protoOf(FilledTextFieldTokens).get_ErrorActiveIndicatorColor_vkr8ux_k$ = function () {
    return this.ErrorActiveIndicatorColor_1;
  };
  protoOf(FilledTextFieldTokens).get_ErrorFocusActiveIndicatorColor_fsljnx_k$ = function () {
    return this.ErrorFocusActiveIndicatorColor_1;
  };
  protoOf(FilledTextFieldTokens).get_ErrorFocusCaretColor_vrfnbt_k$ = function () {
    return this.ErrorFocusCaretColor_1;
  };
  protoOf(FilledTextFieldTokens).get_ErrorFocusInputColor_dyfboy_k$ = function () {
    return this.ErrorFocusInputColor_1;
  };
  protoOf(FilledTextFieldTokens).get_ErrorFocusLabelColor_yrvrwo_k$ = function () {
    return this.ErrorFocusLabelColor_1;
  };
  protoOf(FilledTextFieldTokens).get_ErrorFocusLeadingIconColor_buopz7_k$ = function () {
    return this.ErrorFocusLeadingIconColor_1;
  };
  protoOf(FilledTextFieldTokens).get_ErrorFocusSupportingColor_ye65lj_k$ = function () {
    return this.ErrorFocusSupportingColor_1;
  };
  protoOf(FilledTextFieldTokens).get_ErrorFocusTrailingIconColor_82pro5_k$ = function () {
    return this.ErrorFocusTrailingIconColor_1;
  };
  protoOf(FilledTextFieldTokens).get_ErrorHoverActiveIndicatorColor_9xt209_k$ = function () {
    return this.ErrorHoverActiveIndicatorColor_1;
  };
  protoOf(FilledTextFieldTokens).get_ErrorHoverInputColor_wt8xpm_k$ = function () {
    return this.ErrorHoverInputColor_1;
  };
  protoOf(FilledTextFieldTokens).get_ErrorHoverLabelColor_bzshhw_k$ = function () {
    return this.ErrorHoverLabelColor_1;
  };
  protoOf(FilledTextFieldTokens).get_ErrorHoverLeadingIconColor_sren1b_k$ = function () {
    return this.ErrorHoverLeadingIconColor_1;
  };
  protoOf(FilledTextFieldTokens).get_ErrorHoverSupportingColor_2t9jpp_k$ = function () {
    return this.ErrorHoverSupportingColor_1;
  };
  protoOf(FilledTextFieldTokens).get_ErrorHoverTrailingIconColor_ivtbbj_k$ = function () {
    return this.ErrorHoverTrailingIconColor_1;
  };
  protoOf(FilledTextFieldTokens).get_ErrorInputColor_hh1yg_k$ = function () {
    return this.ErrorInputColor_1;
  };
  protoOf(FilledTextFieldTokens).get_ErrorLabelColor_kbze9a_k$ = function () {
    return this.ErrorLabelColor_1;
  };
  protoOf(FilledTextFieldTokens).get_ErrorLeadingIconColor_b3l6n7_k$ = function () {
    return this.ErrorLeadingIconColor_1;
  };
  protoOf(FilledTextFieldTokens).get_ErrorSupportingColor_63y79r_k$ = function () {
    return this.ErrorSupportingColor_1;
  };
  protoOf(FilledTextFieldTokens).get_ErrorTrailingIconColor_9a4b73_k$ = function () {
    return this.ErrorTrailingIconColor_1;
  };
  protoOf(FilledTextFieldTokens).get_FocusActiveIndicatorColor_9rlorb_k$ = function () {
    return this.FocusActiveIndicatorColor_1;
  };
  protoOf(FilledTextFieldTokens).get_FocusActiveIndicatorHeight_4uv7wi_k$ = function () {
    return this.FocusActiveIndicatorHeight_1;
  };
  protoOf(FilledTextFieldTokens).get_FocusInputColor_ydhhuw_k$ = function () {
    return this.FocusInputColor_1;
  };
  protoOf(FilledTextFieldTokens).get_FocusLabelColor_fu63wi_k$ = function () {
    return this.FocusLabelColor_1;
  };
  protoOf(FilledTextFieldTokens).get_FocusLeadingIconColor_pqzv77_k$ = function () {
    return this.FocusLeadingIconColor_1;
  };
  protoOf(FilledTextFieldTokens).get_FocusSupportingColor_nyu4nz_k$ = function () {
    return this.FocusSupportingColor_1;
  };
  protoOf(FilledTextFieldTokens).get_FocusTrailingIconColor_xs0xep_k$ = function () {
    return this.FocusTrailingIconColor_1;
  };
  protoOf(FilledTextFieldTokens).get_HoverActiveIndicatorColor_3wt73n_k$ = function () {
    return this.HoverActiveIndicatorColor_1;
  };
  protoOf(FilledTextFieldTokens).get_HoverActiveIndicatorHeight_v2qbfe_k$ = function () {
    return this.HoverActiveIndicatorHeight_1;
  };
  protoOf(FilledTextFieldTokens).get_HoverInputColor_ce6rjo_k$ = function () {
    return this.HoverInputColor_1;
  };
  protoOf(FilledTextFieldTokens).get_HoverLabelColor_8f9oo2_k$ = function () {
    return this.HoverLabelColor_1;
  };
  protoOf(FilledTextFieldTokens).get_HoverLeadingIconColor_8u9y53_k$ = function () {
    return this.HoverLeadingIconColor_1;
  };
  protoOf(FilledTextFieldTokens).get_HoverSupportingColor_9uu7zx_k$ = function () {
    return this.HoverSupportingColor_1;
  };
  protoOf(FilledTextFieldTokens).get_HoverTrailingIconColor_aak1kr_k$ = function () {
    return this.HoverTrailingIconColor_1;
  };
  protoOf(FilledTextFieldTokens).get_InputColor_zapq3m_k$ = function () {
    return this.InputColor_1;
  };
  protoOf(FilledTextFieldTokens).get_InputFont_15fyq8_k$ = function () {
    return this.InputFont_1;
  };
  protoOf(FilledTextFieldTokens).get_InputPlaceholderColor_5cj1ap_k$ = function () {
    return this.InputPlaceholderColor_1;
  };
  protoOf(FilledTextFieldTokens).get_InputPrefixColor_l0lf3k_k$ = function () {
    return this.InputPrefixColor_1;
  };
  protoOf(FilledTextFieldTokens).get_InputSuffixColor_ya4w9d_k$ = function () {
    return this.InputSuffixColor_1;
  };
  protoOf(FilledTextFieldTokens).get_LabelColor_ewxvns_k$ = function () {
    return this.LabelColor_1;
  };
  protoOf(FilledTextFieldTokens).get_LabelFont_vlk2oq_k$ = function () {
    return this.LabelFont_1;
  };
  protoOf(FilledTextFieldTokens).get_LeadingIconColor_4sfzzh_k$ = function () {
    return this.LeadingIconColor_1;
  };
  protoOf(FilledTextFieldTokens).get_LeadingIconSize_938iac_k$ = function () {
    return this.LeadingIconSize_1;
  };
  protoOf(FilledTextFieldTokens).get_SupportingColor_eb3yw7_k$ = function () {
    return this.SupportingColor_1;
  };
  protoOf(FilledTextFieldTokens).get_SupportingFont_mg7e45_k$ = function () {
    return this.SupportingFont_1;
  };
  protoOf(FilledTextFieldTokens).get_TrailingIconColor_qrzqp1_k$ = function () {
    return this.TrailingIconColor_1;
  };
  protoOf(FilledTextFieldTokens).get_TrailingIconSize_fxsdr0_k$ = function () {
    return this.TrailingIconSize_1;
  };
  var FilledTextFieldTokens_instance;
  function FilledTextFieldTokens_getInstance() {
    if (FilledTextFieldTokens_instance == null)
      new FilledTextFieldTokens();
    return FilledTextFieldTokens_instance;
  }
  function IconButtonTokens() {
    IconButtonTokens_instance = this;
    this.DisabledIconColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.DisabledIconOpacity_1 = 0.38;
    var tmp = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp.IconSize_1 = _Dp___init__impl__ms3zkb(24.0);
    this.SelectedFocusIconColor_1 = ColorSchemeKeyTokens_Primary_getInstance();
    this.SelectedHoverIconColor_1 = ColorSchemeKeyTokens_Primary_getInstance();
    this.SelectedIconColor_1 = ColorSchemeKeyTokens_Primary_getInstance();
    this.SelectedPressedIconColor_1 = ColorSchemeKeyTokens_Primary_getInstance();
    this.StateLayerShape_1 = ShapeKeyTokens_CornerFull_getInstance();
    var tmp_0 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_0.StateLayerSize_1 = _Dp___init__impl__ms3zkb(40.0);
    this.UnselectedFocusIconColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.UnselectedHoverIconColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.UnselectedIconColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.UnselectedPressedIconColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
  }
  protoOf(IconButtonTokens).get_DisabledIconColor_o88rr9_k$ = function () {
    return this.DisabledIconColor_1;
  };
  protoOf(IconButtonTokens).get_DisabledIconOpacity_kaidgt_k$ = function () {
    return this.DisabledIconOpacity_1;
  };
  protoOf(IconButtonTokens).get_IconSize_fa6wyo_k$ = function () {
    return this.IconSize_1;
  };
  protoOf(IconButtonTokens).get_SelectedFocusIconColor_du0oa2_k$ = function () {
    return this.SelectedFocusIconColor_1;
  };
  protoOf(IconButtonTokens).get_SelectedHoverIconColor_8gv9am_k$ = function () {
    return this.SelectedHoverIconColor_1;
  };
  protoOf(IconButtonTokens).get_SelectedIconColor_f44k3e_k$ = function () {
    return this.SelectedIconColor_1;
  };
  protoOf(IconButtonTokens).get_SelectedPressedIconColor_vqtuks_k$ = function () {
    return this.SelectedPressedIconColor_1;
  };
  protoOf(IconButtonTokens).get_StateLayerShape_6is8qg_k$ = function () {
    return this.StateLayerShape_1;
  };
  protoOf(IconButtonTokens).get_StateLayerSize_d2v4kn_k$ = function () {
    return this.StateLayerSize_1;
  };
  protoOf(IconButtonTokens).get_UnselectedFocusIconColor_3g7zv5_k$ = function () {
    return this.UnselectedFocusIconColor_1;
  };
  protoOf(IconButtonTokens).get_UnselectedHoverIconColor_1wxf4b_k$ = function () {
    return this.UnselectedHoverIconColor_1;
  };
  protoOf(IconButtonTokens).get_UnselectedIconColor_r38u7n_k$ = function () {
    return this.UnselectedIconColor_1;
  };
  protoOf(IconButtonTokens).get_UnselectedPressedIconColor_5bi5qz_k$ = function () {
    return this.UnselectedPressedIconColor_1;
  };
  var IconButtonTokens_instance;
  function IconButtonTokens_getInstance() {
    if (IconButtonTokens_instance == null)
      new IconButtonTokens();
    return IconButtonTokens_instance;
  }
  function LinearProgressIndicatorTokens() {
    LinearProgressIndicatorTokens_instance = this;
    this.ActiveIndicatorColor_1 = ColorSchemeKeyTokens_Primary_getInstance();
    var tmp = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp.ActiveIndicatorHeight_1 = _Dp___init__impl__ms3zkb(4.0);
    this.ActiveShape_1 = ShapeKeyTokens_CornerNone_getInstance();
    this.FourColorActiveIndicatorFourColor_1 = ColorSchemeKeyTokens_TertiaryContainer_getInstance();
    this.FourColorActiveIndicatorOneColor_1 = ColorSchemeKeyTokens_Primary_getInstance();
    this.FourColorActiveIndicatorThreeColor_1 = ColorSchemeKeyTokens_Tertiary_getInstance();
    this.FourColorActiveIndicatorTwoColor_1 = ColorSchemeKeyTokens_PrimaryContainer_getInstance();
    this.TrackColor_1 = ColorSchemeKeyTokens_SurfaceVariant_getInstance();
    var tmp_0 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_0.TrackHeight_1 = _Dp___init__impl__ms3zkb(4.0);
    this.TrackShape_1 = ShapeKeyTokens_CornerNone_getInstance();
  }
  protoOf(LinearProgressIndicatorTokens).get_ActiveIndicatorColor_qs91el_k$ = function () {
    return this.ActiveIndicatorColor_1;
  };
  protoOf(LinearProgressIndicatorTokens).get_ActiveIndicatorHeight_7eyzzw_k$ = function () {
    return this.ActiveIndicatorHeight_1;
  };
  protoOf(LinearProgressIndicatorTokens).get_ActiveShape_nwghiq_k$ = function () {
    return this.ActiveShape_1;
  };
  protoOf(LinearProgressIndicatorTokens).get_FourColorActiveIndicatorFourColor_57qe8o_k$ = function () {
    return this.FourColorActiveIndicatorFourColor_1;
  };
  protoOf(LinearProgressIndicatorTokens).get_FourColorActiveIndicatorOneColor_ti63im_k$ = function () {
    return this.FourColorActiveIndicatorOneColor_1;
  };
  protoOf(LinearProgressIndicatorTokens).get_FourColorActiveIndicatorThreeColor_ocviuy_k$ = function () {
    return this.FourColorActiveIndicatorThreeColor_1;
  };
  protoOf(LinearProgressIndicatorTokens).get_FourColorActiveIndicatorTwoColor_woh65w_k$ = function () {
    return this.FourColorActiveIndicatorTwoColor_1;
  };
  protoOf(LinearProgressIndicatorTokens).get_TrackColor_vjpugx_k$ = function () {
    return this.TrackColor_1;
  };
  protoOf(LinearProgressIndicatorTokens).get_TrackHeight_mo2hpi_k$ = function () {
    return this.TrackHeight_1;
  };
  protoOf(LinearProgressIndicatorTokens).get_TrackShape_vsduwv_k$ = function () {
    return this.TrackShape_1;
  };
  var LinearProgressIndicatorTokens_instance;
  function LinearProgressIndicatorTokens_getInstance() {
    if (LinearProgressIndicatorTokens_instance == null)
      new LinearProgressIndicatorTokens();
    return LinearProgressIndicatorTokens_instance;
  }
  function MotionTokens() {
    MotionTokens_instance = this;
    this.DurationExtraLong1__1 = 700.0;
    this.DurationExtraLong2__1 = 800.0;
    this.DurationExtraLong3__1 = 900.0;
    this.DurationExtraLong4__1 = 1000.0;
    this.DurationLong1__1 = 450.0;
    this.DurationLong2__1 = 500.0;
    this.DurationLong3__1 = 550.0;
    this.DurationLong4__1 = 600.0;
    this.DurationMedium1__1 = 250.0;
    this.DurationMedium2__1 = 300.0;
    this.DurationMedium3__1 = 350.0;
    this.DurationMedium4__1 = 400.0;
    this.DurationShort1__1 = 50.0;
    this.DurationShort2__1 = 100.0;
    this.DurationShort3__1 = 150.0;
    this.DurationShort4__1 = 200.0;
    this.EasingEmphasizedCubicBezier_1 = new CubicBezierEasing(0.2, 0.0, 0.0, 1.0);
    this.EasingEmphasizedAccelerateCubicBezier_1 = new CubicBezierEasing(0.3, 0.0, 0.8, 0.15);
    this.EasingEmphasizedDecelerateCubicBezier_1 = new CubicBezierEasing(0.05, 0.7, 0.1, 1.0);
    this.EasingLegacyCubicBezier_1 = new CubicBezierEasing(0.4, 0.0, 0.2, 1.0);
    this.EasingLegacyAccelerateCubicBezier_1 = new CubicBezierEasing(0.4, 0.0, 1.0, 1.0);
    this.EasingLegacyDecelerateCubicBezier_1 = new CubicBezierEasing(0.0, 0.0, 0.2, 1.0);
    this.EasingLinearCubicBezier_1 = new CubicBezierEasing(0.0, 0.0, 1.0, 1.0);
    this.EasingStandardCubicBezier_1 = new CubicBezierEasing(0.2, 0.0, 0.0, 1.0);
    this.EasingStandardAccelerateCubicBezier_1 = new CubicBezierEasing(0.3, 0.0, 1.0, 1.0);
    this.EasingStandardDecelerateCubicBezier_1 = new CubicBezierEasing(0.0, 0.0, 0.0, 1.0);
  }
  protoOf(MotionTokens).get_DurationExtraLong1_50gfoi_k$ = function () {
    return this.DurationExtraLong1__1;
  };
  protoOf(MotionTokens).get_DurationExtraLong2_50gfoj_k$ = function () {
    return this.DurationExtraLong2__1;
  };
  protoOf(MotionTokens).get_DurationExtraLong3_50gfok_k$ = function () {
    return this.DurationExtraLong3__1;
  };
  protoOf(MotionTokens).get_DurationExtraLong4_50gfol_k$ = function () {
    return this.DurationExtraLong4__1;
  };
  protoOf(MotionTokens).get_DurationLong1_e150hk_k$ = function () {
    return this.DurationLong1__1;
  };
  protoOf(MotionTokens).get_DurationLong2_e150hl_k$ = function () {
    return this.DurationLong2__1;
  };
  protoOf(MotionTokens).get_DurationLong3_e150hm_k$ = function () {
    return this.DurationLong3__1;
  };
  protoOf(MotionTokens).get_DurationLong4_e150hn_k$ = function () {
    return this.DurationLong4__1;
  };
  protoOf(MotionTokens).get_DurationMedium1_1o1ja9_k$ = function () {
    return this.DurationMedium1__1;
  };
  protoOf(MotionTokens).get_DurationMedium2_1o1ja8_k$ = function () {
    return this.DurationMedium2__1;
  };
  protoOf(MotionTokens).get_DurationMedium3_1o1ja7_k$ = function () {
    return this.DurationMedium3__1;
  };
  protoOf(MotionTokens).get_DurationMedium4_1o1ja6_k$ = function () {
    return this.DurationMedium4__1;
  };
  protoOf(MotionTokens).get_DurationShort1_c04snm_k$ = function () {
    return this.DurationShort1__1;
  };
  protoOf(MotionTokens).get_DurationShort2_c04snn_k$ = function () {
    return this.DurationShort2__1;
  };
  protoOf(MotionTokens).get_DurationShort3_c04sno_k$ = function () {
    return this.DurationShort3__1;
  };
  protoOf(MotionTokens).get_DurationShort4_c04snp_k$ = function () {
    return this.DurationShort4__1;
  };
  protoOf(MotionTokens).get_EasingEmphasizedCubicBezier_6bhect_k$ = function () {
    return this.EasingEmphasizedCubicBezier_1;
  };
  protoOf(MotionTokens).get_EasingEmphasizedAccelerateCubicBezier_px5aiy_k$ = function () {
    return this.EasingEmphasizedAccelerateCubicBezier_1;
  };
  protoOf(MotionTokens).get_EasingEmphasizedDecelerateCubicBezier_sygdvt_k$ = function () {
    return this.EasingEmphasizedDecelerateCubicBezier_1;
  };
  protoOf(MotionTokens).get_EasingLegacyCubicBezier_hp8fck_k$ = function () {
    return this.EasingLegacyCubicBezier_1;
  };
  protoOf(MotionTokens).get_EasingLegacyAccelerateCubicBezier_5g60kv_k$ = function () {
    return this.EasingLegacyAccelerateCubicBezier_1;
  };
  protoOf(MotionTokens).get_EasingLegacyDecelerateCubicBezier_2eux80_k$ = function () {
    return this.EasingLegacyDecelerateCubicBezier_1;
  };
  protoOf(MotionTokens).get_EasingLinearCubicBezier_dc4v3k_k$ = function () {
    return this.EasingLinearCubicBezier_1;
  };
  protoOf(MotionTokens).get_EasingStandardCubicBezier_ve50dk_k$ = function () {
    return this.EasingStandardCubicBezier_1;
  };
  protoOf(MotionTokens).get_EasingStandardAccelerateCubicBezier_537i7v_k$ = function () {
    return this.EasingStandardAccelerateCubicBezier_1;
  };
  protoOf(MotionTokens).get_EasingStandardDecelerateCubicBezier_21wev0_k$ = function () {
    return this.EasingStandardDecelerateCubicBezier_1;
  };
  var MotionTokens_instance;
  function MotionTokens_getInstance() {
    if (MotionTokens_instance == null)
      new MotionTokens();
    return MotionTokens_instance;
  }
  function NavigationBarTokens() {
    NavigationBarTokens_instance = this;
    this.ActiveFocusIconColor_1 = ColorSchemeKeyTokens_OnSecondaryContainer_getInstance();
    this.ActiveFocusLabelTextColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.ActiveHoverIconColor_1 = ColorSchemeKeyTokens_OnSecondaryContainer_getInstance();
    this.ActiveHoverLabelTextColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.ActiveIconColor_1 = ColorSchemeKeyTokens_OnSecondaryContainer_getInstance();
    this.ActiveIndicatorColor_1 = ColorSchemeKeyTokens_SecondaryContainer_getInstance();
    var tmp = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp.ActiveIndicatorHeight_1 = _Dp___init__impl__ms3zkb(32.0);
    this.ActiveIndicatorShape_1 = ShapeKeyTokens_CornerFull_getInstance();
    var tmp_0 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_0.ActiveIndicatorWidth_1 = _Dp___init__impl__ms3zkb(64.0);
    this.ActiveLabelTextColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.ActivePressedIconColor_1 = ColorSchemeKeyTokens_OnSecondaryContainer_getInstance();
    this.ActivePressedLabelTextColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.ContainerColor_1 = ColorSchemeKeyTokens_Surface_getInstance();
    this.ContainerElevation_1 = ElevationTokens_getInstance().get_Level2_qbpfm4_k$();
    var tmp_1 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_1.ContainerHeight_1 = _Dp___init__impl__ms3zkb(80.0);
    this.ContainerShape_1 = ShapeKeyTokens_CornerNone_getInstance();
    this.ContainerSurfaceTintLayerColor_1 = ColorSchemeKeyTokens_SurfaceTint_getInstance();
    var tmp_2 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_2.IconSize_1 = _Dp___init__impl__ms3zkb(24.0);
    this.InactiveFocusIconColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.InactiveFocusLabelTextColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.InactiveHoverIconColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.InactiveHoverLabelTextColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.InactiveIconColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.InactiveLabelTextColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.InactivePressedIconColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.InactivePressedLabelTextColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.LabelTextFont_1 = TypographyKeyTokens_LabelMedium_getInstance();
  }
  protoOf(NavigationBarTokens).get_ActiveFocusIconColor_lb537l_k$ = function () {
    return this.ActiveFocusIconColor_1;
  };
  protoOf(NavigationBarTokens).get_ActiveFocusLabelTextColor_dktzbp_k$ = function () {
    return this.ActiveFocusLabelTextColor_1;
  };
  protoOf(NavigationBarTokens).get_ActiveHoverIconColor_qoai71_k$ = function () {
    return this.ActiveHoverIconColor_1;
  };
  protoOf(NavigationBarTokens).get_ActiveHoverLabelTextColor_3blpdd_k$ = function () {
    return this.ActiveHoverLabelTextColor_1;
  };
  protoOf(NavigationBarTokens).get_ActiveIconColor_711la3_k$ = function () {
    return this.ActiveIconColor_1;
  };
  protoOf(NavigationBarTokens).get_ActiveIndicatorColor_qs91el_k$ = function () {
    return this.ActiveIndicatorColor_1;
  };
  protoOf(NavigationBarTokens).get_ActiveIndicatorHeight_7eyzzw_k$ = function () {
    return this.ActiveIndicatorHeight_1;
  };
  protoOf(NavigationBarTokens).get_ActiveIndicatorShape_qjl0yn_k$ = function () {
    return this.ActiveIndicatorShape_1;
  };
  protoOf(NavigationBarTokens).get_ActiveIndicatorWidth_9j3j1_k$ = function () {
    return this.ActiveIndicatorWidth_1;
  };
  protoOf(NavigationBarTokens).get_ActiveLabelTextColor_r86xqn_k$ = function () {
    return this.ActiveLabelTextColor_1;
  };
  protoOf(NavigationBarTokens).get_ActivePressedIconColor_67xft5_k$ = function () {
    return this.ActivePressedIconColor_1;
  };
  protoOf(NavigationBarTokens).get_ActivePressedLabelTextColor_cyqlqj_k$ = function () {
    return this.ActivePressedLabelTextColor_1;
  };
  protoOf(NavigationBarTokens).get_ContainerColor_uid763_k$ = function () {
    return this.ContainerColor_1;
  };
  protoOf(NavigationBarTokens).get_ContainerElevation_414o2_k$ = function () {
    return this.ContainerElevation_1;
  };
  protoOf(NavigationBarTokens).get_ContainerHeight_9lch44_k$ = function () {
    return this.ContainerHeight_1;
  };
  protoOf(NavigationBarTokens).get_ContainerShape_ur17m1_k$ = function () {
    return this.ContainerShape_1;
  };
  protoOf(NavigationBarTokens).get_ContainerSurfaceTintLayerColor_7z24ta_k$ = function () {
    return this.ContainerSurfaceTintLayerColor_1;
  };
  protoOf(NavigationBarTokens).get_IconSize_fa6wyo_k$ = function () {
    return this.IconSize_1;
  };
  protoOf(NavigationBarTokens).get_InactiveFocusIconColor_oyetwm_k$ = function () {
    return this.InactiveFocusIconColor_1;
  };
  protoOf(NavigationBarTokens).get_InactiveFocusLabelTextColor_3u9xei_k$ = function () {
    return this.InactiveFocusLabelTextColor_1;
  };
  protoOf(NavigationBarTokens).get_InactiveHoverIconColor_ubk8w2_k$ = function () {
    return this.InactiveHoverIconColor_1;
  };
  protoOf(NavigationBarTokens).get_InactiveHoverLabelTextColor_6eycju_k$ = function () {
    return this.InactiveHoverLabelTextColor_1;
  };
  protoOf(NavigationBarTokens).get_InactiveIconColor_kn5l6e_k$ = function () {
    return this.InactiveIconColor_1;
  };
  protoOf(NavigationBarTokens).get_InactiveLabelTextColor_nkx71m_k$ = function () {
    return this.InactiveLabelTextColor_1;
  };
  protoOf(NavigationBarTokens).get_InactivePressedIconColor_hglhi4_k$ = function () {
    return this.InactivePressedIconColor_1;
  };
  protoOf(NavigationBarTokens).get_InactivePressedLabelTextColor_v4ajdc_k$ = function () {
    return this.InactivePressedLabelTextColor_1;
  };
  protoOf(NavigationBarTokens).get_LabelTextFont_th3yzr_k$ = function () {
    return this.LabelTextFont_1;
  };
  var NavigationBarTokens_instance;
  function NavigationBarTokens_getInstance() {
    if (NavigationBarTokens_instance == null)
      new NavigationBarTokens();
    return NavigationBarTokens_instance;
  }
  function NavigationRailTokens() {
    NavigationRailTokens_instance = this;
    this.ActiveFocusIconColor_1 = ColorSchemeKeyTokens_OnSecondaryContainer_getInstance();
    this.ActiveFocusLabelTextColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.ActiveHoverIconColor_1 = ColorSchemeKeyTokens_OnSecondaryContainer_getInstance();
    this.ActiveHoverLabelTextColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.ActiveIconColor_1 = ColorSchemeKeyTokens_OnSecondaryContainer_getInstance();
    this.ActiveIndicatorColor_1 = ColorSchemeKeyTokens_SecondaryContainer_getInstance();
    var tmp = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp.ActiveIndicatorHeight_1 = _Dp___init__impl__ms3zkb(32.0);
    this.ActiveIndicatorShape_1 = ShapeKeyTokens_CornerFull_getInstance();
    var tmp_0 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_0.ActiveIndicatorWidth_1 = _Dp___init__impl__ms3zkb(56.0);
    this.ActiveLabelTextColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.ActivePressedIconColor_1 = ColorSchemeKeyTokens_OnSecondaryContainer_getInstance();
    this.ActivePressedLabelTextColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.ContainerColor_1 = ColorSchemeKeyTokens_Surface_getInstance();
    this.ContainerElevation_1 = ElevationTokens_getInstance().get_Level0_p4lxse_k$();
    this.ContainerShape_1 = ShapeKeyTokens_CornerNone_getInstance();
    var tmp_1 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_1.ContainerWidth_1 = _Dp___init__impl__ms3zkb(80.0);
    var tmp_2 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_2.IconSize_1 = _Dp___init__impl__ms3zkb(24.0);
    this.InactiveFocusIconColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.InactiveFocusLabelTextColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.InactiveHoverIconColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.InactiveHoverLabelTextColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.InactiveIconColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.InactiveLabelTextColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.InactivePressedIconColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.InactivePressedLabelTextColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.LabelTextFont_1 = TypographyKeyTokens_LabelMedium_getInstance();
    this.MenuFocusIconColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.MenuHoverIconColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.MenuIconColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    var tmp_3 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_3.MenuIconSize_1 = _Dp___init__impl__ms3zkb(24.0);
    this.MenuPressedIconColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    var tmp_4 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_4.NoLabelActiveIndicatorHeight_1 = _Dp___init__impl__ms3zkb(56.0);
    this.NoLabelActiveIndicatorShape_1 = ShapeKeyTokens_CornerFull_getInstance();
  }
  protoOf(NavigationRailTokens).get_ActiveFocusIconColor_lb537l_k$ = function () {
    return this.ActiveFocusIconColor_1;
  };
  protoOf(NavigationRailTokens).get_ActiveFocusLabelTextColor_dktzbp_k$ = function () {
    return this.ActiveFocusLabelTextColor_1;
  };
  protoOf(NavigationRailTokens).get_ActiveHoverIconColor_qoai71_k$ = function () {
    return this.ActiveHoverIconColor_1;
  };
  protoOf(NavigationRailTokens).get_ActiveHoverLabelTextColor_3blpdd_k$ = function () {
    return this.ActiveHoverLabelTextColor_1;
  };
  protoOf(NavigationRailTokens).get_ActiveIconColor_711la3_k$ = function () {
    return this.ActiveIconColor_1;
  };
  protoOf(NavigationRailTokens).get_ActiveIndicatorColor_qs91el_k$ = function () {
    return this.ActiveIndicatorColor_1;
  };
  protoOf(NavigationRailTokens).get_ActiveIndicatorHeight_7eyzzw_k$ = function () {
    return this.ActiveIndicatorHeight_1;
  };
  protoOf(NavigationRailTokens).get_ActiveIndicatorShape_qjl0yn_k$ = function () {
    return this.ActiveIndicatorShape_1;
  };
  protoOf(NavigationRailTokens).get_ActiveIndicatorWidth_9j3j1_k$ = function () {
    return this.ActiveIndicatorWidth_1;
  };
  protoOf(NavigationRailTokens).get_ActiveLabelTextColor_r86xqn_k$ = function () {
    return this.ActiveLabelTextColor_1;
  };
  protoOf(NavigationRailTokens).get_ActivePressedIconColor_67xft5_k$ = function () {
    return this.ActivePressedIconColor_1;
  };
  protoOf(NavigationRailTokens).get_ActivePressedLabelTextColor_cyqlqj_k$ = function () {
    return this.ActivePressedLabelTextColor_1;
  };
  protoOf(NavigationRailTokens).get_ContainerColor_uid763_k$ = function () {
    return this.ContainerColor_1;
  };
  protoOf(NavigationRailTokens).get_ContainerElevation_414o2_k$ = function () {
    return this.ContainerElevation_1;
  };
  protoOf(NavigationRailTokens).get_ContainerShape_ur17m1_k$ = function () {
    return this.ContainerShape_1;
  };
  protoOf(NavigationRailTokens).get_ContainerWidth_77irhx_k$ = function () {
    return this.ContainerWidth_1;
  };
  protoOf(NavigationRailTokens).get_IconSize_fa6wyo_k$ = function () {
    return this.IconSize_1;
  };
  protoOf(NavigationRailTokens).get_InactiveFocusIconColor_oyetwm_k$ = function () {
    return this.InactiveFocusIconColor_1;
  };
  protoOf(NavigationRailTokens).get_InactiveFocusLabelTextColor_3u9xei_k$ = function () {
    return this.InactiveFocusLabelTextColor_1;
  };
  protoOf(NavigationRailTokens).get_InactiveHoverIconColor_ubk8w2_k$ = function () {
    return this.InactiveHoverIconColor_1;
  };
  protoOf(NavigationRailTokens).get_InactiveHoverLabelTextColor_6eycju_k$ = function () {
    return this.InactiveHoverLabelTextColor_1;
  };
  protoOf(NavigationRailTokens).get_InactiveIconColor_kn5l6e_k$ = function () {
    return this.InactiveIconColor_1;
  };
  protoOf(NavigationRailTokens).get_InactiveLabelTextColor_nkx71m_k$ = function () {
    return this.InactiveLabelTextColor_1;
  };
  protoOf(NavigationRailTokens).get_InactivePressedIconColor_hglhi4_k$ = function () {
    return this.InactivePressedIconColor_1;
  };
  protoOf(NavigationRailTokens).get_InactivePressedLabelTextColor_v4ajdc_k$ = function () {
    return this.InactivePressedLabelTextColor_1;
  };
  protoOf(NavigationRailTokens).get_LabelTextFont_th3yzr_k$ = function () {
    return this.LabelTextFont_1;
  };
  protoOf(NavigationRailTokens).get_MenuFocusIconColor_rtf42i_k$ = function () {
    return this.MenuFocusIconColor_1;
  };
  protoOf(NavigationRailTokens).get_MenuHoverIconColor_x6kj1y_k$ = function () {
    return this.MenuHoverIconColor_1;
  };
  protoOf(NavigationRailTokens).get_MenuIconColor_y4wigu_k$ = function () {
    return this.MenuIconColor_1;
  };
  protoOf(NavigationRailTokens).get_MenuIconSize_oz3vbz_k$ = function () {
    return this.MenuIconSize_1;
  };
  protoOf(NavigationRailTokens).get_MenuPressedIconColor_309cc0_k$ = function () {
    return this.MenuPressedIconColor_1;
  };
  protoOf(NavigationRailTokens).get_NoLabelActiveIndicatorHeight_91igar_k$ = function () {
    return this.NoLabelActiveIndicatorHeight_1;
  };
  protoOf(NavigationRailTokens).get_NoLabelActiveIndicatorShape_8gybpa_k$ = function () {
    return this.NoLabelActiveIndicatorShape_1;
  };
  var NavigationRailTokens_instance;
  function NavigationRailTokens_getInstance() {
    if (NavigationRailTokens_instance == null)
      new NavigationRailTokens();
    return NavigationRailTokens_instance;
  }
  function OutlinedTextFieldTokens() {
    OutlinedTextFieldTokens_instance = this;
    this.CaretColor_1 = ColorSchemeKeyTokens_Primary_getInstance();
    var tmp = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp.ContainerHeight_1 = _Dp___init__impl__ms3zkb(56.0);
    this.ContainerShape_1 = ShapeKeyTokens_CornerExtraSmall_getInstance();
    this.DisabledInputColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.DisabledInputOpacity_1 = 0.38;
    this.DisabledLabelColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.DisabledLabelOpacity_1 = 0.38;
    this.DisabledLeadingIconColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.DisabledLeadingIconOpacity_1 = 0.38;
    this.DisabledOutlineColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.DisabledOutlineOpacity_1 = 0.12;
    var tmp_0 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_0.DisabledOutlineWidth_1 = _Dp___init__impl__ms3zkb(1.0);
    this.DisabledSupportingColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.DisabledSupportingOpacity_1 = 0.38;
    this.DisabledTrailingIconColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.DisabledTrailingIconOpacity_1 = 0.38;
    this.ErrorFocusCaretColor_1 = ColorSchemeKeyTokens_Error_getInstance();
    this.ErrorFocusInputColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.ErrorFocusLabelColor_1 = ColorSchemeKeyTokens_Error_getInstance();
    this.ErrorFocusLeadingIconColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.ErrorFocusOutlineColor_1 = ColorSchemeKeyTokens_Error_getInstance();
    this.ErrorFocusSupportingColor_1 = ColorSchemeKeyTokens_Error_getInstance();
    this.ErrorFocusTrailingIconColor_1 = ColorSchemeKeyTokens_Error_getInstance();
    this.ErrorHoverInputColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.ErrorHoverLabelColor_1 = ColorSchemeKeyTokens_OnErrorContainer_getInstance();
    this.ErrorHoverLeadingIconColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.ErrorHoverOutlineColor_1 = ColorSchemeKeyTokens_OnErrorContainer_getInstance();
    this.ErrorHoverSupportingColor_1 = ColorSchemeKeyTokens_Error_getInstance();
    this.ErrorHoverTrailingIconColor_1 = ColorSchemeKeyTokens_OnErrorContainer_getInstance();
    this.ErrorInputColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.ErrorLabelColor_1 = ColorSchemeKeyTokens_Error_getInstance();
    this.ErrorLeadingIconColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.ErrorOutlineColor_1 = ColorSchemeKeyTokens_Error_getInstance();
    this.ErrorSupportingColor_1 = ColorSchemeKeyTokens_Error_getInstance();
    this.ErrorTrailingIconColor_1 = ColorSchemeKeyTokens_Error_getInstance();
    this.FocusInputColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.FocusLabelColor_1 = ColorSchemeKeyTokens_Primary_getInstance();
    this.FocusLeadingIconColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.FocusOutlineColor_1 = ColorSchemeKeyTokens_Primary_getInstance();
    var tmp_1 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_1.FocusOutlineWidth_1 = _Dp___init__impl__ms3zkb(2.0);
    this.FocusSupportingColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.FocusTrailingIconColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.HoverInputColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.HoverLabelColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.HoverLeadingIconColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.HoverOutlineColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    var tmp_2 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_2.HoverOutlineWidth_1 = _Dp___init__impl__ms3zkb(1.0);
    this.HoverSupportingColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.HoverTrailingIconColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.InputColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.InputFont_1 = TypographyKeyTokens_BodyLarge_getInstance();
    this.InputPlaceholderColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.InputPrefixColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.InputSuffixColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.LabelColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.LabelFont_1 = TypographyKeyTokens_BodyLarge_getInstance();
    this.LeadingIconColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    var tmp_3 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_3.LeadingIconSize_1 = _Dp___init__impl__ms3zkb(24.0);
    this.OutlineColor_1 = ColorSchemeKeyTokens_Outline_getInstance();
    var tmp_4 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_4.OutlineWidth_1 = _Dp___init__impl__ms3zkb(1.0);
    this.SupportingColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.SupportingFont_1 = TypographyKeyTokens_BodySmall_getInstance();
    this.TrailingIconColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    var tmp_5 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_5.TrailingIconSize_1 = _Dp___init__impl__ms3zkb(24.0);
  }
  protoOf(OutlinedTextFieldTokens).get_CaretColor_hxe08n_k$ = function () {
    return this.CaretColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_ContainerHeight_9lch44_k$ = function () {
    return this.ContainerHeight_1;
  };
  protoOf(OutlinedTextFieldTokens).get_ContainerShape_ur17m1_k$ = function () {
    return this.ContainerShape_1;
  };
  protoOf(OutlinedTextFieldTokens).get_DisabledInputColor_84w2ke_k$ = function () {
    return this.DisabledInputColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_DisabledInputOpacity_vi261m_k$ = function () {
    return this.DisabledInputOpacity_1;
  };
  protoOf(OutlinedTextFieldTokens).get_DisabledLabelColor_sycis4_k$ = function () {
    return this.DisabledLabelColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_DisabledLabelOpacity_f5f918_k$ = function () {
    return this.DisabledLabelOpacity_1;
  };
  protoOf(OutlinedTextFieldTokens).get_DisabledLeadingIconColor_dtgxah_k$ = function () {
    return this.DisabledLeadingIconColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_DisabledLeadingIconOpacity_va1u41_k$ = function () {
    return this.DisabledLeadingIconOpacity_1;
  };
  protoOf(OutlinedTextFieldTokens).get_DisabledOutlineColor_jjhidi_k$ = function () {
    return this.DisabledOutlineColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_DisabledOutlineOpacity_9n3m4y_k$ = function () {
    return this.DisabledOutlineOpacity_1;
  };
  protoOf(OutlinedTextFieldTokens).get_DisabledOutlineWidth_3m248q_k$ = function () {
    return this.DisabledOutlineWidth_1;
  };
  protoOf(OutlinedTextFieldTokens).get_DisabledSupportingColor_hh8a7p_k$ = function () {
    return this.DisabledSupportingColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_DisabledSupportingOpacity_prppv_k$ = function () {
    return this.DisabledSupportingOpacity_1;
  };
  protoOf(OutlinedTextFieldTokens).get_DisabledTrailingIconColor_mjc79l_k$ = function () {
    return this.DisabledTrailingIconColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_DisabledTrailingIconOpacity_s6onap_k$ = function () {
    return this.DisabledTrailingIconOpacity_1;
  };
  protoOf(OutlinedTextFieldTokens).get_ErrorFocusCaretColor_vrfnbt_k$ = function () {
    return this.ErrorFocusCaretColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_ErrorFocusInputColor_dyfboy_k$ = function () {
    return this.ErrorFocusInputColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_ErrorFocusLabelColor_yrvrwo_k$ = function () {
    return this.ErrorFocusLabelColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_ErrorFocusLeadingIconColor_buopz7_k$ = function () {
    return this.ErrorFocusLeadingIconColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_ErrorFocusOutlineColor_1ijsxm_k$ = function () {
    return this.ErrorFocusOutlineColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_ErrorFocusSupportingColor_ye65lj_k$ = function () {
    return this.ErrorFocusSupportingColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_ErrorFocusTrailingIconColor_82pro5_k$ = function () {
    return this.ErrorFocusTrailingIconColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_ErrorHoverInputColor_wt8xpm_k$ = function () {
    return this.ErrorHoverInputColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_ErrorHoverLabelColor_bzshhw_k$ = function () {
    return this.ErrorHoverLabelColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_ErrorHoverLeadingIconColor_sren1b_k$ = function () {
    return this.ErrorHoverLeadingIconColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_ErrorHoverOutlineColor_jc7hr2_k$ = function () {
    return this.ErrorHoverOutlineColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_ErrorHoverSupportingColor_2t9jpp_k$ = function () {
    return this.ErrorHoverSupportingColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_ErrorHoverTrailingIconColor_ivtbbj_k$ = function () {
    return this.ErrorHoverTrailingIconColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_ErrorInputColor_hh1yg_k$ = function () {
    return this.ErrorInputColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_ErrorLabelColor_kbze9a_k$ = function () {
    return this.ErrorLabelColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_ErrorLeadingIconColor_b3l6n7_k$ = function () {
    return this.ErrorLeadingIconColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_ErrorOutlineColor_pvtv8g_k$ = function () {
    return this.ErrorOutlineColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_ErrorSupportingColor_63y79r_k$ = function () {
    return this.ErrorSupportingColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_ErrorTrailingIconColor_9a4b73_k$ = function () {
    return this.ErrorTrailingIconColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_FocusInputColor_ydhhuw_k$ = function () {
    return this.FocusInputColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_FocusLabelColor_fu63wi_k$ = function () {
    return this.FocusLabelColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_FocusLeadingIconColor_pqzv77_k$ = function () {
    return this.FocusLeadingIconColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_FocusOutlineColor_j0f8fk_k$ = function () {
    return this.FocusOutlineColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_FocusOutlineWidth_cjy8fk_k$ = function () {
    return this.FocusOutlineWidth_1;
  };
  protoOf(OutlinedTextFieldTokens).get_FocusSupportingColor_nyu4nz_k$ = function () {
    return this.FocusSupportingColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_FocusTrailingIconColor_xs0xep_k$ = function () {
    return this.FocusTrailingIconColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_HoverInputColor_ce6rjo_k$ = function () {
    return this.HoverInputColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_HoverLabelColor_8f9oo2_k$ = function () {
    return this.HoverLabelColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_HoverLeadingIconColor_8u9y53_k$ = function () {
    return this.HoverLeadingIconColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_HoverOutlineColor_y714q4_k$ = function () {
    return this.HoverOutlineColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_HoverOutlineWidth_lk965o_k$ = function () {
    return this.HoverOutlineWidth_1;
  };
  protoOf(OutlinedTextFieldTokens).get_HoverSupportingColor_9uu7zx_k$ = function () {
    return this.HoverSupportingColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_HoverTrailingIconColor_aak1kr_k$ = function () {
    return this.HoverTrailingIconColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_InputColor_zapq3m_k$ = function () {
    return this.InputColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_InputFont_15fyq8_k$ = function () {
    return this.InputFont_1;
  };
  protoOf(OutlinedTextFieldTokens).get_InputPlaceholderColor_5cj1ap_k$ = function () {
    return this.InputPlaceholderColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_InputPrefixColor_l0lf3k_k$ = function () {
    return this.InputPrefixColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_InputSuffixColor_ya4w9d_k$ = function () {
    return this.InputSuffixColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_LabelColor_ewxvns_k$ = function () {
    return this.LabelColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_LabelFont_vlk2oq_k$ = function () {
    return this.LabelFont_1;
  };
  protoOf(OutlinedTextFieldTokens).get_LeadingIconColor_4sfzzh_k$ = function () {
    return this.LeadingIconColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_LeadingIconSize_938iac_k$ = function () {
    return this.LeadingIconSize_1;
  };
  protoOf(OutlinedTextFieldTokens).get_OutlineColor_hddgeu_k$ = function () {
    return this.OutlineColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_OutlineWidth_tgbnmy_k$ = function () {
    return this.OutlineWidth_1;
  };
  protoOf(OutlinedTextFieldTokens).get_SupportingColor_eb3yw7_k$ = function () {
    return this.SupportingColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_SupportingFont_mg7e45_k$ = function () {
    return this.SupportingFont_1;
  };
  protoOf(OutlinedTextFieldTokens).get_TrailingIconColor_qrzqp1_k$ = function () {
    return this.TrailingIconColor_1;
  };
  protoOf(OutlinedTextFieldTokens).get_TrailingIconSize_fxsdr0_k$ = function () {
    return this.TrailingIconSize_1;
  };
  var OutlinedTextFieldTokens_instance;
  function OutlinedTextFieldTokens_getInstance() {
    if (OutlinedTextFieldTokens_instance == null)
      new OutlinedTextFieldTokens();
    return OutlinedTextFieldTokens_instance;
  }
  function PaletteTokens() {
    PaletteTokens_instance = this;
    this.Black_1 = Color_0(0, 0, 0);
    this.Error0__1 = Color_0(0, 0, 0);
    this.Error10__1 = Color_0(65, 14, 11);
    this.Error100__1 = Color_0(255, 255, 255);
    this.Error20__1 = Color_0(96, 20, 16);
    this.Error30__1 = Color_0(140, 29, 24);
    this.Error40__1 = Color_0(179, 38, 30);
    this.Error50__1 = Color_0(220, 54, 46);
    this.Error60__1 = Color_0(228, 105, 98);
    this.Error70__1 = Color_0(236, 146, 142);
    this.Error80__1 = Color_0(242, 184, 181);
    this.Error90__1 = Color_0(249, 222, 220);
    this.Error95__1 = Color_0(252, 238, 238);
    this.Error99__1 = Color_0(255, 251, 249);
    this.Neutral0__1 = Color_0(0, 0, 0);
    this.Neutral10__1 = Color_0(28, 27, 31);
    this.Neutral100__1 = Color_0(255, 255, 255);
    this.Neutral20__1 = Color_0(49, 48, 51);
    this.Neutral30__1 = Color_0(72, 70, 73);
    this.Neutral40__1 = Color_0(96, 93, 98);
    this.Neutral50__1 = Color_0(120, 117, 121);
    this.Neutral60__1 = Color_0(147, 144, 148);
    this.Neutral70__1 = Color_0(174, 170, 174);
    this.Neutral80__1 = Color_0(201, 197, 202);
    this.Neutral90__1 = Color_0(230, 225, 229);
    this.Neutral95__1 = Color_0(244, 239, 244);
    this.Neutral99__1 = Color_0(255, 251, 254);
    this.NeutralVariant0__1 = Color_0(0, 0, 0);
    this.NeutralVariant10__1 = Color_0(29, 26, 34);
    this.NeutralVariant100__1 = Color_0(255, 255, 255);
    this.NeutralVariant20__1 = Color_0(50, 47, 55);
    this.NeutralVariant30__1 = Color_0(73, 69, 79);
    this.NeutralVariant40__1 = Color_0(96, 93, 102);
    this.NeutralVariant50__1 = Color_0(121, 116, 126);
    this.NeutralVariant60__1 = Color_0(147, 143, 153);
    this.NeutralVariant70__1 = Color_0(174, 169, 180);
    this.NeutralVariant80__1 = Color_0(202, 196, 208);
    this.NeutralVariant90__1 = Color_0(231, 224, 236);
    this.NeutralVariant95__1 = Color_0(245, 238, 250);
    this.NeutralVariant99__1 = Color_0(255, 251, 254);
    this.Primary0__1 = Color_0(0, 0, 0);
    this.Primary10__1 = Color_0(33, 0, 93);
    this.Primary100__1 = Color_0(255, 255, 255);
    this.Primary20__1 = Color_0(56, 30, 114);
    this.Primary30__1 = Color_0(79, 55, 139);
    this.Primary40__1 = Color_0(103, 80, 164);
    this.Primary50__1 = Color_0(127, 103, 190);
    this.Primary60__1 = Color_0(154, 130, 219);
    this.Primary70__1 = Color_0(182, 157, 248);
    this.Primary80__1 = Color_0(208, 188, 255);
    this.Primary90__1 = Color_0(234, 221, 255);
    this.Primary95__1 = Color_0(246, 237, 255);
    this.Primary99__1 = Color_0(255, 251, 254);
    this.Secondary0__1 = Color_0(0, 0, 0);
    this.Secondary10__1 = Color_0(29, 25, 43);
    this.Secondary100__1 = Color_0(255, 255, 255);
    this.Secondary20__1 = Color_0(51, 45, 65);
    this.Secondary30__1 = Color_0(74, 68, 88);
    this.Secondary40__1 = Color_0(98, 91, 113);
    this.Secondary50__1 = Color_0(122, 114, 137);
    this.Secondary60__1 = Color_0(149, 141, 165);
    this.Secondary70__1 = Color_0(176, 167, 192);
    this.Secondary80__1 = Color_0(204, 194, 220);
    this.Secondary90__1 = Color_0(232, 222, 248);
    this.Secondary95__1 = Color_0(246, 237, 255);
    this.Secondary99__1 = Color_0(255, 251, 254);
    this.Tertiary0__1 = Color_0(0, 0, 0);
    this.Tertiary10__1 = Color_0(49, 17, 29);
    this.Tertiary100__1 = Color_0(255, 255, 255);
    this.Tertiary20__1 = Color_0(73, 37, 50);
    this.Tertiary30__1 = Color_0(99, 59, 72);
    this.Tertiary40__1 = Color_0(125, 82, 96);
    this.Tertiary50__1 = Color_0(152, 105, 119);
    this.Tertiary60__1 = Color_0(181, 131, 146);
    this.Tertiary70__1 = Color_0(210, 157, 172);
    this.Tertiary80__1 = Color_0(239, 184, 200);
    this.Tertiary90__1 = Color_0(255, 216, 228);
    this.Tertiary95__1 = Color_0(255, 236, 241);
    this.Tertiary99__1 = Color_0(255, 251, 250);
    this.White_1 = Color_0(255, 255, 255);
  }
  protoOf(PaletteTokens).get_Black_t4k9fh_k$ = function () {
    return this.Black_1;
  };
  protoOf(PaletteTokens).get_Error0_srwv2g_k$ = function () {
    return this.Error0__1;
  };
  protoOf(PaletteTokens).get_Error10_uevkyj_k$ = function () {
    return this.Error10__1;
  };
  protoOf(PaletteTokens).get_Error100_sv0bbt_k$ = function () {
    return this.Error100__1;
  };
  protoOf(PaletteTokens).get_Error20_1lkc2s_k$ = function () {
    return this.Error20__1;
  };
  protoOf(PaletteTokens).get_Error30_xm0943_k$ = function () {
    return this.Error30__1;
  };
  protoOf(PaletteTokens).get_Error40_5envtq_k$ = function () {
    return this.Error40__1;
  };
  protoOf(PaletteTokens).get_Error50_qls17l_k$ = function () {
    return this.Error50__1;
  };
  protoOf(PaletteTokens).get_Error60_cew3q8_k$ = function () {
    return this.Error60__1;
  };
  protoOf(PaletteTokens).get_Error70_jljtb3_k$ = function () {
    return this.Error70__1;
  };
  protoOf(PaletteTokens).get_Error80_jf4bmq_k$ = function () {
    return this.Error80__1;
  };
  protoOf(PaletteTokens).get_Error90_clblel_k$ = function () {
    return this.Error90__1;
  };
  protoOf(PaletteTokens).get_Error95_xsm1mq_k$ = function () {
    return this.Error95__1;
  };
  protoOf(PaletteTokens).get_Error99_84z686_k$ = function () {
    return this.Error99__1;
  };
  protoOf(PaletteTokens).get_Neutral0_j7fvbb_k$ = function () {
    return this.Neutral0__1;
  };
  protoOf(PaletteTokens).get_Neutral10_hwp0ho_k$ = function () {
    return this.Neutral10__1;
  };
  protoOf(PaletteTokens).get_Neutral100_9o0e06_k$ = function () {
    return this.Neutral100__1;
  };
  protoOf(PaletteTokens).get_Neutral20_e3qwjn_k$ = function () {
    return this.Neutral20__1;
  };
  protoOf(PaletteTokens).get_Neutral30_owx8e6_k$ = function () {
    return this.Neutral30__1;
  };
  protoOf(PaletteTokens).get_Neutral40_73ion5_k$ = function () {
    return this.Neutral40__1;
  };
  protoOf(PaletteTokens).get_Neutral50_vx5gao_k$ = function () {
    return this.Neutral50__1;
  };
  protoOf(PaletteTokens).get_Neutral60_3agqn_k$ = function () {
    return this.Neutral60__1;
  };
  protoOf(PaletteTokens).get_Neutral70_w3qdry_k$ = function () {
    return this.Neutral70__1;
  };
  protoOf(PaletteTokens).get_Neutral80_6wxr5v_k$ = function () {
    return this.Neutral80__1;
  };
  protoOf(PaletteTokens).get_Neutral90_p3i5vg_k$ = function () {
    return this.Neutral90__1;
  };
  protoOf(PaletteTokens).get_Neutral95_oqbfvj_k$ = function () {
    return this.Neutral95__1;
  };
  protoOf(PaletteTokens).get_Neutral99_kn5qp1_k$ = function () {
    return this.Neutral99__1;
  };
  protoOf(PaletteTokens).get_NeutralVariant0_80vofk_k$ = function () {
    return this.NeutralVariant0__1;
  };
  protoOf(PaletteTokens).get_NeutralVariant10_qevd0z_k$ = function () {
    return this.NeutralVariant10__1;
  };
  protoOf(PaletteTokens).get_NeutralVariant100_asz19t_k$ = function () {
    return this.NeutralVariant100__1;
  };
  protoOf(PaletteTokens).get_NeutralVariant20_5lkk0c_k$ = function () {
    return this.NeutralVariant20__1;
  };
  protoOf(PaletteTokens).get_NeutralVariant30_xf3kxh_k$ = function () {
    return this.NeutralVariant30__1;
  };
  protoOf(PaletteTokens).get_NeutralVariant40_1ennw6_k$ = function () {
    return this.NeutralVariant40__1;
  };
  protoOf(PaletteTokens).get_NeutralVariant50_uls955_k$ = function () {
    return this.NeutralVariant50__1;
  };
  protoOf(PaletteTokens).get_NeutralVariant60_8evvso_k$ = function () {
    return this.NeutralVariant60__1;
  };
  protoOf(PaletteTokens).get_NeutralVariant70_nlk18n_k$ = function () {
    return this.NeutralVariant70__1;
  };
  protoOf(PaletteTokens).get_NeutralVariant80_ff43p6_k$ = function () {
    return this.NeutralVariant80__1;
  };
  protoOf(PaletteTokens).get_NeutralVariant90_glbtc5_k$ = function () {
    return this.NeutralVariant90__1;
  };
  protoOf(PaletteTokens).get_NeutralVariant95_x8hseu_k$ = function () {
    return this.NeutralVariant95__1;
  };
  protoOf(PaletteTokens).get_NeutralVariant99_c4ze5q_k$ = function () {
    return this.NeutralVariant99__1;
  };
  protoOf(PaletteTokens).get_Primary0_v0b1j6_k$ = function () {
    return this.Primary0__1;
  };
  protoOf(PaletteTokens).get_Primary10_slz3dt_k$ = function () {
    return this.Primary10__1;
  };
  protoOf(PaletteTokens).get_Primary100_dpve73_k$ = function () {
    return this.Primary100__1;
  };
  protoOf(PaletteTokens).get_Primary20_3egtni_k$ = function () {
    return this.Primary20__1;
  };
  protoOf(PaletteTokens).get_Primary30_zewqot_k$ = function () {
    return this.Primary30__1;
  };
  protoOf(PaletteTokens).get_Primary40_3lre90_k$ = function () {
    return this.Primary40__1;
  };
  protoOf(PaletteTokens).get_Primary50_seoisb_k$ = function () {
    return this.Primary50__1;
  };
  protoOf(PaletteTokens).get_Primary60_alzm5i_k$ = function () {
    return this.Primary60__1;
  };
  protoOf(PaletteTokens).get_Primary70_legavt_k$ = function () {
    return this.Primary70__1;
  };
  protoOf(PaletteTokens).get_Primary80_hm7u20_k$ = function () {
    return this.Primary80__1;
  };
  protoOf(PaletteTokens).get_Primary90_ee82zb_k$ = function () {
    return this.Primary90__1;
  };
  protoOf(PaletteTokens).get_Primary95_zfliro_k$ = function () {
    return this.Primary95__1;
  };
  protoOf(PaletteTokens).get_Primary99_9xvnsw_k$ = function () {
    return this.Primary99__1;
  };
  protoOf(PaletteTokens).get_Secondary0_h1irec_k$ = function () {
    return this.Secondary0__1;
  };
  protoOf(PaletteTokens).get_Secondary10_luap2n_k$ = function () {
    return this.Secondary10__1;
  };
  protoOf(PaletteTokens).get_Secondary100_agjjvx_k$ = function () {
    return this.Secondary100__1;
  };
  protoOf(PaletteTokens).get_Secondary20_a657yo_k$ = function () {
    return this.Secondary20__1;
  };
  protoOf(PaletteTokens).get_Secondary30_suiwz5_k$ = function () {
    return this.Secondary30__1;
  };
  protoOf(PaletteTokens).get_Secondary40_35x026_k$ = function () {
    return this.Secondary40__1;
  };
  protoOf(PaletteTokens).get_Secondary50_z6cx3h_k$ = function () {
    return this.Secondary50__1;
  };
  protoOf(PaletteTokens).get_Secondary60_3ub7uc_k$ = function () {
    return this.Secondary60__1;
  };
  protoOf(PaletteTokens).get_Secondary70_s64p6z_k$ = function () {
    return this.Secondary70__1;
  };
  protoOf(PaletteTokens).get_Secondary80_aujfqu_k$ = function () {
    return this.Secondary80__1;
  };
  protoOf(PaletteTokens).get_Secondary90_l5whah_k$ = function () {
    return this.Secondary90__1;
  };
  protoOf(PaletteTokens).get_Secondary95_snx4gi_k$ = function () {
    return this.Secondary95__1;
  };
  protoOf(PaletteTokens).get_Secondary99_gpk242_k$ = function () {
    return this.Secondary99__1;
  };
  protoOf(PaletteTokens).get_Tertiary0_ln3r9g_k$ = function () {
    return this.Tertiary0__1;
  };
  protoOf(PaletteTokens).get_Tertiary10_md5gwv_k$ = function () {
    return this.Tertiary10__1;
  };
  protoOf(PaletteTokens).get_Tertiary100_5ryf4z_k$ = function () {
    return this.Tertiary100__1;
  };
  protoOf(PaletteTokens).get_Tertiary20_9nag4g_k$ = function () {
    return this.Tertiary20__1;
  };
  protoOf(PaletteTokens).get_Tertiary30_tddotd_k$ = function () {
    return this.Tertiary30__1;
  };
  protoOf(PaletteTokens).get_Tertiary40_2n287y_k$ = function () {
    return this.Tertiary40__1;
  };
  protoOf(PaletteTokens).get_Tertiary50_yni599_k$ = function () {
    return this.Tertiary50__1;
  };
  protoOf(PaletteTokens).get_Tertiary60_4d5zok_k$ = function () {
    return this.Tertiary60__1;
  };
  protoOf(PaletteTokens).get_Tertiary70_rn9xcr_k$ = function () {
    return this.Tertiary70__1;
  };
  protoOf(PaletteTokens).get_Tertiary80_bde7l2_k$ = function () {
    return this.Tertiary80__1;
  };
  protoOf(PaletteTokens).get_Tertiary90_kn1pg9_k$ = function () {
    return this.Tertiary90__1;
  };
  protoOf(PaletteTokens).get_Tertiary95_t6rwaq_k$ = function () {
    return this.Tertiary95__1;
  };
  protoOf(PaletteTokens).get_Tertiary99_g6pa9u_k$ = function () {
    return this.Tertiary99__1;
  };
  protoOf(PaletteTokens).get_White_xpp3qf_k$ = function () {
    return this.White_1;
  };
  var PaletteTokens_instance;
  function PaletteTokens_getInstance() {
    if (PaletteTokens_instance == null)
      new PaletteTokens();
    return PaletteTokens_instance;
  }
  function PrimaryNavigationTabTokens() {
    PrimaryNavigationTabTokens_instance = this;
    this.ActiveIndicatorColor_1 = ColorSchemeKeyTokens_Primary_getInstance();
    var tmp = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp.ActiveIndicatorHeight_1 = _Dp___init__impl__ms3zkb(3.0);
    var tmp_0 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp$ret$1 = _Dp___init__impl__ms3zkb(3.0);
    tmp_0.ActiveIndicatorShape_1 = RoundedCornerShape(tmp$ret$1);
    this.ContainerColor_1 = ColorSchemeKeyTokens_Surface_getInstance();
    this.ContainerElevation_1 = ElevationTokens_getInstance().get_Level0_p4lxse_k$();
    var tmp_1 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_1.ContainerHeight_1 = _Dp___init__impl__ms3zkb(48.0);
    this.ContainerShape_1 = ShapeKeyTokens_CornerNone_getInstance();
    this.DividerColor_1 = ColorSchemeKeyTokens_SurfaceVariant_getInstance();
    var tmp_2 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_2.DividerHeight_1 = _Dp___init__impl__ms3zkb(1.0);
    this.ActiveFocusIconColor_1 = ColorSchemeKeyTokens_Primary_getInstance();
    this.ActiveHoverIconColor_1 = ColorSchemeKeyTokens_Primary_getInstance();
    this.ActiveIconColor_1 = ColorSchemeKeyTokens_Primary_getInstance();
    this.ActivePressedIconColor_1 = ColorSchemeKeyTokens_Primary_getInstance();
    var tmp_3 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_3.IconAndLabelTextContainerHeight_1 = _Dp___init__impl__ms3zkb(64.0);
    var tmp_4 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_4.IconSize_1 = _Dp___init__impl__ms3zkb(24.0);
    this.InactiveFocusIconColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.InactiveHoverIconColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.InactiveIconColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.InactivePressedIconColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.ActiveFocusLabelTextColor_1 = ColorSchemeKeyTokens_Primary_getInstance();
    this.ActiveHoverLabelTextColor_1 = ColorSchemeKeyTokens_Primary_getInstance();
    this.ActiveLabelTextColor_1 = ColorSchemeKeyTokens_Primary_getInstance();
    this.ActivePressedLabelTextColor_1 = ColorSchemeKeyTokens_Primary_getInstance();
    this.InactiveFocusLabelTextColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.InactiveHoverLabelTextColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.InactiveLabelTextColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.InactivePressedLabelTextColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.LabelTextFont_1 = TypographyKeyTokens_TitleSmall_getInstance();
  }
  protoOf(PrimaryNavigationTabTokens).get_ActiveIndicatorColor_qs91el_k$ = function () {
    return this.ActiveIndicatorColor_1;
  };
  protoOf(PrimaryNavigationTabTokens).get_ActiveIndicatorHeight_7eyzzw_k$ = function () {
    return this.ActiveIndicatorHeight_1;
  };
  protoOf(PrimaryNavigationTabTokens).get_ActiveIndicatorShape_qjl0yn_k$ = function () {
    return this.ActiveIndicatorShape_1;
  };
  protoOf(PrimaryNavigationTabTokens).get_ContainerColor_uid763_k$ = function () {
    return this.ContainerColor_1;
  };
  protoOf(PrimaryNavigationTabTokens).get_ContainerElevation_414o2_k$ = function () {
    return this.ContainerElevation_1;
  };
  protoOf(PrimaryNavigationTabTokens).get_ContainerHeight_9lch44_k$ = function () {
    return this.ContainerHeight_1;
  };
  protoOf(PrimaryNavigationTabTokens).get_ContainerShape_ur17m1_k$ = function () {
    return this.ContainerShape_1;
  };
  protoOf(PrimaryNavigationTabTokens).get_DividerColor_d6g0r1_k$ = function () {
    return this.DividerColor_1;
  };
  protoOf(PrimaryNavigationTabTokens).get_DividerHeight_d95p6c_k$ = function () {
    return this.DividerHeight_1;
  };
  protoOf(PrimaryNavigationTabTokens).get_ActiveFocusIconColor_lb537l_k$ = function () {
    return this.ActiveFocusIconColor_1;
  };
  protoOf(PrimaryNavigationTabTokens).get_ActiveHoverIconColor_qoai71_k$ = function () {
    return this.ActiveHoverIconColor_1;
  };
  protoOf(PrimaryNavigationTabTokens).get_ActiveIconColor_711la3_k$ = function () {
    return this.ActiveIconColor_1;
  };
  protoOf(PrimaryNavigationTabTokens).get_ActivePressedIconColor_67xft5_k$ = function () {
    return this.ActivePressedIconColor_1;
  };
  protoOf(PrimaryNavigationTabTokens).get_IconAndLabelTextContainerHeight_ezzh47_k$ = function () {
    return this.IconAndLabelTextContainerHeight_1;
  };
  protoOf(PrimaryNavigationTabTokens).get_IconSize_fa6wyo_k$ = function () {
    return this.IconSize_1;
  };
  protoOf(PrimaryNavigationTabTokens).get_InactiveFocusIconColor_oyetwm_k$ = function () {
    return this.InactiveFocusIconColor_1;
  };
  protoOf(PrimaryNavigationTabTokens).get_InactiveHoverIconColor_ubk8w2_k$ = function () {
    return this.InactiveHoverIconColor_1;
  };
  protoOf(PrimaryNavigationTabTokens).get_InactiveIconColor_kn5l6e_k$ = function () {
    return this.InactiveIconColor_1;
  };
  protoOf(PrimaryNavigationTabTokens).get_InactivePressedIconColor_hglhi4_k$ = function () {
    return this.InactivePressedIconColor_1;
  };
  protoOf(PrimaryNavigationTabTokens).get_ActiveFocusLabelTextColor_dktzbp_k$ = function () {
    return this.ActiveFocusLabelTextColor_1;
  };
  protoOf(PrimaryNavigationTabTokens).get_ActiveHoverLabelTextColor_3blpdd_k$ = function () {
    return this.ActiveHoverLabelTextColor_1;
  };
  protoOf(PrimaryNavigationTabTokens).get_ActiveLabelTextColor_r86xqn_k$ = function () {
    return this.ActiveLabelTextColor_1;
  };
  protoOf(PrimaryNavigationTabTokens).get_ActivePressedLabelTextColor_cyqlqj_k$ = function () {
    return this.ActivePressedLabelTextColor_1;
  };
  protoOf(PrimaryNavigationTabTokens).get_InactiveFocusLabelTextColor_3u9xei_k$ = function () {
    return this.InactiveFocusLabelTextColor_1;
  };
  protoOf(PrimaryNavigationTabTokens).get_InactiveHoverLabelTextColor_6eycju_k$ = function () {
    return this.InactiveHoverLabelTextColor_1;
  };
  protoOf(PrimaryNavigationTabTokens).get_InactiveLabelTextColor_nkx71m_k$ = function () {
    return this.InactiveLabelTextColor_1;
  };
  protoOf(PrimaryNavigationTabTokens).get_InactivePressedLabelTextColor_v4ajdc_k$ = function () {
    return this.InactivePressedLabelTextColor_1;
  };
  protoOf(PrimaryNavigationTabTokens).get_LabelTextFont_th3yzr_k$ = function () {
    return this.LabelTextFont_1;
  };
  var PrimaryNavigationTabTokens_instance;
  function PrimaryNavigationTabTokens_getInstance() {
    if (PrimaryNavigationTabTokens_instance == null)
      new PrimaryNavigationTabTokens();
    return PrimaryNavigationTabTokens_instance;
  }
  function SearchBarTokens() {
    SearchBarTokens_instance = this;
    this.AvatarShape_1 = ShapeKeyTokens_CornerFull_getInstance();
    var tmp = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp.AvatarSize_1 = _Dp___init__impl__ms3zkb(30.0);
    this.ContainerColor_1 = ColorSchemeKeyTokens_Surface_getInstance();
    this.ContainerElevation_1 = ElevationTokens_getInstance().get_Level3_8laugl_k$();
    var tmp_0 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_0.ContainerHeight_1 = _Dp___init__impl__ms3zkb(56.0);
    this.ContainerShape_1 = ShapeKeyTokens_CornerFull_getInstance();
    this.ContainerSurfaceTintLayerColor_1 = ColorSchemeKeyTokens_SurfaceTint_getInstance();
    this.HoverSupportingTextColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.InputTextColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.InputTextFont_1 = TypographyKeyTokens_BodyLarge_getInstance();
    this.LeadingIconColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.PressedSupportingTextColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.SupportingTextColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.SupportingTextFont_1 = TypographyKeyTokens_BodyLarge_getInstance();
    this.TrailingIconColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
  }
  protoOf(SearchBarTokens).get_AvatarShape_n66k75_k$ = function () {
    return this.AvatarShape_1;
  };
  protoOf(SearchBarTokens).get_AvatarSize_20qqkg_k$ = function () {
    return this.AvatarSize_1;
  };
  protoOf(SearchBarTokens).get_ContainerColor_uid763_k$ = function () {
    return this.ContainerColor_1;
  };
  protoOf(SearchBarTokens).get_ContainerElevation_414o2_k$ = function () {
    return this.ContainerElevation_1;
  };
  protoOf(SearchBarTokens).get_ContainerHeight_9lch44_k$ = function () {
    return this.ContainerHeight_1;
  };
  protoOf(SearchBarTokens).get_ContainerShape_ur17m1_k$ = function () {
    return this.ContainerShape_1;
  };
  protoOf(SearchBarTokens).get_ContainerSurfaceTintLayerColor_7z24ta_k$ = function () {
    return this.ContainerSurfaceTintLayerColor_1;
  };
  protoOf(SearchBarTokens).get_HoverSupportingTextColor_mwfjdc_k$ = function () {
    return this.HoverSupportingTextColor_1;
  };
  protoOf(SearchBarTokens).get_InputTextColor_m3lwej_k$ = function () {
    return this.InputTextColor_1;
  };
  protoOf(SearchBarTokens).get_InputTextFont_3vd325_k$ = function () {
    return this.InputTextFont_1;
  };
  protoOf(SearchBarTokens).get_LeadingIconColor_4sfzzh_k$ = function () {
    return this.LeadingIconColor_1;
  };
  protoOf(SearchBarTokens).get_PressedSupportingTextColor_erdw5y_k$ = function () {
    return this.PressedSupportingTextColor_1;
  };
  protoOf(SearchBarTokens).get_SupportingTextColor_ogcu2i_k$ = function () {
    return this.SupportingTextColor_1;
  };
  protoOf(SearchBarTokens).get_SupportingTextFont_5dfd7c_k$ = function () {
    return this.SupportingTextFont_1;
  };
  protoOf(SearchBarTokens).get_TrailingIconColor_qrzqp1_k$ = function () {
    return this.TrailingIconColor_1;
  };
  var SearchBarTokens_instance;
  function SearchBarTokens_getInstance() {
    if (SearchBarTokens_instance == null)
      new SearchBarTokens();
    return SearchBarTokens_instance;
  }
  function SearchViewTokens() {
    SearchViewTokens_instance = this;
    this.ContainerColor_1 = ColorSchemeKeyTokens_Surface_getInstance();
    this.ContainerElevation_1 = ElevationTokens_getInstance().get_Level3_8laugl_k$();
    this.ContainerSurfaceTintLayerColor_1 = ColorSchemeKeyTokens_SurfaceTint_getInstance();
    this.DividerColor_1 = ColorSchemeKeyTokens_Outline_getInstance();
    this.DockedContainerShape_1 = ShapeKeyTokens_CornerExtraLarge_getInstance();
    var tmp = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp.DockedHeaderContainerHeight_1 = _Dp___init__impl__ms3zkb(56.0);
    this.FullScreenContainerShape_1 = ShapeKeyTokens_CornerNone_getInstance();
    var tmp_0 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_0.FullScreenHeaderContainerHeight_1 = _Dp___init__impl__ms3zkb(72.0);
    this.HeaderInputTextColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.HeaderInputTextFont_1 = TypographyKeyTokens_BodyLarge_getInstance();
    this.HeaderLeadingIconColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.HeaderSupportingTextColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.HeaderSupportingTextFont_1 = TypographyKeyTokens_BodyLarge_getInstance();
    this.HeaderTrailingIconColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
  }
  protoOf(SearchViewTokens).get_ContainerColor_uid763_k$ = function () {
    return this.ContainerColor_1;
  };
  protoOf(SearchViewTokens).get_ContainerElevation_414o2_k$ = function () {
    return this.ContainerElevation_1;
  };
  protoOf(SearchViewTokens).get_ContainerSurfaceTintLayerColor_7z24ta_k$ = function () {
    return this.ContainerSurfaceTintLayerColor_1;
  };
  protoOf(SearchViewTokens).get_DividerColor_d6g0r1_k$ = function () {
    return this.DividerColor_1;
  };
  protoOf(SearchViewTokens).get_DockedContainerShape_f2issl_k$ = function () {
    return this.DockedContainerShape_1;
  };
  protoOf(SearchViewTokens).get_DockedHeaderContainerHeight_hlfqsj_k$ = function () {
    return this.DockedHeaderContainerHeight_1;
  };
  protoOf(SearchViewTokens).get_FullScreenContainerShape_bamnjw_k$ = function () {
    return this.FullScreenContainerShape_1;
  };
  protoOf(SearchViewTokens).get_FullScreenHeaderContainerHeight_7gh1x0_k$ = function () {
    return this.FullScreenHeaderContainerHeight_1;
  };
  protoOf(SearchViewTokens).get_HeaderInputTextColor_e2h2ji_k$ = function () {
    return this.HeaderInputTextColor_1;
  };
  protoOf(SearchViewTokens).get_HeaderInputTextFont_ghp3io_k$ = function () {
    return this.HeaderInputTextFont_1;
  };
  protoOf(SearchViewTokens).get_HeaderLeadingIconColor_jawu1y_k$ = function () {
    return this.HeaderLeadingIconColor_1;
  };
  protoOf(SearchViewTokens).get_HeaderSupportingTextColor_u5ow8d_k$ = function () {
    return this.HeaderSupportingTextColor_1;
  };
  protoOf(SearchViewTokens).get_HeaderSupportingTextFont_7ujdc5_k$ = function () {
    return this.HeaderSupportingTextFont_1;
  };
  protoOf(SearchViewTokens).get_HeaderTrailingIconColor_9sxkrs_k$ = function () {
    return this.HeaderTrailingIconColor_1;
  };
  var SearchViewTokens_instance;
  function SearchViewTokens_getInstance() {
    if (SearchViewTokens_instance == null)
      new SearchViewTokens();
    return SearchViewTokens_instance;
  }
  var ShapeKeyTokens_CornerExtraLarge_instance;
  var ShapeKeyTokens_CornerExtraLargeTop_instance;
  var ShapeKeyTokens_CornerExtraSmall_instance;
  var ShapeKeyTokens_CornerExtraSmallTop_instance;
  var ShapeKeyTokens_CornerFull_instance;
  var ShapeKeyTokens_CornerLarge_instance;
  var ShapeKeyTokens_CornerLargeEnd_instance;
  var ShapeKeyTokens_CornerLargeTop_instance;
  var ShapeKeyTokens_CornerMedium_instance;
  var ShapeKeyTokens_CornerNone_instance;
  var ShapeKeyTokens_CornerSmall_instance;
  function values_2() {
    return [ShapeKeyTokens_CornerExtraLarge_getInstance(), ShapeKeyTokens_CornerExtraLargeTop_getInstance(), ShapeKeyTokens_CornerExtraSmall_getInstance(), ShapeKeyTokens_CornerExtraSmallTop_getInstance(), ShapeKeyTokens_CornerFull_getInstance(), ShapeKeyTokens_CornerLarge_getInstance(), ShapeKeyTokens_CornerLargeEnd_getInstance(), ShapeKeyTokens_CornerLargeTop_getInstance(), ShapeKeyTokens_CornerMedium_getInstance(), ShapeKeyTokens_CornerNone_getInstance(), ShapeKeyTokens_CornerSmall_getInstance()];
  }
  function valueOf_2(value) {
    switch (value) {
      case 'CornerExtraLarge':
        return ShapeKeyTokens_CornerExtraLarge_getInstance();
      case 'CornerExtraLargeTop':
        return ShapeKeyTokens_CornerExtraLargeTop_getInstance();
      case 'CornerExtraSmall':
        return ShapeKeyTokens_CornerExtraSmall_getInstance();
      case 'CornerExtraSmallTop':
        return ShapeKeyTokens_CornerExtraSmallTop_getInstance();
      case 'CornerFull':
        return ShapeKeyTokens_CornerFull_getInstance();
      case 'CornerLarge':
        return ShapeKeyTokens_CornerLarge_getInstance();
      case 'CornerLargeEnd':
        return ShapeKeyTokens_CornerLargeEnd_getInstance();
      case 'CornerLargeTop':
        return ShapeKeyTokens_CornerLargeTop_getInstance();
      case 'CornerMedium':
        return ShapeKeyTokens_CornerMedium_getInstance();
      case 'CornerNone':
        return ShapeKeyTokens_CornerNone_getInstance();
      case 'CornerSmall':
        return ShapeKeyTokens_CornerSmall_getInstance();
      default:
        ShapeKeyTokens_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  var ShapeKeyTokens_entriesInitialized;
  function ShapeKeyTokens_initEntries() {
    if (ShapeKeyTokens_entriesInitialized)
      return Unit_getInstance();
    ShapeKeyTokens_entriesInitialized = true;
    ShapeKeyTokens_CornerExtraLarge_instance = new ShapeKeyTokens('CornerExtraLarge', 0);
    ShapeKeyTokens_CornerExtraLargeTop_instance = new ShapeKeyTokens('CornerExtraLargeTop', 1);
    ShapeKeyTokens_CornerExtraSmall_instance = new ShapeKeyTokens('CornerExtraSmall', 2);
    ShapeKeyTokens_CornerExtraSmallTop_instance = new ShapeKeyTokens('CornerExtraSmallTop', 3);
    ShapeKeyTokens_CornerFull_instance = new ShapeKeyTokens('CornerFull', 4);
    ShapeKeyTokens_CornerLarge_instance = new ShapeKeyTokens('CornerLarge', 5);
    ShapeKeyTokens_CornerLargeEnd_instance = new ShapeKeyTokens('CornerLargeEnd', 6);
    ShapeKeyTokens_CornerLargeTop_instance = new ShapeKeyTokens('CornerLargeTop', 7);
    ShapeKeyTokens_CornerMedium_instance = new ShapeKeyTokens('CornerMedium', 8);
    ShapeKeyTokens_CornerNone_instance = new ShapeKeyTokens('CornerNone', 9);
    ShapeKeyTokens_CornerSmall_instance = new ShapeKeyTokens('CornerSmall', 10);
  }
  function ShapeKeyTokens(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function ShapeKeyTokens_CornerExtraLarge_getInstance() {
    ShapeKeyTokens_initEntries();
    return ShapeKeyTokens_CornerExtraLarge_instance;
  }
  function ShapeKeyTokens_CornerExtraLargeTop_getInstance() {
    ShapeKeyTokens_initEntries();
    return ShapeKeyTokens_CornerExtraLargeTop_instance;
  }
  function ShapeKeyTokens_CornerExtraSmall_getInstance() {
    ShapeKeyTokens_initEntries();
    return ShapeKeyTokens_CornerExtraSmall_instance;
  }
  function ShapeKeyTokens_CornerExtraSmallTop_getInstance() {
    ShapeKeyTokens_initEntries();
    return ShapeKeyTokens_CornerExtraSmallTop_instance;
  }
  function ShapeKeyTokens_CornerFull_getInstance() {
    ShapeKeyTokens_initEntries();
    return ShapeKeyTokens_CornerFull_instance;
  }
  function ShapeKeyTokens_CornerLarge_getInstance() {
    ShapeKeyTokens_initEntries();
    return ShapeKeyTokens_CornerLarge_instance;
  }
  function ShapeKeyTokens_CornerLargeEnd_getInstance() {
    ShapeKeyTokens_initEntries();
    return ShapeKeyTokens_CornerLargeEnd_instance;
  }
  function ShapeKeyTokens_CornerLargeTop_getInstance() {
    ShapeKeyTokens_initEntries();
    return ShapeKeyTokens_CornerLargeTop_instance;
  }
  function ShapeKeyTokens_CornerMedium_getInstance() {
    ShapeKeyTokens_initEntries();
    return ShapeKeyTokens_CornerMedium_instance;
  }
  function ShapeKeyTokens_CornerNone_getInstance() {
    ShapeKeyTokens_initEntries();
    return ShapeKeyTokens_CornerNone_instance;
  }
  function ShapeKeyTokens_CornerSmall_getInstance() {
    ShapeKeyTokens_initEntries();
    return ShapeKeyTokens_CornerSmall_instance;
  }
  function ShapeTokens() {
    ShapeTokens_instance = this;
    var tmp = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp$ret$0 = _Dp___init__impl__ms3zkb(28.0);
    tmp.CornerExtraLarge_1 = RoundedCornerShape(tmp$ret$0);
    var tmp_0 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp_1 = _Dp___init__impl__ms3zkb(28.0);
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp_2 = _Dp___init__impl__ms3zkb(28.0);
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp_3 = _Dp___init__impl__ms3zkb(0.0);
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp$ret$4 = _Dp___init__impl__ms3zkb(0.0);
    tmp_0.CornerExtraLargeTop_1 = RoundedCornerShape_0(tmp_1, tmp_2, tmp_3, tmp$ret$4);
    var tmp_4 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp$ret$5 = _Dp___init__impl__ms3zkb(4.0);
    tmp_4.CornerExtraSmall_1 = RoundedCornerShape(tmp$ret$5);
    var tmp_5 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp_6 = _Dp___init__impl__ms3zkb(4.0);
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp_7 = _Dp___init__impl__ms3zkb(4.0);
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp_8 = _Dp___init__impl__ms3zkb(0.0);
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp$ret$9 = _Dp___init__impl__ms3zkb(0.0);
    tmp_5.CornerExtraSmallTop_1 = RoundedCornerShape_0(tmp_6, tmp_7, tmp_8, tmp$ret$9);
    this.CornerFull_1 = get_CircleShape();
    var tmp_9 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp$ret$10 = _Dp___init__impl__ms3zkb(16.0);
    tmp_9.CornerLarge_1 = RoundedCornerShape(tmp$ret$10);
    var tmp_10 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp_11 = _Dp___init__impl__ms3zkb(0.0);
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp_12 = _Dp___init__impl__ms3zkb(16.0);
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp_13 = _Dp___init__impl__ms3zkb(16.0);
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp$ret$14 = _Dp___init__impl__ms3zkb(0.0);
    tmp_10.CornerLargeEnd_1 = RoundedCornerShape_0(tmp_11, tmp_12, tmp_13, tmp$ret$14);
    var tmp_14 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp_15 = _Dp___init__impl__ms3zkb(16.0);
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp_16 = _Dp___init__impl__ms3zkb(16.0);
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp_17 = _Dp___init__impl__ms3zkb(0.0);
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp$ret$18 = _Dp___init__impl__ms3zkb(0.0);
    tmp_14.CornerLargeTop_1 = RoundedCornerShape_0(tmp_15, tmp_16, tmp_17, tmp$ret$18);
    var tmp_18 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp$ret$19 = _Dp___init__impl__ms3zkb(12.0);
    tmp_18.CornerMedium_1 = RoundedCornerShape(tmp$ret$19);
    this.CornerNone_1 = get_RectangleShape();
    var tmp_19 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp$ret$20 = _Dp___init__impl__ms3zkb(8.0);
    tmp_19.CornerSmall_1 = RoundedCornerShape(tmp$ret$20);
  }
  protoOf(ShapeTokens).get_CornerExtraLarge_qxw7jd_k$ = function () {
    return this.CornerExtraLarge_1;
  };
  protoOf(ShapeTokens).get_CornerExtraLargeTop_yfkh3o_k$ = function () {
    return this.CornerExtraLargeTop_1;
  };
  protoOf(ShapeTokens).get_CornerExtraSmall_r1y31x_k$ = function () {
    return this.CornerExtraSmall_1;
  };
  protoOf(ShapeTokens).get_CornerExtraSmallTop_jnw5pc_k$ = function () {
    return this.CornerExtraSmallTop_1;
  };
  protoOf(ShapeTokens).get_CornerFull_qlhj9v_k$ = function () {
    return this.CornerFull_1;
  };
  protoOf(ShapeTokens).get_CornerLarge_ry76fx_k$ = function () {
    return this.CornerLarge_1;
  };
  protoOf(ShapeTokens).get_CornerLargeEnd_xoicse_k$ = function () {
    return this.CornerLargeEnd_1;
  };
  protoOf(ShapeTokens).get_CornerLargeTop_xoiny0_k$ = function () {
    return this.CornerLargeTop_1;
  };
  protoOf(ShapeTokens).get_CornerMedium_eltswj_k$ = function () {
    return this.CornerMedium_1;
  };
  protoOf(ShapeTokens).get_CornerNone_qlcjsa_k$ = function () {
    return this.CornerNone_1;
  };
  protoOf(ShapeTokens).get_CornerSmall_s291yh_k$ = function () {
    return this.CornerSmall_1;
  };
  var ShapeTokens_instance;
  function ShapeTokens_getInstance() {
    if (ShapeTokens_instance == null)
      new ShapeTokens();
    return ShapeTokens_instance;
  }
  function SliderTokens() {
    SliderTokens_instance = this;
    this.ActiveTrackColor_1 = ColorSchemeKeyTokens_Primary_getInstance();
    var tmp = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp.ActiveTrackHeight_1 = _Dp___init__impl__ms3zkb(4.0);
    this.ActiveTrackShape_1 = ShapeKeyTokens_CornerFull_getInstance();
    this.DisabledActiveTrackColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.DisabledActiveTrackOpacity_1 = 0.38;
    this.DisabledHandleColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.DisabledHandleElevation_1 = ElevationTokens_getInstance().get_Level0_p4lxse_k$();
    this.DisabledHandleOpacity_1 = 0.38;
    this.DisabledInactiveTrackColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.DisabledInactiveTrackOpacity_1 = 0.12;
    this.FocusHandleColor_1 = ColorSchemeKeyTokens_Primary_getInstance();
    this.HandleColor_1 = ColorSchemeKeyTokens_Primary_getInstance();
    this.HandleElevation_1 = ElevationTokens_getInstance().get_Level1_9secab_k$();
    var tmp_0 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_0.HandleHeight_1 = _Dp___init__impl__ms3zkb(20.0);
    this.HandleShape_1 = ShapeKeyTokens_CornerFull_getInstance();
    var tmp_1 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_1.HandleWidth_1 = _Dp___init__impl__ms3zkb(20.0);
    this.HoverHandleColor_1 = ColorSchemeKeyTokens_Primary_getInstance();
    this.InactiveTrackColor_1 = ColorSchemeKeyTokens_SurfaceVariant_getInstance();
    var tmp_2 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_2.InactiveTrackHeight_1 = _Dp___init__impl__ms3zkb(4.0);
    this.InactiveTrackShape_1 = ShapeKeyTokens_CornerFull_getInstance();
    this.LabelContainerColor_1 = ColorSchemeKeyTokens_Primary_getInstance();
    this.LabelContainerElevation_1 = ElevationTokens_getInstance().get_Level0_p4lxse_k$();
    var tmp_3 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_3.LabelContainerHeight_1 = _Dp___init__impl__ms3zkb(28.0);
    this.LabelTextColor_1 = ColorSchemeKeyTokens_OnPrimary_getInstance();
    this.LabelTextFont_1 = TypographyKeyTokens_LabelMedium_getInstance();
    this.PressedHandleColor_1 = ColorSchemeKeyTokens_Primary_getInstance();
    var tmp_4 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_4.StateLayerSize_1 = _Dp___init__impl__ms3zkb(40.0);
    this.TrackElevation_1 = ElevationTokens_getInstance().get_Level0_p4lxse_k$();
    this.OverlapHandleOutlineColor_1 = ColorSchemeKeyTokens_OnPrimary_getInstance();
    var tmp_5 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_5.OverlapHandleOutlineWidth_1 = _Dp___init__impl__ms3zkb(1.0);
    this.TickMarksActiveContainerColor_1 = ColorSchemeKeyTokens_OnPrimary_getInstance();
    this.TickMarksActiveContainerOpacity_1 = 0.38;
    this.TickMarksContainerShape_1 = ShapeKeyTokens_CornerFull_getInstance();
    var tmp_6 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_6.TickMarksContainerSize_1 = _Dp___init__impl__ms3zkb(2.0);
    this.TickMarksDisabledContainerColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.TickMarksDisabledContainerOpacity_1 = 0.38;
    this.TickMarksInactiveContainerColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.TickMarksInactiveContainerOpacity_1 = 0.38;
  }
  protoOf(SliderTokens).get_ActiveTrackColor_vli00p_k$ = function () {
    return this.ActiveTrackColor_1;
  };
  protoOf(SliderTokens).get_ActiveTrackHeight_rg6vpc_k$ = function () {
    return this.ActiveTrackHeight_1;
  };
  protoOf(SliderTokens).get_ActiveTrackShape_vctzkr_k$ = function () {
    return this.ActiveTrackShape_1;
  };
  protoOf(SliderTokens).get_DisabledActiveTrackColor_mkh2pp_k$ = function () {
    return this.DisabledActiveTrackColor_1;
  };
  protoOf(SliderTokens).get_DisabledActiveTrackOpacity_a8upij_k$ = function () {
    return this.DisabledActiveTrackOpacity_1;
  };
  protoOf(SliderTokens).get_DisabledHandleColor_52mm46_k$ = function () {
    return this.DisabledHandleColor_1;
  };
  protoOf(SliderTokens).get_DisabledHandleElevation_njkofn_k$ = function () {
    return this.DisabledHandleElevation_1;
  };
  protoOf(SliderTokens).get_DisabledHandleOpacity_8e7zvi_k$ = function () {
    return this.DisabledHandleOpacity_1;
  };
  protoOf(SliderTokens).get_DisabledInactiveTrackColor_p4s1eg_k$ = function () {
    return this.DisabledInactiveTrackColor_1;
  };
  protoOf(SliderTokens).get_DisabledInactiveTrackOpacity_wb4nyo_k$ = function () {
    return this.DisabledInactiveTrackOpacity_1;
  };
  protoOf(SliderTokens).get_FocusHandleColor_xw9vjo_k$ = function () {
    return this.FocusHandleColor_1;
  };
  protoOf(SliderTokens).get_HandleColor_5a6s1a_k$ = function () {
    return this.HandleColor_1;
  };
  protoOf(SliderTokens).get_HandleElevation_5gvfyv_k$ = function () {
    return this.HandleElevation_1;
  };
  protoOf(SliderTokens).get_HandleHeight_aokvkb_k$ = function () {
    return this.HandleHeight_1;
  };
  protoOf(SliderTokens).get_HandleShape_51irlc_k$ = function () {
    return this.HandleShape_1;
  };
  protoOf(SliderTokens).get_HandleWidth_47nfbm_k$ = function () {
    return this.HandleWidth_1;
  };
  protoOf(SliderTokens).get_HoverHandleColor_7x76eg_k$ = function () {
    return this.HoverHandleColor_1;
  };
  protoOf(SliderTokens).get_InactiveTrackColor_zadmx8_k$ = function () {
    return this.InactiveTrackColor_1;
  };
  protoOf(SliderTokens).get_InactiveTrackHeight_c1dghn_k$ = function () {
    return this.InactiveTrackHeight_1;
  };
  protoOf(SliderTokens).get_InactiveTrackShape_zi2ely_k$ = function () {
    return this.InactiveTrackShape_1;
  };
  protoOf(SliderTokens).get_LabelContainerColor_97ioer_k$ = function () {
    return this.LabelContainerColor_1;
  };
  protoOf(SliderTokens).get_LabelContainerElevation_w2noho_k$ = function () {
    return this.LabelContainerElevation_1;
  };
  protoOf(SliderTokens).get_LabelContainerHeight_3wm24a_k$ = function () {
    return this.LabelContainerHeight_1;
  };
  protoOf(SliderTokens).get_LabelTextColor_9pp06t_k$ = function () {
    return this.LabelTextColor_1;
  };
  protoOf(SliderTokens).get_LabelTextFont_th3yzr_k$ = function () {
    return this.LabelTextFont_1;
  };
  protoOf(SliderTokens).get_PressedHandleColor_r3hxs2_k$ = function () {
    return this.PressedHandleColor_1;
  };
  protoOf(SliderTokens).get_StateLayerSize_d2v4kn_k$ = function () {
    return this.StateLayerSize_1;
  };
  protoOf(SliderTokens).get_TrackElevation_fa6p7s_k$ = function () {
    return this.TrackElevation_1;
  };
  protoOf(SliderTokens).get_OverlapHandleOutlineColor_ukm7hj_k$ = function () {
    return this.OverlapHandleOutlineColor_1;
  };
  protoOf(SliderTokens).get_OverlapHandleOutlineWidth_m5u07_k$ = function () {
    return this.OverlapHandleOutlineWidth_1;
  };
  protoOf(SliderTokens).get_TickMarksActiveContainerColor_tb1n2g_k$ = function () {
    return this.TickMarksActiveContainerColor_1;
  };
  protoOf(SliderTokens).get_TickMarksActiveContainerOpacity_11ll00_k$ = function () {
    return this.TickMarksActiveContainerOpacity_1;
  };
  protoOf(SliderTokens).get_TickMarksContainerShape_k9k2ao_k$ = function () {
    return this.TickMarksContainerShape_1;
  };
  protoOf(SliderTokens).get_TickMarksContainerSize_za1egv_k$ = function () {
    return this.TickMarksContainerSize_1;
  };
  protoOf(SliderTokens).get_TickMarksDisabledContainerColor_z82pdu_k$ = function () {
    return this.TickMarksDisabledContainerColor_1;
  };
  protoOf(SliderTokens).get_TickMarksDisabledContainerOpacity_5ha32y_k$ = function () {
    return this.TickMarksDisabledContainerOpacity_1;
  };
  protoOf(SliderTokens).get_TickMarksInactiveContainerColor_6tm2xf_k$ = function () {
    return this.TickMarksInactiveContainerColor_1;
  };
  protoOf(SliderTokens).get_TickMarksInactiveContainerOpacity_cp8amt_k$ = function () {
    return this.TickMarksInactiveContainerOpacity_1;
  };
  var SliderTokens_instance;
  function SliderTokens_getInstance() {
    if (SliderTokens_instance == null)
      new SliderTokens();
    return SliderTokens_instance;
  }
  function StateTokens() {
    StateTokens_instance = this;
    this.DraggedStateLayerOpacity_1 = 0.16;
    this.FocusStateLayerOpacity_1 = 0.12;
    this.HoverStateLayerOpacity_1 = 0.08;
    this.PressedStateLayerOpacity_1 = 0.12;
  }
  protoOf(StateTokens).get_DraggedStateLayerOpacity_svon4y_k$ = function () {
    return this.DraggedStateLayerOpacity_1;
  };
  protoOf(StateTokens).get_FocusStateLayerOpacity_rqckro_k$ = function () {
    return this.FocusStateLayerOpacity_1;
  };
  protoOf(StateTokens).get_HoverStateLayerOpacity_gc8e7s_k$ = function () {
    return this.HoverStateLayerOpacity_1;
  };
  protoOf(StateTokens).get_PressedStateLayerOpacity_gdafla_k$ = function () {
    return this.PressedStateLayerOpacity_1;
  };
  var StateTokens_instance;
  function StateTokens_getInstance() {
    if (StateTokens_instance == null)
      new StateTokens();
    return StateTokens_instance;
  }
  function SwitchTokens() {
    SwitchTokens_instance = this;
    this.DisabledSelectedHandleColor_1 = ColorSchemeKeyTokens_Surface_getInstance();
    this.DisabledSelectedHandleOpacity_1 = 1.0;
    this.DisabledSelectedIconColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.DisabledSelectedIconOpacity_1 = 0.38;
    this.DisabledSelectedTrackColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.DisabledTrackOpacity_1 = 0.12;
    this.DisabledUnselectedHandleColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.DisabledUnselectedHandleOpacity_1 = 0.38;
    this.DisabledUnselectedIconColor_1 = ColorSchemeKeyTokens_SurfaceVariant_getInstance();
    this.DisabledUnselectedIconOpacity_1 = 0.38;
    this.DisabledUnselectedTrackColor_1 = ColorSchemeKeyTokens_SurfaceVariant_getInstance();
    this.DisabledUnselectedTrackOutlineColor_1 = ColorSchemeKeyTokens_OnSurface_getInstance();
    this.HandleShape_1 = ShapeKeyTokens_CornerFull_getInstance();
    var tmp = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp.PressedHandleHeight_1 = _Dp___init__impl__ms3zkb(28.0);
    var tmp_0 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_0.PressedHandleWidth_1 = _Dp___init__impl__ms3zkb(28.0);
    this.SelectedFocusHandleColor_1 = ColorSchemeKeyTokens_PrimaryContainer_getInstance();
    this.SelectedFocusIconColor_1 = ColorSchemeKeyTokens_OnPrimaryContainer_getInstance();
    this.SelectedFocusTrackColor_1 = ColorSchemeKeyTokens_Primary_getInstance();
    this.SelectedHandleColor_1 = ColorSchemeKeyTokens_OnPrimary_getInstance();
    var tmp_1 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_1.SelectedHandleHeight_1 = _Dp___init__impl__ms3zkb(24.0);
    var tmp_2 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_2.SelectedHandleWidth_1 = _Dp___init__impl__ms3zkb(24.0);
    this.SelectedHoverHandleColor_1 = ColorSchemeKeyTokens_PrimaryContainer_getInstance();
    this.SelectedHoverIconColor_1 = ColorSchemeKeyTokens_OnPrimaryContainer_getInstance();
    this.SelectedHoverTrackColor_1 = ColorSchemeKeyTokens_Primary_getInstance();
    this.SelectedIconColor_1 = ColorSchemeKeyTokens_OnPrimaryContainer_getInstance();
    var tmp_3 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_3.SelectedIconSize_1 = _Dp___init__impl__ms3zkb(16.0);
    this.SelectedPressedHandleColor_1 = ColorSchemeKeyTokens_PrimaryContainer_getInstance();
    this.SelectedPressedIconColor_1 = ColorSchemeKeyTokens_OnPrimaryContainer_getInstance();
    this.SelectedPressedTrackColor_1 = ColorSchemeKeyTokens_Primary_getInstance();
    this.SelectedTrackColor_1 = ColorSchemeKeyTokens_Primary_getInstance();
    this.StateLayerShape_1 = ShapeKeyTokens_CornerFull_getInstance();
    var tmp_4 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_4.StateLayerSize_1 = _Dp___init__impl__ms3zkb(40.0);
    var tmp_5 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_5.TrackHeight_1 = _Dp___init__impl__ms3zkb(32.0);
    var tmp_6 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_6.TrackOutlineWidth_1 = _Dp___init__impl__ms3zkb(2.0);
    this.TrackShape_1 = ShapeKeyTokens_CornerFull_getInstance();
    var tmp_7 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_7.TrackWidth_1 = _Dp___init__impl__ms3zkb(52.0);
    this.UnselectedFocusHandleColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.UnselectedFocusIconColor_1 = ColorSchemeKeyTokens_SurfaceVariant_getInstance();
    this.UnselectedFocusTrackColor_1 = ColorSchemeKeyTokens_SurfaceVariant_getInstance();
    this.UnselectedFocusTrackOutlineColor_1 = ColorSchemeKeyTokens_Outline_getInstance();
    this.UnselectedHandleColor_1 = ColorSchemeKeyTokens_Outline_getInstance();
    var tmp_8 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_8.UnselectedHandleHeight_1 = _Dp___init__impl__ms3zkb(16.0);
    var tmp_9 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_9.UnselectedHandleWidth_1 = _Dp___init__impl__ms3zkb(16.0);
    this.UnselectedHoverHandleColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.UnselectedHoverIconColor_1 = ColorSchemeKeyTokens_SurfaceVariant_getInstance();
    this.UnselectedHoverTrackColor_1 = ColorSchemeKeyTokens_SurfaceVariant_getInstance();
    this.UnselectedHoverTrackOutlineColor_1 = ColorSchemeKeyTokens_Outline_getInstance();
    this.UnselectedIconColor_1 = ColorSchemeKeyTokens_SurfaceVariant_getInstance();
    var tmp_10 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_10.UnselectedIconSize_1 = _Dp___init__impl__ms3zkb(16.0);
    this.UnselectedPressedHandleColor_1 = ColorSchemeKeyTokens_OnSurfaceVariant_getInstance();
    this.UnselectedPressedIconColor_1 = ColorSchemeKeyTokens_SurfaceVariant_getInstance();
    this.UnselectedPressedTrackColor_1 = ColorSchemeKeyTokens_SurfaceVariant_getInstance();
    this.UnselectedPressedTrackOutlineColor_1 = ColorSchemeKeyTokens_Outline_getInstance();
    this.UnselectedTrackColor_1 = ColorSchemeKeyTokens_SurfaceVariant_getInstance();
    this.UnselectedTrackOutlineColor_1 = ColorSchemeKeyTokens_Outline_getInstance();
    var tmp_11 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_11.IconHandleHeight_1 = _Dp___init__impl__ms3zkb(24.0);
    var tmp_12 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_12.IconHandleWidth_1 = _Dp___init__impl__ms3zkb(24.0);
  }
  protoOf(SwitchTokens).get_DisabledSelectedHandleColor_t2vzdn_k$ = function () {
    return this.DisabledSelectedHandleColor_1;
  };
  protoOf(SwitchTokens).get_DisabledSelectedHandleOpacity_5pas8t_k$ = function () {
    return this.DisabledSelectedHandleOpacity_1;
  };
  protoOf(SwitchTokens).get_DisabledSelectedIconColor_jcs3iu_k$ = function () {
    return this.DisabledSelectedIconColor_1;
  };
  protoOf(SwitchTokens).get_DisabledSelectedIconOpacity_qqcb8u_k$ = function () {
    return this.DisabledSelectedIconOpacity_1;
  };
  protoOf(SwitchTokens).get_DisabledSelectedTrackColor_2vaas8_k$ = function () {
    return this.DisabledSelectedTrackColor_1;
  };
  protoOf(SwitchTokens).get_DisabledTrackOpacity_cl2q4b_k$ = function () {
    return this.DisabledTrackOpacity_1;
  };
  protoOf(SwitchTokens).get_DisabledUnselectedHandleColor_qcs5jy_k$ = function () {
    return this.DisabledUnselectedHandleColor_1;
  };
  protoOf(SwitchTokens).get_DisabledUnselectedHandleOpacity_5u5b92_k$ = function () {
    return this.DisabledUnselectedHandleOpacity_1;
  };
  protoOf(SwitchTokens).get_DisabledUnselectedIconColor_howp2p_k$ = function () {
    return this.DisabledUnselectedIconColor_1;
  };
  protoOf(SwitchTokens).get_DisabledUnselectedIconOpacity_b4we7b_k$ = function () {
    return this.DisabledUnselectedIconOpacity_1;
  };
  protoOf(SwitchTokens).get_DisabledUnselectedTrackColor_etu1pt_k$ = function () {
    return this.DisabledUnselectedTrackColor_1;
  };
  protoOf(SwitchTokens).get_DisabledUnselectedTrackOutlineColor_3o0hn1_k$ = function () {
    return this.DisabledUnselectedTrackOutlineColor_1;
  };
  protoOf(SwitchTokens).get_HandleShape_51irlc_k$ = function () {
    return this.HandleShape_1;
  };
  protoOf(SwitchTokens).get_PressedHandleHeight_ri4zuj_k$ = function () {
    return this.PressedHandleHeight_1;
  };
  protoOf(SwitchTokens).get_PressedHandleWidth_q47yf2_k$ = function () {
    return this.PressedHandleWidth_1;
  };
  protoOf(SwitchTokens).get_SelectedFocusHandleColor_7lhsjr_k$ = function () {
    return this.SelectedFocusHandleColor_1;
  };
  protoOf(SwitchTokens).get_SelectedFocusIconColor_du0oa2_k$ = function () {
    return this.SelectedFocusIconColor_1;
  };
  protoOf(SwitchTokens).get_SelectedFocusTrackColor_vyobe4_k$ = function () {
    return this.SelectedFocusTrackColor_1;
  };
  protoOf(SwitchTokens).get_SelectedHandleColor_fp9jwp_k$ = function () {
    return this.SelectedHandleColor_1;
  };
  protoOf(SwitchTokens).get_SelectedHandleHeight_l2s31s_k$ = function () {
    return this.SelectedHandleHeight_1;
  };
  protoOf(SwitchTokens).get_SelectedHandleWidth_quai4p_k$ = function () {
    return this.SelectedHandleWidth_1;
  };
  protoOf(SwitchTokens).get_SelectedHoverHandleColor_lm57h9_k$ = function () {
    return this.SelectedHoverHandleColor_1;
  };
  protoOf(SwitchTokens).get_SelectedHoverIconColor_8gv9am_k$ = function () {
    return this.SelectedHoverIconColor_1;
  };
  protoOf(SwitchTokens).get_SelectedHoverTrackColor_eszy0g_k$ = function () {
    return this.SelectedHoverTrackColor_1;
  };
  protoOf(SwitchTokens).get_SelectedIconColor_f44k3e_k$ = function () {
    return this.SelectedIconColor_1;
  };
  protoOf(SwitchTokens).get_SelectedIconSize_mzo4bp_k$ = function () {
    return this.SelectedIconSize_1;
  };
  protoOf(SwitchTokens).get_SelectedPressedHandleColor_gy6p4z_k$ = function () {
    return this.SelectedPressedHandleColor_1;
  };
  protoOf(SwitchTokens).get_SelectedPressedIconColor_vqtuks_k$ = function () {
    return this.SelectedPressedIconColor_1;
  };
  protoOf(SwitchTokens).get_SelectedPressedTrackColor_oapgfq_k$ = function () {
    return this.SelectedPressedTrackColor_1;
  };
  protoOf(SwitchTokens).get_SelectedTrackColor_7qo2v8_k$ = function () {
    return this.SelectedTrackColor_1;
  };
  protoOf(SwitchTokens).get_StateLayerShape_6is8qg_k$ = function () {
    return this.StateLayerShape_1;
  };
  protoOf(SwitchTokens).get_StateLayerSize_d2v4kn_k$ = function () {
    return this.StateLayerSize_1;
  };
  protoOf(SwitchTokens).get_TrackHeight_mo2hpi_k$ = function () {
    return this.TrackHeight_1;
  };
  protoOf(SwitchTokens).get_TrackOutlineWidth_2pi8tf_k$ = function () {
    return this.TrackOutlineWidth_1;
  };
  protoOf(SwitchTokens).get_TrackShape_vsduwv_k$ = function () {
    return this.TrackShape_1;
  };
  protoOf(SwitchTokens).get_TrackWidth_fc081r_k$ = function () {
    return this.TrackWidth_1;
  };
  protoOf(SwitchTokens).get_UnselectedFocusHandleColor_tgu7s0_k$ = function () {
    return this.UnselectedFocusHandleColor_1;
  };
  protoOf(SwitchTokens).get_UnselectedFocusIconColor_3g7zv5_k$ = function () {
    return this.UnselectedFocusIconColor_1;
  };
  protoOf(SwitchTokens).get_UnselectedFocusTrackColor_1b6xn1_k$ = function () {
    return this.UnselectedFocusTrackColor_1;
  };
  protoOf(SwitchTokens).get_UnselectedFocusTrackOutlineColor_t60sr3_k$ = function () {
    return this.UnselectedFocusTrackOutlineColor_1;
  };
  protoOf(SwitchTokens).get_UnselectedHandleColor_h6arcy_k$ = function () {
    return this.UnselectedHandleColor_1;
  };
  protoOf(SwitchTokens).get_UnselectedHandleHeight_h01dbr_k$ = function () {
    return this.UnselectedHandleHeight_1;
  };
  protoOf(SwitchTokens).get_UnselectedHandleWidth_iwk7ya_k$ = function () {
    return this.UnselectedHandleWidth_1;
  };
  protoOf(SwitchTokens).get_UnselectedHoverHandleColor_ccmu64_k$ = function () {
    return this.UnselectedHoverHandleColor_1;
  };
  protoOf(SwitchTokens).get_UnselectedHoverIconColor_1wxf4b_k$ = function () {
    return this.UnselectedHoverIconColor_1;
  };
  protoOf(SwitchTokens).get_UnselectedHoverTrackColor_my8uxj_k$ = function () {
    return this.UnselectedHoverTrackColor_1;
  };
  protoOf(SwitchTokens).get_UnselectedHoverTrackOutlineColor_ewk68d_k$ = function () {
    return this.UnselectedHoverTrackOutlineColor_1;
  };
  protoOf(SwitchTokens).get_UnselectedIconColor_r38u7n_k$ = function () {
    return this.UnselectedIconColor_1;
  };
  protoOf(SwitchTokens).get_UnselectedIconSize_tzbu6k_k$ = function () {
    return this.UnselectedIconSize_1;
  };
  protoOf(SwitchTokens).get_UnselectedPressedHandleColor_l9s4t2_k$ = function () {
    return this.UnselectedPressedHandleColor_1;
  };
  protoOf(SwitchTokens).get_UnselectedPressedIconColor_5bi5qz_k$ = function () {
    return this.UnselectedPressedIconColor_1;
  };
  protoOf(SwitchTokens).get_UnselectedPressedTrackColor_bs61x9_k$ = function () {
    return this.UnselectedPressedTrackColor_1;
  };
  protoOf(SwitchTokens).get_UnselectedPressedTrackOutlineColor_enp7fd_k$ = function () {
    return this.UnselectedPressedTrackOutlineColor_1;
  };
  protoOf(SwitchTokens).get_UnselectedTrackColor_ntsinf_k$ = function () {
    return this.UnselectedTrackColor_1;
  };
  protoOf(SwitchTokens).get_UnselectedTrackOutlineColor_fil80f_k$ = function () {
    return this.UnselectedTrackOutlineColor_1;
  };
  protoOf(SwitchTokens).get_IconHandleHeight_1mgki6_k$ = function () {
    return this.IconHandleHeight_1;
  };
  protoOf(SwitchTokens).get_IconHandleWidth_ytnd_k$ = function () {
    return this.IconHandleWidth_1;
  };
  var SwitchTokens_instance;
  function SwitchTokens_getInstance() {
    if (SwitchTokens_instance == null)
      new SwitchTokens();
    return SwitchTokens_instance;
  }
  function TypeScaleTokens() {
    TypeScaleTokens_instance = this;
    this.BodyLargeFont_1 = TypefaceTokens_getInstance().get_Plain_ifc0ap_k$();
    this.BodyLargeLineHeight_1 = get_sp_0(24.0);
    this.BodyLargeSize_1 = get_sp(16);
    this.BodyLargeTracking_1 = get_sp_0(0.5);
    this.BodyLargeWeight_1 = TypefaceTokens_getInstance().get_WeightRegular_qqwngb_k$();
    this.BodyMediumFont_1 = TypefaceTokens_getInstance().get_Plain_ifc0ap_k$();
    this.BodyMediumLineHeight_1 = get_sp_0(20.0);
    this.BodyMediumSize_1 = get_sp(14);
    this.BodyMediumTracking_1 = get_sp_0(0.2);
    this.BodyMediumWeight_1 = TypefaceTokens_getInstance().get_WeightRegular_qqwngb_k$();
    this.BodySmallFont_1 = TypefaceTokens_getInstance().get_Plain_ifc0ap_k$();
    this.BodySmallLineHeight_1 = get_sp_0(16.0);
    this.BodySmallSize_1 = get_sp(12);
    this.BodySmallTracking_1 = get_sp_0(0.4);
    this.BodySmallWeight_1 = TypefaceTokens_getInstance().get_WeightRegular_qqwngb_k$();
    this.DisplayLargeFont_1 = TypefaceTokens_getInstance().get_Brand_i7qq0u_k$();
    this.DisplayLargeLineHeight_1 = get_sp_0(64.0);
    this.DisplayLargeSize_1 = get_sp(57);
    var tmp = this;
    // Inline function 'androidx.compose.ui.unit.TextUnit.unaryMinus' call
    var this_0 = get_sp_0(0.2);
    checkArithmetic(this_0);
    tmp.DisplayLargeTracking_1 = pack(_TextUnit___get_rawType__impl__tu8yq5(this_0), -_TextUnit___get_value__impl__hpbx0k(this_0));
    this.DisplayLargeWeight_1 = TypefaceTokens_getInstance().get_WeightRegular_qqwngb_k$();
    this.DisplayMediumFont_1 = TypefaceTokens_getInstance().get_Brand_i7qq0u_k$();
    this.DisplayMediumLineHeight_1 = get_sp_0(52.0);
    this.DisplayMediumSize_1 = get_sp(45);
    this.DisplayMediumTracking_1 = get_sp_0(0.0);
    this.DisplayMediumWeight_1 = TypefaceTokens_getInstance().get_WeightRegular_qqwngb_k$();
    this.DisplaySmallFont_1 = TypefaceTokens_getInstance().get_Brand_i7qq0u_k$();
    this.DisplaySmallLineHeight_1 = get_sp_0(44.0);
    this.DisplaySmallSize_1 = get_sp(36);
    this.DisplaySmallTracking_1 = get_sp_0(0.0);
    this.DisplaySmallWeight_1 = TypefaceTokens_getInstance().get_WeightRegular_qqwngb_k$();
    this.HeadlineLargeFont_1 = TypefaceTokens_getInstance().get_Brand_i7qq0u_k$();
    this.HeadlineLargeLineHeight_1 = get_sp_0(40.0);
    this.HeadlineLargeSize_1 = get_sp(32);
    this.HeadlineLargeTracking_1 = get_sp_0(0.0);
    this.HeadlineLargeWeight_1 = TypefaceTokens_getInstance().get_WeightRegular_qqwngb_k$();
    this.HeadlineMediumFont_1 = TypefaceTokens_getInstance().get_Brand_i7qq0u_k$();
    this.HeadlineMediumLineHeight_1 = get_sp_0(36.0);
    this.HeadlineMediumSize_1 = get_sp(28);
    this.HeadlineMediumTracking_1 = get_sp_0(0.0);
    this.HeadlineMediumWeight_1 = TypefaceTokens_getInstance().get_WeightRegular_qqwngb_k$();
    this.HeadlineSmallFont_1 = TypefaceTokens_getInstance().get_Brand_i7qq0u_k$();
    this.HeadlineSmallLineHeight_1 = get_sp_0(32.0);
    this.HeadlineSmallSize_1 = get_sp(24);
    this.HeadlineSmallTracking_1 = get_sp_0(0.0);
    this.HeadlineSmallWeight_1 = TypefaceTokens_getInstance().get_WeightRegular_qqwngb_k$();
    this.LabelLargeFont_1 = TypefaceTokens_getInstance().get_Plain_ifc0ap_k$();
    this.LabelLargeLineHeight_1 = get_sp_0(20.0);
    this.LabelLargeSize_1 = get_sp(14);
    this.LabelLargeTracking_1 = get_sp_0(0.1);
    this.LabelLargeWeight_1 = TypefaceTokens_getInstance().get_WeightMedium_1i81vu_k$();
    this.LabelMediumFont_1 = TypefaceTokens_getInstance().get_Plain_ifc0ap_k$();
    this.LabelMediumLineHeight_1 = get_sp_0(16.0);
    this.LabelMediumSize_1 = get_sp(12);
    this.LabelMediumTracking_1 = get_sp_0(0.5);
    this.LabelMediumWeight_1 = TypefaceTokens_getInstance().get_WeightMedium_1i81vu_k$();
    this.LabelSmallFont_1 = TypefaceTokens_getInstance().get_Plain_ifc0ap_k$();
    this.LabelSmallLineHeight_1 = get_sp_0(16.0);
    this.LabelSmallSize_1 = get_sp(11);
    this.LabelSmallTracking_1 = get_sp_0(0.5);
    this.LabelSmallWeight_1 = TypefaceTokens_getInstance().get_WeightMedium_1i81vu_k$();
    this.TitleLargeFont_1 = TypefaceTokens_getInstance().get_Brand_i7qq0u_k$();
    this.TitleLargeLineHeight_1 = get_sp_0(28.0);
    this.TitleLargeSize_1 = get_sp(22);
    this.TitleLargeTracking_1 = get_sp_0(0.0);
    this.TitleLargeWeight_1 = TypefaceTokens_getInstance().get_WeightRegular_qqwngb_k$();
    this.TitleMediumFont_1 = TypefaceTokens_getInstance().get_Plain_ifc0ap_k$();
    this.TitleMediumLineHeight_1 = get_sp_0(24.0);
    this.TitleMediumSize_1 = get_sp(16);
    this.TitleMediumTracking_1 = get_sp_0(0.2);
    this.TitleMediumWeight_1 = TypefaceTokens_getInstance().get_WeightMedium_1i81vu_k$();
    this.TitleSmallFont_1 = TypefaceTokens_getInstance().get_Plain_ifc0ap_k$();
    this.TitleSmallLineHeight_1 = get_sp_0(20.0);
    this.TitleSmallSize_1 = get_sp(14);
    this.TitleSmallTracking_1 = get_sp_0(0.1);
    this.TitleSmallWeight_1 = TypefaceTokens_getInstance().get_WeightMedium_1i81vu_k$();
  }
  protoOf(TypeScaleTokens).get_BodyLargeFont_5knv4v_k$ = function () {
    return this.BodyLargeFont_1;
  };
  protoOf(TypeScaleTokens).get_BodyLargeLineHeight_mlr79v_k$ = function () {
    return this.BodyLargeLineHeight_1;
  };
  protoOf(TypeScaleTokens).get_BodyLargeSize_3oj619_k$ = function () {
    return this.BodyLargeSize_1;
  };
  protoOf(TypeScaleTokens).get_BodyLargeTracking_bvhqfr_k$ = function () {
    return this.BodyLargeTracking_1;
  };
  protoOf(TypeScaleTokens).get_BodyLargeWeight_xvbsl4_k$ = function () {
    return this.BodyLargeWeight_1;
  };
  protoOf(TypeScaleTokens).get_BodyMediumFont_vwybld_k$ = function () {
    return this.BodyMediumFont_1;
  };
  protoOf(TypeScaleTokens).get_BodyMediumLineHeight_zibyub_k$ = function () {
    return this.BodyMediumLineHeight_1;
  };
  protoOf(TypeScaleTokens).get_BodyMediumSize_tjg7qb_k$ = function () {
    return this.BodyMediumSize_1;
  };
  protoOf(TypeScaleTokens).get_BodyMediumTracking_k6ukbd_k$ = function () {
    return this.BodyMediumTracking_1;
  };
  protoOf(TypeScaleTokens).get_BodyMediumWeight_mkmgvs_k$ = function () {
    return this.BodyMediumWeight_1;
  };
  protoOf(TypeScaleTokens).get_BodySmallFont_xt6pcl_k$ = function () {
    return this.BodySmallFont_1;
  };
  protoOf(TypeScaleTokens).get_BodySmallLineHeight_62gukn_k$ = function () {
    return this.BodySmallLineHeight_1;
  };
  protoOf(TypeScaleTokens).get_BodySmallSize_o0ybgh_k$ = function () {
    return this.BodySmallSize_1;
  };
  protoOf(TypeScaleTokens).get_BodySmallTracking_qy3c1h_k$ = function () {
    return this.BodySmallTracking_1;
  };
  protoOf(TypeScaleTokens).get_BodySmallWeight_n3bdf0_k$ = function () {
    return this.BodySmallWeight_1;
  };
  protoOf(TypeScaleTokens).get_DisplayLargeFont_lm5g27_k$ = function () {
    return this.DisplayLargeFont_1;
  };
  protoOf(TypeScaleTokens).get_DisplayLargeLineHeight_il8ozl_k$ = function () {
    return this.DisplayLargeLineHeight_1;
  };
  protoOf(TypeScaleTokens).get_DisplayLargeSize_dj24at_k$ = function () {
    return this.DisplayLargeSize_1;
  };
  protoOf(TypeScaleTokens).get_DisplayLargeTracking_1q9e9n_k$ = function () {
    return this.DisplayLargeTracking_1;
  };
  protoOf(TypeScaleTokens).get_DisplayLargeWeight_nebh0m_k$ = function () {
    return this.DisplayLargeWeight_1;
  };
  protoOf(TypeScaleTokens).get_DisplayMediumFont_meuayr_k$ = function () {
    return this.DisplayMediumFont_1;
  };
  protoOf(TypeScaleTokens).get_DisplayMediumLineHeight_hwhq17_k$ = function () {
    return this.DisplayMediumLineHeight_1;
  };
  protoOf(TypeScaleTokens).get_DisplayMediumSize_564bov_k$ = function () {
    return this.DisplayMediumSize_1;
  };
  protoOf(TypeScaleTokens).get_DisplayMediumTracking_fqjabr_k$ = function () {
    return this.DisplayMediumTracking_1;
  };
  protoOf(TypeScaleTokens).get_DisplayMediumWeight_7xnuca_k$ = function () {
    return this.DisplayMediumWeight_1;
  };
  protoOf(TypeScaleTokens).get_DisplaySmallFont_a141fh_k$ = function () {
    return this.DisplaySmallFont_1;
  };
  protoOf(TypeScaleTokens).get_DisplaySmallLineHeight_21ycad_k$ = function () {
    return this.DisplaySmallLineHeight_1;
  };
  protoOf(TypeScaleTokens).get_DisplaySmallSize_6td14f_k$ = function () {
    return this.DisplaySmallSize_1;
  };
  protoOf(TypeScaleTokens).get_DisplaySmallTracking_uh9l89_k$ = function () {
    return this.DisplaySmallTracking_1;
  };
  protoOf(TypeScaleTokens).get_DisplaySmallWeight_cmb1ui_k$ = function () {
    return this.DisplaySmallWeight_1;
  };
  protoOf(TypeScaleTokens).get_HeadlineLargeFont_n9buul_k$ = function () {
    return this.HeadlineLargeFont_1;
  };
  protoOf(TypeScaleTokens).get_HeadlineLargeLineHeight_b2k8p1_k$ = function () {
    return this.HeadlineLargeLineHeight_1;
  };
  protoOf(TypeScaleTokens).get_HeadlineLargeSize_2yyyf5_k$ = function () {
    return this.HeadlineLargeSize_1;
  };
  protoOf(TypeScaleTokens).get_HeadlineLargeTracking_oy27ef_k$ = function () {
    return this.HeadlineLargeTracking_1;
  };
  protoOf(TypeScaleTokens).get_HeadlineLargeWeight_essj1m_k$ = function () {
    return this.HeadlineLargeWeight_1;
  };
  protoOf(TypeScaleTokens).get_HeadlineMediumFont_j3x1q9_k$ = function () {
    return this.HeadlineMediumFont_1;
  };
  protoOf(TypeScaleTokens).get_HeadlineMediumLineHeight_x4wgs1_k$ = function () {
    return this.HeadlineMediumLineHeight_1;
  };
  protoOf(TypeScaleTokens).get_HeadlineMediumSize_mopvx1_k$ = function () {
    return this.HeadlineMediumSize_1;
  };
  protoOf(TypeScaleTokens).get_HeadlineMediumTracking_p57tor_k$ = function () {
    return this.HeadlineMediumTracking_1;
  };
  protoOf(TypeScaleTokens).get_HeadlineMediumWeight_pist3q_k$ = function () {
    return this.HeadlineMediumWeight_1;
  };
  protoOf(TypeScaleTokens).get_HeadlineSmallFont_g4ipmv_k$ = function () {
    return this.HeadlineSmallFont_1;
  };
  protoOf(TypeScaleTokens).get_HeadlineSmallLineHeight_5gq407_k$ = function () {
    return this.HeadlineSmallLineHeight_1;
  };
  protoOf(TypeScaleTokens).get_HeadlineSmallSize_hdg703_k$ = function () {
    return this.HeadlineSmallSize_1;
  };
  protoOf(TypeScaleTokens).get_HeadlineSmallTracking_79gs3h_k$ = function () {
    return this.HeadlineSmallTracking_1;
  };
  protoOf(TypeScaleTokens).get_HeadlineSmallWeight_40s3vi_k$ = function () {
    return this.HeadlineSmallWeight_1;
  };
  protoOf(TypeScaleTokens).get_LabelLargeFont_kepdbz_k$ = function () {
    return this.LabelLargeFont_1;
  };
  protoOf(TypeScaleTokens).get_LabelLargeLineHeight_k3pgdv_k$ = function () {
    return this.LabelLargeLineHeight_1;
  };
  protoOf(TypeScaleTokens).get_LabelLargeSize_qlmprh_k$ = function () {
    return this.LabelLargeSize_1;
  };
  protoOf(TypeScaleTokens).get_LabelLargeTracking_7seamh_k$ = function () {
    return this.LabelLargeTracking_1;
  };
  protoOf(TypeScaleTokens).get_LabelLargeWeight_fwc06g_k$ = function () {
    return this.LabelLargeWeight_1;
  };
  protoOf(TypeScaleTokens).get_LabelMediumFont_1ro0of_k$ = function () {
    return this.LabelMediumFont_1;
  };
  protoOf(TypeScaleTokens).get_LabelMediumLineHeight_szxv9f_k$ = function () {
    return this.LabelMediumLineHeight_1;
  };
  protoOf(TypeScaleTokens).get_LabelMediumSize_tcirwj_k$ = function () {
    return this.LabelMediumSize_1;
  };
  protoOf(TypeScaleTokens).get_LabelMediumTracking_9il0jr_k$ = function () {
    return this.LabelMediumTracking_1;
  };
  protoOf(TypeScaleTokens).get_LabelMediumWeight_2pn15k_k$ = function () {
    return this.LabelMediumWeight_1;
  };
  protoOf(TypeScaleTokens).get_LabelSmallFont_iz575h_k$ = function () {
    return this.LabelSmallFont_1;
  };
  protoOf(TypeScaleTokens).get_LabelSmallLineHeight_3kf3on_k$ = function () {
    return this.LabelSmallLineHeight_1;
  };
  protoOf(TypeScaleTokens).get_LabelSmallSize_o326sf_k$ = function () {
    return this.LabelSmallSize_1;
  };
  protoOf(TypeScaleTokens).get_LabelSmallTracking_of4ovf_k$ = function () {
    return this.LabelSmallTracking_1;
  };
  protoOf(TypeScaleTokens).get_LabelSmallWeight_qocfck_k$ = function () {
    return this.LabelSmallWeight_1;
  };
  protoOf(TypeScaleTokens).get_TitleLargeFont_j22rdx_k$ = function () {
    return this.TitleLargeFont_1;
  };
  protoOf(TypeScaleTokens).get_TitleLargeLineHeight_efuiaf_k$ = function () {
    return this.TitleLargeLineHeight_1;
  };
  protoOf(TypeScaleTokens).get_TitleLargeSize_uosssx_k$ = function () {
    return this.TitleLargeSize_1;
  };
  protoOf(TypeScaleTokens).get_TitleLargeTracking_8bgpln_k$ = function () {
    return this.TitleLargeTracking_1;
  };
  protoOf(TypeScaleTokens).get_TitleLargeWeight_jfjbwk_k$ = function () {
    return this.TitleLargeWeight_1;
  };
  protoOf(TypeScaleTokens).get_TitleMediumFont_e5n419_k$ = function () {
    return this.TitleMediumFont_1;
  };
  protoOf(TypeScaleTokens).get_TitleMediumLineHeight_4hhdr5_k$ = function () {
    return this.TitleMediumLineHeight_1;
  };
  protoOf(TypeScaleTokens).get_TitleMediumSize_qclsd5_k$ = function () {
    return this.TitleMediumSize_1;
  };
  protoOf(TypeScaleTokens).get_TitleMediumTracking_bmhtpf_k$ = function () {
    return this.TitleMediumTracking_1;
  };
  protoOf(TypeScaleTokens).get_TitleMediumWeight_tt9zb8_k$ = function () {
    return this.TitleMediumWeight_1;
  };
  protoOf(TypeScaleTokens).get_TitleSmallFont_cl6q3r_k$ = function () {
    return this.TitleSmallFont_1;
  };
  protoOf(TypeScaleTokens).get_TitleSmallLineHeight_23fuet_k$ = function () {
    return this.TitleSmallLineHeight_1;
  };
  protoOf(TypeScaleTokens).get_TitleSmallSize_jzw3qz_k$ = function () {
    return this.TitleSmallSize_1;
  };
  protoOf(TypeScaleTokens).get_TitleSmallTracking_ui4cvl_k$ = function () {
    return this.TitleSmallTracking_1;
  };
  protoOf(TypeScaleTokens).get_TitleSmallWeight_u7jr2o_k$ = function () {
    return this.TitleSmallWeight_1;
  };
  var TypeScaleTokens_instance;
  function TypeScaleTokens_getInstance() {
    if (TypeScaleTokens_instance == null)
      new TypeScaleTokens();
    return TypeScaleTokens_instance;
  }
  function TypefaceTokens() {
    TypefaceTokens_instance = this;
    this.Brand_1 = Companion_getInstance_10().get_SansSerif_4qz17l_k$();
    this.Plain_1 = Companion_getInstance_10().get_SansSerif_4qz17l_k$();
    this.WeightBold_1 = Companion_getInstance_11().get_Bold_wnz5ke_k$();
    this.WeightMedium_1 = Companion_getInstance_11().get_Medium_1fiba6_k$();
    this.WeightRegular_1 = Companion_getInstance_11().get_Normal_22avww_k$();
  }
  protoOf(TypefaceTokens).get_Brand_i7qq0u_k$ = function () {
    return this.Brand_1;
  };
  protoOf(TypefaceTokens).get_Plain_ifc0ap_k$ = function () {
    return this.Plain_1;
  };
  protoOf(TypefaceTokens).get_WeightBold_bbd0e2_k$ = function () {
    return this.WeightBold_1;
  };
  protoOf(TypefaceTokens).get_WeightMedium_1i81vu_k$ = function () {
    return this.WeightMedium_1;
  };
  protoOf(TypefaceTokens).get_WeightRegular_qqwngb_k$ = function () {
    return this.WeightRegular_1;
  };
  var TypefaceTokens_instance;
  function TypefaceTokens_getInstance() {
    if (TypefaceTokens_instance == null)
      new TypefaceTokens();
    return TypefaceTokens_instance;
  }
  var TypographyKeyTokens_BodyLarge_instance;
  var TypographyKeyTokens_BodyMedium_instance;
  var TypographyKeyTokens_BodySmall_instance;
  var TypographyKeyTokens_DisplayLarge_instance;
  var TypographyKeyTokens_DisplayMedium_instance;
  var TypographyKeyTokens_DisplaySmall_instance;
  var TypographyKeyTokens_HeadlineLarge_instance;
  var TypographyKeyTokens_HeadlineMedium_instance;
  var TypographyKeyTokens_HeadlineSmall_instance;
  var TypographyKeyTokens_LabelLarge_instance;
  var TypographyKeyTokens_LabelMedium_instance;
  var TypographyKeyTokens_LabelSmall_instance;
  var TypographyKeyTokens_TitleLarge_instance;
  var TypographyKeyTokens_TitleMedium_instance;
  var TypographyKeyTokens_TitleSmall_instance;
  function values_3() {
    return [TypographyKeyTokens_BodyLarge_getInstance(), TypographyKeyTokens_BodyMedium_getInstance(), TypographyKeyTokens_BodySmall_getInstance(), TypographyKeyTokens_DisplayLarge_getInstance(), TypographyKeyTokens_DisplayMedium_getInstance(), TypographyKeyTokens_DisplaySmall_getInstance(), TypographyKeyTokens_HeadlineLarge_getInstance(), TypographyKeyTokens_HeadlineMedium_getInstance(), TypographyKeyTokens_HeadlineSmall_getInstance(), TypographyKeyTokens_LabelLarge_getInstance(), TypographyKeyTokens_LabelMedium_getInstance(), TypographyKeyTokens_LabelSmall_getInstance(), TypographyKeyTokens_TitleLarge_getInstance(), TypographyKeyTokens_TitleMedium_getInstance(), TypographyKeyTokens_TitleSmall_getInstance()];
  }
  function valueOf_3(value) {
    switch (value) {
      case 'BodyLarge':
        return TypographyKeyTokens_BodyLarge_getInstance();
      case 'BodyMedium':
        return TypographyKeyTokens_BodyMedium_getInstance();
      case 'BodySmall':
        return TypographyKeyTokens_BodySmall_getInstance();
      case 'DisplayLarge':
        return TypographyKeyTokens_DisplayLarge_getInstance();
      case 'DisplayMedium':
        return TypographyKeyTokens_DisplayMedium_getInstance();
      case 'DisplaySmall':
        return TypographyKeyTokens_DisplaySmall_getInstance();
      case 'HeadlineLarge':
        return TypographyKeyTokens_HeadlineLarge_getInstance();
      case 'HeadlineMedium':
        return TypographyKeyTokens_HeadlineMedium_getInstance();
      case 'HeadlineSmall':
        return TypographyKeyTokens_HeadlineSmall_getInstance();
      case 'LabelLarge':
        return TypographyKeyTokens_LabelLarge_getInstance();
      case 'LabelMedium':
        return TypographyKeyTokens_LabelMedium_getInstance();
      case 'LabelSmall':
        return TypographyKeyTokens_LabelSmall_getInstance();
      case 'TitleLarge':
        return TypographyKeyTokens_TitleLarge_getInstance();
      case 'TitleMedium':
        return TypographyKeyTokens_TitleMedium_getInstance();
      case 'TitleSmall':
        return TypographyKeyTokens_TitleSmall_getInstance();
      default:
        TypographyKeyTokens_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  var TypographyKeyTokens_entriesInitialized;
  function TypographyKeyTokens_initEntries() {
    if (TypographyKeyTokens_entriesInitialized)
      return Unit_getInstance();
    TypographyKeyTokens_entriesInitialized = true;
    TypographyKeyTokens_BodyLarge_instance = new TypographyKeyTokens('BodyLarge', 0);
    TypographyKeyTokens_BodyMedium_instance = new TypographyKeyTokens('BodyMedium', 1);
    TypographyKeyTokens_BodySmall_instance = new TypographyKeyTokens('BodySmall', 2);
    TypographyKeyTokens_DisplayLarge_instance = new TypographyKeyTokens('DisplayLarge', 3);
    TypographyKeyTokens_DisplayMedium_instance = new TypographyKeyTokens('DisplayMedium', 4);
    TypographyKeyTokens_DisplaySmall_instance = new TypographyKeyTokens('DisplaySmall', 5);
    TypographyKeyTokens_HeadlineLarge_instance = new TypographyKeyTokens('HeadlineLarge', 6);
    TypographyKeyTokens_HeadlineMedium_instance = new TypographyKeyTokens('HeadlineMedium', 7);
    TypographyKeyTokens_HeadlineSmall_instance = new TypographyKeyTokens('HeadlineSmall', 8);
    TypographyKeyTokens_LabelLarge_instance = new TypographyKeyTokens('LabelLarge', 9);
    TypographyKeyTokens_LabelMedium_instance = new TypographyKeyTokens('LabelMedium', 10);
    TypographyKeyTokens_LabelSmall_instance = new TypographyKeyTokens('LabelSmall', 11);
    TypographyKeyTokens_TitleLarge_instance = new TypographyKeyTokens('TitleLarge', 12);
    TypographyKeyTokens_TitleMedium_instance = new TypographyKeyTokens('TitleMedium', 13);
    TypographyKeyTokens_TitleSmall_instance = new TypographyKeyTokens('TitleSmall', 14);
  }
  function TypographyKeyTokens(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function TypographyKeyTokens_BodyLarge_getInstance() {
    TypographyKeyTokens_initEntries();
    return TypographyKeyTokens_BodyLarge_instance;
  }
  function TypographyKeyTokens_BodyMedium_getInstance() {
    TypographyKeyTokens_initEntries();
    return TypographyKeyTokens_BodyMedium_instance;
  }
  function TypographyKeyTokens_BodySmall_getInstance() {
    TypographyKeyTokens_initEntries();
    return TypographyKeyTokens_BodySmall_instance;
  }
  function TypographyKeyTokens_DisplayLarge_getInstance() {
    TypographyKeyTokens_initEntries();
    return TypographyKeyTokens_DisplayLarge_instance;
  }
  function TypographyKeyTokens_DisplayMedium_getInstance() {
    TypographyKeyTokens_initEntries();
    return TypographyKeyTokens_DisplayMedium_instance;
  }
  function TypographyKeyTokens_DisplaySmall_getInstance() {
    TypographyKeyTokens_initEntries();
    return TypographyKeyTokens_DisplaySmall_instance;
  }
  function TypographyKeyTokens_HeadlineLarge_getInstance() {
    TypographyKeyTokens_initEntries();
    return TypographyKeyTokens_HeadlineLarge_instance;
  }
  function TypographyKeyTokens_HeadlineMedium_getInstance() {
    TypographyKeyTokens_initEntries();
    return TypographyKeyTokens_HeadlineMedium_instance;
  }
  function TypographyKeyTokens_HeadlineSmall_getInstance() {
    TypographyKeyTokens_initEntries();
    return TypographyKeyTokens_HeadlineSmall_instance;
  }
  function TypographyKeyTokens_LabelLarge_getInstance() {
    TypographyKeyTokens_initEntries();
    return TypographyKeyTokens_LabelLarge_instance;
  }
  function TypographyKeyTokens_LabelMedium_getInstance() {
    TypographyKeyTokens_initEntries();
    return TypographyKeyTokens_LabelMedium_instance;
  }
  function TypographyKeyTokens_LabelSmall_getInstance() {
    TypographyKeyTokens_initEntries();
    return TypographyKeyTokens_LabelSmall_instance;
  }
  function TypographyKeyTokens_TitleLarge_getInstance() {
    TypographyKeyTokens_initEntries();
    return TypographyKeyTokens_TitleLarge_instance;
  }
  function TypographyKeyTokens_TitleMedium_getInstance() {
    TypographyKeyTokens_initEntries();
    return TypographyKeyTokens_TitleMedium_instance;
  }
  function TypographyKeyTokens_TitleSmall_getInstance() {
    TypographyKeyTokens_initEntries();
    return TypographyKeyTokens_TitleSmall_instance;
  }
  function get_DefaultTextStyle() {
    _init_properties_TypographyTokens_kt__by6b7t();
    return DefaultTextStyle;
  }
  var DefaultTextStyle;
  function TypographyTokens() {
    TypographyTokens_instance = this;
    var tmp = this;
    var tmp0_$this = get_DefaultTextStyle();
    var tmp1_fontFamily = TypeScaleTokens_getInstance().get_BodyLargeFont_5knv4v_k$();
    var tmp2_fontWeight = TypeScaleTokens_getInstance().get_BodyLargeWeight_xvbsl4_k$();
    var tmp3_fontSize = TypeScaleTokens_getInstance().get_BodyLargeSize_3oj619_k$();
    var tmp4_lineHeight = TypeScaleTokens_getInstance().get_BodyLargeLineHeight_mlr79v_k$();
    var tmp5_letterSpacing = TypeScaleTokens_getInstance().get_BodyLargeTracking_bvhqfr_k$();
    tmp.BodyLarge_1 = tmp0_$this.copy$default_82cxxr_k$(VOID, tmp3_fontSize, tmp2_fontWeight, VOID, VOID, tmp1_fontFamily, VOID, tmp5_letterSpacing, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp4_lineHeight);
    var tmp_0 = this;
    var tmp0_$this_0 = get_DefaultTextStyle();
    var tmp1_fontFamily_0 = TypeScaleTokens_getInstance().get_BodyMediumFont_vwybld_k$();
    var tmp2_fontWeight_0 = TypeScaleTokens_getInstance().get_BodyMediumWeight_mkmgvs_k$();
    var tmp3_fontSize_0 = TypeScaleTokens_getInstance().get_BodyMediumSize_tjg7qb_k$();
    var tmp4_lineHeight_0 = TypeScaleTokens_getInstance().get_BodyMediumLineHeight_zibyub_k$();
    var tmp5_letterSpacing_0 = TypeScaleTokens_getInstance().get_BodyMediumTracking_k6ukbd_k$();
    tmp_0.BodyMedium_1 = tmp0_$this_0.copy$default_82cxxr_k$(VOID, tmp3_fontSize_0, tmp2_fontWeight_0, VOID, VOID, tmp1_fontFamily_0, VOID, tmp5_letterSpacing_0, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp4_lineHeight_0);
    var tmp_1 = this;
    var tmp0_$this_1 = get_DefaultTextStyle();
    var tmp1_fontFamily_1 = TypeScaleTokens_getInstance().get_BodySmallFont_xt6pcl_k$();
    var tmp2_fontWeight_1 = TypeScaleTokens_getInstance().get_BodySmallWeight_n3bdf0_k$();
    var tmp3_fontSize_1 = TypeScaleTokens_getInstance().get_BodySmallSize_o0ybgh_k$();
    var tmp4_lineHeight_1 = TypeScaleTokens_getInstance().get_BodySmallLineHeight_62gukn_k$();
    var tmp5_letterSpacing_1 = TypeScaleTokens_getInstance().get_BodySmallTracking_qy3c1h_k$();
    tmp_1.BodySmall_1 = tmp0_$this_1.copy$default_82cxxr_k$(VOID, tmp3_fontSize_1, tmp2_fontWeight_1, VOID, VOID, tmp1_fontFamily_1, VOID, tmp5_letterSpacing_1, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp4_lineHeight_1);
    var tmp_2 = this;
    var tmp0_$this_2 = get_DefaultTextStyle();
    var tmp1_fontFamily_2 = TypeScaleTokens_getInstance().get_DisplayLargeFont_lm5g27_k$();
    var tmp2_fontWeight_2 = TypeScaleTokens_getInstance().get_DisplayLargeWeight_nebh0m_k$();
    var tmp3_fontSize_2 = TypeScaleTokens_getInstance().get_DisplayLargeSize_dj24at_k$();
    var tmp4_lineHeight_2 = TypeScaleTokens_getInstance().get_DisplayLargeLineHeight_il8ozl_k$();
    var tmp5_letterSpacing_2 = TypeScaleTokens_getInstance().get_DisplayLargeTracking_1q9e9n_k$();
    tmp_2.DisplayLarge_1 = tmp0_$this_2.copy$default_82cxxr_k$(VOID, tmp3_fontSize_2, tmp2_fontWeight_2, VOID, VOID, tmp1_fontFamily_2, VOID, tmp5_letterSpacing_2, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp4_lineHeight_2);
    var tmp_3 = this;
    var tmp0_$this_3 = get_DefaultTextStyle();
    var tmp1_fontFamily_3 = TypeScaleTokens_getInstance().get_DisplayMediumFont_meuayr_k$();
    var tmp2_fontWeight_3 = TypeScaleTokens_getInstance().get_DisplayMediumWeight_7xnuca_k$();
    var tmp3_fontSize_3 = TypeScaleTokens_getInstance().get_DisplayMediumSize_564bov_k$();
    var tmp4_lineHeight_3 = TypeScaleTokens_getInstance().get_DisplayMediumLineHeight_hwhq17_k$();
    var tmp5_letterSpacing_3 = TypeScaleTokens_getInstance().get_DisplayMediumTracking_fqjabr_k$();
    tmp_3.DisplayMedium_1 = tmp0_$this_3.copy$default_82cxxr_k$(VOID, tmp3_fontSize_3, tmp2_fontWeight_3, VOID, VOID, tmp1_fontFamily_3, VOID, tmp5_letterSpacing_3, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp4_lineHeight_3);
    var tmp_4 = this;
    var tmp0_$this_4 = get_DefaultTextStyle();
    var tmp1_fontFamily_4 = TypeScaleTokens_getInstance().get_DisplaySmallFont_a141fh_k$();
    var tmp2_fontWeight_4 = TypeScaleTokens_getInstance().get_DisplaySmallWeight_cmb1ui_k$();
    var tmp3_fontSize_4 = TypeScaleTokens_getInstance().get_DisplaySmallSize_6td14f_k$();
    var tmp4_lineHeight_4 = TypeScaleTokens_getInstance().get_DisplaySmallLineHeight_21ycad_k$();
    var tmp5_letterSpacing_4 = TypeScaleTokens_getInstance().get_DisplaySmallTracking_uh9l89_k$();
    tmp_4.DisplaySmall_1 = tmp0_$this_4.copy$default_82cxxr_k$(VOID, tmp3_fontSize_4, tmp2_fontWeight_4, VOID, VOID, tmp1_fontFamily_4, VOID, tmp5_letterSpacing_4, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp4_lineHeight_4);
    var tmp_5 = this;
    var tmp0_$this_5 = get_DefaultTextStyle();
    var tmp1_fontFamily_5 = TypeScaleTokens_getInstance().get_HeadlineLargeFont_n9buul_k$();
    var tmp2_fontWeight_5 = TypeScaleTokens_getInstance().get_HeadlineLargeWeight_essj1m_k$();
    var tmp3_fontSize_5 = TypeScaleTokens_getInstance().get_HeadlineLargeSize_2yyyf5_k$();
    var tmp4_lineHeight_5 = TypeScaleTokens_getInstance().get_HeadlineLargeLineHeight_b2k8p1_k$();
    var tmp5_letterSpacing_5 = TypeScaleTokens_getInstance().get_HeadlineLargeTracking_oy27ef_k$();
    tmp_5.HeadlineLarge_1 = tmp0_$this_5.copy$default_82cxxr_k$(VOID, tmp3_fontSize_5, tmp2_fontWeight_5, VOID, VOID, tmp1_fontFamily_5, VOID, tmp5_letterSpacing_5, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp4_lineHeight_5);
    var tmp_6 = this;
    var tmp0_$this_6 = get_DefaultTextStyle();
    var tmp1_fontFamily_6 = TypeScaleTokens_getInstance().get_HeadlineMediumFont_j3x1q9_k$();
    var tmp2_fontWeight_6 = TypeScaleTokens_getInstance().get_HeadlineMediumWeight_pist3q_k$();
    var tmp3_fontSize_6 = TypeScaleTokens_getInstance().get_HeadlineMediumSize_mopvx1_k$();
    var tmp4_lineHeight_6 = TypeScaleTokens_getInstance().get_HeadlineMediumLineHeight_x4wgs1_k$();
    var tmp5_letterSpacing_6 = TypeScaleTokens_getInstance().get_HeadlineMediumTracking_p57tor_k$();
    tmp_6.HeadlineMedium_1 = tmp0_$this_6.copy$default_82cxxr_k$(VOID, tmp3_fontSize_6, tmp2_fontWeight_6, VOID, VOID, tmp1_fontFamily_6, VOID, tmp5_letterSpacing_6, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp4_lineHeight_6);
    var tmp_7 = this;
    var tmp0_$this_7 = get_DefaultTextStyle();
    var tmp1_fontFamily_7 = TypeScaleTokens_getInstance().get_HeadlineSmallFont_g4ipmv_k$();
    var tmp2_fontWeight_7 = TypeScaleTokens_getInstance().get_HeadlineSmallWeight_40s3vi_k$();
    var tmp3_fontSize_7 = TypeScaleTokens_getInstance().get_HeadlineSmallSize_hdg703_k$();
    var tmp4_lineHeight_7 = TypeScaleTokens_getInstance().get_HeadlineSmallLineHeight_5gq407_k$();
    var tmp5_letterSpacing_7 = TypeScaleTokens_getInstance().get_HeadlineSmallTracking_79gs3h_k$();
    tmp_7.HeadlineSmall_1 = tmp0_$this_7.copy$default_82cxxr_k$(VOID, tmp3_fontSize_7, tmp2_fontWeight_7, VOID, VOID, tmp1_fontFamily_7, VOID, tmp5_letterSpacing_7, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp4_lineHeight_7);
    var tmp_8 = this;
    var tmp0_$this_8 = get_DefaultTextStyle();
    var tmp1_fontFamily_8 = TypeScaleTokens_getInstance().get_LabelLargeFont_kepdbz_k$();
    var tmp2_fontWeight_8 = TypeScaleTokens_getInstance().get_LabelLargeWeight_fwc06g_k$();
    var tmp3_fontSize_8 = TypeScaleTokens_getInstance().get_LabelLargeSize_qlmprh_k$();
    var tmp4_lineHeight_8 = TypeScaleTokens_getInstance().get_LabelLargeLineHeight_k3pgdv_k$();
    var tmp5_letterSpacing_8 = TypeScaleTokens_getInstance().get_LabelLargeTracking_7seamh_k$();
    tmp_8.LabelLarge_1 = tmp0_$this_8.copy$default_82cxxr_k$(VOID, tmp3_fontSize_8, tmp2_fontWeight_8, VOID, VOID, tmp1_fontFamily_8, VOID, tmp5_letterSpacing_8, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp4_lineHeight_8);
    var tmp_9 = this;
    var tmp0_$this_9 = get_DefaultTextStyle();
    var tmp1_fontFamily_9 = TypeScaleTokens_getInstance().get_LabelMediumFont_1ro0of_k$();
    var tmp2_fontWeight_9 = TypeScaleTokens_getInstance().get_LabelMediumWeight_2pn15k_k$();
    var tmp3_fontSize_9 = TypeScaleTokens_getInstance().get_LabelMediumSize_tcirwj_k$();
    var tmp4_lineHeight_9 = TypeScaleTokens_getInstance().get_LabelMediumLineHeight_szxv9f_k$();
    var tmp5_letterSpacing_9 = TypeScaleTokens_getInstance().get_LabelMediumTracking_9il0jr_k$();
    tmp_9.LabelMedium_1 = tmp0_$this_9.copy$default_82cxxr_k$(VOID, tmp3_fontSize_9, tmp2_fontWeight_9, VOID, VOID, tmp1_fontFamily_9, VOID, tmp5_letterSpacing_9, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp4_lineHeight_9);
    var tmp_10 = this;
    var tmp0_$this_10 = get_DefaultTextStyle();
    var tmp1_fontFamily_10 = TypeScaleTokens_getInstance().get_LabelSmallFont_iz575h_k$();
    var tmp2_fontWeight_10 = TypeScaleTokens_getInstance().get_LabelSmallWeight_qocfck_k$();
    var tmp3_fontSize_10 = TypeScaleTokens_getInstance().get_LabelSmallSize_o326sf_k$();
    var tmp4_lineHeight_10 = TypeScaleTokens_getInstance().get_LabelSmallLineHeight_3kf3on_k$();
    var tmp5_letterSpacing_10 = TypeScaleTokens_getInstance().get_LabelSmallTracking_of4ovf_k$();
    tmp_10.LabelSmall_1 = tmp0_$this_10.copy$default_82cxxr_k$(VOID, tmp3_fontSize_10, tmp2_fontWeight_10, VOID, VOID, tmp1_fontFamily_10, VOID, tmp5_letterSpacing_10, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp4_lineHeight_10);
    var tmp_11 = this;
    var tmp0_$this_11 = get_DefaultTextStyle();
    var tmp1_fontFamily_11 = TypeScaleTokens_getInstance().get_TitleLargeFont_j22rdx_k$();
    var tmp2_fontWeight_11 = TypeScaleTokens_getInstance().get_TitleLargeWeight_jfjbwk_k$();
    var tmp3_fontSize_11 = TypeScaleTokens_getInstance().get_TitleLargeSize_uosssx_k$();
    var tmp4_lineHeight_11 = TypeScaleTokens_getInstance().get_TitleLargeLineHeight_efuiaf_k$();
    var tmp5_letterSpacing_11 = TypeScaleTokens_getInstance().get_TitleLargeTracking_8bgpln_k$();
    tmp_11.TitleLarge_1 = tmp0_$this_11.copy$default_82cxxr_k$(VOID, tmp3_fontSize_11, tmp2_fontWeight_11, VOID, VOID, tmp1_fontFamily_11, VOID, tmp5_letterSpacing_11, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp4_lineHeight_11);
    var tmp_12 = this;
    var tmp0_$this_12 = get_DefaultTextStyle();
    var tmp1_fontFamily_12 = TypeScaleTokens_getInstance().get_TitleMediumFont_e5n419_k$();
    var tmp2_fontWeight_12 = TypeScaleTokens_getInstance().get_TitleMediumWeight_tt9zb8_k$();
    var tmp3_fontSize_12 = TypeScaleTokens_getInstance().get_TitleMediumSize_qclsd5_k$();
    var tmp4_lineHeight_12 = TypeScaleTokens_getInstance().get_TitleMediumLineHeight_4hhdr5_k$();
    var tmp5_letterSpacing_12 = TypeScaleTokens_getInstance().get_TitleMediumTracking_bmhtpf_k$();
    tmp_12.TitleMedium_1 = tmp0_$this_12.copy$default_82cxxr_k$(VOID, tmp3_fontSize_12, tmp2_fontWeight_12, VOID, VOID, tmp1_fontFamily_12, VOID, tmp5_letterSpacing_12, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp4_lineHeight_12);
    var tmp_13 = this;
    var tmp0_$this_13 = get_DefaultTextStyle();
    var tmp1_fontFamily_13 = TypeScaleTokens_getInstance().get_TitleSmallFont_cl6q3r_k$();
    var tmp2_fontWeight_13 = TypeScaleTokens_getInstance().get_TitleSmallWeight_u7jr2o_k$();
    var tmp3_fontSize_13 = TypeScaleTokens_getInstance().get_TitleSmallSize_jzw3qz_k$();
    var tmp4_lineHeight_13 = TypeScaleTokens_getInstance().get_TitleSmallLineHeight_23fuet_k$();
    var tmp5_letterSpacing_13 = TypeScaleTokens_getInstance().get_TitleSmallTracking_ui4cvl_k$();
    tmp_13.TitleSmall_1 = tmp0_$this_13.copy$default_82cxxr_k$(VOID, tmp3_fontSize_13, tmp2_fontWeight_13, VOID, VOID, tmp1_fontFamily_13, VOID, tmp5_letterSpacing_13, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp4_lineHeight_13);
  }
  protoOf(TypographyTokens).get_BodyLarge_8y8s9c_k$ = function () {
    return this.BodyLarge_1;
  };
  protoOf(TypographyTokens).get_BodyMedium_75vsrk_k$ = function () {
    return this.BodyMedium_1;
  };
  protoOf(TypographyTokens).get_BodySmall_8u6wqs_k$ = function () {
    return this.BodySmall_1;
  };
  protoOf(TypographyTokens).get_DisplayLarge_xob476_k$ = function () {
    return this.DisplayLarge_1;
  };
  protoOf(TypographyTokens).get_DisplayMedium_l04ak2_k$ = function () {
    return this.DisplayMedium_1;
  };
  protoOf(TypographyTokens).get_DisplaySmall_xsczpq_k$ = function () {
    return this.DisplaySmall_1;
  };
  protoOf(TypographyTokens).get_HeadlineLarge_y6x9c2_k$ = function () {
    return this.HeadlineLarge_1;
  };
  protoOf(TypographyTokens).get_HeadlineMedium_611p5e_k$ = function () {
    return this.HeadlineMedium_1;
  };
  protoOf(TypographyTokens).get_HeadlineSmall_y2vdti_k$ = function () {
    return this.HeadlineSmall_1;
  };
  protoOf(TypographyTokens).get_LabelLarge_es8jw0_k$ = function () {
    return this.LabelLarge_1;
  };
  protoOf(TypographyTokens).get_LabelMedium_vlovsw_k$ = function () {
    return this.LabelMedium_1;
  };
  protoOf(TypographyTokens).get_LabelSmall_eo6odg_k$ = function () {
    return this.LabelSmall_1;
  };
  protoOf(TypographyTokens).get_TitleLarge_gtzkic_k$ = function () {
    return this.TitleLarge_1;
  };
  protoOf(TypographyTokens).get_TitleMedium_o2ud24_k$ = function () {
    return this.TitleMedium_1;
  };
  protoOf(TypographyTokens).get_TitleSmall_gpxozs_k$ = function () {
    return this.TitleSmall_1;
  };
  var TypographyTokens_instance;
  function TypographyTokens_getInstance() {
    if (TypographyTokens_instance == null)
      new TypographyTokens();
    return TypographyTokens_instance;
  }
  var properties_initialized_TypographyTokens_kt_gw7fqt;
  function _init_properties_TypographyTokens_kt__by6b7t() {
    if (!properties_initialized_TypographyTokens_kt_gw7fqt) {
      properties_initialized_TypographyTokens_kt_gw7fqt = true;
      DefaultTextStyle = Companion_getInstance_12().get_Default_goqax4_k$().copy$default_82cxxr_k$(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, defaultPlatformTextStyle());
    }
  }
  function get_ButtonsMainAxisSpacing() {
    _init_properties_AlertDialog_skiko_kt__uplgiv();
    return ButtonsMainAxisSpacing;
  }
  var ButtonsMainAxisSpacing;
  function get_ButtonsCrossAxisSpacing() {
    _init_properties_AlertDialog_skiko_kt__uplgiv();
    return ButtonsCrossAxisSpacing;
  }
  var ButtonsCrossAxisSpacing;
  var properties_initialized_AlertDialog_skiko_kt_9c3k0r;
  function _init_properties_AlertDialog_skiko_kt__uplgiv() {
    if (!properties_initialized_AlertDialog_skiko_kt_9c3k0r) {
      properties_initialized_AlertDialog_skiko_kt_9c3k0r = true;
      // Inline function 'androidx.compose.ui.unit.dp' call
      ButtonsMainAxisSpacing = _Dp___init__impl__ms3zkb(8);
      // Inline function 'androidx.compose.ui.unit.dp' call
      ButtonsCrossAxisSpacing = _Dp___init__impl__ms3zkb(12);
    }
  }
  function get_DialogButtonsPadding() {
    _init_properties_DatePickerDialog_skiko_kt__rf2nl7();
    return DialogButtonsPadding;
  }
  var DialogButtonsPadding;
  function get_DialogButtonsMainAxisSpacing() {
    _init_properties_DatePickerDialog_skiko_kt__rf2nl7();
    return DialogButtonsMainAxisSpacing;
  }
  var DialogButtonsMainAxisSpacing;
  function get_DialogButtonsCrossAxisSpacing() {
    _init_properties_DatePickerDialog_skiko_kt__rf2nl7();
    return DialogButtonsCrossAxisSpacing;
  }
  var DialogButtonsCrossAxisSpacing;
  var properties_initialized_DatePickerDialog_skiko_kt_pms8lv;
  function _init_properties_DatePickerDialog_skiko_kt__rf2nl7() {
    if (!properties_initialized_DatePickerDialog_skiko_kt_pms8lv) {
      properties_initialized_DatePickerDialog_skiko_kt_pms8lv = true;
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp0_bottom = _Dp___init__impl__ms3zkb(8);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp1_end = _Dp___init__impl__ms3zkb(6);
      DialogButtonsPadding = PaddingValues_0(VOID, VOID, tmp1_end, tmp0_bottom);
      // Inline function 'androidx.compose.ui.unit.dp' call
      DialogButtonsMainAxisSpacing = _Dp___init__impl__ms3zkb(8);
      // Inline function 'androidx.compose.ui.unit.dp' call
      DialogButtonsCrossAxisSpacing = _Dp___init__impl__ms3zkb(12);
    }
  }
  function defaultPlatformTextStyle() {
    return null;
  }
  function get_Midnight() {
    _init_properties_KotlinxDatetimeCalendarModel_kt__q5yquf();
    return Midnight;
  }
  var Midnight;
  var properties_initialized_KotlinxDatetimeCalendarModel_kt_tnil9h;
  function _init_properties_KotlinxDatetimeCalendarModel_kt__q5yquf() {
    if (!properties_initialized_KotlinxDatetimeCalendarModel_kt_tnil9h) {
      properties_initialized_KotlinxDatetimeCalendarModel_kt_tnil9h = true;
      Midnight = LocalTime_init_$Create$(0, 0);
    }
  }
  function getString$composable(string, $composer, $changed) {
    var $composer_0 = $composer;
    sourceInformationMarkerStart($composer_0, 1660593609, 'C(getString$composable)P(0:c#material3.Strings):Strings.skiko.kt#uh7d8r');
    if (isTraceInProgress()) {
      traceEventStart(1660593609, $changed, -1, 'androidx.compose.material3.getString$composable (Strings.skiko.kt:24)');
    }
    var tmp0 = string === Companion_getInstance_13().get_NavigationMenu_l6ew4i_k$() ? 'Navigation menu' : string === Companion_getInstance_13().get_CloseDrawer_jfb00u_k$() ? 'Close navigation menu' : string === Companion_getInstance_13().get_CloseSheet_qxweqa_k$() ? 'Close sheet' : string === Companion_getInstance_13().get_DefaultErrorMessage_s4db5l_k$() ? 'Invalid input' : string === Companion_getInstance_13().get_SliderRangeStart_awfyhd_k$() ? 'Range Start' : string === Companion_getInstance_13().get_SliderRangeEnd_bzsgk6_k$() ? 'Range End' : string === Companion_getInstance_13().get_Dialog_sutjgt_k$() ? 'Dialog' : string === Companion_getInstance_13().get_MenuExpanded_xkmtlv_k$() ? 'Expanded' : string === Companion_getInstance_13().get_MenuCollapsed_ne9ssv_k$() ? 'Collapsed' : string === Companion_getInstance_13().get_SnackbarDismiss_5edi6_k$() ? 'Dismiss' : string === Companion_getInstance_13().get_SearchBarSearch_wf9gs_k$() ? 'Search' : string === Companion_getInstance_13().get_SuggestionsAvailable_glxrej_k$() ? 'Suggestions below' : string === Companion_getInstance_13().get_DatePickerTitle_bymthx_k$() ? 'Select date' : string === Companion_getInstance_13().get_DatePickerHeadline_wmgh17_k$() ? 'Selected date' : string === Companion_getInstance_13().get_DatePickerYearPickerPaneTitle_n09d8e_k$() ? 'Year picker visible' : string === Companion_getInstance_13().get_DatePickerSwitchToYearSelection_dylohv_k$() ? 'Switch to selecting a year' : string === Companion_getInstance_13().get_DatePickerSwitchToDaySelection_qlvs3q_k$() ? 'Swipe to select a year, or tap to switch back to selecting a day' : string === Companion_getInstance_13().get_DatePickerSwitchToNextMonth_w01gxn_k$() ? 'Change to next month' : string === Companion_getInstance_13().get_DatePickerSwitchToPreviousMonth_4k99fb_k$() ? 'Change to previous month' : string === Companion_getInstance_13().get_DatePickerNavigateToYearDescription_wpqo34_k$() ? 'Navigate to year %1$' : string === Companion_getInstance_13().get_DatePickerHeadlineDescription_ye47ut_k$() ? 'Current selection: %1$' : string === Companion_getInstance_13().get_DatePickerNoSelectionDescription_54245k_k$() ? 'None' : string === Companion_getInstance_13().get_DatePickerTodayDescription_kycx8i_k$() ? 'Today' : string === Companion_getInstance_13().get_DatePickerScrollToShowLaterYears_3q77ze_k$() ? 'Scroll to show later years' : string === Companion_getInstance_13().get_DatePickerScrollToShowEarlierYears_qxi4ki_k$() ? 'Scroll to show earlier years' : string === Companion_getInstance_13().get_DateInputTitle_ym31pj_k$() ? 'Select date' : string === Companion_getInstance_13().get_DateInputHeadline_nuhnyv_k$() ? 'Entered date' : string === Companion_getInstance_13().get_DateInputLabel_jgmc1p_k$() ? 'Date' : string === Companion_getInstance_13().get_DateInputHeadlineDescription_3kwld5_k$() ? 'Entered date: %1$' : string === Companion_getInstance_13().get_DateInputNoInputDescription_7dy6xk_k$() ? 'None' : string === Companion_getInstance_13().get_DateInputInvalidNotAllowed_x0xyuz_k$() ? 'Date not allowed: %1$' : string === Companion_getInstance_13().get_DateInputInvalidForPattern_vtdnmb_k$() ? 'Date does not match expected pattern: %1$' : string === Companion_getInstance_13().get_DateInputInvalidYearRange_5x8l4y_k$() ? 'Date out of expected year range %1$ - %2$' : string === Companion_getInstance_13().get_DatePickerSwitchToCalendarMode_4xx68n_k$() ? 'Switch to calendar input mode' : string === Companion_getInstance_13().get_DatePickerSwitchToInputMode_ceyerf_k$() ? 'Switch to text input mode' : string === Companion_getInstance_13().get_DateRangePickerTitle_a32re_k$() ? 'Select dates' : string === Companion_getInstance_13().get_DateRangePickerStartHeadline_aqp62s_k$() ? 'Start date' : string === Companion_getInstance_13().get_DateRangePickerEndHeadline_f7otib_k$() ? 'End date' : string === Companion_getInstance_13().get_DateRangePickerScrollToShowNextMonth_2rt9iu_k$() ? 'Scroll to show the next month' : string === Companion_getInstance_13().get_DateRangePickerScrollToShowPreviousMonth_do711q_k$() ? 'Scroll to show the previous month' : string === Companion_getInstance_13().get_DateRangePickerDayInRange_2iyzta_k$() ? 'In range' : string === Companion_getInstance_13().get_DateRangeInputTitle_txs5re_k$() ? 'Enter dates' : string === Companion_getInstance_13().get_DateRangeInputInvalidRangeInput_8blhcu_k$() ? 'Invalid date range input' : string === Companion_getInstance_13().get_BottomSheetPaneTitle_uvopw9_k$() ? 'Bottom Sheet' : string === Companion_getInstance_13().get_BottomSheetDragHandleDescription_uvywn_k$() ? 'Drag Handle' : string === Companion_getInstance_13().get_BottomSheetPartialExpandDescription_to67rm_k$() ? 'Collapse bottom sheet' : string === Companion_getInstance_13().get_BottomSheetDismissDescription_emlf4x_k$() ? 'Dismiss bottom sheet' : string === Companion_getInstance_13().get_BottomSheetExpandDescription_kv6deh_k$() ? 'Expand bottom sheet' : string === Companion_getInstance_13().get_TooltipLongPressLabel_mjkt2h_k$() ? 'Show tooltip' : string === Companion_getInstance_13().get_TimePickerAM_fz8fym_k$() ? 'AM' : string === Companion_getInstance_13().get_TimePickerPM_x0e28t_k$() ? 'PM' : string === Companion_getInstance_13().get_TimePickerPeriodToggle_p2d64l_k$() ? 'Select AM or PM' : string === Companion_getInstance_13().get_TimePickerMinuteSelection_88p69i_k$() ? 'Select minutes' : string === Companion_getInstance_13().get_TimePickerHourSelection_9fbrja_k$() ? 'Select hour' : string === Companion_getInstance_13().get_TimePickerHourSuffix_usx8d7_k$() ? "%1$ o'clock" : string === Companion_getInstance_13().get_TimePickerMinuteSuffix_4y4jij_k$() ? '%1$ minutes' : string === Companion_getInstance_13().get_TimePicker24HourSuffix_q0ehyb_k$() ? '%1$ hours' : string === Companion_getInstance_13().get_TimePickerMinute_uhla2i_k$() ? 'Minute' : string === Companion_getInstance_13().get_TimePickerHour_1wby7q_k$() ? 'Hour' : string === Companion_getInstance_13().get_TimePickerMinuteTextField_goer87_k$() ? 'for minutes' : string === Companion_getInstance_13().get_TimePickerHourTextField_hv1chz_k$() ? 'for hour' : string === Companion_getInstance_13().get_TooltipPaneDescription_olnuo4_k$() ? 'Tooltip' : '';
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    sourceInformationMarkerEnd($composer_0);
    return tmp0;
  }
  //region block: init
  AnimationEnterDurationMillis = 600;
  AnimationDelayMillis = 100;
  AnimationExitDurationMillis = 350;
  AnimationDuration = 150;
  ContainerId = 'Container';
  PlaceholderAnimationDelayOrDuration = 67;
  PlaceholderAnimationDuration = 83;
  LeadingId = 'Leading';
  TrailingId = 'Trailing';
  PrefixId = 'Prefix';
  SuffixId = 'Suffix';
  LabelId = 'Label';
  PlaceholderId = 'Hint';
  TextFieldId = 'TextField';
  SupportingId = 'Supporting';
  //endregion
  return _;
}));

//# sourceMappingURL=compose-multiplatform-core-material3.js.map
