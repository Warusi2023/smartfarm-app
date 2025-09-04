(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './compose-multiplatform-core-ui-graphics.js', './kotlin-kotlin-stdlib.js', './compose-multiplatform-core-ui.js', './compose-multiplatform-core-ui-geometry.js', './compose-multiplatform-core-ui-unit.js', './compose-multiplatform-core-runtime.js', './kotlinx.coroutines-kotlinx-coroutines-core-js-ir.js', './compose-multiplatform-core-animation-core.js', './compose-multiplatform-core-ui-text.js', './skiko-kjs.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./compose-multiplatform-core-ui-graphics.js'), require('./kotlin-kotlin-stdlib.js'), require('./compose-multiplatform-core-ui.js'), require('./compose-multiplatform-core-ui-geometry.js'), require('./compose-multiplatform-core-ui-unit.js'), require('./compose-multiplatform-core-runtime.js'), require('./kotlinx.coroutines-kotlinx-coroutines-core-js-ir.js'), require('./compose-multiplatform-core-animation-core.js'), require('./compose-multiplatform-core-ui-text.js'), require('./skiko-kjs.js'));
  else {
    if (typeof this['compose-multiplatform-core-ui-graphics'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-foundation'. Its dependency 'compose-multiplatform-core-ui-graphics' was not found. Please, check whether 'compose-multiplatform-core-ui-graphics' is loaded prior to 'compose-multiplatform-core-foundation'.");
    }
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-foundation'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'compose-multiplatform-core-foundation'.");
    }
    if (typeof this['compose-multiplatform-core-ui'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-foundation'. Its dependency 'compose-multiplatform-core-ui' was not found. Please, check whether 'compose-multiplatform-core-ui' is loaded prior to 'compose-multiplatform-core-foundation'.");
    }
    if (typeof this['compose-multiplatform-core-ui-geometry'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-foundation'. Its dependency 'compose-multiplatform-core-ui-geometry' was not found. Please, check whether 'compose-multiplatform-core-ui-geometry' is loaded prior to 'compose-multiplatform-core-foundation'.");
    }
    if (typeof this['compose-multiplatform-core-ui-unit'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-foundation'. Its dependency 'compose-multiplatform-core-ui-unit' was not found. Please, check whether 'compose-multiplatform-core-ui-unit' is loaded prior to 'compose-multiplatform-core-foundation'.");
    }
    if (typeof this['compose-multiplatform-core-runtime'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-foundation'. Its dependency 'compose-multiplatform-core-runtime' was not found. Please, check whether 'compose-multiplatform-core-runtime' is loaded prior to 'compose-multiplatform-core-foundation'.");
    }
    if (typeof this['kotlinx.coroutines-kotlinx-coroutines-core-js-ir'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-foundation'. Its dependency 'kotlinx.coroutines-kotlinx-coroutines-core-js-ir' was not found. Please, check whether 'kotlinx.coroutines-kotlinx-coroutines-core-js-ir' is loaded prior to 'compose-multiplatform-core-foundation'.");
    }
    if (typeof this['compose-multiplatform-core-animation-core'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-foundation'. Its dependency 'compose-multiplatform-core-animation-core' was not found. Please, check whether 'compose-multiplatform-core-animation-core' is loaded prior to 'compose-multiplatform-core-foundation'.");
    }
    if (typeof this['compose-multiplatform-core-ui-text'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-foundation'. Its dependency 'compose-multiplatform-core-ui-text' was not found. Please, check whether 'compose-multiplatform-core-ui-text' is loaded prior to 'compose-multiplatform-core-foundation'.");
    }
    if (typeof this['skiko-kjs'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-foundation'. Its dependency 'skiko-kjs' was not found. Please, check whether 'skiko-kjs' is loaded prior to 'compose-multiplatform-core-foundation'.");
    }
    root['compose-multiplatform-core-foundation'] = factory(typeof this['compose-multiplatform-core-foundation'] === 'undefined' ? {} : this['compose-multiplatform-core-foundation'], this['compose-multiplatform-core-ui-graphics'], this['kotlin-kotlin-stdlib'], this['compose-multiplatform-core-ui'], this['compose-multiplatform-core-ui-geometry'], this['compose-multiplatform-core-ui-unit'], this['compose-multiplatform-core-runtime'], this['kotlinx.coroutines-kotlinx-coroutines-core-js-ir'], this['compose-multiplatform-core-animation-core'], this['compose-multiplatform-core-ui-text'], this['skiko-kjs']);
  }
}(this, function (_, kotlin_org_jetbrains_compose_ui_ui_graphics, kotlin_kotlin, kotlin_org_jetbrains_compose_ui_ui, kotlin_org_jetbrains_compose_ui_ui_geometry, kotlin_org_jetbrains_compose_ui_ui_unit, kotlin_org_jetbrains_compose_runtime_runtime, kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core, kotlin_org_jetbrains_compose_animation_animation_core, kotlin_org_jetbrains_compose_ui_ui_text, kotlin_org_jetbrains_skiko_skiko) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var get_RectangleShape = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.t;
  var VOID = kotlin_kotlin.$_$.h;
  var get_NoInspectorInfo = kotlin_org_jetbrains_compose_ui_ui.$_$.t1;
  var get_isDebugInspectorInfoEnabled = kotlin_org_jetbrains_compose_ui_ui.$_$.u1;
  var ModifierNodeElement = kotlin_org_jetbrains_compose_ui_ui.$_$.k1;
  var Companion_getInstance = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.n3;
  var protoOf = kotlin_kotlin.$_$.id;
  var THROW_CCE = kotlin_kotlin.$_$.jh;
  var Color__hashCode_impl_vjyivj = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.r2;
  var hashCode = kotlin_kotlin.$_$.kc;
  var getNumberHashCode = kotlin_kotlin.$_$.gc;
  var equals = kotlin_kotlin.$_$.bc;
  var classMeta = kotlin_kotlin.$_$.xb;
  var setMetadataFor = kotlin_kotlin.$_$.jd;
  var Unit_getInstance = kotlin_kotlin.$_$.e5;
  var Size = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.j;
  var ensureNotNull = kotlin_kotlin.$_$.di;
  var drawOutline = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.f1;
  var drawOutline_0 = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.g1;
  var Node = kotlin_org_jetbrains_compose_ui_ui.$_$.y1;
  var onMeasureResultChanged = kotlin_org_jetbrains_compose_ui_ui.$_$.d1;
  var DrawModifierNode = kotlin_org_jetbrains_compose_ui_ui.$_$.e1;
  var Color = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.j;
  var roundToInt = kotlin_kotlin.$_$.sd;
  var objectMeta = kotlin_kotlin.$_$.hd;
  var interfaceMeta = kotlin_kotlin.$_$.mc;
  var _Dp___init__impl__ms3zkb = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.d2;
  var Dp = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.u;
  var SolidColor = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.x;
  var Dp__hashCode_impl_sxkrra = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.f2;
  var Companion_getInstance_0 = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.p3;
  var Companion_getInstance_1 = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.o3;
  var Companion_getInstance_2 = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.s3;
  var numberToInt = kotlin_kotlin.$_$.ed;
  var IntSize = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.x;
  var ImageBitmapConfig = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.k;
  var _IntSize___get_width__impl__d9yl4o = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.n2;
  var _IntSize___get_height__impl__prv63b = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.m2;
  var ImageBitmap = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.l;
  var Canvas = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.f;
  var _Size___get_height__impl__a04p02 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.d1;
  var _Size___get_width__impl__58y75t = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.h1;
  var CanvasDrawScope = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.a;
  var toSize = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.r1;
  var Companion_getInstance_3 = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.l3;
  var Stroke = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.d;
  var get_isSimple = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.n;
  var _Size___get_minDimension__impl__4iso0r = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.f1;
  var Companion_getInstance_4 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.z2;
  var Offset = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.d;
  var Size_0 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.i;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.mi;
  var Rectangle = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.o;
  var Rounded = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.p;
  var Generic = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.n;
  var Companion_getInstance_5 = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.m3;
  var _CornerRadius___get_x__impl__1594cn = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.t;
  var DelegatingNode = kotlin_org_jetbrains_compose_ui_ui.$_$.c1;
  var CacheDrawModifierNode = kotlin_org_jetbrains_compose_ui_ui.$_$.a;
  var Path = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.s;
  var Companion_getInstance_6 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.k1;
  var Fill_getInstance = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.k3;
  var _CornerRadius___get_y__impl__tyvleu = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.u;
  var CornerRadius = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.a;
  var RoundRect = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.h;
  var Rect = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.f;
  var Shape = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.w;
  var Companion_getInstance_7 = kotlin_org_jetbrains_compose_ui_ui.$_$.q2;
  var clip = kotlin_org_jetbrains_compose_ui_ui.$_$.c;
  var Annotation = kotlin_kotlin.$_$.pg;
  var get_LocalInputModeManager = kotlin_org_jetbrains_compose_ui_ui.$_$.r1;
  var currentValueOf = kotlin_org_jetbrains_compose_ui_ui.$_$.m1;
  var Companion_getInstance_8 = kotlin_org_jetbrains_compose_ui_ui.$_$.l2;
  var CompositionLocalConsumerModifierNode = kotlin_org_jetbrains_compose_ui_ui.$_$.b1;
  var FocusPropertiesModifierNode = kotlin_org_jetbrains_compose_ui_ui.$_$.e;
  var identityHashCode = kotlin_org_jetbrains_compose_runtime_runtime.$_$.z;
  var InspectableModifier = kotlin_org_jetbrains_compose_ui_ui.$_$.n1;
  var modifierLocalOf = kotlin_org_jetbrains_compose_ui_ui.$_$.a1;
  var Color__copy$default_impl_ectz3s = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.f3;
  var illegalDecoyCallException = kotlin_org_jetbrains_compose_runtime_runtime.$_$.d;
  var sourceInformation = kotlin_org_jetbrains_compose_runtime_runtime.$_$.m1;
  var traceEventStart = kotlin_org_jetbrains_compose_runtime_runtime.$_$.q1;
  var isTraceInProgress = kotlin_org_jetbrains_compose_runtime_runtime.$_$.b1;
  var Companion_getInstance_9 = kotlin_org_jetbrains_compose_runtime_runtime.$_$.z1;
  var traceEventEnd = kotlin_org_jetbrains_compose_runtime_runtime.$_$.p1;
  var staticCompositionLocalOf = kotlin_org_jetbrains_compose_runtime_runtime.$_$.n1;
  var _Offset___get_x__impl__xvi35n = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.a1;
  var _Offset___get_y__impl__8bzhra = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.b1;
  var _Dp___get_value__impl__geb1vb = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.g2;
  var THROW_IAE = kotlin_kotlin.$_$.kh;
  var Enum = kotlin_kotlin.$_$.xg;
  var CoroutineImpl = kotlin_kotlin.$_$.fb;
  var CoroutineScope = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.d1;
  var isInterface = kotlin_kotlin.$_$.vc;
  var Offset_0 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.e;
  var get_key = kotlin_org_jetbrains_compose_ui_ui.$_$.z1;
  var get = kotlin_kotlin.$_$.ab;
  var fold = kotlin_kotlin.$_$.za;
  var minusKey = kotlin_kotlin.$_$.bb;
  var plus = kotlin_kotlin.$_$.eb;
  var MotionDurationScale = kotlin_org_jetbrains_compose_ui_ui.$_$.a2;
  var SuspendFunction2 = kotlin_kotlin.$_$.ib;
  var Density = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.q;
  var mutableStateOf = kotlin_org_jetbrains_compose_runtime_runtime.$_$.h1;
  var LaunchedEffect$composable = kotlin_org_jetbrains_compose_runtime_runtime.$_$.r;
  var FlowCollector = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.u;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.p;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.pa;
  var SuspendFunction1 = kotlin_kotlin.$_$.hb;
  var Spring_getInstance = kotlin_org_jetbrains_compose_animation_animation_core.$_$.t;
  var Companion_getInstance_10 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.c3;
  var get_VisibilityThreshold = kotlin_org_jetbrains_compose_animation_animation_core.$_$.j;
  var IntOffset = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.w;
  var spring = kotlin_org_jetbrains_compose_animation_animation_core.$_$.q;
  var Velocity__copy$default_impl_eql69u = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.x2;
  var Offset__copy$default_impl_bmwjg8 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.i1;
  var Companion_getInstance_11 = kotlin_org_jetbrains_compose_ui_ui.$_$.j2;
  var Velocity = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.c1;
  var onPreScroll = kotlin_org_jetbrains_compose_ui_ui.$_$.o;
  var onPreFling = kotlin_org_jetbrains_compose_ui_ui.$_$.c2;
  var NestedScrollConnection = kotlin_org_jetbrains_compose_ui_ui.$_$.p;
  var emptyList = kotlin_kotlin.$_$.q7;
  var Companion_getInstance_12 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.e3;
  var toPx = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.i;
  var toPx_0 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.j;
  var roundToPx = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.c;
  var roundToPx_0 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.d;
  var toSp = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.n;
  var toSp_0 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.m;
  var toSp_1 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.o;
  var toDp = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.g;
  var toDp_0 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.h;
  var toDp_1 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.f;
  var toRect = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.k;
  var toSize_0 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.l;
  var toDpSize = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.e;
  var toString = kotlin_kotlin.$_$.nd;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.x1;
  var get_inspectableElements = kotlin_org_jetbrains_compose_ui_ui.$_$.o1;
  var get_nameFallback = kotlin_org_jetbrains_compose_ui_ui.$_$.p1;
  var InspectableValue = kotlin_org_jetbrains_compose_ui_ui.$_$.q1;
  var toRect_0 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.s;
  var LayoutDirection_Ltr_getInstance = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.s1;
  var RoundRect_0 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.g;
  var Pair = kotlin_kotlin.$_$.gh;
  var get_key_0 = kotlin_org_jetbrains_compose_ui_ui.$_$.n;
  var get_isAltPressed = kotlin_org_jetbrains_compose_ui_ui.$_$.j;
  var get_isShiftPressed = kotlin_org_jetbrains_compose_ui_ui.$_$.m;
  var get_isCtrlPressed = kotlin_org_jetbrains_compose_ui_ui.$_$.k;
  var KeyEvent = kotlin_org_jetbrains_compose_ui_ui.$_$.i;
  var KProperty1 = kotlin_kotlin.$_$.oe;
  var getPropertyCallableRef = kotlin_kotlin.$_$.ic;
  var TextRange = kotlin_org_jetbrains_compose_ui_ui_text.$_$.i;
  var charSequenceGet = kotlin_kotlin.$_$.ub;
  var _Char___init__impl__6a9atx = kotlin_kotlin.$_$.s2;
  var charSequenceLength = kotlin_kotlin.$_$.vb;
  var keyframes = kotlin_org_jetbrains_compose_animation_animation_core.$_$.p;
  var infiniteRepeatable = kotlin_org_jetbrains_compose_animation_animation_core.$_$.o;
  var repeat = kotlin_kotlin.$_$.rf;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.c2;
  var OffsetMapping = kotlin_org_jetbrains_compose_ui_ui_text.$_$.c;
  var Companion_getInstance_13 = kotlin_org_jetbrains_compose_ui_ui_text.$_$.s;
  var getBooleanHashCode = kotlin_kotlin.$_$.ec;
  var TextRange_0 = kotlin_org_jetbrains_compose_ui_ui_text.$_$.j;
  var _TextRange___get_start__impl__ww4t90 = kotlin_org_jetbrains_compose_ui_ui_text.$_$.p;
  var _TextRange___get_end__impl__gcdxpp = kotlin_org_jetbrains_compose_ui_ui_text.$_$.n;
  var Companion_getInstance_14 = kotlin_org_jetbrains_compose_ui_ui_text.$_$.t;
  var get_lastIndex = kotlin_kotlin.$_$.of;
  var coerceIn = kotlin_kotlin.$_$.ee;
  var _TextRange___get_reversed__impl__emhnbm = kotlin_org_jetbrains_compose_ui_ui_text.$_$.o;
  var _TextRange___get_collapsed__impl__cilesp = kotlin_org_jetbrains_compose_ui_ui_text.$_$.m;
  var Offset__hashCode_impl_hbql41 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.w;
  var SemanticsPropertyKey = kotlin_org_jetbrains_compose_ui_ui.$_$.v1;
  var AnimationVector2D = kotlin_org_jetbrains_compose_animation_animation_core.$_$.a;
  var get_isSpecified = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.o;
  var FloatCompanionObject_getInstance = kotlin_kotlin.$_$.q4;
  var TwoWayConverter = kotlin_org_jetbrains_compose_animation_animation_core.$_$.h;
  var SpringSpec = kotlin_org_jetbrains_compose_animation_animation_core.$_$.f;
  var Long = kotlin_kotlin.$_$.ch;
  var compositionLocalOf = kotlin_org_jetbrains_compose_runtime_runtime.$_$.w;
  var SkikoKey_KEY_SPACE_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.s6;
  var toLong = kotlin_kotlin.$_$.ld;
  var Companion_getInstance_15 = kotlin_org_jetbrains_compose_ui_ui.$_$.i2;
  var _Key___get_keyCode__impl__ymzu5v = kotlin_org_jetbrains_compose_ui_ui.$_$.h2;
  var _Key___init__impl__p6mluu = kotlin_org_jetbrains_compose_ui_ui.$_$.g2;
  var get_hostOs = kotlin_org_jetbrains_skiko_skiko.$_$.e9;
  var DummyPointerIcon_getInstance = kotlin_org_jetbrains_compose_ui_ui.$_$.k2;
  var Color_0 = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.i;
  var MainScope = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.i1;
  var get_isMetaPressed = kotlin_org_jetbrains_compose_ui_ui.$_$.l;
  var Companion_getInstance_16 = kotlin_org_jetbrains_skiko_skiko.$_$.p7;
  //endregion
  //region block: pre-declaration
  setMetadataFor(BackgroundElement, 'BackgroundElement', classMeta, ModifierNodeElement);
  setMetadataFor(BackgroundNode, 'BackgroundNode', classMeta, Node, [DrawModifierNode, Node]);
  setMetadataFor(MarqueeSpacing, 'MarqueeSpacing', interfaceMeta);
  setMetadataFor(sam$androidx_compose_foundation_MarqueeSpacing$0, 'sam$androidx_compose_foundation_MarqueeSpacing$0', classMeta, VOID, [MarqueeSpacing]);
  setMetadataFor(Companion, 'Companion', objectMeta);
  setMetadataFor(BorderModifierNodeElement, 'BorderModifierNodeElement', classMeta, ModifierNodeElement);
  setMetadataFor(BorderModifierNode, 'BorderModifierNode', classMeta, DelegatingNode);
  setMetadataFor(BorderCache, 'BorderCache', classMeta, VOID, VOID, BorderCache);
  setMetadataFor(BorderStroke, 'BorderStroke', classMeta);
  setMetadataFor(HorizontalScrollableClipModifier$1, VOID, classMeta, VOID, [Shape]);
  setMetadataFor(VerticalScrollableClipModifier$1, VOID, classMeta, VOID, [Shape]);
  setMetadataFor(ExperimentalFoundationApi, 'ExperimentalFoundationApi', classMeta, VOID, [Annotation]);
  setMetadataFor(FocusableInNonTouchMode, 'FocusableInNonTouchMode', classMeta, Node, [Node, CompositionLocalConsumerModifierNode, FocusPropertiesModifierNode], FocusableInNonTouchMode);
  setMetadataFor(FocusableInNonTouchModeElement$1, VOID, classMeta, ModifierNodeElement);
  setMetadataFor(Indication, 'Indication', interfaceMeta);
  setMetadataFor(IndicationInstance, 'IndicationInstance', interfaceMeta);
  setMetadataFor(DefaultDebugIndicationInstance, 'DefaultDebugIndicationInstance', classMeta, VOID, [IndicationInstance]);
  setMetadataFor(DefaultDebugIndication, 'DefaultDebugIndication', objectMeta, VOID, [Indication]);
  setMetadataFor(PointerDirectionConfig, 'PointerDirectionConfig', interfaceMeta);
  setMetadataFor(HorizontalPointerDirectionConfig$1, VOID, classMeta, VOID, [PointerDirectionConfig]);
  setMetadataFor(VerticalPointerDirectionConfig$1, VOID, classMeta, VOID, [PointerDirectionConfig]);
  setMetadataFor(Orientation, 'Orientation', classMeta, Enum);
  setMetadataFor(NoOpOnDragStarted$slambda, 'NoOpOnDragStarted$slambda', classMeta, CoroutineImpl, [CoroutineImpl], VOID, VOID, VOID, [2]);
  setMetadataFor(ScrollScope, 'ScrollScope', interfaceMeta);
  setMetadataFor(NoOpScrollScope$1, VOID, classMeta, VOID, [ScrollScope]);
  setMetadataFor(DefaultScrollMotionDurationScale$1, VOID, classMeta, VOID, [MotionDurationScale]);
  setMetadataFor(PressGestureScope, 'PressGestureScope', interfaceMeta, VOID, [Density], VOID, VOID, VOID, [0]);
  setMetadataFor(NoPressGesture$slambda, 'NoPressGesture$slambda', classMeta, CoroutineImpl, [CoroutineImpl], VOID, VOID, VOID, [2]);
  setMetadataFor(SnapPositionInLayout, 'SnapPositionInLayout', interfaceMeta);
  setMetadataFor(sam$androidx_compose_foundation_gestures_snapping_SnapPositionInLayout$0, 'sam$androidx_compose_foundation_gestures_snapping_SnapPositionInLayout$0', classMeta, VOID, [SnapPositionInLayout]);
  setMetadataFor(Companion_0, 'Companion', objectMeta);
  setMetadataFor(Interaction, 'Interaction', interfaceMeta);
  setMetadataFor(FocusInteraction, 'FocusInteraction', interfaceMeta, VOID, [Interaction]);
  setMetadataFor(Focus, 'Focus', classMeta, VOID, [FocusInteraction], Focus);
  setMetadataFor(Unfocus, 'Unfocus', classMeta, VOID, [FocusInteraction]);
  setMetadataFor(sam$kotlinx_coroutines_flow_FlowCollector$0, 'sam$kotlinx_coroutines_flow_FlowCollector$0', classMeta, VOID, [FlowCollector], VOID, VOID, VOID, [1]);
  setMetadataFor(collectIsFocusedAsState$composable$slambda$slambda, 'collectIsFocusedAsState$composable$slambda$slambda', classMeta, CoroutineImpl, [CoroutineImpl], VOID, VOID, VOID, [1]);
  setMetadataFor(collectIsFocusedAsState$composable$slambda, 'collectIsFocusedAsState$composable$slambda', classMeta, CoroutineImpl, [CoroutineImpl], VOID, VOID, VOID, [1]);
  setMetadataFor(HoverInteraction, 'HoverInteraction', interfaceMeta, VOID, [Interaction]);
  setMetadataFor(Enter, 'Enter', classMeta, VOID, [HoverInteraction], Enter);
  setMetadataFor(Exit, 'Exit', classMeta, VOID, [HoverInteraction]);
  setMetadataFor(sam$kotlinx_coroutines_flow_FlowCollector$0_0, 'sam$kotlinx_coroutines_flow_FlowCollector$0', classMeta, VOID, [FlowCollector], VOID, VOID, VOID, [1]);
  setMetadataFor(collectIsHoveredAsState$composable$slambda$slambda, 'collectIsHoveredAsState$composable$slambda$slambda', classMeta, CoroutineImpl, [CoroutineImpl], VOID, VOID, VOID, [1]);
  setMetadataFor(collectIsHoveredAsState$composable$slambda, 'collectIsHoveredAsState$composable$slambda', classMeta, CoroutineImpl, [CoroutineImpl], VOID, VOID, VOID, [1]);
  setMetadataFor(InteractionSource, 'InteractionSource', interfaceMeta);
  setMetadataFor(PressInteraction, 'PressInteraction', interfaceMeta, VOID, [Interaction]);
  setMetadataFor(Press, 'Press', classMeta, VOID, [PressInteraction]);
  setMetadataFor(Release, 'Release', classMeta, VOID, [PressInteraction]);
  setMetadataFor(Cancel, 'Cancel', classMeta, VOID, [PressInteraction]);
  setMetadataFor(sam$kotlinx_coroutines_flow_FlowCollector$0_1, 'sam$kotlinx_coroutines_flow_FlowCollector$0', classMeta, VOID, [FlowCollector], VOID, VOID, VOID, [1]);
  setMetadataFor(collectIsPressedAsState$composable$slambda$slambda, 'collectIsPressedAsState$composable$slambda$slambda', classMeta, CoroutineImpl, [CoroutineImpl], VOID, VOID, VOID, [1]);
  setMetadataFor(collectIsPressedAsState$composable$slambda, 'collectIsPressedAsState$composable$slambda', classMeta, CoroutineImpl, [CoroutineImpl], VOID, VOID, VOID, [1]);
  setMetadataFor(PageInfo, 'PageInfo', interfaceMeta);
  setMetadataFor(ConsumeAllFlingOnDirection, 'ConsumeAllFlingOnDirection', classMeta, VOID, [NestedScrollConnection], VOID, VOID, VOID, [2, 1]);
  setMetadataFor(PagerLayoutInfo, 'PagerLayoutInfo', interfaceMeta);
  setMetadataFor(sam$androidx_compose_foundation_gestures_snapping_SnapPositionInLayout$0_0, 'sam$androidx_compose_foundation_gestures_snapping_SnapPositionInLayout$0', classMeta, VOID, [SnapPositionInLayout]);
  setMetadataFor(EmptyLayoutInfo$1, VOID, classMeta, VOID, [PagerLayoutInfo]);
  setMetadataFor(UnitDensity$1, VOID, classMeta, VOID, [Density]);
  setMetadataFor(BringIntoViewParent, 'BringIntoViewParent', interfaceMeta, VOID, VOID, VOID, VOID, VOID, [2]);
  setMetadataFor(CornerBasedShape, 'CornerBasedShape', classMeta, VOID, [Shape]);
  setMetadataFor(CornerSize, 'CornerSize', interfaceMeta);
  setMetadataFor(PercentCornerSize, 'PercentCornerSize', classMeta, VOID, [CornerSize, InspectableValue]);
  setMetadataFor(DpCornerSize, 'DpCornerSize', classMeta, VOID, [CornerSize, InspectableValue]);
  setMetadataFor(ZeroCornerSize$1, VOID, classMeta, VOID, [CornerSize, InspectableValue]);
  setMetadataFor(RoundedCornerShape, 'RoundedCornerShape', classMeta, CornerBasedShape);
  setMetadataFor(Handle, 'Handle', classMeta, Enum);
  setMetadataFor(KeyCommand, 'KeyCommand', classMeta, Enum);
  setMetadataFor(KeyMapping, 'KeyMapping', interfaceMeta);
  setMetadataFor(defaultKeyMapping$2$1, VOID, classMeta, VOID, [KeyMapping]);
  setMetadataFor(commonKeyMapping$1, VOID, classMeta, VOID, [KeyMapping]);
  setMetadataFor(ValidatingOffsetMapping, 'ValidatingOffsetMapping', classMeta, VOID, [OffsetMapping]);
  function updateSelection$default(startHandlePosition, endHandlePosition, previousHandlePosition, isStartHandle, containerLayoutCoordinates, adjustment, previousSelection, $super) {
    isStartHandle = isStartHandle === VOID ? true : isStartHandle;
    previousSelection = previousSelection === VOID ? null : previousSelection;
    var tmp;
    if ($super === VOID) {
      tmp = this.updateSelection_z06i87_k$(startHandlePosition, endHandlePosition, previousHandlePosition, isStartHandle, containerLayoutCoordinates, adjustment, previousSelection);
    } else {
      var tmp_0 = $super.updateSelection_z06i87_k$;
      var tmp_1 = previousHandlePosition;
      tmp = tmp_0.call(this, new Offset_0(startHandlePosition), new Offset_0(endHandlePosition), tmp_1 == null ? null : new Offset_0(tmp_1), isStartHandle, containerLayoutCoordinates, adjustment, previousSelection);
    }
    return tmp;
  }
  function getLineHeight(offset) {
    return 0.0;
  }
  setMetadataFor(Selectable, 'Selectable', interfaceMeta);
  setMetadataFor(AnchorInfo, 'AnchorInfo', classMeta);
  setMetadataFor(Selection, 'Selection', classMeta);
  setMetadataFor(SelectionAdjustment, 'SelectionAdjustment', interfaceMeta);
  setMetadataFor(SelectionAdjustment$Companion$None$1, VOID, classMeta, VOID, [SelectionAdjustment]);
  setMetadataFor(SelectionAdjustment$Companion$Character$1, VOID, classMeta, VOID, [SelectionAdjustment]);
  setMetadataFor(SelectionAdjustment$Companion$Word$1, VOID, classMeta, VOID, [SelectionAdjustment]);
  setMetadataFor(SelectionAdjustment$Companion$Paragraph$1, VOID, classMeta, VOID, [SelectionAdjustment]);
  setMetadataFor(SelectionAdjustment$Companion$CharacterWithWordAccelerate$1, VOID, classMeta, VOID, [SelectionAdjustment]);
  setMetadataFor(Companion_1, 'Companion', objectMeta);
  setMetadataFor(SelectionHandleInfo, 'SelectionHandleInfo', classMeta);
  setMetadataFor(Companion_2, 'Companion', objectMeta);
  setMetadataFor(SelectionRegistrar, 'SelectionRegistrar', interfaceMeta);
  setMetadataFor(TextSelectionColors, 'TextSelectionColors', classMeta);
  setMetadataFor(NoOp, 'NoOp', classMeta, VOID, [Annotation]);
  setMetadataFor(MappedKeys, 'MappedKeys', objectMeta);
  setMetadataFor(ScrollbarStyle, 'ScrollbarStyle', classMeta);
  setMetadataFor(createMacosDefaultKeyMapping$1, VOID, classMeta, VOID, [KeyMapping]);
  //endregion
  function background(_this__u8e3s4, color, shape) {
    shape = shape === VOID ? get_RectangleShape() : shape;
    var alpha = 1.0;
    // Inline function 'androidx.compose.ui.platform.debugInspectorInfo' call
    var tmp;
    if (get_isDebugInspectorInfoEnabled()) {
      tmp = background$lambda(color, shape);
    } else {
      tmp = get_NoInspectorInfo();
    }
    var tmp0_inspectorInfo = tmp;
    return _this__u8e3s4.then_g5qrxq_k$(new BackgroundElement(color, VOID, alpha, shape, tmp0_inspectorInfo));
  }
  function _get_color__iw9cfm($this) {
    return $this.color_1;
  }
  function _get_brush__jbhrft($this) {
    return $this.brush_1;
  }
  function _get_alpha__jvxknh($this) {
    return $this.alpha_1;
  }
  function _get_shape__bfkypc($this) {
    return $this.shape_1;
  }
  function _get_inspectorInfo__ojvtbg($this) {
    return $this.inspectorInfo_1;
  }
  function BackgroundElement(color, brush, alpha, shape, inspectorInfo) {
    color = color === VOID ? Companion_getInstance().get_Unspecified_j397pn_k$() : color;
    brush = brush === VOID ? null : brush;
    ModifierNodeElement.call(this);
    this.color_1 = color;
    this.brush_1 = brush;
    this.alpha_1 = alpha;
    this.shape_1 = shape;
    this.inspectorInfo_1 = inspectorInfo;
  }
  protoOf(BackgroundElement).create_md4cuc_k$ = function () {
    return new BackgroundNode(this.color_1, this.brush_1, this.alpha_1, this.shape_1);
  };
  protoOf(BackgroundElement).update_p0g7d2_k$ = function (node) {
    node.color_1 = this.color_1;
    node.brush_1 = this.brush_1;
    node.alpha_1 = this.alpha_1;
    node.shape_1 = this.shape_1;
  };
  protoOf(BackgroundElement).update_9wd57p_k$ = function (node) {
    return this.update_p0g7d2_k$(node instanceof BackgroundNode ? node : THROW_CCE());
  };
  protoOf(BackgroundElement).inspectableProperties_e25ntu_k$ = function (_this__u8e3s4) {
    this.inspectorInfo_1(_this__u8e3s4);
  };
  protoOf(BackgroundElement).hashCode = function () {
    var result = Color__hashCode_impl_vjyivj(this.color_1);
    var tmp = imul(31, result);
    var tmp0_safe_receiver = this.brush_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
    result = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
    result = imul(31, result) + getNumberHashCode(this.alpha_1) | 0;
    result = imul(31, result) + hashCode(this.shape_1) | 0;
    return result;
  };
  protoOf(BackgroundElement).equals = function (other) {
    var tmp0_elvis_lhs = other instanceof BackgroundElement ? other : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return false;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var otherModifier = tmp;
    return ((equals(this.color_1, otherModifier.color_1) ? equals(this.brush_1, otherModifier.brush_1) : false) ? this.alpha_1 === otherModifier.alpha_1 : false) ? equals(this.shape_1, otherModifier.shape_1) : false;
  };
  function _set_lastSize__m2whs($this, _set____db54di) {
    $this.lastSize_1 = _set____db54di;
  }
  function _get_lastSize__dez7yk($this) {
    return $this.lastSize_1;
  }
  function _set_lastLayoutDirection__cwde6y($this, _set____db54di) {
    $this.lastLayoutDirection_1 = _set____db54di;
  }
  function _get_lastLayoutDirection__ecupe($this) {
    return $this.lastLayoutDirection_1;
  }
  function _set_lastOutline__uahd8n($this, _set____db54di) {
    $this.lastOutline_1 = _set____db54di;
  }
  function _get_lastOutline__36wr($this) {
    return $this.lastOutline_1;
  }
  function _set_lastShape__j1hhfq($this, _set____db54di) {
    $this.lastShape_1 = _set____db54di;
  }
  function _get_lastShape__a9cyyu($this) {
    return $this.lastShape_1;
  }
  function drawRect(_this__u8e3s4, $this) {
    if (!equals($this.color_1, Companion_getInstance().get_Unspecified_j397pn_k$())) {
      _this__u8e3s4.drawRect$default_5x4e2k_k$($this.color_1);
    }
    var tmp0_safe_receiver = $this.brush_1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      _this__u8e3s4.drawRect$default_rrw2w5_k$(tmp0_safe_receiver, VOID, VOID, $this.alpha_1);
    }
  }
  function drawOutline_1(_this__u8e3s4, $this) {
    var tmp;
    var tmp_0;
    var tmp_1;
    var tmp_2 = _this__u8e3s4.get_size_cxx1ym_k$();
    var tmp_3 = $this.lastSize_1;
    if (equals(new Size(tmp_2), tmp_3 == null ? null : new Size(tmp_3))) {
      tmp_1 = _this__u8e3s4.get_layoutDirection_7e37v0_k$().equals($this.lastLayoutDirection_1);
    } else {
      tmp_1 = false;
    }
    if (tmp_1) {
      tmp_0 = equals($this.lastShape_1, $this.shape_1);
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = ensureNotNull($this.lastOutline_1);
    } else {
      tmp = $this.shape_1.createOutline_jco4cb_k$(_this__u8e3s4.get_size_cxx1ym_k$(), _this__u8e3s4.get_layoutDirection_7e37v0_k$(), _this__u8e3s4);
    }
    var outline = tmp;
    if (!equals($this.color_1, Companion_getInstance().get_Unspecified_j397pn_k$())) {
      drawOutline(_this__u8e3s4, outline, $this.color_1);
    }
    var tmp0_safe_receiver = $this.brush_1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      drawOutline_0(_this__u8e3s4, outline, tmp0_safe_receiver, $this.alpha_1);
    }
    $this.lastOutline_1 = outline;
    $this.lastSize_1 = _this__u8e3s4.get_size_cxx1ym_k$();
    $this.lastLayoutDirection_1 = _this__u8e3s4.get_layoutDirection_7e37v0_k$();
    $this.lastShape_1 = $this.shape_1;
  }
  function BackgroundNode(color, brush, alpha, shape) {
    Node.call(this);
    this.color_1 = color;
    this.brush_1 = brush;
    this.alpha_1 = alpha;
    this.shape_1 = shape;
    this.lastSize_1 = null;
    this.lastLayoutDirection_1 = null;
    this.lastOutline_1 = null;
    this.lastShape_1 = null;
  }
  protoOf(BackgroundNode).set_color_m2amxp_k$ = function (_set____db54di) {
    this.color_1 = _set____db54di;
  };
  protoOf(BackgroundNode).get_color_lnp1vl_k$ = function () {
    return this.color_1;
  };
  protoOf(BackgroundNode).set_brush_innnd0_k$ = function (_set____db54di) {
    this.brush_1 = _set____db54di;
  };
  protoOf(BackgroundNode).get_brush_ipcjyp_k$ = function () {
    return this.brush_1;
  };
  protoOf(BackgroundNode).set_alpha_tvzcqh_k$ = function (_set____db54di) {
    this.alpha_1 = _set____db54di;
  };
  protoOf(BackgroundNode).get_alpha_iooth1_k$ = function () {
    return this.alpha_1;
  };
  protoOf(BackgroundNode).set_shape_ak8aoz_k$ = function (_set____db54di) {
    this.shape_1 = _set____db54di;
  };
  protoOf(BackgroundNode).get_shape_iyi9a0_k$ = function () {
    return this.shape_1;
  };
  protoOf(BackgroundNode).draw_2h95cs_k$ = function (_this__u8e3s4) {
    if (this.shape_1 === get_RectangleShape()) {
      drawRect(_this__u8e3s4, this);
    } else {
      drawOutline_1(_this__u8e3s4, this);
    }
    _this__u8e3s4.drawContent_m0wwjp_k$();
  };
  function background$lambda($color, $shape) {
    return function ($this$null) {
      $this$null.set_name_wkmnld_k$('background');
      $this$null.set_value_rjqr2d_k$(new Color($color));
      $this$null.get_properties_zhllqc_k$().set_vvveh5_k$('color', new Color($color));
      $this$null.get_properties_zhllqc_k$().set_vvveh5_k$('shape', $shape);
      return Unit_getInstance();
    };
  }
  function get_DefaultMarqueeIterations() {
    _init_properties_BasicMarquee_kt__84kax8();
    return DefaultMarqueeIterations;
  }
  var DefaultMarqueeIterations;
  function get_DefaultMarqueeDelayMillis() {
    _init_properties_BasicMarquee_kt__84kax8();
    return DefaultMarqueeDelayMillis;
  }
  var DefaultMarqueeDelayMillis;
  function get_DefaultMarqueeSpacing() {
    _init_properties_BasicMarquee_kt__84kax8();
    return DefaultMarqueeSpacing;
  }
  var DefaultMarqueeSpacing;
  function get_DefaultMarqueeVelocity() {
    _init_properties_BasicMarquee_kt__84kax8();
    return DefaultMarqueeVelocity;
  }
  var DefaultMarqueeVelocity;
  function sam$androidx_compose_foundation_MarqueeSpacing$0(function_0) {
    this.function_1 = function_0;
  }
  protoOf(sam$androidx_compose_foundation_MarqueeSpacing$0).calculateSpacing_pwlgzq_k$ = function (_this__u8e3s4, contentWidth, containerWidth) {
    return this.function_1(_this__u8e3s4, contentWidth, containerWidth);
  };
  function MarqueeSpacing$Companion$fractionOfContainer$lambda($fraction) {
    return function ($this$MarqueeSpacing, _anonymous_parameter_0__qggqh8, width) {
      // Inline function 'kotlin.math.roundToInt' call
      var this_0 = $fraction * width;
      return roundToInt(this_0);
    };
  }
  function Companion() {
    Companion_instance = this;
  }
  protoOf(Companion).fractionOfContainer_6ou7hs_k$ = function (fraction) {
    var tmp = MarqueeSpacing$Companion$fractionOfContainer$lambda(fraction);
    return new sam$androidx_compose_foundation_MarqueeSpacing$0(tmp);
  };
  var Companion_instance;
  function Companion_getInstance_17() {
    if (Companion_instance == null)
      new Companion();
    return Companion_instance;
  }
  function MarqueeSpacing() {
  }
  var properties_initialized_BasicMarquee_kt_zfhsq2;
  function _init_properties_BasicMarquee_kt__84kax8() {
    if (!properties_initialized_BasicMarquee_kt_zfhsq2) {
      properties_initialized_BasicMarquee_kt_zfhsq2 = true;
      DefaultMarqueeIterations = 3;
      DefaultMarqueeDelayMillis = 1200;
      DefaultMarqueeSpacing = Companion_getInstance_17().fractionOfContainer_6ou7hs_k$(0.3333333333333333);
      // Inline function 'androidx.compose.ui.unit.dp' call
      DefaultMarqueeVelocity = _Dp___init__impl__ms3zkb(30);
    }
  }
  function border(_this__u8e3s4, border, shape) {
    shape = shape === VOID ? get_RectangleShape() : shape;
    return border_0(_this__u8e3s4, border.get_width_7o61hi_k$(), border.get_brush_ipcjyp_k$(), shape);
  }
  function border_0(_this__u8e3s4, width, brush, shape) {
    return _this__u8e3s4.then_g5qrxq_k$(new BorderModifierNodeElement(width, brush, shape));
  }
  function BorderModifierNodeElement(width, brush, shape) {
    ModifierNodeElement.call(this);
    this.width_1 = width;
    this.brush_1 = brush;
    this.shape_1 = shape;
  }
  protoOf(BorderModifierNodeElement).get_width_7o61hi_k$ = function () {
    return this.width_1;
  };
  protoOf(BorderModifierNodeElement).get_brush_ipcjyp_k$ = function () {
    return this.brush_1;
  };
  protoOf(BorderModifierNodeElement).get_shape_iyi9a0_k$ = function () {
    return this.shape_1;
  };
  protoOf(BorderModifierNodeElement).create_md4cuc_k$ = function () {
    return new BorderModifierNode(this.width_1, this.brush_1, this.shape_1);
  };
  protoOf(BorderModifierNodeElement).update_wq3swp_k$ = function (node) {
    node.set_width_jbfnku_k$(this.width_1);
    node.set_brush_hdgczn_k$(this.brush_1);
    node.set_shape_ak8aoz_k$(this.shape_1);
  };
  protoOf(BorderModifierNodeElement).update_9wd57p_k$ = function (node) {
    return this.update_wq3swp_k$(node instanceof BorderModifierNode ? node : THROW_CCE());
  };
  protoOf(BorderModifierNodeElement).inspectableProperties_e25ntu_k$ = function (_this__u8e3s4) {
    _this__u8e3s4.set_name_wkmnld_k$('border');
    _this__u8e3s4.get_properties_zhllqc_k$().set_vvveh5_k$('width', new Dp(this.width_1));
    var tmp = this.brush_1;
    if (tmp instanceof SolidColor) {
      _this__u8e3s4.get_properties_zhllqc_k$().set_vvveh5_k$('color', new Color(this.brush_1.get_value_za03u9_k$()));
      _this__u8e3s4.set_value_rjqr2d_k$(new Color(this.brush_1.get_value_za03u9_k$()));
    } else {
      _this__u8e3s4.get_properties_zhllqc_k$().set_vvveh5_k$('brush', this.brush_1);
    }
    _this__u8e3s4.get_properties_zhllqc_k$().set_vvveh5_k$('shape', this.shape_1);
  };
  protoOf(BorderModifierNodeElement).component1_k79ve9_k$ = function () {
    return this.width_1;
  };
  protoOf(BorderModifierNodeElement).component2_7eebsb_k$ = function () {
    return this.brush_1;
  };
  protoOf(BorderModifierNodeElement).component3_7eebsa_k$ = function () {
    return this.shape_1;
  };
  protoOf(BorderModifierNodeElement).copy_6ki3p5_k$ = function (width, brush, shape) {
    return new BorderModifierNodeElement(width, brush, shape);
  };
  protoOf(BorderModifierNodeElement).copy$default_gvt6nr_k$ = function (width, brush, shape, $super) {
    width = width === VOID ? this.width_1 : width;
    brush = brush === VOID ? this.brush_1 : brush;
    shape = shape === VOID ? this.shape_1 : shape;
    return $super === VOID ? this.copy_6ki3p5_k$(width, brush, shape) : $super.copy_6ki3p5_k$.call(this, new Dp(width), brush, shape);
  };
  protoOf(BorderModifierNodeElement).toString = function () {
    return 'BorderModifierNodeElement(width=' + new Dp(this.width_1) + ', brush=' + this.brush_1 + ', shape=' + this.shape_1 + ')';
  };
  protoOf(BorderModifierNodeElement).hashCode = function () {
    var result = Dp__hashCode_impl_sxkrra(this.width_1);
    result = imul(result, 31) + hashCode(this.brush_1) | 0;
    result = imul(result, 31) + hashCode(this.shape_1) | 0;
    return result;
  };
  protoOf(BorderModifierNodeElement).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof BorderModifierNodeElement))
      return false;
    var tmp0_other_with_cast = other instanceof BorderModifierNodeElement ? other : THROW_CCE();
    if (!equals(this.width_1, tmp0_other_with_cast.width_1))
      return false;
    if (!equals(this.brush_1, tmp0_other_with_cast.brush_1))
      return false;
    if (!equals(this.shape_1, tmp0_other_with_cast.shape_1))
      return false;
    return true;
  };
  function _set_borderCache__ca1clr($this, _set____db54di) {
    $this.borderCache_1 = _set____db54di;
  }
  function _get_borderCache__sgoj1h($this) {
    return $this.borderCache_1;
  }
  function _get_drawWithCacheModifierNode__ha0wo0($this) {
    return $this.drawWithCacheModifierNode_1;
  }
  function drawGenericBorder(_this__u8e3s4, $this, brush, outline, fillArea, strokeWidth) {
    var tmp;
    if (fillArea) {
      tmp = _this__u8e3s4.onDrawWithContent_9a7tsh_k$(BorderModifierNode$drawGenericBorder$lambda(outline, brush));
    } else {
      var config;
      var colorFilter;
      if (brush instanceof SolidColor) {
        config = Companion_getInstance_0().get_Alpha8_8qn3sx_k$();
        colorFilter = Companion_getInstance_1().tint$default_jnxvki_k$(brush.get_value_za03u9_k$());
      } else {
        config = Companion_getInstance_0().get_Argb8888_epitdf_k$();
        colorFilter = null;
      }
      var pathBounds = outline.get_path_wos8ry_k$().getBounds_568lnv_k$();
      if ($this.borderCache_1 == null) {
        $this.borderCache_1 = new BorderCache();
      }
      // Inline function 'kotlin.apply' call
      var this_0 = ensureNotNull($this.borderCache_1).obtainPath_y7q9hy_k$();
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.foundation.BorderModifierNode.drawGenericBorder.<anonymous>' call
      this_0.reset_5u6xz3_k$();
      this_0.addRect_yfs97g_k$(pathBounds);
      this_0.op_fj0csx_k$(this_0, outline.get_path_wos8ry_k$(), Companion_getInstance_2().get_Difference_nnbib6_k$());
      var maskPath = this_0;
      var cacheImageBitmap;
      // Inline function 'kotlin.math.ceil' call
      var x = pathBounds.get_width_j0q4yl_k$();
      var tmp$ret$1 = Math.ceil(x);
      var tmp_0 = numberToInt(tmp$ret$1);
      // Inline function 'kotlin.math.ceil' call
      var x_0 = pathBounds.get_height_e7t92o_k$();
      var tmp$ret$2 = Math.ceil(x_0);
      var pathBoundsSize = IntSize(tmp_0, numberToInt(tmp$ret$2));
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.foundation.BorderCache.drawBorderCache' call
      var this_1 = ensureNotNull($this.borderCache_1);
      var config_0 = config;
      var targetImageBitmap = this_1.imageBitmap_1;
      var targetCanvas = this_1.canvas_1;
      var tmp_1;
      var tmp0_safe_receiver = targetImageBitmap;
      var tmp_2 = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.get_config_d6pt2v_k$();
      if (equals(tmp_2 == null ? null : new ImageBitmapConfig(tmp_2), new ImageBitmapConfig(Companion_getInstance_0().get_Argb8888_epitdf_k$()))) {
        tmp_1 = true;
      } else {
        var tmp1_safe_receiver = targetImageBitmap;
        var tmp_3 = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.get_config_d6pt2v_k$();
        tmp_1 = equals(new ImageBitmapConfig(config_0), tmp_3 == null ? null : new ImageBitmapConfig(tmp_3));
      }
      var compatibleConfig = tmp_1;
      if ((((targetImageBitmap == null ? true : targetCanvas == null) ? true : _Size___get_width__impl__58y75t(_this__u8e3s4.get_size_cxx1ym_k$()) > targetImageBitmap.get_width_j0q4yl_k$()) ? true : _Size___get_height__impl__a04p02(_this__u8e3s4.get_size_cxx1ym_k$()) > targetImageBitmap.get_height_e7t92o_k$()) ? true : !compatibleConfig) {
        // Inline function 'kotlin.also' call
        var this_2 = ImageBitmap(_IntSize___get_width__impl__d9yl4o(pathBoundsSize), _IntSize___get_height__impl__prv63b(pathBoundsSize), config_0);
        // Inline function 'kotlin.contracts.contract' call
        // Inline function 'androidx.compose.foundation.BorderCache.drawBorderCache.<anonymous>' call
        this_1.imageBitmap_1 = this_2;
        targetImageBitmap = this_2;
        // Inline function 'kotlin.also' call
        var this_3 = Canvas(targetImageBitmap);
        // Inline function 'kotlin.contracts.contract' call
        // Inline function 'androidx.compose.foundation.BorderCache.drawBorderCache.<anonymous>' call
        this_1.canvas_1 = this_3;
        targetCanvas = this_3;
      }
      var tmp2_elvis_lhs = this_1.canvasDrawScope_1;
      var tmp_4;
      if (tmp2_elvis_lhs == null) {
        // Inline function 'kotlin.also' call
        var this_4 = new CanvasDrawScope();
        // Inline function 'kotlin.contracts.contract' call
        // Inline function 'androidx.compose.foundation.BorderCache.drawBorderCache.<anonymous>' call
        this_1.canvasDrawScope_1 = this_4;
        tmp_4 = this_4;
      } else {
        tmp_4 = tmp2_elvis_lhs;
      }
      var targetDrawScope = tmp_4;
      var drawSize = toSize(pathBoundsSize);
      // Inline function 'androidx.compose.ui.graphics.drawscope.CanvasDrawScope.draw' call
      var layoutDirection = _this__u8e3s4.get_layoutDirection_7e37v0_k$();
      var canvas = targetCanvas;
      var tmp0_container = targetDrawScope.get_drawParams_ncgfpp_k$();
      var prevDensity = tmp0_container.component1_7eebsc_k$();
      var prevLayoutDirection = tmp0_container.component2_7eebsb_k$();
      var prevCanvas = tmp0_container.component3_7eebsa_k$();
      var prevSize = tmp0_container.component4_67q0p1_k$();
      // Inline function 'kotlin.apply' call
      var this_5 = targetDrawScope.get_drawParams_ncgfpp_k$();
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.ui.graphics.drawscope.CanvasDrawScope.draw.<anonymous>' call
      this_5.set_density_qzk27e_k$(_this__u8e3s4);
      this_5.set_layoutDirection_vthtz8_k$(layoutDirection);
      this_5.set_canvas_1yi0mf_k$(canvas);
      this_5.set_size_6a0e6q_k$(drawSize);
      canvas.save_fbe7h_k$();
      // Inline function 'androidx.compose.foundation.BorderCache.drawBorderCache.<anonymous>' call
      targetDrawScope.drawRect$default_5x4e2k_k$(Companion_getInstance().get_Black_t4k9fh_k$(), VOID, drawSize, VOID, VOID, VOID, Companion_getInstance_3().get_Clear_ts5s9y_k$());
      // Inline function 'androidx.compose.foundation.BorderModifierNode.drawGenericBorder.<anonymous>.<anonymous>' call
      // Inline function 'androidx.compose.ui.graphics.drawscope.translate' call
      var left = -pathBounds.get_left_woprgw_k$();
      var top = -pathBounds.get_top_18ivbo_k$();
      targetDrawScope.get_drawContext_ffwztu_k$().get_transform_px941v_k$().translate_7gghdu_k$(left, top);
      // Inline function 'androidx.compose.foundation.BorderModifierNode.drawGenericBorder.<anonymous>.<anonymous>.<anonymous>' call
      targetDrawScope.drawPath$default_6abh83_k$(outline.get_path_wos8ry_k$(), brush, VOID, new Stroke(strokeWidth * 2));
      // Inline function 'androidx.compose.ui.graphics.drawscope.scale' call
      var scaleX = (_Size___get_width__impl__58y75t(targetDrawScope.get_size_cxx1ym_k$()) + 1) / _Size___get_width__impl__58y75t(targetDrawScope.get_size_cxx1ym_k$());
      var scaleY = (_Size___get_height__impl__a04p02(targetDrawScope.get_size_cxx1ym_k$()) + 1) / _Size___get_height__impl__a04p02(targetDrawScope.get_size_cxx1ym_k$());
      var pivot = targetDrawScope.get_center_dcexec_k$();
      // Inline function 'androidx.compose.ui.graphics.drawscope.withTransform' call
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      var $this$with = targetDrawScope.get_drawContext_ffwztu_k$();
      var previousSize = $this$with.get_size_cxx1ym_k$();
      $this$with.get_canvas_bshgm9_k$().save_fbe7h_k$();
      // Inline function 'androidx.compose.ui.graphics.drawscope.scale.<anonymous>' call
      $this$with.get_transform_px941v_k$().scale_rbtyk0_k$(scaleX, scaleY, pivot);
      // Inline function 'androidx.compose.foundation.BorderModifierNode.drawGenericBorder.<anonymous>.<anonymous>.<anonymous>.<anonymous>' call
      targetDrawScope.drawPath$default_6abh83_k$(maskPath, brush, VOID, VOID, VOID, Companion_getInstance_3().get_Clear_ts5s9y_k$());
      $this$with.get_canvas_bshgm9_k$().restore_a1ykhu_k$();
      $this$with.set_size_6a0e6q_k$(previousSize);
      targetDrawScope.get_drawContext_ffwztu_k$().get_transform_px941v_k$().translate_7gghdu_k$(-left, -top);
      canvas.restore_a1ykhu_k$();
      // Inline function 'kotlin.apply' call
      var this_6 = targetDrawScope.get_drawParams_ncgfpp_k$();
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.ui.graphics.drawscope.CanvasDrawScope.draw.<anonymous>' call
      this_6.set_density_qzk27e_k$(prevDensity);
      this_6.set_layoutDirection_vthtz8_k$(prevLayoutDirection);
      this_6.set_canvas_1yi0mf_k$(prevCanvas);
      this_6.set_size_6a0e6q_k$(prevSize);
      targetImageBitmap.prepareToDraw_sb34p6_k$();
      cacheImageBitmap = targetImageBitmap;
      tmp = _this__u8e3s4.onDrawWithContent_9a7tsh_k$(BorderModifierNode$drawGenericBorder$lambda_0(pathBounds, cacheImageBitmap, pathBoundsSize, colorFilter));
    }
    return tmp;
  }
  function drawRoundRectBorder(_this__u8e3s4, $this, brush, outline, topLeft, borderSize, fillArea, strokeWidth) {
    var tmp;
    if (get_isSimple(outline.get_roundRect_8fhall_k$())) {
      var cornerRadius = outline.get_roundRect_8fhall_k$().get_topLeftCornerRadius_91hulg_k$();
      var halfStroke = strokeWidth / 2;
      var borderStroke = new Stroke(strokeWidth);
      tmp = _this__u8e3s4.onDrawWithContent_9a7tsh_k$(BorderModifierNode$drawRoundRectBorder$lambda(fillArea, brush, cornerRadius, halfStroke, strokeWidth, topLeft, borderSize, borderStroke));
    } else {
      if ($this.borderCache_1 == null) {
        $this.borderCache_1 = new BorderCache();
      }
      var path = ensureNotNull($this.borderCache_1).obtainPath_y7q9hy_k$();
      var roundedRectPath = createRoundRectPath(path, outline.get_roundRect_8fhall_k$(), strokeWidth, fillArea);
      tmp = _this__u8e3s4.onDrawWithContent_9a7tsh_k$(BorderModifierNode$drawRoundRectBorder$lambda_0(roundedRectPath, brush));
    }
    return tmp;
  }
  function BorderModifierNode$drawWithCacheModifierNode$lambda(this$0) {
    return function ($this$CacheDrawModifierNode) {
      var hasValidBorderParams = $this$CacheDrawModifierNode.toPx_mycba2_k$(this$0.width_1) >= 0.0 ? _Size___get_minDimension__impl__4iso0r($this$CacheDrawModifierNode.get_size_cxx1ym_k$()) > 0.0 : false;
      var tmp;
      if (!hasValidBorderParams) {
        tmp = drawContentWithoutBorder($this$CacheDrawModifierNode);
      } else {
        // Inline function 'kotlin.math.min' call
        var tmp_0;
        if (equals(this$0.width_1, Companion_getInstance_4().get_Hairline_cy72lg_k$())) {
          tmp_0 = 1.0;
        } else {
          // Inline function 'kotlin.math.ceil' call
          var x = $this$CacheDrawModifierNode.toPx_mycba2_k$(this$0.width_1);
          tmp_0 = Math.ceil(x);
        }
        var a = tmp_0;
        // Inline function 'kotlin.math.ceil' call
        var x_0 = _Size___get_minDimension__impl__4iso0r($this$CacheDrawModifierNode.get_size_cxx1ym_k$()) / 2;
        var b = Math.ceil(x_0);
        var strokeWidthPx = Math.min(a, b);
        var halfStroke = strokeWidthPx / 2;
        var topLeft = Offset(halfStroke, halfStroke);
        var borderSize = Size_0(_Size___get_width__impl__58y75t($this$CacheDrawModifierNode.get_size_cxx1ym_k$()) - strokeWidthPx, _Size___get_height__impl__a04p02($this$CacheDrawModifierNode.get_size_cxx1ym_k$()) - strokeWidthPx);
        var fillArea = strokeWidthPx * 2 > _Size___get_minDimension__impl__4iso0r($this$CacheDrawModifierNode.get_size_cxx1ym_k$());
        var outline = this$0.shape_1.createOutline_jco4cb_k$($this$CacheDrawModifierNode.get_size_cxx1ym_k$(), $this$CacheDrawModifierNode.get_layoutDirection_7e37v0_k$(), $this$CacheDrawModifierNode);
        var tmp_1;
        if (outline instanceof Generic) {
          tmp_1 = drawGenericBorder($this$CacheDrawModifierNode, this$0, this$0.brush_1, outline, fillArea, strokeWidthPx);
        } else {
          if (outline instanceof Rounded) {
            tmp_1 = drawRoundRectBorder($this$CacheDrawModifierNode, this$0, this$0.brush_1, outline, topLeft, borderSize, fillArea, strokeWidthPx);
          } else {
            if (outline instanceof Rectangle) {
              tmp_1 = drawRectBorder($this$CacheDrawModifierNode, this$0.brush_1, topLeft, borderSize, fillArea, strokeWidthPx);
            } else {
              noWhenBranchMatchedException();
            }
          }
        }
        tmp = tmp_1;
      }
      return tmp;
    };
  }
  function BorderModifierNode$drawGenericBorder$lambda($outline, $brush) {
    return function ($this$onDrawWithContent) {
      $this$onDrawWithContent.drawContent_m0wwjp_k$();
      $this$onDrawWithContent.drawPath$default_6abh83_k$($outline.get_path_wos8ry_k$(), $brush);
      return Unit_getInstance();
    };
  }
  function BorderModifierNode$drawGenericBorder$lambda_0($pathBounds, $cacheImageBitmap, $pathBoundsSize, $colorFilter) {
    return function ($this$onDrawWithContent) {
      $this$onDrawWithContent.drawContent_m0wwjp_k$();
      var left = $pathBounds.get_left_woprgw_k$();
      var top = $pathBounds.get_top_18ivbo_k$();
      $this$onDrawWithContent.get_drawContext_ffwztu_k$().get_transform_px941v_k$().translate_7gghdu_k$(left, top);
      // Inline function 'androidx.compose.foundation.BorderModifierNode.drawGenericBorder.<anonymous>.<anonymous>' call
      $this$onDrawWithContent.drawImage$default_qql6c2_k$($cacheImageBitmap, VOID, $pathBoundsSize, VOID, VOID, VOID, VOID, $colorFilter);
      $this$onDrawWithContent.get_drawContext_ffwztu_k$().get_transform_px941v_k$().translate_7gghdu_k$(-left, -top);
      return Unit_getInstance();
    };
  }
  function BorderModifierNode$drawRoundRectBorder$lambda($fillArea, $brush, $cornerRadius, $halfStroke, $strokeWidth, $topLeft, $borderSize, $borderStroke) {
    return function ($this$onDrawWithContent) {
      $this$onDrawWithContent.drawContent_m0wwjp_k$();
      var tmp;
      if ($fillArea) {
        $this$onDrawWithContent.drawRoundRect$default_mredpw_k$($brush, VOID, VOID, $cornerRadius);
        tmp = Unit_getInstance();
      } else if (_CornerRadius___get_x__impl__1594cn($cornerRadius) < $halfStroke) {
        // Inline function 'androidx.compose.ui.graphics.drawscope.clipRect' call
        var left = $strokeWidth;
        var top = $strokeWidth;
        var right = _Size___get_width__impl__58y75t($this$onDrawWithContent.get_size_cxx1ym_k$()) - $strokeWidth;
        var bottom = _Size___get_height__impl__a04p02($this$onDrawWithContent.get_size_cxx1ym_k$()) - $strokeWidth;
        var clipOp = Companion_getInstance_5().get_Difference_lo2jbz_k$();
        // Inline function 'androidx.compose.ui.graphics.drawscope.withTransform' call
        // Inline function 'kotlin.with' call
        // Inline function 'kotlin.contracts.contract' call
        var $this$with = $this$onDrawWithContent.get_drawContext_ffwztu_k$();
        var previousSize = $this$with.get_size_cxx1ym_k$();
        $this$with.get_canvas_bshgm9_k$().save_fbe7h_k$();
        // Inline function 'androidx.compose.ui.graphics.drawscope.clipRect.<anonymous>' call
        $this$with.get_transform_px941v_k$().clipRect_3spswv_k$(left, top, right, bottom, clipOp);
        // Inline function 'androidx.compose.foundation.BorderModifierNode.drawRoundRectBorder.<anonymous>.<anonymous>' call
        $this$onDrawWithContent.drawRoundRect$default_mredpw_k$($brush, VOID, VOID, $cornerRadius);
        $this$with.get_canvas_bshgm9_k$().restore_a1ykhu_k$();
        $this$with.set_size_6a0e6q_k$(previousSize);
        tmp = Unit_getInstance();
      } else {
        $this$onDrawWithContent.drawRoundRect$default_mredpw_k$($brush, $topLeft, $borderSize, shrink($cornerRadius, $halfStroke), VOID, $borderStroke);
        tmp = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function BorderModifierNode$drawRoundRectBorder$lambda_0($roundedRectPath, $brush) {
    return function ($this$onDrawWithContent) {
      $this$onDrawWithContent.drawContent_m0wwjp_k$();
      $this$onDrawWithContent.drawPath$default_6abh83_k$($roundedRectPath, $brush);
      return Unit_getInstance();
    };
  }
  function BorderModifierNode(widthParameter, brushParameter, shapeParameter) {
    DelegatingNode.call(this);
    this.borderCache_1 = null;
    this.width_1 = widthParameter;
    this.brush_1 = brushParameter;
    this.shape_1 = shapeParameter;
    var tmp = this;
    tmp.drawWithCacheModifierNode_1 = this.delegate_x7rm2e_k$(CacheDrawModifierNode(BorderModifierNode$drawWithCacheModifierNode$lambda(this)));
  }
  protoOf(BorderModifierNode).set_width_jbfnku_k$ = function (value) {
    if (!equals(this.width_1, value)) {
      this.width_1 = value;
      this.drawWithCacheModifierNode_1.invalidateDrawCache_6frutv_k$();
    }
  };
  protoOf(BorderModifierNode).get_width_7o61hi_k$ = function () {
    return this.width_1;
  };
  protoOf(BorderModifierNode).set_brush_hdgczn_k$ = function (value) {
    if (!equals(this.brush_1, value)) {
      this.brush_1 = value;
      this.drawWithCacheModifierNode_1.invalidateDrawCache_6frutv_k$();
    }
  };
  protoOf(BorderModifierNode).get_brush_ipcjyp_k$ = function () {
    return this.brush_1;
  };
  protoOf(BorderModifierNode).set_shape_ak8aoz_k$ = function (value) {
    if (!equals(this.shape_1, value)) {
      this.shape_1 = value;
      this.drawWithCacheModifierNode_1.invalidateDrawCache_6frutv_k$();
    }
  };
  protoOf(BorderModifierNode).get_shape_iyi9a0_k$ = function () {
    return this.shape_1;
  };
  function _set_imageBitmap__59o72z($this, _set____db54di) {
    $this.imageBitmap_1 = _set____db54di;
  }
  function _get_imageBitmap__zh1ok9($this) {
    return $this.imageBitmap_1;
  }
  function _set_canvas__plaszl($this, _set____db54di) {
    $this.canvas_1 = _set____db54di;
  }
  function _get_canvas__o4k8ct($this) {
    return $this.canvas_1;
  }
  function _set_canvasDrawScope__6hen3n($this, _set____db54di) {
    $this.canvasDrawScope_1 = _set____db54di;
  }
  function _get_canvasDrawScope__3mbkex($this) {
    return $this.canvasDrawScope_1;
  }
  function _set_borderPath__3zk3ay($this, _set____db54di) {
    $this.borderPath_1 = _set____db54di;
  }
  function _get_borderPath__j1sog6($this) {
    return $this.borderPath_1;
  }
  function component1($this) {
    return $this.imageBitmap_1;
  }
  function component2($this) {
    return $this.canvas_1;
  }
  function component3($this) {
    return $this.canvasDrawScope_1;
  }
  function component4($this) {
    return $this.borderPath_1;
  }
  function BorderCache(imageBitmap, canvas, canvasDrawScope, borderPath) {
    imageBitmap = imageBitmap === VOID ? null : imageBitmap;
    canvas = canvas === VOID ? null : canvas;
    canvasDrawScope = canvasDrawScope === VOID ? null : canvasDrawScope;
    borderPath = borderPath === VOID ? null : borderPath;
    this.imageBitmap_1 = imageBitmap;
    this.canvas_1 = canvas;
    this.canvasDrawScope_1 = canvasDrawScope;
    this.borderPath_1 = borderPath;
  }
  protoOf(BorderCache).drawBorderCache_n1h2qw_k$ = function (_this__u8e3s4, borderSize, config, block) {
    var targetImageBitmap = this.imageBitmap_1;
    var targetCanvas = this.canvas_1;
    var tmp;
    var tmp0_safe_receiver = targetImageBitmap;
    var tmp_0 = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.get_config_d6pt2v_k$();
    if (equals(tmp_0 == null ? null : new ImageBitmapConfig(tmp_0), new ImageBitmapConfig(Companion_getInstance_0().get_Argb8888_epitdf_k$()))) {
      tmp = true;
    } else {
      var tmp1_safe_receiver = targetImageBitmap;
      var tmp_1 = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.get_config_d6pt2v_k$();
      tmp = equals(new ImageBitmapConfig(config), tmp_1 == null ? null : new ImageBitmapConfig(tmp_1));
    }
    var compatibleConfig = tmp;
    if ((((targetImageBitmap == null ? true : targetCanvas == null) ? true : _Size___get_width__impl__58y75t(_this__u8e3s4.get_size_cxx1ym_k$()) > targetImageBitmap.get_width_j0q4yl_k$()) ? true : _Size___get_height__impl__a04p02(_this__u8e3s4.get_size_cxx1ym_k$()) > targetImageBitmap.get_height_e7t92o_k$()) ? true : !compatibleConfig) {
      // Inline function 'kotlin.also' call
      var this_0 = ImageBitmap(_IntSize___get_width__impl__d9yl4o(borderSize), _IntSize___get_height__impl__prv63b(borderSize), config);
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.foundation.BorderCache.drawBorderCache.<anonymous>' call
      this.imageBitmap_1 = this_0;
      targetImageBitmap = this_0;
      // Inline function 'kotlin.also' call
      var this_1 = Canvas(targetImageBitmap);
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.foundation.BorderCache.drawBorderCache.<anonymous>' call
      this.canvas_1 = this_1;
      targetCanvas = this_1;
    }
    var tmp2_elvis_lhs = this.canvasDrawScope_1;
    var tmp_2;
    if (tmp2_elvis_lhs == null) {
      // Inline function 'kotlin.also' call
      var this_2 = new CanvasDrawScope();
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.foundation.BorderCache.drawBorderCache.<anonymous>' call
      this.canvasDrawScope_1 = this_2;
      tmp_2 = this_2;
    } else {
      tmp_2 = tmp2_elvis_lhs;
    }
    var targetDrawScope = tmp_2;
    var drawSize = toSize(borderSize);
    // Inline function 'androidx.compose.ui.graphics.drawscope.CanvasDrawScope.draw' call
    var layoutDirection = _this__u8e3s4.get_layoutDirection_7e37v0_k$();
    var canvas = targetCanvas;
    var tmp0_container = targetDrawScope.get_drawParams_ncgfpp_k$();
    var prevDensity = tmp0_container.component1_7eebsc_k$();
    var prevLayoutDirection = tmp0_container.component2_7eebsb_k$();
    var prevCanvas = tmp0_container.component3_7eebsa_k$();
    var prevSize = tmp0_container.component4_67q0p1_k$();
    // Inline function 'kotlin.apply' call
    var this_3 = targetDrawScope.get_drawParams_ncgfpp_k$();
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.ui.graphics.drawscope.CanvasDrawScope.draw.<anonymous>' call
    this_3.set_density_qzk27e_k$(_this__u8e3s4);
    this_3.set_layoutDirection_vthtz8_k$(layoutDirection);
    this_3.set_canvas_1yi0mf_k$(canvas);
    this_3.set_size_6a0e6q_k$(drawSize);
    canvas.save_fbe7h_k$();
    // Inline function 'androidx.compose.foundation.BorderCache.drawBorderCache.<anonymous>' call
    targetDrawScope.drawRect$default_5x4e2k_k$(Companion_getInstance().get_Black_t4k9fh_k$(), VOID, drawSize, VOID, VOID, VOID, Companion_getInstance_3().get_Clear_ts5s9y_k$());
    block(targetDrawScope);
    canvas.restore_a1ykhu_k$();
    // Inline function 'kotlin.apply' call
    var this_4 = targetDrawScope.get_drawParams_ncgfpp_k$();
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.ui.graphics.drawscope.CanvasDrawScope.draw.<anonymous>' call
    this_4.set_density_qzk27e_k$(prevDensity);
    this_4.set_layoutDirection_vthtz8_k$(prevLayoutDirection);
    this_4.set_canvas_1yi0mf_k$(prevCanvas);
    this_4.set_size_6a0e6q_k$(prevSize);
    targetImageBitmap.prepareToDraw_sb34p6_k$();
    return targetImageBitmap;
  };
  protoOf(BorderCache).obtainPath_y7q9hy_k$ = function () {
    var tmp0_elvis_lhs = this.borderPath_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      // Inline function 'kotlin.also' call
      var this_0 = Path();
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.foundation.BorderCache.obtainPath.<anonymous>' call
      this.borderPath_1 = this_0;
      tmp = this_0;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  };
  protoOf(BorderCache).copy_6uzguh_k$ = function (imageBitmap, canvas, canvasDrawScope, borderPath) {
    return new BorderCache(imageBitmap, canvas, canvasDrawScope, borderPath);
  };
  protoOf(BorderCache).copy$default_dv8kvw_k$ = function (imageBitmap, canvas, canvasDrawScope, borderPath, $super) {
    imageBitmap = imageBitmap === VOID ? this.imageBitmap_1 : imageBitmap;
    canvas = canvas === VOID ? this.canvas_1 : canvas;
    canvasDrawScope = canvasDrawScope === VOID ? this.canvasDrawScope_1 : canvasDrawScope;
    borderPath = borderPath === VOID ? this.borderPath_1 : borderPath;
    return $super === VOID ? this.copy_6uzguh_k$(imageBitmap, canvas, canvasDrawScope, borderPath) : $super.copy_6uzguh_k$.call(this, imageBitmap, canvas, canvasDrawScope, borderPath);
  };
  protoOf(BorderCache).toString = function () {
    return 'BorderCache(imageBitmap=' + this.imageBitmap_1 + ', canvas=' + this.canvas_1 + ', canvasDrawScope=' + this.canvasDrawScope_1 + ', borderPath=' + this.borderPath_1 + ')';
  };
  protoOf(BorderCache).hashCode = function () {
    var result = this.imageBitmap_1 == null ? 0 : hashCode(this.imageBitmap_1);
    result = imul(result, 31) + (this.canvas_1 == null ? 0 : hashCode(this.canvas_1)) | 0;
    result = imul(result, 31) + (this.canvasDrawScope_1 == null ? 0 : hashCode(this.canvasDrawScope_1)) | 0;
    result = imul(result, 31) + (this.borderPath_1 == null ? 0 : hashCode(this.borderPath_1)) | 0;
    return result;
  };
  protoOf(BorderCache).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof BorderCache))
      return false;
    var tmp0_other_with_cast = other instanceof BorderCache ? other : THROW_CCE();
    if (!equals(this.imageBitmap_1, tmp0_other_with_cast.imageBitmap_1))
      return false;
    if (!equals(this.canvas_1, tmp0_other_with_cast.canvas_1))
      return false;
    if (!equals(this.canvasDrawScope_1, tmp0_other_with_cast.canvasDrawScope_1))
      return false;
    if (!equals(this.borderPath_1, tmp0_other_with_cast.borderPath_1))
      return false;
    return true;
  };
  function drawContentWithoutBorder(_this__u8e3s4) {
    return _this__u8e3s4.onDrawWithContent_9a7tsh_k$(drawContentWithoutBorder$lambda);
  }
  function drawRectBorder(_this__u8e3s4, brush, topLeft, borderSize, fillArea, strokeWidthPx) {
    var rectTopLeft = fillArea ? Companion_getInstance_6().get_Zero_k6n73t_k$() : topLeft;
    var size = fillArea ? _this__u8e3s4.get_size_cxx1ym_k$() : borderSize;
    var style = fillArea ? Fill_getInstance() : new Stroke(strokeWidthPx);
    return _this__u8e3s4.onDrawWithContent_9a7tsh_k$(drawRectBorder$lambda(brush, rectTopLeft, size, style));
  }
  function shrink(_this__u8e3s4, value) {
    // Inline function 'kotlin.math.max' call
    var b = _CornerRadius___get_x__impl__1594cn(_this__u8e3s4) - value;
    var tmp = Math.max(0.0, b);
    // Inline function 'kotlin.math.max' call
    var b_0 = _CornerRadius___get_y__impl__tyvleu(_this__u8e3s4) - value;
    var tmp$ret$1 = Math.max(0.0, b_0);
    return CornerRadius(tmp, tmp$ret$1);
  }
  function createRoundRectPath(targetPath, roundedRect, strokeWidth, fillArea) {
    // Inline function 'kotlin.apply' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.foundation.createRoundRectPath.<anonymous>' call
    targetPath.reset_5u6xz3_k$();
    targetPath.addRoundRect_w1epq0_k$(roundedRect);
    if (!fillArea) {
      // Inline function 'kotlin.apply' call
      var this_0 = Path();
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.foundation.createRoundRectPath.<anonymous>.<anonymous>' call
      this_0.addRoundRect_w1epq0_k$(createInsetRoundedRect(strokeWidth, roundedRect));
      var insetPath = this_0;
      targetPath.op_fj0csx_k$(targetPath, insetPath, Companion_getInstance_2().get_Difference_nnbib6_k$());
    }
    return targetPath;
  }
  function createInsetRoundedRect(widthPx, roundedRect) {
    var tmp0_right = roundedRect.get_width_j0q4yl_k$() - widthPx;
    var tmp1_bottom = roundedRect.get_height_e7t92o_k$() - widthPx;
    var tmp2_topLeftCornerRadius = shrink(roundedRect.get_topLeftCornerRadius_91hulg_k$(), widthPx);
    var tmp3_topRightCornerRadius = shrink(roundedRect.get_topRightCornerRadius_kxqun3_k$(), widthPx);
    var tmp4_bottomLeftCornerRadius = shrink(roundedRect.get_bottomLeftCornerRadius_9r65ws_k$(), widthPx);
    var tmp5_bottomRightCornerRadius = shrink(roundedRect.get_bottomRightCornerRadius_166w49_k$(), widthPx);
    return new RoundRect(widthPx, widthPx, tmp0_right, tmp1_bottom, tmp2_topLeftCornerRadius, tmp3_topRightCornerRadius, tmp5_bottomRightCornerRadius, tmp4_bottomLeftCornerRadius);
  }
  function drawContentWithoutBorder$lambda($this$onDrawWithContent) {
    $this$onDrawWithContent.drawContent_m0wwjp_k$();
    return Unit_getInstance();
  }
  function drawRectBorder$lambda($brush, $rectTopLeft, $size, $style) {
    return function ($this$onDrawWithContent) {
      $this$onDrawWithContent.drawContent_m0wwjp_k$();
      $this$onDrawWithContent.drawRect$default_rrw2w5_k$($brush, $rectTopLeft, $size, VOID, $style);
      return Unit_getInstance();
    };
  }
  function get_$stableprop() {
    return 0;
  }
  function BorderStroke(width, brush) {
    this.width_1 = width;
    this.brush_1 = brush;
    this.$stable_1 = 0;
  }
  protoOf(BorderStroke).get_width_7o61hi_k$ = function () {
    return this.width_1;
  };
  protoOf(BorderStroke).get_brush_ipcjyp_k$ = function () {
    return this.brush_1;
  };
  protoOf(BorderStroke).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof BorderStroke))
      return false;
    if (!equals(this.width_1, other.width_1))
      return false;
    if (!equals(this.brush_1, other.brush_1))
      return false;
    return true;
  };
  protoOf(BorderStroke).hashCode = function () {
    var result = Dp__hashCode_impl_sxkrra(this.width_1);
    result = imul(31, result) + hashCode(this.brush_1) | 0;
    return result;
  };
  protoOf(BorderStroke).toString = function () {
    return 'BorderStroke(width=' + new Dp(this.width_1) + ', brush=' + this.brush_1 + ')';
  };
  protoOf(BorderStroke).copy_cj936g_k$ = function (width, brush) {
    return new BorderStroke(width, brush);
  };
  protoOf(BorderStroke).copy$default_u7xz4f_k$ = function (width, brush, $super) {
    width = width === VOID ? this.width_1 : width;
    brush = brush === VOID ? this.brush_1 : brush;
    return $super === VOID ? this.copy_cj936g_k$(width, brush) : $super.copy_cj936g_k$.call(this, new Dp(width), brush);
  };
  function get_MaxSupportedElevation() {
    _init_properties_ClipScrollableContainer_kt__60yb60();
    return MaxSupportedElevation;
  }
  var MaxSupportedElevation;
  function get_HorizontalScrollableClipModifier() {
    _init_properties_ClipScrollableContainer_kt__60yb60();
    return HorizontalScrollableClipModifier;
  }
  var HorizontalScrollableClipModifier;
  function get_VerticalScrollableClipModifier() {
    _init_properties_ClipScrollableContainer_kt__60yb60();
    return VerticalScrollableClipModifier;
  }
  var VerticalScrollableClipModifier;
  function HorizontalScrollableClipModifier$1() {
  }
  protoOf(HorizontalScrollableClipModifier$1).createOutline_jco4cb_k$ = function (size, layoutDirection, density) {
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.foundation.<no name provided>.createOutline.<anonymous>' call
    var inflateSize = density.roundToPx_yb7vg8_k$(get_MaxSupportedElevation());
    return new Rectangle(new Rect(0.0, -inflateSize, _Size___get_width__impl__58y75t(size), _Size___get_height__impl__a04p02(size) + inflateSize));
  };
  function VerticalScrollableClipModifier$1() {
  }
  protoOf(VerticalScrollableClipModifier$1).createOutline_jco4cb_k$ = function (size, layoutDirection, density) {
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.foundation.<no name provided>.createOutline.<anonymous>' call
    var inflateSize = density.roundToPx_yb7vg8_k$(get_MaxSupportedElevation());
    return new Rectangle(new Rect(-inflateSize, 0.0, _Size___get_width__impl__58y75t(size) + inflateSize, _Size___get_height__impl__a04p02(size)));
  };
  var properties_initialized_ClipScrollableContainer_kt_l2hne;
  function _init_properties_ClipScrollableContainer_kt__60yb60() {
    if (!properties_initialized_ClipScrollableContainer_kt_l2hne) {
      properties_initialized_ClipScrollableContainer_kt_l2hne = true;
      // Inline function 'androidx.compose.ui.unit.dp' call
      MaxSupportedElevation = _Dp___init__impl__ms3zkb(30);
      var tmp = Companion_getInstance_7();
      HorizontalScrollableClipModifier = clip(tmp, new HorizontalScrollableClipModifier$1());
      var tmp_0 = Companion_getInstance_7();
      VerticalScrollableClipModifier = clip(tmp_0, new VerticalScrollableClipModifier$1());
    }
  }
  function ExperimentalFoundationApi() {
  }
  protoOf(ExperimentalFoundationApi).equals = function (other) {
    if (!(other instanceof ExperimentalFoundationApi))
      return false;
    other instanceof ExperimentalFoundationApi || THROW_CCE();
    return true;
  };
  protoOf(ExperimentalFoundationApi).hashCode = function () {
    return 0;
  };
  protoOf(ExperimentalFoundationApi).toString = function () {
    return '@androidx.compose.foundation.ExperimentalFoundationApi()';
  };
  function get_focusGroupInspectorInfo() {
    _init_properties_Focusable_kt__2q5fls();
    return focusGroupInspectorInfo;
  }
  var focusGroupInspectorInfo;
  function get_FocusableInNonTouchModeElement() {
    _init_properties_Focusable_kt__2q5fls();
    return FocusableInNonTouchModeElement;
  }
  var FocusableInNonTouchModeElement;
  function _get_inputModeManager__dmvjvv($this) {
    return currentValueOf($this, get_LocalInputModeManager());
  }
  function FocusableInNonTouchMode() {
    Node.call(this);
  }
  protoOf(FocusableInNonTouchMode).applyFocusProperties_di1bpj_k$ = function (focusProperties) {
    // Inline function 'kotlin.apply' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.foundation.FocusableInNonTouchMode.applyFocusProperties.<anonymous>' call
    focusProperties.set_canFocus_d7yxf4_k$(!(_get_inputModeManager__dmvjvv(this).get_inputMode_6j1lsi_k$() === Companion_getInstance_8().get_Touch_mjalr8_k$()));
  };
  function focusGroupInspectorInfo$lambda($this$null) {
    _init_properties_Focusable_kt__2q5fls();
    // Inline function 'androidx.compose.foundation.focusGroupInspectorInfo.<anonymous>' call
    $this$null.set_name_wkmnld_k$('focusGroup');
    return Unit_getInstance();
  }
  function _get_arbitraryHashCode__1p68u4($this) {
    return $this.arbitraryHashCode_1;
  }
  function FocusableInNonTouchModeElement$1() {
    ModifierNodeElement.call(this);
    this.arbitraryHashCode_1 = identityHashCode(this);
  }
  protoOf(FocusableInNonTouchModeElement$1).create_md4cuc_k$ = function () {
    return new FocusableInNonTouchMode();
  };
  protoOf(FocusableInNonTouchModeElement$1).update_r6k2rg_k$ = function (node) {
  };
  protoOf(FocusableInNonTouchModeElement$1).update_9wd57p_k$ = function (node) {
    return this.update_r6k2rg_k$(node instanceof FocusableInNonTouchMode ? node : THROW_CCE());
  };
  protoOf(FocusableInNonTouchModeElement$1).hashCode = function () {
    return this.arbitraryHashCode_1;
  };
  protoOf(FocusableInNonTouchModeElement$1).equals = function (other) {
    return this === other;
  };
  protoOf(FocusableInNonTouchModeElement$1).inspectableProperties_e25ntu_k$ = function (_this__u8e3s4) {
    _this__u8e3s4.set_name_wkmnld_k$('focusableInNonTouchMode');
  };
  var properties_initialized_Focusable_kt_k4lele;
  function _init_properties_Focusable_kt__2q5fls() {
    if (!properties_initialized_Focusable_kt_k4lele) {
      properties_initialized_Focusable_kt_k4lele = true;
      // Inline function 'androidx.compose.ui.platform.debugInspectorInfo' call
      var tmp;
      if (get_isDebugInspectorInfoEnabled()) {
        tmp = focusGroupInspectorInfo$lambda;
      } else {
        tmp = get_NoInspectorInfo();
      }
      var tmp$ret$0 = tmp;
      focusGroupInspectorInfo = new InspectableModifier(tmp$ret$0);
      FocusableInNonTouchModeElement = new FocusableInNonTouchModeElement$1();
    }
  }
  function get_ModifierLocalFocusedBoundsObserver() {
    _init_properties_FocusedBounds_kt__l9iahm();
    return ModifierLocalFocusedBoundsObserver;
  }
  var ModifierLocalFocusedBoundsObserver;
  function ModifierLocalFocusedBoundsObserver$lambda() {
    _init_properties_FocusedBounds_kt__l9iahm();
    return null;
  }
  var properties_initialized_FocusedBounds_kt_k69nss;
  function _init_properties_FocusedBounds_kt__l9iahm() {
    if (!properties_initialized_FocusedBounds_kt_k69nss) {
      properties_initialized_FocusedBounds_kt_k69nss = true;
      ModifierLocalFocusedBoundsObserver = modifierLocalOf(ModifierLocalFocusedBoundsObserver$lambda);
    }
  }
  function get_LocalIndication() {
    _init_properties_Indication_kt__w3ndj0();
    return LocalIndication;
  }
  var LocalIndication;
  function Indication() {
  }
  function _get_isPressed__f6cq7t($this) {
    return $this.isPressed_1;
  }
  function _get_isHovered__wio4dc($this) {
    return $this.isHovered_1;
  }
  function _get_isFocused__xvmarg($this) {
    return $this.isFocused_1;
  }
  function DefaultDebugIndicationInstance(isPressed, isHovered, isFocused) {
    this.isPressed_1 = isPressed;
    this.isHovered_1 = isHovered;
    this.isFocused_1 = isFocused;
  }
  protoOf(DefaultDebugIndicationInstance).drawIndication_8rzu54_k$ = function (_this__u8e3s4) {
    _this__u8e3s4.drawContent_m0wwjp_k$();
    if (this.isPressed_1.get_value_j01efc_k$()) {
      _this__u8e3s4.drawRect$default_5x4e2k_k$(Color__copy$default_impl_ectz3s(Companion_getInstance().get_Black_t4k9fh_k$(), 0.3), VOID, _this__u8e3s4.get_size_cxx1ym_k$());
    } else if (this.isHovered_1.get_value_j01efc_k$() ? true : this.isFocused_1.get_value_j01efc_k$()) {
      _this__u8e3s4.drawRect$default_5x4e2k_k$(Color__copy$default_impl_ectz3s(Companion_getInstance().get_Black_t4k9fh_k$(), 0.1), VOID, _this__u8e3s4.get_size_cxx1ym_k$());
    }
  };
  function DefaultDebugIndication() {
    DefaultDebugIndication_instance = this;
  }
  protoOf(DefaultDebugIndication).rememberUpdatedInstance_t0r2w_k$ = function (interactionSource) {
    illegalDecoyCallException('rememberUpdatedInstance');
  };
  protoOf(DefaultDebugIndication).rememberUpdatedInstance$composable_cej9r0_k$ = function (interactionSource, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(202464790);
    sourceInformation($composer_0, 'C(rememberUpdatedInstance$composable)183@7542L25,184@7610L25,185@7678L25,186@7719L115:Indication.kt#71ulvw');
    if (isTraceInProgress()) {
      traceEventStart(202464790, $changed, -1, 'androidx.compose.foundation.DefaultDebugIndication.rememberUpdatedInstance$composable (Indication.kt:182)');
    }
    var isPressed = collectIsPressedAsState$composable(interactionSource, $composer_0, 14 & $changed);
    var isHovered = collectIsHoveredAsState$composable(interactionSource, $composer_0, 14 & $changed);
    var isFocused = collectIsFocusedAsState$composable(interactionSource, $composer_0, 14 & $changed);
    // Inline function 'androidx.compose.runtime.remember$composable' call
    var $composer_1 = $composer_0;
    $composer_1.startReplaceableGroup_ip860b_k$(-838505973);
    sourceInformation($composer_1, 'CC(remember$composable)P(1):Composables.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    var invalid = $composer_1.changed_ga7h3f_k$(interactionSource);
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it = $composer_1.rememberedValue_4dg93v_k$();
    var tmp;
    if (invalid ? true : it === Companion_getInstance_9().get_Empty_i9b85g_k$()) {
      // Inline function 'androidx.compose.foundation.DefaultDebugIndication.rememberUpdatedInstance$composable.<anonymous>' call
      var value = new DefaultDebugIndicationInstance(isPressed, isHovered, isFocused);
      $composer_1.updateRememberedValue_l1wh71_k$(value);
      tmp = value;
    } else {
      tmp = it;
    }
    var tmp_0 = tmp;
    var tmp0 = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    $composer_1.endReplaceableGroup_ern0ak_k$();
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return tmp0;
  };
  var DefaultDebugIndication_instance;
  function DefaultDebugIndication_getInstance() {
    if (DefaultDebugIndication_instance == null)
      new DefaultDebugIndication();
    return DefaultDebugIndication_instance;
  }
  function IndicationInstance() {
  }
  function LocalIndication$lambda() {
    _init_properties_Indication_kt__w3ndj0();
    return DefaultDebugIndication_getInstance();
  }
  var properties_initialized_Indication_kt_w71gpq;
  function _init_properties_Indication_kt__w3ndj0() {
    if (!properties_initialized_Indication_kt_w71gpq) {
      properties_initialized_Indication_kt_w71gpq = true;
      LocalIndication = staticCompositionLocalOf(LocalIndication$lambda);
    }
  }
  function get_HorizontalPointerDirectionConfig() {
    _init_properties_DragGestureDetector_kt__sw7hnt();
    return HorizontalPointerDirectionConfig;
  }
  var HorizontalPointerDirectionConfig;
  function get_VerticalPointerDirectionConfig() {
    _init_properties_DragGestureDetector_kt__sw7hnt();
    return VerticalPointerDirectionConfig;
  }
  var VerticalPointerDirectionConfig;
  function get_mouseSlop() {
    _init_properties_DragGestureDetector_kt__sw7hnt();
    return mouseSlop;
  }
  var mouseSlop;
  function get_defaultTouchSlop() {
    _init_properties_DragGestureDetector_kt__sw7hnt();
    return defaultTouchSlop;
  }
  var defaultTouchSlop;
  function get_mouseToTouchSlopRatio() {
    _init_properties_DragGestureDetector_kt__sw7hnt();
    return mouseToTouchSlopRatio;
  }
  var mouseToTouchSlopRatio;
  function PointerDirectionConfig() {
  }
  function HorizontalPointerDirectionConfig$1() {
  }
  protoOf(HorizontalPointerDirectionConfig$1).mainAxisDelta_v8am0k_k$ = function (offset) {
    return _Offset___get_x__impl__xvi35n(offset);
  };
  protoOf(HorizontalPointerDirectionConfig$1).crossAxisDelta_4et5rh_k$ = function (offset) {
    return _Offset___get_y__impl__8bzhra(offset);
  };
  protoOf(HorizontalPointerDirectionConfig$1).offsetFromChanges_60f50k_k$ = function (mainChange, crossChange) {
    return Offset(mainChange, crossChange);
  };
  function VerticalPointerDirectionConfig$1() {
  }
  protoOf(VerticalPointerDirectionConfig$1).mainAxisDelta_v8am0k_k$ = function (offset) {
    return _Offset___get_y__impl__8bzhra(offset);
  };
  protoOf(VerticalPointerDirectionConfig$1).crossAxisDelta_4et5rh_k$ = function (offset) {
    return _Offset___get_x__impl__xvi35n(offset);
  };
  protoOf(VerticalPointerDirectionConfig$1).offsetFromChanges_60f50k_k$ = function (mainChange, crossChange) {
    return Offset(crossChange, mainChange);
  };
  var properties_initialized_DragGestureDetector_kt_xqxw6j;
  function _init_properties_DragGestureDetector_kt__sw7hnt() {
    if (!properties_initialized_DragGestureDetector_kt_xqxw6j) {
      properties_initialized_DragGestureDetector_kt_xqxw6j = true;
      HorizontalPointerDirectionConfig = new HorizontalPointerDirectionConfig$1();
      VerticalPointerDirectionConfig = new VerticalPointerDirectionConfig$1();
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
  var Orientation_Vertical_instance;
  var Orientation_Horizontal_instance;
  function values() {
    return [Orientation_Vertical_getInstance(), Orientation_Horizontal_getInstance()];
  }
  function valueOf(value) {
    switch (value) {
      case 'Vertical':
        return Orientation_Vertical_getInstance();
      case 'Horizontal':
        return Orientation_Horizontal_getInstance();
      default:
        Orientation_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  var Orientation_entriesInitialized;
  function Orientation_initEntries() {
    if (Orientation_entriesInitialized)
      return Unit_getInstance();
    Orientation_entriesInitialized = true;
    Orientation_Vertical_instance = new Orientation('Vertical', 0);
    Orientation_Horizontal_instance = new Orientation('Horizontal', 1);
  }
  function Orientation(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function Orientation_Vertical_getInstance() {
    Orientation_initEntries();
    return Orientation_Vertical_instance;
  }
  function Orientation_Horizontal_getInstance() {
    Orientation_initEntries();
    return Orientation_Horizontal_instance;
  }
  function get_NoOpOnDragStarted() {
    _init_properties_Scrollable_kt__k2543d();
    return NoOpOnDragStarted;
  }
  var NoOpOnDragStarted;
  function get_NoOpScrollScope() {
    _init_properties_Scrollable_kt__k2543d();
    return NoOpScrollScope;
  }
  var NoOpScrollScope;
  function get_ModifierLocalScrollableContainer() {
    _init_properties_Scrollable_kt__k2543d();
    return ModifierLocalScrollableContainer;
  }
  var ModifierLocalScrollableContainer;
  function get_DefaultScrollMotionDurationScale() {
    _init_properties_Scrollable_kt__k2543d();
    return DefaultScrollMotionDurationScale;
  }
  var DefaultScrollMotionDurationScale;
  function get_DefaultScrollMotionDurationScaleFactor() {
    return DefaultScrollMotionDurationScaleFactor;
  }
  var DefaultScrollMotionDurationScaleFactor;
  function NoOpOnDragStarted$slambda(resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(NoOpOnDragStarted$slambda).invoke_mv1t29_k$ = function ($this$null, it, $completion) {
    var tmp = this.create_y4kist_k$($this$null, it, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(NoOpOnDragStarted$slambda).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = (!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE();
    return this.invoke_mv1t29_k$(tmp, p2 instanceof Offset_0 ? p2.packedValue_1 : THROW_CCE(), $completion);
  };
  protoOf(NoOpOnDragStarted$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        if (tmp === 0) {
          this.set_exceptionState_fex74n_k$(1);
          return Unit_getInstance();
        } else if (tmp === 1) {
          throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        throw e;
      }
     while (true);
  };
  protoOf(NoOpOnDragStarted$slambda).create_y4kist_k$ = function ($this$null, it, completion) {
    var i = new NoOpOnDragStarted$slambda(completion);
    i.$this$null_1 = $this$null;
    i.it_1 = it;
    return i;
  };
  function NoOpOnDragStarted$slambda_0(resultContinuation) {
    var i = new NoOpOnDragStarted$slambda(resultContinuation);
    var l = function ($this$null, it, $completion) {
      return i.invoke_mv1t29_k$($this$null, it.packedValue_1, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function NoOpScrollScope$1() {
  }
  protoOf(NoOpScrollScope$1).scrollBy_5wefpo_k$ = function (pixels) {
    return pixels;
  };
  function ModifierLocalScrollableContainer$lambda() {
    _init_properties_Scrollable_kt__k2543d();
    return false;
  }
  function DefaultScrollMotionDurationScale$1() {
  }
  protoOf(DefaultScrollMotionDurationScale$1).get_scaleFactor_64aucw_k$ = function () {
    return 1.0;
  };
  var properties_initialized_Scrollable_kt_7d5rzr;
  function _init_properties_Scrollable_kt__k2543d() {
    if (!properties_initialized_Scrollable_kt_7d5rzr) {
      properties_initialized_Scrollable_kt_7d5rzr = true;
      NoOpOnDragStarted = NoOpOnDragStarted$slambda_0(null);
      NoOpScrollScope = new NoOpScrollScope$1();
      ModifierLocalScrollableContainer = modifierLocalOf(ModifierLocalScrollableContainer$lambda);
      DefaultScrollMotionDurationScale = new DefaultScrollMotionDurationScale$1();
    }
  }
  function ScrollScope() {
  }
  function get_NoPressGesture() {
    _init_properties_TapGestureDetector_kt__k4yygc();
    return NoPressGesture;
  }
  var NoPressGesture;
  function PressGestureScope() {
  }
  function NoPressGesture$slambda(resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(NoPressGesture$slambda).invoke_b4aedf_k$ = function ($this$null, it, $completion) {
    var tmp = this.create_exjx1j_k$($this$null, it, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(NoPressGesture$slambda).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = (!(p1 == null) ? isInterface(p1, PressGestureScope) : false) ? p1 : THROW_CCE();
    return this.invoke_b4aedf_k$(tmp, p2 instanceof Offset_0 ? p2.packedValue_1 : THROW_CCE(), $completion);
  };
  protoOf(NoPressGesture$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        if (tmp === 0) {
          this.set_exceptionState_fex74n_k$(1);
          return Unit_getInstance();
        } else if (tmp === 1) {
          throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        throw e;
      }
     while (true);
  };
  protoOf(NoPressGesture$slambda).create_exjx1j_k$ = function ($this$null, it, completion) {
    var i = new NoPressGesture$slambda(completion);
    i.$this$null_1 = $this$null;
    i.it_1 = it;
    return i;
  };
  function NoPressGesture$slambda_0(resultContinuation) {
    var i = new NoPressGesture$slambda(resultContinuation);
    var l = function ($this$null, it, $completion) {
      return i.invoke_b4aedf_k$($this$null, it.packedValue_1, $completion);
    };
    l.$arity = 2;
    return l;
  }
  var properties_initialized_TapGestureDetector_kt_lhe8oi;
  function _init_properties_TapGestureDetector_kt__k4yygc() {
    if (!properties_initialized_TapGestureDetector_kt_lhe8oi) {
      properties_initialized_TapGestureDetector_kt_lhe8oi = true;
      NoPressGesture = NoPressGesture$slambda_0(null);
    }
  }
  function get_MinFlingVelocityDp() {
    _init_properties_SnapFlingBehavior_kt__1y2evi();
    return MinFlingVelocityDp;
  }
  var MinFlingVelocityDp;
  var properties_initialized_SnapFlingBehavior_kt_r96zw;
  function _init_properties_SnapFlingBehavior_kt__1y2evi() {
    if (!properties_initialized_SnapFlingBehavior_kt_r96zw) {
      properties_initialized_SnapFlingBehavior_kt_r96zw = true;
      // Inline function 'androidx.compose.ui.unit.dp' call
      MinFlingVelocityDp = _Dp___init__impl__ms3zkb(400);
    }
  }
  function sam$androidx_compose_foundation_gestures_snapping_SnapPositionInLayout$0(function_0) {
    this.function_1 = function_0;
  }
  protoOf(sam$androidx_compose_foundation_gestures_snapping_SnapPositionInLayout$0).position_im2k6q_k$ = function (_this__u8e3s4, layoutSize, itemSize, itemIndex) {
    return this.function_1(_this__u8e3s4, layoutSize, itemSize, itemIndex);
  };
  function SnapPositionInLayout$Companion$CenterToCenter$lambda($this$SnapPositionInLayout, layoutSize, itemSize, _anonymous_parameter_2__qggqfi) {
    return (layoutSize / 2 | 0) - (itemSize / 2 | 0) | 0;
  }
  function Companion_0() {
    Companion_instance_0 = this;
    var tmp = this;
    var tmp_0 = SnapPositionInLayout$Companion$CenterToCenter$lambda;
    tmp.CenterToCenter_1 = new sam$androidx_compose_foundation_gestures_snapping_SnapPositionInLayout$0(tmp_0);
  }
  protoOf(Companion_0).get_CenterToCenter_p0v1ou_k$ = function () {
    return this.CenterToCenter_1;
  };
  var Companion_instance_0;
  function Companion_getInstance_18() {
    if (Companion_instance_0 == null)
      new Companion_0();
    return Companion_instance_0;
  }
  function SnapPositionInLayout() {
  }
  function collectIsFocusedAsState$composable(_this__u8e3s4, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(-1452413326);
    sourceInformation($composer_0, 'C(collectIsFocusedAsState$composable)65@2219L34,66@2279L414,66@2258L435:FocusInteraction.kt#ywyzhk');
    if (isTraceInProgress()) {
      traceEventStart(-1452413326, $changed, -1, 'androidx.compose.foundation.interaction.collectIsFocusedAsState$composable (FocusInteraction.kt:64)');
    }
    // Inline function 'androidx.compose.runtime.remember$composable' call
    var $composer_1 = $composer_0;
    $composer_1.startReplaceableGroup_ip860b_k$(547886695);
    sourceInformation($composer_1, 'CC(remember$composable):Composables.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it = $composer_1.rememberedValue_4dg93v_k$();
    var tmp;
    if (false ? true : it === Companion_getInstance_9().get_Empty_i9b85g_k$()) {
      // Inline function 'androidx.compose.foundation.interaction.collectIsFocusedAsState$composable.<anonymous>' call
      var value = mutableStateOf(false);
      $composer_1.updateRememberedValue_l1wh71_k$(value);
      tmp = value;
    } else {
      tmp = it;
    }
    var tmp_0 = tmp;
    var tmp0 = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    $composer_1.endReplaceableGroup_ern0ak_k$();
    var isFocused = tmp0;
    // Inline function 'androidx.compose.runtime.remember$composable' call
    var $composer_2 = $composer_0;
    $composer_2.startReplaceableGroup_ip860b_k$(-1124426577);
    sourceInformation($composer_2, 'CC(remember$composable)P(1,2):Composables.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    var invalid = !!($composer_2.changed_ga7h3f_k$(_this__u8e3s4) | $composer_2.changed_ga7h3f_k$(isFocused));
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it_0 = $composer_2.rememberedValue_4dg93v_k$();
    var tmp_1;
    if (invalid ? true : it_0 === Companion_getInstance_9().get_Empty_i9b85g_k$()) {
      // Inline function 'androidx.compose.foundation.interaction.collectIsFocusedAsState$composable.<anonymous>' call
      var value_0 = collectIsFocusedAsState$composable$slambda_0(_this__u8e3s4, isFocused, null);
      $composer_2.updateRememberedValue_l1wh71_k$(value_0);
      tmp_1 = value_0;
    } else {
      tmp_1 = it_0;
    }
    var tmp_2 = tmp_1;
    var tmp0_0 = (tmp_2 == null ? true : !(tmp_2 == null)) ? tmp_2 : THROW_CCE();
    $composer_2.endReplaceableGroup_ern0ak_k$();
    LaunchedEffect$composable(_this__u8e3s4, tmp0_0, $composer_0, 14 & $changed);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return isFocused;
  }
  function get_$stableprop_0() {
    return 0;
  }
  function get_$stableprop_1() {
    return 0;
  }
  function Focus() {
    this.$stable_1 = 0;
  }
  function Unfocus(focus) {
    this.focus_1 = focus;
    this.$stable_1 = 0;
  }
  protoOf(Unfocus).get_focus_irhg33_k$ = function () {
    return this.focus_1;
  };
  function FocusInteraction() {
  }
  function sam$kotlinx_coroutines_flow_FlowCollector$0(function_0) {
    this.function_1 = function_0;
  }
  protoOf(sam$kotlinx_coroutines_flow_FlowCollector$0).emit_t92u1f_k$ = function (value, $completion) {
    return this.function_1(value, $completion);
  };
  function collectIsFocusedAsState$composable$slambda$slambda($focusInteractions, $isFocused, resultContinuation) {
    this.$focusInteractions_1 = $focusInteractions;
    this.$isFocused_1 = $isFocused;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(collectIsFocusedAsState$composable$slambda$slambda).invoke_hcr54n_k$ = function (interaction, $completion) {
    var tmp = this.create_c56zqz_k$(interaction, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(collectIsFocusedAsState$composable$slambda$slambda).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_hcr54n_k$((!(p1 == null) ? isInterface(p1, Interaction) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(collectIsFocusedAsState$composable$slambda$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        if (tmp === 0) {
          this.set_exceptionState_fex74n_k$(1);
          var tmp0_subject = this.interaction_1;
          if (tmp0_subject instanceof Focus) {
            this.$focusInteractions_1.add_utx5q5_k$(this.interaction_1);
          } else {
            if (tmp0_subject instanceof Unfocus) {
              this.$focusInteractions_1.remove_cedx0m_k$(this.interaction_1.focus_1);
            }
          }
          var this_0 = this.$focusInteractions_1;
          this.$isFocused_1.set_value_v1vabv_k$(!this_0.isEmpty_y1axqb_k$());
          return Unit_getInstance();
        } else if (tmp === 1) {
          throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        throw e;
      }
     while (true);
  };
  protoOf(collectIsFocusedAsState$composable$slambda$slambda).create_c56zqz_k$ = function (interaction, completion) {
    var i = new collectIsFocusedAsState$composable$slambda$slambda(this.$focusInteractions_1, this.$isFocused_1, completion);
    i.interaction_1 = interaction;
    return i;
  };
  protoOf(collectIsFocusedAsState$composable$slambda$slambda).create_wyq9v6_k$ = function (value, completion) {
    return this.create_c56zqz_k$((!(value == null) ? isInterface(value, Interaction) : false) ? value : THROW_CCE(), completion);
  };
  function collectIsFocusedAsState$composable$slambda$slambda_0($focusInteractions, $isFocused, resultContinuation) {
    var i = new collectIsFocusedAsState$composable$slambda$slambda($focusInteractions, $isFocused, resultContinuation);
    var l = function (interaction, $completion) {
      return i.invoke_hcr54n_k$(interaction, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function collectIsFocusedAsState$composable$slambda($this_collectIsFocusedAsState$composable, $isFocused, resultContinuation) {
    this.$this_collectIsFocusedAsState$composable_1 = $this_collectIsFocusedAsState$composable;
    this.$isFocused_1 = $isFocused;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(collectIsFocusedAsState$composable$slambda).invoke_d9fzmj_k$ = function ($this$LaunchedEffect, $completion) {
    var tmp = this.create_rcuf4x_k$($this$LaunchedEffect, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(collectIsFocusedAsState$composable$slambda).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_d9fzmj_k$((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(collectIsFocusedAsState$composable$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            var tmp_0 = this;
            tmp_0.focusInteractions0__1 = ArrayList_init_$Create$();
            this.set_state_rjd8d0_k$(1);
            var tmp_1 = this.$this_collectIsFocusedAsState$composable_1.get_interactions_ql02qy_k$();
            var tmp_2 = collectIsFocusedAsState$composable$slambda$slambda_0(this.focusInteractions0__1, this.$isFocused_1, null);
            suspendResult = tmp_1.collect_aksokr_k$(new sam$kotlinx_coroutines_flow_FlowCollector$0(tmp_2), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            return Unit_getInstance();
          case 2:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 2) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  protoOf(collectIsFocusedAsState$composable$slambda).create_rcuf4x_k$ = function ($this$LaunchedEffect, completion) {
    var i = new collectIsFocusedAsState$composable$slambda(this.$this_collectIsFocusedAsState$composable_1, this.$isFocused_1, completion);
    i.$this$LaunchedEffect_1 = $this$LaunchedEffect;
    return i;
  };
  protoOf(collectIsFocusedAsState$composable$slambda).create_wyq9v6_k$ = function (value, completion) {
    return this.create_rcuf4x_k$((!(value == null) ? isInterface(value, CoroutineScope) : false) ? value : THROW_CCE(), completion);
  };
  function collectIsFocusedAsState$composable$slambda_0($this_collectIsFocusedAsState$composable, $isFocused, resultContinuation) {
    var i = new collectIsFocusedAsState$composable$slambda($this_collectIsFocusedAsState$composable, $isFocused, resultContinuation);
    var l = function ($this$LaunchedEffect, $completion) {
      return i.invoke_d9fzmj_k$($this$LaunchedEffect, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function collectIsHoveredAsState$composable(_this__u8e3s4, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(-1621024626);
    sourceInformation($composer_0, 'C(collectIsHoveredAsState$composable)65@2151L34,66@2211L411,66@2190L432:HoverInteraction.kt#ywyzhk');
    if (isTraceInProgress()) {
      traceEventStart(-1621024626, $changed, -1, 'androidx.compose.foundation.interaction.collectIsHoveredAsState$composable (HoverInteraction.kt:64)');
    }
    // Inline function 'androidx.compose.runtime.remember$composable' call
    var $composer_1 = $composer_0;
    $composer_1.startReplaceableGroup_ip860b_k$(547886695);
    sourceInformation($composer_1, 'CC(remember$composable):Composables.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it = $composer_1.rememberedValue_4dg93v_k$();
    var tmp;
    if (false ? true : it === Companion_getInstance_9().get_Empty_i9b85g_k$()) {
      // Inline function 'androidx.compose.foundation.interaction.collectIsHoveredAsState$composable.<anonymous>' call
      var value = mutableStateOf(false);
      $composer_1.updateRememberedValue_l1wh71_k$(value);
      tmp = value;
    } else {
      tmp = it;
    }
    var tmp_0 = tmp;
    var tmp0 = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    $composer_1.endReplaceableGroup_ern0ak_k$();
    var isHovered = tmp0;
    // Inline function 'androidx.compose.runtime.remember$composable' call
    var $composer_2 = $composer_0;
    $composer_2.startReplaceableGroup_ip860b_k$(-1124426577);
    sourceInformation($composer_2, 'CC(remember$composable)P(1,2):Composables.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    var invalid = !!($composer_2.changed_ga7h3f_k$(_this__u8e3s4) | $composer_2.changed_ga7h3f_k$(isHovered));
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it_0 = $composer_2.rememberedValue_4dg93v_k$();
    var tmp_1;
    if (invalid ? true : it_0 === Companion_getInstance_9().get_Empty_i9b85g_k$()) {
      // Inline function 'androidx.compose.foundation.interaction.collectIsHoveredAsState$composable.<anonymous>' call
      var value_0 = collectIsHoveredAsState$composable$slambda_0(_this__u8e3s4, isHovered, null);
      $composer_2.updateRememberedValue_l1wh71_k$(value_0);
      tmp_1 = value_0;
    } else {
      tmp_1 = it_0;
    }
    var tmp_2 = tmp_1;
    var tmp0_0 = (tmp_2 == null ? true : !(tmp_2 == null)) ? tmp_2 : THROW_CCE();
    $composer_2.endReplaceableGroup_ern0ak_k$();
    LaunchedEffect$composable(_this__u8e3s4, tmp0_0, $composer_0, 14 & $changed);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return isHovered;
  }
  function get_$stableprop_2() {
    return 0;
  }
  function get_$stableprop_3() {
    return 0;
  }
  function Enter() {
    this.$stable_1 = 0;
  }
  function Exit(enter) {
    this.enter_1 = enter;
    this.$stable_1 = 0;
  }
  protoOf(Exit).get_enter_iqxcq7_k$ = function () {
    return this.enter_1;
  };
  function HoverInteraction() {
  }
  function sam$kotlinx_coroutines_flow_FlowCollector$0_0(function_0) {
    this.function_1 = function_0;
  }
  protoOf(sam$kotlinx_coroutines_flow_FlowCollector$0_0).emit_t92u1f_k$ = function (value, $completion) {
    return this.function_1(value, $completion);
  };
  function collectIsHoveredAsState$composable$slambda$slambda($hoverInteractions, $isHovered, resultContinuation) {
    this.$hoverInteractions_1 = $hoverInteractions;
    this.$isHovered_1 = $isHovered;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(collectIsHoveredAsState$composable$slambda$slambda).invoke_hcr54n_k$ = function (interaction, $completion) {
    var tmp = this.create_c56zqz_k$(interaction, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(collectIsHoveredAsState$composable$slambda$slambda).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_hcr54n_k$((!(p1 == null) ? isInterface(p1, Interaction) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(collectIsHoveredAsState$composable$slambda$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        if (tmp === 0) {
          this.set_exceptionState_fex74n_k$(1);
          var tmp0_subject = this.interaction_1;
          if (tmp0_subject instanceof Enter) {
            this.$hoverInteractions_1.add_utx5q5_k$(this.interaction_1);
          } else {
            if (tmp0_subject instanceof Exit) {
              this.$hoverInteractions_1.remove_cedx0m_k$(this.interaction_1.enter_1);
            }
          }
          var this_0 = this.$hoverInteractions_1;
          this.$isHovered_1.set_value_v1vabv_k$(!this_0.isEmpty_y1axqb_k$());
          return Unit_getInstance();
        } else if (tmp === 1) {
          throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        throw e;
      }
     while (true);
  };
  protoOf(collectIsHoveredAsState$composable$slambda$slambda).create_c56zqz_k$ = function (interaction, completion) {
    var i = new collectIsHoveredAsState$composable$slambda$slambda(this.$hoverInteractions_1, this.$isHovered_1, completion);
    i.interaction_1 = interaction;
    return i;
  };
  protoOf(collectIsHoveredAsState$composable$slambda$slambda).create_wyq9v6_k$ = function (value, completion) {
    return this.create_c56zqz_k$((!(value == null) ? isInterface(value, Interaction) : false) ? value : THROW_CCE(), completion);
  };
  function collectIsHoveredAsState$composable$slambda$slambda_0($hoverInteractions, $isHovered, resultContinuation) {
    var i = new collectIsHoveredAsState$composable$slambda$slambda($hoverInteractions, $isHovered, resultContinuation);
    var l = function (interaction, $completion) {
      return i.invoke_hcr54n_k$(interaction, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function collectIsHoveredAsState$composable$slambda($this_collectIsHoveredAsState$composable, $isHovered, resultContinuation) {
    this.$this_collectIsHoveredAsState$composable_1 = $this_collectIsHoveredAsState$composable;
    this.$isHovered_1 = $isHovered;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(collectIsHoveredAsState$composable$slambda).invoke_d9fzmj_k$ = function ($this$LaunchedEffect, $completion) {
    var tmp = this.create_rcuf4x_k$($this$LaunchedEffect, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(collectIsHoveredAsState$composable$slambda).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_d9fzmj_k$((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(collectIsHoveredAsState$composable$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            var tmp_0 = this;
            tmp_0.hoverInteractions0__1 = ArrayList_init_$Create$();
            this.set_state_rjd8d0_k$(1);
            var tmp_1 = this.$this_collectIsHoveredAsState$composable_1.get_interactions_ql02qy_k$();
            var tmp_2 = collectIsHoveredAsState$composable$slambda$slambda_0(this.hoverInteractions0__1, this.$isHovered_1, null);
            suspendResult = tmp_1.collect_aksokr_k$(new sam$kotlinx_coroutines_flow_FlowCollector$0_0(tmp_2), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            return Unit_getInstance();
          case 2:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 2) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  protoOf(collectIsHoveredAsState$composable$slambda).create_rcuf4x_k$ = function ($this$LaunchedEffect, completion) {
    var i = new collectIsHoveredAsState$composable$slambda(this.$this_collectIsHoveredAsState$composable_1, this.$isHovered_1, completion);
    i.$this$LaunchedEffect_1 = $this$LaunchedEffect;
    return i;
  };
  protoOf(collectIsHoveredAsState$composable$slambda).create_wyq9v6_k$ = function (value, completion) {
    return this.create_rcuf4x_k$((!(value == null) ? isInterface(value, CoroutineScope) : false) ? value : THROW_CCE(), completion);
  };
  function collectIsHoveredAsState$composable$slambda_0($this_collectIsHoveredAsState$composable, $isHovered, resultContinuation) {
    var i = new collectIsHoveredAsState$composable$slambda($this_collectIsHoveredAsState$composable, $isHovered, resultContinuation);
    var l = function ($this$LaunchedEffect, $completion) {
      return i.invoke_d9fzmj_k$($this$LaunchedEffect, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function Interaction() {
  }
  function InteractionSource() {
  }
  function collectIsPressedAsState$composable(_this__u8e3s4, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.startReplaceableGroup_ip860b_k$(-1873825817);
    sourceInformation($composer_0, 'C(collectIsPressedAsState$composable)84@3016L34,85@3076L504,85@3055L525:PressInteraction.kt#ywyzhk');
    if (isTraceInProgress()) {
      traceEventStart(-1873825817, $changed, -1, 'androidx.compose.foundation.interaction.collectIsPressedAsState$composable (PressInteraction.kt:83)');
    }
    // Inline function 'androidx.compose.runtime.remember$composable' call
    var $composer_1 = $composer_0;
    $composer_1.startReplaceableGroup_ip860b_k$(547886695);
    sourceInformation($composer_1, 'CC(remember$composable):Composables.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it = $composer_1.rememberedValue_4dg93v_k$();
    var tmp;
    if (false ? true : it === Companion_getInstance_9().get_Empty_i9b85g_k$()) {
      // Inline function 'androidx.compose.foundation.interaction.collectIsPressedAsState$composable.<anonymous>' call
      var value = mutableStateOf(false);
      $composer_1.updateRememberedValue_l1wh71_k$(value);
      tmp = value;
    } else {
      tmp = it;
    }
    var tmp_0 = tmp;
    var tmp0 = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    $composer_1.endReplaceableGroup_ern0ak_k$();
    var isPressed = tmp0;
    // Inline function 'androidx.compose.runtime.remember$composable' call
    var $composer_2 = $composer_0;
    $composer_2.startReplaceableGroup_ip860b_k$(-1124426577);
    sourceInformation($composer_2, 'CC(remember$composable)P(1,2):Composables.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    var invalid = !!($composer_2.changed_ga7h3f_k$(_this__u8e3s4) | $composer_2.changed_ga7h3f_k$(isPressed));
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it_0 = $composer_2.rememberedValue_4dg93v_k$();
    var tmp_1;
    if (invalid ? true : it_0 === Companion_getInstance_9().get_Empty_i9b85g_k$()) {
      // Inline function 'androidx.compose.foundation.interaction.collectIsPressedAsState$composable.<anonymous>' call
      var value_0 = collectIsPressedAsState$composable$slambda_0(_this__u8e3s4, isPressed, null);
      $composer_2.updateRememberedValue_l1wh71_k$(value_0);
      tmp_1 = value_0;
    } else {
      tmp_1 = it_0;
    }
    var tmp_2 = tmp_1;
    var tmp0_0 = (tmp_2 == null ? true : !(tmp_2 == null)) ? tmp_2 : THROW_CCE();
    $composer_2.endReplaceableGroup_ern0ak_k$();
    LaunchedEffect$composable(_this__u8e3s4, tmp0_0, $composer_0, 14 & $changed);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.endReplaceableGroup_ern0ak_k$();
    return isPressed;
  }
  function get_$stableprop_4() {
    return 0;
  }
  function get_$stableprop_5() {
    return 0;
  }
  function get_$stableprop_6() {
    return 0;
  }
  function Press(pressPosition) {
    this.pressPosition_1 = pressPosition;
    this.$stable_1 = 0;
  }
  protoOf(Press).get_pressPosition_rjxyft_k$ = function () {
    return this.pressPosition_1;
  };
  function Release(press) {
    this.press_1 = press;
    this.$stable_1 = 0;
  }
  protoOf(Release).get_press_ix1cey_k$ = function () {
    return this.press_1;
  };
  function Cancel(press) {
    this.press_1 = press;
    this.$stable_1 = 0;
  }
  protoOf(Cancel).get_press_ix1cey_k$ = function () {
    return this.press_1;
  };
  function PressInteraction() {
  }
  function sam$kotlinx_coroutines_flow_FlowCollector$0_1(function_0) {
    this.function_1 = function_0;
  }
  protoOf(sam$kotlinx_coroutines_flow_FlowCollector$0_1).emit_t92u1f_k$ = function (value, $completion) {
    return this.function_1(value, $completion);
  };
  function collectIsPressedAsState$composable$slambda$slambda($pressInteractions, $isPressed, resultContinuation) {
    this.$pressInteractions_1 = $pressInteractions;
    this.$isPressed_1 = $isPressed;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(collectIsPressedAsState$composable$slambda$slambda).invoke_hcr54n_k$ = function (interaction, $completion) {
    var tmp = this.create_c56zqz_k$(interaction, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(collectIsPressedAsState$composable$slambda$slambda).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_hcr54n_k$((!(p1 == null) ? isInterface(p1, Interaction) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(collectIsPressedAsState$composable$slambda$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        if (tmp === 0) {
          this.set_exceptionState_fex74n_k$(1);
          var tmp0_subject = this.interaction_1;
          if (tmp0_subject instanceof Press) {
            this.$pressInteractions_1.add_utx5q5_k$(this.interaction_1);
          } else {
            if (tmp0_subject instanceof Release) {
              this.$pressInteractions_1.remove_cedx0m_k$(this.interaction_1.press_1);
            } else {
              if (tmp0_subject instanceof Cancel) {
                this.$pressInteractions_1.remove_cedx0m_k$(this.interaction_1.press_1);
              }
            }
          }
          var this_0 = this.$pressInteractions_1;
          this.$isPressed_1.set_value_v1vabv_k$(!this_0.isEmpty_y1axqb_k$());
          return Unit_getInstance();
        } else if (tmp === 1) {
          throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        throw e;
      }
     while (true);
  };
  protoOf(collectIsPressedAsState$composable$slambda$slambda).create_c56zqz_k$ = function (interaction, completion) {
    var i = new collectIsPressedAsState$composable$slambda$slambda(this.$pressInteractions_1, this.$isPressed_1, completion);
    i.interaction_1 = interaction;
    return i;
  };
  protoOf(collectIsPressedAsState$composable$slambda$slambda).create_wyq9v6_k$ = function (value, completion) {
    return this.create_c56zqz_k$((!(value == null) ? isInterface(value, Interaction) : false) ? value : THROW_CCE(), completion);
  };
  function collectIsPressedAsState$composable$slambda$slambda_0($pressInteractions, $isPressed, resultContinuation) {
    var i = new collectIsPressedAsState$composable$slambda$slambda($pressInteractions, $isPressed, resultContinuation);
    var l = function (interaction, $completion) {
      return i.invoke_hcr54n_k$(interaction, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function collectIsPressedAsState$composable$slambda($this_collectIsPressedAsState$composable, $isPressed, resultContinuation) {
    this.$this_collectIsPressedAsState$composable_1 = $this_collectIsPressedAsState$composable;
    this.$isPressed_1 = $isPressed;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(collectIsPressedAsState$composable$slambda).invoke_d9fzmj_k$ = function ($this$LaunchedEffect, $completion) {
    var tmp = this.create_rcuf4x_k$($this$LaunchedEffect, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(collectIsPressedAsState$composable$slambda).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_d9fzmj_k$((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(collectIsPressedAsState$composable$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            var tmp_0 = this;
            tmp_0.pressInteractions0__1 = ArrayList_init_$Create$();
            this.set_state_rjd8d0_k$(1);
            var tmp_1 = this.$this_collectIsPressedAsState$composable_1.get_interactions_ql02qy_k$();
            var tmp_2 = collectIsPressedAsState$composable$slambda$slambda_0(this.pressInteractions0__1, this.$isPressed_1, null);
            suspendResult = tmp_1.collect_aksokr_k$(new sam$kotlinx_coroutines_flow_FlowCollector$0_1(tmp_2), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            return Unit_getInstance();
          case 2:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 2) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  protoOf(collectIsPressedAsState$composable$slambda).create_rcuf4x_k$ = function ($this$LaunchedEffect, completion) {
    var i = new collectIsPressedAsState$composable$slambda(this.$this_collectIsPressedAsState$composable_1, this.$isPressed_1, completion);
    i.$this$LaunchedEffect_1 = $this$LaunchedEffect;
    return i;
  };
  protoOf(collectIsPressedAsState$composable$slambda).create_wyq9v6_k$ = function (value, completion) {
    return this.create_rcuf4x_k$((!(value == null) ? isInterface(value, CoroutineScope) : false) ? value : THROW_CCE(), completion);
  };
  function collectIsPressedAsState$composable$slambda_0($this_collectIsPressedAsState$composable, $isPressed, resultContinuation) {
    var i = new collectIsPressedAsState$composable$slambda($this_collectIsPressedAsState$composable, $isPressed, resultContinuation);
    var l = function ($this$LaunchedEffect, $completion) {
      return i.invoke_d9fzmj_k$($this$LaunchedEffect, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function get_TargetDistance() {
    _init_properties_LazyAnimateScroll_kt__eqop2w();
    return TargetDistance;
  }
  var TargetDistance;
  function get_BoundDistance() {
    _init_properties_LazyAnimateScroll_kt__eqop2w();
    return BoundDistance;
  }
  var BoundDistance;
  function get_MinimumDistance() {
    _init_properties_LazyAnimateScroll_kt__eqop2w();
    return MinimumDistance;
  }
  var MinimumDistance;
  var properties_initialized_LazyAnimateScroll_kt_ru8vti;
  function _init_properties_LazyAnimateScroll_kt__eqop2w() {
    if (!properties_initialized_LazyAnimateScroll_kt_ru8vti) {
      properties_initialized_LazyAnimateScroll_kt_ru8vti = true;
      // Inline function 'androidx.compose.ui.unit.dp' call
      TargetDistance = _Dp___init__impl__ms3zkb(2500);
      // Inline function 'androidx.compose.ui.unit.dp' call
      BoundDistance = _Dp___init__impl__ms3zkb(1500);
      // Inline function 'androidx.compose.ui.unit.dp' call
      MinimumDistance = _Dp___init__impl__ms3zkb(50);
    }
  }
  function get_InterruptionSpec() {
    _init_properties_LazyLayoutAnimateItemModifierNode_kt__4bieql();
    return InterruptionSpec;
  }
  var InterruptionSpec;
  var properties_initialized_LazyLayoutAnimateItemModifierNode_kt_15yezl;
  function _init_properties_LazyLayoutAnimateItemModifierNode_kt__4bieql() {
    if (!properties_initialized_LazyLayoutAnimateItemModifierNode_kt_15yezl) {
      properties_initialized_LazyLayoutAnimateItemModifierNode_kt_15yezl = true;
      InterruptionSpec = spring(VOID, Spring_getInstance().get_StiffnessMediumLow_62ltjd_k$(), new IntOffset(get_VisibilityThreshold(Companion_getInstance_10())));
    }
  }
  function PageInfo() {
  }
  function get_ConsumeHorizontalFlingNestedScrollConnection() {
    _init_properties_Pager_kt__ocahin();
    return ConsumeHorizontalFlingNestedScrollConnection;
  }
  var ConsumeHorizontalFlingNestedScrollConnection;
  function get_ConsumeVerticalFlingNestedScrollConnection() {
    _init_properties_Pager_kt__ocahin();
    return ConsumeVerticalFlingNestedScrollConnection;
  }
  var ConsumeVerticalFlingNestedScrollConnection;
  function ConsumeAllFlingOnDirection(orientation) {
    this.orientation_1 = orientation;
  }
  protoOf(ConsumeAllFlingOnDirection).get_orientation_9wu93t_k$ = function () {
    return this.orientation_1;
  };
  protoOf(ConsumeAllFlingOnDirection).consumeOnOrientation_nhr62z_k$ = function (_this__u8e3s4, orientation) {
    var tmp;
    if (orientation.equals(Orientation_Vertical_getInstance())) {
      tmp = Velocity__copy$default_impl_eql69u(_this__u8e3s4, 0.0);
    } else {
      tmp = Velocity__copy$default_impl_eql69u(_this__u8e3s4, VOID, 0.0);
    }
    return tmp;
  };
  protoOf(ConsumeAllFlingOnDirection).consumeOnOrientation_r4p93v_k$ = function (_this__u8e3s4, orientation) {
    var tmp;
    if (orientation.equals(Orientation_Vertical_getInstance())) {
      tmp = Offset__copy$default_impl_bmwjg8(_this__u8e3s4, 0.0);
    } else {
      tmp = Offset__copy$default_impl_bmwjg8(_this__u8e3s4, VOID, 0.0);
    }
    return tmp;
  };
  protoOf(ConsumeAllFlingOnDirection).onPostScroll_hno7jz_k$ = function (consumed, available, source) {
    return source === Companion_getInstance_11().get_Fling_my7682_k$() ? this.consumeOnOrientation_r4p93v_k$(available, this.orientation_1) : Companion_getInstance_6().get_Zero_k6n73t_k$();
  };
  protoOf(ConsumeAllFlingOnDirection).onPostFling_ja8c94_k$ = function (consumed, available, $completion) {
    return new Velocity(this.consumeOnOrientation_nhr62z_k$(available, this.orientation_1));
  };
  var properties_initialized_Pager_kt_z0jphv;
  function _init_properties_Pager_kt__ocahin() {
    if (!properties_initialized_Pager_kt_z0jphv) {
      properties_initialized_Pager_kt_z0jphv = true;
      ConsumeHorizontalFlingNestedScrollConnection = new ConsumeAllFlingOnDirection(Orientation_Horizontal_getInstance());
      ConsumeVerticalFlingNestedScrollConnection = new ConsumeAllFlingOnDirection(Orientation_Vertical_getInstance());
    }
  }
  function PagerLayoutInfo() {
  }
  function get_DefaultPositionThreshold() {
    _init_properties_PagerState_kt__9pfij6();
    return DefaultPositionThreshold;
  }
  var DefaultPositionThreshold;
  function get_EmptyLayoutInfo() {
    _init_properties_PagerState_kt__9pfij6();
    return EmptyLayoutInfo;
  }
  var EmptyLayoutInfo;
  function get_UnitDensity() {
    _init_properties_PagerState_kt__9pfij6();
    return UnitDensity;
  }
  var UnitDensity;
  function get_SnapAlignmentStartToStart() {
    _init_properties_PagerState_kt__9pfij6();
    return SnapAlignmentStartToStart;
  }
  var SnapAlignmentStartToStart;
  function sam$androidx_compose_foundation_gestures_snapping_SnapPositionInLayout$0_0(function_0) {
    this.function_1 = function_0;
  }
  protoOf(sam$androidx_compose_foundation_gestures_snapping_SnapPositionInLayout$0_0).position_im2k6q_k$ = function (_this__u8e3s4, layoutSize, itemSize, itemIndex) {
    return this.function_1(_this__u8e3s4, layoutSize, itemSize, itemIndex);
  };
  function EmptyLayoutInfo$1() {
    this.visiblePagesInfo_1 = emptyList();
    this.closestPageToSnapPosition_1 = null;
    this.pagesCount_1 = 0;
    this.pageSize_1 = 0;
    this.pageSpacing_1 = 0;
    this.beforeContentPadding_1 = 0;
    this.afterContentPadding_1 = 0;
    this.viewportSize_1 = Companion_getInstance_12().get_Zero_9we0a6_k$();
    this.orientation_1 = Orientation_Horizontal_getInstance();
    this.viewportStartOffset_1 = 0;
    this.viewportEndOffset_1 = 0;
    this.reverseLayout_1 = false;
  }
  protoOf(EmptyLayoutInfo$1).get_visiblePagesInfo_jm4wll_k$ = function () {
    return this.visiblePagesInfo_1;
  };
  protoOf(EmptyLayoutInfo$1).get_closestPageToSnapPosition_pj2nu5_k$ = function () {
    return this.closestPageToSnapPosition_1;
  };
  protoOf(EmptyLayoutInfo$1).get_pagesCount_fij8l0_k$ = function () {
    return this.pagesCount_1;
  };
  protoOf(EmptyLayoutInfo$1).get_pageSize_hl979j_k$ = function () {
    return this.pageSize_1;
  };
  protoOf(EmptyLayoutInfo$1).get_pageSpacing_wcvkuj_k$ = function () {
    return this.pageSpacing_1;
  };
  protoOf(EmptyLayoutInfo$1).get_beforeContentPadding_2dperk_k$ = function () {
    return this.beforeContentPadding_1;
  };
  protoOf(EmptyLayoutInfo$1).get_afterContentPadding_49ooob_k$ = function () {
    return this.afterContentPadding_1;
  };
  protoOf(EmptyLayoutInfo$1).get_viewportSize_hnfbdb_k$ = function () {
    return this.viewportSize_1;
  };
  protoOf(EmptyLayoutInfo$1).get_orientation_9wu93t_k$ = function () {
    return this.orientation_1;
  };
  protoOf(EmptyLayoutInfo$1).get_viewportStartOffset_v4b1ay_k$ = function () {
    return this.viewportStartOffset_1;
  };
  protoOf(EmptyLayoutInfo$1).get_viewportEndOffset_gapdi7_k$ = function () {
    return this.viewportEndOffset_1;
  };
  protoOf(EmptyLayoutInfo$1).get_reverseLayout_nclvnn_k$ = function () {
    return this.reverseLayout_1;
  };
  function UnitDensity$1() {
    this.density_1 = 1.0;
    this.fontScale_1 = 1.0;
  }
  protoOf(UnitDensity$1).get_density_qy0267_k$ = function () {
    return this.density_1;
  };
  protoOf(UnitDensity$1).get_fontScale_h56n3i_k$ = function () {
    return this.fontScale_1;
  };
  function SnapAlignmentStartToStart$lambda($this$SnapPositionInLayout, _anonymous_parameter_0__qggqh8, _anonymous_parameter_1__qggqgd, _anonymous_parameter_2__qggqfi) {
    _init_properties_PagerState_kt__9pfij6();
    return 0;
  }
  var properties_initialized_PagerState_kt_v93qz4;
  function _init_properties_PagerState_kt__9pfij6() {
    if (!properties_initialized_PagerState_kt_v93qz4) {
      properties_initialized_PagerState_kt_v93qz4 = true;
      // Inline function 'androidx.compose.ui.unit.dp' call
      DefaultPositionThreshold = _Dp___init__impl__ms3zkb(56);
      EmptyLayoutInfo = new EmptyLayoutInfo$1();
      UnitDensity = new UnitDensity$1();
      var tmp = SnapAlignmentStartToStart$lambda;
      SnapAlignmentStartToStart = new sam$androidx_compose_foundation_gestures_snapping_SnapPositionInLayout$0_0(tmp);
    }
  }
  function get_ModifierLocalBringIntoViewParent() {
    _init_properties_BringIntoView_kt__yi7ifv();
    return ModifierLocalBringIntoViewParent;
  }
  var ModifierLocalBringIntoViewParent;
  function BringIntoViewParent() {
  }
  function ModifierLocalBringIntoViewParent$lambda() {
    _init_properties_BringIntoView_kt__yi7ifv();
    return null;
  }
  var properties_initialized_BringIntoView_kt_uq6g7t;
  function _init_properties_BringIntoView_kt__yi7ifv() {
    if (!properties_initialized_BringIntoView_kt_uq6g7t) {
      properties_initialized_BringIntoView_kt_uq6g7t = true;
      ModifierLocalBringIntoViewParent = modifierLocalOf(ModifierLocalBringIntoViewParent$lambda);
    }
  }
  function get_$stableprop_7() {
    return 0;
  }
  function CornerBasedShape(topStart, topEnd, bottomEnd, bottomStart) {
    this.topStart_1 = topStart;
    this.topEnd_1 = topEnd;
    this.bottomEnd_1 = bottomEnd;
    this.bottomStart_1 = bottomStart;
    this.$stable_1 = 0;
  }
  protoOf(CornerBasedShape).get_topStart_n2fniu_k$ = function () {
    return this.topStart_1;
  };
  protoOf(CornerBasedShape).get_topEnd_k1yfkf_k$ = function () {
    return this.topEnd_1;
  };
  protoOf(CornerBasedShape).get_bottomEnd_m64yrd_k$ = function () {
    return this.bottomEnd_1;
  };
  protoOf(CornerBasedShape).get_bottomStart_3n1j0u_k$ = function () {
    return this.bottomStart_1;
  };
  protoOf(CornerBasedShape).createOutline_jco4cb_k$ = function (size, layoutDirection, density) {
    var topStart = this.topStart_1.toPx_qm43qg_k$(size, density);
    var topEnd = this.topEnd_1.toPx_qm43qg_k$(size, density);
    var bottomEnd = this.bottomEnd_1.toPx_qm43qg_k$(size, density);
    var bottomStart = this.bottomStart_1.toPx_qm43qg_k$(size, density);
    var minDimension = _Size___get_minDimension__impl__4iso0r(size);
    if (topStart + bottomStart > minDimension) {
      var scale = minDimension / (topStart + bottomStart);
      topStart = topStart * scale;
      bottomStart = bottomStart * scale;
    }
    if (topEnd + bottomEnd > minDimension) {
      var scale_0 = minDimension / (topEnd + bottomEnd);
      topEnd = topEnd * scale_0;
      bottomEnd = bottomEnd * scale_0;
    }
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(((topStart >= 0.0 ? topEnd >= 0.0 : false) ? bottomEnd >= 0.0 : false) ? bottomStart >= 0.0 : false)) {
      // Inline function 'androidx.compose.foundation.shape.CornerBasedShape.createOutline.<anonymous>' call
      var message = "Corner size in Px can't be negative(topStart = " + topStart + ', topEnd = ' + topEnd + ', ' + ('bottomEnd = ' + bottomEnd + ', bottomStart = ' + bottomStart + ')!');
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return this.createOutline_xvx6l2_k$(size, topStart, topEnd, bottomEnd, bottomStart, layoutDirection);
  };
  protoOf(CornerBasedShape).copy$default_s4pzap_k$ = function (topStart, topEnd, bottomEnd, bottomStart, $super) {
    topStart = topStart === VOID ? this.topStart_1 : topStart;
    topEnd = topEnd === VOID ? this.topEnd_1 : topEnd;
    bottomEnd = bottomEnd === VOID ? this.bottomEnd_1 : bottomEnd;
    bottomStart = bottomStart === VOID ? this.bottomStart_1 : bottomStart;
    return $super === VOID ? this.copy_amg9gv_k$(topStart, topEnd, bottomEnd, bottomStart) : $super.copy_amg9gv_k$.call(this, topStart, topEnd, bottomEnd, bottomStart);
  };
  protoOf(CornerBasedShape).copy_68qqs_k$ = function (all) {
    return this.copy_amg9gv_k$(all, all, all, all);
  };
  function get_ZeroCornerSize() {
    _init_properties_CornerSize_kt__adzyne();
    return ZeroCornerSize;
  }
  var ZeroCornerSize;
  function CornerSize() {
  }
  function CornerSize_0(percent) {
    _init_properties_CornerSize_kt__adzyne();
    return new PercentCornerSize(percent);
  }
  function _get_percent__ssgsk4($this) {
    return $this.percent_1;
  }
  function component1_0($this) {
    return $this.percent_1;
  }
  function PercentCornerSize(percent) {
    this.percent_1 = percent;
    if (this.percent_1 < 0.0 ? true : this.percent_1 > 100.0) {
      throw IllegalArgumentException_init_$Create$('The percent should be in the range of [0, 100]');
    }
  }
  protoOf(PercentCornerSize).toPx_qm43qg_k$ = function (shapeSize, density) {
    return _Size___get_minDimension__impl__4iso0r(shapeSize) * (this.percent_1 / 100.0);
  };
  protoOf(PercentCornerSize).toString = function () {
    return 'CornerSize(size = ' + this.percent_1 + '%)';
  };
  protoOf(PercentCornerSize).get_valueOverride_4rn9vw_k$ = function () {
    return '' + this.percent_1 + '%';
  };
  protoOf(PercentCornerSize).copy_s06gv7_k$ = function (percent) {
    return new PercentCornerSize(percent);
  };
  protoOf(PercentCornerSize).copy$default_vtf5jn_k$ = function (percent, $super) {
    percent = percent === VOID ? this.percent_1 : percent;
    return $super === VOID ? this.copy_s06gv7_k$(percent) : $super.copy_s06gv7_k$.call(this, percent);
  };
  protoOf(PercentCornerSize).hashCode = function () {
    return getNumberHashCode(this.percent_1);
  };
  protoOf(PercentCornerSize).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof PercentCornerSize))
      return false;
    var tmp0_other_with_cast = other instanceof PercentCornerSize ? other : THROW_CCE();
    if (!equals(this.percent_1, tmp0_other_with_cast.percent_1))
      return false;
    return true;
  };
  function CornerSize_1(size) {
    _init_properties_CornerSize_kt__adzyne();
    return new DpCornerSize(size);
  }
  function _get_size__ddoh9m($this) {
    return $this.size_1;
  }
  function component1_1($this) {
    return $this.size_1;
  }
  function DpCornerSize(size) {
    this.size_1 = size;
  }
  protoOf(DpCornerSize).toPx_qm43qg_k$ = function (shapeSize, density) {
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.foundation.shape.DpCornerSize.toPx.<anonymous>' call
    return density.toPx_mycba2_k$(this.size_1);
  };
  protoOf(DpCornerSize).toString = function () {
    return 'CornerSize(size = ' + _Dp___get_value__impl__geb1vb(this.size_1) + '.dp)';
  };
  protoOf(DpCornerSize).get_valueOverride_xrl2fl_k$ = function () {
    return this.size_1;
  };
  protoOf(DpCornerSize).get_valueOverride_4rn9vw_k$ = function () {
    return new Dp(this.get_valueOverride_xrl2fl_k$());
  };
  protoOf(DpCornerSize).copy_alvhr6_k$ = function (size) {
    return new DpCornerSize(size);
  };
  protoOf(DpCornerSize).copy$default_sdf1lf_k$ = function (size, $super) {
    size = size === VOID ? this.size_1 : size;
    return $super === VOID ? this.copy_alvhr6_k$(size) : $super.copy_alvhr6_k$.call(this, new Dp(size));
  };
  protoOf(DpCornerSize).hashCode = function () {
    return Dp__hashCode_impl_sxkrra(this.size_1);
  };
  protoOf(DpCornerSize).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof DpCornerSize))
      return false;
    var tmp0_other_with_cast = other instanceof DpCornerSize ? other : THROW_CCE();
    if (!equals(this.size_1, tmp0_other_with_cast.size_1))
      return false;
    return true;
  };
  function ZeroCornerSize$1() {
  }
  protoOf(ZeroCornerSize$1).toPx_qm43qg_k$ = function (shapeSize, density) {
    return 0.0;
  };
  protoOf(ZeroCornerSize$1).toString = function () {
    return 'ZeroCornerSize';
  };
  protoOf(ZeroCornerSize$1).get_valueOverride_4rn9vw_k$ = function () {
    return 'ZeroCornerSize';
  };
  var properties_initialized_CornerSize_kt_9yvmfc;
  function _init_properties_CornerSize_kt__adzyne() {
    if (!properties_initialized_CornerSize_kt_9yvmfc) {
      properties_initialized_CornerSize_kt_9yvmfc = true;
      ZeroCornerSize = new ZeroCornerSize$1();
    }
  }
  function get_CircleShape() {
    _init_properties_RoundedCornerShape_kt__vzposf();
    return CircleShape;
  }
  var CircleShape;
  function get_$stableprop_8() {
    return 0;
  }
  function RoundedCornerShape(topStart, topEnd, bottomEnd, bottomStart) {
    CornerBasedShape.call(this, topStart, topEnd, bottomEnd, bottomStart);
    this.$stable_2 = 0;
  }
  protoOf(RoundedCornerShape).createOutline_xvx6l2_k$ = function (size, topStart, topEnd, bottomEnd, bottomStart, layoutDirection) {
    var tmp;
    if (topStart + topEnd + bottomEnd + bottomStart === 0.0) {
      tmp = new Rectangle(toRect_0(size));
    } else {
      tmp = new Rounded(RoundRect_0(toRect_0(size), CornerRadius(layoutDirection.equals(LayoutDirection_Ltr_getInstance()) ? topStart : topEnd), CornerRadius(layoutDirection.equals(LayoutDirection_Ltr_getInstance()) ? topEnd : topStart), CornerRadius(layoutDirection.equals(LayoutDirection_Ltr_getInstance()) ? bottomEnd : bottomStart), CornerRadius(layoutDirection.equals(LayoutDirection_Ltr_getInstance()) ? bottomStart : bottomEnd)));
    }
    return tmp;
  };
  protoOf(RoundedCornerShape).copy_amg9gv_k$ = function (topStart, topEnd, bottomEnd, bottomStart) {
    return new RoundedCornerShape(topStart, topEnd, bottomEnd, bottomStart);
  };
  protoOf(RoundedCornerShape).toString = function () {
    return 'RoundedCornerShape(topStart = ' + this.get_topStart_n2fniu_k$() + ', topEnd = ' + this.get_topEnd_k1yfkf_k$() + ', bottomEnd = ' + ('' + this.get_bottomEnd_m64yrd_k$() + ', bottomStart = ' + this.get_bottomStart_3n1j0u_k$() + ')');
  };
  protoOf(RoundedCornerShape).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof RoundedCornerShape))
      return false;
    if (!equals(this.get_topStart_n2fniu_k$(), other.get_topStart_n2fniu_k$()))
      return false;
    if (!equals(this.get_topEnd_k1yfkf_k$(), other.get_topEnd_k1yfkf_k$()))
      return false;
    if (!equals(this.get_bottomEnd_m64yrd_k$(), other.get_bottomEnd_m64yrd_k$()))
      return false;
    if (!equals(this.get_bottomStart_3n1j0u_k$(), other.get_bottomStart_3n1j0u_k$()))
      return false;
    return true;
  };
  protoOf(RoundedCornerShape).hashCode = function () {
    var result = hashCode(this.get_topStart_n2fniu_k$());
    result = imul(31, result) + hashCode(this.get_topEnd_k1yfkf_k$()) | 0;
    result = imul(31, result) + hashCode(this.get_bottomEnd_m64yrd_k$()) | 0;
    result = imul(31, result) + hashCode(this.get_bottomStart_3n1j0u_k$()) | 0;
    return result;
  };
  function RoundedCornerShape_0(percent) {
    _init_properties_RoundedCornerShape_kt__vzposf();
    return RoundedCornerShape_1(CornerSize_0(percent));
  }
  function RoundedCornerShape_1(corner) {
    _init_properties_RoundedCornerShape_kt__vzposf();
    return new RoundedCornerShape(corner, corner, corner, corner);
  }
  function RoundedCornerShape_2(size) {
    _init_properties_RoundedCornerShape_kt__vzposf();
    return RoundedCornerShape_1(CornerSize_1(size));
  }
  function RoundedCornerShape_3(topStart, topEnd, bottomEnd, bottomStart) {
    var tmp;
    if (topStart === VOID) {
      // Inline function 'androidx.compose.ui.unit.dp' call
      tmp = _Dp___init__impl__ms3zkb(0);
    } else {
      tmp = topStart;
    }
    topStart = tmp;
    var tmp_0;
    if (topEnd === VOID) {
      // Inline function 'androidx.compose.ui.unit.dp' call
      tmp_0 = _Dp___init__impl__ms3zkb(0);
    } else {
      tmp_0 = topEnd;
    }
    topEnd = tmp_0;
    var tmp_1;
    if (bottomEnd === VOID) {
      // Inline function 'androidx.compose.ui.unit.dp' call
      tmp_1 = _Dp___init__impl__ms3zkb(0);
    } else {
      tmp_1 = bottomEnd;
    }
    bottomEnd = tmp_1;
    var tmp_2;
    if (bottomStart === VOID) {
      // Inline function 'androidx.compose.ui.unit.dp' call
      tmp_2 = _Dp___init__impl__ms3zkb(0);
    } else {
      tmp_2 = bottomStart;
    }
    bottomStart = tmp_2;
    _init_properties_RoundedCornerShape_kt__vzposf();
    return new RoundedCornerShape(CornerSize_1(topStart), CornerSize_1(topEnd), CornerSize_1(bottomEnd), CornerSize_1(bottomStart));
  }
  var properties_initialized_RoundedCornerShape_kt_5mose9;
  function _init_properties_RoundedCornerShape_kt__vzposf() {
    if (!properties_initialized_RoundedCornerShape_kt_5mose9) {
      properties_initialized_RoundedCornerShape_kt_5mose9 = true;
      CircleShape = RoundedCornerShape_0(50);
    }
  }
  function get_EmptyInlineContent() {
    _init_properties_AnnotatedStringResolveInlineContent_kt__h20qbv();
    return EmptyInlineContent;
  }
  var EmptyInlineContent;
  var properties_initialized_AnnotatedStringResolveInlineContent_kt_ljtk0d;
  function _init_properties_AnnotatedStringResolveInlineContent_kt__h20qbv() {
    if (!properties_initialized_AnnotatedStringResolveInlineContent_kt_ljtk0d) {
      properties_initialized_AnnotatedStringResolveInlineContent_kt_ljtk0d = true;
      EmptyInlineContent = new Pair(emptyList(), emptyList());
    }
  }
  var Handle_Cursor_instance;
  var Handle_SelectionStart_instance;
  var Handle_SelectionEnd_instance;
  function values_0() {
    return [Handle_Cursor_getInstance(), Handle_SelectionStart_getInstance(), Handle_SelectionEnd_getInstance()];
  }
  function valueOf_0(value) {
    switch (value) {
      case 'Cursor':
        return Handle_Cursor_getInstance();
      case 'SelectionStart':
        return Handle_SelectionStart_getInstance();
      case 'SelectionEnd':
        return Handle_SelectionEnd_getInstance();
      default:
        Handle_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  var Handle_entriesInitialized;
  function Handle_initEntries() {
    if (Handle_entriesInitialized)
      return Unit_getInstance();
    Handle_entriesInitialized = true;
    Handle_Cursor_instance = new Handle('Cursor', 0);
    Handle_SelectionStart_instance = new Handle('SelectionStart', 1);
    Handle_SelectionEnd_instance = new Handle('SelectionEnd', 2);
  }
  function Handle(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function Handle_Cursor_getInstance() {
    Handle_initEntries();
    return Handle_Cursor_instance;
  }
  function Handle_SelectionStart_getInstance() {
    Handle_initEntries();
    return Handle_SelectionStart_instance;
  }
  function Handle_SelectionEnd_getInstance() {
    Handle_initEntries();
    return Handle_SelectionEnd_instance;
  }
  var KeyCommand_LEFT_CHAR_instance;
  var KeyCommand_RIGHT_CHAR_instance;
  var KeyCommand_RIGHT_WORD_instance;
  var KeyCommand_LEFT_WORD_instance;
  var KeyCommand_NEXT_PARAGRAPH_instance;
  var KeyCommand_PREV_PARAGRAPH_instance;
  var KeyCommand_LINE_START_instance;
  var KeyCommand_LINE_END_instance;
  var KeyCommand_LINE_LEFT_instance;
  var KeyCommand_LINE_RIGHT_instance;
  var KeyCommand_UP_instance;
  var KeyCommand_DOWN_instance;
  var KeyCommand_PAGE_UP_instance;
  var KeyCommand_PAGE_DOWN_instance;
  var KeyCommand_HOME_instance;
  var KeyCommand_END_instance;
  var KeyCommand_COPY_instance;
  var KeyCommand_PASTE_instance;
  var KeyCommand_CUT_instance;
  var KeyCommand_DELETE_PREV_CHAR_instance;
  var KeyCommand_DELETE_NEXT_CHAR_instance;
  var KeyCommand_DELETE_PREV_WORD_instance;
  var KeyCommand_DELETE_NEXT_WORD_instance;
  var KeyCommand_DELETE_FROM_LINE_START_instance;
  var KeyCommand_DELETE_TO_LINE_END_instance;
  var KeyCommand_SELECT_ALL_instance;
  var KeyCommand_SELECT_LEFT_CHAR_instance;
  var KeyCommand_SELECT_RIGHT_CHAR_instance;
  var KeyCommand_SELECT_UP_instance;
  var KeyCommand_SELECT_DOWN_instance;
  var KeyCommand_SELECT_PAGE_UP_instance;
  var KeyCommand_SELECT_PAGE_DOWN_instance;
  var KeyCommand_SELECT_HOME_instance;
  var KeyCommand_SELECT_END_instance;
  var KeyCommand_SELECT_LEFT_WORD_instance;
  var KeyCommand_SELECT_RIGHT_WORD_instance;
  var KeyCommand_SELECT_NEXT_PARAGRAPH_instance;
  var KeyCommand_SELECT_PREV_PARAGRAPH_instance;
  var KeyCommand_SELECT_LINE_START_instance;
  var KeyCommand_SELECT_LINE_END_instance;
  var KeyCommand_SELECT_LINE_LEFT_instance;
  var KeyCommand_SELECT_LINE_RIGHT_instance;
  var KeyCommand_DESELECT_instance;
  var KeyCommand_NEW_LINE_instance;
  var KeyCommand_TAB_instance;
  var KeyCommand_UNDO_instance;
  var KeyCommand_REDO_instance;
  var KeyCommand_CHARACTER_PALETTE_instance;
  function values_1() {
    return [KeyCommand_LEFT_CHAR_getInstance(), KeyCommand_RIGHT_CHAR_getInstance(), KeyCommand_RIGHT_WORD_getInstance(), KeyCommand_LEFT_WORD_getInstance(), KeyCommand_NEXT_PARAGRAPH_getInstance(), KeyCommand_PREV_PARAGRAPH_getInstance(), KeyCommand_LINE_START_getInstance(), KeyCommand_LINE_END_getInstance(), KeyCommand_LINE_LEFT_getInstance(), KeyCommand_LINE_RIGHT_getInstance(), KeyCommand_UP_getInstance(), KeyCommand_DOWN_getInstance(), KeyCommand_PAGE_UP_getInstance(), KeyCommand_PAGE_DOWN_getInstance(), KeyCommand_HOME_getInstance(), KeyCommand_END_getInstance(), KeyCommand_COPY_getInstance(), KeyCommand_PASTE_getInstance(), KeyCommand_CUT_getInstance(), KeyCommand_DELETE_PREV_CHAR_getInstance(), KeyCommand_DELETE_NEXT_CHAR_getInstance(), KeyCommand_DELETE_PREV_WORD_getInstance(), KeyCommand_DELETE_NEXT_WORD_getInstance(), KeyCommand_DELETE_FROM_LINE_START_getInstance(), KeyCommand_DELETE_TO_LINE_END_getInstance(), KeyCommand_SELECT_ALL_getInstance(), KeyCommand_SELECT_LEFT_CHAR_getInstance(), KeyCommand_SELECT_RIGHT_CHAR_getInstance(), KeyCommand_SELECT_UP_getInstance(), KeyCommand_SELECT_DOWN_getInstance(), KeyCommand_SELECT_PAGE_UP_getInstance(), KeyCommand_SELECT_PAGE_DOWN_getInstance(), KeyCommand_SELECT_HOME_getInstance(), KeyCommand_SELECT_END_getInstance(), KeyCommand_SELECT_LEFT_WORD_getInstance(), KeyCommand_SELECT_RIGHT_WORD_getInstance(), KeyCommand_SELECT_NEXT_PARAGRAPH_getInstance(), KeyCommand_SELECT_PREV_PARAGRAPH_getInstance(), KeyCommand_SELECT_LINE_START_getInstance(), KeyCommand_SELECT_LINE_END_getInstance(), KeyCommand_SELECT_LINE_LEFT_getInstance(), KeyCommand_SELECT_LINE_RIGHT_getInstance(), KeyCommand_DESELECT_getInstance(), KeyCommand_NEW_LINE_getInstance(), KeyCommand_TAB_getInstance(), KeyCommand_UNDO_getInstance(), KeyCommand_REDO_getInstance(), KeyCommand_CHARACTER_PALETTE_getInstance()];
  }
  function valueOf_1(value) {
    switch (value) {
      case 'LEFT_CHAR':
        return KeyCommand_LEFT_CHAR_getInstance();
      case 'RIGHT_CHAR':
        return KeyCommand_RIGHT_CHAR_getInstance();
      case 'RIGHT_WORD':
        return KeyCommand_RIGHT_WORD_getInstance();
      case 'LEFT_WORD':
        return KeyCommand_LEFT_WORD_getInstance();
      case 'NEXT_PARAGRAPH':
        return KeyCommand_NEXT_PARAGRAPH_getInstance();
      case 'PREV_PARAGRAPH':
        return KeyCommand_PREV_PARAGRAPH_getInstance();
      case 'LINE_START':
        return KeyCommand_LINE_START_getInstance();
      case 'LINE_END':
        return KeyCommand_LINE_END_getInstance();
      case 'LINE_LEFT':
        return KeyCommand_LINE_LEFT_getInstance();
      case 'LINE_RIGHT':
        return KeyCommand_LINE_RIGHT_getInstance();
      case 'UP':
        return KeyCommand_UP_getInstance();
      case 'DOWN':
        return KeyCommand_DOWN_getInstance();
      case 'PAGE_UP':
        return KeyCommand_PAGE_UP_getInstance();
      case 'PAGE_DOWN':
        return KeyCommand_PAGE_DOWN_getInstance();
      case 'HOME':
        return KeyCommand_HOME_getInstance();
      case 'END':
        return KeyCommand_END_getInstance();
      case 'COPY':
        return KeyCommand_COPY_getInstance();
      case 'PASTE':
        return KeyCommand_PASTE_getInstance();
      case 'CUT':
        return KeyCommand_CUT_getInstance();
      case 'DELETE_PREV_CHAR':
        return KeyCommand_DELETE_PREV_CHAR_getInstance();
      case 'DELETE_NEXT_CHAR':
        return KeyCommand_DELETE_NEXT_CHAR_getInstance();
      case 'DELETE_PREV_WORD':
        return KeyCommand_DELETE_PREV_WORD_getInstance();
      case 'DELETE_NEXT_WORD':
        return KeyCommand_DELETE_NEXT_WORD_getInstance();
      case 'DELETE_FROM_LINE_START':
        return KeyCommand_DELETE_FROM_LINE_START_getInstance();
      case 'DELETE_TO_LINE_END':
        return KeyCommand_DELETE_TO_LINE_END_getInstance();
      case 'SELECT_ALL':
        return KeyCommand_SELECT_ALL_getInstance();
      case 'SELECT_LEFT_CHAR':
        return KeyCommand_SELECT_LEFT_CHAR_getInstance();
      case 'SELECT_RIGHT_CHAR':
        return KeyCommand_SELECT_RIGHT_CHAR_getInstance();
      case 'SELECT_UP':
        return KeyCommand_SELECT_UP_getInstance();
      case 'SELECT_DOWN':
        return KeyCommand_SELECT_DOWN_getInstance();
      case 'SELECT_PAGE_UP':
        return KeyCommand_SELECT_PAGE_UP_getInstance();
      case 'SELECT_PAGE_DOWN':
        return KeyCommand_SELECT_PAGE_DOWN_getInstance();
      case 'SELECT_HOME':
        return KeyCommand_SELECT_HOME_getInstance();
      case 'SELECT_END':
        return KeyCommand_SELECT_END_getInstance();
      case 'SELECT_LEFT_WORD':
        return KeyCommand_SELECT_LEFT_WORD_getInstance();
      case 'SELECT_RIGHT_WORD':
        return KeyCommand_SELECT_RIGHT_WORD_getInstance();
      case 'SELECT_NEXT_PARAGRAPH':
        return KeyCommand_SELECT_NEXT_PARAGRAPH_getInstance();
      case 'SELECT_PREV_PARAGRAPH':
        return KeyCommand_SELECT_PREV_PARAGRAPH_getInstance();
      case 'SELECT_LINE_START':
        return KeyCommand_SELECT_LINE_START_getInstance();
      case 'SELECT_LINE_END':
        return KeyCommand_SELECT_LINE_END_getInstance();
      case 'SELECT_LINE_LEFT':
        return KeyCommand_SELECT_LINE_LEFT_getInstance();
      case 'SELECT_LINE_RIGHT':
        return KeyCommand_SELECT_LINE_RIGHT_getInstance();
      case 'DESELECT':
        return KeyCommand_DESELECT_getInstance();
      case 'NEW_LINE':
        return KeyCommand_NEW_LINE_getInstance();
      case 'TAB':
        return KeyCommand_TAB_getInstance();
      case 'UNDO':
        return KeyCommand_UNDO_getInstance();
      case 'REDO':
        return KeyCommand_REDO_getInstance();
      case 'CHARACTER_PALETTE':
        return KeyCommand_CHARACTER_PALETTE_getInstance();
      default:
        KeyCommand_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  var KeyCommand_entriesInitialized;
  function KeyCommand_initEntries() {
    if (KeyCommand_entriesInitialized)
      return Unit_getInstance();
    KeyCommand_entriesInitialized = true;
    KeyCommand_LEFT_CHAR_instance = new KeyCommand('LEFT_CHAR', 0, false);
    KeyCommand_RIGHT_CHAR_instance = new KeyCommand('RIGHT_CHAR', 1, false);
    KeyCommand_RIGHT_WORD_instance = new KeyCommand('RIGHT_WORD', 2, false);
    KeyCommand_LEFT_WORD_instance = new KeyCommand('LEFT_WORD', 3, false);
    KeyCommand_NEXT_PARAGRAPH_instance = new KeyCommand('NEXT_PARAGRAPH', 4, false);
    KeyCommand_PREV_PARAGRAPH_instance = new KeyCommand('PREV_PARAGRAPH', 5, false);
    KeyCommand_LINE_START_instance = new KeyCommand('LINE_START', 6, false);
    KeyCommand_LINE_END_instance = new KeyCommand('LINE_END', 7, false);
    KeyCommand_LINE_LEFT_instance = new KeyCommand('LINE_LEFT', 8, false);
    KeyCommand_LINE_RIGHT_instance = new KeyCommand('LINE_RIGHT', 9, false);
    KeyCommand_UP_instance = new KeyCommand('UP', 10, false);
    KeyCommand_DOWN_instance = new KeyCommand('DOWN', 11, false);
    KeyCommand_PAGE_UP_instance = new KeyCommand('PAGE_UP', 12, false);
    KeyCommand_PAGE_DOWN_instance = new KeyCommand('PAGE_DOWN', 13, false);
    KeyCommand_HOME_instance = new KeyCommand('HOME', 14, false);
    KeyCommand_END_instance = new KeyCommand('END', 15, false);
    KeyCommand_COPY_instance = new KeyCommand('COPY', 16, false);
    KeyCommand_PASTE_instance = new KeyCommand('PASTE', 17, true);
    KeyCommand_CUT_instance = new KeyCommand('CUT', 18, true);
    KeyCommand_DELETE_PREV_CHAR_instance = new KeyCommand('DELETE_PREV_CHAR', 19, true);
    KeyCommand_DELETE_NEXT_CHAR_instance = new KeyCommand('DELETE_NEXT_CHAR', 20, true);
    KeyCommand_DELETE_PREV_WORD_instance = new KeyCommand('DELETE_PREV_WORD', 21, true);
    KeyCommand_DELETE_NEXT_WORD_instance = new KeyCommand('DELETE_NEXT_WORD', 22, true);
    KeyCommand_DELETE_FROM_LINE_START_instance = new KeyCommand('DELETE_FROM_LINE_START', 23, true);
    KeyCommand_DELETE_TO_LINE_END_instance = new KeyCommand('DELETE_TO_LINE_END', 24, true);
    KeyCommand_SELECT_ALL_instance = new KeyCommand('SELECT_ALL', 25, false);
    KeyCommand_SELECT_LEFT_CHAR_instance = new KeyCommand('SELECT_LEFT_CHAR', 26, false);
    KeyCommand_SELECT_RIGHT_CHAR_instance = new KeyCommand('SELECT_RIGHT_CHAR', 27, false);
    KeyCommand_SELECT_UP_instance = new KeyCommand('SELECT_UP', 28, false);
    KeyCommand_SELECT_DOWN_instance = new KeyCommand('SELECT_DOWN', 29, false);
    KeyCommand_SELECT_PAGE_UP_instance = new KeyCommand('SELECT_PAGE_UP', 30, false);
    KeyCommand_SELECT_PAGE_DOWN_instance = new KeyCommand('SELECT_PAGE_DOWN', 31, false);
    KeyCommand_SELECT_HOME_instance = new KeyCommand('SELECT_HOME', 32, false);
    KeyCommand_SELECT_END_instance = new KeyCommand('SELECT_END', 33, false);
    KeyCommand_SELECT_LEFT_WORD_instance = new KeyCommand('SELECT_LEFT_WORD', 34, false);
    KeyCommand_SELECT_RIGHT_WORD_instance = new KeyCommand('SELECT_RIGHT_WORD', 35, false);
    KeyCommand_SELECT_NEXT_PARAGRAPH_instance = new KeyCommand('SELECT_NEXT_PARAGRAPH', 36, false);
    KeyCommand_SELECT_PREV_PARAGRAPH_instance = new KeyCommand('SELECT_PREV_PARAGRAPH', 37, false);
    KeyCommand_SELECT_LINE_START_instance = new KeyCommand('SELECT_LINE_START', 38, false);
    KeyCommand_SELECT_LINE_END_instance = new KeyCommand('SELECT_LINE_END', 39, false);
    KeyCommand_SELECT_LINE_LEFT_instance = new KeyCommand('SELECT_LINE_LEFT', 40, false);
    KeyCommand_SELECT_LINE_RIGHT_instance = new KeyCommand('SELECT_LINE_RIGHT', 41, false);
    KeyCommand_DESELECT_instance = new KeyCommand('DESELECT', 42, false);
    KeyCommand_NEW_LINE_instance = new KeyCommand('NEW_LINE', 43, true);
    KeyCommand_TAB_instance = new KeyCommand('TAB', 44, true);
    KeyCommand_UNDO_instance = new KeyCommand('UNDO', 45, true);
    KeyCommand_REDO_instance = new KeyCommand('REDO', 46, true);
    KeyCommand_CHARACTER_PALETTE_instance = new KeyCommand('CHARACTER_PALETTE', 47, true);
  }
  function KeyCommand(name, ordinal, editsText) {
    Enum.call(this, name, ordinal);
    this.editsText_1 = editsText;
  }
  protoOf(KeyCommand).get_editsText_m211rn_k$ = function () {
    return this.editsText_1;
  };
  function KeyCommand_LEFT_CHAR_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_LEFT_CHAR_instance;
  }
  function KeyCommand_RIGHT_CHAR_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_RIGHT_CHAR_instance;
  }
  function KeyCommand_RIGHT_WORD_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_RIGHT_WORD_instance;
  }
  function KeyCommand_LEFT_WORD_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_LEFT_WORD_instance;
  }
  function KeyCommand_NEXT_PARAGRAPH_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_NEXT_PARAGRAPH_instance;
  }
  function KeyCommand_PREV_PARAGRAPH_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_PREV_PARAGRAPH_instance;
  }
  function KeyCommand_LINE_START_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_LINE_START_instance;
  }
  function KeyCommand_LINE_END_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_LINE_END_instance;
  }
  function KeyCommand_LINE_LEFT_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_LINE_LEFT_instance;
  }
  function KeyCommand_LINE_RIGHT_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_LINE_RIGHT_instance;
  }
  function KeyCommand_UP_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_UP_instance;
  }
  function KeyCommand_DOWN_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_DOWN_instance;
  }
  function KeyCommand_PAGE_UP_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_PAGE_UP_instance;
  }
  function KeyCommand_PAGE_DOWN_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_PAGE_DOWN_instance;
  }
  function KeyCommand_HOME_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_HOME_instance;
  }
  function KeyCommand_END_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_END_instance;
  }
  function KeyCommand_COPY_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_COPY_instance;
  }
  function KeyCommand_PASTE_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_PASTE_instance;
  }
  function KeyCommand_CUT_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_CUT_instance;
  }
  function KeyCommand_DELETE_PREV_CHAR_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_DELETE_PREV_CHAR_instance;
  }
  function KeyCommand_DELETE_NEXT_CHAR_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_DELETE_NEXT_CHAR_instance;
  }
  function KeyCommand_DELETE_PREV_WORD_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_DELETE_PREV_WORD_instance;
  }
  function KeyCommand_DELETE_NEXT_WORD_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_DELETE_NEXT_WORD_instance;
  }
  function KeyCommand_DELETE_FROM_LINE_START_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_DELETE_FROM_LINE_START_instance;
  }
  function KeyCommand_DELETE_TO_LINE_END_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_DELETE_TO_LINE_END_instance;
  }
  function KeyCommand_SELECT_ALL_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_SELECT_ALL_instance;
  }
  function KeyCommand_SELECT_LEFT_CHAR_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_SELECT_LEFT_CHAR_instance;
  }
  function KeyCommand_SELECT_RIGHT_CHAR_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_SELECT_RIGHT_CHAR_instance;
  }
  function KeyCommand_SELECT_UP_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_SELECT_UP_instance;
  }
  function KeyCommand_SELECT_DOWN_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_SELECT_DOWN_instance;
  }
  function KeyCommand_SELECT_PAGE_UP_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_SELECT_PAGE_UP_instance;
  }
  function KeyCommand_SELECT_PAGE_DOWN_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_SELECT_PAGE_DOWN_instance;
  }
  function KeyCommand_SELECT_HOME_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_SELECT_HOME_instance;
  }
  function KeyCommand_SELECT_END_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_SELECT_END_instance;
  }
  function KeyCommand_SELECT_LEFT_WORD_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_SELECT_LEFT_WORD_instance;
  }
  function KeyCommand_SELECT_RIGHT_WORD_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_SELECT_RIGHT_WORD_instance;
  }
  function KeyCommand_SELECT_NEXT_PARAGRAPH_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_SELECT_NEXT_PARAGRAPH_instance;
  }
  function KeyCommand_SELECT_PREV_PARAGRAPH_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_SELECT_PREV_PARAGRAPH_instance;
  }
  function KeyCommand_SELECT_LINE_START_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_SELECT_LINE_START_instance;
  }
  function KeyCommand_SELECT_LINE_END_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_SELECT_LINE_END_instance;
  }
  function KeyCommand_SELECT_LINE_LEFT_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_SELECT_LINE_LEFT_instance;
  }
  function KeyCommand_SELECT_LINE_RIGHT_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_SELECT_LINE_RIGHT_instance;
  }
  function KeyCommand_DESELECT_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_DESELECT_instance;
  }
  function KeyCommand_NEW_LINE_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_NEW_LINE_instance;
  }
  function KeyCommand_TAB_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_TAB_instance;
  }
  function KeyCommand_UNDO_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_UNDO_instance;
  }
  function KeyCommand_REDO_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_REDO_instance;
  }
  function KeyCommand_CHARACTER_PALETTE_getInstance() {
    KeyCommand_initEntries();
    return KeyCommand_CHARACTER_PALETTE_instance;
  }
  function get_defaultKeyMapping() {
    _init_properties_KeyMapping_kt__n34hqn();
    return defaultKeyMapping;
  }
  var defaultKeyMapping;
  function KeyMapping() {
  }
  function commonKeyMapping(shortcutModifier) {
    _init_properties_KeyMapping_kt__n34hqn();
    return new commonKeyMapping$1(shortcutModifier);
  }
  function defaultKeyMapping$2$1($common) {
    this.$common_1 = $common;
  }
  protoOf(defaultKeyMapping$2$1).map_6s0yk8_k$ = function (event) {
    var tmp;
    if (get_isShiftPressed(event) ? get_isCtrlPressed(event) : false) {
      var tmp0_subject = get_key_0(event);
      tmp = equals(tmp0_subject, MappedKeys_getInstance().get_DirectionLeft_f5x0wj_k$()) ? KeyCommand_SELECT_LEFT_WORD_getInstance() : equals(tmp0_subject, MappedKeys_getInstance().get_DirectionRight_91pt3q_k$()) ? KeyCommand_SELECT_RIGHT_WORD_getInstance() : equals(tmp0_subject, MappedKeys_getInstance().get_DirectionUp_jror7j_k$()) ? KeyCommand_SELECT_PREV_PARAGRAPH_getInstance() : equals(tmp0_subject, MappedKeys_getInstance().get_DirectionDown_8ppfns_k$()) ? KeyCommand_SELECT_NEXT_PARAGRAPH_getInstance() : null;
    } else if (get_isCtrlPressed(event)) {
      var tmp1_subject = get_key_0(event);
      tmp = equals(tmp1_subject, MappedKeys_getInstance().get_DirectionLeft_f5x0wj_k$()) ? KeyCommand_LEFT_WORD_getInstance() : equals(tmp1_subject, MappedKeys_getInstance().get_DirectionRight_91pt3q_k$()) ? KeyCommand_RIGHT_WORD_getInstance() : equals(tmp1_subject, MappedKeys_getInstance().get_DirectionUp_jror7j_k$()) ? KeyCommand_PREV_PARAGRAPH_getInstance() : equals(tmp1_subject, MappedKeys_getInstance().get_DirectionDown_8ppfns_k$()) ? KeyCommand_NEXT_PARAGRAPH_getInstance() : equals(tmp1_subject, MappedKeys_getInstance().get_H_w1wwpd_k$()) ? KeyCommand_DELETE_PREV_CHAR_getInstance() : equals(tmp1_subject, MappedKeys_getInstance().get_Delete_uvctes_k$()) ? KeyCommand_DELETE_NEXT_WORD_getInstance() : equals(tmp1_subject, MappedKeys_getInstance().get_Backspace_7jmd2y_k$()) ? KeyCommand_DELETE_PREV_WORD_getInstance() : equals(tmp1_subject, MappedKeys_getInstance().get_Backslash_txp56r_k$()) ? KeyCommand_DESELECT_getInstance() : null;
    } else if (get_isShiftPressed(event)) {
      var tmp2_subject = get_key_0(event);
      tmp = equals(tmp2_subject, MappedKeys_getInstance().get_MoveHome_fdukcp_k$()) ? KeyCommand_SELECT_LINE_START_getInstance() : equals(tmp2_subject, MappedKeys_getInstance().get_MoveEnd_3fdenj_k$()) ? KeyCommand_SELECT_LINE_END_getInstance() : null;
    } else if (get_isAltPressed(event)) {
      var tmp3_subject = get_key_0(event);
      tmp = equals(tmp3_subject, MappedKeys_getInstance().get_Backspace_7jmd2y_k$()) ? KeyCommand_DELETE_FROM_LINE_START_getInstance() : equals(tmp3_subject, MappedKeys_getInstance().get_Delete_uvctes_k$()) ? KeyCommand_DELETE_TO_LINE_END_getInstance() : null;
    } else {
      tmp = null;
    }
    var tmp4_elvis_lhs = tmp;
    return tmp4_elvis_lhs == null ? this.$common_1.map_6s0yk8_k$(event) : tmp4_elvis_lhs;
  };
  function commonKeyMapping$1($shortcutModifier) {
    this.$shortcutModifier_1 = $shortcutModifier;
  }
  protoOf(commonKeyMapping$1).map_6s0yk8_k$ = function (event) {
    var tmp;
    if (this.$shortcutModifier_1(new KeyEvent(event)) ? get_isShiftPressed(event) : false) {
      var tmp0_subject = get_key_0(event);
      tmp = equals(tmp0_subject, MappedKeys_getInstance().get_Z_mlmakf_k$()) ? KeyCommand_REDO_getInstance() : null;
    } else if (this.$shortcutModifier_1(new KeyEvent(event))) {
      var tmp1_subject = get_key_0(event);
      tmp = (equals(tmp1_subject, MappedKeys_getInstance().get_C_qsbemu_k$()) ? true : equals(tmp1_subject, MappedKeys_getInstance().get_Insert_sd5o5q_k$())) ? KeyCommand_COPY_getInstance() : equals(tmp1_subject, MappedKeys_getInstance().get_V_wld3pf_k$()) ? KeyCommand_PASTE_getInstance() : equals(tmp1_subject, MappedKeys_getInstance().get_X_7x2bun_k$()) ? KeyCommand_CUT_getInstance() : equals(tmp1_subject, MappedKeys_getInstance().get_A_3qd7s8_k$()) ? KeyCommand_SELECT_ALL_getInstance() : equals(tmp1_subject, MappedKeys_getInstance().get_Y_7c9zcw_k$()) ? KeyCommand_REDO_getInstance() : equals(tmp1_subject, MappedKeys_getInstance().get_Z_mlmakf_k$()) ? KeyCommand_UNDO_getInstance() : null;
    } else if (get_isCtrlPressed(event)) {
      tmp = null;
    } else if (get_isShiftPressed(event)) {
      var tmp2_subject = get_key_0(event);
      tmp = equals(tmp2_subject, MappedKeys_getInstance().get_DirectionLeft_f5x0wj_k$()) ? KeyCommand_SELECT_LEFT_CHAR_getInstance() : equals(tmp2_subject, MappedKeys_getInstance().get_DirectionRight_91pt3q_k$()) ? KeyCommand_SELECT_RIGHT_CHAR_getInstance() : equals(tmp2_subject, MappedKeys_getInstance().get_DirectionUp_jror7j_k$()) ? KeyCommand_SELECT_UP_getInstance() : equals(tmp2_subject, MappedKeys_getInstance().get_DirectionDown_8ppfns_k$()) ? KeyCommand_SELECT_DOWN_getInstance() : equals(tmp2_subject, MappedKeys_getInstance().get_PageUp_4s7j3x_k$()) ? KeyCommand_SELECT_PAGE_UP_getInstance() : equals(tmp2_subject, MappedKeys_getInstance().get_PageDown_9hcgxi_k$()) ? KeyCommand_SELECT_PAGE_DOWN_getInstance() : equals(tmp2_subject, MappedKeys_getInstance().get_MoveHome_fdukcp_k$()) ? KeyCommand_SELECT_LINE_START_getInstance() : equals(tmp2_subject, MappedKeys_getInstance().get_MoveEnd_3fdenj_k$()) ? KeyCommand_SELECT_LINE_END_getInstance() : equals(tmp2_subject, MappedKeys_getInstance().get_Insert_sd5o5q_k$()) ? KeyCommand_PASTE_getInstance() : null;
    } else {
      var tmp3_subject = get_key_0(event);
      tmp = equals(tmp3_subject, MappedKeys_getInstance().get_DirectionLeft_f5x0wj_k$()) ? KeyCommand_LEFT_CHAR_getInstance() : equals(tmp3_subject, MappedKeys_getInstance().get_DirectionRight_91pt3q_k$()) ? KeyCommand_RIGHT_CHAR_getInstance() : equals(tmp3_subject, MappedKeys_getInstance().get_DirectionUp_jror7j_k$()) ? KeyCommand_UP_getInstance() : equals(tmp3_subject, MappedKeys_getInstance().get_DirectionDown_8ppfns_k$()) ? KeyCommand_DOWN_getInstance() : equals(tmp3_subject, MappedKeys_getInstance().get_PageUp_4s7j3x_k$()) ? KeyCommand_PAGE_UP_getInstance() : equals(tmp3_subject, MappedKeys_getInstance().get_PageDown_9hcgxi_k$()) ? KeyCommand_PAGE_DOWN_getInstance() : equals(tmp3_subject, MappedKeys_getInstance().get_MoveHome_fdukcp_k$()) ? KeyCommand_LINE_START_getInstance() : equals(tmp3_subject, MappedKeys_getInstance().get_MoveEnd_3fdenj_k$()) ? KeyCommand_LINE_END_getInstance() : equals(tmp3_subject, MappedKeys_getInstance().get_Enter_fkbexr_k$()) ? KeyCommand_NEW_LINE_getInstance() : equals(tmp3_subject, MappedKeys_getInstance().get_Backspace_7jmd2y_k$()) ? KeyCommand_DELETE_PREV_CHAR_getInstance() : equals(tmp3_subject, MappedKeys_getInstance().get_Delete_uvctes_k$()) ? KeyCommand_DELETE_NEXT_CHAR_getInstance() : equals(tmp3_subject, MappedKeys_getInstance().get_Paste_30cf6i_k$()) ? KeyCommand_PASTE_getInstance() : equals(tmp3_subject, MappedKeys_getInstance().get_Cut_hvwmq1_k$()) ? KeyCommand_CUT_getInstance() : equals(tmp3_subject, MappedKeys_getInstance().get_Copy_9iqqvm_k$()) ? KeyCommand_COPY_getInstance() : equals(tmp3_subject, MappedKeys_getInstance().get_Tab_os2g9w_k$()) ? KeyCommand_TAB_getInstance() : null;
    }
    return tmp;
  };
  function isCtrlPressed$factory() {
    return getPropertyCallableRef('isCtrlPressed', 1, KProperty1, function (receiver) {
      return get_isCtrlPressed(receiver.nativeKeyEvent_1);
    }, null);
  }
  var properties_initialized_KeyMapping_kt_iql13l;
  function _init_properties_KeyMapping_kt__n34hqn() {
    if (!properties_initialized_KeyMapping_kt_iql13l) {
      properties_initialized_KeyMapping_kt_iql13l = true;
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.foundation.text.defaultKeyMapping.<anonymous>' call
      var common = commonKeyMapping(isCtrlPressed$factory());
      defaultKeyMapping = new defaultKeyMapping$2$1(common);
    }
  }
  function getParagraphBoundary(_this__u8e3s4, index) {
    return TextRange(findParagraphStart(_this__u8e3s4, index), findParagraphEnd(_this__u8e3s4, index));
  }
  function findParagraphStart(_this__u8e3s4, startIndex) {
    var inductionVariable = startIndex - 1 | 0;
    if (1 <= inductionVariable)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + -1 | 0;
        if (charSequenceGet(_this__u8e3s4, index - 1 | 0) === _Char___init__impl__6a9atx(10)) {
          return index;
        }
      }
       while (1 <= inductionVariable);
    return 0;
  }
  function findParagraphEnd(_this__u8e3s4, startIndex) {
    var inductionVariable = startIndex + 1 | 0;
    var last = charSequenceLength(_this__u8e3s4);
    if (inductionVariable < last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (charSequenceGet(_this__u8e3s4, index) === _Char___init__impl__6a9atx(10)) {
          return index;
        }
      }
       while (inductionVariable < last);
    return charSequenceLength(_this__u8e3s4);
  }
  function get_cursorAnimationSpec() {
    _init_properties_TextFieldCursor_kt__1co4rz();
    return cursorAnimationSpec;
  }
  var cursorAnimationSpec;
  function cursorAnimationSpec$lambda($this$keyframes) {
    _init_properties_TextFieldCursor_kt__1co4rz();
    $this$keyframes.set_durationMillis_11l8vl_k$(1000);
    $this$keyframes.at_1dnb16_k$(1.0, 0);
    $this$keyframes.at_1dnb16_k$(1.0, 499);
    $this$keyframes.at_1dnb16_k$(0.0, 500);
    $this$keyframes.at_1dnb16_k$(0.0, 999);
    return Unit_getInstance();
  }
  var properties_initialized_TextFieldCursor_kt_tldnf7;
  function _init_properties_TextFieldCursor_kt__1co4rz() {
    if (!properties_initialized_TextFieldCursor_kt_tldnf7) {
      properties_initialized_TextFieldCursor_kt_tldnf7 = true;
      cursorAnimationSpec = infiniteRepeatable(keyframes(cursorAnimationSpec$lambda));
    }
  }
  function get_EmptyTextReplacement() {
    _init_properties_TextFieldDelegate_kt__lo6v7k();
    return EmptyTextReplacement;
  }
  var EmptyTextReplacement;
  function get_DefaultWidthCharCount() {
    return DefaultWidthCharCount;
  }
  var DefaultWidthCharCount;
  var properties_initialized_TextFieldDelegate_kt_1iol9a;
  function _init_properties_TextFieldDelegate_kt__lo6v7k() {
    if (!properties_initialized_TextFieldDelegate_kt_1iol9a) {
      properties_initialized_TextFieldDelegate_kt_1iol9a = true;
      EmptyTextReplacement = repeat('H', 10);
    }
  }
  function get_SNAPSHOTS_INTERVAL_MILLIS() {
    return SNAPSHOTS_INTERVAL_MILLIS;
  }
  var SNAPSHOTS_INTERVAL_MILLIS;
  function get_ValidatingEmptyOffsetMappingIdentity() {
    _init_properties_ValidatingOffsetMapping_kt__fcd8ty();
    return ValidatingEmptyOffsetMappingIdentity;
  }
  var ValidatingEmptyOffsetMappingIdentity;
  function _get_delegate__idh0py($this) {
    return $this.delegate_1;
  }
  function _get_originalLength__ld60x8($this) {
    return $this.originalLength_1;
  }
  function _get_transformedLength__kli3z4($this) {
    return $this.transformedLength_1;
  }
  function ValidatingOffsetMapping(delegate, originalLength, transformedLength) {
    this.delegate_1 = delegate;
    this.originalLength_1 = originalLength;
    this.transformedLength_1 = transformedLength;
  }
  protoOf(ValidatingOffsetMapping).originalToTransformed_qvujev_k$ = function (offset) {
    // Inline function 'kotlin.also' call
    var this_0 = this.delegate_1.originalToTransformed_qvujev_k$(offset);
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.foundation.text.ValidatingOffsetMapping.originalToTransformed.<anonymous>' call
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(0 <= this_0 ? this_0 <= this.transformedLength_1 : false)) {
      // Inline function 'androidx.compose.foundation.text.ValidatingOffsetMapping.originalToTransformed.<anonymous>.<anonymous>' call
      var message = 'OffsetMapping.originalToTransformed returned invalid mapping: ' + ('' + offset + ' -> ' + this_0 + ' is not in range of transformed text ') + ('[0, ' + this.transformedLength_1 + ']');
      throw IllegalStateException_init_$Create$(toString(message));
    }
    return this_0;
  };
  protoOf(ValidatingOffsetMapping).transformedToOriginal_hkmhr3_k$ = function (offset) {
    // Inline function 'kotlin.also' call
    var this_0 = this.delegate_1.transformedToOriginal_hkmhr3_k$(offset);
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.foundation.text.ValidatingOffsetMapping.transformedToOriginal.<anonymous>' call
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(0 <= this_0 ? this_0 <= this.originalLength_1 : false)) {
      // Inline function 'androidx.compose.foundation.text.ValidatingOffsetMapping.transformedToOriginal.<anonymous>.<anonymous>' call
      var message = 'OffsetMapping.transformedToOriginal returned invalid mapping: ' + ('' + offset + ' -> ' + this_0 + ' is not in range of original text ') + ('[0, ' + this.originalLength_1 + ']');
      throw IllegalStateException_init_$Create$(toString(message));
    }
    return this_0;
  };
  var properties_initialized_ValidatingOffsetMapping_kt_rllilk;
  function _init_properties_ValidatingOffsetMapping_kt__fcd8ty() {
    if (!properties_initialized_ValidatingOffsetMapping_kt_rllilk) {
      properties_initialized_ValidatingOffsetMapping_kt_rllilk = true;
      ValidatingEmptyOffsetMappingIdentity = new ValidatingOffsetMapping(Companion_getInstance_13().get_Identity_wza1cp_k$(), 0, 0);
    }
  }
  function get_EmptyTextReplacement_0() {
    _init_properties_MinLinesConstrainer_kt__odtdjv();
    return EmptyTextReplacement_0;
  }
  var EmptyTextReplacement_0;
  function get_TwoLineTextReplacement() {
    _init_properties_MinLinesConstrainer_kt__odtdjv();
    return TwoLineTextReplacement;
  }
  var TwoLineTextReplacement;
  function get_DefaultWidthCharCount_0() {
    return DefaultWidthCharCount_0;
  }
  var DefaultWidthCharCount_0;
  var properties_initialized_MinLinesConstrainer_kt_uvu6cn;
  function _init_properties_MinLinesConstrainer_kt__odtdjv() {
    if (!properties_initialized_MinLinesConstrainer_kt_uvu6cn) {
      properties_initialized_MinLinesConstrainer_kt_uvu6cn = true;
      EmptyTextReplacement_0 = repeat('H', 10);
      TwoLineTextReplacement = get_EmptyTextReplacement_0() + '\n' + get_EmptyTextReplacement_0();
    }
  }
  function Selectable() {
  }
  function AnchorInfo(direction, offset, selectableId) {
    this.direction_1 = direction;
    this.offset_1 = offset;
    this.selectableId_1 = selectableId;
  }
  protoOf(AnchorInfo).get_direction_7ekune_k$ = function () {
    return this.direction_1;
  };
  protoOf(AnchorInfo).get_offset_hjmqak_k$ = function () {
    return this.offset_1;
  };
  protoOf(AnchorInfo).get_selectableId_qduvty_k$ = function () {
    return this.selectableId_1;
  };
  protoOf(AnchorInfo).component1_7eebsc_k$ = function () {
    return this.direction_1;
  };
  protoOf(AnchorInfo).component2_7eebsb_k$ = function () {
    return this.offset_1;
  };
  protoOf(AnchorInfo).component3_7eebsa_k$ = function () {
    return this.selectableId_1;
  };
  protoOf(AnchorInfo).copy_73h0tp_k$ = function (direction, offset, selectableId) {
    return new AnchorInfo(direction, offset, selectableId);
  };
  protoOf(AnchorInfo).copy$default_ky6qb1_k$ = function (direction, offset, selectableId, $super) {
    direction = direction === VOID ? this.direction_1 : direction;
    offset = offset === VOID ? this.offset_1 : offset;
    selectableId = selectableId === VOID ? this.selectableId_1 : selectableId;
    return $super === VOID ? this.copy_73h0tp_k$(direction, offset, selectableId) : $super.copy_73h0tp_k$.call(this, direction, offset, selectableId);
  };
  protoOf(AnchorInfo).toString = function () {
    return 'AnchorInfo(direction=' + this.direction_1 + ', offset=' + this.offset_1 + ', selectableId=' + this.selectableId_1.toString() + ')';
  };
  protoOf(AnchorInfo).hashCode = function () {
    var result = this.direction_1.hashCode();
    result = imul(result, 31) + this.offset_1 | 0;
    result = imul(result, 31) + this.selectableId_1.hashCode() | 0;
    return result;
  };
  protoOf(AnchorInfo).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof AnchorInfo))
      return false;
    var tmp0_other_with_cast = other instanceof AnchorInfo ? other : THROW_CCE();
    if (!this.direction_1.equals(tmp0_other_with_cast.direction_1))
      return false;
    if (!(this.offset_1 === tmp0_other_with_cast.offset_1))
      return false;
    if (!this.selectableId_1.equals(tmp0_other_with_cast.selectableId_1))
      return false;
    return true;
  };
  function Selection(start, end, handlesCrossed) {
    handlesCrossed = handlesCrossed === VOID ? false : handlesCrossed;
    this.start_1 = start;
    this.end_1 = end;
    this.handlesCrossed_1 = handlesCrossed;
  }
  protoOf(Selection).get_start_iypx6h_k$ = function () {
    return this.start_1;
  };
  protoOf(Selection).get_end_18j6ha_k$ = function () {
    return this.end_1;
  };
  protoOf(Selection).get_handlesCrossed_5utwpv_k$ = function () {
    return this.handlesCrossed_1;
  };
  protoOf(Selection).merge_fmvm9h_k$ = function (other) {
    if (other == null)
      return this;
    if (!this.handlesCrossed_1 ? other.handlesCrossed_1 : false)
      return other.copy$default_4u4xaz_k$(VOID, this.start_1);
    var handlesCrossed = this.start_1.equals(this.end_1) ? other.handlesCrossed_1 : this.handlesCrossed_1;
    var selection = this;
    var tmp;
    if (handlesCrossed) {
      tmp = selection.copy$default_4u4xaz_k$(other.start_1);
    } else {
      tmp = selection.copy$default_4u4xaz_k$(VOID, other.end_1);
    }
    selection = tmp;
    return selection;
  };
  protoOf(Selection).toTextRange_cm2olv_k$ = function () {
    return TextRange(this.start_1.offset_1, this.end_1.offset_1);
  };
  protoOf(Selection).component1_7eebsc_k$ = function () {
    return this.start_1;
  };
  protoOf(Selection).component2_7eebsb_k$ = function () {
    return this.end_1;
  };
  protoOf(Selection).component3_7eebsa_k$ = function () {
    return this.handlesCrossed_1;
  };
  protoOf(Selection).copy_g9n1v4_k$ = function (start, end, handlesCrossed) {
    return new Selection(start, end, handlesCrossed);
  };
  protoOf(Selection).copy$default_4u4xaz_k$ = function (start, end, handlesCrossed, $super) {
    start = start === VOID ? this.start_1 : start;
    end = end === VOID ? this.end_1 : end;
    handlesCrossed = handlesCrossed === VOID ? this.handlesCrossed_1 : handlesCrossed;
    return $super === VOID ? this.copy_g9n1v4_k$(start, end, handlesCrossed) : $super.copy_g9n1v4_k$.call(this, start, end, handlesCrossed);
  };
  protoOf(Selection).toString = function () {
    return 'Selection(start=' + this.start_1 + ', end=' + this.end_1 + ', handlesCrossed=' + this.handlesCrossed_1 + ')';
  };
  protoOf(Selection).hashCode = function () {
    var result = this.start_1.hashCode();
    result = imul(result, 31) + this.end_1.hashCode() | 0;
    result = imul(result, 31) + getBooleanHashCode(this.handlesCrossed_1) | 0;
    return result;
  };
  protoOf(Selection).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Selection))
      return false;
    var tmp0_other_with_cast = other instanceof Selection ? other : THROW_CCE();
    if (!this.start_1.equals(tmp0_other_with_cast.start_1))
      return false;
    if (!this.end_1.equals(tmp0_other_with_cast.end_1))
      return false;
    if (!(this.handlesCrossed_1 === tmp0_other_with_cast.handlesCrossed_1))
      return false;
    return true;
  };
  function TextLayoutResult$getWordBoundary$ref($boundThis) {
    var l = function (p0) {
      return new TextRange_0($boundThis.getWordBoundary_s8pru_k$(p0));
    };
    l.callableName = 'getWordBoundary';
    return l;
  }
  function getParagraphBoundary$ref($boundThis) {
    var l = function (p0) {
      return new TextRange_0(getParagraphBoundary($boundThis, p0));
    };
    l.callableName = 'getParagraphBoundary';
    return l;
  }
  function updateSelectionBoundary($this, textLayoutResult, newRawOffset, previousRawOffset, previousAdjustedOffset, otherBoundaryOffset, isStart, isReversed) {
    if (newRawOffset === previousRawOffset) {
      return previousAdjustedOffset;
    }
    var currentLine = textLayoutResult.getLineForOffset_jakwx2_k$(newRawOffset);
    var previousLine = textLayoutResult.getLineForOffset_jakwx2_k$(previousAdjustedOffset);
    if (!(currentLine === previousLine)) {
      return snapToWordBoundary($this, textLayoutResult, newRawOffset, currentLine, otherBoundaryOffset, isStart, isReversed);
    }
    var isExpanding_0 = isExpanding($this, newRawOffset, previousRawOffset, isStart, isReversed);
    if (!isExpanding_0) {
      return newRawOffset;
    }
    if (!isAtWordBoundary(textLayoutResult, $this, previousAdjustedOffset)) {
      return newRawOffset;
    }
    return snapToWordBoundary($this, textLayoutResult, newRawOffset, currentLine, otherBoundaryOffset, isStart, isReversed);
  }
  function snapToWordBoundary($this, textLayoutResult, newRawOffset, currentLine, otherBoundaryOffset, isStart, isReversed) {
    var wordBoundary = textLayoutResult.getWordBoundary_s8pru_k$(newRawOffset);
    var wordStartLine = textLayoutResult.getLineForOffset_jakwx2_k$(_TextRange___get_start__impl__ww4t90(wordBoundary));
    var tmp;
    if (wordStartLine === currentLine) {
      tmp = _TextRange___get_start__impl__ww4t90(wordBoundary);
    } else {
      tmp = textLayoutResult.getLineStart_clke9s_k$(currentLine);
    }
    var start = tmp;
    var wordEndLine = textLayoutResult.getLineForOffset_jakwx2_k$(_TextRange___get_end__impl__gcdxpp(wordBoundary));
    var tmp_0;
    if (wordEndLine === currentLine) {
      tmp_0 = _TextRange___get_end__impl__gcdxpp(wordBoundary);
    } else {
      tmp_0 = textLayoutResult.getLineEnd$default_8vuhh5_k$(currentLine);
    }
    var end = tmp_0;
    if (start === otherBoundaryOffset) {
      return end;
    }
    if (end === otherBoundaryOffset) {
      return start;
    }
    var threshold = (start + end | 0) / 2 | 0;
    var tmp_1;
    if (!!(isStart ^ isReversed)) {
      var tmp_2;
      if (newRawOffset <= threshold) {
        tmp_2 = start;
      } else {
        tmp_2 = end;
      }
      tmp_1 = tmp_2;
    } else {
      var tmp_3;
      if (newRawOffset >= threshold) {
        tmp_3 = end;
      } else {
        tmp_3 = start;
      }
      tmp_1 = tmp_3;
    }
    return tmp_1;
  }
  function isAtWordBoundary(_this__u8e3s4, $this, offset) {
    var wordBoundary = _this__u8e3s4.getWordBoundary_s8pru_k$(offset);
    return offset === _TextRange___get_start__impl__ww4t90(wordBoundary) ? true : offset === _TextRange___get_end__impl__gcdxpp(wordBoundary);
  }
  function isExpanding($this, newRawOffset, previousRawOffset, isStart, previousReversed) {
    if (previousRawOffset === -1) {
      return true;
    }
    if (newRawOffset === previousRawOffset) {
      return false;
    }
    var tmp;
    if (!!(isStart ^ previousReversed)) {
      tmp = newRawOffset < previousRawOffset;
    } else {
      tmp = newRawOffset > previousRawOffset;
    }
    return tmp;
  }
  function adjustByBoundary($this, textLayoutResult, newRawSelection, boundaryFun) {
    // Inline function 'kotlin.text.isEmpty' call
    var this_0 = textLayoutResult.get_layoutInput_o7gjah_k$().get_text_wouvsm_k$();
    if (charSequenceLength(this_0) === 0) {
      return Companion_getInstance_14().get_Zero_8je9ih_k$();
    }
    var maxOffset = get_lastIndex(textLayoutResult.get_layoutInput_o7gjah_k$().get_text_wouvsm_k$());
    var startBoundary = boundaryFun(coerceIn(_TextRange___get_start__impl__ww4t90(newRawSelection), 0, maxOffset)).packedValue_1;
    var endBoundary = boundaryFun(coerceIn(_TextRange___get_end__impl__gcdxpp(newRawSelection), 0, maxOffset)).packedValue_1;
    var start = _TextRange___get_reversed__impl__emhnbm(newRawSelection) ? _TextRange___get_end__impl__gcdxpp(startBoundary) : _TextRange___get_start__impl__ww4t90(startBoundary);
    var end = _TextRange___get_reversed__impl__emhnbm(newRawSelection) ? _TextRange___get_start__impl__ww4t90(endBoundary) : _TextRange___get_end__impl__gcdxpp(endBoundary);
    return TextRange(start, end);
  }
  function SelectionAdjustment$Companion$None$1() {
  }
  protoOf(SelectionAdjustment$Companion$None$1).adjust_7hwejj_k$ = function (textLayoutResult, newRawSelectionRange, previousHandleOffset, isStartHandle, previousSelectionRange) {
    return newRawSelectionRange;
  };
  function SelectionAdjustment$Companion$Character$1() {
  }
  protoOf(SelectionAdjustment$Companion$Character$1).adjust_7hwejj_k$ = function (textLayoutResult, newRawSelectionRange, previousHandleOffset, isStartHandle, previousSelectionRange) {
    var tmp;
    if (_TextRange___get_collapsed__impl__cilesp(newRawSelectionRange)) {
      var tmp_0;
      var tmp_1 = previousSelectionRange;
      if ((tmp_1 == null ? null : new TextRange_0(tmp_1)) == null) {
        tmp_0 = null;
      } else {
        tmp_0 = _TextRange___get_reversed__impl__emhnbm(previousSelectionRange);
      }
      var tmp1_elvis_lhs = tmp_0;
      var previousHandlesCrossed = tmp1_elvis_lhs == null ? false : tmp1_elvis_lhs;
      tmp = ensureAtLeastOneChar(textLayoutResult.get_layoutInput_o7gjah_k$().get_text_wouvsm_k$().get_text_wouvsm_k$(), _TextRange___get_start__impl__ww4t90(newRawSelectionRange), get_lastIndex(textLayoutResult.get_layoutInput_o7gjah_k$().get_text_wouvsm_k$()), isStartHandle, previousHandlesCrossed);
    } else {
      tmp = newRawSelectionRange;
    }
    return tmp;
  };
  function SelectionAdjustment$Companion$Word$1() {
  }
  protoOf(SelectionAdjustment$Companion$Word$1).adjust_7hwejj_k$ = function (textLayoutResult, newRawSelectionRange, previousHandleOffset, isStartHandle, previousSelectionRange) {
    var tmp = Companion_getInstance_19();
    return adjustByBoundary(tmp, textLayoutResult, newRawSelectionRange, TextLayoutResult$getWordBoundary$ref(textLayoutResult));
  };
  function SelectionAdjustment$Companion$Paragraph$1() {
  }
  protoOf(SelectionAdjustment$Companion$Paragraph$1).adjust_7hwejj_k$ = function (textLayoutResult, newRawSelectionRange, previousHandleOffset, isStartHandle, previousSelectionRange) {
    var boundaryFun = getParagraphBoundary$ref(textLayoutResult.get_layoutInput_o7gjah_k$().get_text_wouvsm_k$());
    return adjustByBoundary(Companion_getInstance_19(), textLayoutResult, newRawSelectionRange, boundaryFun);
  };
  function SelectionAdjustment$Companion$CharacterWithWordAccelerate$1() {
  }
  protoOf(SelectionAdjustment$Companion$CharacterWithWordAccelerate$1).adjust_7hwejj_k$ = function (textLayoutResult, newRawSelectionRange, previousHandleOffset, isStartHandle, previousSelectionRange) {
    var tmp = previousSelectionRange;
    if ((tmp == null ? null : new TextRange_0(tmp)) == null) {
      return Companion_getInstance_19().Word_1.adjust_7hwejj_k$(textLayoutResult, newRawSelectionRange, previousHandleOffset, isStartHandle, previousSelectionRange);
    }
    if (_TextRange___get_collapsed__impl__cilesp(newRawSelectionRange)) {
      return ensureAtLeastOneChar(textLayoutResult.get_layoutInput_o7gjah_k$().get_text_wouvsm_k$().get_text_wouvsm_k$(), _TextRange___get_start__impl__ww4t90(newRawSelectionRange), get_lastIndex(textLayoutResult.get_layoutInput_o7gjah_k$().get_text_wouvsm_k$()), isStartHandle, _TextRange___get_reversed__impl__emhnbm(previousSelectionRange));
    }
    var start;
    var end;
    if (isStartHandle) {
      start = updateSelectionBoundary(this, textLayoutResult, _TextRange___get_start__impl__ww4t90(newRawSelectionRange), previousHandleOffset, _TextRange___get_start__impl__ww4t90(previousSelectionRange), _TextRange___get_end__impl__gcdxpp(newRawSelectionRange), true, _TextRange___get_reversed__impl__emhnbm(newRawSelectionRange));
      end = _TextRange___get_end__impl__gcdxpp(newRawSelectionRange);
    } else {
      start = _TextRange___get_start__impl__ww4t90(newRawSelectionRange);
      end = updateSelectionBoundary(this, textLayoutResult, _TextRange___get_end__impl__gcdxpp(newRawSelectionRange), previousHandleOffset, _TextRange___get_end__impl__gcdxpp(previousSelectionRange), _TextRange___get_start__impl__ww4t90(newRawSelectionRange), false, _TextRange___get_reversed__impl__emhnbm(newRawSelectionRange));
    }
    return TextRange(start, end);
  };
  function Companion_1() {
    Companion_instance_1 = this;
    var tmp = this;
    tmp.None_1 = new SelectionAdjustment$Companion$None$1();
    var tmp_0 = this;
    tmp_0.Character_1 = new SelectionAdjustment$Companion$Character$1();
    var tmp_1 = this;
    tmp_1.Word_1 = new SelectionAdjustment$Companion$Word$1();
    var tmp_2 = this;
    tmp_2.Paragraph_1 = new SelectionAdjustment$Companion$Paragraph$1();
    var tmp_3 = this;
    tmp_3.CharacterWithWordAccelerate_1 = new SelectionAdjustment$Companion$CharacterWithWordAccelerate$1();
  }
  protoOf(Companion_1).get_None_wo6tgh_k$ = function () {
    return this.None_1;
  };
  protoOf(Companion_1).get_Character_3i744g_k$ = function () {
    return this.Character_1;
  };
  protoOf(Companion_1).get_Word_wockfn_k$ = function () {
    return this.Word_1;
  };
  protoOf(Companion_1).get_Paragraph_2v2rol_k$ = function () {
    return this.Paragraph_1;
  };
  protoOf(Companion_1).get_CharacterWithWordAccelerate_b1h3l9_k$ = function () {
    return this.CharacterWithWordAccelerate_1;
  };
  var Companion_instance_1;
  function Companion_getInstance_19() {
    if (Companion_instance_1 == null)
      new Companion_1();
    return Companion_instance_1;
  }
  function SelectionAdjustment() {
  }
  function ensureAtLeastOneChar(text, offset, lastOffset, isStartHandle, previousHandlesCrossed) {
    if (lastOffset === 0)
      return TextRange(offset, offset);
    if (offset === 0) {
      var tmp;
      if (isStartHandle) {
        tmp = TextRange(findFollowingBreak(text, 0), 0);
      } else {
        tmp = TextRange(0, findFollowingBreak(text, 0));
      }
      return tmp;
    }
    if (offset === lastOffset) {
      var tmp_0;
      if (isStartHandle) {
        tmp_0 = TextRange(findPrecedingBreak(text, lastOffset), lastOffset);
      } else {
        tmp_0 = TextRange(lastOffset, findPrecedingBreak(text, lastOffset));
      }
      return tmp_0;
    }
    var tmp_1;
    if (isStartHandle) {
      var tmp_2;
      if (!previousHandlesCrossed) {
        tmp_2 = TextRange(findPrecedingBreak(text, offset), offset);
      } else {
        tmp_2 = TextRange(findFollowingBreak(text, offset), offset);
      }
      tmp_1 = tmp_2;
    } else {
      var tmp_3;
      if (!previousHandlesCrossed) {
        tmp_3 = TextRange(offset, findFollowingBreak(text, offset));
      } else {
        tmp_3 = TextRange(offset, findPrecedingBreak(text, offset));
      }
      tmp_1 = tmp_3;
    }
    return tmp_1;
  }
  function get_HandleWidth() {
    _init_properties_SelectionHandles_kt__nhzem7();
    return HandleWidth;
  }
  var HandleWidth;
  function get_HandleHeight() {
    _init_properties_SelectionHandles_kt__nhzem7();
    return HandleHeight;
  }
  var HandleHeight;
  function get_SelectionHandleInfoKey() {
    _init_properties_SelectionHandles_kt__nhzem7();
    return SelectionHandleInfoKey;
  }
  var SelectionHandleInfoKey;
  function SelectionHandleInfo(handle, position) {
    this.handle_1 = handle;
    this.position_1 = position;
  }
  protoOf(SelectionHandleInfo).get_handle_e5p7ht_k$ = function () {
    return this.handle_1;
  };
  protoOf(SelectionHandleInfo).get_position_cpyh94_k$ = function () {
    return this.position_1;
  };
  protoOf(SelectionHandleInfo).component1_7eebsc_k$ = function () {
    return this.handle_1;
  };
  protoOf(SelectionHandleInfo).component2_eiigad_k$ = function () {
    return this.position_1;
  };
  protoOf(SelectionHandleInfo).copy_qxemj7_k$ = function (handle, position) {
    return new SelectionHandleInfo(handle, position);
  };
  protoOf(SelectionHandleInfo).copy$default_57yhbz_k$ = function (handle, position, $super) {
    handle = handle === VOID ? this.handle_1 : handle;
    position = position === VOID ? this.position_1 : position;
    return $super === VOID ? this.copy_qxemj7_k$(handle, position) : $super.copy_qxemj7_k$.call(this, handle, new Offset_0(position));
  };
  protoOf(SelectionHandleInfo).toString = function () {
    return 'SelectionHandleInfo(handle=' + this.handle_1 + ', position=' + new Offset_0(this.position_1) + ')';
  };
  protoOf(SelectionHandleInfo).hashCode = function () {
    var result = this.handle_1.hashCode();
    result = imul(result, 31) + Offset__hashCode_impl_hbql41(this.position_1) | 0;
    return result;
  };
  protoOf(SelectionHandleInfo).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof SelectionHandleInfo))
      return false;
    var tmp0_other_with_cast = other instanceof SelectionHandleInfo ? other : THROW_CCE();
    if (!this.handle_1.equals(tmp0_other_with_cast.handle_1))
      return false;
    if (!equals(this.position_1, tmp0_other_with_cast.position_1))
      return false;
    return true;
  };
  var properties_initialized_SelectionHandles_kt_h9mb7j;
  function _init_properties_SelectionHandles_kt__nhzem7() {
    if (!properties_initialized_SelectionHandles_kt_h9mb7j) {
      properties_initialized_SelectionHandles_kt_h9mb7j = true;
      // Inline function 'androidx.compose.ui.unit.dp' call
      HandleWidth = _Dp___init__impl__ms3zkb(25);
      // Inline function 'androidx.compose.ui.unit.dp' call
      HandleHeight = _Dp___init__impl__ms3zkb(25);
      SelectionHandleInfoKey = new SemanticsPropertyKey('SelectionHandleInfo');
    }
  }
  function get_UnspecifiedAnimationVector2D() {
    _init_properties_SelectionMagnifier_kt__29sucy();
    return UnspecifiedAnimationVector2D;
  }
  var UnspecifiedAnimationVector2D;
  function get_UnspecifiedSafeOffsetVectorConverter() {
    _init_properties_SelectionMagnifier_kt__29sucy();
    return UnspecifiedSafeOffsetVectorConverter;
  }
  var UnspecifiedSafeOffsetVectorConverter;
  function get_OffsetDisplacementThreshold() {
    _init_properties_SelectionMagnifier_kt__29sucy();
    return OffsetDisplacementThreshold;
  }
  var OffsetDisplacementThreshold;
  function get_MagnifierSpringSpec() {
    _init_properties_SelectionMagnifier_kt__29sucy();
    return MagnifierSpringSpec;
  }
  var MagnifierSpringSpec;
  function UnspecifiedSafeOffsetVectorConverter$lambda(it) {
    _init_properties_SelectionMagnifier_kt__29sucy();
    var tmp;
    if (get_isSpecified(it.packedValue_1)) {
      tmp = new AnimationVector2D(_Offset___get_x__impl__xvi35n(it.packedValue_1), _Offset___get_y__impl__8bzhra(it.packedValue_1));
    } else {
      tmp = get_UnspecifiedAnimationVector2D();
    }
    return tmp;
  }
  function UnspecifiedSafeOffsetVectorConverter$lambda_0(it) {
    _init_properties_SelectionMagnifier_kt__29sucy();
    return new Offset_0(Offset(it.get_v1_kntnng_k$(), it.get_v2_kntnnf_k$()));
  }
  var properties_initialized_SelectionMagnifier_kt_dgnx1w;
  function _init_properties_SelectionMagnifier_kt__29sucy() {
    if (!properties_initialized_SelectionMagnifier_kt_dgnx1w) {
      properties_initialized_SelectionMagnifier_kt_dgnx1w = true;
      UnspecifiedAnimationVector2D = new AnimationVector2D(FloatCompanionObject_getInstance().get_NaN_18jnv2_k$(), FloatCompanionObject_getInstance().get_NaN_18jnv2_k$());
      var tmp = UnspecifiedSafeOffsetVectorConverter$lambda;
      UnspecifiedSafeOffsetVectorConverter = TwoWayConverter(tmp, UnspecifiedSafeOffsetVectorConverter$lambda_0);
      OffsetDisplacementThreshold = Offset(Spring_getInstance().get_DefaultDisplacementThreshold_1c58p0_k$(), Spring_getInstance().get_DefaultDisplacementThreshold_1c58p0_k$());
      MagnifierSpringSpec = new SpringSpec(VOID, VOID, new Offset_0(get_OffsetDisplacementThreshold()));
    }
  }
  function get_LocalSelectionRegistrar() {
    _init_properties_SelectionRegistrar_kt__oigj6p();
    return LocalSelectionRegistrar;
  }
  var LocalSelectionRegistrar;
  function Companion_2() {
    Companion_instance_2 = this;
    this.InvalidSelectableId_1 = new Long(0, 0);
  }
  protoOf(Companion_2).get_InvalidSelectableId_nbfra9_k$ = function () {
    return this.InvalidSelectableId_1;
  };
  var Companion_instance_2;
  function Companion_getInstance_20() {
    if (Companion_instance_2 == null)
      new Companion_2();
    return Companion_instance_2;
  }
  function SelectionRegistrar() {
  }
  function LocalSelectionRegistrar$lambda() {
    _init_properties_SelectionRegistrar_kt__oigj6p();
    return null;
  }
  var properties_initialized_SelectionRegistrar_kt_shxs4d;
  function _init_properties_SelectionRegistrar_kt__oigj6p() {
    if (!properties_initialized_SelectionRegistrar_kt_shxs4d) {
      properties_initialized_SelectionRegistrar_kt_shxs4d = true;
      LocalSelectionRegistrar = compositionLocalOf(VOID, LocalSelectionRegistrar$lambda);
    }
  }
  function get_LocalTextSelectionColors() {
    _init_properties_TextSelectionColors_kt__lgomir();
    return LocalTextSelectionColors;
  }
  var LocalTextSelectionColors;
  function get_$stableprop_9() {
    return 0;
  }
  function TextSelectionColors(handleColor, backgroundColor) {
    this.handleColor_1 = handleColor;
    this.backgroundColor_1 = backgroundColor;
    this.$stable_1 = 0;
  }
  protoOf(TextSelectionColors).get_handleColor_oadivb_k$ = function () {
    return this.handleColor_1;
  };
  protoOf(TextSelectionColors).get_backgroundColor_41xwlp_k$ = function () {
    return this.backgroundColor_1;
  };
  protoOf(TextSelectionColors).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof TextSelectionColors))
      return false;
    if (!equals(this.handleColor_1, other.handleColor_1))
      return false;
    if (!equals(this.backgroundColor_1, other.backgroundColor_1))
      return false;
    return true;
  };
  protoOf(TextSelectionColors).hashCode = function () {
    var result = Color__hashCode_impl_vjyivj(this.handleColor_1);
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.backgroundColor_1) | 0;
    return result;
  };
  protoOf(TextSelectionColors).toString = function () {
    return 'SelectionColors(selectionHandleColor=' + new Color(this.handleColor_1) + ', ' + ('selectionBackgroundColor=' + new Color(this.backgroundColor_1) + ')');
  };
  function LocalTextSelectionColors$lambda() {
    _init_properties_TextSelectionColors_kt__lgomir();
    return get_DefaultTextSelectionColors();
  }
  var properties_initialized_TextSelectionColors_kt_x2xmyn;
  function _init_properties_TextSelectionColors_kt__lgomir() {
    if (!properties_initialized_TextSelectionColors_kt_x2xmyn) {
      properties_initialized_TextSelectionColors_kt_x2xmyn = true;
      LocalTextSelectionColors = compositionLocalOf(VOID, LocalTextSelectionColors$lambda);
    }
  }
  function get_TapIndicationDelay() {
    return TapIndicationDelay;
  }
  var TapIndicationDelay;
  function NoOp() {
  }
  protoOf(NoOp).equals = function (other) {
    if (!(other instanceof NoOp))
      return false;
    other instanceof NoOp || THROW_CCE();
    return true;
  };
  protoOf(NoOp).hashCode = function () {
    return 0;
  };
  protoOf(NoOp).toString = function () {
    return '@androidx.compose.foundation.internal.NoOp()';
  };
  function get_SPACE_KEY_CODE() {
    _init_properties_Toggleable_jsNative_kt__wo698u();
    return SPACE_KEY_CODE;
  }
  var SPACE_KEY_CODE;
  var properties_initialized_Toggleable_jsNative_kt_qr95c;
  function _init_properties_Toggleable_jsNative_kt__wo698u() {
    if (!properties_initialized_Toggleable_jsNative_kt_qr95c) {
      properties_initialized_Toggleable_jsNative_kt_qr95c = true;
      SPACE_KEY_CODE = toLong(SkikoKey_KEY_SPACE_getInstance().get_platformKeyCode_k11s6o_k$());
    }
  }
  function MappedKeys() {
    MappedKeys_instance = this;
    this.A_1 = _Key___init__impl__p6mluu(_Key___get_keyCode__impl__ymzu5v(Companion_getInstance_15().get_A_3qd7s8_k$()));
    this.C_1 = _Key___init__impl__p6mluu(_Key___get_keyCode__impl__ymzu5v(Companion_getInstance_15().get_C_qsbemu_k$()));
    this.H_1 = _Key___init__impl__p6mluu(_Key___get_keyCode__impl__ymzu5v(Companion_getInstance_15().get_H_w1wwpd_k$()));
    this.V_1 = _Key___init__impl__p6mluu(_Key___get_keyCode__impl__ymzu5v(Companion_getInstance_15().get_V_wld3pf_k$()));
    this.X_1 = _Key___init__impl__p6mluu(_Key___get_keyCode__impl__ymzu5v(Companion_getInstance_15().get_X_7x2bun_k$()));
    this.Y_1 = _Key___init__impl__p6mluu(_Key___get_keyCode__impl__ymzu5v(Companion_getInstance_15().get_Y_7c9zcw_k$()));
    this.Z_1 = _Key___init__impl__p6mluu(_Key___get_keyCode__impl__ymzu5v(Companion_getInstance_15().get_Z_mlmakf_k$()));
    this.Backslash_1 = _Key___init__impl__p6mluu(_Key___get_keyCode__impl__ymzu5v(Companion_getInstance_15().get_Backslash_txp56r_k$()));
    this.DirectionLeft_1 = _Key___init__impl__p6mluu(_Key___get_keyCode__impl__ymzu5v(Companion_getInstance_15().get_DirectionLeft_f5x0wj_k$()));
    this.DirectionRight_1 = _Key___init__impl__p6mluu(_Key___get_keyCode__impl__ymzu5v(Companion_getInstance_15().get_DirectionRight_91pt3q_k$()));
    this.DirectionUp_1 = _Key___init__impl__p6mluu(_Key___get_keyCode__impl__ymzu5v(Companion_getInstance_15().get_DirectionUp_jror7j_k$()));
    this.DirectionDown_1 = _Key___init__impl__p6mluu(_Key___get_keyCode__impl__ymzu5v(Companion_getInstance_15().get_DirectionDown_8ppfns_k$()));
    this.PageUp_1 = _Key___init__impl__p6mluu(_Key___get_keyCode__impl__ymzu5v(Companion_getInstance_15().get_PageUp_4s7j3x_k$()));
    this.PageDown_1 = _Key___init__impl__p6mluu(_Key___get_keyCode__impl__ymzu5v(Companion_getInstance_15().get_PageDown_9hcgxi_k$()));
    this.MoveHome_1 = _Key___init__impl__p6mluu(_Key___get_keyCode__impl__ymzu5v(Companion_getInstance_15().get_MoveHome_fdukcp_k$()));
    this.MoveEnd_1 = _Key___init__impl__p6mluu(_Key___get_keyCode__impl__ymzu5v(Companion_getInstance_15().get_MoveEnd_3fdenj_k$()));
    this.Insert_1 = _Key___init__impl__p6mluu(_Key___get_keyCode__impl__ymzu5v(Companion_getInstance_15().get_Insert_sd5o5q_k$()));
    this.Enter_1 = _Key___init__impl__p6mluu(_Key___get_keyCode__impl__ymzu5v(Companion_getInstance_15().get_Enter_fkbexr_k$()));
    this.Backspace_1 = _Key___init__impl__p6mluu(_Key___get_keyCode__impl__ymzu5v(Companion_getInstance_15().get_Backspace_7jmd2y_k$()));
    this.Delete_1 = _Key___init__impl__p6mluu(_Key___get_keyCode__impl__ymzu5v(Companion_getInstance_15().get_Delete_uvctes_k$()));
    this.Paste_1 = _Key___init__impl__p6mluu(_Key___get_keyCode__impl__ymzu5v(Companion_getInstance_15().get_Paste_30cf6i_k$()));
    this.Cut_1 = _Key___init__impl__p6mluu(_Key___get_keyCode__impl__ymzu5v(Companion_getInstance_15().get_Cut_hvwmq1_k$()));
    this.Tab_1 = _Key___init__impl__p6mluu(_Key___get_keyCode__impl__ymzu5v(Companion_getInstance_15().get_Tab_os2g9w_k$()));
    this.Copy_1 = _Key___init__impl__p6mluu(_Key___get_keyCode__impl__ymzu5v(Companion_getInstance_15().get_Copy_9iqqvm_k$()));
  }
  protoOf(MappedKeys).get_A_3qd7s8_k$ = function () {
    return this.A_1;
  };
  protoOf(MappedKeys).get_C_qsbemu_k$ = function () {
    return this.C_1;
  };
  protoOf(MappedKeys).get_H_w1wwpd_k$ = function () {
    return this.H_1;
  };
  protoOf(MappedKeys).get_V_wld3pf_k$ = function () {
    return this.V_1;
  };
  protoOf(MappedKeys).get_X_7x2bun_k$ = function () {
    return this.X_1;
  };
  protoOf(MappedKeys).get_Y_7c9zcw_k$ = function () {
    return this.Y_1;
  };
  protoOf(MappedKeys).get_Z_mlmakf_k$ = function () {
    return this.Z_1;
  };
  protoOf(MappedKeys).get_Backslash_txp56r_k$ = function () {
    return this.Backslash_1;
  };
  protoOf(MappedKeys).get_DirectionLeft_f5x0wj_k$ = function () {
    return this.DirectionLeft_1;
  };
  protoOf(MappedKeys).get_DirectionRight_91pt3q_k$ = function () {
    return this.DirectionRight_1;
  };
  protoOf(MappedKeys).get_DirectionUp_jror7j_k$ = function () {
    return this.DirectionUp_1;
  };
  protoOf(MappedKeys).get_DirectionDown_8ppfns_k$ = function () {
    return this.DirectionDown_1;
  };
  protoOf(MappedKeys).get_PageUp_4s7j3x_k$ = function () {
    return this.PageUp_1;
  };
  protoOf(MappedKeys).get_PageDown_9hcgxi_k$ = function () {
    return this.PageDown_1;
  };
  protoOf(MappedKeys).get_MoveHome_fdukcp_k$ = function () {
    return this.MoveHome_1;
  };
  protoOf(MappedKeys).get_MoveEnd_3fdenj_k$ = function () {
    return this.MoveEnd_1;
  };
  protoOf(MappedKeys).get_Insert_sd5o5q_k$ = function () {
    return this.Insert_1;
  };
  protoOf(MappedKeys).get_Enter_fkbexr_k$ = function () {
    return this.Enter_1;
  };
  protoOf(MappedKeys).get_Backspace_7jmd2y_k$ = function () {
    return this.Backspace_1;
  };
  protoOf(MappedKeys).get_Delete_uvctes_k$ = function () {
    return this.Delete_1;
  };
  protoOf(MappedKeys).get_Paste_30cf6i_k$ = function () {
    return this.Paste_1;
  };
  protoOf(MappedKeys).get_Cut_hvwmq1_k$ = function () {
    return this.Cut_1;
  };
  protoOf(MappedKeys).get_Tab_os2g9w_k$ = function () {
    return this.Tab_1;
  };
  protoOf(MappedKeys).get_Copy_9iqqvm_k$ = function () {
    return this.Copy_1;
  };
  var MappedKeys_instance;
  function MappedKeys_getInstance() {
    if (MappedKeys_instance == null)
      new MappedKeys();
    return MappedKeys_instance;
  }
  function get_Space(_this__u8e3s4) {
    return _Key___init__impl__p6mluu(_Key___get_keyCode__impl__ymzu5v(Companion_getInstance_15().get_Spacebar_eowipy_k$()));
  }
  function get_F(_this__u8e3s4) {
    return _Key___init__impl__p6mluu(_Key___get_keyCode__impl__ymzu5v(Companion_getInstance_15().get_F_1j8aab_k$()));
  }
  function get_B(_this__u8e3s4) {
    return _Key___init__impl__p6mluu(_Key___get_keyCode__impl__ymzu5v(Companion_getInstance_15().get_B_biz3fb_k$()));
  }
  function get_P(_this__u8e3s4) {
    return _Key___init__impl__p6mluu(_Key___get_keyCode__impl__ymzu5v(Companion_getInstance_15().get_P_c2fafd_k$()));
  }
  function get_N(_this__u8e3s4) {
    return _Key___init__impl__p6mluu(_Key___get_keyCode__impl__ymzu5v(Companion_getInstance_15().get_N_ig9bzp_k$()));
  }
  function get_E(_this__u8e3s4) {
    return _Key___init__impl__p6mluu(_Key___get_keyCode__impl__ymzu5v(Companion_getInstance_15().get_E_dq40x8_k$()));
  }
  function get_D(_this__u8e3s4) {
    return _Key___init__impl__p6mluu(_Key___get_keyCode__impl__ymzu5v(Companion_getInstance_15().get_D_szgc4r_k$()));
  }
  function get_K(_this__u8e3s4) {
    return _Key___init__impl__p6mluu(_Key___get_keyCode__impl__ymzu5v(Companion_getInstance_15().get_K_6stscu_k$()));
  }
  function get_O(_this__u8e3s4) {
    return _Key___init__impl__p6mluu(_Key___get_keyCode__impl__ymzu5v(Companion_getInstance_15().get_O_36x0s6_k$()));
  }
  function get_platformDefaultKeyMapping() {
    _init_properties_KeyMapping_jsMain_kt__uqr90x();
    return platformDefaultKeyMapping;
  }
  var platformDefaultKeyMapping;
  function createPlatformDefaultKeyMapping(platform) {
    _init_properties_KeyMapping_jsMain_kt__uqr90x();
    return platform.get_ordinal_ip24qg_k$() === 3 ? createMacosDefaultKeyMapping() : get_defaultKeyMapping();
  }
  var properties_initialized_KeyMapping_jsMain_kt_bmmgcx;
  function _init_properties_KeyMapping_jsMain_kt__uqr90x() {
    if (!properties_initialized_KeyMapping_jsMain_kt_bmmgcx) {
      properties_initialized_KeyMapping_jsMain_kt_bmmgcx = true;
      platformDefaultKeyMapping = createPlatformDefaultKeyMapping(get_hostOs());
    }
  }
  function get_DefaultCursorThickness() {
    _init_properties_TextFieldCursor_js_kt__21fcek();
    return DefaultCursorThickness;
  }
  var DefaultCursorThickness;
  var properties_initialized_TextFieldCursor_js_kt_4q87vu;
  function _init_properties_TextFieldCursor_js_kt__21fcek() {
    if (!properties_initialized_TextFieldCursor_js_kt_4q87vu) {
      properties_initialized_TextFieldCursor_js_kt_4q87vu = true;
      // Inline function 'androidx.compose.ui.unit.dp' call
      DefaultCursorThickness = _Dp___init__impl__ms3zkb(1);
    }
  }
  function get_textPointerIcon() {
    _init_properties_TextPointerIcon_js_kt__ixjsfm();
    return textPointerIcon;
  }
  var textPointerIcon;
  var properties_initialized_TextPointerIcon_js_kt_plq52o;
  function _init_properties_TextPointerIcon_js_kt__ixjsfm() {
    if (!properties_initialized_TextPointerIcon_js_kt_plq52o) {
      properties_initialized_TextPointerIcon_js_kt_plq52o = true;
      textPointerIcon = DummyPointerIcon_getInstance();
    }
  }
  function get_isInTouchMode() {
    return isInTouchMode;
  }
  var isInTouchMode;
  function get_DefaultSelectionColor() {
    _init_properties_DefaultTextSelectionColors_js_kt__ohmec7();
    return DefaultSelectionColor;
  }
  var DefaultSelectionColor;
  function get_DefaultTextSelectionColors() {
    _init_properties_DefaultTextSelectionColors_js_kt__ohmec7();
    return DefaultTextSelectionColors;
  }
  var DefaultTextSelectionColors;
  var properties_initialized_DefaultTextSelectionColors_js_kt_i7z293;
  function _init_properties_DefaultTextSelectionColors_js_kt__ohmec7() {
    if (!properties_initialized_DefaultTextSelectionColors_js_kt_i7z293) {
      properties_initialized_DefaultTextSelectionColors_js_kt_i7z293 = true;
      DefaultSelectionColor = Color_0(new Long(-12417292, 0));
      DefaultTextSelectionColors = new TextSelectionColors(get_DefaultSelectionColor(), Color__copy$default_impl_ectz3s(get_DefaultSelectionColor(), 0.4));
    }
  }
  function get_mainScope() {
    _init_properties_Actuals_jsWasm_kt__g9jr6e();
    return mainScope;
  }
  var mainScope;
  var properties_initialized_Actuals_jsWasm_kt_rhb8zc;
  function _init_properties_Actuals_jsWasm_kt__g9jr6e() {
    if (!properties_initialized_Actuals_jsWasm_kt_rhb8zc) {
      properties_initialized_Actuals_jsWasm_kt_rhb8zc = true;
      mainScope = MainScope();
    }
  }
  function get_LocalScrollbarStyle() {
    _init_properties_Scrollbar_skiko_kt__fccvqz();
    return LocalScrollbarStyle;
  }
  var LocalScrollbarStyle;
  function get_$stableprop_10() {
    return 0;
  }
  function ScrollbarStyle(minimalHeight, thickness, shape, hoverDurationMillis, unhoverColor, hoverColor) {
    this.minimalHeight_1 = minimalHeight;
    this.thickness_1 = thickness;
    this.shape_1 = shape;
    this.hoverDurationMillis_1 = hoverDurationMillis;
    this.unhoverColor_1 = unhoverColor;
    this.hoverColor_1 = hoverColor;
    this.$stable_1 = 0;
  }
  protoOf(ScrollbarStyle).get_minimalHeight_o8w690_k$ = function () {
    return this.minimalHeight_1;
  };
  protoOf(ScrollbarStyle).get_thickness_sesk48_k$ = function () {
    return this.thickness_1;
  };
  protoOf(ScrollbarStyle).get_shape_iyi9a0_k$ = function () {
    return this.shape_1;
  };
  protoOf(ScrollbarStyle).get_hoverDurationMillis_fsut4d_k$ = function () {
    return this.hoverDurationMillis_1;
  };
  protoOf(ScrollbarStyle).get_unhoverColor_8wq5s_k$ = function () {
    return this.unhoverColor_1;
  };
  protoOf(ScrollbarStyle).get_hoverColor_vpga53_k$ = function () {
    return this.hoverColor_1;
  };
  protoOf(ScrollbarStyle).component1_k79ve9_k$ = function () {
    return this.minimalHeight_1;
  };
  protoOf(ScrollbarStyle).component2_fwtwi6_k$ = function () {
    return this.thickness_1;
  };
  protoOf(ScrollbarStyle).component3_7eebsa_k$ = function () {
    return this.shape_1;
  };
  protoOf(ScrollbarStyle).component4_7eebs9_k$ = function () {
    return this.hoverDurationMillis_1;
  };
  protoOf(ScrollbarStyle).component5_g226ld_k$ = function () {
    return this.unhoverColor_1;
  };
  protoOf(ScrollbarStyle).component6_usv51c_k$ = function () {
    return this.hoverColor_1;
  };
  protoOf(ScrollbarStyle).copy_9nvs32_k$ = function (minimalHeight, thickness, shape, hoverDurationMillis, unhoverColor, hoverColor) {
    return new ScrollbarStyle(minimalHeight, thickness, shape, hoverDurationMillis, unhoverColor, hoverColor);
  };
  protoOf(ScrollbarStyle).copy$default_u87tpu_k$ = function (minimalHeight, thickness, shape, hoverDurationMillis, unhoverColor, hoverColor, $super) {
    minimalHeight = minimalHeight === VOID ? this.minimalHeight_1 : minimalHeight;
    thickness = thickness === VOID ? this.thickness_1 : thickness;
    shape = shape === VOID ? this.shape_1 : shape;
    hoverDurationMillis = hoverDurationMillis === VOID ? this.hoverDurationMillis_1 : hoverDurationMillis;
    unhoverColor = unhoverColor === VOID ? this.unhoverColor_1 : unhoverColor;
    hoverColor = hoverColor === VOID ? this.hoverColor_1 : hoverColor;
    return $super === VOID ? this.copy_9nvs32_k$(minimalHeight, thickness, shape, hoverDurationMillis, unhoverColor, hoverColor) : $super.copy_9nvs32_k$.call(this, new Dp(minimalHeight), new Dp(thickness), shape, hoverDurationMillis, new Color(unhoverColor), new Color(hoverColor));
  };
  protoOf(ScrollbarStyle).toString = function () {
    return 'ScrollbarStyle(minimalHeight=' + new Dp(this.minimalHeight_1) + ', thickness=' + new Dp(this.thickness_1) + ', shape=' + this.shape_1 + ', hoverDurationMillis=' + this.hoverDurationMillis_1 + ', unhoverColor=' + new Color(this.unhoverColor_1) + ', hoverColor=' + new Color(this.hoverColor_1) + ')';
  };
  protoOf(ScrollbarStyle).hashCode = function () {
    var result = Dp__hashCode_impl_sxkrra(this.minimalHeight_1);
    result = imul(result, 31) + Dp__hashCode_impl_sxkrra(this.thickness_1) | 0;
    result = imul(result, 31) + hashCode(this.shape_1) | 0;
    result = imul(result, 31) + this.hoverDurationMillis_1 | 0;
    result = imul(result, 31) + Color__hashCode_impl_vjyivj(this.unhoverColor_1) | 0;
    result = imul(result, 31) + Color__hashCode_impl_vjyivj(this.hoverColor_1) | 0;
    return result;
  };
  protoOf(ScrollbarStyle).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ScrollbarStyle))
      return false;
    var tmp0_other_with_cast = other instanceof ScrollbarStyle ? other : THROW_CCE();
    if (!equals(this.minimalHeight_1, tmp0_other_with_cast.minimalHeight_1))
      return false;
    if (!equals(this.thickness_1, tmp0_other_with_cast.thickness_1))
      return false;
    if (!equals(this.shape_1, tmp0_other_with_cast.shape_1))
      return false;
    if (!(this.hoverDurationMillis_1 === tmp0_other_with_cast.hoverDurationMillis_1))
      return false;
    if (!equals(this.unhoverColor_1, tmp0_other_with_cast.unhoverColor_1))
      return false;
    if (!equals(this.hoverColor_1, tmp0_other_with_cast.hoverColor_1))
      return false;
    return true;
  };
  function defaultScrollbarStyle() {
    _init_properties_Scrollbar_skiko_kt__fccvqz();
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp = _Dp___init__impl__ms3zkb(16);
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp_0 = _Dp___init__impl__ms3zkb(8);
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp$ret$2 = _Dp___init__impl__ms3zkb(4);
    return new ScrollbarStyle(tmp, tmp_0, RoundedCornerShape_2(tmp$ret$2), 300, Color__copy$default_impl_ectz3s(Companion_getInstance().get_Black_t4k9fh_k$(), 0.12), Color__copy$default_impl_ectz3s(Companion_getInstance().get_Black_t4k9fh_k$(), 0.5));
  }
  function LocalScrollbarStyle$lambda() {
    _init_properties_Scrollbar_skiko_kt__fccvqz();
    return defaultScrollbarStyle();
  }
  var properties_initialized_Scrollbar_skiko_kt_aq3a4d;
  function _init_properties_Scrollbar_skiko_kt__fccvqz() {
    if (!properties_initialized_Scrollbar_skiko_kt_aq3a4d) {
      properties_initialized_Scrollbar_skiko_kt_aq3a4d = true;
      LocalScrollbarStyle = staticCompositionLocalOf(LocalScrollbarStyle$lambda);
    }
  }
  function createMacosDefaultKeyMapping() {
    var common = commonKeyMapping(isMetaPressed$factory());
    return new createMacosDefaultKeyMapping$1(common);
  }
  function createMacosDefaultKeyMapping$1($common) {
    this.$common_1 = $common;
  }
  protoOf(createMacosDefaultKeyMapping$1).map_6s0yk8_k$ = function (event) {
    var tmp;
    if (get_isMetaPressed(event) ? get_isCtrlPressed(event) : false) {
      var tmp0_subject = get_key_0(event);
      tmp = equals(tmp0_subject, get_Space(MappedKeys_getInstance())) ? KeyCommand_CHARACTER_PALETTE_getInstance() : null;
    } else if (get_isShiftPressed(event) ? get_isAltPressed(event) : false) {
      var tmp1_subject = get_key_0(event);
      tmp = equals(tmp1_subject, MappedKeys_getInstance().get_DirectionLeft_f5x0wj_k$()) ? KeyCommand_SELECT_LEFT_WORD_getInstance() : equals(tmp1_subject, MappedKeys_getInstance().get_DirectionRight_91pt3q_k$()) ? KeyCommand_SELECT_RIGHT_WORD_getInstance() : equals(tmp1_subject, MappedKeys_getInstance().get_DirectionUp_jror7j_k$()) ? KeyCommand_SELECT_PREV_PARAGRAPH_getInstance() : equals(tmp1_subject, MappedKeys_getInstance().get_DirectionDown_8ppfns_k$()) ? KeyCommand_SELECT_NEXT_PARAGRAPH_getInstance() : null;
    } else if (get_isShiftPressed(event) ? get_isMetaPressed(event) : false) {
      var tmp2_subject = get_key_0(event);
      tmp = equals(tmp2_subject, MappedKeys_getInstance().get_DirectionLeft_f5x0wj_k$()) ? KeyCommand_SELECT_LINE_LEFT_getInstance() : equals(tmp2_subject, MappedKeys_getInstance().get_DirectionRight_91pt3q_k$()) ? KeyCommand_SELECT_LINE_RIGHT_getInstance() : equals(tmp2_subject, MappedKeys_getInstance().get_DirectionUp_jror7j_k$()) ? KeyCommand_SELECT_HOME_getInstance() : equals(tmp2_subject, MappedKeys_getInstance().get_DirectionDown_8ppfns_k$()) ? KeyCommand_SELECT_END_getInstance() : null;
    } else if (get_isMetaPressed(event)) {
      var tmp3_subject = get_key_0(event);
      tmp = equals(tmp3_subject, MappedKeys_getInstance().get_DirectionLeft_f5x0wj_k$()) ? KeyCommand_LINE_LEFT_getInstance() : equals(tmp3_subject, MappedKeys_getInstance().get_DirectionRight_91pt3q_k$()) ? KeyCommand_LINE_RIGHT_getInstance() : equals(tmp3_subject, MappedKeys_getInstance().get_DirectionUp_jror7j_k$()) ? KeyCommand_HOME_getInstance() : equals(tmp3_subject, MappedKeys_getInstance().get_DirectionDown_8ppfns_k$()) ? KeyCommand_END_getInstance() : equals(tmp3_subject, MappedKeys_getInstance().get_Backspace_7jmd2y_k$()) ? KeyCommand_DELETE_FROM_LINE_START_getInstance() : null;
    } else if ((get_isCtrlPressed(event) ? get_isShiftPressed(event) : false) ? get_isAltPressed(event) : false) {
      var tmp4_subject = get_key_0(event);
      tmp = equals(tmp4_subject, get_F(MappedKeys_getInstance())) ? KeyCommand_SELECT_RIGHT_WORD_getInstance() : equals(tmp4_subject, get_B(MappedKeys_getInstance())) ? KeyCommand_SELECT_LEFT_WORD_getInstance() : null;
    } else if (get_isCtrlPressed(event) ? get_isAltPressed(event) : false) {
      var tmp5_subject = get_key_0(event);
      tmp = equals(tmp5_subject, get_F(MappedKeys_getInstance())) ? KeyCommand_RIGHT_WORD_getInstance() : equals(tmp5_subject, get_B(MappedKeys_getInstance())) ? KeyCommand_LEFT_WORD_getInstance() : null;
    } else if (get_isCtrlPressed(event) ? get_isShiftPressed(event) : false) {
      var tmp6_subject = get_key_0(event);
      tmp = equals(tmp6_subject, get_F(MappedKeys_getInstance())) ? KeyCommand_SELECT_RIGHT_CHAR_getInstance() : equals(tmp6_subject, get_B(MappedKeys_getInstance())) ? KeyCommand_SELECT_LEFT_CHAR_getInstance() : equals(tmp6_subject, get_P(MappedKeys_getInstance())) ? KeyCommand_SELECT_UP_getInstance() : equals(tmp6_subject, get_N(MappedKeys_getInstance())) ? KeyCommand_SELECT_DOWN_getInstance() : equals(tmp6_subject, MappedKeys_getInstance().get_A_3qd7s8_k$()) ? KeyCommand_SELECT_LINE_START_getInstance() : equals(tmp6_subject, get_E(MappedKeys_getInstance())) ? KeyCommand_SELECT_LINE_END_getInstance() : null;
    } else if (get_isCtrlPressed(event)) {
      var tmp7_subject = get_key_0(event);
      tmp = equals(tmp7_subject, get_F(MappedKeys_getInstance())) ? KeyCommand_LEFT_CHAR_getInstance() : equals(tmp7_subject, get_B(MappedKeys_getInstance())) ? KeyCommand_RIGHT_CHAR_getInstance() : equals(tmp7_subject, get_P(MappedKeys_getInstance())) ? KeyCommand_UP_getInstance() : equals(tmp7_subject, get_N(MappedKeys_getInstance())) ? KeyCommand_DOWN_getInstance() : equals(tmp7_subject, MappedKeys_getInstance().get_A_3qd7s8_k$()) ? KeyCommand_LINE_START_getInstance() : equals(tmp7_subject, get_E(MappedKeys_getInstance())) ? KeyCommand_LINE_END_getInstance() : equals(tmp7_subject, MappedKeys_getInstance().get_H_w1wwpd_k$()) ? KeyCommand_DELETE_PREV_CHAR_getInstance() : equals(tmp7_subject, get_D(MappedKeys_getInstance())) ? KeyCommand_DELETE_NEXT_CHAR_getInstance() : equals(tmp7_subject, get_K(MappedKeys_getInstance())) ? KeyCommand_DELETE_TO_LINE_END_getInstance() : equals(tmp7_subject, get_O(MappedKeys_getInstance())) ? KeyCommand_NEW_LINE_getInstance() : null;
    } else if (get_isShiftPressed(event)) {
      var tmp8_subject = get_key_0(event);
      tmp = equals(tmp8_subject, MappedKeys_getInstance().get_MoveHome_fdukcp_k$()) ? KeyCommand_SELECT_HOME_getInstance() : equals(tmp8_subject, MappedKeys_getInstance().get_MoveEnd_3fdenj_k$()) ? KeyCommand_SELECT_END_getInstance() : null;
    } else if (get_isAltPressed(event)) {
      var tmp9_subject = get_key_0(event);
      tmp = equals(tmp9_subject, MappedKeys_getInstance().get_DirectionLeft_f5x0wj_k$()) ? KeyCommand_LEFT_WORD_getInstance() : equals(tmp9_subject, MappedKeys_getInstance().get_DirectionRight_91pt3q_k$()) ? KeyCommand_RIGHT_WORD_getInstance() : equals(tmp9_subject, MappedKeys_getInstance().get_DirectionUp_jror7j_k$()) ? KeyCommand_PREV_PARAGRAPH_getInstance() : equals(tmp9_subject, MappedKeys_getInstance().get_DirectionDown_8ppfns_k$()) ? KeyCommand_NEXT_PARAGRAPH_getInstance() : equals(tmp9_subject, MappedKeys_getInstance().get_Delete_uvctes_k$()) ? KeyCommand_DELETE_NEXT_WORD_getInstance() : equals(tmp9_subject, MappedKeys_getInstance().get_Backspace_7jmd2y_k$()) ? KeyCommand_DELETE_PREV_WORD_getInstance() : null;
    } else {
      tmp = null;
    }
    var tmp10_elvis_lhs = tmp;
    return tmp10_elvis_lhs == null ? this.$common_1.map_6s0yk8_k$(event) : tmp10_elvis_lhs;
  };
  function isMetaPressed$factory() {
    return getPropertyCallableRef('isMetaPressed', 1, KProperty1, function (receiver) {
      return get_isMetaPressed(receiver.nativeKeyEvent_1);
    }, null);
  }
  function findFollowingBreak(_this__u8e3s4, index) {
    var it = Companion_getInstance_16().makeCharacterInstance$default_7rwuey_k$();
    it.setText_1jlejc_k$(_this__u8e3s4);
    return it.following_j6g4t5_k$(index);
  }
  function findPrecedingBreak(_this__u8e3s4, index) {
    var it = Companion_getInstance_16().makeCharacterInstance$default_7rwuey_k$();
    it.setText_1jlejc_k$(_this__u8e3s4);
    return it.preceding_v1dyyd_k$(index);
  }
  //region block: post-declaration
  protoOf(BackgroundNode).onMeasureResultChanged_ipbzyg_k$ = onMeasureResultChanged;
  protoOf(DefaultScrollMotionDurationScale$1).get_key_18j28a_k$ = get_key;
  protoOf(DefaultScrollMotionDurationScale$1).get_y2st91_k$ = get;
  protoOf(DefaultScrollMotionDurationScale$1).fold_j2vaxd_k$ = fold;
  protoOf(DefaultScrollMotionDurationScale$1).minusKey_9i5ggf_k$ = minusKey;
  protoOf(DefaultScrollMotionDurationScale$1).plus_s13ygv_k$ = plus;
  protoOf(ConsumeAllFlingOnDirection).onPreScroll_eev2j6_k$ = onPreScroll;
  protoOf(ConsumeAllFlingOnDirection).onPreFling_poi4ez_k$ = onPreFling;
  protoOf(UnitDensity$1).toPx_mycba2_k$ = toPx;
  protoOf(UnitDensity$1).toPx_plt68j_k$ = toPx_0;
  protoOf(UnitDensity$1).roundToPx_yb7vg8_k$ = roundToPx;
  protoOf(UnitDensity$1).roundToPx_cw9j9b_k$ = roundToPx_0;
  protoOf(UnitDensity$1).toSp_apeb1_k$ = toSp;
  protoOf(UnitDensity$1).toSp_97l7ws_k$ = toSp_0;
  protoOf(UnitDensity$1).toSp_fixg4_k$ = toSp_1;
  protoOf(UnitDensity$1).toDp_m8rr7q_k$ = toDp;
  protoOf(UnitDensity$1).toDp_fjakf4_k$ = toDp_0;
  protoOf(UnitDensity$1).toDp_hs0w0_k$ = toDp_1;
  protoOf(UnitDensity$1).toRect_ysncr2_k$ = toRect;
  protoOf(UnitDensity$1).toSize_7jb2uc_k$ = toSize_0;
  protoOf(UnitDensity$1).toDpSize_5hpeec_k$ = toDpSize;
  protoOf(PercentCornerSize).get_inspectableElements_mab2zo_k$ = get_inspectableElements;
  protoOf(PercentCornerSize).get_nameFallback_yn6bx2_k$ = get_nameFallback;
  protoOf(DpCornerSize).get_inspectableElements_mab2zo_k$ = get_inspectableElements;
  protoOf(DpCornerSize).get_nameFallback_yn6bx2_k$ = get_nameFallback;
  protoOf(ZeroCornerSize$1).get_inspectableElements_mab2zo_k$ = get_inspectableElements;
  protoOf(ZeroCornerSize$1).get_nameFallback_yn6bx2_k$ = get_nameFallback;
  //endregion
  //region block: init
  DefaultScrollMotionDurationScaleFactor = 1.0;
  DefaultWidthCharCount = 10;
  SNAPSHOTS_INTERVAL_MILLIS = 5000;
  DefaultWidthCharCount_0 = 10;
  TapIndicationDelay = new Long(0, 0);
  isInTouchMode = false;
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = collectIsFocusedAsState$composable;
  _.$_$.b = get_CircleShape;
  _.$_$.c = CornerSize_1;
  _.$_$.d = RoundedCornerShape_2;
  _.$_$.e = RoundedCornerShape_3;
  _.$_$.f = get_LocalTextSelectionColors;
  _.$_$.g = BorderStroke;
  _.$_$.h = background;
  _.$_$.i = border;
  //endregion
  return _;
}));

//# sourceMappingURL=compose-multiplatform-core-foundation.js.map
