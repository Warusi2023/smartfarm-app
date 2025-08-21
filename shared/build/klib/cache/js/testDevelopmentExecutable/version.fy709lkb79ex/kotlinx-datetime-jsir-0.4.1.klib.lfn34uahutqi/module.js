(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', '@js-joda/core', './kotlin-kotlin-stdlib.js', './kotlinx-serialization-kotlinx-serialization-core.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('@js-joda/core'), require('./kotlin-kotlin-stdlib.js'), require('./kotlinx-serialization-kotlinx-serialization-core.js'));
  else {
    if (typeof this['@js-joda/core'] === 'undefined') {
      throw new Error("Error loading module 'Kotlin-DateTime-library-kotlinx-datetime-js-ir'. Its dependency '@js-joda/core' was not found. Please, check whether '@js-joda/core' is loaded prior to 'Kotlin-DateTime-library-kotlinx-datetime-js-ir'.");
    }
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'Kotlin-DateTime-library-kotlinx-datetime-js-ir'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'Kotlin-DateTime-library-kotlinx-datetime-js-ir'.");
    }
    if (typeof this['kotlinx-serialization-kotlinx-serialization-core'] === 'undefined') {
      throw new Error("Error loading module 'Kotlin-DateTime-library-kotlinx-datetime-js-ir'. Its dependency 'kotlinx-serialization-kotlinx-serialization-core' was not found. Please, check whether 'kotlinx-serialization-kotlinx-serialization-core' is loaded prior to 'Kotlin-DateTime-library-kotlinx-datetime-js-ir'.");
    }
    root['Kotlin-DateTime-library-kotlinx-datetime-js-ir'] = factory(typeof this['Kotlin-DateTime-library-kotlinx-datetime-js-ir'] === 'undefined' ? {} : this['Kotlin-DateTime-library-kotlinx-datetime-js-ir'], this['@js-joda/core'], this['kotlin-kotlin-stdlib'], this['kotlinx-serialization-kotlinx-serialization-core']);
  }
}(this, function (_, $module$_js_joda_core_gcv2k, kotlin_kotlin, kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core) {
  'use strict';
  //region block: imports
  var LocalTime = $module$_js_joda_core_gcv2k.LocalTime;
  var asList = kotlin_kotlin.$_$.m6;
  var IllegalArgumentException_init_$Init$ = kotlin_kotlin.$_$.u1;
  var protoOf = kotlin_kotlin.$_$.id;
  var objectCreate = kotlin_kotlin.$_$.gd;
  var captureStack = kotlin_kotlin.$_$.rb;
  var IllegalArgumentException_init_$Init$_0 = kotlin_kotlin.$_$.w1;
  var IllegalArgumentException_init_$Init$_1 = kotlin_kotlin.$_$.s1;
  var IllegalArgumentException_init_$Init$_2 = kotlin_kotlin.$_$.y1;
  var IllegalArgumentException = kotlin_kotlin.$_$.ah;
  var classMeta = kotlin_kotlin.$_$.xb;
  var setMetadataFor = kotlin_kotlin.$_$.jd;
  var VOID = kotlin_kotlin.$_$.h;
  var STRING_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.e;
  var PrimitiveSerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.v;
  var THROW_CCE = kotlin_kotlin.$_$.jh;
  var KSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.z1;
  var objectMeta = kotlin_kotlin.$_$.hd;
  var THROW_IAE = kotlin_kotlin.$_$.kh;
  var Unit_getInstance = kotlin_kotlin.$_$.e5;
  var Enum = kotlin_kotlin.$_$.xg;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.t1;
  var numberToInt = kotlin_kotlin.$_$.ed;
  var numberToDouble = kotlin_kotlin.$_$.dd;
  var numberToLong = kotlin_kotlin.$_$.fd;
  var equals = kotlin_kotlin.$_$.bc;
  var Comparable = kotlin_kotlin.$_$.tg;
  //endregion
  //region block: pre-declaration
  setMetadataFor(DateTimeFormatException, 'DateTimeFormatException', classMeta, IllegalArgumentException, VOID, DateTimeFormatException_init_$Create$);
  setMetadataFor(LocalTimeIso8601Serializer, 'LocalTimeIso8601Serializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(DayOfWeek, 'DayOfWeek', classMeta, Enum);
  setMetadataFor(Companion, 'Companion', objectMeta);
  setMetadataFor(LocalTime_0, 'LocalTime', classMeta, VOID, [Comparable], VOID, VOID, {0: LocalTimeIso8601Serializer_getInstance});
  setMetadataFor(Month, 'Month', classMeta, Enum);
  //endregion
  function get_allDaysOfWeek() {
    _init_properties_DayOfWeek_kt__jlq111();
    return allDaysOfWeek;
  }
  var allDaysOfWeek;
  var properties_initialized_DayOfWeek_kt_chtv49;
  function _init_properties_DayOfWeek_kt__jlq111() {
    if (!properties_initialized_DayOfWeek_kt_chtv49) {
      properties_initialized_DayOfWeek_kt_chtv49 = true;
      allDaysOfWeek = asList(values());
    }
  }
  function DateTimeFormatException_init_$Init$($this) {
    IllegalArgumentException_init_$Init$($this);
    DateTimeFormatException.call($this);
    return $this;
  }
  function DateTimeFormatException_init_$Create$() {
    var tmp = DateTimeFormatException_init_$Init$(objectCreate(protoOf(DateTimeFormatException)));
    captureStack(tmp, DateTimeFormatException_init_$Create$);
    return tmp;
  }
  function DateTimeFormatException_init_$Init$_0(message, $this) {
    IllegalArgumentException_init_$Init$_0(message, $this);
    DateTimeFormatException.call($this);
    return $this;
  }
  function DateTimeFormatException_init_$Create$_0(message) {
    var tmp = DateTimeFormatException_init_$Init$_0(message, objectCreate(protoOf(DateTimeFormatException)));
    captureStack(tmp, DateTimeFormatException_init_$Create$_0);
    return tmp;
  }
  function DateTimeFormatException_init_$Init$_1(cause, $this) {
    IllegalArgumentException_init_$Init$_1(cause, $this);
    DateTimeFormatException.call($this);
    return $this;
  }
  function DateTimeFormatException_init_$Create$_1(cause) {
    var tmp = DateTimeFormatException_init_$Init$_1(cause, objectCreate(protoOf(DateTimeFormatException)));
    captureStack(tmp, DateTimeFormatException_init_$Create$_1);
    return tmp;
  }
  function DateTimeFormatException_init_$Init$_2(message, cause, $this) {
    IllegalArgumentException_init_$Init$_2(message, cause, $this);
    DateTimeFormatException.call($this);
    return $this;
  }
  function DateTimeFormatException_init_$Create$_2(message, cause) {
    var tmp = DateTimeFormatException_init_$Init$_2(message, cause, objectCreate(protoOf(DateTimeFormatException)));
    captureStack(tmp, DateTimeFormatException_init_$Create$_2);
    return tmp;
  }
  function DateTimeFormatException() {
    captureStack(this, DateTimeFormatException);
  }
  function get_allMonths() {
    _init_properties_Month_kt__aau5fy();
    return allMonths;
  }
  var allMonths;
  var properties_initialized_Month_kt_gieo9c;
  function _init_properties_Month_kt__aau5fy() {
    if (!properties_initialized_Month_kt_gieo9c) {
      properties_initialized_Month_kt_gieo9c = true;
      allMonths = asList(values_0());
    }
  }
  function get_NANOS_PER_MILLI() {
    return NANOS_PER_MILLI;
  }
  var NANOS_PER_MILLI;
  function LocalTimeIso8601Serializer() {
    LocalTimeIso8601Serializer_instance = this;
    this.descriptor_1 = PrimitiveSerialDescriptor('LocalTime', STRING_getInstance());
  }
  protoOf(LocalTimeIso8601Serializer).get_descriptor_wjt6a0_k$ = function () {
    return this.descriptor_1;
  };
  protoOf(LocalTimeIso8601Serializer).deserialize_sy6x50_k$ = function (decoder) {
    return Companion_getInstance().parse_pc1q8p_k$(decoder.decodeString_x3hxsx_k$());
  };
  protoOf(LocalTimeIso8601Serializer).serialize_401kjc_k$ = function (encoder, value) {
    encoder.encodeString_424b5v_k$(value.toString());
  };
  protoOf(LocalTimeIso8601Serializer).serialize_5ase3y_k$ = function (encoder, value) {
    return this.serialize_401kjc_k$(encoder, value instanceof LocalTime_0 ? value : THROW_CCE());
  };
  var LocalTimeIso8601Serializer_instance;
  function LocalTimeIso8601Serializer_getInstance() {
    if (LocalTimeIso8601Serializer_instance == null)
      new LocalTimeIso8601Serializer();
    return LocalTimeIso8601Serializer_instance;
  }
  var DayOfWeek_MONDAY_instance;
  var DayOfWeek_TUESDAY_instance;
  var DayOfWeek_WEDNESDAY_instance;
  var DayOfWeek_THURSDAY_instance;
  var DayOfWeek_FRIDAY_instance;
  var DayOfWeek_SATURDAY_instance;
  var DayOfWeek_SUNDAY_instance;
  function values() {
    return [DayOfWeek_MONDAY_getInstance(), DayOfWeek_TUESDAY_getInstance(), DayOfWeek_WEDNESDAY_getInstance(), DayOfWeek_THURSDAY_getInstance(), DayOfWeek_FRIDAY_getInstance(), DayOfWeek_SATURDAY_getInstance(), DayOfWeek_SUNDAY_getInstance()];
  }
  function valueOf(value) {
    switch (value) {
      case 'MONDAY':
        return DayOfWeek_MONDAY_getInstance();
      case 'TUESDAY':
        return DayOfWeek_TUESDAY_getInstance();
      case 'WEDNESDAY':
        return DayOfWeek_WEDNESDAY_getInstance();
      case 'THURSDAY':
        return DayOfWeek_THURSDAY_getInstance();
      case 'FRIDAY':
        return DayOfWeek_FRIDAY_getInstance();
      case 'SATURDAY':
        return DayOfWeek_SATURDAY_getInstance();
      case 'SUNDAY':
        return DayOfWeek_SUNDAY_getInstance();
      default:
        DayOfWeek_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  var DayOfWeek_entriesInitialized;
  function DayOfWeek_initEntries() {
    if (DayOfWeek_entriesInitialized)
      return Unit_getInstance();
    DayOfWeek_entriesInitialized = true;
    DayOfWeek_MONDAY_instance = new DayOfWeek('MONDAY', 0);
    DayOfWeek_TUESDAY_instance = new DayOfWeek('TUESDAY', 1);
    DayOfWeek_WEDNESDAY_instance = new DayOfWeek('WEDNESDAY', 2);
    DayOfWeek_THURSDAY_instance = new DayOfWeek('THURSDAY', 3);
    DayOfWeek_FRIDAY_instance = new DayOfWeek('FRIDAY', 4);
    DayOfWeek_SATURDAY_instance = new DayOfWeek('SATURDAY', 5);
    DayOfWeek_SUNDAY_instance = new DayOfWeek('SUNDAY', 6);
  }
  function DayOfWeek(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function DayOfWeek_MONDAY_getInstance() {
    DayOfWeek_initEntries();
    return DayOfWeek_MONDAY_instance;
  }
  function DayOfWeek_TUESDAY_getInstance() {
    DayOfWeek_initEntries();
    return DayOfWeek_TUESDAY_instance;
  }
  function DayOfWeek_WEDNESDAY_getInstance() {
    DayOfWeek_initEntries();
    return DayOfWeek_WEDNESDAY_instance;
  }
  function DayOfWeek_THURSDAY_getInstance() {
    DayOfWeek_initEntries();
    return DayOfWeek_THURSDAY_instance;
  }
  function DayOfWeek_FRIDAY_getInstance() {
    DayOfWeek_initEntries();
    return DayOfWeek_FRIDAY_instance;
  }
  function DayOfWeek_SATURDAY_getInstance() {
    DayOfWeek_initEntries();
    return DayOfWeek_SATURDAY_instance;
  }
  function DayOfWeek_SUNDAY_getInstance() {
    DayOfWeek_initEntries();
    return DayOfWeek_SUNDAY_instance;
  }
  function isJodaDateTimeException(_this__u8e3s4) {
    // Inline function 'kotlin.js.asDynamic' call
    return _this__u8e3s4.name == 'DateTimeException';
  }
  function isJodaDateTimeParseException(_this__u8e3s4) {
    // Inline function 'kotlin.js.asDynamic' call
    return _this__u8e3s4.name == 'DateTimeParseException';
  }
  function LocalTime_init_$Init$(hour, minute, second, nanosecond, $this) {
    second = second === VOID ? 0 : second;
    nanosecond = nanosecond === VOID ? 0 : nanosecond;
    var tmp;
    try {
      tmp = LocalTime.of(hour, minute, second, nanosecond);
    } catch ($p) {
      var tmp_0;
      if ($p instanceof Error) {
        var e = $p;
        if (isJodaDateTimeException(e))
          throw IllegalArgumentException_init_$Create$(e);
        throw e;
      } else {
        throw $p;
      }
    }
    LocalTime_0.call($this, tmp);
    return $this;
  }
  function LocalTime_init_$Create$(hour, minute, second, nanosecond) {
    return LocalTime_init_$Init$(hour, minute, second, nanosecond, objectCreate(protoOf(LocalTime_0)));
  }
  function Companion() {
    Companion_instance = this;
    this.MIN_1 = new LocalTime_0(LocalTime.MIN);
    this.MAX_1 = new LocalTime_0(LocalTime.MAX);
  }
  protoOf(Companion).parse_pc1q8p_k$ = function (isoString) {
    var tmp;
    try {
      // Inline function 'kotlin.let' call
      var this_0 = LocalTime.parse(isoString);
      // Inline function 'kotlin.contracts.contract' call
      tmp = new LocalTime_0(this_0);
    } catch ($p) {
      var tmp_0;
      if ($p instanceof Error) {
        var e = $p;
        if (isJodaDateTimeParseException(e))
          throw DateTimeFormatException_init_$Create$_1(e);
        throw e;
      } else {
        throw $p;
      }
    }
    return tmp;
  };
  protoOf(Companion).fromSecondOfDay_ahegcx_k$ = function (secondOfDay) {
    var tmp;
    try {
      // Inline function 'kotlin.let' call
      var this_0 = LocalTime.ofSecondOfDay(secondOfDay, 0);
      // Inline function 'kotlin.contracts.contract' call
      tmp = new LocalTime_0(this_0);
    } catch ($p) {
      var tmp_0;
      if ($p instanceof Error) {
        var e = $p;
        throw IllegalArgumentException_init_$Create$(e);
      } else {
        throw $p;
      }
    }
    return tmp;
  };
  protoOf(Companion).fromMillisecondOfDay_pjhtva_k$ = function (millisecondOfDay) {
    var tmp;
    try {
      // Inline function 'kotlin.let' call
      var this_0 = LocalTime.ofNanoOfDay(millisecondOfDay * 1000000.0);
      // Inline function 'kotlin.contracts.contract' call
      tmp = new LocalTime_0(this_0);
    } catch ($p) {
      var tmp_0;
      if ($p instanceof Error) {
        var e = $p;
        throw IllegalArgumentException_init_$Create$(e);
      } else {
        throw $p;
      }
    }
    return tmp;
  };
  protoOf(Companion).fromNanosecondOfDay_iksazp_k$ = function (nanosecondOfDay) {
    var tmp;
    try {
      // Inline function 'kotlin.let' call
      var this_0 = LocalTime.ofNanoOfDay(nanosecondOfDay.toDouble_ygsx0s_k$());
      // Inline function 'kotlin.contracts.contract' call
      tmp = new LocalTime_0(this_0);
    } catch ($p) {
      var tmp_0;
      if ($p instanceof Error) {
        var e = $p;
        throw IllegalArgumentException_init_$Create$(e);
      } else {
        throw $p;
      }
    }
    return tmp;
  };
  protoOf(Companion).get_MIN_18jp6f_k$ = function () {
    return this.MIN_1;
  };
  protoOf(Companion).get_MAX_18jpd1_k$ = function () {
    return this.MAX_1;
  };
  protoOf(Companion).serializer_9w0wvi_k$ = function () {
    return LocalTimeIso8601Serializer_getInstance();
  };
  var Companion_instance;
  function Companion_getInstance() {
    if (Companion_instance == null)
      new Companion();
    return Companion_instance;
  }
  function LocalTime_0(value) {
    Companion_getInstance();
    this.value_1 = value;
  }
  protoOf(LocalTime_0).get_value_j01efc_k$ = function () {
    return this.value_1;
  };
  protoOf(LocalTime_0).get_hour_wonfal_k$ = function () {
    return numberToInt(this.value_1.hour());
  };
  protoOf(LocalTime_0).get_minute_gnc10d_k$ = function () {
    return numberToInt(this.value_1.minute());
  };
  protoOf(LocalTime_0).get_second_jf7fjx_k$ = function () {
    return numberToInt(this.value_1.second());
  };
  protoOf(LocalTime_0).get_nanosecond_fws9td_k$ = function () {
    return numberToInt(this.value_1.nano());
  };
  protoOf(LocalTime_0).toSecondOfDay_a2clsa_k$ = function () {
    return numberToInt(this.value_1.toSecondOfDay());
  };
  protoOf(LocalTime_0).toMillisecondOfDay_936hwh_k$ = function () {
    return numberToInt(numberToDouble(this.value_1.toNanoOfDay()) / get_NANOS_PER_MILLI());
  };
  protoOf(LocalTime_0).toNanosecondOfDay_dywvsy_k$ = function () {
    return numberToLong(this.value_1.toNanoOfDay());
  };
  protoOf(LocalTime_0).equals = function (other) {
    var tmp;
    if (this === other) {
      tmp = true;
    } else {
      var tmp_0;
      if (other instanceof LocalTime_0) {
        tmp_0 = equals(this.value_1, other.value_1);
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    }
    return tmp;
  };
  protoOf(LocalTime_0).hashCode = function () {
    return numberToInt(this.value_1.hashCode());
  };
  protoOf(LocalTime_0).toString = function () {
    return this.value_1.toString();
  };
  protoOf(LocalTime_0).compareTo_ax7xad_k$ = function (other) {
    return numberToInt(this.value_1.compareTo(other.value_1));
  };
  protoOf(LocalTime_0).compareTo_hpufkf_k$ = function (other) {
    return this.compareTo_ax7xad_k$(other instanceof LocalTime_0 ? other : THROW_CCE());
  };
  var Month_JANUARY_instance;
  var Month_FEBRUARY_instance;
  var Month_MARCH_instance;
  var Month_APRIL_instance;
  var Month_MAY_instance;
  var Month_JUNE_instance;
  var Month_JULY_instance;
  var Month_AUGUST_instance;
  var Month_SEPTEMBER_instance;
  var Month_OCTOBER_instance;
  var Month_NOVEMBER_instance;
  var Month_DECEMBER_instance;
  function values_0() {
    return [Month_JANUARY_getInstance(), Month_FEBRUARY_getInstance(), Month_MARCH_getInstance(), Month_APRIL_getInstance(), Month_MAY_getInstance(), Month_JUNE_getInstance(), Month_JULY_getInstance(), Month_AUGUST_getInstance(), Month_SEPTEMBER_getInstance(), Month_OCTOBER_getInstance(), Month_NOVEMBER_getInstance(), Month_DECEMBER_getInstance()];
  }
  function valueOf_0(value) {
    switch (value) {
      case 'JANUARY':
        return Month_JANUARY_getInstance();
      case 'FEBRUARY':
        return Month_FEBRUARY_getInstance();
      case 'MARCH':
        return Month_MARCH_getInstance();
      case 'APRIL':
        return Month_APRIL_getInstance();
      case 'MAY':
        return Month_MAY_getInstance();
      case 'JUNE':
        return Month_JUNE_getInstance();
      case 'JULY':
        return Month_JULY_getInstance();
      case 'AUGUST':
        return Month_AUGUST_getInstance();
      case 'SEPTEMBER':
        return Month_SEPTEMBER_getInstance();
      case 'OCTOBER':
        return Month_OCTOBER_getInstance();
      case 'NOVEMBER':
        return Month_NOVEMBER_getInstance();
      case 'DECEMBER':
        return Month_DECEMBER_getInstance();
      default:
        Month_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  var Month_entriesInitialized;
  function Month_initEntries() {
    if (Month_entriesInitialized)
      return Unit_getInstance();
    Month_entriesInitialized = true;
    Month_JANUARY_instance = new Month('JANUARY', 0);
    Month_FEBRUARY_instance = new Month('FEBRUARY', 1);
    Month_MARCH_instance = new Month('MARCH', 2);
    Month_APRIL_instance = new Month('APRIL', 3);
    Month_MAY_instance = new Month('MAY', 4);
    Month_JUNE_instance = new Month('JUNE', 5);
    Month_JULY_instance = new Month('JULY', 6);
    Month_AUGUST_instance = new Month('AUGUST', 7);
    Month_SEPTEMBER_instance = new Month('SEPTEMBER', 8);
    Month_OCTOBER_instance = new Month('OCTOBER', 9);
    Month_NOVEMBER_instance = new Month('NOVEMBER', 10);
    Month_DECEMBER_instance = new Month('DECEMBER', 11);
  }
  function Month(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function Month_JANUARY_getInstance() {
    Month_initEntries();
    return Month_JANUARY_instance;
  }
  function Month_FEBRUARY_getInstance() {
    Month_initEntries();
    return Month_FEBRUARY_instance;
  }
  function Month_MARCH_getInstance() {
    Month_initEntries();
    return Month_MARCH_instance;
  }
  function Month_APRIL_getInstance() {
    Month_initEntries();
    return Month_APRIL_instance;
  }
  function Month_MAY_getInstance() {
    Month_initEntries();
    return Month_MAY_instance;
  }
  function Month_JUNE_getInstance() {
    Month_initEntries();
    return Month_JUNE_instance;
  }
  function Month_JULY_getInstance() {
    Month_initEntries();
    return Month_JULY_instance;
  }
  function Month_AUGUST_getInstance() {
    Month_initEntries();
    return Month_AUGUST_instance;
  }
  function Month_SEPTEMBER_getInstance() {
    Month_initEntries();
    return Month_SEPTEMBER_instance;
  }
  function Month_OCTOBER_getInstance() {
    Month_initEntries();
    return Month_OCTOBER_instance;
  }
  function Month_NOVEMBER_getInstance() {
    Month_initEntries();
    return Month_NOVEMBER_instance;
  }
  function Month_DECEMBER_getInstance() {
    Month_initEntries();
    return Month_DECEMBER_instance;
  }
  //region block: init
  NANOS_PER_MILLI = 1000000;
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = LocalTime_init_$Create$;
  //endregion
  return _;
}));
