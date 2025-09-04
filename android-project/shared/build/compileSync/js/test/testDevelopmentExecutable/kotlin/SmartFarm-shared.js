(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js', './kotlinx-serialization-kotlinx-serialization-core.js', './kotlinx-serialization-kotlinx-serialization-json.js', './kotlinx.coroutines-kotlinx-coroutines-core-js-ir.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'), require('./kotlinx-serialization-kotlinx-serialization-core.js'), require('./kotlinx-serialization-kotlinx-serialization-json.js'), require('./kotlinx.coroutines-kotlinx-coroutines-core-js-ir.js'));
  else {
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'SmartFarm-shared'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'SmartFarm-shared'.");
    }
    if (typeof this['kotlinx-serialization-kotlinx-serialization-core'] === 'undefined') {
      throw new Error("Error loading module 'SmartFarm-shared'. Its dependency 'kotlinx-serialization-kotlinx-serialization-core' was not found. Please, check whether 'kotlinx-serialization-kotlinx-serialization-core' is loaded prior to 'SmartFarm-shared'.");
    }
    if (typeof this['kotlinx-serialization-kotlinx-serialization-json'] === 'undefined') {
      throw new Error("Error loading module 'SmartFarm-shared'. Its dependency 'kotlinx-serialization-kotlinx-serialization-json' was not found. Please, check whether 'kotlinx-serialization-kotlinx-serialization-json' is loaded prior to 'SmartFarm-shared'.");
    }
    if (typeof this['kotlinx.coroutines-kotlinx-coroutines-core-js-ir'] === 'undefined') {
      throw new Error("Error loading module 'SmartFarm-shared'. Its dependency 'kotlinx.coroutines-kotlinx-coroutines-core-js-ir' was not found. Please, check whether 'kotlinx.coroutines-kotlinx-coroutines-core-js-ir' is loaded prior to 'SmartFarm-shared'.");
    }
    root['SmartFarm-shared'] = factory(typeof this['SmartFarm-shared'] === 'undefined' ? {} : this['SmartFarm-shared'], this['kotlin-kotlin-stdlib'], this['kotlinx-serialization-kotlinx-serialization-core'], this['kotlinx-serialization-kotlinx-serialization-json'], this['kotlinx.coroutines-kotlinx-coroutines-core-js-ir']);
  }
}(this, function (_, kotlin_kotlin, kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core, kotlin_org_jetbrains_kotlinx_kotlinx_serialization_json, kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var THROW_IAE = kotlin_kotlin.$_$.kh;
  var enumEntries = kotlin_kotlin.$_$.mb;
  var Unit_getInstance = kotlin_kotlin.$_$.e5;
  var Enum = kotlin_kotlin.$_$.xg;
  var protoOf = kotlin_kotlin.$_$.id;
  var classMeta = kotlin_kotlin.$_$.xb;
  var setMetadataFor = kotlin_kotlin.$_$.jd;
  var objectMeta = kotlin_kotlin.$_$.hd;
  var Long = kotlin_kotlin.$_$.ch;
  var to = kotlin_kotlin.$_$.yi;
  var mapOf = kotlin_kotlin.$_$.c9;
  var ensureNotNull = kotlin_kotlin.$_$.di;
  var listOf = kotlin_kotlin.$_$.z8;
  var println = kotlin_kotlin.$_$.nb;
  var VOID = kotlin_kotlin.$_$.h;
  var getStringHashCode = kotlin_kotlin.$_$.jc;
  var getNumberHashCode = kotlin_kotlin.$_$.gc;
  var THROW_CCE = kotlin_kotlin.$_$.jh;
  var equals = kotlin_kotlin.$_$.bc;
  var getBooleanHashCode = kotlin_kotlin.$_$.ec;
  var toString = kotlin_kotlin.$_$.xi;
  var objectCreate = kotlin_kotlin.$_$.gd;
  var PluginGeneratedSerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.q1;
  var SerializerFactory = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.r1;
  var LongSerializer_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.l;
  var UnknownFieldException_init_$Create$ = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.c;
  var GeneratedSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.m1;
  var throwMissingFieldException = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.t1;
  var MutableMap = kotlin_kotlin.$_$.f6;
  var getKClass = kotlin_kotlin.$_$.e;
  var PrimitiveClasses_getInstance = kotlin_kotlin.$_$.v4;
  var arrayOf = kotlin_kotlin.$_$.yh;
  var createKType = kotlin_kotlin.$_$.b;
  var createInvariantKTypeProjection = kotlin_kotlin.$_$.a;
  var getStarKTypeProjection = kotlin_kotlin.$_$.f;
  var serializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.f2;
  var KSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.z1;
  var isInterface = kotlin_kotlin.$_$.vc;
  var toLong = kotlin_kotlin.$_$.ld;
  var Exception = kotlin_kotlin.$_$.zg;
  var hashCode = kotlin_kotlin.$_$.kc;
  var Json = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_json.$_$.a;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.z;
  var Collection = kotlin_kotlin.$_$.o5;
  var checkCountOverflow = kotlin_kotlin.$_$.q6;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.p;
  var collectionSizeOrDefault = kotlin_kotlin.$_$.t6;
  var ArrayList_init_$Create$_0 = kotlin_kotlin.$_$.o;
  var CoroutineImpl = kotlin_kotlin.$_$.fb;
  var delay = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.g;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.pa;
  var toList = kotlin_kotlin.$_$.ca;
  var compareTo = kotlin_kotlin.$_$.yb;
  var toLongOrNull = kotlin_kotlin.$_$.cg;
  var flatten = kotlin_kotlin.$_$.e8;
  var contains = kotlin_kotlin.$_$.df;
  var mutableListOf = kotlin_kotlin.$_$.d9;
  var Default_getInstance = kotlin_kotlin.$_$.u4;
  var numberRangeToNumber = kotlin_kotlin.$_$.bd;
  var random = kotlin_kotlin.$_$.he;
  var mapOf_0 = kotlin_kotlin.$_$.b9;
  var plus = kotlin_kotlin.$_$.g9;
  var step = kotlin_kotlin.$_$.je;
  var mapCapacity = kotlin_kotlin.$_$.a9;
  var LinkedHashMap_init_$Create$_0 = kotlin_kotlin.$_$.y;
  var plus_0 = kotlin_kotlin.$_$.j9;
  var emptyMap = kotlin_kotlin.$_$.r7;
  var MutableStateFlow = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.v;
  var asStateFlow = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.w;
  var emptyList = kotlin_kotlin.$_$.q7;
  var mutableMapOf = kotlin_kotlin.$_$.e9;
  var List = kotlin_kotlin.$_$.x5;
  var joinToString = kotlin_kotlin.$_$.o8;
  var Map = kotlin_kotlin.$_$.z5;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.mi;
  var toMutableMap = kotlin_kotlin.$_$.ga;
  var toMutableList = kotlin_kotlin.$_$.fa;
  var numberToLong = kotlin_kotlin.$_$.fd;
  //endregion
  //region block: pre-declaration
  setMetadataFor(Environment, 'Environment', classMeta, Enum);
  setMetadataFor(Endpoints, 'Endpoints', objectMeta);
  setMetadataFor(Settings, 'Settings', objectMeta);
  setMetadataFor(Features, 'Features', objectMeta);
  setMetadataFor(ApiConfig, 'ApiConfig', objectMeta);
  setMetadataFor(Crops, 'Crops', objectMeta);
  setMetadataFor(Livestock, 'Livestock', objectMeta);
  setMetadataFor(Equipment, 'Equipment', objectMeta);
  setMetadataFor(Tasks, 'Tasks', objectMeta);
  setMetadataFor(Financial, 'Financial', objectMeta);
  setMetadataFor(CategoryConfig, 'CategoryConfig', objectMeta);
  setMetadataFor(Crop, 'Crop', classMeta);
  setMetadataFor(CropStatus, 'CropStatus', classMeta, Enum);
  setMetadataFor(FarmStatus, 'FarmStatus', classMeta, Enum);
  setMetadataFor(Location, 'Location', classMeta);
  setMetadataFor(Farm, 'Farm', classMeta);
  setMetadataFor(FarmType, 'FarmType', classMeta, Enum);
  setMetadataFor(FinancialType, 'FinancialType', classMeta, Enum);
  setMetadataFor(FinancialCategory, 'FinancialCategory', classMeta, Enum);
  setMetadataFor(FinancialRecord, 'FinancialRecord', classMeta);
  setMetadataFor(InventoryItem, 'InventoryItem', classMeta);
  setMetadataFor(InventoryCategory, 'InventoryCategory', classMeta, Enum);
  setMetadataFor(LivestockStatus, 'LivestockStatus', classMeta, Enum);
  setMetadataFor(LivestockType, 'LivestockType', classMeta, Enum);
  setMetadataFor(Livestock_0, 'Livestock', classMeta);
  setMetadataFor(Task, 'Task', classMeta);
  setMetadataFor(TaskCategory, 'TaskCategory', classMeta, Enum);
  setMetadataFor(TaskStatus, 'TaskStatus', classMeta, Enum);
  setMetadataFor(TaskPriority, 'TaskPriority', classMeta, Enum);
  setMetadataFor(UserRole, 'UserRole', classMeta, Enum);
  setMetadataFor(User, 'User', classMeta);
  setMetadataFor(Companion, 'Companion', objectMeta, VOID, [SerializerFactory]);
  setMetadataFor($serializer, '$serializer', classMeta, VOID, [GeneratedSerializer]);
  setMetadataFor(CacheEntry, 'CacheEntry', classMeta, VOID, VOID, VOID, VOID, {0: Companion_getInstance});
  setMetadataFor(CacheStats, 'CacheStats', classMeta);
  setMetadataFor(Companion_0, 'Companion', objectMeta);
  setMetadataFor(CacheService, 'CacheService', classMeta, VOID, VOID, CacheService);
  setMetadataFor($getFarmsCOROUTINE$0, '$getFarmsCOROUTINE$0', classMeta, CoroutineImpl);
  setMetadataFor($getFarmCOROUTINE$1, '$getFarmCOROUTINE$1', classMeta, CoroutineImpl);
  setMetadataFor($createFarmCOROUTINE$2, '$createFarmCOROUTINE$2', classMeta, CoroutineImpl);
  setMetadataFor($updateFarmCOROUTINE$3, '$updateFarmCOROUTINE$3', classMeta, CoroutineImpl);
  setMetadataFor($deleteFarmCOROUTINE$4, '$deleteFarmCOROUTINE$4', classMeta, CoroutineImpl);
  setMetadataFor($getCropsCOROUTINE$5, '$getCropsCOROUTINE$5', classMeta, CoroutineImpl);
  setMetadataFor($getCropCOROUTINE$6, '$getCropCOROUTINE$6', classMeta, CoroutineImpl);
  setMetadataFor($createCropCOROUTINE$7, '$createCropCOROUTINE$7', classMeta, CoroutineImpl);
  setMetadataFor($updateCropCOROUTINE$8, '$updateCropCOROUTINE$8', classMeta, CoroutineImpl);
  setMetadataFor($deleteCropCOROUTINE$9, '$deleteCropCOROUTINE$9', classMeta, CoroutineImpl);
  setMetadataFor($addCropCOROUTINE$10, '$addCropCOROUTINE$10', classMeta, CoroutineImpl);
  setMetadataFor($getLivestockCOROUTINE$11, '$getLivestockCOROUTINE$11', classMeta, CoroutineImpl);
  setMetadataFor($getLivestockItemCOROUTINE$12, '$getLivestockItemCOROUTINE$12', classMeta, CoroutineImpl);
  setMetadataFor($createLivestockCOROUTINE$13, '$createLivestockCOROUTINE$13', classMeta, CoroutineImpl);
  setMetadataFor($addLivestockCOROUTINE$14, '$addLivestockCOROUTINE$14', classMeta, CoroutineImpl);
  setMetadataFor($updateLivestockCOROUTINE$15, '$updateLivestockCOROUTINE$15', classMeta, CoroutineImpl);
  setMetadataFor($deleteLivestockCOROUTINE$16, '$deleteLivestockCOROUTINE$16', classMeta, CoroutineImpl);
  setMetadataFor($getTasksCOROUTINE$17, '$getTasksCOROUTINE$17', classMeta, CoroutineImpl);
  setMetadataFor($getTaskCOROUTINE$18, '$getTaskCOROUTINE$18', classMeta, CoroutineImpl);
  setMetadataFor($createTaskCOROUTINE$19, '$createTaskCOROUTINE$19', classMeta, CoroutineImpl);
  setMetadataFor($updateTaskCOROUTINE$20, '$updateTaskCOROUTINE$20', classMeta, CoroutineImpl);
  setMetadataFor($deleteTaskCOROUTINE$21, '$deleteTaskCOROUTINE$21', classMeta, CoroutineImpl);
  setMetadataFor($updateTaskStatusCOROUTINE$22, '$updateTaskStatusCOROUTINE$22', classMeta, CoroutineImpl);
  setMetadataFor($getUsersCOROUTINE$23, '$getUsersCOROUTINE$23', classMeta, CoroutineImpl);
  setMetadataFor($getUserCOROUTINE$24, '$getUserCOROUTINE$24', classMeta, CoroutineImpl);
  setMetadataFor($createUserCOROUTINE$25, '$createUserCOROUTINE$25', classMeta, CoroutineImpl);
  setMetadataFor($updateUserCOROUTINE$26, '$updateUserCOROUTINE$26', classMeta, CoroutineImpl);
  setMetadataFor($deleteUserCOROUTINE$27, '$deleteUserCOROUTINE$27', classMeta, CoroutineImpl);
  setMetadataFor($getInventoryCOROUTINE$28, '$getInventoryCOROUTINE$28', classMeta, CoroutineImpl);
  setMetadataFor($getInventoryItemCOROUTINE$29, '$getInventoryItemCOROUTINE$29', classMeta, CoroutineImpl);
  setMetadataFor($createInventoryItemCOROUTINE$30, '$createInventoryItemCOROUTINE$30', classMeta, CoroutineImpl);
  setMetadataFor($updateInventoryItemCOROUTINE$31, '$updateInventoryItemCOROUTINE$31', classMeta, CoroutineImpl);
  setMetadataFor($deleteInventoryItemCOROUTINE$32, '$deleteInventoryItemCOROUTINE$32', classMeta, CoroutineImpl);
  setMetadataFor($getFinancialRecordsCOROUTINE$33, '$getFinancialRecordsCOROUTINE$33', classMeta, CoroutineImpl);
  setMetadataFor($addFinancialRecordCOROUTINE$34, '$addFinancialRecordCOROUTINE$34', classMeta, CoroutineImpl);
  setMetadataFor($getFarmStatsCOROUTINE$35, '$getFarmStatsCOROUTINE$35', classMeta, CoroutineImpl);
  setMetadataFor(DataService, 'DataService', classMeta, VOID, VOID, DataService, VOID, VOID, [0, 1, 2]);
  setMetadataFor($uploadFileCOROUTINE$36, '$uploadFileCOROUTINE$36', classMeta, CoroutineImpl);
  setMetadataFor(FileUploadService, 'FileUploadService', classMeta, VOID, VOID, FileUploadService, VOID, VOID, [5, 1]);
  setMetadataFor(UploadProgress, 'UploadProgress', classMeta);
  setMetadataFor(UploadedFile, 'UploadedFile', classMeta);
  setMetadataFor(UploadResult, 'UploadResult', classMeta);
  setMetadataFor(Success, 'Success', classMeta, UploadResult);
  setMetadataFor(Failure, 'Failure', classMeta, UploadResult);
  setMetadataFor(FileType, 'FileType', classMeta, Enum);
  setMetadataFor(FileCategory, 'FileCategory', classMeta, Enum);
  setMetadataFor(UploadStatus, 'UploadStatus', classMeta, Enum);
  setMetadataFor($getCOROUTINE$37, '$getCOROUTINE$37', classMeta, CoroutineImpl);
  setMetadataFor($postCOROUTINE$38, '$postCOROUTINE$38', classMeta, CoroutineImpl);
  setMetadataFor($putCOROUTINE$39, '$putCOROUTINE$39', classMeta, CoroutineImpl);
  setMetadataFor($deleteCOROUTINE$40, '$deleteCOROUTINE$40', classMeta, CoroutineImpl);
  setMetadataFor($testConnectionCOROUTINE$41, '$testConnectionCOROUTINE$41', classMeta, CoroutineImpl);
  setMetadataFor(HttpClient, 'HttpClient', classMeta, VOID, VOID, HttpClient, VOID, VOID, [3, 4, 0]);
  setMetadataFor(HttpResponse, 'HttpResponse', classMeta);
  setMetadataFor($getFarmsCOROUTINE$42, '$getFarmsCOROUTINE$42', classMeta, CoroutineImpl);
  setMetadataFor($getFarmCOROUTINE$43, '$getFarmCOROUTINE$43', classMeta, CoroutineImpl);
  setMetadataFor($createFarmCOROUTINE$44, '$createFarmCOROUTINE$44', classMeta, CoroutineImpl);
  setMetadataFor($updateFarmCOROUTINE$45, '$updateFarmCOROUTINE$45', classMeta, CoroutineImpl);
  setMetadataFor($deleteFarmCOROUTINE$46, '$deleteFarmCOROUTINE$46', classMeta, CoroutineImpl);
  setMetadataFor($getCropsCOROUTINE$47, '$getCropsCOROUTINE$47', classMeta, CoroutineImpl);
  setMetadataFor($getLivestockCOROUTINE$48, '$getLivestockCOROUTINE$48', classMeta, CoroutineImpl);
  setMetadataFor($getTasksCOROUTINE$49, '$getTasksCOROUTINE$49', classMeta, CoroutineImpl);
  setMetadataFor($getUsersCOROUTINE$50, '$getUsersCOROUTINE$50', classMeta, CoroutineImpl);
  setMetadataFor($getInventoryCOROUTINE$51, '$getInventoryCOROUTINE$51', classMeta, CoroutineImpl);
  setMetadataFor($getFinancialRecordsCOROUTINE$52, '$getFinancialRecordsCOROUTINE$52', classMeta, CoroutineImpl);
  setMetadataFor($getFarmStatsCOROUTINE$53, '$getFarmStatsCOROUTINE$53', classMeta, CoroutineImpl);
  setMetadataFor(RealApiService, 'RealApiService', classMeta, DataService, VOID, RealApiService, VOID, VOID, [0, 1, 2]);
  setMetadataFor(ServiceType, 'ServiceType', classMeta, Enum);
  setMetadataFor($testAllServicesCOROUTINE$0, '$testAllServicesCOROUTINE$0', classMeta, CoroutineImpl);
  setMetadataFor(ServiceFactory, 'ServiceFactory', objectMeta, VOID, VOID, VOID, VOID, VOID, [0]);
  setMetadataFor($connectCOROUTINE$55, '$connectCOROUTINE$55', classMeta, CoroutineImpl);
  setMetadataFor($disconnectCOROUTINE$56, '$disconnectCOROUTINE$56', classMeta, CoroutineImpl);
  setMetadataFor($simulateSensorDataCOROUTINE$57, '$simulateSensorDataCOROUTINE$57', classMeta, CoroutineImpl);
  setMetadataFor(WebSocketService, 'WebSocketService', classMeta, VOID, VOID, WebSocketService, VOID, VOID, [1, 0]);
  setMetadataFor(ConnectionStatus, 'ConnectionStatus', classMeta, Enum);
  setMetadataFor(SensorData, 'SensorData', classMeta);
  setMetadataFor(FarmAlert, 'FarmAlert', classMeta);
  setMetadataFor(Notification, 'Notification', classMeta);
  setMetadataFor(AlertType, 'AlertType', classMeta, Enum);
  setMetadataFor(AlertSeverity, 'AlertSeverity', classMeta, Enum);
  setMetadataFor(NotificationType, 'NotificationType', classMeta, Enum);
  //endregion
  var Environment_DEVELOPMENT_instance;
  var Environment_STAGING_instance;
  var Environment_PRODUCTION_instance;
  function values() {
    return [Environment_DEVELOPMENT_getInstance(), Environment_STAGING_getInstance(), Environment_PRODUCTION_getInstance()];
  }
  function valueOf(value) {
    switch (value) {
      case 'DEVELOPMENT':
        return Environment_DEVELOPMENT_getInstance();
      case 'STAGING':
        return Environment_STAGING_getInstance();
      case 'PRODUCTION':
        return Environment_PRODUCTION_getInstance();
      default:
        Environment_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  function get_entries() {
    if ($ENTRIES == null)
      $ENTRIES = enumEntries(values());
    return $ENTRIES;
  }
  var Environment_entriesInitialized;
  function Environment_initEntries() {
    if (Environment_entriesInitialized)
      return Unit_getInstance();
    Environment_entriesInitialized = true;
    Environment_DEVELOPMENT_instance = new Environment('DEVELOPMENT', 0);
    Environment_STAGING_instance = new Environment('STAGING', 1);
    Environment_PRODUCTION_instance = new Environment('PRODUCTION', 2);
  }
  var $ENTRIES;
  function get_$stableprop() {
    return 0;
  }
  function get_$stableprop_0() {
    return 0;
  }
  function get_$stableprop_1() {
    return 0;
  }
  function Environment(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function _get_baseUrls__5oqhuy($this) {
    return $this.baseUrls_1;
  }
  function Endpoints() {
    Endpoints_instance = this;
    this.LOGIN_1 = '/auth/login';
    this.REGISTER_1 = '/auth/register';
    this.PROFILE_1 = '/auth/profile';
    this.REFRESH_TOKEN_1 = '/auth/refresh';
    this.FARMS_1 = '/farms';
    this.CROPS_1 = '/crops';
    this.LIVESTOCK_1 = '/livestock';
    this.TASKS_1 = '/tasks';
    this.USERS_1 = '/users';
    this.INVENTORY_1 = '/inventory';
    this.FINANCIAL_1 = '/financial';
    this.ANALYTICS_1 = '/analytics';
    this.WEATHER_1 = '/weather';
    this.DOCUMENTS_1 = '/documents';
    this.HEALTH_1 = '/health';
    this.API_DOCS_1 = '/docs';
    this.$stable_1 = 0;
  }
  protoOf(Endpoints).get_LOGIN_iclr8g_k$ = function () {
    return this.LOGIN_1;
  };
  protoOf(Endpoints).get_REGISTER_u9wzv8_k$ = function () {
    return this.REGISTER_1;
  };
  protoOf(Endpoints).get_PROFILE_80sqlc_k$ = function () {
    return this.PROFILE_1;
  };
  protoOf(Endpoints).get_REFRESH_TOKEN_t8om38_k$ = function () {
    return this.REFRESH_TOKEN_1;
  };
  protoOf(Endpoints).get_FARMS_i92a44_k$ = function () {
    return this.FARMS_1;
  };
  protoOf(Endpoints).get_CROPS_i7poyi_k$ = function () {
    return this.CROPS_1;
  };
  protoOf(Endpoints).get_LIVESTOCK_k7ftt_k$ = function () {
    return this.LIVESTOCK_1;
  };
  protoOf(Endpoints).get_TASKS_igrf45_k$ = function () {
    return this.TASKS_1;
  };
  protoOf(Endpoints).get_USERS_ihmf9b_k$ = function () {
    return this.USERS_1;
  };
  protoOf(Endpoints).get_INVENTORY_l6kqz7_k$ = function () {
    return this.INVENTORY_1;
  };
  protoOf(Endpoints).get_FINANCIAL_ain70g_k$ = function () {
    return this.FINANCIAL_1;
  };
  protoOf(Endpoints).get_ANALYTICS_qllz25_k$ = function () {
    return this.ANALYTICS_1;
  };
  protoOf(Endpoints).get_WEATHER_xdfdnv_k$ = function () {
    return this.WEATHER_1;
  };
  protoOf(Endpoints).get_DOCUMENTS_trg29_k$ = function () {
    return this.DOCUMENTS_1;
  };
  protoOf(Endpoints).get_HEALTH_1fy6jf_k$ = function () {
    return this.HEALTH_1;
  };
  protoOf(Endpoints).get_API_DOCS_2domaf_k$ = function () {
    return this.API_DOCS_1;
  };
  var Endpoints_instance;
  function Endpoints_getInstance() {
    if (Endpoints_instance == null)
      new Endpoints();
    return Endpoints_instance;
  }
  function Settings() {
    Settings_instance = this;
    this.TIMEOUT_SECONDS_1 = new Long(30, 0);
    this.RETRY_ATTEMPTS_1 = 3;
    this.CACHE_DURATION_MINUTES_1 = new Long(5, 0);
    this.CONTENT_TYPE_1 = 'application/json';
    this.ACCEPT_1 = 'application/json';
    this.USER_AGENT_1 = 'SmartFarm-Mobile/1.0.0';
    this.$stable_1 = 0;
  }
  protoOf(Settings).get_TIMEOUT_SECONDS_aiy35k_k$ = function () {
    return this.TIMEOUT_SECONDS_1;
  };
  protoOf(Settings).get_RETRY_ATTEMPTS_ty6k0q_k$ = function () {
    return this.RETRY_ATTEMPTS_1;
  };
  protoOf(Settings).get_CACHE_DURATION_MINUTES_uafrty_k$ = function () {
    return this.CACHE_DURATION_MINUTES_1;
  };
  protoOf(Settings).get_CONTENT_TYPE_dx1lxz_k$ = function () {
    return this.CONTENT_TYPE_1;
  };
  protoOf(Settings).get_ACCEPT_4sbzsf_k$ = function () {
    return this.ACCEPT_1;
  };
  protoOf(Settings).get_USER_AGENT_ypt5h6_k$ = function () {
    return this.USER_AGENT_1;
  };
  var Settings_instance;
  function Settings_getInstance() {
    if (Settings_instance == null)
      new Settings();
    return Settings_instance;
  }
  function Features() {
    Features_instance = this;
    this.ENABLE_CACHING_1 = true;
    this.ENABLE_OFFLINE_MODE_1 = true;
    this.ENABLE_REAL_TIME_UPDATES_1 = true;
    this.ENABLE_FILE_UPLOADS_1 = true;
    this.ENABLE_PUSH_NOTIFICATIONS_1 = true;
    this.$stable_1 = 0;
  }
  protoOf(Features).get_ENABLE_CACHING_m92c5w_k$ = function () {
    return this.ENABLE_CACHING_1;
  };
  protoOf(Features).get_ENABLE_OFFLINE_MODE_ilo1hq_k$ = function () {
    return this.ENABLE_OFFLINE_MODE_1;
  };
  protoOf(Features).get_ENABLE_REAL_TIME_UPDATES_uaepx6_k$ = function () {
    return this.ENABLE_REAL_TIME_UPDATES_1;
  };
  protoOf(Features).get_ENABLE_FILE_UPLOADS_n77xqa_k$ = function () {
    return this.ENABLE_FILE_UPLOADS_1;
  };
  protoOf(Features).get_ENABLE_PUSH_NOTIFICATIONS_c4fh86_k$ = function () {
    return this.ENABLE_PUSH_NOTIFICATIONS_1;
  };
  var Features_instance;
  function Features_getInstance() {
    if (Features_instance == null)
      new Features();
    return Features_instance;
  }
  function get_$stableprop_2() {
    return 8;
  }
  function Environment_DEVELOPMENT_getInstance() {
    Environment_initEntries();
    return Environment_DEVELOPMENT_instance;
  }
  function Environment_STAGING_getInstance() {
    Environment_initEntries();
    return Environment_STAGING_instance;
  }
  function Environment_PRODUCTION_getInstance() {
    Environment_initEntries();
    return Environment_PRODUCTION_instance;
  }
  function ApiConfig() {
    ApiConfig_instance = this;
    this.currentEnvironment_1 = Environment_PRODUCTION_getInstance();
    this.baseUrls_1 = mapOf([to(Environment_DEVELOPMENT_getInstance(), 'http://localhost:3000/api'), to(Environment_STAGING_getInstance(), 'https://staging-api.smartfarm.com/api'), to(Environment_PRODUCTION_getInstance(), 'https://api.smartfarm.com/api')]);
    this.$stable_1 = 8;
  }
  protoOf(ApiConfig).get_currentEnvironment_c7ogv7_k$ = function () {
    return this.currentEnvironment_1;
  };
  protoOf(ApiConfig).get_baseUrl_48hdl7_k$ = function () {
    var tmp0_elvis_lhs = this.baseUrls_1.get_wei43m_k$(this.currentEnvironment_1);
    return tmp0_elvis_lhs == null ? ensureNotNull(this.baseUrls_1.get_wei43m_k$(Environment_DEVELOPMENT_getInstance())) : tmp0_elvis_lhs;
  };
  protoOf(ApiConfig).getDebugInfo_3fxx5h_k$ = function () {
    return mapOf([to('Environment', this.currentEnvironment_1.get_name_woqyms_k$()), to('Base URL', this.get_baseUrl_48hdl7_k$()), to('Timeout', '30s'), to('Retry Attempts', '3'), to('Caching Enabled', 'true'), to('Offline Mode', 'true')]);
  };
  var ApiConfig_instance;
  function ApiConfig_getInstance() {
    if (ApiConfig_instance == null)
      new ApiConfig();
    return ApiConfig_instance;
  }
  function get_$stableprop_3() {
    return 0;
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
  function get_$stableprop_7() {
    return 0;
  }
  function Crops() {
    Crops_instance = this;
    this.GRAINS_1 = listOf(['corn', 'wheat', 'barley', 'oats', 'rice', 'sorghum', 'millet']);
    this.LEGUMES_1 = listOf(['soybean', 'peas', 'beans', 'lentils', 'chickpeas', 'alfalfa']);
    this.VEGETABLES_1 = listOf(['tomato', 'lettuce', 'carrot', 'potato', 'onion', 'pepper', 'cucumber']);
    this.FRUITS_1 = listOf(['apple', 'orange', 'peach', 'strawberry', 'blueberry', 'raspberry']);
    this.HERBS_1 = listOf(['basil', 'mint', 'rosemary', 'thyme', 'oregano', 'sage', 'parsley']);
    this.FLOWERS_1 = listOf(['rose', 'tulip', 'sunflower', 'daisy', 'lily', 'orchid', 'marigold']);
    this.TREES_1 = listOf(['apple', 'orange', 'peach', 'cherry', 'plum', 'pear', 'apricot']);
    this.NUTS_1 = listOf(['almond', 'walnut', 'pecan', 'hazelnut', 'pistachio', 'cashew']);
    this.ROOTS_1 = listOf(['carrot', 'potato', 'sweet potato', 'turnip', 'radish', 'beet']);
    this.LEAFY_GREENS_1 = listOf(['lettuce', 'spinach', 'kale', 'chard', 'collard', 'arugula']);
    this.ORGANIC_1 = listOf(['organic', 'natural', 'pesticide-free']);
    this.HEIRLOOM_1 = listOf(['heirloom', 'heritage', 'traditional']);
    this.HYBRID_1 = listOf(['hybrid', 'cross-bred', 'improved']);
    this.SEASONAL_1 = listOf(['spring', 'summer', 'fall', 'winter', 'early', 'late']);
    this.PERENNIAL_1 = listOf(['tree', 'bush', 'vine', 'perennial', 'long-term']);
    this.ANNUAL_1 = listOf(['annual', 'yearly', 'seasonal', 'temporary']);
    this.HYDROPONIC_1 = listOf(['hydroponic', 'hydroponics', 'soilless', 'water-based']);
    this.VERTICAL_1 = listOf(['vertical', 'tower', 'stacked', 'multi-level']);
    this.AEROPONIC_1 = listOf(['aeroponic', 'aeroponics', 'air-grown', 'mist-grown']);
    this.MICROGREENS_1 = listOf(['microgreen', 'microgreens', 'sprout', 'baby green']);
    this.MEDICINAL_1 = listOf(['medicinal', 'herbal', 'therapeutic', 'healing']);
    this.SPICE_1 = listOf(['spice', 'seasoning', 'condiment', 'flavoring']);
    this.TEA_1 = listOf(['tea', 'camellia', 'herbal tea', 'infusion']);
    this.COFFEE_1 = listOf(['coffee', 'arabica', 'robusta', 'coffee bean']);
    this.CACAO_1 = listOf(['cacao', 'chocolate', 'cocoa', 'theobroma']);
    this.VANILLA_1 = listOf(['vanilla', 'vanilla bean', 'orchid', 'flavoring']);
    this.SAFFRON_1 = listOf(['saffron', 'crocus', 'spice', 'expensive']);
    this.TRUFFLE_1 = listOf(['truffle', 'fungus', 'underground', 'delicacy']);
    this.MUSHROOM_1 = listOf(['mushroom', 'fungi', 'mycelium', 'edible fungus']);
    this.ALGAE_1 = listOf(['algae', 'spirulina', 'chlorella', 'seaweed']);
    this.AQUAPONIC_1 = listOf(['aquaponic', 'aquaponics', 'fish-plant', 'symbiotic']);
    this.$stable_1 = 0;
  }
  protoOf(Crops).get_GRAINS_1pujkv_k$ = function () {
    return this.GRAINS_1;
  };
  protoOf(Crops).get_LEGUMES_e2lvez_k$ = function () {
    return this.LEGUMES_1;
  };
  protoOf(Crops).get_VEGETABLES_rgfmrf_k$ = function () {
    return this.VEGETABLES_1;
  };
  protoOf(Crops).get_FRUITS_26je3c_k$ = function () {
    return this.FRUITS_1;
  };
  protoOf(Crops).get_HERBS_ia8ezh_k$ = function () {
    return this.HERBS_1;
  };
  protoOf(Crops).get_FLOWERS_h31wv_k$ = function () {
    return this.FLOWERS_1;
  };
  protoOf(Crops).get_TREES_ih1zd8_k$ = function () {
    return this.TREES_1;
  };
  protoOf(Crops).get_NUTS_wo69jj_k$ = function () {
    return this.NUTS_1;
  };
  protoOf(Crops).get_ROOTS_ifwozs_k$ = function () {
    return this.ROOTS_1;
  };
  protoOf(Crops).get_LEAFY_GREENS_k5i7ml_k$ = function () {
    return this.LEAFY_GREENS_1;
  };
  protoOf(Crops).get_ORGANIC_6s2zoe_k$ = function () {
    return this.ORGANIC_1;
  };
  protoOf(Crops).get_HEIRLOOM_xasots_k$ = function () {
    return this.HEIRLOOM_1;
  };
  protoOf(Crops).get_HYBRID_14xji3_k$ = function () {
    return this.HYBRID_1;
  };
  protoOf(Crops).get_SEASONAL_454zqh_k$ = function () {
    return this.SEASONAL_1;
  };
  protoOf(Crops).get_PERENNIAL_8yqdy5_k$ = function () {
    return this.PERENNIAL_1;
  };
  protoOf(Crops).get_ANNUAL_4m2wwo_k$ = function () {
    return this.ANNUAL_1;
  };
  protoOf(Crops).get_HYDROPONIC_3iegxu_k$ = function () {
    return this.HYDROPONIC_1;
  };
  protoOf(Crops).get_VERTICAL_jctoov_k$ = function () {
    return this.VERTICAL_1;
  };
  protoOf(Crops).get_AEROPONIC_hzu61r_k$ = function () {
    return this.AEROPONIC_1;
  };
  protoOf(Crops).get_MICROGREENS_x3rjed_k$ = function () {
    return this.MICROGREENS_1;
  };
  protoOf(Crops).get_MEDICINAL_j0bh2l_k$ = function () {
    return this.MEDICINAL_1;
  };
  protoOf(Crops).get_SPICE_iggzph_k$ = function () {
    return this.SPICE_1;
  };
  protoOf(Crops).get_TEA_18jk3d_k$ = function () {
    return this.TEA_1;
  };
  protoOf(Crops).get_COFFEE_3nlagb_k$ = function () {
    return this.COFFEE_1;
  };
  protoOf(Crops).get_CACAO_i7ekx6_k$ = function () {
    return this.CACAO_1;
  };
  protoOf(Crops).get_VANILLA_gzszua_k$ = function () {
    return this.VANILLA_1;
  };
  protoOf(Crops).get_SAFFRON_r5u006_k$ = function () {
    return this.SAFFRON_1;
  };
  protoOf(Crops).get_TRUFFLE_47fh5l_k$ = function () {
    return this.TRUFFLE_1;
  };
  protoOf(Crops).get_MUSHROOM_4wtxwf_k$ = function () {
    return this.MUSHROOM_1;
  };
  protoOf(Crops).get_ALGAE_i6i3jr_k$ = function () {
    return this.ALGAE_1;
  };
  protoOf(Crops).get_AQUAPONIC_owsbx8_k$ = function () {
    return this.AQUAPONIC_1;
  };
  var Crops_instance;
  function Crops_getInstance() {
    if (Crops_instance == null)
      new Crops();
    return Crops_instance;
  }
  function Livestock() {
    Livestock_instance = this;
    this.CATTLE_1 = listOf(['cow', 'bull', 'calf', 'heifer', 'steer']);
    this.POULTRY_1 = listOf(['chicken', 'turkey', 'duck', 'goose', 'quail', 'pheasant']);
    this.GOATS_1 = listOf(['goat', 'kid', 'doe', 'buck']);
    this.HORSES_1 = listOf(['horse', 'mare', 'stallion', 'foal', 'gelding']);
    this.SHEEP_1 = listOf(['sheep', 'lamb', 'ewe', 'ram']);
    this.PIGS_1 = listOf(['pig', 'hog', 'sow', 'boar', 'piglet']);
    this.FISH_1 = listOf(['fish', 'trout', 'salmon', 'tilapia', 'catfish', 'bass']);
    this.BEES_1 = listOf(['bee', 'honeybee', 'bumblebee', 'queen', 'worker', 'drone']);
    this.PETS_1 = listOf(['dog', 'cat', 'rabbit', 'hamster', 'guinea pig']);
    this.EXOTIC_1 = listOf(['llama', 'alpaca', 'emu', 'ostrich', 'deer', 'elk']);
    this.DAIRY_1 = listOf(['dairy', 'milk', 'cheese', 'yogurt']);
    this.MEAT_1 = listOf(['meat', 'beef', 'pork', 'lamb', 'chicken']);
    this.EGG_LAYING_1 = listOf(['egg', 'laying', 'productive', 'breeder']);
    this.WORKING_1 = listOf(['working', 'draft', 'herding', 'guard']);
    this.INSECTS_1 = listOf(['insect', 'cricket', 'mealworm', 'black soldier fly', 'silkworm']);
    this.CRUSTACEANS_1 = listOf(['crustacean', 'shrimp', 'crayfish', 'lobster', 'crab']);
    this.MOLLUSKS_1 = listOf(['mollusk', 'oyster', 'mussel', 'clam', 'snail']);
    this.REPTILES_1 = listOf(['reptile', 'turtle', 'lizard', 'snake', 'gecko']);
    this.AMPHIBIANS_1 = listOf(['amphibian', 'frog', 'toad', 'salamander', 'newt']);
    this.BIRDS_OF_PREY_1 = listOf(['raptor', 'eagle', 'hawk', 'falcon', 'owl']);
    this.WATERFOWL_1 = listOf(['waterfowl', 'duck', 'goose', 'swan', 'pelican']);
    this.GAME_BIRDS_1 = listOf(['game bird', 'pheasant', 'quail', 'partridge', 'grouse']);
    this.RODENTS_1 = listOf(['rodent', 'rabbit', 'hamster', 'guinea pig', 'rat']);
    this.CAMELIDS_1 = listOf(['camelid', 'llama', 'alpaca', 'camel', 'vicu\xF1a']);
    this.DEER_FAMILY_1 = listOf(['deer', 'elk', 'moose', 'caribou', 'reindeer']);
    this.ANTELOPE_1 = listOf(['antelope', 'gazelle', 'impala', 'springbok', 'oryx']);
    this.$stable_1 = 0;
  }
  protoOf(Livestock).get_CATTLE_3v16e8_k$ = function () {
    return this.CATTLE_1;
  };
  protoOf(Livestock).get_POULTRY_6p2p7g_k$ = function () {
    return this.POULTRY_1;
  };
  protoOf(Livestock).get_GOATS_i9uo33_k$ = function () {
    return this.GOATS_1;
  };
  protoOf(Livestock).get_HORSES_1a58zl_k$ = function () {
    return this.HORSES_1;
  };
  protoOf(Livestock).get_SHEEP_igbswi_k$ = function () {
    return this.SHEEP_1;
  };
  protoOf(Livestock).get_PIGS_wo7ab2_k$ = function () {
    return this.PIGS_1;
  };
  protoOf(Livestock).get_FISH_wo0wpt_k$ = function () {
    return this.FISH_1;
  };
  protoOf(Livestock).get_BEES_wny9h6_k$ = function () {
    return this.BEES_1;
  };
  protoOf(Livestock).get_PETS_wo77nh_k$ = function () {
    return this.PETS_1;
  };
  protoOf(Livestock).get_EXOTIC_2kduyt_k$ = function () {
    return this.EXOTIC_1;
  };
  protoOf(Livestock).get_DAIRY_i7yidm_k$ = function () {
    return this.DAIRY_1;
  };
  protoOf(Livestock).get_MEAT_wo5a8k_k$ = function () {
    return this.MEAT_1;
  };
  protoOf(Livestock).get_EGG_LAYING_pf49wf_k$ = function () {
    return this.EGG_LAYING_1;
  };
  protoOf(Livestock).get_WORKING_wo1o7s_k$ = function () {
    return this.WORKING_1;
  };
  protoOf(Livestock).get_INSECTS_piv9fi_k$ = function () {
    return this.INSECTS_1;
  };
  protoOf(Livestock).get_CRUSTACEANS_908qkh_k$ = function () {
    return this.CRUSTACEANS_1;
  };
  protoOf(Livestock).get_MOLLUSKS_p75rtb_k$ = function () {
    return this.MOLLUSKS_1;
  };
  protoOf(Livestock).get_REPTILES_pun7lb_k$ = function () {
    return this.REPTILES_1;
  };
  protoOf(Livestock).get_AMPHIBIANS_cr9yjn_k$ = function () {
    return this.AMPHIBIANS_1;
  };
  protoOf(Livestock).get_BIRDS_OF_PREY_mmncpc_k$ = function () {
    return this.BIRDS_OF_PREY_1;
  };
  protoOf(Livestock).get_WATERFOWL_jypfx0_k$ = function () {
    return this.WATERFOWL_1;
  };
  protoOf(Livestock).get_GAME_BIRDS_is80ja_k$ = function () {
    return this.GAME_BIRDS_1;
  };
  protoOf(Livestock).get_RODENTS_z8pvq2_k$ = function () {
    return this.RODENTS_1;
  };
  protoOf(Livestock).get_CAMELIDS_lc4zxx_k$ = function () {
    return this.CAMELIDS_1;
  };
  protoOf(Livestock).get_DEER_FAMILY_4huavo_k$ = function () {
    return this.DEER_FAMILY_1;
  };
  protoOf(Livestock).get_ANTELOPE_qx4vmp_k$ = function () {
    return this.ANTELOPE_1;
  };
  var Livestock_instance;
  function Livestock_getInstance() {
    if (Livestock_instance == null)
      new Livestock();
    return Livestock_instance;
  }
  function Equipment() {
    Equipment_instance = this;
    this.TRACTORS_1 = listOf(['tractor', 'combine', 'harvester', 'planter']);
    this.IRRIGATION_1 = listOf(['irrigation', 'drip', 'sprinkler', 'pump', 'hose']);
    this.GREENHOUSE_1 = listOf(['greenhouse', 'polyhouse', 'shade house', 'tunnel']);
    this.TOOLS_1 = listOf(['shovel', 'rake', 'hoe', 'pruner', 'shears', 'saw']);
    this.MACHINERY_1 = listOf(['mill', 'grinder', 'mixer', 'conveyor', 'elevator']);
    this.MONITORING_1 = listOf(['sensor', 'camera', 'thermometer', 'hygrometer', 'ph meter']);
    this.STORAGE_1 = listOf(['silo', 'barn', 'warehouse', 'container', 'tank']);
    this.TRANSPORT_1 = listOf(['truck', 'trailer', 'wagon', 'cart', 'wheelbarrow']);
    this.AUTOMATION_1 = listOf(['automated', 'robotic', 'smart', 'ai-powered']);
    this.SOLAR_1 = listOf(['solar', 'renewable', 'green energy', 'sustainable']);
    this.PRECISION_1 = listOf(['precision', 'gps', 'mapping', 'variable rate']);
    this.DRONES_1 = listOf(['drone', 'uav', 'quadcopter', 'aerial', 'flying']);
    this.ROBOTICS_1 = listOf(['robot', 'robotic', 'automated', 'mechanical', 'arm']);
    this.SENSORS_1 = listOf(['sensor', 'detector', 'monitor', 'probe', 'gauge']);
    this.CAMERAS_1 = listOf(['camera', 'imaging', 'surveillance', 'monitoring', 'recording']);
    this.IOT_DEVICES_1 = listOf(['iot', 'internet of things', 'connected', 'wireless', 'smart']);
    this.AI_SYSTEMS_1 = listOf(['ai', 'artificial intelligence', 'machine learning', 'neural network']);
    this.BLOCKCHAIN_1 = listOf(['blockchain', 'distributed ledger', 'cryptocurrency', 'smart contract']);
    this.CLOUD_SYSTEMS_1 = listOf(['cloud', 'remote', 'online', 'web-based', 'saas']);
    this.MOBILE_APPS_1 = listOf(['mobile', 'app', 'smartphone', 'tablet', 'portable']);
    this.WEARABLE_TECH_1 = listOf(['wearable', 'smartwatch', 'fitness tracker', 'headset', 'glasses']);
    this.$stable_1 = 0;
  }
  protoOf(Equipment).get_TRACTORS_25liw5_k$ = function () {
    return this.TRACTORS_1;
  };
  protoOf(Equipment).get_IRRIGATION_kayfzd_k$ = function () {
    return this.IRRIGATION_1;
  };
  protoOf(Equipment).get_GREENHOUSE_hlwi9m_k$ = function () {
    return this.GREENHOUSE_1;
  };
  protoOf(Equipment).get_TOOLS_ih09zm_k$ = function () {
    return this.TOOLS_1;
  };
  protoOf(Equipment).get_MACHINERY_upzked_k$ = function () {
    return this.MACHINERY_1;
  };
  protoOf(Equipment).get_MONITORING_ih8udt_k$ = function () {
    return this.MONITORING_1;
  };
  protoOf(Equipment).get_STORAGE_i0tq4u_k$ = function () {
    return this.STORAGE_1;
  };
  protoOf(Equipment).get_TRANSPORT_zdu8w_k$ = function () {
    return this.TRANSPORT_1;
  };
  protoOf(Equipment).get_AUTOMATION_6gig68_k$ = function () {
    return this.AUTOMATION_1;
  };
  protoOf(Equipment).get_SOLAR_iggewo_k$ = function () {
    return this.SOLAR_1;
  };
  protoOf(Equipment).get_PRECISION_vu8yid_k$ = function () {
    return this.PRECISION_1;
  };
  protoOf(Equipment).get_DRONES_34qdgc_k$ = function () {
    return this.DRONES_1;
  };
  protoOf(Equipment).get_ROBOTICS_ru377s_k$ = function () {
    return this.ROBOTICS_1;
  };
  protoOf(Equipment).get_SENSORS_p50x00_k$ = function () {
    return this.SENSORS_1;
  };
  protoOf(Equipment).get_CAMERAS_m83l5x_k$ = function () {
    return this.CAMERAS_1;
  };
  protoOf(Equipment).get_IOT_DEVICES_gfygal_k$ = function () {
    return this.IOT_DEVICES_1;
  };
  protoOf(Equipment).get_AI_SYSTEMS_nnlaie_k$ = function () {
    return this.AI_SYSTEMS_1;
  };
  protoOf(Equipment).get_BLOCKCHAIN_96ikm5_k$ = function () {
    return this.BLOCKCHAIN_1;
  };
  protoOf(Equipment).get_CLOUD_SYSTEMS_vim0mp_k$ = function () {
    return this.CLOUD_SYSTEMS_1;
  };
  protoOf(Equipment).get_MOBILE_APPS_s93lhi_k$ = function () {
    return this.MOBILE_APPS_1;
  };
  protoOf(Equipment).get_WEARABLE_TECH_fo3crx_k$ = function () {
    return this.WEARABLE_TECH_1;
  };
  var Equipment_instance;
  function Equipment_getInstance() {
    if (Equipment_instance == null)
      new Equipment();
    return Equipment_instance;
  }
  function Tasks() {
    Tasks_instance = this;
    this.PLANTING_1 = listOf(['planting', 'seeding', 'transplanting', 'germination']);
    this.HARVESTING_1 = listOf(['harvesting', 'picking', 'collecting', 'gathering']);
    this.MAINTENANCE_1 = listOf(['maintenance', 'repair', 'service', 'cleaning']);
    this.FEEDING_1 = listOf(['feeding', 'watering', 'nutrition', 'supplement']);
    this.HEALTH_1 = listOf(['health', 'vaccination', 'treatment', 'checkup']);
    this.MONITORING_1 = listOf(['monitoring', 'inspection', 'observation', 'tracking']);
    this.MARKETING_1 = listOf(['marketing', 'sales', 'advertising', 'promotion']);
    this.ADMINISTRATION_1 = listOf(['administration', 'planning', 'scheduling', 'record-keeping']);
    this.SUSTAINABILITY_1 = listOf(['sustainability', 'organic', 'regenerative', 'conservation']);
    this.RESEARCH_1 = listOf(['research', 'experiment', 'trial', 'study', 'analysis']);
    this.TRAINING_1 = listOf(['training', 'education', 'workshop', 'certification']);
    this.$stable_1 = 0;
  }
  protoOf(Tasks).get_PLANTING_c23p7k_k$ = function () {
    return this.PLANTING_1;
  };
  protoOf(Tasks).get_HARVESTING_t27wri_k$ = function () {
    return this.HARVESTING_1;
  };
  protoOf(Tasks).get_MAINTENANCE_g9z1py_k$ = function () {
    return this.MAINTENANCE_1;
  };
  protoOf(Tasks).get_FEEDING_302ao5_k$ = function () {
    return this.FEEDING_1;
  };
  protoOf(Tasks).get_HEALTH_1fy6jf_k$ = function () {
    return this.HEALTH_1;
  };
  protoOf(Tasks).get_MONITORING_ih8udt_k$ = function () {
    return this.MONITORING_1;
  };
  protoOf(Tasks).get_MARKETING_vvgskj_k$ = function () {
    return this.MARKETING_1;
  };
  protoOf(Tasks).get_ADMINISTRATION_i28m7b_k$ = function () {
    return this.ADMINISTRATION_1;
  };
  protoOf(Tasks).get_SUSTAINABILITY_66nwds_k$ = function () {
    return this.SUSTAINABILITY_1;
  };
  protoOf(Tasks).get_RESEARCH_onw8t8_k$ = function () {
    return this.RESEARCH_1;
  };
  protoOf(Tasks).get_TRAINING_28sbz7_k$ = function () {
    return this.TRAINING_1;
  };
  var Tasks_instance;
  function Tasks_getInstance() {
    if (Tasks_instance == null)
      new Tasks();
    return Tasks_instance;
  }
  function Financial() {
    Financial_instance = this;
    this.INCOME_1 = listOf(['income', 'revenue', 'sales', 'earnings', 'profit']);
    this.EXPENSES_1 = listOf(['expenses', 'costs', 'payments', 'bills', 'fees']);
    this.INVESTMENTS_1 = listOf(['investment', 'equipment', 'infrastructure', 'expansion']);
    this.LOANS_1 = listOf(['loan', 'mortgage', 'credit', 'debt', 'financing']);
    this.GRANTS_1 = listOf(['grant', 'subsidy', 'assistance', 'funding', 'support']);
    this.INSURANCE_1 = listOf(['insurance', 'coverage', 'protection', 'liability']);
    this.SUSTAINABILITY_FUNDS_1 = listOf(['sustainability', 'green', 'environmental', 'conservation']);
    this.RESEARCH_FUNDS_1 = listOf(['research', 'development', 'innovation', 'technology']);
    this.EDUCATION_FUNDS_1 = listOf(['education', 'training', 'workshop', 'outreach']);
    this.$stable_1 = 0;
  }
  protoOf(Financial).get_INCOME_tx2ry_k$ = function () {
    return this.INCOME_1;
  };
  protoOf(Financial).get_EXPENSES_k5uk10_k$ = function () {
    return this.EXPENSES_1;
  };
  protoOf(Financial).get_INVESTMENTS_qzwadl_k$ = function () {
    return this.INVESTMENTS_1;
  };
  protoOf(Financial).get_LOANS_iclmwq_k$ = function () {
    return this.LOANS_1;
  };
  protoOf(Financial).get_GRANTS_1pufq8_k$ = function () {
    return this.GRANTS_1;
  };
  protoOf(Financial).get_INSURANCE_f814vj_k$ = function () {
    return this.INSURANCE_1;
  };
  protoOf(Financial).get_SUSTAINABILITY_FUNDS_xq1rtt_k$ = function () {
    return this.SUSTAINABILITY_FUNDS_1;
  };
  protoOf(Financial).get_RESEARCH_FUNDS_2pwbxp_k$ = function () {
    return this.RESEARCH_FUNDS_1;
  };
  protoOf(Financial).get_EDUCATION_FUNDS_38t9zi_k$ = function () {
    return this.EDUCATION_FUNDS_1;
  };
  var Financial_instance;
  function Financial_getInstance() {
    if (Financial_instance == null)
      new Financial();
    return Financial_instance;
  }
  function get_$stableprop_8() {
    return 0;
  }
  function CategoryConfig() {
    CategoryConfig_instance = this;
    this.$stable_1 = 0;
  }
  protoOf(CategoryConfig).getAllCropCategories_xi6okp_k$ = function () {
    return mapOf([to('Grains', Crops_getInstance().GRAINS_1), to('Legumes', Crops_getInstance().LEGUMES_1), to('Vegetables', Crops_getInstance().VEGETABLES_1), to('Fruits', Crops_getInstance().FRUITS_1), to('Herbs', Crops_getInstance().HERBS_1), to('Flowers', Crops_getInstance().FLOWERS_1), to('Trees', Crops_getInstance().TREES_1), to('Nuts', Crops_getInstance().NUTS_1), to('Roots', Crops_getInstance().ROOTS_1), to('Leafy Greens', Crops_getInstance().LEAFY_GREENS_1), to('Organic', Crops_getInstance().ORGANIC_1), to('Heirloom', Crops_getInstance().HEIRLOOM_1), to('Hybrid', Crops_getInstance().HYBRID_1), to('Seasonal', Crops_getInstance().SEASONAL_1), to('Perennial', Crops_getInstance().PERENNIAL_1), to('Annual', Crops_getInstance().ANNUAL_1), to('Hydroponic', Crops_getInstance().HYDROPONIC_1), to('Vertical', Crops_getInstance().VERTICAL_1), to('Aeroponic', Crops_getInstance().AEROPONIC_1), to('Microgreens', Crops_getInstance().MICROGREENS_1), to('Medicinal', Crops_getInstance().MEDICINAL_1), to('Spice', Crops_getInstance().SPICE_1), to('Tea', Crops_getInstance().TEA_1), to('Coffee', Crops_getInstance().COFFEE_1), to('Cacao', Crops_getInstance().CACAO_1), to('Vanilla', Crops_getInstance().VANILLA_1), to('Saffron', Crops_getInstance().SAFFRON_1), to('Truffle', Crops_getInstance().TRUFFLE_1), to('Mushroom', Crops_getInstance().MUSHROOM_1), to('Algae', Crops_getInstance().ALGAE_1), to('Aquaponic', Crops_getInstance().AQUAPONIC_1)]);
  };
  protoOf(CategoryConfig).getAllLivestockCategories_quz4e3_k$ = function () {
    return mapOf([to('Cattle', Livestock_getInstance().CATTLE_1), to('Poultry', Livestock_getInstance().POULTRY_1), to('Goats', Livestock_getInstance().GOATS_1), to('Horses', Livestock_getInstance().HORSES_1), to('Sheep', Livestock_getInstance().SHEEP_1), to('Pigs', Livestock_getInstance().PIGS_1), to('Fish', Livestock_getInstance().FISH_1), to('Bees', Livestock_getInstance().BEES_1), to('Pets', Livestock_getInstance().PETS_1), to('Exotic', Livestock_getInstance().EXOTIC_1), to('Dairy', Livestock_getInstance().DAIRY_1), to('Meat', Livestock_getInstance().MEAT_1), to('Egg Laying', Livestock_getInstance().EGG_LAYING_1), to('Working', Livestock_getInstance().WORKING_1), to('Insects', Livestock_getInstance().INSECTS_1), to('Crustaceans', Livestock_getInstance().CRUSTACEANS_1), to('Mollusks', Livestock_getInstance().MOLLUSKS_1), to('Reptiles', Livestock_getInstance().REPTILES_1), to('Amphibians', Livestock_getInstance().AMPHIBIANS_1), to('Birds of Prey', Livestock_getInstance().BIRDS_OF_PREY_1), to('Waterfowl', Livestock_getInstance().WATERFOWL_1), to('Game Birds', Livestock_getInstance().GAME_BIRDS_1), to('Rodents', Livestock_getInstance().RODENTS_1), to('Camelids', Livestock_getInstance().CAMELIDS_1), to('Deer Family', Livestock_getInstance().DEER_FAMILY_1), to('Antelope', Livestock_getInstance().ANTELOPE_1)]);
  };
  protoOf(CategoryConfig).getAllEquipmentCategories_8y1yan_k$ = function () {
    return mapOf([to('Tractors', Equipment_getInstance().TRACTORS_1), to('Irrigation', Equipment_getInstance().IRRIGATION_1), to('Greenhouse', Equipment_getInstance().GREENHOUSE_1), to('Tools', Equipment_getInstance().TOOLS_1), to('Machinery', Equipment_getInstance().MACHINERY_1), to('Monitoring', Equipment_getInstance().MONITORING_1), to('Storage', Equipment_getInstance().STORAGE_1), to('Transport', Equipment_getInstance().TRANSPORT_1), to('Automation', Equipment_getInstance().AUTOMATION_1), to('Solar', Equipment_getInstance().SOLAR_1), to('Precision', Equipment_getInstance().PRECISION_1), to('Drones', Equipment_getInstance().DRONES_1), to('Robotics', Equipment_getInstance().ROBOTICS_1), to('Sensors', Equipment_getInstance().SENSORS_1), to('Cameras', Equipment_getInstance().CAMERAS_1), to('IOT Devices', Equipment_getInstance().IOT_DEVICES_1), to('AI Systems', Equipment_getInstance().AI_SYSTEMS_1), to('Blockchain', Equipment_getInstance().BLOCKCHAIN_1), to('Cloud Systems', Equipment_getInstance().CLOUD_SYSTEMS_1), to('Mobile Apps', Equipment_getInstance().MOBILE_APPS_1), to('Wearable Tech', Equipment_getInstance().WEARABLE_TECH_1)]);
  };
  protoOf(CategoryConfig).addCustomCategory_nxawse_k$ = function (type, name, keywords) {
    println('\u2795 Adding custom category: ' + name + ' (' + type + ') with keywords: ' + keywords);
  };
  protoOf(CategoryConfig).removeCustomCategory_dz3rj1_k$ = function (type, name) {
    println('\u2796 Removing custom category: ' + name + ' (' + type + ')');
  };
  var CategoryConfig_instance;
  function CategoryConfig_getInstance() {
    if (CategoryConfig_instance == null)
      new CategoryConfig();
    return CategoryConfig_instance;
  }
  function get_$stableprop_9() {
    return 0;
  }
  function Crop(id, name, variety, farmId, plantedDate, expectedHarvestDate, area, status, notes) {
    id = id === VOID ? new Long(0, 0) : id;
    notes = notes === VOID ? '' : notes;
    this.id_1 = id;
    this.name_1 = name;
    this.variety_1 = variety;
    this.farmId_1 = farmId;
    this.plantedDate_1 = plantedDate;
    this.expectedHarvestDate_1 = expectedHarvestDate;
    this.area_1 = area;
    this.status_1 = status;
    this.notes_1 = notes;
    this.$stable_1 = 0;
  }
  protoOf(Crop).get_id_kntnx8_k$ = function () {
    return this.id_1;
  };
  protoOf(Crop).get_name_woqyms_k$ = function () {
    return this.name_1;
  };
  protoOf(Crop).get_variety_56j68v_k$ = function () {
    return this.variety_1;
  };
  protoOf(Crop).get_farmId_d7oohm_k$ = function () {
    return this.farmId_1;
  };
  protoOf(Crop).get_plantedDate_8ulett_k$ = function () {
    return this.plantedDate_1;
  };
  protoOf(Crop).get_expectedHarvestDate_q2th86_k$ = function () {
    return this.expectedHarvestDate_1;
  };
  protoOf(Crop).get_area_woj07q_k$ = function () {
    return this.area_1;
  };
  protoOf(Crop).get_status_jnf6d7_k$ = function () {
    return this.status_1;
  };
  protoOf(Crop).get_notes_ivw520_k$ = function () {
    return this.notes_1;
  };
  protoOf(Crop).component1_7eebsc_k$ = function () {
    return this.id_1;
  };
  protoOf(Crop).component2_7eebsb_k$ = function () {
    return this.name_1;
  };
  protoOf(Crop).component3_7eebsa_k$ = function () {
    return this.variety_1;
  };
  protoOf(Crop).component4_7eebs9_k$ = function () {
    return this.farmId_1;
  };
  protoOf(Crop).component5_7eebs8_k$ = function () {
    return this.plantedDate_1;
  };
  protoOf(Crop).component6_7eebs7_k$ = function () {
    return this.expectedHarvestDate_1;
  };
  protoOf(Crop).component7_7eebs6_k$ = function () {
    return this.area_1;
  };
  protoOf(Crop).component8_7eebs5_k$ = function () {
    return this.status_1;
  };
  protoOf(Crop).component9_7eebs4_k$ = function () {
    return this.notes_1;
  };
  protoOf(Crop).copy_c8zedb_k$ = function (id, name, variety, farmId, plantedDate, expectedHarvestDate, area, status, notes) {
    return new Crop(id, name, variety, farmId, plantedDate, expectedHarvestDate, area, status, notes);
  };
  protoOf(Crop).copy$default_l1svig_k$ = function (id, name, variety, farmId, plantedDate, expectedHarvestDate, area, status, notes, $super) {
    id = id === VOID ? this.id_1 : id;
    name = name === VOID ? this.name_1 : name;
    variety = variety === VOID ? this.variety_1 : variety;
    farmId = farmId === VOID ? this.farmId_1 : farmId;
    plantedDate = plantedDate === VOID ? this.plantedDate_1 : plantedDate;
    expectedHarvestDate = expectedHarvestDate === VOID ? this.expectedHarvestDate_1 : expectedHarvestDate;
    area = area === VOID ? this.area_1 : area;
    status = status === VOID ? this.status_1 : status;
    notes = notes === VOID ? this.notes_1 : notes;
    return $super === VOID ? this.copy_c8zedb_k$(id, name, variety, farmId, plantedDate, expectedHarvestDate, area, status, notes) : $super.copy_c8zedb_k$.call(this, id, name, variety, farmId, plantedDate, expectedHarvestDate, area, status, notes);
  };
  protoOf(Crop).toString = function () {
    return 'Crop(id=' + this.id_1.toString() + ', name=' + this.name_1 + ', variety=' + this.variety_1 + ', farmId=' + this.farmId_1.toString() + ', plantedDate=' + this.plantedDate_1 + ', expectedHarvestDate=' + this.expectedHarvestDate_1 + ', area=' + this.area_1 + ', status=' + this.status_1 + ', notes=' + this.notes_1 + ')';
  };
  protoOf(Crop).hashCode = function () {
    var result = this.id_1.hashCode();
    result = imul(result, 31) + getStringHashCode(this.name_1) | 0;
    result = imul(result, 31) + getStringHashCode(this.variety_1) | 0;
    result = imul(result, 31) + this.farmId_1.hashCode() | 0;
    result = imul(result, 31) + getStringHashCode(this.plantedDate_1) | 0;
    result = imul(result, 31) + getStringHashCode(this.expectedHarvestDate_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.area_1) | 0;
    result = imul(result, 31) + this.status_1.hashCode() | 0;
    result = imul(result, 31) + getStringHashCode(this.notes_1) | 0;
    return result;
  };
  protoOf(Crop).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Crop))
      return false;
    var tmp0_other_with_cast = other instanceof Crop ? other : THROW_CCE();
    if (!this.id_1.equals(tmp0_other_with_cast.id_1))
      return false;
    if (!(this.name_1 === tmp0_other_with_cast.name_1))
      return false;
    if (!(this.variety_1 === tmp0_other_with_cast.variety_1))
      return false;
    if (!this.farmId_1.equals(tmp0_other_with_cast.farmId_1))
      return false;
    if (!(this.plantedDate_1 === tmp0_other_with_cast.plantedDate_1))
      return false;
    if (!(this.expectedHarvestDate_1 === tmp0_other_with_cast.expectedHarvestDate_1))
      return false;
    if (!equals(this.area_1, tmp0_other_with_cast.area_1))
      return false;
    if (!this.status_1.equals(tmp0_other_with_cast.status_1))
      return false;
    if (!(this.notes_1 === tmp0_other_with_cast.notes_1))
      return false;
    return true;
  };
  var CropStatus_PLANNED_instance;
  var CropStatus_PLANTED_instance;
  var CropStatus_GROWING_instance;
  var CropStatus_READY_FOR_HARVEST_instance;
  var CropStatus_HARVESTED_instance;
  var CropStatus_FAILED_instance;
  function values_0() {
    return [CropStatus_PLANNED_getInstance(), CropStatus_PLANTED_getInstance(), CropStatus_GROWING_getInstance(), CropStatus_READY_FOR_HARVEST_getInstance(), CropStatus_HARVESTED_getInstance(), CropStatus_FAILED_getInstance()];
  }
  function valueOf_0(value) {
    switch (value) {
      case 'PLANNED':
        return CropStatus_PLANNED_getInstance();
      case 'PLANTED':
        return CropStatus_PLANTED_getInstance();
      case 'GROWING':
        return CropStatus_GROWING_getInstance();
      case 'READY_FOR_HARVEST':
        return CropStatus_READY_FOR_HARVEST_getInstance();
      case 'HARVESTED':
        return CropStatus_HARVESTED_getInstance();
      case 'FAILED':
        return CropStatus_FAILED_getInstance();
      default:
        CropStatus_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  function get_entries_0() {
    if ($ENTRIES_0 == null)
      $ENTRIES_0 = enumEntries(values_0());
    return $ENTRIES_0;
  }
  var CropStatus_entriesInitialized;
  function CropStatus_initEntries() {
    if (CropStatus_entriesInitialized)
      return Unit_getInstance();
    CropStatus_entriesInitialized = true;
    CropStatus_PLANNED_instance = new CropStatus('PLANNED', 0);
    CropStatus_PLANTED_instance = new CropStatus('PLANTED', 1);
    CropStatus_GROWING_instance = new CropStatus('GROWING', 2);
    CropStatus_READY_FOR_HARVEST_instance = new CropStatus('READY_FOR_HARVEST', 3);
    CropStatus_HARVESTED_instance = new CropStatus('HARVESTED', 4);
    CropStatus_FAILED_instance = new CropStatus('FAILED', 5);
  }
  var $ENTRIES_0;
  function CropStatus(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function CropStatus_PLANNED_getInstance() {
    CropStatus_initEntries();
    return CropStatus_PLANNED_instance;
  }
  function CropStatus_PLANTED_getInstance() {
    CropStatus_initEntries();
    return CropStatus_PLANTED_instance;
  }
  function CropStatus_GROWING_getInstance() {
    CropStatus_initEntries();
    return CropStatus_GROWING_instance;
  }
  function CropStatus_READY_FOR_HARVEST_getInstance() {
    CropStatus_initEntries();
    return CropStatus_READY_FOR_HARVEST_instance;
  }
  function CropStatus_HARVESTED_getInstance() {
    CropStatus_initEntries();
    return CropStatus_HARVESTED_instance;
  }
  function CropStatus_FAILED_getInstance() {
    CropStatus_initEntries();
    return CropStatus_FAILED_instance;
  }
  var FarmStatus_ACTIVE_instance;
  var FarmStatus_INACTIVE_instance;
  var FarmStatus_MAINTENANCE_instance;
  var FarmStatus_SEASONAL_instance;
  function values_1() {
    return [FarmStatus_ACTIVE_getInstance(), FarmStatus_INACTIVE_getInstance(), FarmStatus_MAINTENANCE_getInstance(), FarmStatus_SEASONAL_getInstance()];
  }
  function valueOf_1(value) {
    switch (value) {
      case 'ACTIVE':
        return FarmStatus_ACTIVE_getInstance();
      case 'INACTIVE':
        return FarmStatus_INACTIVE_getInstance();
      case 'MAINTENANCE':
        return FarmStatus_MAINTENANCE_getInstance();
      case 'SEASONAL':
        return FarmStatus_SEASONAL_getInstance();
      default:
        FarmStatus_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  function get_entries_1() {
    if ($ENTRIES_1 == null)
      $ENTRIES_1 = enumEntries(values_1());
    return $ENTRIES_1;
  }
  var FarmStatus_entriesInitialized;
  function FarmStatus_initEntries() {
    if (FarmStatus_entriesInitialized)
      return Unit_getInstance();
    FarmStatus_entriesInitialized = true;
    FarmStatus_ACTIVE_instance = new FarmStatus('ACTIVE', 0);
    FarmStatus_INACTIVE_instance = new FarmStatus('INACTIVE', 1);
    FarmStatus_MAINTENANCE_instance = new FarmStatus('MAINTENANCE', 2);
    FarmStatus_SEASONAL_instance = new FarmStatus('SEASONAL', 3);
  }
  var $ENTRIES_1;
  function FarmStatus(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function get_$stableprop_10() {
    return 0;
  }
  function Location(latitude, longitude, address) {
    this.latitude_1 = latitude;
    this.longitude_1 = longitude;
    this.address_1 = address;
    this.$stable_1 = 0;
  }
  protoOf(Location).get_latitude_feukvp_k$ = function () {
    return this.latitude_1;
  };
  protoOf(Location).get_longitude_asb1fq_k$ = function () {
    return this.longitude_1;
  };
  protoOf(Location).get_address_hpr2t1_k$ = function () {
    return this.address_1;
  };
  protoOf(Location).component1_7eebsc_k$ = function () {
    return this.latitude_1;
  };
  protoOf(Location).component2_7eebsb_k$ = function () {
    return this.longitude_1;
  };
  protoOf(Location).component3_7eebsa_k$ = function () {
    return this.address_1;
  };
  protoOf(Location).copy_6yjtr9_k$ = function (latitude, longitude, address) {
    return new Location(latitude, longitude, address);
  };
  protoOf(Location).copy$default_hoz3jh_k$ = function (latitude, longitude, address, $super) {
    latitude = latitude === VOID ? this.latitude_1 : latitude;
    longitude = longitude === VOID ? this.longitude_1 : longitude;
    address = address === VOID ? this.address_1 : address;
    return $super === VOID ? this.copy_6yjtr9_k$(latitude, longitude, address) : $super.copy_6yjtr9_k$.call(this, latitude, longitude, address);
  };
  protoOf(Location).toString = function () {
    return 'Location(latitude=' + this.latitude_1 + ', longitude=' + this.longitude_1 + ', address=' + this.address_1 + ')';
  };
  protoOf(Location).hashCode = function () {
    var result = getNumberHashCode(this.latitude_1);
    result = imul(result, 31) + getNumberHashCode(this.longitude_1) | 0;
    result = imul(result, 31) + getStringHashCode(this.address_1) | 0;
    return result;
  };
  protoOf(Location).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Location))
      return false;
    var tmp0_other_with_cast = other instanceof Location ? other : THROW_CCE();
    if (!equals(this.latitude_1, tmp0_other_with_cast.latitude_1))
      return false;
    if (!equals(this.longitude_1, tmp0_other_with_cast.longitude_1))
      return false;
    if (!(this.address_1 === tmp0_other_with_cast.address_1))
      return false;
    return true;
  };
  function get_$stableprop_11() {
    return 0;
  }
  function Farm(id, name, location, size, type, status, ownerId, createdAt, updatedAt, isActive) {
    id = id === VOID ? new Long(0, 0) : id;
    createdAt = createdAt === VOID ? new Long(0, 0) : createdAt;
    updatedAt = updatedAt === VOID ? new Long(0, 0) : updatedAt;
    isActive = isActive === VOID ? true : isActive;
    this.id_1 = id;
    this.name_1 = name;
    this.location_1 = location;
    this.size_1 = size;
    this.type_1 = type;
    this.status_1 = status;
    this.ownerId_1 = ownerId;
    this.createdAt_1 = createdAt;
    this.updatedAt_1 = updatedAt;
    this.isActive_1 = isActive;
    this.$stable_1 = 0;
  }
  protoOf(Farm).get_id_kntnx8_k$ = function () {
    return this.id_1;
  };
  protoOf(Farm).get_name_woqyms_k$ = function () {
    return this.name_1;
  };
  protoOf(Farm).get_location_d3s02_k$ = function () {
    return this.location_1;
  };
  protoOf(Farm).get_size_woubt6_k$ = function () {
    return this.size_1;
  };
  protoOf(Farm).get_type_wovaf7_k$ = function () {
    return this.type_1;
  };
  protoOf(Farm).get_status_jnf6d7_k$ = function () {
    return this.status_1;
  };
  protoOf(Farm).get_ownerId_g6eke3_k$ = function () {
    return this.ownerId_1;
  };
  protoOf(Farm).get_createdAt_ierzpu_k$ = function () {
    return this.createdAt_1;
  };
  protoOf(Farm).get_updatedAt_npz717_k$ = function () {
    return this.updatedAt_1;
  };
  protoOf(Farm).get_isActive_quafmh_k$ = function () {
    return this.isActive_1;
  };
  protoOf(Farm).component1_7eebsc_k$ = function () {
    return this.id_1;
  };
  protoOf(Farm).component2_7eebsb_k$ = function () {
    return this.name_1;
  };
  protoOf(Farm).component3_7eebsa_k$ = function () {
    return this.location_1;
  };
  protoOf(Farm).component4_7eebs9_k$ = function () {
    return this.size_1;
  };
  protoOf(Farm).component5_7eebs8_k$ = function () {
    return this.type_1;
  };
  protoOf(Farm).component6_7eebs7_k$ = function () {
    return this.status_1;
  };
  protoOf(Farm).component7_7eebs6_k$ = function () {
    return this.ownerId_1;
  };
  protoOf(Farm).component8_7eebs5_k$ = function () {
    return this.createdAt_1;
  };
  protoOf(Farm).component9_7eebs4_k$ = function () {
    return this.updatedAt_1;
  };
  protoOf(Farm).component10_gazzfo_k$ = function () {
    return this.isActive_1;
  };
  protoOf(Farm).copy_1gpdg5_k$ = function (id, name, location, size, type, status, ownerId, createdAt, updatedAt, isActive) {
    return new Farm(id, name, location, size, type, status, ownerId, createdAt, updatedAt, isActive);
  };
  protoOf(Farm).copy$default_udj1ph_k$ = function (id, name, location, size, type, status, ownerId, createdAt, updatedAt, isActive, $super) {
    id = id === VOID ? this.id_1 : id;
    name = name === VOID ? this.name_1 : name;
    location = location === VOID ? this.location_1 : location;
    size = size === VOID ? this.size_1 : size;
    type = type === VOID ? this.type_1 : type;
    status = status === VOID ? this.status_1 : status;
    ownerId = ownerId === VOID ? this.ownerId_1 : ownerId;
    createdAt = createdAt === VOID ? this.createdAt_1 : createdAt;
    updatedAt = updatedAt === VOID ? this.updatedAt_1 : updatedAt;
    isActive = isActive === VOID ? this.isActive_1 : isActive;
    return $super === VOID ? this.copy_1gpdg5_k$(id, name, location, size, type, status, ownerId, createdAt, updatedAt, isActive) : $super.copy_1gpdg5_k$.call(this, id, name, location, size, type, status, ownerId, createdAt, updatedAt, isActive);
  };
  protoOf(Farm).toString = function () {
    return 'Farm(id=' + this.id_1.toString() + ', name=' + this.name_1 + ', location=' + this.location_1 + ', size=' + this.size_1 + ', type=' + this.type_1 + ', status=' + this.status_1 + ', ownerId=' + this.ownerId_1.toString() + ', createdAt=' + this.createdAt_1.toString() + ', updatedAt=' + this.updatedAt_1.toString() + ', isActive=' + this.isActive_1 + ')';
  };
  protoOf(Farm).hashCode = function () {
    var result = this.id_1.hashCode();
    result = imul(result, 31) + getStringHashCode(this.name_1) | 0;
    result = imul(result, 31) + this.location_1.hashCode() | 0;
    result = imul(result, 31) + getNumberHashCode(this.size_1) | 0;
    result = imul(result, 31) + this.type_1.hashCode() | 0;
    result = imul(result, 31) + this.status_1.hashCode() | 0;
    result = imul(result, 31) + this.ownerId_1.hashCode() | 0;
    result = imul(result, 31) + this.createdAt_1.hashCode() | 0;
    result = imul(result, 31) + this.updatedAt_1.hashCode() | 0;
    result = imul(result, 31) + getBooleanHashCode(this.isActive_1) | 0;
    return result;
  };
  protoOf(Farm).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Farm))
      return false;
    var tmp0_other_with_cast = other instanceof Farm ? other : THROW_CCE();
    if (!this.id_1.equals(tmp0_other_with_cast.id_1))
      return false;
    if (!(this.name_1 === tmp0_other_with_cast.name_1))
      return false;
    if (!this.location_1.equals(tmp0_other_with_cast.location_1))
      return false;
    if (!equals(this.size_1, tmp0_other_with_cast.size_1))
      return false;
    if (!this.type_1.equals(tmp0_other_with_cast.type_1))
      return false;
    if (!this.status_1.equals(tmp0_other_with_cast.status_1))
      return false;
    if (!this.ownerId_1.equals(tmp0_other_with_cast.ownerId_1))
      return false;
    if (!this.createdAt_1.equals(tmp0_other_with_cast.createdAt_1))
      return false;
    if (!this.updatedAt_1.equals(tmp0_other_with_cast.updatedAt_1))
      return false;
    if (!(this.isActive_1 === tmp0_other_with_cast.isActive_1))
      return false;
    return true;
  };
  var FarmType_CROP_instance;
  var FarmType_LIVESTOCK_instance;
  var FarmType_MIXED_instance;
  var FarmType_DAIRY_instance;
  var FarmType_POULTRY_instance;
  var FarmType_AQUACULTURE_instance;
  function values_2() {
    return [FarmType_CROP_getInstance(), FarmType_LIVESTOCK_getInstance(), FarmType_MIXED_getInstance(), FarmType_DAIRY_getInstance(), FarmType_POULTRY_getInstance(), FarmType_AQUACULTURE_getInstance()];
  }
  function valueOf_2(value) {
    switch (value) {
      case 'CROP':
        return FarmType_CROP_getInstance();
      case 'LIVESTOCK':
        return FarmType_LIVESTOCK_getInstance();
      case 'MIXED':
        return FarmType_MIXED_getInstance();
      case 'DAIRY':
        return FarmType_DAIRY_getInstance();
      case 'POULTRY':
        return FarmType_POULTRY_getInstance();
      case 'AQUACULTURE':
        return FarmType_AQUACULTURE_getInstance();
      default:
        FarmType_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  function get_entries_2() {
    if ($ENTRIES_2 == null)
      $ENTRIES_2 = enumEntries(values_2());
    return $ENTRIES_2;
  }
  var FarmType_entriesInitialized;
  function FarmType_initEntries() {
    if (FarmType_entriesInitialized)
      return Unit_getInstance();
    FarmType_entriesInitialized = true;
    FarmType_CROP_instance = new FarmType('CROP', 0);
    FarmType_LIVESTOCK_instance = new FarmType('LIVESTOCK', 1);
    FarmType_MIXED_instance = new FarmType('MIXED', 2);
    FarmType_DAIRY_instance = new FarmType('DAIRY', 3);
    FarmType_POULTRY_instance = new FarmType('POULTRY', 4);
    FarmType_AQUACULTURE_instance = new FarmType('AQUACULTURE', 5);
  }
  var $ENTRIES_2;
  function FarmType(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function FarmStatus_ACTIVE_getInstance() {
    FarmStatus_initEntries();
    return FarmStatus_ACTIVE_instance;
  }
  function FarmStatus_INACTIVE_getInstance() {
    FarmStatus_initEntries();
    return FarmStatus_INACTIVE_instance;
  }
  function FarmStatus_MAINTENANCE_getInstance() {
    FarmStatus_initEntries();
    return FarmStatus_MAINTENANCE_instance;
  }
  function FarmStatus_SEASONAL_getInstance() {
    FarmStatus_initEntries();
    return FarmStatus_SEASONAL_instance;
  }
  function FarmType_CROP_getInstance() {
    FarmType_initEntries();
    return FarmType_CROP_instance;
  }
  function FarmType_LIVESTOCK_getInstance() {
    FarmType_initEntries();
    return FarmType_LIVESTOCK_instance;
  }
  function FarmType_MIXED_getInstance() {
    FarmType_initEntries();
    return FarmType_MIXED_instance;
  }
  function FarmType_DAIRY_getInstance() {
    FarmType_initEntries();
    return FarmType_DAIRY_instance;
  }
  function FarmType_POULTRY_getInstance() {
    FarmType_initEntries();
    return FarmType_POULTRY_instance;
  }
  function FarmType_AQUACULTURE_getInstance() {
    FarmType_initEntries();
    return FarmType_AQUACULTURE_instance;
  }
  var FinancialType_INCOME_instance;
  var FinancialType_EXPENSE_instance;
  function values_3() {
    return [FinancialType_INCOME_getInstance(), FinancialType_EXPENSE_getInstance()];
  }
  function valueOf_3(value) {
    switch (value) {
      case 'INCOME':
        return FinancialType_INCOME_getInstance();
      case 'EXPENSE':
        return FinancialType_EXPENSE_getInstance();
      default:
        FinancialType_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  function get_entries_3() {
    if ($ENTRIES_3 == null)
      $ENTRIES_3 = enumEntries(values_3());
    return $ENTRIES_3;
  }
  var FinancialType_entriesInitialized;
  function FinancialType_initEntries() {
    if (FinancialType_entriesInitialized)
      return Unit_getInstance();
    FinancialType_entriesInitialized = true;
    FinancialType_INCOME_instance = new FinancialType('INCOME', 0);
    FinancialType_EXPENSE_instance = new FinancialType('EXPENSE', 1);
  }
  var $ENTRIES_3;
  function FinancialType(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  var FinancialCategory_CROP_SALES_instance;
  var FinancialCategory_LIVESTOCK_SALES_instance;
  var FinancialCategory_DAIRY_PRODUCTS_instance;
  var FinancialCategory_EQUIPMENT_RENTAL_instance;
  var FinancialCategory_GOVERNMENT_SUBSIDIES_instance;
  var FinancialCategory_OTHER_INCOME_instance;
  var FinancialCategory_SEEDS_AND_PLANTS_instance;
  var FinancialCategory_FERTILIZERS_instance;
  var FinancialCategory_PESTICIDES_instance;
  var FinancialCategory_ANIMAL_FEED_instance;
  var FinancialCategory_VETERINARY_CARE_instance;
  var FinancialCategory_EQUIPMENT_PURCHASE_instance;
  var FinancialCategory_EQUIPMENT_MAINTENANCE_instance;
  var FinancialCategory_FUEL_instance;
  var FinancialCategory_LABOR_COSTS_instance;
  var FinancialCategory_UTILITIES_instance;
  var FinancialCategory_INSURANCE_instance;
  var FinancialCategory_LOAN_PAYMENTS_instance;
  var FinancialCategory_OTHER_EXPENSES_instance;
  function values_4() {
    return [FinancialCategory_CROP_SALES_getInstance(), FinancialCategory_LIVESTOCK_SALES_getInstance(), FinancialCategory_DAIRY_PRODUCTS_getInstance(), FinancialCategory_EQUIPMENT_RENTAL_getInstance(), FinancialCategory_GOVERNMENT_SUBSIDIES_getInstance(), FinancialCategory_OTHER_INCOME_getInstance(), FinancialCategory_SEEDS_AND_PLANTS_getInstance(), FinancialCategory_FERTILIZERS_getInstance(), FinancialCategory_PESTICIDES_getInstance(), FinancialCategory_ANIMAL_FEED_getInstance(), FinancialCategory_VETERINARY_CARE_getInstance(), FinancialCategory_EQUIPMENT_PURCHASE_getInstance(), FinancialCategory_EQUIPMENT_MAINTENANCE_getInstance(), FinancialCategory_FUEL_getInstance(), FinancialCategory_LABOR_COSTS_getInstance(), FinancialCategory_UTILITIES_getInstance(), FinancialCategory_INSURANCE_getInstance(), FinancialCategory_LOAN_PAYMENTS_getInstance(), FinancialCategory_OTHER_EXPENSES_getInstance()];
  }
  function valueOf_4(value) {
    switch (value) {
      case 'CROP_SALES':
        return FinancialCategory_CROP_SALES_getInstance();
      case 'LIVESTOCK_SALES':
        return FinancialCategory_LIVESTOCK_SALES_getInstance();
      case 'DAIRY_PRODUCTS':
        return FinancialCategory_DAIRY_PRODUCTS_getInstance();
      case 'EQUIPMENT_RENTAL':
        return FinancialCategory_EQUIPMENT_RENTAL_getInstance();
      case 'GOVERNMENT_SUBSIDIES':
        return FinancialCategory_GOVERNMENT_SUBSIDIES_getInstance();
      case 'OTHER_INCOME':
        return FinancialCategory_OTHER_INCOME_getInstance();
      case 'SEEDS_AND_PLANTS':
        return FinancialCategory_SEEDS_AND_PLANTS_getInstance();
      case 'FERTILIZERS':
        return FinancialCategory_FERTILIZERS_getInstance();
      case 'PESTICIDES':
        return FinancialCategory_PESTICIDES_getInstance();
      case 'ANIMAL_FEED':
        return FinancialCategory_ANIMAL_FEED_getInstance();
      case 'VETERINARY_CARE':
        return FinancialCategory_VETERINARY_CARE_getInstance();
      case 'EQUIPMENT_PURCHASE':
        return FinancialCategory_EQUIPMENT_PURCHASE_getInstance();
      case 'EQUIPMENT_MAINTENANCE':
        return FinancialCategory_EQUIPMENT_MAINTENANCE_getInstance();
      case 'FUEL':
        return FinancialCategory_FUEL_getInstance();
      case 'LABOR_COSTS':
        return FinancialCategory_LABOR_COSTS_getInstance();
      case 'UTILITIES':
        return FinancialCategory_UTILITIES_getInstance();
      case 'INSURANCE':
        return FinancialCategory_INSURANCE_getInstance();
      case 'LOAN_PAYMENTS':
        return FinancialCategory_LOAN_PAYMENTS_getInstance();
      case 'OTHER_EXPENSES':
        return FinancialCategory_OTHER_EXPENSES_getInstance();
      default:
        FinancialCategory_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  function get_entries_4() {
    if ($ENTRIES_4 == null)
      $ENTRIES_4 = enumEntries(values_4());
    return $ENTRIES_4;
  }
  var FinancialCategory_entriesInitialized;
  function FinancialCategory_initEntries() {
    if (FinancialCategory_entriesInitialized)
      return Unit_getInstance();
    FinancialCategory_entriesInitialized = true;
    FinancialCategory_CROP_SALES_instance = new FinancialCategory('CROP_SALES', 0);
    FinancialCategory_LIVESTOCK_SALES_instance = new FinancialCategory('LIVESTOCK_SALES', 1);
    FinancialCategory_DAIRY_PRODUCTS_instance = new FinancialCategory('DAIRY_PRODUCTS', 2);
    FinancialCategory_EQUIPMENT_RENTAL_instance = new FinancialCategory('EQUIPMENT_RENTAL', 3);
    FinancialCategory_GOVERNMENT_SUBSIDIES_instance = new FinancialCategory('GOVERNMENT_SUBSIDIES', 4);
    FinancialCategory_OTHER_INCOME_instance = new FinancialCategory('OTHER_INCOME', 5);
    FinancialCategory_SEEDS_AND_PLANTS_instance = new FinancialCategory('SEEDS_AND_PLANTS', 6);
    FinancialCategory_FERTILIZERS_instance = new FinancialCategory('FERTILIZERS', 7);
    FinancialCategory_PESTICIDES_instance = new FinancialCategory('PESTICIDES', 8);
    FinancialCategory_ANIMAL_FEED_instance = new FinancialCategory('ANIMAL_FEED', 9);
    FinancialCategory_VETERINARY_CARE_instance = new FinancialCategory('VETERINARY_CARE', 10);
    FinancialCategory_EQUIPMENT_PURCHASE_instance = new FinancialCategory('EQUIPMENT_PURCHASE', 11);
    FinancialCategory_EQUIPMENT_MAINTENANCE_instance = new FinancialCategory('EQUIPMENT_MAINTENANCE', 12);
    FinancialCategory_FUEL_instance = new FinancialCategory('FUEL', 13);
    FinancialCategory_LABOR_COSTS_instance = new FinancialCategory('LABOR_COSTS', 14);
    FinancialCategory_UTILITIES_instance = new FinancialCategory('UTILITIES', 15);
    FinancialCategory_INSURANCE_instance = new FinancialCategory('INSURANCE', 16);
    FinancialCategory_LOAN_PAYMENTS_instance = new FinancialCategory('LOAN_PAYMENTS', 17);
    FinancialCategory_OTHER_EXPENSES_instance = new FinancialCategory('OTHER_EXPENSES', 18);
  }
  var $ENTRIES_4;
  function FinancialCategory(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function get_$stableprop_12() {
    return 0;
  }
  function FinancialRecord(id, farmId, type, category, amount, description, date, relatedEntityId, relatedEntityType, notes, receiptUrl) {
    id = id === VOID ? new Long(0, 0) : id;
    relatedEntityId = relatedEntityId === VOID ? null : relatedEntityId;
    relatedEntityType = relatedEntityType === VOID ? null : relatedEntityType;
    notes = notes === VOID ? '' : notes;
    receiptUrl = receiptUrl === VOID ? null : receiptUrl;
    this.id_1 = id;
    this.farmId_1 = farmId;
    this.type_1 = type;
    this.category_1 = category;
    this.amount_1 = amount;
    this.description_1 = description;
    this.date_1 = date;
    this.relatedEntityId_1 = relatedEntityId;
    this.relatedEntityType_1 = relatedEntityType;
    this.notes_1 = notes;
    this.receiptUrl_1 = receiptUrl;
    this.$stable_1 = 0;
  }
  protoOf(FinancialRecord).get_id_kntnx8_k$ = function () {
    return this.id_1;
  };
  protoOf(FinancialRecord).get_farmId_d7oohm_k$ = function () {
    return this.farmId_1;
  };
  protoOf(FinancialRecord).get_type_wovaf7_k$ = function () {
    return this.type_1;
  };
  protoOf(FinancialRecord).get_category_uyv41l_k$ = function () {
    return this.category_1;
  };
  protoOf(FinancialRecord).get_amount_b10di9_k$ = function () {
    return this.amount_1;
  };
  protoOf(FinancialRecord).get_description_emjre5_k$ = function () {
    return this.description_1;
  };
  protoOf(FinancialRecord).get_date_wokkxj_k$ = function () {
    return this.date_1;
  };
  protoOf(FinancialRecord).get_relatedEntityId_ypkw8w_k$ = function () {
    return this.relatedEntityId_1;
  };
  protoOf(FinancialRecord).get_relatedEntityType_rocian_k$ = function () {
    return this.relatedEntityType_1;
  };
  protoOf(FinancialRecord).get_notes_ivw520_k$ = function () {
    return this.notes_1;
  };
  protoOf(FinancialRecord).get_receiptUrl_gspgf4_k$ = function () {
    return this.receiptUrl_1;
  };
  protoOf(FinancialRecord).component1_7eebsc_k$ = function () {
    return this.id_1;
  };
  protoOf(FinancialRecord).component2_7eebsb_k$ = function () {
    return this.farmId_1;
  };
  protoOf(FinancialRecord).component3_7eebsa_k$ = function () {
    return this.type_1;
  };
  protoOf(FinancialRecord).component4_7eebs9_k$ = function () {
    return this.category_1;
  };
  protoOf(FinancialRecord).component5_7eebs8_k$ = function () {
    return this.amount_1;
  };
  protoOf(FinancialRecord).component6_7eebs7_k$ = function () {
    return this.description_1;
  };
  protoOf(FinancialRecord).component7_7eebs6_k$ = function () {
    return this.date_1;
  };
  protoOf(FinancialRecord).component8_7eebs5_k$ = function () {
    return this.relatedEntityId_1;
  };
  protoOf(FinancialRecord).component9_7eebs4_k$ = function () {
    return this.relatedEntityType_1;
  };
  protoOf(FinancialRecord).component10_gazzfo_k$ = function () {
    return this.notes_1;
  };
  protoOf(FinancialRecord).component11_gazzfn_k$ = function () {
    return this.receiptUrl_1;
  };
  protoOf(FinancialRecord).copy_8ygs9k_k$ = function (id, farmId, type, category, amount, description, date, relatedEntityId, relatedEntityType, notes, receiptUrl) {
    return new FinancialRecord(id, farmId, type, category, amount, description, date, relatedEntityId, relatedEntityType, notes, receiptUrl);
  };
  protoOf(FinancialRecord).copy$default_ih9u0b_k$ = function (id, farmId, type, category, amount, description, date, relatedEntityId, relatedEntityType, notes, receiptUrl, $super) {
    id = id === VOID ? this.id_1 : id;
    farmId = farmId === VOID ? this.farmId_1 : farmId;
    type = type === VOID ? this.type_1 : type;
    category = category === VOID ? this.category_1 : category;
    amount = amount === VOID ? this.amount_1 : amount;
    description = description === VOID ? this.description_1 : description;
    date = date === VOID ? this.date_1 : date;
    relatedEntityId = relatedEntityId === VOID ? this.relatedEntityId_1 : relatedEntityId;
    relatedEntityType = relatedEntityType === VOID ? this.relatedEntityType_1 : relatedEntityType;
    notes = notes === VOID ? this.notes_1 : notes;
    receiptUrl = receiptUrl === VOID ? this.receiptUrl_1 : receiptUrl;
    return $super === VOID ? this.copy_8ygs9k_k$(id, farmId, type, category, amount, description, date, relatedEntityId, relatedEntityType, notes, receiptUrl) : $super.copy_8ygs9k_k$.call(this, id, farmId, type, category, amount, description, date, relatedEntityId, relatedEntityType, notes, receiptUrl);
  };
  protoOf(FinancialRecord).toString = function () {
    return 'FinancialRecord(id=' + this.id_1.toString() + ', farmId=' + this.farmId_1.toString() + ', type=' + this.type_1 + ', category=' + this.category_1 + ', amount=' + this.amount_1 + ', description=' + this.description_1 + ', date=' + this.date_1.toString() + ', relatedEntityId=' + toString(this.relatedEntityId_1) + ', relatedEntityType=' + this.relatedEntityType_1 + ', notes=' + this.notes_1 + ', receiptUrl=' + this.receiptUrl_1 + ')';
  };
  protoOf(FinancialRecord).hashCode = function () {
    var result = this.id_1.hashCode();
    result = imul(result, 31) + this.farmId_1.hashCode() | 0;
    result = imul(result, 31) + this.type_1.hashCode() | 0;
    result = imul(result, 31) + this.category_1.hashCode() | 0;
    result = imul(result, 31) + getNumberHashCode(this.amount_1) | 0;
    result = imul(result, 31) + getStringHashCode(this.description_1) | 0;
    result = imul(result, 31) + this.date_1.hashCode() | 0;
    result = imul(result, 31) + (this.relatedEntityId_1 == null ? 0 : this.relatedEntityId_1.hashCode()) | 0;
    result = imul(result, 31) + (this.relatedEntityType_1 == null ? 0 : getStringHashCode(this.relatedEntityType_1)) | 0;
    result = imul(result, 31) + getStringHashCode(this.notes_1) | 0;
    result = imul(result, 31) + (this.receiptUrl_1 == null ? 0 : getStringHashCode(this.receiptUrl_1)) | 0;
    return result;
  };
  protoOf(FinancialRecord).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof FinancialRecord))
      return false;
    var tmp0_other_with_cast = other instanceof FinancialRecord ? other : THROW_CCE();
    if (!this.id_1.equals(tmp0_other_with_cast.id_1))
      return false;
    if (!this.farmId_1.equals(tmp0_other_with_cast.farmId_1))
      return false;
    if (!this.type_1.equals(tmp0_other_with_cast.type_1))
      return false;
    if (!this.category_1.equals(tmp0_other_with_cast.category_1))
      return false;
    if (!equals(this.amount_1, tmp0_other_with_cast.amount_1))
      return false;
    if (!(this.description_1 === tmp0_other_with_cast.description_1))
      return false;
    if (!this.date_1.equals(tmp0_other_with_cast.date_1))
      return false;
    if (!equals(this.relatedEntityId_1, tmp0_other_with_cast.relatedEntityId_1))
      return false;
    if (!(this.relatedEntityType_1 == tmp0_other_with_cast.relatedEntityType_1))
      return false;
    if (!(this.notes_1 === tmp0_other_with_cast.notes_1))
      return false;
    if (!(this.receiptUrl_1 == tmp0_other_with_cast.receiptUrl_1))
      return false;
    return true;
  };
  function FinancialType_INCOME_getInstance() {
    FinancialType_initEntries();
    return FinancialType_INCOME_instance;
  }
  function FinancialType_EXPENSE_getInstance() {
    FinancialType_initEntries();
    return FinancialType_EXPENSE_instance;
  }
  function FinancialCategory_CROP_SALES_getInstance() {
    FinancialCategory_initEntries();
    return FinancialCategory_CROP_SALES_instance;
  }
  function FinancialCategory_LIVESTOCK_SALES_getInstance() {
    FinancialCategory_initEntries();
    return FinancialCategory_LIVESTOCK_SALES_instance;
  }
  function FinancialCategory_DAIRY_PRODUCTS_getInstance() {
    FinancialCategory_initEntries();
    return FinancialCategory_DAIRY_PRODUCTS_instance;
  }
  function FinancialCategory_EQUIPMENT_RENTAL_getInstance() {
    FinancialCategory_initEntries();
    return FinancialCategory_EQUIPMENT_RENTAL_instance;
  }
  function FinancialCategory_GOVERNMENT_SUBSIDIES_getInstance() {
    FinancialCategory_initEntries();
    return FinancialCategory_GOVERNMENT_SUBSIDIES_instance;
  }
  function FinancialCategory_OTHER_INCOME_getInstance() {
    FinancialCategory_initEntries();
    return FinancialCategory_OTHER_INCOME_instance;
  }
  function FinancialCategory_SEEDS_AND_PLANTS_getInstance() {
    FinancialCategory_initEntries();
    return FinancialCategory_SEEDS_AND_PLANTS_instance;
  }
  function FinancialCategory_FERTILIZERS_getInstance() {
    FinancialCategory_initEntries();
    return FinancialCategory_FERTILIZERS_instance;
  }
  function FinancialCategory_PESTICIDES_getInstance() {
    FinancialCategory_initEntries();
    return FinancialCategory_PESTICIDES_instance;
  }
  function FinancialCategory_ANIMAL_FEED_getInstance() {
    FinancialCategory_initEntries();
    return FinancialCategory_ANIMAL_FEED_instance;
  }
  function FinancialCategory_VETERINARY_CARE_getInstance() {
    FinancialCategory_initEntries();
    return FinancialCategory_VETERINARY_CARE_instance;
  }
  function FinancialCategory_EQUIPMENT_PURCHASE_getInstance() {
    FinancialCategory_initEntries();
    return FinancialCategory_EQUIPMENT_PURCHASE_instance;
  }
  function FinancialCategory_EQUIPMENT_MAINTENANCE_getInstance() {
    FinancialCategory_initEntries();
    return FinancialCategory_EQUIPMENT_MAINTENANCE_instance;
  }
  function FinancialCategory_FUEL_getInstance() {
    FinancialCategory_initEntries();
    return FinancialCategory_FUEL_instance;
  }
  function FinancialCategory_LABOR_COSTS_getInstance() {
    FinancialCategory_initEntries();
    return FinancialCategory_LABOR_COSTS_instance;
  }
  function FinancialCategory_UTILITIES_getInstance() {
    FinancialCategory_initEntries();
    return FinancialCategory_UTILITIES_instance;
  }
  function FinancialCategory_INSURANCE_getInstance() {
    FinancialCategory_initEntries();
    return FinancialCategory_INSURANCE_instance;
  }
  function FinancialCategory_LOAN_PAYMENTS_getInstance() {
    FinancialCategory_initEntries();
    return FinancialCategory_LOAN_PAYMENTS_instance;
  }
  function FinancialCategory_OTHER_EXPENSES_getInstance() {
    FinancialCategory_initEntries();
    return FinancialCategory_OTHER_EXPENSES_instance;
  }
  function get_$stableprop_13() {
    return 0;
  }
  function InventoryItem(id, name, farmId, category, quantity, unit, cost, supplier, notes, createdAt, updatedAt) {
    notes = notes === VOID ? '' : notes;
    createdAt = createdAt === VOID ? new Long(0, 0) : createdAt;
    updatedAt = updatedAt === VOID ? new Long(0, 0) : updatedAt;
    this.id_1 = id;
    this.name_1 = name;
    this.farmId_1 = farmId;
    this.category_1 = category;
    this.quantity_1 = quantity;
    this.unit_1 = unit;
    this.cost_1 = cost;
    this.supplier_1 = supplier;
    this.notes_1 = notes;
    this.createdAt_1 = createdAt;
    this.updatedAt_1 = updatedAt;
    this.$stable_1 = 0;
  }
  protoOf(InventoryItem).get_id_kntnx8_k$ = function () {
    return this.id_1;
  };
  protoOf(InventoryItem).get_name_woqyms_k$ = function () {
    return this.name_1;
  };
  protoOf(InventoryItem).get_farmId_d7oohm_k$ = function () {
    return this.farmId_1;
  };
  protoOf(InventoryItem).get_category_uyv41l_k$ = function () {
    return this.category_1;
  };
  protoOf(InventoryItem).get_quantity_hz47ro_k$ = function () {
    return this.quantity_1;
  };
  protoOf(InventoryItem).get_unit_wovp3h_k$ = function () {
    return this.unit_1;
  };
  protoOf(InventoryItem).get_cost_wok8ba_k$ = function () {
    return this.cost_1;
  };
  protoOf(InventoryItem).get_supplier_bpvwr9_k$ = function () {
    return this.supplier_1;
  };
  protoOf(InventoryItem).get_notes_ivw520_k$ = function () {
    return this.notes_1;
  };
  protoOf(InventoryItem).get_createdAt_ierzpu_k$ = function () {
    return this.createdAt_1;
  };
  protoOf(InventoryItem).get_updatedAt_npz717_k$ = function () {
    return this.updatedAt_1;
  };
  protoOf(InventoryItem).component1_7eebsc_k$ = function () {
    return this.id_1;
  };
  protoOf(InventoryItem).component2_7eebsb_k$ = function () {
    return this.name_1;
  };
  protoOf(InventoryItem).component3_7eebsa_k$ = function () {
    return this.farmId_1;
  };
  protoOf(InventoryItem).component4_7eebs9_k$ = function () {
    return this.category_1;
  };
  protoOf(InventoryItem).component5_7eebs8_k$ = function () {
    return this.quantity_1;
  };
  protoOf(InventoryItem).component6_7eebs7_k$ = function () {
    return this.unit_1;
  };
  protoOf(InventoryItem).component7_7eebs6_k$ = function () {
    return this.cost_1;
  };
  protoOf(InventoryItem).component8_7eebs5_k$ = function () {
    return this.supplier_1;
  };
  protoOf(InventoryItem).component9_7eebs4_k$ = function () {
    return this.notes_1;
  };
  protoOf(InventoryItem).component10_gazzfo_k$ = function () {
    return this.createdAt_1;
  };
  protoOf(InventoryItem).component11_gazzfn_k$ = function () {
    return this.updatedAt_1;
  };
  protoOf(InventoryItem).copy_a2sy0v_k$ = function (id, name, farmId, category, quantity, unit, cost, supplier, notes, createdAt, updatedAt) {
    return new InventoryItem(id, name, farmId, category, quantity, unit, cost, supplier, notes, createdAt, updatedAt);
  };
  protoOf(InventoryItem).copy$default_lr4r4z_k$ = function (id, name, farmId, category, quantity, unit, cost, supplier, notes, createdAt, updatedAt, $super) {
    id = id === VOID ? this.id_1 : id;
    name = name === VOID ? this.name_1 : name;
    farmId = farmId === VOID ? this.farmId_1 : farmId;
    category = category === VOID ? this.category_1 : category;
    quantity = quantity === VOID ? this.quantity_1 : quantity;
    unit = unit === VOID ? this.unit_1 : unit;
    cost = cost === VOID ? this.cost_1 : cost;
    supplier = supplier === VOID ? this.supplier_1 : supplier;
    notes = notes === VOID ? this.notes_1 : notes;
    createdAt = createdAt === VOID ? this.createdAt_1 : createdAt;
    updatedAt = updatedAt === VOID ? this.updatedAt_1 : updatedAt;
    return $super === VOID ? this.copy_a2sy0v_k$(id, name, farmId, category, quantity, unit, cost, supplier, notes, createdAt, updatedAt) : $super.copy_a2sy0v_k$.call(this, id, name, farmId, category, quantity, unit, cost, supplier, notes, createdAt, updatedAt);
  };
  protoOf(InventoryItem).toString = function () {
    return 'InventoryItem(id=' + this.id_1 + ', name=' + this.name_1 + ', farmId=' + this.farmId_1 + ', category=' + this.category_1 + ', quantity=' + this.quantity_1 + ', unit=' + this.unit_1 + ', cost=' + this.cost_1 + ', supplier=' + this.supplier_1 + ', notes=' + this.notes_1 + ', createdAt=' + this.createdAt_1.toString() + ', updatedAt=' + this.updatedAt_1.toString() + ')';
  };
  protoOf(InventoryItem).hashCode = function () {
    var result = getStringHashCode(this.id_1);
    result = imul(result, 31) + getStringHashCode(this.name_1) | 0;
    result = imul(result, 31) + getStringHashCode(this.farmId_1) | 0;
    result = imul(result, 31) + this.category_1.hashCode() | 0;
    result = imul(result, 31) + getNumberHashCode(this.quantity_1) | 0;
    result = imul(result, 31) + getStringHashCode(this.unit_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.cost_1) | 0;
    result = imul(result, 31) + getStringHashCode(this.supplier_1) | 0;
    result = imul(result, 31) + getStringHashCode(this.notes_1) | 0;
    result = imul(result, 31) + this.createdAt_1.hashCode() | 0;
    result = imul(result, 31) + this.updatedAt_1.hashCode() | 0;
    return result;
  };
  protoOf(InventoryItem).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof InventoryItem))
      return false;
    var tmp0_other_with_cast = other instanceof InventoryItem ? other : THROW_CCE();
    if (!(this.id_1 === tmp0_other_with_cast.id_1))
      return false;
    if (!(this.name_1 === tmp0_other_with_cast.name_1))
      return false;
    if (!(this.farmId_1 === tmp0_other_with_cast.farmId_1))
      return false;
    if (!this.category_1.equals(tmp0_other_with_cast.category_1))
      return false;
    if (!equals(this.quantity_1, tmp0_other_with_cast.quantity_1))
      return false;
    if (!(this.unit_1 === tmp0_other_with_cast.unit_1))
      return false;
    if (!equals(this.cost_1, tmp0_other_with_cast.cost_1))
      return false;
    if (!(this.supplier_1 === tmp0_other_with_cast.supplier_1))
      return false;
    if (!(this.notes_1 === tmp0_other_with_cast.notes_1))
      return false;
    if (!this.createdAt_1.equals(tmp0_other_with_cast.createdAt_1))
      return false;
    if (!this.updatedAt_1.equals(tmp0_other_with_cast.updatedAt_1))
      return false;
    return true;
  };
  var InventoryCategory_SEEDS_instance;
  var InventoryCategory_FERTILIZER_instance;
  var InventoryCategory_PESTICIDES_instance;
  var InventoryCategory_TOOLS_instance;
  var InventoryCategory_EQUIPMENT_instance;
  var InventoryCategory_FEED_instance;
  var InventoryCategory_MEDICINE_instance;
  var InventoryCategory_SUPPLIES_instance;
  var InventoryCategory_OTHER_instance;
  function values_5() {
    return [InventoryCategory_SEEDS_getInstance(), InventoryCategory_FERTILIZER_getInstance(), InventoryCategory_PESTICIDES_getInstance(), InventoryCategory_TOOLS_getInstance(), InventoryCategory_EQUIPMENT_getInstance(), InventoryCategory_FEED_getInstance(), InventoryCategory_MEDICINE_getInstance(), InventoryCategory_SUPPLIES_getInstance(), InventoryCategory_OTHER_getInstance()];
  }
  function valueOf_5(value) {
    switch (value) {
      case 'SEEDS':
        return InventoryCategory_SEEDS_getInstance();
      case 'FERTILIZER':
        return InventoryCategory_FERTILIZER_getInstance();
      case 'PESTICIDES':
        return InventoryCategory_PESTICIDES_getInstance();
      case 'TOOLS':
        return InventoryCategory_TOOLS_getInstance();
      case 'EQUIPMENT':
        return InventoryCategory_EQUIPMENT_getInstance();
      case 'FEED':
        return InventoryCategory_FEED_getInstance();
      case 'MEDICINE':
        return InventoryCategory_MEDICINE_getInstance();
      case 'SUPPLIES':
        return InventoryCategory_SUPPLIES_getInstance();
      case 'OTHER':
        return InventoryCategory_OTHER_getInstance();
      default:
        InventoryCategory_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  function get_entries_5() {
    if ($ENTRIES_5 == null)
      $ENTRIES_5 = enumEntries(values_5());
    return $ENTRIES_5;
  }
  var InventoryCategory_entriesInitialized;
  function InventoryCategory_initEntries() {
    if (InventoryCategory_entriesInitialized)
      return Unit_getInstance();
    InventoryCategory_entriesInitialized = true;
    InventoryCategory_SEEDS_instance = new InventoryCategory('SEEDS', 0);
    InventoryCategory_FERTILIZER_instance = new InventoryCategory('FERTILIZER', 1);
    InventoryCategory_PESTICIDES_instance = new InventoryCategory('PESTICIDES', 2);
    InventoryCategory_TOOLS_instance = new InventoryCategory('TOOLS', 3);
    InventoryCategory_EQUIPMENT_instance = new InventoryCategory('EQUIPMENT', 4);
    InventoryCategory_FEED_instance = new InventoryCategory('FEED', 5);
    InventoryCategory_MEDICINE_instance = new InventoryCategory('MEDICINE', 6);
    InventoryCategory_SUPPLIES_instance = new InventoryCategory('SUPPLIES', 7);
    InventoryCategory_OTHER_instance = new InventoryCategory('OTHER', 8);
  }
  var $ENTRIES_5;
  function InventoryCategory(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function InventoryCategory_SEEDS_getInstance() {
    InventoryCategory_initEntries();
    return InventoryCategory_SEEDS_instance;
  }
  function InventoryCategory_FERTILIZER_getInstance() {
    InventoryCategory_initEntries();
    return InventoryCategory_FERTILIZER_instance;
  }
  function InventoryCategory_PESTICIDES_getInstance() {
    InventoryCategory_initEntries();
    return InventoryCategory_PESTICIDES_instance;
  }
  function InventoryCategory_TOOLS_getInstance() {
    InventoryCategory_initEntries();
    return InventoryCategory_TOOLS_instance;
  }
  function InventoryCategory_EQUIPMENT_getInstance() {
    InventoryCategory_initEntries();
    return InventoryCategory_EQUIPMENT_instance;
  }
  function InventoryCategory_FEED_getInstance() {
    InventoryCategory_initEntries();
    return InventoryCategory_FEED_instance;
  }
  function InventoryCategory_MEDICINE_getInstance() {
    InventoryCategory_initEntries();
    return InventoryCategory_MEDICINE_instance;
  }
  function InventoryCategory_SUPPLIES_getInstance() {
    InventoryCategory_initEntries();
    return InventoryCategory_SUPPLIES_instance;
  }
  function InventoryCategory_OTHER_getInstance() {
    InventoryCategory_initEntries();
    return InventoryCategory_OTHER_instance;
  }
  var LivestockStatus_ACTIVE_instance;
  var LivestockStatus_INACTIVE_instance;
  var LivestockStatus_SOLD_instance;
  var LivestockStatus_DECEASED_instance;
  var LivestockStatus_UNDER_TREATMENT_instance;
  function values_6() {
    return [LivestockStatus_ACTIVE_getInstance(), LivestockStatus_INACTIVE_getInstance(), LivestockStatus_SOLD_getInstance(), LivestockStatus_DECEASED_getInstance(), LivestockStatus_UNDER_TREATMENT_getInstance()];
  }
  function valueOf_6(value) {
    switch (value) {
      case 'ACTIVE':
        return LivestockStatus_ACTIVE_getInstance();
      case 'INACTIVE':
        return LivestockStatus_INACTIVE_getInstance();
      case 'SOLD':
        return LivestockStatus_SOLD_getInstance();
      case 'DECEASED':
        return LivestockStatus_DECEASED_getInstance();
      case 'UNDER_TREATMENT':
        return LivestockStatus_UNDER_TREATMENT_getInstance();
      default:
        LivestockStatus_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  function get_entries_6() {
    if ($ENTRIES_6 == null)
      $ENTRIES_6 = enumEntries(values_6());
    return $ENTRIES_6;
  }
  var LivestockStatus_entriesInitialized;
  function LivestockStatus_initEntries() {
    if (LivestockStatus_entriesInitialized)
      return Unit_getInstance();
    LivestockStatus_entriesInitialized = true;
    LivestockStatus_ACTIVE_instance = new LivestockStatus('ACTIVE', 0);
    LivestockStatus_INACTIVE_instance = new LivestockStatus('INACTIVE', 1);
    LivestockStatus_SOLD_instance = new LivestockStatus('SOLD', 2);
    LivestockStatus_DECEASED_instance = new LivestockStatus('DECEASED', 3);
    LivestockStatus_UNDER_TREATMENT_instance = new LivestockStatus('UNDER_TREATMENT', 4);
  }
  var $ENTRIES_6;
  function LivestockStatus(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  var LivestockType_CATTLE_instance;
  var LivestockType_SHEEP_instance;
  var LivestockType_GOATS_instance;
  var LivestockType_PIGS_instance;
  var LivestockType_POULTRY_instance;
  var LivestockType_HORSES_instance;
  var LivestockType_FISH_instance;
  var LivestockType_OTHER_instance;
  function values_7() {
    return [LivestockType_CATTLE_getInstance(), LivestockType_SHEEP_getInstance(), LivestockType_GOATS_getInstance(), LivestockType_PIGS_getInstance(), LivestockType_POULTRY_getInstance(), LivestockType_HORSES_getInstance(), LivestockType_FISH_getInstance(), LivestockType_OTHER_getInstance()];
  }
  function valueOf_7(value) {
    switch (value) {
      case 'CATTLE':
        return LivestockType_CATTLE_getInstance();
      case 'SHEEP':
        return LivestockType_SHEEP_getInstance();
      case 'GOATS':
        return LivestockType_GOATS_getInstance();
      case 'PIGS':
        return LivestockType_PIGS_getInstance();
      case 'POULTRY':
        return LivestockType_POULTRY_getInstance();
      case 'HORSES':
        return LivestockType_HORSES_getInstance();
      case 'FISH':
        return LivestockType_FISH_getInstance();
      case 'OTHER':
        return LivestockType_OTHER_getInstance();
      default:
        LivestockType_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  function get_entries_7() {
    if ($ENTRIES_7 == null)
      $ENTRIES_7 = enumEntries(values_7());
    return $ENTRIES_7;
  }
  var LivestockType_entriesInitialized;
  function LivestockType_initEntries() {
    if (LivestockType_entriesInitialized)
      return Unit_getInstance();
    LivestockType_entriesInitialized = true;
    LivestockType_CATTLE_instance = new LivestockType('CATTLE', 0);
    LivestockType_SHEEP_instance = new LivestockType('SHEEP', 1);
    LivestockType_GOATS_instance = new LivestockType('GOATS', 2);
    LivestockType_PIGS_instance = new LivestockType('PIGS', 3);
    LivestockType_POULTRY_instance = new LivestockType('POULTRY', 4);
    LivestockType_HORSES_instance = new LivestockType('HORSES', 5);
    LivestockType_FISH_instance = new LivestockType('FISH', 6);
    LivestockType_OTHER_instance = new LivestockType('OTHER', 7);
  }
  var $ENTRIES_7;
  function LivestockType(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function get_$stableprop_14() {
    return 0;
  }
  function Livestock_0(id, name, type, breed, farmId, birthDate, weight, status, location, notes, lastVaccination, nextVaccination) {
    id = id === VOID ? new Long(0, 0) : id;
    notes = notes === VOID ? '' : notes;
    lastVaccination = lastVaccination === VOID ? null : lastVaccination;
    nextVaccination = nextVaccination === VOID ? null : nextVaccination;
    this.id_1 = id;
    this.name_1 = name;
    this.type_1 = type;
    this.breed_1 = breed;
    this.farmId_1 = farmId;
    this.birthDate_1 = birthDate;
    this.weight_1 = weight;
    this.status_1 = status;
    this.location_1 = location;
    this.notes_1 = notes;
    this.lastVaccination_1 = lastVaccination;
    this.nextVaccination_1 = nextVaccination;
    this.$stable_1 = 0;
  }
  protoOf(Livestock_0).get_id_kntnx8_k$ = function () {
    return this.id_1;
  };
  protoOf(Livestock_0).get_name_woqyms_k$ = function () {
    return this.name_1;
  };
  protoOf(Livestock_0).get_type_wovaf7_k$ = function () {
    return this.type_1;
  };
  protoOf(Livestock_0).get_breed_ipc7rf_k$ = function () {
    return this.breed_1;
  };
  protoOf(Livestock_0).get_farmId_d7oohm_k$ = function () {
    return this.farmId_1;
  };
  protoOf(Livestock_0).get_birthDate_bhwdcs_k$ = function () {
    return this.birthDate_1;
  };
  protoOf(Livestock_0).get_weight_lbhkzl_k$ = function () {
    return this.weight_1;
  };
  protoOf(Livestock_0).get_status_jnf6d7_k$ = function () {
    return this.status_1;
  };
  protoOf(Livestock_0).get_location_d3s02_k$ = function () {
    return this.location_1;
  };
  protoOf(Livestock_0).get_notes_ivw520_k$ = function () {
    return this.notes_1;
  };
  protoOf(Livestock_0).get_lastVaccination_ftx0py_k$ = function () {
    return this.lastVaccination_1;
  };
  protoOf(Livestock_0).get_nextVaccination_7zmfe1_k$ = function () {
    return this.nextVaccination_1;
  };
  protoOf(Livestock_0).component1_7eebsc_k$ = function () {
    return this.id_1;
  };
  protoOf(Livestock_0).component2_7eebsb_k$ = function () {
    return this.name_1;
  };
  protoOf(Livestock_0).component3_7eebsa_k$ = function () {
    return this.type_1;
  };
  protoOf(Livestock_0).component4_7eebs9_k$ = function () {
    return this.breed_1;
  };
  protoOf(Livestock_0).component5_7eebs8_k$ = function () {
    return this.farmId_1;
  };
  protoOf(Livestock_0).component6_7eebs7_k$ = function () {
    return this.birthDate_1;
  };
  protoOf(Livestock_0).component7_7eebs6_k$ = function () {
    return this.weight_1;
  };
  protoOf(Livestock_0).component8_7eebs5_k$ = function () {
    return this.status_1;
  };
  protoOf(Livestock_0).component9_7eebs4_k$ = function () {
    return this.location_1;
  };
  protoOf(Livestock_0).component10_gazzfo_k$ = function () {
    return this.notes_1;
  };
  protoOf(Livestock_0).component11_gazzfn_k$ = function () {
    return this.lastVaccination_1;
  };
  protoOf(Livestock_0).component12_gazzfm_k$ = function () {
    return this.nextVaccination_1;
  };
  protoOf(Livestock_0).copy_ecm4qr_k$ = function (id, name, type, breed, farmId, birthDate, weight, status, location, notes, lastVaccination, nextVaccination) {
    return new Livestock_0(id, name, type, breed, farmId, birthDate, weight, status, location, notes, lastVaccination, nextVaccination);
  };
  protoOf(Livestock_0).copy$default_o21fmn_k$ = function (id, name, type, breed, farmId, birthDate, weight, status, location, notes, lastVaccination, nextVaccination, $super) {
    id = id === VOID ? this.id_1 : id;
    name = name === VOID ? this.name_1 : name;
    type = type === VOID ? this.type_1 : type;
    breed = breed === VOID ? this.breed_1 : breed;
    farmId = farmId === VOID ? this.farmId_1 : farmId;
    birthDate = birthDate === VOID ? this.birthDate_1 : birthDate;
    weight = weight === VOID ? this.weight_1 : weight;
    status = status === VOID ? this.status_1 : status;
    location = location === VOID ? this.location_1 : location;
    notes = notes === VOID ? this.notes_1 : notes;
    lastVaccination = lastVaccination === VOID ? this.lastVaccination_1 : lastVaccination;
    nextVaccination = nextVaccination === VOID ? this.nextVaccination_1 : nextVaccination;
    return $super === VOID ? this.copy_ecm4qr_k$(id, name, type, breed, farmId, birthDate, weight, status, location, notes, lastVaccination, nextVaccination) : $super.copy_ecm4qr_k$.call(this, id, name, type, breed, farmId, birthDate, weight, status, location, notes, lastVaccination, nextVaccination);
  };
  protoOf(Livestock_0).toString = function () {
    return 'Livestock(id=' + this.id_1.toString() + ', name=' + this.name_1 + ', type=' + this.type_1 + ', breed=' + this.breed_1 + ', farmId=' + this.farmId_1.toString() + ', birthDate=' + this.birthDate_1 + ', weight=' + this.weight_1 + ', status=' + this.status_1 + ', location=' + this.location_1 + ', notes=' + this.notes_1 + ', lastVaccination=' + this.lastVaccination_1 + ', nextVaccination=' + this.nextVaccination_1 + ')';
  };
  protoOf(Livestock_0).hashCode = function () {
    var result = this.id_1.hashCode();
    result = imul(result, 31) + getStringHashCode(this.name_1) | 0;
    result = imul(result, 31) + this.type_1.hashCode() | 0;
    result = imul(result, 31) + getStringHashCode(this.breed_1) | 0;
    result = imul(result, 31) + this.farmId_1.hashCode() | 0;
    result = imul(result, 31) + getStringHashCode(this.birthDate_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.weight_1) | 0;
    result = imul(result, 31) + this.status_1.hashCode() | 0;
    result = imul(result, 31) + getStringHashCode(this.location_1) | 0;
    result = imul(result, 31) + getStringHashCode(this.notes_1) | 0;
    result = imul(result, 31) + (this.lastVaccination_1 == null ? 0 : getStringHashCode(this.lastVaccination_1)) | 0;
    result = imul(result, 31) + (this.nextVaccination_1 == null ? 0 : getStringHashCode(this.nextVaccination_1)) | 0;
    return result;
  };
  protoOf(Livestock_0).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Livestock_0))
      return false;
    var tmp0_other_with_cast = other instanceof Livestock_0 ? other : THROW_CCE();
    if (!this.id_1.equals(tmp0_other_with_cast.id_1))
      return false;
    if (!(this.name_1 === tmp0_other_with_cast.name_1))
      return false;
    if (!this.type_1.equals(tmp0_other_with_cast.type_1))
      return false;
    if (!(this.breed_1 === tmp0_other_with_cast.breed_1))
      return false;
    if (!this.farmId_1.equals(tmp0_other_with_cast.farmId_1))
      return false;
    if (!(this.birthDate_1 === tmp0_other_with_cast.birthDate_1))
      return false;
    if (!equals(this.weight_1, tmp0_other_with_cast.weight_1))
      return false;
    if (!this.status_1.equals(tmp0_other_with_cast.status_1))
      return false;
    if (!(this.location_1 === tmp0_other_with_cast.location_1))
      return false;
    if (!(this.notes_1 === tmp0_other_with_cast.notes_1))
      return false;
    if (!(this.lastVaccination_1 == tmp0_other_with_cast.lastVaccination_1))
      return false;
    if (!(this.nextVaccination_1 == tmp0_other_with_cast.nextVaccination_1))
      return false;
    return true;
  };
  function LivestockStatus_ACTIVE_getInstance() {
    LivestockStatus_initEntries();
    return LivestockStatus_ACTIVE_instance;
  }
  function LivestockStatus_INACTIVE_getInstance() {
    LivestockStatus_initEntries();
    return LivestockStatus_INACTIVE_instance;
  }
  function LivestockStatus_SOLD_getInstance() {
    LivestockStatus_initEntries();
    return LivestockStatus_SOLD_instance;
  }
  function LivestockStatus_DECEASED_getInstance() {
    LivestockStatus_initEntries();
    return LivestockStatus_DECEASED_instance;
  }
  function LivestockStatus_UNDER_TREATMENT_getInstance() {
    LivestockStatus_initEntries();
    return LivestockStatus_UNDER_TREATMENT_instance;
  }
  function LivestockType_CATTLE_getInstance() {
    LivestockType_initEntries();
    return LivestockType_CATTLE_instance;
  }
  function LivestockType_SHEEP_getInstance() {
    LivestockType_initEntries();
    return LivestockType_SHEEP_instance;
  }
  function LivestockType_GOATS_getInstance() {
    LivestockType_initEntries();
    return LivestockType_GOATS_instance;
  }
  function LivestockType_PIGS_getInstance() {
    LivestockType_initEntries();
    return LivestockType_PIGS_instance;
  }
  function LivestockType_POULTRY_getInstance() {
    LivestockType_initEntries();
    return LivestockType_POULTRY_instance;
  }
  function LivestockType_HORSES_getInstance() {
    LivestockType_initEntries();
    return LivestockType_HORSES_instance;
  }
  function LivestockType_FISH_getInstance() {
    LivestockType_initEntries();
    return LivestockType_FISH_instance;
  }
  function LivestockType_OTHER_getInstance() {
    LivestockType_initEntries();
    return LivestockType_OTHER_instance;
  }
  function get_$stableprop_15() {
    return 0;
  }
  function Task(id, title, description, farmId, assignedTo, priority, status, dueDate, completedDate, category, estimatedHours, actualHours, notes) {
    id = id === VOID ? new Long(0, 0) : id;
    completedDate = completedDate === VOID ? null : completedDate;
    estimatedHours = estimatedHours === VOID ? null : estimatedHours;
    actualHours = actualHours === VOID ? null : actualHours;
    notes = notes === VOID ? '' : notes;
    this.id_1 = id;
    this.title_1 = title;
    this.description_1 = description;
    this.farmId_1 = farmId;
    this.assignedTo_1 = assignedTo;
    this.priority_1 = priority;
    this.status_1 = status;
    this.dueDate_1 = dueDate;
    this.completedDate_1 = completedDate;
    this.category_1 = category;
    this.estimatedHours_1 = estimatedHours;
    this.actualHours_1 = actualHours;
    this.notes_1 = notes;
    this.$stable_1 = 0;
  }
  protoOf(Task).get_id_kntnx8_k$ = function () {
    return this.id_1;
  };
  protoOf(Task).get_title_iz32un_k$ = function () {
    return this.title_1;
  };
  protoOf(Task).get_description_emjre5_k$ = function () {
    return this.description_1;
  };
  protoOf(Task).get_farmId_d7oohm_k$ = function () {
    return this.farmId_1;
  };
  protoOf(Task).get_assignedTo_37duha_k$ = function () {
    return this.assignedTo_1;
  };
  protoOf(Task).get_priority_jyafsd_k$ = function () {
    return this.priority_1;
  };
  protoOf(Task).get_status_jnf6d7_k$ = function () {
    return this.status_1;
  };
  protoOf(Task).get_dueDate_ycxot5_k$ = function () {
    return this.dueDate_1;
  };
  protoOf(Task).get_completedDate_1wa8vk_k$ = function () {
    return this.completedDate_1;
  };
  protoOf(Task).get_category_uyv41l_k$ = function () {
    return this.category_1;
  };
  protoOf(Task).get_estimatedHours_6vegxo_k$ = function () {
    return this.estimatedHours_1;
  };
  protoOf(Task).get_actualHours_xx3k20_k$ = function () {
    return this.actualHours_1;
  };
  protoOf(Task).get_notes_ivw520_k$ = function () {
    return this.notes_1;
  };
  protoOf(Task).component1_7eebsc_k$ = function () {
    return this.id_1;
  };
  protoOf(Task).component2_7eebsb_k$ = function () {
    return this.title_1;
  };
  protoOf(Task).component3_7eebsa_k$ = function () {
    return this.description_1;
  };
  protoOf(Task).component4_7eebs9_k$ = function () {
    return this.farmId_1;
  };
  protoOf(Task).component5_7eebs8_k$ = function () {
    return this.assignedTo_1;
  };
  protoOf(Task).component6_7eebs7_k$ = function () {
    return this.priority_1;
  };
  protoOf(Task).component7_7eebs6_k$ = function () {
    return this.status_1;
  };
  protoOf(Task).component8_7eebs5_k$ = function () {
    return this.dueDate_1;
  };
  protoOf(Task).component9_7eebs4_k$ = function () {
    return this.completedDate_1;
  };
  protoOf(Task).component10_gazzfo_k$ = function () {
    return this.category_1;
  };
  protoOf(Task).component11_gazzfn_k$ = function () {
    return this.estimatedHours_1;
  };
  protoOf(Task).component12_gazzfm_k$ = function () {
    return this.actualHours_1;
  };
  protoOf(Task).component13_gazzfl_k$ = function () {
    return this.notes_1;
  };
  protoOf(Task).copy_iy4t0d_k$ = function (id, title, description, farmId, assignedTo, priority, status, dueDate, completedDate, category, estimatedHours, actualHours, notes) {
    return new Task(id, title, description, farmId, assignedTo, priority, status, dueDate, completedDate, category, estimatedHours, actualHours, notes);
  };
  protoOf(Task).copy$default_iturqf_k$ = function (id, title, description, farmId, assignedTo, priority, status, dueDate, completedDate, category, estimatedHours, actualHours, notes, $super) {
    id = id === VOID ? this.id_1 : id;
    title = title === VOID ? this.title_1 : title;
    description = description === VOID ? this.description_1 : description;
    farmId = farmId === VOID ? this.farmId_1 : farmId;
    assignedTo = assignedTo === VOID ? this.assignedTo_1 : assignedTo;
    priority = priority === VOID ? this.priority_1 : priority;
    status = status === VOID ? this.status_1 : status;
    dueDate = dueDate === VOID ? this.dueDate_1 : dueDate;
    completedDate = completedDate === VOID ? this.completedDate_1 : completedDate;
    category = category === VOID ? this.category_1 : category;
    estimatedHours = estimatedHours === VOID ? this.estimatedHours_1 : estimatedHours;
    actualHours = actualHours === VOID ? this.actualHours_1 : actualHours;
    notes = notes === VOID ? this.notes_1 : notes;
    return $super === VOID ? this.copy_iy4t0d_k$(id, title, description, farmId, assignedTo, priority, status, dueDate, completedDate, category, estimatedHours, actualHours, notes) : $super.copy_iy4t0d_k$.call(this, id, title, description, farmId, assignedTo, priority, status, dueDate, completedDate, category, estimatedHours, actualHours, notes);
  };
  protoOf(Task).toString = function () {
    return 'Task(id=' + this.id_1.toString() + ', title=' + this.title_1 + ', description=' + this.description_1 + ', farmId=' + this.farmId_1.toString() + ', assignedTo=' + toString(this.assignedTo_1) + ', priority=' + this.priority_1 + ', status=' + this.status_1 + ', dueDate=' + this.dueDate_1.toString() + ', completedDate=' + toString(this.completedDate_1) + ', category=' + this.category_1 + ', estimatedHours=' + this.estimatedHours_1 + ', actualHours=' + this.actualHours_1 + ', notes=' + this.notes_1 + ')';
  };
  protoOf(Task).hashCode = function () {
    var result = this.id_1.hashCode();
    result = imul(result, 31) + getStringHashCode(this.title_1) | 0;
    result = imul(result, 31) + getStringHashCode(this.description_1) | 0;
    result = imul(result, 31) + this.farmId_1.hashCode() | 0;
    result = imul(result, 31) + (this.assignedTo_1 == null ? 0 : this.assignedTo_1.hashCode()) | 0;
    result = imul(result, 31) + this.priority_1.hashCode() | 0;
    result = imul(result, 31) + this.status_1.hashCode() | 0;
    result = imul(result, 31) + this.dueDate_1.hashCode() | 0;
    result = imul(result, 31) + (this.completedDate_1 == null ? 0 : this.completedDate_1.hashCode()) | 0;
    result = imul(result, 31) + this.category_1.hashCode() | 0;
    result = imul(result, 31) + (this.estimatedHours_1 == null ? 0 : getNumberHashCode(this.estimatedHours_1)) | 0;
    result = imul(result, 31) + (this.actualHours_1 == null ? 0 : getNumberHashCode(this.actualHours_1)) | 0;
    result = imul(result, 31) + getStringHashCode(this.notes_1) | 0;
    return result;
  };
  protoOf(Task).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Task))
      return false;
    var tmp0_other_with_cast = other instanceof Task ? other : THROW_CCE();
    if (!this.id_1.equals(tmp0_other_with_cast.id_1))
      return false;
    if (!(this.title_1 === tmp0_other_with_cast.title_1))
      return false;
    if (!(this.description_1 === tmp0_other_with_cast.description_1))
      return false;
    if (!this.farmId_1.equals(tmp0_other_with_cast.farmId_1))
      return false;
    if (!equals(this.assignedTo_1, tmp0_other_with_cast.assignedTo_1))
      return false;
    if (!this.priority_1.equals(tmp0_other_with_cast.priority_1))
      return false;
    if (!this.status_1.equals(tmp0_other_with_cast.status_1))
      return false;
    if (!this.dueDate_1.equals(tmp0_other_with_cast.dueDate_1))
      return false;
    if (!equals(this.completedDate_1, tmp0_other_with_cast.completedDate_1))
      return false;
    if (!this.category_1.equals(tmp0_other_with_cast.category_1))
      return false;
    if (!equals(this.estimatedHours_1, tmp0_other_with_cast.estimatedHours_1))
      return false;
    if (!equals(this.actualHours_1, tmp0_other_with_cast.actualHours_1))
      return false;
    if (!(this.notes_1 === tmp0_other_with_cast.notes_1))
      return false;
    return true;
  };
  var TaskCategory_PLANTING_instance;
  var TaskCategory_HARVESTING_instance;
  var TaskCategory_IRRIGATION_instance;
  var TaskCategory_FERTILIZATION_instance;
  var TaskCategory_PEST_CONTROL_instance;
  var TaskCategory_LIVESTOCK_CARE_instance;
  var TaskCategory_EQUIPMENT_MAINTENANCE_instance;
  var TaskCategory_FINANCIAL_instance;
  var TaskCategory_ADMINISTRATIVE_instance;
  var TaskCategory_OTHER_instance;
  function values_8() {
    return [TaskCategory_PLANTING_getInstance(), TaskCategory_HARVESTING_getInstance(), TaskCategory_IRRIGATION_getInstance(), TaskCategory_FERTILIZATION_getInstance(), TaskCategory_PEST_CONTROL_getInstance(), TaskCategory_LIVESTOCK_CARE_getInstance(), TaskCategory_EQUIPMENT_MAINTENANCE_getInstance(), TaskCategory_FINANCIAL_getInstance(), TaskCategory_ADMINISTRATIVE_getInstance(), TaskCategory_OTHER_getInstance()];
  }
  function valueOf_8(value) {
    switch (value) {
      case 'PLANTING':
        return TaskCategory_PLANTING_getInstance();
      case 'HARVESTING':
        return TaskCategory_HARVESTING_getInstance();
      case 'IRRIGATION':
        return TaskCategory_IRRIGATION_getInstance();
      case 'FERTILIZATION':
        return TaskCategory_FERTILIZATION_getInstance();
      case 'PEST_CONTROL':
        return TaskCategory_PEST_CONTROL_getInstance();
      case 'LIVESTOCK_CARE':
        return TaskCategory_LIVESTOCK_CARE_getInstance();
      case 'EQUIPMENT_MAINTENANCE':
        return TaskCategory_EQUIPMENT_MAINTENANCE_getInstance();
      case 'FINANCIAL':
        return TaskCategory_FINANCIAL_getInstance();
      case 'ADMINISTRATIVE':
        return TaskCategory_ADMINISTRATIVE_getInstance();
      case 'OTHER':
        return TaskCategory_OTHER_getInstance();
      default:
        TaskCategory_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  function get_entries_8() {
    if ($ENTRIES_8 == null)
      $ENTRIES_8 = enumEntries(values_8());
    return $ENTRIES_8;
  }
  var TaskCategory_entriesInitialized;
  function TaskCategory_initEntries() {
    if (TaskCategory_entriesInitialized)
      return Unit_getInstance();
    TaskCategory_entriesInitialized = true;
    TaskCategory_PLANTING_instance = new TaskCategory('PLANTING', 0);
    TaskCategory_HARVESTING_instance = new TaskCategory('HARVESTING', 1);
    TaskCategory_IRRIGATION_instance = new TaskCategory('IRRIGATION', 2);
    TaskCategory_FERTILIZATION_instance = new TaskCategory('FERTILIZATION', 3);
    TaskCategory_PEST_CONTROL_instance = new TaskCategory('PEST_CONTROL', 4);
    TaskCategory_LIVESTOCK_CARE_instance = new TaskCategory('LIVESTOCK_CARE', 5);
    TaskCategory_EQUIPMENT_MAINTENANCE_instance = new TaskCategory('EQUIPMENT_MAINTENANCE', 6);
    TaskCategory_FINANCIAL_instance = new TaskCategory('FINANCIAL', 7);
    TaskCategory_ADMINISTRATIVE_instance = new TaskCategory('ADMINISTRATIVE', 8);
    TaskCategory_OTHER_instance = new TaskCategory('OTHER', 9);
  }
  var $ENTRIES_8;
  function TaskCategory(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  var TaskStatus_PENDING_instance;
  var TaskStatus_IN_PROGRESS_instance;
  var TaskStatus_COMPLETED_instance;
  var TaskStatus_CANCELLED_instance;
  var TaskStatus_OVERDUE_instance;
  function values_9() {
    return [TaskStatus_PENDING_getInstance(), TaskStatus_IN_PROGRESS_getInstance(), TaskStatus_COMPLETED_getInstance(), TaskStatus_CANCELLED_getInstance(), TaskStatus_OVERDUE_getInstance()];
  }
  function valueOf_9(value) {
    switch (value) {
      case 'PENDING':
        return TaskStatus_PENDING_getInstance();
      case 'IN_PROGRESS':
        return TaskStatus_IN_PROGRESS_getInstance();
      case 'COMPLETED':
        return TaskStatus_COMPLETED_getInstance();
      case 'CANCELLED':
        return TaskStatus_CANCELLED_getInstance();
      case 'OVERDUE':
        return TaskStatus_OVERDUE_getInstance();
      default:
        TaskStatus_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  function get_entries_9() {
    if ($ENTRIES_9 == null)
      $ENTRIES_9 = enumEntries(values_9());
    return $ENTRIES_9;
  }
  var TaskStatus_entriesInitialized;
  function TaskStatus_initEntries() {
    if (TaskStatus_entriesInitialized)
      return Unit_getInstance();
    TaskStatus_entriesInitialized = true;
    TaskStatus_PENDING_instance = new TaskStatus('PENDING', 0);
    TaskStatus_IN_PROGRESS_instance = new TaskStatus('IN_PROGRESS', 1);
    TaskStatus_COMPLETED_instance = new TaskStatus('COMPLETED', 2);
    TaskStatus_CANCELLED_instance = new TaskStatus('CANCELLED', 3);
    TaskStatus_OVERDUE_instance = new TaskStatus('OVERDUE', 4);
  }
  var $ENTRIES_9;
  function TaskStatus(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  var TaskPriority_LOW_instance;
  var TaskPriority_MEDIUM_instance;
  var TaskPriority_HIGH_instance;
  var TaskPriority_URGENT_instance;
  function values_10() {
    return [TaskPriority_LOW_getInstance(), TaskPriority_MEDIUM_getInstance(), TaskPriority_HIGH_getInstance(), TaskPriority_URGENT_getInstance()];
  }
  function valueOf_10(value) {
    switch (value) {
      case 'LOW':
        return TaskPriority_LOW_getInstance();
      case 'MEDIUM':
        return TaskPriority_MEDIUM_getInstance();
      case 'HIGH':
        return TaskPriority_HIGH_getInstance();
      case 'URGENT':
        return TaskPriority_URGENT_getInstance();
      default:
        TaskPriority_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  function get_entries_10() {
    if ($ENTRIES_10 == null)
      $ENTRIES_10 = enumEntries(values_10());
    return $ENTRIES_10;
  }
  var TaskPriority_entriesInitialized;
  function TaskPriority_initEntries() {
    if (TaskPriority_entriesInitialized)
      return Unit_getInstance();
    TaskPriority_entriesInitialized = true;
    TaskPriority_LOW_instance = new TaskPriority('LOW', 0);
    TaskPriority_MEDIUM_instance = new TaskPriority('MEDIUM', 1);
    TaskPriority_HIGH_instance = new TaskPriority('HIGH', 2);
    TaskPriority_URGENT_instance = new TaskPriority('URGENT', 3);
  }
  var $ENTRIES_10;
  function TaskPriority(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function TaskCategory_PLANTING_getInstance() {
    TaskCategory_initEntries();
    return TaskCategory_PLANTING_instance;
  }
  function TaskCategory_HARVESTING_getInstance() {
    TaskCategory_initEntries();
    return TaskCategory_HARVESTING_instance;
  }
  function TaskCategory_IRRIGATION_getInstance() {
    TaskCategory_initEntries();
    return TaskCategory_IRRIGATION_instance;
  }
  function TaskCategory_FERTILIZATION_getInstance() {
    TaskCategory_initEntries();
    return TaskCategory_FERTILIZATION_instance;
  }
  function TaskCategory_PEST_CONTROL_getInstance() {
    TaskCategory_initEntries();
    return TaskCategory_PEST_CONTROL_instance;
  }
  function TaskCategory_LIVESTOCK_CARE_getInstance() {
    TaskCategory_initEntries();
    return TaskCategory_LIVESTOCK_CARE_instance;
  }
  function TaskCategory_EQUIPMENT_MAINTENANCE_getInstance() {
    TaskCategory_initEntries();
    return TaskCategory_EQUIPMENT_MAINTENANCE_instance;
  }
  function TaskCategory_FINANCIAL_getInstance() {
    TaskCategory_initEntries();
    return TaskCategory_FINANCIAL_instance;
  }
  function TaskCategory_ADMINISTRATIVE_getInstance() {
    TaskCategory_initEntries();
    return TaskCategory_ADMINISTRATIVE_instance;
  }
  function TaskCategory_OTHER_getInstance() {
    TaskCategory_initEntries();
    return TaskCategory_OTHER_instance;
  }
  function TaskStatus_PENDING_getInstance() {
    TaskStatus_initEntries();
    return TaskStatus_PENDING_instance;
  }
  function TaskStatus_IN_PROGRESS_getInstance() {
    TaskStatus_initEntries();
    return TaskStatus_IN_PROGRESS_instance;
  }
  function TaskStatus_COMPLETED_getInstance() {
    TaskStatus_initEntries();
    return TaskStatus_COMPLETED_instance;
  }
  function TaskStatus_CANCELLED_getInstance() {
    TaskStatus_initEntries();
    return TaskStatus_CANCELLED_instance;
  }
  function TaskStatus_OVERDUE_getInstance() {
    TaskStatus_initEntries();
    return TaskStatus_OVERDUE_instance;
  }
  function TaskPriority_LOW_getInstance() {
    TaskPriority_initEntries();
    return TaskPriority_LOW_instance;
  }
  function TaskPriority_MEDIUM_getInstance() {
    TaskPriority_initEntries();
    return TaskPriority_MEDIUM_instance;
  }
  function TaskPriority_HIGH_getInstance() {
    TaskPriority_initEntries();
    return TaskPriority_HIGH_instance;
  }
  function TaskPriority_URGENT_getInstance() {
    TaskPriority_initEntries();
    return TaskPriority_URGENT_instance;
  }
  var UserRole_FARMER_instance;
  var UserRole_MANAGER_instance;
  var UserRole_WORKER_instance;
  var UserRole_ADMIN_instance;
  function values_11() {
    return [UserRole_FARMER_getInstance(), UserRole_MANAGER_getInstance(), UserRole_WORKER_getInstance(), UserRole_ADMIN_getInstance()];
  }
  function valueOf_11(value) {
    switch (value) {
      case 'FARMER':
        return UserRole_FARMER_getInstance();
      case 'MANAGER':
        return UserRole_MANAGER_getInstance();
      case 'WORKER':
        return UserRole_WORKER_getInstance();
      case 'ADMIN':
        return UserRole_ADMIN_getInstance();
      default:
        UserRole_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  function get_entries_11() {
    if ($ENTRIES_11 == null)
      $ENTRIES_11 = enumEntries(values_11());
    return $ENTRIES_11;
  }
  var UserRole_entriesInitialized;
  function UserRole_initEntries() {
    if (UserRole_entriesInitialized)
      return Unit_getInstance();
    UserRole_entriesInitialized = true;
    UserRole_FARMER_instance = new UserRole('FARMER', 0);
    UserRole_MANAGER_instance = new UserRole('MANAGER', 1);
    UserRole_WORKER_instance = new UserRole('WORKER', 2);
    UserRole_ADMIN_instance = new UserRole('ADMIN', 3);
  }
  var $ENTRIES_11;
  function UserRole(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function get_$stableprop_16() {
    return 0;
  }
  function User(id, email, firstName, lastName, role, farmId, createdAt, isActive) {
    id = id === VOID ? new Long(0, 0) : id;
    farmId = farmId === VOID ? null : farmId;
    createdAt = createdAt === VOID ? new Long(0, 0) : createdAt;
    isActive = isActive === VOID ? true : isActive;
    this.id_1 = id;
    this.email_1 = email;
    this.firstName_1 = firstName;
    this.lastName_1 = lastName;
    this.role_1 = role;
    this.farmId_1 = farmId;
    this.createdAt_1 = createdAt;
    this.isActive_1 = isActive;
    this.$stable_1 = 0;
  }
  protoOf(User).get_id_kntnx8_k$ = function () {
    return this.id_1;
  };
  protoOf(User).get_email_iqwbqr_k$ = function () {
    return this.email_1;
  };
  protoOf(User).get_firstName_aplxv6_k$ = function () {
    return this.firstName_1;
  };
  protoOf(User).get_lastName_f360wa_k$ = function () {
    return this.lastName_1;
  };
  protoOf(User).get_role_wotsxr_k$ = function () {
    return this.role_1;
  };
  protoOf(User).get_farmId_d7oohm_k$ = function () {
    return this.farmId_1;
  };
  protoOf(User).get_createdAt_ierzpu_k$ = function () {
    return this.createdAt_1;
  };
  protoOf(User).get_isActive_quafmh_k$ = function () {
    return this.isActive_1;
  };
  protoOf(User).component1_7eebsc_k$ = function () {
    return this.id_1;
  };
  protoOf(User).component2_7eebsb_k$ = function () {
    return this.email_1;
  };
  protoOf(User).component3_7eebsa_k$ = function () {
    return this.firstName_1;
  };
  protoOf(User).component4_7eebs9_k$ = function () {
    return this.lastName_1;
  };
  protoOf(User).component5_7eebs8_k$ = function () {
    return this.role_1;
  };
  protoOf(User).component6_7eebs7_k$ = function () {
    return this.farmId_1;
  };
  protoOf(User).component7_7eebs6_k$ = function () {
    return this.createdAt_1;
  };
  protoOf(User).component8_7eebs5_k$ = function () {
    return this.isActive_1;
  };
  protoOf(User).copy_3xk0bd_k$ = function (id, email, firstName, lastName, role, farmId, createdAt, isActive) {
    return new User(id, email, firstName, lastName, role, farmId, createdAt, isActive);
  };
  protoOf(User).copy$default_4az37w_k$ = function (id, email, firstName, lastName, role, farmId, createdAt, isActive, $super) {
    id = id === VOID ? this.id_1 : id;
    email = email === VOID ? this.email_1 : email;
    firstName = firstName === VOID ? this.firstName_1 : firstName;
    lastName = lastName === VOID ? this.lastName_1 : lastName;
    role = role === VOID ? this.role_1 : role;
    farmId = farmId === VOID ? this.farmId_1 : farmId;
    createdAt = createdAt === VOID ? this.createdAt_1 : createdAt;
    isActive = isActive === VOID ? this.isActive_1 : isActive;
    return $super === VOID ? this.copy_3xk0bd_k$(id, email, firstName, lastName, role, farmId, createdAt, isActive) : $super.copy_3xk0bd_k$.call(this, id, email, firstName, lastName, role, farmId, createdAt, isActive);
  };
  protoOf(User).toString = function () {
    return 'User(id=' + this.id_1.toString() + ', email=' + this.email_1 + ', firstName=' + this.firstName_1 + ', lastName=' + this.lastName_1 + ', role=' + this.role_1 + ', farmId=' + toString(this.farmId_1) + ', createdAt=' + this.createdAt_1.toString() + ', isActive=' + this.isActive_1 + ')';
  };
  protoOf(User).hashCode = function () {
    var result = this.id_1.hashCode();
    result = imul(result, 31) + getStringHashCode(this.email_1) | 0;
    result = imul(result, 31) + getStringHashCode(this.firstName_1) | 0;
    result = imul(result, 31) + getStringHashCode(this.lastName_1) | 0;
    result = imul(result, 31) + this.role_1.hashCode() | 0;
    result = imul(result, 31) + (this.farmId_1 == null ? 0 : this.farmId_1.hashCode()) | 0;
    result = imul(result, 31) + this.createdAt_1.hashCode() | 0;
    result = imul(result, 31) + getBooleanHashCode(this.isActive_1) | 0;
    return result;
  };
  protoOf(User).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof User))
      return false;
    var tmp0_other_with_cast = other instanceof User ? other : THROW_CCE();
    if (!this.id_1.equals(tmp0_other_with_cast.id_1))
      return false;
    if (!(this.email_1 === tmp0_other_with_cast.email_1))
      return false;
    if (!(this.firstName_1 === tmp0_other_with_cast.firstName_1))
      return false;
    if (!(this.lastName_1 === tmp0_other_with_cast.lastName_1))
      return false;
    if (!this.role_1.equals(tmp0_other_with_cast.role_1))
      return false;
    if (!equals(this.farmId_1, tmp0_other_with_cast.farmId_1))
      return false;
    if (!this.createdAt_1.equals(tmp0_other_with_cast.createdAt_1))
      return false;
    if (!(this.isActive_1 === tmp0_other_with_cast.isActive_1))
      return false;
    return true;
  };
  function UserRole_FARMER_getInstance() {
    UserRole_initEntries();
    return UserRole_FARMER_instance;
  }
  function UserRole_MANAGER_getInstance() {
    UserRole_initEntries();
    return UserRole_MANAGER_instance;
  }
  function UserRole_WORKER_getInstance() {
    UserRole_initEntries();
    return UserRole_WORKER_instance;
  }
  function UserRole_ADMIN_getInstance() {
    UserRole_initEntries();
    return UserRole_ADMIN_instance;
  }
  function _get_typeSerial0__3fdbgx($this) {
    return $this.typeSerial0__1;
  }
  function $serializer_init_$Init$(typeSerial0, $this) {
    $serializer.call($this);
    $this.typeSerial0__1 = typeSerial0;
    return $this;
  }
  function $serializer_init_$Create$(typeSerial0) {
    return $serializer_init_$Init$(typeSerial0, objectCreate(protoOf($serializer)));
  }
  function get_$stableprop_17() {
    return 0;
  }
  function Companion() {
    Companion_instance = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('com.yourcompany.smartfarm.shared.services.CacheService.CacheEntry', null, 3);
    tmp0_serialDesc.addElement_5pzumi_k$('data', false);
    tmp0_serialDesc.addElement_5pzumi_k$('timestamp', false);
    tmp0_serialDesc.addElement_5pzumi_k$('ttl', false);
    this.$cachedDescriptor_1 = tmp0_serialDesc;
  }
  protoOf(Companion).serializer_ftvo48_k$ = function (typeSerial0) {
    return $serializer_init_$Create$(typeSerial0);
  };
  protoOf(Companion).serializer_nv39qc_k$ = function (typeParamsSerializers) {
    return this.serializer_ftvo48_k$(typeParamsSerializers[0]);
  };
  protoOf(Companion).get_$cachedDescriptor_3xtnpw_k$ = function () {
    return this.$cachedDescriptor_1;
  };
  var Companion_instance;
  function Companion_getInstance() {
    if (Companion_instance == null)
      new Companion();
    return Companion_instance;
  }
  function $serializer() {
    this.$stable_1 = 0;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('com.yourcompany.smartfarm.shared.services.CacheService.CacheEntry', this, 3);
    tmp0_serialDesc.addElement_5pzumi_k$('data', false);
    tmp0_serialDesc.addElement_5pzumi_k$('timestamp', false);
    tmp0_serialDesc.addElement_5pzumi_k$('ttl', false);
    this.descriptor_1 = tmp0_serialDesc;
  }
  protoOf($serializer).get_descriptor_wjt6a0_k$ = function () {
    return this.descriptor_1;
  };
  protoOf($serializer).childSerializers_5ghqw5_k$ = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [this.typeSerial0__1, LongSerializer_getInstance(), LongSerializer_getInstance()];
  };
  protoOf($serializer).deserialize_sy6x50_k$ = function (decoder) {
    var tmp0_desc = this.descriptor_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_local1 = new Long(0, 0);
    var tmp6_local2 = new Long(0, 0);
    var tmp8_input = decoder.beginStructure_yljocp_k$(tmp0_desc);
    if (tmp8_input.decodeSequentially_xlblqy_k$()) {
      tmp4_local0 = tmp8_input.decodeSerializableElement_uahnnv_k$(tmp0_desc, 0, this.typeSerial0__1, tmp4_local0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp8_input.decodeLongElement_994anb_k$(tmp0_desc, 1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
      tmp6_local2 = tmp8_input.decodeLongElement_994anb_k$(tmp0_desc, 2);
      tmp3_bitMask0 = tmp3_bitMask0 | 4;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp8_input.decodeElementIndex_bstkhp_k$(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp8_input.decodeSerializableElement_uahnnv_k$(tmp0_desc, 0, this.typeSerial0__1, tmp4_local0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp8_input.decodeLongElement_994anb_k$(tmp0_desc, 1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          case 2:
            tmp6_local2 = tmp8_input.decodeLongElement_994anb_k$(tmp0_desc, 2);
            tmp3_bitMask0 = tmp3_bitMask0 | 4;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp8_input.endStructure_1xqz0n_k$(tmp0_desc);
    return CacheEntry_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, null);
  };
  protoOf($serializer).serialize_boieqk_k$ = function (encoder, value) {
    var tmp0_desc = this.descriptor_1;
    var tmp1_output = encoder.beginStructure_yljocp_k$(tmp0_desc);
    tmp1_output.encodeSerializableElement_isqxcl_k$(tmp0_desc, 0, this.typeSerial0__1, value.data_1);
    tmp1_output.encodeLongElement_cega27_k$(tmp0_desc, 1, value.timestamp_1);
    tmp1_output.encodeLongElement_cega27_k$(tmp0_desc, 2, value.ttl_1);
    tmp1_output.endStructure_1xqz0n_k$(tmp0_desc);
  };
  protoOf($serializer).serialize_5ase3y_k$ = function (encoder, value) {
    return this.serialize_boieqk_k$(encoder, value instanceof CacheEntry ? value : THROW_CCE());
  };
  protoOf($serializer).typeParametersSerializers_fr94fx_k$ = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [this.typeSerial0__1];
  };
  function CacheEntry_init_$Init$(seen1, data, timestamp, ttl, serializationConstructorMarker, $this) {
    if (!(7 === (7 & seen1))) {
      throwMissingFieldException(seen1, 7, Companion_getInstance().$cachedDescriptor_1);
    }
    $this.data_1 = data;
    $this.timestamp_1 = timestamp;
    $this.ttl_1 = ttl;
    $this.$stable_1 = 0;
    return $this;
  }
  function CacheEntry_init_$Create$(seen1, data, timestamp, ttl, serializationConstructorMarker) {
    return CacheEntry_init_$Init$(seen1, data, timestamp, ttl, serializationConstructorMarker, objectCreate(protoOf(CacheEntry)));
  }
  function get_$stableprop_18() {
    return 0;
  }
  function get_$stableprop_19() {
    return 0;
  }
  function _get_json__d8whur($this) {
    return $this.json_1;
  }
  function estimateMemoryUsage($this) {
    var tmp;
    try {
      // Inline function 'kotlinx.serialization.encodeToString' call
      var this_0 = $this.json_1;
      var value = $this.cache_1;
      // Inline function 'kotlinx.serialization.serializer' call
      var this_1 = this_0.get_serializersModule_piitvg_k$();
      // Inline function 'kotlinx.serialization.internal.cast' call
      var this_2 = serializer(this_1, createKType(getKClass(MutableMap), arrayOf([createInvariantKTypeProjection(createKType(PrimitiveClasses_getInstance().get_stringClass_bik2gy_k$(), arrayOf([]), false)), createInvariantKTypeProjection(createKType(getKClass(CacheEntry), arrayOf([getStarKTypeProjection()]), false))]), false));
      var tmp$ret$1 = isInterface(this_2, KSerializer) ? this_2 : THROW_CCE();
      var serialized = this_0.encodeToString_k0apqx_k$(tmp$ret$1, value);
      // Inline function 'kotlin.Long.times' call
      tmp = toLong(serialized.length).times_nfzjiw_k$(toLong(2));
    } catch ($p) {
      var tmp_0;
      if ($p instanceof Exception) {
        var e = $p;
        tmp_0 = new Long(0, 0);
      } else {
        throw $p;
      }
      tmp = tmp_0;
    }
    return tmp;
  }
  function CacheEntry(data, timestamp, ttl) {
    Companion_getInstance();
    this.data_1 = data;
    this.timestamp_1 = timestamp;
    this.ttl_1 = ttl;
    this.$stable_1 = 0;
  }
  protoOf(CacheEntry).get_data_wokkxf_k$ = function () {
    return this.data_1;
  };
  protoOf(CacheEntry).get_timestamp_9fccx9_k$ = function () {
    return this.timestamp_1;
  };
  protoOf(CacheEntry).get_ttl_18iv7h_k$ = function () {
    return this.ttl_1;
  };
  protoOf(CacheEntry).component1_7eebsc_k$ = function () {
    return this.data_1;
  };
  protoOf(CacheEntry).component2_7eebsb_k$ = function () {
    return this.timestamp_1;
  };
  protoOf(CacheEntry).component3_7eebsa_k$ = function () {
    return this.ttl_1;
  };
  protoOf(CacheEntry).copy_v7duvu_k$ = function (data, timestamp, ttl) {
    return new CacheEntry(data, timestamp, ttl);
  };
  protoOf(CacheEntry).copy$default_f1wtp8_k$ = function (data, timestamp, ttl, $super) {
    data = data === VOID ? this.data_1 : data;
    timestamp = timestamp === VOID ? this.timestamp_1 : timestamp;
    ttl = ttl === VOID ? this.ttl_1 : ttl;
    return $super === VOID ? this.copy_v7duvu_k$(data, timestamp, ttl) : $super.copy_v7duvu_k$.call(this, data, timestamp, ttl);
  };
  protoOf(CacheEntry).toString = function () {
    return 'CacheEntry(data=' + this.data_1 + ', timestamp=' + this.timestamp_1.toString() + ', ttl=' + this.ttl_1.toString() + ')';
  };
  protoOf(CacheEntry).hashCode = function () {
    var result = this.data_1 == null ? 0 : hashCode(this.data_1);
    result = imul(result, 31) + this.timestamp_1.hashCode() | 0;
    result = imul(result, 31) + this.ttl_1.hashCode() | 0;
    return result;
  };
  protoOf(CacheEntry).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof CacheEntry))
      return false;
    var tmp0_other_with_cast = other instanceof CacheEntry ? other : THROW_CCE();
    if (!equals(this.data_1, tmp0_other_with_cast.data_1))
      return false;
    if (!this.timestamp_1.equals(tmp0_other_with_cast.timestamp_1))
      return false;
    if (!this.ttl_1.equals(tmp0_other_with_cast.ttl_1))
      return false;
    return true;
  };
  function CacheStats(totalEntries, validEntries, expiredEntries, memoryUsage) {
    this.totalEntries_1 = totalEntries;
    this.validEntries_1 = validEntries;
    this.expiredEntries_1 = expiredEntries;
    this.memoryUsage_1 = memoryUsage;
    this.$stable_1 = 0;
  }
  protoOf(CacheStats).get_totalEntries_clk5cb_k$ = function () {
    return this.totalEntries_1;
  };
  protoOf(CacheStats).get_validEntries_z1dph9_k$ = function () {
    return this.validEntries_1;
  };
  protoOf(CacheStats).get_expiredEntries_lq6gcs_k$ = function () {
    return this.expiredEntries_1;
  };
  protoOf(CacheStats).get_memoryUsage_xtpljd_k$ = function () {
    return this.memoryUsage_1;
  };
  protoOf(CacheStats).component1_7eebsc_k$ = function () {
    return this.totalEntries_1;
  };
  protoOf(CacheStats).component2_7eebsb_k$ = function () {
    return this.validEntries_1;
  };
  protoOf(CacheStats).component3_7eebsa_k$ = function () {
    return this.expiredEntries_1;
  };
  protoOf(CacheStats).component4_7eebs9_k$ = function () {
    return this.memoryUsage_1;
  };
  protoOf(CacheStats).copy_3qwomt_k$ = function (totalEntries, validEntries, expiredEntries, memoryUsage) {
    return new CacheStats(totalEntries, validEntries, expiredEntries, memoryUsage);
  };
  protoOf(CacheStats).copy$default_m0vg4r_k$ = function (totalEntries, validEntries, expiredEntries, memoryUsage, $super) {
    totalEntries = totalEntries === VOID ? this.totalEntries_1 : totalEntries;
    validEntries = validEntries === VOID ? this.validEntries_1 : validEntries;
    expiredEntries = expiredEntries === VOID ? this.expiredEntries_1 : expiredEntries;
    memoryUsage = memoryUsage === VOID ? this.memoryUsage_1 : memoryUsage;
    return $super === VOID ? this.copy_3qwomt_k$(totalEntries, validEntries, expiredEntries, memoryUsage) : $super.copy_3qwomt_k$.call(this, totalEntries, validEntries, expiredEntries, memoryUsage);
  };
  protoOf(CacheStats).toString = function () {
    return 'CacheStats(totalEntries=' + this.totalEntries_1 + ', validEntries=' + this.validEntries_1 + ', expiredEntries=' + this.expiredEntries_1 + ', memoryUsage=' + this.memoryUsage_1.toString() + ')';
  };
  protoOf(CacheStats).hashCode = function () {
    var result = this.totalEntries_1;
    result = imul(result, 31) + this.validEntries_1 | 0;
    result = imul(result, 31) + this.expiredEntries_1 | 0;
    result = imul(result, 31) + this.memoryUsage_1.hashCode() | 0;
    return result;
  };
  protoOf(CacheStats).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof CacheStats))
      return false;
    var tmp0_other_with_cast = other instanceof CacheStats ? other : THROW_CCE();
    if (!(this.totalEntries_1 === tmp0_other_with_cast.totalEntries_1))
      return false;
    if (!(this.validEntries_1 === tmp0_other_with_cast.validEntries_1))
      return false;
    if (!(this.expiredEntries_1 === tmp0_other_with_cast.expiredEntries_1))
      return false;
    if (!this.memoryUsage_1.equals(tmp0_other_with_cast.memoryUsage_1))
      return false;
    return true;
  };
  function Companion_0() {
    Companion_instance_0 = this;
    this.FARMS_CACHE_KEY_1 = 'farms';
    this.CROPS_CACHE_KEY_1 = 'crops';
    this.LIVESTOCK_CACHE_KEY_1 = 'livestock';
    this.TASKS_CACHE_KEY_1 = 'tasks';
    this.INVENTORY_CACHE_KEY_1 = 'inventory';
    this.FINANCIAL_CACHE_KEY_1 = 'financial';
    this.STATS_CACHE_KEY_1 = 'stats';
    this.FARMS_TTL_1 = new Long(600000, 0);
    this.CROPS_TTL_1 = new Long(300000, 0);
    this.LIVESTOCK_TTL_1 = new Long(300000, 0);
    this.TASKS_TTL_1 = new Long(120000, 0);
    this.INVENTORY_TTL_1 = new Long(900000, 0);
    this.FINANCIAL_TTL_1 = new Long(1800000, 0);
    this.STATS_TTL_1 = new Long(60000, 0);
  }
  protoOf(Companion_0).get_FARMS_CACHE_KEY_pnzu21_k$ = function () {
    return this.FARMS_CACHE_KEY_1;
  };
  protoOf(Companion_0).get_CROPS_CACHE_KEY_8jnr7n_k$ = function () {
    return this.CROPS_CACHE_KEY_1;
  };
  protoOf(Companion_0).get_LIVESTOCK_CACHE_KEY_i0ec5g_k$ = function () {
    return this.LIVESTOCK_CACHE_KEY_1;
  };
  protoOf(Companion_0).get_TASKS_CACHE_KEY_u4yuzs_k$ = function () {
    return this.TASKS_CACHE_KEY_1;
  };
  protoOf(Companion_0).get_INVENTORY_CACHE_KEY_y0nmiy_k$ = function () {
    return this.INVENTORY_CACHE_KEY_1;
  };
  protoOf(Companion_0).get_FINANCIAL_CACHE_KEY_uv7nq5_k$ = function () {
    return this.FINANCIAL_CACHE_KEY_1;
  };
  protoOf(Companion_0).get_STATS_CACHE_KEY_nxl0zd_k$ = function () {
    return this.STATS_CACHE_KEY_1;
  };
  protoOf(Companion_0).get_FARMS_TTL_yk16pr_k$ = function () {
    return this.FARMS_TTL_1;
  };
  protoOf(Companion_0).get_CROPS_TTL_5a2kdj_k$ = function () {
    return this.CROPS_TTL_1;
  };
  protoOf(Companion_0).get_LIVESTOCK_TTL_etvc0i_k$ = function () {
    return this.LIVESTOCK_TTL_1;
  };
  protoOf(Companion_0).get_TASKS_TTL_d4m4ha_k$ = function () {
    return this.TASKS_TTL_1;
  };
  protoOf(Companion_0).get_INVENTORY_TTL_p45i5c_k$ = function () {
    return this.INVENTORY_TTL_1;
  };
  protoOf(Companion_0).get_FINANCIAL_TTL_mfncxf_k$ = function () {
    return this.FINANCIAL_TTL_1;
  };
  protoOf(Companion_0).get_STATS_TTL_kc663n_k$ = function () {
    return this.STATS_TTL_1;
  };
  var Companion_instance_0;
  function Companion_getInstance_0() {
    if (Companion_instance_0 == null)
      new Companion_0();
    return Companion_instance_0;
  }
  function get_$stableprop_20() {
    return 8;
  }
  function CacheService$json$lambda($this$Json) {
    $this$Json.set_ignoreUnknownKeys_pzvtne_k$(true);
    $this$Json.set_isLenient_kuajk5_k$(true);
    return Unit_getInstance();
  }
  function CacheService() {
    Companion_getInstance_0();
    var tmp = this;
    tmp.json_1 = Json(VOID, CacheService$json$lambda);
    var tmp_0 = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp_0.cache_1 = LinkedHashMap_init_$Create$();
    this.defaultTtl_1 = new Long(300000, 0);
    this.$stable_1 = 8;
  }
  protoOf(CacheService).get_cache_ipl461_k$ = function () {
    return this.cache_1;
  };
  protoOf(CacheService).get_defaultTtl_8y7fd8_k$ = function () {
    return this.defaultTtl_1;
  };
  protoOf(CacheService).exists_4isqe6_k$ = function (key) {
    var tmp0_elvis_lhs = this.cache_1.get_wei43m_k$(key);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return false;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var entry = tmp;
    return !this.isExpired_uuotzk_k$(entry);
  };
  protoOf(CacheService).remove_6241ba_k$ = function (key) {
    this.cache_1.remove_gppy8k_k$(key);
  };
  protoOf(CacheService).clear_j9egeb_k$ = function () {
    this.cache_1.clear_j9egeb_k$();
  };
  protoOf(CacheService).getStats_wi99m1_k$ = function () {
    var totalEntries = this.cache_1.get_size_woubt6_k$();
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlin.collections.count' call
      var this_0 = this.cache_1.get_values_ksazhn_k$();
      var tmp;
      if (isInterface(this_0, Collection)) {
        tmp = this_0.isEmpty_y1axqb_k$();
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$0 = 0;
        break $l$block;
      }
      var count = 0;
      var tmp0_iterator = this_0.iterator_jk1svi_k$();
      while (tmp0_iterator.hasNext_bitz1p_k$()) {
        var element = tmp0_iterator.next_20eer_k$();
        // Inline function 'com.yourcompany.smartfarm.shared.services.CacheService.getStats.<anonymous>' call
        if (this.isExpired_uuotzk_k$(element)) {
          count = count + 1 | 0;
          checkCountOverflow(count);
        }
      }
      tmp$ret$0 = count;
    }
    var expiredEntries = tmp$ret$0;
    var validEntries = totalEntries - expiredEntries | 0;
    return new CacheStats(totalEntries, validEntries, expiredEntries, estimateMemoryUsage(this));
  };
  protoOf(CacheService).isExpired_uuotzk_k$ = function (entry) {
    var now = getCurrentTimeMillis();
    return now.minus_mfbszm_k$(entry.timestamp_1).compareTo_9jj042_k$(entry.ttl_1) > 0;
  };
  protoOf(CacheService).cleanupExpiredEntries_4ny9i7_k$ = function () {
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.filter' call
    // Inline function 'kotlin.collections.filterTo' call
    var this_0 = this.cache_1.get_entries_p20ztl_k$();
    var destination = ArrayList_init_$Create$();
    var tmp0_iterator = this_0.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var element = tmp0_iterator.next_20eer_k$();
      // Inline function 'com.yourcompany.smartfarm.shared.services.CacheService.cleanupExpiredEntries.<anonymous>' call
      if (this.isExpired_uuotzk_k$(element.get_value_j01efc_k$())) {
        destination.add_utx5q5_k$(element);
      }
    }
    // Inline function 'kotlin.collections.mapTo' call
    var destination_0 = ArrayList_init_$Create$_0(collectionSizeOrDefault(destination, 10));
    var tmp0_iterator_0 = destination.iterator_jk1svi_k$();
    while (tmp0_iterator_0.hasNext_bitz1p_k$()) {
      var item = tmp0_iterator_0.next_20eer_k$();
      // Inline function 'com.yourcompany.smartfarm.shared.services.CacheService.cleanupExpiredEntries.<anonymous>' call
      var tmp$ret$3 = item.get_key_18j28a_k$();
      destination_0.add_utx5q5_k$(tmp$ret$3);
    }
    var expiredKeys = destination_0;
    // Inline function 'kotlin.collections.forEach' call
    var tmp0_iterator_1 = expiredKeys.iterator_jk1svi_k$();
    while (tmp0_iterator_1.hasNext_bitz1p_k$()) {
      var element_0 = tmp0_iterator_1.next_20eer_k$();
      // Inline function 'com.yourcompany.smartfarm.shared.services.CacheService.cleanupExpiredEntries.<anonymous>' call
      this.cache_1.remove_gppy8k_k$(element_0);
    }
  };
  function _get_mockFarms__gkbile($this) {
    return $this.mockFarms_1;
  }
  function _get_mockCrops__hq5qfc($this) {
    return $this.mockCrops_1;
  }
  function _get_mockLivestock__edqbn3($this) {
    return $this.mockLivestock_1;
  }
  function _get_mockTasks__9xo7kj($this) {
    return $this.mockTasks_1;
  }
  function _get_mockUsers__96z34d($this) {
    return $this.mockUsers_1;
  }
  function _get_mockInventory__eea7s1($this) {
    return $this.mockInventory_1;
  }
  function _get_mockFinancialRecords__2w8hag($this) {
    return $this.mockFinancialRecords_1;
  }
  function get_$stableprop_21() {
    return 0;
  }
  function $getFarmsCOROUTINE$0(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
  }
  protoOf($getFarmsCOROUTINE$0).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(500, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            return toList(this._this__u8e3s4__1.mockFarms_1);
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
  function $getFarmCOROUTINE$1(_this__u8e3s4, id, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.id_1 = id;
  }
  protoOf($getFarmCOROUTINE$1).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(300, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var this_0 = this._this__u8e3s4__1.mockFarms_1;
            var tmp$ret$0;
            l$ret$1: do {
              var tmp0_iterator = this_0.iterator_jk1svi_k$();
              while (tmp0_iterator.hasNext_bitz1p_k$()) {
                var element = tmp0_iterator.next_20eer_k$();
                if (element.get_id_kntnx8_k$().toString() === this.id_1) {
                  tmp$ret$0 = element;
                  break l$ret$1;
                }
              }
              tmp$ret$0 = null;
            }
             while (false);
            return tmp$ret$0;
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
  function $createFarmCOROUTINE$2(_this__u8e3s4, farm, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.farm_1 = farm;
  }
  protoOf($createFarmCOROUTINE$2).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(500, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var tmp$ret$0;
            l$ret$1: do {
              var iterator = this._this__u8e3s4__1.mockFarms_1.iterator_jk1svi_k$();
              if (!iterator.hasNext_bitz1p_k$()) {
                tmp$ret$0 = null;
                break l$ret$1;
              }
              var maxValue = iterator.next_20eer_k$().get_id_kntnx8_k$();
              while (iterator.hasNext_bitz1p_k$()) {
                var v = iterator.next_20eer_k$().get_id_kntnx8_k$();
                if (compareTo(maxValue, v) < 0) {
                  maxValue = v;
                }
              }
              tmp$ret$0 = maxValue;
            }
             while (false);
            var tmp0_elvis_lhs = tmp$ret$0;
            var this_0 = tmp0_elvis_lhs == null ? new Long(0, 0) : tmp0_elvis_lhs;
            var newFarm = this.farm_1.copy$default_udj1ph_k$(this_0.plus_r93sks_k$(toLong(1)));
            this._this__u8e3s4__1.mockFarms_1.add_utx5q5_k$(newFarm);
            return newFarm;
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
  function $updateFarmCOROUTINE$3(_this__u8e3s4, farm, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.farm_1 = farm;
  }
  protoOf($updateFarmCOROUTINE$3).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(300, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var tmp$ret$0;
            l$ret$1: do {
              var index = 0;
              var tmp0_iterator = this._this__u8e3s4__1.mockFarms_1.iterator_jk1svi_k$();
              while (tmp0_iterator.hasNext_bitz1p_k$()) {
                var item = tmp0_iterator.next_20eer_k$();
                if (item.get_id_kntnx8_k$().equals(this.farm_1.get_id_kntnx8_k$())) {
                  tmp$ret$0 = index;
                  break l$ret$1;
                }
                index = index + 1 | 0;
              }
              tmp$ret$0 = -1;
            }
             while (false);
            var index_0 = tmp$ret$0;
            if (!(index_0 === -1)) {
              this._this__u8e3s4__1.mockFarms_1.set_82063s_k$(index_0, this.farm_1.copy$default_udj1ph_k$(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, getCurrentTimeMillis()));
              return this._this__u8e3s4__1.mockFarms_1.get_c1px32_k$(index_0);
            }

            return this.farm_1;
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
  function $deleteFarmCOROUTINE$4(_this__u8e3s4, id, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.id_1 = id;
  }
  protoOf($deleteFarmCOROUTINE$4).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(300, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var tmp$ret$0;
            l$ret$1: do {
              var index = 0;
              var tmp0_iterator = this._this__u8e3s4__1.mockFarms_1.iterator_jk1svi_k$();
              while (tmp0_iterator.hasNext_bitz1p_k$()) {
                var item = tmp0_iterator.next_20eer_k$();
                if (item.get_id_kntnx8_k$().toString() === this.id_1) {
                  tmp$ret$0 = index;
                  break l$ret$1;
                }
                index = index + 1 | 0;
              }
              tmp$ret$0 = -1;
            }
             while (false);
            var index_0 = tmp$ret$0;
            if (!(index_0 === -1)) {
              this._this__u8e3s4__1.mockFarms_1.removeAt_6niowx_k$(index_0);
              return true;
            }

            return false;
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
  function $getCropsCOROUTINE$5(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
  }
  protoOf($getCropsCOROUTINE$5).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(400, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            return toList(this._this__u8e3s4__1.mockCrops_1);
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
  function $getCropCOROUTINE$6(_this__u8e3s4, id, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.id_1 = id;
  }
  protoOf($getCropCOROUTINE$6).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(300, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var this_0 = this._this__u8e3s4__1.mockCrops_1;
            var tmp$ret$0;
            l$ret$1: do {
              var tmp0_iterator = this_0.iterator_jk1svi_k$();
              while (tmp0_iterator.hasNext_bitz1p_k$()) {
                var element = tmp0_iterator.next_20eer_k$();
                if (element.get_id_kntnx8_k$().toString() === this.id_1) {
                  tmp$ret$0 = element;
                  break l$ret$1;
                }
              }
              tmp$ret$0 = null;
            }
             while (false);
            return tmp$ret$0;
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
  function $createCropCOROUTINE$7(_this__u8e3s4, crop, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.crop_1 = crop;
  }
  protoOf($createCropCOROUTINE$7).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(500, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var tmp$ret$0;
            l$ret$1: do {
              var iterator = this._this__u8e3s4__1.mockCrops_1.iterator_jk1svi_k$();
              if (!iterator.hasNext_bitz1p_k$()) {
                tmp$ret$0 = null;
                break l$ret$1;
              }
              var maxValue = iterator.next_20eer_k$().get_id_kntnx8_k$();
              while (iterator.hasNext_bitz1p_k$()) {
                var v = iterator.next_20eer_k$().get_id_kntnx8_k$();
                if (compareTo(maxValue, v) < 0) {
                  maxValue = v;
                }
              }
              tmp$ret$0 = maxValue;
            }
             while (false);
            var tmp0_elvis_lhs = tmp$ret$0;
            var this_0 = tmp0_elvis_lhs == null ? new Long(0, 0) : tmp0_elvis_lhs;
            var newCrop = this.crop_1.copy$default_l1svig_k$(this_0.plus_r93sks_k$(toLong(1)));
            this._this__u8e3s4__1.mockCrops_1.add_utx5q5_k$(newCrop);
            return newCrop;
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
  function $updateCropCOROUTINE$8(_this__u8e3s4, crop, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.crop_1 = crop;
  }
  protoOf($updateCropCOROUTINE$8).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(300, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var tmp$ret$0;
            l$ret$1: do {
              var index = 0;
              var tmp0_iterator = this._this__u8e3s4__1.mockCrops_1.iterator_jk1svi_k$();
              while (tmp0_iterator.hasNext_bitz1p_k$()) {
                var item = tmp0_iterator.next_20eer_k$();
                if (item.get_id_kntnx8_k$().equals(this.crop_1.get_id_kntnx8_k$())) {
                  tmp$ret$0 = index;
                  break l$ret$1;
                }
                index = index + 1 | 0;
              }
              tmp$ret$0 = -1;
            }
             while (false);
            var index_0 = tmp$ret$0;
            if (!(index_0 === -1)) {
              this._this__u8e3s4__1.mockCrops_1.set_82063s_k$(index_0, this.crop_1);
              return this._this__u8e3s4__1.mockCrops_1.get_c1px32_k$(index_0);
            }

            return this.crop_1;
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
  function $deleteCropCOROUTINE$9(_this__u8e3s4, id, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.id_1 = id;
  }
  protoOf($deleteCropCOROUTINE$9).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(300, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var tmp$ret$0;
            l$ret$1: do {
              var index = 0;
              var tmp0_iterator = this._this__u8e3s4__1.mockCrops_1.iterator_jk1svi_k$();
              while (tmp0_iterator.hasNext_bitz1p_k$()) {
                var item = tmp0_iterator.next_20eer_k$();
                if (item.get_id_kntnx8_k$().equals(this.id_1)) {
                  tmp$ret$0 = index;
                  break l$ret$1;
                }
                index = index + 1 | 0;
              }
              tmp$ret$0 = -1;
            }
             while (false);
            var index_0 = tmp$ret$0;
            if (!(index_0 === -1)) {
              this._this__u8e3s4__1.mockCrops_1.removeAt_6niowx_k$(index_0);
              return true;
            }

            return false;
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
  function $addCropCOROUTINE$10(_this__u8e3s4, crop, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.crop_1 = crop;
  }
  protoOf($addCropCOROUTINE$10).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(500, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var tmp$ret$0;
            l$ret$1: do {
              var iterator = this._this__u8e3s4__1.mockCrops_1.iterator_jk1svi_k$();
              if (!iterator.hasNext_bitz1p_k$()) {
                tmp$ret$0 = null;
                break l$ret$1;
              }
              var maxValue = iterator.next_20eer_k$().get_id_kntnx8_k$();
              while (iterator.hasNext_bitz1p_k$()) {
                var v = iterator.next_20eer_k$().get_id_kntnx8_k$();
                if (compareTo(maxValue, v) < 0) {
                  maxValue = v;
                }
              }
              tmp$ret$0 = maxValue;
            }
             while (false);
            var tmp0_elvis_lhs = tmp$ret$0;
            var this_0 = tmp0_elvis_lhs == null ? new Long(0, 0) : tmp0_elvis_lhs;
            var newCrop = this.crop_1.copy$default_l1svig_k$(this_0.plus_r93sks_k$(toLong(1)));
            this._this__u8e3s4__1.mockCrops_1.add_utx5q5_k$(newCrop);
            return newCrop;
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
  function $getLivestockCOROUTINE$11(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
  }
  protoOf($getLivestockCOROUTINE$11).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(400, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            return toList(this._this__u8e3s4__1.mockLivestock_1);
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
  function $getLivestockItemCOROUTINE$12(_this__u8e3s4, id, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.id_1 = id;
  }
  protoOf($getLivestockItemCOROUTINE$12).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(300, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var this_0 = this._this__u8e3s4__1.mockLivestock_1;
            var tmp$ret$0;
            l$ret$1: do {
              var tmp0_iterator = this_0.iterator_jk1svi_k$();
              while (tmp0_iterator.hasNext_bitz1p_k$()) {
                var element = tmp0_iterator.next_20eer_k$();
                if (element.get_id_kntnx8_k$().toString() === this.id_1) {
                  tmp$ret$0 = element;
                  break l$ret$1;
                }
              }
              tmp$ret$0 = null;
            }
             while (false);
            return tmp$ret$0;
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
  function $createLivestockCOROUTINE$13(_this__u8e3s4, livestock, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.livestock_1 = livestock;
  }
  protoOf($createLivestockCOROUTINE$13).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(500, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var tmp$ret$0;
            l$ret$1: do {
              var iterator = this._this__u8e3s4__1.mockLivestock_1.iterator_jk1svi_k$();
              if (!iterator.hasNext_bitz1p_k$()) {
                tmp$ret$0 = null;
                break l$ret$1;
              }
              var maxValue = iterator.next_20eer_k$().get_id_kntnx8_k$();
              while (iterator.hasNext_bitz1p_k$()) {
                var v = iterator.next_20eer_k$().get_id_kntnx8_k$();
                if (compareTo(maxValue, v) < 0) {
                  maxValue = v;
                }
              }
              tmp$ret$0 = maxValue;
            }
             while (false);
            var tmp0_elvis_lhs = tmp$ret$0;
            var this_0 = tmp0_elvis_lhs == null ? new Long(0, 0) : tmp0_elvis_lhs;
            var newLivestock = this.livestock_1.copy$default_o21fmn_k$(this_0.plus_r93sks_k$(toLong(1)));
            this._this__u8e3s4__1.mockLivestock_1.add_utx5q5_k$(newLivestock);
            return newLivestock;
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
  function $addLivestockCOROUTINE$14(_this__u8e3s4, livestock, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.livestock_1 = livestock;
  }
  protoOf($addLivestockCOROUTINE$14).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(500, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var tmp$ret$0;
            l$ret$1: do {
              var iterator = this._this__u8e3s4__1.mockLivestock_1.iterator_jk1svi_k$();
              if (!iterator.hasNext_bitz1p_k$()) {
                tmp$ret$0 = null;
                break l$ret$1;
              }
              var maxValue = iterator.next_20eer_k$().get_id_kntnx8_k$();
              while (iterator.hasNext_bitz1p_k$()) {
                var v = iterator.next_20eer_k$().get_id_kntnx8_k$();
                if (compareTo(maxValue, v) < 0) {
                  maxValue = v;
                }
              }
              tmp$ret$0 = maxValue;
            }
             while (false);
            var tmp0_elvis_lhs = tmp$ret$0;
            var this_0 = tmp0_elvis_lhs == null ? new Long(0, 0) : tmp0_elvis_lhs;
            var newLivestock = this.livestock_1.copy$default_o21fmn_k$(this_0.plus_r93sks_k$(toLong(1)));
            this._this__u8e3s4__1.mockLivestock_1.add_utx5q5_k$(newLivestock);
            return newLivestock;
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
  function $updateLivestockCOROUTINE$15(_this__u8e3s4, livestock, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.livestock_1 = livestock;
  }
  protoOf($updateLivestockCOROUTINE$15).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(300, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var tmp$ret$0;
            l$ret$1: do {
              var index = 0;
              var tmp0_iterator = this._this__u8e3s4__1.mockLivestock_1.iterator_jk1svi_k$();
              while (tmp0_iterator.hasNext_bitz1p_k$()) {
                var item = tmp0_iterator.next_20eer_k$();
                if (item.get_id_kntnx8_k$().equals(this.livestock_1.get_id_kntnx8_k$())) {
                  tmp$ret$0 = index;
                  break l$ret$1;
                }
                index = index + 1 | 0;
              }
              tmp$ret$0 = -1;
            }
             while (false);
            var index_0 = tmp$ret$0;
            if (!(index_0 === -1)) {
              this._this__u8e3s4__1.mockLivestock_1.set_82063s_k$(index_0, this.livestock_1);
              return this._this__u8e3s4__1.mockLivestock_1.get_c1px32_k$(index_0);
            }

            return this.livestock_1;
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
  function $deleteLivestockCOROUTINE$16(_this__u8e3s4, id, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.id_1 = id;
  }
  protoOf($deleteLivestockCOROUTINE$16).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(300, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var tmp$ret$0;
            l$ret$1: do {
              var index = 0;
              var tmp0_iterator = this._this__u8e3s4__1.mockLivestock_1.iterator_jk1svi_k$();
              while (tmp0_iterator.hasNext_bitz1p_k$()) {
                var item = tmp0_iterator.next_20eer_k$();
                if (item.get_id_kntnx8_k$().equals(this.id_1)) {
                  tmp$ret$0 = index;
                  break l$ret$1;
                }
                index = index + 1 | 0;
              }
              tmp$ret$0 = -1;
            }
             while (false);
            var index_0 = tmp$ret$0;
            if (!(index_0 === -1)) {
              this._this__u8e3s4__1.mockLivestock_1.removeAt_6niowx_k$(index_0);
              return true;
            }

            return false;
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
  function $getTasksCOROUTINE$17(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
  }
  protoOf($getTasksCOROUTINE$17).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(400, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            return toList(this._this__u8e3s4__1.mockTasks_1);
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
  function $getTaskCOROUTINE$18(_this__u8e3s4, id, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.id_1 = id;
  }
  protoOf($getTaskCOROUTINE$18).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(300, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var this_0 = this._this__u8e3s4__1.mockTasks_1;
            var tmp$ret$0;
            l$ret$1: do {
              var tmp0_iterator = this_0.iterator_jk1svi_k$();
              while (tmp0_iterator.hasNext_bitz1p_k$()) {
                var element = tmp0_iterator.next_20eer_k$();
                if (element.get_id_kntnx8_k$().toString() === this.id_1) {
                  tmp$ret$0 = element;
                  break l$ret$1;
                }
              }
              tmp$ret$0 = null;
            }
             while (false);
            return tmp$ret$0;
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
  function $createTaskCOROUTINE$19(_this__u8e3s4, task, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.task_1 = task;
  }
  protoOf($createTaskCOROUTINE$19).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(500, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var tmp$ret$0;
            l$ret$1: do {
              var iterator = this._this__u8e3s4__1.mockTasks_1.iterator_jk1svi_k$();
              if (!iterator.hasNext_bitz1p_k$()) {
                tmp$ret$0 = null;
                break l$ret$1;
              }
              var maxValue = iterator.next_20eer_k$().get_id_kntnx8_k$();
              while (iterator.hasNext_bitz1p_k$()) {
                var v = iterator.next_20eer_k$().get_id_kntnx8_k$();
                if (compareTo(maxValue, v) < 0) {
                  maxValue = v;
                }
              }
              tmp$ret$0 = maxValue;
            }
             while (false);
            var tmp0_elvis_lhs = tmp$ret$0;
            var this_0 = tmp0_elvis_lhs == null ? new Long(0, 0) : tmp0_elvis_lhs;
            var newTask = this.task_1.copy$default_iturqf_k$(this_0.plus_r93sks_k$(toLong(1)));
            this._this__u8e3s4__1.mockTasks_1.add_utx5q5_k$(newTask);
            return newTask;
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
  function $updateTaskCOROUTINE$20(_this__u8e3s4, task, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.task_1 = task;
  }
  protoOf($updateTaskCOROUTINE$20).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(300, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var tmp$ret$0;
            l$ret$1: do {
              var index = 0;
              var tmp0_iterator = this._this__u8e3s4__1.mockTasks_1.iterator_jk1svi_k$();
              while (tmp0_iterator.hasNext_bitz1p_k$()) {
                var item = tmp0_iterator.next_20eer_k$();
                if (item.get_id_kntnx8_k$().equals(this.task_1.get_id_kntnx8_k$())) {
                  tmp$ret$0 = index;
                  break l$ret$1;
                }
                index = index + 1 | 0;
              }
              tmp$ret$0 = -1;
            }
             while (false);
            var index_0 = tmp$ret$0;
            if (!(index_0 === -1)) {
              this._this__u8e3s4__1.mockTasks_1.set_82063s_k$(index_0, this.task_1);
              return this._this__u8e3s4__1.mockTasks_1.get_c1px32_k$(index_0);
            }

            return this.task_1;
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
  function $deleteTaskCOROUTINE$21(_this__u8e3s4, id, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.id_1 = id;
  }
  protoOf($deleteTaskCOROUTINE$21).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(300, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var tmp$ret$0;
            l$ret$1: do {
              var index = 0;
              var tmp0_iterator = this._this__u8e3s4__1.mockTasks_1.iterator_jk1svi_k$();
              while (tmp0_iterator.hasNext_bitz1p_k$()) {
                var item = tmp0_iterator.next_20eer_k$();
                if (item.get_id_kntnx8_k$().toString() === this.id_1) {
                  tmp$ret$0 = index;
                  break l$ret$1;
                }
                index = index + 1 | 0;
              }
              tmp$ret$0 = -1;
            }
             while (false);
            var index_0 = tmp$ret$0;
            if (!(index_0 === -1)) {
              this._this__u8e3s4__1.mockTasks_1.removeAt_6niowx_k$(index_0);
              return true;
            }

            return false;
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
  function $updateTaskStatusCOROUTINE$22(_this__u8e3s4, taskId, status, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.taskId_1 = taskId;
    this.status_1 = status;
  }
  protoOf($updateTaskStatusCOROUTINE$22).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(300, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var tmp$ret$0;
            l$ret$1: do {
              var index = 0;
              var tmp0_iterator = this._this__u8e3s4__1.mockTasks_1.iterator_jk1svi_k$();
              while (tmp0_iterator.hasNext_bitz1p_k$()) {
                var item = tmp0_iterator.next_20eer_k$();
                if (item.get_id_kntnx8_k$().equals(this.taskId_1)) {
                  tmp$ret$0 = index;
                  break l$ret$1;
                }
                index = index + 1 | 0;
              }
              tmp$ret$0 = -1;
            }
             while (false);
            var taskIndex = tmp$ret$0;
            if (!(taskIndex === -1)) {
              var updatedTask = this._this__u8e3s4__1.mockTasks_1.get_c1px32_k$(taskIndex).copy$default_iturqf_k$(VOID, VOID, VOID, VOID, VOID, VOID, this.status_1, VOID, this.status_1.equals(TaskStatus_COMPLETED_getInstance()) ? getCurrentTimeMillis() : null);
              this._this__u8e3s4__1.mockTasks_1.set_82063s_k$(taskIndex, updatedTask);
              return updatedTask;
            }

            return null;
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
  function $getUsersCOROUTINE$23(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
  }
  protoOf($getUsersCOROUTINE$23).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(400, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            return toList(this._this__u8e3s4__1.mockUsers_1);
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
  function $getUserCOROUTINE$24(_this__u8e3s4, id, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.id_1 = id;
  }
  protoOf($getUserCOROUTINE$24).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(300, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var this_0 = this._this__u8e3s4__1.mockUsers_1;
            var tmp$ret$0;
            l$ret$1: do {
              var tmp0_iterator = this_0.iterator_jk1svi_k$();
              while (tmp0_iterator.hasNext_bitz1p_k$()) {
                var element = tmp0_iterator.next_20eer_k$();
                if (element.get_id_kntnx8_k$().toString() === this.id_1) {
                  tmp$ret$0 = element;
                  break l$ret$1;
                }
              }
              tmp$ret$0 = null;
            }
             while (false);
            return tmp$ret$0;
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
  function $createUserCOROUTINE$25(_this__u8e3s4, user, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.user_1 = user;
  }
  protoOf($createUserCOROUTINE$25).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(500, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var tmp$ret$0;
            l$ret$1: do {
              var iterator = this._this__u8e3s4__1.mockUsers_1.iterator_jk1svi_k$();
              if (!iterator.hasNext_bitz1p_k$()) {
                tmp$ret$0 = null;
                break l$ret$1;
              }
              var maxValue = iterator.next_20eer_k$().get_id_kntnx8_k$();
              while (iterator.hasNext_bitz1p_k$()) {
                var v = iterator.next_20eer_k$().get_id_kntnx8_k$();
                if (compareTo(maxValue, v) < 0) {
                  maxValue = v;
                }
              }
              tmp$ret$0 = maxValue;
            }
             while (false);
            var tmp0_elvis_lhs = tmp$ret$0;
            var this_0 = tmp0_elvis_lhs == null ? new Long(0, 0) : tmp0_elvis_lhs;
            var newUser = this.user_1.copy$default_4az37w_k$(this_0.plus_r93sks_k$(toLong(1)));
            this._this__u8e3s4__1.mockUsers_1.add_utx5q5_k$(newUser);
            return newUser;
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
  function $updateUserCOROUTINE$26(_this__u8e3s4, user, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.user_1 = user;
  }
  protoOf($updateUserCOROUTINE$26).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(300, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var tmp$ret$0;
            l$ret$1: do {
              var index = 0;
              var tmp0_iterator = this._this__u8e3s4__1.mockUsers_1.iterator_jk1svi_k$();
              while (tmp0_iterator.hasNext_bitz1p_k$()) {
                var item = tmp0_iterator.next_20eer_k$();
                if (item.get_id_kntnx8_k$().equals(this.user_1.get_id_kntnx8_k$())) {
                  tmp$ret$0 = index;
                  break l$ret$1;
                }
                index = index + 1 | 0;
              }
              tmp$ret$0 = -1;
            }
             while (false);
            var index_0 = tmp$ret$0;
            if (!(index_0 === -1)) {
              this._this__u8e3s4__1.mockUsers_1.set_82063s_k$(index_0, this.user_1);
              return this._this__u8e3s4__1.mockUsers_1.get_c1px32_k$(index_0);
            }

            return this.user_1;
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
  function $deleteUserCOROUTINE$27(_this__u8e3s4, id, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.id_1 = id;
  }
  protoOf($deleteUserCOROUTINE$27).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(300, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var tmp$ret$0;
            l$ret$1: do {
              var index = 0;
              var tmp0_iterator = this._this__u8e3s4__1.mockUsers_1.iterator_jk1svi_k$();
              while (tmp0_iterator.hasNext_bitz1p_k$()) {
                var item = tmp0_iterator.next_20eer_k$();
                if (item.get_id_kntnx8_k$().toString() === this.id_1) {
                  tmp$ret$0 = index;
                  break l$ret$1;
                }
                index = index + 1 | 0;
              }
              tmp$ret$0 = -1;
            }
             while (false);
            var index_0 = tmp$ret$0;
            if (!(index_0 === -1)) {
              this._this__u8e3s4__1.mockUsers_1.removeAt_6niowx_k$(index_0);
              return true;
            }

            return false;
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
  function $getInventoryCOROUTINE$28(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
  }
  protoOf($getInventoryCOROUTINE$28).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(400, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            return toList(this._this__u8e3s4__1.mockInventory_1);
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
  function $getInventoryItemCOROUTINE$29(_this__u8e3s4, id, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.id_1 = id;
  }
  protoOf($getInventoryItemCOROUTINE$29).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(300, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var this_0 = this._this__u8e3s4__1.mockInventory_1;
            var tmp$ret$0;
            l$ret$1: do {
              var tmp0_iterator = this_0.iterator_jk1svi_k$();
              while (tmp0_iterator.hasNext_bitz1p_k$()) {
                var element = tmp0_iterator.next_20eer_k$();
                if (element.get_id_kntnx8_k$() === this.id_1) {
                  tmp$ret$0 = element;
                  break l$ret$1;
                }
              }
              tmp$ret$0 = null;
            }
             while (false);
            return tmp$ret$0;
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
  function $createInventoryItemCOROUTINE$30(_this__u8e3s4, item, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.item_1 = item;
  }
  protoOf($createInventoryItemCOROUTINE$30).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(500, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var newItem = this.item_1.copy$default_lr4r4z_k$('inv-' + getCurrentTimeMillis().toString());
            this._this__u8e3s4__1.mockInventory_1.add_utx5q5_k$(newItem);
            return newItem;
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
  function $updateInventoryItemCOROUTINE$31(_this__u8e3s4, item, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.item_1 = item;
  }
  protoOf($updateInventoryItemCOROUTINE$31).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(300, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var tmp$ret$0;
            l$ret$1: do {
              var index = 0;
              var tmp0_iterator = this._this__u8e3s4__1.mockInventory_1.iterator_jk1svi_k$();
              while (tmp0_iterator.hasNext_bitz1p_k$()) {
                var item = tmp0_iterator.next_20eer_k$();
                if (item.get_id_kntnx8_k$() === this.item_1.get_id_kntnx8_k$()) {
                  tmp$ret$0 = index;
                  break l$ret$1;
                }
                index = index + 1 | 0;
              }
              tmp$ret$0 = -1;
            }
             while (false);
            var index_0 = tmp$ret$0;
            if (!(index_0 === -1)) {
              this._this__u8e3s4__1.mockInventory_1.set_82063s_k$(index_0, this.item_1.copy$default_lr4r4z_k$(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, getCurrentTimeMillis()));
              return this._this__u8e3s4__1.mockInventory_1.get_c1px32_k$(index_0);
            }

            return this.item_1;
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
  function $deleteInventoryItemCOROUTINE$32(_this__u8e3s4, id, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.id_1 = id;
  }
  protoOf($deleteInventoryItemCOROUTINE$32).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(300, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var tmp$ret$0;
            l$ret$1: do {
              var index = 0;
              var tmp0_iterator = this._this__u8e3s4__1.mockInventory_1.iterator_jk1svi_k$();
              while (tmp0_iterator.hasNext_bitz1p_k$()) {
                var item = tmp0_iterator.next_20eer_k$();
                if (item.get_id_kntnx8_k$() === this.id_1) {
                  tmp$ret$0 = index;
                  break l$ret$1;
                }
                index = index + 1 | 0;
              }
              tmp$ret$0 = -1;
            }
             while (false);
            var index_0 = tmp$ret$0;
            if (!(index_0 === -1)) {
              this._this__u8e3s4__1.mockInventory_1.removeAt_6niowx_k$(index_0);
              return true;
            }

            return false;
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
  function $getFinancialRecordsCOROUTINE$33(_this__u8e3s4, farmId, type, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.farmId_1 = farmId;
    this.type_1 = type;
  }
  protoOf($getFinancialRecordsCOROUTINE$33).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(400, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var tmp_0;
            if (!(this.farmId_1 == null)) {
              var this_0 = this._this__u8e3s4__1.mockFinancialRecords_1;
              var destination = ArrayList_init_$Create$();
              var tmp0_iterator = this_0.iterator_jk1svi_k$();
              while (tmp0_iterator.hasNext_bitz1p_k$()) {
                var element = tmp0_iterator.next_20eer_k$();
                if (element.get_farmId_d7oohm_k$().equals(this.farmId_1)) {
                  destination.add_utx5q5_k$(element);
                }
              }
              tmp_0 = destination;
            } else {
              tmp_0 = toList(this._this__u8e3s4__1.mockFinancialRecords_1);
            }

            var filteredRecords = tmp_0;
            if (!(this.type_1 == null)) {
              var this_1 = filteredRecords;
              var destination_0 = ArrayList_init_$Create$();
              var tmp0_iterator_0 = this_1.iterator_jk1svi_k$();
              while (tmp0_iterator_0.hasNext_bitz1p_k$()) {
                var element_0 = tmp0_iterator_0.next_20eer_k$();
                if (element_0.get_type_wovaf7_k$().equals(this.type_1)) {
                  destination_0.add_utx5q5_k$(element_0);
                }
              }
              filteredRecords = destination_0;
            }

            return filteredRecords;
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
  function $addFinancialRecordCOROUTINE$34(_this__u8e3s4, record, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.record_1 = record;
  }
  protoOf($addFinancialRecordCOROUTINE$34).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(500, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var tmp$ret$0;
            l$ret$1: do {
              var iterator = this._this__u8e3s4__1.mockFinancialRecords_1.iterator_jk1svi_k$();
              if (!iterator.hasNext_bitz1p_k$()) {
                tmp$ret$0 = null;
                break l$ret$1;
              }
              var maxValue = iterator.next_20eer_k$().get_id_kntnx8_k$();
              while (iterator.hasNext_bitz1p_k$()) {
                var v = iterator.next_20eer_k$().get_id_kntnx8_k$();
                if (compareTo(maxValue, v) < 0) {
                  maxValue = v;
                }
              }
              tmp$ret$0 = maxValue;
            }
             while (false);
            var tmp0_elvis_lhs = tmp$ret$0;
            var this_0 = tmp0_elvis_lhs == null ? new Long(0, 0) : tmp0_elvis_lhs;
            var newRecord = this.record_1.copy$default_ih9u0b_k$(this_0.plus_r93sks_k$(toLong(1)));
            this._this__u8e3s4__1.mockFinancialRecords_1.add_utx5q5_k$(newRecord);
            return newRecord;
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
  function $getFarmStatsCOROUTINE$35(_this__u8e3s4, farmId, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.farmId_1 = farmId;
  }
  protoOf($getFarmStatsCOROUTINE$35).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(600, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var this_0 = this._this__u8e3s4__1.mockCrops_1;
            var destination = ArrayList_init_$Create$();
            var tmp0_iterator = this_0.iterator_jk1svi_k$();
            while (tmp0_iterator.hasNext_bitz1p_k$()) {
              var element = tmp0_iterator.next_20eer_k$();
              if (element.get_farmId_d7oohm_k$().equals(this.farmId_1)) {
                destination.add_utx5q5_k$(element);
              }
            }

            var crops = destination;
            var this_1 = this._this__u8e3s4__1.mockLivestock_1;
            var destination_0 = ArrayList_init_$Create$();
            var tmp0_iterator_0 = this_1.iterator_jk1svi_k$();
            while (tmp0_iterator_0.hasNext_bitz1p_k$()) {
              var element_0 = tmp0_iterator_0.next_20eer_k$();
              if (element_0.get_farmId_d7oohm_k$().equals(this.farmId_1)) {
                destination_0.add_utx5q5_k$(element_0);
              }
            }

            var livestock = destination_0;
            var this_2 = this._this__u8e3s4__1.mockTasks_1;
            var destination_1 = ArrayList_init_$Create$();
            var tmp0_iterator_1 = this_2.iterator_jk1svi_k$();
            while (tmp0_iterator_1.hasNext_bitz1p_k$()) {
              var element_1 = tmp0_iterator_1.next_20eer_k$();
              if (element_1.get_farmId_d7oohm_k$().equals(this.farmId_1)) {
                destination_1.add_utx5q5_k$(element_1);
              }
            }

            var tasks = destination_1;
            var this_3 = this._this__u8e3s4__1.mockFinancialRecords_1;
            var destination_2 = ArrayList_init_$Create$();
            var tmp0_iterator_2 = this_3.iterator_jk1svi_k$();
            while (tmp0_iterator_2.hasNext_bitz1p_k$()) {
              var element_2 = tmp0_iterator_2.next_20eer_k$();
              if (element_2.get_farmId_d7oohm_k$().equals(this.farmId_1)) {
                destination_2.add_utx5q5_k$(element_2);
              }
            }

            var finances = destination_2;
            var this_4 = this._this__u8e3s4__1.mockInventory_1;
            var destination_3 = ArrayList_init_$Create$();
            var tmp0_iterator_3 = this_4.iterator_jk1svi_k$();
            while (tmp0_iterator_3.hasNext_bitz1p_k$()) {
              var element_3 = tmp0_iterator_3.next_20eer_k$();
              if (equals(toLongOrNull(element_3.get_farmId_d7oohm_k$()), this.farmId_1)) {
                destination_3.add_utx5q5_k$(element_3);
              }
            }

            var inventory = destination_3;
            var destination_4 = ArrayList_init_$Create$();
            var tmp0_iterator_4 = finances.iterator_jk1svi_k$();
            while (tmp0_iterator_4.hasNext_bitz1p_k$()) {
              var element_4 = tmp0_iterator_4.next_20eer_k$();
              if (element_4.get_type_wovaf7_k$().equals(FinancialType_INCOME_getInstance())) {
                destination_4.add_utx5q5_k$(element_4);
              }
            }

            var sum = 0.0;
            var tmp0_iterator_5 = destination_4.iterator_jk1svi_k$();
            while (tmp0_iterator_5.hasNext_bitz1p_k$()) {
              var element_5 = tmp0_iterator_5.next_20eer_k$();
              var tmp_0 = sum;
              sum = tmp_0 + element_5.get_amount_b10di9_k$();
            }

            var totalIncome = sum;
            var destination_5 = ArrayList_init_$Create$();
            var tmp0_iterator_6 = finances.iterator_jk1svi_k$();
            while (tmp0_iterator_6.hasNext_bitz1p_k$()) {
              var element_6 = tmp0_iterator_6.next_20eer_k$();
              if (element_6.get_type_wovaf7_k$().equals(FinancialType_EXPENSE_getInstance())) {
                destination_5.add_utx5q5_k$(element_6);
              }
            }

            var sum_0 = 0.0;
            var tmp0_iterator_7 = destination_5.iterator_jk1svi_k$();
            while (tmp0_iterator_7.hasNext_bitz1p_k$()) {
              var element_7 = tmp0_iterator_7.next_20eer_k$();
              var tmp_1 = sum_0;
              sum_0 = tmp_1 + element_7.get_amount_b10di9_k$();
            }

            var totalExpenses = sum_0;
            var netProfit = totalIncome - totalExpenses;
            var profitMargin = totalIncome > 0.0 ? netProfit / totalIncome * 100 : 0.0;
            var cropCategories = CategoryConfig_getInstance().getAllCropCategories_xi6okp_k$();
            var destination_6 = ArrayList_init_$Create$();
            var tmp0_iterator_8 = crops.iterator_jk1svi_k$();
            while (tmp0_iterator_8.hasNext_bitz1p_k$()) {
              var element_8 = tmp0_iterator_8.next_20eer_k$();
              var tmp$ret$0;
              l$ret$1: do {
                var this_5 = flatten(cropCategories.get_values_ksazhn_k$());
                var tmp_2;
                if (isInterface(this_5, Collection)) {
                  tmp_2 = this_5.isEmpty_y1axqb_k$();
                } else {
                  tmp_2 = false;
                }
                if (tmp_2) {
                  tmp$ret$0 = false;
                  break l$ret$1;
                }
                var tmp0_iterator_9 = this_5.iterator_jk1svi_k$();
                while (tmp0_iterator_9.hasNext_bitz1p_k$()) {
                  var element_9 = tmp0_iterator_9.next_20eer_k$();
                  var this_6 = element_8.get_name_woqyms_k$();
                  if (contains(this_6.toLowerCase(), element_9)) {
                    tmp$ret$0 = true;
                    break l$ret$1;
                  }
                }
                tmp$ret$0 = false;
              }
               while (false);
              if (tmp$ret$0) {
                destination_6.add_utx5q5_k$(element_8);
              }
            }

            var plants = destination_6;
            var destination_7 = ArrayList_init_$Create$();
            var tmp0_iterator_10 = crops.iterator_jk1svi_k$();
            while (tmp0_iterator_10.hasNext_bitz1p_k$()) {
              var element_10 = tmp0_iterator_10.next_20eer_k$();
              var tmp$ret$2;
              l$ret$3: do {
                var this_7 = Crops_getInstance().get_GRAINS_1pujkv_k$();
                var tmp_3;
                if (isInterface(this_7, Collection)) {
                  tmp_3 = this_7.isEmpty_y1axqb_k$();
                } else {
                  tmp_3 = false;
                }
                if (tmp_3) {
                  tmp$ret$2 = false;
                  break l$ret$3;
                }
                var tmp0_iterator_11 = this_7.iterator_jk1svi_k$();
                while (tmp0_iterator_11.hasNext_bitz1p_k$()) {
                  var element_11 = tmp0_iterator_11.next_20eer_k$();
                  var this_8 = element_10.get_name_woqyms_k$();
                  if (contains(this_8.toLowerCase(), element_11)) {
                    tmp$ret$2 = true;
                    break l$ret$3;
                  }
                }
                tmp$ret$2 = false;
              }
               while (false);
              if (tmp$ret$2) {
                destination_7.add_utx5q5_k$(element_10);
              }
            }

            var grains = destination_7;
            var destination_8 = ArrayList_init_$Create$();
            var tmp0_iterator_12 = crops.iterator_jk1svi_k$();
            while (tmp0_iterator_12.hasNext_bitz1p_k$()) {
              var element_12 = tmp0_iterator_12.next_20eer_k$();
              var tmp$ret$4;
              l$ret$5: do {
                var this_9 = Crops_getInstance().get_LEGUMES_e2lvez_k$();
                var tmp_4;
                if (isInterface(this_9, Collection)) {
                  tmp_4 = this_9.isEmpty_y1axqb_k$();
                } else {
                  tmp_4 = false;
                }
                if (tmp_4) {
                  tmp$ret$4 = false;
                  break l$ret$5;
                }
                var tmp0_iterator_13 = this_9.iterator_jk1svi_k$();
                while (tmp0_iterator_13.hasNext_bitz1p_k$()) {
                  var element_13 = tmp0_iterator_13.next_20eer_k$();
                  var this_10 = element_12.get_name_woqyms_k$();
                  if (contains(this_10.toLowerCase(), element_13)) {
                    tmp$ret$4 = true;
                    break l$ret$5;
                  }
                }
                tmp$ret$4 = false;
              }
               while (false);
              if (tmp$ret$4) {
                destination_8.add_utx5q5_k$(element_12);
              }
            }

            var legumes = destination_8;
            var destination_9 = ArrayList_init_$Create$();
            var tmp0_iterator_14 = crops.iterator_jk1svi_k$();
            while (tmp0_iterator_14.hasNext_bitz1p_k$()) {
              var element_14 = tmp0_iterator_14.next_20eer_k$();
              var tmp$ret$6;
              l$ret$7: do {
                var this_11 = Crops_getInstance().get_VEGETABLES_rgfmrf_k$();
                var tmp_5;
                if (isInterface(this_11, Collection)) {
                  tmp_5 = this_11.isEmpty_y1axqb_k$();
                } else {
                  tmp_5 = false;
                }
                if (tmp_5) {
                  tmp$ret$6 = false;
                  break l$ret$7;
                }
                var tmp0_iterator_15 = this_11.iterator_jk1svi_k$();
                while (tmp0_iterator_15.hasNext_bitz1p_k$()) {
                  var element_15 = tmp0_iterator_15.next_20eer_k$();
                  var this_12 = element_14.get_name_woqyms_k$();
                  if (contains(this_12.toLowerCase(), element_15)) {
                    tmp$ret$6 = true;
                    break l$ret$7;
                  }
                }
                tmp$ret$6 = false;
              }
               while (false);
              if (tmp$ret$6) {
                destination_9.add_utx5q5_k$(element_14);
              }
            }

            var vegetables = destination_9;
            var destination_10 = ArrayList_init_$Create$();
            var tmp0_iterator_16 = crops.iterator_jk1svi_k$();
            while (tmp0_iterator_16.hasNext_bitz1p_k$()) {
              var element_16 = tmp0_iterator_16.next_20eer_k$();
              var tmp$ret$8;
              l$ret$9: do {
                var this_13 = Crops_getInstance().get_HERBS_ia8ezh_k$();
                var tmp_6;
                if (isInterface(this_13, Collection)) {
                  tmp_6 = this_13.isEmpty_y1axqb_k$();
                } else {
                  tmp_6 = false;
                }
                if (tmp_6) {
                  tmp$ret$8 = false;
                  break l$ret$9;
                }
                var tmp0_iterator_17 = this_13.iterator_jk1svi_k$();
                while (tmp0_iterator_17.hasNext_bitz1p_k$()) {
                  var element_17 = tmp0_iterator_17.next_20eer_k$();
                  var this_14 = element_16.get_name_woqyms_k$();
                  if (contains(this_14.toLowerCase(), element_17)) {
                    tmp$ret$8 = true;
                    break l$ret$9;
                  }
                }
                tmp$ret$8 = false;
              }
               while (false);
              if (tmp$ret$8) {
                destination_10.add_utx5q5_k$(element_16);
              }
            }

            var herbs = destination_10;
            var destination_11 = ArrayList_init_$Create$();
            var tmp0_iterator_18 = crops.iterator_jk1svi_k$();
            while (tmp0_iterator_18.hasNext_bitz1p_k$()) {
              var element_18 = tmp0_iterator_18.next_20eer_k$();
              var tmp$ret$10;
              l$ret$11: do {
                var this_15 = Crops_getInstance().get_FRUITS_26je3c_k$();
                var tmp_7;
                if (isInterface(this_15, Collection)) {
                  tmp_7 = this_15.isEmpty_y1axqb_k$();
                } else {
                  tmp_7 = false;
                }
                if (tmp_7) {
                  tmp$ret$10 = false;
                  break l$ret$11;
                }
                var tmp0_iterator_19 = this_15.iterator_jk1svi_k$();
                while (tmp0_iterator_19.hasNext_bitz1p_k$()) {
                  var element_19 = tmp0_iterator_19.next_20eer_k$();
                  var tmp_8;
                  var this_16 = element_18.get_name_woqyms_k$();
                  if (contains(this_16.toLowerCase(), element_19)) {
                    tmp_8 = ((contains(element_19, 'berry') ? true : contains(element_19, 'strawberry')) ? true : contains(element_19, 'blueberry')) ? true : contains(element_19, 'raspberry');
                  } else {
                    tmp_8 = false;
                  }
                  if (tmp_8) {
                    tmp$ret$10 = true;
                    break l$ret$11;
                  }
                }
                tmp$ret$10 = false;
              }
               while (false);
              if (tmp$ret$10) {
                destination_11.add_utx5q5_k$(element_18);
              }
            }

            var berries = destination_11;
            var destination_12 = ArrayList_init_$Create$();
            var tmp0_iterator_20 = crops.iterator_jk1svi_k$();
            while (tmp0_iterator_20.hasNext_bitz1p_k$()) {
              var element_20 = tmp0_iterator_20.next_20eer_k$();
              var tmp$ret$12;
              l$ret$13: do {
                var this_17 = Crops_getInstance().get_FLOWERS_h31wv_k$();
                var tmp_9;
                if (isInterface(this_17, Collection)) {
                  tmp_9 = this_17.isEmpty_y1axqb_k$();
                } else {
                  tmp_9 = false;
                }
                if (tmp_9) {
                  tmp$ret$12 = false;
                  break l$ret$13;
                }
                var tmp0_iterator_21 = this_17.iterator_jk1svi_k$();
                while (tmp0_iterator_21.hasNext_bitz1p_k$()) {
                  var element_21 = tmp0_iterator_21.next_20eer_k$();
                  var this_18 = element_20.get_name_woqyms_k$();
                  if (contains(this_18.toLowerCase(), element_21)) {
                    tmp$ret$12 = true;
                    break l$ret$13;
                  }
                }
                tmp$ret$12 = false;
              }
               while (false);
              if (tmp$ret$12) {
                destination_12.add_utx5q5_k$(element_20);
              }
            }

            var flowers = destination_12;
            var destination_13 = ArrayList_init_$Create$();
            var tmp0_iterator_22 = crops.iterator_jk1svi_k$();
            while (tmp0_iterator_22.hasNext_bitz1p_k$()) {
              var element_22 = tmp0_iterator_22.next_20eer_k$();
              var tmp$ret$14;
              l$ret$15: do {
                var this_19 = Crops_getInstance().get_TREES_ih1zd8_k$();
                var tmp_10;
                if (isInterface(this_19, Collection)) {
                  tmp_10 = this_19.isEmpty_y1axqb_k$();
                } else {
                  tmp_10 = false;
                }
                if (tmp_10) {
                  tmp$ret$14 = false;
                  break l$ret$15;
                }
                var tmp0_iterator_23 = this_19.iterator_jk1svi_k$();
                while (tmp0_iterator_23.hasNext_bitz1p_k$()) {
                  var element_23 = tmp0_iterator_23.next_20eer_k$();
                  var this_20 = element_22.get_name_woqyms_k$();
                  if (contains(this_20.toLowerCase(), element_23)) {
                    tmp$ret$14 = true;
                    break l$ret$15;
                  }
                }
                tmp$ret$14 = false;
              }
               while (false);
              if (tmp$ret$14) {
                destination_13.add_utx5q5_k$(element_22);
              }
            }

            var trees = destination_13;
            var destination_14 = ArrayList_init_$Create$();
            var tmp0_iterator_24 = crops.iterator_jk1svi_k$();
            while (tmp0_iterator_24.hasNext_bitz1p_k$()) {
              var element_24 = tmp0_iterator_24.next_20eer_k$();
              var tmp$ret$16;
              l$ret$17: do {
                var this_21 = Crops_getInstance().get_ORGANIC_6s2zoe_k$();
                var tmp_11;
                if (isInterface(this_21, Collection)) {
                  tmp_11 = this_21.isEmpty_y1axqb_k$();
                } else {
                  tmp_11 = false;
                }
                if (tmp_11) {
                  tmp$ret$16 = false;
                  break l$ret$17;
                }
                var tmp0_iterator_25 = this_21.iterator_jk1svi_k$();
                while (tmp0_iterator_25.hasNext_bitz1p_k$()) {
                  var element_25 = tmp0_iterator_25.next_20eer_k$();
                  var this_22 = element_24.get_name_woqyms_k$();
                  if (contains(this_22.toLowerCase(), element_25)) {
                    tmp$ret$16 = true;
                    break l$ret$17;
                  }
                }
                tmp$ret$16 = false;
              }
               while (false);
              if (tmp$ret$16) {
                destination_14.add_utx5q5_k$(element_24);
              }
            }

            var organicProducts = destination_14;
            var destination_15 = ArrayList_init_$Create$();
            var tmp0_iterator_26 = crops.iterator_jk1svi_k$();
            while (tmp0_iterator_26.hasNext_bitz1p_k$()) {
              var element_26 = tmp0_iterator_26.next_20eer_k$();
              var tmp$ret$18;
              l$ret$19: do {
                var this_23 = Crops_getInstance().get_SEASONAL_454zqh_k$();
                var tmp_12;
                if (isInterface(this_23, Collection)) {
                  tmp_12 = this_23.isEmpty_y1axqb_k$();
                } else {
                  tmp_12 = false;
                }
                if (tmp_12) {
                  tmp$ret$18 = false;
                  break l$ret$19;
                }
                var tmp0_iterator_27 = this_23.iterator_jk1svi_k$();
                while (tmp0_iterator_27.hasNext_bitz1p_k$()) {
                  var element_27 = tmp0_iterator_27.next_20eer_k$();
                  var this_24 = element_26.get_name_woqyms_k$();
                  if (contains(this_24.toLowerCase(), element_27)) {
                    tmp$ret$18 = true;
                    break l$ret$19;
                  }
                }
                tmp$ret$18 = false;
              }
               while (false);
              if (tmp$ret$18) {
                destination_15.add_utx5q5_k$(element_26);
              }
            }

            var seasonalCrops = destination_15;
            var destination_16 = ArrayList_init_$Create$();
            var tmp0_iterator_28 = crops.iterator_jk1svi_k$();
            while (tmp0_iterator_28.hasNext_bitz1p_k$()) {
              var element_28 = tmp0_iterator_28.next_20eer_k$();
              var tmp$ret$20;
              l$ret$21: do {
                var this_25 = Crops_getInstance().get_PERENNIAL_8yqdy5_k$();
                var tmp_13;
                if (isInterface(this_25, Collection)) {
                  tmp_13 = this_25.isEmpty_y1axqb_k$();
                } else {
                  tmp_13 = false;
                }
                if (tmp_13) {
                  tmp$ret$20 = false;
                  break l$ret$21;
                }
                var tmp0_iterator_29 = this_25.iterator_jk1svi_k$();
                while (tmp0_iterator_29.hasNext_bitz1p_k$()) {
                  var element_29 = tmp0_iterator_29.next_20eer_k$();
                  var this_26 = element_28.get_name_woqyms_k$();
                  if (contains(this_26.toLowerCase(), element_29)) {
                    tmp$ret$20 = true;
                    break l$ret$21;
                  }
                }
                tmp$ret$20 = false;
              }
               while (false);
              if (tmp$ret$20) {
                destination_16.add_utx5q5_k$(element_28);
              }
            }

            var perennialCrops = destination_16;
            var destination_17 = ArrayList_init_$Create$();
            var tmp0_iterator_30 = crops.iterator_jk1svi_k$();
            while (tmp0_iterator_30.hasNext_bitz1p_k$()) {
              var element_30 = tmp0_iterator_30.next_20eer_k$();
              var tmp$ret$22;
              l$ret$23: do {
                var this_27 = Crops_getInstance().get_ANNUAL_4m2wwo_k$();
                var tmp_14;
                if (isInterface(this_27, Collection)) {
                  tmp_14 = this_27.isEmpty_y1axqb_k$();
                } else {
                  tmp_14 = false;
                }
                if (tmp_14) {
                  tmp$ret$22 = false;
                  break l$ret$23;
                }
                var tmp0_iterator_31 = this_27.iterator_jk1svi_k$();
                while (tmp0_iterator_31.hasNext_bitz1p_k$()) {
                  var element_31 = tmp0_iterator_31.next_20eer_k$();
                  var this_28 = element_30.get_name_woqyms_k$();
                  if (contains(this_28.toLowerCase(), element_31)) {
                    tmp$ret$22 = true;
                    break l$ret$23;
                  }
                }
                tmp$ret$22 = false;
              }
               while (false);
              if (tmp$ret$22) {
                destination_17.add_utx5q5_k$(element_30);
              }
            }

            var annualCrops = destination_17;
            var livestockCategories = CategoryConfig_getInstance().getAllLivestockCategories_quz4e3_k$();
            var destination_18 = ArrayList_init_$Create$();
            var tmp0_iterator_32 = livestock.iterator_jk1svi_k$();
            while (tmp0_iterator_32.hasNext_bitz1p_k$()) {
              var element_32 = tmp0_iterator_32.next_20eer_k$();
              var tmp$ret$24;
              l$ret$25: do {
                var this_29 = Livestock_getInstance().get_PETS_wo77nh_k$();
                var tmp_15;
                if (isInterface(this_29, Collection)) {
                  tmp_15 = this_29.isEmpty_y1axqb_k$();
                } else {
                  tmp_15 = false;
                }
                if (tmp_15) {
                  tmp$ret$24 = false;
                  break l$ret$25;
                }
                var tmp0_iterator_33 = this_29.iterator_jk1svi_k$();
                while (tmp0_iterator_33.hasNext_bitz1p_k$()) {
                  var element_33 = tmp0_iterator_33.next_20eer_k$();
                  var this_30 = element_32.get_breed_ipc7rf_k$();
                  if (contains(this_30.toLowerCase(), element_33)) {
                    tmp$ret$24 = true;
                    break l$ret$25;
                  }
                }
                tmp$ret$24 = false;
              }
               while (false);
              if (tmp$ret$24) {
                destination_18.add_utx5q5_k$(element_32);
              }
            }

            var pets = destination_18;
            var destination_19 = ArrayList_init_$Create$();
            var tmp0_iterator_34 = livestock.iterator_jk1svi_k$();
            while (tmp0_iterator_34.hasNext_bitz1p_k$()) {
              var element_34 = tmp0_iterator_34.next_20eer_k$();
              var tmp_16;
              if (element_34.get_type_wovaf7_k$().equals(LivestockType_FISH_getInstance())) {
                tmp_16 = true;
              } else {
                var tmp$ret$26;
                l$ret$27: do {
                  var this_31 = Livestock_getInstance().get_FISH_wo0wpt_k$();
                  var tmp_17;
                  if (isInterface(this_31, Collection)) {
                    tmp_17 = this_31.isEmpty_y1axqb_k$();
                  } else {
                    tmp_17 = false;
                  }
                  if (tmp_17) {
                    tmp$ret$26 = false;
                    break l$ret$27;
                  }
                  var tmp0_iterator_35 = this_31.iterator_jk1svi_k$();
                  while (tmp0_iterator_35.hasNext_bitz1p_k$()) {
                    var element_35 = tmp0_iterator_35.next_20eer_k$();
                    var this_32 = element_34.get_breed_ipc7rf_k$();
                    if (contains(this_32.toLowerCase(), element_35)) {
                      tmp$ret$26 = true;
                      break l$ret$27;
                    }
                  }
                  tmp$ret$26 = false;
                }
                 while (false);
                tmp_16 = tmp$ret$26;
              }
              if (tmp_16) {
                destination_19.add_utx5q5_k$(element_34);
              }
            }

            var aquatic = destination_19;
            var destination_20 = ArrayList_init_$Create$();
            var tmp0_iterator_36 = livestock.iterator_jk1svi_k$();
            while (tmp0_iterator_36.hasNext_bitz1p_k$()) {
              var element_36 = tmp0_iterator_36.next_20eer_k$();
              var tmp$ret$28;
              l$ret$29: do {
                var this_33 = Livestock_getInstance().get_BEES_wny9h6_k$();
                var tmp_18;
                if (isInterface(this_33, Collection)) {
                  tmp_18 = this_33.isEmpty_y1axqb_k$();
                } else {
                  tmp_18 = false;
                }
                if (tmp_18) {
                  tmp$ret$28 = false;
                  break l$ret$29;
                }
                var tmp0_iterator_37 = this_33.iterator_jk1svi_k$();
                while (tmp0_iterator_37.hasNext_bitz1p_k$()) {
                  var element_37 = tmp0_iterator_37.next_20eer_k$();
                  var this_34 = element_36.get_breed_ipc7rf_k$();
                  if (contains(this_34.toLowerCase(), element_37)) {
                    tmp$ret$28 = true;
                    break l$ret$29;
                  }
                }
                tmp$ret$28 = false;
              }
               while (false);
              if (tmp$ret$28) {
                destination_20.add_utx5q5_k$(element_36);
              }
            }

            var bees = destination_20;
            var destination_21 = ArrayList_init_$Create$();
            var tmp0_iterator_38 = livestock.iterator_jk1svi_k$();
            while (tmp0_iterator_38.hasNext_bitz1p_k$()) {
              var element_38 = tmp0_iterator_38.next_20eer_k$();
              if (element_38.get_type_wovaf7_k$().equals(LivestockType_POULTRY_getInstance())) {
                destination_21.add_utx5q5_k$(element_38);
              }
            }

            var poultry = destination_21;
            var destination_22 = ArrayList_init_$Create$();
            var tmp0_iterator_39 = livestock.iterator_jk1svi_k$();
            while (tmp0_iterator_39.hasNext_bitz1p_k$()) {
              var element_39 = tmp0_iterator_39.next_20eer_k$();
              if (element_39.get_type_wovaf7_k$().equals(LivestockType_GOATS_getInstance())) {
                destination_22.add_utx5q5_k$(element_39);
              }
            }

            var goats = destination_22;
            var destination_23 = ArrayList_init_$Create$();
            var tmp0_iterator_40 = livestock.iterator_jk1svi_k$();
            while (tmp0_iterator_40.hasNext_bitz1p_k$()) {
              var element_40 = tmp0_iterator_40.next_20eer_k$();
              if (element_40.get_type_wovaf7_k$().equals(LivestockType_HORSES_getInstance())) {
                destination_23.add_utx5q5_k$(element_40);
              }
            }

            var horses = destination_23;
            var destination_24 = ArrayList_init_$Create$();
            var tmp0_iterator_41 = livestock.iterator_jk1svi_k$();
            while (tmp0_iterator_41.hasNext_bitz1p_k$()) {
              var element_41 = tmp0_iterator_41.next_20eer_k$();
              if (element_41.get_type_wovaf7_k$().equals(LivestockType_CATTLE_getInstance())) {
                destination_24.add_utx5q5_k$(element_41);
              }
            }

            var cattle = destination_24;
            var destination_25 = ArrayList_init_$Create$();
            var tmp0_iterator_42 = livestock.iterator_jk1svi_k$();
            while (tmp0_iterator_42.hasNext_bitz1p_k$()) {
              var element_42 = tmp0_iterator_42.next_20eer_k$();
              var tmp$ret$30;
              l$ret$31: do {
                var this_35 = Livestock_getInstance().get_SHEEP_igbswi_k$();
                var tmp_19;
                if (isInterface(this_35, Collection)) {
                  tmp_19 = this_35.isEmpty_y1axqb_k$();
                } else {
                  tmp_19 = false;
                }
                if (tmp_19) {
                  tmp$ret$30 = false;
                  break l$ret$31;
                }
                var tmp0_iterator_43 = this_35.iterator_jk1svi_k$();
                while (tmp0_iterator_43.hasNext_bitz1p_k$()) {
                  var element_43 = tmp0_iterator_43.next_20eer_k$();
                  var this_36 = element_42.get_breed_ipc7rf_k$();
                  if (contains(this_36.toLowerCase(), element_43)) {
                    tmp$ret$30 = true;
                    break l$ret$31;
                  }
                }
                tmp$ret$30 = false;
              }
               while (false);
              if (tmp$ret$30) {
                destination_25.add_utx5q5_k$(element_42);
              }
            }

            var sheep = destination_25;
            var destination_26 = ArrayList_init_$Create$();
            var tmp0_iterator_44 = livestock.iterator_jk1svi_k$();
            while (tmp0_iterator_44.hasNext_bitz1p_k$()) {
              var element_44 = tmp0_iterator_44.next_20eer_k$();
              var tmp$ret$32;
              l$ret$33: do {
                var this_37 = Livestock_getInstance().get_PIGS_wo7ab2_k$();
                var tmp_20;
                if (isInterface(this_37, Collection)) {
                  tmp_20 = this_37.isEmpty_y1axqb_k$();
                } else {
                  tmp_20 = false;
                }
                if (tmp_20) {
                  tmp$ret$32 = false;
                  break l$ret$33;
                }
                var tmp0_iterator_45 = this_37.iterator_jk1svi_k$();
                while (tmp0_iterator_45.hasNext_bitz1p_k$()) {
                  var element_45 = tmp0_iterator_45.next_20eer_k$();
                  var this_38 = element_44.get_breed_ipc7rf_k$();
                  if (contains(this_38.toLowerCase(), element_45)) {
                    tmp$ret$32 = true;
                    break l$ret$33;
                  }
                }
                tmp$ret$32 = false;
              }
               while (false);
              if (tmp$ret$32) {
                destination_26.add_utx5q5_k$(element_44);
              }
            }

            var pigs = destination_26;
            var equipmentCategories = CategoryConfig_getInstance().getAllEquipmentCategories_8y1yan_k$();
            var destination_27 = ArrayList_init_$Create$();
            var tmp0_iterator_46 = inventory.iterator_jk1svi_k$();
            while (tmp0_iterator_46.hasNext_bitz1p_k$()) {
              var element_46 = tmp0_iterator_46.next_20eer_k$();
              if (element_46.get_category_uyv41l_k$().equals(InventoryCategory_EQUIPMENT_getInstance())) {
                destination_27.add_utx5q5_k$(element_46);
              }
            }

            var equipment = destination_27;
            var destination_28 = ArrayList_init_$Create$();
            var tmp0_iterator_47 = tasks.iterator_jk1svi_k$();
            while (tmp0_iterator_47.hasNext_bitz1p_k$()) {
              var element_47 = tmp0_iterator_47.next_20eer_k$();
              if (element_47.get_category_uyv41l_k$().equals(TaskCategory_EQUIPMENT_MAINTENANCE_getInstance()) ? element_47.get_status_jnf6d7_k$().equals(TaskStatus_PENDING_getInstance()) : false) {
                destination_28.add_utx5q5_k$(element_47);
              }
            }

            var pendingMaintenance = destination_28;
            var destination_29 = ArrayList_init_$Create$();
            var tmp0_iterator_48 = inventory.iterator_jk1svi_k$();
            while (tmp0_iterator_48.hasNext_bitz1p_k$()) {
              var element_48 = tmp0_iterator_48.next_20eer_k$();
              var tmp_21;
              if (element_48.get_category_uyv41l_k$().equals(InventoryCategory_EQUIPMENT_getInstance())) {
                var tmp$ret$34;
                l$ret$35: do {
                  var this_39 = Equipment_getInstance().get_GREENHOUSE_hlwi9m_k$();
                  var tmp_22;
                  if (isInterface(this_39, Collection)) {
                    tmp_22 = this_39.isEmpty_y1axqb_k$();
                  } else {
                    tmp_22 = false;
                  }
                  if (tmp_22) {
                    tmp$ret$34 = false;
                    break l$ret$35;
                  }
                  var tmp0_iterator_49 = this_39.iterator_jk1svi_k$();
                  while (tmp0_iterator_49.hasNext_bitz1p_k$()) {
                    var element_49 = tmp0_iterator_49.next_20eer_k$();
                    var this_40 = element_48.get_name_woqyms_k$();
                    if (contains(this_40.toLowerCase(), element_49)) {
                      tmp$ret$34 = true;
                      break l$ret$35;
                    }
                  }
                  tmp$ret$34 = false;
                }
                 while (false);
                tmp_21 = tmp$ret$34;
              } else {
                tmp_21 = false;
              }
              if (tmp_21) {
                destination_29.add_utx5q5_k$(element_48);
              }
            }

            var greenhouseEquipment = destination_29;
            var destination_30 = ArrayList_init_$Create$();
            var tmp0_iterator_50 = inventory.iterator_jk1svi_k$();
            while (tmp0_iterator_50.hasNext_bitz1p_k$()) {
              var element_50 = tmp0_iterator_50.next_20eer_k$();
              var tmp_23;
              if (element_50.get_category_uyv41l_k$().equals(InventoryCategory_EQUIPMENT_getInstance())) {
                var tmp$ret$36;
                l$ret$37: do {
                  var this_41 = Equipment_getInstance().get_IRRIGATION_kayfzd_k$();
                  var tmp_24;
                  if (isInterface(this_41, Collection)) {
                    tmp_24 = this_41.isEmpty_y1axqb_k$();
                  } else {
                    tmp_24 = false;
                  }
                  if (tmp_24) {
                    tmp$ret$36 = false;
                    break l$ret$37;
                  }
                  var tmp0_iterator_51 = this_41.iterator_jk1svi_k$();
                  while (tmp0_iterator_51.hasNext_bitz1p_k$()) {
                    var element_51 = tmp0_iterator_51.next_20eer_k$();
                    var this_42 = element_50.get_name_woqyms_k$();
                    if (contains(this_42.toLowerCase(), element_51)) {
                      tmp$ret$36 = true;
                      break l$ret$37;
                    }
                  }
                  tmp$ret$36 = false;
                }
                 while (false);
                tmp_23 = tmp$ret$36;
              } else {
                tmp_23 = false;
              }
              if (tmp_23) {
                destination_30.add_utx5q5_k$(element_50);
              }
            }

            var irrigationEquipment = destination_30;
            var destination_31 = ArrayList_init_$Create$();
            var tmp0_iterator_52 = inventory.iterator_jk1svi_k$();
            while (tmp0_iterator_52.hasNext_bitz1p_k$()) {
              var element_52 = tmp0_iterator_52.next_20eer_k$();
              var tmp_25;
              if (element_52.get_category_uyv41l_k$().equals(InventoryCategory_EQUIPMENT_getInstance())) {
                var tmp$ret$38;
                l$ret$39: do {
                  var this_43 = Equipment_getInstance().get_TRACTORS_25liw5_k$();
                  var tmp_26;
                  if (isInterface(this_43, Collection)) {
                    tmp_26 = this_43.isEmpty_y1axqb_k$();
                  } else {
                    tmp_26 = false;
                  }
                  if (tmp_26) {
                    tmp$ret$38 = false;
                    break l$ret$39;
                  }
                  var tmp0_iterator_53 = this_43.iterator_jk1svi_k$();
                  while (tmp0_iterator_53.hasNext_bitz1p_k$()) {
                    var element_53 = tmp0_iterator_53.next_20eer_k$();
                    var this_44 = element_52.get_name_woqyms_k$();
                    if (contains(this_44.toLowerCase(), element_53)) {
                      tmp$ret$38 = true;
                      break l$ret$39;
                    }
                  }
                  tmp$ret$38 = false;
                }
                 while (false);
                tmp_25 = tmp$ret$38;
              } else {
                tmp_25 = false;
              }
              if (tmp_25) {
                destination_31.add_utx5q5_k$(element_52);
              }
            }

            var harvestingEquipment = destination_31;
            var destination_32 = ArrayList_init_$Create$();
            var tmp0_iterator_54 = inventory.iterator_jk1svi_k$();
            while (tmp0_iterator_54.hasNext_bitz1p_k$()) {
              var element_54 = tmp0_iterator_54.next_20eer_k$();
              var tmp_27;
              if (element_54.get_category_uyv41l_k$().equals(InventoryCategory_EQUIPMENT_getInstance())) {
                var tmp$ret$40;
                l$ret$41: do {
                  var this_45 = Equipment_getInstance().get_TRACTORS_25liw5_k$();
                  var tmp_28;
                  if (isInterface(this_45, Collection)) {
                    tmp_28 = this_45.isEmpty_y1axqb_k$();
                  } else {
                    tmp_28 = false;
                  }
                  if (tmp_28) {
                    tmp$ret$40 = false;
                    break l$ret$41;
                  }
                  var tmp0_iterator_55 = this_45.iterator_jk1svi_k$();
                  while (tmp0_iterator_55.hasNext_bitz1p_k$()) {
                    var element_55 = tmp0_iterator_55.next_20eer_k$();
                    var this_46 = element_54.get_name_woqyms_k$();
                    if (contains(this_46.toLowerCase(), element_55)) {
                      tmp$ret$40 = true;
                      break l$ret$41;
                    }
                  }
                  tmp$ret$40 = false;
                }
                 while (false);
                tmp_27 = tmp$ret$40;
              } else {
                tmp_27 = false;
              }
              if (tmp_27) {
                destination_32.add_utx5q5_k$(element_54);
              }
            }

            var plantingEquipment = destination_32;
            var tmp_29;
            if (!tasks.isEmpty_y1axqb_k$()) {
              var destination_33 = ArrayList_init_$Create$();
              var tmp0_iterator_56 = tasks.iterator_jk1svi_k$();
              while (tmp0_iterator_56.hasNext_bitz1p_k$()) {
                var element_56 = tmp0_iterator_56.next_20eer_k$();
                if (element_56.get_status_jnf6d7_k$().equals(TaskStatus_COMPLETED_getInstance())) {
                  destination_33.add_utx5q5_k$(element_56);
                }
              }
              tmp_29 = destination_33.get_size_woubt6_k$() / tasks.get_size_woubt6_k$() * 100;
            } else {
              tmp_29 = 0.0;
            }

            var efficiency = tmp_29;
            var tmp_30;
            if (!crops.isEmpty_y1axqb_k$()) {
              var destination_34 = ArrayList_init_$Create$();
              var tmp0_iterator_57 = crops.iterator_jk1svi_k$();
              while (tmp0_iterator_57.hasNext_bitz1p_k$()) {
                var element_57 = tmp0_iterator_57.next_20eer_k$();
                if (element_57.get_status_jnf6d7_k$().equals(CropStatus_GROWING_getInstance())) {
                  destination_34.add_utx5q5_k$(element_57);
                }
              }
              tmp_30 = destination_34.get_size_woubt6_k$() / crops.get_size_woubt6_k$() * 100;
            } else {
              tmp_30 = 0.0;
            }

            var growthRate = tmp_30;
            var tmp_31 = to('totalPlants', plants.get_size_woubt6_k$());
            var tmp_32 = to('totalFlowers', flowers.get_size_woubt6_k$());
            var tmp_33 = to('totalTrees', trees.get_size_woubt6_k$());
            var tmp_34 = to('totalVegetables', vegetables.get_size_woubt6_k$());
            var tmp_35 = to('totalHerbs', herbs.get_size_woubt6_k$());
            var tmp_36 = to('totalBerries', berries.get_size_woubt6_k$());
            var tmp_37 = to('totalGrains', grains.get_size_woubt6_k$());
            var tmp_38 = to('totalLegumes', legumes.get_size_woubt6_k$());
            var tmp_39 = to('totalOrganicProducts', organicProducts.get_size_woubt6_k$());
            var tmp_40 = to('totalSeasonalCrops', seasonalCrops.get_size_woubt6_k$());
            var tmp_41 = to('totalPerennialCrops', perennialCrops.get_size_woubt6_k$());
            var tmp_42 = to('totalAnnualCrops', annualCrops.get_size_woubt6_k$());
            var tmp_43 = to('totalAquatic', aquatic.get_size_woubt6_k$());
            var tmp_44 = to('totalLivestock', livestock.get_size_woubt6_k$());
            var tmp_45 = to('totalPets', pets.get_size_woubt6_k$());
            var tmp_46 = to('totalBees', bees.get_size_woubt6_k$());
            var tmp_47 = to('totalPoultry', poultry.get_size_woubt6_k$());
            var tmp_48 = to('totalGoats', goats.get_size_woubt6_k$());
            var tmp_49 = to('totalHorses', horses.get_size_woubt6_k$());
            var tmp_50 = to('totalCattle', cattle.get_size_woubt6_k$());
            var tmp_51 = to('totalSheep', sheep.get_size_woubt6_k$());
            var tmp_52 = to('totalPigs', pigs.get_size_woubt6_k$());
            var tmp_53 = to('totalEquipment', equipment.get_size_woubt6_k$());
            var tmp_54 = to('totalGreenhouseEquipment', greenhouseEquipment.get_size_woubt6_k$());
            var tmp_55 = to('totalIrrigationEquipment', irrigationEquipment.get_size_woubt6_k$());
            var tmp_56 = to('totalHarvestingEquipment', harvestingEquipment.get_size_woubt6_k$());
            var tmp_57 = to('totalPlantingEquipment', plantingEquipment.get_size_woubt6_k$());
            var tmp_58 = to('pendingMaintenance', pendingMaintenance.get_size_woubt6_k$());
            var tmp_59 = to('totalCrops', crops.get_size_woubt6_k$());
            var destination_35 = ArrayList_init_$Create$();
            var tmp0_iterator_58 = crops.iterator_jk1svi_k$();
            while (tmp0_iterator_58.hasNext_bitz1p_k$()) {
              var element_58 = tmp0_iterator_58.next_20eer_k$();
              if (!element_58.get_status_jnf6d7_k$().equals(CropStatus_HARVESTED_getInstance()) ? !element_58.get_status_jnf6d7_k$().equals(CropStatus_FAILED_getInstance()) : false) {
                destination_35.add_utx5q5_k$(element_58);
              }
            }

            var tmp_60 = to('activeCrops', destination_35.get_size_woubt6_k$());
            var destination_36 = ArrayList_init_$Create$();
            var tmp0_iterator_59 = livestock.iterator_jk1svi_k$();
            while (tmp0_iterator_59.hasNext_bitz1p_k$()) {
              var element_59 = tmp0_iterator_59.next_20eer_k$();
              if (element_59.get_status_jnf6d7_k$().equals(LivestockStatus_ACTIVE_getInstance())) {
                destination_36.add_utx5q5_k$(element_59);
              }
            }

            var tmp_61 = to('healthyLivestock', destination_36.get_size_woubt6_k$());
            var destination_37 = ArrayList_init_$Create$();
            var tmp0_iterator_60 = tasks.iterator_jk1svi_k$();
            while (tmp0_iterator_60.hasNext_bitz1p_k$()) {
              var element_60 = tmp0_iterator_60.next_20eer_k$();
              if (element_60.get_status_jnf6d7_k$().equals(TaskStatus_PENDING_getInstance())) {
                destination_37.add_utx5q5_k$(element_60);
              }
            }

            var tmp_62 = to('pendingTasks', destination_37.get_size_woubt6_k$());
            var destination_38 = ArrayList_init_$Create$();
            var tmp0_iterator_61 = tasks.iterator_jk1svi_k$();
            while (tmp0_iterator_61.hasNext_bitz1p_k$()) {
              var element_61 = tmp0_iterator_61.next_20eer_k$();
              if (element_61.get_status_jnf6d7_k$().equals(TaskStatus_COMPLETED_getInstance())) {
                destination_38.add_utx5q5_k$(element_61);
              }
            }

            return mapOf([tmp_31, tmp_32, tmp_33, tmp_34, tmp_35, tmp_36, tmp_37, tmp_38, tmp_39, tmp_40, tmp_41, tmp_42, tmp_43, tmp_44, tmp_45, tmp_46, tmp_47, tmp_48, tmp_49, tmp_50, tmp_51, tmp_52, tmp_53, tmp_54, tmp_55, tmp_56, tmp_57, tmp_58, tmp_59, tmp_60, tmp_61, tmp_62, to('completedTasks', destination_38.get_size_woubt6_k$()), to('totalIncome', totalIncome), to('totalExpenses', totalExpenses), to('totalRevenue', totalIncome), to('netProfit', netProfit), to('profitMargin', profitMargin), to('efficiency', efficiency), to('growthRate', growthRate)]);
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
  function DataService() {
    this.mockFarms_1 = mutableListOf([new Farm(new Long(1, 0), 'Green Valley Farm', new Location(40.7128, -74.006, 'Springfield, IL'), 150.0, FarmType_MIXED_getInstance(), FarmStatus_ACTIVE_getInstance(), new Long(1, 0)), new Farm(new Long(2, 0), 'Sunset Ranch', new Location(34.0522, -118.2437, 'Austin, TX'), 200.0, FarmType_LIVESTOCK_getInstance(), FarmStatus_ACTIVE_getInstance(), new Long(1, 0))]);
    this.mockCrops_1 = mutableListOf([new Crop(new Long(1, 0), 'Corn', 'Sweet Corn', new Long(1, 0), '2024-05-01', '2024-09-01', 50.0, CropStatus_GROWING_getInstance()), new Crop(new Long(2, 0), 'Wheat', 'Winter Wheat', new Long(1, 0), '2024-10-01', '2025-07-01', 75.0, CropStatus_READY_FOR_HARVEST_getInstance()), new Crop(new Long(3, 0), 'Rose', 'Red Rose', new Long(1, 0), '2024-03-01', '2024-06-01', 5.0, CropStatus_GROWING_getInstance()), new Crop(new Long(4, 0), 'Tulip', 'Yellow Tulip', new Long(1, 0), '2024-02-01', '2024-05-01', 3.0, CropStatus_GROWING_getInstance()), new Crop(new Long(5, 0), 'Apple Tree', 'Red Delicious', new Long(1, 0), '2020-04-01', '2024-09-01', 10.0, CropStatus_GROWING_getInstance()), new Crop(new Long(6, 0), 'Orange Tree', 'Navel Orange', new Long(2, 0), '2019-03-01', '2024-12-01', 8.0, CropStatus_GROWING_getInstance()), new Crop(new Long(7, 0), 'Tomato', 'Cherry Tomato', new Long(1, 0), '2024-04-01', '2024-08-01', 2.0, CropStatus_GROWING_getInstance()), new Crop(new Long(8, 0), 'Lettuce', 'Romaine', new Long(1, 0), '2024-03-15', '2024-06-01', 1.5, CropStatus_GROWING_getInstance()), new Crop(new Long(9, 0), 'Strawberry', 'Sweet Strawberry', new Long(1, 0), '2024-02-01', '2024-05-01', 0.5, CropStatus_GROWING_getInstance()), new Crop(new Long(10, 0), 'Herbs Mix', 'Basil, Mint, Rosemary', new Long(1, 0), '2024-03-01', '2024-07-01', 0.3, CropStatus_GROWING_getInstance())]);
    this.mockLivestock_1 = mutableListOf([new Livestock_0(new Long(1, 0), 'Bessie', LivestockType_CATTLE_getInstance(), 'Holstein', new Long(2, 0), '2022-01-01', 650.0, LivestockStatus_ACTIVE_getInstance(), 'Barn A'), new Livestock_0(new Long(2, 0), 'Daisy', LivestockType_CATTLE_getInstance(), 'Jersey', new Long(2, 0), '2021-01-01', 450.0, LivestockStatus_ACTIVE_getInstance(), 'Barn A'), new Livestock_0(new Long(3, 0), 'Buddy', LivestockType_OTHER_getInstance(), 'Golden Retriever', new Long(1, 0), '2020-06-01', 65.0, LivestockStatus_ACTIVE_getInstance(), 'Farm House'), new Livestock_0(new Long(4, 0), 'Whiskers', LivestockType_OTHER_getInstance(), 'Farm Cat', new Long(1, 0), '2021-03-01', 12.0, LivestockStatus_ACTIVE_getInstance(), 'Farm House'), new Livestock_0(new Long(5, 0), 'Goldie', LivestockType_FISH_getInstance(), 'Goldfish', new Long(1, 0), '2023-01-01', 0.5, LivestockStatus_ACTIVE_getInstance(), 'Pond'), new Livestock_0(new Long(6, 0), 'Clammy', LivestockType_OTHER_getInstance(), 'Freshwater Clam', new Long(1, 0), '2022-08-01', 2.0, LivestockStatus_ACTIVE_getInstance(), 'Pond'), new Livestock_0(new Long(7, 0), 'Honey', LivestockType_OTHER_getInstance(), 'Italian Honey Bee', new Long(1, 0), '2023-04-01', 0.1, LivestockStatus_ACTIVE_getInstance(), 'Beehive A'), new Livestock_0(new Long(8, 0), 'Billy', LivestockType_GOATS_getInstance(), 'Nubian Goat', new Long(2, 0), '2021-06-01', 45.0, LivestockStatus_ACTIVE_getInstance(), 'Goat Pen'), new Livestock_0(new Long(9, 0), 'Cluckers', LivestockType_POULTRY_getInstance(), 'Rhode Island Red', new Long(2, 0), '2022-09-01', 2.5, LivestockStatus_ACTIVE_getInstance(), 'Chicken Coop'), new Livestock_0(new Long(10, 0), 'Thunder', LivestockType_HORSES_getInstance(), 'Quarter Horse', new Long(2, 0), '2020-03-01', 450.0, LivestockStatus_ACTIVE_getInstance(), 'Horse Barn')]);
    this.mockTasks_1 = mutableListOf([new Task(new Long(1, 0), 'Harvest Wheat Field', 'Harvest the winter wheat in the north field', new Long(1, 0), new Long(2, 0), TaskPriority_HIGH_getInstance(), TaskStatus_PENDING_getInstance(), getCurrentTimeMillis().plus_r93sks_k$(new Long(604800000, 0)), VOID, TaskCategory_HARVESTING_getInstance(), 8.0), new Task(new Long(2, 0), 'Feed Livestock', 'Morning feeding for all cattle', new Long(2, 0), new Long(1, 0), TaskPriority_MEDIUM_getInstance(), TaskStatus_COMPLETED_getInstance(), getCurrentTimeMillis().minus_mfbszm_k$(new Long(7200000, 0)), VOID, TaskCategory_LIVESTOCK_CARE_getInstance(), 2.0), new Task(new Long(3, 0), 'Tractor Maintenance', 'Regular maintenance check for John Deere tractor', new Long(1, 0), new Long(1, 0), TaskPriority_HIGH_getInstance(), TaskStatus_PENDING_getInstance(), getCurrentTimeMillis().plus_r93sks_k$(new Long(259200000, 0)), VOID, TaskCategory_EQUIPMENT_MAINTENANCE_getInstance(), 4.0), new Task(new Long(4, 0), 'Irrigation System Check', 'Inspect and test irrigation system', new Long(1, 0), new Long(2, 0), TaskPriority_MEDIUM_getInstance(), TaskStatus_PENDING_getInstance(), getCurrentTimeMillis().plus_r93sks_k$(new Long(432000000, 0)), VOID, TaskCategory_EQUIPMENT_MAINTENANCE_getInstance(), 3.0)]);
    this.mockUsers_1 = mutableListOf([new User(new Long(1, 0), 'john.doe@farm.com', 'John', 'Doe', UserRole_FARMER_getInstance(), new Long(1, 0)), new User(new Long(2, 0), 'jane.smith@farm.com', 'Jane', 'Smith', UserRole_WORKER_getInstance(), new Long(1, 0))]);
    this.mockInventory_1 = mutableListOf([new InventoryItem('inv-1', 'Corn Seeds', '1', InventoryCategory_SEEDS_getInstance(), 100.0, 'kg', 50.0, 'Seed Co'), new InventoryItem('inv-2', 'Fertilizer', '1', InventoryCategory_FERTILIZER_getInstance(), 500.0, 'kg', 200.0, 'Fertilizer Co'), new InventoryItem('inv-3', 'Tractor', '1', InventoryCategory_EQUIPMENT_getInstance(), 1.0, 'unit', 50000.0, 'John Deere'), new InventoryItem('inv-4', 'Irrigation System', '1', InventoryCategory_EQUIPMENT_getInstance(), 1.0, 'system', 15000.0, 'Irrigation Pro'), new InventoryItem('inv-5', 'Harvester', '1', InventoryCategory_EQUIPMENT_getInstance(), 1.0, 'unit', 75000.0, 'Case IH'), new InventoryItem('inv-6', 'Seed Drill', '1', InventoryCategory_EQUIPMENT_getInstance(), 1.0, 'unit', 12000.0, 'Great Plains'), new InventoryItem('inv-7', 'Greenhouse System', '1', InventoryCategory_EQUIPMENT_getInstance(), 1.0, 'system', 25000.0, 'Greenhouse Pro'), new InventoryItem('inv-8', 'Drip Irrigation Kit', '1', InventoryCategory_EQUIPMENT_getInstance(), 1.0, 'kit', 8000.0, 'Irrigation Plus'), new InventoryItem('inv-9', 'Organic Fertilizer', '1', InventoryCategory_FERTILIZER_getInstance(), 1000.0, 'kg', 800.0, 'Organic Farm Supply'), new InventoryItem('inv-10', 'Beehive Equipment', '1', InventoryCategory_EQUIPMENT_getInstance(), 5.0, 'units', 500.0, 'Bee Supply Co'), new InventoryItem('inv-11', 'Chicken Feed', '2', InventoryCategory_FEED_getInstance(), 500.0, 'kg', 300.0, 'Feed & Grain Co'), new InventoryItem('inv-12', 'Veterinary Supplies', '2', InventoryCategory_MEDICINE_getInstance(), 50.0, 'units', 1200.0, 'Vet Supply Pro')]);
    this.mockFinancialRecords_1 = mutableListOf([new FinancialRecord(new Long(1, 0), new Long(1, 0), FinancialType_EXPENSE_getInstance(), FinancialCategory_SEEDS_AND_PLANTS_getInstance(), 2500.0, 'Corn and wheat seeds', getCurrentTimeMillis().minus_mfbszm_k$(new Long(-813934592, 1))), new FinancialRecord(new Long(2, 0), new Long(1, 0), FinancialType_INCOME_getInstance(), FinancialCategory_CROP_SALES_getInstance(), 15000.0, 'Soybean harvest sale', getCurrentTimeMillis().minus_mfbszm_k$(new Long(-1702967296, 0)))]);
    this.$stable_1 = 0;
  }
  protoOf(DataService).getFarms_ajwhrm_k$ = function ($completion) {
    var tmp = new $getFarmsCOROUTINE$0(this, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(DataService).getFarm_wm4cla_k$ = function (id, $completion) {
    var tmp = new $getFarmCOROUTINE$1(this, id, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(DataService).createFarm_obu03f_k$ = function (farm, $completion) {
    var tmp = new $createFarmCOROUTINE$2(this, farm, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(DataService).updateFarm_by8k7c_k$ = function (farm, $completion) {
    var tmp = new $updateFarmCOROUTINE$3(this, farm, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(DataService).deleteFarm_ckmdg9_k$ = function (id, $completion) {
    var tmp = new $deleteFarmCOROUTINE$4(this, id, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(DataService).getCrops_e2wbbi_k$ = function ($completion) {
    var tmp = new $getCropsCOROUTINE$5(this, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(DataService).getCrop_os9a4e_k$ = function (id, $completion) {
    var tmp = new $getCropCOROUTINE$6(this, id, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(DataService).createCrop_yokpw5_k$ = function (crop, $completion) {
    var tmp = new $createCropCOROUTINE$7(this, crop, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(DataService).updateCrop_maza02_k$ = function (crop, $completion) {
    var tmp = new $updateCropCOROUTINE$8(this, crop, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(DataService).deleteCrop_iphveb_k$ = function (id, $completion) {
    var tmp = new $deleteCropCOROUTINE$9(this, id, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(DataService).addCrop_tly66e_k$ = function (crop, $completion) {
    var tmp = new $addCropCOROUTINE$10(this, crop, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(DataService).getLivestock_ixh03l_k$ = function ($completion) {
    var tmp = new $getLivestockCOROUTINE$11(this, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(DataService).getLivestockItem_hp5brf_k$ = function (id, $completion) {
    var tmp = new $getLivestockItemCOROUTINE$12(this, id, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(DataService).createLivestock_7p4vo7_k$ = function (livestock, $completion) {
    var tmp = new $createLivestockCOROUTINE$13(this, livestock, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(DataService).addLivestock_b3lijg_k$ = function (livestock, $completion) {
    var tmp = new $addLivestockCOROUTINE$14(this, livestock, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(DataService).updateLivestock_sr7kjg_k$ = function (livestock, $completion) {
    var tmp = new $updateLivestockCOROUTINE$15(this, livestock, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(DataService).deleteLivestock_dewxwx_k$ = function (id, $completion) {
    var tmp = new $deleteLivestockCOROUTINE$16(this, id, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(DataService).getTasks_b1qutu_k$ = function ($completion) {
    var tmp = new $getTasksCOROUTINE$17(this, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(DataService).getTask_ty9vdu_k$ = function (id, $completion) {
    var tmp = new $getTaskCOROUTINE$18(this, id, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(DataService).createTask_imi7oq_k$ = function (task, $completion) {
    var tmp = new $createTaskCOROUTINE$19(this, task, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(DataService).updateTask_68wrsn_k$ = function (task, $completion) {
    var tmp = new $updateTaskCOROUTINE$20(this, task, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(DataService).deleteTask_cvmqi2_k$ = function (id, $completion) {
    var tmp = new $deleteTaskCOROUTINE$21(this, id, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(DataService).updateTaskStatus_xthm0z_k$ = function (taskId, status, $completion) {
    var tmp = new $updateTaskStatusCOROUTINE$22(this, taskId, status, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(DataService).getUsers_88aucu_k$ = function ($completion) {
    var tmp = new $getUsersCOROUTINE$23(this, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(DataService).getUser_1rps6a_k$ = function (id, $completion) {
    var tmp = new $getUserCOROUTINE$24(this, id, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(DataService).createUser_8oqdjk_k$ = function (user, $completion) {
    var tmp = new $createUserCOROUTINE$25(this, user, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(DataService).updateUser_l2btfn_k$ = function (user, $completion) {
    var tmp = new $updateUserCOROUTINE$26(this, user, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(DataService).deleteUser_egmlgk_k$ = function (id, $completion) {
    var tmp = new $deleteUserCOROUTINE$27(this, id, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(DataService).getInventory_bovg7m_k$ = function ($completion) {
    var tmp = new $getInventoryCOROUTINE$28(this, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(DataService).getInventoryItem_gp2kfg_k$ = function (id, $completion) {
    var tmp = new $getInventoryItemCOROUTINE$29(this, id, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(DataService).createInventoryItem_35ctco_k$ = function (item, $completion) {
    var tmp = new $createInventoryItemCOROUTINE$30(this, item, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(DataService).updateInventoryItem_kfdh3p_k$ = function (item, $completion) {
    var tmp = new $updateInventoryItemCOROUTINE$31(this, item, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(DataService).deleteInventoryItem_8gg2p6_k$ = function (id, $completion) {
    var tmp = new $deleteInventoryItemCOROUTINE$32(this, id, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(DataService).getFinancialRecords_t8uiq_k$ = function (farmId, type, $completion) {
    var tmp = new $getFinancialRecordsCOROUTINE$33(this, farmId, type, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(DataService).getFinancialRecords$default_df4oyr_k$ = function (farmId, type, $completion, $super) {
    farmId = farmId === VOID ? null : farmId;
    type = type === VOID ? null : type;
    return $super === VOID ? this.getFinancialRecords_t8uiq_k$(farmId, type, $completion) : $super.getFinancialRecords_t8uiq_k$.call(this, farmId, type, $completion);
  };
  protoOf(DataService).addFinancialRecord_1elf2s_k$ = function (record, $completion) {
    var tmp = new $addFinancialRecordCOROUTINE$34(this, record, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(DataService).getFarmStats_ow7adz_k$ = function (farmId, $completion) {
    var tmp = new $getFarmStatsCOROUTINE$35(this, farmId, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  function _get__uploadProgress__c6yekk($this) {
    return $this._uploadProgress_1;
  }
  function _get__uploadedFiles__9lvuvn($this) {
    return $this._uploadedFiles_1;
  }
  function generateUploadId($this) {
    return 'upload_' + getCurrentTimeMillis().toString() + '_' + Default_getInstance().nextInt_ak696k_k$(1000, 9999);
  }
  function estimateFileSize($this, _filePath) {
    // Inline function 'kotlin.ranges.random' call
    var this_0 = numberRangeToNumber(1024, 10485760);
    var tmp$ret$0 = random(this_0, Default_getInstance());
    return toLong(tmp$ret$0);
  }
  function generateFileUrl($this, uploadId, fileName) {
    return 'https://api.smartfarm.com/files/' + uploadId + '/' + fileName;
  }
  function get_$stableprop_22() {
    return 0;
  }
  function $uploadFileCOROUTINE$36(_this__u8e3s4, filePath, fileName, fileType, farmId, category, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.filePath_1 = filePath;
    this.fileName_1 = fileName;
    this.fileType_1 = fileType;
    this.farmId_1 = farmId;
    this.category_1 = category;
  }
  protoOf($uploadFileCOROUTINE$36).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(5);
            this.uploadId0__1 = generateUploadId(this._this__u8e3s4__1);
            this.set_exceptionState_fex74n_k$(4);
            this._this__u8e3s4__1._uploadProgress_1.set_value_v1vabv_k$(plus(this._this__u8e3s4__1._uploadProgress_1.get_value_j01efc_k$(), mapOf_0(to(this.uploadId0__1, new UploadProgress(this.uploadId0__1, this.fileName_1, 0.0, UploadStatus_UPLOADING_getInstance())))));
            this.tmp0_iterator1__1 = step(numberRangeToNumber(0, 100), 10).iterator_jk1svi_k$();
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 1:
            if (!this.tmp0_iterator1__1.hasNext_bitz1p_k$()) {
              this.set_state_rjd8d0_k$(3);
              continue $sm;
            }

            this.progress2__1 = this.tmp0_iterator1__1.next_20eer_k$();
            this.set_state_rjd8d0_k$(2);
            suspendResult = delay(new Long(200, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            var this_0 = this._this__u8e3s4__1._uploadProgress_1.get_value_j01efc_k$();
            var destination = LinkedHashMap_init_$Create$_0(mapCapacity(this_0.get_size_woubt6_k$()));
            var tmp0_iterator = this_0.get_entries_p20ztl_k$().iterator_jk1svi_k$();
            while (tmp0_iterator.hasNext_bitz1p_k$()) {
              var element = tmp0_iterator.next_20eer_k$();
              var tmp_0 = element.get_key_18j28a_k$();
              var id = element.get_key_18j28a_k$();
              var currentProgress = element.get_value_j01efc_k$();
              var tmp_1;
              if (id === this.uploadId0__1) {
                tmp_1 = currentProgress.copy$default_pl2z85_k$(VOID, VOID, this.progress2__1);
              } else {
                tmp_1 = currentProgress;
              }
              destination.put_4fpzoq_k$(tmp_0, tmp_1);
            }

            this._this__u8e3s4__1._uploadProgress_1.set_value_v1vabv_k$(destination);
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 3:
            var uploadedFile = new UploadedFile(this.uploadId0__1, this.fileName_1, this.filePath_1, this.fileType_1, this.farmId_1, this.category_1, getCurrentTimeMillis(), estimateFileSize(this._this__u8e3s4__1, this.filePath_1), generateFileUrl(this._this__u8e3s4__1, this.uploadId0__1, this.fileName_1));
            this._this__u8e3s4__1._uploadedFiles_1.set_value_v1vabv_k$(plus_0(this._this__u8e3s4__1._uploadedFiles_1.get_value_j01efc_k$(), uploadedFile));
            var this_1 = this._this__u8e3s4__1._uploadProgress_1.get_value_j01efc_k$();
            var destination_0 = LinkedHashMap_init_$Create$_0(mapCapacity(this_1.get_size_woubt6_k$()));
            var tmp0_iterator_0 = this_1.get_entries_p20ztl_k$().iterator_jk1svi_k$();
            while (tmp0_iterator_0.hasNext_bitz1p_k$()) {
              var element_0 = tmp0_iterator_0.next_20eer_k$();
              var tmp_2 = element_0.get_key_18j28a_k$();
              var id_0 = element_0.get_key_18j28a_k$();
              var currentProgress_0 = element_0.get_value_j01efc_k$();
              var tmp_3;
              if (id_0 === this.uploadId0__1) {
                tmp_3 = currentProgress_0.copy$default_pl2z85_k$(VOID, VOID, 100.0, UploadStatus_COMPLETED_getInstance());
              } else {
                tmp_3 = currentProgress_0;
              }
              destination_0.put_4fpzoq_k$(tmp_2, tmp_3);
            }

            this._this__u8e3s4__1._uploadProgress_1.set_value_v1vabv_k$(destination_0);
            return new Success(uploadedFile);
          case 4:
            this.set_exceptionState_fex74n_k$(5);
            var tmp_4 = this.get_exception_x0n6w6_k$();
            if (tmp_4 instanceof Exception) {
              var e = this.get_exception_x0n6w6_k$();
              var this_2 = this._this__u8e3s4__1._uploadProgress_1.get_value_j01efc_k$();
              var destination_1 = LinkedHashMap_init_$Create$_0(mapCapacity(this_2.get_size_woubt6_k$()));
              var tmp0_iterator_1 = this_2.get_entries_p20ztl_k$().iterator_jk1svi_k$();
              while (tmp0_iterator_1.hasNext_bitz1p_k$()) {
                var element_1 = tmp0_iterator_1.next_20eer_k$();
                var tmp_5 = element_1.get_key_18j28a_k$();
                var id_1 = element_1.get_key_18j28a_k$();
                var currentProgress_1 = element_1.get_value_j01efc_k$();
                var tmp_6;
                if (id_1 === this.uploadId0__1) {
                  tmp_6 = currentProgress_1.copy$default_pl2z85_k$(VOID, VOID, 0.0, UploadStatus_FAILED_getInstance(), e.message);
                } else {
                  tmp_6 = currentProgress_1;
                }
                destination_1.put_4fpzoq_k$(tmp_5, tmp_6);
              }
              this._this__u8e3s4__1._uploadProgress_1.set_value_v1vabv_k$(destination_1);
              var tmp1_elvis_lhs = e.message;
              return new Failure(tmp1_elvis_lhs == null ? 'Upload failed' : tmp1_elvis_lhs);
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 5:
            throw this.get_exception_x0n6w6_k$();
          case 6:
            this.set_exceptionState_fex74n_k$(5);
            return Unit_getInstance();
        }
      } catch ($p) {
        var e_0 = $p;
        if (this.get_exceptionState_wflpxn_k$() === 5) {
          throw e_0;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e_0);
        }
      }
     while (true);
  };
  function FileUploadService() {
    this._uploadProgress_1 = MutableStateFlow(emptyMap());
    this.uploadProgress_1 = asStateFlow(this._uploadProgress_1);
    this._uploadedFiles_1 = MutableStateFlow(emptyList());
    this.uploadedFiles_1 = asStateFlow(this._uploadedFiles_1);
    this.$stable_1 = 0;
  }
  protoOf(FileUploadService).get_uploadProgress_7zdl5j_k$ = function () {
    return this.uploadProgress_1;
  };
  protoOf(FileUploadService).get_uploadedFiles_skg3pq_k$ = function () {
    return this.uploadedFiles_1;
  };
  protoOf(FileUploadService).uploadFile_cnd5ea_k$ = function (filePath, fileName, fileType, farmId, category, $completion) {
    var tmp = new $uploadFileCOROUTINE$36(this, filePath, fileName, fileType, farmId, category, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(FileUploadService).deleteFile_nvask3_k$ = function (fileId, $completion) {
    var tmp;
    try {
      // Inline function 'kotlin.collections.filter' call
      // Inline function 'kotlin.collections.filterTo' call
      var this_0 = this._uploadedFiles_1.get_value_j01efc_k$();
      var destination = ArrayList_init_$Create$();
      var tmp0_iterator = this_0.iterator_jk1svi_k$();
      while (tmp0_iterator.hasNext_bitz1p_k$()) {
        var element = tmp0_iterator.next_20eer_k$();
        // Inline function 'com.yourcompany.smartfarm.shared.services.FileUploadService.deleteFile.<anonymous>' call
        if (!(element.id_1 === fileId)) {
          destination.add_utx5q5_k$(element);
        }
      }
      this._uploadedFiles_1.set_value_v1vabv_k$(destination);
      // Inline function 'kotlin.collections.filterKeys' call
      var this_1 = this._uploadProgress_1.get_value_j01efc_k$();
      var result = LinkedHashMap_init_$Create$();
      // Inline function 'kotlin.collections.iterator' call
      var tmp0_iterator_0 = this_1.get_entries_p20ztl_k$().iterator_jk1svi_k$();
      while (tmp0_iterator_0.hasNext_bitz1p_k$()) {
        var entry = tmp0_iterator_0.next_20eer_k$();
        // Inline function 'com.yourcompany.smartfarm.shared.services.FileUploadService.deleteFile.<anonymous>' call
        if (!(entry.get_key_18j28a_k$() === fileId)) {
          result.put_4fpzoq_k$(entry.get_key_18j28a_k$(), entry.get_value_j01efc_k$());
        }
      }
      this._uploadProgress_1.set_value_v1vabv_k$(result);
      tmp = true;
    } catch ($p) {
      var tmp_0;
      if ($p instanceof Exception) {
        var e = $p;
        tmp_0 = false;
      } else {
        throw $p;
      }
      tmp = tmp_0;
    }
    return tmp;
  };
  protoOf(FileUploadService).getFilesByFarm_qonmlt_k$ = function (farmId, category) {
    // Inline function 'kotlin.collections.filter' call
    // Inline function 'kotlin.collections.filterTo' call
    var this_0 = this._uploadedFiles_1.get_value_j01efc_k$();
    var destination = ArrayList_init_$Create$();
    var tmp0_iterator = this_0.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var element = tmp0_iterator.next_20eer_k$();
      // Inline function 'com.yourcompany.smartfarm.shared.services.FileUploadService.getFilesByFarm.<anonymous>' call
      if (element.farmId_1 === farmId ? category == null ? true : element.category_1.equals(category) : false) {
        destination.add_utx5q5_k$(element);
      }
    }
    return destination;
  };
  protoOf(FileUploadService).getFilesByFarm$default_1kl8rm_k$ = function (farmId, category, $super) {
    category = category === VOID ? null : category;
    return $super === VOID ? this.getFilesByFarm_qonmlt_k$(farmId, category) : $super.getFilesByFarm_qonmlt_k$.call(this, farmId, category);
  };
  protoOf(FileUploadService).getFilesByCategory_fr4ay2_k$ = function (category) {
    // Inline function 'kotlin.collections.filter' call
    // Inline function 'kotlin.collections.filterTo' call
    var this_0 = this._uploadedFiles_1.get_value_j01efc_k$();
    var destination = ArrayList_init_$Create$();
    var tmp0_iterator = this_0.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var element = tmp0_iterator.next_20eer_k$();
      // Inline function 'com.yourcompany.smartfarm.shared.services.FileUploadService.getFilesByCategory.<anonymous>' call
      if (element.category_1.equals(category)) {
        destination.add_utx5q5_k$(element);
      }
    }
    return destination;
  };
  protoOf(FileUploadService).clearCompletedUploads_6mzmak_k$ = function () {
    // Inline function 'kotlin.collections.filterValues' call
    var this_0 = this._uploadProgress_1.get_value_j01efc_k$();
    var result = LinkedHashMap_init_$Create$();
    // Inline function 'kotlin.collections.iterator' call
    var tmp0_iterator = this_0.get_entries_p20ztl_k$().iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var entry = tmp0_iterator.next_20eer_k$();
      // Inline function 'com.yourcompany.smartfarm.shared.services.FileUploadService.clearCompletedUploads.<anonymous>' call
      if (!entry.get_value_j01efc_k$().status_1.equals(UploadStatus_COMPLETED_getInstance())) {
        result.put_4fpzoq_k$(entry.get_key_18j28a_k$(), entry.get_value_j01efc_k$());
      }
    }
    this._uploadProgress_1.set_value_v1vabv_k$(result);
  };
  function get_$stableprop_23() {
    return 0;
  }
  function UploadProgress(id, fileName, progress, status, error) {
    error = error === VOID ? null : error;
    this.id_1 = id;
    this.fileName_1 = fileName;
    this.progress_1 = progress;
    this.status_1 = status;
    this.error_1 = error;
    this.$stable_1 = 0;
  }
  protoOf(UploadProgress).get_id_kntnx8_k$ = function () {
    return this.id_1;
  };
  protoOf(UploadProgress).get_fileName_r258mo_k$ = function () {
    return this.fileName_1;
  };
  protoOf(UploadProgress).get_progress_mo5qeu_k$ = function () {
    return this.progress_1;
  };
  protoOf(UploadProgress).get_status_jnf6d7_k$ = function () {
    return this.status_1;
  };
  protoOf(UploadProgress).get_error_iqzvfj_k$ = function () {
    return this.error_1;
  };
  protoOf(UploadProgress).component1_7eebsc_k$ = function () {
    return this.id_1;
  };
  protoOf(UploadProgress).component2_7eebsb_k$ = function () {
    return this.fileName_1;
  };
  protoOf(UploadProgress).component3_7eebsa_k$ = function () {
    return this.progress_1;
  };
  protoOf(UploadProgress).component4_7eebs9_k$ = function () {
    return this.status_1;
  };
  protoOf(UploadProgress).component5_7eebs8_k$ = function () {
    return this.error_1;
  };
  protoOf(UploadProgress).copy_bp3ps2_k$ = function (id, fileName, progress, status, error) {
    return new UploadProgress(id, fileName, progress, status, error);
  };
  protoOf(UploadProgress).copy$default_pl2z85_k$ = function (id, fileName, progress, status, error, $super) {
    id = id === VOID ? this.id_1 : id;
    fileName = fileName === VOID ? this.fileName_1 : fileName;
    progress = progress === VOID ? this.progress_1 : progress;
    status = status === VOID ? this.status_1 : status;
    error = error === VOID ? this.error_1 : error;
    return $super === VOID ? this.copy_bp3ps2_k$(id, fileName, progress, status, error) : $super.copy_bp3ps2_k$.call(this, id, fileName, progress, status, error);
  };
  protoOf(UploadProgress).toString = function () {
    return 'UploadProgress(id=' + this.id_1 + ', fileName=' + this.fileName_1 + ', progress=' + this.progress_1 + ', status=' + this.status_1 + ', error=' + this.error_1 + ')';
  };
  protoOf(UploadProgress).hashCode = function () {
    var result = getStringHashCode(this.id_1);
    result = imul(result, 31) + getStringHashCode(this.fileName_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.progress_1) | 0;
    result = imul(result, 31) + this.status_1.hashCode() | 0;
    result = imul(result, 31) + (this.error_1 == null ? 0 : getStringHashCode(this.error_1)) | 0;
    return result;
  };
  protoOf(UploadProgress).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof UploadProgress))
      return false;
    var tmp0_other_with_cast = other instanceof UploadProgress ? other : THROW_CCE();
    if (!(this.id_1 === tmp0_other_with_cast.id_1))
      return false;
    if (!(this.fileName_1 === tmp0_other_with_cast.fileName_1))
      return false;
    if (!equals(this.progress_1, tmp0_other_with_cast.progress_1))
      return false;
    if (!this.status_1.equals(tmp0_other_with_cast.status_1))
      return false;
    if (!(this.error_1 == tmp0_other_with_cast.error_1))
      return false;
    return true;
  };
  function get_$stableprop_24() {
    return 0;
  }
  function UploadedFile(id, fileName, originalPath, fileType, farmId, category, uploadDate, fileSize, url) {
    this.id_1 = id;
    this.fileName_1 = fileName;
    this.originalPath_1 = originalPath;
    this.fileType_1 = fileType;
    this.farmId_1 = farmId;
    this.category_1 = category;
    this.uploadDate_1 = uploadDate;
    this.fileSize_1 = fileSize;
    this.url_1 = url;
    this.$stable_1 = 0;
  }
  protoOf(UploadedFile).get_id_kntnx8_k$ = function () {
    return this.id_1;
  };
  protoOf(UploadedFile).get_fileName_r258mo_k$ = function () {
    return this.fileName_1;
  };
  protoOf(UploadedFile).get_originalPath_v4q49t_k$ = function () {
    return this.originalPath_1;
  };
  protoOf(UploadedFile).get_fileType_r29kf3_k$ = function () {
    return this.fileType_1;
  };
  protoOf(UploadedFile).get_farmId_d7oohm_k$ = function () {
    return this.farmId_1;
  };
  protoOf(UploadedFile).get_category_uyv41l_k$ = function () {
    return this.category_1;
  };
  protoOf(UploadedFile).get_uploadDate_o79gdk_k$ = function () {
    return this.uploadDate_1;
  };
  protoOf(UploadedFile).get_fileSize_r28lt2_k$ = function () {
    return this.fileSize_1;
  };
  protoOf(UploadedFile).get_url_18iuii_k$ = function () {
    return this.url_1;
  };
  protoOf(UploadedFile).component1_7eebsc_k$ = function () {
    return this.id_1;
  };
  protoOf(UploadedFile).component2_7eebsb_k$ = function () {
    return this.fileName_1;
  };
  protoOf(UploadedFile).component3_7eebsa_k$ = function () {
    return this.originalPath_1;
  };
  protoOf(UploadedFile).component4_7eebs9_k$ = function () {
    return this.fileType_1;
  };
  protoOf(UploadedFile).component5_7eebs8_k$ = function () {
    return this.farmId_1;
  };
  protoOf(UploadedFile).component6_7eebs7_k$ = function () {
    return this.category_1;
  };
  protoOf(UploadedFile).component7_7eebs6_k$ = function () {
    return this.uploadDate_1;
  };
  protoOf(UploadedFile).component8_7eebs5_k$ = function () {
    return this.fileSize_1;
  };
  protoOf(UploadedFile).component9_7eebs4_k$ = function () {
    return this.url_1;
  };
  protoOf(UploadedFile).copy_eazwxt_k$ = function (id, fileName, originalPath, fileType, farmId, category, uploadDate, fileSize, url) {
    return new UploadedFile(id, fileName, originalPath, fileType, farmId, category, uploadDate, fileSize, url);
  };
  protoOf(UploadedFile).copy$default_b189i_k$ = function (id, fileName, originalPath, fileType, farmId, category, uploadDate, fileSize, url, $super) {
    id = id === VOID ? this.id_1 : id;
    fileName = fileName === VOID ? this.fileName_1 : fileName;
    originalPath = originalPath === VOID ? this.originalPath_1 : originalPath;
    fileType = fileType === VOID ? this.fileType_1 : fileType;
    farmId = farmId === VOID ? this.farmId_1 : farmId;
    category = category === VOID ? this.category_1 : category;
    uploadDate = uploadDate === VOID ? this.uploadDate_1 : uploadDate;
    fileSize = fileSize === VOID ? this.fileSize_1 : fileSize;
    url = url === VOID ? this.url_1 : url;
    return $super === VOID ? this.copy_eazwxt_k$(id, fileName, originalPath, fileType, farmId, category, uploadDate, fileSize, url) : $super.copy_eazwxt_k$.call(this, id, fileName, originalPath, fileType, farmId, category, uploadDate, fileSize, url);
  };
  protoOf(UploadedFile).toString = function () {
    return 'UploadedFile(id=' + this.id_1 + ', fileName=' + this.fileName_1 + ', originalPath=' + this.originalPath_1 + ', fileType=' + this.fileType_1 + ', farmId=' + this.farmId_1 + ', category=' + this.category_1 + ', uploadDate=' + this.uploadDate_1.toString() + ', fileSize=' + this.fileSize_1.toString() + ', url=' + this.url_1 + ')';
  };
  protoOf(UploadedFile).hashCode = function () {
    var result = getStringHashCode(this.id_1);
    result = imul(result, 31) + getStringHashCode(this.fileName_1) | 0;
    result = imul(result, 31) + getStringHashCode(this.originalPath_1) | 0;
    result = imul(result, 31) + this.fileType_1.hashCode() | 0;
    result = imul(result, 31) + getStringHashCode(this.farmId_1) | 0;
    result = imul(result, 31) + this.category_1.hashCode() | 0;
    result = imul(result, 31) + this.uploadDate_1.hashCode() | 0;
    result = imul(result, 31) + this.fileSize_1.hashCode() | 0;
    result = imul(result, 31) + getStringHashCode(this.url_1) | 0;
    return result;
  };
  protoOf(UploadedFile).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof UploadedFile))
      return false;
    var tmp0_other_with_cast = other instanceof UploadedFile ? other : THROW_CCE();
    if (!(this.id_1 === tmp0_other_with_cast.id_1))
      return false;
    if (!(this.fileName_1 === tmp0_other_with_cast.fileName_1))
      return false;
    if (!(this.originalPath_1 === tmp0_other_with_cast.originalPath_1))
      return false;
    if (!this.fileType_1.equals(tmp0_other_with_cast.fileType_1))
      return false;
    if (!(this.farmId_1 === tmp0_other_with_cast.farmId_1))
      return false;
    if (!this.category_1.equals(tmp0_other_with_cast.category_1))
      return false;
    if (!this.uploadDate_1.equals(tmp0_other_with_cast.uploadDate_1))
      return false;
    if (!this.fileSize_1.equals(tmp0_other_with_cast.fileSize_1))
      return false;
    if (!(this.url_1 === tmp0_other_with_cast.url_1))
      return false;
    return true;
  };
  function get_$stableprop_25() {
    return 0;
  }
  function get_$stableprop_26() {
    return 0;
  }
  function Success(file) {
    UploadResult.call(this);
    this.file_1 = file;
    this.$stable_2 = 0;
  }
  protoOf(Success).get_file_wom0n9_k$ = function () {
    return this.file_1;
  };
  protoOf(Success).component1_7eebsc_k$ = function () {
    return this.file_1;
  };
  protoOf(Success).copy_uge99_k$ = function (file) {
    return new Success(file);
  };
  protoOf(Success).copy$default_bit212_k$ = function (file, $super) {
    file = file === VOID ? this.file_1 : file;
    return $super === VOID ? this.copy_uge99_k$(file) : $super.copy_uge99_k$.call(this, file);
  };
  protoOf(Success).toString = function () {
    return 'Success(file=' + this.file_1 + ')';
  };
  protoOf(Success).hashCode = function () {
    return this.file_1.hashCode();
  };
  protoOf(Success).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Success))
      return false;
    var tmp0_other_with_cast = other instanceof Success ? other : THROW_CCE();
    if (!this.file_1.equals(tmp0_other_with_cast.file_1))
      return false;
    return true;
  };
  function Failure(error) {
    UploadResult.call(this);
    this.error_1 = error;
    this.$stable_2 = 0;
  }
  protoOf(Failure).get_error_iqzvfj_k$ = function () {
    return this.error_1;
  };
  protoOf(Failure).component1_7eebsc_k$ = function () {
    return this.error_1;
  };
  protoOf(Failure).copy_a35qlh_k$ = function (error) {
    return new Failure(error);
  };
  protoOf(Failure).copy$default_xdmy2h_k$ = function (error, $super) {
    error = error === VOID ? this.error_1 : error;
    return $super === VOID ? this.copy_a35qlh_k$(error) : $super.copy_a35qlh_k$.call(this, error);
  };
  protoOf(Failure).toString = function () {
    return 'Failure(error=' + this.error_1 + ')';
  };
  protoOf(Failure).hashCode = function () {
    return getStringHashCode(this.error_1);
  };
  protoOf(Failure).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Failure))
      return false;
    var tmp0_other_with_cast = other instanceof Failure ? other : THROW_CCE();
    if (!(this.error_1 === tmp0_other_with_cast.error_1))
      return false;
    return true;
  };
  function get_$stableprop_27() {
    return 0;
  }
  function UploadResult() {
    this.$stable_1 = 0;
  }
  var FileType_IMAGE_instance;
  var FileType_DOCUMENT_instance;
  var FileType_SPREADSHEET_instance;
  var FileType_PDF_instance;
  var FileType_VIDEO_instance;
  var FileType_AUDIO_instance;
  var FileType_ARCHIVE_instance;
  function values_12() {
    return [FileType_IMAGE_getInstance(), FileType_DOCUMENT_getInstance(), FileType_SPREADSHEET_getInstance(), FileType_PDF_getInstance(), FileType_VIDEO_getInstance(), FileType_AUDIO_getInstance(), FileType_ARCHIVE_getInstance()];
  }
  function valueOf_12(value) {
    switch (value) {
      case 'IMAGE':
        return FileType_IMAGE_getInstance();
      case 'DOCUMENT':
        return FileType_DOCUMENT_getInstance();
      case 'SPREADSHEET':
        return FileType_SPREADSHEET_getInstance();
      case 'PDF':
        return FileType_PDF_getInstance();
      case 'VIDEO':
        return FileType_VIDEO_getInstance();
      case 'AUDIO':
        return FileType_AUDIO_getInstance();
      case 'ARCHIVE':
        return FileType_ARCHIVE_getInstance();
      default:
        FileType_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  function get_entries_12() {
    if ($ENTRIES_12 == null)
      $ENTRIES_12 = enumEntries(values_12());
    return $ENTRIES_12;
  }
  var FileType_entriesInitialized;
  function FileType_initEntries() {
    if (FileType_entriesInitialized)
      return Unit_getInstance();
    FileType_entriesInitialized = true;
    FileType_IMAGE_instance = new FileType('IMAGE', 0);
    FileType_DOCUMENT_instance = new FileType('DOCUMENT', 1);
    FileType_SPREADSHEET_instance = new FileType('SPREADSHEET', 2);
    FileType_PDF_instance = new FileType('PDF', 3);
    FileType_VIDEO_instance = new FileType('VIDEO', 4);
    FileType_AUDIO_instance = new FileType('AUDIO', 5);
    FileType_ARCHIVE_instance = new FileType('ARCHIVE', 6);
  }
  var $ENTRIES_12;
  function FileType(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  var FileCategory_FARM_PHOTOS_instance;
  var FileCategory_CROP_IMAGES_instance;
  var FileCategory_LIVESTOCK_PHOTOS_instance;
  var FileCategory_EQUIPMENT_IMAGES_instance;
  var FileCategory_REPORTS_instance;
  var FileCategory_INVOICES_instance;
  var FileCategory_CONTRACTS_instance;
  var FileCategory_MANUALS_instance;
  var FileCategory_TRAINING_MATERIALS_instance;
  function values_13() {
    return [FileCategory_FARM_PHOTOS_getInstance(), FileCategory_CROP_IMAGES_getInstance(), FileCategory_LIVESTOCK_PHOTOS_getInstance(), FileCategory_EQUIPMENT_IMAGES_getInstance(), FileCategory_REPORTS_getInstance(), FileCategory_INVOICES_getInstance(), FileCategory_CONTRACTS_getInstance(), FileCategory_MANUALS_getInstance(), FileCategory_TRAINING_MATERIALS_getInstance()];
  }
  function valueOf_13(value) {
    switch (value) {
      case 'FARM_PHOTOS':
        return FileCategory_FARM_PHOTOS_getInstance();
      case 'CROP_IMAGES':
        return FileCategory_CROP_IMAGES_getInstance();
      case 'LIVESTOCK_PHOTOS':
        return FileCategory_LIVESTOCK_PHOTOS_getInstance();
      case 'EQUIPMENT_IMAGES':
        return FileCategory_EQUIPMENT_IMAGES_getInstance();
      case 'REPORTS':
        return FileCategory_REPORTS_getInstance();
      case 'INVOICES':
        return FileCategory_INVOICES_getInstance();
      case 'CONTRACTS':
        return FileCategory_CONTRACTS_getInstance();
      case 'MANUALS':
        return FileCategory_MANUALS_getInstance();
      case 'TRAINING_MATERIALS':
        return FileCategory_TRAINING_MATERIALS_getInstance();
      default:
        FileCategory_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  function get_entries_13() {
    if ($ENTRIES_13 == null)
      $ENTRIES_13 = enumEntries(values_13());
    return $ENTRIES_13;
  }
  var FileCategory_entriesInitialized;
  function FileCategory_initEntries() {
    if (FileCategory_entriesInitialized)
      return Unit_getInstance();
    FileCategory_entriesInitialized = true;
    FileCategory_FARM_PHOTOS_instance = new FileCategory('FARM_PHOTOS', 0);
    FileCategory_CROP_IMAGES_instance = new FileCategory('CROP_IMAGES', 1);
    FileCategory_LIVESTOCK_PHOTOS_instance = new FileCategory('LIVESTOCK_PHOTOS', 2);
    FileCategory_EQUIPMENT_IMAGES_instance = new FileCategory('EQUIPMENT_IMAGES', 3);
    FileCategory_REPORTS_instance = new FileCategory('REPORTS', 4);
    FileCategory_INVOICES_instance = new FileCategory('INVOICES', 5);
    FileCategory_CONTRACTS_instance = new FileCategory('CONTRACTS', 6);
    FileCategory_MANUALS_instance = new FileCategory('MANUALS', 7);
    FileCategory_TRAINING_MATERIALS_instance = new FileCategory('TRAINING_MATERIALS', 8);
  }
  var $ENTRIES_13;
  function FileCategory(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  var UploadStatus_PENDING_instance;
  var UploadStatus_UPLOADING_instance;
  var UploadStatus_COMPLETED_instance;
  var UploadStatus_FAILED_instance;
  function values_14() {
    return [UploadStatus_PENDING_getInstance(), UploadStatus_UPLOADING_getInstance(), UploadStatus_COMPLETED_getInstance(), UploadStatus_FAILED_getInstance()];
  }
  function valueOf_14(value) {
    switch (value) {
      case 'PENDING':
        return UploadStatus_PENDING_getInstance();
      case 'UPLOADING':
        return UploadStatus_UPLOADING_getInstance();
      case 'COMPLETED':
        return UploadStatus_COMPLETED_getInstance();
      case 'FAILED':
        return UploadStatus_FAILED_getInstance();
      default:
        UploadStatus_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  function get_entries_14() {
    if ($ENTRIES_14 == null)
      $ENTRIES_14 = enumEntries(values_14());
    return $ENTRIES_14;
  }
  var UploadStatus_entriesInitialized;
  function UploadStatus_initEntries() {
    if (UploadStatus_entriesInitialized)
      return Unit_getInstance();
    UploadStatus_entriesInitialized = true;
    UploadStatus_PENDING_instance = new UploadStatus('PENDING', 0);
    UploadStatus_UPLOADING_instance = new UploadStatus('UPLOADING', 1);
    UploadStatus_COMPLETED_instance = new UploadStatus('COMPLETED', 2);
    UploadStatus_FAILED_instance = new UploadStatus('FAILED', 3);
  }
  var $ENTRIES_14;
  function UploadStatus(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function FileType_IMAGE_getInstance() {
    FileType_initEntries();
    return FileType_IMAGE_instance;
  }
  function FileType_DOCUMENT_getInstance() {
    FileType_initEntries();
    return FileType_DOCUMENT_instance;
  }
  function FileType_SPREADSHEET_getInstance() {
    FileType_initEntries();
    return FileType_SPREADSHEET_instance;
  }
  function FileType_PDF_getInstance() {
    FileType_initEntries();
    return FileType_PDF_instance;
  }
  function FileType_VIDEO_getInstance() {
    FileType_initEntries();
    return FileType_VIDEO_instance;
  }
  function FileType_AUDIO_getInstance() {
    FileType_initEntries();
    return FileType_AUDIO_instance;
  }
  function FileType_ARCHIVE_getInstance() {
    FileType_initEntries();
    return FileType_ARCHIVE_instance;
  }
  function FileCategory_FARM_PHOTOS_getInstance() {
    FileCategory_initEntries();
    return FileCategory_FARM_PHOTOS_instance;
  }
  function FileCategory_CROP_IMAGES_getInstance() {
    FileCategory_initEntries();
    return FileCategory_CROP_IMAGES_instance;
  }
  function FileCategory_LIVESTOCK_PHOTOS_getInstance() {
    FileCategory_initEntries();
    return FileCategory_LIVESTOCK_PHOTOS_instance;
  }
  function FileCategory_EQUIPMENT_IMAGES_getInstance() {
    FileCategory_initEntries();
    return FileCategory_EQUIPMENT_IMAGES_instance;
  }
  function FileCategory_REPORTS_getInstance() {
    FileCategory_initEntries();
    return FileCategory_REPORTS_instance;
  }
  function FileCategory_INVOICES_getInstance() {
    FileCategory_initEntries();
    return FileCategory_INVOICES_instance;
  }
  function FileCategory_CONTRACTS_getInstance() {
    FileCategory_initEntries();
    return FileCategory_CONTRACTS_instance;
  }
  function FileCategory_MANUALS_getInstance() {
    FileCategory_initEntries();
    return FileCategory_MANUALS_instance;
  }
  function FileCategory_TRAINING_MATERIALS_getInstance() {
    FileCategory_initEntries();
    return FileCategory_TRAINING_MATERIALS_instance;
  }
  function UploadStatus_PENDING_getInstance() {
    UploadStatus_initEntries();
    return UploadStatus_PENDING_instance;
  }
  function UploadStatus_UPLOADING_getInstance() {
    UploadStatus_initEntries();
    return UploadStatus_UPLOADING_instance;
  }
  function UploadStatus_COMPLETED_getInstance() {
    UploadStatus_initEntries();
    return UploadStatus_COMPLETED_instance;
  }
  function UploadStatus_FAILED_getInstance() {
    UploadStatus_initEntries();
    return UploadStatus_FAILED_instance;
  }
  function _get_json__d8whur_0($this) {
    return $this.json_1;
  }
  function get_$stableprop_28() {
    return 0;
  }
  function HttpClient$json$lambda($this$Json) {
    $this$Json.set_ignoreUnknownKeys_pzvtne_k$(true);
    $this$Json.set_isLenient_kuajk5_k$(true);
    return Unit_getInstance();
  }
  function $getCOROUTINE$37(_this__u8e3s4, endpoint, headers, timeoutMs, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.endpoint_1 = endpoint;
    this.headers_1 = headers;
    this.timeoutMs_1 = timeoutMs;
  }
  protoOf($getCOROUTINE$37).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(3);
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(100, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            println('\uD83C\uDF10 HTTP GET: ' + ApiConfig_getInstance().get_baseUrl_48hdl7_k$() + this.endpoint_1);
            println('\uD83D\uDCCB Headers: ' + this.headers_1);
            this.TRY_RESULT0__1 = new HttpResponse(200, '{}', mapOf_0(to('Content-Type', 'application/json')), true);
            this.set_exceptionState_fex74n_k$(3);
            this.set_state_rjd8d0_k$(4);
            continue $sm;
          case 2:
            this.set_exceptionState_fex74n_k$(3);
            var tmp_0 = this.get_exception_x0n6w6_k$();
            if (tmp_0 instanceof Exception) {
              var e = this.get_exception_x0n6w6_k$();
              var tmp_1 = this;
              println('\u274C HTTP GET Error: ' + e.message);
              tmp_1.TRY_RESULT0__1 = new HttpResponse(500, '{"error": "' + e.message + '"}', emptyMap(), false);
              this.set_state_rjd8d0_k$(4);
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 3:
            throw this.get_exception_x0n6w6_k$();
          case 4:
            this.set_exceptionState_fex74n_k$(3);
            return this.TRY_RESULT0__1;
        }
      } catch ($p) {
        var e_0 = $p;
        if (this.get_exceptionState_wflpxn_k$() === 3) {
          throw e_0;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e_0);
        }
      }
     while (true);
  };
  function $postCOROUTINE$38(_this__u8e3s4, endpoint, body, headers, timeoutMs, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.endpoint_1 = endpoint;
    this.body_1 = body;
    this.headers_1 = headers;
    this.timeoutMs_1 = timeoutMs;
  }
  protoOf($postCOROUTINE$38).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(3);
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(150, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            println('\uD83C\uDF10 HTTP POST: ' + ApiConfig_getInstance().get_baseUrl_48hdl7_k$() + this.endpoint_1);
            println('\uD83D\uDCCB Headers: ' + this.headers_1);
            println('\uD83D\uDCE6 Body: ' + this.body_1);
            this.TRY_RESULT0__1 = new HttpResponse(201, this.body_1, mapOf_0(to('Content-Type', 'application/json')), true);
            this.set_exceptionState_fex74n_k$(3);
            this.set_state_rjd8d0_k$(4);
            continue $sm;
          case 2:
            this.set_exceptionState_fex74n_k$(3);
            var tmp_0 = this.get_exception_x0n6w6_k$();
            if (tmp_0 instanceof Exception) {
              var e = this.get_exception_x0n6w6_k$();
              var tmp_1 = this;
              println('\u274C HTTP POST Error: ' + e.message);
              tmp_1.TRY_RESULT0__1 = new HttpResponse(500, '{"error": "' + e.message + '"}', emptyMap(), false);
              this.set_state_rjd8d0_k$(4);
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 3:
            throw this.get_exception_x0n6w6_k$();
          case 4:
            this.set_exceptionState_fex74n_k$(3);
            return this.TRY_RESULT0__1;
        }
      } catch ($p) {
        var e_0 = $p;
        if (this.get_exceptionState_wflpxn_k$() === 3) {
          throw e_0;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e_0);
        }
      }
     while (true);
  };
  function $putCOROUTINE$39(_this__u8e3s4, endpoint, body, headers, timeoutMs, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.endpoint_1 = endpoint;
    this.body_1 = body;
    this.headers_1 = headers;
    this.timeoutMs_1 = timeoutMs;
  }
  protoOf($putCOROUTINE$39).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(3);
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(120, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            println('\uD83C\uDF10 HTTP PUT: ' + ApiConfig_getInstance().get_baseUrl_48hdl7_k$() + this.endpoint_1);
            println('\uD83D\uDCCB Headers: ' + this.headers_1);
            println('\uD83D\uDCE6 Body: ' + this.body_1);
            this.TRY_RESULT0__1 = new HttpResponse(200, this.body_1, mapOf_0(to('Content-Type', 'application/json')), true);
            this.set_exceptionState_fex74n_k$(3);
            this.set_state_rjd8d0_k$(4);
            continue $sm;
          case 2:
            this.set_exceptionState_fex74n_k$(3);
            var tmp_0 = this.get_exception_x0n6w6_k$();
            if (tmp_0 instanceof Exception) {
              var e = this.get_exception_x0n6w6_k$();
              var tmp_1 = this;
              println('\u274C HTTP PUT Error: ' + e.message);
              tmp_1.TRY_RESULT0__1 = new HttpResponse(500, '{"error": "' + e.message + '"}', emptyMap(), false);
              this.set_state_rjd8d0_k$(4);
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 3:
            throw this.get_exception_x0n6w6_k$();
          case 4:
            this.set_exceptionState_fex74n_k$(3);
            return this.TRY_RESULT0__1;
        }
      } catch ($p) {
        var e_0 = $p;
        if (this.get_exceptionState_wflpxn_k$() === 3) {
          throw e_0;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e_0);
        }
      }
     while (true);
  };
  function $deleteCOROUTINE$40(_this__u8e3s4, endpoint, headers, timeoutMs, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.endpoint_1 = endpoint;
    this.headers_1 = headers;
    this.timeoutMs_1 = timeoutMs;
  }
  protoOf($deleteCOROUTINE$40).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(3);
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(80, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            println('\uD83C\uDF10 HTTP DELETE: ' + ApiConfig_getInstance().get_baseUrl_48hdl7_k$() + this.endpoint_1);
            println('\uD83D\uDCCB Headers: ' + this.headers_1);
            this.TRY_RESULT0__1 = new HttpResponse(204, '', emptyMap(), true);
            this.set_exceptionState_fex74n_k$(3);
            this.set_state_rjd8d0_k$(4);
            continue $sm;
          case 2:
            this.set_exceptionState_fex74n_k$(3);
            var tmp_0 = this.get_exception_x0n6w6_k$();
            if (tmp_0 instanceof Exception) {
              var e = this.get_exception_x0n6w6_k$();
              var tmp_1 = this;
              println('\u274C HTTP DELETE Error: ' + e.message);
              tmp_1.TRY_RESULT0__1 = new HttpResponse(500, '{"error": "' + e.message + '"}', emptyMap(), false);
              this.set_state_rjd8d0_k$(4);
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 3:
            throw this.get_exception_x0n6w6_k$();
          case 4:
            this.set_exceptionState_fex74n_k$(3);
            return this.TRY_RESULT0__1;
        }
      } catch ($p) {
        var e_0 = $p;
        if (this.get_exceptionState_wflpxn_k$() === 3) {
          throw e_0;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e_0);
        }
      }
     while (true);
  };
  function $testConnectionCOROUTINE$41(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
  }
  protoOf($testConnectionCOROUTINE$41).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(3);
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this._this__u8e3s4__1.get$default_gsxe9v_k$(Endpoints_getInstance().get_HEALTH_1fy6jf_k$(), VOID, VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var response = suspendResult;
            this.TRY_RESULT0__1 = response.isSuccess_1 ? response.statusCode_1 === 200 : false;
            this.set_exceptionState_fex74n_k$(3);
            this.set_state_rjd8d0_k$(4);
            continue $sm;
          case 2:
            this.set_exceptionState_fex74n_k$(3);
            var tmp_0 = this.get_exception_x0n6w6_k$();
            if (tmp_0 instanceof Exception) {
              var e = this.get_exception_x0n6w6_k$();
              var tmp_1 = this;
              println('\u274C Connection test failed: ' + e.message);
              tmp_1.TRY_RESULT0__1 = false;
              this.set_state_rjd8d0_k$(4);
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 3:
            throw this.get_exception_x0n6w6_k$();
          case 4:
            this.set_exceptionState_fex74n_k$(3);
            return this.TRY_RESULT0__1;
        }
      } catch ($p) {
        var e_0 = $p;
        if (this.get_exceptionState_wflpxn_k$() === 3) {
          throw e_0;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e_0);
        }
      }
     while (true);
  };
  function HttpClient() {
    var tmp = this;
    tmp.json_1 = Json(VOID, HttpClient$json$lambda);
    this.$stable_1 = 0;
  }
  protoOf(HttpClient).get_x1ljry_k$ = function (endpoint, headers, timeoutMs, $completion) {
    var tmp = new $getCOROUTINE$37(this, endpoint, headers, timeoutMs, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(HttpClient).get$default_gsxe9v_k$ = function (endpoint, headers, timeoutMs, $completion, $super) {
    headers = headers === VOID ? emptyMap() : headers;
    var tmp;
    if (timeoutMs === VOID) {
      tmp = Settings_getInstance().get_TIMEOUT_SECONDS_aiy35k_k$().times_nfzjiw_k$(toLong(1000));
    } else {
      tmp = timeoutMs;
    }
    timeoutMs = tmp;
    return $super === VOID ? this.get_x1ljry_k$(endpoint, headers, timeoutMs, $completion) : $super.get_x1ljry_k$.call(this, endpoint, headers, timeoutMs, $completion);
  };
  protoOf(HttpClient).post_tx7v4q_k$ = function (endpoint, body, headers, timeoutMs, $completion) {
    var tmp = new $postCOROUTINE$38(this, endpoint, body, headers, timeoutMs, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(HttpClient).post$default_rkxwo7_k$ = function (endpoint, body, headers, timeoutMs, $completion, $super) {
    headers = headers === VOID ? emptyMap() : headers;
    var tmp;
    if (timeoutMs === VOID) {
      tmp = Settings_getInstance().get_TIMEOUT_SECONDS_aiy35k_k$().times_nfzjiw_k$(toLong(1000));
    } else {
      tmp = timeoutMs;
    }
    timeoutMs = tmp;
    return $super === VOID ? this.post_tx7v4q_k$(endpoint, body, headers, timeoutMs, $completion) : $super.post_tx7v4q_k$.call(this, endpoint, body, headers, timeoutMs, $completion);
  };
  protoOf(HttpClient).put_kb2rwp_k$ = function (endpoint, body, headers, timeoutMs, $completion) {
    var tmp = new $putCOROUTINE$39(this, endpoint, body, headers, timeoutMs, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(HttpClient).put$default_twqvjc_k$ = function (endpoint, body, headers, timeoutMs, $completion, $super) {
    headers = headers === VOID ? emptyMap() : headers;
    var tmp;
    if (timeoutMs === VOID) {
      tmp = Settings_getInstance().get_TIMEOUT_SECONDS_aiy35k_k$().times_nfzjiw_k$(toLong(1000));
    } else {
      tmp = timeoutMs;
    }
    timeoutMs = tmp;
    return $super === VOID ? this.put_kb2rwp_k$(endpoint, body, headers, timeoutMs, $completion) : $super.put_kb2rwp_k$.call(this, endpoint, body, headers, timeoutMs, $completion);
  };
  protoOf(HttpClient).delete_d51fiv_k$ = function (endpoint, headers, timeoutMs, $completion) {
    var tmp = new $deleteCOROUTINE$40(this, endpoint, headers, timeoutMs, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(HttpClient).delete$default_b09ioi_k$ = function (endpoint, headers, timeoutMs, $completion, $super) {
    headers = headers === VOID ? emptyMap() : headers;
    var tmp;
    if (timeoutMs === VOID) {
      tmp = Settings_getInstance().get_TIMEOUT_SECONDS_aiy35k_k$().times_nfzjiw_k$(toLong(1000));
    } else {
      tmp = timeoutMs;
    }
    timeoutMs = tmp;
    return $super === VOID ? this.delete_d51fiv_k$(endpoint, headers, timeoutMs, $completion) : $super.delete_d51fiv_k$.call(this, endpoint, headers, timeoutMs, $completion);
  };
  protoOf(HttpClient).createDefaultHeaders_8o1v6i_k$ = function (authToken) {
    var headers = mutableMapOf([to('Content-Type', Settings_getInstance().get_CONTENT_TYPE_dx1lxz_k$()), to('Accept', Settings_getInstance().get_ACCEPT_4sbzsf_k$()), to('User-Agent', Settings_getInstance().get_USER_AGENT_ypt5h6_k$())]);
    if (authToken == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      var key = 'Authorization';
      var value = 'Bearer ' + authToken;
      headers.put_4fpzoq_k$(key, value);
    }
    return headers;
  };
  protoOf(HttpClient).createDefaultHeaders$default_f60ux4_k$ = function (authToken, $super) {
    authToken = authToken === VOID ? null : authToken;
    return $super === VOID ? this.createDefaultHeaders_8o1v6i_k$(authToken) : $super.createDefaultHeaders_8o1v6i_k$.call(this, authToken);
  };
  protoOf(HttpClient).testConnection_1xwmsw_k$ = function ($completion) {
    var tmp = new $testConnectionCOROUTINE$41(this, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  function get_$stableprop_29() {
    return 8;
  }
  function HttpResponse(statusCode, body, headers, isSuccess) {
    this.statusCode_1 = statusCode;
    this.body_1 = body;
    this.headers_1 = headers;
    this.isSuccess_1 = isSuccess;
    this.$stable_1 = 8;
  }
  protoOf(HttpResponse).get_statusCode_g2w4u0_k$ = function () {
    return this.statusCode_1;
  };
  protoOf(HttpResponse).get_body_wojkyz_k$ = function () {
    return this.body_1;
  };
  protoOf(HttpResponse).get_headers_ef25jx_k$ = function () {
    return this.headers_1;
  };
  protoOf(HttpResponse).get_isSuccess_vybsc0_k$ = function () {
    return this.isSuccess_1;
  };
  protoOf(HttpResponse).isSuccessful_nrxmjo_k$ = function () {
    var tmp;
    if (this.isSuccess_1) {
      var containsArg = this.statusCode_1;
      tmp = 200 <= containsArg ? containsArg <= 299 : false;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(HttpResponse).isClientError_ql8cjx_k$ = function () {
    var containsArg = this.statusCode_1;
    return 400 <= containsArg ? containsArg <= 499 : false;
  };
  protoOf(HttpResponse).isServerError_yrncaj_k$ = function () {
    var containsArg = this.statusCode_1;
    return 500 <= containsArg ? containsArg <= 599 : false;
  };
  protoOf(HttpResponse).component1_7eebsc_k$ = function () {
    return this.statusCode_1;
  };
  protoOf(HttpResponse).component2_7eebsb_k$ = function () {
    return this.body_1;
  };
  protoOf(HttpResponse).component3_7eebsa_k$ = function () {
    return this.headers_1;
  };
  protoOf(HttpResponse).component4_7eebs9_k$ = function () {
    return this.isSuccess_1;
  };
  protoOf(HttpResponse).copy_84vw5s_k$ = function (statusCode, body, headers, isSuccess) {
    return new HttpResponse(statusCode, body, headers, isSuccess);
  };
  protoOf(HttpResponse).copy$default_57y651_k$ = function (statusCode, body, headers, isSuccess, $super) {
    statusCode = statusCode === VOID ? this.statusCode_1 : statusCode;
    body = body === VOID ? this.body_1 : body;
    headers = headers === VOID ? this.headers_1 : headers;
    isSuccess = isSuccess === VOID ? this.isSuccess_1 : isSuccess;
    return $super === VOID ? this.copy_84vw5s_k$(statusCode, body, headers, isSuccess) : $super.copy_84vw5s_k$.call(this, statusCode, body, headers, isSuccess);
  };
  protoOf(HttpResponse).toString = function () {
    return 'HttpResponse(statusCode=' + this.statusCode_1 + ', body=' + this.body_1 + ', headers=' + this.headers_1 + ', isSuccess=' + this.isSuccess_1 + ')';
  };
  protoOf(HttpResponse).hashCode = function () {
    var result = this.statusCode_1;
    result = imul(result, 31) + getStringHashCode(this.body_1) | 0;
    result = imul(result, 31) + hashCode(this.headers_1) | 0;
    result = imul(result, 31) + getBooleanHashCode(this.isSuccess_1) | 0;
    return result;
  };
  protoOf(HttpResponse).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof HttpResponse))
      return false;
    var tmp0_other_with_cast = other instanceof HttpResponse ? other : THROW_CCE();
    if (!(this.statusCode_1 === tmp0_other_with_cast.statusCode_1))
      return false;
    if (!(this.body_1 === tmp0_other_with_cast.body_1))
      return false;
    if (!equals(this.headers_1, tmp0_other_with_cast.headers_1))
      return false;
    if (!(this.isSuccess_1 === tmp0_other_with_cast.isSuccess_1))
      return false;
    return true;
  };
  function _get_baseUrl__6ouw37($this) {
    return $this.baseUrl_1;
  }
  function _set_authToken__hjobws($this, _set____db54di) {
    $this.authToken_1 = _set____db54di;
  }
  function _get_authToken__br64hs($this) {
    return $this.authToken_1;
  }
  function _get_json__d8whur_1($this) {
    return $this.json_1;
  }
  function _get_httpClient__2ty1zc($this) {
    return $this.httpClient_1;
  }
  function get_$stableprop_30() {
    return 8;
  }
  function RealApiService$json$lambda($this$Json) {
    $this$Json.set_ignoreUnknownKeys_pzvtne_k$(true);
    $this$Json.set_isLenient_kuajk5_k$(true);
    return Unit_getInstance();
  }
  function $getFarmsCOROUTINE$42(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
  }
  protoOf($getFarmsCOROUTINE$42).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(7);
            this.set_exceptionState_fex74n_k$(4);
            this.headers1__1 = this._this__u8e3s4__1.httpClient_1.createDefaultHeaders_8o1v6i_k$(this._this__u8e3s4__1.authToken_1);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this._this__u8e3s4__1.httpClient_1.get$default_gsxe9v_k$(Endpoints_getInstance().get_FARMS_i92a44_k$(), this.headers1__1, VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.response2__1 = suspendResult;
            if (this.response2__1.isSuccessful_nrxmjo_k$()) {
              var tmp_0 = this;
              var this_0 = this._this__u8e3s4__1.json_1;
              var string = this.response2__1.get_body_wojkyz_k$();
              var this_1 = this_0.get_serializersModule_piitvg_k$();
              var this_2 = serializer(this_1, createKType(getKClass(List), arrayOf([createInvariantKTypeProjection(createKType(getKClass(Farm), arrayOf([]), false))]), false));
              tmp_0.WHEN_RESULT3__1 = this_0.decodeFromString_jwu9sq_k$(isInterface(this_2, KSerializer) ? this_2 : THROW_CCE(), string);
              this.set_state_rjd8d0_k$(3);
              continue $sm;
            } else {
              println('\u274C API Error: ' + this.response2__1.get_statusCode_g2w4u0_k$() + ' - ' + this.response2__1.get_body_wojkyz_k$());
              this.set_state_rjd8d0_k$(2);
              suspendResult = protoOf(DataService).getFarms_ajwhrm_k$.call(this._this__u8e3s4__1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            }

          case 2:
            this.WHEN_RESULT3__1 = suspendResult;
            this.set_state_rjd8d0_k$(3);
            continue $sm;
          case 3:
            this.TRY_RESULT0__1 = this.WHEN_RESULT3__1;
            this.set_exceptionState_fex74n_k$(7);
            this.set_state_rjd8d0_k$(6);
            continue $sm;
          case 4:
            this.set_exceptionState_fex74n_k$(7);
            var tmp_1 = this.get_exception_x0n6w6_k$();
            if (tmp_1 instanceof Exception) {
              this.e4__1 = this.get_exception_x0n6w6_k$();
              println('\u274C API Error: ' + this.e4__1.message);
              this.set_state_rjd8d0_k$(5);
              suspendResult = protoOf(DataService).getFarms_ajwhrm_k$.call(this._this__u8e3s4__1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 5:
            this.TRY_RESULT0__1 = suspendResult;
            this.set_state_rjd8d0_k$(6);
            continue $sm;
          case 6:
            this.set_exceptionState_fex74n_k$(7);
            return this.TRY_RESULT0__1;
          case 7:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 7) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function $getFarmCOROUTINE$43(_this__u8e3s4, id, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.id_1 = id;
  }
  protoOf($getFarmCOROUTINE$43).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(7);
            this.set_exceptionState_fex74n_k$(4);
            this.headers1__1 = this._this__u8e3s4__1.httpClient_1.createDefaultHeaders_8o1v6i_k$(this._this__u8e3s4__1.authToken_1);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this._this__u8e3s4__1.httpClient_1.get$default_gsxe9v_k$(Endpoints_getInstance().get_FARMS_i92a44_k$() + '/' + this.id_1, this.headers1__1, VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.response2__1 = suspendResult;
            if (this.response2__1.isSuccessful_nrxmjo_k$()) {
              var tmp_0 = this;
              var this_0 = this._this__u8e3s4__1.json_1;
              var string = this.response2__1.get_body_wojkyz_k$();
              var this_1 = this_0.get_serializersModule_piitvg_k$();
              var this_2 = serializer(this_1, createKType(getKClass(Farm), arrayOf([]), false));
              tmp_0.WHEN_RESULT3__1 = this_0.decodeFromString_jwu9sq_k$(isInterface(this_2, KSerializer) ? this_2 : THROW_CCE(), string);
              this.set_state_rjd8d0_k$(3);
              continue $sm;
            } else {
              println('\u274C API Error: ' + this.response2__1.get_statusCode_g2w4u0_k$() + ' - ' + this.response2__1.get_body_wojkyz_k$());
              this.set_state_rjd8d0_k$(2);
              suspendResult = protoOf(DataService).getFarm_wm4cla_k$.call(this._this__u8e3s4__1, this.id_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            }

          case 2:
            this.WHEN_RESULT3__1 = suspendResult;
            this.set_state_rjd8d0_k$(3);
            continue $sm;
          case 3:
            this.TRY_RESULT0__1 = this.WHEN_RESULT3__1;
            this.set_exceptionState_fex74n_k$(7);
            this.set_state_rjd8d0_k$(6);
            continue $sm;
          case 4:
            this.set_exceptionState_fex74n_k$(7);
            var tmp_1 = this.get_exception_x0n6w6_k$();
            if (tmp_1 instanceof Exception) {
              this.e4__1 = this.get_exception_x0n6w6_k$();
              println('\u274C API Error: ' + this.e4__1.message);
              this.set_state_rjd8d0_k$(5);
              suspendResult = protoOf(DataService).getFarm_wm4cla_k$.call(this._this__u8e3s4__1, this.id_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 5:
            this.TRY_RESULT0__1 = suspendResult;
            this.set_state_rjd8d0_k$(6);
            continue $sm;
          case 6:
            this.set_exceptionState_fex74n_k$(7);
            return this.TRY_RESULT0__1;
          case 7:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 7) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function $createFarmCOROUTINE$44(_this__u8e3s4, farm, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.farm_1 = farm;
  }
  protoOf($createFarmCOROUTINE$44).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(7);
            this.set_exceptionState_fex74n_k$(4);
            this.headers1__1 = this._this__u8e3s4__1.httpClient_1.createDefaultHeaders_8o1v6i_k$(this._this__u8e3s4__1.authToken_1);
            var tmp_0 = this;
            var this_0 = this._this__u8e3s4__1.json_1;
            var value = this.farm_1;
            var this_1 = this_0.get_serializersModule_piitvg_k$();
            var this_2 = serializer(this_1, createKType(getKClass(Farm), arrayOf([]), false));
            tmp_0.farmJson2__1 = this_0.encodeToString_k0apqx_k$(isInterface(this_2, KSerializer) ? this_2 : THROW_CCE(), value);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this._this__u8e3s4__1.httpClient_1.post$default_rkxwo7_k$(Endpoints_getInstance().get_FARMS_i92a44_k$(), this.farmJson2__1, this.headers1__1, VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.response3__1 = suspendResult;
            if (this.response3__1.isSuccessful_nrxmjo_k$()) {
              var tmp_1 = this;
              var this_3 = this._this__u8e3s4__1.json_1;
              var string = this.response3__1.get_body_wojkyz_k$();
              var this_4 = this_3.get_serializersModule_piitvg_k$();
              var this_5 = serializer(this_4, createKType(getKClass(Farm), arrayOf([]), false));
              tmp_1.WHEN_RESULT4__1 = this_3.decodeFromString_jwu9sq_k$(isInterface(this_5, KSerializer) ? this_5 : THROW_CCE(), string);
              this.set_state_rjd8d0_k$(3);
              continue $sm;
            } else {
              println('\u274C API Error: ' + this.response3__1.get_statusCode_g2w4u0_k$() + ' - ' + this.response3__1.get_body_wojkyz_k$());
              this.set_state_rjd8d0_k$(2);
              suspendResult = protoOf(DataService).createFarm_obu03f_k$.call(this._this__u8e3s4__1, this.farm_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            }

          case 2:
            this.WHEN_RESULT4__1 = suspendResult;
            this.set_state_rjd8d0_k$(3);
            continue $sm;
          case 3:
            this.TRY_RESULT0__1 = this.WHEN_RESULT4__1;
            this.set_exceptionState_fex74n_k$(7);
            this.set_state_rjd8d0_k$(6);
            continue $sm;
          case 4:
            this.set_exceptionState_fex74n_k$(7);
            var tmp_2 = this.get_exception_x0n6w6_k$();
            if (tmp_2 instanceof Exception) {
              this.e5__1 = this.get_exception_x0n6w6_k$();
              println('\u274C API Error: ' + this.e5__1.message);
              this.set_state_rjd8d0_k$(5);
              suspendResult = protoOf(DataService).createFarm_obu03f_k$.call(this._this__u8e3s4__1, this.farm_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 5:
            this.TRY_RESULT0__1 = suspendResult;
            this.set_state_rjd8d0_k$(6);
            continue $sm;
          case 6:
            this.set_exceptionState_fex74n_k$(7);
            return this.TRY_RESULT0__1;
          case 7:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 7) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function $updateFarmCOROUTINE$45(_this__u8e3s4, farm, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.farm_1 = farm;
  }
  protoOf($updateFarmCOROUTINE$45).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(7);
            this.set_exceptionState_fex74n_k$(4);
            this.headers1__1 = this._this__u8e3s4__1.httpClient_1.createDefaultHeaders_8o1v6i_k$(this._this__u8e3s4__1.authToken_1);
            var tmp_0 = this;
            var this_0 = this._this__u8e3s4__1.json_1;
            var value = this.farm_1;
            var this_1 = this_0.get_serializersModule_piitvg_k$();
            var this_2 = serializer(this_1, createKType(getKClass(Farm), arrayOf([]), false));
            tmp_0.farmJson2__1 = this_0.encodeToString_k0apqx_k$(isInterface(this_2, KSerializer) ? this_2 : THROW_CCE(), value);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this._this__u8e3s4__1.httpClient_1.put$default_twqvjc_k$(Endpoints_getInstance().get_FARMS_i92a44_k$() + '/' + this.farm_1.get_id_kntnx8_k$().toString(), this.farmJson2__1, this.headers1__1, VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.response3__1 = suspendResult;
            if (this.response3__1.isSuccessful_nrxmjo_k$()) {
              var tmp_1 = this;
              var this_3 = this._this__u8e3s4__1.json_1;
              var string = this.response3__1.get_body_wojkyz_k$();
              var this_4 = this_3.get_serializersModule_piitvg_k$();
              var this_5 = serializer(this_4, createKType(getKClass(Farm), arrayOf([]), false));
              tmp_1.WHEN_RESULT4__1 = this_3.decodeFromString_jwu9sq_k$(isInterface(this_5, KSerializer) ? this_5 : THROW_CCE(), string);
              this.set_state_rjd8d0_k$(3);
              continue $sm;
            } else {
              println('\u274C API Error: ' + this.response3__1.get_statusCode_g2w4u0_k$() + ' - ' + this.response3__1.get_body_wojkyz_k$());
              this.set_state_rjd8d0_k$(2);
              suspendResult = protoOf(DataService).updateFarm_by8k7c_k$.call(this._this__u8e3s4__1, this.farm_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            }

          case 2:
            this.WHEN_RESULT4__1 = suspendResult;
            this.set_state_rjd8d0_k$(3);
            continue $sm;
          case 3:
            this.TRY_RESULT0__1 = this.WHEN_RESULT4__1;
            this.set_exceptionState_fex74n_k$(7);
            this.set_state_rjd8d0_k$(6);
            continue $sm;
          case 4:
            this.set_exceptionState_fex74n_k$(7);
            var tmp_2 = this.get_exception_x0n6w6_k$();
            if (tmp_2 instanceof Exception) {
              this.e5__1 = this.get_exception_x0n6w6_k$();
              println('\u274C API Error: ' + this.e5__1.message);
              this.set_state_rjd8d0_k$(5);
              suspendResult = protoOf(DataService).updateFarm_by8k7c_k$.call(this._this__u8e3s4__1, this.farm_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 5:
            this.TRY_RESULT0__1 = suspendResult;
            this.set_state_rjd8d0_k$(6);
            continue $sm;
          case 6:
            this.set_exceptionState_fex74n_k$(7);
            return this.TRY_RESULT0__1;
          case 7:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 7) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function $deleteFarmCOROUTINE$46(_this__u8e3s4, id, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.id_1 = id;
  }
  protoOf($deleteFarmCOROUTINE$46).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(7);
            this.set_exceptionState_fex74n_k$(4);
            this.headers1__1 = this._this__u8e3s4__1.httpClient_1.createDefaultHeaders_8o1v6i_k$(this._this__u8e3s4__1.authToken_1);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this._this__u8e3s4__1.httpClient_1.delete$default_b09ioi_k$(Endpoints_getInstance().get_FARMS_i92a44_k$() + '/' + this.id_1, this.headers1__1, VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.response2__1 = suspendResult;
            if (this.response2__1.isSuccessful_nrxmjo_k$()) {
              var tmp_0 = this;
              tmp_0.WHEN_RESULT3__1 = true;
              this.set_state_rjd8d0_k$(3);
              continue $sm;
            } else {
              println('\u274C API Error: ' + this.response2__1.get_statusCode_g2w4u0_k$() + ' - ' + this.response2__1.get_body_wojkyz_k$());
              this.set_state_rjd8d0_k$(2);
              suspendResult = protoOf(DataService).deleteFarm_ckmdg9_k$.call(this._this__u8e3s4__1, this.id_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            }

          case 2:
            this.WHEN_RESULT3__1 = suspendResult;
            this.set_state_rjd8d0_k$(3);
            continue $sm;
          case 3:
            this.TRY_RESULT0__1 = this.WHEN_RESULT3__1;
            this.set_exceptionState_fex74n_k$(7);
            this.set_state_rjd8d0_k$(6);
            continue $sm;
          case 4:
            this.set_exceptionState_fex74n_k$(7);
            var tmp_1 = this.get_exception_x0n6w6_k$();
            if (tmp_1 instanceof Exception) {
              this.e4__1 = this.get_exception_x0n6w6_k$();
              println('\u274C API Error: ' + this.e4__1.message);
              this.set_state_rjd8d0_k$(5);
              suspendResult = protoOf(DataService).deleteFarm_ckmdg9_k$.call(this._this__u8e3s4__1, this.id_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 5:
            this.TRY_RESULT0__1 = suspendResult;
            this.set_state_rjd8d0_k$(6);
            continue $sm;
          case 6:
            this.set_exceptionState_fex74n_k$(7);
            return this.TRY_RESULT0__1;
          case 7:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 7) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function $getCropsCOROUTINE$47(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
  }
  protoOf($getCropsCOROUTINE$47).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(7);
            this.set_exceptionState_fex74n_k$(4);
            this.headers1__1 = this._this__u8e3s4__1.httpClient_1.createDefaultHeaders_8o1v6i_k$(this._this__u8e3s4__1.authToken_1);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this._this__u8e3s4__1.httpClient_1.get$default_gsxe9v_k$(Endpoints_getInstance().get_CROPS_i7poyi_k$(), this.headers1__1, VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.response2__1 = suspendResult;
            if (this.response2__1.isSuccessful_nrxmjo_k$()) {
              var tmp_0 = this;
              var this_0 = this._this__u8e3s4__1.json_1;
              var string = this.response2__1.get_body_wojkyz_k$();
              var this_1 = this_0.get_serializersModule_piitvg_k$();
              var this_2 = serializer(this_1, createKType(getKClass(List), arrayOf([createInvariantKTypeProjection(createKType(getKClass(Crop), arrayOf([]), false))]), false));
              tmp_0.WHEN_RESULT3__1 = this_0.decodeFromString_jwu9sq_k$(isInterface(this_2, KSerializer) ? this_2 : THROW_CCE(), string);
              this.set_state_rjd8d0_k$(3);
              continue $sm;
            } else {
              println('\u274C API Error: ' + this.response2__1.get_statusCode_g2w4u0_k$() + ' - ' + this.response2__1.get_body_wojkyz_k$());
              this.set_state_rjd8d0_k$(2);
              suspendResult = protoOf(DataService).getCrops_e2wbbi_k$.call(this._this__u8e3s4__1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            }

          case 2:
            this.WHEN_RESULT3__1 = suspendResult;
            this.set_state_rjd8d0_k$(3);
            continue $sm;
          case 3:
            this.TRY_RESULT0__1 = this.WHEN_RESULT3__1;
            this.set_exceptionState_fex74n_k$(7);
            this.set_state_rjd8d0_k$(6);
            continue $sm;
          case 4:
            this.set_exceptionState_fex74n_k$(7);
            var tmp_1 = this.get_exception_x0n6w6_k$();
            if (tmp_1 instanceof Exception) {
              this.e4__1 = this.get_exception_x0n6w6_k$();
              println('\u274C API Error: ' + this.e4__1.message);
              this.set_state_rjd8d0_k$(5);
              suspendResult = protoOf(DataService).getCrops_e2wbbi_k$.call(this._this__u8e3s4__1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 5:
            this.TRY_RESULT0__1 = suspendResult;
            this.set_state_rjd8d0_k$(6);
            continue $sm;
          case 6:
            this.set_exceptionState_fex74n_k$(7);
            return this.TRY_RESULT0__1;
          case 7:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 7) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function $getLivestockCOROUTINE$48(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
  }
  protoOf($getLivestockCOROUTINE$48).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(7);
            this.set_exceptionState_fex74n_k$(4);
            this.headers1__1 = this._this__u8e3s4__1.httpClient_1.createDefaultHeaders_8o1v6i_k$(this._this__u8e3s4__1.authToken_1);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this._this__u8e3s4__1.httpClient_1.get$default_gsxe9v_k$(Endpoints_getInstance().get_LIVESTOCK_k7ftt_k$(), this.headers1__1, VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.response2__1 = suspendResult;
            if (this.response2__1.isSuccessful_nrxmjo_k$()) {
              var tmp_0 = this;
              var this_0 = this._this__u8e3s4__1.json_1;
              var string = this.response2__1.get_body_wojkyz_k$();
              var this_1 = this_0.get_serializersModule_piitvg_k$();
              var this_2 = serializer(this_1, createKType(getKClass(List), arrayOf([createInvariantKTypeProjection(createKType(getKClass(Livestock_0), arrayOf([]), false))]), false));
              tmp_0.WHEN_RESULT3__1 = this_0.decodeFromString_jwu9sq_k$(isInterface(this_2, KSerializer) ? this_2 : THROW_CCE(), string);
              this.set_state_rjd8d0_k$(3);
              continue $sm;
            } else {
              println('\u274C API Error: ' + this.response2__1.get_statusCode_g2w4u0_k$() + ' - ' + this.response2__1.get_body_wojkyz_k$());
              this.set_state_rjd8d0_k$(2);
              suspendResult = protoOf(DataService).getLivestock_ixh03l_k$.call(this._this__u8e3s4__1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            }

          case 2:
            this.WHEN_RESULT3__1 = suspendResult;
            this.set_state_rjd8d0_k$(3);
            continue $sm;
          case 3:
            this.TRY_RESULT0__1 = this.WHEN_RESULT3__1;
            this.set_exceptionState_fex74n_k$(7);
            this.set_state_rjd8d0_k$(6);
            continue $sm;
          case 4:
            this.set_exceptionState_fex74n_k$(7);
            var tmp_1 = this.get_exception_x0n6w6_k$();
            if (tmp_1 instanceof Exception) {
              this.e4__1 = this.get_exception_x0n6w6_k$();
              println('\u274C API Error: ' + this.e4__1.message);
              this.set_state_rjd8d0_k$(5);
              suspendResult = protoOf(DataService).getLivestock_ixh03l_k$.call(this._this__u8e3s4__1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 5:
            this.TRY_RESULT0__1 = suspendResult;
            this.set_state_rjd8d0_k$(6);
            continue $sm;
          case 6:
            this.set_exceptionState_fex74n_k$(7);
            return this.TRY_RESULT0__1;
          case 7:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 7) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function $getTasksCOROUTINE$49(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
  }
  protoOf($getTasksCOROUTINE$49).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(7);
            this.set_exceptionState_fex74n_k$(4);
            this.headers1__1 = this._this__u8e3s4__1.httpClient_1.createDefaultHeaders_8o1v6i_k$(this._this__u8e3s4__1.authToken_1);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this._this__u8e3s4__1.httpClient_1.get$default_gsxe9v_k$(Endpoints_getInstance().get_TASKS_igrf45_k$(), this.headers1__1, VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.response2__1 = suspendResult;
            if (this.response2__1.isSuccessful_nrxmjo_k$()) {
              var tmp_0 = this;
              var this_0 = this._this__u8e3s4__1.json_1;
              var string = this.response2__1.get_body_wojkyz_k$();
              var this_1 = this_0.get_serializersModule_piitvg_k$();
              var this_2 = serializer(this_1, createKType(getKClass(List), arrayOf([createInvariantKTypeProjection(createKType(getKClass(Task), arrayOf([]), false))]), false));
              tmp_0.WHEN_RESULT3__1 = this_0.decodeFromString_jwu9sq_k$(isInterface(this_2, KSerializer) ? this_2 : THROW_CCE(), string);
              this.set_state_rjd8d0_k$(3);
              continue $sm;
            } else {
              println('\u274C API Error: ' + this.response2__1.get_statusCode_g2w4u0_k$() + ' - ' + this.response2__1.get_body_wojkyz_k$());
              this.set_state_rjd8d0_k$(2);
              suspendResult = protoOf(DataService).getTasks_b1qutu_k$.call(this._this__u8e3s4__1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            }

          case 2:
            this.WHEN_RESULT3__1 = suspendResult;
            this.set_state_rjd8d0_k$(3);
            continue $sm;
          case 3:
            this.TRY_RESULT0__1 = this.WHEN_RESULT3__1;
            this.set_exceptionState_fex74n_k$(7);
            this.set_state_rjd8d0_k$(6);
            continue $sm;
          case 4:
            this.set_exceptionState_fex74n_k$(7);
            var tmp_1 = this.get_exception_x0n6w6_k$();
            if (tmp_1 instanceof Exception) {
              this.e4__1 = this.get_exception_x0n6w6_k$();
              println('\u274C API Error: ' + this.e4__1.message);
              this.set_state_rjd8d0_k$(5);
              suspendResult = protoOf(DataService).getTasks_b1qutu_k$.call(this._this__u8e3s4__1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 5:
            this.TRY_RESULT0__1 = suspendResult;
            this.set_state_rjd8d0_k$(6);
            continue $sm;
          case 6:
            this.set_exceptionState_fex74n_k$(7);
            return this.TRY_RESULT0__1;
          case 7:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 7) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function $getUsersCOROUTINE$50(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
  }
  protoOf($getUsersCOROUTINE$50).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(7);
            this.set_exceptionState_fex74n_k$(4);
            this.headers1__1 = this._this__u8e3s4__1.httpClient_1.createDefaultHeaders_8o1v6i_k$(this._this__u8e3s4__1.authToken_1);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this._this__u8e3s4__1.httpClient_1.get$default_gsxe9v_k$(Endpoints_getInstance().get_USERS_ihmf9b_k$(), this.headers1__1, VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.response2__1 = suspendResult;
            if (this.response2__1.isSuccessful_nrxmjo_k$()) {
              var tmp_0 = this;
              var this_0 = this._this__u8e3s4__1.json_1;
              var string = this.response2__1.get_body_wojkyz_k$();
              var this_1 = this_0.get_serializersModule_piitvg_k$();
              var this_2 = serializer(this_1, createKType(getKClass(List), arrayOf([createInvariantKTypeProjection(createKType(getKClass(User), arrayOf([]), false))]), false));
              tmp_0.WHEN_RESULT3__1 = this_0.decodeFromString_jwu9sq_k$(isInterface(this_2, KSerializer) ? this_2 : THROW_CCE(), string);
              this.set_state_rjd8d0_k$(3);
              continue $sm;
            } else {
              println('\u274C API Error: ' + this.response2__1.get_statusCode_g2w4u0_k$() + ' - ' + this.response2__1.get_body_wojkyz_k$());
              this.set_state_rjd8d0_k$(2);
              suspendResult = protoOf(DataService).getUsers_88aucu_k$.call(this._this__u8e3s4__1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            }

          case 2:
            this.WHEN_RESULT3__1 = suspendResult;
            this.set_state_rjd8d0_k$(3);
            continue $sm;
          case 3:
            this.TRY_RESULT0__1 = this.WHEN_RESULT3__1;
            this.set_exceptionState_fex74n_k$(7);
            this.set_state_rjd8d0_k$(6);
            continue $sm;
          case 4:
            this.set_exceptionState_fex74n_k$(7);
            var tmp_1 = this.get_exception_x0n6w6_k$();
            if (tmp_1 instanceof Exception) {
              this.e4__1 = this.get_exception_x0n6w6_k$();
              println('\u274C API Error: ' + this.e4__1.message);
              this.set_state_rjd8d0_k$(5);
              suspendResult = protoOf(DataService).getUsers_88aucu_k$.call(this._this__u8e3s4__1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 5:
            this.TRY_RESULT0__1 = suspendResult;
            this.set_state_rjd8d0_k$(6);
            continue $sm;
          case 6:
            this.set_exceptionState_fex74n_k$(7);
            return this.TRY_RESULT0__1;
          case 7:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 7) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function $getInventoryCOROUTINE$51(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
  }
  protoOf($getInventoryCOROUTINE$51).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(7);
            this.set_exceptionState_fex74n_k$(4);
            this.headers1__1 = this._this__u8e3s4__1.httpClient_1.createDefaultHeaders_8o1v6i_k$(this._this__u8e3s4__1.authToken_1);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this._this__u8e3s4__1.httpClient_1.get$default_gsxe9v_k$(Endpoints_getInstance().get_INVENTORY_l6kqz7_k$(), this.headers1__1, VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.response2__1 = suspendResult;
            if (this.response2__1.isSuccessful_nrxmjo_k$()) {
              var tmp_0 = this;
              var this_0 = this._this__u8e3s4__1.json_1;
              var string = this.response2__1.get_body_wojkyz_k$();
              var this_1 = this_0.get_serializersModule_piitvg_k$();
              var this_2 = serializer(this_1, createKType(getKClass(List), arrayOf([createInvariantKTypeProjection(createKType(getKClass(InventoryItem), arrayOf([]), false))]), false));
              tmp_0.WHEN_RESULT3__1 = this_0.decodeFromString_jwu9sq_k$(isInterface(this_2, KSerializer) ? this_2 : THROW_CCE(), string);
              this.set_state_rjd8d0_k$(3);
              continue $sm;
            } else {
              println('\u274C API Error: ' + this.response2__1.get_statusCode_g2w4u0_k$() + ' - ' + this.response2__1.get_body_wojkyz_k$());
              this.set_state_rjd8d0_k$(2);
              suspendResult = protoOf(DataService).getInventory_bovg7m_k$.call(this._this__u8e3s4__1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            }

          case 2:
            this.WHEN_RESULT3__1 = suspendResult;
            this.set_state_rjd8d0_k$(3);
            continue $sm;
          case 3:
            this.TRY_RESULT0__1 = this.WHEN_RESULT3__1;
            this.set_exceptionState_fex74n_k$(7);
            this.set_state_rjd8d0_k$(6);
            continue $sm;
          case 4:
            this.set_exceptionState_fex74n_k$(7);
            var tmp_1 = this.get_exception_x0n6w6_k$();
            if (tmp_1 instanceof Exception) {
              this.e4__1 = this.get_exception_x0n6w6_k$();
              println('\u274C API Error: ' + this.e4__1.message);
              this.set_state_rjd8d0_k$(5);
              suspendResult = protoOf(DataService).getInventory_bovg7m_k$.call(this._this__u8e3s4__1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 5:
            this.TRY_RESULT0__1 = suspendResult;
            this.set_state_rjd8d0_k$(6);
            continue $sm;
          case 6:
            this.set_exceptionState_fex74n_k$(7);
            return this.TRY_RESULT0__1;
          case 7:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 7) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function $getFinancialRecordsCOROUTINE$52(_this__u8e3s4, farmId, type, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.farmId_1 = farmId;
    this.type_1 = type;
  }
  protoOf($getFinancialRecordsCOROUTINE$52).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(7);
            this.set_exceptionState_fex74n_k$(4);
            this.headers1__1 = this._this__u8e3s4__1.httpClient_1.createDefaultHeaders_8o1v6i_k$(this._this__u8e3s4__1.authToken_1);
            var tmp_0 = this;
            tmp_0.queryParams2__1 = ArrayList_init_$Create$();
            if (!(this.farmId_1 == null)) {
              this.queryParams2__1.add_utx5q5_k$('farmId=' + toString(this.farmId_1));
            }

            if (!(this.type_1 == null)) {
              this.queryParams2__1.add_utx5q5_k$('type=' + this.type_1.get_name_woqyms_k$());
            }

            var tmp_1 = this;
            var tmp_2;
            if (!this.queryParams2__1.isEmpty_y1axqb_k$()) {
              tmp_2 = '?' + joinToString(this.queryParams2__1, '&');
            } else {
              tmp_2 = '';
            }

            tmp_1.queryString3__1 = tmp_2;
            this.set_state_rjd8d0_k$(1);
            suspendResult = this._this__u8e3s4__1.httpClient_1.get$default_gsxe9v_k$(Endpoints_getInstance().get_FINANCIAL_ain70g_k$() + this.queryString3__1, this.headers1__1, VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.response4__1 = suspendResult;
            if (this.response4__1.isSuccessful_nrxmjo_k$()) {
              var tmp_3 = this;
              var this_0 = this._this__u8e3s4__1.json_1;
              var string = this.response4__1.get_body_wojkyz_k$();
              var this_1 = this_0.get_serializersModule_piitvg_k$();
              var this_2 = serializer(this_1, createKType(getKClass(List), arrayOf([createInvariantKTypeProjection(createKType(getKClass(FinancialRecord), arrayOf([]), false))]), false));
              tmp_3.WHEN_RESULT5__1 = this_0.decodeFromString_jwu9sq_k$(isInterface(this_2, KSerializer) ? this_2 : THROW_CCE(), string);
              this.set_state_rjd8d0_k$(3);
              continue $sm;
            } else {
              println('\u274C API Error: ' + this.response4__1.get_statusCode_g2w4u0_k$() + ' - ' + this.response4__1.get_body_wojkyz_k$());
              this.set_state_rjd8d0_k$(2);
              suspendResult = protoOf(DataService).getFinancialRecords_t8uiq_k$.call(this._this__u8e3s4__1, this.farmId_1, this.type_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            }

          case 2:
            this.WHEN_RESULT5__1 = suspendResult;
            this.set_state_rjd8d0_k$(3);
            continue $sm;
          case 3:
            this.TRY_RESULT0__1 = this.WHEN_RESULT5__1;
            this.set_exceptionState_fex74n_k$(7);
            this.set_state_rjd8d0_k$(6);
            continue $sm;
          case 4:
            this.set_exceptionState_fex74n_k$(7);
            var tmp_4 = this.get_exception_x0n6w6_k$();
            if (tmp_4 instanceof Exception) {
              this.e6__1 = this.get_exception_x0n6w6_k$();
              println('\u274C API Error: ' + this.e6__1.message);
              this.set_state_rjd8d0_k$(5);
              suspendResult = protoOf(DataService).getFinancialRecords_t8uiq_k$.call(this._this__u8e3s4__1, this.farmId_1, this.type_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 5:
            this.TRY_RESULT0__1 = suspendResult;
            this.set_state_rjd8d0_k$(6);
            continue $sm;
          case 6:
            this.set_exceptionState_fex74n_k$(7);
            return this.TRY_RESULT0__1;
          case 7:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 7) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function $getFarmStatsCOROUTINE$53(_this__u8e3s4, farmId, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.farmId_1 = farmId;
  }
  protoOf($getFarmStatsCOROUTINE$53).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(7);
            this.set_exceptionState_fex74n_k$(4);
            this.headers1__1 = this._this__u8e3s4__1.httpClient_1.createDefaultHeaders_8o1v6i_k$(this._this__u8e3s4__1.authToken_1);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this._this__u8e3s4__1.httpClient_1.get$default_gsxe9v_k$(Endpoints_getInstance().get_FARMS_i92a44_k$() + '/' + this.farmId_1.toString() + '/stats', this.headers1__1, VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.response2__1 = suspendResult;
            if (this.response2__1.isSuccessful_nrxmjo_k$()) {
              var tmp_0 = this;
              var this_0 = this._this__u8e3s4__1.json_1;
              var string = this.response2__1.get_body_wojkyz_k$();
              var this_1 = this_0.get_serializersModule_piitvg_k$();
              var this_2 = serializer(this_1, createKType(getKClass(Map), arrayOf([createInvariantKTypeProjection(createKType(PrimitiveClasses_getInstance().get_stringClass_bik2gy_k$(), arrayOf([]), false)), createInvariantKTypeProjection(createKType(PrimitiveClasses_getInstance().get_anyClass_x0jl4l_k$(), arrayOf([]), false))]), false));
              tmp_0.WHEN_RESULT3__1 = this_0.decodeFromString_jwu9sq_k$(isInterface(this_2, KSerializer) ? this_2 : THROW_CCE(), string);
              this.set_state_rjd8d0_k$(3);
              continue $sm;
            } else {
              println('\u274C API Error: ' + this.response2__1.get_statusCode_g2w4u0_k$() + ' - ' + this.response2__1.get_body_wojkyz_k$());
              this.set_state_rjd8d0_k$(2);
              suspendResult = protoOf(DataService).getFarmStats_ow7adz_k$.call(this._this__u8e3s4__1, this.farmId_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            }

          case 2:
            this.WHEN_RESULT3__1 = suspendResult;
            this.set_state_rjd8d0_k$(3);
            continue $sm;
          case 3:
            this.TRY_RESULT0__1 = this.WHEN_RESULT3__1;
            this.set_exceptionState_fex74n_k$(7);
            this.set_state_rjd8d0_k$(6);
            continue $sm;
          case 4:
            this.set_exceptionState_fex74n_k$(7);
            var tmp_1 = this.get_exception_x0n6w6_k$();
            if (tmp_1 instanceof Exception) {
              this.e4__1 = this.get_exception_x0n6w6_k$();
              println('\u274C API Error: ' + this.e4__1.message);
              this.set_state_rjd8d0_k$(5);
              suspendResult = protoOf(DataService).getFarmStats_ow7adz_k$.call(this._this__u8e3s4__1, this.farmId_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 5:
            this.TRY_RESULT0__1 = suspendResult;
            this.set_state_rjd8d0_k$(6);
            continue $sm;
          case 6:
            this.set_exceptionState_fex74n_k$(7);
            return this.TRY_RESULT0__1;
          case 7:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 7) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function RealApiService(baseUrl, authToken) {
    baseUrl = baseUrl === VOID ? ApiConfig_getInstance().get_baseUrl_48hdl7_k$() : baseUrl;
    authToken = authToken === VOID ? null : authToken;
    DataService.call(this);
    this.baseUrl_1 = baseUrl;
    this.authToken_1 = authToken;
    var tmp = this;
    tmp.json_1 = Json(VOID, RealApiService$json$lambda);
    this.httpClient_1 = new HttpClient();
    this.$stable_2 = 8;
  }
  protoOf(RealApiService).getFarms_ajwhrm_k$ = function ($completion) {
    var tmp = new $getFarmsCOROUTINE$42(this, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(RealApiService).getFarm_wm4cla_k$ = function (id, $completion) {
    var tmp = new $getFarmCOROUTINE$43(this, id, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(RealApiService).createFarm_obu03f_k$ = function (farm, $completion) {
    var tmp = new $createFarmCOROUTINE$44(this, farm, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(RealApiService).updateFarm_by8k7c_k$ = function (farm, $completion) {
    var tmp = new $updateFarmCOROUTINE$45(this, farm, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(RealApiService).deleteFarm_ckmdg9_k$ = function (id, $completion) {
    var tmp = new $deleteFarmCOROUTINE$46(this, id, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(RealApiService).getCrops_e2wbbi_k$ = function ($completion) {
    var tmp = new $getCropsCOROUTINE$47(this, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(RealApiService).getLivestock_ixh03l_k$ = function ($completion) {
    var tmp = new $getLivestockCOROUTINE$48(this, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(RealApiService).getTasks_b1qutu_k$ = function ($completion) {
    var tmp = new $getTasksCOROUTINE$49(this, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(RealApiService).getUsers_88aucu_k$ = function ($completion) {
    var tmp = new $getUsersCOROUTINE$50(this, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(RealApiService).getInventory_bovg7m_k$ = function ($completion) {
    var tmp = new $getInventoryCOROUTINE$51(this, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(RealApiService).getFinancialRecords_t8uiq_k$ = function (farmId, type, $completion) {
    var tmp = new $getFinancialRecordsCOROUTINE$52(this, farmId, type, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(RealApiService).getFarmStats_ow7adz_k$ = function (farmId, $completion) {
    var tmp = new $getFarmStatsCOROUTINE$53(this, farmId, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(RealApiService).setAuthToken_q9xlqz_k$ = function (token) {
    this.authToken_1 = token;
    println('\uD83D\uDD11 Auth token set for API calls');
  };
  protoOf(RealApiService).clearAuthToken_tl9f8s_k$ = function () {
    this.authToken_1 = null;
    println('\uD83D\uDD11 Auth token cleared');
  };
  protoOf(RealApiService).testConnection_1xwmsw_k$ = function ($completion) {
    return this.httpClient_1.testConnection_1xwmsw_k$($completion);
  };
  protoOf(RealApiService).getApiInfo_3wkxbm_k$ = function () {
    return ApiConfig_getInstance().getDebugInfo_3fxx5h_k$();
  };
  var ServiceType_MOCK_DATA_instance;
  var ServiceType_REAL_API_instance;
  var ServiceType_HYBRID_instance;
  function values_15() {
    return [ServiceType_MOCK_DATA_getInstance(), ServiceType_REAL_API_getInstance(), ServiceType_HYBRID_getInstance()];
  }
  function valueOf_15(value) {
    switch (value) {
      case 'MOCK_DATA':
        return ServiceType_MOCK_DATA_getInstance();
      case 'REAL_API':
        return ServiceType_REAL_API_getInstance();
      case 'HYBRID':
        return ServiceType_HYBRID_getInstance();
      default:
        ServiceType_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  function get_entries_15() {
    if ($ENTRIES_15 == null)
      $ENTRIES_15 = enumEntries(values_15());
    return $ENTRIES_15;
  }
  var ServiceType_entriesInitialized;
  function ServiceType_initEntries() {
    if (ServiceType_entriesInitialized)
      return Unit_getInstance();
    ServiceType_entriesInitialized = true;
    ServiceType_MOCK_DATA_instance = new ServiceType('MOCK_DATA', 0);
    ServiceType_REAL_API_instance = new ServiceType('REAL_API', 1);
    ServiceType_HYBRID_instance = new ServiceType('HYBRID', 2);
  }
  var $ENTRIES_15;
  function ServiceType(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function get_$stableprop_31() {
    return 0;
  }
  function ServiceType_MOCK_DATA_getInstance() {
    ServiceType_initEntries();
    return ServiceType_MOCK_DATA_instance;
  }
  function ServiceType_REAL_API_getInstance() {
    ServiceType_initEntries();
    return ServiceType_REAL_API_instance;
  }
  function ServiceType_HYBRID_getInstance() {
    ServiceType_initEntries();
    return ServiceType_HYBRID_instance;
  }
  function $testAllServicesCOROUTINE$0(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
  }
  protoOf($testAllServicesCOROUTINE$0).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(4);
            var tmp_0 = this;
            tmp_0.results0__1 = LinkedHashMap_init_$Create$();
            this.set_exceptionState_fex74n_k$(3);
            this.dataService1__1 = this._this__u8e3s4__1.getDataService_29ra8b_k$();
            var tmp_1 = this.dataService1__1;
            if (tmp_1 instanceof RealApiService) {
              var tmp_2 = this;
              tmp_2.this2__1 = this.results0__1;
              var tmp_3 = this;
              tmp_3.key3__1 = 'API Connection';
              this.set_state_rjd8d0_k$(1);
              suspendResult = this.dataService1__1.testConnection_1xwmsw_k$(this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              var this_0 = this.results0__1;
              var key = 'Mock Data';
              this_0.put_4fpzoq_k$(key, true);
              this.set_state_rjd8d0_k$(2);
              continue $sm;
            }

          case 1:
            var value = suspendResult;
            this.this2__1.put_4fpzoq_k$(this.key3__1, value);
            var this_1 = this.results0__1;
            var key_0 = 'API Info';
            var value_0 = !this.dataService1__1.getApiInfo_3wkxbm_k$().isEmpty_y1axqb_k$();
            this_1.put_4fpzoq_k$(key_0, value_0);
            this.set_state_rjd8d0_k$(2);
            continue $sm;
          case 2:
            var this_2 = this.results0__1;
            var key_1 = 'WebSocket';
            this_2.put_4fpzoq_k$(key_1, true);
            this.results0__1.put_4fpzoq_k$('Cache', true);
            var this_3 = this.results0__1;
            var key_2 = 'File Upload';
            this_3.put_4fpzoq_k$(key_2, true);
            this.set_exceptionState_fex74n_k$(4);
            this.set_state_rjd8d0_k$(5);
            continue $sm;
          case 3:
            this.set_exceptionState_fex74n_k$(4);
            var tmp_4 = this.get_exception_x0n6w6_k$();
            if (tmp_4 instanceof Exception) {
              var e = this.get_exception_x0n6w6_k$();
              this.results0__1.put_4fpzoq_k$('Error', false);
              println('\u274C Service testing failed: ' + e.message);
              this.set_state_rjd8d0_k$(5);
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 4:
            throw this.get_exception_x0n6w6_k$();
          case 5:
            this.set_exceptionState_fex74n_k$(4);
            return this.results0__1;
        }
      } catch ($p) {
        var e_0 = $p;
        if (this.get_exceptionState_wflpxn_k$() === 4) {
          throw e_0;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e_0);
        }
      }
     while (true);
  };
  function ServiceFactory() {
    ServiceFactory_instance = this;
    this.currentServiceType_1 = ServiceType_REAL_API_getInstance();
    this.$stable_1 = 0;
  }
  protoOf(ServiceFactory).get_currentServiceType_i99yjl_k$ = function () {
    return this.currentServiceType_1;
  };
  protoOf(ServiceFactory).getDataService_29ra8b_k$ = function () {
    var tmp;
    switch (this.currentServiceType_1.get_ordinal_ip24qg_k$()) {
      case 0:
        println('\uD83D\uDD27 Using Mock Data Service');
        tmp = new DataService();
        break;
      case 1:
        println('\uD83C\uDF10 Using Real API Service');
        tmp = new RealApiService();
        break;
      case 2:
        println('\uD83D\uDD04 Using Hybrid Service (Real API + Mock Fallback)');
        tmp = new RealApiService();
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  };
  protoOf(ServiceFactory).getWebSocketService_do9qv8_k$ = function () {
    return new WebSocketService();
  };
  protoOf(ServiceFactory).getCacheService_lvecsp_k$ = function () {
    return new CacheService();
  };
  protoOf(ServiceFactory).getFileUploadService_6qn7fi_k$ = function () {
    return new FileUploadService();
  };
  protoOf(ServiceFactory).getServiceInfo_sjlya5_k$ = function () {
    var baseInfo = toMutableMap(ApiConfig_getInstance().getDebugInfo_3fxx5h_k$());
    // Inline function 'kotlin.collections.set' call
    var key = 'Service Type';
    var value = this.currentServiceType_1.get_name_woqyms_k$();
    baseInfo.put_4fpzoq_k$(key, value);
    // Inline function 'kotlin.collections.set' call
    var key_0 = 'Data Source';
    var tmp;
    switch (this.currentServiceType_1.get_ordinal_ip24qg_k$()) {
      case 0:
        tmp = 'Mock Data';
        break;
      case 1:
        tmp = 'Real API Only';
        break;
      case 2:
        tmp = 'Real API + Mock Fallback';
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    var value_0 = tmp;
    baseInfo.put_4fpzoq_k$(key_0, value_0);
    return baseInfo;
  };
  protoOf(ServiceFactory).switchServiceType_seb3jz_k$ = function (newType) {
    println('\uD83D\uDD04 Switching service type from ' + this.currentServiceType_1.get_name_woqyms_k$() + ' to ' + newType.get_name_woqyms_k$());
  };
  protoOf(ServiceFactory).testAllServices_oi2djz_k$ = function ($completion) {
    var tmp = new $testAllServicesCOROUTINE$0(this, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  var ServiceFactory_instance;
  function ServiceFactory_getInstance() {
    if (ServiceFactory_instance == null)
      new ServiceFactory();
    return ServiceFactory_instance;
  }
  function _get__connectionStatus__dh68im($this) {
    return $this._connectionStatus_1;
  }
  function _get__sensorData__t43x2q($this) {
    return $this._sensorData_1;
  }
  function _get__alerts__c1p9lx($this) {
    return $this._alerts_1;
  }
  function _get__notifications__mrnk1u($this) {
    return $this._notifications_1;
  }
  function startListening($this, $completion) {
    return simulateSensorData($this, $completion);
  }
  function simulateSensorData($this, $completion) {
    var tmp = new $simulateSensorDataCOROUTINE$57($this, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  }
  function get_$stableprop_32() {
    return 0;
  }
  function $connectCOROUTINE$55(_this__u8e3s4, _url, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this._url_1 = _url;
  }
  protoOf($connectCOROUTINE$55).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(4);
            this.set_exceptionState_fex74n_k$(3);
            this._this__u8e3s4__1._connectionStatus_1.set_value_v1vabv_k$(ConnectionStatus_CONNECTING_getInstance());
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(1000, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this._this__u8e3s4__1._connectionStatus_1.set_value_v1vabv_k$(ConnectionStatus_CONNECTED_getInstance());
            this.set_state_rjd8d0_k$(2);
            suspendResult = startListening(this._this__u8e3s4__1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.set_exceptionState_fex74n_k$(4);
            this.set_state_rjd8d0_k$(5);
            continue $sm;
          case 3:
            this.set_exceptionState_fex74n_k$(4);
            var tmp_0 = this.get_exception_x0n6w6_k$();
            if (tmp_0 instanceof Exception) {
              var e = this.get_exception_x0n6w6_k$();
              this._this__u8e3s4__1._connectionStatus_1.set_value_v1vabv_k$(ConnectionStatus_ERROR_getInstance());
              this.set_state_rjd8d0_k$(5);
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 4:
            throw this.get_exception_x0n6w6_k$();
          case 5:
            this.set_exceptionState_fex74n_k$(4);
            return Unit_getInstance();
        }
      } catch ($p) {
        var e_0 = $p;
        if (this.get_exceptionState_wflpxn_k$() === 4) {
          throw e_0;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e_0);
        }
      }
     while (true);
  };
  function $disconnectCOROUTINE$56(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
  }
  protoOf($disconnectCOROUTINE$56).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this._this__u8e3s4__1._connectionStatus_1.set_value_v1vabv_k$(ConnectionStatus_DISCONNECTING_getInstance());
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(new Long(500, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this._this__u8e3s4__1._connectionStatus_1.set_value_v1vabv_k$(ConnectionStatus_DISCONNECTED_getInstance());
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
  function $simulateSensorDataCOROUTINE$57(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
  }
  protoOf($simulateSensorDataCOROUTINE$57).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(4);
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 1:
            if (!this._this__u8e3s4__1._connectionStatus_1.get_value_j01efc_k$().equals(ConnectionStatus_CONNECTED_getInstance())) {
              this.set_state_rjd8d0_k$(3);
              continue $sm;
            }

            this.set_state_rjd8d0_k$(2);
            suspendResult = delay(new Long(5000, 0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            var newSensorData = mapOf([to('temperature', new SensorData('temperature', '25.5\xB0C', '2024-01-01T12:00:00Z')), to('humidity', new SensorData('humidity', '65%', '2024-01-01T12:00:00Z')), to('soil_moisture', new SensorData('soil_moisture', '78%', '2024-01-01T12:00:00Z')), to('light_intensity', new SensorData('light_intensity', '850 lux', '2024-01-01T12:00:00Z'))]);
            this._this__u8e3s4__1._sensorData_1.set_value_v1vabv_k$(newSensorData);
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 3:
            return Unit_getInstance();
          case 4:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 4) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function WebSocketService() {
    this._connectionStatus_1 = MutableStateFlow(ConnectionStatus_DISCONNECTED_getInstance());
    this.connectionStatus_1 = asStateFlow(this._connectionStatus_1);
    this._sensorData_1 = MutableStateFlow(emptyMap());
    this.sensorData_1 = asStateFlow(this._sensorData_1);
    this._alerts_1 = MutableStateFlow(emptyList());
    this.alerts_1 = asStateFlow(this._alerts_1);
    this._notifications_1 = MutableStateFlow(emptyList());
    this.notifications_1 = asStateFlow(this._notifications_1);
    this.$stable_1 = 0;
  }
  protoOf(WebSocketService).get_connectionStatus_we43pj_k$ = function () {
    return this.connectionStatus_1;
  };
  protoOf(WebSocketService).get_sensorData_84gavh_k$ = function () {
    return this.sensorData_1;
  };
  protoOf(WebSocketService).get_alerts_b0a4yo_k$ = function () {
    return this.alerts_1;
  };
  protoOf(WebSocketService).get_notifications_jts33z_k$ = function () {
    return this.notifications_1;
  };
  protoOf(WebSocketService).connect_iztqdj_k$ = function (_url, $completion) {
    var tmp = new $connectCOROUTINE$55(this, _url, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(WebSocketService).disconnect_40oa2t_k$ = function ($completion) {
    var tmp = new $disconnectCOROUTINE$56(this, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(WebSocketService).sendMessage_ffny84_k$ = function (message, $completion) {
    if (this._connectionStatus_1.get_value_j01efc_k$().equals(ConnectionStatus_CONNECTED_getInstance())) {
      println('Sending: ' + message);
    }
    return Unit_getInstance();
  };
  protoOf(WebSocketService).addAlert_wu655x_k$ = function (alert) {
    var currentAlerts = toMutableList(this._alerts_1.get_value_j01efc_k$());
    currentAlerts.add_dl6gt3_k$(0, alert);
    if (currentAlerts.get_size_woubt6_k$() > 100) {
      currentAlerts.removeAt_6niowx_k$(currentAlerts.get_size_woubt6_k$() - 1 | 0);
    }
    this._alerts_1.set_value_v1vabv_k$(currentAlerts);
  };
  protoOf(WebSocketService).addNotification_my1jyt_k$ = function (notification) {
    var currentNotifications = toMutableList(this._notifications_1.get_value_j01efc_k$());
    currentNotifications.add_dl6gt3_k$(0, notification);
    if (currentNotifications.get_size_woubt6_k$() > 50) {
      currentNotifications.removeAt_6niowx_k$(currentNotifications.get_size_woubt6_k$() - 1 | 0);
    }
    this._notifications_1.set_value_v1vabv_k$(currentNotifications);
  };
  protoOf(WebSocketService).clearAlerts_2dx4zw_k$ = function () {
    this._alerts_1.set_value_v1vabv_k$(emptyList());
  };
  protoOf(WebSocketService).clearNotifications_koy7d7_k$ = function () {
    this._notifications_1.set_value_v1vabv_k$(emptyList());
  };
  var ConnectionStatus_DISCONNECTED_instance;
  var ConnectionStatus_CONNECTING_instance;
  var ConnectionStatus_CONNECTED_instance;
  var ConnectionStatus_ERROR_instance;
  var ConnectionStatus_DISCONNECTING_instance;
  function values_16() {
    return [ConnectionStatus_DISCONNECTED_getInstance(), ConnectionStatus_CONNECTING_getInstance(), ConnectionStatus_CONNECTED_getInstance(), ConnectionStatus_ERROR_getInstance(), ConnectionStatus_DISCONNECTING_getInstance()];
  }
  function valueOf_16(value) {
    switch (value) {
      case 'DISCONNECTED':
        return ConnectionStatus_DISCONNECTED_getInstance();
      case 'CONNECTING':
        return ConnectionStatus_CONNECTING_getInstance();
      case 'CONNECTED':
        return ConnectionStatus_CONNECTED_getInstance();
      case 'ERROR':
        return ConnectionStatus_ERROR_getInstance();
      case 'DISCONNECTING':
        return ConnectionStatus_DISCONNECTING_getInstance();
      default:
        ConnectionStatus_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  function get_entries_16() {
    if ($ENTRIES_16 == null)
      $ENTRIES_16 = enumEntries(values_16());
    return $ENTRIES_16;
  }
  var ConnectionStatus_entriesInitialized;
  function ConnectionStatus_initEntries() {
    if (ConnectionStatus_entriesInitialized)
      return Unit_getInstance();
    ConnectionStatus_entriesInitialized = true;
    ConnectionStatus_DISCONNECTED_instance = new ConnectionStatus('DISCONNECTED', 0);
    ConnectionStatus_CONNECTING_instance = new ConnectionStatus('CONNECTING', 1);
    ConnectionStatus_CONNECTED_instance = new ConnectionStatus('CONNECTED', 2);
    ConnectionStatus_ERROR_instance = new ConnectionStatus('ERROR', 3);
    ConnectionStatus_DISCONNECTING_instance = new ConnectionStatus('DISCONNECTING', 4);
  }
  var $ENTRIES_16;
  function ConnectionStatus(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function get_$stableprop_33() {
    return 0;
  }
  function SensorData(name, value, timestamp) {
    this.name_1 = name;
    this.value_1 = value;
    this.timestamp_1 = timestamp;
    this.$stable_1 = 0;
  }
  protoOf(SensorData).get_name_woqyms_k$ = function () {
    return this.name_1;
  };
  protoOf(SensorData).get_value_j01efc_k$ = function () {
    return this.value_1;
  };
  protoOf(SensorData).get_timestamp_9fccx9_k$ = function () {
    return this.timestamp_1;
  };
  protoOf(SensorData).component1_7eebsc_k$ = function () {
    return this.name_1;
  };
  protoOf(SensorData).component2_7eebsb_k$ = function () {
    return this.value_1;
  };
  protoOf(SensorData).component3_7eebsa_k$ = function () {
    return this.timestamp_1;
  };
  protoOf(SensorData).copy_nc7k0r_k$ = function (name, value, timestamp) {
    return new SensorData(name, value, timestamp);
  };
  protoOf(SensorData).copy$default_kfff5c_k$ = function (name, value, timestamp, $super) {
    name = name === VOID ? this.name_1 : name;
    value = value === VOID ? this.value_1 : value;
    timestamp = timestamp === VOID ? this.timestamp_1 : timestamp;
    return $super === VOID ? this.copy_nc7k0r_k$(name, value, timestamp) : $super.copy_nc7k0r_k$.call(this, name, value, timestamp);
  };
  protoOf(SensorData).toString = function () {
    return 'SensorData(name=' + this.name_1 + ', value=' + this.value_1 + ', timestamp=' + this.timestamp_1 + ')';
  };
  protoOf(SensorData).hashCode = function () {
    var result = getStringHashCode(this.name_1);
    result = imul(result, 31) + getStringHashCode(this.value_1) | 0;
    result = imul(result, 31) + getStringHashCode(this.timestamp_1) | 0;
    return result;
  };
  protoOf(SensorData).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof SensorData))
      return false;
    var tmp0_other_with_cast = other instanceof SensorData ? other : THROW_CCE();
    if (!(this.name_1 === tmp0_other_with_cast.name_1))
      return false;
    if (!(this.value_1 === tmp0_other_with_cast.value_1))
      return false;
    if (!(this.timestamp_1 === tmp0_other_with_cast.timestamp_1))
      return false;
    return true;
  };
  function get_$stableprop_34() {
    return 0;
  }
  function FarmAlert(id, type, message, severity, timestamp, farmId) {
    this.id_1 = id;
    this.type_1 = type;
    this.message_1 = message;
    this.severity_1 = severity;
    this.timestamp_1 = timestamp;
    this.farmId_1 = farmId;
    this.$stable_1 = 0;
  }
  protoOf(FarmAlert).get_id_kntnx8_k$ = function () {
    return this.id_1;
  };
  protoOf(FarmAlert).get_type_wovaf7_k$ = function () {
    return this.type_1;
  };
  protoOf(FarmAlert).get_message_h23axq_k$ = function () {
    return this.message_1;
  };
  protoOf(FarmAlert).get_severity_7csmre_k$ = function () {
    return this.severity_1;
  };
  protoOf(FarmAlert).get_timestamp_9fccx9_k$ = function () {
    return this.timestamp_1;
  };
  protoOf(FarmAlert).get_farmId_d7oohm_k$ = function () {
    return this.farmId_1;
  };
  protoOf(FarmAlert).component1_7eebsc_k$ = function () {
    return this.id_1;
  };
  protoOf(FarmAlert).component2_7eebsb_k$ = function () {
    return this.type_1;
  };
  protoOf(FarmAlert).component3_7eebsa_k$ = function () {
    return this.message_1;
  };
  protoOf(FarmAlert).component4_7eebs9_k$ = function () {
    return this.severity_1;
  };
  protoOf(FarmAlert).component5_7eebs8_k$ = function () {
    return this.timestamp_1;
  };
  protoOf(FarmAlert).component6_7eebs7_k$ = function () {
    return this.farmId_1;
  };
  protoOf(FarmAlert).copy_16a82v_k$ = function (id, type, message, severity, timestamp, farmId) {
    return new FarmAlert(id, type, message, severity, timestamp, farmId);
  };
  protoOf(FarmAlert).copy$default_r6blkx_k$ = function (id, type, message, severity, timestamp, farmId, $super) {
    id = id === VOID ? this.id_1 : id;
    type = type === VOID ? this.type_1 : type;
    message = message === VOID ? this.message_1 : message;
    severity = severity === VOID ? this.severity_1 : severity;
    timestamp = timestamp === VOID ? this.timestamp_1 : timestamp;
    farmId = farmId === VOID ? this.farmId_1 : farmId;
    return $super === VOID ? this.copy_16a82v_k$(id, type, message, severity, timestamp, farmId) : $super.copy_16a82v_k$.call(this, id, type, message, severity, timestamp, farmId);
  };
  protoOf(FarmAlert).toString = function () {
    return 'FarmAlert(id=' + this.id_1 + ', type=' + this.type_1 + ', message=' + this.message_1 + ', severity=' + this.severity_1 + ', timestamp=' + this.timestamp_1 + ', farmId=' + this.farmId_1 + ')';
  };
  protoOf(FarmAlert).hashCode = function () {
    var result = getStringHashCode(this.id_1);
    result = imul(result, 31) + this.type_1.hashCode() | 0;
    result = imul(result, 31) + getStringHashCode(this.message_1) | 0;
    result = imul(result, 31) + this.severity_1.hashCode() | 0;
    result = imul(result, 31) + getStringHashCode(this.timestamp_1) | 0;
    result = imul(result, 31) + getStringHashCode(this.farmId_1) | 0;
    return result;
  };
  protoOf(FarmAlert).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof FarmAlert))
      return false;
    var tmp0_other_with_cast = other instanceof FarmAlert ? other : THROW_CCE();
    if (!(this.id_1 === tmp0_other_with_cast.id_1))
      return false;
    if (!this.type_1.equals(tmp0_other_with_cast.type_1))
      return false;
    if (!(this.message_1 === tmp0_other_with_cast.message_1))
      return false;
    if (!this.severity_1.equals(tmp0_other_with_cast.severity_1))
      return false;
    if (!(this.timestamp_1 === tmp0_other_with_cast.timestamp_1))
      return false;
    if (!(this.farmId_1 === tmp0_other_with_cast.farmId_1))
      return false;
    return true;
  };
  function get_$stableprop_35() {
    return 0;
  }
  function Notification(id, title, message, type, timestamp, read) {
    read = read === VOID ? false : read;
    this.id_1 = id;
    this.title_1 = title;
    this.message_1 = message;
    this.type_1 = type;
    this.timestamp_1 = timestamp;
    this.read_1 = read;
    this.$stable_1 = 0;
  }
  protoOf(Notification).get_id_kntnx8_k$ = function () {
    return this.id_1;
  };
  protoOf(Notification).get_title_iz32un_k$ = function () {
    return this.title_1;
  };
  protoOf(Notification).get_message_h23axq_k$ = function () {
    return this.message_1;
  };
  protoOf(Notification).get_type_wovaf7_k$ = function () {
    return this.type_1;
  };
  protoOf(Notification).get_timestamp_9fccx9_k$ = function () {
    return this.timestamp_1;
  };
  protoOf(Notification).get_read_wotl9b_k$ = function () {
    return this.read_1;
  };
  protoOf(Notification).component1_7eebsc_k$ = function () {
    return this.id_1;
  };
  protoOf(Notification).component2_7eebsb_k$ = function () {
    return this.title_1;
  };
  protoOf(Notification).component3_7eebsa_k$ = function () {
    return this.message_1;
  };
  protoOf(Notification).component4_7eebs9_k$ = function () {
    return this.type_1;
  };
  protoOf(Notification).component5_7eebs8_k$ = function () {
    return this.timestamp_1;
  };
  protoOf(Notification).component6_7eebs7_k$ = function () {
    return this.read_1;
  };
  protoOf(Notification).copy_mjemz2_k$ = function (id, title, message, type, timestamp, read) {
    return new Notification(id, title, message, type, timestamp, read);
  };
  protoOf(Notification).copy$default_szd32z_k$ = function (id, title, message, type, timestamp, read, $super) {
    id = id === VOID ? this.id_1 : id;
    title = title === VOID ? this.title_1 : title;
    message = message === VOID ? this.message_1 : message;
    type = type === VOID ? this.type_1 : type;
    timestamp = timestamp === VOID ? this.timestamp_1 : timestamp;
    read = read === VOID ? this.read_1 : read;
    return $super === VOID ? this.copy_mjemz2_k$(id, title, message, type, timestamp, read) : $super.copy_mjemz2_k$.call(this, id, title, message, type, timestamp, read);
  };
  protoOf(Notification).toString = function () {
    return 'Notification(id=' + this.id_1 + ', title=' + this.title_1 + ', message=' + this.message_1 + ', type=' + this.type_1 + ', timestamp=' + this.timestamp_1 + ', read=' + this.read_1 + ')';
  };
  protoOf(Notification).hashCode = function () {
    var result = getStringHashCode(this.id_1);
    result = imul(result, 31) + getStringHashCode(this.title_1) | 0;
    result = imul(result, 31) + getStringHashCode(this.message_1) | 0;
    result = imul(result, 31) + this.type_1.hashCode() | 0;
    result = imul(result, 31) + getStringHashCode(this.timestamp_1) | 0;
    result = imul(result, 31) + getBooleanHashCode(this.read_1) | 0;
    return result;
  };
  protoOf(Notification).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Notification))
      return false;
    var tmp0_other_with_cast = other instanceof Notification ? other : THROW_CCE();
    if (!(this.id_1 === tmp0_other_with_cast.id_1))
      return false;
    if (!(this.title_1 === tmp0_other_with_cast.title_1))
      return false;
    if (!(this.message_1 === tmp0_other_with_cast.message_1))
      return false;
    if (!this.type_1.equals(tmp0_other_with_cast.type_1))
      return false;
    if (!(this.timestamp_1 === tmp0_other_with_cast.timestamp_1))
      return false;
    if (!(this.read_1 === tmp0_other_with_cast.read_1))
      return false;
    return true;
  };
  var AlertType_WEATHER_WARNING_instance;
  var AlertType_EQUIPMENT_FAILURE_instance;
  var AlertType_PEST_DETECTION_instance;
  var AlertType_WATER_SHORTAGE_instance;
  var AlertType_TEMPERATURE_ALERT_instance;
  var AlertType_SECURITY_ALERT_instance;
  function values_17() {
    return [AlertType_WEATHER_WARNING_getInstance(), AlertType_EQUIPMENT_FAILURE_getInstance(), AlertType_PEST_DETECTION_getInstance(), AlertType_WATER_SHORTAGE_getInstance(), AlertType_TEMPERATURE_ALERT_getInstance(), AlertType_SECURITY_ALERT_getInstance()];
  }
  function valueOf_17(value) {
    switch (value) {
      case 'WEATHER_WARNING':
        return AlertType_WEATHER_WARNING_getInstance();
      case 'EQUIPMENT_FAILURE':
        return AlertType_EQUIPMENT_FAILURE_getInstance();
      case 'PEST_DETECTION':
        return AlertType_PEST_DETECTION_getInstance();
      case 'WATER_SHORTAGE':
        return AlertType_WATER_SHORTAGE_getInstance();
      case 'TEMPERATURE_ALERT':
        return AlertType_TEMPERATURE_ALERT_getInstance();
      case 'SECURITY_ALERT':
        return AlertType_SECURITY_ALERT_getInstance();
      default:
        AlertType_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  function get_entries_17() {
    if ($ENTRIES_17 == null)
      $ENTRIES_17 = enumEntries(values_17());
    return $ENTRIES_17;
  }
  var AlertType_entriesInitialized;
  function AlertType_initEntries() {
    if (AlertType_entriesInitialized)
      return Unit_getInstance();
    AlertType_entriesInitialized = true;
    AlertType_WEATHER_WARNING_instance = new AlertType('WEATHER_WARNING', 0);
    AlertType_EQUIPMENT_FAILURE_instance = new AlertType('EQUIPMENT_FAILURE', 1);
    AlertType_PEST_DETECTION_instance = new AlertType('PEST_DETECTION', 2);
    AlertType_WATER_SHORTAGE_instance = new AlertType('WATER_SHORTAGE', 3);
    AlertType_TEMPERATURE_ALERT_instance = new AlertType('TEMPERATURE_ALERT', 4);
    AlertType_SECURITY_ALERT_instance = new AlertType('SECURITY_ALERT', 5);
  }
  var $ENTRIES_17;
  function AlertType(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  var AlertSeverity_LOW_instance;
  var AlertSeverity_MEDIUM_instance;
  var AlertSeverity_HIGH_instance;
  var AlertSeverity_CRITICAL_instance;
  function values_18() {
    return [AlertSeverity_LOW_getInstance(), AlertSeverity_MEDIUM_getInstance(), AlertSeverity_HIGH_getInstance(), AlertSeverity_CRITICAL_getInstance()];
  }
  function valueOf_18(value) {
    switch (value) {
      case 'LOW':
        return AlertSeverity_LOW_getInstance();
      case 'MEDIUM':
        return AlertSeverity_MEDIUM_getInstance();
      case 'HIGH':
        return AlertSeverity_HIGH_getInstance();
      case 'CRITICAL':
        return AlertSeverity_CRITICAL_getInstance();
      default:
        AlertSeverity_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  function get_entries_18() {
    if ($ENTRIES_18 == null)
      $ENTRIES_18 = enumEntries(values_18());
    return $ENTRIES_18;
  }
  var AlertSeverity_entriesInitialized;
  function AlertSeverity_initEntries() {
    if (AlertSeverity_entriesInitialized)
      return Unit_getInstance();
    AlertSeverity_entriesInitialized = true;
    AlertSeverity_LOW_instance = new AlertSeverity('LOW', 0);
    AlertSeverity_MEDIUM_instance = new AlertSeverity('MEDIUM', 1);
    AlertSeverity_HIGH_instance = new AlertSeverity('HIGH', 2);
    AlertSeverity_CRITICAL_instance = new AlertSeverity('CRITICAL', 3);
  }
  var $ENTRIES_18;
  function AlertSeverity(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  var NotificationType_TASK_REMINDER_instance;
  var NotificationType_HARVEST_TIME_instance;
  var NotificationType_MAINTENANCE_DUE_instance;
  var NotificationType_WEATHER_UPDATE_instance;
  var NotificationType_MARKET_PRICE_instance;
  var NotificationType_SYSTEM_UPDATE_instance;
  function values_19() {
    return [NotificationType_TASK_REMINDER_getInstance(), NotificationType_HARVEST_TIME_getInstance(), NotificationType_MAINTENANCE_DUE_getInstance(), NotificationType_WEATHER_UPDATE_getInstance(), NotificationType_MARKET_PRICE_getInstance(), NotificationType_SYSTEM_UPDATE_getInstance()];
  }
  function valueOf_19(value) {
    switch (value) {
      case 'TASK_REMINDER':
        return NotificationType_TASK_REMINDER_getInstance();
      case 'HARVEST_TIME':
        return NotificationType_HARVEST_TIME_getInstance();
      case 'MAINTENANCE_DUE':
        return NotificationType_MAINTENANCE_DUE_getInstance();
      case 'WEATHER_UPDATE':
        return NotificationType_WEATHER_UPDATE_getInstance();
      case 'MARKET_PRICE':
        return NotificationType_MARKET_PRICE_getInstance();
      case 'SYSTEM_UPDATE':
        return NotificationType_SYSTEM_UPDATE_getInstance();
      default:
        NotificationType_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  function get_entries_19() {
    if ($ENTRIES_19 == null)
      $ENTRIES_19 = enumEntries(values_19());
    return $ENTRIES_19;
  }
  var NotificationType_entriesInitialized;
  function NotificationType_initEntries() {
    if (NotificationType_entriesInitialized)
      return Unit_getInstance();
    NotificationType_entriesInitialized = true;
    NotificationType_TASK_REMINDER_instance = new NotificationType('TASK_REMINDER', 0);
    NotificationType_HARVEST_TIME_instance = new NotificationType('HARVEST_TIME', 1);
    NotificationType_MAINTENANCE_DUE_instance = new NotificationType('MAINTENANCE_DUE', 2);
    NotificationType_WEATHER_UPDATE_instance = new NotificationType('WEATHER_UPDATE', 3);
    NotificationType_MARKET_PRICE_instance = new NotificationType('MARKET_PRICE', 4);
    NotificationType_SYSTEM_UPDATE_instance = new NotificationType('SYSTEM_UPDATE', 5);
  }
  var $ENTRIES_19;
  function NotificationType(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function ConnectionStatus_DISCONNECTED_getInstance() {
    ConnectionStatus_initEntries();
    return ConnectionStatus_DISCONNECTED_instance;
  }
  function ConnectionStatus_CONNECTING_getInstance() {
    ConnectionStatus_initEntries();
    return ConnectionStatus_CONNECTING_instance;
  }
  function ConnectionStatus_CONNECTED_getInstance() {
    ConnectionStatus_initEntries();
    return ConnectionStatus_CONNECTED_instance;
  }
  function ConnectionStatus_ERROR_getInstance() {
    ConnectionStatus_initEntries();
    return ConnectionStatus_ERROR_instance;
  }
  function ConnectionStatus_DISCONNECTING_getInstance() {
    ConnectionStatus_initEntries();
    return ConnectionStatus_DISCONNECTING_instance;
  }
  function AlertType_WEATHER_WARNING_getInstance() {
    AlertType_initEntries();
    return AlertType_WEATHER_WARNING_instance;
  }
  function AlertType_EQUIPMENT_FAILURE_getInstance() {
    AlertType_initEntries();
    return AlertType_EQUIPMENT_FAILURE_instance;
  }
  function AlertType_PEST_DETECTION_getInstance() {
    AlertType_initEntries();
    return AlertType_PEST_DETECTION_instance;
  }
  function AlertType_WATER_SHORTAGE_getInstance() {
    AlertType_initEntries();
    return AlertType_WATER_SHORTAGE_instance;
  }
  function AlertType_TEMPERATURE_ALERT_getInstance() {
    AlertType_initEntries();
    return AlertType_TEMPERATURE_ALERT_instance;
  }
  function AlertType_SECURITY_ALERT_getInstance() {
    AlertType_initEntries();
    return AlertType_SECURITY_ALERT_instance;
  }
  function AlertSeverity_LOW_getInstance() {
    AlertSeverity_initEntries();
    return AlertSeverity_LOW_instance;
  }
  function AlertSeverity_MEDIUM_getInstance() {
    AlertSeverity_initEntries();
    return AlertSeverity_MEDIUM_instance;
  }
  function AlertSeverity_HIGH_getInstance() {
    AlertSeverity_initEntries();
    return AlertSeverity_HIGH_instance;
  }
  function AlertSeverity_CRITICAL_getInstance() {
    AlertSeverity_initEntries();
    return AlertSeverity_CRITICAL_instance;
  }
  function NotificationType_TASK_REMINDER_getInstance() {
    NotificationType_initEntries();
    return NotificationType_TASK_REMINDER_instance;
  }
  function NotificationType_HARVEST_TIME_getInstance() {
    NotificationType_initEntries();
    return NotificationType_HARVEST_TIME_instance;
  }
  function NotificationType_MAINTENANCE_DUE_getInstance() {
    NotificationType_initEntries();
    return NotificationType_MAINTENANCE_DUE_instance;
  }
  function NotificationType_WEATHER_UPDATE_getInstance() {
    NotificationType_initEntries();
    return NotificationType_WEATHER_UPDATE_instance;
  }
  function NotificationType_MARKET_PRICE_getInstance() {
    NotificationType_initEntries();
    return NotificationType_MARKET_PRICE_instance;
  }
  function NotificationType_SYSTEM_UPDATE_getInstance() {
    NotificationType_initEntries();
    return NotificationType_SYSTEM_UPDATE_instance;
  }
  function getCurrentTimeMillis() {
    return numberToLong(Date.now());
  }
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = Endpoints_getInstance;
  _.$_$.b = Features_getInstance;
  _.$_$.c = Settings_getInstance;
  _.$_$.d = ApiConfig_getInstance;
  _.$_$.e = Crops_getInstance;
  _.$_$.f = Equipment_getInstance;
  _.$_$.g = Financial_getInstance;
  _.$_$.h = Livestock_getInstance;
  _.$_$.i = Tasks_getInstance;
  _.$_$.j = CategoryConfig_getInstance;
  _.$_$.k = ServiceFactory_getInstance;
  //endregion
  return _;
}));

//# sourceMappingURL=SmartFarm-shared.js.map
